import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ThemeProvider } from 'next-themes'

// Import components to test
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

expect.extend(toHaveNoViolations)

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>
)

describe('Accessibility Tests', () => {
  describe('Button Component A11y', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <Button>Click me</Button>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when disabled', async () => {
      const { container } = render(
        <TestWrapper>
          <Button disabled>Disabled button</Button>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with aria-label', async () => {
      const { container } = render(
        <TestWrapper>
          <Button aria-label="Close modal" variant="ghost">
            ✕
          </Button>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Form Elements A11y', () => {
    it('should not have violations with proper labeling', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with required fields', async () => {
      const { container } = render(
        <TestWrapper>
          <form>
            <Label htmlFor="required-field">Required Field *</Label>
            <Input
              id="required-field"
              required
              aria-describedby="required-help"
            />
            <div id="required-help">This field is required</div>
          </form>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with error states', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <Label htmlFor="error-field">Name</Label>
            <Input
              id="error-field"
              aria-invalid="true"
              aria-describedby="error-message"
            />
            <div id="error-message" role="alert">
              Name is required
            </div>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Card Component A11y', () => {
    it('should not have violations with proper structure', async () => {
      const { container } = render(
        <TestWrapper>
          <Card>
            <CardHeader>
              <CardTitle>Project Title</CardTitle>
              <CardDescription>Project description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Main content of the card</p>
            </CardContent>
          </Card>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations as clickable card', async () => {
      const { container } = render(
        <TestWrapper>
          <Card role="button" tabIndex={0} aria-label="View project details">
            <CardHeader>
              <CardTitle>Clickable Project</CardTitle>
            </CardHeader>
          </Card>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Navigation A11y', () => {
    it('should not have violations with proper nav structure', async () => {
      const { container } = render(
        <TestWrapper>
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <a href="/" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with skip links', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <nav aria-label="Main navigation">
              <a href="/">Home</a>
              <a href="/about">About</a>
            </nav>
            <main id="main-content">
              <h1>Main Content</h1>
            </main>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Landmark Roles', () => {
    it('should not have violations with proper landmarks', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <header>
              <nav aria-label="Main navigation">
                <a href="/">Home</a>
              </nav>
            </header>
            <main>
              <h1>Main Content</h1>
              <section aria-labelledby="section-heading">
                <h2 id="section-heading">Section Title</h2>
                <p>Section content</p>
              </section>
            </main>
            <aside aria-label="Sidebar">
              <h2>Related Links</h2>
            </aside>
            <footer>
              <p>&copy; 2024 Portfolio</p>
            </footer>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Image A11y', () => {
    it('should not have violations with proper alt text', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <img src="/test-image.jpg" alt="Description of the image" />
            <img src="/decorative.jpg" alt="" role="presentation" />
            <figure>
              <img src="/chart.jpg" alt="Sales increased by 25% this quarter" />
              <figcaption>Quarterly sales chart</figcaption>
            </figure>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Heading Structure', () => {
    it('should not have violations with proper heading hierarchy', async () => {
      const { container } = render(
        <TestWrapper>
          <main>
            <h1>Page Title</h1>
            <section>
              <h2>Section 1</h2>
              <h3>Subsection 1.1</h3>
              <h3>Subsection 1.2</h3>
            </section>
            <section>
              <h2>Section 2</h2>
              <h3>Subsection 2.1</h3>
            </section>
          </main>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Focus Management', () => {
    it('should not have violations with focusable elements', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <button>Focusable button</button>
            <a href="/link">Focusable link</a>
            <input type="text" aria-label="Text input" />
            <div tabIndex={0} role="button" aria-label="Custom button">
              Custom focusable element
            </div>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('ARIA Labels and Descriptions', () => {
    it('should not have violations with proper ARIA usage', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <button aria-label="Close dialog">✕</button>
            <div
              role="tabpanel"
              aria-labelledby="tab1"
              aria-describedby="tab1-desc"
            >
              <h2 id="tab1">Tab Panel 1</h2>
              <p id="tab1-desc">Description of tab panel content</p>
            </div>
            <div aria-live="polite" aria-atomic="true">
              Status updates will appear here
            </div>
          </div>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Color and Contrast', () => {
    it('should not have violations with sufficient color contrast', async () => {
      const { container } = render(
        <TestWrapper>
          <div>
            <p style={{ color: '#000000', backgroundColor: '#ffffff' }}>
              High contrast text (21:1 ratio)
            </p>
            <Button variant="default">Default button with good contrast</Button>
            <a href="/link" style={{ color: '#0066cc' }}>
              Link with sufficient contrast
            </a>
          </div>
        </TestWrapper>
      )
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('Tables A11y', () => {
    it('should not have violations with proper table structure', async () => {
      const { container } = render(
        <TestWrapper>
          <table>
            <caption>Project Statistics</caption>
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Status</th>
                <th scope="col">Completion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Project A</th>
                <td>In Progress</td>
                <td>75%</td>
              </tr>
              <tr>
                <th scope="row">Project B</th>
                <td>Complete</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </TestWrapper>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})