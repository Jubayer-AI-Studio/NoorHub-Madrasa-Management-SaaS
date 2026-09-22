'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  BANGLADESH_DIVISIONS,
  OFFICIAL_MADRASAS,
  OfficialMadrasa,
  BANGLADESH_CENTER,
  BANGLADESH_DEFAULT_ZOOM,
} from '@/lib/geo-data';
import {
  MapPin,
  Compass,
  Search,
  CheckCircle,
  Phone,
  MessageCircle,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Navigation,
  BookOpen,
  Filter,
  Eye,
  RotateCcw,
} from 'lucide-react';

// Dynamically load the Leaflet GIS Map with SSR disabled
const OfficialGISMap = dynamic(() => import('@/components/map/OfficialGISMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] w-full flex-col items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900 text-slate-400 shadow-xl">
      <div className="h-10 w-10 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent mb-3" />
      <span className="text-sm font-semibold text-slate-300">অফিশিয়াল জিআইএস মানচিত্র লোড হচ্ছে...</span>
      <span className="text-xs text-slate-500 mt-1">ওপেনস্ট্রিটম্যাপ ও স্যাটেলাইট টাইলস সংযোগ হচ্ছে</span>
    </div>
  ),
});

export default function BangladeshMapPage() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('all');
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string>('all');
  const [selectedMadrasa, setSelectedMadrasa] = useState<OfficialMadrasa | null>(
    OFFICIAL_MADRASAS[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'qawmi' | 'alia' | 'hifz'>('all');
  const [isSatellite, setIsSatellite] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'map-only' | 'list-only'>('split');

  // Selected Division Object
  const currentDivision = useMemo(() => {
    if (selectedDivisionId === 'all') return null;
    return BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivisionId) || null;
  }, [selectedDivisionId]);

  // All Upazilas for the currently selected division
  const availableUpazilas = useMemo(() => {
    if (!currentDivision) return [];
    const upazilaList: { id: string; nameBn: string; districtNameBn: string; lat: number; lng: number; zoom?: number }[] = [];
    currentDivision.districts.forEach((dist) => {
      dist.upazilas.forEach((up) => {
        upazilaList.push({
          id: up.id,
          nameBn: up.nameBn,
          districtNameBn: dist.nameBn,
          lat: up.lat,
          lng: up.lng,
          zoom: up.zoom || 14,
        });
      });
    });
    return upazilaList;
  }, [currentDivision]);

  // Selected Upazila Object
  const currentUpazila = useMemo(() => {
    if (selectedUpazilaId === 'all' || !availableUpazilas.length) return null;
    return availableUpazilas.find((u) => u.id === selectedUpazilaId) || null;
  }, [selectedUpazilaId, availableUpazilas]);

  // Filtered Madrasas
  const filteredMadrasas = useMemo(() => {
    return OFFICIAL_MADRASAS.filter((m) => {
      // Division filter
      if (selectedDivisionId !== 'all' && m.divisionId !== selectedDivisionId) return false;
      // Upazila filter
      if (selectedUpazilaId !== 'all' && currentUpazila) {
        // Match upazila name in Bengali or English
        const upazilaNameBn = currentUpazila.nameBn.replace(/\s*\(.*\)/, '').trim();
        if (!m.upazila.includes(upazilaNameBn) && !upazilaNameBn.includes(m.upazila)) {
          return false;
        }
      }
      // Type filter
      if (typeFilter !== 'all' && m.type !== typeFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesDistrict = m.district.toLowerCase().includes(q);
        const matchesUpazila = m.upazila.toLowerCase().includes(q);
        const matchesPrincipal = m.principal.toLowerCase().includes(q);
        if (!matchesName && !matchesDistrict && !matchesUpazila && !matchesPrincipal) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDivisionId, selectedUpazilaId, currentUpazila, typeFilter, searchQuery]);

  // Determine Map Camera Center and Zoom
  const { centerLat, centerLng, zoomLevel } = useMemo(() => {
    if (selectedMadrasa) {
      return {
        centerLat: selectedMadrasa.lat,
        centerLng: selectedMadrasa.lng,
        zoomLevel: 15,
      };
    }
    if (currentUpazila) {
      return {
        centerLat: currentUpazila.lat,
        centerLng: currentUpazila.lng,
        zoomLevel: currentUpazila.zoom || 14,
      };
    }
    if (currentDivision) {
      return {
        centerLat: currentDivision.lat,
        centerLng: currentDivision.lng,
        zoomLevel: currentDivision.zoom || 10,
      };
    }
    return {
      centerLat: BANGLADESH_CENTER[0],
      centerLng: BANGLADESH_CENTER[1],
      zoomLevel: BANGLADESH_DEFAULT_ZOOM,
    };
  }, [selectedMadrasa, currentUpazila, currentDivision]);

  // Handlers for hierarchical navigation
  const handleSelectDivision = (divId: string) => {
    setSelectedDivisionId(divId);
    setSelectedUpazilaId('all');
    setSelectedMadrasa(null);

    // Auto-select first madrasa in this division if available
    if (divId !== 'all') {
      const firstInDiv = OFFICIAL_MADRASAS.find((m) => m.divisionId === divId);
      if (firstInDiv) setSelectedMadrasa(firstInDiv);
    }
  };

  const handleSelectUpazila = (upazilaId: string) => {
    setSelectedUpazilaId(upazilaId);
    if (upazilaId === 'all') {
      setSelectedMadrasa(null);
      return;
    }

    const upazila = availableUpazilas.find((u) => u.id === upazilaId);
    if (upazila) {
      const upName = upazila.nameBn.replace(/\s*\(.*\)/, '').trim();
      const match = OFFICIAL_MADRASAS.find(
        (m) =>
          m.divisionId === selectedDivisionId &&
          (m.upazila.includes(upName) || upName.includes(m.upazila))
      );
      if (match) setSelectedMadrasa(match);
      else setSelectedMadrasa(null);
    }
  };

  const handleResetToBangladesh = () => {
    setSelectedDivisionId('all');
    setSelectedUpazilaId('all');
    setSelectedMadrasa(OFFICIAL_MADRASAS[0] || null);
    setSearchQuery('');
    setTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
                  ড্যাশবোর্ড
                </Link>
                <span>/</span>
                <span className="text-emerald-700">ভৌগোলিক মানচিত্র</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                  <Compass className="h-5 w-5" />
                </span>
                বাংলাদেশের অফিশিয়াল ইসলামিক শিক্ষা মানচিত্র (Official GIS Map)
              </h1>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                ওপেনস্ট্রিটম্যাপ ও স্যাটেলাইট টাইলস দ্বারা চালিত বাস্তব ভৌগোলিক মানচিত্র — বিভাগ থেকে উপজেলা পর্যায়ে অনুসন্ধান করুন
              </p>
            </div>

            {/* View Mode Switches */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    viewMode === 'split'
                      ? 'bg-white text-emerald-800 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  দ্বৈত ভিউ (ম্যাপ + বিস্তারিত)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map-only')}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    viewMode === 'map-only'
                      ? 'bg-white text-emerald-800 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  শুধু মানচিত্র
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list-only')}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    viewMode === 'list-only'
                      ? 'bg-white text-emerald-800 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  শুধু তালিকা
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSatellite(!isSatellite)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-sm ${
                  isSatellite
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                    : 'bg-slate-900 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                {isSatellite ? '🛰️ স্যাটেলাইট মোড সক্রিয়' : '🗺️ স্যাটেলাইট মোড'}
              </button>
            </div>
          </div>

          {/* Breadcrumb Hierarchy */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 flex-wrap">
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className="flex items-center gap-1 text-emerald-700 hover:underline font-bold"
              >
                🇧🇩 সমগ্র বাংলাদেশ
              </button>
              {currentDivision && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => handleSelectDivision(currentDivision.id)}
                    className="text-emerald-800 hover:underline font-bold"
                  >
                    🏛️ {currentDivision.nameBn} বিভাগ
                  </button>
                </>
              )}
              {currentUpazila && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-slate-900 font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                    📍 {currentUpazila.nameBn}
                  </span>
                </>
              )}
            </div>

            {(selectedDivisionId !== 'all' || selectedUpazilaId !== 'all') && (
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                সমগ্র বাংলাদেশে রিসেট করুন
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-3">
        {/* LEVEL 1: Division Selector */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <span>🏛️ ১. বিভাগ নির্বাচন করুন:</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">৮টি বিভাগ</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => handleSelectDivision('all')}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                selectedDivisionId === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              সমগ্র বাংলাদেশ (৮টি বিভাগ)
            </button>

            {BANGLADESH_DIVISIONS.map((div) => {
              const count = OFFICIAL_MADRASAS.filter((m) => m.divisionId === div.id).length;
              const isSelected = selectedDivisionId === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleSelectDivision(div.id)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <span>{div.nameBn}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL 2: Upazila Selector (Shows when a Division is selected) */}
        {currentDivision && availableUpazilas.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-3.5 shadow-sm border border-emerald-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>২. {currentDivision.nameBn} বিভাগের উপজেলা ও জোন নির্বাচন করুন (ট্যাপ করলেই সরাসরি জুম হবে):</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-bold">
                {availableUpazilas.length}টি উপজেলা/এলাকা উপলব্ধ
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => handleSelectUpazila('all')}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedUpazilaId === 'all'
                    ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/40'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-emerald-200'
                }`}
              >
                📍 {currentDivision.nameBn}র সব উপজেলা
              </button>

              {availableUpazilas.map((up) => {
                const isSelected = selectedUpazilaId === up.id;
                // Count madrasas in this upazila
                const upCleanName = up.nameBn.replace(/\s*\(.*\)/, '').trim();
                const count = OFFICIAL_MADRASAS.filter(
                  (m) =>
                    m.divisionId === currentDivision.id &&
                    (m.upazila.includes(upCleanName) || upCleanName.includes(m.upazila))
                ).length;

                return (
                  <button
                    key={up.id}
                    type="button"
                    onClick={() => handleSelectUpazila(up.id)}
                    className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/40'
                        : 'bg-white text-slate-700 hover:bg-emerald-100/50 border border-emerald-200'
                    }`}
                  >
                    <span>{up.nameBn}</span>
                    {count > 0 && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Bar & Type Filters */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="মাদ্রাসা, জেলা বা উপজেলা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-50/50 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-0.5 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              ধারা:
            </span>
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                typeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              সব ধারা ({OFFICIAL_MADRASAS.length})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('qawmi')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                typeFilter === 'qawmi'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              কওমি কিতাব ও ইফতা
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('hifz')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                typeFilter === 'hifz'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              হিফজুল কুরআন
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('alia')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                typeFilter === 'alia'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              আলিয়া (কামিল/ফাজিল)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {viewMode === 'list-only' ? (
          // LIST ONLY VIEW
          <div className="space-y-4">
            <div className="text-sm font-bold text-slate-700">
              পাওয়া গেছে: {filteredMadrasas.length}টি প্রতিষ্ঠান
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMadrasas.map((m) => (
                <InstitutionCard
                  key={m.id}
                  madrasa={m}
                  isSelected={selectedMadrasa?.id === m.id}
                  onSelect={() => {
                    setSelectedMadrasa(m);
                    setViewMode('split');
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // SPLIT OR MAP-ONLY VIEW
          <div className={`grid gap-5 ${viewMode === 'map-only' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
            {/* Left/Main Map Column */}
            <div className={viewMode === 'map-only' ? 'col-span-1' : 'lg:col-span-7 xl:col-span-8'}>
              <OfficialGISMap
                madrasas={filteredMadrasas}
                selectedMadrasa={selectedMadrasa}
                onSelectMadrasa={(m) => setSelectedMadrasa(m)}
                centerLat={centerLat}
                centerLng={centerLng}
                zoomLevel={zoomLevel}
                isSatellite={isSatellite}
                onToggleSatellite={() => setIsSatellite(!isSatellite)}
              />

              {/* Quick Info Strip Under Map */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span>
                    প্রদর্শিত প্রতিষ্ঠান: <strong>{filteredMadrasas.length}টি</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block" /> কওমি
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-600 inline-block" /> হিফজ
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" /> আলিয়া
                  </span>
                </div>
              </div>
            </div>

            {/* Right Details Column (Hidden in map-only) */}
            {viewMode === 'split' && (
              <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                {selectedMadrasa ? (
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden animate-fadeIn">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-bl-full pointer-events-none" />

                    {/* Badge row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          selectedMadrasa.type === 'qawmi'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : selectedMadrasa.type === 'hifz'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {selectedMadrasa.typeLabel}
                      </span>
                      {selectedMadrasa.isVerified && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                          <CheckCircle className="h-3 w-3 text-sky-600" />
                          অফিশিয়াল ব্লু ভেরিফাইড
                        </span>
                      )}
                    </div>

                    {/* Title & Principal */}
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      {selectedMadrasa.name}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {selectedMadrasa.upazila}, {selectedMadrasa.district} | প্রধান: {selectedMadrasa.principal}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      📍 {selectedMadrasa.address} (স্থাপিত: {selectedMadrasa.established} খ্রি.)
                    </p>

                    {/* Key Stats Card */}
                    <div className="grid grid-cols-3 gap-2 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">শিক্ষার্থী</div>
                        <div className="text-base font-black text-slate-800 mt-0.5">
                          {selectedMadrasa.students} জন
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">পাসের হার</div>
                        <div className="text-base font-black text-emerald-600 mt-0.5">
                          {selectedMadrasa.passRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">রেটিং</div>
                        <div className="text-base font-black text-amber-500 mt-0.5">
                          {selectedMadrasa.rating} ★
                        </div>
                      </div>
                    </div>

                    {/* Facilities Tags */}
                    {selectedMadrasa.facilities && selectedMadrasa.facilities.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[11px] font-bold text-slate-400 mb-1.5">ক্যাম্পাস সুবিধা ও বিশেষত্ব:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedMadrasa.facilities.map((fac, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                            >
                              ✓ {fac}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://wa.me/${selectedMadrasa.whatsapp}?text=${encodeURIComponent(
                            `আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) প্ল্যাটফর্ম থেকে ${selectedMadrasa.name} সম্পর্কে বিস্তারিত তথ্য ও ভর্তির বিষয়ে জানতে যোগাযোগ করছি।`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all text-center"
                        >
                          <MessageCircle className="h-4 w-4" />
                          হোয়াটসঅ্যাপ ইনকোয়ারি
                        </a>
                        <a
                          href={`tel:${selectedMadrasa.phone}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all text-center"
                        >
                          <Phone className="h-4 w-4" />
                          সরাসরি কল
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMadrasa.lat},${selectedMadrasa.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition-all text-center border border-slate-200"
                        >
                          <Navigation className="h-3.5 w-3.5 text-emerald-600" />
                          গুগল ম্যাপস ডিরেকশন
                        </a>
                        <Link
                          href="/dashboard/syllabus"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition-all text-center border border-slate-200"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-slate-600" />
                          সিলেবাস ও কারিকুলাম
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center text-slate-400">
                    <MapPin className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">কোনো প্রতিষ্ঠান নির্বাচন করা হয়নি</p>
                    <p className="text-xs text-slate-400 mt-1">মানচিত্রের যেকোনো পিনে বা নিচের তালিকায় ক্লিক করুন</p>
                  </div>
                )}

                {/* Leaderboard / Top Institutions List */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-amber-500" />
                      শীর্ষ প্রতিষ্ঠানসমূহ ({filteredMadrasas.length}টি)
                    </h3>
                    <span className="text-[11px] text-slate-400">ট্যাপ করলে জুম হবে</span>
                  </div>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {filteredMadrasas.map((m) => {
                      const isSelected = selectedMadrasa?.id === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMadrasa(m)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-emerald-50/70 border-emerald-400 shadow-sm'
                              : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/80'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 truncate">{m.name}</div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {m.typeLabel} • {m.upazila}, {m.district}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold text-emerald-700">{m.passRate}%</div>
                            <div className="text-[10px] text-amber-600 font-bold">{m.rating} ★</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Institution Card for List View
function InstitutionCard({
  madrasa,
  isSelected,
  onSelect,
}: {
  madrasa: OfficialMadrasa;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl p-5 transition-all border ${
        isSelected
          ? 'bg-emerald-50/60 border-emerald-400 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
            madrasa.type === 'qawmi'
              ? 'bg-emerald-100 text-emerald-800'
              : madrasa.type === 'hifz'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {madrasa.typeLabel}
        </span>
        <span className="text-xs font-bold text-amber-500">★ {madrasa.rating}</span>
      </div>

      <h3 className="text-base font-extrabold text-slate-900 leading-snug">{madrasa.name}</h3>
      <p className="text-xs text-slate-500 mt-1">
        📍 {madrasa.upazila}, {madrasa.district} | প্রধান: {madrasa.principal}
      </p>

      <div className="grid grid-cols-2 gap-2 my-3 p-2 bg-slate-50 rounded-xl text-center text-xs">
        <div>
          শিক্ষার্থী: <strong>{madrasa.students} জন</strong>
        </div>
        <div>
          পাসের হার: <strong className="text-emerald-600">{madrasa.passRate}%</strong>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700">
        <span>মানচিত্রে অবস্থান ও জুম দেখুন</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
