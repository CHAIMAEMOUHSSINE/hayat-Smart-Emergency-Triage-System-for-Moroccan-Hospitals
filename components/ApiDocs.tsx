
import React from 'react';
import { TranslationSet } from '../types';
import { Code, Terminal, Copy, Database, ShieldCheck, Zap, ArrowRight, Play } from 'lucide-react';

interface Props {
  t: TranslationSet;
}

const ApiDocs: React.FC<Props> = ({ t }) => {
  const endpoints = [
    { method: 'POST', path: '/v1/triage', desc: 'Send patient data for AI analysis and priority classification.', body: '{ "hr": 120, "spo2": 94, "symptoms": "..." }' },
    { method: 'GET', path: '/v1/queue', desc: 'Retrieve the current real-time queue for your hospital site.', params: '?site_id=CHU-01' },
    { method: 'GET', path: '/v1/analytics/predict', desc: 'Get LSTM arrival forecast for the next 24 hours.', params: '?granularity=hour' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Content */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h1 className="text-5xl font-archivo font-black text-gray-900 tracking-tight flex items-center gap-4">
              <Code className="w-12 h-12 text-nhs-blue" />
              {t.saas.apiDocs}
            </h1>
            <p className="text-xl text-gray-500 font-medium mt-6">Integrate Hayat's intelligence directly into your hospital EMR or clinical software.</p>
          </div>

          <div className="space-y-12">
             {endpoints.map((ep, i) => (
                <div key={i} className="space-y-6 group">
                   <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-lg font-black text-xs ${ep.method === 'POST' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                        {ep.method}
                      </span>
                      <code className="text-lg font-mono font-bold text-gray-900">{ep.path}</code>
                   </div>
                   <p className="text-gray-500 font-medium leading-relaxed">{ep.desc}</p>
                   <div className="bg-gray-900 rounded-3xl p-8 shadow-xl shadow-gray-200 group-hover:-translate-y-1 transition-transform relative">
                      <div className="absolute top-6 right-8 flex gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Copy className="w-4 h-4" /></button>
                      </div>
                      <pre className="text-sm font-mono text-green-400 overflow-x-auto">
                        {ep.body ? ep.body : `// Query parameters: ${ep.params}`}
                      </pre>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm space-y-8">
              <h3 className="text-xl font-black text-gray-900">Developer Quickstart</h3>
              <div className="space-y-6">
                 {[
                   { icon: ShieldCheck, label: 'Authentication', desc: 'All requests must include an X-API-Key header obtained from settings.' },
                   { icon: Database, label: 'Standardized Format', desc: 'We follow HL7 FHIR-compatible data structures for all clinical events.' },
                   { icon: Zap, label: 'Real-time Hooks', desc: 'Configure webhooks to receive priority escalations via POST.' },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-nhs-blue/5 rounded-xl flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-nhs-blue" /></div>
                      <div>
                         <div className="font-bold text-sm mb-1">{item.label}</div>
                         <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gray-900 text-white p-10 rounded-[40px] shadow-xl relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                 <div className="text-[10px] font-black text-nhs-blue uppercase tracking-[0.2em] mb-4">Interactive Explorer</div>
                 <h4 className="text-2xl font-black mb-6">Launch API Sandbox</h4>
                 <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">Test your integration in a safe environment using our synthetic patient generator.</p>
                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-2xl font-black group-hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 fill-current" />
                    Open Sandbox
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-nhs-blue/20 rounded-full blur-3xl group-hover:bg-nhs-blue/40 transition-colors"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
