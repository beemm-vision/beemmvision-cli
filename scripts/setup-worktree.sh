#!/bin/sh
# Prépare une copie de travail neuve (worktree) : dépendances et hooks git.
#
#   sh scripts/setup-worktree.sh
#
# Cursor le lance tout seul (.cursor/worktrees.json). Codex : le déclarer comme
# script de préparation de l'environnement local. `scripts/new-worktree.sh`
# l'enchaîne.
#
# Aucun .env n'est copié : un .env de prod ne doit pas se multiplier dans les
# copies de travail.
set -eu

top=$(git rev-parse --show-toplevel)
cd "$top"

# Dans le checkout principal, `npm ci` viderait les node_modules que d'autres
# worktrees ou sessions utilisent peut-être en ce moment.
main_checkout=$(dirname "$(cd "$(git rev-parse --git-common-dir)" && pwd)")
if [ "$main_checkout" = "$top" ]; then
  echo "✋ Ceci est le checkout principal, pas une copie de travail." >&2
  echo "   Crée-en une : sh scripts/new-worktree.sh BV-123 mon-sujet" >&2
  exit 1
fi

# Un node_modules en LIEN pointe vers un autre checkout : `npm ci` viderait la
# cible, partagée par d'autres sessions. On retire le lien, jamais la cible.
if [ -L node_modules ]; then
  rm node_modules
fi
echo "→ npm ci"
npm ci --no-audit --no-fund --prefer-offline --loglevel=error

node scripts/install-git-hooks.mjs

echo "✓ Copie de travail prête : $top"
