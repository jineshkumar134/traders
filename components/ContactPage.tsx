
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'payout', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      title: "24/7 Live Support",
      detail: "Average response: 2 mins",
      icon: "💬",
      action: "Open Live Chat",
      color: "blue"
    },
    {
      title: "Institutional Desk",
      detail: "support@bharatprop.in",
      icon: "✉️",
      action: "Email Us",
      color: "indigo"
    },
    {
      title: "Risk Management",
      detail: "risk@bharatprop.in",
      icon: "🛡️",
      action: "Direct Report",
      color: "emerald"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020412] pt-24 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Info & Trust */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Global Connectivity
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              Institutional <span className="text-blue-500">Support</span> 24/7
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              We understand that the markets never truly sleep. Our dedicated risk and support teams are active around the clock to ensure your trading experience remains seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {contactMethods.map((m, i) => (
              <div key={i} className="group bg-slate-900/40 border border-white/5 p-6 rounded-[32px] flex items-center gap-6 hover:border-blue-500/30 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <h4 className="font-black tracking-tight text-white">{m.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{m.detail}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20">
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Corporate Headquarters</h5>
            <div className="space-y-2">
              <p className="text-white font-bold tracking-tight">BharatProp Financial Hub</p>
              <p className="text-sm text-slate-400 font-medium">Level 12, Maker Maxity, BKC</p>
              <p className="text-sm text-slate-400 font-medium">Mumbai, MH 400051, India</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/40 border border-white/10 rounded-[48px] p-8 md:p-12 backdrop-blur-3xl relative">
            <div className="absolute top-0 right-12 w-24 h-1 bg-blue-600 rounded-b-full"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="E.g. Arjun Mehta"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="arjun@example.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Inquiry Type</label>
                <select 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all text-slate-300 appearance-none"
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                >
                  <option value="payout">Payout & Profit Split</option>
                  <option value="rules">Trading Rules Query</option>
                  <option value="platform">Technical / Zerodha Bridge</option>
                  <option value="kyc">KYC & Compliance</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                  placeholder="Tell us how we can help you..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)]"
              >
                Send Message
              </button>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center animate-in fade-in zoom-in duration-300">
                  ✓ Message sent to our Institutional Desk. We will contact you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10"></div>
    </div>
  );
};

export default ContactPage;
