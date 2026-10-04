'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  BANGLADESH_DIVISIONS,
  OFFICIAL_MADRASAS,
  Division,
  District,
  Upazila,
  OfficialMadrasa,
} from '@/lib/geo-data';
import { getCombinedMapMadrasas } from '@/lib/madrasa-store';
import {
  MapPin,
  Search,
  CheckCircle,
  Phone,
  MessageCircle,
  Layers,
  ChevronRight,
  ArrowLeft,
  Building,
  Home,
  X,
  ExternalLink,
} from 'lucide-react';

import BangladeshVectorMap from '@/components/map/BangladeshVectorMap';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

// Dynamically load the Leaflet GIS Map with SSR disabled
const OfficialGISMap = dynamic(() => import('@/components/map/OfficialGISMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-slate-400">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mb-3" />
      <span className="text-sm font-bold text-slate-200">Loading Satellite GIS...</span>
    </div>
  ),
});

export default function BangladeshMapPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  // Navigation State
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string | null>(null);
  const [selectedMadrasa, setSelectedMadrasa] = useState<OfficialMadrasa | null>(null);

  // Drawer / List Toggle: When true, opens the madrasa list drawer
  const [isMadrasaListOpen, setIsMadrasaListOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'qawmi' | 'alia' | 'hifz'>('all');
  const [isSatellite, setIsSatellite] = useState(false);

  // Dynamic madrasas loaded from both BBS official geo-data and user registrations
  const [allMadrasas, setAllMadrasas] = useState<OfficialMadrasa[]>(() => {
    if (typeof window !== 'undefined') {
      return getCombinedMapMadrasas();
    }
    return OFFICIAL_MADRASAS;
  });

  useEffect(() => {
    const handleUpdate = () => {
      setAllMadrasas(getCombinedMapMadrasas());
    };
    handleUpdate();
    window.addEventListener('noorhub_madrasa_changed', handleUpdate);
    return () => window.removeEventListener('noorhub_madrasa_changed', handleUpdate);
  }, []);

  // Compute Current Objects
  const selectedDivision: Division | null = useMemo(() => {
    if (!selectedDivisionId) return null;
    return BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivisionId) || null;
  }, [selectedDivisionId]);

  const selectedDistrict: District | null = useMemo(() => {
    if (!selectedDivision || !selectedDistrictId) return null;
    return selectedDivision.districts.find((d) => d.id === selectedDistrictId) || null;
  }, [selectedDivision, selectedDistrictId]);

  const selectedUpazila: Upazila | null = useMemo(() => {
    if (!selectedDistrict || !selectedUpazilaId) return null;
    return selectedDistrict.upazilas.find((u) => u.id === selectedUpazilaId) || null;
  }, [selectedDistrict, selectedUpazilaId]);

  // Current Level
  const currentLevel: 'bangladesh' | 'division' | 'district' | 'upazila' = useMemo(() => {
    if (selectedUpazilaId) return 'upazila';
    if (selectedDistrictId) return 'district';
    if (selectedDivisionId) return 'division';
    return 'bangladesh';
  }, [selectedDivisionId, selectedDistrictId, selectedUpazilaId]);

  // Filtered Madrasas for the current selected region
  const currentRegionMadrasas = useMemo(() => {
    return allMadrasas.filter((m) => {
      if (selectedDivisionId && m.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId && m.districtId !== selectedDistrictId) return false;
      if (selectedUpazila && !m.upazila.includes(selectedUpazila.nameBn) && !selectedUpazila.nameBn.includes(m.upazila)) {
        return false;
      }
      return true;
    });
  }, [allMadrasas, selectedDivisionId, selectedDistrictId, selectedUpazila]);

  // Filtered for search & type inside the drawer
  const drawerMadrasas = useMemo(() => {
    return currentRegionMadrasas.filter((m) => {
      if (typeFilter !== 'all' && m.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.upazila.toLowerCase().includes(q) ||
          m.principal.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [currentRegionMadrasas, typeFilter, searchQuery]);

  // Navigation Handlers
  const handleSelectDivision = (divId: string) => {
    setSelectedDivisionId(divId);
    setSelectedDistrictId(null);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
    setIsMadrasaListOpen(false);
  };

  const handleSelectDistrict = (distId: string) => {
    setSelectedDistrictId(distId);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
    setIsMadrasaListOpen(false);
  };

  const handleSelectUpazila = (upId: string) => {
    setSelectedUpazilaId(upId);
    const upazila = selectedDistrict?.upazilas.find((u) => u.id === upId);
    if (upazila) {
      const match = allMadrasas.find(
        (m) =>
          m.districtId === selectedDistrictId &&
          (m.upazila.includes(upazila.nameBn) || upazila.nameBn.includes(m.upazila))
      );
      if (match) setSelectedMadrasa(match);
      else setSelectedMadrasa(null);
    }
  };

  const handleGoBackOneStep = () => {
    if (selectedUpazilaId) {
      setSelectedUpazilaId(null);
      setSelectedMadrasa(null);
    } else if (selectedDistrictId) {
      setSelectedDistrictId(null);
    } else if (selectedDivisionId) {
      setSelectedDivisionId(null);
    }
    setIsMadrasaListOpen(false);
  };

  const handleResetToBangladesh = () => {
    setSelectedDivisionId(null);
    setSelectedDistrictId(null);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
    setIsMadrasaListOpen(false);
    setSearchQuery('');
  };

  // Location Title & Subtitle for current level
  const locationMeta = useMemo(() => {
    if (selectedUpazila && selectedDistrict) {
      return {
        title: isEn
          ? `🕌 ${selectedUpazila.name} Upazila`
          : `🕌 ${selectedUpazila.nameBn} উপজেলা`,
        sub: isEn
          ? `${selectedDistrict.name} District, ${selectedDivision?.name} Division`
          : `${selectedDistrict.nameBn} জেলা, ${selectedDivision?.nameBn} বিভাগ`,
        count: currentRegionMadrasas.length,
        nextLabel: isEn ? 'Madrasa Details' : 'মাদরাসা তথ্য',
      };
    }
    if (selectedDistrict && selectedDivision) {
      return {
        title: isEn
          ? `📍 ${selectedDistrict.name} District`
          : `📍 ${selectedDistrict.nameBn} জেলা`,
        sub: isEn
          ? `${selectedDivision.name} Division • ${selectedDistrict.upazilas.length} Upazilas`
          : `${selectedDivision.nameBn} বিভাগ • ${selectedDistrict.upazilas.length}টি উপজেলা`,
        count: currentRegionMadrasas.length,
        nextLabel: isEn ? 'Select Upazila' : 'উপজেলা নির্বাচন',
      };
    }
    if (selectedDivision) {
      return {
        title: isEn
          ? `🏛️ ${selectedDivision.name} Division`
          : `🏛️ ${selectedDivision.nameBn} বিভাগ`,
        sub: isEn
          ? `${selectedDivision.districts.length} Districts • National Rating ★${selectedDivision.rating}`
          : `${selectedDivision.districts.length}টি জেলা • জাতীয় রেটিং ★${selectedDivision.rating}`,
        count: currentRegionMadrasas.length,
        nextLabel: isEn ? 'Select District' : 'জেলা নির্বাচন',
      };
    }
    return {
      title: isEn ? '🇧🇩 All Bangladesh' : '🇧🇩 সমগ্র বাংলাদেশ',
      sub: isEn
        ? '8 Divisions • 64 Districts • 495 Upazilas'
        : '৮টি বিভাগ • ৬৪টি জেলা • ৪৯৫টি উপজেলা',
      count: allMadrasas.length,
      nextLabel: isEn ? 'Select Division' : 'বিভাগ নির্বাচন',
    };
  }, [selectedDivision, selectedDistrict, selectedUpazila, currentRegionMadrasas, allMadrasas, isEn]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#01140d',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* =========================================================
          FLOATING TOP GLASS BAR (BREADCRUMBS & CONTROLS)
         ========================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          pointerEvents: 'none',
        }}
      >
        {/* Left Pill: Home + Breadcrumbs */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(2, 44, 27, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '16px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
            maxWidth: 'calc(100vw - 160px)',
            overflowX: 'auto',
          }}
          className="no-scrollbar"
        >
          <Link
            href="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#a7f3d0',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Home style={{ width: '15px', height: '15px' }} />
            <span>{isEn ? 'Dashboard' : 'ড্যাশবোর্ড'}</span>
          </Link>

          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px' }}>|</span>

          <button
            type="button"
            onClick={handleResetToBangladesh}
            style={{
              background: currentLevel === 'bangladesh' ? '#059669' : 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: currentLevel === 'bangladesh' ? '800' : '600',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isEn ? '🇧🇩 Bangladesh' : '🇧🇩 বাংলাদেশ'}
          </button>

          {selectedDivision && (
            <>
              <ChevronRight style={{ width: '14px', height: '14px', color: 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }} />
              <button
                type="button"
                onClick={() => handleSelectDivision(selectedDivision.id)}
                style={{
                  background: currentLevel === 'division' ? '#059669' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: currentLevel === 'division' ? '800' : '600',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                🏛️ {isEn ? selectedDivision.name : selectedDivision.nameBn}
              </button>
            </>
          )}

          {selectedDistrict && (
            <>
              <ChevronRight style={{ width: '14px', height: '14px', color: 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }} />
              <button
                type="button"
                onClick={() => handleSelectDistrict(selectedDistrict.id)}
                style={{
                  background: currentLevel === 'district' ? '#059669' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: currentLevel === 'district' ? '800' : '600',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                📍 {isEn ? selectedDistrict.name : selectedDistrict.nameBn}
              </button>
            </>
          )}

          {selectedUpazila && (
            <>
              <ChevronRight style={{ width: '14px', height: '14px', color: 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }} />
              <span
                style={{
                  background: '#f59e0b',
                  color: '#1e293b',
                  fontSize: '14px',
                  fontWeight: '900',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                }}
              >
                🕌 {isEn ? selectedUpazila.name : selectedUpazila.nameBn}
              </span>
            </>
          )}
        </div>

        {/* Right Actions: Back 1 Step & Satellite Toggle & Language Toggle */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LanguageToggle variant="compact" />

          {currentLevel !== 'bangladesh' && (
            <button
              type="button"
              onClick={handleGoBackOneStep}
              style={{
                background: 'rgba(2, 44, 27, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '14px',
                padding: '10px 16px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
              }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
              <span>{isEn ? 'Back' : 'পেছনে যান'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsSatellite(!isSatellite)}
            style={{
              background: isSatellite ? '#0f172a' : 'rgba(2, 44, 27, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '14px',
              padding: '10px 16px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            }}
          >
            <Layers style={{ width: '16px', height: '16px' }} />
            <span>{isEn ? (isSatellite ? 'Vector Map' : 'Satellite') : (isSatellite ? 'ভেক্টর ম্যাপ' : 'স্যাটেলাইট')}</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          FULL-SCREEN MAP CANVAS (ZERO PAGE SCROLL)
         ========================================================= */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isSatellite ? (
          <BangladeshVectorMap
            currentLevel={currentLevel}
            divisions={BANGLADESH_DIVISIONS}
            selectedDivision={selectedDivision}
            selectedDistrict={selectedDistrict}
            selectedUpazila={selectedUpazila}
            selectedMadrasa={selectedMadrasa}
            onSelectDivision={handleSelectDivision}
            onSelectDistrict={handleSelectDistrict}
            onSelectUpazila={handleSelectUpazila}
            onSelectMadrasa={(m) => setSelectedMadrasa(m)}
            onResetView={handleResetToBangladesh}
          />
        ) : (
          <div style={{ width: '100%', height: '100%' }}>
            <OfficialGISMap
              currentLevel={currentLevel}
              divisions={BANGLADESH_DIVISIONS}
              selectedDivision={selectedDivision}
              selectedDistrict={selectedDistrict}
              selectedUpazila={selectedUpazila}
              madrasas={currentRegionMadrasas}
              selectedMadrasa={selectedMadrasa}
              onSelectDivision={handleSelectDivision}
              onSelectDistrict={handleSelectDistrict}
              onSelectUpazila={handleSelectUpazila}
              onSelectMadrasa={(m) => setSelectedMadrasa(m)}
              isSatellite={true}
              onToggleSatellite={() => setIsSatellite(false)}
              onResetView={handleResetToBangladesh}
            />
          </div>
        )}

        {/* =========================================================
            DESKTOP 2-OPTION CONTROL CARD
            Exact 2 options requested by user:
            Option 1: "মাদরাসার তালিকা দেখুন" (Blue Button -> opens list drawer)
            Option 2: "ভিতরে প্রবেশ করুন" (Green Section -> drill-down)
           ========================================================= */}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '20px',
            top: '80px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            background: 'rgba(2, 36, 22, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            borderRadius: '24px',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 25,
            color: 'white',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Header of Card */}
          <div style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#6ee7b7', letterSpacing: '0.06em' }}>
              {isEn ? 'Current Location' : 'বর্তমান অবস্থান'}
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 0 0', color: 'white', lineHeight: '1.3' }}>
              {locationMeta.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#a7f3d0', margin: '4px 0 0 0', fontWeight: '500' }}>
              {locationMeta.sub}
            </p>
          </div>

          {/* =======================================================
              OPTION 1: "মাদরাসার পূর্ণ তালিকা দেখুন"
             ======================================================= */}
          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => setIsMadrasaListOpen(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: '1.5px solid #38bdf8',
                borderRadius: '16px',
                padding: '14px 18px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Building style={{ width: '22px', height: '22px', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>
                    {isEn ? '📋 View Full Madrasa Directory' : '📋 মাদরাসার পূর্ণ তালিকা দেখুন'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0f2fe', marginTop: '2px' }}>
                    {isEn ? `Total ${locationMeta.count} Madrasas Registered` : `মোট ${locationMeta.count}টি মাদরাসা নিবন্ধিত`}
                  </div>
                </div>
              </div>
              <ChevronRight style={{ width: '20px', height: '20px', color: '#bae6fd' }} />
            </button>
          </div>

          {/* =======================================================
              OPTION 2: "ভিতরে প্রবেশ করুন" (CHILD NAVIGATION)
             ======================================================= */}
          <div style={{ marginTop: '18px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Search style={{ width: '15px', height: '15px' }} />
                <span>{isEn ? `🔍 Explore Inside (${locationMeta.nextLabel}):` : `🔍 ভিতরে প্রবেশ করুন (${locationMeta.nextLabel}):`}</span>
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                {isEn ? 'Click' : 'ক্লিক করুন'}
              </span>
            </div>

            {/* Scrollable Children List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
              className="no-scrollbar"
            >
              {/* LEVEL 1: BANGLADESH -> 8 Divisions */}
              {currentLevel === 'bangladesh' &&
                BANGLADESH_DIVISIONS.map((div) => (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => handleSelectDivision(div.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>🏛️</span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>
                          {isEn ? `${div.name} Division` : `${div.nameBn} বিভাগ`}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '1px' }}>
                          {isEn ? `${div.districts.length} Districts • Rating ★${div.rating}` : `${div.districts.length}টি জেলা • রেটিং ★${div.rating}`}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          background: 'rgba(16, 185, 129, 0.3)',
                          color: '#6ee7b7',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                        }}
                      >
                        {isEn ? `${div.totalMadrasas}` : `${div.totalMadrasas}টি`}
                      </span>
                      <ChevronRight style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  </button>
                ))}

              {/* LEVEL 2: DIVISION -> Districts */}
              {currentLevel === 'division' &&
                selectedDivision?.districts.map((dist) => (
                  <button
                    key={dist.id}
                    type="button"
                    onClick={() => handleSelectDistrict(dist.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>📍</span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>
                          {isEn ? `${dist.name} District` : `${dist.nameBn} জেলা`}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '1px' }}>
                          {isEn ? `${dist.upazilas.length} Upazilas` : `${dist.upazilas.length}টি উপজেলা`}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          background: 'rgba(56, 189, 248, 0.25)',
                          color: '#7dd3fc',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                        }}
                      >
                        {isEn ? 'Explore' : 'প্রবেশ'}
                      </span>
                      <ChevronRight style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  </button>
                ))}

              {/* LEVEL 3: DISTRICT -> Upazilas */}
              {currentLevel === 'district' &&
                selectedDistrict?.upazilas.map((up) => (
                  <button
                    key={up.id}
                    type="button"
                    onClick={() => handleSelectUpazila(up.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>🕌</span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>
                          {isEn ? `${up.name} Upazila` : `${up.nameBn} উপজেলা`}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '1px' }}>
                          {isEn ? `Top: ${up.topMadrasa}` : `শীর্ষ: ${up.topMadrasa}`}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          background: 'rgba(245, 158, 11, 0.25)',
                          color: '#fde68a',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                        }}
                      >
                        ★ {up.rating}
                      </span>
                      <ChevronRight style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  </button>
                ))}

              {/* LEVEL 4: UPAZILA -> Selected Madrasa Dossier */}
              {currentLevel === 'upazila' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedMadrasa ? (
                    <div
                      style={{
                        background: 'rgba(16, 185, 129, 0.18)',
                        border: '1.5px solid rgba(16, 185, 129, 0.5)',
                        borderRadius: '16px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            background: '#059669',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {isEn ? (selectedMadrasa.type === 'qawmi' ? 'Qawmi' : selectedMadrasa.type === 'alia' ? 'Alia' : 'Hifz') : selectedMadrasa.typeLabel}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle style={{ width: '14px', height: '14px' }} />
                          {isEn ? 'Verified' : 'ভেরিফাইড'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: '900', margin: '0 0 6px 0', color: 'white', lineHeight: '1.3' }}>
                        {selectedMadrasa.name}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 10px 0' }}>
                        📍 {selectedMadrasa.upazila}, {selectedMadrasa.district}
                      </p>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '6px',
                          background: 'rgba(0,0,0,0.3)',
                          padding: '10px 8px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          marginBottom: '14px',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                            {isEn ? 'Students' : 'ছাত্র'}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '900', color: 'white', marginTop: '2px' }}>{selectedMadrasa.students}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                            {isEn ? 'Pass' : 'পাস'}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '900', color: '#34d399', marginTop: '2px' }}>{selectedMadrasa.passRate}%</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                            {isEn ? 'Rating' : 'রেটিং'}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '900', color: '#f59e0b', marginTop: '2px' }}>★ {selectedMadrasa.rating}</div>
                        </div>
                      </div>

                      {/* WhatsApp & Call Buttons */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <a
                          href={`https://wa.me/${selectedMadrasa.whatsapp}?text=${encodeURIComponent(
                            `আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) থেকে ${selectedMadrasa.name} সম্পর্কে জানতে যোগাযোগ করছি।`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: '#16a34a',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                          }}
                        >
                          <MessageCircle style={{ width: '16px', height: '16px' }} />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${selectedMadrasa.phone}`}
                          style={{
                            background: '#0f172a',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                          }}
                        >
                          <Phone style={{ width: '16px', height: '16px' }} />
                          <span>{isEn ? 'Call' : 'কল দিন'}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                      {isEn ? 'Click the blue button above to view all madrasas in this area.' : 'এই উপজেলার সকল মাদরাসা দেখতে উপরের নীল বোতামে ক্লিক করুন।'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =======================================================
            SLIDE-OVER DRAWER: MADRASAS LIST (OPENS ONLY ON DEMAND)
           ======================================================= */}
        {isMadrasaListOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 60,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            onClick={() => setIsMadrasaListOpen(false)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                height: '100%',
                background: '#ffffff',
                color: '#0f172a',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div
                style={{
                  padding: '20px',
                  background: '#064e3b',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: 'white' }}>
                    {isEn ? `📋 Madrasas in ${locationMeta.title}` : `📋 ${locationMeta.title}-এর মাদরাসাসমূহ`}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#a7f3d0', margin: '4px 0 0 0' }}>
                    {isEn ? `Total ${drawerMadrasas.length} Institutions` : `মোট ${drawerMadrasas.length}টি প্রতিষ্ঠান`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMadrasaListOpen(false)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title={isEn ? "Close" : "বন্ধ করুন"}
                >
                  <X style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              {/* Search & Filter */}
              <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder={isEn ? "Search madrasa by name..." : "মাদরাসার নাম দিয়ে খুঁজুন..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '38px',
                      paddingRight: '14px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '14px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      outline: 'none',
                      background: 'white',
                      fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { id: 'all', label: isEn ? 'All' : 'সকল' },
                    { id: 'qawmi', label: isEn ? 'Qawmi' : 'কওমি' },
                    { id: 'alia', label: isEn ? 'Alia' : 'আলিয়া' },
                    { id: 'hifz', label: isEn ? 'Hifz' : 'হিফজ' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypeFilter(t.id as any)}
                      style={{
                        flex: 1,
                        padding: '8px 0',
                        fontSize: '13px',
                        fontWeight: '700',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        background: typeFilter === t.id ? '#047857' : '#e2e8f0',
                        color: typeFilter === t.id ? 'white' : '#475569',
                        fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Madrasas List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {drawerMadrasas.length > 0 ? (
                  drawerMadrasas.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: '1.5px solid #e2e8f0',
                        background: '#ffffff',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            background: m.type === 'qawmi' ? '#dcfce7' : '#dbeafe',
                            color: m.type === 'qawmi' ? '#166534' : '#1e40af',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {isEn ? (m.type === 'qawmi' ? 'Qawmi' : m.type === 'alia' ? 'Alia' : 'Hifz') : m.typeLabel}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: '#d97706' }}>★ {m.rating}</span>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#0f172a', lineHeight: '1.3' }}>
                        {m.name}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                        📍 {m.upazila}, {m.district} • {m.students} {isEn ? 'Students' : 'জন ছাত্র'}
                      </p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                        {isEn ? 'Principal: ' : 'প্রধান: '}{m.principal} • {isEn ? 'Pass Rate: ' : 'পাসের হার: '}{m.passRate}%
                      </p>

                      <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                        <a
                          href={`https://wa.me/${m.whatsapp}?text=${encodeURIComponent(
                            `আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) থেকে ${m.name} সম্পর্কে জানতে যোগাযোগ করছি।`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            background: '#16a34a',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                          }}
                        >
                          <MessageCircle style={{ width: '15px', height: '15px' }} />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${m.phone}`}
                          style={{
                            flex: 1,
                            background: '#0f172a',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                          }}
                        >
                          <Phone style={{ width: '15px', height: '15px' }} />
                          <span>{isEn ? 'Call' : 'কল দিন'}</span>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                    <Building style={{ width: '40px', height: '40px', color: '#cbd5e1', margin: '0 auto 12px auto' }} />
                    <p style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>
                      {isEn ? 'No madrasas found' : 'কোনো মাদরাসা পাওয়া যায়নি'}
                    </p>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                      {isEn ? 'Try adjusting your search criteria' : 'অনুসন্ধান পরিবর্তন করে চেষ্টা করুন'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
