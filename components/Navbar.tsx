
import React from 'react';
import { Language, TranslationSet, ViewState, User } from '../types';
import LanguageSelector from './LanguageSelector';
import { Activity, Search, ShieldCheck, LayoutDashboard, Database, CreditCard, LogOut, Settings, User as UserIcon } from 'lucide-react';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationSet;
  currentView: ViewState;
  onViewChange: (v: ViewState) => void;
  onOpenSearch: () => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ lang, onLanguageChange, t, currentView, onViewChange, onOpenSearch, user, onLogout }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <button 
            onClick={() => onViewChange('landing')}
            className="flex items-center gap-3 group transition-all"
          >
             <div className="w-10 h-10 bg-nhs-blue flex items-center justify-center rounded-xl shadow-lg shadow-nhs-blue/20 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-gray-900 leading-none tracking-tight font-archivo uppercase">
                  {t.title}
                </span>
                <span className="text-[9px] font-bold text-nhs-blue uppercase tracking-tight mt-1 max-w-[150px] leading-tight hidden sm:block">
                  {t.tagline}
                </span>
             </div>
          </button>

          {/* Navigation Links - Role Based */}
          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => onViewChange('landing')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'landing' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Home
            </button>
            {user && (
              <>
                <button 
                  onClick={() => onViewChange('dashboard')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'dashboard' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <div className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4"/> Dashboard</div>
                </button>
                {(user.role === 'admin' || user.role === 'manager') && (
                  <button 
                    onClick={() => onViewChange('admin-panel')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'admin-panel' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <div className="flex items-center gap-2"><Settings className="w-4 h-4"/> Admin</div>
                  </button>
                )}
                <button 
                  onClick={() => onViewChange('billing')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === 'billing' ? 'text-nhs-blue bg-nhs-blue/5' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <div className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> {t.saas.billing}</div>
                </button>
              </>
            )}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onOpenSearch}
              className="p-2.5 bg-gray-50 text-gray-400 hover:text-nhs-blue hover:bg-nhs-blue/5 rounded-xl transition-all"
            >
              <Search className="w-5 h-5" />
            </button>
            <LanguageSelector current={lang} onLanguageChange={onLanguageChange} />
            
            {!user ? (
              <button 
                onClick={() => onViewChange('signin')}
                className="px-6 py-2.5 bg-nhs-blue text-white rounded-xl font-black shadow-lg shadow-nhs-blue/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                {t.auth.signIn}
              </button>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pl-3 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-all">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user.role}</div>
                    <div className="text-xs font-bold text-gray-900">{user.name.split(' ')[0]}</div>
                  </div>
                  <img src={user.avatar} className="w-8 h-8 rounded-full border border-white shadow-sm" alt="avatar" />
                </button>
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-2">
                  <button onClick={() => onViewChange('profile')} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                    <UserIcon className="w-4 h-4 text-nhs-blue" /> My Profile
                  </button>
                  <button onClick={() => onViewChange('api-docs')} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
                    <Database className="w-4 h-4 text-nhs-blue" /> API Docs
                  </button>
                  <div className="h-px bg-gray-100 my-2 mx-4" />
                  <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-emergency-red hover:bg-red-50 rounded-xl transition-all">
                    <LogOut className="w-4 h-4" /> {t.auth.signOut}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
