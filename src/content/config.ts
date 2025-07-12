// src/content/config.ts
import { defineCollection, z } from "astro:content";

// each log entry must include these fields
const workLog = defineCollection({
  schema: z.object({
    title: z.string(),
    date:  z.date(),
    draft: z.boolean().optional().default(false)  // handy flag
  }),
});

export const collections = { "work-log": workLog };
