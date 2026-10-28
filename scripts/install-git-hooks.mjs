#!/usr/bin/env node
// Installe les garde-fous git de .githooks/ dans les hooks PARTAGÉS du repo
// (<git-common-dir>/hooks) : ils valent pour tous les worktrees, quel que soit
// l'outil qui commite (Claude, Codex, Cursor, terminal).
//
// Lancé par `npm install` (script `prepare`) ; relançable à la main :
//   node scripts/install-git-hooks.mjs
//
// Le hook installé est une COPIE, jamais un renvoi vers la branche courante :
// une branche ancienne (ou une PR extérieure qu'on vient de checkouter) ne
// change pas ce qui tourne. Une copie n'est remplacée que par une version
// égale ou plus récente (`# beemm-hooks-version: N`).
//
// Ne touche jamais :
//   - un hook écrit à la main ou posé par un autre outil (husky, git-lfs…) ;
//   - un core.hooksPath réglé hors de ce repo (global, système) ou pointant
//     ailleurs que dans le dossier git du repo.
// Ne fait jamais échouer une installation : en CI, en image Docker ou hors
// git, il ne fait rien.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOOKS = ['pre-commit', 'pre-push'];
const VERSION_RE = /^# beemm-hooks-version: (\d+)$/m;
// Hooks Beemm d'avant BV-454 : remplacés sans façon (le nouveau fait la même chose et plus).
const LEGACY_SIGNATURES = [
  '# pre-commit : scan gitleaks des fichiers stagés',
  '# Garde-fou : empêche tout push DIRECT vers main.',
  '# beemm-hooks — relais installé par scripts/install-git-hooks.mjs.',
];

export function hookVersion(text) {
  const m = VERSION_RE.exec(text);
  return m ? Number(m[1]) : null;
}

function git(args, cwd, env) {
  const r = spawnSync('git', args, { cwd, env, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

function isInside(child, parent) {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

export function installGitHooks({ cwd = process.cwd(), env = process.env } = {}) {
  if (env.CI) return { skipped: 'ci' };
  if (env.BEEMM_SKIP_GIT_HOOKS === '1') return { skipped: 'disabled' };
  const top = git(['rev-parse', '--show-toplevel'], cwd, env);
  if (!top) return { skipped: 'not-a-git-worktree' };
  const source = path.join(top, '.githooks');
  if (!fs.existsSync(source)) return { skipped: 'no-githooks' };

  const commonDir = fs.realpathSync(path.resolve(top, git(['rev-parse', '--git-common-dir'], top, env)));
  // core.hooksPath réglé ailleurs que dans ce repo (global, système) : il
  // vaudrait pour tous les repos de la machine. Hors de question d'y écrire.
  const scope = git(['config', '--show-scope', '--get', 'core.hooksPath'], top, env);
  if (scope && !/^(local|worktree)\s/.test(scope)) return { skipped: 'hooks-path-not-local' };
  const hooksDir = path.resolve(top, git(['rev-parse', '--git-path', 'hooks'], top, env));
  // Réglé dans ce repo mais hors du dossier git (façon husky, ou vers un
  // dossier versionné) : écrire là modifierait des fichiers suivis.
  const realHooksDir = fs.existsSync(hooksDir)
    ? fs.realpathSync(hooksDir)
    : path.join(fs.realpathSync(path.dirname(hooksDir)), path.basename(hooksDir));
  if (!isInside(realHooksDir, commonDir)) return { skipped: 'hooks-path-outside-git-dir' };
  fs.mkdirSync(hooksDir, { recursive: true });

  const installed = [];
  const kept = [];
  for (const hook of HOOKS) {
    const src = path.join(source, hook);
    if (!fs.existsSync(src)) continue;
    const text = fs.readFileSync(src, 'utf8');
    const version = hookVersion(text);
    if (version === null) continue;
    const dest = path.join(hooksDir, hook);
    if (fs.existsSync(dest)) {
      const current = fs.readFileSync(dest, 'utf8');
      const currentVersion = hookVersion(current);
      const legacy = LEGACY_SIGNATURES.some((sig) => current.includes(sig));
      if (currentVersion === null && !legacy) {
        kept.push(hook);
        continue;
      }
      if (currentVersion !== null && currentVersion > version) continue;
    }
    fs.writeFileSync(dest, text, { mode: 0o755 });
    fs.chmodSync(dest, 0o755);
    installed.push(hook);
  }
  // Restes de la première installation BV-454 (relais + copies), sans objet.
  fs.rmSync(path.join(hooksDir, 'beemm-hooks'), { recursive: true, force: true });
  for (const hook of HOOKS) {
    const backup = path.join(hooksDir, `${hook}.avant-beemm-hooks`);
    if (fs.existsSync(backup) && LEGACY_SIGNATURES.some((sig) => fs.readFileSync(backup, 'utf8').includes(sig))) {
      fs.rmSync(backup);
    }
  }
  return { installed, kept, hooksDir };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = installGitHooks();
    if (result.installed?.length) {
      console.log(`git hooks Beemm installés (${result.installed.join(', ')}) dans ${result.hooksDir}`);
    }
    for (const hook of result.kept ?? []) {
      console.warn(`⚠️  ${path.join(result.hooksDir, hook)} existe déjà et n'est pas un hook Beemm : laissé tel quel.`);
      console.warn(`    Pour avoir les garde-fous, intègre .githooks/${hook} à ce hook.`);
    }
    if (result.skipped?.startsWith('hooks-path')) {
      console.warn(`⚠️  git hooks Beemm non installés (${result.skipped}).`);
    }
  } catch (error) {
    console.warn(`⚠️  git hooks Beemm non installés : ${error.message}`);
  }
}
