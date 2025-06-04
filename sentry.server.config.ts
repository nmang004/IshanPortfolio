import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Enable profiling
  profilesSampleRate: 0.1,
  
  // Integrations
  integrations: [
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  
  // Filter out known issues
  beforeSend(event, hint) {
    // Filter out specific errors
    if (event.exception) {
      const error = hint.originalException as Error
      
      // Ignore expected errors
      if (error?.message?.includes('NEXT_NOT_FOUND')) {
        return null
      }
      
      // Ignore specific API errors
      if (error?.message?.includes('Invalid request')) {
        console.error('Invalid request error:', error)
        return null
      }
    }
    
    // Add user context
    if (event.request?.cookies) {
      // Remove sensitive data
      delete event.request.cookies
    }
    
    return event
  },
  
  // Ignore specific errors
  ignoreErrors: [
    // Next.js errors
    'NEXT_NOT_FOUND',
    'NEXT_REDIRECT',
    
    // API errors
    'Invalid request body',
    'Unauthorized',
  ],
  
  // Custom tags
  initialScope: {
    tags: {
      component: 'backend',
      runtime: 'node',
    },
  },
})