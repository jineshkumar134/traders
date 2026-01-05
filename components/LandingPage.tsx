
import React, { useState } from 'react';
import { AccountTier } from '../types';

interface LandingPageProps {
  onStart: (tier: AccountTier, stepMode: string) => void;
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

  const rewardCycles = [
    { label: 'Tuesday 60%' },
    { label: 'Bi-weekly 80%' },
    { label: 'On Demand 90%' },
    { label: 'Monthly 100%' },
  ];

  const handleBuy = () => {
    const startTier = steps === 'Zero' ? AccountTier.MASTER : AccountTier.STUDENT;
    onStart(startTier, steps);
  };

  const scrollToConfig = () => {
    const element = document.getElementById('configurator');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#02031a] font-sans text-white selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

        <div className="max-w-4xl space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Proudly Indian 🇮🇳
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            Built by <span className="text-indigo-500">Indians</span><br />
            for <span className="text-blue-400">Indian Traders</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            A premier SEBI-compliant prop firm providing institutional capital to local talent. 
            Trade with professional tools without risking your own life savings.
          </p>

          <div className="pt-10 flex flex-col items-center gap-6">
            <button 
              onClick={scrollToConfig}
              className="bg-[#3b44f6] hover:bg-[#4d55f7] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(59,68,246,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(59,68,246,0.5)] active:scale-95 uppercase tracking-widest"
            >
              Choose Your Challenge
            </button>
            <div className="animate-bounce mt-12 cursor-pointer opacity-40 hover:opacity-100 transition-opacity" onClick={scrollToConfig}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section id="configurator" className="min-h-screen flex flex-col items-center py-24 px-4">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Select Your Funding Path</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Multiple stages or Instant. You decide.</p>
        </div>

        {/* Top Pill Selectors */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex bg-[#0a0c2e] p-1.5 rounded-full border border-white/5 shadow-2xl">
            {['Zero', '1 step', '2 step'].map((s) => (
              <button
                key={s}
                onClick={() => setSteps(s)}
                className={`px-10 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${steps === s ? 'bg-[#3b44f6] text-white shadow-[0_4px_12px_rgba(59,68,246,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex bg-[#0a0c2e] p-1.5 rounded-full border border-white/5 shadow-2xl">
            {[5000, 10000, 25000, 50000, 100000].map((size) => (
              <button
                key={size}
                onClick={() => setAccountSize(size)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${accountSize === size ? 'bg-[#3b44f6] text-white shadow-[0_4px_12px_rgba(59,68,246,0.4)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ₹{(size / 1000)}K
              </button>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-4xl bg-[#060824] rounded-[48px] border border-white/5 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700">
          
          <div className="bg-[#2a2f96]/60 backdrop-blur-md m-8 rounded-[32px] p-8 border border-white/5 text-center">
            <h3 className="text-3xl font-black tracking-tight mb-2">
              {steps === 'Zero' ? 'Instant Funding Path' : steps === '1 step' ? 'Rapid Evaluation' : 'Two-Phase Evolution'}
            </h3>
            <p className="text-xs text-indigo-200/60 font-bold uppercase tracking-widest">
              {steps === 'Zero' ? 'Direct access to institutional capital' : steps === '1 step' ? 'Single phase challenge to reach Master status' : 'Standard Student → Practitioner → Master path'}
            </p>
          </div>

          {/* Reward Cycles Bar */}
          <div className="text-center mb-12 px-8">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-6 opacity-80">Reward Cycles</p>
            <div className="flex flex-wrap justify-center gap-8">
              {rewardCycles.map((cycle, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-black border border-indigo-500/30 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-black text-slate-300 tracking-wide uppercase">{cycle.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Timeline Roadmap */}
          <div className="px-16 mb-16 relative">
             <div className="flex justify-between items-center relative z-10 max-w-2xl mx-auto">
                {steps !== 'Zero' && (
                  <div className="flex flex-col items-center gap-5">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 border border-indigo-400 text-white flex items-center justify-center text-[12px] font-black shadow-[0_0_20px_rgba(79,70,229,0.5)]">1</div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-white text-center">Student</span>
                  </div>
                )}

                {steps === '2 step' && (
                  <div className="flex flex-col items-center gap-5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[12px] font-black text-slate-500">2</div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 text-center">Practitioner</span>
                  </div>
                )}

                <div className="flex flex-col items-center gap-5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black ${steps === 'Zero' ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'bg-slate-800 border-white/10 text-slate-500'}`}>
                    {steps === 'Zero' ? '1' : steps === '1 step' ? '2' : '3'}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest text-center ${steps === 'Zero' ? 'text-white' : 'text-slate-600'}`}>Master</span>
                </div>
                
                <div className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-white/5 -z-10"></div>
             </div>
          </div>

          {/* Table */}
          <div className="px-16 space-y-9 mb-20">
            {features.map((f, i) => (
              <div key={i} className="grid grid-cols-4 items-center group">
                <div className="flex items-center gap-3 text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                  {f.name}
                </div>
                <div className={`text-center font-black text-sm transition-opacity duration-300 ${steps !== 'Zero' ? 'text-white' : 'text-slate-800 opacity-20'}`}>
                  {f.student}
                </div>
                <div className={`text-center font-black text-sm transition-opacity duration-300 ${steps === '2 step' ? 'text-white' : 'text-slate-800 opacity-20'}`}>
                  {f.practitioner}
                </div>
                <div className="text-center font-black text-sm text-white">
                  {f.master}
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="px-16 py-12 bg-black/30 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-sm text-slate-500 font-black uppercase tracking-[0.2em]">Capital:</span>
              <span className="text-5xl font-black text-white tracking-tighter">₹{(accountSize / 1000)}k</span>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-right">
                <span className="block text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Fee (INR)</span>
                <span className="text-5xl font-black text-white tracking-tighter">₹{getPrice().toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={handleBuy}
                className="bg-[#3b44f6] hover:bg-[#4d55f7] text-white px-14 py-5 rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(59,68,246,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(59,68,246,0.5)] active:scale-95 uppercase tracking-widest"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">
          BharatProp India • Professional Trading Environment
        </p>
      </section>

    </div>
  );
};

export default LandingPage;
