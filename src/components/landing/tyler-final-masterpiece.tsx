/* TYLER'S FINAL GENESIS LEGACY AI MASTERPIECE */
/* Using Tyler's final professional images - the complete vision */

import Link from 'next/link'
import Image from 'next/image'

export function TylerFinalMasterpiece() {
  return (
    <main className="min-h-screen">
      
      {/* Hero Section - Tyler's Family Journey Path */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white"></div>
        
        {/* Animated gradient overlay for more color */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E75B6]/10 via-transparent to-[#1B3A5C]/10 animate-pulse"></div>
        
        {/* Tyler's Family Journey Path Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="relative w-full h-full">
            <Image 
              src="/images/genesis-story/family-journey-path.jpg"
              alt="Genesis Legacy AI - Family Journey Path"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Genesis Legacy AI Brand - LARGE INTEGRATED LOGO */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm mb-8 shadow-2xl ring-4 ring-white/20">
              {/* Tyler's CHOSEN TOP LOGO - Neural Network Shield (Large) */}
              <svg className="w-20 h-20 text-[#1B3A5C]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 15L25 27v25c0 12 8 25 25 30 17-5 25-18 25-30V27L50 15z" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="38" cy="38" r="3" fill="currentColor"/>
                <circle cx="50" cy="32" r="3" fill="currentColor"/>
                <circle cx="62" cy="38" r="3" fill="currentColor"/>
                <circle cx="42" cy="52" r="3" fill="currentColor"/>
                <circle cx="58" cy="52" r="3" fill="currentColor"/>
                <circle cx="50" cy="67" r="3" fill="currentColor"/>
                <path d="M38 38L50 32M50 32L62 38M38 38L42 52M62 38L58 52M42 52L50 67M58 52L50 67M42 52L58 52" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                <path d="M38 38L58 52M62 38L42 52" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>
            <h1 className="text-7xl font-bold tracking-tight mb-4 text-[#1B3A5C] drop-shadow-sm">Genesis Legacy AI</h1>
            <p className="text-3xl font-medium text-[#2E75B6] drop-shadow-sm">The Beginning of a Legacy</p>
          </div>

          <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight text-[#1B3A5C]">
            The gentle presence that walks<br />
            <span className="font-medium text-[#2E75B6]">with your family through every season</span>
          </h2>

          <p className="text-2xl md:text-3xl font-light mb-16 text-slate-600 max-w-4xl mx-auto leading-relaxed">
            A companion that carries wisdom from generation to generation, lighting the path forward for your family's journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/begin" 
              className="bg-gradient-to-r from-[#2E75B6] to-[#4A90E2] text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 hover:from-[#1B3A5C] hover:to-[#2E75B6] ring-2 ring-white/20"
            >
              Start Your Legacy Today - Free Trial
            </Link>
            <Link 
              href="#story" 
              className="text-slate-600 hover:text-[#2E75B6] font-medium text-xl px-8 py-5 transition-colors duration-300"
            >
              See Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Tyler's Complete Visual Story */}
      <section id="story" className="bg-gradient-to-b from-slate-50 to-white">
        
        {/* Story 1: The Genesis Family Tree */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light text-[#1B3A5C] mb-6">
                Plant AI roots today, harvest family prosperity for generations
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every family decision you make today shapes the opportunities and wisdom available to your children and grandchildren
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
              <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                <Image 
                  src="/images/genesis-story/genesis-family-tree-final.jpg"
                  alt="Genesis Family Tree - Multi-generational AI guidance and wisdom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Story 2: Family Learning Together */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">FAMILY LEARNING</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Learning that brings generations together
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Instead of dividing families into different educational paths, Genesis Legacy AI creates shared learning experiences that build bridges between generations.
                </p>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <p className="text-green-700 font-medium italic">
                    "When grandparents, parents, and children learn together, wisdom multiplies across generations."
                  </p>
                </div>
              </div>

              {/* Tyler's Family Learning Final Image */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/family-learning-final.jpg"
                    alt="Multi-generational family learning with Genesis Legacy AI companion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 3: Professional Advisory Services */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Tyler's Professional Advisory Image */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/professional-advisory.jpg"
                    alt="Professional advisory consultation with Genesis Legacy AI enhancement"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">PROFESSIONAL GUIDANCE</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Strategic intelligence for life's biggest decisions
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Whether it's financial planning, legal strategies, or business decisions, Genesis Legacy AI helps you think beyond immediate needs to generational impact.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <p className="text-blue-700 font-medium italic">
                    "Decisions that serve not just this quarter, but the next century."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 4: Corporate & Business Intelligence */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">BUSINESS STRATEGY</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Building businesses that serve generations
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis Legacy AI helps leaders make business decisions that create not just shareholder value, but generational wealth and positive impact for families and communities.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                  <p className="text-amber-700 font-medium italic">
                    "Business success that builds family legacies, not just profit margins."
                  </p>
                </div>
              </div>

              {/* Tyler's Corporate Boardroom Final Image */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/corporate-boardroom-final.jpg"
                    alt="Corporate boardroom with Genesis Legacy AI strategic planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 5: Trades & Vocational Knowledge Transfer */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Tyler's Workshop Mentorship Final */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/workshop-mentorship-final.jpg"
                    alt="Workshop mentorship with Genesis Legacy AI skill transfer enhancement"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">TRADES & SKILLS</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Master-to-apprentice wisdom, enhanced by AI
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis Legacy AI respects the traditional master-apprentice relationship while enhancing knowledge transfer with digital intelligence, ensuring skilled trades continue across generations.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                  <p className="text-orange-700 font-medium italic">
                    "Honoring craft tradition while accelerating skill development."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="py-32 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white relative overflow-hidden">
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="relative w-full h-full">
              <Image 
                src="/images/genesis-story/genesis-family-tree-final.jpg"
                alt="Genesis Legacy AI Background"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
            <div className="mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 6L14 16v18c0 10 7 20 18 22 11-2 18-12 18-22V16L32 6zm0 6l12 6v12c0 7-5 13-12 15-7-2-12-8-12-15V18l12-6z"/>
                  <circle cx="24" cy="26" r="2.5"/>
                  <circle cx="32" cy="26" r="2.5"/> 
                  <circle cx="40" cy="26" r="2.5"/>
                  <rect x="29" y="34" width="6" height="8" rx="1"/>
                </svg>
              </div>
            </div>

            <h3 className="text-5xl font-light mb-8 leading-tight">
              Your family's legacy begins<br />with one decision
            </h3>
            
            <p className="text-2xl font-light mb-16 opacity-90 leading-relaxed">
              Genesis Legacy AI becomes the gentle presence that guides your family's journey, 
              carrying wisdom across generations while lighting the path toward your family's greatest potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/begin" 
                className="bg-white text-[#1B3A5C] font-bold text-xl px-16 py-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 ring-4 ring-white/30"
              >
                Start Your Legacy Today - Free Trial
              </Link>
              <Link 
                href="/learn-more" 
                className="text-white/80 hover:text-white font-medium text-xl px-12 py-6 border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-12 text-lg font-light opacity-70">
              The beginning of a legacy
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}