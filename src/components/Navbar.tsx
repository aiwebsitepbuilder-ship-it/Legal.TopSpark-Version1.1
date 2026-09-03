import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  Scale, 
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenAiModal: () => void;
  onOpenConsultModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenAiModal,
  onOpenConsultModal: _onOpenConsultModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'how-it-works', 'who-we-support', 'faq'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: language === 'bn' ? 'সেবাসমূহ' : 'Services' },
    { id: 'how-it-works', label: language === 'bn' ? 'কার্যপদ্ধতি' : 'How It Works' },
    { id: 'ai-assistant', label: language === 'bn' ? 'এআই সহায়ক' : 'AI Assistant', isAi: true },
    { id: 'who-we-support', label: language === 'bn' ? 'ক্লায়েন্টবৃন্দ' : 'Who We Help' },
    { id: 'faq', label: language === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'ai-assistant') {
      onOpenAiModal();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header 
      id="main-navbar" 
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled 
          ? 'shadow-xs border-b border-slate-200/90 py-3' 
          : 'border-b border-slate-200/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo & Title from image */}
          <div className="flex items-center gap-3">
            <button 
              id="brand-logo-btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer focus:outline-none"
              aria-label="Top Spark Home"
            >
              <Scale className="w-5 h-5" />
            </button>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                  Top Spark
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF] leading-tight">
                  Legal & Tax
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-tight mt-0.5">
                Business & Consultancy Support
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation Links from image */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    link.isAi 
                      ? 'text-[#4F46E5] hover:text-[#4338CA]' 
                      : isActive 
                        ? 'text-[#4F46E5] font-semibold' 
                        : 'text-slate-600 hover:text-[#4F46E5]'
                  }`}
                >
                  {link.isAi && (
                    <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                  )}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls from image */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <button
              id="language-switcher-btn"
              onClick={onToggleLanguage}
              title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] border border-[#E0E7FF] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span className={language === 'en' ? 'font-bold text-[#4F46E5]' : 'text-slate-400 font-normal'}>EN</span>
              <span className="text-slate-300">|</span>
              <span className={language === 'bn' ? 'font-bold text-[#4F46E5]' : 'text-slate-400 font-normal'}>BN</span>
            </button>

            {/* Ask AI Assistant Button */}
            <button
              id="nav-ask-ai-btn"
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#4F46E5] bg-[#F5F3FF] hover:bg-[#EEF2FF] border border-[#DDD6FE] shadow-2xs transition-colors cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] group-hover:rotate-12 transition-transform" />
              <span>{t.nav.askAi}</span>
            </button>
          </div>

          {/* Mobile / Tablet Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-lang-btn"
              onClick={onToggleLanguage}
              className="sm:hidden px-2.5 py-1 rounded-lg text-xs font-bold text-[#4F46E5] bg-[#EEF2FF] border border-[#E0E7FF]"
            >
              {language === 'en' ? 'EN' : 'BN'}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <div className="space-y-1 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-left ${
                  activeSection === link.id
                    ? 'text-[#4F46E5] bg-[#EEF2FF] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isAi && <Sparkles className="w-4 h-4 text-[#4F46E5]" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-drawer-ask-ai"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#4F46E5] bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#E0E7FF]"
            >
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span>{t.nav.askAi}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

