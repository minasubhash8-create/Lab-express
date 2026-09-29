import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Edit3,
  Save,
  Landmark,
  Smartphone,
  Award,
  Globe
} from 'lucide-react';
import { useLabExpress } from '../../context/LabExpressContext';

interface CompanyRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyRegistrationsModal: React.FC<CompanyRegistrationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { companyDetails, updateCompanyDetails, currentRole, isAdminUnlocked } = useLabExpress();

  const [isEditing, setIsEditing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form states
  const [companyName, setCompanyName] = useState(companyDetails.companyName);
  const [tradeName, setTradeName] = useState(companyDetails.tradeName);
  const [gstNumber, setGstNumber] = useState(companyDetails.gstNumber);
  const [msmeNumber, setMsmeNumber] = useState(companyDetails.msmeNumber);
  const [cinNumber, setCinNumber] = useState(companyDetails.cinNumber);
  const [clinicalReg, setClinicalReg] = useState(companyDetails.clinicalEstablishmentRegNo);
  const [nablCode, setNablCode] = useState(companyDetails.nablAccreditationNo);
  const [registeredOffice, setRegisteredOffice] = useState(companyDetails.registeredOffice);
  const [bankName, setBankName] = useState(companyDetails.bankName);
  const [bankAccountNo, setBankAccountNo] = useState(companyDetails.bankAccountNo);
  const [bankIfscCode, setBankIfscCode] = useState(companyDetails.bankIfscCode);
  const [upiVpa, setUpiVpa] = useState(companyDetails.upiVpa);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyDetails({
      companyName: companyName.trim(),
      tradeName: tradeName.trim(),
      gstNumber: gstNumber.trim().toUpperCase(),
      msmeNumber: msmeNumber.trim().toUpperCase(),
      cinNumber: cinNumber.trim().toUpperCase(),
      clinicalEstablishmentRegNo: clinicalReg.trim().toUpperCase(),
      nablAccreditationNo: nablCode.trim().toUpperCase(),
      registeredOffice: registeredOffice.trim(),
      bankName: bankName.trim(),
      bankAccountNo: bankAccountNo.trim(),
      bankIfscCode: bankIfscCode.trim().toUpperCase(),
      upiVpa: upiVpa.trim().toLowerCase()
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Government & Legal Registrations
                </h3>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-teal-500/30 uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Official Business Registration (CIN), GSTIN, MSME Udyam, & Clinical Establishment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">

          {/* Quick verification pill ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-center">
              <span className="text-[10px] text-teal-800 font-extrabold uppercase block">GST Registered</span>
              <span className="font-mono text-xs font-black text-teal-950">{companyDetails.gstNumber ? 'Rajasthan (08)' : 'Pending'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
              <span className="text-[10px] text-indigo-800 font-extrabold uppercase block">MSME Verified</span>
              <span className="font-mono text-xs font-black text-indigo-950">Udyam Active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[10px] text-amber-800 font-extrabold uppercase block">Clinical Est. Act</span>
              <span className="font-mono text-xs font-black text-amber-950">Govt of Rajasthan</span>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-center">
              <span className="text-[10px] text-cyan-800 font-extrabold uppercase block">NABL Accredited</span>
              <span className="font-mono text-xs font-black text-cyan-950">ISO 15189:2022</span>
            </div>
          </div>

          {!isEditing ? (
            /* View Mode */
            <div className="space-y-4">
              
              {/* Primary Legal Identifiers */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{companyDetails.companyName}</h4>
                    <p className="text-xs text-slate-500">{companyDetails.tradeName}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCompanyName(companyDetails.companyName);
                      setTradeName(companyDetails.tradeName);
                      setGstNumber(companyDetails.gstNumber);
                      setMsmeNumber(companyDetails.msmeNumber);
                      setCinNumber(companyDetails.cinNumber);
                      setClinicalReg(companyDetails.clinicalEstablishmentRegNo);
                      setNablCode(companyDetails.nablAccreditationNo);
                      setRegisteredOffice(companyDetails.registeredOffice);
                      setBankName(companyDetails.bankName);
                      setBankAccountNo(companyDetails.bankAccountNo);
                      setBankIfscCode(companyDetails.bankIfscCode);
                      setUpiVpa(companyDetails.upiVpa);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-teal-600 rounded-xl text-xs font-bold text-slate-700 hover:text-teal-700 shadow-2xs transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Edit / Update Numbers</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* GST Number */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">GSTIN / GST Number</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{companyDetails.gstNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(companyDetails.gstNumber, 'gst')}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-teal-600 transition-colors"
                        title="Copy GST"
                      >
                        {copiedKey === 'gst' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a
                        href={`https://services.gst.gov.in/services/searchtp`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Verify on GST Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* MSME Udyam Number */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">MSME Udyam Reg. No.</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{companyDetails.msmeNumber}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(companyDetails.msmeNumber, 'msme')}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-teal-600 transition-colors"
                        title="Copy MSME"
                      >
                        {copiedKey === 'msme' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a
                        href={`https://udyamregistration.gov.in/Udyam_Verify.aspx`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Verify on Udyam Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* CIN / ROC Registration Number */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Company Reg No (CIN)</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{companyDetails.cinNumber}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(companyDetails.cinNumber, 'cin')}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-teal-600 transition-colors"
                      title="Copy CIN"
                    >
                      {copiedKey === 'cin' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Clinical Establishment Reg */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Clinical Est. Reg. No.</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{companyDetails.clinicalEstablishmentRegNo}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(companyDetails.clinicalEstablishmentRegNo, 'ce')}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-teal-600 transition-colors"
                      title="Copy Clinical Reg"
                    >
                      {copiedKey === 'ce' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* NABL Accreditation Code */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between sm:col-span-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">NABL Central Accreditation Code</span>
                      <span className="font-mono font-bold text-teal-900 text-xs">{companyDetails.nablAccreditationNo}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(companyDetails.nablAccreditationNo, 'nabl')}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-teal-600 transition-colors"
                      title="Copy NABL Code"
                    >
                      {copiedKey === 'nabl' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Registered Office Address</span>
                  <p className="font-medium text-slate-800 mt-0.5">{companyDetails.registeredOffice}</p>
                </div>
              </div>

              {/* Verified Payout & Bank Accounts for Invoices & Payments */}
              <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-indigo-700" />
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                    Official Settlement & Payment Gateway Details (UPI & Bank)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Corporate Bank Account</span>
                    <p className="font-bold text-slate-900">{companyDetails.bankName}</p>
                    <p className="font-mono text-indigo-900 mt-0.5 font-bold">A/C: {companyDetails.bankAccountNo}</p>
                    <p className="font-mono text-slate-500 text-[11px]">IFSC: {companyDetails.bankIfscCode}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Official UPI Handle</span>
                      <p className="font-mono text-teal-800 text-sm font-black mt-1">{companyDetails.upiVpa}</p>
                      <p className="text-[10px] text-slate-500 mt-1">Direct merchant settlement ID for Google Pay, PhonePe, Paytm</p>
                    </div>
                    <button
                      onClick={() => handleCopy(companyDetails.upiVpa, 'upi')}
                      className="mt-2 text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'upi' ? 'Copied' : 'Copy UPI ID'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Edit Form Mode */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs text-teal-950">
                <span className="font-bold">✏️ Update Legal Registration Profile:</span> Enter your verified GSTIN, MSME, and Business registration numbers. These will immediately reflect in your website footer, tax invoices, and lab accreditation badges.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-medium outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Trade / Brand Name</label>
                  <input
                    type="text"
                    value={tradeName}
                    onChange={(e) => setTradeName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-medium outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">GSTIN Number (15 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="08AAACL9829M1ZQ"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold outline-teal-600"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5">Rajasthan State code: 08</p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">MSME Udyam Registration No *</label>
                  <input
                    type="text"
                    required
                    placeholder="UDYAM-RJ-14-0098234"
                    value={msmeNumber}
                    onChange={(e) => setMsmeNumber(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-bold outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Company CIN / Registration No</label>
                  <input
                    type="text"
                    placeholder="U85110RJ2026PTC098234"
                    value={cinNumber}
                    onChange={(e) => setCinNumber(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Clinical Establishment Reg No</label>
                  <input
                    type="text"
                    placeholder="RAJ-CE-2026-88741"
                    value={clinicalReg}
                    onChange={(e) => setClinicalReg(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">NABL Accreditation Certificate No</label>
                  <input
                    type="text"
                    value={nablCode}
                    onChange={(e) => setNablCode(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Registered Business Office</label>
                  <input
                    type="text"
                    value={registeredOffice}
                    onChange={(e) => setRegisteredOffice(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNo}
                    onChange={(e) => setBankAccountNo(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank IFSC Code</label>
                  <input
                    type="text"
                    value={bankIfscCode}
                    onChange={(e) => setBankIfscCode(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">UPI VPA (Virtual Payment Address)</label>
                  <input
                    type="text"
                    value={upiVpa}
                    onChange={(e) => setUpiVpa(e.target.value.toLowerCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono outline-teal-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md shadow-teal-700/20 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Registrations</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Compliant with Ministry of Corporate Affairs & Ministry of MSME Govt. of India</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
