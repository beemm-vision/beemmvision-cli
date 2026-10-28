# beemmvision-cli — règles pour tous les agents

Ce fichier est **la** source des règles de ce repo, pour Claude Code, Codex,
Cursor et les humains. Codex et Cursor le lisent tel quel ; Claude Code le lit
par `CLAUDE.md` (qui ne contient que `@AGENTS.md`).

⚠️ **Ce repo est public.** Rien d'interne ici : ni secret, ni nom de machine,
ni adresse d'infrastructure, ni donnée de client, ni détail de sécurité.

Ce repo distribue le CLI Beemm Vision (`beemmvision`, alias `visionboard`).
`index.js` est un **bundle construit** : son code source vit dans le repo
principal de Beemm Vision, et c'est là qu'on le modifie. Ici, on ne fait que
remplacer `index.js` par un nouveau bundle, monter la version dans
`package.json` (et celle qu'affiche `beemmvision --version`), et tenir le
`README.md` à jour.

## Le parcours

1. **Ticket Plane** (projet `BV`) : le même que celui du changement dans le
   repo source.
2. **Copie de travail neuve**, partie d'`origin/main` à jour :
   ```bash
   sh scripts/new-worktree.sh BV-123 mon-sujet
   ```
3. **Vérifier le bundle** avant la PR : `npm ci`, puis
   `node index.js --version` et `node index.js --help`.
4. **Synchroniser puis pousser** :
   ```bash
   git fetch origin main
   git rebase origin/main
   git push -u origin HEAD
   ```
   Branche déjà poussée et rebasée : `git push --force-with-lease origin HEAD`
   (jamais `--force`, jamais `git pull`, qui remettrait les anciens commits).
5. **PR** titrée `[BV-123] Description`. Ce repo n'a pas de CI de build : la
   PR est relue, puis mergée en merge classique (`gh pr merge <n> --merge`).
6. **Après le merge** : `git worktree remove .worktrees/BV-123-mon-sujet`, puis
   `git branch -d feat/BV-123-mon-sujet`.

## Garde-fous (hooks git)

Pas d'installation automatique ici (le `npm install` des utilisateurs ne doit
rien poser dans leur clone). Une fois par clone de développement (le script
copie les hooks : une PR extérieure checkoutée ne change pas ce qui tourne) :

```bash
node scripts/install-git-hooks.mjs
```

| Hook | Refuse | Contournement |
|---|---|---|
| `pre-commit` | un commit sur `main` ; un secret détecté par gitleaks | `git commit --no-verify` (dernier recours) |
| `pre-push` | un push vers `main` ; une branche en retard sur `origin/main` | `BEEMM_SKIP_SYNC_CHECK=1` pour le retard seul |

## Plane — règles (projet BV)

**Plane est la source de vérité produit. GitHub est la source de vérité technique.**

Un projet Plane n'est pas un repository. Une feature peut toucher plusieurs
repos et reste **un seul** work item. Ce repo est rattaché au projet Plane
**`BV`**. Workspace : <https://app.plane.so/beemmvision/>

### ⛔ Périmètre : BeemmVision, et rien d'autre

**Toute action sur Plane porte sur le projet `BV` (BeemmVision) et sur lui
seul.** Ce n'est pas une préférence, c'est une limite.

- Ne créer, modifier, déplacer ni supprimer **aucun** work item, label, état,
  module, cycle ou vue **en dehors de `BV`**.
- Les projets **`PB` (Photobeemm)** et **`LAB`** existent dans le workspace mais
  sont **hors périmètre**. Ne pas y toucher — pas même pour « harmoniser »,
  « corriger une incohérence » ou « pendant qu'on y est ».
- Les repos **`photobeemm-*`** sont hors périmètre : aucune PR, aucun workflow,
  aucun secret, aucun fichier, aucune branche.
- Une demande formulée en termes généraux (« nettoie les labels », « ajoute la
  catégorie partout », « corrige les vues ») s'entend **BV uniquement**.

**Si une demande implique de modifier quoi que ce soit hors de `BV` : s'arrêter
et demander avant d'agir.** Ne jamais l'inférer, ne jamais l'étendre de
soi-même, même quand le changement paraît évident ou anodin.

### Identifiant, branche, PR

```
branche : feat/BV-101-ajout-nouveau-modele
PR      : [BV-101] Ajout du nouveau modèle
```

L'identifiant est reconnu depuis le nom de branche, le titre de la PR, ou une
ligne `Plane: BV-101` dans son corps. Le premier trouvé gagne.

La description de PR contient : résumé, fichiers touchés, tests (avec
chiffres), risques, limites, captures si pertinent, et les actions de
documentation à prévoir.

### Un work item = une FEATURE, jamais une PR

C'est la règle la plus importante de cette section.

Une feature se développe souvent en **plusieurs PR** — quatre pour l'éditeur de
calques, quatre pour le corpus légal. Un work item par PR transforme le board
en journal de commits. **Plusieurs PR portent donc le même identifiant**, et
c'est le cas normal.

Conséquence : une PR **sans** identifiant Plane **ne crée rien**. Elle reçoit
un rappel en commentaire, une seule fois. Si le travail mérite d'être suivi,
**crée le work item** (serveur MCP `plane`) et rattache-lui la PR.

### États

```
Inbox → À qualifier → Ready → In Progress → In Review → Released
                                   ↕
                            Blocked / Cancelled
```

| Événement GitHub | État Plane |
|---|---|
| PR ouverte ou rouverte | `In Progress` |
| PR prête pour revue | `In Review` |
| **PR mergée** | **`Released`** |
| PR fermée sans merge | `Ready` |

> Une feature portée par plusieurs PR passera `Released` dès la première
> mergée — aucune automatisation ne peut deviner laquelle est la dernière. Si
> ce n'est pas fini, on rétrograde à la main.

### Catégories et affichage

Les *Work item types* de Plane exigent un plan supérieur. Le type est donc
porté par un **emoji en tête de titre**, et le domaine par le **module**.

En créant un work item : emoji en tête du titre **et** label correspondant.

| Emoji | Label |
|---|---|
| ✨ | `✨ Feature` |
| 🎨 | `🎨 Design` |
| 🐛 | `🐛 Bug` |
| 🧊 | `🧊 Infrastructure` |
| 🤖 | `🤖 Modèle` |
| 🔧 | `🔧 Amélioration` |
| 🔬 | `🔬 Experiment` |
| 💡 | `💡 Inspiration` |
| 🔍 | `🔍 Audit` |

Les labels sont **masqués à l'affichage** — ils servent à filtrer les vues, pas
à décorer les cartes. Garde-les rares : une catégorie, et c'est tout. Pas de
label `repo:*`, le repo se lit sur la PR.
