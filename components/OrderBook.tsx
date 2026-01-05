
import React, { useState } from 'react';
import { Position, Trade, OrderSide } from '../types';

interface OrderBookProps {
  positions: Position[];
  trades: Trade[];
  onClosePosition: (id: string) => void;
}

const OrderBook: React.FC<OrderBookProps> = ({ positions, trades, onClosePosition }) => {
  const [tab, setTab] = useState<'positions' | 'trades'>('positions');

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setTab('positions')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition ${tab === 'positions' ? 'text-blue-400 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Open Positions ({positions.length})
        </button>
        <button 
          onClick={() => setTab('trades')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition ${tab === 'trades' ? 'text-blue-400 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Trade History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {tab === 'positions' ? (
          <div className="space-y-3">
            {positions.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-slate-600 text-xs italic">
                No active positions
              </div>
            ) : (
              positions.map(p => (
                <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.side === OrderSide.BUY ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                          {p.side}
                        </span>
                        <span className="text-sm font-bold">{p.symbol}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {p.quantity} Units @ ₹{p.avgPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${p.pnl >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {p.pnl >= 0 ? '+' : ''}₹{p.pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onClosePosition(p.id)}
                    className="w-full py-1.5 mt-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded transition"
                  >
                    SQUARE OFF
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {trades.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-slate-600 text-xs italic">
                No trades executed
              </div>
            ) : (
              trades.map(t => (
                <div key={t.id} className="bg-slate-950/40 border-l-2 border-slate-800 p-2 text-xs flex justify-between items-center">
                  <div>
                    <span className={`font-bold mr-2 ${t.side === OrderSide.BUY ? 'text-emerald-500' : 'text-rose-500'}`}>{t.side}</span>
                    <span className="text-slate-300 font-medium">{t.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400">Qty: {t.quantity}</div>
                    <div className="text-slate-500 text-[10px]">₹{t.price.toFixed(2)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;
