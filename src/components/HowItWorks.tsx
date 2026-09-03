import React from 'react';
import { Language } from '../types';
import { 
  HelpCircle, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  language: Language;
  onOpenAiModal?: () => void;
  onOpenConsultModal?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  language,
  onOpenAiModal,
}) => {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-4">
            <span>{language === 'bn' ? 'সহজ প্রক্রিয়া' : 'Simple 3-Step Process'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight mb-3">
            {language === 'bn' ? 'আমাদের কনসালটেন্সি যেভাবে কাজ করে' : 'How Our Consultancy Works'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {language === 'bn' 
              ? 'প্রাথমিক অনুসন্ধান থেকে শুরু করে চূড়ান্ত সমাধান পর্যন্ত আমরা স্পষ্ট, স্বচ্ছ ও কার্যকর সেবা নিশ্চিত করি।'
              : 'From initial inquiry to final legal resolution, we ensure clear, transparent, and efficient delivery.'}
          </p>
        </div>

        {/* 2-Step Process Cards (Without Consult Box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
          
          {/* Card 01: Ask */}
          <div 
            id="how-it-works-step-1"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Icon & Step Number */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-2xs">
                  <HelpCircle className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#CBD5E1]">
                  01
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {language === 'bn' ? 'জিজ্ঞাসা করুন' : 'Ask'}
              </h3>

              {/* Uppercase Blue Subtitle */}
              <h4 className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-3 leading-snug">
                {language === 'bn' 
                  ? 'আমাদের এআই অ্যাসিস্ট্যান্টের মাধ্যমে আপনার সাধারণ প্রশ্ন করুন।'
                  : 'ASK YOUR GENERAL QUESTION THROUGH OUR AI ASSISTANT.'}
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-8">
                {language === 'bn'
                  ? 'কর সংক্রান্ত নিয়ম, ই-টিন প্রয়োজনীয়তা, ভ্যাট নিবন্ধন পদ্ধতি, আরজেএসসি কোম্পানি গঠন সময়সীমা বা চুক্তির শর্তাবলী সম্পর্কে তাৎক্ষণিক স্পষ্টতা পান।'
                  : 'Get immediate clarity on taxation rules, e-TIN requirements, VAT registration procedures, RJSC company formation timelines, or contract terms.'}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <button
                id="how-it-works-ask-ai-btn"
                onClick={() => onOpenAiModal?.()}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-[#4F46E5]/40 text-xs sm:text-sm font-semibold text-[#4F46E5] bg-white hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group/btn"
              >
                <span>{language === 'bn' ? 'Ask AI Assistant' : 'Ask AI Assistant'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 02: Understand */}
          <div 
            id="how-it-works-step-2"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Icon & Step Number */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-2xs">
                  <BookOpen className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#CBD5E1]">
                  02
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {language === 'bn' ? 'জানুন ও বুঝুন' : 'Understand'}
              </h3>

              {/* Uppercase Blue Subtitle */}
              <h4 className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-3 leading-snug">
                {language === 'bn'
                  ? 'সাধারণ প্রক্রিয়া সম্পর্কে জানুন এবং সঠিক সেবা চিহ্নিত করুন।'
                  : 'LEARN ABOUT THE GENERAL PROCESS AND IDENTIFY THE SERVICE.'}
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-8">
                {language === 'bn'
                  ? 'আমাদের প্ল্যাটফর্ম আপনার উদ্দেশ্য বিশ্লেষণ করে অনুমোদিত নলেজ বেজ ডকুমেন্ট রেফারেন্স করে এবং আপনার প্রয়োজনীয় সুনির্দিষ্ট আইনি বা কর্পোরেট সেবা বিভাগটি সুপারিশ করে।'
                  : 'Our platform classifies your intent, references approved knowledge base documents, and recommends the exact legal or corporate service category you need.'}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <button
                id="how-it-works-explore-services-btn"
                onClick={scrollToServices}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-[#4F46E5]/40 text-xs sm:text-sm font-semibold text-[#4F46E5] bg-white hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group/btn"
              >
                <span>{language === 'bn' ? 'Explore Services' : 'Explore Services'}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
