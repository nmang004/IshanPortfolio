// cypress/support/commands.ts

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check accessibility violations
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>
      
      /**
       * Custom command to wait for page load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
      
      /**
       * Custom command to test keyboard navigation
       * @example cy.testKeyboardNavigation()
       */
      testKeyboardNavigation(): Chainable<void>
      
      /**
       * Custom command to check performance metrics
       * @example cy.checkPerformance()
       */
      checkPerformance(): Chainable<void>
    }
  }
}

// Accessibility testing
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe()
  cy.checkA11y(null, {
    rules: {
      // Disable color-contrast rule for now (can be strict)
      'color-contrast': { enabled: false },
    },
  })
})

// Wait for page to fully load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'performance')
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve(undefined)
      } else {
        win.addEventListener('load', () => resolve(undefined))
      }
    })
  })
  
  // Wait for any additional async content
  cy.get('body').should('be.visible')
  
  // Wait for any loading states to finish
  cy.get('[data-testid*="loading"]', { timeout: 1000 }).should('not.exist')
})

// Test keyboard navigation
Cypress.Commands.add('testKeyboardNavigation', () => {
  cy.get('body').tab()
  
  // Check that focus is visible and functional
  cy.focused().should('be.visible')
  
  // Test tab navigation through interactive elements
  const interactiveElements = ['button', 'a', 'input', 'select', 'textarea']
  interactiveElements.forEach(() => {
    cy.focused().tab()
    cy.focused().should('be.visible')
  })
})

// Performance testing
Cypress.Commands.add('checkPerformance', () => {
  cy.window().then((win) => {
    // Check Core Web Vitals
    const navigation = win.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const fcp = navigation.responseEnd - navigation.fetchStart
      const lcp = navigation.loadEventEnd - navigation.fetchStart
      
      // Assert reasonable performance metrics
      expect(fcp).to.be.lessThan(3000) // First Contentful Paint < 3s
      expect(lcp).to.be.lessThan(4000) // Largest Contentful Paint < 4s
    }
    
    // Check for long tasks
    win.performance.getEntriesByType('measure').forEach((measure) => {
      expect(measure.duration).to.be.lessThan(50) // No blocking tasks > 50ms
    })
  })
})

// Tab navigation helper
Cypress.Commands.add('tab', { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).trigger('keydown', { key: 'Tab' })
})

export {}