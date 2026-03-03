/* GENESIS LEGACY AI - THE STORY BEGINS */
/* Subtle parable telling WHO Genesis Legacy AI is */

import Link from 'next/link'

export function GenesisHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle light rays in background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        
        {/* Genesis Legacy AI Logo Mark */}
        <div className="mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.82l7 3.5v7.36l-7-3.5V9.82zm16 0v7.36l-7 3.5v-7.36l7-3.5z"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <circle cx="8" cy="10" r="1" fill="white"/>
              <circle cx="16" cy="10" r="1" fill="white"/>
              <circle cx="12" cy="6" r="1" fill="white"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-800">
            Genesis Legacy AI
          </h1>
          <p className="text-lg text-slate-600 mt-2 font-light">
            The Beginning of a Legacy
          </p>
        </div>

        {/* Main headline - WHO Genesis Legacy AI is */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 mb-8 leading-tight">
          The gentle presence that appears<br />
          <span className="font-medium">when families need guidance</span>
        </h2>

        {/* Subtitle - the deeper story */}
        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          Not just intelligence. Not just assistance. A companion that walks with your family through every season of life, carrying wisdom from generation to generation.
        </p>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link 
            href="/begin" 
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Legacy Today - Free Trial
          </Link>
          <Link 
            href="/stories" 
            className="text-slate-600 hover:text-slate-800 font-medium text-lg px-10 py-4 transition-colors duration-300"
          >
            Hear Our Stories
          </Link>
        </div>

        {/* Trust indicators - subtle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-sm text-slate-500">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">Privacy First</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium">Family Centered</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <span className="font-medium">Generational Impact</span>
          </div>
        </div>

      </div>
    </section>
  )
}