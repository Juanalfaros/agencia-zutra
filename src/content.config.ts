import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Modern Astro 6 Content Layer configuration.
// Silences the "Content config not loaded" warning and prepares for the future.

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const consultoria = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/consultoria' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      date: z.coerce.date(),
      analyst: z.string(),
      description: z.string(),
      category: z.string(),
      imageHeader: image().optional(),
      protected: z.boolean().optional(),
      accessExpiry: z.coerce.date().optional(),
      allowedEmails: z.array(z.string()).optional(),
      adminEmails: z.array(z.string()).optional(),
      slidesEnabled: z.boolean().optional(),
      status: z.string(),
      slides: z
        .array(
          z.object({
            title: z.string(),
            content: z.string(),
            highlight: z.string().optional(),
            type: z.string(),
            image: image().optional(),
            bullets: z.array(z.string()).optional(),
            options: z
              .array(
                z.object({
                  variant: z.string(),
                  title: z.string(),
                  description: z.string(),
                  recommended: z.boolean().optional(),
                  pros: z.array(z.string()).optional(),
                  cons: z.array(z.string()).optional(),
                  ctaText: z.string().optional(),
                })
              )
              .optional(),
            ctaText: z.string().optional(),
            ctaLink: z.string().optional(),
          })
        )
        .optional(),
    }),
});

export const collections = { blog, consultoria };
