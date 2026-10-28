# Git hooks — garde-fous communs à tous les agents

Ces hooks protègent le repo quel que soit l'outil qui commite ou pousse
(Claude Code, Codex, Cursor, terminal). Règles détaillées : `AGENTS.md`.

| Hook | Refuse | Contournement |
|---|---|---|
| `pre-commit` | un commit sur `main` ; un secret détecté par gitleaks | `git commit --no-verify` |
| `pre-push` | un push vers `main` (ou sa suppression) ; une branche en retard sur `origin/main` | `BEEMM_SKIP_SYNC_CHECK=1 git push …` (retard seul) |

`pre-push` rappelle aussi l'identifiant Plane (`BV-123`) quand la branche n'en
porte pas, sans bloquer.

## Installation

Une fois par clone de développement (pas d'installation automatique : le
`npm install` des utilisateurs du CLI ne doit rien poser dans leur clone) :

```bash
node scripts/install-git-hooks.mjs
```

Le script **copie** chaque hook dans les hooks partagés du repo (`.git/hooks`,
communs à tous les worktrees). C'est cette copie qui tourne, quelle que soit la
branche : une branche ancienne ou une PR extérieure ne change pas ce qui
s'exécute. Une copie n'est remplacée que par une version égale ou plus récente
(`# beemm-hooks-version: N` en tête du fichier) : **modifier un hook = monter
ce numéro**.

L'installeur ne touche jamais un hook posé par un autre outil (husky, git-lfs…)
ni un `core.hooksPath` réglé hors du repo. En CI et en image Docker, il ne fait
rien.

Copie à l'identique des hooks du repo principal, qui porte leurs tests.
