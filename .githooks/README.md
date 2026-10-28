# Git hooks — garde-fous communs à tous les agents

Ces hooks protègent le repo quel que soit l'outil qui commite ou pousse
(Claude Code, Codex, Cursor, terminal). Règles détaillées : `AGENTS.md`.

| Hook | Refuse | Contournement |
|---|---|---|
| `pre-commit` | un commit sur `main` ; un secret détecté par gitleaks | `git commit --no-verify` |
| `pre-push` | un push vers `main` ; une branche en retard sur `origin/main` | `BEEMM_SKIP_SYNC_CHECK=1 git push …` (retard seul) |

## Installation (une fois par clone de développement)

```bash
node scripts/install-git-hooks.mjs
```

Le script pose un petit relais dans `.git/hooks` (commun à tous les
worktrees), qui exécute le hook `.githooks/` du worktree courant. Un hook écrit
à la main est sauvegardé en `<hook>.avant-beemm-hooks`.

Ces fichiers sont des copies à l'identique de ceux du repo principal, qui
porte leurs tests.
