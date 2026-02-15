
import React from 'react';
import { TranslationSet } from '../types';
import { TrendingDown, ShieldCheck, HeartPulse } from 'lucide-react';

interface Props {
  t: TranslationSet;
}

const ImpactStats: React.FC<Props> = ({ t }) => {
  const stats = [
    { label: t.wait_time_reduction, icon: TrendingDown, color: 'text-nhs-blue' },
    { label: t.critical_detection, icon: ShieldCheck, color: 'text-nhs-green' },
    { label: t.burnout_reduction, icon: HeartPulse, color: 'text-emergency-red' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border-b-4 border-nhs-blue p-6 shadow-sm rounded-t-lg">
          <div className="flex items-center gap-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <span className="text-xl font-bold text-gray-900 leading-tight">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactStats;
