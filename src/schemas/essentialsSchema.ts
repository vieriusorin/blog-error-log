import { z } from 'astro:content';

export const essentialsSchema = z.object({
  // Basic metadata
  title: z.string().min(3).max(100),
  summary: z.string().min(10).max(200), // Short summary for quick reference
  
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
    'antipatterns'
  ]),
  
  // More specific tags for filtering
  tags: z.array(z.string()).min(1).max(8),
  
  // Practical attributes
  complexity: z.enum(['simple', 'medium', 'advanced']),
  timeToImplement: z.enum(['quick', 'moderate', 'substantial']),
  impact: z.enum(['low', 'medium', 'high', 'critical']),
  
  // For maintaining the knowledge base
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  
  // Who contributed this knowledge
  contributors: z.array(
    z.object({
      name: z.string(),
      github: z.string().optional(),
    })
  ),
  
  // References and further reading
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string().url().optional(),
      type: z.enum(['book', 'article', 'video', 'documentation', 'other']).optional(),
    })
  ).optional(),
  
  // Visual helpers
  hasCodeExamples: z.boolean().default(true),
  hasDiagrams: z.boolean().default(false),
  hasChecklists: z.boolean().default(false),
  
  // For filtering by technology
  applicableTo: z.array(
    z.enum([
      'javascript', 'typescript', 'react', 'vue', 'angular', 
      'node', 'css', 'html', 'any'
    ])
  ).default(['any']),
  
  // Searchability enhancements
  keywords: z.array(z.string()).optional(),
  
  // Relation to other essentials
  relatedEssentials: z.array(z.string()).optional(), // IDs of related essentials
  
  // Version compatibility info
  versionInfo: z.string().optional(), // e.g., "ES6+", "React 16.8+", etc.
});