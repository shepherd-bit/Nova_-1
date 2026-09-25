import React from 'react';
import { ToastItem } from '../types';

interface ToastContainerProps {
  toasts: ToastItem[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none w-max max-w-[90vw] px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#111] text-white text-[12px] sm:text-[13px] font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/10 animate-[slideUp_0.3s_ease] text-center"
        >
          {toast.msg}
        </div>
      ))}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
