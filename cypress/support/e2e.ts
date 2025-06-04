// cypress/support/e2e.ts
import './commands'

// Hide fetch/XHR requests from command log
const app = window.top
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style')
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }'
  style.setAttribute('data-hide-command-log-request', '')
  app.document.head.appendChild(style)
}

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore certain errors that don't affect functionality
  if (err.message.includes('ResizeObserver')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection')) {
    return false
  }
  return true
})

// Add custom commands for accessibility testing
import 'cypress-axe'

// Performance monitoring
beforeEach(() => {
  // Clear performance marks before each test
  cy.window().then((win) => {
    win.performance.clearMarks()
    win.performance.clearMeasures()
  })
})