describe('Visual Regression Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ]
  
  const pages = [
    { path: '/', name: 'homepage' },
    { path: '/projects', name: 'projects' },
    { path: '/about', name: 'about' },
    { path: '/contact', name: 'contact' },
  ]
  
  viewports.forEach((viewport) => {
    describe(`${viewport.name} viewport (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height)
      })
      
      pages.forEach((page) => {
        it(`should match ${page.name} snapshot in light mode`, () => {
          cy.visit(page.path)
          cy.waitForPageLoad()
          
          // Ensure light mode
          cy.get('html').then(($html) => {
            if ($html.hasClass('dark')) {
              cy.get('[data-testid="theme-toggle"]').click()
              cy.wait(500)
            }
          })
          
          // Wait for animations and images to load
          cy.wait(1000)
          
          // Hide dynamic content that changes between runs
          cy.get('[data-testid*="timestamp"], .timestamp, time').invoke('css', 'visibility', 'hidden')
          
          // Take screenshot for visual comparison
          cy.matchImageSnapshot(`${page.name}-${viewport.name}-light`, {
            threshold: 0.1,
            thresholdType: 'percent',
            capture: 'viewport',
          })
        })
        
        it(`should match ${page.name} snapshot in dark mode`, () => {
          cy.visit(page.path)
          cy.waitForPageLoad()
          
          // Enable dark mode
          cy.get('body').then(($body) => {
            if ($body.find('[data-testid="theme-toggle"]').length > 0) {
              cy.get('[data-testid="theme-toggle"]').click()
              cy.wait(500)
            } else {
              // Fallback: manually add dark class if no toggle found
              cy.get('html').invoke('addClass', 'dark')
            }
          })
          
          // Wait for theme transition
          cy.wait(1000)
          
          // Hide dynamic content
          cy.get('[data-testid*="timestamp"], .timestamp, time').invoke('css', 'visibility', 'hidden')
          
          // Take screenshot
          cy.matchImageSnapshot(`${page.name}-${viewport.name}-dark`, {
            threshold: 0.1,
            thresholdType: 'percent',
            capture: 'viewport',
          })
        })
      })
      
      it('should test interactive states', () => {
        cy.visit('/')
        cy.waitForPageLoad()
        
        // Test hover states on buttons
        cy.get('button, a').first().trigger('mouseover')
        cy.wait(300)
        cy.matchImageSnapshot(`hover-state-${viewport.name}`, {
          threshold: 0.2,
          thresholdType: 'percent',
        })
        
        // Test focus states
        cy.get('button, a').first().focus()
        cy.wait(300)
        cy.matchImageSnapshot(`focus-state-${viewport.name}`, {
          threshold: 0.2,
          thresholdType: 'percent',
        })
      })
      
      it('should test loading states if present', () => {
        cy.visit('/')
        
        // Intercept requests to simulate loading
        cy.intercept('GET', '/api/**', { delay: 2000 }).as('apiRequests')
        
        // Check for loading indicators
        cy.get('[data-testid*="loading"], .loading, .spinner').then(($loading) => {
          if ($loading.length > 0) {
            cy.matchImageSnapshot(`loading-state-${viewport.name}`, {
              threshold: 0.2,
              thresholdType: 'percent',
            })
          }
        })
      })
      
      it('should test error states if applicable', () => {
        // Visit a non-existent page to test 404
        cy.visit('/non-existent-page', { failOnStatusCode: false })
        cy.wait(1000)
        
        cy.matchImageSnapshot(`error-404-${viewport.name}`, {
          threshold: 0.1,
          thresholdType: 'percent',
          capture: 'viewport',
        })
      })
    })
  })
  
  describe('Component-specific visual tests', () => {
    it('should test navigation menu variations', () => {
      cy.viewport('mobile')
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Test mobile menu if it exists
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid*="menu"], .menu-toggle, .hamburger').length > 0) {
          cy.get('[data-testid*="menu"], .menu-toggle, .hamburger').first().click()
          cy.wait(500)
          cy.matchImageSnapshot('mobile-menu-open', {
            threshold: 0.1,
            thresholdType: 'percent',
          })
        }
      })
    })
    
    it('should test form validation states', () => {
      cy.visit('/contact')
      cy.waitForPageLoad()
      
      // Test form validation if form exists
      cy.get('form').then(($form) => {
        if ($form.length > 0) {
          // Try to submit empty form to trigger validation
          cy.get('form button[type="submit"]').click()
          cy.wait(500)
          
          cy.matchImageSnapshot('form-validation-errors', {
            threshold: 0.2,
            thresholdType: 'percent',
          })
        }
      })
    })
    
    it('should test scroll-triggered animations', () => {
      cy.viewport('desktop')
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Scroll to trigger any scroll animations
      cy.scrollTo('center')
      cy.wait(1000)
      cy.matchImageSnapshot('scroll-animations-center', {
        threshold: 0.2,
        thresholdType: 'percent',
        capture: 'viewport',
      })
      
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.matchImageSnapshot('scroll-animations-bottom', {
        threshold: 0.2,
        thresholdType: 'percent',
        capture: 'viewport',
      })
    })
  })
  
  describe('Cross-browser visual consistency', () => {
    const browsers = ['chrome', 'firefox', 'edge']
    
    // Note: This would require different browser configurations
    it('should look consistent across browsers', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Take baseline screenshot
      cy.matchImageSnapshot('cross-browser-baseline', {
        threshold: 0.05,
        thresholdType: 'percent',
        capture: 'viewport',
      })
    })
  })
})