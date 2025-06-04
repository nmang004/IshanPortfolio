import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { ContactForm } from '@/components/sections/contact-form'

// Mock API responses
const server = setupServer(
  rest.post('/api/contact', (req, res, ctx) => {
    return res(ctx.json({ success: true, message: 'Message sent successfully' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Contact Form Integration', () => {
  const user = userEvent.setup()

  it('should submit form successfully with valid data', async () => {
    render(<ContactForm />)

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })

    // Form should be reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
  })

  it('should handle API errors gracefully', async () => {
    // Mock API error
    server.use(
      rest.post('/api/contact', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'Failed to send message' })
        )
      })
    )

    render(<ContactForm />)

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
    })
  })

  it('should validate required fields', async () => {
    render(<ContactForm />)

    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  it('should validate email format', async () => {
    render(<ContactForm />)

    // Enter invalid email
    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Should show email validation error
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  it('should disable submit button while submitting', async () => {
    // Mock slow API response
    server.use(
      rest.post('/api/contact', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.json({ success: true })
        )
      })
    )

    render(<ContactForm />)

    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Button should be disabled while submitting
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/sending/i)).toBeInTheDocument()

    // Wait for completion
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('should show character count for message field', async () => {
    render(<ContactForm />)

    const messageField = screen.getByLabelText(/message/i)
    const testMessage = 'This is a test message'

    await user.type(messageField, testMessage)

    // Should show character count
    expect(screen.getByText(`${testMessage.length}/500`)).toBeInTheDocument()
  })

  it('should prevent submission with message over character limit', async () => {
    render(<ContactForm />)

    const longMessage = 'a'.repeat(501) // Over 500 character limit
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), longMessage)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/message must be 500 characters or less/i)).toBeInTheDocument()
    })

    // Should not submit form
    expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument()
  })

  it('should support keyboard navigation', async () => {
    render(<ContactForm />)

    // Tab through form fields
    await user.tab()
    expect(screen.getByLabelText(/name/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/email/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/subject/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByLabelText(/message/i)).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: /send message/i })).toHaveFocus()
  })

  it('should clear form after successful submission', async () => {
    render(<ContactForm />)

    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'Test message')

    // Submit form
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Wait for success and form reset
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/name/i)).toHaveValue('')
      expect(screen.getByLabelText(/email/i)).toHaveValue('')
      expect(screen.getByLabelText(/subject/i)).toHaveValue('')
      expect(screen.getByLabelText(/message/i)).toHaveValue('')
    })
  })

  it('should handle network errors', async () => {
    // Mock network error
    server.use(
      rest.post('/api/contact', (req, res, ctx) => {
        return res.networkError('Failed to connect')
      })
    )

    render(<ContactForm />)

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Should show network error message
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })
})