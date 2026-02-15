
import React from 'react';
import { TranslationSet, User } from '../types';
import { Building2, Users, Hospital, TrendingUp, ShieldCheck, MapPin, Search, ChevronRight, BarChart3, Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  t: TranslationSet;
  user: User;
}

const AdminPanel: React.FC<Props> = ({ t, user }) => {
  const hospitalsData = [
    { name: 'CHU Ibn Rochd', patients: 2450, waitTime: 42, color: '#005EB8' },
    { name: 'CHU Hassan II', patients: 1820, waitTime: 55, color: '#00A550' },
    { name: 'CHU Mohammed VI', patients: 2100, waitTime: 48, color: '#FFD700' },
    { name: 'Hôpital Militaire', patients: 950, waitTime: 30, color: '#FF8C00' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-archivo font-black text-gray-900 tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-nhs-blue" />
            {t.saas.adminPanel}
          </h1>
          <p className="text-gray-500 font-medium mt-2">Global oversight of the Moroccan smart triage network.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <Globe className="w-5 h-5 text-nhs-blue" />
              <span className="text-sm font-bold text-gray-700">Morocco National Node</span>
           </div>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Active Hospitals', value: '12', icon: Building2, color: 'text-nhs-blue' },
          { label: 'Total Patients', value: '7,420', icon: Users, color: 'text-green-600' },
          { label: 'Network Wait Time', value: '46m', icon: TrendingUp, color: 'text-orange-500' },
          { label: 'System Uptime', value: '99.98%', icon: ShieldCheck, color: 'text-nhs-blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-6 transition-transform group-hover:scale-110`} />
            <div className="text-4xl font-archivo text-gray-900">{stat.value}</div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hospital Performance */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xl font-black text-gray-900">Hospital Load Balancing</h3>
                 <button className="text-sm font-black text-nhs-blue uppercase tracking-widest hover:underline">Full Report</button>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hospitalsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="patients" fill="#005EB8" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                 <h3 className="text-lg font-black text-gray-900">Hospital Registry</h3>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input placeholder="Search sites..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none" />
                 </div>
              </div>
              <div className="divide-y divide-gray-50">
                 {hospitalsData.map((h, i) => (
                   <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-nhs-blue/5 rounded-2xl flex items-center justify-center text-nhs-blue font-black group-hover:scale-110 transition-transform">
                            {h.name.split(' ')[1][0]}
                         </div>
                         <div>
                            <div className="font-bold text-gray-900">{h.name}</div>
                            <div className="text-xs text-gray-500 font-medium">Morocco • {h.patients} active cases</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-12">
                         <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-black text-gray-400 uppercase">Avg Wait</div>
                            <div className="text-sm font-bold text-gray-900">{h.waitTime}m</div>
                         </div>
                         <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-nhs-blue group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* System Health */}
        <div className="space-y-8">
           <div className="bg-nhs-blue text-white p-10 rounded-[40px] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-8">Infrastructure Health</h3>
                 <div className="space-y-6">
                    {[
                      { label: 'API Gateway', val: '99.98%' },
                      { label: 'ML Inference Cluster', val: '100%' },
                      { label: 'Database Replication', val: 'Sync' },
                      { label: 'Encryption Modules', val: 'Active' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                         <span className="text-sm font-medium text-white/60">{item.label}</span>
                         <span className="text-sm font-black text-green-400">{item.val}</span>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-white text-nhs-blue font-black rounded-2xl mt-12 shadow-lg hover:bg-gray-50 transition-all">
                    View Network Logs
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           </div>

           <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-8">System Usage</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie data={hospitalsData} dataKey="patients" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                         {hospitalsData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Pie>
                      <Tooltip />
                   </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                 {hospitalsData.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: h.color }} />
                       <span className="text-[10px] font-bold text-gray-500">{h.name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
