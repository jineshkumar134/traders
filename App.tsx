
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard.tsx';
import LandingPage from './components/LandingPage.tsx';
import AccountStatus from './components/AccountStatus.tsx';
import Navbar from './components/Navbar.tsx';
import BlogPage from './components/BlogPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import ChatBot from './components/ChatBot.tsx';
import { AccountTier, AccountStats, Position, Trade, OrderSide } from './types.ts';
import { INITIAL_CAPITAL, DAILY_LOSS_LIMIT_PERCENT, MAX_DRAWDOWN_PERCENT } from './constants.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'status' | 'blog' | 'contact' | 'checkout'>('landing');
  const [userTier, setUserTier] = useState<AccountTier | null>(null);
  const [pendingTier, setPendingTier] = useState<AccountTier | null>(null);
  const [stepMode, setStepMode] = useState<string>('2 step');
  const [selectedAccountSize, setSelectedAccountSize] = useState<number>(50000);
  
  // Simulation State
  const [stats, setStats] = useState<AccountStats>({
    balance: INITIAL_CAPITAL,
    buyingPower: INITIAL_CAPITAL,
    equity: INITIAL_CAPITAL,
    dailyPnl: 0,
    maxDrawdown: INITIAL_CAPITAL * MAX_DRAWDOWN_PERCENT,
    dailyLossLimit: INITIAL_CAPITAL * DAILY_LOSS_LIMIT_PERCENT,
    isLocked: false,
  });

  const [positions, setPositions] = useState<Position[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [marketPrice, setMarketPrice] = useState(22450.50);

  useEffect(() => {
    if (stats.isLocked) return;
    const interval = setInterval(() => {
      setMarketPrice(prev => prev + (Math.random() - 0.5) * 0.5);
    }, 1000);
    return () => clearInterval(interval);
  }, [stats.isLocked]);

  useEffect(() => {
    if (positions.length === 0) return;
    setPositions(prev => prev.map(p => {
      const diff = marketPrice - p.avgPrice;
      const currentPnl = p.side === OrderSide.BUY ? diff * p.quantity : -diff * p.quantity;
      return { ...p, pnl: currentPnl };
    }));
  }, [marketPrice]);

  useEffect(() => {
    const totalPnl = positions.reduce((acc, p) => acc + p.pnl, 0);
    const newEquity = stats.balance + totalPnl;
    const dailyPnl = newEquity - stats.balance;

    let isLocked = false;
    let failReason = '';

    if (dailyPnl <= -stats.dailyLossLimit) {
      isLocked = true;
      failReason = `Daily Loss Limit Reached (₹${stats.dailyLossLimit.toLocaleString()})`;
    }

    if (newEquity <= (selectedAccountSize || INITIAL_CAPITAL) * (1 - MAX_DRAWDOWN_PERCENT)) {
      isLocked = true;
      failReason = `Maximum Drawdown Limit Exceeded (₹${((selectedAccountSize || INITIAL_CAPITAL) * MAX_DRAWDOWN_PERCENT).toLocaleString()})`;
    }

    setStats(prev => ({
      ...prev,
      equity: newEquity,
      dailyPnl: dailyPnl,
      isLocked: isLocked || prev.isLocked,
      failReason: failReason || prev.failReason
    }));
  }, [positions, stats.balance, stats.dailyLossLimit, selectedAccountSize]);

  const handleInitiateStart = (tier: AccountTier, mode: string, size: number) => {
    setPendingTier(tier);
    setStepMode(mode);
    setSelectedAccountSize(size);
    setCurrentPage('checkout');
  };

  const handleCompletePurchase = () => {
    setUserTier(pendingTier);
    setStats({
      balance: selectedAccountSize,
      buyingPower: selectedAccountSize,
      equity: selectedAccountSize,
      dailyPnl: 0,
      maxDrawdown: selectedAccountSize * MAX_DRAWDOWN_PERCENT,
      dailyLossLimit: selectedAccountSize * DAILY_LOSS_LIMIT_PERCENT,
      isLocked: false,
    });
    setPositions([]);
    setTrades([]);
    setCurrentPage('dashboard');
  };

  const handlePlaceOrder = (side: OrderSide, symbol: string, quantity: number) => {
    if (stats.isLocked) return;
    const newTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      symbol, side, price: marketPrice, quantity, timestamp: Date.now(), status: 'COMPLETED'
    };
    setTrades(prev => [newTrade, ...prev]);
    setPositions(prev => {
      const existing = prev.find(p => p.symbol === symbol && p.side === side);
      if (existing) {
        return prev.map(p => p.symbol === symbol && p.side === side 
          ? { ...p, quantity: p.quantity + quantity, avgPrice: (p.avgPrice * p.quantity + marketPrice * quantity) / (p.quantity + quantity) }
          : p
        );
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        symbol, side, avgPrice: marketPrice, quantity, pnl: 0, timestamp: Date.now()
      }];
    });
  };

  const handleClosePosition = (id: string) => {
    const pos = positions.find(p => p.id === id);
    if (!pos) return;
    setStats(prev => ({ ...prev, balance: prev.balance + pos.pnl }));
    setPositions(prev => prev.filter(p => p.id !== id));
    setTrades(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol: pos.symbol,
      side: pos.side === OrderSide.BUY ? OrderSide.SELL : OrderSide.BUY,
      price: marketPrice,
      quantity: pos.quantity,
      timestamp: Date.now(),
      status: 'COMPLETED'
    }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#02031a] text-slate-50 flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        tier={userTier}
      />
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage onStart={handleInitiateStart} />}
        {currentPage === 'checkout' && (
          <CheckoutPage 
            accountSize={selectedAccountSize} 
            stepMode={stepMode} 
            onPurchase={handleCompletePurchase} 
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            stats={stats} positions={positions} trades={trades} marketPrice={marketPrice}
            onPlaceOrder={handlePlaceOrder} onClosePosition={handleClosePosition}
          />
        )}
        {currentPage === 'status' && <AccountStatus stats={stats} tier={userTier} stepMode={stepMode} />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      
      <ChatBot />

      {stats.isLocked && (
        <div className="fixed bottom-0 left-0 right-0 bg-rose-600 text-white py-4 px-6 text-center font-black animate-pulse z-50 shadow-[0_-10px_40px_rgba(225,29,72,0.6)] uppercase tracking-widest text-sm backdrop-blur-md">
          ⚠️ ACCOUNT TERMINATED: {stats.failReason}.
        </div>
      )}
    </div>
  );
};

export default App;
