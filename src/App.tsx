/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LabExpressProvider, useLabExpress } from './context/LabExpressContext';
import { Header } from './components/common/Header';
import { CustomerView } from './components/customer/CustomerView';
import { AdminView } from './components/admin/AdminView';
import { PartnerLabView } from './components/lab/PartnerLabView';
import { BrandLogo } from './components/common/BrandLogo';
import { PortalLockModal } from './components/common/PortalLockModal';
import { DeepLinkModal } from './components/common/DeepLinkModal';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { CompanyRegistrationsModal } from './components/common/CompanyRegistrationsModal';
import { DemoDataManagerModal } from './components/common/DemoDataManagerModal';
import { DeployGithubVercelModal } from './components/common/DeployGithubVercelModal';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  User,
  Activity,
  Heart,
  FileCheck2,
  CheckCircle2,
  Info,
  Lock,
  Link2,
  Database,
  Rocket
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    bookings,
    isAdminUnlocked,
    isLabUnlocked,
    setActiveLabId
  } = useLabExpress();

  const [customerInitialTab, setCustomerInitialTab] = useState<'catalog' | 'bookings' | 'reports'>('catalog');
  const [showAdminLockModal, setShowAdminLockModal] = useState(false);
  const [showLabLockModal, setShowLabLockModal] = useState(false);
  const [showDeepLinkModal, setShowDeepLinkModal] = useState(false);
  const [showCompanyRegModal, setShowCompanyRegModal] = useState(false);
  const [showDemoManagerModal, setShowDemoManagerModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // Deep Link URL detection on initial mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const portalParam = params.get('portal');
      const tabParam = params.get('tab');
      const labIdParam = params.get('labId');

      if (labIdParam) {
        setActiveLabId(labIdParam);
      }

      if (portalParam === 'admin') {
        if (isAdminUnlocked) {
          setCurrentRole('admin');
        } else {
          setShowAdminLockModal(true);
        }
      } else if (portalParam === 'lab') {
        if (isLabUnlocked) {
          setCurrentRole('partner_lab');
        } else {
          setShowLabLockModal(true);
        }
      } else if (portalParam === 'customer') {
        setCurrentRole('customer');
        if (tabParam === 'bookings' || tabParam === 'reports' || tabParam === 'catalog') {
          setCustomerInitialTab(tabParam);
        }
      }
    } catch (e) {
      console.warn('URL search params parsing error', e);
    }
  }, []);

  // Update browser URL query parameter when role changes
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (currentRole === 'admin') {
        url.searchParams.set('portal', 'admin');
      } else if (currentRole === 'partner_lab') {
        url.searchParams.set('portal', 'lab');
      } else {
        url.searchParams.set('portal', 'customer');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore in restricted iframe contexts
    }
  }, [currentRole]);

  const pendingAdminCount = bookings.filter((b) => b.status === 'confirmed').length;
  const labProcessingCount = bookings.filter((b) =>
    ['staff_assigned', 'sample_collected', 'received_at_lab', 'processing'].includes(b.status)
  ).length;
  const customerReportsCount = bookings.filter((b) => b.status === 'report_ready').length;

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
      if (tab === 'bookings' || tab === 'reports' || tab === 'catalog') {
        setCustomerInitialTab(tab);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Main Navigation Header */}
      <Header
        onOpenBookings={() => {
          setCurrentRole('customer');
          setCustomerInitialTab('bookings');
        }}
        onOpenReports={() => {
          setCurrentRole('customer');
          setCustomerInitialTab('reports');
        }}
      />

      {/* Main Role-Specific View */}
      <div className="flex-1">
        {currentRole === 'customer' && <CustomerView key={customerInitialTab} initialTab={customerInitialTab} />}
        {currentRole === 'admin' && <AdminView />}
        {currentRole === 'partner_lab' && <PartnerLabView />}
      </div>

      {/* Sticky Bottom Interactive Data-Flow Guide */}
      <aside aria-label="Interactive Demo Navigator" className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 py-2.5 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping shrink-0" />
            <span className="font-bold text-slate-200">Interactive Demo Flow:</span>
            <span className="hidden sm:inline text-slate-400">
              Test end-to-end synchronization across all 3 dashboards:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Step 1: Customer */}
            <button
              onClick={() => {
                setCurrentRole('customer');
                setCustomerInitialTab('catalog');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'customer'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. Book Test (Customer)</span>
            </button>

            <ArrowRight className="w-3 h-3 text-slate-600 hidden md:block" />

            {/* Step 2: Admin */}
            <button
              onClick={() => {
                if (isAdminUnlocked) {
                  setCurrentRole('admin');
                } else {
                  setShowAdminLockModal(true);
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isAdminUnlocked ? (
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>2. Assign Lab & Staff (Admin)</span>
              {!isAdminUnlocked ? (
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-400/40">
                  Locked
                </span>
              ) : pendingAdminCount > 0 ? (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {pendingAdminCount}
                </span>
              ) : null}
            </button>

            <ArrowRight className="w-3 h-3 text-slate-600 hidden md:block" />

            {/* Step 3: Partner Lab (Protected with Lock) */}
            <button
              onClick={() => {
                if (isLabUnlocked) {
                  setCurrentRole('partner_lab');
                } else {
                  setShowLabLockModal(true);
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                currentRole === 'partner_lab'
                  ? 'bg-teal-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isLabUnlocked ? (
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>3. Process & Release (Lab)</span>
              {!isLabUnlocked ? (
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-400/40">
                  Locked
                </span>
              ) : labProcessingCount > 0 ? (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {labProcessingCount}
                </span>
              ) : null}
            </button>

            <ArrowRight className="w-3 h-3 text-slate-600 hidden md:block" />

            {/* Step 4: Customer Report */}
            <button
              onClick={() => {
                setCurrentRole('customer');
                setCustomerInitialTab('reports');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
              <span>4. View Report</span>
              {customerReportsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {customerReportsCount}
                </span>
              )}
            </button>

            {/* Demo Data Manager */}
            <button
              onClick={() => setShowDemoManagerModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 hover:text-white border border-amber-700/60 font-bold transition-all cursor-pointer text-xs"
              title="Open Demo Data Manager (1-click scenarios, Rajasthan seed, JSON backup)"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>🛠️ Demo Manager</span>
            </button>

            {/* Deploy GitHub & Vercel */}
            <button
              onClick={() => setShowDeployModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-700/60 font-bold transition-all cursor-pointer text-xs"
              title="Deploy to GitHub & Vercel automatically"
            >
              <Rocket className="w-3.5 h-3.5 text-emerald-400" />
              <span>🚀 Deploy Vercel</span>
            </button>

            {/* Quick Deep Link Button */}
            <button
              onClick={() => setShowDeepLinkModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 hover:text-white border border-cyan-700/60 font-bold transition-all cursor-pointer text-xs"
              title="Open Deep Link Connect Hub"
            >
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">🔗 Deep Links</span>
            </button>

            {/* GST & MSME Profile Button */}
            <button
              onClick={() => setShowCompanyRegModal(true)}
              className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-teal-300 hover:text-white border border-teal-700/60 font-bold transition-all cursor-pointer text-xs"
              title="View & Edit Official GSTIN & MSME Registrations"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">GST & MSME</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showBadge={false} showTagline={false} />
            <span className="text-slate-400">| NABL Accredited Diagnostic Network (ISO 15189:2022)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[11px]">
            <button
              onClick={() => setShowCompanyRegModal(true)}
              className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Reg: GSTIN • MSME Udyam • CIN</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button
              onClick={() => setShowDeepLinkModal(true)}
              className="text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Deep Link Connect</span>
            </button>
            <span className="text-slate-300">•</span>
            <a
              href="https://wa.me/919783770735?text=Hello%20LabExpress%20Team%2C%20inquiry%20regarding%20diagnostics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <span>WhatsApp: +91 97837 70735</span>
            </a>
          </div>
        </div>

        {/* Legal & Registration Ribbon */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <p>
            LabExpress Healthcare Pvt Ltd • Regd Office: Tonk Road, Jaipur, Rajasthan - 302018
          </p>
          <p className="font-mono">
            CIN: U85110RJ2026PTC098234 | GSTIN: 08AAACL9829M1ZQ | MSME: UDYAM-RJ-14-0098234
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton />

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

      {/* Official Vercel Analytics & Speed Insights Plugins */}
      <Analytics />
      <SpeedInsights />

    </div>
  );
};

export default function App() {
  return (
    <LabExpressProvider>
      <AppContent />
    </LabExpressProvider>
  );
}
