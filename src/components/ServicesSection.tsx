import React, { useState } from 'react';
import { ServiceItem, Language } from '../types';
import { servicesData, translations } from '../data/translations';
import { ServiceModal } from './ServiceModal';
import { 
  Banknote,
  Landmark,
  Receipt,
  Building2,
  ShieldCheck,
  Scale,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  language: Language;
  onOpenAiWithPrompt: (prompt: string) => void;
  onOpenConsultModal: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onOpenAiWithPrompt,
  onOpenConsultModal,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const t = translations[language];

  const getServiceIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#4F46E5] group-hover:text-white transition-colors duration-200";
    switch (name) {
      case 'Banknote':
        return <Banknote className={iconClass} />;
      case 'Landmark':
        return <Landmark className={iconClass} />;
      case 'Receipt':
        return <Receipt className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Scale':
        return <Scale className={iconClass} />;
      default:
        return <Building2 className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F8FAFC]/70 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl lg:max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-4 tracking-wide shadow-2xs">
            <span>{t.services.sectionBadge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3.5 sm:whitespace-nowrap">
            {t.services.title}
          </h2>

          <p className="text-sm sm:text-base lg:text-[16.5px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.services.intro}
          </p>
        </div>

        {/* 6 Services Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const title = language === 'bn' ? service.titleBn : service.title;
            const desc = language === 'bn' ? service.shortDescBn : service.shortDesc;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-[#6366F1] shadow-2xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] group-hover:bg-[#4F46E5] border border-[#E0E7FF] flex items-center justify-center transition-colors duration-200 shadow-2xs mb-6">
                    {getServiceIcon(service.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors mb-3 tracking-tight leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Bottom Row Actions */}
                <div className="pt-4 border-t border-slate-100/90 flex items-center justify-end mt-auto">
                  <button
                    id={`view-details-${service.id}`}
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#3730A3] transition-colors cursor-pointer group/link"
                  >
                    <span>{t.services.viewDetails || (language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        language={language}
        onClose={() => setSelectedService(null)}
        onOpenAiWithPrompt={onOpenAiWithPrompt}
        onOpenConsultModal={(svcId) => onOpenConsultModal(svcId || selectedService?.id)}
      />
    </section>
  );
};
