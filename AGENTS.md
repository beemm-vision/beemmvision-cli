# Plane × GitHub — règles Beemm

**Plane est la source de vérité produit. GitHub est la source de vérité technique.**

Un projet Plane n'est pas un repository. Une feature peut toucher plusieurs
repos et reste **un seul** work item.

- Ce repo est rattaché au projet Plane **`BV`**.
- Workspace : <https://app.plane.so/beemmvision/>

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

## Développement spontané, sans work item

**C'est autorisé et ça ne doit pas être ralenti.** À l'ouverture de la PR, le
workflow `plane-sync` crée automatiquement un work item en `In Progress` avec
une description factuelle (PR, branche, volume, fichiers groupés par
répertoire), et réinjecte son identifiant dans le corps de la PR.

Ce filet ne fait qu'enregistrer. **Le travail de l'agent est de l'enrichir** :

- objectif et valeur utilisateur ;
- critères réellement livrés ;
- module et niveau d'impact ;
- risques et limites connues ;
- besoins de documentation, landing, news ou communication.

## États, et la seule règle non négociable

```
Inbox → À qualifier → Ready → In Progress → In Review → À valider → Released
                                     ↕
                              Blocked / Cancelled
```

Les transitions liées aux PR sont automatiques :

| Événement GitHub | État Plane |
|---|---|
| PR ouverte ou rouverte | `In Progress` |
| PR prête pour revue | `In Review` |
| **PR mergée** | **`À valider`** |
| PR fermée sans merge | `Ready` |

> **`merged` ne signifie pas `Released`.** Une PR mergée amène le work item à
> `À valider`. Le passage à `Released` exige une vérification en production et
> reste une décision humaine. Aucune automatisation ne produit `Released`.

## Labels

`type:*` · `origin:*` · `impact:*` · `repo:*` et les labels de communication
(`doc-required`, `landing-required`, `news-required`, `social-candidate`,
`changelog-only`, `internal-only`).

Un work item créé automatiquement depuis une PR porte `origin:github`.
