#!/bin/sh
# Ouvre une copie de travail neuve, partie d'origin/main à jour, pour un
# ticket Plane, et la prépare (scripts/setup-worktree.sh) :
#
#   sh scripts/new-worktree.sh BV-123 mon-sujet
#   sh scripts/new-worktree.sh BV-123 mon-sujet fix
#
# Branche créée : <type>/BV-123-mon-sujet (type feat par défaut), dans
# .worktrees/BV-123-mon-sujet du checkout principal.
set -eu

usage="usage : sh scripts/new-worktree.sh BV-123 mon-sujet [feat|fix|chore]"
id=${1:?$usage}
slug=${2:?$usage}
kind=${3:-feat}
case "$id" in
  BV-[0-9]*) ;;
  *) echo "Identifiant Plane attendu (BV-123), reçu : $id" >&2; exit 1 ;;
esac

branch="$kind/$id-$slug"
main_checkout=$(dirname "$(cd "$(git rev-parse --git-common-dir)" && pwd)")
dir="$main_checkout/.worktrees/$id-$slug"

git -C "$main_checkout" fetch --quiet origin main
git -C "$main_checkout" worktree add --no-track -b "$branch" "$dir" origin/main
(cd "$dir" && sh scripts/setup-worktree.sh)

echo
echo "Branche $branch prête. Pour y travailler :"
echo "  cd \"$dir\""
