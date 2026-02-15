
import React, { useState } from 'react';
import { TranslationSet, ViewState, Language, UserRole } from '../types';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, User as UserIcon, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { mockLogin } from '../services/authService';

interface Props {
  mode: 'signin' | 'signup';
  t: TranslationSet;
  onViewChange: (v: ViewState) => void;
  onAuthSuccess: (user: any) => void;
  lang: Language;
}

const AuthPages: React.FC<Props> = ({ mode, t, onViewChange, onAuthSuccess, lang }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('nurse');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isRTL = ['ar', 'dar'].includes(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation delay
    await new Promise(r => setTimeout(r, 1000));

    if (mode === 'signin') {
      const result = mockLogin(email, password);
      if (result.success) {
        onAuthSuccess(result.user);
      } else {
        setError(result.error || 'Login failed');
      }
    } else {
      // Mock signup
      onAuthSuccess({
        id: 'new',
        email,
        name: fullName,
        role,
        hospital: 'CHU Ibn Rochd',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left: Hero Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-nhs-blue p-16 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Activity className="w-10 h-10" />
            <span className="text-3xl font-archivo font-black uppercase tracking-tighter">Hayat</span>
          </div>
          <h2 className="text-5xl font-playfair font-black mb-6 leading-tight">
            The future of <br/>emergency medicine.
          </h2>
          <p className="text-xl text-white/70 font-medium max-w-md">
            Advanced triage intelligence helping Moroccan healthcare professionals save more lives, one data point at a time.
          </p>
        </div>

        <div className="relative z-10 space-y-8">
           <div className="flex gap-4 items-center bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <div className="font-bold">AES-256 Encryption</div>
                <div className="text-sm text-white/60">Your clinical data is PII-compliant and secure.</div>
              </div>
           </div>
           <p className="text-sm text-white/40 font-bold tracking-widest uppercase">© 2026 TEAM SMART TRIAGE • AGORAAI HACKATHON</p>
        </div>

        {/* Decorative Zellige */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-zellige"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-16 lg:p-24 bg-gray-50/30">
        <div className="w-full max-w-[400px] space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-4xl font-archivo font-black text-gray-900 mb-2">
              {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
            </h1>
            <p className="text-gray-500 font-medium">
              {mode === 'signin' ? t.hero_subtitle.split('.')[0] : 'Join the Moroccan clinical triage network.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.auth.fullName}</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    required 
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Fatima El Mansouri" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-nhs-blue outline-none transition-all" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.auth.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@hospital.ma" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-nhs-blue outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.auth.password}</label>
                {mode === 'signin' && <button type="button" className="text-[10px] font-black text-nhs-blue uppercase tracking-widest hover:underline">{t.auth.forgotPassword}</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-nhs-blue outline-none transition-all" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-nhs-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.auth.role}</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select 
                    value={role}
                    onChange={e => setRole(e.target.value as UserRole)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-nhs-blue outline-none transition-all appearance-none"
                  >
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
            )}

            {error && <div className="text-emergency-red text-sm font-bold animate-in shake-in duration-200">⚠️ {error}</div>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-nhs-blue text-white font-black rounded-2xl shadow-xl shadow-nhs-blue/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : (mode === 'signin' ? t.auth.signIn : t.auth.signUp)}
              {!isLoading && <ArrowRight className={`w-5 h-5 ${isRTL ? 'rtl-flip-x' : ''}`} />}
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-500 font-medium">
              {mode === 'signin' ? t.auth.noAccount : t.auth.haveAccount}
            </span>
            <button 
              onClick={() => onViewChange(mode === 'signin' ? 'signup' : 'signin')}
              className="ml-2 text-nhs-blue font-black hover:underline underline-offset-4"
            >
              {mode === 'signin' ? t.auth.signUp : t.auth.signIn}
            </button>
          </div>

          {/* Demo Info Card */}
          {mode === 'signin' && (
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-3">
              <div className="text-[10px] font-black text-nhs-blue uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Demo Credentials (Password: Password123!)
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-600">
                <div className="p-2 bg-white rounded-lg">nurse@hayattriage.ma</div>
                <div className="p-2 bg-white rounded-lg">doctor@hayattriage.ma</div>
                <div className="p-2 bg-white rounded-lg">admin@hayattriage.ma</div>
                <div className="p-2 bg-white rounded-lg">manager@hayattriage.ma</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
