/**
 * The opening animations the studio can choose between. The one in use is
 * picked in the CMS (Page d'accueil > Animation d'ouverture); every one of
 * them can be previewed at /apercu/<name>.
 */
export const HERO_STYLES = ['trail', 'plein-ecran', 'mur', 'bandeau-haut', 'bandeau-bas', 'typo'] as const;

export type HeroStyle = (typeof HERO_STYLES)[number];

export const heroStyles: Record<HeroStyle, { label: string; description: string }> = {
  trail: {
    label: 'Traînée de photos',
    description:
      "La version actuelle : des photos éclosent autour du titre et suivent la souris quand on la déplace.",
  },
  'plein-ecran': {
    label: 'Plein écran',
    description:
      'Les photos défilent en plein écran derrière le titre, chacune glissant sur la précédente, avec le nom du projet en bas.',
  },
  mur: {
    label: 'Mur de photos',
    description:
      "Des photos de tailles et de formats variés, posées en décalé, dérivent lentement vers le haut ; le titre passe par-dessus. Au survol, une photo s'arrête et mène à son projet.",
  },
  'bandeau-haut': {
    label: 'Bandeau, titre au-dessus',
    description:
      "Le titre, puis un bandeau de photos qui défile en continu. Au survol, le bandeau s'arrête et chaque photo mène à son projet.",
  },
  'bandeau-bas': {
    label: 'Bandeau, titre en dessous',
    description: 'Le même bandeau, placé au-dessus du titre.',
  },
  typo: {
    label: 'Photos dans le titre',
    description: "Le titre en très grand, les photos défilant à l'intérieur des lettres.",
  },
};
