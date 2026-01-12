# Architecture observée

## Découpage du code

En dehors de l'`AppComponent` on retrouve un gros `component` par page.
Celui-ci contient l'intégralité du code de chaque page.

- Les `chart` :
    La construction d'un `chart` est systématiquement définie dans une méthode `buildChart`.
    Cela démontre qu'il s'agit d'une logique de code à part entière, qui sert à la génération d'un sous élément d'une page.
    Un chart devrait donc faire l'objet d'un `component` séparé.
- Récupération des données :
    Les données ne sont pas accessibles via un service, mais directement dans la page.
    Cela multiplie inutilement les appels HTTP (Un par page malgré une Single Page Application) et complexifie la gestion des erreurs.

## Duplication du code

- Les indications au dessus des `chart` :
    - Titre blanc sur fond bleu-vert.
    - Paire clé (grise) / valeur (noir) sur fond blanc encadré bleu-vert.
- Le lien de retour vers la page d'accueuil.

## Autres

- Absence de typage des données `any` lors de la récupération des données.
- Présences de `console.log` pour la gestion des erreurs.
- Abonnement à un observable longue durée `this.route.paramMap.subscribe()` sans désabonnement dans le `CountryComponent`.