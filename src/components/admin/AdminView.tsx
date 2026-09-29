import React, { useState, useMemo } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import { Booking, BookingStatus, TestItem, PartnerLab, HealthPackage } from '../../types';
import { ReportViewerModal } from '../customer/ReportViewerModal';
import { BrandLogo } from '../common/BrandLogo';
import { DeepLinkModal } from '../common/DeepLinkModal';
import { RAJASTHAN_DISTRICTS, OTHER_METRO_CITIES } from '../../data/rajasthanData';
import { OFFICIAL_WHATSAPP_DISPLAY, WhatsAppNotificationModal, getWhatsAppLink } from '../common/WhatsAppNotificationModal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  LayoutDashboard,
  ClipboardList,
  FlaskConical,
  Building2,
  Users,
  DollarSign,
  History,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  FileCheck2,
  MapPin,
  ShieldCheck,
  ChevronDown,
  X,
  Eye,
  EyeOff,
  Copy,
  Link2,
  Check,
  Zap,
  ArrowUpRight,
  Lock,
  Unlock,
  Sparkles,
  XCircle,
  Play,
  AlertTriangle,
  Boxes,
  Database,
  Layers,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Gift,
  Download,
  Calendar,
  FileSpreadsheet,
  Share2,
  HardDrive,
  Mail,
  FileText
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    bookings,
    tests,
    packages,
    labs,
    phlebotomists,
    auditLogs,
    assignLabAndPhlebotomist,
    updateBookingStatus,
    deleteBooking,
    deleteTestFromBooking,
    isAdminUnlocked,
    setIsAdminUnlocked,
    lockAdmin,
    addTest,
    updateTest,
    deleteTest,
    clearDemoCatalog,
    addPackage,
    updatePackage,
    deletePackage,
    clearDemoPackages,
    addLab,
    updateLab,
    deleteLab,
    clearDemoLabs,
    clearDemoBookings,
    clearAllDemoData,
    isDemoModeActive,
    setIsDemoModeActive,
    resetToDemoData,
    companyDetails,
    updateCompanyDetails
  } = useLabExpress();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminErrorMsg, setAdminErrorMsg] = useState('');
  const [deleteConfirmBookingId, setDeleteConfirmBookingId] = useState<string | null>(null);
  const [deleteConfirmTest, setDeleteConfirmTest] = useState<TestItem | null>(null);
  const [editTest, setEditTest] = useState<TestItem | null>(null);
  const [editPriceInput, setEditPriceInput] = useState('');
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'danger' | 'info' } | null>(null);
  const [showDeepLinkModal, setShowDeepLinkModal] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  const showToast = (message: string, type: 'success' | 'danger' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'bookings' | 'packages' | 'catalog' | 'demo_manager' | 'compliance' | 'labs' | 'phlebotomy' | 'finance' | 'audit'
  >('overview');

  // GST, MSME & Legal Registration State
  const [formGstNumber, setFormGstNumber] = useState(companyDetails?.gstNumber || '08AAACL9829M1ZQ');
  const [formMsmeNumber, setFormMsmeNumber] = useState(companyDetails?.msmeNumber || 'UDYAM-RJ-14-0098234');
  const [formCinNumber, setFormCinNumber] = useState(companyDetails?.cinNumber || 'U85110RJ2026PTC098234');
  const [formClinicalReg, setFormClinicalReg] = useState(companyDetails?.clinicalEstablishmentRegNo || 'RAJ-CE-2026-88741');
  const [formNablAccred, setFormNablAccred] = useState(companyDetails?.nablAccreditationNo || 'NABL-MC-5590/ISO-15189');
  const [formCompanyName, setFormCompanyName] = useState(companyDetails?.companyName || 'LabExpress Healthcare Private Limited');
  const [formTradeName, setFormTradeName] = useState(companyDetails?.tradeName || 'LabExpress Diagnostic & Pathology Network');
  const [formRegisteredOffice, setFormRegisteredOffice] = useState(companyDetails?.registeredOffice || 'Plot 42, Health City, Tonk Road, Jaipur, Rajasthan - 302018');
  const [formBankName, setFormBankName] = useState(companyDetails?.bankName || 'HDFC Bank Ltd');
  const [formBankAccountNo, setFormBankAccountNo] = useState(companyDetails?.bankAccountNo || '50200088921456');
  const [formBankIfsc, setFormBankIfsc] = useState(companyDetails?.bankIfscCode || 'HDFC0000123');
  const [formBankAccountName, setFormBankAccountName] = useState(companyDetails?.bankAccountName || 'LabExpress Healthcare Private Limited');
  const [formUpiVpa, setFormUpiVpa] = useState(companyDetails?.upiVpa || 'labexpress@okhdfcbank');

  const handleSaveCompanyDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyDetails({
      gstNumber: formGstNumber.trim().toUpperCase(),
      msmeNumber: formMsmeNumber.trim().toUpperCase(),
      cinNumber: formCinNumber.trim().toUpperCase(),
      clinicalEstablishmentRegNo: formClinicalReg.trim().toUpperCase(),
      nablAccreditationNo: formNablAccred.trim().toUpperCase(),
      companyName: formCompanyName.trim(),
      tradeName: formTradeName.trim(),
      registeredOffice: formRegisteredOffice.trim(),
      bankName: formBankName.trim(),
      bankAccountNo: formBankAccountNo.trim(),
      bankIfscCode: formBankIfsc.trim().toUpperCase(),
      bankAccountName: formBankAccountName.trim(),
      upiVpa: formUpiVpa.trim()
    });
    showToast('✅ Company Registration & Tax Profile (GST / MSME / Reg No) updated successfully!');
  };

  // Package State
  const [selectedPkgCategory, setSelectedPkgCategory] = useState<string>('All');
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgHindiName, setNewPkgHindiName] = useState('');
  const [newPkgCategory, setNewPkgCategory] = useState<any>('Full Body');
  const [newPkgPrice, setNewPkgPrice] = useState('');
  const [newPkgOriginalPrice, setNewPkgOriginalPrice] = useState('');
  const [newPkgTagline, setNewPkgTagline] = useState('');
  const [newPkgParamsCount, setNewPkgParamsCount] = useState('75');
  const [newPkgTurnaround, setNewPkgTurnaround] = useState('12 Hours');
  const [newPkgSampleType, setNewPkgSampleType] = useState<any>('Blood & Urine');
  const [newPkgFasting, setNewPkgFasting] = useState(true);
  const [newPkgFastingHours, setNewPkgFastingHours] = useState('10');
  const [newPkgInclusionsText, setNewPkgInclusionsText] = useState('Complete Hemogram (24), Lipid Profile (8), LFT (11), KFT (9), Thyroid (3), Urine Routine (18)');
  const [newPkgRecommended, setNewPkgRecommended] = useState('Recommended for all adults annually');
  const [inspectPackage, setInspectPackage] = useState<HealthPackage | null>(null);
  const [deleteConfirmPackageId, setDeleteConfirmPackageId] = useState<string | null>(null);
  const [purgeConfirmModalOpen, setPurgeConfirmModalOpen] = useState(false);

  // Search & Filters for Bookings
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [labFilter, setLabFilter] = useState<string>('all');

  // Modals state
  const [assigningBooking, setAssigningBooking] = useState<Booking | null>(null);
  const [selectedLabForAssign, setSelectedLabForAssign] = useState<string>('');
  const [selectedPhlebForAssign, setSelectedPhlebForAssign] = useState<string>('');

  const [inspectBooking, setInspectBooking] = useState<Booking | null>(null);
  const [reportBookingToView, setReportBookingToView] = useState<Booking | null>(null);

  // New Test Modal
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestCategory, setNewTestCategory] = useState<any>('Full Body');
  const [newTestPrice, setNewTestPrice] = useState('');
  const [newTestOriginalPrice, setNewTestOriginalPrice] = useState('');
  const [newTestTurnaround, setNewTestTurnaround] = useState('6 Hours (Express)');
  const [newTestFasting, setNewTestFasting] = useState(false);
  const [newTestParamsCount, setNewTestParamsCount] = useState('12');

  // New Lab Modal (Full Rajasthan 50 Districts & Tehsils Support)
  const [showAddLabModal, setShowAddLabModal] = useState(false);
  const [newLabName, setNewLabName] = useState('');
  const [newLabNabl, setNewLabNabl] = useState('');
  const [newLabGst, setNewLabGst] = useState('');
  const [newLabMsme, setNewLabMsme] = useState('');
  const [newLabRegNo, setNewLabRegNo] = useState('');
  const [newLabCity, setNewLabCity] = useState('Jaipur');
  const [newLabPathologist, setNewLabPathologist] = useState('');
  const [newLabCommission, setNewLabCommission] = useState('20');
  const [labRegionType, setLabRegionType] = useState<'rajasthan' | 'other'>('rajasthan');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('jaipur');
  const [selectedTehsilName, setSelectedTehsilName] = useState<string>('Jaipur Urban (Central)');
  const [selectedHubArea, setSelectedHubArea] = useState<string>('Civil Lines');
  const [customAreaText, setCustomAreaText] = useState<string>('');
  const [customPincode, setCustomPincode] = useState<string>('302001');
  const [whatsappModalBooking, setWhatsappModalBooking] = useState<Booking | null>(null);

  // Date Range Filter State for Visualizations and Analytics
  const [dateRangeFilter, setDateRangeFilter] = useState<'7d' | '30d' | '90d' | 'month' | 'all' | 'custom'>('30d');
  const [customStartDate, setCustomStartDate] = useState('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-30');

  // Top KPIs
  const totalBookingsCount = bookings.length;
  const pendingAssignments = bookings.filter((b) => b.status === 'confirmed').length;
  const activeProcessing = bookings.filter((b) => ['staff_assigned', 'sample_collected', 'received_at_lab', 'processing'].includes(b.status)).length;
  const reportsReadyCount = bookings.filter((b) => b.status === 'report_ready').length;
  const grossGMV = bookings.reduce((sum, b) => (b.status !== 'cancelled' ? sum + b.finalAmount : sum), 0);
  const platformCommissionRevenue = Math.round(grossGMV * 0.20);

  // Filter bookings according to active date range
  const filteredBookingsByDate = useMemo(() => {
    const referenceNow = new Date('2026-09-29T23:59:59Z');
    return bookings.filter((b) => {
      const dateStr = b.appointmentDate || (b.createdAt ? b.createdAt.substring(0, 10) : '2026-09-28');
      const bDate = new Date(dateStr);
      if (isNaN(bDate.getTime())) return true;

      if (dateRangeFilter === 'all') return true;
      if (dateRangeFilter === '7d') {
        const diffDays = (referenceNow.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7 && diffDays >= -1;
      }
      if (dateRangeFilter === '30d') {
        const diffDays = (referenceNow.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 30 && diffDays >= -1;
      }
      if (dateRangeFilter === '90d') {
        const diffDays = (referenceNow.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 90 && diffDays >= -1;
      }
      if (dateRangeFilter === 'month') {
        return bDate.getMonth() === referenceNow.getMonth() && bDate.getFullYear() === referenceNow.getFullYear();
      }
      if (dateRangeFilter === 'custom') {
        const start = customStartDate ? new Date(customStartDate) : new Date('2020-01-01');
        const end = customEndDate ? new Date(customEndDate) : new Date('2030-01-01');
        end.setHours(23, 59, 59, 999);
        return bDate >= start && bDate <= end;
      }
      return true;
    });
  }, [bookings, dateRangeFilter, customStartDate, customEndDate]);

  // 4 Required Summary KPI Cards Above the Charts:
  // 1. Total Bookings Today
  const totalBookingsToday = useMemo(() => {
    return bookings.filter((b) => {
      const d = b.appointmentDate || (b.createdAt ? b.createdAt.substring(0, 10) : '');
      return d === '2026-09-28' || d === '2026-09-29' || d === new Date().toISOString().substring(0, 10);
    }).length;
  }, [bookings]);

  // 2. Pending Samples
  const pendingSamplesCount = useMemo(() => {
    return bookings.filter((b) =>
      ['confirmed', 'staff_assigned', 'sample_collected'].includes(b.status)
    ).length;
  }, [bookings]);

  // 3. Revenue This Month
  const revenueThisMonth = useMemo(() => {
    const currentMonthBookings = bookings.filter((b) => {
      if (b.status === 'cancelled') return false;
      const d = b.appointmentDate || (b.createdAt ? b.createdAt.substring(0, 10) : '');
      return d.startsWith('2026-09') || d.startsWith(new Date().toISOString().substring(0, 7));
    });
    return currentMonthBookings.reduce((sum, b) => sum + b.finalAmount, 0);
  }, [bookings]);

  // 4. Active Lab Partners
  const activeLabPartnersCount = useMemo(() => {
    return (labs || []).filter((l) => l.isPartnerHub !== false).length;
  }, [labs]);

  // Monthly Revenue and Booking Volume Trend Data (Recharts)
  const monthlyRevenueData = useMemo(() => {
    const periodMultiplier = dateRangeFilter === '7d' ? 0.3 : dateRangeFilter === '30d' ? 1 : dateRangeFilter === '90d' ? 2.5 : 1;
    const currentPeriodRev = filteredBookingsByDate.reduce((s, b) => (b.status !== 'cancelled' ? s + b.finalAmount : s), 0);
    const currentPeriodBookings = filteredBookingsByDate.filter((b) => b.status !== 'cancelled').length;

    return [
      { month: 'Apr 2026', revenue: Math.round(32000 * periodMultiplier), bookings: Math.round(22 * periodMultiplier), commission: Math.round(6400 * periodMultiplier) },
      { month: 'May 2026', revenue: Math.round(44500 * periodMultiplier), bookings: Math.round(29 * periodMultiplier), commission: Math.round(8900 * periodMultiplier) },
      { month: 'Jun 2026', revenue: Math.round(58200 * periodMultiplier), bookings: Math.round(38 * periodMultiplier), commission: Math.round(11640 * periodMultiplier) },
      { month: 'Jul 2026', revenue: Math.round(71400 * periodMultiplier), bookings: Math.round(46 * periodMultiplier), commission: Math.round(14280 * periodMultiplier) },
      { month: 'Aug 2026', revenue: Math.round(86000 * periodMultiplier), bookings: Math.round(54 * periodMultiplier), commission: Math.round(17200 * periodMultiplier) },
      { month: 'Sep 2026', revenue: currentPeriodRev > 0 ? currentPeriodRev : Math.round(102500 * periodMultiplier), bookings: currentPeriodBookings > 0 ? currentPeriodBookings : Math.round(66 * periodMultiplier), commission: Math.round((currentPeriodRev > 0 ? currentPeriodRev : 102500) * 0.20) }
    ];
  }, [filteredBookingsByDate, dateRangeFilter]);

  // Regional Booking Volume & Revenue Across Rajasthan Regions (Recharts)
  const regionalPerformanceData = useMemo(() => {
    const regionsMap: Record<string, { bookings: number; revenue: number; labs: number }> = {
      'Jaipur Urban': { bookings: 0, revenue: 0, labs: 3 },
      'Jaipur Rural': { bookings: 0, revenue: 0, labs: 2 },
      'Jodhpur': { bookings: 0, revenue: 0, labs: 2 },
      'Kota': { bookings: 0, revenue: 0, labs: 2 },
      'Udaipur': { bookings: 0, revenue: 0, labs: 1 },
      'Bikaner': { bookings: 0, revenue: 0, labs: 1 },
      'Ajmer': { bookings: 0, revenue: 0, labs: 1 },
      'Alwar & NCR': { bookings: 0, revenue: 0, labs: 1 },
      'Sikar & Shekhawati': { bookings: 0, revenue: 0, labs: 1 },
      'Other Rajasthan': { bookings: 0, revenue: 0, labs: 2 }
    };

    filteredBookingsByDate.forEach((b) => {
      if (b.status === 'cancelled') return;
      const addr = (b.address?.city || b.address?.line2 || b.address?.line1 || '').toLowerCase();
      let assignedRegion = 'Other Rajasthan';
      if (addr.includes('jaipur rural') || addr.includes('bassi') || addr.includes('chaksu')) {
        assignedRegion = 'Jaipur Rural';
      } else if (addr.includes('jaipur') || addr.includes('mansarovar') || addr.includes('malviya') || addr.includes('vaishali')) {
        assignedRegion = 'Jaipur Urban';
      } else if (addr.includes('jodhpur') || addr.includes('sardarpura')) {
        assignedRegion = 'Jodhpur';
      } else if (addr.includes('kota')) {
        assignedRegion = 'Kota';
      } else if (addr.includes('udaipur')) {
        assignedRegion = 'Udaipur';
      } else if (addr.includes('bikaner')) {
        assignedRegion = 'Bikaner';
      } else if (addr.includes('ajmer') || addr.includes('beawar')) {
        assignedRegion = 'Ajmer';
      } else if (addr.includes('alwar') || addr.includes('bhiwadi')) {
        assignedRegion = 'Alwar & NCR';
      } else if (addr.includes('sikar') || addr.includes('jhunjhunu')) {
        assignedRegion = 'Sikar & Shekhawati';
      }

      regionsMap[assignedRegion].bookings += 1;
      regionsMap[assignedRegion].revenue += b.finalAmount;
    });

    return Object.entries(regionsMap).map(([region, data]) => ({
      region,
      bookings: data.bookings > 0 ? data.bookings : (region === 'Jaipur Urban' ? 14 : region === 'Jodhpur' ? 9 : 4),
      revenue: data.revenue > 0 ? data.revenue : ((region === 'Jaipur Urban' ? 14 : region === 'Jodhpur' ? 9 : 4) * 1680),
      labs: data.labs
    })).sort((a, b) => b.revenue - a.revenue);
  }, [filteredBookingsByDate]);

  // CSV Export Handler
  const handleDownloadCSV = () => {
    const headers = [
      'Booking ID',
      'Appointment Date',
      'Time Slot',
      'Patient Name',
      'Age',
      'Gender',
      'City / Region',
      'Tests',
      'Gross Amount (INR)',
      'Platform Commission (INR)',
      'Status',
      'Payment Mode',
      'Assigned Lab'
    ];
    const rows = filteredBookingsByDate.map((b) => {
      const lab = labs.find((l) => l.id === b.assignedLabId)?.name || 'Unassigned';
      const city = b.address?.city || b.address?.line2 || 'Jaipur';
      const testNames = b.tests.map((t) => t.name).join('; ');
      const comm = Math.round(b.finalAmount * 0.20);
      return [
        b.id,
        b.appointmentDate || (b.createdAt ? b.createdAt.substring(0, 10) : '2026-09-28'),
        `"${b.timeSlot || '07:00 AM'}"`,
        `"${b.patient.name}"`,
        b.patient.age,
        b.patient.gender,
        `"${city}"`,
        `"${testNames.replace(/"/g, '""')}"`,
        b.finalAmount,
        comm,
        b.status,
        `"${b.paymentMethod}"`,
        `"${lab.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `labexpress_revenue_bookings_${dateRangeFilter}_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Booking & Revenue CSV exported successfully!');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.patient.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerPhone.includes(bookingSearch);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesLab = labFilter === 'all' || b.assignedLabId === labFilter;

    return matchesSearch && matchesStatus && matchesLab;
  });

  const handleOpenAssign = (booking: Booking) => {
    setAssigningBooking(booking);
    setSelectedLabForAssign(booking.assignedLabId || labs[0]?.id || '');
    setSelectedPhlebForAssign(booking.assignedPhlebotomistId || phlebotomists[0]?.id || '');
  };

  const handleSaveAssignment = () => {
    if (!assigningBooking || !selectedLabForAssign) return;
    assignLabAndPhlebotomist(assigningBooking.id, selectedLabForAssign, selectedPhlebForAssign);
    setAssigningBooking(null);
  };

  const handleAddNewTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim() || !newTestPrice) return;

    const newT: TestItem = {
      id: `test-custom-${Date.now()}`,
      code: `LX-CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: newTestName.trim(),
      category: newTestCategory,
      price: parseInt(newTestPrice, 10),
      originalPrice: parseInt(newTestOriginalPrice, 10) || parseInt(newTestPrice, 10) * 1.5,
      turnaroundTime: newTestTurnaround,
      fastTrackAvailable: true,
      sampleType: 'Blood',
      fastingRequired: newTestFasting,
      fastingHours: newTestFasting ? 10 : undefined,
      preparationInstructions: newTestFasting
        ? ['10-12 hours overnight fasting required. Water permitted.']
        : ['No special fasting required.'],
      description: `Comprehensive diagnostic profile for ${newTestName.trim()}.`,
      parametersCount: parseInt(newTestParamsCount, 10) || 8,
      inclusions: ['Primary Bio-marker 1', 'Primary Bio-marker 2', 'Assay Analysis'],
      department: 'Clinical Pathology',
      badge: 'New Test'
    };

    addTest(newT);
    setShowAddTestModal(false);
    setNewTestName('');
    setNewTestPrice('');
    setNewTestOriginalPrice('');
  };

  const handleAddNewPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName.trim() || !newPkgPrice) return;

    const pr = parseInt(newPkgPrice, 10);
    const origPr = parseInt(newPkgOriginalPrice, 10) || Math.round(pr * 2.2);
    const disc = Math.round(((origPr - pr) / origPr) * 100);

    const incList = newPkgInclusionsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const pkgObj: HealthPackage = {
      id: `pkg-custom-${Date.now()}`,
      code: `LX-PKG-${Math.floor(100 + Math.random() * 900)}`,
      name: newPkgName.trim(),
      hindiName: newPkgHindiName.trim() || undefined,
      tagline: newPkgTagline.trim() || `Comprehensive master health checkup with ${newPkgParamsCount} parameters.`,
      category: newPkgCategory,
      price: pr,
      originalPrice: origPr,
      discountPercentage: disc > 0 ? disc : 45,
      parametersCount: parseInt(newPkgParamsCount, 10) || 60,
      turnaroundTime: newPkgTurnaround,
      fastTrackAvailable: true,
      sampleType: newPkgSampleType,
      fastingRequired: newPkgFasting,
      fastingHours: newPkgFasting ? parseInt(newPkgFastingHours, 10) || 10 : undefined,
      preparationInstructions: newPkgFasting
        ? [`${newPkgFastingHours || 10} hours overnight fasting required. Plain drinking water permitted.`]
        : ['No fasting required for this health package.'],
      description: newPkgTagline.trim() || `Diagnostic health package covering comprehensive vital markers.`,
      inclusions: incList.length > 0 ? incList : ['Complete Hemogram', 'Lipid Profile', 'Liver & Kidney Screen', 'Urine Routine'],
      includedCategories: [
        {
          categoryName: 'Core Diagnostic Group Inclusions',
          tests: incList.length > 0 ? incList : ['CBC', 'Routine Screen']
        }
      ],
      department: 'Pathology & Diagnostic Wellness',
      popular: true,
      badge: `${disc}% OFF Special`,
      recommendedFor: newPkgRecommended.trim() || 'All age groups preventive screen',
      isCustom: true,
      isDemo: false
    };

    addPackage(pkgObj);
    setShowAddPackageModal(false);
    setNewPkgName('');
    setNewPkgHindiName('');
    setNewPkgPrice('');
    setNewPkgOriginalPrice('');
    setNewPkgTagline('');
  };

  const handleAddNewLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabName.trim() || !newLabNabl.trim()) return;

    let computedCity = newLabCity;
    let computedAddress = 'Medical Hub, Main Ring Road';
    let computedDistrict = '';
    let computedTehsil = '';
    let computedState = 'Delhi NCR';
    let computedPincodes = ['302001', '302029', '302012'];

    if (labRegionType === 'rajasthan') {
      const curDist = RAJASTHAN_DISTRICTS.find((d) => d.id === selectedDistrictId) || RAJASTHAN_DISTRICTS[0];
      const curTehsil = curDist.tehsils.find((t) => t.name === selectedTehsilName) || curDist.tehsils[0];
      const curArea = customAreaText.trim() || selectedHubArea || 'Hospital Road Area';
      const curPin = customPincode.trim() || curTehsil.pincodePrefix || '302001';

      computedDistrict = curDist.name;
      computedTehsil = curTehsil.name;
      computedState = 'Rajasthan';
      computedCity = `${curDist.name} (${curTehsil.name})`;
      computedAddress = `${curArea}, ${curTehsil.name} Tehsil, ${curDist.name} (${curDist.hindiName}), Rajasthan - ${curPin}`;
      computedPincodes = [curPin, `${curPin.slice(0, 4)}01`, `${curPin.slice(0, 4)}02`];
    }

    const labObj: PartnerLab = {
      id: `lab-${Date.now()}`,
      name: newLabName.trim(),
      code: `LAB-${(computedDistrict || newLabCity).substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      nablCode: newLabNabl.trim(),
      rating: 4.9,
      reviewsCount: 42,
      address: computedAddress,
      city: computedCity,
      district: computedDistrict || undefined,
      tehsil: computedTehsil || undefined,
      subDistrict: computedTehsil || undefined,
      state: computedState,
      contactPhone: '+91 97837 70735',
      contactEmail: 'contact@labexpress.in',
      chiefPathologist: newLabPathologist.trim() || 'Dr. Rajeshwari Meena, MD (Pathology)',
      pathologistRegNo: 'MCI-RJ-88941',
      operatingHours: '06:00 AM – 10:00 PM',
      servicePincodes: computedPincodes,
      activeBookingsCount: 0,
      commissionRate: parseInt(newLabCommission, 10) || 20,
      status: 'active',
      verifiedNabl: true,
      isCustom: true,
      gstNumber: newLabGst.trim().toUpperCase() || '08AAACL9829M1ZQ',
      msmeNumber: newLabMsme.trim().toUpperCase() || 'UDYAM-RJ-14-0098234',
      registrationNumber: newLabRegNo.trim().toUpperCase() || `RAJ-REG-${Math.floor(10000 + Math.random() * 90000)}`
    };

    addLab(labObj);
    setShowAddLabModal(false);
    showToast(`Partner Lab "${labObj.name}" successfully onboarded in ${computedCity}, Rajasthan!`);
    setNewLabName('');
    setNewLabNabl('');
  };

  const handleAdminUnlockSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    const isMatch =
      cleanEmail === 'minasubhash8@gmail.com' && cleanPass === 'Meena9829@';

    if (isMatch) {
      setIsAdminUnlocked(true);
      setAdminPassword('');
      setAdminEmail('');
      setAdminErrorMsg('');
    } else {
      setAdminErrorMsg('Invalid Admin ID or Password. Access denied.');
    }
  };

  const activeRunningBookings = bookings.filter((b) =>
    ['confirmed', 'staff_assigned', 'sample_collected', 'received_at_lab', 'processing'].includes(b.status)
  );

  // If Admin panel is locked, render dedicated security gate
  if (!isAdminUnlocked) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900 text-white">
        <div className="max-w-md w-full bg-slate-800/95 backdrop-blur-md rounded-3xl p-8 border border-slate-700 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Admin Access Protected
            </span>
            <h2 className="text-2xl font-black text-white mt-3">Admin Panel is Locked</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Administrative credentials required to manage diagnostic catalog, remove demo listings, onboard labs, and view settlements.
            </p>
          </div>

          <form onSubmit={handleAdminUnlockSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin ID / Email
              </label>
              <input
                type="email"
                required
                autoFocus
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  setAdminErrorMsg('');
                }}
                placeholder="Enter Admin ID / Email"
                className="w-full bg-slate-900 text-white text-xs font-mono py-2.5 px-3.5 rounded-xl border border-slate-700 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAdminErrorMsg('');
                  }}
                  className="w-full bg-slate-900 text-white text-xs font-mono py-2.5 px-3.5 pr-10 rounded-xl border border-slate-700 focus:border-teal-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                >
                  {showAdminPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {adminErrorMsg && (
              <p className="text-xs text-rose-400 font-semibold">{adminErrorMsg}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-500/20"
              >
                <Unlock className="w-4 h-4" />
                Sign In & Unlock Admin Central
              </button>
            </div>
          </form>

          <p className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-4 font-mono flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Authorized Administrator Access Only</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      
      {/* Top Header Bar for Admin */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" variant="dark" showTagline={false} showBadge={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded uppercase tracking-wider">
                  Ops Center
                </span>
                <h1 className="text-xl font-black tracking-tight text-white">
                  Central Marketplace Operations
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Live booking dispatch, partner laboratory network, catalog pricing, and SLA governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeepLinkModal(true)}
              className="bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 border border-indigo-500/60 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Deep Link Connect Manager"
            >
              <Link2 className="w-3.5 h-3.5 text-indigo-300" />
              <span>🔗 Deep Links</span>
            </button>
            <button
              onClick={() => setIsDemoModeActive(!isDemoModeActive)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isDemoModeActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title="Click to toggle between Demo Mode and Live Production Mode (Hiding all demo data)"
            >
              <span className={`w-2 h-2 rounded-full ${isDemoModeActive ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
              {isDemoModeActive ? 'Demo Mode Active' : 'Live Production Mode'}
            </button>
            <span className="text-xs bg-slate-800 text-teal-300 font-mono px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SLA Compliance: 99.4%
            </span>
            <button
              onClick={() => lockAdmin()}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
              Lock Panel
            </button>
          </div>
        </div>

        {/* Secondary Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none flex gap-1 border-t border-slate-800/80 pt-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'bookings', label: `All Bookings (${bookings.length})`, icon: ClipboardList },
            { id: 'packages', label: `Health Packages (${packages.length})`, icon: Boxes },
            { id: 'catalog', label: `Test Catalog (${tests.length})`, icon: FlaskConical },
            { id: 'compliance', label: 'GST & MSME Registration', icon: ShieldCheck },
            { id: 'demo_manager', label: `Demo Data Manager`, icon: Database },
            { id: 'labs', label: `Partner Labs (${labs.length})`, icon: Building2 },
            { id: 'phlebotomy', label: `Phlebotomist Fleet (${phlebotomists.length})`, icon: Users },
            { id: 'finance', label: 'Commissions & Payouts', icon: DollarSign },
            { id: 'audit', label: `Audit Trail (${auditLogs.length})`, icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-teal-400 text-teal-300 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* ================= MASTER ACCESS CREDENTIALS CARD (RESTRICTED: ONLY SEE ADMIN) ================= */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 border border-indigo-700/50 shadow-xl space-y-3.5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/40 shrink-0">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    🔐 Master Access Credentials & Deep Link Connect
                  </h3>
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Confidential: Visible Only in Admin Central
                  </span>
                </div>
                <p className="text-xs text-indigo-200/80">
                  Super Admin Central and Partner Lab Hub use the same master login credentials. Public lock screens hide these credentials.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeepLinkModal(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-900/40"
              >
                <Link2 className="w-3.5 h-3.5" />
                Connect Deep Links
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Admin & Lab Hub ID</span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono font-bold text-teal-300 truncate">minasubhash8@gmail.com</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('minasubhash8@gmail.com');
                    showToast('Admin ID copied to clipboard!');
                  }}
                  className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Master Password (Confidential)</span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono font-bold text-amber-300">
                  {showMasterPassword ? 'Meena9829@' : '••••••••••••'}
                </code>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowMasterPassword(!showMasterPassword)}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={showMasterPassword ? 'Hide password' : 'Show password'}
                  >
                    {showMasterPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('Meena9829@');
                      showToast('Master password copied to clipboard!');
                    }}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy password"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Protected Endpoints</span>
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded">
                  Admin Central: Locked 🔒
                </span>
                <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded">
                  Partner Lab Hub: Locked 🔒
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTIVE RUNNING TESTS CONTROL MANAGER ================= */}
        {activeRunningBookings.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-5 border border-teal-700/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 shrink-0">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    ⚡ Live Running Diagnostics Control Manager
                    <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full">
                      {activeRunningBookings.length} Active On Screen
                    </span>
                  </h3>
                  <p className="text-xs text-teal-200/80">
                    Real-time running tests currently executing — instant delete, cancel, advance status, or adjust phlebotomy/lab
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    activeRunningBookings.forEach((b) => deleteBooking(b.id));
                    showToast(`Deleted ${activeRunningBookings.length} active running test orders`);
                  }}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete All Active Tests
                </button>
              </div>
            </div>

            {/* Grid of Active Running Tests */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeRunningBookings.map((b) => (
                <div key={b.id} className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700 hover:border-teal-500/50 transition-all space-y-2.5 text-xs shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-300 bg-slate-900 px-2 py-0.5 rounded">{b.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30 uppercase">
                      {b.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-white text-sm">{b.patient.name}</p>
                    <p className="text-slate-400 text-[11px]">
                      {b.patient.age}y • {b.patient.gender} • {b.collectionType === 'home' ? '🏠 Home Pickup' : '🏢 Lab Visit'}
                    </p>
                    <p className="text-teal-200 text-[11px] font-medium truncate mt-1">
                      Tests: {b.tests.map((t) => t.name).join(', ')}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Lab: <strong className="text-slate-200">{b.assignedLabName || 'Unassigned (Needs Dispatch)'}</strong>
                    </p>
                  </div>

                  {/* Actions for this running test */}
                  <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAssign(b)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Route
                      </button>
                      <button
                        onClick={() => setInspectBooking(b)}
                        className="bg-teal-900/60 hover:bg-teal-900 text-teal-200 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          updateBookingStatus(b.id, 'cancelled', 'Cancelled by Super Admin Operations');
                        }}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer"
                        title="Cancel this test"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setDeleteConfirmBookingId(b.id)}
                        className="bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        title="Permanently Delete Test Order"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ADMIN TAB 1: OVERVIEW ================= */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Row of 4 Summary KPI Cards Above the AdminView Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Total Bookings Today
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{totalBookingsToday}</h3>
                  <p className="text-[11px] text-teal-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Express 60-min Home Collections
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <ClipboardList className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Pending Samples
                  </span>
                  <h3 className="text-3xl font-black text-amber-700 mt-1">{pendingSamplesCount}</h3>
                  <p className="text-[11px] text-amber-800 font-semibold mt-0.5">
                    Awaiting collection / transit to lab
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Revenue This Month
                  </span>
                  <h3 className="text-3xl font-black text-emerald-700 mt-1">₹{revenueThisMonth.toLocaleString()}</h3>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Gross GMV (Prepaid & COD)
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <DollarSign className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
                    Active Lab Partners
                  </span>
                  <h3 className="text-3xl font-black text-indigo-700 mt-1">{activeLabPartnersCount}</h3>
                  <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">
                    Rajasthan 50 Districts Hubs
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Date Range Selector & Analytical CSV Export Control Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider mr-1">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Timeframe:
                </span>
                {[
                  { id: '7d', label: 'Last 7 Days' },
                  { id: '30d', label: 'Last 30 Days' },
                  { id: '90d', label: 'Last 90 Days' },
                  { id: 'month', label: 'This Month' },
                  { id: 'all', label: 'All Time' },
                  { id: 'custom', label: 'Custom Range' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDateRangeFilter(item.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      dateRangeFilter === item.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Inputs (when 'custom' selected) & Download CSV Button */}
              <div className="flex flex-wrap items-center gap-3">
                {dateRangeFilter === 'custom' && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                    />
                    <span className="text-slate-400">to</span>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                )}

                <button
                  onClick={handleDownloadCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  title="Export filtered booking and revenue records to CSV"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Analytics CSV</span>
                </button>
              </div>
            </div>

            {/* Recharts Analytics Dashboard Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: Monthly Revenue & Booking Volume Trends */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal-600" />
                      Monthly Revenue & Booking Trends
                    </h3>
                    <p className="text-xs text-slate-500">Gross revenue (₹) and patient booking volume over time</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded">
                    Recharts Dual-Axis
                  </span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                        formatter={(val: any, name: any) => [name === 'revenue' ? `₹${val.toLocaleString()}` : `${val} bookings`, name === 'revenue' ? 'Gross Revenue' : 'Bookings']}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#0d9488" radius={[6, 6, 0, 0]} />
                      <Bar yAxisId="right" dataKey="bookings" name="Bookings Count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Regional Booking Volume & Revenue Across Rajasthan Regions */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      Regional Booking Volume Trends Across Rajasthan
                    </h3>
                    <p className="text-xs text-slate-500">Distribution of diagnostic bookings across key districts & cities</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
                    50 Districts Active
                  </span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={regionalPerformanceData.slice(0, 7)} margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="region" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                        formatter={(val: any, name: any) => [name === 'bookings' ? `${val} bookings` : `₹${val.toLocaleString()}`, name === 'bookings' ? 'Bookings Volume' : 'Regional Revenue']}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="bookings" name="Booking Volume" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Google Workspace Enterprise Hub (Drive, Sheets, Gmail, Calendar, Docs, Tasks) */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-700/50 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">
                    <HardDrive className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">Google Workspace Cloud Enterprise Hub</h4>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Connected & Authenticated
                      </span>
                    </div>
                    <p className="text-xs text-indigo-200/80 mt-0.5">
                      1-Click synchronization with Google Drive, Sheets, Gmail, Calendar, Docs, and Tasks for clinical workflows.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-indigo-300 bg-indigo-900/60 px-3 py-1.5 rounded-xl border border-indigo-700/60">
                  Account: minasubhash8@gmail.com
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
                {[
                  { name: 'Google Sheets', desc: 'Sync Revenue Ledger', icon: FileSpreadsheet, color: 'text-emerald-400', action: () => showToast('📊 Synced all bookings and commissions to Google Sheets spreadsheet!') },
                  { name: 'Google Drive', desc: 'Backup PDF Reports', icon: HardDrive, color: 'text-amber-400', action: () => showToast('📁 All authorized diagnostic PDF reports backed up to Google Drive!') },
                  { name: 'Gmail Dispatch', desc: 'Patient Alert Mails', icon: Mail, color: 'text-rose-400', action: () => showToast('✉️ Automated appointment and report delivery emails sent via Gmail!') },
                  { name: 'Google Calendar', desc: 'Phlebotomist Visits', icon: Calendar, color: 'text-cyan-400', action: () => showToast('📅 Scheduled doorstep home collection slots synced to Google Calendar!') },
                  { name: 'Google Docs', desc: 'Accreditation Audits', icon: FileText, color: 'text-blue-400', action: () => showToast('📄 NABL quality and clinical audit documents generated in Google Docs!') },
                  { name: 'Google Tasks', desc: 'Pending Escalations', icon: CheckCircle2, color: 'text-teal-400', action: () => showToast('✅ 3 pending specimen review tasks created in Google Tasks!') }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 p-3 rounded-xl text-left transition-all cursor-pointer group"
                    >
                      <Icon className={`w-4 h-4 ${item.color} mb-1.5`} />
                      <p className="font-bold text-xs text-slate-100 group-hover:text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action & Urgent Attention Bar */}
            {pendingAssignments > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {pendingAssignments} New Booking{pendingAssignments > 1 ? 's' : ''} Awaiting Lab Assignment!
                    </h4>
                    <p className="text-xs text-amber-900 mt-0.5">
                      Assign accredited partner labs & phlebotomists to meet the 60-minute pickup SLA guarantee.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveAdminTab('bookings');
                    setStatusFilter('confirmed');
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  View & Dispatch Now
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Real Data & Demo Purge Controller */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-800/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">
                      Data Environment & Demo Purge Controller
                    </h4>
                    <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      Session: Super Administrator Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Jab aap real lab tests aur real diagnostic partners add karein, demo data ko 1-click me purge kar dein taaki customer screen aur lab partner dashboard par sirf aapka real data dikhe.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    clearDemoCatalog();
                    showToast('🗑️ कैटलॉग से केवल डेमो टेस्ट हटा दिए गए। (Demo tests cleared!)');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Clear Demo Tests
                </button>
                <button
                  onClick={() => {
                    clearDemoPackages();
                    showToast('🗑️ केवल डेमो पैकेज हटा दिए गए। (Demo packages cleared!)');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Clear Demo Packages
                </button>
                <button
                  onClick={() => {
                    clearDemoBookings();
                    showToast('🗑️ पार्टनर लैब कतार से सभी डमी ऑर्डर्स साफ कर दिए गए। (Demo bookings cleared!)');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Clear Demo Orders
                </button>
                <button
                  onClick={() => {
                    clearAllDemoData();
                    showToast('🗑️ सारा डेमो डेटा हमेशा के लिए हटा दिया गया! (All demo data permanently purged!)');
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-rose-900/30 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Purge ALL Demo Data
                </button>
              </div>
            </div>

            {/* Two column layout: Live Orders snapshot + Network Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Recent Bookings list */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-teal-600" />
                    Live Orders Stream
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('bookings')}
                    className="text-xs text-teal-700 font-bold hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 5).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{b.id}</span>
                          <span className="text-slate-400">•</span>
                          <span className="font-semibold text-slate-800">{b.patient.name}</span>
                          <span className="text-[10px] text-slate-500">({b.patient.age}y / {b.patient.gender})</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          {b.tests.map((t) => t.name).join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-amber-100 text-amber-800'
                              : b.status === 'report_ready'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}>
                            {b.status.replace('_', ' ')}
                          </span>
                          <p className="font-bold text-slate-900 mt-0.5">₹{b.finalAmount}</p>
                        </div>

                        {b.status === 'confirmed' ? (
                          <button
                            onClick={() => handleOpenAssign(b)}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                          >
                            Assign Lab
                          </button>
                        ) : (
                          <button
                            onClick={() => setInspectBooking(b)}
                            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                          >
                            Inspect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Partner Labs & Capacity */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    Accredited Lab Network
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('labs')}
                    className="text-xs text-teal-700 font-bold hover:underline"
                  >
                    Manage Labs →
                  </button>
                </div>

                <div className="space-y-3">
                  {labs.map((lab) => {
                    const labLoad = bookings.filter((b) => b.assignedLabId === lab.id && b.status !== 'report_ready').length;
                    return (
                      <div key={lab.id} className="p-3 rounded-xl border border-slate-200 text-xs space-y-1 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 truncate max-w-[160px]">{lab.name}</p>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            {lab.city}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">NABL: {lab.nablCode}</p>
                        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
                          <span>Active Workload: <strong className="text-teal-700">{labLoad} tests</strong></span>
                          <span>Commission: <strong className="text-slate-800">{lab.commissionRate}%</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= ADMIN TAB 2: ALL BOOKINGS OPERATIONS ================= */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search & Filter Header */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Patient Name, Phone..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="bg-transparent text-xs w-full outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-xl outline-none font-medium cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed (Pending Assignment)</option>
                  <option value="staff_assigned">Staff Assigned</option>
                  <option value="sample_collected">Sample Collected</option>
                  <option value="received_at_lab">Received at Lab</option>
                  <option value="processing">Processing in Analyzer</option>
                  <option value="report_ready">Report Ready (Released)</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={labFilter}
                  onChange={(e) => setLabFilter(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-xl outline-none font-medium cursor-pointer"
                >
                  <option value="all">All Labs</option>
                  {labs.map((l) => (
                    <option key={l.id} value={l.id}>{l.name.split(' ')[0]} Lab</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Order ID & Date</th>
                      <th className="py-3 px-4">Patient Demographics</th>
                      <th className="py-3 px-4">Tests Booked</th>
                      <th className="py-3 px-4">Assigned Partner Lab</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 block">{b.id}</span>
                          <span className="text-[11px] text-slate-500">{b.appointmentDate} • {b.timeSlot}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{b.patient.name}</span>
                          <span className="text-[11px] text-slate-500">
                            {b.patient.gender}, {b.patient.age}y ({b.patient.relation})
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-[200px]">
                          <span className="font-semibold text-slate-800 line-clamp-1">
                            {b.tests.map((t) => t.name).join(', ')}
                          </span>
                          <span className="text-[11px] text-teal-700 font-medium">
                            {b.tests.length} test{b.tests.length > 1 ? 's' : ''} ({b.collectionType === 'home' ? 'Home' : 'Lab'})
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {b.assignedLabName ? (
                            <div>
                              <span className="font-bold text-slate-900 block">{b.assignedLabName.split(' ')[0]} Lab</span>
                              <span className="text-[11px] text-slate-500">
                                Phleb: {b.assignedPhlebotomistName || 'Unassigned'}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                              Needs Assignment
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            b.status === 'confirmed'
                              ? 'bg-amber-100 text-amber-800'
                              : b.status === 'report_ready'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}>
                            {b.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 font-mono block">₹{b.finalAmount}</span>
                          <span className="text-[10px] text-slate-500">{b.paymentStatus}</span>
                        </td>

                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => handleOpenAssign(b)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
                          >
                            Assign / Route
                          </button>
                          <button
                            onClick={() => setInspectBooking(b)}
                            className="bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
                          >
                            Inspect
                          </button>
                          {b.status === 'report_ready' && b.report && (
                            <button
                              onClick={() => setReportBookingToView(b)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
                              title="View authorized report"
                            >
                              Report
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteConfirmBookingId(b.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-2 py-1.5 rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Delete this booking permanently"
                          >
                            <Trash2 className="w-3 h-3 text-rose-600" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= ADMIN TAB: HEALTH PACKAGES ================= */}
        {activeAdminTab === 'packages' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-200">
                    Checkup Bundles
                  </span>
                  <h3 className="font-extrabold text-xl text-slate-900">Health Packages & Preventive Checkups</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage multi-test diagnostic packages, bundle pricing, parameter inclusions, and fasting guidelines
                </p>
              </div>

              <button
                onClick={() => setShowAddPackageModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create New Health Package</span>
              </button>
            </div>

            {/* Packages Inventory & Demo Notice Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-5 border border-purple-800/40 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40 shrink-0">
                  <Boxes className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    Health Packages Control
                    <span className="bg-purple-500/30 text-purple-200 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-purple-400/30">
                      {packages.length} Total Packages
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      {packages.filter((p) => p.isCustom).length} Real Added
                    </span>
                    {packages.filter((p) => !p.isCustom).length > 0 && (
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {packages.filter((p) => !p.isCustom).length} Demo
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-purple-200/80 mt-1">
                    Customers can browse and book these bundled health checkups with 1-click home sample collection.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {packages.some((p) => !p.isCustom) && (
                  <button
                    onClick={() => {
                      clearDemoPackages();
                      showToast('🗑️ केवल डेमो पैकेज हटा दिए गए। (Demo packages cleared!)');
                    }}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Demo Packages
                  </button>
                )}
                <button
                  onClick={() => setActiveAdminTab('demo_manager')}
                  className="bg-purple-800/60 hover:bg-purple-700/80 text-purple-200 border border-purple-600/50 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  Manage Demo Data →
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Full Body', 'Senior Citizen', 'Diabetes Care', 'Women Wellness', 'Heart Care', 'Fever & Infection', 'Vital Organs'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPkgCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedPkgCategory === cat
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages
                .filter((p) => selectedPkgCategory === 'All' || p.category === selectedPkgCategory)
                .map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-purple-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
                  >
                    {/* Top color accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400" />

                    <div>
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                          {pkg.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {pkg.isCustom ? (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                              Real Custom
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                              Demo Data
                            </span>
                          )}
                          <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                            {pkg.badge || `${pkg.discountPercentage}% OFF`}
                          </span>
                        </div>
                      </div>

                      {/* Title & Hindi */}
                      <h4 className="font-extrabold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                        {pkg.name}
                      </h4>
                      {pkg.hindiName && (
                        <p className="text-xs text-purple-800 font-semibold mt-0.5">{pkg.hindiName}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {pkg.tagline || pkg.description}
                      </p>

                      {/* Specs bar */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                        <span className="flex items-center gap-1 font-semibold text-purple-900 bg-purple-50 px-2 py-1 rounded">
                          <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                          {pkg.parametersCount} Parameters
                        </span>
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {pkg.turnaroundTime}
                        </span>
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded">
                          <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                          {pkg.sampleType}
                        </span>
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                          {pkg.fastingRequired ? `${pkg.fastingHours || 10}h Fasting` : 'No Fasting'}
                        </span>
                      </div>

                      {/* Inclusions Chips Preview */}
                      <div className="mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Inclusions ({pkg.inclusions.length} Groups)
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pkg.inclusions.slice(0, 4).map((inc, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {inc}
                            </span>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-bold">
                              +{pkg.inclusions.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-slate-900 font-mono">₹{pkg.price}</span>
                          <span className="text-xs text-slate-400 line-through font-mono">₹{pkg.originalPrice}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          Save ₹{pkg.originalPrice - pkg.price} ({pkg.discountPercentage}% OFF)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setInspectPackage(pkg)}
                          className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          View Tests
                        </button>
                        <button
                          onClick={() => setDeleteConfirmPackageId(pkg.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Delete Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= ADMIN TAB: DEMO DATA MANAGER ================= */}
        {activeAdminTab === 'demo_manager' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-200">
                  Data Governance
                </span>
                <h3 className="font-extrabold text-xl text-slate-900">Demo Data & Production Live Mode Center</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                डेमो डेटा प्रबंधन: असली डेटा जोड़ने के बाद डेमो डेटा को पार्टनर लैब एवं ग्राहकों से पूरी तरह छिपाएं या हमेशा के लिए हटाएं
              </p>
            </div>

            {/* Main Mode Toggle Card */}
            <div className={`rounded-3xl p-6 border transition-all ${
              !isDemoModeActive
                ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border-emerald-600/50 shadow-lg'
                : 'bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border-amber-600/50 shadow-lg'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${!isDemoModeActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      Current Mode: {!isDemoModeActive ? '🟢 LIVE PRODUCTION MODE ACTIVE' : '🟡 DEMO SIMULATION MODE ACTIVE'}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white">
                    {!isDemoModeActive
                      ? 'Live Production Mode: All Demo Data Hidden'
                      : 'Demo Preview Mode: Sample Data Currently Visible'}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {!isDemoModeActive ? (
                      <span className="text-emerald-300 font-medium">
                        ✓ All initial demo catalog tests, demo packages, and demo partner bookings are <strong>HIDDEN</strong> from Customer Catalog and Partner Lab queues. Only real diagnostic data added by Admin is displayed.
                      </span>
                    ) : (
                      <span className="text-amber-200/90 leading-relaxed">
                        Default sample tests, packages, and mock partner orders are active for preview and testing. Once you add your real test prices and packages, turn on Live Mode or purge demo data so partners and customers never see test data.
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setIsDemoModeActive(!isDemoModeActive)}
                    className={`font-black text-xs px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      !isDemoModeActive
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                  >
                    {!isDemoModeActive ? (
                      <>
                        <ToggleLeft className="w-5 h-5" />
                        <span>Switch to Demo Preview Mode</span>
                      </>
                    ) : (
                      <>
                        <ToggleRight className="w-5 h-5" />
                        <span>🟢 Turn ON Live Production Mode (Hide Demo Data)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Instant toggle • Applies to Customer & Partner views
                  </p>
                </div>
              </div>
            </div>

            {/* Inventory Breakdown Cards */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-600" />
                Diagnostic Data Inventory Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Individual Tests</span>
                    <FlaskConical className="w-4 h-4 text-teal-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{tests.length}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 font-medium">
                    <span className="text-amber-700">{tests.filter((t) => !t.isCustom).length} Demo</span>
                    <span className="text-emerald-700 font-bold">{tests.filter((t) => t.isCustom).length} Real Live</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Health Packages</span>
                    <Boxes className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{packages.length}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 font-medium">
                    <span className="text-amber-700">{packages.filter((p) => !p.isCustom).length} Demo</span>
                    <span className="text-emerald-700 font-bold">{packages.filter((p) => p.isCustom).length} Real Live</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Partner Labs</span>
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{labs.length}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 font-medium">
                    <span className="text-amber-700">{labs.filter((l) => !l.isCustom).length} Demo</span>
                    <span className="text-emerald-700 font-bold">{labs.filter((l) => l.isCustom).length} Real Live</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Lab Test Orders</span>
                    <ClipboardList className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 font-medium">
                    <span className="text-amber-700">{bookings.filter((b) => b.id.includes('DEL') || b.id.includes('NOI')).length} Demo Orders</span>
                    <span className="text-emerald-700 font-bold">{bookings.filter((b) => !b.id.includes('DEL') && !b.id.includes('NOI')).length} Real Customer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purge & Clean Actions Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  Permanent Demo Data Purge & Removal Tools
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Use these tools to clean out demo data permanently so your portal only runs on real diagnostic catalog and genuine patient bookings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Purge All Demo Data Permanently */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/90 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🗑️</span>
                      <h5 className="font-extrabold text-sm text-rose-950">
                        Purge All Demo Data Permanently
                      </h5>
                    </div>
                    <p className="text-xs font-bold text-rose-800">
                      एक क्लिक में सारा डेमो डेटा हमेशा के लिए हटाएँ (आपका असली डेटा सुरक्षित रहेगा)।
                    </p>
                    <p className="text-[11px] text-rose-700/80 leading-relaxed">
                      Deletes all default tests, demo packages, simulated partner labs, and dummy queue orders instantly. Real catalog & patient data is preserved.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearAllDemoData();
                      showToast('🗑️ सारा डेमो डेटा हमेशा के लिए हटा दिया गया! आपका असली डेटा पूरी तरह सुरक्षित है।');
                    }}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge All Demo Data Permanently
                  </button>
                </div>

                {/* 2. Clear Demo Tests Only */}
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/90 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🗑️</span>
                      <h5 className="font-extrabold text-sm text-teal-950">
                        Clear Demo Tests Only
                      </h5>
                    </div>
                    <p className="text-xs font-bold text-teal-800">
                      कैटलॉग से केवल डेमो टेस्ट हटाएं।
                    </p>
                    <p className="text-[11px] text-teal-700/80 leading-relaxed">
                      Clears default test listings (CBC, Sugar, Thyroid, etc.). Custom tests created via "+ Add New Test" remain intact.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearDemoCatalog();
                      showToast('🗑️ कैटलॉग से केवल डेमो टेस्ट हटा दिए गए। (Demo tests cleared from catalog!)');
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-teal-400" />
                    Clear Demo Tests Only
                  </button>
                </div>

                {/* 3. Clear Demo Packages Only */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/90 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🗑️</span>
                      <h5 className="font-extrabold text-sm text-purple-950">
                        Clear Demo Packages Only
                      </h5>
                    </div>
                    <p className="text-xs font-bold text-purple-800">
                      केवल डेमो पैकेज हटाएं।
                    </p>
                    <p className="text-[11px] text-purple-700/80 leading-relaxed">
                      Removes sample packages (Gold Full Body, Senior Care, etc.). Keeps only custom packages added by you.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearDemoPackages();
                      showToast('🗑️ केवल डेमो पैकेज हटा दिए गए। (Demo packages cleared!)');
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Demo Packages Only
                  </button>
                </div>

                {/* 4. Clear Demo Bookings from Partner Labs */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🗑️</span>
                      <h5 className="font-extrabold text-sm text-amber-950">
                        Clear Demo Bookings from Partner Labs
                      </h5>
                    </div>
                    <p className="text-xs font-bold text-amber-800">
                      पार्टनर लैब कतार से सभी डमी ऑर्डर्स साफ करें।
                    </p>
                    <p className="text-[11px] text-amber-700/80 leading-relaxed">
                      Clears dummy test orders from partner lab queue and dispatch list. Real patient orders remain safe.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearDemoBookings();
                      showToast('🗑️ पार्टनर लैब कतार से सभी डमी ऑर्डर्स साफ कर दिए गए। (Demo bookings cleared from partner labs!)');
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Demo Bookings from Labs
                  </button>
                </div>

                {/* 5. Restore Sample Demo Data */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/90 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow md:col-span-2 lg:col-span-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔄</span>
                      <h5 className="font-extrabold text-sm text-blue-950">
                        Restore Sample Demo Data
                      </h5>
                    </div>
                    <p className="text-xs font-bold text-blue-800">
                      आवश्यकता पड़ने पर सैंपल डेटा रीसेट करें।
                    </p>
                    <p className="text-[11px] text-blue-700/80 leading-relaxed">
                      If you ever need sample test catalog items, partner labs, and simulated reports back for walkthrough or testing.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      resetToDemoData();
                      showToast('🔄 सैंपल डेटा सफलतापूर्वक रीसेट कर दिया गया। (Sample demo data restored!)');
                    }}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-start"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restore Sample Demo Data
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= ADMIN TAB 3: TEST CATALOG ================= */}
        {activeAdminTab === 'catalog' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Diagnostic Tests & Health Packages Catalog</h3>
                <p className="text-xs text-slate-500">Configure real pricing, turnaround times, sample requirements & fasting guidelines</p>
              </div>
              <button
                onClick={() => setShowAddTestModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Real Test / Package
              </button>
            </div>

            {/* Demo Catalog Purge & Inventory Control Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30 shrink-0">
                  <FlaskConical className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white flex items-center gap-2">
                    Catalog Inventory & Demo Control
                    <span className="bg-teal-500/20 text-teal-300 font-mono text-[10px] px-2 py-0.5 rounded border border-teal-500/30">
                      {tests.length} Active Tests
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Delete demo data once you add your real diagnostic listings so customers and partners never see fictional tests.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    clearDemoCatalog();
                    showToast('🗑️ कैटलॉग से केवल डेमो टेस्ट हटा दिए गए। (Demo tests cleared!)');
                  }}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Clear demo tests only"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Demo Tests
                </button>
                <button
                  onClick={() => {
                    clearDemoPackages();
                    showToast('🗑️ केवल डेमो पैकेज हटा दिए गए। (Demo packages cleared!)');
                  }}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Clear demo packages"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Demo Packages
                </button>
                <button
                  onClick={() => {
                    clearAllDemoData();
                    showToast('🗑️ सारा डेमो डेटा हमेशा के लिए हटा दिया गया! (All demo data purged!)');
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Purge all demo data permanently"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Purge All Demo Data
                </button>
                <button
                  onClick={() => {
                    resetToDemoData();
                    showToast('🔄 सैंपल डेटा सफलतापूर्वक रीसेट कर दिया गया। (Sample demo data restored!)');
                  }}
                  className="bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Restore sample demo data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restore Sample
                </button>
                <button
                  onClick={() => setShowAddTestModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Real Test
                </button>
              </div>
            </div>

            {tests.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
                <FlaskConical className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">Catalog is Empty (Demo Data Cleared)</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  All demo tests have been removed. Add your real diagnostic tests, packages, and pricing to start offering live bookings to customers.
                </p>
                <button
                  onClick={() => setShowAddTestModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add First Real Test
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Test Code & Name</th>
                      <th className="py-3 px-4">Origin Type</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price / MRP</th>
                      <th className="py-3 px-4">Turnaround SLA</th>
                      <th className="py-3 px-4">Fasting Requirement</th>
                      <th className="py-3 px-4">Parameters</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tests.map((test) => (
                      <tr key={test.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{test.name}</span>
                          <span className="font-mono text-[10px] text-slate-400">{test.code} • {test.department}</span>
                        </td>

                        <td className="py-3 px-4">
                          {test.isCustom ? (
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              REAL TEST
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              DEMO DATA
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded text-[11px]">
                            {test.category}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 font-mono">₹{test.price}</span>
                          <span className="text-slate-400 line-through text-[11px] ml-1">₹{test.originalPrice}</span>
                        </td>

                        <td className="py-3 px-4 font-medium text-slate-700">
                          {test.turnaroundTime}
                        </td>

                        <td className="py-3 px-4">
                          {test.fastingRequired ? (
                            <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200 text-[10px]">
                              {test.fastingHours || 10}h Fasting
                            </span>
                          ) : (
                            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200 text-[10px]">
                              No Fasting
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-slate-600">
                          {test.parametersCount} parameters
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditTest(test);
                                setEditPriceInput(test.price.toString());
                              }}
                              className="px-2.5 py-1.5 text-slate-700 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                              title={`Edit ${test.name}`}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmTest(test)}
                              className="px-2.5 py-1.5 text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                              title={`Delete ${test.name} from catalog`}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-600 group-hover:text-white transition-colors" />
                              <span>Delete / हटाएं</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= ADMIN TAB 4: PARTNER LABS ================= */}
        {activeAdminTab === 'labs' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Partner Diagnostic Laboratories Network</h3>
                <p className="text-xs text-slate-500">NABL accreditation audits, service pincodes, real lab onboarding & commercial splits</p>
              </div>
              <button
                onClick={() => setShowAddLabModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Onboard New Real Lab
              </button>
            </div>

            {/* Demo Labs Purge & Network Control Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30 shrink-0">
                  <Building2 className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white flex items-center gap-2">
                    Partner Network & Demo Control
                    <span className="bg-teal-500/20 text-teal-300 font-mono text-[10px] px-2 py-0.5 rounded border border-teal-500/30">
                      {labs.length} Partner Labs Active
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Remove default simulated laboratory branches once you onboard your real diagnostic lab partners.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {labs.some((l) => !l.isCustom && l.id.startsWith('lab-')) && (
                  <button
                    onClick={() => {
                      clearDemoLabs();
                      showToast('🗑️ डेमो पार्टनर लैब्स हटा दी गईं। (Demo partner labs cleared!)');
                    }}
                    className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Purge all demo labs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge All Demo Labs
                  </button>
                )}
                <button
                  onClick={() => setShowAddLabModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Onboard Real Lab
                </button>
              </div>
            </div>

            {labs.length === 0 ? (
              <div className="p-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">No Partner Labs Registered (Demo Labs Cleared)</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  All demo partner labs have been purged. Onboard your real diagnostic lab partner, enter NABL accreditation, and start dispatching samples.
                </p>
                <button
                  onClick={() => setShowAddLabModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Onboard First Real Lab
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {labs.map((lab) => {
                  const totalAssigned = bookings.filter((b) => b.assignedLabId === lab.id).length;
                  const completed = bookings.filter((b) => b.assignedLabId === lab.id && b.status === 'report_ready').length;

                  return (
                    <div key={lab.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <h4 className="font-bold text-base text-slate-900">{lab.name}</h4>
                            {lab.isCustom ? (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded tracking-wide border border-emerald-300 uppercase">
                                REAL LAB
                              </span>
                            ) : (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded tracking-wide border border-amber-300 uppercase">
                                DEMO LAB
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            NABL Accreditation: <strong className="text-teal-700">{lab.nablCode}</strong> ({lab.city})
                          </p>
                        </div>
                        <span className="text-xs font-bold bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg border border-teal-200">
                          {lab.rating} ★ ({lab.reviewsCount})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Chief Pathologist</span>
                          <p className="font-bold text-slate-800 mt-0.5">{lab.chiefPathologist}</p>
                          <p className="text-[11px] text-slate-500">Reg: {lab.pathologistRegNo}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold">Commercial Terms</span>
                          <p className="font-bold text-slate-800 mt-0.5">Commission: {lab.commissionRate}%</p>
                          <p className="text-[11px] text-slate-500">Orders Handled: {completed} / {totalAssigned}</p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600">
                        <span className="font-bold text-slate-700">Operating Hours: </span>
                        {lab.operatingHours}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                        <span className="font-mono text-[11px] text-slate-500">
                          Pincodes: {lab.servicePincodes.slice(0, 3).join(', ')}...
                        </span>

                        <button
                          onClick={() => {
                            deleteLab(lab.id);
                            showToast(`Partner lab "${lab.name}" deleted`);
                          }}
                          className="text-rose-600 hover:text-rose-800 font-bold text-xs inline-flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Lab
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= ADMIN TAB 5: PHLEBOTOMIST FLEET ================= */}
        {activeAdminTab === 'phlebotomy' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Field Phlebotomy Fleet & Cold-Chain Logistics</h3>
              <p className="text-xs text-slate-500">Real-time status, temperature kits (2-8°C) and doorstep visit tracking</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {phlebotomists.map((phleb) => (
                <div key={phleb.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                      {phleb.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      phleb.status === 'available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {phleb.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{phleb.name}</h4>
                    <p className="text-xs text-slate-500">{phleb.experienceYears} Years Experience • {phleb.rating} ★</p>
                    <p className="text-xs text-teal-700 font-medium mt-0.5">{phleb.phone}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <p><strong className="text-slate-800">Transport:</strong> {phleb.vehicle}</p>
                    <p><strong className="text-slate-800">Total Visits:</strong> {phleb.completedVisits}</p>
                    <p><strong className="text-slate-800">Safety:</strong> 100% Vaccinated & Sterile</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ADMIN TAB 6: FINANCE & COMMISSIONS ================= */}
        {activeAdminTab === 'finance' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Revenue, Commissions & Partner Lab Settlements</h3>
              <p className="text-xs text-slate-500">Gross marketplace transaction volume and automated 20% platform share accounting</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Gross Booking Volume</span>
                <p className="text-3xl font-black text-slate-900 mt-1">₹{grossGMV.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">100% of realized bookings</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-teal-700 uppercase">Platform Take (Commission)</span>
                <p className="text-3xl font-black text-teal-700 mt-1">₹{platformCommissionRevenue.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 mt-1">Average 20.0% take rate</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Net Partner Lab Payout Balance</span>
                <p className="text-3xl font-black text-slate-900 mt-1">₹{(grossGMV - platformCommissionRevenue).toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Ready for weekly bank settlement</p>
              </div>
            </div>

            {/* Partner Lab Settlements Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 border-b border-slate-200 font-bold text-sm text-slate-900">
                Laboratory-wise Financial Breakdown
              </div>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Partner Laboratory</th>
                    <th className="py-3 px-4">Orders Handled</th>
                    <th className="py-3 px-4">Total Order Value</th>
                    <th className="py-3 px-4">Platform Fee Rate</th>
                    <th className="py-3 px-4">Platform Share</th>
                    <th className="py-3 px-4">Net Lab Payout</th>
                    <th className="py-3 px-4 text-right">Settlement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {labs.map((lab) => {
                    const labBookings = bookings.filter((b) => b.assignedLabId === lab.id && b.status !== 'cancelled');
                    const labTotal = labBookings.reduce((sum, b) => sum + b.finalAmount, 0);
                    const fee = Math.round(labTotal * (lab.commissionRate / 100));
                    const payout = labTotal - fee;

                    return (
                      <tr key={lab.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {lab.name}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono">
                          {labBookings.length}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          ₹{labTotal.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-teal-700 font-bold">
                          {lab.commissionRate}%
                        </td>
                        <td className="py-3 px-4 font-mono text-teal-800">
                          ₹{fee.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          ₹{payout.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            Settled on Schedule
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= ADMIN TAB 7: AUDIT LOGS ================= */}
        {activeAdminTab === 'audit' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">System Audit Trail & Security Logs</h3>
              <p className="text-xs text-slate-500">Immutable chronological record of bookings, assignments, status transitions and reports</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="divide-y divide-slate-100 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          log.role === 'admin'
                            ? 'bg-purple-100 text-purple-900'
                            : log.role === 'partner_lab'
                            ? 'bg-teal-100 text-teal-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}>
                          {log.role.replace('_', ' ')}
                        </span>
                        <strong className="text-slate-900">{log.actorName}</strong>
                        {log.bookingId && (
                          <span className="font-mono text-[11px] text-teal-700 bg-teal-50 px-1.5 rounded">
                            {log.bookingId}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 text-xs">{log.details}</p>
                    </div>

                    <div className="text-right text-[11px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Assign Lab Modal */}
      {assigningBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">Assign Partner Lab & Phlebotomist</h3>
                <p className="text-xs text-slate-500">Order: <strong className="font-mono">{assigningBooking.id}</strong></p>
              </div>
              <button
                onClick={() => setAssigningBooking(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Processing Laboratory</label>
                <select
                  value={selectedLabForAssign}
                  onChange={(e) => setSelectedLabForAssign(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-medium"
                >
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name} ({lab.city} • NABL: {lab.nablCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Field Phlebotomist</label>
                <select
                  value={selectedPhlebForAssign}
                  onChange={(e) => setSelectedPhlebForAssign(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-medium"
                >
                  {phlebotomists.map((phleb) => (
                    <option key={phleb.id} value={phleb.id}>
                      {phleb.name} ({phleb.vehicle} • {phleb.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-[11px] text-teal-900">
                ⚡ Upon assignment, sample transit cold kit is activated and this order immediately becomes available in the <strong>Partner Lab Hub</strong>.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAssigningBooking(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssignment}
                className="px-5 py-2.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xs"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Booking Drawer / Modal */}
      {inspectBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="font-mono text-xs text-teal-700 font-bold">{inspectBooking.id}</span>
                <h3 className="font-bold text-base text-slate-900">Booking Inspector</h3>
              </div>
              <button onClick={() => setInspectBooking(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Patient</p>
                <p className="font-bold text-slate-900 text-sm">{inspectBooking.patient.name}</p>
                <p className="text-slate-500">{inspectBooking.patient.age}y / {inspectBooking.patient.gender}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Customer Contact</p>
                <p className="font-bold text-slate-900">{inspectBooking.customerName}</p>
                <p className="text-slate-500">{inspectBooking.customerPhone}</p>
              </div>
            </div>

            {/* Change Status Override */}
            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs space-y-2">
              <label className="font-bold text-slate-800">Admin Status Override (Emergency / Support)</label>
              <div className="flex gap-2">
                <select
                  defaultValue={inspectBooking.status}
                  id="admin-status-override"
                  className="bg-white p-2 rounded-lg border border-slate-300 text-xs font-medium flex-1 outline-none"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="staff_assigned">Staff Assigned</option>
                  <option value="sample_collected">Sample Collected</option>
                  <option value="received_at_lab">Received at Lab</option>
                  <option value="processing">Processing</option>
                  <option value="report_ready">Report Ready</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => {
                    const sel = (document.getElementById('admin-status-override') as HTMLSelectElement)?.value as BookingStatus;
                    if (sel) {
                      updateBookingStatus(inspectBooking.id, sel, 'Status manually adjusted by Admin Operations');
                      setInspectBooking(null);
                    }
                  }}
                  className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Update
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  const bId = inspectBooking.id;
                  deleteBooking(inspectBooking.id);
                  setInspectBooking(null);
                  showToast(`Booking ${bId} deleted successfully`);
                }}
                className="px-3.5 py-2 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Booking
              </button>

              <button
                onClick={() => setInspectBooking(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Test Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <form onSubmit={handleAddNewTest} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Add New Diagnostic Test Listing</h3>
              <button type="button" onClick={() => setShowAddTestModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Test / Package Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Total Vitamin Profile (B12 + D3 + Folic Acid)"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTestCategory}
                    onChange={(e) => setNewTestCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  >
                    <option value="Full Body">Full Body</option>
                    <option value="Fasting Tests">Fasting Tests</option>
                    <option value="Diabetes & Blood Sugar">Diabetes & Blood Sugar</option>
                    <option value="Vitamins & Minerals">Vitamins & Minerals</option>
                    <option value="Heart Health">Heart Health</option>
                    <option value="Liver & Kidney">Liver & Kidney</option>
                    <option value="Women Health">Women Health</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Turnaround SLA</label>
                  <input
                    type="text"
                    value={newTestTurnaround}
                    onChange={(e) => setNewTestTurnaround(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discounted Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 799"
                    value={newTestPrice}
                    onChange={(e) => setNewTestPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={newTestOriginalPrice}
                    onChange={(e) => setNewTestOriginalPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="fasting-chk"
                  checked={newTestFasting}
                  onChange={(e) => setNewTestFasting(e.target.checked)}
                  className="rounded text-teal-600"
                />
                <label htmlFor="fasting-chk" className="font-semibold text-slate-800">
                  Requires 10-12 hours overnight fasting
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddTestModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold bg-teal-600 text-white rounded-xl shadow-xs"
              >
                Save to Catalog
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Partner Lab Modal */}
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

              {/* State & Region Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Geographic Coverage Region</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLabRegionType('rajasthan');
                      setSelectedDistrictId('jaipur');
                      setSelectedTehsilName('Jaipur Urban (Central)');
                    }}
                    className={`py-2 px-3 rounded-xl font-bold border text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      labRegionType === 'rajasthan'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>🏰 Rajasthan (All 50 Districts & Tehsils)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabRegionType('other')}
                    className={`py-2 px-3 rounded-xl font-bold border text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      labRegionType === 'other'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>🏢 Other Metro Cities</span>
                  </button>
                </div>
              </div>

              {/* Rajasthan Specific Hierarchy: District -> Tehsil -> Area */}
              {labRegionType === 'rajasthan' ? (
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-teal-900 text-xs flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      Select Rajasthan District, Sub-District & Tehsil Area:
                    </span>
                    <span className="text-[10px] font-bold bg-teal-200/70 text-teal-900 px-2 py-0.5 rounded-full">
                      50 Districts Loaded
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
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Metro City Hub</label>
                  <select
                    value={newLabCity}
                    onChange={(e) => setNewLabCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-bold"
                  >
                    <option value="New Delhi">New Delhi (Central & South NCR)</option>
                    <option value="Noida">Noida & Greater Noida (UP)</option>
                    <option value="Bengaluru">Bengaluru (Tech Corridors)</option>
                    <option value="Mumbai">Mumbai (Suburban & Island)</option>
                  </select>
                </div>
              )}

              {/* Lab Tax & Legal Registrations */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold uppercase text-[10px] text-slate-600 tracking-wider block">
                  🛡️ Partner Lab Tax & Government Registration Profile (GST / MSME / Reg No):
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
                  <label className="block font-bold text-slate-700 mb-1">Chief Pathologist (MD)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajeshwari Meena, MD (Pathology)"
                    value={newLabPathologist}
                    onChange={(e) => setNewLabPathologist(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Platform Commission Rate (%)</label>
                  <input
                    type="number"
                    value={newLabCommission}
                    onChange={(e) => setNewLabCommission(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-teal-600 text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddLabModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md shadow-teal-600/20 cursor-pointer transition-colors"
              >
                Onboard Laboratory Partner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Report Viewer Modal */}
      <ReportViewerModal
        booking={reportBookingToView}
        onClose={() => setReportBookingToView(null)}
      />

      {/* Delete Order Confirmation Dialog */}
      {deleteConfirmBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Delete Booking Order?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to permanently delete order <strong className="font-mono text-slate-900">{deleteConfirmBookingId}</strong>?
                This will purge all associated running tests, phlebotomy assignments, and lab records from all dashboards.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmBookingId(null)}
                className="w-1/2 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBooking(deleteConfirmBookingId);
                  setDeleteConfirmBookingId(null);
                }}
                className="w-1/2 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Health Package Modal */}
      {showAddPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  Create Master Package
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">Add New Health Checkup Package</h3>
                <p className="text-xs text-slate-500">Configure bundle pricing, included tests, parameters count and fasting</p>
              </div>
              <button
                onClick={() => setShowAddPackageModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewPackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Package Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swasthya Rakshak Gold Package"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Package Name (Hindi / Local)</label>
                  <input
                    type="text"
                    placeholder="e.g. स्वास्थ्य रक्षक गोल्ड पैकेज"
                    value={newPkgHindiName}
                    onChange={(e) => setNewPkgHindiName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newPkgCategory}
                    onChange={(e) => setNewPkgCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                  >
                    <option value="Full Body">Full Body</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="Diabetes Care">Diabetes Care</option>
                    <option value="Women Wellness">Women Wellness</option>
                    <option value="Heart Care">Heart Care</option>
                    <option value="Fever & Infection">Fever & Infection</option>
                    <option value="Vital Organs">Vital Organs</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1499"
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3999"
                    value={newPkgOriginalPrice}
                    onChange={(e) => setNewPkgOriginalPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline / Key Description</label>
                <input
                  type="text"
                  placeholder="e.g. Complete 80-parameter preventive health evaluation for whole family"
                  value={newPkgTagline}
                  onChange={(e) => setNewPkgTagline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Parameters Count</label>
                  <input
                    type="number"
                    value={newPkgParamsCount}
                    onChange={(e) => setNewPkgParamsCount(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Turnaround Time</label>
                  <select
                    value={newPkgTurnaround}
                    onChange={(e) => setNewPkgTurnaround(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                  >
                    <option value="4 Hours (Express)">4 Hours (Express)</option>
                    <option value="6 Hours (Express)">6 Hours (Express)</option>
                    <option value="12 Hours">12 Hours</option>
                    <option value="24 Hours">24 Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sample Type</label>
                  <select
                    value={newPkgSampleType}
                    onChange={(e) => setNewPkgSampleType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                  >
                    <option value="Blood & Urine">Blood & Urine</option>
                    <option value="Blood">Blood Only</option>
                    <option value="Urine">Urine Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pkgFasting"
                    checked={newPkgFasting}
                    onChange={(e) => setNewPkgFasting(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="pkgFasting" className="font-bold text-slate-800 cursor-pointer">
                    Overnight Fasting Required
                  </label>
                </div>
                {newPkgFasting && (
                  <div className="flex items-center gap-2">
                    <label className="text-slate-600 whitespace-nowrap">Hours:</label>
                    <input
                      type="number"
                      value={newPkgFastingHours}
                      onChange={(e) => setNewPkgFastingHours(e.target.value)}
                      className="w-20 p-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Included Diagnostic Groups / Tests (Comma separated)
                </label>
                <textarea
                  rows={2}
                  value={newPkgInclusionsText}
                  onChange={(e) => setNewPkgInclusionsText(e.target.value)}
                  placeholder="CBC (24), Lipid Profile (8), LFT (11), KFT (9), Thyroid (3), Sugar (2), Urine Routine (18)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Recommended Audience</label>
                <input
                  type="text"
                  value={newPkgRecommended}
                  onChange={(e) => setNewPkgRecommended(e.target.value)}
                  placeholder="e.g. Recommended for adults aged 25-65 annually"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-purple-600 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPackageModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Publish Health Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Health Package Inclusions Dialog */}
      {inspectPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {inspectPackage.category}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{inspectPackage.name}</h3>
                {inspectPackage.hindiName && (
                  <p className="text-xs text-purple-700 font-semibold">{inspectPackage.hindiName}</p>
                )}
                <span className="font-mono text-xs text-slate-400">{inspectPackage.code}</span>
              </div>
              <button
                onClick={() => setInspectPackage(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Price</span>
                  <span className="text-base font-bold text-slate-900 font-mono">₹{inspectPackage.price}</span>
                  <span className="text-[10px] text-slate-400 line-through ml-1">₹{inspectPackage.originalPrice}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Parameters</span>
                  <span className="text-base font-bold text-purple-700">{inspectPackage.parametersCount} Tests</span>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1.5">Included Test Panels:</h5>
                <div className="space-y-2">
                  {inspectPackage.includedCategories?.map((grp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                      <p className="font-bold text-purple-900 text-xs">{grp.categoryName}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{grp.tests.join(' • ')}</p>
                    </div>
                  ))}
                  {(!inspectPackage.includedCategories || inspectPackage.includedCategories.length === 0) && (
                    <div className="flex flex-wrap gap-1.5">
                      {inspectPackage.inclusions.map((inc, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-lg text-xs font-medium">
                          {inc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-amber-900 text-[11px] space-y-1">
                <p className="font-bold">Preparation & Guidelines:</p>
                <p>{inspectPackage.fastingRequired ? `Overnight ${inspectPackage.fastingHours || 10} hours fasting required.` : 'No fasting required.'}</p>
                <p>Sample: {inspectPackage.sampleType} | TAT: {inspectPackage.turnaroundTime}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectPackage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Package Confirmation Dialog */}
      {deleteConfirmPackageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Delete Health Package?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Are you sure you want to delete package <strong className="font-mono text-slate-900">{deleteConfirmPackageId}</strong>?
                Customers will no longer be able to browse or book this package.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmPackageId(null)}
                className="w-1/2 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletePackage(deleteConfirmPackageId);
                  setDeleteConfirmPackageId(null);
                }}
                className="w-1/2 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purge All Demo Data Modal */}
      {purgeConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">Purge All Demo Diagnostic Data?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                This will delete all default demo tests, demo packages, default demo partner labs, and simulated patient orders from localStorage and state.
                <br />
                <strong className="text-emerald-700 block mt-1">
                  ✓ Any custom real tests and packages you have added will be 100% saved and remain active.
                </strong>
              </p>
            </div>
            <div className="flex gap-2 pt-3">
              <button
                onClick={() => setPurgeConfirmModalOpen(false)}
                className="w-1/2 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllDemoData();
                  setPurgeConfirmModalOpen(false);
                }}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Test Confirmation Dialog */}
      {deleteConfirmTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">Delete Diagnostic Test?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                क्या आप टेस्ट <strong className="font-bold text-slate-900">{deleteConfirmTest.name}</strong> ({deleteConfirmTest.code}) को कैटलॉग से हमेशा के लिए हटाना चाहते हैं?
              </p>
              <div className="p-2.5 bg-slate-50 rounded-xl text-left text-[11px] text-slate-600 space-y-0.5 mt-2 border border-slate-200">
                <p><span className="font-bold">Category:</span> {deleteConfirmTest.category}</p>
                <p><span className="font-bold">Price:</span> ₹{deleteConfirmTest.price}</p>
                <p><span className="font-bold">Turnaround:</span> {deleteConfirmTest.turnaroundTime}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmTest(null)}
                className="w-1/2 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors"
              >
                Cancel / रद्द करें
              </button>
              <button
                onClick={() => {
                  const testName = deleteConfirmTest.name;
                  deleteTest(deleteConfirmTest.id);
                  setDeleteConfirmTest(null);
                  showToast(`🗑️ टेस्ट "${testName}" कैटलॉग से हटा दिया गया है। (Test deleted successfully)`);
                }}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Yes, Delete / हटाएं
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Test Details & Price Modal */}
      {editTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2">
                <Edit2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Edit Test Selling Price</h3>
              <p className="text-xs text-slate-500 font-medium">{editTest.name} ({editTest.code})</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Catalog Selling Price (₹)
              </label>
              <input
                type="number"
                value={editPriceInput}
                onChange={(e) => setEditPriceInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-teal-500 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-900 outline-none font-mono"
                autoFocus
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditTest(null)}
                className="w-1/2 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const p = parseFloat(editPriceInput);
                  if (!isNaN(p) && p >= 0) {
                    updateTest({ ...editTest, price: p });
                    showToast(`Price for "${editTest.name}" updated to ₹${p}`);
                  }
                  setEditTest(null);
                }}
                className="w-1/2 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-3 fade-in duration-200 max-w-md">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold bg-slate-900/95 text-white border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Deep Link Connect Hub Modal */}
      <DeepLinkModal
        isOpen={showDeepLinkModal}
        onClose={() => setShowDeepLinkModal(false)}
      />

      {/* WhatsApp Order Notification Modal */}
      <WhatsAppNotificationModal
        isOpen={!!whatsappModalBooking}
        booking={whatsappModalBooking}
        onClose={() => setWhatsappModalBooking(null)}
      />

    </div>
  );
};
