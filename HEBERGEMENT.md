# Hébergement et mise en ligne

Plan de sortie de Framer pour `ebsprojects.studio`.

**État au 3 octobre 2026 :** le site est passé en mode domaine (fichier
`public/CNAME`, variables de test retirées du workflow). Il reste à régler le
domaine dans GitHub et les DNS chez IONOS (étapes 6 et 7 ci-dessous).

## Point de départ

Relevé DNS / RDAP du 29 août 2026 :

| Élément        | Où                                 | Action             |
| -------------- | ---------------------------------- | ------------------ |
| Nom de domaine | IONOS SE — expire le 25/04/2027    | Rien, on le garde  |
| Serveurs DNS   | `ns10xx.ui-dns.*` (IONOS)          | Rien, ils restent  |
| Site web       | `31.43.160.6`, `sites.framer.app`  | À remplacer        |
| E-mail (MX)    | `mx00.ionos.fr`, `mx01.ionos.fr`   | **Ne pas toucher** |

Le domaine n'appartient pas à Framer : Framer héberge seulement les pages.
Quitter Framer revient à changer où pointe le domaine. Aucun transfert
nécessaire.

## Hébergeur retenu : GitHub Pages

| Plateforme           | Bande passante           | DNS déplacé ? | Coût        |
| -------------------- | ------------------------ | ------------- | ----------- |
| **GitHub Pages**     | 100 Go/mois (indicatif)  | **non**       | **0 €**     |
| Cloudflare Pages     | illimitée                | oui, en totalité  | 0 €         |
| Netlify              | ~15 Go/mois (crédits)    | non           | 0 €         |
| o2switch, Infomaniak | illimitée                | non           | ~5–8 €/mois |

GitHub Pages sert le domaine nu via de simples enregistrements A : **le DNS
reste chez IONOS et les enregistrements MX de la messagerie ne sont jamais
déplacés**. C'est le seul risque réel de la migration, et il disparaît.

Cloudflare offre une bande passante illimitée mais exige de lui confier les
serveurs de noms, donc de déplacer aussi la messagerie. Netlify plafonne autour
de 15 Go/mois depuis son passage aux crédits.

> **Contrepartie.** Sur le plan gratuit, GitHub Pages n'accepte que les dépôts
> publics. Le dépôt a donc été rendu public : il ne contient que ce qui est déjà
> visible sur le site, et aucun secret (vérifié avant publication).

## Ce qui est déjà en place

1. **Dépôt** — <https://github.com/ebsprojectsstudio/ebsprojects-studio>
2. **Workflow** — `.github/workflows/deploy.yml` reconstruit et republie le site
   à chaque push sur `main`
3. **Site de test** — <https://ebsprojectsstudio.github.io/ebsprojects-studio/>

## Étapes restantes

### 4. Relire le site de test

Parcourir les 8 projets, les 7 expertises, tester sur téléphone. C'est le moment
des corrections, tant que le domaine pointe encore vers Framer.

### 5. Passer le site en mode domaine

Deux modifications :

```bash
echo "ebsprojects.studio" > public/CNAME
```

Puis, dans `.github/workflows/deploy.yml`, supprimer les deux lignes du bloc
`env:` marquées « PHASE DE TEST » :

```yaml
          ASTRO_SITE: https://ebsprojectsstudio.github.io
          ASTRO_BASE: /ebsprojects-studio
```

Committer et pousser — le site cesse d'être servi sous un sous-dossier.

### 6. Changer les enregistrements DNS chez IONOS

Remplacer **uniquement** les lignes du site web :

| Type    | Nom   | Valeur                        |
| ------- | ----- | ----------------------------- |
| `A`     | `@`   | `185.199.108.153`             |
| `A`     | `@`   | `185.199.109.153`             |
| `A`     | `@`   | `185.199.110.153`             |
| `A`     | `@`   | `185.199.111.153`             |
| `CNAME` | `www` | `ebsprojectsstudio.github.io` |

Supprimer les anciennes lignes `A` vers `31.43.160.6` / `31.43.161.6` et le
`CNAME www` vers `sites.framer.app`.

> **Ne pas toucher** aux enregistrements `MX` (`mx00.ionos.fr`,
> `mx01.ionos.fr`) ni aux `TXT` (SPF, DKIM). Ils font fonctionner la messagerie
> et n'ont aucun rapport avec le site web.

Propagation : de quelques minutes à 24 h. Pendant ce temps, Framer continue de
répondre.

### 7. Activer le domaine et le HTTPS

Dans *Settings → Pages → Custom domain*, saisir `ebsprojects.studio`. Une fois
la vérification passée, cocher **Enforce HTTPS**. Le certificat est émis et
renouvelé automatiquement.

### 8. Résilier Framer

Attendre 48 h de site en ligne sans anomalie, vérifier qu'un e-mail envoyé à
l'adresse du domaine arrive bien, puis résilier.

## Vérifications avant de résilier

- [ ] Les 8 pages projet s'affichent, images comprises
- [ ] Les 7 pages d'expertise listent les bons projets
- [ ] Le menu fonctionne sur téléphone
- [ ] Les liens e-mail et téléphone ouvrent l'application attendue
- [ ] Un e-mail envoyé à l'adresse du domaine arrive toujours
- [ ] Le cadenas HTTPS s'affiche sur le domaine nu **et** sur `www`
- [ ] Le formulaire de contact est activé (voir plus haut) et un message de test arrive
- [ ] Une ancienne adresse accentuée redirige correctement, par exemple
      `/projects/expertises/édition`

## Formulaire de contact

La page `/contact` envoie ses messages par [FormSubmit](https://formsubmit.co),
gratuit et sans compte : chaque message est transféré à
`ebsprojects.studio@gmail.com`.

**À faire une fois :** envoyer un premier message de test depuis le site.
FormSubmit répond par un e-mail d'activation à cette adresse ; cliquer sur le
lien. Tant que ce n'est pas fait, les messages ne sont pas délivrés.

Pour changer de service plus tard, seules deux lignes sont à modifier, dans
`src/data/site.ts` (`contactForm`).

## Coût après migration

Le renouvellement du domaine chez IONOS, une fois par an, environ 20–30 €.
Rien d'autre : hébergement, HTTPS, mises en ligne et bande passante sont
gratuits.

## Changer d'hébergeur plus tard

Le site est un dossier de fichiers statiques : il fonctionne partout.
`netlify.toml`, `wrangler.toml`, `public/_redirects` et `public/_headers` sont
déjà présents pour Netlify et Cloudflare. Pour un hébergeur classique, lancer
`npm run build` et téléverser le contenu de `dist/` par FTP.

---

*Relevés DNS et RDAP effectués le 29 août 2026. Les limites des offres gratuites
évoluent : vérifier la documentation de GitHub Pages avant de vous engager. Les
quatre adresses IP ci-dessus sont celles publiées par GitHub ; les confirmer
dans leur documentation au moment de la bascule.*
