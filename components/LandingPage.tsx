
import React, { useState } from 'react';
import { AccountTier } from '../types';

interface LandingPageProps {
  onStart: (tier: AccountTier, stepMode: string, accountSize: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [steps, setSteps] = useState('2 step'); 
  const [accountSize, setAccountSize] = useState(50000);
  
  const getPrice = () => {
    const base = accountSize / 50000;
    if (steps === 'Zero') return Math.floor(4000 * base);
    if (steps === '1 step') return Math.floor(3200 * base);
    return Math.floor(2400 * base);
  };

  const features = [
    { name: 'Profit Target', student: '8%', practitioner: '5%', master: '-' },
    { name: 'Maximum Loss', student: '10%', practitioner: '10%', master: '10%' },
    { name: 'Maximum Daily Loss', student: '5%', practitioner: '5%', master: '5%' },
    { name: 'Minimum Trading Days', student: '3 days', practitioner: '3 days', master: '-' },
    { name: 'Leverage', student: '1:100', practitioner: '1:100', master: '1:100' },
  ];

  const tradingRules = [
    {
      title: "Phase 1: Institutional Validation",
      value: steps === '1 step' ? "10% Target" : "8% Target",
      icon: "🎓",
      description: "Prove your core competency and risk management on our segregated institutional bridge.",
      deepDive: `For a 2-Step evaluation, you need an 8% gain. For a 1-Step 'Rapid' account, the target is 10%. Every trade is executed via Zerodha Kite Connect directly on NSE/BSE.`,
      proTip: "A pass is not a sprint. Take high-probability setups that align with institutional order flow."
    },
    {
      title: "Phase 2: Consistency Verification",
      value: steps === '2 step' ? "5% Target" : "N/A",
      icon: "⚖️",
      description: "A lower barrier phase designed to confirm that Phase 1 was not a fluke of luck.",
      deepDive: "Exclusive to the 2-Step path. This phase confirms your psychology is stable under low-target pressure before we grant you seven-figure capital.",
      proTip: "Don't change your strategy. Stick to the system that got you through Phase 1."
    },
    {
      title: "Funded Master Status",
      value: "90% Split",
      icon: "👑",
      description: "Live funding stage. You trade our firm capital and withdraw real profits every Friday.",
      deepDive: "Masters are elite traders. You start with an 80% split and scale up to 90% based on performance. Your only job is to stay within the 5% daily and 10% total loss limits.",
      proTip: "Withdrawals are processed automatically via bank transfer every Friday at 4:00 PM IST."
    },
    {
      title: "Automated Risk Guard",
      value: "5% Daily Limit",
      icon: "🛡️",
      description: "The hard ceiling of your daily performance to prevent emotional blowout.",
      deepDive: "The system monitors equity in real-time. If floating or realized losses hit 5% of your starting balance, all positions are squared off and the terminal is locked for 24 hours.",
      proTip: "Successful traders stop at -3% to avoid triggering the automated 5% hard-lock."
    },
    {
      title: "Static Capital Floor",
      value: "10% Max Loss",
      icon: "📉",
      description: "A transparent, non-trailing floor that gives you the maximum room to scale.",
      deepDive: "Unlike many global firms, our drawdown is STATIC. If your account is ₹10L, your floor is ₹9L. Even if you grow to ₹12L, your floor stays at ₹9L, giving you 30% risk room.",
      proTip: "This is the 'Prop Firm Advantage'. Static floors are 5x more likely to be kept by traders."
    },
    {
      title: "Kite Connect 3.0 Bridge",
      value: "Zerodha Powered",
      icon: "🏢",
      description: "Institutional-grade execution with 10ms latency and deep liquidity.",
      deepDive: "We use Zerodha's professional infrastructure. This means no slippage issues common with demo platforms and 100% compliance with NSE/BSE regulations.",
      proTip: "Use MIS orders for intraday scalping and NRML for positional swing trades."
    }
  ];

  const handleBuy = () => {
    const startTier = steps === 'Zero' ? AccountTier.MASTER : AccountTier.STUDENT;
    onStart(startTier, steps, accountSize);
  };

  return (
    <div className="min-h-screen bg-[#020412] font-sans text-white overflow-x-hidden">
      <div className="mesh-bg"></div>

      {/* Hero Content - Redesigned to be cleaner without large cards */}
      <header className="min-h-[85vh] flex flex-col items-center justify-center pt-12 px-4">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Built by Indians for Indian Traders
        </div>

        <div className="max-w-5xl text-center space-y-10">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-white">
            Trade Our <span className="text-blue-600">Capital</span>.<br/>Keep <span className="text-indigo-400">90%</span> Profits.
          </h1>
          
          <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Stop risking your savings. Use our institutional funds up to <span className="text-white font-bold">₹2 Crores</span> and keep the lion's share of your gains. Powered by <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-4">Zerodha</span>.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
             <button 
                onClick={() => document.getElementById('configurator')?.scrollIntoView({behavior:'smooth'})} 
                className="w-full sm:w-auto bg-blue-600 px-16 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-blue-900/40"
             >
                Get Funded Now
             </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 pt-12 opacity-40">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Weekly Payouts</span>
              <span className="text-xs font-bold text-slate-300">Every Friday</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">No Time Limits</span>
              <span className="text-xs font-bold text-slate-300">Trade at your pace</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Static Drawdown</span>
              <span className="text-xs font-bold text-slate-300">No trailing traps</span>
            </div>
          </div>
        </div>
      </header>

      {/* Ticker for Social Proof */}
      <div className="bg-slate-950 border-y border-white/5 py-4 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
           <span>₹12,45,000 Paid out this Friday</span>
           <span>•</span>
           <span>94% Success Rate in Scaling</span>
           <span>•</span>
           <span>Kite API Live Status: Optimal</span>
           <span>•</span>
           <span>45 New Masters Funded Today</span>
           <span>•</span>
           <span>Institutional Liquidity Confirmed</span>
           <span>•</span>
           <span>NSE/BSE Execution Active</span>
        </div>
      </div>

      {/* Configurator Section */}
      <section id="configurator" className="py-32 px-4 flex flex-col items-center bg-gradient-to-b from-transparent to-blue-900/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Select Your Funding</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
        </div>

        <div className="w-full max-w-5xl space-y-8">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 flex gap-1">
              {['Zero', '1 step', '2 step'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSteps(s)}
                  className={`px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${steps === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 flex gap-1 overflow-x-auto no-scrollbar">
              {[5000, 10000, 25000, 50000, 100000].map(size => (
                <button 
                  key={size} 
                  onClick={() => setAccountSize(size)}
                  className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${accountSize === size ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-white'}`}
                >
                  ₹{(size / 1000)}k
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-[48px] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="p-12 space-y-12">
              <div className="grid grid-cols-4 border-b border-white/5 pb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Metric</div>
                <div className={`text-[10px] font-black uppercase tracking-[0.3em] text-center ${steps !== 'Zero' ? 'text-blue-400' : 'text-slate-700'}`}>Validation</div>
                <div className={`text-[10px] font-black uppercase tracking-[0.3em] text-center ${steps === '2 step' ? 'text-blue-400' : 'text-slate-700'}`}>Verification</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-indigo-400">Funded</div>
              </div>
              <div className="space-y-6">
                {features.map((f, i) => (
                  <div key={i} className="grid grid-cols-4 items-center py-2">
                    <div className="text-sm font-bold text-slate-300">{f.name}</div>
                    <div className={`text-center font-bold text-lg ${steps !== 'Zero' ? 'text-white' : 'text-slate-800'}`}>{f.student}</div>
                    <div className={`text-center font-bold text-lg ${steps === '2 step' ? 'text-white' : 'text-slate-800'}`}>{f.practitioner}</div>
                    <div className="text-center font-bold text-lg text-indigo-300">{f.master}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="text-center md:text-left">
                  <span className="block text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Fee</span>
                  <span className="text-5xl font-black tracking-tighter">₹{getPrice().toLocaleString('en-IN')}</span>
                </div>
                <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
                <div className="text-center md:text-left">
                  <span className="block text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Live Capital</span>
                  <span className="text-5xl font-black tracking-tighter text-blue-500">₹{(accountSize / 1000)}k</span>
                </div>
              </div>
              <button 
                onClick={handleBuy}
                className="w-full md:w-auto bg-gradient-to-br from-blue-600 to-indigo-700 px-16 py-6 rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] uppercase tracking-widest"
              >
                Start Evaluation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Rules Grid */}
      <section id="trading-rules" className="py-32 px-4 flex flex-col items-center bg-[#020412] relative">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Firm <span className="text-blue-500">Protocol</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">Institutional risk limits to protect our master liquidity pool.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          {tradingRules.map((rule, index) => (
            <div key={index} className="group relative bg-slate-900/40 p-8 rounded-[48px] border border-white/5 hover:border-blue-500/20 transition-all duration-500 hover:-translate-y-2 flex flex-col gap-6 backdrop-blur-3xl">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {rule.icon}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest">
                  {rule.value}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-black tracking-tight">{rule.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {rule.description}
                </p>
              </div>

              <div className="mt-4 pt-6 border-t border-white/5 space-y-6">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Institutional Bridge</h5>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    {rule.deepDive}
                  </p>
                </div>
                
                <div className="bg-blue-600/5 p-4 rounded-2xl border border-blue-600/10">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-1">Firm Insight</h5>
                  <p className="text-[11px] text-slate-300 italic font-medium leading-relaxed">
                    "{rule.proTip}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 text-center border-t border-white/5 relative overflow-hidden bg-slate-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6 mb-20 text-left">
           <div className="col-span-1 md:col-span-2 space-y-6">
             <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <span className="text-xs">B</span>
               </div>
               BHARATPROP
             </div>
             <p className="text-slate-500 text-sm max-w-sm">
               Built by Indians for Indian Traders. We route every funded trade through Zerodha's institutional ledger to ensure transparency and stability.
             </p>
           </div>
           <div className="space-y-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Policies</h4>
             <ul className="text-slate-500 text-sm space-y-2">
               <li><a href="#" className="hover:text-blue-500">Scaling Policy</a></li>
               <li><a href="#" className="hover:text-blue-500">Risk Disclosure</a></li>
               <li><a href="#" className="hover:text-blue-500">SEBI Compliance</a></li>
               <li><a href="#" className="hover:text-blue-500">Terms of Funding</a></li>
             </ul>
           </div>
           <div className="space-y-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Connect</h4>
             <ul className="text-slate-500 text-sm space-y-2">
               <li><a href="#" className="hover:text-blue-500">Institutional Twitter</a></li>
               <li><a href="#" className="hover:text-blue-500">Telegram Community</a></li>
               <li><a href="#" className="hover:text-blue-500">LinkedIn Corp</a></li>
             </ul>
           </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">BharatProp Institutional Ecosystem • Built for the Indian Market</p>
      </footer>
    </div>
  );
};

export default LandingPage;
