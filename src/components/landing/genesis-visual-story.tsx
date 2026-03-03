/* GENESIS LEGACY AI - TYLER'S PROGRESSIVE VISUAL STORY */
/* Using actual images Tyler created to tell the complete narrative */

import Link from 'next/link'
import Image from 'next/image'

export function GenesisVisualStory() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Hero Section - Genesis Family Tree */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#1B3A5C] via-[#2E75B6] to-[#1B3A5C] relative">
            {/* Tyler's Genesis Family Tree Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-4xl aspect-video">
                {/* Placeholder for Tyler's family tree with AI halos image */}
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🌳</div>
                    <div className="text-lg font-light">Tyler's Genesis Family Tree Image</div>
                    <div className="text-sm opacity-75">Multi-generational families with AI guidance halos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          {/* Genesis Legacy AI Logo */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 shadow-lg">
              {/* Tyler's community shield logo */}
              <svg className="w-10 h-10 text-white" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 4L12 14v20c0 12 8 24 20 26 12-2 20-14 20-26V14L32 4zm0 8l14 7v15c0 8-6 16-14 18-8-2-14-10-14-18V19l14-7z"/>
                <circle cx="22" cy="24" r="3"/>
                <circle cx="32" cy="24" r="3"/> 
                <circle cx="42" cy="24" r="3"/>
                <path d="M32 32l-3 3v6h6v-6l-3-3z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-wide">Genesis Legacy AI</h1>
            <p className="text-xl font-light mt-2 opacity-90">The Beginning of a Legacy</p>
          </div>

          <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Plant AI roots today.<br />
            <span className="font-medium">Harvest family prosperity for generations.</span>
          </h2>

          <p className="text-xl md:text-2xl font-light mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            One decision creates infinite generational impact. Your family's AI companion for every season of life.
          </p>

          <Link 
            href="/begin" 
            className="bg-white text-[#1B3A5C] font-medium text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-opacity-90"
          >
            Start Your Legacy Today - Free Trial
          </Link>
        </div>
      </section>

      {/* Problem/Solution Stories - Using Tyler's Images */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Story 1: Family Learning Challenge */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-[#1B3A5C] mb-6">
                The Challenge: Disconnected Learning
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Families struggle to learn together across generations. Traditional education divides rather than unites.
              </p>
              <div className="border-l-4 border-[#2E75B6] pl-6">
                <p className="text-[#2E75B6] font-medium">
                  "How do we build knowledge that brings our family closer?"
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-sm">
              {/* Tyler's family learning blocks image */}
              <div className="aspect-video rounded-xl bg-white/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">👨‍👩‍👧‍👦📚</div>
                  <div className="text-sm text-slate-600">Tyler's Family Learning Image</div>
                  <div className="text-xs text-slate-500">Grandfather, father, child with AI blocks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: Corporate Decision Making */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 shadow-sm">
                {/* Tyler's corporate boardroom image */}
                <div className="aspect-video rounded-xl bg-white/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏢💼</div>
                    <div className="text-sm text-slate-600">Tyler's Boardroom AI Image</div>
                    <div className="text-xs text-slate-500">Business leaders with AI strategy display</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-light text-[#1B3A5C] mb-6">
                The Solution: Strategic Intelligence
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Genesis Legacy AI becomes your family's strategic advisor, helping with decisions that impact generations.
              </p>
              <div className="border-l-4 border-[#2E75B6] pl-6">
                <p className="text-[#2E75B6] font-medium">
                  "AI that thinks beyond the quarter to the century."
                </p>
              </div>
            </div>
          </div>

          {/* Story 3: Healthcare Legacy */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-[#1B3A5C] mb-6">
                The Challenge: Family Health History
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Medical decisions affect not just you, but your children and their children. Health planning needs generational perspective.
              </p>
              <div className="border-l-4 border-[#2E75B6] pl-6">
                <p className="text-[#2E75B6] font-medium">
                  "How do we protect our family's health across generations?"
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-sm">
              {/* Tyler's healthcare consultation image */}
              <div className="aspect-video rounded-xl bg-white/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">👨‍⚕️👨‍👩‍👧</div>
                  <div className="text-sm text-slate-600">Tyler's Healthcare Legacy Image</div>
                  <div className="text-xs text-slate-500">Doctor with family, AI health planning</div>
                </div>
              </div>
            </div>
          </div>

          {/* Story 4: Financial Planning */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-sm">
                {/* Tyler's financial planning image */}
                <div className="aspect-video rounded-xl bg-white/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💰📊</div>
                    <div className="text-sm text-slate-600">Tyler's Financial Planning Image</div>
                    <div className="text-xs text-slate-500">Couple with tax/estate planning AI</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-light text-[#1B3A5C] mb-6">
                The Solution: Generational Wealth
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                From tax planning to estate building, Genesis Legacy AI helps your financial decisions benefit generations.
              </p>
              <div className="border-l-4 border-[#2E75B6] pl-6">
                <p className="text-[#2E75B6] font-medium">
                  "Building wealth that serves your family's future."
                </p>
              </div>
            </div>
          </div>

          {/* Story 5: The Liberation Story */}
          <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-light text-[#1B3A5C] mb-6">
                The Challenge: Breaking Free
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Sometimes families need help breaking cycles—financial, educational, emotional. The past doesn't have to determine the future.
              </p>
              <div className="border-l-4 border-[#2E75B6] pl-6">
                <p className="text-[#2E75B6] font-medium">
                  "How do we write a new story for our family?"
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-sm">
              {/* Tyler's liberation image */}
              <div className="aspect-video rounded-xl bg-white/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔓🌅</div>
                  <div className="text-sm text-slate-600">Tyler's Liberation Image</div>
                  <div className="text-xs text-slate-500">Prison to family reunion transformation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Story: The Complete Family Hub */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-3xl p-16 shadow-lg text-white">
              <div className="max-w-4xl mx-auto">
                {/* Tyler's family hub gathering image */}
                <div className="mb-12 aspect-video rounded-xl bg-white/10 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">👨‍👩‍👧‍👦💡</div>
                    <div className="text-lg">Tyler's Family Hub Image</div>
                    <div className="text-sm opacity-75">Multi-generation family around Genesis Legacy AI</div>
                  </div>
                </div>
                
                <h3 className="text-4xl font-light mb-8">
                  Your Family's Central Intelligence
                </h3>
                <p className="text-xl font-light mb-12 opacity-90 leading-relaxed">
                  One AI companion. Every family need. Generations of wisdom. 
                  The gentle presence that appears when your family needs guidance.
                </p>
                <Link 
                  href="/begin" 
                  className="bg-white text-[#1B3A5C] font-medium text-lg px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Your Legacy Today - Free Trial
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}