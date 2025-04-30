import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { blogSchema, essentialsSchema } from './schemas';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

const essentials = defineCollection({
	loader: glob({ base: './src/content/essentials', pattern: '**/*.{md,mdx}' }),
	schema: essentialsSchema,
});

export const collections = { blog, essentials };
