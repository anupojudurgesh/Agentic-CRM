interface LandingPageProps {
  onStart: () => void;
}

function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>

      <div className="max-w-3xl w-full text-center relative z-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
        
        {/* Logo/Icon Area */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative">
            <span className="text-4xl">🤖</span>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                 <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
               </svg>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight mb-6 leading-tight">
          Agentic<span className="text-blue-600">-CRM</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#475569] mb-12 max-w-2xl mx-auto leading-relaxed">
          The next-generation Healthcare Professional interaction platform. 
          Powered by LangGraph, designed to completely automate your data entry through conversational AI.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="px-4 py-2 bg-white border border-gray-200 text-[#334155] text-sm font-medium rounded-full shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Voice-to-Text Ready
          </span>
          <span className="px-4 py-2 bg-white border border-gray-200 text-[#334155] text-sm font-medium rounded-full shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> LangGraph Agents
          </span>
          <span className="px-4 py-2 bg-white border border-gray-200 text-[#334155] text-sm font-medium rounded-full shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Sentiment Extraction
          </span>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 text-lg">
            Launch Workspace
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 h-full w-full bg-white/20 group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-300 ease-out z-0"></div>
        </button>

      </div>
    </div>
  );
}

export default LandingPage;
