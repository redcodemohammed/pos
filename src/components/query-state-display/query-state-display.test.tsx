import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QueryStateDisplay from '.'

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="alert" {...props}>
      {children}
    </div>
  ),
  AlertDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-description">{children}</div>
  ),
  AlertTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-title">{children}</div>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  )
}))

vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-triangle" />,
  CheckCircle: () => <div data-testid="check-circle" />,
  Info: () => <div data-testid="info" />,
  RefreshCw: () => <div data-testid="refresh-cw" />,
  XCircle: () => <div data-testid="x-circle" />
}))

describe('QueryStateDisplay', () => {
  it('renders loading state correctly', () => {
    render(<QueryStateDisplay isLoading={true} isError={false} error={null} isSuccess={false} />)
    expect(screen.getByRole('status')).toBeDefined()
    expect(screen.getByTestId('alert-title').textContent).toBe('Loading')
    expect(screen.getByTestId('alert-description').textContent).toBe('Please wait while we process your request.')
  })

  it('renders fallback component when provided in loading state', () => {
    const fallback = <div data-testid="fallback">Custom Fallback</div>
    render(<QueryStateDisplay isLoading={true} isError={false} error={null} isSuccess={false} fallback={fallback} />)
    expect(screen.getByTestId('fallback')).toBeDefined()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('renders error state correctly', () => {
    render(<QueryStateDisplay isLoading={false} isError={true} error={null} isSuccess={false} />)
    expect(screen.getByRole('alert')).toBeDefined()
    expect(screen.getByTestId('alert-title').textContent).toBe('An error occurred')
    expect(screen.getByTestId('alert-description').textContent).toBe('Something went wrong. Please try again later.')
  })

  it('renders custom error message when provided', () => {
    const customErrorMessage = 'Custom error occurred'
    render(
      <QueryStateDisplay
        isLoading={false}
        isError={true}
        error={null}
        isSuccess={false}
        customErrorMessage={customErrorMessage}
      />
    )
    expect(screen.getByTestId('alert-description').textContent).toBe(customErrorMessage)
  })

  it('renders 404 error correctly', () => {
    const error = { status: 404 }
    render(<QueryStateDisplay isLoading={false} isError={true} error={error} isSuccess={false} />)
    expect(screen.getByTestId('alert-title').textContent).toBe('Not Found')
    expect(screen.getByTestId('alert-description').textContent).toBe('The requested resource could not be found.')
  })

  it('renders server error correctly', () => {
    const error = { status: 500 }
    render(<QueryStateDisplay isLoading={false} isError={true} error={error} isSuccess={false} />)
    expect(screen.getByTestId('alert-title').textContent).toBe('Server Error')
    expect(screen.getByTestId('alert-description').textContent).toBe(
      'There was a problem with the server. Please try again later.'
    )
  })

  it('renders error message from error object when available', () => {
    const error = { message: 'Specific error message' }
    render(<QueryStateDisplay isLoading={false} isError={true} error={error} isSuccess={false} />)
    expect(screen.getByTestId('alert-description').textContent).toBe('Specific error message')
  })

  it('renders refresh button when refresh function is provided', () => {
    const refreshMock = vi.fn()
    render(<QueryStateDisplay isLoading={false} isError={true} error={null} isSuccess={false} refresh={refreshMock} />)
    const refreshButton = screen.getByTestId('button')
    expect(refreshButton).toBeDefined()
    fireEvent.click(refreshButton)
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })

  it('renders success state correctly', () => {
    render(<QueryStateDisplay isLoading={false} isError={false} error={null} isSuccess={true} />)
    expect(screen.getByRole('status')).toBeDefined()
    expect(screen.getByTestId('alert-title').textContent).toBe('Success')
    expect(screen.getByTestId('alert-description').textContent).toBe('Operation completed successfully.')
  })

  it('renders custom success message when provided', () => {
    const successMessage = 'Custom success message'
    render(
      <QueryStateDisplay
        isLoading={false}
        isError={false}
        error={null}
        isSuccess={true}
        successMessage={successMessage}
      />
    )
    expect(screen.getByTestId('alert-description').textContent).toBe(successMessage)
  })

  it('renders fallback component when provided in success state', () => {
    const fallback = <div data-testid="fallback">Custom Fallback</div>
    render(<QueryStateDisplay isLoading={false} isError={false} error={null} isSuccess={true} fallback={fallback} />)
    expect(screen.getByTestId('fallback')).toBeDefined()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('renders nothing when no state is active', () => {
    const { container } = render(<QueryStateDisplay isLoading={false} isError={false} error={null} isSuccess={false} />)
    expect(container.firstChild).toBeNull()
  })
})
