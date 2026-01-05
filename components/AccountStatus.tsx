
import React from 'react';
import { AccountStats, AccountTier } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AccountStatusProps {
  stats: AccountStats;
  tier: AccountTier | null;
  stepMode: string;
}

const AccountStatus: React.FC<AccountStatusProps> = ({ stats, tier, stepMode }) => {
  const performanceData = [
    { day: 'Mon', pnl: 4500 },
    { day: 'Tue', pnl: -2300 },
    { day: 'Wed', pnl: 8900 },
    { day: 'Thu', pnl: 1200 },
    { day: 'Fri', pnl: stats.dailyPnl },
  ];

  const equityCurve = [
    { time: '09:15', equity: 1000000 },
    { time: '10:30', equity: 1005000 },
    { time: '12:00', equity: 998000 },
    { time: '13:45', equity: 1012000 },
    { time: '15:30', equity: stats.equity },
  ];

  const isMaster = tier === AccountTier.MASTER;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Account Analytics</h2>
          <p className="text-slate-400">Path: <span className="text-indigo-400 font-bold uppercase">{stepMode}</span></p>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
             <span className="text-[10px] text-slate-500 block uppercase font-bold">Sharpe Ratio</span>
             <span className="text-lg font-bold text-blue-400">2.41</span>
           </div>
           <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
             <span className="text-[10px] text-slate-500 block uppercase font-bold">Win Rate</span>
             <span className="text-lg font-bold text-emerald-400">64%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-80 flex flex-col shadow-xl">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-6 tracking-widest">Equity Growth</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityCurve}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Area type="monotone" dataKey="equity" stroke="#3b82f6" fill="url(#colorEquity)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-80 flex flex-col shadow-xl">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-6 tracking-widest">Daily Performance</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]} fill={(e: any) => e.pnl >= 0 ? '#10b981' : '#f43f5e'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-8">Evolution Milestones</h3>
        <div className="space-y-10">
          
          {/* Step 1: Student (Hidden if Zero Step) */}
          {stepMode !== 'Zero' && (
            <div className={`flex flex-col md:flex-row md:items-center gap-6 ${tier === AccountTier.STUDENT ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-full md:w-1/3 space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">Phase 1: Student</span>
                  <span className="text-xs text-blue-400 font-bold">{tier === AccountTier.STUDENT ? 'In Progress' : 'Completed'}</span>
                </div>
                <div className="h-3 bg-slate-950 rounded-full border border-white/5">
                  <div className={`h-full rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 ${tier === AccountTier.STUDENT ? 'w-[45%]' : 'w-full'}`}></div>
                </div>
              </div>
              <div className="flex-1 text-sm text-slate-400 font-medium">8% Profit Target. Minimum 3 trading days. This is where your journey begins.</div>
            </div>
          )}

          {/* Step 2: Practitioner (Hidden if Zero or 1 Step) */}
          {stepMode === '2 step' && (
            <div className={`flex flex-col md:flex-row md:items-center gap-6 ${tier === AccountTier.PRACTITIONER ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-full md:w-1/3 space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest">Phase 2: Practitioner</span>
                  <span className="text-xs text-indigo-400 font-bold">{tier === AccountTier.PRACTITIONER ? 'In Progress' : tier === AccountTier.MASTER ? 'Completed' : 'Locked'}</span>
                </div>
                <div className="h-3 bg-slate-950 rounded-full border border-white/5">
                  <div className={`h-full rounded-full bg-indigo-500 transition-all duration-1000 ${tier === AccountTier.PRACTITIONER ? 'w-[10%]' : tier === AccountTier.MASTER ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              <div className="flex-1 text-sm text-slate-400 font-medium">5% Verification Target. Prove your consistency before becoming a Master.</div>
            </div>
          )}

          {/* Final Step: Funded Master */}
          <div className={`flex flex-col md:flex-row md:items-center gap-6 ${isMaster ? 'opacity-100' : 'opacity-40'}`}>
            <div className="w-full md:w-1/3 space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest">Funded Master</span>
                <span className="text-xs text-emerald-400 font-bold">{isMaster ? 'Active Account' : 'Locked'}</span>
              </div>
              <div className="h-3 bg-slate-950 rounded-full border border-white/5">
                <div className={`h-full rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000 ${isMaster ? 'w-full' : 'w-0'}`}></div>
              </div>
            </div>
            <div className="flex-1 text-sm text-slate-400 font-medium">
              Institutional Funding active. Weekly profit payouts (up to 90%). Welcome to BharatProp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
