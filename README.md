# Beemm Vision CLI

Le CLI pilote vos projets, workflows et templates Beemm Vision depuis le terminal,
avec le même compte que l'application. Il sert aux humains comme aux agents IA :
chaque commande accepte `--json` et répond par une enveloppe JSON stable, avec un
code de sortie qui dit ce qui s'est passé.

- Commande : `beemmvision`. Alias strictement équivalent : `visionboard`.
- Version installée : `beemmvision --version`.
- Aide de n'importe quelle commande : `beemmvision <commande> --help`.

---

## Sommaire

1. [Installation](#installation)
2. [Connexion](#connexion)
3. [Démarrage rapide](#démarrage-rapide)
4. [Référence des commandes](#référence-des-commandes)
5. [Options globales](#options-globales)
6. [Sortie `--json` (agents et scripts)](#sortie---json-agents-et-scripts)
7. [Codes de sortie](#codes-de-sortie)
8. [Configuration et fichiers locaux](#configuration-et-fichiers-locaux)
9. [Dépannage](#dépannage)
10. [Ce que le CLI ne fait pas](#ce-que-le-cli-ne-fait-pas)

---

## Installation

Le CLI n'est **pas publié sur npm** : il s'installe depuis ce dépôt, puis se
lie en commande globale avec `npm link`. Il faut Node.js 20 ou plus récent.

```bash
git clone https://github.com/beemm-vision/beemmvision-cli.git
cd beemmvision-cli
./setup.sh              # npm install, puis npm link --force
beemmvision --version
```

`setup.sh` s'exécute sous macOS, Linux, Git Bash ou WSL. En PowerShell, lancez
à la place `npm install` puis `npm link --force` dans le dossier cloné.

**Mettre à jour**

```bash
cd beemmvision-cli
git pull && npm install && npm link --force
beemmvision --version
```

**Désinstaller** : `npm rm -g beemmvision-cli`, puis supprimez le dossier cloné.

> `npm link` échoue avec `EACCES` ? Donnez à npm un dossier global dans votre
> home (`npm config set prefix ~/.npm-global`), ajoutez `~/.npm-global/bin` à
> votre `PATH`, rouvrez le terminal et relancez `./setup.sh`.

---

## Connexion

```bash
beemmvision auth login
```

1. Le terminal affiche un **code de session** au format `XXX-XXX` et ouvre votre
   navigateur.
2. La page **« Autoriser le terminal »** affiche le même code. Vérifiez que les
   deux codes sont identiques, puis autorisez (en vous connectant d'abord à
   votre compte si besoin).
3. La page affiche **« Terminal connecté »** avec quelques commandes pour
   démarrer. Le terminal confirme et enregistre la session.

**Si les codes ne correspondent pas, n'autorisez pas** : fermez la page et
interrompez la commande (`Ctrl+C`).

| Option | Effet |
|---|---|
| `--no-open` | N'ouvre pas le navigateur : le lien s'affiche, à ouvrir vous-même. |
| `--timeout-seconds <n>` | Temps laissé pour autoriser dans le navigateur. Défaut 180, maximum 900. |
| `--force` | Refait la connexion même si une session valide existe. |
| `--token <jeton>` / `--firebase-id-token <jeton>` | Enregistre un jeton d'identité sans navigateur (voir plus bas). |

**Durée de la session.** Une connexion par navigateur enregistre deux choses :
votre jeton d'identité et une attestation App Check, qui prouve que la demande
vient d'un vrai navigateur. Les deux durent environ **une heure**. Le CLI peut
tenter de renouveler le jeton d'identité, mais jamais l'attestation : seul le
navigateur peut en produire une. Quand une commande est refusée pour une
attestation expirée, relancez simplement `beemmvision auth login` — le `--force`
n'est pas nécessaire, la commande voit d'elle-même que l'attestation manque.

**Connexion sans navigateur.** `auth login --token <jeton>` ou la variable
`BEEMMVISION_FIREBASE_ID_TOKEN` fournissent un jeton d'identité seul : pas
d'attestation App Check, donc les commandes dont le serveur l'exige (projets,
workflows, crédits) sont refusées, et le jeton n'est pas renouvelable. Un jeton
passé en argument est en outre visible des autres utilisateurs de la machine
(`ps`) le temps de la commande ; le CLI vous en avertit.

---

## Démarrage rapide

```bash
beemmvision auth login                                  # code de session, puis navigateur
beemmvision project list --type workflow                # vos projets workflow
beemmvision project use --project-id <projectId>        # projet courant
beemmvision --json workflow list                        # ses workflows
beemmvision workflow run --workflow-id <workflowId>     # exécuter un graphe
```

Une fois un projet courant défini, `--project-id` devient facultatif sur toutes
les commandes `workflow`.

---

## Référence des commandes

Dans les tableaux, **requis** signale une option obligatoire. `--project-id`
retombe sur le projet courant quand il est omis ; sans projet courant, la
commande échoue avec le code `1`.

> **Sortie humaine.** Certaines commandes n'affichent qu'une ligne de suivi en
> mode humain (`auth whoami`, `config show`, `project current`, `workflow list`,
> `workflow export` sans `--output`, `workflow samy-generate`, `template *`).
> Leur résultat complet est dans `--json`.

### `auth` — session

| Commande | Effet |
|---|---|
| `auth login [options]` | Connexion par navigateur avec code de session (voir [Connexion](#connexion)). |
| `auth whoami` | Origine de la session et état de l'attestation App Check. En `--json` : e-mail, identifiant, expiration du jeton, `appCheck`. Code `2` si aucune session. |
| `auth refresh` | Tente de renouveler le jeton d'identité sans navigateur. En cas d'échec (code `2`), relancez `auth login`. |
| `auth logout` | Supprime la session enregistrée sur cette machine. |

```bash
beemmvision --json auth whoami
```

### `config` — réglages persistants

| Commande | Options | Effet |
|---|---|---|
| `config show` | — | Configuration stockée et configuration effective, avec la source de chaque valeur (`cli`, `env`, `config`, `default`). |
| `config set` | `--app-base-url <url>`, `--functions-base-url <url>` (au moins une) | Enregistre l'adresse de l'application ou du backend. |
| `config clear` | — | Supprime la configuration locale. Ne touche ni à la session ni au projet courant. |

Pour un usage normal, rien à régler : le CLI pointe par défaut vers
`https://app.beemmvision.com`. `--app-base-url` n'accepte qu'une origine
`https://` (ou `http://` sur `localhost`).

```bash
beemmvision config set --app-base-url https://app.beemmvision.com
```

### `project` — projets et projet courant

| Commande | Options | Effet |
|---|---|---|
| `project list` | `--type <board\|workflow>` | Projets accessibles. |
| `project create` | `--name <nom>` **requis**, `--no-set-as-current` | Crée un projet et, par défaut, en fait le projet courant. |
| `project use` | `--project-id <id>` **requis** | Enregistre le projet courant. |
| `project current` | — | Projet courant enregistré (`data.projectId` en `--json`). |
| `project clear` | — | Oublie le projet courant. |

```bash
beemmvision project create --name "Campagne printemps"
```

### `workflow` — graphes

| Commande | Options | Effet |
|---|---|---|
| `workflow list` | `--project-id` | Workflows du projet : identifiant, nom, dates, app activée. |
| `workflow export` | `--workflow-id` **requis**, `--project-id`, `--output <fichier>` | Document JSON portable du workflow. `--output` l'écrit dans un fichier. |
| `workflow import` | `--input <fichier>` **requis**, `--project-id`, `--workflow-id`, `--name`, `--mode <replace\|append>` (défaut `replace`), `--force` | Importe un document portable. Voir le détail ci-dessous. |
| `workflow duplicate` | `--workflow-id` **requis**, `--project-id`, `--name` | Copie un workflow dans le même projet, sous un nouvel identifiant. Nom par défaut : « (Copy) » ajouté. |
| `workflow rename` | `--workflow-id` **requis**, `--name` **requis**, `--project-id` | Renomme un workflow. |
| `workflow run` | `--workflow-id` **requis**, `--project-id` | Exécute le workflow côté serveur et rend ses résultats. **Consomme des crédits.** |
| `workflow watch` | `--workflow-id` **requis**, `--project-id`, `--interval <s>` (défaut 5, max 60) | Surveille un workflow et affiche ses changements. `Ctrl+C` pour quitter. |
| `workflow samy-generate` | voir [Génération par l'Agent](#génération-par-lagent) | Fait composer un graphe par l'Agent Vision, sans l'importer. |
| `workflow generate-and-import` | idem | Fait composer le graphe, puis l'importe dans le workflow cible. |
| `workflow generate-import-run` | idem | Compose, importe, puis exécute. |

**`workflow import`, selon les options :**

| Vous passez | Résultat |
|---|---|
| ni `--workflow-id` ni `--mode append` | Un **nouveau** workflow est créé (`imported-<horodatage>`). Son identifiant est dans `data.workflowId`. |
| `--workflow-id <id>` | Le contenu de ce workflow est **remplacé**. Un avertissement s'affiche, mais l'import a lieu ; `--force` ne fait que le masquer. |
| `--mode append` (avec ou sans `--workflow-id`) | Les nœuds s'ajoutent à droite du graphe existant, avec de nouveaux identifiants. Sans `--workflow-id`, la cible est le workflow `default`. |

`--append` est un ancien alias de `--mode append`.

```bash
beemmvision workflow export --workflow-id default --output ./default.json
beemmvision workflow import --input ./default.json --name "Variante B"
```

**`workflow run`.** En mode humain, le CLI affiche votre solde, une estimation
du coût et, dans un terminal interactif, demande confirmation (`y`) avant de
lancer ; puis un tableau de progression nœud par nœud et les URL des images,
vidéos et textes produits. L'estimation est locale et partielle : c'est le
serveur qui fixe le prix réel. **En `--json`, ni estimation ni confirmation :
l'exécution part directement.**

```bash
beemmvision --json workflow run --workflow-id default | jq -r '.data.run.artifacts[].url'
```

**`workflow watch`** est fait pour un humain. En `--json`, rien n'est écrit tant
que la surveillance tourne ; un agent appellera plutôt `workflow list --json` à
intervalle régulier. Une session invalide ou un workflow introuvable arrêtent la
surveillance avec le code de sortie correspondant ; une panne réseau passagère,
non.

### Génération par l'Agent

Les trois commandes `samy-generate`, `generate-and-import` et
`generate-import-run` demandent à l'Agent Vision de composer un graphe à partir
d'une phrase. **Chaque génération consomme des crédits**, y compris une ronde
où l'Agent répond par des questions.

| Option | Effet |
|---|---|
| `--workflow-id <id>` **requis** | Workflow cible (destination de l'import pour les deux dernières commandes, qui **remplacent** son contenu). |
| `--prompt <texte>` **requis** | Ce que le graphe doit faire. |
| `--project-id <id>` | Projet ; sinon le projet courant. |
| `--workflow-name <nom>` | Nom proposé pour le workflow. |
| `--assistant-mode <mode>` | Moteur de l'Agent : `eco`, `fast`, `premium`, `pro`, `deepseek-v3`, `deepseek-v4-flash`, `deepseek-v4-pro`, `qwen3-32b`, `qwen3-72b`, `qwen25-72b`, `kimi-k3`, `glm-5.2`, `gemini-3.5-flash`, `gemini-3.6-flash`, `minimax-m3`. |
| `--style-preset <preset>` | `default`, `editorial`, `graphic`, `cinematic`. |
| `--generation-strategy <s>` | `standard` ou `dashboard_bootstrap`. |
| `--answers-json <json>` | Réponses aux questions de l'Agent, en objet JSON (`{"idQuestion": "réponse"}`). |
| `--prior-question-rounds <n>` | Nombre de rondes de questions déjà passées. |
| `--output <fichier>` | Écrit le graphe produit dans un fichier JSON portable. |

L'Agent peut répondre par des **questions** au lieu d'un graphe : en `--json`,
`data.response.kind` (ou `data.generation.kind`) vaut alors `questions` et
`imported` vaut `false`. Relancez la commande avec vos réponses dans
`--answers-json` et `--prior-question-rounds 1`.

```bash
beemmvision workflow samy-generate --workflow-id brouillon \
  --prompt "Brief produit, Any LLM, puis une image 1:1" --output ./brouillon.json
```

### `template` — templates communautaires

| Commande | Options | Effet |
|---|---|---|
| `template list` | — | Templates approuvés. |
| `template get` | `--template-id <id>` **requis** | Fiche du template et son document portable. |
| `template clone` | `--template-id <id>` **requis** | Copie le template dans un **nouveau projet** ; `data.projectId` et `data.workflowId` le désignent. |

```bash
beemmvision --json template clone --template-id <templateId>
```

### `credits` — solde

| Commande | Effet |
|---|---|
| `credits` | Solde de crédits de votre compte. Signale un solde bas sous 50. |

En `--json`, le solde est (pour l'instant) imbriqué : lisez `.data.data.credits`.

### `doctor` — diagnostic

| Commande | Effet |
|---|---|
| `doctor` | Contrôle la session, l'attestation App Check, les adresses configurées et le projet courant. Une ligne `OK` ou `FAIL` par contrôle. |
| `doctor --fix` | Enregistre l'adresse par défaut de l'application si aucune n'est configurée, et indique la commande à lancer pour le reste. |

`doctor` sort toujours avec le code `0` : lisez `data.checks[].ok` en `--json`.

---

## Options globales

Elles se placent avant ou après la sous-commande.

| Option | Effet |
|---|---|
| `--json` | Sortie JSON sur stdout (voir ci-dessous). |
| `--transport <auto\|mock\|callable>` | `auto` (défaut) : le backend dès qu'une session existe. `mock` : données fictives, sans réseau ni compte, pour tester un script. `callable` : backend imposé. |
| `--functions-base-url <url>` | Adresse du backend (développement sur émulateurs). |
| `--firebase-id-token <jeton>` | Jeton d'identité pour cette seule commande. |
| `-V`, `--version` | Version installée. |
| `-h`, `--help` | Aide. |

---

## Sortie `--json` (agents et scripts)

Avec `--json`, stdout ne contient **qu'un document JSON**, sans couleur ni
texte de suivi.

```json
{
  "ok": true,
  "command": "workflow.list",
  "data": { "transport": "callable", "projectId": "…", "workflowCount": 2, "workflows": [] },
  "meta": { "timestamp": "2026-11-05T10:00:00.000Z", "logs": [] }
}
```

```json
{
  "ok": false,
  "command": "workflow.list",
  "error": { "type": "validation_error", "message": "projectId is required. Use --project-id or configure a current project with `project use`." },
  "meta": { "timestamp": "2026-11-05T10:00:00.000Z", "logs": [] }
}
```

- `command` reprend le nom de la commande, avec un point : `project.create`,
  `workflow.run`, `template.clone`…
- `error.type` vaut `validation_error`, `auth_error` ou `api_error`, et
  correspond au code de sortie.
- `meta.logs` garde les lignes de suivi qu'aurait affichées le mode humain.
- `--help` et `--version` répondent aussi par `ok: true` (`data.help`,
  `data.version`).

Conseils pour un agent :

- Testez `ok` et le code de sortie, jamais le texte des messages.
- `workflow run` et les trois commandes de génération **dépensent des crédits**
  et ne demandent aucune confirmation en `--json`. Ne les relancez pas en boucle
  sur une erreur sans l'avoir comprise.
- Après un import sans `--workflow-id`, reprenez l'identifiant créé dans
  `data.workflowId`.

---

## Codes de sortie

| Code | Signification |
|---|---|
| `0` | Succès (aide et version comprises). |
| `1` | Validation : option manquante ou invalide, commande inconnue, fichier illisible, projet non défini. |
| `2` | Authentification : pas de session, session expirée, attestation App Check absente ou expirée, accès refusé. |
| `3` | API : erreur du serveur ou backend injoignable. |

Il n'y a pas d'autre code. Un projet ou un workflow introuvable remonte selon la
réponse du serveur, en `1`, `2` ou `3`.

---

## Configuration et fichiers locaux

L'état local vit dans `~/.config/visionboard/` (ou `$XDG_CONFIG_HOME/visionboard/`).
Le dossier garde l'ancien nom du CLI, volontairement.

| Fichier | Contenu | Effacé par |
|---|---|---|
| `auth.json` | Session : jeton d'identité, attestation App Check. Permissions `0600`. | `auth logout` |
| `config.json` | Adresses de l'application et du backend. | `config clear` |
| `project.json` | Projet courant. | `project clear` |

Ordre de priorité pour chaque réglage : option de ligne de commande, puis
variable d'environnement, puis fichier, puis valeur par défaut.

| Variable | Rôle |
|---|---|
| `BEEMMVISION_FIREBASE_ID_TOKEN` | Jeton d'identité, sans passer par `auth login`. |
| `BEEMMVISION_APP_BASE_URL` | Adresse de l'application utilisée par `auth login`. |
| `BEEMMVISION_FUNCTIONS_BASE_URL` | Adresse du backend. |
| `BEEMMVISION_CLI_TRANSPORT` | `auto`, `mock` ou `callable`. |
| `BEEMMVISION_AUTH_FILE`, `BEEMMVISION_CONFIG_FILE`, `BEEMMVISION_PROJECT_FILE` | Emplacement de chacun des trois fichiers. |

---

## Dépannage

**Premier réflexe : `beemmvision doctor`.** Chaque `FAIL` dit quoi faire.

| Symptôme | Cause probable | Que faire |
|---|---|---|
| Code `2`, message qui parle d'App Check | Attestation expirée (au bout d'environ une heure) ou absente. | `beemmvision auth login`. |
| Code `2`, « You must be logged in » | Aucune session sur cette machine. | `beemmvision auth login`. |
| `auth refresh` échoue | Le renouvellement sans navigateur n'a pas abouti. | `beemmvision auth login`. |
| `projectId is required` | Pas de `--project-id` ni de projet courant. | `beemmvision project use --project-id <id>`. |
| Le navigateur ne s'ouvre pas | Machine distante, session SSH, pas de navigateur par défaut. | `auth login --no-open`, puis ouvrez le lien affiché. |
| La connexion expire avant que vous ayez autorisé | Délai de 180 s dépassé. | `auth login --timeout-seconds 600`. |
| Une commande documentée ici est « unknown » ou se comporte autrement | Vous exécutez un ancien clone. | Voir ci-dessous. |

**Quel clone est réellement exécuté ?** Plusieurs clones sur une même machine,
et c'est souvent le plus ancien qui répond :

```bash
readlink -f "$(which beemmvision)"   # chemin réel du CLI lancé
beemmvision --version
```

Allez dans le dossier indiqué, faites `git pull && npm install && npm link --force`,
ou relancez `./setup.sh` depuis le bon clone.

---

## Ce que le CLI ne fait pas

Le CLI travaille sur des **workflows** : il les liste, les importe, les exporte,
les fait composer par l'Agent et les exécute. Il ne fait pas :

- de génération directe d'une image ou d'une vidéo sans workflow ;
- de retouche d'une image existante (agrandissement, détourage, inpainting,
  extension) ;
- de navigation dans la galerie de ce que vous avez déjà produit ;
- de suivi des générations en cours (jobs) ;
- d'édition nœud par nœud d'un graphe, ni de suppression.

Pour tout cela, branchez le **connecteur MCP Beemm Vision** dans votre client IA
(Claude, ChatGPT, Cursor…) avec l'adresse `https://app.beemmvision.com/mcp`.
Il agit avec votre compte, comme l'application.
