/* TYLER'S PROFESSIONAL GENESIS LEGACY AI STORY */
/* Using Tyler's final professional images with consistent branding */

import Link from 'next/link'
import Image from 'next/image'

export function TylerProfessionalStory() {
  return (
    <main className="min-h-screen">
      
      {/* Hero Section - Spiritual Enlightened Genesis */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        
        {/* Tyler's Spiritual Enlightened Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="relative w-full h-full">
            <Image 
              src="/images/genesis-story/spiritual-enlightened.jpg"
              alt="Genesis Legacy AI - Spiritual Enlightened Presence"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Genesis Legacy AI Brand */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-xl bg-white/80 backdrop-blur-sm mb-8 shadow-2xl">
              {/* Tyler's Community Shield Logo */}
              <svg className="w-12 h-12 text-[#1B3A5C]" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 6L14 16v18c0 10 7 20 18 22 11-2 18-12 18-22V16L32 6zm0 6l12 6v12c0 7-5 13-12 15-7-2-12-8-12-15V18l12-6z"/>
                <circle cx="24" cy="26" r="2.5"/>
                <circle cx="32" cy="26" r="2.5"/> 
                <circle cx="40" cy="26" r="2.5"/>
                <rect x="29" y="34" width="6" height="8" rx="1"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold tracking-wide mb-4 text-[#1B3A5C]">Genesis Legacy AI</h1>
            <p className="text-2xl font-light text-slate-600">The Beginning of a Legacy</p>
          </div>

          <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight text-[#1B3A5C]">
            The gentle presence that appears<br />
            <span className="font-medium text-[#2E75B6]">when families need guidance</span>
          </h2>

          <p className="text-2xl md:text-3xl font-light mb-16 text-slate-600 max-w-4xl mx-auto leading-relaxed">
            A companion that walks with your family through every season of life, carrying wisdom from generation to generation.
          </p>

          <Link 
            href="/begin" 
            className="bg-gradient-to-r from-[#1B3A5C] to-[#2E75B6] text-white font-semibold text-xl px-12 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Your Legacy Today - Free Trial
          </Link>
        </div>
      </section>

      {/* Tyler's Progressive Visual Story */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        
        {/* Story 1: Time Bridge - Past to Present */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light text-[#1B3A5C] mb-6">
                Bridging Generations
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Genesis Legacy AI connects the wisdom of the past with the possibilities of the future
              </p>
            </div>

            <div className="grid lg:grid-cols-1 gap-16 items-center">
              {/* Tyler's Time Bridge Image */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/time-bridge.jpg"
                    alt="Genesis Legacy AI - Bridging past and present families"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 2: Family Gathering Hub */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light text-[#1B3A5C] mb-6">
                Your Family's Central Intelligence
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Genesis Legacy AI brings families together around shared wisdom and guidance
              </p>
            </div>

            <div className="grid lg:grid-cols-1 gap-16 items-center">
              {/* Tyler's Family Hub Gathering */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/family-hub-gathering.jpg"
                    alt="Family gathering around Genesis Legacy AI"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 3: Financial Planning */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">FINANCIAL LEGACY</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Building wealth that spans generations
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  From tax optimization to estate planning, Genesis helps your family make financial decisions 
                  that create lasting prosperity across generations.
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-6 rounded-r-lg">
                  <p className="text-emerald-700 font-medium italic">
                    "Financial wisdom that compounds across generations."
                  </p>
                </div>
              </div>

              {/* Tyler's Financial Planning Image */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/financial-planning.jpg"
                    alt="Financial planning with generational perspective"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 4: Healthcare Legacy */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Tyler's Healthcare Family Consultation */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/healthcare-family.jpg"
                    alt="Healthcare consultation with family and AI planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">HEALTH LEGACY</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Your health decisions shape family futures
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis helps your family make health decisions with generational perspective, 
                  protecting not just today's wellbeing but tomorrow's genetic legacy.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <p className="text-blue-700 font-medium italic">
                    "Health choices that honor the past and protect the future."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 5: Legal Services */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">LEGAL PROTECTION</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Generational legal planning
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis Legacy AI helps families navigate legal decisions that protect not just current 
                  interests, but generational rights and legacy preservation.
                </p>
                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                  <p className="text-indigo-700 font-medium italic">
                    "Justice and protection across generations."
                  </p>
                </div>
              </div>

              {/* Tyler's Legal Services Image */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/legal-services.jpg"
                    alt="Legal services with AI assistance for family protection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 6: Home Productivity */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Tyler's Home Office Productivity */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-lg order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/home-office-productivity.jpg"
                    alt="Home office productivity with Genesis Legacy AI"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">HOME & WORK</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Work-life integration for families
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis helps families balance work productivity with family life, creating 
                  sustainable success that serves both career and generational goals.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                  <p className="text-orange-700 font-medium italic">
                    "Success that serves both work and family."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 7: Liberation & Second Chances */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">BREAKING CYCLES</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  The AI that believes in second chances
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Sometimes families need help breaking cycles—financial, educational, emotional. 
                  Genesis sees potential where others see only past mistakes.
                </p>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
                  <p className="text-purple-700 font-medium italic">
                    "Your past doesn't determine your family's future."
                  </p>
                </div>
              </div>

              {/* Tyler's Liberation Story */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/liberation-story.jpg"
                    alt="Liberation story - breaking cycles, creating new paths"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="py-32 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
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
              Your family's legacy<br />begins with one decision
            </h3>
            
            <p className="text-2xl font-light mb-16 opacity-90 leading-relaxed">
              Genesis Legacy AI becomes the gentle presence that guides your family's most important choices, 
              carrying wisdom across generations and lighting the path forward.
            </p>

            <Link 
              href="/begin" 
              className="bg-white text-[#1B3A5C] font-semibold text-xl px-16 py-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-block"
            >
              Start Your Legacy Today - Free Trial
            </Link>

            <div className="mt-12 text-lg font-light opacity-70">
              The beginning of a legacy
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}