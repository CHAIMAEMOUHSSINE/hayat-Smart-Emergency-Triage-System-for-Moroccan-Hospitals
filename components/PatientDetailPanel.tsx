
import React from 'react';
import { Patient, TranslationSet } from '../types';
import { 
  X, Activity, Clock, ShieldAlert, 
  Brain, FileText, TrendingUp, ChevronRight,
  Heart, Thermometer, User, Gauge
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, LineChart, Line
} from 'recharts';

interface Props {
  patient: Patient;
  onClose: () => void;
  t: TranslationSet;
}

const PatientDetailPanel: React.FC<Props> = ({ patient, onClose, t }) => {
  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${patient.priority === 'P1' ? 'bg-red-500 animate-critical' : 'bg-nhs-blue'}`}>
                {patient.priority}
             </div>
             <div>
                <h2 className="text-2xl font-archivo font-black text-gray-900">{patient.id}</h2>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{patient.name}</div>
             </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t.patientDetail.waitTime, value: Math.floor(patient.waitTimeSeconds / 60) + 'm', icon: Clock, color: 'text-blue-500' },
              { label: t.patientDetail.riskScore, value: patient.riskScore + '%', icon: ShieldAlert, color: patient.riskScore > 70 ? 'text-red-500' : 'text-green-500' },
              { label: t.hr, value: patient.vitals.hr, icon: Heart, color: 'text-red-400' },
              { label: t.temp, value: patient.vitals.temp + '°', icon: Thermometer, color: 'text-orange-400' },
            ].map((m, i) => (
              <div key={i} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <m.icon className={`w-4 h-4 ${m.color} mb-2`} />
                <div className="text-lg font-black text-gray-900 leading-tight">{m.value}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{m.label}</div>
              </div>
            ))}
          </div>

          {/* AI Explanation (SHAP) */}
          <div className="space-y-4">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Brain className="w-4 h-4 text-nhs-blue" />
                {t.patientDetail.shapTitle}
             </h3>
             <div className="h-64 bg-gray-50 rounded-3xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patient.shapValues} layout="vertical" margin={{ left: 0, right: 30 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} width={80} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                      {patient.shapValues.map((entry, index) => (
                        <Cell key={index} fill={entry.value > 20 ? '#D5281B' : '#005EB8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-4 font-medium">
                "{patient.explanation}"
             </p>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t.patientDetail.vitalsTitle}</h3>
                <div className="space-y-3">
                   {Object.entries(patient.vitals).map(([key, val]) => {
                     if (key === 'history') return null;
                     return (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50">
                           <span className="text-xs font-bold text-gray-500 uppercase">{key.toUpperCase()}</span>
                           <span className="text-sm font-black text-gray-900">{String(val)}</span>
                        </div>
                     )
                   })}
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t.patientDetail.resourceTitle}</h3>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white"><Gauge className="w-4 h-4"/></div>
                      <div>
                         <div className="text-[10px] font-black text-blue-400 uppercase">ETA</div>
                         <div className="text-sm font-bold text-blue-900">{patient.predictedWaitMinutes} mins</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-nhs-blue rounded-lg flex items-center justify-center text-white"><User className="w-4 h-4"/></div>
                      <div>
                         <div className="text-[10px] font-black text-nhs-blue uppercase">Staff</div>
                         <div className="text-sm font-bold text-gray-900">{patient.assignedDoctor || '...'}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
             <button className="py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all">
                {t.patientDetail.assignPhysician}
             </button>
             <button className="py-4 border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:bg-gray-50 transition-all">
                {t.patientDetail.updatePriority}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPanel;
