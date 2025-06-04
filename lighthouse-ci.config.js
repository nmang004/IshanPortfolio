module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/projects',
        'http://localhost:3000/about',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        emulatedFormFactor: 'desktop',
      },
    },
    assert: {
      assertions: {
        // Performance thresholds
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
        'speed-index': ['error', { maxNumericValue: 4000 }],
        
        // Additional performance metrics
        'first-meaningful-paint': ['warn', { maxNumericValue: 2500 }],
        'interactive': ['error', { maxNumericValue: 4000 }],
        'max-potential-fid': ['warn', { maxNumericValue: 200 }],
        
        // Resource optimization
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'unused-javascript': ['warn', { maxNumericValue: 40000 }],
        'render-blocking-resources': ['warn', { maxNumericValue: 500 }],
        
        // Accessibility requirements
        'color-contrast': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        'valid-lang': ['error', { minScore: 1 }],
        'meta-viewport': ['error', { minScore: 1 }],
        
        // SEO requirements
        'document-title': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'link-text': ['error', { minScore: 1 }],
        'crawlable-anchors': ['error', { minScore: 1 }],
        
        // Best practices
        'uses-https': ['error', { minScore: 1 }],
        'uses-http2': ['warn', { minScore: 1 }],
        'no-vulnerable-libraries': ['error', { minScore: 1 }],
        'external-anchors-use-rel-noopener': ['error', { minScore: 1 }],
        
        // Progressive Web App (if applicable)
        'service-worker': ['warn', { minScore: 1 }],
        'viewport': ['error', { minScore: 1 }],
        'without-javascript': ['warn', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      command: 'npm run build && npm run start',
      port: 3000,
      wait: 10000,
    },
  },
}