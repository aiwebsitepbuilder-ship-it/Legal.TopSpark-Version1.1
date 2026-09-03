import React, { useState } from 'react';
import { Language } from '../types';
import { translations, servicesData } from '../data/translations';
import { X, CheckCircle2, Send, PhoneCall, Building2, User, Mail, FileText } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  initialServiceId?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  language,
  onClose,
  initialServiceId,
}) => {
  const t = translations[language];
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('personal-income-tax');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
    }
  }, [initialServiceId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission to backend / CRM
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setDetails('');
    onClose();
  };

  return (
    <div 
      id="consultation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white relative border-b border-slate-800">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shadow-2xs">
              <PhoneCall className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t.consultModal.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.consultModal.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {t.consultModal.successTitle}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.consultModal.successMsg}
              </p>
              <button
                onClick={handleResetAndClose}
                className="mt-3 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors cursor-pointer shadow-2xs"
              >
                {t.consultModal.closeBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {t.consultModal.fullName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.consultModal.fullNamePlh}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-sm outline-none transition-all text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t.consultModal.phone} *
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.consultModal.phonePlh}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-sm outline-none transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t.consultModal.email}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.consultModal.emailPlh}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-sm outline-none transition-all text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {t.consultModal.serviceSelect} *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-sm outline-none transition-all text-slate-900"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {language === 'bn' ? svc.titleBn : svc.title}
                    </option>
                  ))}
                  <option value="other">
                    {language === 'bn' ? 'অন্যান্য / সাধারণ কর্পোরেট আইনি পরামর্শ' : 'Other / General Corporate Advisory'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {t.consultModal.details} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={t.consultModal.detailsPlh}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-sm outline-none transition-all resize-none text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>{isSubmitting ? t.consultModal.submitting : t.consultModal.submitBtn}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
