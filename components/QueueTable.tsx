
import React from 'react';
import { Patient, TranslationSet } from '../types';
import { MoreHorizontal, ChevronRight } from 'lucide-react';

interface Props {
  patients: Patient[];
  t: TranslationSet;
  onSelect: (p: Patient) => void;
}

const QueueTable: React.FC<Props> = ({ patients, t, onSelect }) => {
  const getPriorityClasses = (p: string) => {
    switch (p) {
      case 'P1': return 'bg-red-500 text-white shadow-lg shadow-red-200 animate-pulse';
      case 'P2': return 'bg-orange-500 text-white';
      case 'P3': return 'bg-yellow-400 text-gray-900';
      case 'P4': return 'bg-green-500 text-white';
      case 'P5': return 'bg-nhs-blue text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const sortedPatients = [...patients].sort((a, b) => a.priority.localeCompare(b.priority));

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">{t.queue}</h2>
        <span className="text-sm font-semibold text-gray-400">{patients.length} total active</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Level</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t.patient_name}</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Metrics</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Arrival</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sortedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="group hover:bg-gray-50/80 transition-all cursor-pointer"
                onClick={() => onSelect(patient)}
              >
                <td className="px-6 py-5">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm ${getPriorityClasses(patient.priority)}`}>
                    {patient.priority}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-bold text-gray-900 group-hover:text-nhs-blue transition-colors">{patient.name}</div>
                  <div className="text-xs text-gray-500 font-medium">{patient.age} years • {patient.gender === 'M' ? 'Male' : 'Female'}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-400 font-bold">SpO2</span>
                       <span className={`text-xs font-black ${patient.vitals.spo2 < 92 ? 'text-red-500' : 'text-gray-700'}`}>{patient.vitals.spo2}%</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-400 font-bold">HR</span>
                       <span className={`text-xs font-black ${patient.vitals.hr > 110 ? 'text-orange-500' : 'text-gray-700'}`}>{patient.vitals.hr}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                  {new Date(patient.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="inline-flex p-2 bg-gray-100 rounded-lg group-hover:bg-nhs-blue group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueTable;
