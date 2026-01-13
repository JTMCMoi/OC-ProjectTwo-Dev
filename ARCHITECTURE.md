# Architecture

L'application est principalement découpée en 4 types d'éléments, chacuns regroupés dans un sous dossier du même nom :
- Les `components`.
- Les `pages`.
- Les `services`.
- Les `models`.

## Les components

Les `components` présents dans ce dossier sont les components `standalone` servant à la construction des différentes pages.

Dans l'application présente, ce sont des composants d'affichage,
dans lequel on injecte grâce au décorateur `Input` les différentes valeurs à afficher.

On peut distinguer les `chart` servant à isoler la logique de code de génération des graphiques à l'aide de `Chart.js`.
Il suffit alors de leur passer les données correspondantes,
puis d'utiliser la balise du `component` dans le `template` de la `page` en liant les valeurs grâce aux attributs.

Il y a également le `header` dans le but d'éviter de la répétition de code entre les pages comportant un graphique.
Il permet d'afficher un titre pour la page courante (Distinct de celui de l'application).
C'est l'élément qui apparait centré dans un encadré sur fond bleu-vert.
Il permet également d'afficher les autres statistiques au dessus du graphique.
Ce sont les éléments placés centrés sous le titre de la page sur fond blanc avec un contour bleu-vert.

## Les models

Les `models` sont des `interface` TypeScript décrivant des objets retournés par un ou plusieurs `service`.

Dans l'application actuelle, il n'y a qu'un seul `DataService`.
Il retourne des objets de type `Olympic` qui contiennent des objets de type `Participation`.

Ces deux types d'objets représentent les deux niveaux hiérarchiques du modèle de données au format JSON :
```json
[
  {
    "id": 1,
    "country": "Italy",
    "participations": [
      {
        "id": 1,
        "year": 2012,
        "city": "Londres",
        "medalsCount": 28,
        "athleteCount": 372
      },
```

## Les pages

Les `pages` représentent les différentes pages au sens internet de l'application.
Ce sont donc des `component` affichables par le biais d'une route.

Leur affichage est injecté dans le template du `AppComponent` par le `router-outlet`,
et les routes sont définies dans le `AppRoutingModule`, conforméments aux standards Angular.

Elles sont aux nombre de 3 :
- `country` : Affiche les résultats des différentes participations d'un pays donné (via l'URL).
- `home`: Affiche les statistiaques globales des JOs (nombre de JOs, nombre de pays, graphique des médailles totales par pays).
- `not-found` : Page affichant un message d'erreur pour les URLs ne correspondant à aucune page.

## Les services

Les `services` permettent de centraliser l'accès aux données de l'application.

L'application présente ne dispose qu'une seule source de données par conséquent elle dispose d'un seul service : `DataService`.

De par sa nature de `service` Angular, il s'agit d'un objet de design pattern `singleton`.

Les données sont récupérées via une requête HTTP GET qui renvois un résultat au format JSON.
Ici les données proviennent d'un mock, mais il est très facile de les obtenir via une API distante.
Il suffit pour cela de changer l'URL source dans le service :
```TypeScript
private url = './assets/mock/olympic.json';
```

Un appel HTTP GET avec Angular fourni un résultat observable froid qui ne nécessite pas de désabonnement.
L'utilisation de `shareReplay(1)` dans le `pipe` permet de garder le dernier jeu de valeur,
et de le distribuer à tous les souscripteurs sans générer de nouvelle requête HTTP.
Il serait également très facile de simuler un appel à une API avec latence par l'utilisation dans le `pipe` de `delay`.

Le service retourne les données sous forme d'objets `observables` dont la structure est définie par les `models`.

La HttpErrorResponse a été interceptée et ré-émise en erreur classique,
afin de garder toute notion de HTTP encapsuléee dans le `service` et d'utiliser une `Error` standard dans les `component`.
```TypeScript
catchError((r:HttpErrorResponse) => throwError(() => new Error(`Erreur on getting datas (${r.message})`))) 
```