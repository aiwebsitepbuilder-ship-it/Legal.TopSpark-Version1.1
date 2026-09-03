import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  Scale
} from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenAiModal: () => void;
  onScrollToServices: () => void;
  onOpenConsultModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenAiModal,
  onScrollToServices: _onScrollToServices,
  onOpenConsultModal,
}) => {
  const t = translations[language];

  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-white border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs matching image */}
          <div className="lg:col-span-7 text-left">
            
            {/* Top Badge: Top Spark Business & Legal Consultancy */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              <span>
                {language === 'bn' 
                  ? 'টপ স্পার্ক বিজনেস ও লিগ্যাল কনসালট্যান্সি' 
                  : 'Top Spark Business & Legal Consultancy'}
              </span>
            </div>

            {/* Exact Required Main H1 from image */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              {language === 'bn' ? (
                <>
                  ব্যবসা, আয়কর ও <br className="hidden sm:inline" />
                  আইনি বিষয় — <span className="text-[#4F46E5] italic font-serif font-bold">সহজ ও</span><br />
                  <span className="text-[#4F46E5] italic font-serif font-bold">নির্ভুল</span>
                </>
              ) : (
                <>
                  Business, Income Tax &<br className="hidden sm:inline" />{' '}
                  Legal Facts — <span className="text-[#4F46E5] italic font-serif font-bold">Made</span><br />
                  <span className="text-[#4F46E5] italic font-serif font-bold">Simple</span>
                </>
              )}
            </h1>

            {/* Exact Required Hero Paragraph from image */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-8">
              {t.hero.paragraph}
            </p>

            {/* Hero CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              {/* Ask Our AI Legal Assistant */}
              <button
                id="hero-cta-ask-ai"
                onClick={onOpenAiModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-md shadow-indigo-500/20 transition-all cursor-pointer group"
              >
                <Sparkles className="w-4.5 h-4.5 text-amber-300" />
                <span>{language === 'bn' ? 'এআই আইনি সহায়ককে প্রশ্ন করুন' : 'Ask Our AI Legal Assistant'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Sub-line under buttons from image */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {language === 'bn' 
                  ? 'অনলাইন ও নির্ধারিত সাক্ষাতে পেশাদার আইনি পরামর্শ সেবা।' 
                  : 'Professional consultation available online and by appointment.'}
              </span>
            </div>

          </div>

          {/* Right Column: Consultation Flow Card from image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md w-full lg:ml-auto">
              
              <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-md">
                
                {/* Header of Flow Card */}
                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {language === 'bn' ? 'পরামর্শ প্রক্রিয়া' : 'Consultation Flow'}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      {language === 'bn' 
                        ? 'ভিজিটর → এআই বিশ্লেষণ → পেশাদার পরামর্শ' 
                        : 'Visitor → AI Qualification → Professional Consultation'}
                    </p>
                  </div>
                </div>

                {/* 3 Step Flow List from image */}
                <div className="space-y-4 py-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'bn' ? 'আপনার প্রয়োজন নির্ধারণ' : 'Understand Your Need'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                        {language === 'bn' 
                          ? 'আমাদের এআই সহায়ককে প্রশ্ন করুন অথবা ট্যাক্স, ই-টিন, ভ্যাট, আরজেএসসি সেবা জানুন।' 
                          : 'Ask our AI Assistant or explore Taxation, e-TIN, VAT, RJSC formation services.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'bn' ? 'পছন্দের মাধ্যমে অ্যাপয়েন্টমেন্ট' : 'Book Your Preferred Mode'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                        {language === 'bn'
                          ? 'সরাসরি অফিসে অথবা ফোনে পরামর্শের জন্য ক্যালেন্ডারে সময় বুক করুন।'
                          : 'Schedule an In-Person or Phone consultation with calendar confirmation.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {language === 'bn' ? 'বিশেষজ্ঞের সরাসরি তত্ত্বাবধান' : 'Legal Specialist Handles Matter'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                        {language === 'bn'
                          ? 'অভিজ্ঞ অ্যাডভোকেট ও ট্যাক্স বিশেষজ্ঞ আপনার নথিপত্র প্রস্তুত ও সম্পাদন করবেন।'
                          : 'Senior advocates and tax specialists prepare, review and execute documentation.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer / Help Prompt */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {language === 'bn' ? 'তাৎক্ষণিক তথ্যের সহায়তা চান?' : 'Need immediate general help?'}
                  </span>
                  <button
                    onClick={onOpenAiModal}
                    className="text-[#4F46E5] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{language === 'bn' ? 'এআই প্রশ্ন করুন →' : 'Ask AI Now →'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

