import { useState, useEffect } from 'react';

let toastId = 0;

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400',
    warning: 'bg-yellow-500 border-yellow-400'
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  return (
    <div className={`${colors[type]} border-2 rounded-xl px-6 py-4 shadow-2xl animate-fadeIn mb-3 flex items-center justify-between min-w-[300px]`}>
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icons[type]}</span>
        <span className="text-white font-semibold">{message}</span>
      </div>
      <button onClick={onClose} className="text-white hover:text-gray-200 ml-4">
        ✕
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
};

export default Toast;
