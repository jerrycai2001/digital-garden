import { defineCollection, z } from "astro:content";

const workLog = defineCollection({
  schema: z.object({
    title: z.string(),
    date:  z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { "work-log": workLog };