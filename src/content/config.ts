
import { defineCollection, z } from "astro:content";

// This assumes your posts live in  content/work-log/…
const workLog = defineCollection({
  schema: z.object({
    title: z.string(),
    date:  z.coerce.date(),   // ISO date or YYYY-MM-DD string
    draft: z.boolean().optional(),
  }),
  /* OPTIONAL: If you did NOT move the files under
     content/work-log/, give Astro a loader:
  */
  loader: { base: "./content/work-log", pattern: "*.md" },

});

export const collections = { "work-log": workLog };