
import React, { useState } from 'react';
import { AccountStats, Position, Trade, OrderSide } from '../types';
import TradingTerminal from './TradingTerminal';
import OrderBook from './OrderBook';
import RiskMetrics from './RiskMetrics';

interface DashboardProps {
  stats: AccountStats;
  positions: Position[];
  trades: Trade[];
  marketPrice: number;
  onPlaceOrder: (side: OrderSide, symbol: string, quantity: number) => void;
  onClosePosition: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stats, 
  positions, 
  trades, 
  marketPrice,
  onPlaceOrder,
  onClosePosition
}) => {
  const [activeSymbol, setActiveSymbol] = useState('NSE:NIFTY');
  const [orderQty, setOrderQty] = useState(50);

  const symbols = [
    { label: 'NIFTY 50', value: 'NSE:NIFTY', lot: 50 },
    { label: 'BANK NIFTY', value: 'NSE:BANKNIFTY', lot: 15 },
    { label: 'RELIANCE', value: 'NSE:RELIANCE', lot: 1 },
    { label: 'TCS', value: 'NSE:TCS', lot: 1 },
    { label: 'HDFC BANK', value: 'NSE:HDFCBANK', lot: 1 },
  ];

  const handleSymbolChange = (sym: string, lot: number) => {
    setActiveSymbol(sym);
    setOrderQty(lot);
  };

  const isProfitable = stats.dailyPnl >= 0;
  const displaySymbol = activeSymbol.includes(':') ? activeSymbol.split(':')[1] : activeSymbol;

  return (
    <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Column: Metrics & Controls */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1">
        
        {/* Account Header */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Equity</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${stats.isLocked ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
              {stats.isLocked ? 'Terminal Locked' : 'Guard Active'}
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight">
            ₹{stats.equity.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Today's P&L</div>
              <div className={`font-bold ${isProfitable ? 'text-emerald-400' : 'text-rose-500'}`}>
                {isProfitable ? '+' : ''}₹{stats.dailyPnl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Margin Avail.</div>
              <div className="font-bold text-blue-400">
                ₹{stats.buyingPower.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        {/* Order Terminal */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold uppercase text-slate-400">Trading Terminal</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-300 font-bold">{displaySymbol}</span>
              <span className="text-sm font-mono font-bold text-blue-400">{marketPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Order Quantity</label>
              <input 
                type="number" 
                value={orderQty}
                onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                disabled={stats.isLocked}
                onClick={() => onPlaceOrder(OrderSide.BUY, displaySymbol, orderQty)}
                className={`py-4 rounded-lg font-bold text-sm transition shadow-lg ${
                  stats.isLocked ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white'
                }`}
              >
                BUY
              </button>
              <button 
                disabled={stats.isLocked}
                onClick={() => onPlaceOrder(OrderSide.SELL, displaySymbol, orderQty)}
                className={`py-4 rounded-lg font-bold text-sm transition shadow-lg ${
                  stats.isLocked ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-rose-600 hover:bg-rose-500 active:scale-95 text-white'
                }`}
              >
                SELL
              </button>
            </div>

            {stats.isLocked && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg mt-2">
                <p className="text-[10px] text-rose-500 leading-tight">
                  <span className="font-bold">SYSTEM LOCKED:</span> Automated Risk Guard has triggered. Trading is disabled to protect firm capital.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Risk Metrics */}
        <RiskMetrics stats={stats} />
      </div>

      {/* Middle Column: Chart */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <div className="bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-hidden flex flex-col shadow-xl">
          <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {symbols.map(s => (
                <button 
                  key={s.value}
                  onClick={() => handleSymbolChange(s.value, s.lot)}
                  className={`text-[10px] font-bold px-4 py-2 rounded-full transition whitespace-nowrap border ${
                    activeSymbol === s.value 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-black uppercase">NSE LIVE</span>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-950">
            {/* key={activeSymbol} ensures the iframe is completely replaced for the new NSE/BSE asset */}
            <TradingTerminal key={activeSymbol} symbol={activeSymbol} />
          </div>
        </div>
      </div>

      {/* Right Column: Open Positions & History */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
        <div className="bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-hidden flex flex-col shadow-xl">
          <OrderBook 
            positions={positions} 
            trades={trades} 
            onClosePosition={onClosePosition} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
