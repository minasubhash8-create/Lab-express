import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import { TestItem, Booking, HealthPackage } from '../../types';
import { TestDetailModal } from './TestDetailModal';
import { BookingModal } from './BookingModal';
import { OrderTrackerModal } from './OrderTrackerModal';
import { ReportViewerModal } from './ReportViewerModal';
import {
  Search,
  Zap,
  Clock,
  ShieldCheck,
  Droplet,
  CheckCircle2,
  ChevronRight,
  Filter,
  FileCheck2,
  ShoppingBag,
  Plus,
  Check,
  Sparkles,
  Heart,
  Activity,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  MapPin,
  User,
  Trash2,
  Boxes,
  Eye,
  Gift,
  FlaskConical,
  MessageCircle
} from 'lucide-react';
import { WhatsAppNotificationModal, OFFICIAL_WHATSAPP_DISPLAY } from '../common/WhatsAppNotificationModal';

interface CustomerViewProps {
  initialTab?: 'catalog' | 'packages' | 'bookings' | 'reports';
}

export const CustomerView: React.FC<CustomerViewProps> = ({ initialTab = 'catalog' }) => {
  const {
    tests,
    packages,
    activeTests,
    activePackages,
    bookings,
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    activeCity,
    savedAddresses,
    savedPatients,
    deleteBooking,
    cancelBooking,
    deleteTestFromBooking,
    convertPackageToTest,
    isDemoModeActive
  } = useLabExpress();

  const [activeTab, setActiveTab] = useState<'catalog' | 'packages' | 'bookings' | 'reports' | 'profile'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPkgFilter, setSelectedPkgFilter] = useState<string>('All');

  // Modals state
  const [selectedTestForModal, setSelectedTestForModal] = useState<TestItem | null>(null);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<HealthPackage | null>(null);
  const [testsToBook, setTestsToBook] = useState<TestItem[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [trackedBooking, setTrackedBooking] = useState<Booking | null>(null);
  const [viewedReportBooking, setViewedReportBooking] = useState<Booking | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);
  const [whatsappBooking, setWhatsappBooking] = useState<Booking | null>(null);
  const [isAutoWhatsAppAlert, setIsAutoWhatsAppAlert] = useState(false);

  const categories = [
    'All',
    'Packages',
    'Full Body',
    'Fasting Tests',
    'Diabetes & Blood Sugar',
    'Vitamins & Minerals',
    'Heart Health',
    'Liver & Kidney',
    'Women Health',
    'Senior Citizen'
  ];

  // List of tests to show based on demo mode
  const currentTestsList = activeTests || tests;
  const currentPackagesList = activePackages || packages;

  // Filter tests
  const filteredTests = currentTestsList.filter((test) => {
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    const matchesSearch =
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.inclusions.some((inc) => inc.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Filter packages
  const filteredPackages = currentPackagesList.filter((pkg) => {
    const matchesCat = selectedPkgFilter === 'All' || pkg.category === selectedPkgFilter;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.hindiName && pkg.hindiName.includes(searchQuery)) ||
      pkg.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.inclusions.some((inc) => inc.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  // Filter customer-specific bookings
  const myBookings = bookings.filter((b) => b.customerId === 'cust-priya-01' || b.customerEmail.includes('priya'));
  const myReadyReports = myBookings.filter((b) => b.status === 'report_ready' && b.report);
  const activeCustomerRunning = myBookings.filter((b) => b.status !== 'report_ready' && b.status !== 'cancelled');

  const handleInstantBook = (test: TestItem) => {
    setTestsToBook([test]);
    setIsBookingModalOpen(true);
  };

  const handleBookCart = () => {
    if (cart.length === 0) return;
    setTestsToBook([...cart]);
    setIsCartDrawerOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleBookingCompleted = (bookingId: string) => {
    setIsBookingModalOpen(false);
    setBookingSuccessId(bookingId);
    setActiveTab('bookings');
    const newBooking = bookings.find((b) => b.id === bookingId);
    if (newBooking) {
      setTrackedBooking(newBooking);
      setWhatsappBooking(newBooking);
      setIsAutoWhatsAppAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Role Notice & Sub-navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { id: 'catalog', label: 'Explore & Book Tests', icon: Activity },
                { id: 'packages', label: `Health Packages (${currentPackagesList.length})`, icon: Boxes },
                { id: 'bookings', label: `My Bookings (${myBookings.length})`, icon: Clock },
                { id: 'reports', label: `My Reports (${myReadyReports.length})`, icon: FileCheck2 },
                { id: 'profile', label: 'Patient Profile & Saved Data', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Quick cart toggle in tab bar */}
            {cart.length > 0 && (
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                View Cart ({cart.length} items • ₹{cart.reduce((a, b) => a + b.price, 0)})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

        {/* Active In-Progress Diagnostics Quick Bar */}
        {activeCustomerRunning.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span>⚡ {activeCustomerRunning.length} Diagnostic Test{activeCustomerRunning.length > 1 ? 's' : ''} Currently Running</span>
                  <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-full">Live Tracking</span>
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Latest: <strong className="font-mono text-slate-900">{activeCustomerRunning[0].id}</strong> ({activeCustomerRunning[0].tests.map(t => t.name).join(', ')}) • Status: <strong className="text-teal-700 uppercase">{activeCustomerRunning[0].status.replace('_', ' ')}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTrackedBooking(activeCustomerRunning[0])}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Track Journey
              </button>
              <button
                onClick={() => {
                  if (confirm(`Permanently delete active test order ${activeCustomerRunning[0].id}?`)) {
                    deleteBooking(activeCustomerRunning[0].id);
                  }
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                title="Delete this active test"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Test
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 1: CATALOG & BOOKING ================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            
            {/* Zepto-inspired Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 sm:p-10 text-white shadow-xl shadow-teal-950/10">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Diagnostic Tests Delivered at Lightning Speed
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Sample Pickup in <span className="text-teal-300 underline decoration-amber-400 decoration-wavy">60 Minutes</span>.
                  <br />NABL Reports in 6 Hours.
                </h1>

                <p className="text-teal-100 text-xs sm:text-sm leading-relaxed max-w-lg">
                  Doorstep blood collection by certified, temperature-monitored phlebotomists. 100% painless vacuette tubes with zero sample mix-up guarantee.
                </p>

                {/* Hero Guarantees */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-teal-200">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    100% NABL Accredited Labs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-cyan-300" />
                    Cold-Chain Box (2-8°C)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-300" />
                    Automated Digital PDF Release
                  </span>
                </div>
              </div>

              {/* Express Search Bar floating inside Hero */}
              <div className="relative z-10 mt-6 max-w-xl">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search CBC, Thyroid, Blood Sugar, Full Body, Liver..."
                    className="w-full text-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-400 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 px-2 font-bold"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => {}}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    Find Tests
                  </button>
                </div>
              </div>

              {/* Background graphic elements */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
                <Activity className="w-96 h-96 text-white stroke-[1]" />
              </div>
            </div>

            {/* Quick Offer Banners Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">EARLY MORNING FASTING</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">Slots starting 06:30 AM</p>
                  <p className="text-[11px] text-slate-600">Sample picked before breakfast</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600 opacity-80" />
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-2xl border border-teal-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">EXPRESS HEALTH SALE</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">Full Body Package @ ₹1,299</p>
                  <p className="text-[11px] text-slate-600">84 Vital health parameters</p>
                </div>
                <Zap className="w-8 h-8 text-teal-600 opacity-80" />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">DOCTOR SIGN-OFF</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">100% Pathologist Verified</p>
                  <p className="text-[11px] text-slate-600">Download report with QR code</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-blue-600 opacity-80" />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-teal-600" />
                  Browse by Diagnostic Health Category
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tests Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTests.map((test) => {
                const inCart = isInCart(test.id);

                return (
                  <div
                    key={test.id}
                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-teal-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {test.category}
                        </span>
                        {test.badge ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {test.badge}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-slate-400">{test.code}</span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h4
                        onClick={() => setSelectedTestForModal(test)}
                        className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {test.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {test.description}
                      </p>

                      {/* Inclusions summary pill */}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-medium truncate">
                          Includes {test.parametersCount} parameters ({test.inclusions.slice(0, 2).join(', ')}...)
                        </span>
                      </div>

                      {/* Fasting & Turnaround badges */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {test.turnaroundTime}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-medium ${
                          test.fastingRequired
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          <Droplet className="w-3 h-3" />
                          {test.fastingRequired ? `${test.fastingHours || 10}h Fasting` : 'No Fasting'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-slate-900">₹{test.price}</span>
                          <span className="text-xs text-slate-400 line-through">₹{test.originalPrice}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700">
                          Save ₹{test.originalPrice - test.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedTestForModal(test)}
                          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-colors"
                          title="View Test Details"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => addToCart(test)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            inCart
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                          }`}
                        >
                          {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          {inCart ? 'In Cart' : 'Add'}
                        </button>

                        <button
                          onClick={() => handleInstantBook(test)}
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB: HEALTH PACKAGES ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            
            {/* Health Packages Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 sm:p-9 text-white shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-purple-400/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-400/30">
                  <Gift className="w-3.5 h-3.5 text-amber-300" />
                  Full Body & Preventive Health Checkup Packages
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  80+ Vital Health Parameters.
                  <br />Save up to <span className="text-amber-300 underline decoration-teal-400 decoration-wavy">63% OFF</span> on Master Checkups.
                </h2>

                <p className="text-purple-100 text-xs sm:text-sm leading-relaxed max-w-lg">
                  Multi-parameter diagnostic profiles formulated by senior pathologists. Comprehensive monitoring for vital organs, heart, thyroid, sugar, and bone health.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-purple-200">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Doctor & Pathologist Certified
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-300" />
                    Free Home Sample Pickup
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-300" />
                    Digital PDF Report in 12h
                  </span>
                </div>
              </div>

              {/* Express Package Search Bar */}
              <div className="relative z-10 mt-6 max-w-xl">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Full Body, Senior Citizen, Diabetes, Women, Cardiac..."
                    className="w-full text-slate-900 px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-400 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 px-2 font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Package Category Filter Pills */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-purple-600" />
                  Filter Packages by Health Need
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Full Body', 'Senior Citizen', 'Diabetes Care', 'Women Wellness', 'Heart Care', 'Fever & Infection', 'Vital Organs'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPkgFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedPkgFilter === cat
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            {filteredPackages.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <Boxes className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-slate-900">No Packages Match Your Search</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing the search query or selecting a different package category above.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPkgFilter('All');
                  }}
                  className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPackages.map((pkg) => {
                  const testRep = convertPackageToTest(pkg);
                  const inCart = isInCart(testRep.id);

                  return (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-3xl border border-slate-200/90 hover:border-purple-400 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Top color gradient line */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-400" />

                      <div className="space-y-3">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                            {pkg.category}
                          </span>
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                            {pkg.badge || `${pkg.discountPercentage}% OFF`}
                          </span>
                        </div>

                        {/* Title & Hindi */}
                        <div>
                          <h4 className="font-black text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                            {pkg.name}
                          </h4>
                          {pkg.hindiName && (
                            <p className="text-xs text-purple-700 font-bold mt-0.5">
                              {pkg.hindiName}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {pkg.tagline || pkg.description}
                          </p>
                        </div>

                        {/* Vital Specs Bar */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                          <span className="flex items-center gap-1 font-bold text-purple-900 bg-purple-50 px-2 py-1 rounded-lg">
                            <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                            {pkg.parametersCount} Parameters
                          </span>
                          <span className="flex items-center gap-1 font-medium bg-slate-50 text-slate-700 px-2 py-1 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {pkg.turnaroundTime}
                          </span>
                          <span className="flex items-center gap-1 font-medium bg-slate-50 text-slate-700 px-2 py-1 rounded-lg">
                            <Droplet className="w-3.5 h-3.5 text-cyan-600" />
                            {pkg.sampleType}
                          </span>
                          <span className="flex items-center gap-1 font-medium bg-slate-50 text-slate-700 px-2 py-1 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            {pkg.fastingRequired ? `${pkg.fastingHours || 10}h Fasting` : 'No Fasting'}
                          </span>
                        </div>

                        {/* Inclusions Pills */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Included Panels ({pkg.inclusions.length} Groups)
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {pkg.inclusions.slice(0, 4).map((inc, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                {inc}
                              </span>
                            ))}
                            {pkg.inclusions.length > 4 && (
                              <button
                                onClick={() => setSelectedPackageForModal(pkg)}
                                className="text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold cursor-pointer"
                              >
                                +{pkg.inclusions.length - 4} more
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Pricing & Actions */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-extrabold text-slate-900 font-mono">₹{pkg.price}</span>
                            <span className="text-xs text-slate-400 line-through font-mono">₹{pkg.originalPrice}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 block">
                            Save ₹{pkg.originalPrice - pkg.price} ({pkg.discountPercentage}% OFF)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedPackageForModal(pkg)}
                            className="p-2 text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                            title="View Package Details & Parameters"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => addToCart(testRep)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              inCart
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                            }`}
                          >
                            {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            {inCart ? 'In Cart' : 'Add'}
                          </button>

                          <button
                            onClick={() => handleInstantBook(testRep)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-300" />
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">My Diagnostic Bookings</h2>
                <p className="text-xs text-slate-500">Live order status, phlebotomist tracking & reports</p>
              </div>

              <button
                onClick={() => setActiveTab('catalog')}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Book Another Test
              </button>
            </div>

            {bookingSuccessId && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Booking Successfully Created!</p>
                    <p className="text-xs text-emerald-800">
                      Order Reference: <strong className="font-mono">{bookingSuccessId}</strong>. Switch to the <strong>Admin Central</strong> or <strong>Partner Lab Hub</strong> anytime to see live order updates!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBookingSuccessId(null)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {myBookings.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Clock className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-slate-800">No diagnostic bookings found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Book a complete blood test or health checkup to experience 60-min doorstep collection.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Browse Available Tests
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((b) => {
                  const isDone = b.status === 'report_ready';
                  const isCancelled = b.status === 'cancelled';

                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
                    >
                      {/* Top Order bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {b.id}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            isCancelled
                              ? 'bg-rose-100 text-rose-800'
                              : isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}>
                            {b.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="text-right text-xs">
                          <span className="text-slate-500">Scheduled for: </span>
                          <strong className="text-slate-800">{b.appointmentDate} • {b.timeSlot}</strong>
                        </div>
                      </div>

                      {/* Middle: Patient & Tests details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Patient</span>
                          <p className="font-bold text-slate-900 text-sm mt-0.5">{b.patient.name}</p>
                          <p className="text-slate-500">{b.patient.relation} • {b.patient.gender}, {b.patient.age} yrs</p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Tests Booked ({b.tests.length})</span>
                          <div className="mt-0.5 space-y-0.5">
                            {b.tests.map((t) => (
                              <p key={t.id} className="font-medium text-slate-800 truncate">• {t.name}</p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Collection & Payment</span>
                          <p className="font-bold text-slate-900 mt-0.5">
                            {b.collectionType === 'home' ? '🏠 Home Sample Collection' : '🏢 Partner Lab Visit'}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            Total: <strong className="text-teal-700">₹{b.finalAmount}</strong> ({b.paymentMethod})
                          </p>
                        </div>
                      </div>

                      {/* Phlebotomist & Lab info if assigned */}
                      {(b.assignedPhlebotomistName || b.assignedLabName) && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-slate-600">Assigned Partner:</span>
                            <strong className="text-slate-900">{b.assignedLabName || 'Accredited Lab'}</strong>
                            {b.assignedPhlebotomistName && (
                              <span className="text-teal-700 font-semibold">• Phlebotomist: {b.assignedPhlebotomistName}</span>
                            )}
                          </div>
                          {b.sampleBarcode && (
                            <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                              Barcode: {b.sampleBarcode}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action footer */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">
                          Last Updated: {new Date(b.updatedAt).toLocaleTimeString()}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setTrackedBooking(b)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                            Track Journey
                          </button>

                          {b.status === 'report_ready' && b.report && (
                            <button
                              onClick={() => setViewedReportBooking(b)}
                              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <FileCheck2 className="w-3.5 h-3.5 text-teal-200" />
                              View Report
                            </button>
                          )}

                          {b.status !== 'cancelled' && b.status !== 'report_ready' && (
                            <button
                              onClick={() => {
                                if (confirm(`Cancel diagnostic test booking ${b.id}?`)) {
                                  cancelBooking(b.id, 'Patient cancelled from My Bookings');
                                }
                              }}
                              className="bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold px-2.5 py-1.5 rounded-lg text-xs border border-amber-200 transition-colors cursor-pointer"
                              title="Cancel test booking"
                            >
                              Cancel Test
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setWhatsappBooking(b);
                              setIsAutoWhatsAppAlert(false);
                            }}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg text-xs border border-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Open WhatsApp Booking Notification"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            WhatsApp Alert
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Permanently delete order ${b.id}? This will remove it completely from your booking history.`)) {
                                deleteBooking(b.id);
                              }
                            }}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-2.5 py-1.5 rounded-lg text-xs border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Delete this booking permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 3: MY REPORTS ================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Authorized Medical Reports</h2>
                <p className="text-xs text-slate-500">
                  Digitally signed by pathologist • NABL accredited diagnostic documentation
                </p>
              </div>
            </div>

            {myReadyReports.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-slate-800">No authorized reports ready yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Once your samples are collected and verified by the partner laboratory, your digitally certified reports will appear here.
                </p>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  View Active Bookings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myReadyReports.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-teal-400 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="font-mono text-xs font-bold text-slate-900">
                            {b.report?.reportId}
                          </span>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            NABL FINAL
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mt-1">
                          {b.tests.map((t) => t.name).join(' + ')}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Patient: <strong className="text-slate-800">{b.patient.name}</strong> ({b.patient.age} Y / {b.patient.gender})
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                      <p className="text-slate-600">
                        Laboratory: <strong className="text-slate-800">{b.report?.labName}</strong>
                      </p>
                      <p className="text-slate-600">
                        Signed By: <strong className="text-slate-800">{b.report?.pathologistName}</strong>
                      </p>
                      <p className="text-[11px] text-teal-700 font-mono">
                        Verification Hash: {b.report?.qrVerificationCode}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400">
                        Date: {b.appointmentDate}
                      </span>
                      <button
                        onClick={() => setViewedReportBooking(b)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        Open Certified Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: PROFILE & SAVED DATA ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Customer Account & Saved Data</h2>
              <p className="text-xs text-slate-500">Manage family members and doorstep sample pickup addresses</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                Primary Account Holder Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">Priya Sharma</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Verified Phone</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">+91 98712 34567</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Email</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">priya.sharma@example.com</p>
                </div>
              </div>
            </div>

            {/* Saved Family Members */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Saved Family Members ({savedPatients.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {savedPatients.map((pat) => (
                  <div key={pat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-sm">{pat.name}</p>
                      <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {pat.relation}
                      </span>
                    </div>
                    <p className="text-slate-500">Gender: {pat.gender} • Age: {pat.age} Years</p>
                    {pat.phone && <p className="text-slate-500">Contact: {pat.phone}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Pickup Addresses */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                Saved Sample Pickup Addresses ({savedAddresses.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{addr.label}</span>
                      <span className="bg-slate-200 text-slate-800 font-mono text-[10px] px-2 py-0.5 rounded">
                        PIN: {addr.pincode}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {addr.street}, {addr.area}, {addr.city}
                    </p>
                    {addr.landmark && (
                      <p className="text-[11px] text-slate-400">Landmark: {addr.landmark}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Cart Slide-Over Drawer */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-base text-slate-900">Your Health Test Cart</h3>
                  <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full text-xs">
                    {cart.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
                  <p className="text-xs text-slate-500">Add tests to schedule home sample collection.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((test) => (
                    <div
                      key={test.id}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{test.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{test.turnaroundTime} • {test.sampleType}</p>
                        <p className="font-bold text-teal-700 mt-1">₹{test.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(test.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-slate-600">Total Test Value</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{cart.reduce((a, b) => a + b.price, 0)}
                  </span>
                </div>
                <button
                  onClick={handleBookCart}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  Proceed to Schedule Pickup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test Detail Modal */}
      <TestDetailModal
        test={selectedTestForModal}
        onClose={() => setSelectedTestForModal(null)}
        onAddToCart={(test) => addToCart(test)}
        onBookNow={(test) => handleInstantBook(test)}
        isInCart={selectedTestForModal ? isInCart(selectedTestForModal.id) : false}
      />

      {/* Booking Checkout Modal */}
      <BookingModal
        testsToBook={testsToBook}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingCompleted}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        booking={trackedBooking}
        onClose={() => setTrackedBooking(null)}
        onViewReport={(booking) => {
          setTrackedBooking(null);
          setViewedReportBooking(booking);
        }}
      />

      {/* Report Viewer Modal */}
      <ReportViewerModal
        booking={viewedReportBooking}
        onClose={() => setViewedReportBooking(null)}
      />

      {/* Health Package Details & Inclusions Modal */}
      {selectedPackageForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {selectedPackageForModal.category}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                  {selectedPackageForModal.name}
                </h3>
                {selectedPackageForModal.hindiName && (
                  <p className="text-xs text-purple-700 font-bold">{selectedPackageForModal.hindiName}</p>
                )}
                <p className="text-xs text-slate-500 mt-0.5">{selectedPackageForModal.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedPackageForModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Price Banner */}
              <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Offer Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 font-mono">₹{selectedPackageForModal.price}</span>
                    <span className="text-xs text-slate-400 line-through font-mono">₹{selectedPackageForModal.originalPrice}</span>
                  </div>
                </div>
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                  {selectedPackageForModal.discountPercentage}% OFF
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Parameters</span>
                  <strong className="text-purple-700 text-xs font-mono">{selectedPackageForModal.parametersCount} Tests</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Report TAT</span>
                  <strong className="text-slate-800 text-xs">{selectedPackageForModal.turnaroundTime}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Sample Type</span>
                  <strong className="text-slate-800 text-xs">{selectedPackageForModal.sampleType}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Fasting</span>
                  <strong className="text-slate-800 text-xs">
                    {selectedPackageForModal.fastingRequired ? `${selectedPackageForModal.fastingHours || 10}h Fasting` : 'No Fasting'}
                  </strong>
                </div>
              </div>

              {/* Inclusions Breakdown */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2">Detailed Test Inclusions:</h4>
                <div className="space-y-2">
                  {selectedPackageForModal.includedCategories?.map((grp, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <p className="font-bold text-slate-900 text-xs text-purple-900">{grp.categoryName}</p>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {grp.tests.join(' • ')}
                      </p>
                    </div>
                  ))}
                  {(!selectedPackageForModal.includedCategories || selectedPackageForModal.includedCategories.length === 0) && (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPackageForModal.inclusions.map((inc, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {inc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/70 text-amber-950 space-y-1">
                <p className="font-bold text-xs">Preparation & Guidelines:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900">
                  {selectedPackageForModal.preparationInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPackageForModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const testRep = convertPackageToTest(selectedPackageForModal);
                    addToCart(testRep);
                    setSelectedPackageForModal(null);
                  }}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-xl text-xs border border-purple-200 cursor-pointer"
                >
                  + Add to Cart
                </button>
                <button
                  onClick={() => {
                    const testRep = convertPackageToTest(selectedPackageForModal);
                    setSelectedPackageForModal(null);
                    handleInstantBook(testRep);
                  }}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Book Package Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Notification Dispatch Modal */}
      <WhatsAppNotificationModal
        isOpen={!!whatsappBooking}
        booking={whatsappBooking}
        autoOpened={isAutoWhatsAppAlert}
        onClose={() => {
          setWhatsappBooking(null);
          setIsAutoWhatsAppAlert(false);
        }}
      />

    </div>
  );
};
