/* LEGACY AI LOADING COMPONENTS */
/* Atlas Technical Director - February 28, 2026 */

'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

export function LoadingSpinner({ size = 'md', color = 'primary', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'border-legacy-navy border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  }

  return (
    <div 
      className={`animate-spin rounded-full border-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  )
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'gray'
}

export function LoadingDots({ size = 'md', color = 'primary' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const colorClasses = {
    primary: 'bg-legacy-navy',
    gray: 'bg-gray-400'
  }

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200'
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  )
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-legacy-neutral flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <Skeleton className="h-12 w-48 mb-2" variant="rectangular" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Assistant message skeleton */}
      <div className="flex justify-start">
        <div className="max-w-xs lg:max-w-md xl:max-w-2xl">
          <Skeleton className="h-20 w-80 mb-2" variant="rectangular" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Another user message */}
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <Skeleton className="h-8 w-32 mb-2" variant="rectangular" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex justify-start">
        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
          <LoadingDots color="gray" />
        </div>
      </div>
    </div>
  )
}

export function ConversationListSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-3">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-48 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

export function SettingsPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="w-64 flex-shrink-0 space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" variant="rectangular" />
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <Skeleton className="h-6 w-48 mb-6" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Skeleton className="w-20 h-20" variant="circular" />
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" variant="rectangular" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" variant="rectangular" />
                </div>
              </div>
              
              <Skeleton className="h-10 w-32" variant="rectangular" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ButtonLoadingProps {
  loading?: boolean
  children: React.ReactNode
  className?: string
  [key: string]: any
}

export function ButtonLoading({ loading, children, className = '', ...props }: ButtonLoadingProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" color="white" />}
      {children}
    </button>
  )
}

export function StreamingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <LoadingDots size="sm" />
      <span>AI is responding...</span>
    </div>
  )
}

export function VoiceActivityIndicator({ isActive }: { isActive: boolean }) {
  if (!isActive) return null
  
  return (
    <div className="flex items-center gap-2 text-sm text-green-600">
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-green-500 rounded-full animate-pulse"
            style={{ 
              height: `${8 + Math.random() * 16}px`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
      <span>Listening...</span>
    </div>
  )
}

export function ProgressBar({ 
  progress, 
  className = '',
  showLabel = false 
}: { 
  progress: number
  className?: string 
  showLabel?: boolean
}) {
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-legacy-navy h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}