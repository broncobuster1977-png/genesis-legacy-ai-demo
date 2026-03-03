import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Features</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Genesis Legacy AI combines cutting-edge intelligence with timeless wisdom to serve your family across generations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Multi-Generational Learning</h3>
              <p className="text-slate-600">
                Brings together grandparents, parents, and children around shared educational experiences that honor all perspectives.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Strategic Life Planning</h3>
              <p className="text-slate-600">
                AI-powered guidance for major family decisions, from education to careers to investments, with generational impact in mind.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Family Wisdom Archive</h3>
              <p className="text-slate-600">
                Preserves and organizes family stories, lessons learned, and decision-making patterns to guide future generations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Business Legacy Support</h3>
              <p className="text-slate-600">
                Helps family business owners make decisions that serve both immediate success and long-term generational value.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Privacy & Security</h3>
              <p className="text-slate-600">
                Your family's data remains private and secure, with transparent AI processing and no external data sharing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Adaptive Guidance</h3>
              <p className="text-slate-600">
                Learns your family's values, goals, and decision-making patterns to provide increasingly personalized guidance over time.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Legacy Today?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the families who are already building their legacy with Genesis Legacy AI.
            </p>
            <a
              href="/signup"
              className="bg-white text-[#1B3A5C] font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}