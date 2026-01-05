
import React from 'react';
import { AccountStats } from '../types';
import { INITIAL_CAPITAL, PROFIT_SPLIT_PERCENT } from '../constants';

interface RiskMetricsProps {
  stats: AccountStats;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ stats }) => {
  const dailyLossProgress = Math.min(100, Math.max(0, (Math.abs(Math.min(0, stats.dailyPnl)) / stats.dailyLossLimit) * 100));
  const drawdownProgress = Math.min(100, Math.max(0, ((INITIAL_CAPITAL - stats.equity) / (INITIAL_CAPITAL * 0.10)) * 100));
  
  const profitTarget = INITIAL_CAPITAL * 0.10; // 10% target
  const profit = Math.max(0, stats.equity - INITIAL_CAPITAL);
  const targetProgress = Math.min(100, (profit / profitTarget) * 100);

  const traderShare = profit * PROFIT_SPLIT_PERCENT;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-6">
      <h3 className="text-sm font-bold uppercase text-slate-400">Automated Risk Guard</h3>
      
      <div className="space-y-4">
        {/* Daily Loss Limit */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span className="text-slate-500">Daily Loss Limit (2%)</span>
            <span className={dailyLossProgress > 80 ? 'text-rose-500' : 'text-slate-400'}>
              ₹{Math.abs(Math.min(0, stats.dailyPnl)).toLocaleString()} / ₹{stats.dailyLossLimit.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-500 ${dailyLossProgress > 80 ? 'bg-rose-500' : 'bg-blue-500'}`}
              style={{ width: `${dailyLossProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Max Drawdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span className="text-slate-500">Max Drawdown (10%)</span>
            <span className={drawdownProgress > 80 ? 'text-rose-500' : 'text-slate-400'}>
              {drawdownProgress.toFixed(1)}% Usage
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-500 ${drawdownProgress > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`}
              style={{ width: `${drawdownProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Profit Split Tracker */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-slate-500">Phase 1: 10% Profit Target</span>
              <span className="text-emerald-400">{targetProgress.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000"
                style={{ width: `${targetProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 flex justify-between items-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Estimated Payout (80%)</div>
              <div className="text-sm font-bold text-emerald-400">₹{traderShare.toLocaleString()}</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-2.101C14.07 14.902 15 13.903 15 13c0-1.105-1.11-2-2.599-2M12 12V11" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
