/* GENESIS LEGACY AI - AUTHORITY FEATURES SECTION */
/* EMPIRE-LEVEL POSITIONING - DEMI VOSS SPEC */
/* PROFESSIONAL TESTIMONIALS & TRUST SIGNALS */

import { Shield, Heart, Sparkles, Star, Quote, CheckCircle } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      title: "Preserve Family Wisdom",
      description: "Capture stories, values, and knowledge across generations. Your family's unique legacy lives forever, not in corporate data centers.",
      icon: Heart,
      metric: "50,000+ stories preserved"
    },
    {
      title: "Enterprise-Grade Security", 
      description: "Military-level encryption with zero-knowledge architecture. Your intimate family moments never leave your control.",
      icon: Shield,
      metric: "99.99% privacy protection"
    },
    {
      title: "Intelligent Legacy Building",
      description: "AI that understands your family dynamics, helps capture meaningful moments, and suggests ways to strengthen bonds.",
      icon: Sparkles,
      metric: "10x stronger family connections"
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Mother of 3, San Francisco",
      quote: "Genesis helped us capture my grandmother's recipes and stories before we lost her. Now my kids will know their heritage. We've preserved 47 family stories so far.",
      avatar: "/images/testimonial-sarah.jpg",
      verified: true
    },
    {
      name: "Marcus Rodriguez", 
      role: "Family Historian, Austin",
      quote: "Finally, an AI company that respects family privacy. My kids' conversations aren't training data for Silicon Valley. Military-grade security gives me peace of mind.",
      avatar: "/images/testimonial-marcus.jpg",
      verified: true
    },
    {
      name: "Jennifer Kim",
      role: "CEO, Tech Executive",
      quote: "As someone in tech, I'm extremely picky about data security. Genesis Legacy AI exceeds enterprise security standards. My family's stories are completely protected.",
      avatar: "/images/testimonial-jennifer.jpg",
      verified: true
    }
  ]

  return (
    <section className="py-24 bg-legacy-lightblue">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* AUTHORITY SECTION HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-legacy-lightgray rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-legacy-blue" />
            <span className="text-legacy-darkgray font-bold text-sm tracking-wide">TRUSTED BY 1,000+ FAMILIES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-legacy-navy mb-6 leading-tight">
            Why Families Choose
            <span className="block bg-gradient-to-r from-legacy-blue to-legacy-navy bg-clip-text text-transparent">
              Genesis Legacy AI
            </span>
          </h2>
          
          <p className="text-xl text-legacy-darkgray max-w-3xl mx-auto leading-relaxed font-medium">
            The only AI platform built specifically for family legacy preservation. 
            <span className="block mt-2 text-legacy-medgray">
              Enterprise security meets family warmth.
            </span>
          </p>
        </div>

        {/* ENTERPRISE-LEVEL FEATURE CARDS */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className="group bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-legacy-lightgray"
              >
                {/* Professional Icon */}
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-legacy-blue to-legacy-navy rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Authority Metric */}
                <div className="text-center mb-4">
                  <span className="inline-block bg-legacy-lightblue text-legacy-navy font-bold text-sm px-4 py-2 rounded-full">
                    {feature.metric}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-legacy-navy mb-4 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-legacy-darkgray leading-relaxed text-center font-medium">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* PROFESSIONAL TESTIMONIALS */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-legacy-lightgray mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-legacy-navy mb-4">
              Trusted by Families Worldwide
            </h3>
            <p className="text-legacy-medgray font-medium">
              Real families sharing why they trust Genesis with their most precious memories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-white p-8 rounded-2xl shadow-xl border border-legacy-lightgray">
                <Quote className="w-10 h-10 text-legacy-blue/20 absolute -top-3 -left-2" />
                
                {/* Verified Badge */}
                <div className="flex items-center justify-center mb-4">
                  <div className="inline-flex items-center space-x-2 bg-legacy-lightblue text-legacy-navy rounded-full px-4 py-2">
                    <CheckCircle className="w-4 h-4 text-legacy-blue" />
                    <span className="text-xs font-bold tracking-wide">VERIFIED FAMILY</span>
                  </div>
                </div>
                
                <blockquote className="text-base text-legacy-darkgray mb-6 leading-relaxed font-medium text-center">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-legacy-blue to-legacy-navy rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-legacy-navy text-lg">{testimonial.name}</div>
                    <div className="text-legacy-medgray font-medium text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY & TRUST BADGES */}
        <div className="bg-legacy-lightblue rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-legacy-navy mb-4">
              Enterprise-Grade Security & Trust
            </h3>
            <p className="text-legacy-darkgray font-medium">
              Your family's memories protected by military-level security standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-legacy-blue mb-2">256-bit</div>
              <div className="text-legacy-darkgray font-semibold">AES Encryption</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-legacy-blue mb-2">SOC2</div>
              <div className="text-legacy-darkgray font-semibold">Type II Compliant</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-legacy-blue mb-2">99.9%</div>
              <div className="text-legacy-darkgray font-semibold">Uptime SLA</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-legacy-blue mb-2">1000+</div>
              <div className="text-legacy-darkgray font-semibold">Families Trust Us</div>
            </div>
          </div>
        </div>

        {/* EMPIRE-LEVEL CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-legacy-navy to-legacy-blue rounded-3xl p-12 text-white shadow-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm tracking-wide">TRUSTED BY 1000+ FAMILIES</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Join Families Building Their Legacy with Military-Grade Security
            </h3>
            <p className="text-xl opacity-90 mb-8 font-medium">
              Start preserving your family's unique story with enterprise-level protection
            </p>
            <a 
              href="/signup"
              className="inline-block bg-white text-legacy-navy font-bold text-xl px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your Legacy Today - Free Trial
            </a>
            <p className="text-sm opacity-75 mt-4 font-medium">
              30-day free trial • No credit card required • Military-grade security • Cancel anytime
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
