import React from 'react';
import { Language } from '../types';
import { 
  User, 
  Rocket, 
  Store, 
  Landmark, 
  CheckCircle2
} from 'lucide-react';

interface WhoWeSupportProps {
  language: Language;
  onOpenConsultModal?: () => void;
}

interface ClientSpectrumItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  features: string[];
  featuresBn: string[];
}

const spectrumData: ClientSpectrumItem[] = [
  {
    id: 'individuals',
    icon: User,
    title: 'Individuals',
    titleBn: 'ব্যক্তিগত গ্রাহক',
    subtitle: 'Personal Tax & Legal Advisory',
    subtitleBn: 'ব্যক্তিগত আয়কর ও আইনি পরামর্শ',
    features: [
      'TIN Registration',
      'Personal Tax Filing',
      'Tax Return Calculation',
      'General Legal Consultation',
    ],
    featuresBn: [
      'ই-টিন নিবন্ধন',
      'ব্যক্তিগত ট্যাক্স ফাইলিং',
      'ট্যাক্স রিটার্ন হিসাব',
      'সাধারণ আইনি পরামর্শ',
    ],
  },
  {
    id: 'entrepreneurs',
    icon: Rocket,
    title: 'Entrepreneurs',
    titleBn: 'উদ্যোক্তা',
    subtitle: 'Startup Formation & Licensing',
    subtitleBn: 'স্টার্টআপ গঠন ও লাইসেন্সিং',
    features: [
      'Company Formation',
      'RJSC Registration',
      'e-TIN & BIN Issuance',
      'Trade License',
      'Business Legal Support',
    ],
    featuresBn: [
      'কোম্পানি গঠন',
      'আরজেএসসি নিবন্ধন',
      'ই-টিন ও বিন গ্রহণ',
      'ট্রেড লাইসেন্স প্রসেসিং',
      'ব্যবসার আইনি সহায়তা',
    ],
  },
  {
    id: 'smes',
    icon: Store,
    title: 'SMEs',
    titleBn: 'এসএমই ও মাঝারি ব্যবসা',
    subtitle: 'Growth & Operational Compliance',
    subtitleBn: 'গ্রোথ ও অপারেশনাল কমপ্লায়েন্স',
    features: [
      'Corporate Compliance',
      'Commercial Contracts',
      'VAT Filings',
      'Tax Advisory',
      'Legal Documentation',
    ],
    featuresBn: [
      'কর্পোরেট কমপ্লায়েন্স',
      'বাণিজ্যিক চুক্তি ড্রাফটিং',
      'মাসিক ভ্যাট রিটার্ন ফাইলিং',
      'কর সংক্রান্ত পরামর্শ',
      'আইনি ডকুমেন্টেশন',
    ],
  },
  {
    id: 'companies',
    icon: Landmark,
    title: 'Companies',
    titleBn: 'কর্পোরেট প্রতিষ্ঠান',
    subtitle: 'Enterprise Legal & Retainer',
    subtitleBn: 'এন্টারপ্রাইজ লিগ্যাল ও রিটেইনার',
    features: [
      'Ongoing Compliance',
      'Corporate Legal Support',
      'Contract Review',
      'Tax & VAT Audits',
      'Shareholders Agreements',
    ],
    featuresBn: [
      'ধারাবাহিক কমপ্লায়েন্স',
      'কর্পোরেট আইনি সেবা',
      'চুক্তিপত্র পর্যালোচনা',
      'ট্যাক্স ও ভ্যাট অডিট',
      'শেয়ারহোল্ডার চুক্তি',
    ],
  },
];

export const WhoWeSupport: React.FC<WhoWeSupportProps> = ({
  language,
}) => {
  return (
    <section id="who-we-support" className="py-16 sm:py-20 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-4">
            <span>{language === 'bn' ? 'ক্লায়েন্ট স্পেকট্রাম' : 'Client Spectrum'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight mb-3">
            {language === 'bn' ? 'যাদের আমরা সেবা দিই' : 'Who We Support'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {language === 'bn' 
              ? 'আপনার ব্যক্তিগত বা ব্যবসায়িক যাত্রার প্রতিটি ধাপে প্রয়োজন অনুসারে আইনি, কর ও কমপ্লায়েন্স সেবা প্রদান।'
              : 'Delivering tailored legal, tax, and compliance support for every stage of your personal or business journey.'}
          </p>
        </div>

        {/* 4 Spectrum Cards in a Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spectrumData.map((item) => {
            const Icon = item.icon;
            const title = language === 'bn' ? item.titleBn : item.title;
            const subtitle = language === 'bn' ? item.subtitleBn : item.subtitle;
            const features = language === 'bn' ? item.featuresBn : item.features;

            return (
              <div
                key={item.id}
                id={`who-we-support-${item.id}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-start"
              >
                {/* Top Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-6 h-6 text-[#4F46E5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1">
                  {title}
                </h3>

                {/* Subtitle in Indigo */}
                <p className="text-xs sm:text-sm font-bold text-[#4F46E5] mb-5">
                  {subtitle}
                </p>

                {/* Checklist with Green Checkmarks */}
                <ul className="space-y-3">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

