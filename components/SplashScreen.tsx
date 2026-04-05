
import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const bootMessages = [
    "Establishing Secure Empire Bridge...",
    "Syncing Distributed Grounding Nodes...",
    "Loading 20 Expert Intelligence Personas...",
    "Verifying Web-Scale Search Index...",
    "Calibrating Zero-Hallucination Guardrails...",
    "Authenticating SSL Handshake...",
    "Empire Node 12-B Online.",
    "Intelligence Core v3.2 Ready."
  ];

  useEffect(() => {
    let currentMsgIndex = 0;
    const interval = setInterval(() => {
      if (currentMsgIndex < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentMsgIndex]]);
        currentMsgIndex++;
        setProgress((currentMsgIndex / bootMessages.length) * 100);
      } else {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 500);
        setTimeout(onComplete, 1200);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-[200] bg-[#0A0E14] flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Animated Empire Logo */}
        <div className="mb-12 relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8a6d1d] p-[1px] shadow-[0_0_50px_rgba(212,175,55,0.2)] animate-bounce-slow">
            <div className="w-full h-full rounded-3xl bg-[#0A0E14] flex items-center justify-center text-4xl">
              🏛️
            </div>
          </div>
          <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-xl rounded-full animate-pulse" />
        </div>

        <h1 className="text-3xl font-black text-white tracking-tighter mb-2 uppercase italic">Grounded Empire</h1>
        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.5em] mb-12">Universal Intelligence Node</div>

        {/* Technical Logs */}
        <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 h-40 overflow-hidden mb-6 flex flex-col justify-end">
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                <span className="text-[#D4AF37] text-[8px] font-black">▶</span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-tight uppercase">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-[#D4AF37] transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="flex justify-between w-full">
           <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">System Booting</span>
           <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{Math.round(progress)}%</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
