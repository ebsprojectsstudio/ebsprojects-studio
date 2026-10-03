/**
 * Single source of truth for everything that is not a project or an expertise.
 * Editing this file changes the whole site — no template hunting required.
 */

export const site = {
  name: 'ebs:projects.studio',
  shortName: 'ebs:projects',
  url: 'https://ebsprojects.studio',
  title: 'ebs:projects.studio',
  description: 'Direction Artistique & Design Graphique à Bordeaux',
  locale: 'fr_FR',
  lang: 'fr',
  /** Shown in the footer. The original site stamps 2025, not the current year. */
  copyrightYear: 2025,
  tagline: 'Creative Design Studio',
  // Hyphens, not em dashes — as on the original site.
  subtitle: 'Direction Artistique & Design Graphique - Bordeaux - FR',
} as const;

export const contact = {
  name: 'Elina Bouyssou',
  role: 'Directrice artistique & Designer graphique',
  email: 'ebsprojects.studio@gmail.com',
  phone: '+336 87 40 20 93',
  /** Spaced form used in the footer. */
  phoneDisplay: '+336 87 40 20 93',
  phoneHref: '+33687402093',
  city: 'Bordeaux',
  country: 'France',
  bio: `Directrice artistique et Designer Graphique indépendante à Bordeaux. À travers mon studio, je crée des projets visuels sur mesure pour marques et institutions, en privilégiant sens, esthétique et impact. Chaque projet est une aventure humaine et créative. Pour collaborer ou échanger sur votre projet, n’hésitez pas à me contacter.`,
  /** Phrases set brighter than the rest of the paragraph, as on the original. */
  bioEmphasis: [
    'projets visuels sur mesure',
    'sens, esthétique et impact',
    'aventure humaine et créative',
    'collaborer ou échanger sur votre projet',
  ],
} as const;

/** Order matches the footer bar on the original site. */
/**
 * Where the contact form sends its messages: Web3Forms, which forwards each
 * one to the address the access key was created with (the studio's Gmail).
 * The key is public by design — it can only send messages to that address.
 * FormSubmit, used before, accepted messages without delivering them.
 */
export const contactForm = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: 'adfe949d-12c0-4e90-8b1f-ca94a4029448',
} as const;

export const socials = [
  { label: 'LinkedIn', url: 'https://fr.linkedin.com/in/elina-bouyssou-13687aa9' },
  { label: 'Instagram', url: 'https://www.instagram.com/ebsprojects.studio/' },
  { label: 'Behance', url: 'https://www.behance.net/ebsprojects?locale=fr_FR' },
] as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Projets', href: '/projects' },
  { label: 'Expertises', href: '/#expertises' },
  { label: 'Contact', href: '/contact' },
] as const;

export const clients = [
  'Adidas',
  'Epeda',
  'Loft Babies',
  'Black & White Burger',
  'Heineken',
  'La Mort Subite',
  'Terra Delyssa',
  'Hervé Robin',
] as const;

/** Listed in the footer. "Story Board" has no dedicated page, as on the original site. */
export const footerExpertises = [
  'Direction Artistique',
  'Digital',
  'Édition',
  'Identité Visuelle',
  'Illustration',
  'Packaging',
  'Signalétique',
  'Story Board',
] as const;

export const process = [
  {
    title: 'Apprenons à nous connaitre',
    body: `Apprendre à connaître votre histoire et à savoir comment la raconter. Conseils sur les différents supports de communication pour réaliser votre projet, qu’il soit imprimé ou digital. Élaboration collaborative du brief pour définir les besoins et objectifs.`,
  },
  {
    title: 'Analyse & Stratégie',
    body: `Collectes d’informations sur la marque. Suite au brief, la création d’un document regroupant l’analyse et la stratégie de la marque est réalisée. Plus en détails, elle explique votre histoire et vos valeurs, le fonctionnement et le positionnement de l’entreprise, la cible, les éléments graphiques à respecter, les supports de communication etc. Cette étape est la fondation du projet, elle sert de référence tout au long du processus.`,
  },
  {
    title: 'Recherches d’axes graphiques',
    body: `Propositions de plusieurs univers graphiques par le biais de croquis et de moodboards. Travail de recherche sur la typographie, les couleurs, la texture, forme, illustrations, packaging, composition etc.`,
  },
  {
    title: 'Création du contenu',
    body: `Suite à un axe graphique sélectionné, la création du contenu peut commencer. Plusieurs propositions graphiques sont réalisées.`,
  },
  {
    title: 'Finalisation',
    body: `Réglage des derniers détails. Déclinaison sur d’autres supports de communication selon la demande.`,
  },
  {
    title: 'Livraison',
    body: `Livraison du contenu avec les divers formats adaptés pour sa diffusion.`,
  },
] as const;

/** Service label -> expertise page slug. Keeps project frontmatter human-readable. */
export const serviceSlugs: Record<string, string> = {
  'Direction Artistique': 'direction-artistique',
  'Identité Visuelle': 'identite-visuelle',
  Illustration: 'illustration',
  Digital: 'digital',
  Packaging: 'packaging',
  Édition: 'edition',
  Signalétique: 'signaletique',
};
