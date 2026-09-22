'use client';

import { useState, useMemo } from 'react';
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
  RotateCcw,
  Trophy,
  Star,
  Users,
  X,
  ListFilter,
} from 'lucide-react';

// Dynamically load the Leaflet GIS Map with SSR disabled
const OfficialGISMap = dynamic(() => import('@/components/map/OfficialGISMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] md:h-[540px] w-full flex-col items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900 text-slate-400 shadow-xl">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent mb-2" />
      <span className="text-xs md:text-sm font-semibold text-slate-200">বাংলাদেশের অফিশিয়াল মানচিত্র লোড হচ্ছে...</span>
      <span className="text-[11px] text-slate-400 mt-0.5">ওপেনস্ট্রিটম্যাপ ও স্যাটেলাইট সংযোগ সম্পন্ন হচ্ছে</span>
    </div>
  ),
});

export default function BangladeshMapPage() {
  // Multi-Level Navigation State
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string | null>(null);
  const [selectedMadrasa, setSelectedMadrasa] = useState<OfficialMadrasa | null>(null);

  // Mobile View Tab: 'map' | 'rankings' | 'madrasas'
  const [activeTab, setActiveTab] = useState<'map' | 'rankings' | 'madrasas'>('map');

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'qawmi' | 'alia' | 'hifz'>('all');
  const [isSatellite, setIsSatellite] = useState(false);

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

  // Filtered Madrasas
  const activeMadrasas = useMemo(() => {
    return OFFICIAL_MADRASAS.filter((m) => {
      if (selectedDivisionId && m.divisionId !== selectedDivisionId) return false;
      if (selectedDistrictId && m.districtId !== selectedDistrictId) return false;
      if (selectedUpazila && !m.upazila.includes(selectedUpazila.nameBn) && !selectedUpazila.nameBn.includes(m.upazila)) {
        return false;
      }
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
  }, [selectedDivisionId, selectedDistrictId, selectedUpazila, typeFilter, searchQuery]);

  // Navigation Handlers
  const handleSelectDivision = (divId: string) => {
    setSelectedDivisionId(divId);
    setSelectedDistrictId(null);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
  };

  const handleSelectDistrict = (distId: string) => {
    setSelectedDistrictId(distId);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
  };

  const handleSelectUpazila = (upId: string) => {
    setSelectedUpazilaId(upId);
    const upazila = selectedDistrict?.upazilas.find((u) => u.id === upId);
    if (upazila) {
      const match = OFFICIAL_MADRASAS.find(
        (m) =>
          m.districtId === selectedDistrictId &&
          (m.upazila.includes(upazila.nameBn) || upazila.nameBn.includes(m.upazila))
      );
      if (match) setSelectedMadrasa(match);
      else setSelectedMadrasa(null);
    }
  };

  const handleResetToBangladesh = () => {
    setSelectedDivisionId(null);
    setSelectedDistrictId(null);
    setSelectedUpazilaId(null);
    setSelectedMadrasa(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Header — Mobile Compact */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 flex items-center gap-1.5 truncate">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                  <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <span className="truncate">ইসলামিক শিক্ষা মানচিত্র (GIS Map)</span>
              </h1>
            </div>

            {/* Mobile View Switching Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'map'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🗺️ ম্যাপ
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rankings')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'rankings'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏆 র‍্যাংকিং
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('madrasas')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'madrasas'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏢 প্রতিষ্ঠান ({activeMadrasas.length})
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Breadcrumbs — Thumb Friendly */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-700 flex-nowrap overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className={`shrink-0 px-2 py-0.5 rounded-md transition-all ${
                  currentLevel === 'bangladesh'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                🇧🇩 বাংলাদেশ
              </button>

              {selectedDivision && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                  <button
                    type="button"
                    onClick={() => handleSelectDivision(selectedDivision.id)}
                    className={`shrink-0 px-2 py-0.5 rounded-md transition-all ${
                      currentLevel === 'division'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    🏛️ {selectedDivision.nameBn}
                  </button>
                </>
              )}

              {selectedDistrict && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                  <button
                    type="button"
                    onClick={() => handleSelectDistrict(selectedDistrict.id)}
                    className={`shrink-0 px-2 py-0.5 rounded-md transition-all ${
                      currentLevel === 'district'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    📍 {selectedDistrict.nameBn}
                  </button>
                </>
              )}

              {selectedUpazila && (
                <>
                  <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-extrabold">
                    🕌 {selectedUpazila.nameBn}
                  </span>
                </>
              )}
            </div>

            {currentLevel !== 'bangladesh' && (
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-emerald-700"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">রিসেট</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2.5 sm:mt-4 space-y-3 sm:space-y-4">
        {/* TAB 1: MAP VIEW */}
        {activeTab === 'map' && (
          <div className="space-y-2.5">
            {/* Quick Mobile Horizontal Swipeable Chips (Level Based) */}
            <div className="bg-white rounded-xl p-2 shadow-xs border border-slate-200">
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  {currentLevel === 'bangladesh' && '👉 বিভাগে ট্যাপ করে মানচিত্রে ঢুকুন:'}
                  {currentLevel === 'division' && `👉 ${selectedDivision?.nameBn}র জেলায় ট্যাপ করুন:`}
                  {(currentLevel === 'district' || currentLevel === 'upazila') && `👉 ${selectedDistrict?.nameBn}র উপজেলায় ট্যাপ করুন:`}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSatellite(!isSatellite)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                >
                  <Layers className="h-3 w-3" />
                  {isSatellite ? 'জিআইএস ম্যাপ' : 'স্যাটেলাইট'}
                </button>
              </div>

              {/* Horizontal Scrollable Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {/* Level 1: Divisions */}
                {currentLevel === 'bangladesh' &&
                  BANGLADESH_DIVISIONS.map((div) => (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => handleSelectDivision(div.id)}
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs font-bold text-slate-800 transition-all active:scale-95"
                    >
                      <span>🏛️ {div.nameBn}</span>
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-1 py-0.2 rounded font-extrabold">
                        ★ {div.rating}
                      </span>
                    </button>
                  ))}

                {/* Level 2: Districts of Division */}
                {currentLevel === 'division' &&
                  selectedDivision?.districts.map((dist) => (
                    <button
                      key={dist.id}
                      type="button"
                      onClick={() => handleSelectDistrict(dist.id)}
                      className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold text-sky-950 transition-all active:scale-95"
                    >
                      <span>📍 {dist.nameBn}</span>
                      <span className="text-[10px] text-sky-700 bg-white/80 px-1 py-0.2 rounded font-extrabold">
                        {dist.upazilas.length}টি উপজেলা
                      </span>
                    </button>
                  ))}

                {/* Level 3: Upazilas of District */}
                {(currentLevel === 'district' || currentLevel === 'upazila') &&
                  selectedDistrict?.upazilas.map((up) => {
                    const isSelected = selectedUpazila?.id === up.id;
                    return (
                      <button
                        key={up.id}
                        type="button"
                        onClick={() => handleSelectUpazila(up.id)}
                        className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 border ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-400/50'
                            : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-950'
                        }`}
                      >
                        <span>🕌 {up.nameBn}</span>
                        <span className={`text-[10px] px-1 py-0.2 rounded font-black ${isSelected ? 'bg-white/25 text-white' : 'text-amber-700 bg-white/80'}`}>
                          ★ {up.rating}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Real GIS Leaflet Map Component */}
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-300 bg-slate-900">
              <OfficialGISMap
                currentLevel={currentLevel}
                divisions={BANGLADESH_DIVISIONS}
                selectedDivision={selectedDivision}
                selectedDistrict={selectedDistrict}
                selectedUpazila={selectedUpazila}
                madrasas={activeMadrasas}
                selectedMadrasa={selectedMadrasa}
                onSelectDivision={handleSelectDivision}
                onSelectDistrict={handleSelectDistrict}
                onSelectUpazila={handleSelectUpazila}
                onSelectMadrasa={(m) => setSelectedMadrasa(m)}
                isSatellite={isSatellite}
                onToggleSatellite={() => setIsSatellite(!isSatellite)}
                onResetView={handleResetToBangladesh}
              />
            </div>

            {/* Floating Slide-Up Institution or Upazila Card on Selection */}
            {selectedMadrasa && (
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-emerald-300 relative animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setSelectedMadrasa(null)}
                  className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                      selectedMadrasa.type === 'qawmi'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedMadrasa.type === 'hifz'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {selectedMadrasa.typeLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3 text-sky-600" />
                    ভেরিফাইড
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 pr-8">
                  {selectedMadrasa.name}
                </h3>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  📍 {selectedMadrasa.upazila}, {selectedMadrasa.district} | প্রধান: {selectedMadrasa.principal}
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-3 gap-1.5 my-2.5 p-2 bg-slate-50 rounded-xl text-center">
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">শিক্ষার্থী</div>
                    <div className="text-xs sm:text-sm font-black text-slate-800">{selectedMadrasa.students} জন</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">পাসের হার</div>
                    <div className="text-xs sm:text-sm font-black text-emerald-600">{selectedMadrasa.passRate}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">রেটিং</div>
                    <div className="text-xs sm:text-sm font-black text-amber-500">{selectedMadrasa.rating} ★</div>
                  </div>
                </div>

                {/* 3 Thumb-Friendly Action Buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <a
                    href={`https://wa.me/${selectedMadrasa.whatsapp}?text=${encodeURIComponent(
                      `আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) প্ল্যাটফর্ম থেকে ${selectedMadrasa.name} সম্পর্কে বিস্তারিত তথ্য ও ভর্তির বিষয়ে জানতে যোগাযোগ করছি।`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-2 py-2 text-[11px] font-bold text-white shadow-xs hover:bg-emerald-700 text-center"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>হোয়াটসঅ্যাপ</span>
                  </a>
                  <a
                    href={`tel:${selectedMadrasa.phone}`}
                    className="flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-2 py-2 text-[11px] font-bold text-white hover:bg-slate-800 text-center"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>কল করুন</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMadrasa.lat},${selectedMadrasa.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-xl bg-slate-100 px-2 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-200 text-center border border-slate-200"
                  >
                    <Navigation className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>ডিরেকশন</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RANKINGS & HEALTHY COMPETITION */}
        {activeTab === 'rankings' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Bangladesh Division Rankings */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>জাতীয় বিভাগীয় সুস্থ প্রতিযোগিতা ও র‍্যাংকিং:</span>
                </h2>
                <span className="text-[11px] font-bold text-slate-400">৮টি বিভাগ</span>
              </div>

              <div className="space-y-2">
                {BANGLADESH_DIVISIONS.map((div, idx) => (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => {
                      handleSelectDivision(div.id);
                      setActiveTab('map');
                    }}
                    className="w-full text-left p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                          idx === 0
                            ? 'bg-amber-500 text-white'
                            : idx === 1
                            ? 'bg-slate-400 text-white'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {div.nameBn} বিভাগ
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {div.districts.length}টি জেলা • {div.totalMadrasas}টি মাদরাসা
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-amber-600">★ {div.rating}</div>
                      <div className="text-[10px] font-bold text-emerald-700">{div.passRate}% পাস</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* If a District is Selected -> Show Upazila Rankings */}
            {selectedDistrict && (
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <span>{selectedDistrict.nameBn} জেলার উপজেলা র‍্যাংকিং:</span>
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {selectedDistrict.upazilas.length}টি উপজেলা
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedDistrict.upazilas.map((up, idx) => (
                    <button
                      key={up.id}
                      type="button"
                      onClick={() => {
                        handleSelectUpazila(up.id);
                        setActiveTab('map');
                      }}
                      className="w-full text-left p-2.5 sm:p-3 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-100/60 transition-all flex items-center justify-between gap-2 shadow-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-black">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            🕌 {up.nameBn} উপজেলা
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            শীর্ষ: {up.topMadrasa}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-amber-600">★ {up.rating}</div>
                        <div className="text-[10px] font-bold text-emerald-700">{up.passRate}% পাস</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MADRASAS LIST */}
        {activeTab === 'madrasas' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="মাদ্রাসা, জেলা বা উপজেলা খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-xs"
              />
            </div>

            {/* List Cards */}
            <div className="space-y-2">
              {activeMadrasas.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMadrasa(m);
                    setActiveTab('map');
                  }}
                  className="cursor-pointer p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`rounded-full px-2 py-0.2 text-[10px] font-extrabold ${
                        m.type === 'qawmi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.type === 'hifz'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {m.typeLabel}
                    </span>
                    <span className="text-xs font-black text-amber-500">★ {m.rating}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-black text-slate-900">{m.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    📍 {m.upazila}, {m.district} | প্রধান: {m.principal}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                    <span>ম্যাপে অবস্থান দেখুন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
