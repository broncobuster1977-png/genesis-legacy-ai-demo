import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function FamiliesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">For Families</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Genesis Legacy AI serves every type of family, in every season of life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Growing Families</h3>
              <p className="text-slate-600">
                From planning for children to helping them learn and grow, Genesis Legacy AI guides your family's journey.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Multi-Generational</h3>
              <p className="text-slate-600">
                Bringing grandparents, parents, and children together around shared wisdom and learning.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Working Families</h3>
              <p className="text-slate-600">
                Balancing career success with family priorities, creating sustainable prosperity.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Legacy Builders</h3>
              <p className="text-slate-600">
                Planning for generational wealth, health, and wisdom transfer across decades.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}