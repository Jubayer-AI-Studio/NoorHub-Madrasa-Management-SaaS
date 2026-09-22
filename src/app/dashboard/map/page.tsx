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
} from 'lucide-react';

// Dynamically load the Leaflet GIS Map with SSR disabled
const OfficialGISMap = dynamic(() => import('@/components/map/OfficialGISMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] md:h-[540px] w-full flex-col items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900 text-slate-400 shadow-xl">
      <div className="h-10 w-10 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent mb-3" />
      <span className="text-sm font-semibold text-slate-200">বাংলাদেশের অফিশিয়াল মানচিত্র লোড হচ্ছে...</span>
      <span className="text-xs text-slate-400 mt-1">ওপেনস্ট্রিটম্যাপ ও স্যাটেলাইট সংযোগ সম্পন্ন হচ্ছে</span>
    </div>
  ),
});

export default function BangladeshMapPage() {
  // Multi-Level Navigation State
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<string | null>(null);
  const [selectedMadrasa, setSelectedMadrasa] = useState<OfficialMadrasa | null>(null);

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
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <Link href="/dashboard" className="hover:text-emerald-700 transition-colors">
                  ড্যাশবোর্ড
                </Link>
                <span>/</span>
                <span className="text-emerald-700 font-bold">ভৌগোলিক ইসলামিক শিক্ষা মানচিত্র</span>
              </div>
              <h1 className="text-lg md:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                  <Compass className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                বাংলাদেশের অফিশিয়াল ইসলামিক শিক্ষা মানচিত্র (GIS Map)
              </h1>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                মানচিত্রে সরাসরি বিভাগ ও জেলায় ট্যাপ করে জুম করুন — মুন্সিগঞ্জ, ভোলা সহ প্রতিটি উপজেলার রেটিং ও শিক্ষা তথ্য
              </p>
            </div>

            {/* Satellite Toggle */}
            <div className="flex items-center gap-2 shrink-0">
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

          {/* Interactive Multi-Level Breadcrumb Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 flex-wrap">
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currentLevel === 'bangladesh'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                🇧🇩 বাংলাদেশ
              </button>

              {selectedDivision && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => handleSelectDivision(selectedDivision.id)}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      currentLevel === 'division'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    🏛️ {selectedDivision.nameBn} বিভাগ
                  </button>
                </>
              )}

              {selectedDistrict && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => handleSelectDistrict(selectedDistrict.id)}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      currentLevel === 'district'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    📍 {selectedDistrict.nameBn} জেলা
                  </button>
                </>
              )}

              {selectedUpazila && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-extrabold">
                    🕌 {selectedUpazila.nameBn} উপজেলা
                  </span>
                </>
              )}
            </div>

            {currentLevel !== 'bangladesh' && (
              <button
                type="button"
                onClick={handleResetToBangladesh}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                সমগ্র বাংলাদেশে রিসেট
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-4">
        {/* Real GIS Leaflet Map Component */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
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

        {/* Dynamic Drill-Down Buttons Section */}
        {/* LEVEL 1 BUTTONS: 8 Divisions */}
        {currentLevel === 'bangladesh' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs md:text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-emerald-600" />
                <span>বিভাগ নির্বাচন করুন (মানচিত্রে অথবা নিচের তালিকায় ট্যাপ করে ঢুকুন):</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">৮টি বিভাগ</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BANGLADESH_DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleSelectDivision(div.id)}
                  className="text-left p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50 hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-black text-slate-900 group-hover:text-emerald-800">
                      {div.nameBn} বিভাগ
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      ★ {div.rating}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{div.districts.length}টি জেলা</span>
                    <span className="text-emerald-700 font-semibold">{div.passRate}% পাস</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LEVEL 2 BUTTONS: Districts of Selected Division */}
        {currentLevel === 'division' && selectedDivision && (
          <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-white rounded-2xl p-4 shadow-sm border border-sky-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs md:text-sm font-black text-sky-950 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-600" />
                <span>{selectedDivision.nameBn} বিভাগের জেলাসমূহ (জেলায় ট্যাপ করে উপজেলার মানচিত্রে ঢুকুন):</span>
              </h2>
              <span className="text-xs font-bold text-sky-700">
                {selectedDivision.districts.length}টি জেলা
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {selectedDivision.districts.map((dist) => (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => handleSelectDistrict(dist.id)}
                  className="text-left p-3 rounded-xl border border-sky-200 bg-white hover:bg-sky-100/60 hover:border-sky-400 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-black text-slate-900 group-hover:text-sky-900">
                      📍 {dist.nameBn}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600">
                      ★ {dist.rating}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{dist.upazilas.length}টি উপজেলা</span>
                    <span className="text-emerald-700 font-semibold">{dist.totalMadrasas}টি মাদরাসা</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LEVEL 3 & 4 BUTTONS: Upazilas of Selected District */}
        {(currentLevel === 'district' || currentLevel === 'upazila') && selectedDistrict && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-4 shadow-sm border border-emerald-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2 className="text-xs md:text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>{selectedDistrict.nameBn} জেলার উপজেলা ও থানাভিত্তিক সুস্থ প্রতিযোগিতা ও রেটিং:</span>
              </h2>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {selectedDistrict.upazilas.length}টি উপজেলা
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {selectedDistrict.upazilas.map((up) => {
                const isSelected = selectedUpazila?.id === up.id;
                return (
                  <button
                    key={up.id}
                    type="button"
                    onClick={() => handleSelectUpazila(up.id)}
                    className={`text-left p-3 rounded-xl border transition-all shadow-sm ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-white border-emerald-200 hover:bg-emerald-100/50 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-extrabold text-slate-900">
                        🕌 {up.nameBn}
                      </span>
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ★ {up.rating}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 mt-1.5 flex items-center justify-between">
                      <span>মাদরাসা: <strong>{up.madrasasCount}টি</strong></span>
                      <span className="text-emerald-700 font-bold">পাস: {up.passRate}%</span>
                    </div>

                    <div className="text-[10px] text-slate-400 truncate mt-1">
                      শীর্ষ: {up.topMadrasa}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Institution Details Card */}
        {selectedMadrasa && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 relative overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
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
              <span className="flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                <CheckCircle className="h-3 w-3 text-sky-600" />
                অফিশিয়াল ব্লু ভেরিফাইড
              </span>
            </div>

            <h3 className="text-base md:text-lg font-black text-slate-900">
              {selectedMadrasa.name}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              📍 {selectedMadrasa.upazila}, {selectedMadrasa.district} | প্রধান: {selectedMadrasa.principal}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {selectedMadrasa.address} (স্থাপিত: {selectedMadrasa.established} খ্রি.)
            </p>

            <div className="grid grid-cols-3 gap-2 my-3 p-3 bg-slate-50 rounded-xl text-center">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">শিক্ষার্থী</div>
                <div className="text-base font-black text-slate-800 mt-0.5">{selectedMadrasa.students} জন</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">পাসের হার</div>
                <div className="text-base font-black text-emerald-600 mt-0.5">{selectedMadrasa.passRate}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">রেটিং</div>
                <div className="text-base font-black text-amber-500 mt-0.5">{selectedMadrasa.rating} ★</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${selectedMadrasa.whatsapp}?text=${encodeURIComponent(
                  `আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) প্ল্যাটফর্ম থেকে ${selectedMadrasa.name} সম্পর্কে বিস্তারিত তথ্য ও ভর্তির বিষয়ে জানতে যোগাযোগ করছি।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all text-center"
              >
                <MessageCircle className="h-4 w-4" />
                হোয়াটসঅ্যাপ
              </a>
              <a
                href={`tel:${selectedMadrasa.phone}`}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all text-center"
              >
                <Phone className="h-4 w-4" />
                সরাসরি কল
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMadrasa.lat},${selectedMadrasa.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all text-center border border-slate-200"
              >
                <Navigation className="h-3.5 w-3.5 text-emerald-600" />
                গুগল ম্যাপস
              </a>
              <Link
                href="/dashboard/syllabus"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all text-center border border-slate-200"
              >
                <BookOpen className="h-3.5 w-3.5 text-slate-600" />
                সিলেবাস দেখুন
              </Link>
            </div>
          </div>
        )}

        {/* Healthy Competition Leaderboard */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs md:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>সুস্থ প্রতিযোগিতা লিডারবোর্ড (৪ স্তম্ভভিত্তিক রেটিং ও পারফরম্যান্স):</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">ট্যাপ করলে জুম হবে</span>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {activeMadrasas.map((m, idx) => {
              const isSelected = selectedMadrasa?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMadrasa(m)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 shadow-sm ring-1 ring-emerald-400'
                      : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                        idx === 0
                          ? 'bg-amber-500 text-white'
                          : idx === 1
                          ? 'bg-slate-400 text-white'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs md:text-sm font-bold text-slate-900 truncate">{m.name}</div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {m.typeLabel} • {m.upazila}, {m.district}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-emerald-700">{m.passRate}% পাস</div>
                    <div className="text-[11px] font-extrabold text-amber-600">★ {m.rating}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
