
import React, { useEffect, useState } from 'react';

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING'
}

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    [NotificationType.SUCCESS]: 'border-green-500/50 bg-green-500/10 text-green-400',
    [NotificationType.ERROR]: 'border-red-500/50 bg-red-500/10 text-red-400',
    [NotificationType.INFO]: 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]',
    [NotificationType.WARNING]: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  };

  const icons = {
    [NotificationType.SUCCESS]: '✓',
    [NotificationType.ERROR]: '✕',
    [NotificationType.INFO]: '🏛️',
    [NotificationType.WARNING]: '⚠️',
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[200] max-w-sm transition-all duration-300 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className={`p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex gap-4 items-start ${colors[type]}`}>
        <div className="text-lg leading-none">{icons[type]}</div>
        <div className="flex-grow">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">System Notification</p>
          <p className="text-xs font-bold leading-relaxed">{message}</p>
        </div>
        <button onClick={() => setVisible(false)} className="opacity-40 hover:opacity-100 transition-opacity">✕</button>
      </div>
    </div>
  );
};

export default Notification;
