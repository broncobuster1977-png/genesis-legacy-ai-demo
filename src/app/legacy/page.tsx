import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function LegacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Your Legacy</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every decision you make today shapes the opportunities and wisdom available to future generations.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-3xl font-semibold text-[#1B3A5C] mb-6">Building Generational Wealth</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Genesis Legacy AI helps families make financial decisions that compound across generations, 
                creating lasting prosperity that serves children and grandchildren.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-3xl font-semibold text-[#1B3A5C] mb-6">Preserving Family Wisdom</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                The stories, lessons, and insights from your family's history become part of the intelligence 
                that guides future generations through their own challenges.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-3xl font-semibold text-[#1B3A5C] mb-6">Creating Lasting Impact</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Your legacy isn't just what you leave behind—it's what you build while you're here. 
                Genesis Legacy AI helps you create impact that echoes through generations.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}