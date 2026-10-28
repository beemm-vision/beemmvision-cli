#!/bin/sh
# Prépare une copie de travail neuve (worktree) : dépendances, hooks git,
# fichiers .env du checkout principal.
#
#   sh scripts/setup-worktree.sh
#
# Cursor le lance tout seul (.cursor/worktrees.json). Codex : le déclarer comme
# script de préparation de l'environnement local. `scripts/new-worktree.sh`
# l'enchaîne.
set -eu

top=$(git rev-parse --show-toplevel)
cd "$top"

# Un node_modules en LIEN pointe vers un autre checkout : `npm ci` viderait la
# cible, partagée par d'autres sessions. On retire le lien, jamais la cible.
if [ -L node_modules ]; then
  rm node_modules
fi
echo "→ npm ci"
npm ci --no-audit --no-fund --prefer-offline --loglevel=error

node scripts/install-git-hooks.mjs

# Les .env ne sont pas versionnés : copie depuis le checkout principal, sans
# jamais écraser. Jamais .env.production.
main_checkout=$(dirname "$(cd "$(git rev-parse --git-common-dir)" && pwd)")
if [ "$main_checkout" != "$top" ]; then
  for env_file in .env .env.local; do
    if [ -f "$main_checkout/$env_file" ] && [ ! -e "$env_file" ]; then
      cp "$main_checkout/$env_file" "$env_file"
      echo "→ $env_file copié depuis le checkout principal"
    fi
  done
fi

echo "✓ Copie de travail prête : $top"
