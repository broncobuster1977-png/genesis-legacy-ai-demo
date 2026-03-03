/* GENESIS LEGACY AI - PROFESSIONAL HEADER */
/* EMPIRE-LEVEL NAVIGATION - DEMI VOSS SPEC */
/* ANTHROPIC-LEVEL CLARITY REQUIREMENT */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-legacy-lightgray z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* GENESIS SHIELD LOGO - PROFESSIONAL */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-legacy-navy to-legacy-blue flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <svg className="w-7 h-7 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="35" cy="35" r="3"/>
                <circle cx="50" cy="30" r="3"/>
                <circle cx="65" cy="35" r="3"/>
                <circle cx="40" cy="50" r="3"/>
                <circle cx="60" cy="50" r="3"/>
                <circle cx="50" cy="65" r="3"/>
                <path d="M35 35L50 30M50 30L65 35M35 35L40 50M65 35L60 50M40 50L50 65M60 50L50 65M40 50L60 50" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-legacy-navy leading-none tracking-tight group-hover:text-legacy-blue transition-colors">Genesis</span>
              <span className="text-sm text-legacy-medgray font-semibold tracking-wide -mt-1">LEGACY AI</span>
            </div>
          </Link>

          {/* PROFESSIONAL NAVIGATION - ANTHROPIC STYLE */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/features" 
              className="text-legacy-darkgray hover:text-legacy-navy font-semibold text-sm tracking-wide transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-legacy-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/pricing" 
              className="text-legacy-darkgray hover:text-legacy-navy font-semibold text-sm tracking-wide transition-colors duration-200 relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-legacy-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-legacy-darkgray hover:text-legacy-navy font-semibold text-sm tracking-wide transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-legacy-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-legacy-darkgray hover:text-legacy-navy font-semibold text-sm tracking-wide transition-colors duration-200 relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-legacy-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-legacy-darkgray hover:text-legacy-navy font-semibold text-sm tracking-wide transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-legacy-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/demo" 
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm tracking-wide rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Live Demo
            </Link>
          </div>

          {/* EMPIRE-LEVEL CTA BUTTONS */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              // User Dashboard
              <>
                <Link 
                  href="/chat" 
                  className="text-legacy-navy hover:text-legacy-blue font-semibold text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/api/auth/signout" 
                  className="text-legacy-medgray hover:text-legacy-navy font-medium text-sm transition-colors"
                >
                  Sign Out
                </Link>
              </>
            ) : (
              // Public CTAs
              <>
                <Link 
                  href="/login" 
                  className="text-legacy-navy hover:text-legacy-blue font-semibold text-sm transition-colors px-4 py-2"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-legacy-blue to-legacy-navy text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm tracking-wide"
                >
                  Start Your Legacy Today
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden p-2 text-legacy-navy hover:text-legacy-blue transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-legacy-lightgray shadow-xl">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-4">
              <Link 
                href="/features" 
                className="block text-legacy-darkgray hover:text-legacy-navy font-semibold text-base py-2 border-b border-legacy-lightgray transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/pricing" 
                className="block text-legacy-darkgray hover:text-legacy-navy font-semibold text-base py-2 border-b border-legacy-lightgray transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className="block text-legacy-darkgray hover:text-legacy-navy font-semibold text-base py-2 border-b border-legacy-lightgray transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className="block text-legacy-darkgray hover:text-legacy-navy font-semibold text-base py-2 border-b border-legacy-lightgray transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="block text-legacy-darkgray hover:text-legacy-navy font-semibold text-base py-2 border-b border-legacy-lightgray transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-4">
              {session ? (
                <>
                  <Link 
                    href="/chat" 
                    className="block w-full text-center bg-legacy-lightblue text-legacy-navy font-semibold py-3 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/api/auth/signout" 
                    className="block w-full text-center border border-legacy-lightgray text-legacy-medgray font-medium py-3 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block w-full text-center border border-legacy-navy text-legacy-navy font-semibold py-3 rounded-lg hover:bg-legacy-lightblue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block w-full text-center bg-gradient-to-r from-legacy-blue to-legacy-navy text-white font-bold py-4 rounded-xl shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Your Legacy Today
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
