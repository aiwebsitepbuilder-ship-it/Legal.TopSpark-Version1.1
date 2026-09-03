import React, { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Language } from '../types';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({
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
      id="legal-disclaimer-modal-backdrop"
    >
      <div 
        className="bg-white w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 relative transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="legal-disclaimer-modal-container"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3" id="professional-legal-disclaimer-badge">
            <ShieldCheck 
              className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#4F46E5] shrink-0" 
              strokeWidth={2.25} 
            />
            <h2 className="text-xl sm:text-[22px] font-bold sm:font-extrabold text-[#0B0F19] tracking-tight leading-tight">
              Professional Legal Disclaimer
            </h2>
          </div>

          <button
            id="legal-disclaimer-modal-close-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-slate-600 text-sm leading-relaxed space-y-4 mb-8">
          <p className="font-bold text-slate-900 text-sm sm:text-base">
            Professional Legal Disclaimer
          </p>

          <p>
            Information made available on{' '}
            <span className="font-mono text-slate-800">legal.topsparkdigital.com</span>{' '}
            is presented for general informational purposes. While we strive to maintain accurate, up-to-date commentary reflecting NBR, RJSC, and Bangladeshi statutory provisions, legal and tax regulations are subject to official amendment and administrative interpretation.
          </p>

          <p>
            Formal legal representation and official tax filings are executed only upon entering a formal engagement agreement with Top Spark Legal & Business Consultancy professionals.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            id="legal-disclaimer-agree-btn"
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
