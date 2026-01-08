
import React from 'react';

const BlogPage: React.FC = () => {
  const articles = [
    {
      category: "Risk Management",
      title: "The 1% Rule: Survival in Prop Trading",
      description: "Why professional traders never risk more than 1% of their equity on a single setup.",
      tag: "Critical",
      icon: "🛡️",
      content: "In prop trading, your capital is your oxygen. If you hit the 5% daily limit, you are out for the day. Learn how to calculate lot sizes based on stop-loss distance to ensure you never violate firm rules."
    },
    {
      category: "Psychology",
      title: "Killing the Revenge Trading Demon",
      description: "How to handle a losing streak without blowing your funded account.",
      tag: "Mindset",
      icon: "🧠",
      content: "The market doesn't owe you anything. When the 'Automated Risk Guard' stops you, it's a blessing. Discover the biological reasons behind FOMO and how to switch to a systematic approach."
    },
    {
      category: "Strategy",
      title: "Scalping vs. Day Trading",
      description: "Finding your edge within the 1:100 leverage environment of Zerodha.",
      tag: "Style",
      icon: "⚡",
      content: "Do you prefer quick 5-minute bursts or 4-hour trends? We break down which style suits the BharatProp drawdown structure best."
    },
    {
      category: "Mindset",
      title: "The 'Master' Discipline",
      description: "What separates a Student from a Funded Master? It's not the strategy.",
      tag: "Pro",
      icon: "👑",
      content: "Consistency is the only metric that matters. Learn why taking 'No Trade' is often the most profitable trade you can make in an evaluation phase."
    },
    {
      category: "Technical",
      title: "Kite API: Execution Optimization",
      description: "Reducing slippage and latencies when trading BankNifty options.",
      tag: "Systems",
      icon: "📊",
      content: "Using the Zerodha bridge efficiently. Learn about limit orders vs market orders in high volatility and how it affects your profit targets."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020412] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
            Institutional Education
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Trader's <span className="text-blue-500">Edge</span> Hub</h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Master the mental game and technical protocols of professional prop trading. 
            Capital is easy; discipline is hard.
          </p>
        </div>

        {/* Featured Card */}
        <div className="relative group overflow-hidden rounded-[48px] border border-white/10 bg-slate-900/40 backdrop-blur-3xl p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-transparent opacity-50"></div>
          <div className="relative bg-[#0a0c2e]/80 rounded-[47px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <span className="text-blue-400 font-black uppercase tracking-widest text-xs">Featured Masterclass</span>
              <h2 className="text-4xl font-black tracking-tight leading-tight">The Psychology of the 10% Drawdown Floor</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Most traders fail because they treat the 10% max loss as a target rather than a safety net. 
                Learn the "Static Buffer" technique to stay funded for years, not days.
              </p>
              <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all">
                Read Deep Dive
              </button>
            </div>
            <div className="w-full lg:w-1/3 aspect-video bg-blue-600/10 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 animate-pulse">
                    <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
               </div>
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                 <span>Video Masterclass</span>
                 <span>12:45 mins</span>
               </div>
            </div>
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <div key={i} className="group cursor-pointer bg-slate-900/40 border border-white/5 rounded-[40px] p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-2xl">
                  {art.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-400 transition-colors">
                  {art.tag}
                </span>
              </div>
              <div className="space-y-4 flex-1">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">{art.category}</span>
                <h3 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{art.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">{art.description}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">5 min read</span>
                <svg className="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Ticker */}
        <div className="bg-blue-600 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <p className="font-bold text-white tracking-tight">Pro Tip: Your first 5 trades in a new account should be 0.25% risk each.</p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
            View All Tips
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
