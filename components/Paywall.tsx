
import React from 'react';
import { SubscriptionTier } from '../types';

interface PaywallProps {
  onUpgrade: (tier: SubscriptionTier) => void;
  onClose: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onUpgrade, onClose }) => {
  const empireFeatures = [
    { 
      name: 'All 20 Expert Personas', 
      detail: 'Access specialized grounding for niches like Cybersec, Logistics, Data Science, and more, each with custom behavioral guardrails.' 
    },
    { 
      name: 'Gemini 3 Pro Deep Thinking', 
      detail: 'Leverage an extended reasoning budget (32k+ tokens) for solving complex architectural, coding, and mathematical puzzles.' 
    },
    { 
      name: 'High-Res Image Forge (4K)', 
      detail: 'Generate professional-grade assets at 4K resolution with superior texture handling and prompt adherence.' 
    },
    { 
      name: 'Veo 3.1 Pro Cinema', 
      detail: 'High-definition cinematic video generation with advanced motion consistency and longer duration capabilities.' 
    },
    { 
      name: 'Verified Legal Statutes', 
      detail: 'Grounded data sourced exclusively from official government statutes, legislative codes, and parliamentary records.' 
    },
    { 
      name: 'Clinical Medical Research', 
      detail: 'This data is sourced from peer-reviewed clinical journals to ensure maximum clinical accuracy.' 
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="max-w-4xl w-full text-center py-12">
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">
          Unlock the <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Empire</span>
        </h1>
        
        <p className="text-zinc-400 text-lg mb-12">
          Ascend to the highest tier of grounded intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pro Tier */}
          <div className="crooked-card bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col text-left">
            <h3 className="text-2xl font-black text-white mb-2">PRO ACCESS</h3>
            <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-bold">Standard Operations</p>
            <div className="text-4xl font-black text-white mb-8">$4.95<span className="text-sm text-zinc-500">/mo</span></div>
            <ul className="space-y-3 mb-12 flex-grow">
              {[
                'Live Voice Bridge',
                'Veo 3.1 Fast Video',
                'Priority Queueing',
                'Standard Grounding'
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <span className="text-amber-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onUpgrade(SubscriptionTier.PRO)}
              className="w-full py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all"
            >
              Select Pro
            </button>
          </div>

          {/* Empire Pro Tier */}
          <div className="crooked-card bg-zinc-900 border border-amber-500/50 p-8 rounded-3xl flex flex-col text-left relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Full Power</div>
            <h3 className="text-2xl font-black text-white mb-2">EMPIRE PRO</h3>
            <p className="text-amber-500 text-sm mb-6 uppercase tracking-widest font-bold">Elite Intelligence</p>
            <div className="text-4xl font-black text-white mb-8">$29.95<span className="text-sm text-zinc-500">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-grow">
              {empireFeatures.map((f, i) => (
                <li key={i} className="group relative flex items-center gap-3 text-zinc-300 text-sm cursor-help">
                  <span className="text-amber-500">✓</span> 
                  <span className="border-b border-zinc-700 border-dotted group-hover:text-white transition-colors">
                    {f.name}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-800 text-[11px] text-zinc-200 rounded-xl shadow-2xl border border-zinc-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 pointer-events-none">
                    <p className="leading-relaxed">{f.detail}</p>
                    <div className="absolute top-full left-4 w-2 h-2 bg-zinc-800 border-r border-b border-zinc-700 rotate-45 -translate-y-1"></div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onUpgrade(SubscriptionTier.EMPIRE_PRO)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold shadow-lg transition-all"
            >
              Ascend Now
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Not Now, Keep Limited Access
          </button>
          
          <button 
            className="text-zinc-600 hover:text-zinc-400 text-[10px] uppercase font-bold tracking-tighter mt-12 underline"
          >
            Restore Purchases
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
