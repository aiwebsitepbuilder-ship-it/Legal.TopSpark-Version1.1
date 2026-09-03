import React, { useEffect } from 'react';
import { ShieldCheck, AlertTriangle, X } from 'lucide-react';
import { Language } from '../types';

interface AiDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AiDisclaimerModal: React.FC<AiDisclaimerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="ai-disclaimer-modal-backdrop"
    >
      <div 
        className="bg-white w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 relative transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="ai-disclaimer-modal-container"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#4F46E5] shrink-0" strokeWidth={2.25} />
            <h2 className="text-xl sm:text-[22px] font-bold sm:font-extrabold text-[#0B0F19] tracking-tight leading-tight">
              AI Assistant Safety Disclaimer
            </h2>
          </div>

          <button
            id="ai-disclaimer-modal-close-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 mb-6">
          {/* Blue-Indigo Educational Callout Box */}
          <div className="p-5 rounded-2xl bg-[#EEF2FF] border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#4F46E5] shrink-0" />
              <h3 className="font-bold text-[#4338CA] text-sm sm:text-base">
                AI Assistant Educational Disclaimer
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              The Top Spark AI Legal Assistant uses artificial intelligence to offer general educational commentary regarding Bangladesh corporate and tax frameworks.
            </p>
          </div>

          {/* Bullet List */}
          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed px-1">
            <li className="flex items-start gap-2.5">
              <span className="text-slate-500 mt-0.5 select-none font-bold">•</span>
              <span>The AI does NOT act as an advocate, lawyer, or certified tax practitioner.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-slate-500 mt-0.5 select-none font-bold">•</span>
              <span>AI output does NOT constitute definitive personalized legal advice.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-slate-500 mt-0.5 select-none font-bold">•</span>
              <span>AI conversations do NOT establish an attorney-client privilege.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-slate-500 mt-0.5 select-none font-bold">•</span>
              <span>For high-risk litigation, criminal matters, or active court disputes, users must consult a qualified advocate directly.</span>
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            id="ai-disclaimer-agree-btn"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] active:scale-95 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
