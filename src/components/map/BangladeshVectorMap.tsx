'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/language-store';
import {
  Division,
  District,
  Upazila,
  OfficialMadrasa,
} from '@/lib/geo-data';
import {
  OFFICIAL_DIVISION_PATHS,
  OFFICIAL_DISTRICT_PATHS,
} from '@/lib/bd-geo-paths';
import {
  RotateCcw,
  MapPin,
  Award,
  CheckCircle,
  ChevronRight,
  Navigation,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

interface BangladeshVectorMapProps {
  currentLevel: 'bangladesh' | 'division' | 'district' | 'upazila';
  divisions: Division[];
  selectedDivision: Division | null;
  selectedDistrict: District | null;
  selectedUpazila: Upazila | null;
  selectedMadrasa: OfficialMadrasa | null;
  onSelectDivision: (divId: string) => void;
  onSelectDistrict: (distId: string) => void;
  onSelectUpazila: (upId: string) => void;
  onSelectMadrasa: (m: OfficialMadrasa) => void;
  onResetView: () => void;
}

// Precise upazila coordinates calculated from authentic geographic survey
const UPAZILA_COORDS: Record<string, { x: number; y: number; nameBn: string; rating: number }> = {
  // মুন্সিগঞ্জ উপজেলাসমূহ
  sirajdikhan: { x: 252.6, y: 349.3, nameBn: 'সিরাজদিখান', rating: 4.9 },
  sreenagar: { x: 243.5, y: 355.9, nameBn: 'শ্রীনগর', rating: 4.8 },
  lohajang: { x: 248.5, y: 363.6, nameBn: 'লৌহজং', rating: 4.8 },
  tongibari: { x: 261.6, y: 359.2, nameBn: 'টংগিবাড়ী', rating: 4.7 },
  'munshiganj-sadar': { x: 268.7, y: 353.7, nameBn: 'মুন্সিগঞ্জ সদর', rating: 4.8 },
  gazaria: { x: 276.7, y: 355.9, nameBn: 'গজারিয়া', rating: 4.7 },

  // ভোলা উপজেলাসমূহ
  'bhola-sadar': { x: 280.7, y: 449.2, nameBn: 'ভোলা সদর', rating: 4.8 },
  daulatkhan: { x: 287.8, y: 458.0, nameBn: 'দৌলতখান', rating: 4.7 },
  borhanuddin: { x: 287.8, y: 470.1, nameBn: 'বোরহানউদ্দিন', rating: 4.8 },
  tazumuddin: { x: 299.9, y: 477.8, nameBn: 'তজুমদ্দিন', rating: 4.6 },
  lalmohan: { x: 288.8, y: 487.6, nameBn: 'লালমোহন', rating: 4.7 },
  'char-fasson': { x: 286.8, y: 504.1, nameBn: 'চরফ্যাশন', rating: 4.9 },
  manpura: { x: 313.9, y: 492.0, nameBn: 'মনপুরা', rating: 4.7 },
};

export default function BangladeshVectorMap({
  currentLevel,
  divisions,
  selectedDivision,
  selectedDistrict,
  selectedUpazila,
  selectedMadrasa,
  onSelectDivision,
  onSelectDistrict,
  onSelectUpazila,
  onSelectMadrasa,
  onResetView,
}: BangladeshVectorMapProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [zoomOffset, setZoomOffset] = useState(0);

  // Compute ViewBox based on drill-down level with smooth transitions
  const viewBox = useMemo(() => {
    // Level 3 & 4: Upazila / Selected District
    if (selectedDistrict) {
      const distPath = OFFICIAL_DISTRICT_PATHS[selectedDistrict.id];
      if (distPath && distPath.bbox) {
        const [bx, by, bw, bh] = distPath.bbox;
        const padX = Math.max(bw * 0.35, 12);
        const padY = Math.max(bh * 0.35, 12);
        const z = zoomOffset * 5;
        return `${bx - padX + z} ${by - padY + z} ${bw + padX * 2 - z * 2} ${bh + padY * 2 - z * 2}`;
      }
      // Munshiganj fallback
      if (selectedDistrict.id === 'munshiganj') {
        return `225 335 70 45`;
      }
      // Bhola fallback
      if (selectedDistrict.id === 'bhola') {
        return `255 425 75 125`;
      }
    }

    // Level 2: Division
    if (selectedDivision) {
      const divPath = OFFICIAL_DIVISION_PATHS[selectedDivision.id];
      if (divPath && divPath.bbox) {
        const [bx, by, bw, bh] = divPath.bbox;
        const padX = Math.max(bw * 0.18, 15);
        const padY = Math.max(bh * 0.18, 15);
        const z = zoomOffset * 10;
        return `${bx - padX + z} ${by - padY + z} ${bw + padX * 2 - z * 2} ${bh + padY * 2 - z * 2}`;
      }
    }

    // Level 1: Whole Bangladesh (Bangladesh bbox is [15, 15, 471, 664])
    const z = zoomOffset * 15;
    return `${0 + z} ${0 + z} ${500 - z * 2} ${700 - z * 2}`;
  }, [selectedDivision, selectedDistrict, zoomOffset]);

  // Districts belonging to the currently selected division
  const activeDivisionDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    return Object.values(OFFICIAL_DISTRICT_PATHS).filter(
      (d) => d.divisionId === selectedDivision.id
    );
  }, [selectedDivision]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, #044329 0%, #022c1b 50%, #011a10 100%)',
        color: 'white',
      }}
    >
      {/* Top Bar Floating Status */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-emerald-100 shadow-md border border-emerald-500/30 pointer-events-auto">
          {/* Pulsing Green/Red Badge */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
          </span>
          <span className="truncate">
            {currentLevel === 'bangladesh' && '🇧🇩 অফিশিয়াল বাংলাদেশ মানচিত্র (বিভাগে ক্লিক করুন)'}
            {currentLevel === 'division' && `🏛️ ${selectedDivision?.nameBn} বিভাগ (জেলায় ক্লিক করুন)`}
            {currentLevel === 'district' && `📍 ${selectedDistrict?.nameBn} জেলা (উপজেলায় ক্লিক করুন)`}
            {currentLevel === 'upazila' && `🕌 ${selectedUpazila?.nameBn} উপজেলা`}
          </span>
        </div>

        {/* Back to Bangladesh Reset Button */}
        {currentLevel !== 'bangladesh' && (
          <button
            type="button"
            onClick={() => {
              setZoomOffset(0);
              onResetView();
            }}
            className="pointer-events-auto rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 px-3 py-1.5 text-xs font-black text-white shadow-lg flex items-center gap-1.5 transition-all active:scale-95 border border-red-400/40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">সমগ্র বাংলাদেশ</span>
          </button>
        )}
      </div>

      {/* Floating Zoom & Compass Controls */}
      <div className="absolute right-2.5 bottom-3 flex flex-col gap-1.5 z-20">
        <button
          type="button"
          onClick={() => setZoomOffset((prev) => Math.min(prev + 1, 4))}
          title="জুম ইন"
          className="h-8 w-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200 hover:bg-emerald-800/60 flex items-center justify-center shadow-md active:scale-90 transition-all"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomOffset((prev) => Math.max(prev - 1, -2))}
          title="জুম আউট"
          className="h-8 w-8 rounded-lg bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200 hover:bg-emerald-800/60 flex items-center justify-center shadow-md active:scale-90 transition-all"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom Left: Bangladeshi National Emblem & North Compass */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30 shadow-sm">
          <Navigation className="h-3.5 w-3.5 text-red-500 rotate-[-45deg]" />
          <span>উত্তর (North)</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 rounded-lg bg-slate-950/80 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-slate-300 border border-emerald-500/20">
          <span>বিভাগ: ৮টি</span>
          <span className="text-emerald-500">•</span>
          <span>জেলা: ৬৪টি</span>
        </div>
      </div>

      {/* SVG Canvas with Bangladesh National (Red & Green) Theme */}
      <svg
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '94vh',
          userSelect: 'none',
          transition: 'all 0.7s ease-out',
        }}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle Islamic / Geographic Mesh Pattern */}
          <pattern id="national-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#065f46" strokeWidth="0.5" strokeOpacity="0.35" />
          </pattern>

          {/* National Flag Red Sun Radial Glow */}
          <radialGradient id="national-red-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#dc2626" stopOpacity="0.70" />
            <stop offset="85%" stopColor="#991b1b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>

          {/* Lush Green Division Gradient */}
          <linearGradient id="division-grad-normal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="division-grad-hover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="division-grad-selected" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>

          {/* District Highlights */}
          <linearGradient id="district-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="district-grad-selected" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Mesh Background */}
        <rect x="-300" y="-300" width="1200" height="1300" fill="url(#national-grid)" />

        {/* =========================================================
            BANGLADESH NATIONAL FLAG RED SUN (ICONIC RED CIRCLE)
            Positioned artistically behind the geography
           ========================================================= */}
        {currentLevel === 'bangladesh' && (
          <g className="transition-opacity duration-700">
            {/* Outer Radiant Glow */}
            <circle cx="230" cy="360" r="140" fill="url(#national-red-sun)" pointerEvents="none" />
            {/* Central Pure Red Core representing the National Flag */}
            <circle cx="230" cy="360" r="95" fill="#dc2626" fillOpacity="0.55" pointerEvents="none" />
          </g>
        )}

        {/* =========================================================
            LEVEL 1: 8 DIVISIONS (Authentic Survey Geographic Contours)
           ========================================================= */}
        {divisions.map((div) => {
          const pathInfo = OFFICIAL_DIVISION_PATHS[div.id];
          if (!pathInfo) return null;

          const isSelected = selectedDivision?.id === div.id;
          const isHovered = hoveredDivision === div.id;
          const isDimmed = selectedDivision && !isSelected;

          const fill = isSelected
            ? 'url(#division-grad-selected)'
            : isHovered
            ? 'url(#division-grad-hover)'
            : isDimmed
            ? '#033320'
            : 'url(#division-grad-normal)';

          const stroke = isSelected
            ? '#34d399'
            : isHovered
            ? '#fef08a'
            : isDimmed
            ? '#05442b'
            : '#10b981';

          const strokeWidth = isSelected ? 2.5 : isHovered ? 2.0 : 1.2;

          return (
            <g
              key={div.id}
              className="cursor-pointer transition-all duration-300 group"
              onClick={() => onSelectDivision(div.id)}
              onMouseEnter={() => setHoveredDivision(div.id)}
              onMouseLeave={() => setHoveredDivision(null)}
              opacity={isDimmed ? 0.4 : 1}
            >
              {/* Real Polygon Boundary */}
              <path
                d={pathInfo.d}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                filter="url(#map-glow)"
                className="transition-colors duration-200"
              />

              {/* Division Label Badge (Visible on Level 1 Whole Bangladesh) */}
              {currentLevel === 'bangladesh' && (
                <g
                  transform={`translate(${pathInfo.labelX}, ${pathInfo.labelY})`}
                  className="pointer-events-none transition-transform duration-200"
                >
                  <rect
                    x="-42"
                    y="-14"
                    width="84"
                    height="28"
                    rx="14"
                    fill={isHovered ? '#fef08a' : '#022c1b'}
                    stroke={isHovered ? '#ca8a04' : '#10b981'}
                    strokeWidth="1.8"
                    filter="url(#map-glow)"
                  />
                  <text
                    x="0"
                    y="4.5"
                    textAnchor="middle"
                    fill={isHovered ? '#14532d' : '#ecfdf5'}
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                  >
                    {isEn ? div.name : div.nameBn}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* =========================================================
            LEVEL 2: DISTRICTS (Inside Selected Division e.g. ঢাকা or বরিশাল)
           ========================================================= */}
        {selectedDivision &&
          !selectedUpazila &&
          activeDivisionDistricts.map((distPath) => {
            const isSelected = selectedDistrict?.id === distPath.id;
            const isHovered = hoveredDistrict === distPath.id;
            const distMeta = selectedDivision.districts.find(
              (d) => d.id === distPath.id || distPath.nameEn.toLowerCase().includes(d.name.toLowerCase())
            );

            return (
              <g
                key={distPath.id}
                className="cursor-pointer transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDistrict(distPath.id);
                }}
                onMouseEnter={() => setHoveredDistrict(distPath.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                {/* District Authentic Geographic Contour */}
                <path
                  d={distPath.d}
                  fill={
                    isSelected
                      ? 'url(#district-grad-selected)'
                      : isHovered
                      ? '#0d9488'
                      : '#064e3b'
                  }
                  stroke={isSelected ? '#fef08a' : '#34d399'}
                  strokeWidth={isSelected ? 1.8 : 0.9}
                  strokeDasharray={isSelected ? 'none' : '2,1'}
                  strokeLinejoin="round"
                  className="transition-colors duration-200"
                />

                {/* District Interactive Center Marker & Name Badge */}
                <g transform={`translate(${distPath.labelX}, ${distPath.labelY})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '5' : '3.5'}
                    fill={isSelected ? '#f59e0b' : '#38bdf8'}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                  <g transform="translate(0, -10)">
                    <rect
                      x="-32"
                      y="-9"
                      width="64"
                      height="18"
                      rx="9"
                      fill={isSelected ? '#b45309' : '#0f172a'}
                      stroke={isSelected ? '#fef08a' : '#38bdf8'}
                      strokeWidth="1.2"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="800"
                      fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                    >
                      {isEn ? (distMeta?.name || distPath.nameEn) : (distMeta?.nameBn || distPath.nameEn)}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}

        {/* =========================================================
            LEVEL 3: UPAZILAS (Inside Selected District e.g. মুন্সিগঞ্জ or ভোলা)
           ========================================================= */}
        {selectedDistrict &&
          selectedDistrict.upazilas.map((up) => {
            const coord = UPAZILA_COORDS[up.id];
            if (!coord) return null;

            const isSelected = selectedUpazila?.id === up.id;

            return (
              <g
                key={up.id}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectUpazila(up.id);
                }}
              >
                {/* Pulsing Target Radar Circle */}
                {isSelected && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="12"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                    className="animate-ping"
                  />
                )}

                {/* Upazila Pin Point */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isSelected ? '6' : '4'}
                  fill={isSelected ? '#dc2626' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Upazila Name and Rating Pill */}
                <g transform={`translate(${coord.x}, ${coord.y - 9})`}>
                  <rect
                    x="-34"
                    y="-10"
                    width="68"
                    height="20"
                    rx="10"
                    fill={isSelected ? '#dc2626' : '#064e3b'}
                    stroke={isSelected ? '#fef08a' : '#10b981'}
                    strokeWidth="1.2"
                    filter="url(#map-glow)"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="800"
                    fontFamily="'Hind Siliguri', 'Inter', sans-serif"
                  >
                    {isEn ? up.name : up.nameBn} ★{up.rating}
                  </text>
                </g>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
