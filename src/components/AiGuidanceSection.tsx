import React from 'react';
import { Language } from '../types';
import { 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  Info
} from 'lucide-react';

interface AiGuidanceSectionProps {
  language: Language;
  onOpenAiModal: (initialPrompt?: string) => void;
  onOpenConsultModal?: (serviceId?: string) => void;
}

export const AiGuidanceSection: React.FC<AiGuidanceSectionProps> = ({
  language,
  onOpenAiModal,
  onOpenConsultModal,
}) => {
  const suggestedQuestions = [
    'How do I apply for an e-TIN in Bangladesh?',
    'What documents are needed for private company registration?',
    'Do I need a BIN for my e-commerce business?',
  ];

  return (
    <section id="ai-guidance" className="py-12 sm:py-16 bg-[#F8FAFC] relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Navy/Slate Container Box */}
        <div className="bg-[#0B1120] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#1E293B] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Prompts & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172033] border border-[#25324D] text-[#A5B4FC] text-xs sm:text-sm font-semibold mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI-Powered Legal Guidance</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.15] mb-4">
                Have a Legal, Tax or Business Question?
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-7 max-w-xl font-normal">
                Our AI Legal Assistant can provide general information about common legal, tax, company and compliance topics and help you identify the right service.
              </p>

              {/* Try Asking Section Title */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                <span className="text-sm">💡</span>
                <span>TRY ASKING QUESTIONS LIKE:</span>
              </div>

              {/* Question Prompts List */}
              <div className="flex flex-col gap-2.5 mb-8">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    id={`ai-guidance-sample-q-${idx}`}
                    onClick={() => onOpenAiModal(question)}
                    className="w-fit max-w-full inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#131C31] hover:bg-[#1A2644] border border-[#223055] hover:border-indigo-400/50 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all text-left group cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 shrink-0" />
                    <span className="truncate">{question}</span>
                  </button>
                ))}
              </div>

              {/* Buttons Row */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <button
                  id="ai-guidance-start-chat-btn"
                  onClick={() => onOpenAiModal()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Start Chatting Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Disclaimer Note */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-normal">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>AI-generated information is for general educational purposes and does not replace professional legal or tax advice.</span>
              </div>

            </div>

            {/* Right Column: Simulated AI Chat Widget */}
            <div className="lg:col-span-5">
              <div className="bg-[#080E1A] rounded-2xl p-5 sm:p-6 border border-[#1E293B] shadow-2xl flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#4338CA] flex items-center justify-center text-white text-xs font-black tracking-wider shadow-xs shrink-0">
                    AI
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      Top Spark Legal AI Assistant
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Online • Bangladesh Tax & Legal KB</span>
                    </div>
                  </div>
                </div>

                {/* Amber Disclaimer Banner */}
                <div className="bg-[#241A0E] border border-[#7C4811]/70 rounded-xl px-3.5 py-2 mb-3.5 text-[11px] sm:text-xs text-amber-300 font-medium leading-snug">
                  Disclaimer: Educational information only • Not formal legal advice
                </div>

                {/* User Message Box */}
                <div className="bg-[#0D1527] rounded-xl p-3.5 border border-[#1E2D4A] mb-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    User
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    "What is required to register a Private Limited Company?"
                  </p>
                </div>

                {/* AI Response Box */}
                <div className="bg-[#0D1527] rounded-xl p-3.5 border border-[#273456] mb-4">
                  <span className="block text-xs font-bold text-[#818CF8] mb-1">
                    Top Spark Legal AI
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Company incorporation requires RJSC Name Clearance, Memorandum & Articles of Association (MoA/AoA), Trade License, e-TIN, and BIN.
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      id="ai-preview-book-consult-link"
                      onClick={() => onOpenConsultModal?.('company-formation')}
                      className="text-xs font-semibold text-[#818CF8] hover:text-[#A5B4FC] transition-colors cursor-pointer hover:underline"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>

                {/* Open Full AI Chatbot Button */}
                <button
                  id="ai-guidance-open-modal-btn"
                  onClick={() => onOpenAiModal()}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#141E34] hover:bg-[#1D2A48] border border-[#243354] hover:border-indigo-400/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-amber-300 transition-colors" />
                  <span>Open Full AI Chatbot</span>
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
