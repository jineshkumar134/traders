
import React from 'react';
import { AccountTier } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: 'landing' | 'dashboard' | 'status' | 'blog' | 'contact') => void;
  tier: AccountTier | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, tier }) => {
  const hasAccount = tier !== null;

  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div 
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent cursor-pointer flex items-center gap-2"
          onClick={() => setCurrentPage('landing')}
        >
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white">B</div>
          BharatProp
        </div>
        
        <div className="flex items-center gap-2 text-sm font-medium">
          <button 
            onClick={() => setCurrentPage('landing')}
            className={`px-3 py-2 rounded-md transition ${currentPage === 'landing' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Home
          </button>

          {/* Protected Links: Only shown after "Login" or "Buying an Account" */}
          {hasAccount && (
            <>
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 rounded-md transition ${currentPage === 'dashboard' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}
              >
                Terminal
              </button>
              <button 
                onClick={() => setCurrentPage('status')}
                className={`px-3 py-2 rounded-md transition ${currentPage === 'status' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}
              >
                Analytics
              </button>
            </>
          )}

          <button 
            onClick={() => setCurrentPage('blog')}
            className={`px-3 py-2 rounded-md transition ${currentPage === 'blog' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Learn
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className={`px-3 py-2 rounded-md transition ${currentPage === 'contact' ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            Contact
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!hasAccount ? (
          <button 
            onClick={() => {
              setCurrentPage('landing');
              // Give the page a moment to switch if needed before scrolling
              setTimeout(() => {
                document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95"
          >
            Login / Get Funded
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Account Tier</span>
              <span className="text-sm font-semibold text-blue-400">{tier}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border border-slate-600 cursor-pointer hover:border-blue-500 transition-colors">
              JD
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
