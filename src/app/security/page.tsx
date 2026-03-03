import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SecurityPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Security</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your family's security is our foundation. Here's how we protect what matters most to you.
            </p>
          </div>

          {/* Security Overview */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 mb-16 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-8">
              <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-[#1B3A5C] mb-6">Enterprise-Grade Security</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Genesis Legacy AI uses the same security standards as Fortune 500 companies and financial institutions 
              to protect your family's most sensitive information.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">End-to-End Encryption</h3>
              <p className="text-slate-600">
                All family conversations, documents, and data are encrypted both in transit and at rest using AES-256 encryption.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Zero-Trust Architecture</h3>
              <p className="text-slate-600">
                Every access request is verified, authenticated, and authorized before granting access to any family data.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Regular Security Audits</h3>
              <p className="text-slate-600">
                Independent third-party security firms conduct quarterly audits to ensure our systems meet the highest standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Advanced Threat Detection</h3>
              <p className="text-slate-600">
                AI-powered monitoring systems detect and respond to security threats in real-time, 24/7.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Automatic Backups</h3>
              <p className="text-slate-600">
                Your family's data is continuously backed up across multiple secure data centers with instant recovery capabilities.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1B3A5C] mb-4">Multi-Factor Authentication</h3>
              <p className="text-slate-600">
                Required 2FA for all accounts with support for authenticator apps, SMS, and hardware security keys.
              </p>
            </div>
          </div>

          {/* Compliance Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Compliance & Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-slate-700 font-bold text-lg">SOC 2</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">SOC 2 Type II</h3>
                <p className="text-slate-600 text-sm">Audited security and availability controls</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-lg">GDPR</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">GDPR Compliant</h3>
                <p className="text-slate-600 text-sm">European data protection standards</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-700 font-bold text-lg">CCPA</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">CCPA Compliant</h3>
                <p className="text-slate-600 text-sm">California privacy rights protection</p>
              </div>

              <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-700 font-bold text-lg">ISO</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">ISO 27001</h3>
                <p className="text-slate-600 text-sm">International security management standards</p>
              </div>
            </div>
          </div>

          {/* Data Centers */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Secure Data Centers</h2>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-6">Enterprise Infrastructure</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-slate-700"><strong>Tier IV Data Centers:</strong> 99.995% uptime guarantee with redundant systems</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-slate-700"><strong>Multi-Region Redundancy:</strong> Data replicated across 3+ geographic regions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-slate-700"><strong>Physical Security:</strong> Biometric access controls and 24/7 armed security</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-slate-700"><strong>Environmental Controls:</strong> Climate-controlled with redundant power systems</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12">
                    <svg className="w-24 h-24 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-13a2 2 0 012-2h2a2 2 0 012 2v11a3 3 0 11-6 0V2zm2 2v9a3 3 0 106 0V4a2 2 0 00-2-2h-2a2 2 0 00-2 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Team */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#1B3A5C] text-center mb-12">Dedicated Security Team</h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center">
              <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
                Our security team includes former cybersecurity professionals from Fortune 500 companies, 
                government agencies, and leading security firms. They monitor our systems 24/7 and 
                continuously improve our security posture.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E75B6] mb-2">24/7</div>
                  <div className="text-slate-600">Security Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E75B6] mb-2">&lt;15min</div>
                  <div className="text-slate-600">Threat Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2E75B6] mb-2">100%</div>
                  <div className="text-slate-600">Incident Transparency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Security Team */}
          <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Questions About Security?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our security team is available to answer any questions about how we protect your family's data.
            </p>
            <div className="space-y-4">
              <div>
                <a
                  href="mailto:security@genesislegacy.ai"
                  className="bg-white text-[#1B3A5C] font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg inline-block"
                >
                  Contact Security Team
                </a>
              </div>
              <p className="text-sm opacity-75">
                Response within 2 hours for security inquiries
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}