import React, { useState } from 'react';
import { Booking } from '../../types';
import {
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  X,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';

export const OFFICIAL_WHATSAPP_NUMBER = '9783770735';
export const OFFICIAL_WHATSAPP_DISPLAY = '+91 97837 70735';

export const buildBookingWhatsAppMessage = (booking: Booking): string => {
  const testsList = booking.tests.map((t) => t.name).join(', ');
  const dateFormatted = booking.appointmentDate || 'Today';
  const slot = booking.timeSlot || '07:00 AM - 08:00 AM';
  const addressStr = booking.collectionType === 'home'
    ? (booking.address ? `${booking.address.street || booking.address.line1 || booking.address.area}, ${booking.address.city}` : 'Home Address')
    : 'Partner Laboratory Center';

  return `*🟢 LabExpress Diagnostic Booking Confirmation*
----------------------------------------
*Order ID:* ${booking.id}
*Patient Name:* ${booking.patient.name} (${booking.patient.age}y, ${booking.patient.gender})
*Status:* ✅ Confirmed & Phlebotomist Dispatched
*Pickup Schedule:* ${dateFormatted} | ${slot}
*Collection Mode:* ${booking.collectionType === 'home' ? '🏠 60-Minute Home Sample Collection' : '🏢 Lab Visit'}
*Address:* ${addressStr}
*Tests Booked:* ${testsList}
*Total Payable:* ₹${booking.finalAmount} (${booking.paymentStatus === 'paid_online' ? 'Paid Online' : 'Pay on Collection'})
----------------------------------------
*Live Sample Tracking Link:*
${window.location.origin}/?portal=customer&tracking=${booking.id}

*Official Diagnostics Support:* ${OFFICIAL_WHATSAPP_DISPLAY}
_LabExpress - NABL Accredited Healthcare Network_`;
};

export const getWhatsAppLink = (booking?: Booking | null, customText?: string): string => {
  const text = customText || (booking ? buildBookingWhatsAppMessage(booking) : 'Hello LabExpress, I have an inquiry regarding diagnostic test booking.');
  return `https://wa.me/91${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

interface WhatsAppNotificationModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
  autoOpened?: boolean;
}

export const WhatsAppNotificationModal: React.FC<WhatsAppNotificationModalProps> = ({
  isOpen,
  booking,
  onClose,
  autoOpened = false
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !booking) return null;

  const messageText = buildBookingWhatsAppMessage(booking);
  const waUrl = getWhatsAppLink(booking);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-200 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <MessageCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                WhatsApp Order Notification
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Instant Alert Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official Helpline: <strong className="text-emerald-700 font-mono">{OFFICIAL_WHATSAPP_DISPLAY}</strong>
            </p>
          </div>
        </div>

        {/* Auto Notification Alert Badge */}
        {autoOpened && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Booking Successfully Confirmed!</span>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                The order confirmation notification has been prepared for dispatch on WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp Message Preview Bubble */}
        <div className="bg-[#eef8f2] rounded-2xl p-4 border border-[#cbe9d6] space-y-2 relative">
          <div className="flex items-center justify-between text-[11px] text-emerald-900 font-bold border-b border-emerald-200/70 pb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              WhatsApp Message Preview
            </span>
            <span className="font-mono text-emerald-700">To: {OFFICIAL_WHATSAPP_DISPLAY}</span>
          </div>

          <pre className="text-xs font-sans text-slate-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto pr-1">
            {messageText}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open & Send on WhatsApp (+91 9783770735)</span>
          </a>

          <button
            onClick={handleCopy}
            className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              copied
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Support Note */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>24x7 Verified Lab Assistance Hotline: <strong>{OFFICIAL_WHATSAPP_DISPLAY}</strong></span>
          </p>
        </div>

      </div>
    </div>
  );
};
