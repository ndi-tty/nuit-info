# Le défi: Ton code est OK ou KO ?

## Introduction

La nuit de l'info se profile comme une opportunité unique où l'innovation et la collaboration convergent. Notre projet vise à catalyser cette expérience en instaurant un processus de validation agile au cours de la nuit .

## Présentation

Le code fourni représente une configuration d'intégration continue (CI) utilisant `GitHub Actions` pour trois parties distinctes de notre projet : une application web (SPA), une API et un conteneur Docker. La CI effectue des vérifications de qualité, de linting et de formatage pour chaque partie du projet et publie un commentaire en fonction sur la pull request.

1. **Web (SPA)** :
   Utilisation de `Node.js` avec le package manager **pnpm** pour gérer les dépendances. Exécution d'ESLint pour le linting.
   Si le linting est réussi, la qualité est marquée et publie un commentaire sur la PR github `OK`, sinon `KO`.

2. **API (Rust)** :
   Utilisation de Rust comme langage.
   Vérification de la construction avec `cargo build`.
   Vérification du formatage avec cargo `fmt --check`.
   Linting avec `cargo clippy`.

   Si la construction, le formatage et le linting réussissent, la qualité est marquée et publie un commentaire sur la PR github `OK`, sinon `KO`.

   Notre API Rust ne se contente pas seulement de vérifier la qualité du code, elle ajoute également une couche d'interaction dynamique avec l'équipe. Lorsqu'un commentaire est publié sur une pull request via le workflow de CI, github déclenche un web hook qui signale à notre API que de nouveaux commentaires sont disponibles. Cela crée un système réactif où chaque publication de commentaire devient un événement signalé au backend.

   Ainsi notre API, agit comme une interface de visualisation des données (dataviz),qui peut alors récupérer ces commentaires en temps réel.

3. **Docker (KICS)** :
   Utilisation de `KICS` (Kubernetes Initial Configuration Security Scanner) pour analyser les fichiers Docker.
   Si l'analyse réussit, la qualité est marquée et publie un commentaire sur la PR github `OK`, sinon `KO`.

4. **PR Comment** :
   Commentaire sur la pull request indiquant la qualité de chaque partie.
   **_NOTE_**: La qualité est déterminée par le succès ou l'échec des étapes précédentes.

5. **Consultation des Commentaires de Pull Request (PR)**:
   Une fonctionnalité clé de notre processus CI est la possibilité de consulter les commentaires générés automatiquement sur les pull requests. Ces commentaires, postés par notre CI, fournissent un retour détaillé sur la qualité de chaque partie du projet. Chaque commentaire reflète le résultat des étapes d'intégration continue, indiquant si le code répond aux normes établies. Un commentaire positif `OK` confirme que le code est conforme, tandis qu'un commentaire négatif `KO` signale des ajustements nécessaires. Cette transparence favorise une collaboration efficace en permettant à chaque contributeur de comprendre et d'améliorer le code en fonction des retours de la CI.

Chaque partie de la CI utilise un ensemble de règles pour déterminer si le code respecte les normes définies. Les résultats de chaque étape sont agrégés et renvoyés dans le commentaire de la pull request. Les résultats sont marqués comme "OK" si toutes les étapes réussissent, sinon "KO".

**Remarques :**

Des caches sont utilisés pour optimiser les temps de construction en conservant les dépendances entre les exécutions.

Les versions spécifiques des outils (Node.js, pnpm, Rust, KICS) sont utilisées pour assurer la reproductibilité.

Des vérifications supplémentaires pourraient être ajoutées selon les besoins du projet, telles que des tests unitaires ou des tests d'intégration.

Ce script CI assure une validation continue du code tout au long du processus de développement, contribuant ainsi à maintenir une qualité élevée du code source.
