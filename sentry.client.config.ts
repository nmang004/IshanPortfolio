import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance Monitoring
  integrations: [
    new Sentry.BrowserTracing({
      // Set sample rates
      tracingOrigins: ['localhost', /^https:\/\/www\.ishanperera\.com/],
      routingInstrumentation: Sentry.nextRouterInstrumentation,
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
      // Capture 10% of all sessions
      sessionSampleRate: 0.1,
      // Capture 100% of sessions with an error
      errorSampleRate: 1.0,
    }),
  ],
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // Filter out known issues
  beforeSend(event, hint) {
    // Filter out specific errors
    if (event.exception) {
      const error = hint.originalException as Error
      
      // Ignore network errors
      if (error?.message?.includes('Network request failed')) {
        return null
      }
      
      // Ignore third-party script errors
      if (event.exception.values?.[0]?.stacktrace?.frames?.some(
        frame => frame.filename?.includes('gtag') || 
                 frame.filename?.includes('analytics')
      )) {
        return null
      }
      
      // Ignore browser extension errors
      if (error?.message?.includes('extension://')) {
        return null
      }
    }
    
    // Filter out specific transactions
    if (event.transaction) {
      // Ignore health check endpoints
      if (event.transaction.includes('/api/health')) {
        return null
      }
    }
    
    return event
  },
  
  // Ignore specific errors
  ignoreErrors: [
    // Browser errors
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Non-Error promise rejection captured',
    
    // Network errors
    'NetworkError',
    'Failed to fetch',
    'Load failed',
    
    // Third-party errors
    /^Script error/,
    /gtag/,
    /google-analytics/,
    /GoogleAnalyticsObject/,
  ],
  
  // Custom tags
  initialScope: {
    tags: {
      component: 'frontend',
    },
  },
})