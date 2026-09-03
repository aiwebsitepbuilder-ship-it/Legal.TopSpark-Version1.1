import React from 'react';
import { ServiceItem, Language } from '../types';
import { 
  X, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Banknote,
  Landmark,
  Receipt,
  Scale
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  language: Language;
  onClose: () => void;
  onOpenAiWithPrompt?: (prompt: string) => void;
  onOpenConsultModal?: (serviceId?: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  language,
  onClose,
}) => {
  if (!service) return null;

  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-[#4F46E5]" };
    switch (name) {
      case 'Banknote': return <Banknote {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'Receipt': return <Receipt {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Scale': return <Scale {...props} />;
      default: return <Building2 {...props} />;
    }
  };

  const title = language === 'bn' ? (service.titleBn || service.title) : service.title;
  const category = language === 'bn' ? (service.fullDetails.categoryBn || service.fullDetails.category || service.badge) : (service.fullDetails.category || service.badge || service.title);
  const overview = language === 'bn' ? (service.fullDetails.overviewBn || service.fullDetails.overview) : service.fullDetails.overview;
  const deliverables = language === 'bn' ? (service.fullDetails.deliverablesBn || service.fullDetails.deliverables || service.subItems) : (service.fullDetails.deliverables || service.subItems);
  const idealFor = language === 'bn' ? (service.fullDetails.idealForBn || service.fullDetails.idealFor) : service.fullDetails.idealFor;

  return (
    <div 
      id="service-details-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[560px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center shadow-2xs shrink-0">
              {renderIcon(service.iconName)}
            </div>
            <div>
              <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-0.5">
                {category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          <button
            id="close-service-modal-btn"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-5">
          
          {/* Overview Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {overview}
          </p>

          {/* Key Service Deliverables */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-3">
              {language === 'bn' ? 'মূল সেবাসমূহ (ডেলিভারেবলস)' : 'KEY SERVICE DELIVERABLES'}
            </h4>
            <ul className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For Box */}
          {idealFor && (
            <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200/80">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                {language === 'bn' ? 'যাদের জন্য প্রযোজ্য' : 'IDEAL FOR'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {idealFor}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-3 flex items-center justify-end border-t border-slate-100">
          <button
            id="modal-close-action-btn"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

