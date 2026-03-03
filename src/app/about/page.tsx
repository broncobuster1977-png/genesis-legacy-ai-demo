import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">About Genesis Legacy AI</h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We believe artificial intelligence should serve families, not replace them. Genesis Legacy AI is built to honor human wisdom while extending it across generations.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[#1B3A5C] mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To create AI technology that strengthens family bonds rather than strains them. We envision a future where artificial intelligence helps preserve family wisdom, guides strategic decisions, and creates learning experiences that bring generations together.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Unlike AI designed for productivity or profit maximization, Genesis Legacy AI is purpose-built to serve the unique needs of families thinking beyond quarterly results or annual goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Family-First AI</h3>
                <p className="text-slate-600">
                  Every decision we make in building Genesis Legacy AI starts with the question: "How does this serve families across generations?"
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Privacy & Trust</h3>
                <p className="text-slate-600">
                  Your family's data belongs to your family. We never sell, share, or use your information for purposes beyond serving your direct needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Generational Thinking</h3>
                <p className="text-slate-600">
                  Every feature is designed to create value not just today, but for your children and their children. We build for decades, not quarters.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Human Connection</h3>
                <p className="text-slate-600">
                  Technology should bring families closer, not drive them apart. Our AI enhances human relationships rather than replacing them.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-[#1B3A5C] mb-6">Why Genesis Legacy AI Exists</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The idea for Genesis Legacy AI came from a simple observation: most AI systems are built to optimize for efficiency, productivity, or profit. But families don't optimize—they grow, learn, love, and build legacies together.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We saw an opportunity to create artificial intelligence that understands the unique needs of families: the desire to pass wisdom across generations, make decisions that serve the long term, and create learning experiences that honor both innovation and tradition.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Genesis Legacy AI is our answer to the question: "What if AI was designed from the ground up to serve families across generations?"
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Built by Families, for Families</h2>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our team consists of parents, grandparents, and family members who understand firsthand the challenges and joys of building something that lasts beyond one generation.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We combine expertise in artificial intelligence, family systems, education, and generational wealth planning to create technology that truly serves family needs.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Legacy Today?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join us in creating a future where AI strengthens families across generations.
            </p>
            <a
              href="/signup"
              className="bg-white text-[#1B3A5C] font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg inline-block"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}