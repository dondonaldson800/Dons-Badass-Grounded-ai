
import React from 'react';
import { AppMode, FeatureType, SubscriptionTier } from '../types';

interface SidebarProps {
  activeFeature: FeatureType;
  setActiveFeature: (f: FeatureType) => void;
  mode: AppMode;
  setMode: (m: AppMode) => void;
  tier: SubscriptionTier;
  onGoHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeFeature, 
  setActiveFeature, 
  mode, 
  setMode,
  tier,
  onGoHome
}) => {
  const features: { id: FeatureType; label: string; icon: string; minTier: SubscriptionTier }[] = [
    { id: 'chat', label: 'Ground Search', icon: '🔍', minTier: SubscriptionTier.FREE },
    { id: 'voice_live', label: 'Live Voice', icon: '🎙️', minTier: SubscriptionTier.PRO },
    { id: 'image_gen', label: 'Image Forge', icon: '🎨', minTier: SubscriptionTier.FREE },
    { id: 'image_edit', label: 'Magic Edit', icon: '✨', minTier: SubscriptionTier.FREE },
    { id: 'video_gen', label: 'Veo Cinema', icon: '🎬', minTier: SubscriptionTier.PRO },
    { id: 'analysis', label: 'Vision Lab', icon: '👁️', minTier: SubscriptionTier.FREE },
    { id: 'tts', label: 'Vocalize', icon: '🗣️', minTier: SubscriptionTier.FREE },
  ];

  const mainModes = [AppMode.GENERAL, AppMode.LEGAL, AppMode.MEDICAL, AppMode.FINANCE];

  return (
    <aside className="w-20 lg:w-64 bg-[#0A0E14] border-r border-zinc-800 flex flex-col h-full sticky top-0 transition-all duration-300">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between cursor-pointer group" onClick={onGoHome}>
        <h1 className="text-xl font-black text-[#D4AF37] hidden lg:block group-hover:scale-105 transition-transform uppercase tracking-tighter">
          Empire v3
        </h1>
        <div className="lg:hidden text-2xl text-[#D4AF37]">🏛️</div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow overflow-y-auto">
        <label className="text-[10px] font-bold text-zinc-500 uppercase px-2 hidden lg:block mb-2">Core Pillars</label>
        <div className="grid grid-cols-1 gap-1 mb-8">
          {mainModes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`text-[10px] font-bold px-3 py-2 rounded-lg text-left transition-all relative uppercase tracking-widest ${
                mode === m 
                ? 'bg-zinc-800 text-[#D4AF37] ring-1 ring-[#D4AF37]/50' 
                : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <span className="hidden lg:inline">{m.replace('_', ' ')}</span>
              <span className="lg:hidden">{m[0]}</span>
            </button>
          ))}
          <button 
            onClick={onGoHome}
            className="text-[10px] px-3 py-2 text-zinc-600 hover:text-[#D4AF37] transition-colors text-left font-bold border-t border-zinc-800 mt-2 pt-2 uppercase tracking-widest"
          >
            + All 20 Experts
          </button>
        </div>

        <label className="text-[10px] font-bold text-zinc-500 uppercase px-2 hidden lg:block mb-2">Features</label>
        {features.map((f) => {
          const isLocked = tier === SubscriptionTier.FREE && f.minTier !== SubscriptionTier.FREE;
          return (
            <button
              key={f.id}
              onClick={() => !isLocked && setActiveFeature(f.id)}
              disabled={isLocked}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all relative ${
                activeFeature === f.id 
                  ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700' 
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
              } ${isLocked ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <span className="text-xl">{f.icon}</span>
              <span className="hidden lg:block text-[11px] font-bold uppercase tracking-widest">{f.label}</span>
              {isLocked && <span className="absolute right-2 text-[8px] bg-zinc-800 text-zinc-400 px-1 rounded border border-zinc-700">PRO</span>}
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-zinc-800">
        <div className={`p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hidden lg:block`}>
          <div className="text-[10px] text-zinc-600 mb-1 font-bold tracking-widest uppercase">System Tier</div>
          <div className={`text-xs font-black uppercase tracking-tighter ${tier === SubscriptionTier.EMPIRE_PRO ? 'text-[#D4AF37]' : 'text-zinc-400'}`}>
            {tier.replace('_', ' ')}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
