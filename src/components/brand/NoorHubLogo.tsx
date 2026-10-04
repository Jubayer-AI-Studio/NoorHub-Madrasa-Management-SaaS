'use client';

import React from 'react';

interface NoorHubLogoProps {
  variant?: 'full' | 'horizontal' | 'icon-only';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

export default function NoorHubLogo({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  showTagline = true,
  className = '',
}: NoorHubLogoProps) {
  // Sizing map for the icon
  const ICON_SIZES = {
    xs: { width: 24, height: 26 },
    sm: { width: 32, height: 35 },
    md: { width: 42, height: 46 },
    lg: { width: 56, height: 62 },
    xl: { width: 84, height: 92 },
  };

  const { width: iconWidth, height: iconHeight } = ICON_SIZES[size];

  // Font sizes for text
  const TEXT_SIZES = {
    xs: { main: '14px', sub: '8px', gap: '6px' },
    sm: { main: '17px', sub: '9.5px', gap: '8px' },
    md: { main: '22px', sub: '11px', gap: '10px' },
    lg: { main: '28px', sub: '12.5px', gap: '12px' },
    xl: { main: '38px', sub: '15px', gap: '16px' },
  };

  const currentTextSize = TEXT_SIZES[size];

  // Colors based on theme
  const noorColor = theme === 'dark' ? '#ffffff' : '#0f172a';
  const hubColor = '#10b981';
  const taglineColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  // SVG Emblem: Islamic Arch + Open Holy Book Base + 3 Minaret Pillars + Golden Crescent Moon
  const renderEmblem = () => (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, overflow: 'visible' }}
    >
      <defs>
        {/* Emerald Arch Gradient */}
        <linearGradient id="emeraldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>

        {/* Gold Border / Bevel Gradient */}
        <linearGradient id="goldBevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Open Book Gold Gradient */}
        <linearGradient id="goldBookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="80%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* Central Minaret Light Pillar Gradient */}
        <linearGradient id="minaretPillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Outer Glow Filter */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. OUTER ISLAMIC ARCH SHAPE */}
      <path
        d="M 50 4 C 36 18, 14 36, 14 62 C 14 82, 28 88, 50 88 C 72 88, 86 82, 86 62 C 86 36, 64 18, 50 4 Z"
        fill="url(#emeraldArchGrad)"
        stroke="url(#goldBevelGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 2. INNER ARCH RECESS (Depth Effect) */}
      <path
        d="M 50 14 C 40 24, 24 38, 24 60 C 24 74, 34 78, 50 78 C 66 78, 76 74, 76 60 C 76 38, 60 24, 50 14 Z"
        fill="#022c22"
        opacity="0.85"
      />

      {/* 3. CENTRAL 3 MINARET PILLARS (Columns of Light & Knowledge) */}
      {/* Left Pillar */}
      <rect
        x="36"
        y="42"
        width="6.5"
        height="26"
        rx="3"
        fill="url(#goldBookGrad)"
      />
      {/* Center Main Pillar */}
      <rect
        x="46.5"
        y="30"
        width="7"
        height="38"
        rx="3.5"
        fill="url(#minaretPillarGrad)"
      />
      {/* Right Pillar */}
      <rect
        x="57.5"
        y="42"
        width="6.5"
        height="26"
        rx="3"
        fill="url(#goldBookGrad)"
      />

      {/* 4. CRESCENT MOON (Hilal) at Top of Center Minaret */}
      <path
        d="M 50 20 C 53.5 20, 56 22.5, 56 25.5 C 56 28.5, 53.5 31, 50 31 C 47.5 31, 45.5 29.5, 45 27.5 C 47.5 28.5, 50.5 27.5, 51.5 25 C 52 23.5, 51.5 22, 50 20 Z"
        fill="#fef08a"
        filter="url(#goldGlow)"
      />

      {/* 5. OPEN HOLY BOOK / REHAL BASE (Gleaming Gold Base) */}
      {/* Left Page Wing */}
      <path
        d="M 50 72 C 38 66, 22 70, 10 82 C 22 96, 42 86, 50 78 Z"
        fill="url(#goldBookGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Right Page Wing */}
      <path
        d="M 50 72 C 62 66, 78 70, 90 82 C 78 96, 58 86, 50 78 Z"
        fill="url(#goldBookGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Rehal Center Spine / Crest */}
      <path
        d="M 48 70 L 52 70 L 50 84 Z"
        fill="#fde047"
      />

      {/* 6. SUBTLE BASE SHADOW ACCENT */}
      <ellipse cx="50" cy="98" rx="34" ry="4" fill="#000000" opacity="0.25" />
    </svg>
  );

  // Variant: Icon Only
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  // Variant: Full (Stacked Icon + Big Text + Tagline)
  if (variant === 'full') {
    return (
      <div
        className={`flex flex-col items-center text-center ${className}`}
        style={{ fontFamily: "'Inter', 'Hind Siliguri', sans-serif" }}
      >
        {renderEmblem()}

        <div style={{ marginTop: '12px' }}>
          <div
            style={{
              fontSize: currentTextSize.main,
              fontWeight: '900',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <span style={{ color: noorColor }}>NOOR</span>
            <span style={{ color: hubColor }}>HUB</span>
          </div>

          {showTagline && (
            <div
              style={{
                fontSize: currentTextSize.sub,
                fontWeight: '600',
                color: taglineColor,
                marginTop: '4px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Learn • Manage • Grow
            </div>
          )}
        </div>
      </div>
    );
  }

  // Variant: Horizontal (Icon Left + Text Right)
  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{
        gap: currentTextSize.gap,
        fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
      }}
    >
      {renderEmblem()}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: currentTextSize.main,
            fontWeight: '900',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            display: 'flex',
            alignItems: 'center',
            gap: '1px',
          }}
        >
          <span style={{ color: noorColor }}>NOOR</span>
          <span style={{ color: hubColor }}>HUB</span>
        </div>

        {showTagline && (
          <div
            style={{
              fontSize: currentTextSize.sub,
              fontWeight: '600',
              color: taglineColor,
              marginTop: '1px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Learn • Manage • Grow
          </div>
        )}
      </div>
    </div>
  );
}
