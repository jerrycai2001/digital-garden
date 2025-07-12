// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro:content";

const workLog = defineCollection({
  // grab every Markdown file in /content/vault-publish (outside src/)
  loader: glob({ pattern: "*.md", base: "./content" }),
  schema: z.object({
    title: z.string(),              // required front-matter fields
    date:  z.coerce.date(),         // accepts string or JS Date
    draft: z.boolean().optional(),  // ✽ optional helpers
  }),
});

export const collections = { "work-log": workLog };
