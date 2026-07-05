'use client';

/**
 * Lightweight toast notification system (success / error / info / warning).
 * No external dependency — implemented with context + Framer Motion for the
 * enter/exit animation, so it works the moment Firebase/network calls resolve.
 */
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ToastContextValue {
  showToast: (type: ToastMessage['type'], message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const STYLES = {
  success: 'border-success/20 text-success',
  error: 'border-danger/20 text-danger',
  info: 'border-primary/20 text-primary',
  warning: 'border-warning/20 text-warning',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={cn(
                  'flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-elevated min-w-[260px] max-w-sm',
                  STYLES[toast.type]
                )}
              >
                <Icon size={20} className="shrink-0" />
                <p className="text-sm font-medium text-ink flex-1">{toast.message}</p>
                <button onClick={() => dismiss(toast.id)} aria-label="Dismiss notification">
                  <X size={16} className="text-ink-muted hover:text-ink" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
