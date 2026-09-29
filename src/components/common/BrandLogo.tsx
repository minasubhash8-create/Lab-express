import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  showBadge?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showTagline = true,
  showBadge = true,
  onClick,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: { box: 'w-8 h-8 rounded-lg', img: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]', badge: 'text-[9px] px-1 py-0.2' },
    md: { box: 'w-10 h-10 rounded-xl', img: 'w-10 h-10', text: 'text-xl', sub: 'text-[11px]', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { box: 'w-12 h-12 rounded-2xl', img: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs', badge: 'text-xs px-2 py-0.5' },
    xl: { box: 'w-16 h-16 rounded-3xl', img: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm', badge: 'text-xs px-2.5 py-1' }
  }[size];

  const textColor = variant === 'dark' ? 'text-white' : variant === 'light' ? 'text-slate-900' : 'text-slate-900 dark:text-white';
  const subColor = variant === 'dark' ? 'text-slate-300' : 'text-slate-500';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 ${onClick ? 'cursor-pointer group select-none' : ''} ${className}`}
    >
      {/* Logo Icon Mark */}
      <div
        className={`${sizeDimensions.box} relative overflow-hidden bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25 shrink-0 ${
          onClick ? 'group-hover:scale-105 group-hover:shadow-teal-500/40' : ''
        } transition-all duration-200`}
      >
        {!imageError ? (
          <img
            src="/1FF19DEB-AE53-41E9-AAC9-4B84D5A62D61.png"
            alt="LabExpress Logo"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`${sizeDimensions.img} object-contain p-0.5`}
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Medical Diagnostic Cross */}
            <rect x="38" y="16" width="24" height="68" rx="12" fill="white" />
            <rect x="16" y="38" width="68" height="24" rx="12" fill="white" />
            {/* Pulse heartbeat line */}
            <path
              d="M 22 50 L 38 50 L 45 34 L 52 66 L 59 36 L 66 58 L 72 50 L 80 50"
              stroke="#0d9488"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Central accent */}
            <circle cx="50" cy="34" r="3.5" fill="#f59e0b" />
          </svg>
        )}
      </div>

      {/* Brand Name & Metadata */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${sizeDimensions.text} ${textColor}`}>
            Lab<span className="text-teal-600">Express</span>
          </span>
          {showBadge && (
            <span className={`bg-amber-400/20 text-amber-800 font-extrabold rounded tracking-wide border border-amber-400/40 uppercase whitespace-nowrap ${sizeDimensions.badge}`}>
              ⚡ 60m Pickup
            </span>
          )}
        </div>
        {showTagline && (
          <p className={`${sizeDimensions.sub} ${subColor} font-medium tracking-tight whitespace-nowrap`}>
            NABL Accredited Healthcare Network
          </p>
        )}
      </div>
    </div>
  );
};
