/* TYLER'S PROGRESSIVE VISUAL STORY - GENESIS LEGACY AI */
/* Using Tyler's actual color scheme and simple problem/solution flow */

import Link from 'next/link'
import Image from 'next/image'

export function TylerStory() {
  return (
    <main className="min-h-screen">
      
      {/* Hero Section - Tyler's Genesis Tree Concept */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#2E75B6] to-[#1B3A5C]"></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          {/* Genesis Legacy AI Brand Mark */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-xl bg-white/10 backdrop-blur-sm mb-8 shadow-2xl">
              {/* Tyler's Community Shield Logo */}
              <svg className="w-12 h-12 text-white" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 6L14 16v18c0 10 7 20 18 22 11-2 18-12 18-22V16L32 6zm0 6l12 6v12c0 7-5 13-12 15-7-2-12-8-12-15V18l12-6z"/>
                <circle cx="24" cy="26" r="2.5"/>
                <circle cx="32" cy="26" r="2.5"/> 
                <circle cx="40" cy="26" r="2.5"/>
                <rect x="29" y="34" width="6" height="8" rx="1"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold tracking-wide mb-4">Genesis Legacy AI</h1>
            <p className="text-2xl font-light opacity-90">The Beginning of a Legacy</p>
          </div>

          {/* Hero Message */}
          <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight">
            Plant AI roots today.<br />
            <span className="font-medium text-white/90">Harvest family prosperity for generations.</span>
          </h2>

          <p className="text-2xl md:text-3xl font-light mb-16 opacity-80 max-w-4xl mx-auto leading-relaxed">
            The gentle presence that walks with your family through every season of life.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/begin" 
              className="bg-white text-[#1B3A5C] font-semibold text-xl px-12 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Your Legacy Today - Free Trial
            </Link>
            <Link 
              href="#story" 
              className="text-white/80 hover:text-white font-medium text-xl px-8 py-5 transition-colors duration-300"
            >
              See Our Story
            </Link>
          </div>
        </div>

        {/* Tyler's Genesis Family Tree Background */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl aspect-video opacity-10">
          <div className="relative w-full h-full rounded-t-3xl overflow-hidden">
            <Image 
              src="/images/genesis-story/genesis-family-tree.jpg"
              alt="Genesis Family Tree"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Progressive Story Sections */}
      <section id="story" className="bg-gradient-to-b from-slate-50 to-white">
        
        {/* Story 1: Family Learning Problem */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Problem Text */}
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">THE CHALLENGE</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Families learn apart,<br />not together
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Traditional education divides generations instead of building shared wisdom. 
                  Grandparents, parents, and children all learn different things, different ways.
                </p>
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <p className="text-red-700 font-medium italic">
                    "How do we create learning that brings our family closer together?"
                  </p>
                </div>
              </div>

              {/* Tyler's Family Learning Challenge Image */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/family-learning-blocks.jpg"
                    alt="Family Learning Challenge - Disconnected generations"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 2: AI Solution */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Tyler's Genesis Family Tree Solution */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/genesis-family-tree.jpg"
                    alt="Genesis Family Tree - AI guidance for generations"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Solution Text */}
              <div className="order-1 lg:order-2">
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">THE SOLUTION</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Genesis creates shared<br />family intelligence
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis Legacy AI becomes the family's learning companion, helping everyone grow together 
                  while respecting each generation's wisdom.
                </p>
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <p className="text-green-700 font-medium italic">
                    "Learning that brings families together, not apart."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 3: Business Challenge */}
        <div className="py-24 bg-gradient-to-b from-slate-50 to-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <div className="text-sm font-medium text-[#2E75B6] mb-4 tracking-wide">BUSINESS CHALLENGE</div>
                <h3 className="text-4xl font-light text-[#1B3A5C] mb-8 leading-tight">
                  Decisions affect generations,<br />but thinking stops at quarters
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Business decisions impact not just this year's profits, but your children's opportunities 
                  and your grandchildren's world.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                  <p className="text-amber-700 font-medium italic">
                    "How do we build businesses that serve generations, not just shareholders?"
                  </p>
                </div>
              </div>

              {/* Tyler's Corporate Boardroom Image */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-3xl p-8 shadow-lg">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image 
                    src="/images/genesis-story/corporate-boardroom.jpg"
                    alt="Corporate boardroom with AI strategic planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story 4: Health Legacy */}
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
                  Your health decisions<br />shape family futures
                </h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Genesis helps your family make health decisions with generational perspective, 
                  protecting not just your wellbeing but your children's genetic legacy.
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
              carrying wisdom across generations.
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