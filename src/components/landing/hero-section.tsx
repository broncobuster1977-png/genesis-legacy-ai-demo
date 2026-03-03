/* GENESIS LEGACY AI - EMPIRE-LEVEL HERO SECTION */
/* DEMI VOSS TRANSFORMATION - ANTHROPIC/MIDJOURNEY QUALITY */
/* PROFESSIONAL FAMILY LEGACY POSITIONING */

import Link from 'next/link'
import { Shield, Users, Clock, Lock } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-legacy-neutral via-white to-legacy-lightblue">
      
      {/* PREMIUM BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10L20 25v30c0 15 10 30 30 35 20-5 30-20 30-35V25L50 10z' fill='none' stroke='%232E75B6' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-6 text-center">
        
        {/* TRUST SIGNAL BADGE */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-legacy-lightgray rounded-full px-6 py-3 mb-8 shadow-lg">
          <Users className="w-5 h-5 text-legacy-blue" />
          <span className="text-legacy-darkgray font-semibold text-sm tracking-wide">
            Trusted by 1,000+ families worldwide
          </span>
        </div>

        {/* DEMI SPEC: CLEAR VALUE PROPOSITION */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-legacy-navy mb-8 leading-none tracking-tight">
          AI-Powered Family
          <span className="block bg-gradient-to-r from-legacy-blue to-legacy-navy bg-clip-text text-transparent">
            Legacy Platform
          </span>
        </h1>

        {/* CLEAR BENEFIT-FOCUSED SUBHEADLINE */}
        <p className="text-xl md:text-2xl text-legacy-darkgray max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Preserve Wisdom for Generations with Military-Grade AI Security.
          <span className="block mt-2 text-legacy-medgray">
            Capture stories, values, and knowledge that build stronger family bonds.
          </span>
        </p>

        {/* SINGLE POWERFUL CTA */}
        <div className="mb-16">
          <Link 
            href="/signup" 
            className="group inline-flex items-center bg-gradient-to-r from-legacy-blue to-legacy-navy text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 transform hover:from-legacy-navy hover:to-legacy-blue"
          >
            <Shield className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Start Your Legacy Today - Free Trial
          </Link>
          <p className="text-legacy-medgray text-sm mt-4 font-medium">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>

        {/* TRUST SIGNALS ROW */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 text-legacy-medgray">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-legacy-green" />
            <span className="font-semibold text-sm">Enterprise-grade Security</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-legacy-green" />
            <span className="font-semibold text-sm">Instant Setup</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-legacy-green" />
            <span className="font-semibold text-sm">Unlimited Family Members</span>
          </div>
        </div>

      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
