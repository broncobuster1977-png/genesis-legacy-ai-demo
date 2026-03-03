import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#1B3A5C] mb-6">Family Wisdom Blog</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Insights, stories, and guidance for families building legacies that last generations.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-gradient-to-br from-[#1B3A5C] to-[#2E75B6] text-white rounded-3xl p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Featured Article
                </span>
                <h2 className="text-4xl font-bold mb-4">
                  The Five Pillars of Generational Wealth
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Beyond financial assets: How families build wealth that serves multiple generations through 
                  wisdom, relationships, and strategic thinking.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center bg-white text-[#1B3A5C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Read Full Article
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
              <div className="lg:text-right">
                <div className="inline-block bg-white bg-opacity-10 rounded-2xl p-8">
                  <svg className="w-24 h-24 text-white opacity-60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Family Learning</span>
                <span className="text-slate-500 text-sm">3 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                How to Create Multi-Generational Learning Experiences
              </h3>
              <p className="text-slate-600 mb-4">
                Practical strategies for bringing grandparents, parents, and children together around shared educational goals.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>

            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Business Legacy</span>
                <span className="text-slate-500 text-sm">5 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                Building a Family Business That Serves Generations
              </h3>
              <p className="text-slate-600 mb-4">
                Key principles for creating businesses that generate both profit and positive family impact over decades.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>

            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">AI & Families</span>
                <span className="text-slate-500 text-sm">4 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                AI as a Family Companion: What's Possible Now
              </h3>
              <p className="text-slate-600 mb-4">
                Exploring how artificial intelligence can enhance rather than replace human family relationships and decision-making.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>

            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Legacy Planning</span>
                <span className="text-slate-500 text-sm">6 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                Preserving Family Stories for Future Generations
              </h3>
              <p className="text-slate-600 mb-4">
                Why family narratives are as important as financial assets, and how to capture them effectively.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>

            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Family Health</span>
                <span className="text-slate-500 text-sm">4 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                Creating Healthy Family Traditions in the Digital Age
              </h3>
              <p className="text-slate-600 mb-4">
                Balancing technology use with human connection to build traditions that strengthen family bonds.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>

            <article className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Future Thinking</span>
                <span className="text-slate-500 text-sm">5 min read</span>
              </div>
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-3">
                Teaching Children to Think in Generations
              </h3>
              <p className="text-slate-600 mb-4">
                Age-appropriate ways to help children understand long-term thinking and their role in the family legacy.
              </p>
              <a href="#" className="text-[#2E75B6] font-semibold hover:text-[#1B3A5C] transition-colors">
                Read More →
              </a>
            </article>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-[#1B3A5C] mb-4">Stay Connected</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get weekly insights about building family legacies, delivered to your inbox. 
              No spam, just valuable content for generational thinkers.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#2E75B6] focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-[#2E75B6] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1B3A5C] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}