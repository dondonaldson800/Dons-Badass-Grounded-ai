
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import MediaView from './components/MediaView';
import LiveVoice from './components/LiveVoice';
import Dashboard from './components/Dashboard';
import Paywall from './components/Paywall';
import SplashScreen from './components/SplashScreen';
import Notification, { NotificationType } from './components/Notification';
import { AppMode, SubscriptionTier, FeatureType } from './types';

interface NotificationState {
  message: string;
  type: NotificationType;
}

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [mode, setMode] = useState<AppMode>(AppMode.GENERAL);
  const [tier, setTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  const [activeFeature, setActiveFeature] = useState<FeatureType | 'dashboard'>('dashboard');
  const [showPaywall, setShowPaywall] = useState(false);
  const [pendingMode, setPendingMode] = useState<AppMode | null>(null);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const notify = useCallback((message: string, type: NotificationType = NotificationType.INFO) => {
    setNotification({ message, type });
  }, []);

  const checkEmpireAccess = (appMode: AppMode) => {
    if (appMode === AppMode.GENERAL) return true;
    if (tier === SubscriptionTier.EMPIRE_PRO) return true;
    
    setPendingMode(appMode);
    setShowPaywall(true);
    return false;
  };

  const handleSelectMode = (newMode: AppMode) => {
    if (checkEmpireAccess(newMode)) {
      setMode(newMode);
      setActiveFeature('chat');
    }
  };

  const upgradeTier = (newTier: SubscriptionTier) => {
    setTier(newTier);
    setShowPaywall(false);
    notify(`Empire Node upgraded to ${newTier.replace('_', ' ')} tier.`, NotificationType.SUCCESS);
    if (pendingMode && newTier === SubscriptionTier.EMPIRE_PRO) {
      setMode(pendingMode);
      setActiveFeature('chat');
      setPendingMode(null);
    }
  };

  const renderContent = () => {
    if (activeFeature === 'dashboard') {
      return <Dashboard onSelect={handleSelectMode} />;
    }

    switch (activeFeature) {
      case 'chat':
        return <ChatView mode={mode} tier={tier} notify={notify} />;
      case 'voice_live':
        return <LiveVoice notify={notify} />;
      case 'image_gen':
      case 'image_edit':
      case 'video_gen':
      case 'analysis':
        return <MediaView feature={activeFeature} tier={tier} notify={notify} />;
      case 'tts':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4">
             <div className="text-4xl">🗣️</div>
             <p className="text-zinc-600 italic text-sm font-medium">Vocalize Module Offline.</p>
             <p className="text-zinc-700 text-[10px] uppercase font-black tracking-widest">Grounding Engine Integration Required</p>
          </div>
        );
      default:
        return <Dashboard onSelect={handleSelectMode} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0E14] overflow-hidden font-sans selection:bg-[#D4AF37]/30">
      {booting && <SplashScreen onComplete={() => setBooting(false)} />}
      
      {!booting && (
        <>
          <Sidebar 
            activeFeature={activeFeature === 'dashboard' ? 'chat' : activeFeature as FeatureType} 
            setActiveFeature={(f) => setActiveFeature(f)}
            mode={mode}
            setMode={handleSelectMode}
            tier={tier}
            onGoHome={() => setActiveFeature('dashboard')}
          />
          
          <main className="flex-grow flex flex-col relative">
            <header className="h-16 border-b border-white/5 bg-[#0A0E14]/80 backdrop-blur-xl flex items-center justify-between px-8 z-10 sticky top-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveFeature('dashboard')}
                  className="px-3 py-1 bg-zinc-900/50 border border-white/5 rounded text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-tighter transition-all hover:bg-zinc-800"
                >
                  Empire Hub
                </button>
                <span className="hidden md:block text-white/10 text-xs">|</span>
                <span className="px-3 py-1 bg-[#1C222D] border border-white/5 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  Grounding: <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> <span className="text-green-500">Active</span>
                </span>
                {activeFeature !== 'dashboard' && (
                  <>
                    <span className="hidden md:block text-white/10 text-xs">|</span>
                    <span className="hidden md:block text-[10px] uppercase font-black tracking-[0.2em] text-[#D4AF37]">{mode.replace('_', ' ')} Expert Node</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-6">
                {tier !== SubscriptionTier.EMPIRE_PRO && (
                  <button 
                    onClick={() => setShowPaywall(true)}
                    className="text-[10px] font-black bg-[#D4AF37] hover:bg-amber-400 text-black px-5 py-2.5 rounded-full transition-all uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-95"
                  >
                    Upgrade Tier
                  </button>
                )}
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-white uppercase leading-none tracking-tighter">Imperial Node</p>
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{tier === SubscriptionTier.FREE ? 'Public Access' : 'Encrypted Link'}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8a6d1d] p-[1px] group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <div className="w-full h-full rounded-xl bg-[#0A0E14] flex items-center justify-center text-[10px] font-black text-[#D4AF37]">
                      GE
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-grow relative overflow-hidden">
              {renderContent()}
            </div>

            {showPaywall && (
              <Paywall 
                onUpgrade={upgradeTier} 
                onClose={() => setShowPaywall(false)} 
              />
            )}

            {notification && (
              <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification(null)} 
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
