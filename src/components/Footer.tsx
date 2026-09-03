import React from 'react';
import { Language } from '../types';
import { 
  Scale, 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare,
  Facebook,
  Youtube,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenAiModal: () => void;
  onOpenConsultModal: () => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
  onOpenAiDisclaimerModal?: () => void;
  onOpenLegalDisclaimerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenAiModal,
  onOpenConsultModal,
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenAiDisclaimerModal,
  onOpenLegalDisclaimerModal,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
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
    <footer id="main-footer" className="bg-[#060B18] text-slate-400 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Col 1: Brand, Description & Socials (4.5 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-4">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white shadow-md">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg tracking-tight text-white leading-none">
                  Top Spark
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  Business & Legal Consultancy
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-sm">
              Professional Legal, Tax, TIN, VAT, Company Registration, and Business Compliance lead-generation platform. Providing reliable guidance and direct appointment bookings with legal experts.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/topsparkdigital"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-fb-link"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#111A2E] hover:bg-[#182642] text-[#3B82F6] border border-[#1E2D4A] text-xs font-bold transition-colors shadow-2xs"
              >
                <Facebook className="w-3.5 h-3.5 fill-[#3B82F6]" />
                <span>FB</span>
              </a>

              <a
                href="https://www.youtube.com/@topsparkdigital"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-yt-link"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#111A2E] hover:bg-[#182642] text-[#EF4444] border border-[#1E2D4A] text-xs font-bold transition-colors shadow-2xs"
              >
                <Youtube className="w-3.5 h-3.5 fill-[#EF4444]" />
                <span>YT</span>
              </a>
            </div>
          </div>

          {/* Col 2: NAVIGATION (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAiModal}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Legal Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('who-we-support')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Who We Help
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: PRACTICE AREAS (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider mb-4">
              PRACTICE AREAS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Personal & Corporate Tax
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  e-TIN Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  VAT & BIN Filings
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  RJSC Company Formation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Ongoing Annual Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: CONTACT US (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider mb-4">
              CONTACT US
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white font-medium">Dhaka North:</strong> 131/2 A, Mirpur-1, Dhaka
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white font-medium">Dhaka South:</strong> Room# 6/6, Eastern Commercial Complex, 73 Kakrail, Dhaka
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <a 
                  href="mailto:legal@topsparkdigital.com" 
                  className="text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  legal@topsparkdigital.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="tel:+8801674451806" 
                  className="text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  +8801674 451 806
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="tel:+8801921876606" 
                  className="text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  +8801921 876 606
                </a>
              </div>
            </div>

            {/* Chat with AI Assistant Button */}
            <div className="mt-4">
              <button
                id="footer-chat-ai-btn"
                onClick={onOpenAiModal}
                className="w-full py-2 px-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Chat with AI Assistant</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 pb-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Top Spark Business & Legal Consultancy. All rights reserved.</p>

          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400">
            <button
              id="footer-privacy-policy-btn"
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-200 transition-colors cursor-pointer text-xs"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              id="footer-terms-of-service-btn"
              type="button"
              onClick={onOpenTermsModal}
              className="hover:text-slate-200 transition-colors cursor-pointer text-xs"
            >
              Terms of Service
            </button>
            <span className="text-slate-600">•</span>
            <button
              id="footer-ai-disclaimer-btn"
              type="button"
              onClick={onOpenAiDisclaimerModal}
              className="hover:text-slate-200 transition-colors cursor-pointer text-xs"
            >
              AI Disclaimer
            </button>
            <span className="text-slate-600">•</span>
            <button
              id="footer-legal-disclaimer-btn"
              type="button"
              onClick={onOpenLegalDisclaimerModal}
              className="hover:text-slate-200 transition-colors cursor-pointer text-xs"
            >
              Professional Legal Disclaimer
            </button>
          </div>
        </div>

        {/* Full-width Legal Disclaimer Box */}
        <div className="mt-2 p-4 sm:p-5 rounded-2xl bg-[#0A1022] border border-[#17233E] text-xs text-slate-400 leading-relaxed">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#4F46E5] shrink-0" strokeWidth={2.25} />
            <span className="font-bold text-slate-200 text-xs">Professional Legal Disclaimer</span>
          </div>
          <p>
            Information provided on this website and generated by our AI Assistant is for general informative and educational purposes only. It does not constitute formal legal or tax advice, nor does it create an advocate-client relationship. Official legal representation or formal tax filing requires direct engagement with our qualified professionals.
          </p>
        </div>

      </div>
    </footer>
  );
};

