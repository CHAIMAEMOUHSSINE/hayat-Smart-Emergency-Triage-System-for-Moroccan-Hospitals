
import React, { useState, useMemo } from 'react';
import { Patient, TranslationSet } from '../types';
import { 
  PlusCircle, Activity, Users, Clock, AlertCircle, 
  TrendingUp, Search, Filter, ChevronRight, 
  MoreVertical, Zap, Brain, Thermometer, Gauge,
  X, UserCheck, LayoutDashboard
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import PatientDetailPanel from './PatientDetailPanel';

interface Props {
  patients: Patient[];
  t: TranslationSet;
  isAnalyzing: boolean;
  onAddPatient: (data: any) => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  P1: '#D5281B',
  P2: '#FF8C00',
  P3: '#FFD700',
  P4: '#00A550',
  P5: '#4FC3F7'
};

const Dashboard: React.FC<Props> = ({ patients, t, isAnalyzing, onAddPatient }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | 'all'>('all');

  // Dashboard Stats
  const stats = useMemo(() => {
    const criticalCount = patients.filter(p => p.priority === 'P1' || p.priority === 'P2').length;
    const avgWaitP3 = patients.filter(p => p.priority === 'P3').reduce((acc, p) => acc + p.waitTimeSeconds, 0) / Math.max(1, patients.filter(p => p.priority === 'P3').length);
    const staffLoad = 85; // Mock
    return {
      waiting: patients.length,
      critical: criticalCount,
      avgWaitMins: Math.floor(avgWaitP3 / 60),
      staffLoad
    };
  }, [patients]);

  // Forecast Mock Data
  const forecastData = [
    { time: '12:00', actual: 40, predicted: 42 },
    { time: '13:00', actual: 45, predicted: 48 },
    { time: '14:00', actual: 50, predicted: 55 },
    { time: '15:00', actual: 60, predicted: 62 },
    { time: '16:00', predicted: 75 },
    { time: '17:00', predicted: 85 },
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    const matchesFilter = filterPriority === 'all' || p.priority === filterPriority;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.priority.localeCompare(b.priority));

  const formatWaitTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8 animate-in fade-in duration-700">
      {/* 1. Header with Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-archivo font-black text-gray-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-nhs-blue" />
            {t.dashboard.header}
          </h1>
          <p className="text-gray-500 font-medium mt-1">{t.dashboard.subHeader}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-nhs-blue outline-none transition-all"
            />
          </div>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-sm outline-none cursor-pointer"
          >
            <option value="all">All</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-nhs-blue text-white rounded-xl font-black shadow-lg shadow-nhs-blue/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            {t.dashboard.admission}
          </button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: t.dashboard.stats.waiting, value: stats.waiting, icon: Users, color: 'text-nhs-blue', trend: '+12%' },
          { label: t.dashboard.stats.critical, value: stats.critical, icon: Activity, color: 'text-emergency-red', alert: stats.critical > 0, trend: stats.critical > 2 ? '+High' : 'Stable' },
          { label: t.dashboard.stats.avgWait, value: stats.avgWaitMins, icon: Clock, color: 'text-orange-500', trend: '-5m' },
          { label: t.dashboard.stats.utilization, value: `${stats.staffLoad}%`, icon: Gauge, color: 'text-green-600', trend: 'Optimal' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gray-50 group-hover:bg-blue-50 transition-colors ${(stat as any).alert ? 'animate-critical' : ''}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${stat.trend?.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-3xl font-archivo text-gray-900">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* 3. Main Queue Table */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
               <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                 <Zap className="w-5 h-5 text-nhs-blue" />
                 {t.dashboard.activeMatrix}
               </h3>
               <div className="flex gap-2">
                 {['P1','P2','P3','P4','P5'].map(p => (
                   <span key={p} className="text-[10px] font-black px-2 py-1 rounded bg-gray-100 text-gray-400">{p}</span>
                 ))}
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID / {t.patient_name}</th>
                    <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">{t.queue.split(' ')[0]}</th>
                    <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">{t.vitals}</th>
                    <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">{t.patientDetail.waitTime}</th>
                    <th className="px-8 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">{t.patientDetail.riskScore}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredPatients.map(patient => (
                    <tr 
                      key={patient.id} 
                      onClick={() => setSelectedPatient(patient)}
                      className="group hover:bg-nhs-blue/5 cursor-pointer transition-all border-l-4 border-l-transparent hover:border-l-nhs-blue"
                    >
                      <td className="px-8 py-5">
                        <div className="font-bold text-gray-900 group-hover:text-nhs-blue transition-colors">{patient.id}</div>
                        <div className="text-xs text-gray-500 font-medium">{patient.name} • {patient.age}y {patient.gender}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-xl font-black text-xs ${patient.priority === 'P1' ? 'bg-red-500 text-white animate-critical' : 'bg-gray-100 text-gray-600'}`}>
                          {patient.priority}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="flex flex-col">
                             <span className="text-[10px] text-gray-400 font-bold">SpO2</span>
                             <span className={`font-mono text-sm font-bold ${patient.vitals.spo2 < 92 ? 'text-red-500' : 'text-gray-700'}`}>{patient.vitals.spo2}%</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[10px] text-gray-400 font-bold">HR</span>
                             <span className="font-mono text-sm font-bold text-gray-700">{patient.vitals.hr}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-mono text-sm font-bold text-gray-700">{formatWaitTime(patient.waitTimeSeconds)}</div>
                        <div className="text-[10px] text-gray-400 font-bold">ETA: {patient.predictedWaitMinutes} min</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${patient.riskScore > 80 ? 'bg-red-500' : patient.riskScore > 40 ? 'bg-orange-500' : 'bg-green-500'}`} 
                                style={{ width: `${patient.riskScore}%` }}
                              />
                           </div>
                           <span className="text-[10px] font-black text-gray-400">{patient.riskScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Forecasting Chart */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="text-lg font-black text-gray-900">{t.dashboard.forecastTitle}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{t.dashboard.forecastSub}</p>
               </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005EB8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#005EB8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="predicted" stroke="#005EB8" strokeWidth={3} fillOpacity={1} fill="url(#colorPred)" />
                  <Area type="monotone" dataKey="actual" stroke="#cbd5e1" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. Sidebar Insights */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-nhs-blue text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl"><Brain className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold">{t.dashboard.aiCopilot}</h3>
                 </div>
                 <div className="space-y-4">
                    {[
                      { icon: AlertCircle, color: 'bg-red-500', title: 'Critical Trend', desc: 'Cluster of 4 respiratory cases in last 2h.' },
                      { icon: UserCheck, color: 'bg-green-500', title: 'Optimization', desc: 'Staff load optimization recommended.' },
                      { icon: Clock, color: 'bg-orange-500', title: 'Wait Alert', desc: 'Wait times exceeding threshold.' },
                    ].map((insight, i) => (
                      <div key={i} className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/20 transition-all cursor-pointer">
                        <div className="flex gap-4">
                           <div className={`w-8 h-8 ${insight.color} rounded-lg flex-shrink-0 flex items-center justify-center`}><insight.icon className="w-4 h-4"/></div>
                           <div>
                              <div className="font-bold text-sm">{insight.title}</div>
                              <div className="text-xs text-white/70 leading-relaxed mt-1">{insight.desc}</div>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-white text-nhs-blue font-black rounded-2xl shadow-lg hover:bg-gray-50 transition-all">
                    Generate Report
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           </div>

           <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                 <Thermometer className="w-5 h-5 text-nhs-blue" />
                 {t.dashboard.unitHealth}
              </h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                       <span>ER Bed Capacity</span>
                       <span>18/20</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emergency-red rounded-full" style={{ width: '90%' }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                       <span>Nurse-Patient Ratio</span>
                       <span>1:4.5</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-nhs-blue rounded-full" style={{ width: '65%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Slide-over Patient Panel */}
      {selectedPatient && (
        <PatientDetailPanel 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
          t={t}
        />
      )}

      {/* Admission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-3xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.dashboard.admission}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X/></button>
             </div>
             <form className="p-10 space-y-6" onSubmit={(e) => {
               e.preventDefault();
               const fd = new FormData(e.currentTarget);
               onAddPatient(Object.fromEntries(fd));
               setIsModalOpen(false);
             }}>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.patient_name}</label>
                      <input name="name" required placeholder="..." className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-nhs-blue" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.age}</label>
                      <input name="age" type="number" required placeholder="42" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-nhs-blue" />
                   </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 bg-nhs-blue/5 p-6 rounded-3xl border border-nhs-blue/10">
                   {['hr','bp','spo2','temp'].map(v => (
                      <div key={v} className="space-y-1.5">
                         <label className="text-[10px] font-black text-nhs-blue uppercase tracking-widest">{v.toUpperCase()}</label>
                         <input name={v} required placeholder="--" className="w-full p-3 rounded-xl bg-white border border-gray-100 text-sm font-bold" />
                      </div>
                   ))}
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.symptoms}</label>
                   <textarea name="symptoms" required rows={3} placeholder="..." className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-nhs-blue" />
                </div>

                <button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="w-full py-5 bg-nhs-blue text-white font-black rounded-2xl shadow-xl shadow-nhs-blue/30 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAnalyzing ? <><Activity className="animate-spin" /> ...</> : t.submit}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
