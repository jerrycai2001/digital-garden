import { defineCollection, z } from "astro:content";

const workLog = defineCollection({
  schema: z.object({
    title: z.string(),
    date:  z.coerce.date(),
    draft: z.boolean().optional(),
  }),
  // Loader omitted → Astro defaults to `content/work-log/**/*`
});

export const collections = { "work-log": workLog };

