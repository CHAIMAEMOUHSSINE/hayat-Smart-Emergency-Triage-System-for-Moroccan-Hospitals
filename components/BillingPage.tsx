
import React from 'react';
import { TranslationSet } from '../types';
import { Check, Zap, ShieldCheck, Globe, Database, Users, Star, ArrowRight } from 'lucide-react';

interface Props {
  t: TranslationSet;
}

const BillingPage: React.FC<Props> = ({ t }) => {
  const tiers = [
    {
      name: 'Free Starter',
      price: '$0',
      desc: 'For small clinics and private practices.',
      features: ['Up to 50 patients/day', 'Standard AI Triage', '2 Staff Accounts', '30-day Data Retention'],
      button: 'Current Plan',
      current: true
    },
    {
      name: 'Professional',
      price: '$199',
      desc: 'Designed for Moroccan regional hospitals.',
      features: ['Unlimited Patients', 'Advanced SHAP Analysis', 'Up to 25 Staff Accounts', '1-year Data Retention', '24/7 Priority Support'],
      button: 'Upgrade to Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Full CHU Network integration & deployment.',
      features: ['Multi-department Support', 'National API Access', 'Custom AI Model Training', 'On-premise Deployment', 'SLA Guarantee 99.99%'],
      button: 'Contact Sales',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-archivo font-black text-gray-900 tracking-tight">{t.saas.pricing}</h1>
        <p className="text-xl text-gray-500 font-medium">Powering the next generation of Moroccan healthcare with scalable AI solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <div key={i} className={`relative p-10 rounded-[48px] bg-white border flex flex-col ${tier.highlight ? 'border-nhs-blue shadow-2xl shadow-nhs-blue/10' : 'border-gray-100 shadow-sm'}`}>
            {tier.highlight && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-nhs-blue text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="mb-10">
               <h3 className="text-2xl font-black text-gray-900 mb-2">{tier.name}</h3>
               <p className="text-gray-500 font-medium text-sm leading-relaxed">{tier.desc}</p>
            </div>

            <div className="mb-10">
               <span className="text-6xl font-archivo font-black text-gray-900">{tier.price}</span>
               {tier.price !== 'Custom' && <span className="text-gray-400 font-bold ml-2">/month</span>}
            </div>

            <div className="space-y-5 mb-12 flex-1">
               {tier.features.map((f, fi) => (
                 <div key={fi} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? 'bg-nhs-blue text-white' : 'bg-green-100 text-green-600'}`}>
                       <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-bold text-gray-600 leading-tight">{f}</span>
                 </div>
               ))}
            </div>

            <button className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${tier.current ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : tier.highlight ? 'bg-nhs-blue text-white shadow-xl shadow-nhs-blue/30 hover:scale-[1.02]' : 'border-2 border-nhs-blue text-nhs-blue hover:bg-nhs-blue/5'}`}>
               {tier.button}
               {!tier.current && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>

      {/* Usage Section */}
      <div className="mt-32 p-12 bg-gray-900 rounded-[60px] text-white overflow-hidden relative">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h3 className="text-3xl font-black mb-6">Real-time Usage Monitoring</h3>
               <p className="text-white/60 font-medium mb-12">Track your hospital's throughput and AI resource consumption with enterprise precision.</p>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Patients Transacted</div>
                    <div className="text-4xl font-archivo">1,204 / 5,000</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                       <div className="h-full bg-nhs-blue" style={{ width: '24%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">API Credits</div>
                    <div className="text-4xl font-archivo">84%</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                       <div className="h-full bg-green-500" style={{ width: '84%' }} />
                    </div>
                  </div>
               </div>
            </div>
            <div className="hidden lg:flex justify-center">
               <div className="relative p-12 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 rotate-3 shadow-2xl">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl">
                        <Zap className="text-nhs-blue w-6 h-6" />
                        <div className="text-xs font-bold">Inference latency: 12ms</div>
                     </div>
                     <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl translate-x-12">
                        <ShieldCheck className="text-green-400 w-6 h-6" />
                        <div className="text-xs font-bold">Loi 09-08 Compliance: 100%</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-nhs-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default BillingPage;
