import React, { useState } from 'react';
import { Language } from '../types';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles
} from 'lucide-react';

interface FaqSectionProps {
  language: Language;
  onOpenAiModal: (initialPrompt?: string) => void;
}

interface FaqItem {
  id: string;
  category: 'Tax & TIN' | 'VAT & BIN' | 'Company Formation' | 'Legal Docs' | 'General & Process';
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
}

const faqsList: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General & Process',
    question: 'What services do you provide?',
    questionBn: 'আপনারা কী কী সেবা প্রদান করেন?',
    answer: 'Top Spark provides comprehensive legal, tax, and compliance services including personal and corporate income tax filing, e-TIN and BIN registration, RJSC company formation, trade licensing, contract drafting & review, and ongoing business compliance advisory.',
    answerBn: 'টপ স্পার্ক ব্যক্তিগত ও প্রাতিষ্ঠানিক আয়কর ফাইলিং, ই-টিন ও ভ্যাট/বিন নিবন্ধন, আরজেএসসি কোম্পানি গঠন, ট্রেড লাইসেন্স, চুক্তিপত্র প্রণয়ন ও পর্যালোচনা এবং নিয়মিত কর্পোরেট কমপ্লায়েন্স সংক্রান্ত সমন্বিত আইনি সেবা প্রদান করে।',
  },
  {
    id: 'faq-3',
    category: 'General & Process',
    question: 'How does the AI Assistant work?',
    questionBn: 'এআই অ্যাসিস্ট্যান্ট কীভাবে কাজ করে?',
    answer: 'Our AI Assistant is trained on verified Bangladesh taxation and regulatory guidelines. It helps you understand legal prerequisites, answers common inquiries, and directs you to the exact service or expert you need.',
    answerBn: 'আমাদের এআই অ্যাসিস্ট্যান্ট বাংলাদেশের আয়কর ও প্রাতিষ্ঠানিক নিয়মের ভিত্তিতে সাধারণ প্রশ্নের দ্রুত উত্তর দিতে এবং আপনার প্রয়োজনীয় নির্দিষ্ট সেবা চিহ্নিত করতে সাহায্য করে।',
  },
  {
    id: 'faq-4',
    category: 'General & Process',
    question: 'Does the AI provide legal advice?',
    questionBn: 'এআই কি আনুষ্ঠানিক আইনি পরামর্শ প্রদান করে?',
    answer: 'No. The AI Assistant provides general informational and educational guidance only. Formal legal advisory, audit representation, and document submissions are handled by our licensed advocates, tax practitioners, and chartered accountants.',
    answerBn: 'না। এআই অ্যাসিস্ট্যান্ট কেবল সাধারণ তথ্য ও শিক্ষামূলক দিকনির্দেশনা প্রদান করে। আনুষ্ঠানিক আইনি মতামত ও নথি দাখিলের কাজ আমাদের নিবন্ধিত আইনজীবী ও ট্যাক্স প্র্যাকটিশনারদের দ্বারা পরিচালিত হয়।',
  },
  {
    id: 'faq-5',
    category: 'Company Formation',
    question: 'How long does company registration take?',
    questionBn: 'কোম্পানি নিবন্ধনে কতদিন সময় লাগে?',
    answer: 'Private limited company registration with the RJSC typically takes 5 to 7 working days once name clearance is secured and required documentation (MoA, AoA, director details) is completed.',
    answerBn: 'আরজেএসসি-তে প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন সম্পন্ন হতে সাধারণত ৫ থেকে ৭ কার্যদিবস সময় লাগে (নাম ছাড়পত্র পাওয়ার পর প্রয়োজনীয় মেমোরেন্ডাম ও আর্টিকেলের নথি সম্পন্ন সাপেক্ষে)।',
  },
  {
    id: 'faq-6',
    category: 'Tax & TIN',
    question: 'How do I obtain an e-TIN?',
    questionBn: 'আমি কীভাবে ই-টিন পেতে পারি?',
    answer: 'Obtaining an e-TIN requires your National ID (NID) or Passport, active mobile number, and basic demographic details. Our team can register and generate your 12-digit e-TIN certificate quickly.',
    answerBn: 'ই-টিন গ্রহণের জন্য আপনার জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট, সক্রিয় মোবাইল নম্বর ও ব্যক্তিগত তথ্য প্রয়োজন। আমাদের টিম অত্যন্ত দ্রুত আপনার ১২-সংখ্যার ই-টিন সার্টিফিকেট গ্রহণ সম্পন্ন করে দিতে পারে।',
  },
  {
    id: 'faq-7',
    category: 'VAT & BIN',
    question: 'Do I need a BIN?',
    questionBn: 'আমার কি বিন (BIN) প্রয়োজন?',
    answer: 'Any business engaged in manufacturing, trading, importing, exporting, or rendering taxable services in Bangladesh requires a 9-digit Business Identification Number (BIN/VAT registration) under the VAT & SD Act 2012.',
    answerBn: 'বাংলাদেশে ভ্যাট ও সম্পূরক শুল্ক আইন ২০১২ অনুযায়ী যেকোনো উৎপাদন, ট্রেডিং, আমদানি, রপ্তানি বা করযোগ্য সেবা প্রদানকারী ব্যবসার জন্য ৯-সংখ্যার বিজনেস আইডেন্টিফিকেশন নম্বর (BIN / ভ্যাট নিবন্ধন) গ্রহণ বাধ্যতামূলক।',
  },
  {
    id: 'faq-8',
    category: 'Tax & TIN',
    question: 'Can you help with tax returns?',
    questionBn: 'আপনারা কি ট্যাক্স রিটার্নে সহায়তা করতে পারেন?',
    answer: 'Yes. We provide end-to-end income tax return preparation and filing for salaried individuals, professionals, business owners, NRBs, and private limited companies, ensuring accurate rebate calculations and wealth statements.',
    answerBn: 'হ্যাঁ। আমরা চাকরিজীবী, পেশাজীবী, ব্যবসায়ী, প্রবাসী এবং প্রাইভেট লিমিটেড কোম্পানির জন্য নির্ভুল হিসাব, রিবেট ও সম্পদ বিবরণীসহ সম্পূর্ণ আয়কর রিটার্ন প্রস্তুত ও দাখিল সেবা দিয়ে থাকি।',
  },
  {
    id: 'faq-9',
    category: 'Company Formation',
    question: 'Can you help with company formation?',
    questionBn: 'আপনারা কি কোম্পানি গঠনে সহায়তা করতে পারেন?',
    answer: 'Absolutely. We assist with name clearance, drafting Memorandum & Articles of Association (MoA & AoA), obtaining incorporation certificates, digital share certificates, and post-incorporation trade licenses & bank accounts.',
    answerBn: 'অবশ্যই। আমরা নাম ছাড়পত্র সংগ্রহ, মেমোরেন্ডাম ও আর্টিকেলস অফ অ্যাসোসিয়েশন ড্রাফটিং, ইনকর্পোরেশন সার্টিফিকেট গ্রহণ এবং পরবর্তী ট্রেড লাইসেন্স ও ব্যাংক অ্যাকাউন্ট খোলাসহ সম্পূর্ণ সহায়তা করি।',
  },
  {
    id: 'faq-10',
    category: 'Legal Docs',
    question: 'Can you review a contract?',
    questionBn: 'আপনারা কি কোনো চুক্তি পর্যালোচনা করতে পারেন?',
    answer: 'Yes. Our legal counselors review employment contracts, partnership agreements, non-disclosure agreements (NDAs), commercial leases, vendor agreements, and software licensing contracts to protect your interests.',
    answerBn: 'হ্যাঁ। আমাদের অভিজ্ঞ আইনজীবীগণ কর্মসংস্থান চুক্তি, অংশীদারি চুক্তি, এনডিএ (NDA), বাণিজ্যিক চুক্তি এবং সাপ্লাই এগ্রিমেন্ট বিশদভাবে পর্যালোচনা করে আপনার আইনি সুরক্ষা নিশ্চিত করেন।',
  },
  {
    id: 'faq-11',
    category: 'General & Process',
    question: 'Can you provide ongoing business compliance support?',
    questionBn: 'আপনারা কি ধারাবাহিক ব্যবসায়িক কমপ্লায়েন্স সহায়তা দেন?',
    answer: 'Yes. We offer monthly and annual retainer compliance packages covering monthly VAT return filings, withholding tax compliance, annual RJSC return filings, renewal of trade licenses, and ongoing legal advisory.',
    answerBn: 'হ্যাঁ। আমরা মাসিক ভ্যাট রিটার্ন দাখিল, ট্যাক্স কমপ্লায়েন্স, বার্ষিক আরজেএসসি রিটার্ন ফাইলিং, লাইসেন্স নবায়ন এবং নিয়মিত আইনি পরামর্শসহ মাসিক ও বার্ষিক রিটেইনার সেবা প্রদান করি।',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  language,
  onOpenAiModal,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: language === 'bn' ? 'সব' : 'All' },
    { id: 'Tax & TIN', label: language === 'bn' ? 'Tax & TIN' : 'Tax & TIN' },
    { id: 'VAT & BIN', label: language === 'bn' ? 'VAT & BIN' : 'VAT & BIN' },
    { id: 'Company Formation', label: language === 'bn' ? 'Company Formation' : 'Company Formation' },
    { id: 'Legal Docs', label: language === 'bn' ? 'Legal Docs' : 'Legal Docs' },
    { id: 'General & Process', label: language === 'bn' ? 'General & Process' : 'General & Process' },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = faqsList.filter((item) => {
    const q = language === 'bn' ? item.questionBn : item.question;
    const a = language === 'bn' ? item.answerBn : item.answer;
    const matchesSearch = 
      q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white relative border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight mb-3">
            {language === 'bn' ? 'যা কিছু আপনার জানা প্রয়োজন' : 'Everything You Need to Know'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            {language === 'bn'
              ? 'আমাদের সেবা, সাক্ষাতের মাধ্যম, ট্যাক্স রিটার্ন ফাইলিং, ভ্যাট নিবন্ধন এবং কোম্পানি গঠন সম্পর্কে দ্রুত উত্তর জানুন।'
              : 'Find quick answers regarding our services, consultation modes, tax return filing, VAT registration, and company formation.'}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-8 space-y-4 max-w-2xl mx-auto">
          {/* Search input with rounded-full pill design */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'কীওয়ার্ড দিয়ে খুঁজুন...' : 'Search FAQ by keyword...'}
              className="w-full pl-11 pr-14 py-2.5 sm:py-3 rounded-full bg-white border border-slate-200/90 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF] text-xs sm:text-sm transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#4F46E5] text-white font-semibold shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3" id="faq-accordion-list">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500 font-medium">
                {language === 'bn' ? 'কোনো প্রশ্ন পাওয়া যায়নি।' : 'No matching questions found.'}
              </p>
              <button
                onClick={() => onOpenAiModal(searchQuery)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'bn' ? 'এআই অ্যাসিস্ট্যান্টকে জিজ্ঞেস করুন' : 'Ask Top Spark AI instead'}</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const question = language === 'bn' ? faq.questionBn : faq.question;
              const answer = language === 'bn' ? faq.answerBn : faq.answer;
              const qNumber = `Q${index + 1}`;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl sm:rounded-3xl border transition-all duration-150 overflow-hidden ${
                    isOpen 
                      ? 'bg-white border-[#C7D2FE] shadow-sm ring-2 ring-[#EEF2FF]' 
                      : 'bg-white border-slate-200/90 hover:border-[#C7D2FE]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      {/* Q Number Badge */}
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                        isOpen ? 'bg-[#4F46E5] text-white' : 'bg-[#EEF2FF] text-[#4F46E5]'
                      }`}>
                        {qNumber}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#4F46E5] transition-colors">
                        {question}
                      </span>
                    </div>

                    <div className={`p-1 rounded-lg transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#4F46E5]' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      <p className="mt-2 mb-3 pl-11.5">{answer}</p>

                      <div className="flex items-center justify-between pt-2.5 ml-11.5 text-[11px] text-slate-500 border-t border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {faq.category}
                        </span>

                        <button
                          onClick={() => onOpenAiModal(question)}
                          className="text-[#4F46E5] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>{language === 'bn' ? 'এআই সহায়ক আলোচনা' : 'Ask AI more details'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
