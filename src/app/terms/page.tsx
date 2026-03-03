import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Terms of Service</h1>
            <p className="text-xl text-slate-600">
              Clear, family-friendly terms for using Genesis Legacy AI.
            </p>
            <p className="text-sm text-slate-500 mt-4">Last updated: March 2, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
              <h2 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Welcome to Genesis Legacy AI</h2>
              <p className="text-slate-700 text-lg">
                These terms are designed to be clear and fair. We're not trying to hide anything in legal language—
                we want you to understand exactly what you're agreeing to when you use our service.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">1. Your Agreement With Us</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <p className="text-slate-700 mb-4">
                  By creating an account with Genesis Legacy AI, you agree to these terms. If anything changes 
                  materially, we'll give you at least 30 days' notice and the option to cancel if you don't 
                  agree with the changes.
                </p>
                <p className="text-slate-700">
                  You must be at least 18 years old to create an account, though family members of all ages 
                  can be added to your family profile with your permission.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">2. How Genesis Legacy AI Works</h2>
              
              <h3 className="text-xl font-semibold text-[#2E75B6] mb-4">Your AI Companion</h3>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>• Genesis Legacy AI learns from your family's conversations and goals to provide personalized guidance</li>
                  <li>• The AI makes recommendations but all final decisions remain with your family</li>
                  <li>• We continuously improve the AI based on general usage patterns, not your specific data</li>
                  <li>• The AI is designed to supplement, not replace, human judgment and family relationships</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-[#2E75B6] mb-4">Service Availability</h3>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700">
                  We strive for 99.9% uptime, but like all technology services, Genesis Legacy AI may occasionally 
                  be unavailable for maintenance or unexpected issues. We'll communicate any planned maintenance 
                  in advance and work quickly to resolve any unplanned outages.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">3. Your Responsibilities</h2>
              
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Account Security</h3>
                  <p className="text-slate-700">
                    Keep your login credentials secure and notify us immediately if you suspect unauthorized access. 
                    Use strong passwords and enable two-factor authentication when available.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Appropriate Use</h3>
                  <p className="text-slate-700">
                    Use Genesis Legacy AI for its intended purpose: supporting your family's growth, learning, 
                    and legacy planning. Don't use it for illegal activities or to harm others.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Content You Share</h3>
                  <p className="text-slate-700">
                    You're responsible for the accuracy of information you provide and ensuring you have the right 
                    to share any content (photos, documents, stories) you upload to your family archive.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">4. Payment & Billing</h2>
              
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Simple, Transparent Pricing</h3>
                <ul className="space-y-2 text-amber-700">
                  <li>• All pricing is clearly displayed and includes any applicable taxes</li>
                  <li>• You can upgrade or downgrade your plan at any time</li>
                  <li>• Billing is monthly unless you choose an annual plan for savings</li>
                  <li>• 30-day free trial available for all new accounts</li>
                  <li>• Cancel anytime with no penalties or long-term commitments</li>
                  <li>• Refunds available within 30 days if you're not satisfied</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">5. Your Data & Privacy</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">What You Own</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• <strong>Your Content:</strong> All photos, documents, stories, and other content you upload remains yours</li>
                  <li>• <strong>Your Data:</strong> Information about your family, conversations, and preferences belongs to you</li>
                  <li>• <strong>Your Archive:</strong> The family wisdom archive you build is your intellectual property</li>
                  <li>• <strong>Portability:</strong> You can export all your data in standard formats at any time</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">6. Important Disclaimers</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Not Professional Advice</h3>
                  <p className="text-red-700">
                    Genesis Legacy AI provides information and suggestions, but not professional financial, legal, 
                    medical, or therapeutic advice. Always consult qualified professionals for important decisions.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">Use Your Judgment</h3>
                  <p className="text-orange-700">
                    While our AI is sophisticated, it's not infallible. Always use your own judgment and consider 
                    multiple perspectives when making important family decisions.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Technology Limitations</h3>
                  <p className="text-yellow-700">
                    AI technology continues to evolve. While we work hard to provide accurate and helpful guidance, 
                    technology has limitations and may occasionally make mistakes.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">7. If Something Goes Wrong</h2>
              
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  We're committed to making things right if our service doesn't meet your expectations:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Contact us first:</strong> Most issues can be resolved quickly through support</li>
                  <li>• <strong>30-day money-back guarantee:</strong> Full refund if you're not satisfied</li>
                  <li>• <strong>Fair resolution:</strong> We'll work with you to find a solution that's right for your family</li>
                  <li>• <strong>Limitation of liability:</strong> Our liability is limited to the amount you've paid for the service</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">8. Cancellation & Account Closure</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">You Can Cancel Anytime</h3>
                  <ul className="space-y-1 text-slate-700">
                    <li>• No penalties or fees</li>
                    <li>• Keep access until billing period ends</li>
                    <li>• Export all your data before closure</li>
                    <li>• Easy cancellation process</li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Data Handling After Cancellation</h3>
                  <ul className="space-y-1 text-slate-700">
                    <li>• 90-day grace period to reactivate</li>
                    <li>• Complete data deletion after 90 days</li>
                    <li>• Download your data anytime during grace period</li>
                    <li>• No hidden data retention</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">9. Updates to These Terms</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  If we need to update these terms, we'll:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• Give you at least 30 days' advance notice</li>
                  <li>• Explain what's changing and why</li>
                  <li>• Offer you the option to cancel if you don't agree</li>
                  <li>• Never make changes that retroactively affect your rights</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-6">10. Questions?</h2>
              
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  We're here to help. If you have any questions about these terms or how Genesis Legacy AI works:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:legal@genesislegacy.ai" className="text-[#2E75B6] hover:text-[#1B3A5C]">legal@genesislegacy.ai</a></p>
                  <p><strong>Support:</strong> <a href="mailto:hello@genesislegacy.ai" className="text-[#2E75B6] hover:text-[#1B3A5C]">hello@genesislegacy.ai</a></p>
                  <p><strong>Response time:</strong> Within 24 hours for terms-related questions</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}