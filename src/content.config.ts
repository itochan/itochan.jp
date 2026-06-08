import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const media = defineCollection({
  loader: file('src/data/media.json'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
  }),
});

export const collections = { media };
