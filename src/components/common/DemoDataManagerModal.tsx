import React, { useState } from 'react';
import {
  X,
  Database,
  RefreshCw,
  Sparkles,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  Building2,
  Users,
  FileCheck2,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useLabExpress } from '../../context/LabExpressContext';
import { PartnerLab, Booking, BookingStatus } from '../../types';

interface DemoDataManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoDataManagerModal: React.FC<DemoDataManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    bookings,
    labs,
    tests,
    packages,
    isDemoModeActive,
    setIsDemoModeActive,
    resetToDemoData,
    clearAllDemoData,
    addBooking: _unusedAddBooking,
    addLab,
    companyDetails
  } = useLabExpress() as any;

  const [notification, setNotification] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Preset 1: Full Rajasthan Network
  const handleSeedRajasthanNetwork = () => {
    setIsProcessing(true);
    const newLabs: Partial<PartnerLab>[] = [
      {
        id: `lab-rj-jodhpur-${Date.now()}`,
        name: 'Marwar Advanced Pathology & Histopathology Hub',
        code: 'MAP-JDH',
        nablCode: 'NABL-JDH-8821',
        rating: 4.9,
        reviewsCount: 312,
        address: 'Bhati Circle, Ratanada, Jodhpur, Rajasthan',
        city: 'Jodhpur',
        district: 'jodhpur',
        tehsil: 'Jodhpur',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Vikram Rathore, MD (Path)',
        pathologistRegNo: 'RMC-44912',
        servicePincodes: ['342001', '342003', '342006', '342011'],
        commissionRate: 18,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AABCM7712P1ZA',
        msmeNumber: 'UDYAM-RJ-15-0012984',
        turnaroundGuaranteedHours: 6,
        maxDailyCapacity: 450
      },
      {
        id: `lab-rj-kota-${Date.now()}`,
        name: 'Chambal Clinical Diagnostic Reference Lab',
        code: 'CCDL-KTA',
        nablCode: 'NABL-KTA-3392',
        rating: 4.8,
        reviewsCount: 245,
        address: 'Aerodrome Circle, Vigyan Nagar, Kota, Rajasthan',
        city: 'Kota',
        district: 'kota',
        tehsil: 'Ladpura',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Ananya Sharma, MD Pathology',
        pathologistRegNo: 'RMC-66231',
        servicePincodes: ['324005', '324007', '324009'],
        commissionRate: 20,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AAFCK3391K1ZX',
        msmeNumber: 'UDYAM-RJ-20-0083214',
        turnaroundGuaranteedHours: 6,
        maxDailyCapacity: 380
      },
      {
        id: `lab-rj-udaipur-${Date.now()}`,
        name: 'Mewar Central NABL Diagnostics & Imaging',
        code: 'MCD-UDR',
        nablCode: 'NABL-UDR-9104',
        rating: 4.9,
        reviewsCount: 420,
        address: 'Hospital Road, Chetak Circle, Udaipur, Rajasthan',
        city: 'Udaipur',
        district: 'udaipur',
        tehsil: 'Girwa',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Arvind Singhal, DCP, MD (Path)',
        pathologistRegNo: 'RMC-22340',
        servicePincodes: ['313001', '313002', '313004'],
        commissionRate: 15,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AACCM9104R1ZY',
        msmeNumber: 'UDYAM-RJ-26-0044591',
        turnaroundGuaranteedHours: 6,
        maxDailyCapacity: 500
      },
      {
        id: `lab-rj-bikaner-${Date.now()}`,
        name: 'Thar Regional Molecular Diagnostic Center',
        code: 'TRMDC-BKN',
        nablCode: 'NABL-BKN-1182',
        rating: 4.7,
        reviewsCount: 188,
        address: 'Sadul Colony, Kote Gate, Bikaner, Rajasthan',
        city: 'Bikaner',
        district: 'bikaner',
        tehsil: 'Bikaner',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Suresh Bhati, MBBS, MD Pathology',
        pathologistRegNo: 'RMC-55912',
        servicePincodes: ['334001', '334003'],
        commissionRate: 18,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AABBT1182L1ZT',
        msmeNumber: 'UDYAM-RJ-04-0019283',
        turnaroundGuaranteedHours: 8,
        maxDailyCapacity: 300
      },
      {
        id: `lab-rj-ajmer-${Date.now()}`,
        name: 'Ajaymeru Specialized Pathology & Biochemistry',
        code: 'ASP-AJM',
        nablCode: 'NABL-AJM-5520',
        rating: 4.8,
        reviewsCount: 290,
        address: 'Kacheri Road, Civil Lines, Ajmer, Rajasthan',
        city: 'Ajmer',
        district: 'ajmer',
        tehsil: 'Ajmer',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Neelam Mittal, MD (Pathology)',
        pathologistRegNo: 'RMC-38190',
        servicePincodes: ['305001', '305002', '305008'],
        commissionRate: 16,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AAAAS5520Q1ZU',
        msmeNumber: 'UDYAM-RJ-01-0028912',
        turnaroundGuaranteedHours: 6,
        maxDailyCapacity: 350
      },
      {
        id: `lab-rj-sikar-${Date.now()}`,
        name: 'Shekhawati Diagnostic & Hormone Research Lab',
        code: 'SDH-SKR',
        nablCode: 'NABL-SKR-7741',
        rating: 4.9,
        reviewsCount: 215,
        address: 'Station Road, Piprali Bypass, Sikar, Rajasthan',
        city: 'Sikar',
        district: 'sikar',
        tehsil: 'Sikar',
        state: 'Rajasthan',
        contactPhone: '+91 97837 70735',
        chiefPathologist: 'Dr. Rajesh Bhakar, MD',
        pathologistRegNo: 'RMC-77192',
        servicePincodes: ['332001', '332021'],
        commissionRate: 20,
        status: 'active',
        verifiedNabl: true,
        gstNumber: '08AABSS7741F1ZS',
        msmeNumber: 'UDYAM-RJ-23-0099182',
        turnaroundGuaranteedHours: 6,
        maxDailyCapacity: 400
      }
    ];

    newLabs.forEach((l) => {
      addLab(l as PartnerLab);
    });

    setIsProcessing(false);
    showFeedback('✅ Injected 6 Top Rajasthan Diagnostic Centers (Jodhpur, Kota, Udaipur, Bikaner, Ajmer, Sikar)!');
  };

  // Preset 2: Seed Quick Test Bookings with Live Statuses
  const handleSeedVolumeOrders = () => {
    setIsProcessing(true);
    try {
      const storedBookingsStr = localStorage.getItem('labexpress_v1_bookings');
      const currentList: Booking[] = storedBookingsStr ? JSON.parse(storedBookingsStr) : bookings;

      const cities = ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner'];
      const statuses: BookingStatus[] = ['confirmed', 'staff_assigned', 'sample_collected', 'received_at_lab', 'processing'];
      const sampleNames = ['Rameshwar Sharma', 'Sunita Choudhary', 'Govind Meena', 'Pooja Agarwal', 'Mahendra Singh Rathore'];

      const generated: Booking[] = sampleNames.map((name, idx) => {
        const id = `LX-${Math.floor(1000 + Math.random() * 9000)}-RJ`;
        const city = cities[idx % cities.length];
        const status = statuses[idx % statuses.length];
        const now = new Date(Date.now() - idx * 3600000).toISOString();

        return {
          id,
          createdAt: now,
          updatedAt: now,
          customerId: `cust-${Date.now()}-${idx}`,
          customerName: name,
          customerPhone: '+91 97837 70735',
          customerEmail: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
          patient: {
            id: `pat-${Date.now()}-${idx}`,
            name,
            age: 32 + idx * 8,
            gender: idx % 2 === 0 ? 'Male' : 'Female',
            relation: 'Self'
          },
          collectionType: 'home',
          address: {
            id: `addr-${idx}`,
            label: 'Home',
            street: `Sector ${idx + 2}, Main Market`,
            area: `${city} Central`,
            city,
            pincode: '302018'
          },
          appointmentDate: '2026-09-29',
          timeSlot: '07:00 AM - 07:30 AM',
          tests: [
            tests[0] || {
              id: 't-cbc',
              code: 'CBC-01',
              name: 'Complete Blood Count (CBC - 28 Parameters)',
              price: 299,
              originalPrice: 500,
              turnaroundTime: '6 Hours',
              fastTrackAvailable: true,
              sampleType: 'Blood',
              fastingRequired: false,
              preparationInstructions: [],
              description: 'Routine blood count test',
              parametersCount: 28,
              inclusions: ['Hemoglobin', 'TLC', 'DLC', 'Platelet Count'],
              department: 'Hematology'
            }
          ],
          totalAmount: 499,
          discountAmount: 100,
          collectionFee: 0,
          finalAmount: 399,
          paymentStatus: 'paid_online',
          paymentMethod: idx % 2 === 0 ? 'UPI (GPay / PhonePe)' : 'Bank Transfer (NEFT / IMPS)',
          paymentUtrNumber: `42689${Math.floor(1000000 + Math.random() * 9000000)}`,
          status,
          assignedLabId: labs[0]?.id || 'lab-apex',
          assignedLabName: labs[0]?.name || 'Apex Central Reference Pathology',
          timeline: [
            {
              status: 'confirmed',
              timestamp: now,
              title: 'Booking Confirmed via WhatsApp & Web',
              note: 'Customer selected home blood collection pickup.',
              actor: 'Patient'
            }
          ],
          isDemo: false,
          isCustom: true
        };
      });

      const updated = [...generated, ...currentList];
      localStorage.setItem('labexpress_v1_bookings', JSON.stringify(updated));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  // Preset 3: Seed 100% Authorized Digitally Signed Reports
  const handleSeedSignedReports = () => {
    setIsProcessing(true);
    try {
      const storedBookingsStr = localStorage.getItem('labexpress_v1_bookings');
      const currentList: Booking[] = storedBookingsStr ? JSON.parse(storedBookingsStr) : bookings;

      const updated = currentList.map((b) => {
        if (b.status === 'report_ready' && b.report?.signedElectronically) return b;
        return {
          ...b,
          status: 'report_ready' as BookingStatus,
          report: {
            reportId: `REP-${b.id}-AUTH`,
            uploadedAt: new Date().toISOString(),
            pathologistName: 'Dr. Sunita Deshmukh, MD (Pathology)',
            pathologistRegNo: 'RMC-48291/DEL',
            labNablCode: 'NABL-MC-5590',
            labName: b.assignedLabName || 'Apex Central Reference Pathology',
            status: 'authorized_final' as const,
            clinicalRemarks: 'All biochemical & hematological markers within expected physiological range. Clinically correlated and electronically approved.',
            qrVerificationCode: `VERIFY-LX-${b.id}-AUTH`,
            signedElectronically: true,
            signatureTimestamp: new Date().toISOString(),
            signatureHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            fileName: `Report_${b.id}_Signed.pdf`,
            fileSizeBytes: 245800,
            parameters: [
              { name: 'Hemoglobin (Hb)', result: '14.2', normalRange: '13.0 - 17.0', unit: 'g/dL', flag: 'normal' },
              { name: 'Fasting Blood Sugar', result: '92', normalRange: '70 - 99', unit: 'mg/dL', flag: 'normal' },
              { name: 'Serum Creatinine', result: '0.9', normalRange: '0.7 - 1.2', unit: 'mg/dL', flag: 'normal' },
              { name: 'Total Cholesterol', result: '175', normalRange: '< 200', unit: 'mg/dL', flag: 'normal' }
            ]
          }
        };
      });

      localStorage.setItem('labexpress_v1_bookings', JSON.stringify(updated));
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  // Export JSON Database
  const handleExportJSON = () => {
    const dataToExport = {
      exportedAt: new Date().toISOString(),
      companyDetails,
      totalBookings: bookings.length,
      totalLabs: labs.length,
      bookings,
      labs,
      tests,
      packages
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LabExpress_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showFeedback('💾 Complete Database Exported as JSON successfully!');
  };

  // Import JSON Database
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.bookings && Array.isArray(json.bookings)) {
          localStorage.setItem('labexpress_v1_bookings', JSON.stringify(json.bookings));
        }
        if (json.labs && Array.isArray(json.labs)) {
          localStorage.setItem('labexpress_v1_labs', JSON.stringify(json.labs));
        }
        if (json.companyDetails) {
          localStorage.setItem('labexpress_v1_company_details', JSON.stringify(json.companyDetails));
        }
        showFeedback('✅ Data restored from JSON backup! Reloading...');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Demo Data Manager (डेमो डेटा मैनेजर)
                </h3>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-teal-500/30 uppercase tracking-wider">
                  System Tools
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Manage test data scenarios, Rajasthan partner network, seed volume, & JSON backups
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

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-600 text-white font-bold text-xs p-3 px-5 flex items-center justify-between animate-in slide-in-from-top-2">
            <span>{notification}</span>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
          
          {/* Live System Data Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Bookings</span>
              <span className="text-xl font-black text-slate-900">{bookings.length}</span>
              <span className="text-[10px] text-teal-700 block font-semibold">Active in Queue</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Partner Labs</span>
              <span className="text-xl font-black text-slate-900">{labs.length}</span>
              <span className="text-[10px] text-indigo-700 block font-semibold">Rajasthan Hubs</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Catalog Tests</span>
              <span className="text-xl font-black text-slate-900">{tests.length}</span>
              <span className="text-[10px] text-cyan-700 block font-semibold">NABL Diagnostic</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Data Mode</span>
              <span className={`text-xs font-black block mt-1 uppercase ${isDemoModeActive ? 'text-amber-600' : 'text-emerald-600'}`}>
                {isDemoModeActive ? 'Demo Active' : 'Live / Custom'}
              </span>
              <button
                onClick={() => setIsDemoModeActive(!isDemoModeActive)}
                className="text-[10px] text-teal-700 underline font-bold mt-0.5 cursor-pointer"
              >
                Switch to {isDemoModeActive ? 'Live' : 'Demo'}
              </button>
            </div>
          </div>

          {/* 1-Click Scenario Presets */}
          <div>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>One-Click Demonstration Scenarios (1-क्लिक टेस्ट सिनेरियो)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Preset 1: Rajasthan Network */}
              <div className="p-3.5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-teal-700" />
                    <span className="font-bold text-slate-900">Seed All Rajasthan Labs</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Instantly populates NABL certified diagnostic hubs for Jodhpur, Kota, Udaipur, Bikaner, Ajmer, & Sikar with verified GST and MSME credentials.
                  </p>
                </div>
                <button
                  onClick={handleSeedRajasthanNetwork}
                  disabled={isProcessing}
                  className="mt-3 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Inject 6 Rajasthan Labs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset 2: High Volume Bookings */}
              <div className="p-3.5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-indigo-700" />
                    <span className="font-bold text-slate-900">Seed Active Patient Orders</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Generates 5 realistic patient appointments with diverse statuses (confirmed, sample collected, processing) across Rajasthan cities.
                  </p>
                </div>
                <button
                  onClick={handleSeedVolumeOrders}
                  disabled={isProcessing}
                  className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Generate 5 Sample Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset 3: E-Signature Reports */}
              <div className="p-3.5 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl border border-cyan-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileCheck2 className="w-4 h-4 text-cyan-700" />
                    <span className="font-bold text-slate-900">Authorize All Reports (Signed)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Marks orders as complete with authorized electronic signatures, SHA-256 integrity stamps, and downloadable diagnostic files.
                  </p>
                </div>
                <button
                  onClick={handleSeedSignedReports}
                  disabled={isProcessing}
                  className="mt-3 w-full py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Set 100% Reports Ready</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset 4: Factory Reset */}
              <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCw className="w-4 h-4 text-amber-700" />
                    <span className="font-bold text-slate-900">Reset Factory Defaults</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Re-seeds default initial state with balanced demo orders, diagnostic packages, and Rajasthan partner labs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Revert all bookings, labs, and catalog to initial factory demo state?')) {
                      resetToDemoData();
                      showFeedback('🔄 Reverted to factory demo data!');
                    }
                  }}
                  className="mt-3 w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <span>Reset All to Default</span>
                </button>
              </div>

            </div>
          </div>

          {/* Backup, Export & Clear Tools */}
          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-600" />
              <span>Backup, Restore & Clean Slate (डेटा बैकअप व रिस्टोर)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleExportJSON}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-all"
              >
                <Download className="w-4 h-4 text-teal-600" />
                <span>Export Backup (.JSON)</span>
              </button>

              <label className="p-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-all">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>Import Backup (.JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all demo data? This will switch to live empty mode.')) {
                    clearAllDemoData();
                    showFeedback('🧹 All demo data cleared. Clean slate activated.');
                  }
                }}
                className="p-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl font-bold text-red-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
                <span>Purge All Demo Data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">All changes sync immediately to browser LocalStorage.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
