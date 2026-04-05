
import React, { useState } from 'react';
import { generateImagePro, generateVideoVeo, editImageNano, analyzeMedia } from '../services/geminiService';
import { SubscriptionTier, FeatureType } from '../types';
import { NotificationType } from './Notification';

interface MediaViewProps {
  feature: FeatureType;
  tier: SubscriptionTier;
  notify: (msg: string, type?: NotificationType) => void;
}

const MediaView: React.FC<MediaViewProps> = ({ feature, tier, notify }) => {
  const [prompt, setPrompt] = useState('');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<any>('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const checkKeyBeforeAction = async () => {
    if (feature === 'video_gen' || imageSize === '4K') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        if (window.aistudio?.openSelectKey) {
          notify("High-compute node requested. Syncing billing key...", NotificationType.INFO);
          await window.aistudio.openSelectKey();
          return true;
        }
      }
    }
    return true;
  };

  const handleAction = async () => {
    if (!prompt && feature !== 'analysis') return;
    
    await checkKeyBeforeAction();
    
    setLoading(true);
    setAnalysis(null);
    try {
      let url = "";
      let base64 = "";

      if (file) {
        const reader = new FileReader();
        base64 = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
      }

      switch (feature) {
        case 'image_gen':
          url = await generateImagePro(prompt, aspectRatio, imageSize);
          setResultUrl(url);
          notify("Asset forged successfully.", NotificationType.SUCCESS);
          break;
        case 'video_gen':
          notify("Video rendering initiated. This may take a few minutes.", NotificationType.INFO);
          url = await generateVideoVeo(prompt, aspectRatio, base64);
          setResultUrl(url);
          notify("Cinematic asset ready.", NotificationType.SUCCESS);
          break;
        case 'image_edit':
          if (!base64) {
            notify("Empire requires a base asset for Magic Edit.", NotificationType.WARNING);
            setLoading(false);
            return;
          }
          url = await editImageNano(prompt, base64, file?.type || 'image/png');
          setResultUrl(url);
          notify("Asset modified.", NotificationType.SUCCESS);
          break;
        case 'analysis':
          if (!base64) {
            notify("Vision Lab requires a source file.", NotificationType.WARNING);
            setLoading(false);
            return;
          }
          const text = await analyzeMedia(prompt || "Perform deep vision grounding.", base64, file?.type || 'image/png');
          setAnalysis(text);
          notify("Intelligence report generated.", NotificationType.SUCCESS);
          break;
      }
    } catch (error: any) {
      console.error(error);
      const errorStr = JSON.stringify(error).toLowerCase();
      if (errorStr.includes('429') || errorStr.includes('resource_exhausted')) {
        notify("Public Node Saturated. Use private bridge to continue.", NotificationType.ERROR);
      } else {
        notify(`Transmission Error: ${error.message}`, NotificationType.ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 bg-[#0A0E14] overflow-y-auto relative custom-scrollbar">
       <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="bg-[#1C222D] border border-white/5 p-6 rounded-3xl shadow-2xl crooked-card">
            <h3 className="text-lg font-black mb-4 text-[#D4AF37] uppercase tracking-tighter flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              {feature.replace('_', ' ')}
            </h3>
            
            {(feature === 'image_edit' || feature === 'analysis' || feature === 'video_gen') && (
              <div className="mb-6">
                <label className="text-[10px] font-black text-zinc-500 uppercase block mb-2 tracking-[0.2em]">Asset Input</label>
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-[10px] text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-zinc-800 file:text-zinc-300 hover:file:bg-[#D4AF37] hover:file:text-black transition-all cursor-pointer"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="text-[10px] font-black text-zinc-500 uppercase block mb-2 tracking-[0.2em]">Instruction Node</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the desired output..."
                className="w-full bg-[#0A0E14] border border-white/5 rounded-2xl px-4 py-3 text-sm h-32 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 text-white placeholder:text-zinc-700"
              />
            </div>

            {(feature === 'image_gen' || feature === 'video_gen') && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase block mb-1 tracking-[0.2em]">Geometry</label>
                  <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-white/5 rounded-xl p-2 text-[10px] font-bold text-zinc-300 focus:outline-none"
                  >
                    <option value="1:1">1:1 Square</option>
                    <option value="16:9">16:9 Cinema</option>
                    <option value="9:16">9:16 Portrait</option>
                  </select>
                </div>
                {feature === 'image_gen' && (
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase block mb-1 tracking-[0.2em]">Fidelity</label>
                    <select 
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                      className="w-full bg-[#0A0E14] border border-white/5 rounded-xl p-2 text-[10px] font-bold text-zinc-300 focus:outline-none"
                    >
                      <option value="1K">1K Core</option>
                      <option value="2K">2K High</option>
                      <option value="4K">4K Empire</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleAction}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#b8952b] hover:from-amber-400 hover:to-[#D4AF37] disabled:from-zinc-800 disabled:to-zinc-900 py-4 rounded-2xl font-black text-[10px] text-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : 'Execute Task'}
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-6">
          <div className="bg-[#1C222D] border border-white/5 rounded-3xl h-[600px] flex items-center justify-center relative overflow-hidden group shadow-2xl">
            {!resultUrl && !analysis && !loading && (
              <div className="text-zinc-800 text-center flex flex-col items-center">
                <div className="text-[120px] font-black opacity-[0.03] leading-none mb-4 select-none uppercase">Empire</div>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-30">Grounding Output Stage</p>
              </div>
            )}
            
            {loading && (
              <div className="flex flex-col items-center gap-6">
                 <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#D4AF37] animate-spin shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
                </div>
                <div className="text-center">
                  <p className="text-[#D4AF37] font-black uppercase tracking-[0.2em] text-xs animate-pulse">Syncing Distributed Node...</p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Grounding verified intelligence</p>
                </div>
              </div>
            )}

            {resultUrl && !loading && (
              feature === 'video_gen' ? (
                <video src={resultUrl} controls autoPlay loop className="max-h-full max-w-full rounded-2xl shadow-inner border border-white/5" />
              ) : (
                <img src={resultUrl} alt="Forge Output" className="max-h-full max-w-full object-contain rounded-2xl shadow-inner border border-white/5" />
              )
            )}

            {analysis && !loading && (
              <div className="p-12 w-full h-full overflow-y-auto bg-[#0A0E14]/80 backdrop-blur-xl animate-in fade-in zoom-in duration-500 custom-scrollbar">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[#D4AF37] text-xl">👁️</span>
                  <h4 className="text-[#D4AF37] font-black uppercase text-xs tracking-[0.2em] border-b border-[#D4AF37]/20 pb-2 flex-grow">Deep Vision Intelligence Report</h4>
                </div>
                <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base selection:bg-[#D4AF37]/20">{analysis}</div>
              </div>
            )}

            {resultUrl && (
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = resultUrl;
                  link.download = `Empire_Asset_${Date.now()}.png`;
                  link.click();
                }}
                className="absolute top-6 right-6 bg-[#D4AF37] hover:bg-amber-400 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-2xl active:scale-95"
              >
                💾 Secure Asset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaView;
