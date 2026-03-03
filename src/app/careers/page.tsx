import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Join Our Mission</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Help us build AI technology that strengthens families across generations. 
              Work on meaningful problems with a team that values both innovation and human connection.
            </p>
          </div>

          {/* Culture Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Why Work at Genesis Legacy AI</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Meaningful Impact</h3>
                <p className="text-slate-600">
                  Every feature you build directly helps real families create stronger bonds and better futures.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Family-First Culture</h3>
                <p className="text-slate-600">
                  We practice what we preach: flexible schedules, family time respect, and generational thinking in our policies.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Technical Excellence</h3>
                <p className="text-slate-600">
                  Work with cutting-edge AI technology while maintaining the highest standards for privacy and security.
                </p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Open Positions</h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1B3A5C] mb-2">Senior AI Engineer</h3>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        Austin, TX / Remote
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Full-time
                      </span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                </div>
                <p className="text-slate-600 mb-6">
                  Lead development of our family-focused AI systems. Work on natural language processing, 
                  recommendation systems, and conversational AI that respects family dynamics and privacy.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Python</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">TensorFlow</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">NLP</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Privacy-first AI</span>
                  </div>
                  <a
                    href="mailto:careers@genesislegacy.ai?subject=Senior AI Engineer"
                    className="bg-[#2E75B6] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#1B3A5C] transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1B3A5C] mb-2">Product Designer</h3>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        Austin, TX / Remote
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Full-time
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Design experiences that bring families together rather than pull them apart. Create interfaces 
                  that work for users from 8 to 80, balancing simplicity with powerful functionality.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Figma</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">User Research</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Accessibility</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Multi-generational UX</span>
                  </div>
                  <a
                    href="mailto:careers@genesislegacy.ai?subject=Product Designer"
                    className="bg-[#2E75B6] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#1B3A5C] transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1B3A5C] mb-2">Family Success Specialist</h3>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        Austin, TX / Remote
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Full-time
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Help families get the most value from Genesis Legacy AI. Provide support, onboarding, 
                  and strategic guidance to help families achieve their generational goals.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Customer Success</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Family Psychology</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Communication</span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">Empathy</span>
                  </div>
                  <a
                    href="mailto:careers@genesislegacy.ai?subject=Family Success Specialist"
                    className="bg-[#2E75B6] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#1B3A5C] transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Benefits & Perks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Equity Package</h3>
                <p className="text-slate-600 text-sm">Share in the success you help create</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Flexible Hours</h3>
                <p className="text-slate-600 text-sm">Work when you're most productive</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Family Time</h3>
                <p className="text-slate-600 text-sm">Unlimited PTO for family events</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Growth Budget</h3>
                <p className="text-slate-600 text-sm">$3K annually for learning</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Don't See the Right Role?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for exceptional people who share our mission. 
              Tell us how you'd like to help strengthen families with AI.
            </p>
            <a
              href="mailto:careers@genesislegacy.ai?subject=General Interest"
              className="bg-white text-[#1B3A5C] font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}