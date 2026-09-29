import React, { useState } from 'react';
import { Booking, BookingStatus } from '../../types';
import { useLabExpress } from '../../context/LabExpressContext';
import {
  X,
  CheckCircle2,
  Clock,
  User,
  Phone,
  FileCheck2,
  AlertTriangle,
  MapPin,
  Barcode,
  Building,
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';

interface OrderTrackerModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewReport: (booking: Booking) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  booking,
  onClose,
  onViewReport
}) => {
  const { cancelBooking } = useLabExpress();
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change in schedule / doctor advised different date');

  if (!booking) return null;

  const STATUS_STEPS: { key: BookingStatus; label: string; desc: string }[] = [
    { key: 'confirmed', label: 'Confirmed', desc: 'Booking recorded' },
    { key: 'staff_assigned', label: 'Staff Assigned', desc: 'Phlebotomist dispatched' },
    { key: 'sample_collected', label: 'Sample Collected', desc: 'Doorstep sterile draw' },
    { key: 'received_at_lab', label: 'Received at Lab', desc: 'Barcoded & centrifuged' },
    { key: 'processing', label: 'Processing', desc: 'Running in analyzer' },
    { key: 'report_ready', label: 'Report Ready', desc: 'NABL authorized' }
  ];

  const getStepIndex = (st: BookingStatus) => {
    if (st === 'cancelled') return -1;
    return STATUS_STEPS.findIndex((s) => s.key === st);
  };

  const currentStepIndex = getStepIndex(booking.status);
  const isCancelled = booking.status === 'cancelled';
  const canCancel = ['confirmed', 'staff_assigned'].includes(booking.status);

  const handleConfirmCancel = () => {
    cancelBooking(booking.id, cancelReason);
    setShowCancelPrompt(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-teal-400 text-sm">{booking.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                isCancelled
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : booking.status === 'report_ready'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
              }`}>
                {booking.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Patient: <strong className="text-white">{booking.patient.name}</strong> • Scheduled for {booking.appointmentDate} ({booking.timeSlot})
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Cancelled Banner if cancelled */}
          {isCancelled && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">This booking has been cancelled.</p>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  Reason: {booking.cancellationReason || 'User requested cancellation'}.
                  {booking.paymentStatus === 'refunded' ? ' Prepaid amount has been refunded to your original payment mode.' : ''}
                </p>
              </div>
            </div>
          )}

          {/* Report Ready Callout Button */}
          {booking.status === 'report_ready' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">Official Diagnostic Report Ready</p>
                  <p className="text-[11px] text-emerald-700">Verified and digitally authorized by consulting pathologist.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewReport(booking);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                View Report
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Visual Progress Stepper */}
          {!isCancelled && (
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Live Order Journey
              </p>
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4 pl-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                          isDone
                            ? 'bg-teal-600 text-white ring-4 ring-teal-50'
                            : 'bg-slate-200 text-slate-500'
                        } ${isCurrent ? 'ring-teal-200 ring-4 scale-110' : ''}`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full animate-pulse">
                              Current Step
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phlebotomist & Laboratory Assignment Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <User className="w-4 h-4 text-teal-600" />
                Assigned Phlebotomist
              </p>
              {booking.assignedPhlebotomistName ? (
                <div>
                  <p className="font-bold text-slate-900">{booking.assignedPhlebotomistName}</p>
                  <p className="text-[11px] text-slate-500">Vaccinated • Cold-Chain Kit (2-8°C)</p>
                  <p className="text-[11px] text-teal-700 font-medium mt-1">Mobile: +91 98112 00192</p>
                </div>
              ) : (
                <p className="text-slate-500 italic">Assigning nearest available phlebotomist fleet...</p>
              )}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <Building className="w-4 h-4 text-teal-600" />
                Processing Partner Lab
              </p>
              {booking.assignedLabName ? (
                <div>
                  <p className="font-bold text-slate-900">{booking.assignedLabName}</p>
                  <p className="text-[11px] text-slate-500">NABL Accredited Testing Facility</p>
                  {booking.sampleBarcode && (
                    <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <Barcode className="w-3.5 h-3.5" />
                      Sample Barcode: {booking.sampleBarcode}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-500 italic">Routing to nearest NABL lab network...</p>
              )}
            </div>
          </div>

          {/* Test Package Inclusions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-800 mb-2">Booked Investigations:</p>
            <div className="space-y-1.5">
              {booking.tests.map((t) => (
                <div key={t.id} className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium">• {t.name}</span>
                  <span className="font-mono text-slate-900 font-bold">₹{t.price}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-xs">
                <span>Total Paid ({booking.paymentMethod})</span>
                <span className="text-teal-700">₹{booking.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline Details */}
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Status Event Log
            </p>
            <div className="space-y-2 text-xs">
              {booking.timeline.map((entry, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{entry.title}</span>
                    <span className="text-slate-400 font-mono">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{entry.note}</p>
                  <span className="text-[10px] text-teal-600 font-medium block mt-1">by {entry.actor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation section */}
          {canCancel && !isCancelled && (
            <div className="pt-2 border-t border-slate-200">
              {showCancelPrompt ? (
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-3">
                  <p className="text-xs font-bold text-rose-900">Are you sure you want to cancel this booking?</p>
                  <p className="text-[11px] text-rose-700">
                    Free cancellation is allowed prior to sample pickup. Any online payment will be refunded immediately.
                  </p>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-rose-300 rounded-lg outline-none text-slate-800"
                  >
                    <option value="Change in schedule / doctor advised different date">Change in schedule / doctor advised different date</option>
                    <option value="Fasting hours not maintained">Fasting hours not maintained</option>
                    <option value="Booked test accidentally">Booked test accidentally</option>
                    <option value="Other personal reason">Other personal reason</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleConfirmCancel}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Confirm Cancellation
                    </button>
                    <button
                      onClick={() => setShowCancelPrompt(false)}
                      className="bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300"
                    >
                      Never mind
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCancelPrompt(true)}
                  className="text-xs text-rose-600 font-bold hover:text-rose-700 transition-colors"
                >
                  Need to cancel or reschedule?
                </button>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
          <a
            href={`https://wa.me/919783770735?text=Hello%20LabExpress%2C%20tracking%20assistance%20needed%20for%20order%20${booking.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5"
          >
            <span>WhatsApp Support: <strong>+91 97837 70735</strong></span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
