# Le défi: Ton code est OK ou KO ?

Le développement du projet au cours de la Nuit de l'Informatique s'inscrit dans un cycle dynamique de rétroaction où chaque étape dépend de l'engagement actif des membres de l'équipe. Les piliers fondamentaux du projet, tels que le coût, la qualité et le temps, constituent des enjeux cruciaux. Notre défi consiste à établir un environnement opérationnel qui garantisse la santé globale du projet et octroie le pouvoir de prise de décision aux évaluateurs.

L'objectif principal est d'adopter une approche moderne en intégrant la philosophie DevOps et en incorporant des éléments d'automatisation. Ceci vise à rendre les interventions des développeurs plus efficaces, en leur permettant de juger rapidement et précisément le respect des consignes, des spécifications et du code associé. Dans cette perspective, la légèreté des solutions proposées est cruciale, en accord avec le thème principal axé sur le DDRS (Développement, Déploiement, Révision, Surveillance).

Ainsi, le défi ne se limite pas seulement à la réalisation d'un code fonctionnel, mais s'étend à la mise en place d'un système d'évaluation robuste qui intègre des principes DevOps et favorise l'automatisation pour garantir des interventions efficaces et une collaboration fructueuse entre les membres de l'équipe. Dans la section suivante, nous examinerons de plus près les solutions proposées pour atteindre cet objectif.

## Mise en place de l'environnemnt du projet

La plateforme choisi pour le contrôle de version source.



projet de manière à ce que vos camarades puisse valider le code produit durant la nuit de l'informatique via une interface spécifique. Pendant la nuit, vous déposerez une consigne, ou des spécifications et un code associé. Vos camarades pourront dire si le code correspond à la consigne ou si il contient une erreur. Ils auront la possibilité de dire : ‘OK, le code réponds à la consigne’, ‘KO, le code ne correspond pas à la consigne’, ou d'autres message pre enregistrés pour signaler une consigne ou une spécification trop impécise, voire signaler un code illisible du fait du non respect des normes de codage.

- pre commit
  - id: trailing-whitespace
  - id: end-of-file-fixer
  - id: check-yaml
  - id: check-added-large-files
  - id: eslint
- github actions
  - paths
    - web
    - api
  - pull request
    - lint
    - check
    - format
    -
