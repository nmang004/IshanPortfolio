// Security headers configuration
export const securityHeaders = {
  // Prevent XSS attacks
  'X-XSS-Protection': '1; mode=block',
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  
  // Strict transport security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
}

// Content Security Policy configuration
export const getCSPHeader = (nonce?: string) => {
  const csp = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      nonce ? `'nonce-${nonce}'` : "'unsafe-inline'",
      "'unsafe-eval'", // Required for Next.js in dev mode
      'https://cdn.sanity.io',
      'https://vercel.live',
      'https://*.vercel-analytics.com',
      'https://*.vercel-insights.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-jsx and inline styles
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
    ],
    'font-src': ["'self'"],
    'connect-src': [
      "'self'",
      'https://cdn.sanity.io',
      'https://*.vercel-analytics.com',
      'https://*.vercel-insights.com',
      'https://www.google-analytics.com',
      'https://vitals.vercel-insights.com',
      'wss://cdn.sanity.io', // WebSocket for Sanity real-time updates
    ],
    'frame-src': [
      "'self'",
      'https://vercel.live',
    ],
    'media-src': [
      "'self'",
      'https://cdn.sanity.io',
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  }
  
  // Build CSP string
  return Object.entries(csp)
    .map(([key, values]) => {
      if (values.length === 0) return key
      return `${key} ${values.join(' ')}`
    })
    .join('; ')
}

// Apply security headers to response
export function applySecurityHeaders(
  headers: Headers,
  options?: { nonce?: string }
): Headers {
  // Apply all security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers.set(key, value)
  })
  
  // Apply CSP header
  headers.set('Content-Security-Policy', getCSPHeader(options?.nonce))
  
  return headers
}