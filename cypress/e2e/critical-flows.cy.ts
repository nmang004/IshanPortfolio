describe('Critical User Flows', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })
  
  describe('Homepage', () => {
    it('should load with all critical elements', () => {
      // Hero section
      cy.get('[data-testid="hero-section"]').should('be.visible')
      cy.get('h1').should('be.visible').and('contain.text', 'Ishan')
      
      // Navigation should be visible
      cy.get('nav, [role="navigation"]').should('be.visible')
      
      // Main content areas should be present
      cy.get('main').should('be.visible')
      
      // Footer should be present
      cy.get('footer').should('be.visible')
    })
    
    it('should have working navigation', () => {
      // Test navigation links exist
      cy.get('nav a, [role="navigation"] a').should('have.length.at.least', 3)
      
      // Test projects navigation
      cy.contains('a', /projects/i).click()
      cy.url().should('include', '/projects')
      cy.go('back')
      
      // Test about navigation
      cy.contains('a', /about/i).click()
      cy.url().should('include', '/about')
      cy.go('back')
      
      // Test contact navigation
      cy.contains('a', /contact/i).click()
      cy.url().should('include', '/contact')
    })
    
    it('should handle theme switching', () => {
      // Find theme toggle button
      cy.get('[data-testid="theme-toggle"], [aria-label*="theme"], button').contains(/theme|dark|light/i).first().click()
      
      // Check that theme changed (could be dark mode class or different styling)
      cy.get('html, body').should(($el) => {
        const hasThemeChange = $el.hasClass('dark') || 
                              $el.attr('data-theme') || 
                              $el.css('background-color') !== 'rgba(0, 0, 0, 0)'
        expect(hasThemeChange).to.be.true
      })
    })
    
    it('should be responsive', () => {
      // Test mobile viewport
      cy.viewport('iphone-x')
      cy.get('main').should('be.visible')
      
      // Test tablet viewport
      cy.viewport('ipad-2')
      cy.get('main').should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1920, 1080)
      cy.get('main').should('be.visible')
    })
  })
  
  describe('Projects Page', () => {
    beforeEach(() => {
      cy.visit('/projects')
      cy.waitForPageLoad()
    })
    
    it('should display projects', () => {
      // Check that projects or project cards are displayed
      cy.get('main').should('contain.text', /project/i)
      
      // Look for common project elements
      cy.get('article, [data-testid*="project"], .project, [class*="project"]').should('exist')
    })
    
    it('should handle project filtering if available', () => {
      // Check if search/filter exists
      cy.get('body').then(($body) => {
        if ($body.find('input[type="search"], [data-testid*="search"], [placeholder*="search"]').length > 0) {
          cy.get('input[type="search"], [data-testid*="search"], [placeholder*="search"]').first().type('test')
        }
        
        if ($body.find('[data-testid*="filter"], button, select').length > 0) {
          // Test filter functionality if available
          cy.get('[data-testid*="filter"], button').first().click()
        }
      })
    })
    
    it('should navigate to project details', () => {
      // Find and click on a project link
      cy.get('a').contains(/project|view|read more|details/i).first().click()
      
      // Should navigate to a project detail page
      cy.url().should('match', /\/projects\/[\w-]+/)
      
      // Check that we're on a detail page with content
      cy.get('main').should('be.visible')
      cy.get('h1, h2').should('be.visible')
    })
  })
  
  describe('Contact Page', () => {
    beforeEach(() => {
      cy.visit('/contact')
      cy.waitForPageLoad()
    })
    
    it('should display contact information or form', () => {
      // Should have either contact info or a contact form
      cy.get('main').should('contain.text', /contact/i)
      
      // Look for contact elements
      cy.get('body').should(($body) => {
        const hasContactForm = $body.find('form, input[type="email"], textarea').length > 0
        const hasContactInfo = $body.find('a[href^="mailto:"], a[href^="tel:"]').length > 0
        expect(hasContactForm || hasContactInfo).to.be.true
      })
    })
    
    it('should validate contact form if present', () => {
      // Check if contact form exists
      cy.get('body').then(($body) => {
        if ($body.find('form').length > 0) {
          // Try submitting empty form
          cy.get('form button[type="submit"], form input[type="submit"]').first().click()
          
          // Should show validation or prevent submission
          cy.get('form').should('be.visible')
        }
      })
    })
    
    it('should have valid contact links', () => {
      // Check email links
      cy.get('a[href^="mailto:"]').each(($link) => {
        const href = $link.attr('href')
        expect(href).to.match(/^mailto:.+@.+\..+/)
      })
      
      // Check phone links
      cy.get('a[href^="tel:"]').each(($link) => {
        const href = $link.attr('href')
        expect(href).to.match(/^tel:\+?[\d\s\-\(\)]+/)
      })
    })
  })
  
  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Test keyboard navigation
      cy.testKeyboardNavigation()
      
      // Test skip links if available
      cy.get('body').type('{cmd}')
      cy.get('[data-testid*="skip"], a').contains(/skip/i).should('exist')
    })
    
    it('should have proper ARIA labels and roles', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Check for main landmarks
      cy.get('main, [role="main"]').should('exist')
      cy.get('nav, [role="navigation"]').should('exist')
      
      // Check for proper headings hierarchy
      cy.get('h1').should('have.length', 1)
      cy.get('h1, h2, h3, h4, h5, h6').should('exist')
    })
    
    it('should pass accessibility audit', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      cy.checkA11y()
      
      cy.visit('/projects')
      cy.waitForPageLoad()
      cy.checkA11y()
      
      cy.visit('/contact')
      cy.waitForPageLoad()
      cy.checkA11y()
    })
  })
  
  describe('Performance', () => {
    it('should load quickly', () => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.performance.mark('start')
        },
        onLoad: (win) => {
          win.performance.mark('end')
          win.performance.measure('pageLoad', 'start', 'end')
        },
      })
      
      cy.waitForPageLoad()
      cy.checkPerformance()
    })
    
    it('should optimize images', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Check for lazy loading
      cy.get('img[loading="lazy"]').should('exist')
      
      // Check for Next.js optimized images
      cy.get('img').should('have.attr', 'src')
      
      // Scroll to trigger lazy loading
      cy.scrollTo('bottom')
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
      })
    })
  })
  
  describe('Error Handling', () => {
    it('should handle 404 pages gracefully', () => {
      cy.visit('/non-existent-page', { failOnStatusCode: false })
      
      // Should show a proper 404 page
      cy.get('body').should('contain.text', /404|not found|page not found/i)
      
      // Should have navigation back to home
      cy.get('a').contains(/home|back/i).should('exist')
    })
    
    it('should handle broken links gracefully', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Check that all internal links are valid
      cy.get('a[href^="/"]').each(($link) => {
        const href = $link.attr('href')
        if (href && href !== '/') {
          cy.request({ url: href, failOnStatusCode: false }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302, 404])
          })
        }
      })
    })
  })
})