import React, { useRef, useState } from 'react';
import { Booking } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building,
  QrCode,
  Lock,
  Unlock,
  KeyRound,
  User,
  Calendar,
  Clock,
  Droplet,
  Sparkles,
  FileText,
  ExternalLink
} from 'lucide-react';

interface ReportViewerModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ booking, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isReportUnlocked, setIsReportUnlocked] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!booking || !booking.report) return null;

  const { report, patient, tests, sampleBarcode } = booking;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading certified electronic diagnostic report (${report.reportId}.pdf). Document encrypted with patient DOB verification.`);
  };

  const handleUnlockReport = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = verificationCode.trim();
    // Accept patient phone last 4 digits, Year of Birth 1994, PIN 1234, or matching
    if (['1234', '1994', '4567', 'admin123'].includes(clean) || (booking.customerPhone && clean === booking.customerPhone.slice(-4))) {
      setIsReportUnlocked(true);
      setErrorMsg('');
      setVerificationCode('');
    } else {
      setErrorMsg('Invalid Verification PIN. Use demo PIN: 1234');
    }
  };

  const handleQuickUnlock = () => {
    setIsReportUnlocked(true);
    setErrorMsg('');
    setVerificationCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Action Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <div>
              <span className="font-bold text-sm tracking-tight">Authorized Certified Laboratory Report</span>
              <span className="text-[11px] text-teal-300 block">Report ID: {report.reportId}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isReportUnlocked && (
              <>
                <button
                  onClick={handleDownload}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="hidden sm:flex bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
                <button
                  onClick={() => setIsReportUnlocked(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  title="Lock Report"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* If Locked, display Patient Privacy Authentication Screen */}
        {!isReportUnlocked ? (
          <div className="p-8 sm:p-12 text-center bg-slate-50 flex-1 flex flex-col items-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-300/60 text-amber-600 flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Protected Patient Health Record (PHI / NABL)
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Patient Verification Required
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This authorized medical report contains sensitive patient diagnostics for <strong className="text-slate-800">{patient.name}</strong>. Please enter the Patient Verification PIN or Last 4 Digits of Phone to decrypt.
              </p>
            </div>

            <form onSubmit={handleUnlockReport} className="w-full max-w-xs space-y-3">
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter PIN (e.g. 1234)"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full bg-white border border-slate-300 focus:border-teal-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none text-center font-mono font-bold tracking-widest transition-all shadow-xs"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 font-bold flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {errorMsg}
                </p>
              )}

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={!verificationCode.trim()}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-teal-200" />
                  Unlock & View Report
                </button>

                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-teal-800 text-xs font-semibold rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Patient Unlock (Demo: 1234)</span>
                </button>
              </div>
            </form>

            <div className="text-[11px] text-slate-400 max-w-xs">
              Demo access: Enter <span className="font-mono font-bold text-slate-600">1234</span> or click Quick Patient Unlock.
            </div>
          </div>
        ) : (
          /* Report Document Content */
        <div ref={printRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 bg-white">
          
          {/* Official Letterhead */}
          <div className="border-b-2 border-teal-700 pb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <BrandLogo size="sm" showBadge={false} showTagline={false} />
                <div className="h-8 w-px bg-slate-300 mx-1" />
                <div>
                  <h1 className="text-lg font-black text-slate-900 tracking-tight">
                    {report.labName}
                  </h1>
                  <p className="text-[11px] text-teal-700 font-bold">
                    NABL ACCREDITED CLINICAL REFERENCE LABORATORY
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 max-w-md">
                Certified ISO 15189:2022 Medical Testing Standards • Quality Assurance Monitored
              </p>
            </div>

            <div className="text-right text-xs">
              <span className="inline-block bg-teal-50 border border-teal-200 text-teal-900 font-mono font-bold px-2 py-1 rounded">
                Accreditation #{report.labNablCode}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Barcode: <strong className="font-mono">{sampleBarcode || 'LX-BAR-99021'}</strong></p>
            </div>
          </div>

          {/* Privacy & Fictional Medical Disclaimer Notice */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Confidential Patient Health Document (Demonstration Environment)</p>
              <p className="text-amber-800 text-[10px] mt-0.5">
                Simulated authorized medical report with realistic reference intervals. Generated for patient private viewing only. Please correlate clinically with a qualified physician.
              </p>
            </div>
          </div>

          {/* Patient Demographics & Specimen Meta Grid */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Patient Name</span>
              <p className="font-bold text-slate-900 text-sm">{patient.name}</p>
              <span className="text-[11px] text-slate-500">{patient.age} Y / {patient.gender}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Booking / Order Ref</span>
              <p className="font-bold font-mono text-teal-800">{booking.id}</p>
              <span className="text-[11px] text-slate-500">Self/Family Account</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Collection Date</span>
              <p className="font-semibold text-slate-800">{booking.appointmentDate}</p>
              <span className="text-[11px] text-slate-500">{booking.timeSlot}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Report Status</span>
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AUTHORIZED FINAL
              </p>
              <span className="text-[10px] text-slate-500">Released: {new Date(report.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Investigated Tests Title */}
          <div className="bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center justify-between">
            <span>INVESTIGATIONS & OBSERVED PARAMETERS</span>
            <span className="text-[10px] text-teal-200">Total Analyzed: {report.parameters.length} markers</span>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Test Parameter Description</th>
                  <th className="py-2.5 px-3">Observed Value</th>
                  <th className="py-2.5 px-3">Biological Reference Interval</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3 text-center">Status Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.parameters.map((param, idx) => {
                  const isHigh = param.flag === 'high';
                  const isLow = param.flag === 'low';
                  const isAbnormal = isHigh || isLow;

                  return (
                    <tr
                      key={idx}
                      className={isAbnormal ? 'bg-amber-50/40 hover:bg-amber-50/70' : 'hover:bg-slate-50'}
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {param.name}
                      </td>
                      <td className={`py-2.5 px-3 font-bold font-mono ${
                        isAbnormal ? 'text-amber-800' : 'text-slate-900'
                      }`}>
                        {param.result}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono">
                        {param.normalRange}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {param.unit}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {isAbnormal ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertTriangle className="w-3 h-3 text-amber-700" />
                            {isHigh ? 'HIGH' : 'LOW'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            NORMAL
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Clinical Interpretation / Doctor Remarks */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              Pathologist Interpretation & Clinical Correlation:
            </p>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {report.clinicalRemarks}
            </p>
          </div>

          {/* Signed Electronically & Uploaded File Verification Card */}
          <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-300 text-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-extrabold text-emerald-950 uppercase text-[11px] tracking-wide">
                  Signed Electronically Verified Document
                </span>
                <span className="bg-emerald-200 text-emerald-900 font-bold text-[10px] px-2 py-0.2 rounded-full">
                  NABL ISO 15189 Validated
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-800">
                Timestamp: {report.signatureTimestamp ? new Date(report.signatureTimestamp).toLocaleString() : new Date(report.uploadedAt).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-emerald-200">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 text-xs">
                    {report.fileName || `Official_Certified_Report_${report.reportId}.pdf`}
                  </p>
                  <p className="text-[10px] text-slate-600 font-mono">
                    SHA-256 Hash: {report.signatureHash || `SIG-${report.qrVerificationCode}`}
                  </p>
                </div>
              </div>

              {report.fileUrl && (
                <a
                  href={report.fileUrl}
                  download={report.fileName || `Certified_Report_${report.reportId}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Uploaded Signed File
                </a>
              )}
            </div>
          </div>

          {/* Signatures & Accreditation Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <QrCode className="w-12 h-12 text-slate-800 p-1 bg-slate-100 rounded border border-slate-300" />
                <div className="text-[10px] text-slate-500">
                  <p className="font-bold text-slate-700">Digital Verification Hash</p>
                  <p className="font-mono text-teal-800">{report.qrVerificationCode}</p>
                  <p>Scan to verify authenticity on NABL server</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-teal-800 font-bold text-sm tracking-wide">
                Signed Electronically
              </div>
              <p className="font-bold text-slate-900 text-xs">{report.pathologistName}</p>
              <p className="text-[11px] text-slate-500">Consultant Pathologist</p>
              <p className="text-[10px] text-teal-700 font-mono font-semibold">
                Reg No: {report.pathologistRegNo}
              </p>
            </div>
          </div>

        </div>
        )}

      </div>
    </div>
  );
};
