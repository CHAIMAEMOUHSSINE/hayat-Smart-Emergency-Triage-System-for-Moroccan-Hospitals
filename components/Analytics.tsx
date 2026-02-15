
import React from 'react';
import { TranslationSet } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Props {
  t: TranslationSet;
}

const mockFlowData = [
  { time: '08:00', actual: 12, predicted: 10 },
  { time: '10:00', actual: 25, predicted: 22 },
  { time: '12:00', actual: 40, predicted: 45 },
  { time: '14:00', actual: 35, predicted: 30 },
  { time: '16:00', actual: 55, predicted: 50 },
  { time: '18:00', actual: 45, predicted: 48 },
  { time: '20:00', actual: 30, predicted: 35 },
  { time: '22:00', actual: 20, predicted: 18 },
];

const Analytics: React.FC<Props> = ({ t }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-nhs-blue mb-4">Patient Arrival Forecast (24h)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockFlowData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="predicted" stroke="#005EB8" fill="#005EB8" fillOpacity={0.1} name="Predicted Flow" />
              <Area type="monotone" dataKey="actual" stroke="#00664F" fill="#00664F" fillOpacity={0.05} name="Actual Flow" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-nhs-blue mb-4">Wait Time Distribution (Mins)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockFlowData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#D5281B" strokeWidth={3} dot={{ r: 6 }} name="Avg Wait Time" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
