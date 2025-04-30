import { z } from "astro:content";

const tagEnum = z.enum([
    'javascript',
    'typescript',
    'react',
    'vue',
    'angular',
    'svelte',
    'astro',
    'nextjs',
    'css',
    'html',
    'performance',
    'accessibility',
    'seo',
    'testing',
    'mobile',
    'responsive',
    'animation',
    'tooling',
    'state-management',
    'design-systems',
    'webgl',
    'serverless',
    'jamstack',
    'web3',
    'apis',
    'security',
    'devops',
    'career',
    'tutorial',
    'case-study',
    'best-practices',
    'patterns',	
]);
  
const difficultyEnum = z.enum(['beginner', 'intermediate', 'advanced']);

const contentTypeEnum = z.enum(['article', 'tutorial', 'guide', 'reference', 'opinion', 'case-study']);

export const blogSchema = z.object({
    // Basic metadata
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(255),
    excerpt: z.string().max(500).optional(),
    // Dates
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Author information
    author: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        title: z.string().optional(),
        bio: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
    }),

    // Categorization
    tags: z.array(tagEnum).min(1).max(5),
    category: z.enum(['frontend', 'backend', 'fullstack', 'design', 'career', 'tools']).optional(),
    difficulty: difficultyEnum.optional(),
    contentType: contentTypeEnum.optional(),

    // Featured status for highlighting important content
    featured: z.boolean().default(false),

    // Content presentation
    heroImage: z.string().optional(),
    ogImage: z.string().optional(), // Specific image for social media sharing
    thumbnailImage: z.string().optional(), // Smaller image for listings

    // SEO enhancements
    canonical: z.string().url().optional(), // For canonical URLs
    keywords: z.array(z.string()).optional(),
    
    // Readability and engagement metrics
    minutesToRead: z.number().int().positive().optional(),
    
    // Related content
    relatedPosts: z.array(z.string()).optional(), // IDs of related posts
    
    // Series support (for multi-part content)
    series: z.object({
        name: z.string(),
        order: z.number().int().positive(),
    }).optional(),

});