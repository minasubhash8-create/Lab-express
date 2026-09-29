import React from 'react';
import { TestItem } from '../../types';
import {
  Clock,
  Droplet,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  FileText,
  X,
  Plus,
  Check
} from 'lucide-react';

interface TestDetailModalProps {
  test: TestItem | null;
  onClose: () => void;
  onAddToCart: (test: TestItem) => void;
  onBookNow: (test: TestItem) => void;
  isInCart: boolean;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({
  test,
  onClose,
  onAddToCart,
  onBookNow,
  isInCart
}) => {
  if (!test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-teal-500/30 text-teal-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-400/30">
              {test.category}
            </span>
            <span className="font-mono text-xs text-slate-300">Code: {test.code}</span>
            {test.badge && (
              <span className="bg-amber-400 text-amber-950 text-xs font-bold px-2 py-0.5 rounded-md">
                {test.badge}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
            {test.name}
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            {test.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-teal-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-300" />
              <span>Report in: <strong className="text-white">{test.turnaroundTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-teal-300" />
              <span>Sample: <strong className="text-white">{test.sampleType}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>NABL Certified Lab</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Preparation Instructions Card */}
          <div className={`p-4 rounded-xl border ${
            test.fastingRequired
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <AlertCircle className={`w-4 h-4 ${test.fastingRequired ? 'text-amber-600' : 'text-emerald-600'}`} />
              {test.fastingRequired
                ? `Fasting Protocol Required (${test.fastingHours || 10-12} Hours Overnight)`
                : 'No Special Fasting Required'}
            </div>
            <ul className="text-xs space-y-1.5 pl-6 list-disc">
              {test.preparationInstructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Parameters & Inclusions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                Tests & Parameters Covered ({test.parametersCount})
              </h4>
              <span className="text-xs text-slate-500 font-medium">Department: {test.department}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {test.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Express Advantage Guarantee */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              The LabExpress Guarantee:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800">⚡ 60-Min Pickup</p>
                <p className="text-slate-500">Phlebotomist arrives on-time with cold transport box.</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800">🧪 Smart Barcoding</p>
                <p className="text-slate-500">Zero sample mix-up with bedside barcode affixing.</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <p className="font-bold text-slate-800">🔒 Privacy Shield</p>
                <p className="text-slate-500">Reports encrypted and accessible only to patient.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer with Price and Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">₹{test.price}</span>
              <span className="text-sm text-slate-400 line-through">₹{test.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Save ₹{test.originalPrice - test.price} ({Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% off)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Includes free digital NABL report access</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToCart(test)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isInCart
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 text-teal-600" />
                  Added in Cart
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onBookNow(test);
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md shadow-teal-600/20 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              Book Test Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
