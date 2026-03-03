/* LEGACY AI MIDDLEWARE */
/* Atlas Technical Director - February 28, 2026 */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      // TODO: Check for admin role in production
      // For now, only allow specific admin email
      if (token?.email !== 'admin@legacy-ai.com') {
        return NextResponse.redirect(new URL('/chat', req.url))
      }
    }

    // Protected routes that require authentication
    const protectedRoutes = ['/chat', '/settings', '/onboarding']
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    // Redirect authenticated users away from auth pages
    const authRoutes = ['/login', '/signup']
    if (authRoutes.includes(pathname) && token) {
      return NextResponse.redirect(new URL('/chat', req.url))
    }

    // API routes protection
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to public routes
        const publicRoutes = ['/', '/api/auth', '/terms', '/privacy', '/about']
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }

        // All other routes require authentication
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/).*)'
  ]
}