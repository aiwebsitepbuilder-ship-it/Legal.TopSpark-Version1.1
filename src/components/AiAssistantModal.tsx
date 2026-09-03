import React, { useState, useEffect, useRef } from 'react';
import { Language, ChatMessage } from '../types';
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw,
  Info,
  User,
  Copy,
  Check,
  Calendar
} from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  language: Language;
  initialPrompt?: string;
  onClose: () => void;
  onOpenConsultModal: (serviceId?: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  language,
  initialPrompt = '',
  onClose,
  onOpenConsultModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getInitialWelcomeMessage = (): string => {
    if (language === 'bn') {
      return `Hi! I'm the Top Spark Legal Assistant. I can help you understand general topics related to tax, TIN, VAT, company registration, business formation and common legal services.

I can also help identify which service may be relevant to your situation and guide you to book a consultation.

Please note: I provide general information only and do not replace advice from a qualified legal or tax professional.

How can I help you today?`;
    }
    return `Hi! I'm the Top Spark Legal Assistant. I can help you understand general topics related to tax, TIN, VAT, company registration, business formation and common legal services.

I can also help identify which service may be relevant to your situation and guide you to book a consultation.

Please note: I provide general information only and do not replace advice from a qualified legal or tax professional.

How can I help you today?`;
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([
          {
            id: 'welcome-init',
            sender: 'assistant',
            text: getInitialWelcomeMessage(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }

      if (initialPrompt) {
        setInputVal(initialPrompt);
      }

      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, language, initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('API response failed');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || (language === 'bn' 
          ? 'তথ্য প্রক্রিয়াকরণে কিছুটা সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Unable to process the query right now. Please try again.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Chat Error:', err);
      const fallbackText = `Information regarding "${query}":\n\nTop Spark provides dedicated legal and compliance solutions for personal income tax, company tax, VAT/BIN registration, RJSC company incorporation, and advocate consultations in Bangladesh.\n\nWould you like our legal team to review your specific requirements?`;

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: getInitialWelcomeMessage(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Subtle backdrop on small screens */}
      <div 
        className="fixed inset-0 z-50 bg-black/40 sm:bg-transparent pointer-events-auto sm:pointer-events-none transition-opacity"
        onClick={onClose}
      />

      {/* Floating Chatbot Widget on Right Side */}
      <div 
        id="ai-assistant-modal"
        className="fixed right-3 sm:right-6 bottom-3 sm:bottom-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[390px] md:w-[410px] h-[580px] max-h-[88vh] bg-[#090F1D] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#1E2B45] flex flex-col overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-5 sm:slide-in-from-right-5 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#090F1D] px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-[#1A263E]">
          <div className="flex items-center gap-3">
            {/* Gold Icon Badge */}
            <div className="w-9 h-9 rounded-xl bg-[#2A1E0B] border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xs shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Top Spark Legal AI
                </h3>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#332009] text-amber-400 border border-amber-600/40 uppercase tracking-wider">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                General Legal & Tax Information Assistant
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-1">
            <button
              id="reset-ai-chat-btn"
              onClick={handleResetChat}
              title="Reset conversation"
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              id="close-ai-modal-btn"
              onClick={onClose}
              title="Close chat"
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Disclaimer Banner directly below header */}
        <div className="bg-[#181308] border-b border-[#3B2609] px-3.5 py-2 flex items-start gap-2 text-[11px] leading-snug">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-slate-300">
            <span className="font-bold text-amber-400">Disclaimer:</span> This AI Assistant provides general information only and does not constitute formal legal or tax advice.
          </p>
        </div>

        {/* Chat Messages Scroll Area */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-[#060A14] custom-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative rounded-2xl px-4 py-3 max-w-[90%] text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-[#1E2B4B] text-slate-100 border border-[#2D3E6B]'
                      : 'bg-[#0E172B] text-slate-200 border border-[#1E2D4E]'
                  }`}
                >
                  {/* Message content */}
                  <div className="whitespace-pre-line font-normal text-slate-200">
                    {msg.text}
                  </div>

                  {/* Footer links on AI responses */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-[#1C2843] flex items-center justify-between text-[11px] text-slate-400">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenConsultModal();
                        }}
                        className="text-[#818CF8] hover:text-[#A5B4FC] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book Consultation</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-2 justify-start">
              <div className="bg-[#0E172B] border border-[#1E2D4E] rounded-2xl px-4 py-2.5 text-xs text-slate-300 shadow-sm flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-slate-400 text-xs">Analyzing tax & legal guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Field Section */}
        <div className="p-3 sm:p-3.5 bg-[#090F1D] border-t border-[#1A263E]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-[#0D1629] border border-[#1E2E4E] focus-within:border-amber-500/70 rounded-xl px-3 py-1.5 transition-all"
          >
            <input
              ref={inputRef}
              type="text"
              id="ai-assistant-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask a legal or tax question..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none py-1 font-normal"
            />
            <button
              type="submit"
              id="ai-assistant-send-btn"
              disabled={!inputVal.trim() || isLoading}
              className="w-8 h-8 rounded-lg bg-[#B45309] hover:bg-[#D97706] disabled:opacity-30 disabled:hover:bg-[#B45309] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Send query"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>

          {/* Educational Disclaimer Bottom Note */}
          <p className="text-[10px] text-slate-500 text-center mt-2 font-normal">
            Educational information only • Not formal legal advice
          </p>
        </div>

      </div>
    </>
  );
};
