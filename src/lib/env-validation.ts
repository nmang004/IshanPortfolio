import { z } from 'zod'

// Define environment variable schema
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Sanity CMS
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Sanity project ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'Sanity dataset is required'),
  SANITY_API_TOKEN: z.string().optional(),
  SANITY_PREVIEW_SECRET: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),
  
  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  
  // Monitoring and Analytics
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  MONITORING_TOKEN: z.string().optional(),
  
  // Vercel
  VERCEL: z.string().optional(),
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
  VERCEL_URL: z.string().optional(),
  VERCEL_DEPLOYMENT_ID: z.string().optional(),
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().optional(),
  
  // API Keys
  RESEND_API_KEY: z.string().optional(),
  CLOUDFLARE_ZONE_ID: z.string().optional(),
  CLOUDFLARE_API_TOKEN: z.string().optional(),
  
  // Testing
  CYPRESS_RECORD_KEY: z.string().optional(),
  LHCI_GITHUB_APP_TOKEN: z.string().optional(),
})

// Type for validated environment
export type ValidatedEnv = z.infer<typeof envSchema>

// Validation function
export function validateEnv(): ValidatedEnv {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
      
      // In production, throw error to prevent deployment
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Invalid environment variables')
      }
      
      // In development, show warning but continue
      console.warn('⚠️  Running with invalid environment variables in development mode')
    }
    
    // Return partial environment in development
    return process.env as unknown as ValidatedEnv
  }
}

// Validate on module load
export const env = validateEnv()

// Helper to get public runtime config
export function getPublicRuntimeConfig() {
  return {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL || getBaseUrl(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  }
}

// Helper to get server runtime config
export function getServerRuntimeConfig() {
  return {
    ...getPublicRuntimeConfig(),
    SANITY_API_TOKEN: env.SANITY_API_TOKEN,
    SANITY_PREVIEW_SECRET: env.SANITY_PREVIEW_SECRET,
    SANITY_WEBHOOK_SECRET: env.SANITY_WEBHOOK_SECRET,
    SENTRY_AUTH_TOKEN: env.SENTRY_AUTH_TOKEN,
    RESEND_API_KEY: env.RESEND_API_KEY,
    MONITORING_TOKEN: env.MONITORING_TOKEN,
  }
}

// Helper to get base URL
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`
  }
  
  return 'http://localhost:3000'
}