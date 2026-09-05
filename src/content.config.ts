import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema. Existing posts are normalized through
	// src/utils/taxonomy.ts so legacy tag spellings do not create duplicate tag pages.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			category: z.enum(['buying-guides', 'reviews', 'learn', 'deals']).optional(),
			priceRange: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus', 'all-prices']).optional(),
		}),
});

export const collections = { blog };
