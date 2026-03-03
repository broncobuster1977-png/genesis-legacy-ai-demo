import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Our Stories</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real families sharing how Genesis Legacy AI has become part of their journey across generations.
            </p>
          </div>

          <div className="grid gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">The Johnson Family Legacy</h3>
              <p className="text-slate-600 leading-relaxed">
                "Genesis Legacy AI helped us bridge the gap between our grandmother's wisdom and our children's digital world. 
                Now we learn together as a family." - Sarah Johnson
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-[#1B3A5C] mb-4">Building Business for Generations</h3>
              <p className="text-slate-600 leading-relaxed">
                "As a family business owner, Genesis Legacy AI helps me make decisions that serve not just this quarter, 
                but my children's children." - Michael Chen
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}