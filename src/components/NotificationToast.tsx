import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const NotificationToast: React.FC = () => {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-[#231F20] text-white border-white/20';
        let icon = <Info size={16} className="text-blue-400 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-[#174D7A] text-white border-[#F06423]';
          icon = <CheckCircle2 size={16} className="text-[#F06423] shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-600 text-white border-amber-400';
          icon = <AlertTriangle size={16} className="text-white shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-red-600 text-white border-red-400';
          icon = <XCircle size={16} className="text-white shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold animate-fade-in ${bg}`}
          >
            {icon}
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
