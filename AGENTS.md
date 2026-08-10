# Plane × GitHub — règles Beemm

**Plane est la source de vérité produit. GitHub est la source de vérité technique.**

Un projet Plane n'est pas un repository. Une feature peut toucher plusieurs
repos et reste **un seul** work item.

- Ce repo est rattaché au projet Plane **`BV`**.
- Workspace : <https://app.plane.so/beemmvision/>

## ⛔ Périmètre : BeemmVision, et rien d'autre

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

## Avant de commencer

1. Chercher le work item Plane correspondant (serveur MCP `plane`).
2. Lire ses critères d'acceptation.
3. Le passer en `In Progress`.
4. Reprendre son identifiant dans la branche **et** dans le titre de la PR.

```
branche : feat/BV-101-ajout-nouveau-modele
PR      : [BV-101] Ajout du nouveau modèle
```

L'identifiant est reconnu depuis le nom de branche, le titre de la PR, ou une
ligne `Plane: BV-101` dans son corps. Le premier trouvé gagne.

## Pendant le développement

- Respecter les critères d'acceptation.
- Ajouter ou mettre à jour les tests.
- Documenter les décisions importantes.
- Ne jamais annoncer une feature comme livrée avant qu'elle soit en production.

## Pull Request

Titre : `[BV-101] Ajout du nouveau modèle`

La description contient : résumé, fichiers touchés, tests, risques, limites,
captures si pertinent, et les actions de documentation à prévoir.

## Un work item = une FEATURE, jamais une PR

C'est la règle la plus importante de ce fichier.

Une feature se développe souvent en **plusieurs PR** — quatre pour l'éditeur de
calques, quatre pour le corpus légal. Un work item par PR transforme le board
en journal de commits. **Plusieurs PR portent donc le même identifiant**, et
c'est le cas normal.

Conséquence : une PR **sans** identifiant Plane **ne crée rien**. Elle reçoit
un rappel en commentaire, une seule fois. Coder sans ticket reste possible ;
c'est simplement que ça ne remonte pas au board.

Si le travail mérite d'être suivi, **crée le work item** (via le serveur MCP
`plane`) et rattache-lui la PR.

## États

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

## Catégories et affichage

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
