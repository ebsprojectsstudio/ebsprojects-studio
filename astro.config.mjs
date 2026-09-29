// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pendant la phase de test, GitHub Pages sert le site sous un sous-dossier
// (…github.io/ebsprojects-studio/). Ces deux variables sont posées par le
// workflow de déploiement ; en production, sur le domaine final, elles sont
// absentes et les valeurs par défaut ci-dessous s'appliquent.
const site = process.env.ASTRO_SITE ?? 'https://ebsprojects.studio';
const base = process.env.ASTRO_BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  // The /apercu/ previews are for the studio only.
  integrations: [sitemap({ filter: (page) => !page.includes('/apercu') })],
  image: {
    // Generated at build time — no external image service, no runtime cost.
    responsiveStyles: true,
  },
  build: { inlineStylesheets: 'auto' },
  // Legacy Framer URLs that carried accents. Kept so old links and search
  // results keep resolving after the migration. Astro applies `base` to the
  // source route but not to the target, so the target is prefixed here.
  redirects: Object.fromEntries(
    Object.entries({
      '/projects/expertises/édition': '/projects/expertises/edition',
      '/projects/expertises/identité-visuelle': '/projects/expertises/identite-visuelle',
      '/projects/expertises/signalétique': '/projects/expertises/signaletique',
      '/projects/epeda-collection-dédicace': '/projects/epeda-collection-dedicace',
    }).map(([from, to]) => [from, base.replace(/\/$/, '') + to])
  ),
});
