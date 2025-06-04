'use client'

// Simple analytics wrapper that can be extended with different providers
export const analytics = {
  // Page views
  pageview: (url: string) => {
    if (typeof window === 'undefined') return
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_location: url,
      })
    }
    
    // Plausible
    if (typeof plausible !== 'undefined') {
      plausible('pageview')
    }
  },
  
  // Custom events
  event: (name: string, parameters?: Record<string, any>) => {
    if (typeof window === 'undefined') return
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', name, parameters)
    }
    
    // Plausible
    if (typeof plausible !== 'undefined') {
      plausible(name, { props: parameters })
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', name, parameters)
    }
  },
  
  // Specific tracking functions
  trackProjectView: (projectSlug: string) => {
    analytics.event('project_view', {
      project_slug: projectSlug,
      timestamp: new Date().toISOString(),
    })
  },
  
  trackContactFormSubmit: (formType: string) => {
    analytics.event('contact_form_submit', {
      form_type: formType,
    })
  },
  
  trackResumeDownload: () => {
    analytics.event('resume_download', {
      source: 'portfolio_site',
    })
  },
  
  trackSearchQuery: (query: string, resultsCount: number) => {
    analytics.event('search', {
      search_term: query,
      results_count: resultsCount,
    })
  },
  
  trackSocialClick: (platform: string) => {
    analytics.event('social_click', {
      platform,
    })
  },
  
  trackThemeChange: (theme: string) => {
    analytics.event('theme_change', {
      theme,
    })
  },
  
  trackCommandPaletteOpen: () => {
    analytics.event('command_palette_open')
  },
  
  trackCommandPaletteAction: (action: string) => {
    analytics.event('command_palette_action', {
      action,
    })
  },
}

// Global analytics declarations
declare global {
  function gtag(...args: any[]): void
  function plausible(event: string, options?: { props?: Record<string, any> }): void
}