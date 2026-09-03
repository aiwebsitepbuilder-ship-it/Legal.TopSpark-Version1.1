import React from 'react';
import { Language } from '../types';
import { 
  Award,
  Eye,
  Clock,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface WhyTopSparkProps {
  language: Language;
}

export const WhyTopSpark: React.FC<WhyTopSparkProps> = ({ language }) => {
  const features = [
    {
      id: 'professional-consultation',
      icon: Award,
      title: 'Professional Consultation',
      titleBn: 'পেশাদার পরামর্শ ও পর্যালোচনা',
      desc: 'All advisory and documentation work is handled by experienced Group of Counselors, tax practitioners, and chartered accountants.',
      descBn: 'সকল আইনি ও কমপ্লায়েন্স কাজ অভিজ্ঞ আইনজীবী, ট্যাক্স প্র্যাকটিশনার ও চার্টার্ড অ্যাকাউন্ট্যান্টদের দ্বারা পরিচালিত হয়।',
    },
    {
      id: 'transparent-pricing',
      icon: Eye,
      title: 'Transparent Process & Pricing',
      titleBn: 'স্বচ্ছ প্রক্রিয়া ও নির্ধারিত ফি',
      desc: 'Clear upfront timelines, detailed service scopes, and zero hidden government or consultancy fees.',
      descBn: 'শুরুতেই স্পষ্ট সময়সীমা, বিস্তারিত সেবার পরিধি এবং কোনো প্রকার লুকায়িত সরকারি বা পরামর্শ ফি নেই।',
    },
    {
      id: 'convenient-booking',
      icon: Clock,
      title: 'Convenient Booking Modes',
      titleBn: 'সুবিধাজনক অ্যাপয়েন্টমেন্ট মাধ্যম',
      desc: 'Schedule remote Google Meet/Zoom video calls, phone consultations, or in-person visits at our Kakrail office.',
      descBn: 'গুগল মিট/জুম ভিডিও কল, সরাসরি ফোন পরামর্শ অথবা আমাদের কাকরাইল অফিসে সরাসরি সাক্ষাতের সুবিধা।',
    },
    {
      id: 'privacy-confidentiality',
      icon: Lock,
      title: 'Privacy & Confidentiality',
      titleBn: 'গোপনীয়তা ও তথ্যের সুরক্ষা',
      desc: 'Strict client privacy controls and encrypted data handling. Sensitive details are discussed in secure sessions.',
      descBn: 'গ্রাহকের তথ্যের শতভাগ গোপনীয়তা এবং সংরক্ষিত সেশনের মাধ্যমে নিরাপদ পরামর্শ প্রদান।',
    },
  ];

  return (
    <section id="why-top-spark" className="py-12 sm:py-16 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Slate/Navy Container Box */}
        <div className="bg-[#0B1222] rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#1C2A44] shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18233C] border border-[#2B3B5C] text-[#A5B4FC] text-xs sm:text-sm font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'bn' ? 'কেন টপ স্পার্ক' : 'Why Top Spark'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-[27px] lg:text-[30px] font-black text-white tracking-tight leading-tight mb-3.5 sm:whitespace-nowrap">
              {language === 'bn' ? 'মানসিক শান্তির জন্য আপনার বিশ্বস্ত আইনি বন্ধু' : 'Your Trusted Legal Friend for Peace of Mind'}
            </h2>

            <p className="text-xs sm:text-[13px] md:text-sm lg:text-[15px] text-slate-300 leading-relaxed font-normal max-w-4xl mx-auto sm:whitespace-nowrap">
              {language === 'bn'
                ? 'আমরা বাংলাদেশের আইনে গভীর অভিজ্ঞতা এবং আধুনিক, গ্রাহক-কেন্দ্রিক ডিজিটাল সুবিধার সমন্বয় ঘটিয়েছি।'
                : 'We combine deep domain expertise in Bangladesh law with modern, client-first digital convenience.'}
            </p>
          </div>

          {/* 4 Feature Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {features.map((item) => {
              const Icon = item.icon;
              const title = language === 'bn' ? item.titleBn : item.title;
              const desc = language === 'bn' ? item.descBn : item.desc;

              return (
                <div
                  key={item.id}
                  id={`why-feature-${item.id}`}
                  className="flex flex-col items-start"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#141F38] border border-[#24355A] flex items-center justify-center text-[#818CF8] mb-4 shadow-sm">
                    <Icon className="w-5 h-5 text-[#818CF8]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

