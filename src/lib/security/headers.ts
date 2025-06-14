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
      "'unsafe-inline'", // Required for Next.js hydration and inline scripts
      "'unsafe-eval'", // Required for Next.js
      'https://cdn.sanity.io',
      'https://vercel.live',
      'https://*.vercel-analytics.com',
      'https://*.vercel-insights.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      // Add specific script hashes if needed in the future
      // "'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s='",
      // "'sha256-g5uPbGofGS5uUe2HpfOL2KXp7m0CU/UAgBStPMBsL3Y='",
      // "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='",
      // "'sha256-GAdVtjfcIVMnFjG8/OQinSvwpZe2Osct5/oBOz3+wc0='",
      // "'sha256-CWGXLehFl0LXkqN1TWi/JXu1VYjqKAZzOh6Dy3aIuak='",
      // "'sha256-YKARSnw/GLszzHkoy71tSQsP3JbodICCQ7nkj3I4Co4='",
      // "'sha256-RetorcMUSM/H5GaEDTttjSE6Zi3uLyKBil8MEfrAQgM='",
      // "'sha256-uJxkGQKvxYA4+inLLOAdln+S1lgrQc2Vlq+KSyadQQc='",
      // "'sha256-t1jM3T/ibM8ptOREaFmFjg4JkyU257xVux2J2cVefFg='",
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
      'https://*.apicdn.sanity.io', // Sanity API CDN
      'https://ne7sn5va.apicdn.sanity.io', // Specific Sanity project API
      'https://ne7sn5va.api.sanity.io', // Direct Sanity API (non-CDN)
      'https://*.api.sanity.io', // Sanity API wildcard
      'https://*.vercel-analytics.com',
      'https://*.vercel-insights.com',
      'https://www.google-analytics.com',
      'https://vitals.vercel-insights.com',
      'wss://cdn.sanity.io', // WebSocket for Sanity real-time updates
      'ws://localhost:*', // Local development WebSocket
      'wss://localhost:*', // Local development WebSocket (secure)
      'ws://*.vercel.app', // Vercel preview WebSocket
      'wss://*.vercel.app', // Vercel preview WebSocket (secure)
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