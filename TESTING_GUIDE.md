# Comprehensive Testing Guide

## Overview

This portfolio application includes a comprehensive testing suite covering all layers of the application to ensure quality and prevent regressions.

## Testing Strategy

### 🎯 Testing Pyramid

```
    /\
   /  \     E2E Tests (Cypress)
  /____\    - Critical user flows
 /      \   - Cross-browser testing
/        \  - Visual regression
/__________\ Integration Tests (Jest + MSW)
            - API interactions
            - Component integration
            - Form submissions
            
            Unit Tests (Jest + RTL)
            - Component logic
            - Utilities functions
            - Accessibility
```

## Test Types

### 1. Unit Tests (`npm run test`)

**Location**: `__tests__/**/*.test.{ts,tsx}`

**Coverage**:
- React components with React Testing Library
- Utility functions
- Custom hooks
- Business logic

**Example**:
```bash
npm run test              # Run all unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

### 2. Integration Tests (`npm run test:integration`)

**Location**: `__tests__/integration/**/*.test.tsx`

**Coverage**:
- API integration with MSW mocking
- Form submissions
- Multi-component interactions
- Data flow testing

### 3. Accessibility Tests (`npm run test:a11y`)

**Location**: `__tests__/accessibility/**/*.test.tsx`

**Coverage**:
- WCAG compliance testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- ARIA attributes

### 4. End-to-End Tests (`npm run test:e2e`)

**Location**: `cypress/e2e/**/*.cy.ts`

**Coverage**:
- Critical user journeys
- Cross-browser compatibility
- Real user interactions
- Performance validation

### 5. Visual Regression Tests (`npm run test:visual`)

**Location**: `cypress/e2e/visual-regression.cy.ts`

**Coverage**:
- Layout consistency across devices
- Theme switching
- Component states (hover, focus, error)
- Cross-browser visual differences

### 6. Performance Tests (`npm run test:lighthouse`)

**Configuration**: `lighthouse-ci.config.js`

**Coverage**:
- Core Web Vitals
- Performance budgets
- SEO optimization
- Best practices compliance

## Test Configuration

### Jest Configuration (`jest.config.js`)

```javascript
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
```

### Cypress Configuration (`cypress.config.ts`)

- Desktop and mobile viewports
- Screenshot on failure
- Custom commands for accessibility
- Performance monitoring

## Running Tests

### Local Development

```bash
# Unit tests
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage

# E2E tests
npm run test:e2e:open     # Cypress GUI
npm run test:e2e          # Headless
npm run test:e2e:dev      # With dev server

# Specific test types
npm run test:a11y         # Accessibility only
npm run test:visual       # Visual regression
npm run test:lighthouse   # Performance

# All tests
npm run test:all          # Complete test suite
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/test.yml`) runs:

1. **Unit Tests** - Multiple Node.js versions
2. **Accessibility Tests** - WCAG compliance
3. **E2E Tests** - Cross-browser validation
4. **Performance Tests** - Lighthouse CI
5. **Visual Regression** - Snapshot comparisons
6. **Security Audit** - Vulnerability scanning

## Test Data Management

### Mocking Strategy

**API Calls**: MSW (Mock Service Worker)
```javascript
const server = setupServer(
  rest.post('/api/contact', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
)
```

**External Dependencies**:
- Next.js router mocked
- Framer Motion mocked
- Image components mocked

### Test Fixtures

Create reusable test data in `__tests__/fixtures/`:
- Sample user profiles
- Project data
- API responses

## Accessibility Testing

### Automated Checks

```javascript
import { axe } from 'jest-axe'

it('should not have accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader announcements
- [ ] Color contrast ratios
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Semantic HTML structure

## Performance Testing

### Lighthouse Thresholds

- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥95

### Core Web Vitals

- **LCP**: <3.0s
- **FID**: <200ms
- **CLS**: <0.1

## Visual Regression Testing

### Viewport Coverage

- Mobile: 375×667
- Tablet: 768×1024
- Desktop: 1920×1080

### Test Scenarios

- Light/dark themes
- Hover/focus states
- Loading states
- Error states
- Responsive layouts

## Writing Tests

### Unit Test Best Practices

```javascript
describe('Component', () => {
  it('should render with required props', () => {
    render(<Component title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const handleClick = jest.fn()
    render(<Component onClick={handleClick} />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### E2E Test Best Practices

```javascript
describe('User Journey', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('should complete contact form', () => {
    cy.get('[data-testid="contact-form"]')
      .within(() => {
        cy.get('input[name="name"]').type('John Doe')
        cy.get('input[name="email"]').type('john@example.com')
        cy.get('textarea[name="message"]').type('Test message')
        cy.get('button[type="submit"]').click()
      })
    
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
  })
})
```

## Test Coverage Goals

### Current Targets

- **Unit Tests**: 70% coverage minimum
- **Integration Tests**: Critical user flows
- **E2E Tests**: Happy path + error scenarios
- **Accessibility**: 100% automated coverage
- **Performance**: All pages under budget

### Coverage Reports

```bash
npm run test:coverage     # Generate coverage report
open coverage/lcov-report/index.html  # View detailed report
```

## Debugging Tests

### Jest Debugging

```bash
# Debug specific test
npm run test -- --testNamePattern="Component should render"

# Run tests in specific file
npm run test -- __tests__/components/button.test.tsx

# Watch mode for TDD
npm run test:watch
```

### Cypress Debugging

```bash
# Open Cypress GUI for debugging
npm run test:e2e:open

# Run specific test file
npx cypress run --spec "cypress/e2e/critical-flows.cy.ts"

# Debug mode
npx cypress open --config watchForFileChanges=true
```

## Continuous Integration

### GitHub Actions

The CI pipeline automatically:

1. **Installs dependencies** with caching
2. **Runs linting** for code quality
3. **Executes unit tests** with coverage
4. **Performs accessibility audits**
5. **Runs E2E tests** across browsers
6. **Validates performance** with Lighthouse
7. **Checks visual regressions**
8. **Audits security** vulnerabilities

### Branch Protection

- All tests must pass before merge
- Coverage thresholds enforced
- Performance budgets validated

## Troubleshooting

### Common Issues

**Tests timeout**: Increase timeout in test files
```javascript
jest.setTimeout(10000)
```

**Async operations**: Use proper waiting
```javascript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

**Mock issues**: Ensure mocks are properly cleared
```javascript
afterEach(() => {
  jest.clearAllMocks()
})
```

### Performance

**Slow tests**: 
- Reduce test scope
- Mock heavy dependencies
- Use `test.only` for focused testing

**Flaky tests**:
- Add proper waits
- Mock time-dependent code
- Ensure test isolation

## Best Practices Summary

### ✅ Do

- Write tests before fixing bugs
- Use descriptive test names
- Mock external dependencies
- Test user behavior, not implementation
- Maintain test independence
- Use proper accessibility testing
- Include error scenarios

### ❌ Don't

- Test implementation details
- Write overly complex tests
- Ignore flaky tests
- Skip accessibility testing
- Forget to clean up mocks
- Test third-party library behavior

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Guide](https://testing-library.com/docs/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Testing](https://web.dev/testing/)

---

## Quick Reference

```bash
# Essential commands
npm run test              # Unit tests
npm run test:e2e:open    # E2E tests (GUI)
npm run test:a11y        # Accessibility
npm run test:lighthouse  # Performance
npm run test:all         # Everything

# Development
npm run test:watch       # TDD mode
npm run test:coverage    # Coverage report
npm run test:e2e:dev     # E2E with dev server
```