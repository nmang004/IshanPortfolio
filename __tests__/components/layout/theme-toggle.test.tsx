import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { ThemeToggle } from '@/components/layout/theme-toggle'

// Mock next-themes
const mockSetTheme = jest.fn()
const mockTheme = 'light'

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}))

const ThemeToggleWrapper = () => (
  <ThemeProvider attribute="class">
    <ThemeToggle />
  </ThemeProvider>
)

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('data-testid', 'theme-toggle')
  })

  it('shows light/dark mode icons', () => {
    render(<ThemeToggleWrapper />)
    
    // Should show sun icon for light mode and moon icon for dark mode
    const sunIcon = screen.getByTestId('sun-icon')
    const moonIcon = screen.getByTestId('moon-icon')
    
    expect(sunIcon).toBeInTheDocument()
    expect(moonIcon).toBeInTheDocument()
  })

  it('calls setTheme when clicked', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('toggles between light and dark themes', () => {
    // Mock light theme
    require('next-themes').useTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })

    const { rerender } = render(<ThemeToggleWrapper />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockSetTheme).toHaveBeenCalledWith('dark')

    // Mock dark theme
    require('next-themes').useTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    rerender(<ThemeToggleWrapper />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('handles keyboard interaction', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    
    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    expect(mockSetTheme).toHaveBeenCalledTimes(1)

    // Test Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' })
    expect(mockSetTheme).toHaveBeenCalledTimes(2)
  })

  it('has proper focus styles', () => {
    render(<ThemeToggleWrapper />)
    const button = screen.getByRole('button')
    
    fireEvent.focus(button)
    expect(button).toHaveFocus()
  })
})