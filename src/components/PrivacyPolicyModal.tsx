import React, { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
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
      id="privacy-policy-modal-backdrop"
    >
      <div 
        className="bg-white w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 relative transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="privacy-policy-modal-container"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#4F46E5] shrink-0" strokeWidth={2.25} />
            <h2 className="text-xl sm:text-[22px] font-bold sm:font-extrabold text-[#0B0F19] tracking-tight leading-tight">
              Privacy Policy
            </h2>
          </div>

          <button
            id="privacy-modal-close-btn"
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
            Privacy Policy — Top Spark Legal & Business Consultancy
          </p>

          <p>
            Top Spark Legal values your privacy and is committed to protecting your personal data. We collect minimum necessary contact details (Name, Email, Phone, WhatsApp, Service Request) solely for the purpose of processing your consultation requests and communicating regarding legal and corporate services in Bangladesh.
          </p>

          <p>
            <strong className="font-bold text-slate-900">Data Minimization & Confidentiality:</strong>{' '}
            Users are advised not to upload or submit unencrypted, highly confidential legal documents through general web forms. Confidential records are handled exclusively through secure direct channels during formal engagement.
          </p>

          <p>
            <strong className="font-bold text-slate-900">Data Retention & Rights:</strong>{' '}
            You may request the deletion or correction of your personal lead record at any time by contacting{' '}
            <a 
              href="mailto:legal@topsparkdigital.com" 
              className="text-slate-800 hover:text-[#4F46E5] underline-offset-2 hover:underline font-mono"
            >
              legal@topsparkdigital.com
            </a>.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end">
          <button
            id="privacy-agree-btn"
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
