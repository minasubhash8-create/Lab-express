import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import {
  Lock,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Mail,
  Building2
} from 'lucide-react';

export interface PortalLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetPortal?: 'admin' | 'lab';
}

export const PortalLockModal: React.FC<PortalLockModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  targetPortal = 'admin'
}) => {
  const { setIsAdminUnlocked, setIsLabUnlocked } = useLabExpress();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const isLab = targetPortal === 'lab';

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      // Required exact credentials (same for Admin and Partner Lab Hub)
      const isExactMatch =
        cleanEmail === 'minasubhash8@gmail.com' && cleanPass === 'Meena9829@';

      if (isExactMatch) {
        if (isLab) {
          setIsLabUnlocked(true);
        } else {
          setIsAdminUnlocked(true);
        }
        setPassword('');
        setEmail('');
        onSuccess();
      } else {
        setErrorMsg('Invalid User ID or Password. Access denied.');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-white relative overflow-hidden">
        
        {/* Glow corner decorations */}
        <div
          className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl pointer-events-none ${
            isLab ? 'bg-teal-600/30' : 'bg-purple-600/30'
          }`}
        />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cyan-600/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Shield Icon Header */}
        <div className="text-center space-y-2 mb-6">
          <div
            className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-lg border ${
              isLab
                ? 'bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-teal-900/50 border-teal-400/40'
                : 'bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-purple-900/50 border-purple-400/40'
            }`}
          >
            {isLab ? (
              <Building2 className="w-7 h-7 text-white stroke-[2.2]" />
            ) : (
              <Lock className="w-7 h-7 text-white stroke-[2.2]" />
            )}
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">
            {isLab ? 'Partner Lab Hub Security Login' : 'Admin Central Security Login'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {isLab
              ? 'Authorized Pathology Laboratory Staff & Technologists Only. Enter assigned ID and Password.'
              : 'Authorized Administrator Operations Access Only. Enter assigned Admin ID and Password.'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          
          {/* Email ID */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isLab ? 'Lab Staff ID / Email' : 'Admin ID / Email'}
            </label>
            <div className="relative flex items-center">
              <Mail
                className={`w-4 h-4 absolute left-3.5 ${
                  isLab ? 'text-teal-400' : 'text-purple-400'
                }`}
              />
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder={isLab ? 'Enter Lab Staff ID / Email' : 'Enter Admin ID / Email'}
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-teal-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder:text-slate-500 outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Access Password
            </label>

            <div className="relative flex items-center">
              <KeyRound
                className={`w-4 h-4 absolute left-3.5 ${
                  isLab ? 'text-teal-400' : 'text-purple-400'
                }`}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-teal-500 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isVerifying || !password.trim() || !email.trim()}
              className={`w-full text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                isLab
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-teal-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
              }`}
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  {isLab ? 'Sign In to Partner Lab Hub' : 'Sign In to Admin Central'}
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Authorized Diagnostic Personnel Only • Confidential</span>
          </p>
        </div>

      </div>
    </div>
  );
};

// Backwards-compatible export
export const AdminLockModal: React.FC<PortalLockModalProps> = (props) => {
  return <PortalLockModal {...props} targetPortal="admin" />;
};
export const LabLockModal: React.FC<PortalLockModalProps> = (props) => {
  return <PortalLockModal {...props} targetPortal="lab" />;
};
