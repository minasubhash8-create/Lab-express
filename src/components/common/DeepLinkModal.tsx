import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import {
  Link2,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Lock,
  Building2,
  User,
  FlaskConical,
  FileCheck2,
  Layers,
  Sparkles,
  X,
  Share2,
  QrCode
} from 'lucide-react';

interface DeepLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (portal: 'customer' | 'admin' | 'partner_lab', tab?: string) => void;
}

export const DeepLinkModal: React.FC<DeepLinkModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { currentRole, activeLabId, labs, bookings } = useLabExpress();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'customer' | 'lab' | 'admin'>('all');
  
  // Custom deep link generator state
  const [customPortal, setCustomPortal] = useState<'customer' | 'admin' | 'partner_lab'>('customer');
  const [customTab, setCustomTab] = useState<string>('catalog');
  const [customParam, setCustomParam] = useState<string>('');

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;

  const getFullUrl = (query: string) => {
    return `${baseUrl}?${query}`;
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const deepLinks = [
    // Customer Portal Links
    {
      id: 'cust-catalog',
      category: 'customer',
      title: 'Customer Test Catalog',
      desc: 'Direct link to diagnostic test catalog for online booking & sample collection.',
      query: 'portal=customer&tab=catalog',
      badge: 'Public Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: FlaskConical
    },
    {
      id: 'cust-packages',
      category: 'customer',
      title: 'Preventive Health Packages',
      desc: 'Direct link to full-body checkup packages with 60-minute express home collection.',
      query: 'portal=customer&tab=packages',
      badge: 'Public Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Layers
    },
    {
      id: 'cust-bookings',
      category: 'customer',
      title: 'Patient Bookings & Live Status',
      desc: 'Direct access to patient active appointment dashboard.',
      query: 'portal=customer&tab=bookings',
      badge: 'Public Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: User
    },
    {
      id: 'cust-reports',
      category: 'customer',
      title: 'Certified Digital Pathology Reports',
      desc: 'Direct access to NABL-authorized digital medical reports repository.',
      query: 'portal=customer&tab=reports',
      badge: 'Public Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: FileCheck2
    },
    {
      id: 'cust-tracking',
      category: 'customer',
      title: 'Live Sample Pickup Tracking (Demo Order)',
      desc: 'Direct tracking link for sample order LX-9421-DEL with live phlebotomist ETA.',
      query: 'portal=customer&tracking=LX-9421-DEL',
      badge: 'Live Order Track',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      icon: Sparkles
    },

    // Partner Lab Hub Links (Lock Protected)
    {
      id: 'lab-workload',
      category: 'lab',
      title: 'Partner Lab Hub — Sample Queue',
      desc: 'Direct link to Partner Lab reception, Barcode scanning & sample intake pipeline.',
      query: 'portal=lab&tab=workload',
      badge: '🔒 Passcode Protected',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      icon: Building2
    },
    {
      id: 'lab-processing',
      category: 'lab',
      title: 'Partner Lab Hub — In-Analyzer Pipeline',
      desc: 'Direct link to laboratory analyzer testing pipeline.',
      query: 'portal=lab&tab=processing',
      badge: '🔒 Passcode Protected',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      icon: Building2
    },
    {
      id: 'lab-completed',
      category: 'lab',
      title: 'Partner Lab Hub — Pathology Authorization',
      desc: 'Direct link to chief pathologist report sign-off and NABL certification.',
      query: 'portal=lab&tab=completed',
      badge: '🔒 Passcode Protected',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      icon: FileCheck2
    },
    {
      id: 'lab-branch',
      category: 'lab',
      title: `Partner Lab Direct (${labs[0]?.name || 'Apex Diagnostics'})`,
      desc: 'Direct link to specific branch portal with pre-selected lab branch ID.',
      query: `portal=lab&labId=${activeLabId || 'lab-delhi-01'}`,
      badge: '🔒 Passcode Protected',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      icon: Building2
    },

    // Admin Central Links (Lock Protected)
    {
      id: 'admin-overview',
      category: 'admin',
      title: 'Admin Central — Operations Command',
      desc: 'Direct link to live executive metrics, real-time tests manager & financial stats.',
      query: 'portal=admin&tab=overview',
      badge: '🔒 Admin Lock',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-300 font-bold',
      icon: ShieldCheck
    },
    {
      id: 'admin-queue',
      category: 'admin',
      title: 'Admin Central — Dispatch & Assign Queue',
      desc: 'Direct link to route unassigned orders to partner labs and phlebotomists.',
      query: 'portal=admin&tab=queue',
      badge: '🔒 Admin Lock',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-300 font-bold',
      icon: ShieldCheck
    },
    {
      id: 'admin-catalog',
      category: 'admin',
      title: 'Admin Central — Test Catalog Manager',
      desc: 'Direct link to add, edit pricing, or delete diagnostic test catalog items.',
      query: 'portal=admin&tab=catalog',
      badge: '🔒 Admin Lock',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-300 font-bold',
      icon: ShieldCheck
    },
    {
      id: 'admin-demo',
      category: 'admin',
      title: 'Admin Central — Demo Data Manager',
      desc: 'Direct link to purge demo data, clear demo tests, or reset sample data.',
      query: 'portal=admin&tab=demo_manager',
      badge: '🔒 Admin Lock',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-300 font-bold',
      icon: ShieldCheck
    }
  ];

  const filteredLinks = selectedCategory === 'all'
    ? deepLinks
    : deepLinks.filter((l) => l.category === selectedCategory);

  const customGeneratedUrl = getFullUrl(
    `portal=${customPortal}&tab=${customTab}${customParam ? `&id=${encodeURIComponent(customParam)}` : ''}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center shadow-xs">
              <Link2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Deep Link Connect Hub
                </h2>
                <span className="bg-teal-500/10 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/20">
                  Instant Navigation & Sharing
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Share direct URLs for any portal, queue, tracking screen or diagnostic report.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security & Access Notice */}
        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
          <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-800">Protected Deep Links:</span> Direct URLs to{' '}
            <span className="font-semibold text-purple-700">Admin Central</span> and{' '}
            <span className="font-semibold text-teal-700">Partner Lab Hub</span> are security locked.
            When opened, authorized users are prompted to enter credentials (ID & password are not shown to public).
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {[
            { id: 'all', label: 'All Deep Links' },
            { id: 'customer', label: '1. Customer App Links' },
            { id: 'lab', label: '2. Partner Lab Hub (🔒 Locked)' },
            { id: 'admin', label: '3. Admin Central (🔒 Locked)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* List of Deep Links */}
        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredLinks.map((item) => {
            const ItemIcon = item.icon;
            const fullUrl = getFullUrl(item.query);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500/50 hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(item.id, fullUrl)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Copy shareable deep link"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => {
                        window.history.pushState({}, '', `?${item.query}`);
                        if (onNavigate) {
                          const role = item.category === 'lab' ? 'partner_lab' : item.category;
                          const tab = item.query.split('tab=')[1]?.split('&')[0];
                          onNavigate(role as any, tab);
                        }
                        onClose();
                      }}
                      className="flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Open and connect this deep link now"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>

                {/* Direct URL code box */}
                <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 font-mono text-[10px] text-slate-600 truncate select-all flex items-center justify-between">
                  <span className="truncate">{fullUrl}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Deep Link Builder */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-teal-600" />
            Custom Deep Link Generator
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <label className="block text-[11px] text-slate-500 font-medium mb-1">Target Portal</label>
              <select
                value={customPortal}
                onChange={(e) => setCustomPortal(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-800 outline-none"
              >
                <option value="customer">1. Customer App</option>
                <option value="partner_lab">2. Partner Lab Hub (Locked)</option>
                <option value="admin">3. Admin Central (Locked)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 font-medium mb-1">Destination Tab</label>
              <select
                value={customTab}
                onChange={(e) => setCustomTab(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-800 outline-none"
              >
                {customPortal === 'customer' && (
                  <>
                    <option value="catalog">Diagnostic Catalog</option>
                    <option value="packages">Health Packages</option>
                    <option value="bookings">Active Orders</option>
                    <option value="reports">Digital Reports</option>
                  </>
                )}
                {customPortal === 'partner_lab' && (
                  <>
                    <option value="workload">Workload & Sample Queue</option>
                    <option value="processing">In-Analyzer Pipeline</option>
                    <option value="completed">Pathologist Authorization</option>
                    <option value="settlement">Financial Settlements</option>
                  </>
                )}
                {customPortal === 'admin' && (
                  <>
                    <option value="overview">Live Operations Overview</option>
                    <option value="queue">Dispatch & Assign</option>
                    <option value="catalog">Test Catalog Manager</option>
                    <option value="demo_manager">Demo Data Manager</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => handleCopy('custom-builder', customGeneratedUrl)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === 'custom-builder'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copiedId === 'custom-builder' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Custom URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
