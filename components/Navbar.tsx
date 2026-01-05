
import React from 'react';
import { AccountTier } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: 'landing' | 'dashboard' | 'status') => void;
  tier: AccountTier | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, tier }) => {
  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div 
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
          onClick={() => setCurrentPage('landing')}
        >
          BharatProp
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
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
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end mr-4">
          <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Account Tier</span>
          <span className="text-sm font-semibold text-blue-400">{tier || 'Guest'}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border border-slate-600">
          JD
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
