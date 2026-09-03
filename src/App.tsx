import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiGuidanceSection } from './components/AiGuidanceSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { WhoWeSupport } from './components/WhoWeSupport';
import { LearnExperts } from './components/LearnExperts';
import { WhyTopSpark } from './components/WhyTopSpark';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ConsultationModal } from './components/ConsultationModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { AiDisclaimerModal } from './components/AiDisclaimerModal';
import { LegalDisclaimerModal } from './components/LegalDisclaimerModal';
import { Sparkles, MessageSquare, MessageCircle, Phone } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAiDisclaimerModalOpen, setIsAiDisclaimerModalOpen] = useState(false);
  const [isLegalDisclaimerModalOpen, setIsLegalDisclaimerModalOpen] = useState(false);
  const [consultInitialService, setConsultInitialService] = useState<string | undefined>(undefined);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  // Update HTML lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const openAiModal = (prompt?: string) => {
    setAiInitialPrompt(prompt || '');
    setIsAiModalOpen(true);
  };

  const openConsultModal = (serviceId?: string) => {
    setConsultInitialService(serviceId);
    setIsConsultModalOpen(true);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#EEF2FF] selection:text-[#4F46E5] ${
      language === 'bn' ? 'font-bengali' : 'font-sans'
    }`}>
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenAiModal={() => openAiModal()}
        onOpenConsultModal={() => openConsultModal()}
      />

      {/* 2. Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenAiModal={() => openAiModal()}
          onScrollToServices={scrollToServices}
          onOpenConsultModal={() => openConsultModal()}
        />

        {/* Specialized Legal, Tax & Corporate Solutions (Services) */}
        <ServicesSection
          language={language}
          onOpenAiWithPrompt={openAiModal}
          onOpenConsultModal={openConsultModal}
        />

        {/* AI-Powered Legal Guidance Section */}
        <AiGuidanceSection
          language={language}
          onOpenAiModal={openAiModal}
          onOpenConsultModal={openConsultModal}
        />

        {/* How Our Consultancy Works (5-Step Process) */}
        <HowItWorks
          language={language}
          onOpenConsultModal={() => openConsultModal()}
        />

        {/* Who We Support */}
        <WhoWeSupport
          language={language}
          onOpenConsultModal={() => openConsultModal()}
        />

        {/* Learn From Our Experts (YouTube Video Cards) */}
        <LearnExperts
          language={language}
        />

        {/* Why Top Spark? */}
        <WhyTopSpark
          language={language}
        />

        {/* Frequently Asked Questions (Interactive Accordion) */}
        <FaqSection
          language={language}
          onOpenAiModal={openAiModal}
        />
      </main>

      {/* 3. Global Footer */}
      <Footer
        language={language}
        onOpenAiModal={() => openAiModal()}
        onOpenConsultModal={() => openConsultModal()}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
        onOpenAiDisclaimerModal={() => setIsAiDisclaimerModalOpen(true)}
        onOpenLegalDisclaimerModal={() => setIsLegalDisclaimerModalOpen(true)}
      />

      {/* 4. Floating Action Buttons (WhatsApp & AI Assistant) */}
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/8801674451806"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (+8801674 451 806)"
          title="Chat on WhatsApp: +8801674 451 806"
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl shadow-emerald-600/30 active:scale-95 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          {/* Subtle pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />
          
          {/* Official WhatsApp Logo SVG */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white relative z-10"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      {/* Floating Quick Action AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Main Floating AI Button */}
        <button
          id="floating-ai-assistant-btn"
          onClick={() => openAiModal()}
          className="group flex items-center gap-2.5 px-4 py-3 sm:px-4.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-lg shadow-indigo-600/20 active:scale-95 transition-all duration-150 cursor-pointer"
          title={language === 'bn' ? 'এআই সহায়ককে প্রশ্ন করুন' : 'Ask Top Spark AI'}
        >
          <div className="relative">
            <Sparkles className="w-4.5 h-4.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="hidden sm:inline">
            {language === 'bn' ? 'এআই সহায়ক' : 'Ask Top Spark AI'}
          </span>
        </button>
      </div>

      {/* 5. Modals */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        language={language}
        initialPrompt={aiInitialPrompt}
        onClose={() => {
          setIsAiModalOpen(false);
          setAiInitialPrompt('');
        }}
        onOpenConsultModal={(promptService) => openConsultModal(promptService)}
      />

      <ConsultationModal
        isOpen={isConsultModalOpen}
        language={language}
        initialServiceId={consultInitialService}
        onClose={() => {
          setIsConsultModalOpen(false);
          setConsultInitialService(undefined);
        }}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        language={language}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        language={language}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <AiDisclaimerModal
        isOpen={isAiDisclaimerModalOpen}
        language={language}
        onClose={() => setIsAiDisclaimerModalOpen(false)}
      />

      <LegalDisclaimerModal
        isOpen={isLegalDisclaimerModalOpen}
        language={language}
        onClose={() => setIsLegalDisclaimerModalOpen(false)}
      />

    </div>
  );
}
