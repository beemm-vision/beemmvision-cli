#!/usr/bin/env node
// Installe les garde-fous git de .githooks/ dans les hooks PARTAGÉS du repo
// (<git-common-dir>/hooks) : ils valent pour tous les worktrees, quel que soit
// l'outil qui commite (Claude, Codex, Cursor, terminal).
//
// Lancé par `npm install` (script `prepare`) ; relançable à la main :
//   node scripts/install-git-hooks.mjs
//
// Chaque hook installé est un petit relais : il exécute le .githooks/<hook>
// du worktree courant s'il existe (une mise à jour du hook prend effet dès
// qu'elle est sur la branche), sinon la copie gardée à l'installation (une
// branche ancienne, sans .githooks, reste protégée).
//
// Ne fait jamais échouer une installation : en CI, en image Docker ou hors
// git, il ne fait rien.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOOKS = ['pre-commit', 'pre-push'];
export const MARKER = 'beemm-hooks';

const relay = (hook) => `#!/bin/sh
# ${MARKER} — relais installé par scripts/install-git-hooks.mjs. Ne pas éditer
# ici : la source est .githooks/${hook} dans le repo.
top=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -n "$top" ] && [ -f "$top/.githooks/${hook}" ]; then
  exec sh "$top/.githooks/${hook}" "$@"
fi
fallback="$(dirname "$0")/${MARKER}/${hook}"
[ -f "$fallback" ] && exec sh "$fallback" "$@"
exit 0
`;

function git(args, cwd) {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

export function installGitHooks({ cwd = process.cwd(), env = process.env } = {}) {
  if (env.CI) return { skipped: 'ci' };
  if (env.BEEMM_SKIP_GIT_HOOKS === '1') return { skipped: 'disabled' };
  const top = git(['rev-parse', '--show-toplevel'], cwd);
  if (!top) return { skipped: 'not-a-git-worktree' };
  const source = path.join(top, '.githooks');
  if (!fs.existsSync(source)) return { skipped: 'no-githooks' };

  // --git-path suit core.hooksPath s'il est réglé, sinon <git-common-dir>/hooks.
  const hooksDir = path.resolve(top, git(['rev-parse', '--git-path', 'hooks'], top));
  // core.hooksPath pointe déjà sur .githooks (façon husky) : rien à installer.
  if (hooksDir === source) return { skipped: 'hooks-path-is-source' };

  fs.mkdirSync(path.join(hooksDir, MARKER), { recursive: true });
  const installed = [];
  for (const hook of HOOKS) {
    const src = path.join(source, hook);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(hooksDir, hook);
    // Un hook écrit à la main est gardé à côté, jamais écrasé sans copie.
    if (fs.existsSync(dest) && !fs.readFileSync(dest, 'utf8').includes(MARKER)) {
      const backup = `${dest}.avant-${MARKER}`;
      if (!fs.existsSync(backup)) fs.copyFileSync(dest, backup);
    }
    fs.copyFileSync(src, path.join(hooksDir, MARKER, hook));
    fs.chmodSync(path.join(hooksDir, MARKER, hook), 0o755);
    fs.writeFileSync(dest, relay(hook), { mode: 0o755 });
    fs.chmodSync(dest, 0o755);
    installed.push(hook);
  }
  return { installed, hooksDir };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = installGitHooks();
    if (result.installed?.length) {
      console.log(`git hooks Beemm installés (${result.installed.join(', ')}) dans ${result.hooksDir}`);
    }
  } catch (error) {
    console.warn(`⚠️  git hooks Beemm non installés : ${error.message}`);
  }
}
