
import React, { useState } from 'react';

interface CheckoutPageProps {
  accountSize: number;
  stepMode: string;
  onPurchase: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ accountSize, stepMode, onPurchase }) => {
  const [formData, setFormData] = useState({
    name: '',
    holderName: '',
    email: '',
    phone: '',
    country: 'India',
    coupon: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'upi' | 'card'>('upi');

  const getPrice = () => {
    const base = accountSize / 50000;
    let fee = 0;
    if (stepMode === 'Zero') fee = 4000 * base;
    else if (stepMode === '1 step') fee = 3200 * base;
    else fee = 2400 * base;
    
    if (formData.coupon.toUpperCase() === 'BHARAT10') return fee * 0.9;
    return fee;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    onPurchase();
  };

  return (
    <div className="min-h-screen bg-[#020412] pt-24 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Institutional Onboarding</h1>
          <p className="text-slate-400 font-medium">Complete your trader profile and verify allocation of ₹{(accountSize / 1000).toLocaleString()}k capital.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Trader Information */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">1</span>
                Traders Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Legal Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="As per PAN/Aadhar"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Account Holder Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Bank Account Holder Name"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      value={formData.holderName}
                      onChange={e => setFormData({...formData, holderName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="trading@example.com"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Country of Residence</label>
                  <select 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all text-slate-300 appearance-none"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                    <option value="UK">United Kingdom</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">2</span>
                Payment Methods
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${paymentMethod === 'crypto' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}
                >
                  <div className="text-2xl">₿</div>
                  <div className="text-xs font-black uppercase tracking-widest">Crypto (USDT)</div>
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${paymentMethod === 'upi' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}
                >
                  <div className="text-2xl">📱</div>
                  <div className="text-xs font-black uppercase tracking-widest">UPI / QR</div>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}
                >
                  <div className="text-2xl">💳</div>
                  <div className="text-xs font-black uppercase tracking-widest">Card / Bank</div>
                </button>
              </div>

              <div className="mt-8 p-6 bg-blue-600/5 rounded-3xl border border-blue-600/10 flex items-start gap-4">
                 <div className="text-blue-400">🛡️</div>
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">
                   "BharatProp uses AES-256 encryption for all institutional transactions. Your credentials and trade data are routed through SEBI-compliant bridge protocols."
                 </p>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-white/10 rounded-[48px] p-10 space-y-8 sticky top-24 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Allocation Summary</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Program</span>
                  <span className="font-black text-white">{stepMode} Evaluation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Capital Size</span>
                  <span className="font-black text-blue-500">₹{(accountSize / 1000).toLocaleString()}k</span>
                </div>
                <div className="h-[1px] bg-white/5"></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Setup Fee</span>
                  <span className="font-bold text-slate-200">₹{(getPrice() + (formData.coupon.toUpperCase() === 'BHARAT10' ? (getPrice() * 0.1) : 0)).toLocaleString()}</span>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Coupon Code"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      value={formData.coupon}
                      onChange={e => setFormData({...formData, coupon: e.target.value})}
                    />
                    {formData.coupon.toUpperCase() === 'BHARAT10' && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-[10px] font-black">ACTIVE</span>
                    )}
                  </div>
                  {formData.coupon.toUpperCase() === 'BHARAT10' && (
                    <div className="flex justify-between items-center px-2">
                      <span className="text-emerald-500 text-[10px] font-black uppercase">Institutional Discount</span>
                      <span className="text-emerald-500 font-bold">-₹{(getPrice() * 0.1).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="h-[1px] bg-white/10"></div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-black uppercase text-sm tracking-widest">Total Payable</span>
                  <span className="text-4xl font-black text-white tracking-tighter">₹{getPrice().toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] mt-8"
              >
                Complete Order
              </button>

              <div className="flex justify-center gap-6 pt-4 opacity-40">
                <div className="w-8 h-8 bg-white/10 rounded border border-white/5 flex items-center justify-center text-[10px] font-black">VISA</div>
                <div className="w-8 h-8 bg-white/10 rounded border border-white/5 flex items-center justify-center text-[10px] font-black">UPI</div>
                <div className="w-8 h-8 bg-white/10 rounded border border-white/5 flex items-center justify-center text-[10px] font-black">BTC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
