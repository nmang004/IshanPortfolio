import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Filter out known issues
  beforeSend(event, hint) {
    // Add edge runtime context
    event.contexts = {
      ...event.contexts,
      runtime: {
        name: 'edge',
        version: process.version,
      },
    }
    
    return event
  },
  
  // Custom tags
  initialScope: {
    tags: {
      component: 'edge',
      runtime: 'edge',
    },
  },
})