import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** The seven expertises, spelled exactly as the expertise pages expect. */
export const SERVICES = [
  'Direction Artistique',
  'Identité Visuelle',
  'Illustration',
  'Digital',
  'Packaging',
  'Édition',
  'Signalétique',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** Displayed as-is; uppercased by CSS where the design calls for it. */
      title: z.string(),
      client: z.string(),
      location: z.string(),
      /** Restricted to the known list: a misspelt label would silently drop
          the project from its expertise page. */
      services: z.array(z.enum(SERVICES)).nonempty(),
      /** Position in the full projects grid. */
      order: z.number(),
      /** Crop used in the projects grid and on the home page. */
      cover: image(),
      /** Alternate crop used in the expertise listings. */
      thumb: image(),
      /** The scrolling band at the top of the project page. */
      strip: z.array(image()).min(1),
      /** The grid below it. Each slot's span and crop ratio were measured on
          the original site — they are imposed by the layout, not the image. */
      grid: z
        .array(
          z.object({
            src: image(),
            span: z.enum(['full', 'half']),
            /** CSS aspect-ratio, e.g. "1265 / 859". */
            ratio: z.string(),
          })
        )
        .nonempty(),
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
    }),
});

const expertises = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/expertises' }),
  schema: z.object({
    title: z.string(),
    /** Two-digit index shown next to the heading. */
    index: z.string(),
    order: z.number(),
    /** Must match the label used in project `services`. */
    service: z.enum(SERVICES),
  }),
});

/**
 * Editorial choices for the home page, kept apart from the projects
 * themselves so the studio can change what is featured without touching a
 * project's own page.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      /** "Selected projects", in display order. */
      selected: z.array(reference('projects')).min(1),
      /** The slideshow above the footer: a project, and the photograph shown for it. */
      slider: z
        .array(
          z.object({
            project: reference('projects'),
            image: image(),
          })
        )
        .min(1),
    }),
});

export const collections = { projects, expertises, pages };
