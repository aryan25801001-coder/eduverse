/**
 * Toast notification context and component.
 * Provides global toast state management with auto-dismiss.
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

// Toast types
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'success': return 'border-emerald-500/30';
      case 'error': return 'border-rose-500/30';
      case 'warning': return 'border-amber-500/30';
      case 'info': return 'border-blue-500/30';
    }
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/5';
      case 'error': return 'bg-rose-500/5';
      case 'warning': return 'bg-amber-500/5';
      case 'info': return 'bg-blue-500/5';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed top right */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl border ${getBorderColor(toast.type)} ${getBgColor(toast.type)} backdrop-blur-xl bg-[#0a0620]/90 shadow-2xl shadow-black/40 min-w-[320px] max-w-[420px] animate-slide-in`}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 p-1 text-slate-500 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
