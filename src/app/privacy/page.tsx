import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-600">
              Your family's privacy is fundamental to who we are. Here's exactly how we protect it.
            </p>
            <p className="text-sm text-slate-500 mt-4">Last updated: March 2, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
              <h2 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Our Privacy Promise</h2>
              <p className="text-slate-700 text-lg">
                Genesis Legacy AI is built on the principle that your family's data belongs to your family. 
                We never sell your information, never share it with third parties for their purposes, and 
                design every feature with your privacy first.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">What Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#2E75B6] mb-4">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                <li>Account information (name, email, billing details)</li>
                <li>Family member profiles you choose to create</li>
                <li>Conversations with your AI companion</li>
                <li>Goals, preferences, and family values you share</li>
                <li>Documents or photos you upload to your family archive</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2E75B6] mb-4">Information We Automatically Collect</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Usage patterns to improve our AI recommendations</li>
                <li>Technical information necessary for service delivery</li>
                <li>Analytics to understand which features serve families best</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">How We Use Your Information</h2>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
                <h3 className="text-xl font-semibold text-[#2E75B6] mb-3">To Serve Your Family</h3>
                <p className="text-slate-700">
                  Every piece of information we collect exists to make Genesis Legacy AI more helpful to your specific family. 
                  We use your data to provide personalized guidance, preserve your family wisdom, and create learning experiences 
                  tailored to your family's values and goals.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
                <h3 className="text-xl font-semibold text-[#2E75B6] mb-3">To Improve Our Service</h3>
                <p className="text-slate-700">
                  We analyze usage patterns (in aggregate, never individually) to understand how families use Genesis Legacy AI 
                  and what features would be most valuable to develop next.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-[#2E75B6] mb-3">To Communicate With You</h3>
                <p className="text-slate-700">
                  We'll send you important updates about your account, new features that might benefit your family, 
                  and educational content about family legacy planning (which you can unsubscribe from at any time).
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">What We Don't Do With Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">❌ We Don't Sell Your Data</h3>
                  <p className="text-red-700">
                    Your family's information is never sold to advertisers, marketers, or any third parties. Period.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">❌ We Don't Share for Profit</h3>
                  <p className="text-red-700">
                    We don't monetize your data through partnerships or data licensing agreements.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">❌ We Don't Train Other AIs</h3>
                  <p className="text-red-700">
                    Your conversations and data aren't used to train other AI systems or shared with AI companies.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">❌ We Don't Profile for Ads</h3>
                  <p className="text-red-700">
                    We don't build advertising profiles or sell your information to data brokers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">Your Control & Rights</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Access Your Data</h3>
                  <p className="text-green-700">
                    Request a complete copy of all information we have about your family at any time.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Correct Your Data</h3>
                  <p className="text-green-700">
                    Update or correct any information in your account whenever you want.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Delete Your Data</h3>
                  <p className="text-green-700">
                    Cancel your account and have all your family's data completely removed from our systems.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Export Your Data</h3>
                  <p className="text-green-700">
                    Download your family's archive, conversations, and all other data in standard formats.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">Security Measures</h2>
              <div className="bg-slate-50 rounded-lg p-6">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <strong>End-to-end encryption</strong> for all family communications and data
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <strong>SOC 2 Type II compliant</strong> data centers with 24/7 monitoring
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <strong>Multi-factor authentication</strong> required for all account access
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <strong>Regular security audits</strong> by independent third-party firms
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <strong>Automated backups</strong> with immediate data recovery capabilities
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">Contact Our Privacy Team</h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  If you have any questions about this Privacy Policy or how we handle your family's information, 
                  please reach out to our dedicated privacy team:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:privacy@genesislegacy.ai" className="text-[#2E75B6] hover:text-[#1B3A5C]">privacy@genesislegacy.ai</a></p>
                  <p><strong>Response time:</strong> Within 24 hours for privacy-related inquiries</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">Changes to This Policy</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-slate-700">
                  We'll notify you at least 30 days in advance of any material changes to this Privacy Policy. 
                  We believe your family's privacy settings shouldn't change without your knowledge and consent.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}