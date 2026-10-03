# ebs:projects.studio

Portfolio d'Elina Bouyssou — direction artistique & design graphique, Bordeaux.

Site statique reconstruit à partir de l'ancien site Framer. Aucune dépendance à
un service payant : le site se compile en HTML/CSS/images et s'héberge
gratuitement.

- **Framework** : [Astro](https://astro.build) (sortie 100 % statique)
- **Contenu** : fichiers Markdown dans `src/content/`
- **Images** : optimisées au build (WebP, tailles multiples, `srcset`)
- **JavaScript envoyé au navigateur** : ~2 ko (menu mobile + apparition au scroll)

## Démarrer

```bash
npm install
```

```bash
npm run dev
```

Le site est alors sur http://localhost:4321.

```bash
npm run build
```

Génère le site dans `dist/`. C'est ce dossier qui est mis en ligne.

```bash
npm run preview
```

Sert `dist/` localement, pour vérifier le rendu final avant publication.

## Structure

```
src/
  content/
    projects/        Un fichier .md par projet
    expertises/      Un fichier .md par expertise
  data/site.ts       Contact, réseaux sociaux, clients, étapes du projet
  data/hero.ts       Les animations d'ouverture proposées
  assets/images/     Images sources (haute définition)
  components/        Header, Footer, cartes projet, filtres, page d'accueil
  components/hero/   Les variantes de l'animation d'ouverture
  layouts/Base.astro Structure HTML commune + SEO
  pages/             Routes du site
  styles/global.css  Couleurs, typographie, espacements
public/
  brand/             Favicons et image de partage
  _redirects         Redirections des anciennes URL Framer
  _headers           En-têtes de cache et de sécurité
```

## Modifier le contenu

### Sans toucher au code : l'interface d'édition

Le site a une interface d'administration à l'adresse **`/admin`**
(pendant la phase de test : <https://ebsprojectsstudio.github.io/ebsprojects-studio/admin/>).
Elle s'appuie sur [Sveltia CMS](https://sveltiacms.app) et permet de :

- **ajouter, modifier ou supprimer un projet** — textes, expertises, photos du
  bandeau, galerie avec la largeur et le recadrage de chaque image, liens ;
- **choisir les projets de l'accueil** (« Selected projects ») et leur ordre ;
- **composer le diaporama** du bas de l'accueil : un projet et la photo à
  montrer pour lui ;
- **choisir l'animation d'ouverture** de l'accueil et ses photos. Les six
  variantes se comparent sur `/apercu/` (non référencé par les moteurs de
  recherche) avant d'en mettre une en ligne.

Chaque enregistrement crée un commit sur GitHub ; le site se reconstruit et se
republie tout seul en une à deux minutes. Les photos envoyées sont converties
en WebP et ramenées à 3200 px au plus.

**Connexion.** Il faut un compte GitHub ayant les droits d'écriture sur le
dépôt `ebsprojectsstudio/ebsprojects-studio`. Sur l'écran de connexion,
choisir *Sign In with Token* : un lien ouvre GitHub avec les bonnes
autorisations déjà cochées (*Contents : Read and write* sur ce seul dépôt).
Le jeton est ensuite mémorisé par le navigateur.

Pour qu'Elina ait son propre accès : elle crée un compte GitHub, et le
propriétaire du dépôt l'ajoute dans *Settings → Collaborators*.

### À la main

Les fiches sont des fichiers Markdown :

- `src/content/projects/*.md` — un fichier par projet ; le nom du fichier
  donne l'adresse (`mon-projet.md` → `/projects/mon-projet`) ;
- `src/content/pages/home.md` — l'animation d'ouverture, les projets de
  l'accueil et le diaporama ;
- `src/content/expertises/*.md` — les sept expertises.

Exemple de projet :

```markdown
---
title: "Nom du projet"
client: "Nom du client"
location: "Paris"
services:
  - "Direction Artistique"
  - "Édition"
order: 9
cover: "../../assets/images/mon-projet-01.jpg"
thumb: "../../assets/images/mon-projet-02.jpg"
strip:
  - "../../assets/images/mon-projet-01.jpg"
  - "../../assets/images/mon-projet-02.jpg"
  - "../../assets/images/mon-projet-03.jpg"
grid:
  - src: "../../assets/images/mon-projet-04.jpg"
    span: full
    ratio: "1265 / 859"
  - src: "../../assets/images/mon-projet-05.jpg"
    span: half
    ratio: "613 / 613"
  - src: "../../assets/images/mon-projet-06.jpg"
    span: half
    ratio: "613 / 613"
links:
  - label: "Behance"
    url: "https://…"
---

Le texte de présentation du projet.
```

| Champ      | Rôle                                                                  |
| ---------- | --------------------------------------------------------------------- |
| `order`    | Position dans la page « All projects » (croissant)                    |
| `cover`    | Image de la page Projets et de l'accueil                              |
| `thumb`    | Image dans les pages d'expertise                                      |
| `strip`    | Bandeau qui défile en haut de la page projet (une image ou plus)      |
| `grid`     | Galerie : `span` `full` ou `half`, `ratio` = recadrage de l'image     |
| `services` | Une ou plusieurs des sept expertises, orthographe exacte (voir plus bas) |

Le build refuse une expertise mal orthographiée ou un projet de l'accueil qui
n'existe pas : l'erreur s'affiche au lieu que la page se vide en silence.

### Libellés d'expertise valides

`Direction Artistique`, `Identité Visuelle`, `Illustration`, `Digital`,
`Packaging`, `Édition`, `Signalétique`.

### Modifier les coordonnées, les clients, les étapes du projet

Tout est dans `src/data/site.ts`.

### Modifier les couleurs ou la typographie

Tout est en haut de `src/styles/global.css`, dans le bloc `:root`.

## Mise en ligne

Voir `HEBERGEMENT.md` pour la procédure complète et le choix de l’hébergeur.

En résumé : le site est hébergé par GitHub Pages et se republie tout seul à
chaque `git push` sur `main`. Le site de test tourne sur
<https://ebsprojectsstudio.github.io/ebsprojects-studio/> ; il reste à basculer
le domaine.

## Notes de migration

- Les URL des projets et des expertises sont identiques à l'ancien site, sauf
  quatre qui contenaient un accent : `édition`, `identité-visuelle`,
  `signalétique`, `epeda-collection-dédicace`. Elles sont redirigées vers leur
  version sans accent par des pages générées au build (avec `<link rel=canonical>`,
  donc sans perte de référencement). `public/_redirects` fait la même chose en
  vraies 301 sur Netlify et Cloudflare, mais GitHub Pages ignore ce fichier.
- Les images sources récupérées depuis Framer sont conservées en pleine
  définition dans `src/assets/images/` (~74 Mo). Elles ne sont jamais servies
  telles quelles : le build en produit des versions WebP redimensionnées.
