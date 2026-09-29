import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import { Role } from '../../types';
import { BrandLogo } from './BrandLogo';
import { PortalLockModal } from './PortalLockModal';
import { DeepLinkModal } from './DeepLinkModal';
import { CompanyRegistrationsModal } from './CompanyRegistrationsModal';
import { DemoDataManagerModal } from './DemoDataManagerModal';
import { DeployGithubVercelModal } from './DeployGithubVercelModal';
import {
  Activity,
  ShieldCheck,
  User,
  Building2,
  ShoppingCart,
  MapPin,
  RotateCcw,
  Sparkles,
  PhoneCall,
  MessageCircle,
  FileCheck2,
  Clock3,
  HelpCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Link2,
  Database,
  Rocket,
  FileText
} from 'lucide-react';

interface HeaderProps {
  onOpenCart?: () => void;
  onOpenBookings?: () => void;
  onOpenReports?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenBookings, onOpenReports }) => {
  const {
    currentRole,
    setCurrentRole,
    activeLabId,
    setActiveLabId,
    labs,
    cart,
    bookings,
    activeCity,
    setActiveCity,
    resetToDemoData,
    isAdminUnlocked,
    lockAdmin,
    isLabUnlocked,
    lockLab
  } = useLabExpress();

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAdminLockModal, setShowAdminLockModal] = useState(false);
  const [showLabLockModal, setShowLabLockModal] = useState(false);
  const [showDeepLinkModal, setShowDeepLinkModal] = useState(false);
  const [showCompanyRegModal, setShowCompanyRegModal] = useState(false);
  const [showDemoManagerModal, setShowDemoManagerModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // Computed badges
  const pendingCustomerBookings = bookings.filter(
    (b) => b.customerId === 'cust-priya-01' && b.status !== 'report_ready' && b.status !== 'cancelled'
  ).length;

  const readyReportsCount = bookings.filter(
    (b) => b.customerId === 'cust-priya-01' && b.status === 'report_ready'
  ).length;

  const adminPendingAssignments = bookings.filter((b) => b.status === 'confirmed').length;

  const activeLab = labs.find((l) => l.id === activeLabId) || labs[0];
  const labActiveWorkload = bookings.filter(
    (b) => b.assignedLabId === activeLabId && b.status !== 'report_ready' && b.status !== 'cancelled'
  ).length;

  const handleDeepLinkNavigate = (role: 'customer' | 'admin' | 'partner_lab', tab?: string) => {
    if (role === 'admin') {
      if (isAdminUnlocked) {
        setCurrentRole('admin');
      } else {
        setShowAdminLockModal(true);
      }
    } else if (role === 'partner_lab') {
      if (isLabUnlocked) {
        setCurrentRole('partner_lab');
      } else {
        setShowLabLockModal(true);
      }
    } else {
      setCurrentRole('customer');
      if (tab === 'bookings' && onOpenBookings) onOpenBookings();
      if (tab === 'reports' && onOpenReports) onOpenReports();
    }
  };

  return (
    <>
      {/* Top Banner: Ecosystem Indicator */}
      <aside aria-label="Demo Notice" className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 font-semibold px-2 py-0.5 rounded text-[11px] border border-teal-500/30">
              <Sparkles className="w-3 h-3 text-teal-400" />
              Unified 3-in-1 Diagnostic Platform
            </span>
            <span className="hidden sm:inline text-slate-400">
              Live sync: Customer Booking ➔ Admin Operations ➔ Partner Lab Processing ➔ Authorized Report
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Govt Reg: GST & MSME */}
            <button
              onClick={() => setShowCompanyRegModal(true)}
              className="inline-flex items-center gap-1 text-teal-300 hover:text-white bg-teal-950/70 border border-teal-700/60 px-2 py-0.5 rounded transition-colors text-[11px] font-bold cursor-pointer"
              title="Official GSTIN, MSME, CIN registration profile"
            >
              <ShieldCheck className="w-3 h-3 text-teal-400" />
              <span>GST & MSME Reg</span>
            </button>

            {/* Demo Data Manager */}
            <button
              onClick={() => setShowDemoManagerModal(true)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-white bg-amber-950/60 border border-amber-700/60 px-2 py-0.5 rounded transition-colors text-[11px] font-bold cursor-pointer"
              title="Open Demo Data Manager (1-click scenarios, Rajasthan seed, JSON backup)"
            >
              <Database className="w-3 h-3 text-amber-400" />
              <span>🛠️ Demo Manager</span>
            </button>

            {/* Deploy GitHub & Vercel */}
            <button
              onClick={() => setShowDeployModal(true)}
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white bg-emerald-950/60 border border-emerald-700/60 px-2 py-0.5 rounded transition-colors text-[11px] font-bold cursor-pointer"
              title="Deploy to GitHub & Vercel automatically"
            >
              <Rocket className="w-3 h-3 text-emerald-400" />
              <span>🚀 Deploy Vercel</span>
            </button>

            {/* Deep Link Connect Option */}
            <button
              onClick={() => setShowDeepLinkModal(true)}
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-700/50 px-2 py-0.5 rounded transition-colors text-[11px] font-bold cursor-pointer"
              title="Open deep link connection manager"
            >
              <Link2 className="w-3 h-3 text-cyan-400" />
              <span>🔗 Deep Links</span>
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button
              onClick={() => setShowSupportModal(true)}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors font-medium text-[11px] cursor-pointer"
            >
              <MessageCircle className="w-3 h-3" />
              24x7 WhatsApp Help
            </button>
          </div>
        </div>
      </aside>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <BrandLogo
                onClick={() => setCurrentRole('customer')}
                size="md"
                showBadge={true}
                showTagline={true}
              />

              {/* City Selector */}
              <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 transition-colors text-slate-700 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-semibold text-slate-800">{activeCity}</span>
                <select
                  value={activeCity}
                  onChange={(e) => setActiveCity(e.target.value)}
                  aria-label="Select delivery city"
                  className="bg-transparent text-slate-600 outline-none cursor-pointer text-xs font-medium pl-1"
                >
                  <option value="New Delhi">New Delhi (South & Central)</option>
                  <option value="Noida">Noida & Greater Noida</option>
                  <option value="Bengaluru">Bengaluru (Tech Corridors)</option>
                  <option value="Mumbai">Mumbai (Suburban & Island)</option>
                </select>
              </div>
            </div>

            {/* Persona Switcher Tabs (Protected with Lock) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
              {/* 1. Customer App */}
              <button
                onClick={() => setCurrentRole('customer')}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentRole === 'customer'
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden md:inline">1. Customer</span> App
                {pendingCustomerBookings > 0 && (
                  <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingCustomerBookings}
                  </span>
                )}
              </button>

              {/* 2. Admin Central (Passcode Protected) */}
              <button
                onClick={() => {
                  if (isAdminUnlocked) {
                    setCurrentRole('admin');
                  } else {
                    setShowAdminLockModal(true);
                  }
                }}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentRole === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isAdminUnlocked ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span className="hidden md:inline">2. Admin</span> Central
                {!isAdminUnlocked ? (
                  <span className="text-[10px] bg-amber-500/20 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-400/40">
                    Locked
                  </span>
                ) : adminPendingAssignments > 0 ? (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] flex items-center justify-center font-bold animate-pulse">
                    {adminPendingAssignments}
                  </span>
                ) : null}
              </button>

              {/* 3. Partner Lab Hub (Passcode Protected with same ID & Password) */}
              <button
                onClick={() => {
                  if (isLabUnlocked) {
                    setCurrentRole('partner_lab');
                  } else {
                    setShowLabLockModal(true);
                  }
                }}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentRole === 'partner_lab'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isLabUnlocked ? (
                  <Building2 className="w-3.5 h-3.5 text-teal-200" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span className="hidden md:inline">3. Partner</span> Lab Hub
                {!isLabUnlocked ? (
                  <span className="text-[10px] bg-amber-500/20 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-400/40">
                    Locked
                  </span>
                ) : labActiveWorkload > 0 ? (
                  <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-900 text-[10px] flex items-center justify-center font-bold">
                    {labActiveWorkload}
                  </span>
                ) : null}
              </button>
            </div>

            {/* Right side role-specific actions */}
            <div className="flex items-center gap-2">
              {/* Deep Link Connect Icon Button */}
              <button
                onClick={() => setShowDeepLinkModal(true)}
                className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer border border-slate-200"
                title="Connect Deep Link"
              >
                <Link2 className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden lg:inline">Deep Links</span>
              </button>

              {currentRole === 'customer' && (
                <>
                  {/* Cart button */}
                  <button
                    onClick={onOpenCart}
                    className="relative flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold px-3 py-2 rounded-xl text-xs border border-teal-200/70 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-teal-600" />
                    <span className="hidden sm:inline">Cart</span>
                    {cart.length > 0 && (
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-bold">
                        {cart.length}
                      </span>
                    )}
                  </button>

                  {/* Customer Quick Nav */}
                  <button
                    onClick={onOpenBookings}
                    className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 hover:text-teal-700 font-medium px-2 py-1.5 cursor-pointer"
                  >
                    <Clock3 className="w-3.5 h-3.5 text-slate-500" />
                    Bookings
                  </button>

                  <button
                    onClick={onOpenReports}
                    className="flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
                    <span className="hidden sm:inline">My</span> Reports
                    {readyReportsCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    )}
                  </button>
                </>
              )}

              {currentRole === 'admin' && (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Ops Mode
                  </span>
                  <button
                    onClick={() => {
                      lockAdmin();
                      setCurrentRole('customer');
                    }}
                    className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    title="Lock Admin Central"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span className="hidden sm:inline">Lock Admin</span>
                  </button>
                  <div className="text-right text-xs">
                    <p className="font-bold text-slate-900">Super Admin</p>
                    <p className="text-[10px] text-slate-500">Ops Lead</p>
                  </div>
                </div>
              )}

              {currentRole === 'partner_lab' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      lockLab();
                      setCurrentRole('customer');
                    }}
                    className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    title="Lock Partner Lab Hub"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span className="hidden sm:inline">Lock Lab</span>
                  </button>

                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-900 max-w-[130px] truncate">
                      {activeLab.name}
                    </p>
                    <p className="text-[10px] text-teal-600 font-medium">NABL Code: {activeLab.nablCode}</p>
                  </div>
                  <select
                    value={activeLabId}
                    onChange={(e) => setActiveLabId(e.target.value)}
                    aria-label="Switch partner lab branch"
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-1.5 px-2 rounded-lg border border-slate-300 outline-none cursor-pointer"
                  >
                    {labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        Switch: {lab.name.split(' ')[0]} Lab
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* WhatsApp & Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">LabExpress WhatsApp Helpdesk</h3>
                  <p className="text-xs text-slate-500">Instant phlebotomist tracking & report queries</p>
                </div>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-5 text-sm text-slate-600">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-900 text-xs">Official Diagnostic Hotline & WhatsApp</p>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    WhatsApp: <a href="https://wa.me/919783770735?text=Hello%20LabExpress%2C%20I%20need%20assistance%20with%20diagnostic%20booking" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-emerald-950 underline hover:text-emerald-700">+91 97837 70735</a> (Instant Automated Bot + Lab Technologist Support)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <p className="font-semibold text-slate-800">Support Hours & SLA:</p>
                <p>• Home sample pickup delays: 15-minute resolution</p>
                <p>• Hard copy report home dispatch requests</p>
                <p>• Direct Phlebotomist & Pathologist Coordination</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="https://wa.me/919783770735?text=Hello%20LabExpress%2C%20I%20need%20assistance%20with%20diagnostic%20booking"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowSupportModal(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp (+91 97837 70735)
              </a>
              <button
                onClick={() => setShowSupportModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-2">Reset Demo State?</h3>
            <p className="text-xs text-slate-600 mb-4">
              This will restore all sample bookings, test catalog, labs, and certified reports to the initial realistic demonstration setup.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Passcode Protection Lock Modal */}
      <PortalLockModal
        isOpen={showAdminLockModal}
        targetPortal="admin"
        onClose={() => setShowAdminLockModal(false)}
        onSuccess={() => {
          setShowAdminLockModal(false);
          setCurrentRole('admin');
        }}
      />

      {/* Lab Hub Passcode Protection Lock Modal */}
      <PortalLockModal
        isOpen={showLabLockModal}
        targetPortal="lab"
        onClose={() => setShowLabLockModal(false)}
        onSuccess={() => {
          setShowLabLockModal(false);
          setCurrentRole('partner_lab');
        }}
      />

      {/* Deep Link Connect Hub Modal */}
      <DeepLinkModal
        isOpen={showDeepLinkModal}
        onClose={() => setShowDeepLinkModal(false)}
        onNavigate={handleDeepLinkNavigate}
      />

      {/* Government Registrations (GST, MSME, CIN, CE) Modal */}
      <CompanyRegistrationsModal
        isOpen={showCompanyRegModal}
        onClose={() => setShowCompanyRegModal(false)}
      />

      {/* Demo Data Manager Modal */}
      <DemoDataManagerModal
        isOpen={showDemoManagerModal}
        onClose={() => setShowDemoManagerModal(false)}
      />

      {/* GitHub & Vercel Auto-Deployment Modal */}
      <DeployGithubVercelModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
      />
    </>
  );
};
