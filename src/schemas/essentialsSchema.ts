import { z } from 'astro:content';

export const essentialsSchema = z.object({
  // Basic metadata
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(255),
  excerpt: z.string().max(500).optional(),

  // Categorization
  category: z.enum([
    'code-style',
    'architecture',
    'performance',
    'debugging',
    'testing',
    'security',
    'workflow',
    'tooling',
    'refactoring',
    'documentation',
    'patterns',
    'antipatterns',
    'frontend',
    'backend',
    'fullstack',
    'design',
    'career',
    'tools'
  ]),

  // More specific tags for filtering
  tags: z.array(z.string()).min(1).max(8),

  // Practical attributes
  complexity: z.enum(['simple', 'medium', 'advanced']),
  timeToImplement: z.enum(['quick', 'moderate', 'substantial']).optional(),
  impact: z.enum(['low', 'medium', 'high', 'critical']).optional(),

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

  // References and further reading
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string().url().optional(),
      type: z.enum(['book', 'article', 'video', 'documentation', 'other']).optional(),
    })
  ).optional(),

  // Visual helpers
  hasCodeExamples: z.boolean().default(true).optional(),
  hasDiagrams: z.boolean().default(false).optional(),
  hasChecklists: z.boolean().default(false).optional(),

  // For filtering by technology
  applicableTo: z.array(
    z.enum([
      'javascript', 'typescript', 'react', 'vue', 'angular',
      'node', 'css', 'html', 'any'
    ])
  ).default(['any']).optional(),

  // Searchability enhancements
  keywords: z.array(z.string()).optional(),

  // Relation to other essentials
  relatedEssentials: z.array(z.string()).optional(), // IDs of related essentials

  // Version compatibility info
  versionInfo: z.string().optional(), // e.g., "ES6+", "React 16.8+", etc.
});