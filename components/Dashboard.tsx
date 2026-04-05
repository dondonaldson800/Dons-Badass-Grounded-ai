
import React from 'react';
import { AppMode, AppTile } from '../types';

const APP_TILES: AppTile[] = [
  { id: AppMode.GENERAL, name: 'General Intelligence', size: 'large', color: '#1C222D', icon: '🌍' },
  { id: AppMode.LEGAL, name: 'Senior Jurist', size: 'medium', color: '#1C222D', icon: '⚖️' },
  { id: AppMode.MEDICAL, name: 'Clinical Specialist', size: 'medium', color: '#1C222D', icon: '🏥' },
  { id: AppMode.FINANCE, name: 'CFO Analyst', size: 'medium', color: '#1C222D', icon: '📈' },
  { id: AppMode.REAL_ESTATE, name: 'PropTech Lead', size: 'small', color: '#1C222D', icon: '🏠' },
  { id: AppMode.ACADEMIC, name: 'Academic Fellow', size: 'small', color: '#1C222D', icon: '🎓' },
  { id: AppMode.PATENT, name: 'Patent Scout', size: 'small', color: '#1C222D', icon: '📜' },
  { id: AppMode.TAX, name: 'Tax Strategist', size: 'small', color: '#1C222D', icon: '💵' },
  { id: AppMode.LOGISTICS, name: 'Supply Architect', size: 'small', color: '#1C222D', icon: '📦' },
  { id: AppMode.CRYPTO, name: 'Web3 Compliance', size: 'small', color: '#1C222D', icon: '⛓️' },
  { id: AppMode.GRANT, name: 'Grant Strategist', size: 'small', color: '#1C222D', icon: '✍️' },
  { id: AppMode.ADS, name: 'Ad-Tech Lead', size: 'small', color: '#1C222D', icon: '🎯' },
  { id: AppMode.ECOM, name: 'E-Com Auditor', size: 'small', color: '#1C222D', icon: '🛒' },
  { id: AppMode.ESG, name: 'ESG Director', size: 'small', color: '#1C222D', icon: '🌱' },
  { id: AppMode.VENTURE, name: 'VC Scout', size: 'small', color: '#1C222D', icon: '🚀' },
  { id: AppMode.HR, name: 'HR Consultant', size: 'small', color: '#1C222D', icon: '👥' },
  { id: AppMode.TECH, name: 'CTO Advisor', size: 'small', color: '#1C222D', icon: '💻' },
  { id: AppMode.NEWS, name: 'Truth Editor', size: 'small', color: '#1C222D', icon: '🗞️' },
  { id: AppMode.TRAVEL, name: 'Elite Concierge', size: 'small', color: '#1C222D', icon: '✈️' },
  { id: AppMode.SALES, name: 'High-Stakes Sales', size: 'small', color: '#1C222D', icon: '🤝' },
];

interface DashboardProps {
  onSelect: (mode: AppMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelect }) => {
  return (
    <div className="h-full overflow-y-auto bg-[#0A0E14] p-8 md:p-12 scroll-smooth">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <header className="mb-20 max-w-5xl relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
          Established 2026 • The Grounded Empire
        </div>
        <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
          Stop Guessing.<br />
          <span className="text-[#D4AF37]">Start Knowing.</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed font-medium max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-700">
          Tired of AI making things up? <span className="text-white">Grounded Search v3.2</span> is engineered for absolute objective truth. Powered by Gemini’s 2026 grounding protocols.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-16 duration-700">
          <BenefitItem title="Live Grounding" desc="Real-time multi-vector search across the live web." />
          <BenefitItem title="Zero Hallucinations" desc="Engineered to reduce AI 'invention' by 99%." />
          <BenefitItem title="Verified Evidence" desc="Every claim includes direct, high-authority proof." />
        </div>
      </header>

      {/* Grid Header */}
      <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-[#D4AF37] uppercase tracking-tighter">The Empire Pillars</h2>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-black mt-2">20 Specialized Expert Nodes • Grounded Intelligence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[120px] mb-24 relative z-10">
        {APP_TILES.map((tile, idx) => (
          <button
            key={tile.id}
            onClick={() => onSelect(tile.id)}
            // Fixed duplicate attribute error by merging style props
            style={{ 
              backgroundColor: tile.color,
              animationDelay: `${idx * 30}ms`
            }}
            className={`
              ${tile.size === 'large' ? 'sm:col-span-2 lg:col-span-4 lg:row-span-2' : ''}
              ${tile.size === 'medium' ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}
              ${tile.size === 'small' ? 'col-span-1 row-span-1' : ''}
              rounded-3xl p-6 flex flex-col justify-end text-left transition-all border border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#161B22] shadow-2xl relative overflow-hidden group animate-in fade-in zoom-in-95 duration-500
            `}
          >
            <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              {tile.icon}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <h3 className={`font-black text-white leading-tight uppercase tracking-tighter ${tile.size === 'large' ? 'text-4xl' : 'text-sm'}`}>
                {tile.name}
              </h3>
            </div>
            {tile.id !== AppMode.GENERAL && (
              <span className="absolute bottom-4 right-6 text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100">
                Empire Pro
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Safety Section */}
      <footer className="max-w-5xl border-t border-white/5 pt-16 pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h4 className="text-white font-black text-lg mb-4 uppercase tracking-tighter">Safety & Data Governance</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">
              Compliant with the 2026 AI Ethics Accord. We provide 100% transparent data handling and a real-time inaccurate content reporting node. Your intelligence history is vaulted with end-to-end encryption.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {['Gemini 3', 'Verified Grounding', 'Zero Hallucinations', '256-Bit Encryption'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-[#1C222D] rounded-xl text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] border border-white/5 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

const BenefitItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-8 rounded-3xl bg-[#1C222D]/50 border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
    <h4 className="text-[#D4AF37] font-black text-xs mb-2 uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">{title}</h4>
    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Dashboard;
