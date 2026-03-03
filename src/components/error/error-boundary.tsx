/* LEGACY AI ERROR BOUNDARY COMPONENT */
/* Atlas Technical Director - February 28, 2026 */

'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error to monitoring service (in production)
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    // TODO: Send error to monitoring service
    // sendErrorToMonitoring(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} reset={this.handleReset} />
      }

      return <DefaultErrorFallback error={this.state.error!} reset={this.handleReset} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-legacy-neutral flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Error Content */}
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. This has been logged and our team will investigate.
          </p>

          {/* Error Details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
              <h3 className="font-medium text-gray-900 mb-2">Error Details:</h3>
              <code className="text-sm text-red-600 break-all">
                {error.message}
              </code>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-legacy px-6 py-2"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-legacy-outline px-6 py-2"
            >
              Reload Page
            </button>
          </div>

          {/* Help Link */}
          <p className="mt-6 text-sm text-gray-500">
            If this problem persists,{' '}
            <a href="/support" className="text-legacy-navy hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary

// Specific error boundaries for different sections
export function ChatErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={ChatErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function ChatErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-medium text-gray-900 mb-2">Chat Error</h3>
        <p className="text-sm text-gray-600 mb-4">
          Something went wrong with the chat interface.
        </p>
        <button
          onClick={reset}
          className="btn-legacy px-4 py-2 text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export function VoiceErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={VoiceErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

function VoiceErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-red-800">Voice Chat Error</h4>
          <p className="text-sm text-red-700">
            Unable to initialize voice chat. Check microphone permissions.
          </p>
        </div>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    </div>
  )
}