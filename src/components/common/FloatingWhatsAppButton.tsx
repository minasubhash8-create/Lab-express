import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck, Sparkles, Clock, Phone } from 'lucide-react';
import { OFFICIAL_WHATSAPP_DISPLAY, OFFICIAL_WHATSAPP_NUMBER } from './WhatsAppNotificationModal';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getDirectChatUrl = (queryText: string) => {
    return `https://wa.me/91${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(queryText)}`;
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expandable Quick Help Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-black text-sm leading-tight flex items-center gap-1.5">
                    LabExpress Helpdesk
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  </h4>
                  <p className="text-[11px] text-emerald-100 font-medium">WhatsApp Support ({OFFICIAL_WHATSAPP_DISPLAY})</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-emerald-50/90 mt-2 bg-white/10 rounded-xl p-2 font-medium">
              👋 Namaste! Need instant help with home collection, fasting instructions, or report delivery?
            </p>
          </div>

          {/* Quick Query Options */}
          <div className="p-3.5 space-y-2 bg-slate-50/70 text-xs">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-1">
              Popular Quick Actions:
            </span>

            {[
              {
                title: '📍 Track Phlebotomist Arrival',
                desc: 'Get live ETA of your home collection specialist',
                query: 'Hello LabExpress, I need live ETA for my sample pickup.'
              },
              {
                title: '📑 Download Test Report',
                desc: 'Receive authorized NABL report on WhatsApp',
                query: 'Hello LabExpress, please send my authorized diagnostic report on WhatsApp.'
              },
              {
                title: '💉 Book 60-Minute Fasting Test',
                desc: 'Lipid, Sugar, CBC, Full Body packages',
                query: 'Hello LabExpress, I want to book a home blood test pickup.'
              },
              {
                title: '🏢 Partner Lab & GST Inquiry',
                desc: 'Corporate, B2B tie-ups & billing support',
                query: 'Hello LabExpress, I have a partnership / corporate billing inquiry.'
              }
            ].map((opt, i) => (
              <a
                key={i}
                href={getDirectChatUrl(opt.query)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block p-2.5 bg-white hover:bg-emerald-50/80 rounded-xl border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer group shadow-2xs"
              >
                <p className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {opt.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
              </a>
            ))}
          </div>

          {/* Direct WhatsApp Call/Chat Button */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
            <a
              href={getDirectChatUrl('Hello LabExpress Healthcare, I need diagnostic support.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Start WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-emerald-700/40 hover:shadow-emerald-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-2 border-emerald-400/50"
        title="Chat with official diagnostic support on WhatsApp"
        aria-label="Open WhatsApp Support"
      >
        {/* Pulsing Green Ping Ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
        </span>

        <div className="w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-white stroke-none" />
          )}
        </div>

        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-wide leading-none">WhatsApp Support</span>
            <span className="text-[9px] bg-emerald-800/80 text-emerald-200 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
              Online
            </span>
          </div>
          <span className="text-[10px] text-emerald-100 font-mono font-bold leading-none mt-0.5 block">
            {OFFICIAL_WHATSAPP_DISPLAY}
          </span>
        </div>
      </button>
    </div>
  );
};
