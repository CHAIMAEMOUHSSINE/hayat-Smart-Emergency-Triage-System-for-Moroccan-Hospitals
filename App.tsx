
import React, { useState, useEffect, useMemo } from 'react';
import { Language, Patient, TranslationSet, ViewState, User } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SearchPanel from './components/SearchPanel';
import AuthPages from './components/AuthPages';
import BillingPage from './components/BillingPage';
import AdminPanel from './components/AdminPanel';
import ApiDocs from './components/ApiDocs';
import { analyzePatientTriage } from './services/geminiService';
import { getCurrentUser, logout } from './services/authService';

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PT-4782',
    name: 'A. Bennani',
    age: 62,
    gender: 'F',
    vitals: { hr: 135, bp: '165/105', spo2: 89, temp: 38.5, history: [] },
    symptoms: 'Sudden chest pain, respiratory distress, cold sweat.',
    priority: 'P1',
    arrival_time: new Date(Date.now() - 15 * 60000).toISOString(),
    waitTimeSeconds: 15 * 60,
    assignedDoctor: null,
    riskScore: 92,
    predictedWaitMinutes: 0,
    shapValues: [
      { feature: 'SpO2', value: 45 },
      { feature: 'Heart Rate', value: 30 },
      { feature: 'Blood Pressure', value: 15 },
      { feature: 'Age', value: 10 }
    ],
    explanation: 'Critical hypoxia (89%) and tachycardia (135bpm) in a 60+ patient with chest pain indicates immediate high-acuity priority.',
    isHighRisk: true
  },
  {
    id: 'PT-3891',
    name: 'M. Alami',
    age: 24,
    gender: 'M',
    vitals: { hr: 110, bp: '130/85', spo2: 96, temp: 39.8, history: [] },
    symptoms: 'High grade fever (40C), persistent vomiting, dehydration.',
    priority: 'P2',
    arrival_time: new Date(Date.now() - 40 * 60000).toISOString(),
    waitTimeSeconds: 40 * 60,
    assignedDoctor: 'Dr. Hassan',
    riskScore: 45,
    predictedWaitMinutes: 12,
    shapValues: [
      { feature: 'Temperature', value: 50 },
      { feature: 'Symptoms', value: 20 },
      { feature: 'Heart Rate', value: 15 }
    ],
    explanation: 'Severe hyperpyrexia with systemic signs of dehydration classifies as P2.'
  },
  {
    id: 'PT-1204',
    name: 'S. Touhami',
    age: 45,
    gender: 'F',
    vitals: { hr: 88, bp: '120/80', spo2: 98, temp: 37.2, history: [] },
    symptoms: 'Abdominal pain, nausea for 2 days.',
    priority: 'P3',
    arrival_time: new Date(Date.now() - 120 * 60000).toISOString(),
    waitTimeSeconds: 120 * 60,
    assignedDoctor: null,
    riskScore: 12,
    predictedWaitMinutes: 45,
    shapValues: [
      { feature: 'Duration', value: 30 },
      { feature: 'Age', value: 10 }
    ],
    explanation: 'Stable vitals with localized abdominal discomfort, standard urgency.'
  }
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('hayat_lang') as Language) || 'en');
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);
  const isRTL = ['ar', 'dar'].includes(lang);

  // Sync lang to document
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('hayat_lang', lang);
  }, [lang, isRTL]);

  // Simulation: Update wait times every second
  useEffect(() => {
    const timer = setInterval(() => {
      setPatients(prev => prev.map(p => ({
        ...p,
        waitTimeSeconds: p.waitTimeSeconds + 1
      })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('hayat_user', JSON.stringify(u));
    setView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setView('landing');
  };

  const handlePatientAdd = async (newPatientData: any) => {
    setIsAnalyzing(true);
    try {
      const vitals = { 
        hr: Number(newPatientData.hr), 
        bp: newPatientData.bp, 
        spo2: Number(newPatientData.spo2), 
        temp: Number(newPatientData.temp) 
      };
      const triage = await analyzePatientTriage(vitals, newPatientData.symptoms);
      
      const newPatient: Patient = {
        id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: newPatientData.name,
        age: Number(newPatientData.age),
        gender: newPatientData.gender,
        vitals: { ...vitals, history: [] },
        symptoms: newPatientData.symptoms,
        priority: triage.priority,
        arrival_time: new Date().toISOString(),
        waitTimeSeconds: 0,
        assignedDoctor: null,
        riskScore: triage.priority === 'P1' ? 85 : triage.priority === 'P2' ? 50 : 10,
        predictedWaitMinutes: triage.priority === 'P1' ? 0 : triage.priority === 'P2' ? 10 : 30,
        shapValues: [
          { feature: 'Symptoms', value: 40 },
          { feature: 'SpO2', value: 20 },
          { feature: 'Age', value: 15 }
        ],
        explanation: triage.explanation
      };
      
      setPatients(prev => [newPatient, ...prev]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderView = () => {
    switch(view) {
      case 'landing': return <LandingPage t={t} onLaunch={() => user ? setView('dashboard') : setView('signin')} />;
      case 'signin': return <AuthPages mode="signin" t={t} onViewChange={setView} onAuthSuccess={handleAuthSuccess} lang={lang} />;
      case 'signup': return <AuthPages mode="signup" t={t} onViewChange={setView} onAuthSuccess={handleAuthSuccess} lang={lang} />;
      case 'dashboard': return <Dashboard patients={patients} t={t} isAnalyzing={isAnalyzing} onAddPatient={handlePatientAdd} />;
      case 'billing': return <BillingPage t={t} />;
      case 'admin-panel': return user && (user.role === 'admin' || user.role === 'manager') ? <AdminPanel t={t} user={user} /> : <Dashboard patients={patients} t={t} isAnalyzing={isAnalyzing} onAddPatient={handlePatientAdd} />;
      case 'api-docs': return <ApiDocs t={t} />;
      default: return <LandingPage t={t} onLaunch={() => setView('dashboard')} />;
    }
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Navbar 
        lang={lang} 
        onLanguageChange={setLang} 
        t={t} 
        currentView={view} 
        onViewChange={setView} 
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}

      <div className={view === 'signin' || view === 'signup' ? '' : 'pt-20'}>
        {renderView()}
      </div>
    </div>
  );
};

export default App;
