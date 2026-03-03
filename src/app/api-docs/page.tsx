import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function APIPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Developer API</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Build custom integrations and extend Genesis Legacy AI's capabilities with our family-first API.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-3xl p-12 mb-16 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl mb-8">
              <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-amber-800 mb-6">API Coming Q2 2026</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
              We're building a comprehensive API that respects family privacy while enabling powerful integrations. 
              Join the waitlist to be the first to know when it launches.
            </p>
            <a
              href="#waitlist"
              className="bg-amber-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-amber-700 transition-colors shadow-lg inline-block"
            >
              Join API Waitlist
            </a>
          </div>

          {/* Planned Features */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Planned API Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Family Management</h3>
                <p className="text-slate-600">
                  Create and manage family profiles, add members, set permissions, and organize generational structures.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">AI Conversations</h3>
                <p className="text-slate-600">
                  Send messages to family AI companions, retrieve conversation history, and customize AI behavior.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Knowledge Archive</h3>
                <p className="text-slate-600">
                  Store family stories, upload documents, organize wisdom, and retrieve generational knowledge.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Goals & Planning</h3>
                <p className="text-slate-600">
                  Set family goals, track progress, create legacy plans, and receive AI-powered strategic guidance.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Learning & Education</h3>
                <p className="text-slate-600">
                  Access family learning resources, create educational content, and track multi-generational learning progress.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Integrations</h3>
                <p className="text-slate-600">
                  Connect with calendars, financial tools, educational platforms, and other family-focused services.
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">API Use Cases</h2>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Family Office Integration</h3>
                    <p className="text-slate-600 mb-4">
                      Connect Genesis Legacy AI with wealth management systems, family governance tools, and private banking platforms 
                      to provide AI-powered insights on generational wealth strategies.
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Automated family meeting summaries</li>
                      <li>• Investment decision analysis</li>
                      <li>• Succession planning recommendations</li>
                      <li>• Multi-generational goal tracking</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="inline-block bg-white bg-opacity-60 rounded-2xl p-8">
                      <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:order-2">
                    <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Educational Technology</h3>
                    <p className="text-slate-600 mb-4">
                      Integrate with learning management systems, homeschool platforms, and educational apps to create 
                      personalized learning experiences that involve multiple generations.
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Multi-generational learning plans</li>
                      <li>• Grandparent-grandchild learning sessions</li>
                      <li>• Family skill sharing programs</li>
                      <li>• Progress tracking across generations</li>
                    </ul>
                  </div>
                  <div className="text-center lg:order-1">
                    <div className="inline-block bg-white bg-opacity-60 rounded-2xl p-8">
                      <svg className="w-24 h-24 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Family Business Tools</h3>
                    <p className="text-slate-600 mb-4">
                      Connect with business management systems, HR platforms, and financial tools to integrate family values 
                      and generational thinking into business operations.
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Values-based decision making</li>
                      <li>• Family employment planning</li>
                      <li>• Legacy impact assessment</li>
                      <li>• Generational leadership development</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="inline-block bg-white bg-opacity-60 rounded-2xl p-8">
                      <svg className="w-24 h-24 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waitlist Signup */}
          <div id="waitlist" className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the API Waitlist</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Be the first to know when our API launches. Get early access, documentation previews, 
              and priority support for your integration projects.
            </p>
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Company/Organization (optional)"
                className="w-full px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <textarea
                placeholder="Tell us about your planned integration or use case..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-white text-[#1B3A5C] font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}