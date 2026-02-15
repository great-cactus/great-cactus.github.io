import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    type: z.enum(['paper', 'book', 'patent', 'software']).default('paper'),
    category: z.enum([
      'journal',
      'review',
      'conference-paper',
      'invited',
      'presentation',
    ]).default('journal'),
    cover: image().optional(),
    doi: z.string().optional(),
    award: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      code: z.string().optional(),
      website: z.string().optional(),
      demo: z.string().optional(),
      slides: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    badges: z.array(z.object({
      text: z.string(),
      type: z.enum(['gold', 'blue', 'red', 'green', 'default']).default('default')
    })).optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    order: z.number().default(100),
  }),
});

const honors = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/honors" }),
  schema: z.object({
    title: z.string(),
    award: z.string(),
    date: z.date(),
    year: z.string(),
    type: z.enum(['Challenge Cup', 'Internet+', 'Other']).default('Other'),
    level: z.enum(['Special', 'First', 'Second', 'Third']).default('Third'),
  }),
});

export const collections = {
  publications,
  research,
  honors,
};
