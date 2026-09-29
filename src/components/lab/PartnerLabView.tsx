import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import { Booking, BookingStatus, LabReport, TestResultParameter, PartnerLab } from '../../types';
import { ReportViewerModal } from '../customer/ReportViewerModal';
import { BrandLogo } from '../common/BrandLogo';
import { PortalLockModal } from '../common/PortalLockModal';
import { DeepLinkModal } from '../common/DeepLinkModal';
import { RAJASTHAN_DISTRICTS } from '../../data/rajasthanData';
import {
  Building2,
  CheckCircle2,
  Clock,
  FlaskConical,
  UploadCloud,
  FileCheck2,
  Barcode,
  Search,
  Check,
  X,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  Calendar,
  DollarSign,
  Send,
  Zap,
  Trash2,
  Lock,
  Unlock,
  KeyRound,
  Mail,
  Link2,
  Plus,
  FileText,
  MapPin,
  Paperclip
} from 'lucide-react';

export const PartnerLabView: React.FC = () => {
  const {
    activeLabId,
    setActiveLabId,
    labs,
    bookings,
    activeLabs,
    activeBookings,
    isDemoModeActive,
    updateBookingStatus,
    uploadLabReport,
    deleteBooking,
    isLabUnlocked,
    setIsLabUnlocked,
    lockLab,
    setCurrentRole,
    addLab
  } = useLabExpress();

  const [showLabLockModal, setShowLabLockModal] = useState(false);
  const [showDeepLinkModal, setShowDeepLinkModal] = useState(false);

  // Lab Lock Screen Form State (matches Admin Central lock)
  const [labEmail, setLabEmail] = useState('');
  const [labPassword, setLabPassword] = useState('');
  const [showLabPassword, setShowLabPassword] = useState(false);
  const [labErrorMsg, setLabErrorMsg] = useState('');

  const currentLabsList = activeLabs && activeLabs.length > 0 ? activeLabs : labs;
  const currentLab = currentLabsList.find((l) => l.id === activeLabId) || currentLabsList[0] || labs[0];

  const [activeLabTab, setActiveLabTab] = useState<
    'workload' | 'processing' | 'completed' | 'profile' | 'settlement'
  >('workload');

  const [labSearch, setLabSearch] = useState('');

  // Report Upload / Authorization Modal
  const [authorizingBooking, setAuthorizingBooking] = useState<Booking | null>(null);
  const [authorizerName, setAuthorizerName] = useState(currentLab.chiefPathologist);
  const [authorizerRegNo, setAuthorizerRegNo] = useState(currentLab.pathologistRegNo);
  const [clinicalRemarks, setClinicalRemarks] = useState(
    'All observed parameters fall within biological reference intervals for age and sex. Clinical correlation advised.'
  );
  const [customParams, setCustomParams] = useState<TestResultParameter[]>([]);
  const [reportToPreview, setReportToPreview] = useState<Booking | null>(null);

  // Signed Electronically File Upload Option State
  const [uploadedReportFileName, setUploadedReportFileName] = useState('');
  const [uploadedReportFileSize, setUploadedReportFileSize] = useState(0);
  const [uploadedReportDataUrl, setUploadedReportDataUrl] = useState('');
  const [isElectronicallySigned, setIsElectronicallySigned] = useState(true);
  const [signatureHash, setSignatureHash] = useState('');

  // Add Lab Modal (All 50 Rajasthan Districts & Tehsils) State
  const [showAddLabModal, setShowAddLabModal] = useState(false);
  const [newLabName, setNewLabName] = useState('');
  const [newLabNabl, setNewLabNabl] = useState('');
  const [newLabGst, setNewLabGst] = useState('');
  const [newLabMsme, setNewLabMsme] = useState('');
  const [newLabRegNo, setNewLabRegNo] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('jaipur');
  const [selectedTehsilName, setSelectedTehsilName] = useState('Jaipur Urban (Central)');
  const [selectedHubArea, setSelectedHubArea] = useState('MI Road');
  const [customAreaText, setCustomAreaText] = useState('');
  const [customPincode, setCustomPincode] = useState('302001');
  const [newLabPathologist, setNewLabPathologist] = useState('');
  const [newLabCommission, setNewLabCommission] = useState('20');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedReportFileName(file.name);
      setUploadedReportFileSize(file.size);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedReportDataUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      const hexHash = 'SHA256-' + Array.from(file.name + file.size).reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0).toString(16).toUpperCase().padStart(8, '0');
      setSignatureHash(hexHash);
    }
  };

  const handleAddNewLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabName.trim() || !newLabNabl.trim()) return;

    const curDist = RAJASTHAN_DISTRICTS.find(d => d.id === selectedDistrictId) || RAJASTHAN_DISTRICTS[0];
    const curTehsil = curDist.tehsils.find(t => t.name === selectedTehsilName) || curDist.tehsils[0];
    const curArea = customAreaText.trim() || selectedHubArea || 'Main Road Area';
    const curPin = customPincode.trim() || curTehsil.pincodePrefix || '302001';

    const labObj: PartnerLab = {
      id: `lab-${Date.now()}`,
      name: newLabName.trim(),
      code: `LAB-${curDist.name.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      nablCode: newLabNabl.trim(),
      city: curDist.name,
      address: `${curArea}, ${curTehsil.name} Tehsil, ${curDist.name} (${curDist.hindiName}), Rajasthan - ${curPin}`,
      rating: 4.9,
      reviewsCount: 1,
      chiefPathologist: newLabPathologist.trim() || 'Dr. Rajeshwari Meena, MD (Pathology)',
      pathologistRegNo: `RMC-${Math.floor(10000 + Math.random() * 90000)}`,
      servicePincodes: [curPin],
      activeWorkload: 0,
      maxDailyCapacity: 50,
      commissionRate: parseInt(newLabCommission, 10) || 20,
      accreditationDate: new Date().toISOString().split('T')[0],
      turnaroundGuaranteedHours: 12,
      contactPhone: '+91 97837 70735',
      isPartnerHub: true,
      gstNumber: newLabGst.trim().toUpperCase() || '08AAACL9829M1ZQ',
      msmeNumber: newLabMsme.trim().toUpperCase() || 'UDYAM-RJ-14-0098234',
      registrationNumber: newLabRegNo.trim().toUpperCase() || `RAJ-REG-${Math.floor(10000 + Math.random() * 90000)}`
    };

    addLab(labObj);
    setActiveLabId(labObj.id);
    setShowAddLabModal(false);
    setNewLabName('');
    setNewLabNabl('');
  };

  // Filter bookings for this active lab (only non-demo when in production mode)
  const effectiveBookings = activeBookings || bookings;
  const labBookings = effectiveBookings.filter((b) => b.assignedLabId === currentLab.id);

  // Workload queues
  const incomingRequests = labBookings.filter((b) => b.status === 'staff_assigned');
  const inTransitOrCollected = labBookings.filter((b) => b.status === 'sample_collected');
  const inLabReception = labBookings.filter((b) => b.status === 'received_at_lab');
  const inProcessing = labBookings.filter((b) => b.status === 'processing');
  const completedReports = labBookings.filter((b) => b.status === 'report_ready');

  // Helper to open authorizer modal and generate test parameters
  const handleOpenAuthorizer = (booking: Booking) => {
    setAuthorizingBooking(booking);
    setAuthorizerName(currentLab.chiefPathologist);
    setAuthorizerRegNo(currentLab.pathologistRegNo);

    // Generate realistic parameters based on booked tests
    const defaultParams: TestResultParameter[] = [];
    const testNames = booking.tests.map((t) => t.name.toLowerCase()).join(' ');

    if (testNames.includes('cbc') || testNames.includes('blood count') || testNames.includes('full body')) {
      defaultParams.push(
        { name: 'Hemoglobin (Hb)', result: '13.8', normalRange: '12.0 - 16.0', unit: 'g/dL', flag: 'normal' },
        { name: 'Total Leukocyte Count (WBC)', result: '6,800', normalRange: '4,000 - 11,000', unit: '/cumm', flag: 'normal' },
        { name: 'Platelet Count', result: '260,000', normalRange: '150,000 - 450,000', unit: '/cumm', flag: 'normal' },
        { name: 'Neutrophils', result: '62', normalRange: '40 - 70', unit: '%', flag: 'normal' },
        { name: 'Lymphocytes', result: '30', normalRange: '20 - 40', unit: '%', flag: 'normal' },
        { name: 'ESR (Automated)', result: '11', normalRange: '0 - 20', unit: 'mm/1st hr', flag: 'normal' }
      );
    }

    if (testNames.includes('thyroid') || testNames.includes('tsh') || testNames.includes('full body')) {
      defaultParams.push(
        { name: 'Total Triiodothyronine (T3)', result: '1.24', normalRange: '0.80 - 2.00', unit: 'ng/mL', flag: 'normal' },
        { name: 'Total Thyroxine (T4)', result: '8.4', normalRange: '5.1 - 14.1', unit: 'µg/dL', flag: 'normal' },
        { name: 'TSH Ultrasensitive (3rd Gen)', result: '2.10', normalRange: '0.40 - 4.20', unit: 'µIU/mL', flag: 'normal' }
      );
    }

    if (testNames.includes('sugar') || testNames.includes('glucose') || testNames.includes('full body')) {
      defaultParams.push(
        { name: 'Fasting Blood Glucose', result: '92', normalRange: '70 - 100', unit: 'mg/dL', flag: 'normal' }
      );
    }

    if (testNames.includes('hba1c')) {
      defaultParams.push(
        { name: 'Glycated Hemoglobin (HbA1c)', result: '5.4', normalRange: '< 5.7', unit: '%', flag: 'normal' },
        { name: 'Estimated Average Glucose (eAG)', result: '108', normalRange: '90 - 120', unit: 'mg/dL', flag: 'normal' }
      );
    }

    if (testNames.includes('lipid') || testNames.includes('cholesterol') || testNames.includes('full body')) {
      defaultParams.push(
        { name: 'Total Cholesterol', result: '178', normalRange: '< 200', unit: 'mg/dL', flag: 'normal' },
        { name: 'Triglycerides', result: '135', normalRange: '< 150', unit: 'mg/dL', flag: 'normal' },
        { name: 'HDL (Good) Cholesterol', result: '52', normalRange: '> 40', unit: 'mg/dL', flag: 'normal' },
        { name: 'LDL (Bad) Cholesterol', result: '99', normalRange: '< 100', unit: 'mg/dL', flag: 'normal' }
      );
    }

    if (testNames.includes('vitamin d') || testNames.includes('vit-d')) {
      defaultParams.push(
        { name: '25-Hydroxy Vitamin D Total', result: '38.4', normalRange: '30.0 - 100.0', unit: 'ng/mL', flag: 'normal' }
      );
    }

    if (testNames.includes('vitamin b12') || testNames.includes('vit-b12')) {
      defaultParams.push(
        { name: 'Serum Vitamin B12', result: '420', normalRange: '211 - 911', unit: 'pg/mL', flag: 'normal' }
      );
    }

    // Fallback if no specific condition matched
    if (defaultParams.length === 0) {
      defaultParams.push(
        { name: 'Clinical Bio-Marker 1', result: 'Normal', normalRange: 'Negative / Normal', unit: 'Index', flag: 'normal' },
        { name: 'Quantitative Biochemical Assay', result: '14.2', normalRange: '10.0 - 20.0', unit: 'mg/dL', flag: 'normal' }
      );
    }

    setCustomParams(defaultParams);
    setUploadedReportFileName('');
    setUploadedReportFileSize(0);
    setUploadedReportDataUrl('');
    setIsElectronicallySigned(true);
    setSignatureHash(`SHA256-NABL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  };

  // Submit and finalize authorized report
  const handleAuthorizeAndRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorizingBooking) return;

    const finalReport: LabReport = {
      reportId: `REP-${authorizingBooking.id.replace('LX-', '')}`,
      uploadedAt: new Date().toISOString(),
      pathologistName: authorizerName || currentLab.chiefPathologist,
      pathologistRegNo: authorizerRegNo || currentLab.pathologistRegNo,
      labNablCode: currentLab.nablCode,
      labName: currentLab.name,
      status: 'authorized_final',
      parameters: customParams,
      clinicalRemarks: clinicalRemarks || 'All values biological normal. Correlate with clinical history.',
      qrVerificationCode: `NABL-${currentLab.nablCode}-${Math.floor(100000 + Math.random() * 900000)}`,
      fileUrl: uploadedReportDataUrl || undefined,
      fileName: uploadedReportFileName || undefined,
      fileSizeBytes: uploadedReportFileSize || undefined,
      signedElectronically: isElectronicallySigned,
      signatureTimestamp: isElectronicallySigned ? new Date().toISOString() : undefined,
      signatureHash: signatureHash || (isElectronicallySigned ? `SHA256-NABL-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : undefined)
    };

    uploadLabReport(authorizingBooking.id, finalReport);
    setAuthorizingBooking(null);
  };

  const handleLabUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLabErrorMsg('');
    const cleanEmail = labEmail.trim().toLowerCase();
    const cleanPass = labPassword.trim();
    if (cleanEmail === 'minasubhash8@gmail.com' && cleanPass === 'Meena9829@') {
      setIsLabUnlocked(true);
      setLabPassword('');
      setLabEmail('');
      setLabErrorMsg('');
    } else {
      setLabErrorMsg('Invalid Lab Staff ID or Password. Access denied.');
    }
  };

  if (!isLabUnlocked) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/10">
            <Lock className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-teal-500/10 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/20">
              <Building2 className="w-3.5 h-3.5" />
              Partner Lab Security Gateway
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Partner Lab Hub
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized pathology credentials required to manage sample intake, analyzer pipelines, and release authorized medical reports.
            </p>
          </div>

          <form onSubmit={handleLabUnlockSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Lab Staff ID / Email
              </label>
              <input
                type="email"
                required
                autoFocus
                value={labEmail}
                onChange={(e) => {
                  setLabEmail(e.target.value);
                  setLabErrorMsg('');
                }}
                placeholder="Enter Lab Staff ID / Email"
                className="w-full bg-slate-800/90 text-white text-xs font-mono py-2.5 px-3.5 rounded-xl border border-slate-700 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Lab Access Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showLabPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={labPassword}
                  onChange={(e) => {
                    setLabPassword(e.target.value);
                    setLabErrorMsg('');
                  }}
                  className="w-full bg-slate-800/90 text-white text-xs font-mono py-2.5 px-3.5 pr-10 rounded-xl border border-slate-700 focus:border-teal-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowLabPassword(!showLabPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                >
                  {showLabPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {labErrorMsg && (
              <p className="text-xs text-rose-400 font-semibold">{labErrorMsg}</p>
            )}

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-500/20"
              >
                <Unlock className="w-4 h-4" />
                Sign In & Unlock Lab Hub
              </button>

              <button
                type="button"
                onClick={() => setCurrentRole('customer')}
                className="w-full text-xs text-slate-400 hover:text-slate-200 py-1.5 cursor-pointer text-center block"
              >
                ← Return to Customer Marketplace
              </button>
            </div>
          </form>

          <p className="text-[11px] text-slate-500 border-t border-slate-800 pt-4 font-mono flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Authorized Diagnostic Personnel Only • Confidential</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      
      {/* Top Partner Lab Bar */}
      <div className="bg-teal-900 text-white border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white">
                  {currentLab.name}
                </h1>
                <span className="bg-teal-400 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                  NABL ACCREDITED
                </span>
              </div>
              <p className="text-xs text-teal-200 mt-0.5">
                License: <strong className="font-mono">{currentLab.nablCode}</strong> • Chief Pathologist: {currentLab.chiefPathologist} ({currentLab.pathologistRegNo})
              </p>
            </div>
          </div>

          {/* Top Actions: Lock Lab, Deep Link & Switch Laboratory Branch Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddLabModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Add Accredited Partner Lab across 50 Rajasthan Districts & Tehsils"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Add Lab (Rajasthan 50 Districts)</span>
            </button>

            <button
              onClick={() => setShowDeepLinkModal(true)}
              className="bg-teal-800 hover:bg-teal-700 text-teal-100 text-xs font-bold py-1.5 px-3 rounded-lg border border-teal-600/70 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Get direct shareable deep link"
            >
              <Link2 className="w-3.5 h-3.5 text-teal-300" />
              <span>🔗 Deep Link</span>
            </button>

            <button
              onClick={() => {
                lockLab();
                setCurrentRole('customer');
              }}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/50 text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock Partner Lab Hub"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Lock Lab</span>
            </button>

            <span className="text-xs text-teal-200 hidden sm:inline">Switch Lab:</span>
            <select
              value={activeLabId}
              onChange={(e) => setActiveLabId(e.target.value)}
              className="bg-teal-800 border border-teal-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg outline-none cursor-pointer"
            >
              {labs.map((l) => (
                <option key={l.id} value={l.id} className="text-slate-900 bg-white">
                  {l.name} ({l.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lab Subnav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none flex gap-1 border-t border-teal-800/80 pt-1">
          {[
            { id: 'workload', label: `Workload & Pipeline (${labBookings.length})`, icon: FlaskConical },
            { id: 'processing', label: `In Analyzer (${inProcessing.length})`, icon: Play },
            { id: 'completed', label: `Released Reports (${completedReports.length})`, icon: FileCheck2 },
            { id: 'settlement', label: 'Financial Settlement & Earnings', icon: DollarSign },
            { id: 'profile', label: 'Lab Facility Profile & Accreditation', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeLabTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLabTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-teal-800/50'
                    : 'border-transparent text-teal-200 hover:text-white hover:bg-teal-800/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-5">

        {/* Live / Demo Mode Queue Status Notice */}
        {!isDemoModeActive ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              🟢 Live Production Specimen Queue: Showing only real verified patient test orders. Demo orders are hidden.
            </span>
            <span className="text-[11px] text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded font-bold">
              {labBookings.length} Real Patient Specimens
            </span>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              🟡 Demo Simulation Mode: Sample test specimen orders are active. (Admin can switch to Live Production Mode to hide demo data).
            </span>
            <span className="text-[11px] text-amber-700 font-mono bg-amber-100 px-2 py-0.5 rounded font-bold">
              {labBookings.length} Orders in Queue
            </span>
          </div>
        )}

        {/* ================= TAB 1: WORKLOAD PIPELINE ================= */}
        {activeLabTab === 'workload' && (
          <div className="space-y-6">
            
            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">1. Phleb Dispatch</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{incomingRequests.length}</p>
                <p className="text-[11px] text-slate-500">Collection in transit</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">2. Samples Drawn</span>
                <p className="text-2xl font-black text-amber-700 mt-1">{inTransitOrCollected.length}</p>
                <p className="text-[11px] text-slate-500">En route to laboratory</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">3. Received at Desk</span>
                <p className="text-2xl font-black text-cyan-700 mt-1">{inLabReception.length}</p>
                <p className="text-[11px] text-slate-500">Barcoded & Centrifuged</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">4. In Analyzer</span>
                <p className="text-2xl font-black text-teal-700 mt-1">{inProcessing.length}</p>
                <p className="text-[11px] text-teal-600 font-semibold">Ready for authorization</p>
              </div>
            </div>

            {/* Step-by-Step Sample Lifecycle Management Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-teal-600" />
                    Active Laboratory Samples & Processing Pipeline
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Progress specimens through cold reception, automated analysis, and final clinical pathologist sign-off.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by Barcode or Order..."
                    value={labSearch}
                    onChange={(e) => setLabSearch(e.target.value)}
                    className="text-xs p-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-teal-600"
                  />
                </div>
              </div>

              {labBookings.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <FlaskConical className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No bookings currently assigned to this branch</p>
                  <p className="text-xs text-slate-500">
                    Switch to <strong>Admin Central</strong> to assign pending customer bookings to {currentLab.name}.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {labBookings
                    .filter((b) =>
                      b.id.toLowerCase().includes(labSearch.toLowerCase()) ||
                      (b.sampleBarcode && b.sampleBarcode.toLowerCase().includes(labSearch.toLowerCase())) ||
                      b.patient.name.toLowerCase().includes(labSearch.toLowerCase())
                    )
                    .map((booking) => {
                      const isReady = booking.status === 'report_ready';

                      return (
                        <div
                          key={booking.id}
                          className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-all flex flex-wrap items-center justify-between gap-4 text-xs"
                        >
                          {/* Left: Meta */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900 text-sm">{booking.id}</span>
                              <span className="font-mono text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                Barcode: {booking.sampleBarcode || 'LX-BAR-PENDING'}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                isReady
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-teal-100 text-teal-800'
                              }`}>
                                {booking.status.replace('_', ' ')}
                              </span>
                            </div>

                            <p className="text-slate-800 font-semibold">
                              Patient: {booking.patient.name} ({booking.patient.age}y / {booking.patient.gender}) •{' '}
                              <span className="text-slate-500 font-normal">
                                Slot: {booking.appointmentDate} ({booking.timeSlot})
                              </span>
                            </p>

                            <p className="text-slate-600 text-[11px]">
                              Tests: <strong className="text-slate-900">{booking.tests.map((t) => t.name).join(', ')}</strong>
                            </p>
                          </div>

                          {/* Right: Quick Action pipeline controls */}
                          <div className="flex items-center gap-2">
                            {booking.status === 'staff_assigned' && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(
                                    booking.id,
                                    'sample_collected',
                                    'Phlebotomist completed sample draw. Cold box sealed.',
                                    'Phlebotomist Fleet'
                                  )
                                }
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Record Sample Drawn
                              </button>
                            )}

                            {booking.status === 'sample_collected' && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(
                                    booking.id,
                                    'received_at_lab',
                                    'Sample received at Central Lab. Temperature verified 4°C. Barcode scanned.',
                                    `${currentLab.name} Desk`
                                  )
                                }
                                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                              >
                                <Barcode className="w-3.5 h-3.5" />
                                Receive at Lab Desk
                              </button>
                            )}

                            {booking.status === 'received_at_lab' && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(
                                    booking.id,
                                    'processing',
                                    'Specimen loaded into automated analyzer rack. Running assays.',
                                    'Laboratory Technologist'
                                  )
                                }
                                className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                              >
                                <Play className="w-3.5 h-3.5" />
                                Run in Analyzer
                              </button>
                            )}

                            {booking.status === 'processing' && (
                              <button
                                onClick={() => handleOpenAuthorizer(booking)}
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                              >
                                <UploadCloud className="w-3.5 h-3.5 text-cyan-200" />
                                Upload & Sign Report
                              </button>
                            )}

                            {isReady && booking.report && (
                              <button
                                onClick={() => setReportToPreview(booking)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <FileCheck2 className="w-3.5 h-3.5" />
                                View Released Report
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (confirm(`Delete test specimen order ${booking.id} from laboratory queue?`)) {
                                  deleteBooking(booking.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Specimen / Remove from Lab Queue"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 2: IN ANALYZER ================= */}
        {activeLabTab === 'processing' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Analyzers & Active Machine Runs</h3>
              <p className="text-xs text-slate-500">Specimens currently in automated hematology, biochemistry & immunoassay carousels</p>
            </div>

            {inProcessing.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-2">
                <Play className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No active runs in analyzers</p>
                <p className="text-xs text-slate-500">Receive samples in the Workload tab to begin machine testing.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProcessing.map((booking) => (
                  <div key={booking.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-900">{booking.id}</span>
                        <h4 className="font-bold text-slate-800 text-sm mt-0.5">{booking.patient.name}</h4>
                        <p className="text-xs text-slate-500">{booking.tests.map(t => t.name).join(', ')}</p>
                      </div>
                      <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                        ANALYZING
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                      <p className="text-slate-600">Barcode: <strong className="font-mono">{booking.sampleBarcode}</strong></p>
                      <p className="text-slate-600">Instrument: <strong>Sysmex XN-1000 / Cobas e411</strong></p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenAuthorizer(booking)}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4 text-cyan-200" />
                        Authorize Report
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Reject & remove specimen for order ${booking.id}?`)) {
                            deleteBooking(booking.id);
                          }
                        }}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold p-2 rounded-xl text-xs transition-colors cursor-pointer"
                        title="Reject & Delete Sample"
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: COMPLETED REPORTS ================= */}
        {activeLabTab === 'completed' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Released & Certified Diagnostic Reports</h3>
              <p className="text-xs text-slate-500">Official medical documentation signed and delivered to customer accounts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedReports.map((booking) => (
                <div key={booking.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono text-xs font-bold text-slate-900">{booking.report?.reportId}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">{booking.patient.name}</h4>
                      <p className="text-xs text-slate-500">{booking.tests.map(t => t.name).join(', ')}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      AUTHORIZED
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p>Signed By: <strong className="text-slate-800">{booking.report?.pathologistName}</strong></p>
                    <p className="text-slate-500">Released: {new Date(booking.report?.uploadedAt || '').toLocaleString()}</p>
                  </div>

                  <button
                    onClick={() => setReportToPreview(booking)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
                    Open Authorized Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SETTLEMENTS & EARNINGS ================= */}
        {activeLabTab === 'settlement' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Commercial Settlement & Payout Summary</h3>
              <p className="text-xs text-slate-500">Gross billing, 20% platform commission deduction, and net laboratory payout ledger</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Branch Gross Billings</span>
                <p className="text-3xl font-black text-slate-900 mt-1">
                  ₹{labBookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.finalAmount : sum), 0).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Total {labBookings.length} orders processed</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Platform Take ({currentLab.commissionRate}%)</span>
                <p className="text-3xl font-black text-slate-500 mt-1">
                  ₹{Math.round(labBookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.finalAmount : sum), 0) * (currentLab.commissionRate / 100)).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Marketing, phlebotomy logistics & IT</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-teal-700 uppercase">Net Laboratory Payout</span>
                <p className="text-3xl font-black text-teal-700 mt-1">
                  ₹{Math.round(labBookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.finalAmount : sum), 0) * (1 - currentLab.commissionRate / 100)).toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">Direct NEFT Bank Transfer scheduled</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: PROFILE & ACCREDITATION ================= */}
        {activeLabTab === 'profile' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Laboratory Facility Profile & Quality Audit</h3>
              <p className="text-xs text-slate-500">Official accreditation credentials and certified consulting pathologists</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Accreditation Body</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">NABL (ISO 15189:2022)</p>
                  <p className="text-teal-700 font-mono font-bold mt-1">Certificate #{currentLab.nablCode}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Chief Pathologist</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{currentLab.chiefPathologist}</p>
                  <p className="text-slate-600 font-mono mt-1">Medical Council: {currentLab.pathologistRegNo}</p>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-800">Physical Address & Specimen Reception:</p>
                <p className="text-slate-600">{currentLab.address}, {currentLab.city}</p>
                <p className="text-slate-600">Emergency & Escalation Phone: {currentLab.contactPhone}</p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-bold text-slate-800">Serving Pincode Cluster:</p>
                <p className="font-mono text-slate-600">{currentLab.servicePincodes.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Authorize & Release Report Modal */}
      {authorizingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <form
            onSubmit={handleAuthorizeAndRelease}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded">
                  Clinical Pathologist Sign-Off
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">
                  Authorize & Release NABL Report
                </h3>
                <p className="text-xs text-slate-500">
                  Patient: <strong className="text-slate-800">{authorizingBooking.patient.name}</strong> • Order {authorizingBooking.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAuthorizingBooking(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Test Parameters Observed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Test Results & Bio-marker Parameters ({customParams.length})
                </label>
                <span className="text-[11px] text-teal-700 font-medium">Auto-calibrated for age & sex</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto border border-slate-200 rounded-xl p-3 bg-slate-50/70">
                {customParams.map((param, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800 flex-1 truncate">{param.name}</span>
                    <input
                      type="text"
                      value={param.result}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomParams((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, result: val } : p))
                        );
                      }}
                      className="w-20 p-1 font-mono font-bold text-teal-800 border border-slate-300 rounded text-center outline-teal-600"
                    />
                    <span className="font-mono text-slate-500 text-[11px] w-28 truncate">{param.normalRange}</span>
                    <span className="text-slate-400 text-[10px] w-12">{param.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pathologist Clinical Interpretation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Clinical Pathologist Notes & Remarks
              </label>
              <textarea
                rows={2}
                value={clinicalRemarks}
                onChange={(e) => setClinicalRemarks(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600"
              />
            </div>

            {/* Pathologist Verification Credentials */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-teal-50/60 p-3.5 rounded-xl border border-teal-200">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Authorizing Pathologist (MD)</label>
                <input
                  type="text"
                  required
                  value={authorizerName}
                  onChange={(e) => setAuthorizerName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Medical Council Reg. No.</label>
                <input
                  type="text"
                  required
                  value={authorizerRegNo}
                  onChange={(e) => setAuthorizerRegNo(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-teal-800"
                />
              </div>
            </div>

            {/* Signed Electronically Upload File Option */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <UploadCloud className="w-4 h-4 text-teal-600" />
                  Signed Electronically File Upload Option (PDF / Document Scan)
                </label>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  NABL Digital Compliance
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="w-full sm:w-auto flex-1 cursor-pointer bg-white hover:bg-slate-100 border-2 border-dashed border-teal-300 rounded-xl p-3 text-center transition-all flex items-center justify-center gap-2 text-slate-700 font-semibold">
                  <UploadCloud className="w-4 h-4 text-teal-600" />
                  <span>{uploadedReportFileName ? 'Change Uploaded File' : 'Choose Signed Report File (PDF/Image)'}</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadedReportFileName && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-2 rounded-xl text-emerald-900 font-medium">
                    <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[200px] text-xs font-bold">{uploadedReportFileName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({Math.round((uploadedReportFileSize || 0) / 1024)} KB)</span>
                  </div>
                )}
              </div>

              {/* Electronic Signature Toggle & Hash */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 select-none">
                  <input
                    type="checkbox"
                    checked={isElectronicallySigned}
                    onChange={(e) => setIsElectronicallySigned(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  <span>Sign Electronically with Pathologist Digital Key</span>
                </label>

                <div className="font-mono text-[10px] text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  Crypto Hash: <strong>{signatureHash}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                ⚡ Customer will immediately receive electronic access to this certified report.
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthorizingBooking(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md shadow-teal-600/20 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  Sign & Release Report
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Report Viewer Modal */}
      <ReportViewerModal
        booking={reportToPreview}
        onClose={() => setReportToPreview(null)}
      />

      {/* Deep Link Modal */}
      <DeepLinkModal
        isOpen={showDeepLinkModal}
        onClose={() => setShowDeepLinkModal(false)}
      />

      {/* Lab Lock Modal */}
      <PortalLockModal
        isOpen={showLabLockModal}
        targetPortal="lab"
        onClose={() => setShowLabLockModal(false)}
        onSuccess={() => setShowLabLockModal(false)}
      />

      {/* Add Accredited Lab Partner Modal (All 50 Rajasthan Districts & Tehsils) */}
      {showAddLabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <form onSubmit={handleAddNewLab} className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Add Accredited Diagnostic Lab Partner</h3>
                  <p className="text-xs text-slate-500">Rajasthan 50 Districts & All Tehsils Coverage Hub</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowAddLabModal(false)} className="text-slate-400 hover:text-slate-700 font-bold p-1 cursor-pointer">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Lab Name & Accreditation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Laboratory Entity Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Diagnostics & Reference Labs"
                    value={newLabName}
                    onChange={(e) => setNewLabName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NABL Accreditation / License # *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NABL-MC-5590"
                    value={newLabNabl}
                    onChange={(e) => setNewLabNabl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Rajasthan Specific Hierarchy: District -> Tehsil -> Area */}
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-teal-900 text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    Select Rajasthan District, Sub-District & Tehsil Area:
                  </span>
                  <span className="text-[10px] font-bold bg-teal-200/70 text-teal-900 px-2 py-0.5 rounded-full">
                    All 50 Districts Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* District Dropdown (All 50) */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      1. District (जिला) — 50 Districts:
                    </label>
                    <select
                      value={selectedDistrictId}
                      onChange={(e) => {
                        const distId = e.target.value;
                        setSelectedDistrictId(distId);
                        const d = RAJASTHAN_DISTRICTS.find((item) => item.id === distId);
                        if (d && d.tehsils.length > 0) {
                          setSelectedTehsilName(d.tehsils[0].name);
                          setSelectedHubArea(d.tehsils[0].hubAreas[0] || 'Main Market');
                          setCustomPincode(d.tehsils[0].pincodePrefix || '302001');
                        }
                      }}
                      className="w-full p-2.5 bg-white border border-teal-300 rounded-xl outline-teal-600 text-xs font-bold text-slate-900"
                    >
                      {RAJASTHAN_DISTRICTS.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name} ({dist.hindiName}) — {dist.division} Division
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-District / Tehsil Dropdown */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      2. Sub-District / Tehsil (तहसील / उपखंड):
                    </label>
                    {(() => {
                      const curDist = RAJASTHAN_DISTRICTS.find((d) => d.id === selectedDistrictId) || RAJASTHAN_DISTRICTS[0];
                      return (
                        <select
                          value={selectedTehsilName}
                          onChange={(e) => {
                            const tName = e.target.value;
                            setSelectedTehsilName(tName);
                            const t = curDist.tehsils.find((item) => item.name === tName);
                            if (t) {
                              setSelectedHubArea(t.hubAreas[0] || 'Hospital Road Area');
                              setCustomPincode(t.pincodePrefix || '302001');
                            }
                          }}
                          className="w-full p-2.5 bg-white border border-teal-300 rounded-xl outline-teal-600 text-xs font-bold text-slate-900"
                        >
                          {curDist.tehsils.map((tehsil) => (
                            <option key={tehsil.name} value={tehsil.name}>
                              {tehsil.name} (Pin: {tehsil.pincodePrefix})
                            </option>
                          ))}
                        </select>
                      );
                    })()}
                  </div>
                </div>

                {/* Hub Area & Custom Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      3. Tehsil Diagnostic Hub / Sector:
                    </label>
                    {(() => {
                      const curDist = RAJASTHAN_DISTRICTS.find((d) => d.id === selectedDistrictId) || RAJASTHAN_DISTRICTS[0];
                      const curTehsil = curDist.tehsils.find((t) => t.name === selectedTehsilName) || curDist.tehsils[0];
                      return (
                        <select
                          value={selectedHubArea}
                          onChange={(e) => setSelectedHubArea(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs font-medium text-slate-800"
                        >
                          {curTehsil.hubAreas.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                          <option value="Other Area">Other / Custom Locality</option>
                        </select>
                      );
                    })()}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      4. Custom Locality / Street & Pincode:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Near Govt Hospital Road"
                        value={customAreaText}
                        onChange={(e) => setCustomAreaText(e.target.value)}
                        className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs"
                      />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Pincode"
                        value={customPincode}
                        onChange={(e) => setCustomPincode(e.target.value)}
                        className="w-24 p-2.5 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Complete Formatted Address Live Preview */}
                <div className="p-3 bg-white rounded-xl border border-teal-300 text-[11px] text-teal-950 space-y-1">
                  <span className="font-extrabold uppercase text-[10px] text-teal-700 tracking-wider block">
                    📍 Complete Onboarding Address Preview:
                  </span>
                  {(() => {
                    const curDist = RAJASTHAN_DISTRICTS.find((d) => d.id === selectedDistrictId) || RAJASTHAN_DISTRICTS[0];
                    const curTehsil = curDist.tehsils.find((t) => t.name === selectedTehsilName) || curDist.tehsils[0];
                    const curArea = customAreaText.trim() || selectedHubArea || 'Main Road Area';
                    const curPin = customPincode.trim() || curTehsil.pincodePrefix || '302001';
                    return (
                      <p className="font-semibold leading-relaxed">
                        <strong>{newLabName || 'Accredited Lab Center'}</strong>, {curArea}, {curTehsil.name} Tehsil,{' '}
                        {curDist.name} ({curDist.hindiName}), Rajasthan - {curPin}
                      </p>
                    );
                  })()}
                  <p className="text-[10px] text-slate-500 font-mono">
                    Official Contact Phone: <strong>+91 97837 70735</strong> • Service Pincode: {customPincode || '302001'}
                  </p>
                </div>
              </div>

              {/* Lab Tax & Legal Registrations: GST, MSME, Registration No */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold uppercase text-[10px] text-slate-600 tracking-wider block">
                  🛡️ Lab Tax & Government Registrations (GST / MSME / Reg No):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Lab GSTIN Number</label>
                    <input
                      type="text"
                      maxLength={15}
                      placeholder="08AAACL9829M1ZQ"
                      value={newLabGst}
                      onChange={(e) => setNewLabGst(e.target.value.toUpperCase())}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">MSME Udyam Number</label>
                    <input
                      type="text"
                      placeholder="UDYAM-RJ-14-0098234"
                      value={newLabMsme}
                      onChange={(e) => setNewLabMsme(e.target.value.toUpperCase())}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Clinical Est. Reg No</label>
                    <input
                      type="text"
                      placeholder="RAJ-CE-2026-88741"
                      value={newLabRegNo}
                      onChange={(e) => setNewLabRegNo(e.target.value.toUpperCase())}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Pathologist & Commission Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chief Pathologist (MD) Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajeshwari Meena, MD"
                    value={newLabPathologist}
                    onChange={(e) => setNewLabPathologist(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marketplace Commission Take (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    placeholder="20"
                    value={newLabCommission}
                    onChange={(e) => setNewLabCommission(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddLabModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Save & Register Lab Center
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
