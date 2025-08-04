import { defineCollection, z } from "astro:content";

// workLog/blog constructor
const workLog = defineCollection({
  schema: z.object({
    title: z.string(),
    date:  z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

// projects constructor
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),      // '2025-08-03' etc.
    url: z.string().url().optional(), // live demo / repo
    status: z.enum(['done', 'wip', 'draft']).default('done'),
    tags:  z.array(z.string()).optional(),
    blurb: z.string().optional(),
  }),
});

// publications constructor
const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    outlet: z.string(),        // journal / blog / conf
    date: z.string(),
    url: z.string().url(),
    authors: z.string().optional(),
    tags: z.array(z.string()).optional(),
    blurb: z.string().optional(),
  }),
});

export const collections = { "work-log": workLog };