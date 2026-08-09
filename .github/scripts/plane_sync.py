#!/usr/bin/env python3
"""Synchronise une Pull Request GitHub avec Plane.

Deux comportements, selon que la PR porte ou non un identifiant Plane
(`BV-42`, `PB-7`…) dans son nom de branche, son titre ou son corps :

1. **Identifiant present** — le work item correspondant change d'etat selon
   l'evenement GitHub, et recoit un commentaire pointant la PR.
2. **Identifiant absent, PR qui vient d'etre ouverte** — un work item est cree
   en `In Progress` avec une description factuelle, puis son identifiant est
   reinjecte dans le corps de la PR pour que les evenements suivants le
   retrouvent.

`merged` n'amene JAMAIS a `Released` : une PR mergee passe le work item a
`À valider`. La mise en production reste une decision humaine.

Ce script ne fait jamais echouer le job : toute erreur est journalisee et la
sortie est 0. Une panne de Plane ne doit pas rougir la CI ni bloquer un merge.

Variables d'environnement attendues :
  PLANE_API_KEY      token Plane (secret du repo)
  PLANE_WORKSPACE    slug du workspace
  PLANE_PROJECT      identifiant du projet par defaut de CE repo (BV, PB…)
  PLANE_REPO_LABEL   label repo:* a poser sur les items crees
  GITHUB_TOKEN       token fourni par Actions, pour reecrire le corps de la PR
  GITHUB_EVENT_PATH  fourni par Actions
  GITHUB_REPOSITORY  fourni par Actions
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

PLANE_API = "https://api.plane.so/api/v1"
GITHUB_API = "https://api.github.com"
ID_RE = re.compile(r"\b(BV|PB|LAB)-(\d+)\b")

# (action, merged) -> etat Plane cible. merged vaut None hors fermeture.
TRANSITIONS = {
    ("opened", None): "In Progress",
    ("reopened", None): "In Progress",
    ("ready_for_review", None): "In Review",
    ("review_requested", None): "In Review",
    ("closed", True): "À valider",
    ("closed", False): "Ready",
}

KEY = os.environ.get("PLANE_API_KEY", "")
WORKSPACE = os.environ.get("PLANE_WORKSPACE", "")
PROJECT_KEY = os.environ.get("PLANE_PROJECT", "")
REPO_LABEL = os.environ.get("PLANE_REPO_LABEL", "")


def log(msg):
    print(msg, flush=True)


def http(url, method="GET", payload=None, headers=None, timeout=30):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    # Cloudflare rejette le User-Agent par defaut d'urllib avec un 403/1010.
    req.add_header("User-Agent", "beemm-plane-sync/1.0")
    req.add_header("Accept", "application/json")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read().decode()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode()[:300]
        return {"__error": e.code, "__body": detail}
    except Exception as e:  # noqa: BLE001
        return {"__error": "network", "__body": str(e)[:300]}


def plane(path, method="GET", payload=None):
    return http(f"{PLANE_API}/workspaces/{WORKSPACE}{path}", method, payload,
                {"X-API-Key": KEY})


def github(path, method="GET", payload=None):
    token = os.environ.get("GITHUB_TOKEN", "")
    return http(f"{GITHUB_API}{path}", method, payload,
                {"Authorization": f"Bearer {token}",
                 "X-GitHub-Api-Version": "2022-11-28"})


def rows(resp):
    if isinstance(resp, dict):
        if "__error" in resp:
            return []
        return resp.get("results", [])
    return resp or []


def resolve_project(identifier):
    for p in rows(plane("/projects/")):
        if p.get("identifier") == identifier:
            return p["id"]
    return None


def find_issue(project_id, sequence_id):
    """L'API ignore ?sequence_id= : il faut parcourir. per_page vaut 1000 par
    defaut, donc un seul appel dans la quasi-totalite des cas."""
    path = f"/projects/{project_id}/issues/"
    while True:
        resp = plane(path)
        if isinstance(resp, dict) and "__error" in resp:
            return None
        for issue in rows(resp):
            if issue.get("sequence_id") == sequence_id:
                return issue
        if not (isinstance(resp, dict) and resp.get("next_page_results")):
            return None
        path = (f"/projects/{project_id}/issues/"
                f"?cursor={urllib.parse.quote(str(resp.get('next_cursor')))}")


def group_files(files):
    """Regroupe les fichiers par repertoire de premier niveau."""
    buckets = {}
    for f in files:
        name = f.get("filename", "")
        top = name.split("/")[0] if "/" in name else "(racine)"
        buckets.setdefault(top, []).append(name)
    return buckets


def esc(text):
    return (str(text).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;"))


def build_description(pr, repo, files):
    add, dele = pr.get("additions", 0), pr.get("deletions", 0)
    parts = [
        "<p><em>Cree automatiquement depuis une Pull Request sans "
        "identifiant Plane.</em></p>",
        "<ul>",
        f"<li><b>PR</b> : <a href=\"{esc(pr['html_url'])}\">"
        f"#{pr['number']} — {esc(pr.get('title', ''))}</a></li>",
        f"<li><b>Repo</b> : {esc(repo)}</li>",
        f"<li><b>Branche</b> : {esc(pr['head']['ref'])} → "
        f"{esc(pr['base']['ref'])}</li>",
        f"<li><b>Auteur</b> : {esc(pr.get('user', {}).get('login', '?'))}</li>",
        f"<li><b>Volume</b> : +{add} / −{dele} sur "
        f"{pr.get('changed_files', len(files))} fichiers</li>",
        "</ul>",
    ]
    body = (pr.get("body") or "").strip()
    if body:
        parts.append("<h2>Corps de la PR</h2>")
        parts.append(f"<p>{esc(body[:4000]).replace(chr(10), '<br>')}</p>")
    if files:
        parts.append("<h2>Fichiers modifies</h2><ul>")
        for top, names in sorted(group_files(files).items()):
            shown = ", ".join(esc(n.split("/")[-1]) for n in names[:8])
            more = f" … +{len(names) - 8}" if len(names) > 8 else ""
            parts.append(f"<li><b>{esc(top)}</b> ({len(names)}) : "
                         f"{shown}{more}</li>")
        parts.append("</ul>")
    parts.append("<h2>A completer par l'agent</h2><ul>"
                 "<li>Objectif et valeur utilisateur</li>"
                 "<li>Criteres livres</li>"
                 "<li>Module et impact</li>"
                 "<li>Risques et limites</li>"
                 "<li>Doc / landing / news / social</li></ul>")
    return "".join(parts)


HINT_MARK = "<!-- plane-sync-hint -->"


def hint_on_pr(repo, pr):
    """Signale UNE fois qu'aucun work item n'est rattache. Non bloquant, et
    volontairement discret : le but est d'informer, pas de harceler."""
    comments = github(f"/repos/{repo}/issues/{pr['number']}/comments?per_page=100")
    if isinstance(comments, dict) and "__error" in comments:
        return
    if any(HINT_MARK in (c.get("body") or "") for c in comments):
        return
    body = (
        f"{HINT_MARK}\n"
        "Aucun work item Plane rattache a cette PR — elle ne remontera pas dans "
        f"le board **{PROJECT_KEY}**.\n\n"
        "Si ce travail merite d'etre suivi, rattache-le a un work item "
        "existant : mets son identifiant dans le nom de branche "
        f"(`feat/{PROJECT_KEY}-42-...`), dans le titre de la PR "
        f"(`[{PROJECT_KEY}-42] ...`), ou ajoute une ligne `Plane: "
        f"{PROJECT_KEY}-42` ici.\n\n"
        "Plusieurs PR peuvent pointer le meme work item : c'est la feature qui "
        "est suivie, pas la PR.")
    r = github(f"/repos/{repo}/issues/{pr['number']}/comments", "POST",
               {"body": body})
    log("[plane-sync] rappel poste sur la PR."
        if "__error" not in r
        else f"[plane-sync] rappel impossible : {r['__body'][:120]}")


def main():
    for name, val in (("PLANE_API_KEY", KEY), ("PLANE_WORKSPACE", WORKSPACE),
                      ("PLANE_PROJECT", PROJECT_KEY)):
        if not val:
            log(f"[plane-sync] {name} absent — rien a faire.")
            return

    event_path = os.environ.get("GITHUB_EVENT_PATH")
    if not event_path or not os.path.exists(event_path):
        log("[plane-sync] pas d'evenement GitHub — rien a faire.")
        return
    with open(event_path, encoding="utf-8") as fh:
        event = json.load(fh)

    pr = event.get("pull_request")
    action = event.get("action")
    if not pr:
        log("[plane-sync] evenement sans pull_request — ignore.")
        return

    repo = os.environ.get("GITHUB_REPOSITORY", "")
    merged = bool(pr.get("merged")) if action == "closed" else None
    haystack = " ".join([pr["head"]["ref"], pr.get("title") or "",
                         pr.get("body") or ""])
    match = ID_RE.search(haystack)

    # ---- Cas 2 : aucune reference Plane -----------------------------------
    if not match:
        # Par defaut, une PR sans identifiant ne cree RIEN. Une feature se
        # developpe souvent en plusieurs PR : creer un work item par PR
        # transformait le board en journal de commits. Le work item represente
        # la FEATURE, pas la PR — c'est a l'humain (ou a l'agent) de le creer
        # et d'y rattacher ses PR via `BV-42`.
        # Mettre PLANE_AUTOCREATE=true dans le workflow pour revenir au
        # comportement d'origine.
        if os.environ.get("PLANE_AUTOCREATE", "false").lower() != "true":
            log("[plane-sync] aucun identifiant Plane — creation automatique "
                "desactivee (PLANE_AUTOCREATE), rien a faire.")
            if action == "opened":
                hint_on_pr(repo, pr)
            return
        if action not in ("opened", "reopened"):
            log(f"[plane-sync] aucun identifiant Plane et action={action} — "
                "rien a faire.")
            return
        project_id = resolve_project(PROJECT_KEY)
        if not project_id:
            log(f"[plane-sync] projet {PROJECT_KEY} introuvable.")
            return
        states = {s["name"]: s["id"]
                  for s in rows(plane(f"/projects/{project_id}/states/"))}
        labels = {l["name"]: l["id"]
                  for l in rows(plane(f"/projects/{project_id}/labels/"))}
        wanted = [labels[n] for n in ("origin:github", "type:feature",
                                      REPO_LABEL) if n in labels]

        files = rows(github(f"/repos/{repo}/pulls/{pr['number']}/files"
                            "?per_page=100"))
        created = plane(f"/projects/{project_id}/issues/", "POST", {
            "name": (pr.get("title") or f"PR #{pr['number']}")[:250],
            "description_html": build_description(pr, repo, files),
            "state": states.get("In Progress"),
            "labels": wanted,
        })
        if "__error" in created:
            log(f"[plane-sync] creation impossible : {created['__error']} "
                f"{created['__body']}")
            return
        ref = f"{PROJECT_KEY}-{created['sequence_id']}"
        log(f"[plane-sync] work item {ref} cree en In Progress.")

        # Reinjecte l'identifiant pour que les evenements suivants le trouvent.
        body = (pr.get("body") or "").rstrip()
        new_body = f"{body}\n\nPlane: {ref}" if body else f"Plane: {ref}"
        upd = github(f"/repos/{repo}/pulls/{pr['number']}", "PATCH",
                     {"body": new_body})
        log("[plane-sync] identifiant reinjecte dans la PR."
            if "__error" not in upd
            else f"[plane-sync] reinjection impossible : {upd['__body']}")
        return

    # ---- Cas 1 : reference Plane presente ---------------------------------
    proj_key, seq = match.group(1), int(match.group(2))
    target_name = TRANSITIONS.get((action, merged))
    if not target_name:
        log(f"[plane-sync] action={action} merged={merged} — aucune transition.")
        return

    project_id = resolve_project(proj_key)
    if not project_id:
        log(f"[plane-sync] projet {proj_key} introuvable.")
        return
    issue = find_issue(project_id, seq)
    if not issue:
        log(f"[plane-sync] {proj_key}-{seq} introuvable dans {proj_key}.")
        return
    states = {s["name"]: s["id"]
              for s in rows(plane(f"/projects/{project_id}/states/"))}
    target = states.get(target_name)
    if not target:
        log(f"[plane-sync] etat '{target_name}' absent du projet {proj_key}.")
        return
    if issue.get("state") == target:
        log(f"[plane-sync] {proj_key}-{seq} deja en '{target_name}' — "
            "aucun changement, aucun commentaire.")
        return

    upd = plane(f"/projects/{project_id}/issues/{issue['id']}/", "PATCH",
                {"state": target})
    if "__error" in upd:
        log(f"[plane-sync] changement d'etat refuse : {upd['__error']} "
            f"{upd['__body']}")
        return
    log(f"[plane-sync] {proj_key}-{seq} -> {target_name}")

    verb = {"opened": "ouverte", "reopened": "rouverte",
            "ready_for_review": "prete pour revue",
            "review_requested": "envoyee en revue",
            "closed": "mergee" if merged else "fermee sans merge"}[action]
    plane(f"/projects/{project_id}/issues/{issue['id']}/comments/", "POST", {
        "comment_html":
            f"<p>PR <a href=\"{esc(pr['html_url'])}\">#{pr['number']} — "
            f"{esc(pr.get('title', ''))}</a> {verb} sur "
            f"<code>{esc(repo)}</code>.<br>"
            f"Etat passe a <b>{esc(target_name)}</b>.</p>"})


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:  # noqa: BLE001
        log(f"[plane-sync] erreur non fatale : {exc!r}")
    sys.exit(0)
