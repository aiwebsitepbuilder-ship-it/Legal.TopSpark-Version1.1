import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, ArrowRight, ShieldCheck, Scale, PhoneCall } from 'lucide-react';

interface FinalCtaProps {
  language: Language;
  onOpenAiModal: () => void;
  onScrollToServices: () => void;
  onOpenConsultModal: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  language,
  onOpenAiModal,
  onScrollToServices,
  onOpenConsultModal,
}) => {
  const t = translations[language];

  return (
    <section id="final-cta" className="relative py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top small badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 mb-5">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'bn' ? 'টপ স্পার্ক লিগ্যাল ও কর্পোরেট ডেস্ক' : 'Top Spark Legal & Corporate Desk'}</span>
        </div>

        {/* Exact Required Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          {t.finalCta.heading}
        </h2>

        {/* Exact Required Paragraph */}
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          {t.finalCta.paragraph}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          {/* Button 1: Ask AI Assistant */}
          <button
            id="final-cta-ask-ai-btn"
            onClick={onOpenAiModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-950 bg-white hover:bg-slate-100 shadow-2xs transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#4F46E5] group-hover:rotate-12 transition-transform" />
            <span>{t.finalCta.ctaAskAi}</span>
          </button>

          {/* Button 2: Explore Our Services */}
          <button
            id="final-cta-explore-services-btn"
            onClick={onScrollToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer group"
          >
            <span>{t.finalCta.ctaExplore}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bottom micro trust line */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {language === 'bn' ? 'শতভাগ গোপনীয়তা ও আইনি সুরক্ষা' : 'Strict Confidentiality & Legal Compliance'}
          </span>
          <span className="text-slate-600">•</span>
          <button 
            onClick={onOpenConsultModal}
            className="underline hover:text-white font-semibold cursor-pointer"
          >
            {language === 'bn' ? 'সরাসরি কনসালট্যান্টের সাথে কথা বলুন' : 'Speak with Senior Counsel'}
          </button>
        </div>

      </div>
    </section>
  );
};
