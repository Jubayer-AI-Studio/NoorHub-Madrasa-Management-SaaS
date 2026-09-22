'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BANGLADESH_DIVISIONS } from '@/lib/geo-data';

interface MapMadrasa {
  id: string;
  name: string;
  type: 'qawmi' | 'alia' | 'hifz';
  typeLabel: string;
  students: number;
  passRate: number;
  rating: number;
  isVerified: boolean;
  divisionId: string;
  district: string;
  upazila: string;
  principal: string;
  phone: string;
  whatsapp: string;
  mapX: number;
  mapY: number;
}

const MAP_MADRASAS: MapMadrasa[] = [
  {
    id: 'm-1',
    name: 'আল-জামিয়া আল-ইসলামিয়া পটিয়া',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও ইফতা',
    students: 2450,
    passRate: 98.5,
    rating: 4.9,
    isVerified: true,
    divisionId: 'chittagong',
    district: 'চট্টগ্রাম',
    upazila: 'পটিয়া',
    principal: 'আল্লামা ওবায়দুল্লাহ হামযাহ হাফিজাহুল্লাহ',
    phone: '01819334455',
    whatsapp: '8801819334455',
    mapX: 435,
    mapY: 490,
  },
  {
    id: 'm-2',
    name: 'দারুল উলুম মুঈনুল ইসলাম হাটহাজারী',
    type: 'qawmi',
    typeLabel: 'সর্বোচ্চ দাওরায়ে হাদিস ও ইফতা',
    students: 6500,
    passRate: 99.1,
    rating: 5.0,
    isVerified: true,
    divisionId: 'chittagong',
    district: 'চট্টগ্রাম',
    upazila: 'হাটহাজারী',
    principal: 'আল্লামা খলিল আহমদ কাসেমী',
    phone: '01819112233',
    whatsapp: '8801819112233',
    mapX: 425,
    mapY: 460,
  },
  {
    id: 'm-3',
    name: 'জামিয়া শরইয়্যাহ মালিবাগ ঢাকা',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও উচ্চতর ফিকহ',
    students: 1850,
    passRate: 97.8,
    rating: 4.8,
    isVerified: true,
    divisionId: 'dhaka',
    district: 'ঢাকা',
    upazila: 'মালিবাগ',
    principal: 'মাওলানা আশরাফ আলী',
    phone: '01711223344',
    whatsapp: '8801711223344',
    mapX: 295,
    mapY: 340,
  },
  {
    id: 'm-4',
    name: 'দারুল উলুম দেওবন্দ মডেল হিফজ একাডেমি',
    type: 'hifz',
    typeLabel: 'আন্তর্জাতিক হিফজুল কুরআন',
    students: 380,
    passRate: 99.5,
    rating: 4.9,
    isVerified: true,
    divisionId: 'dhaka',
    district: 'ঢাকা',
    upazila: 'উত্তরা',
    principal: 'হাফেজ ক্বারী আবু ইউসুফ',
    phone: '01911998877',
    whatsapp: '8801911998877',
    mapX: 285,
    mapY: 315,
  },
  {
    id: 'm-5',
    name: 'তা’মীরুল মিল্লাত কামিল মাদরাসা',
    type: 'alia',
    typeLabel: 'কামিল অনার্স ও মাস্টার্স',
    students: 3200,
    passRate: 97.2,
    rating: 4.8,
    isVerified: true,
    divisionId: 'dhaka',
    district: 'ঢাকা',
    upazila: 'মিরপুর',
    principal: 'ড. মাওলানা আবু সাঈদ নোমান',
    phone: '01833445566',
    whatsapp: '8801833445566',
    mapX: 275,
    mapY: 330,
  },
  {
    id: 'm-6',
    name: 'সিলেট জামিয়া মাদানিয়া আঙ্গুরা মুহাম্মদপুর',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও দাওরায়ে হাদিস',
    students: 1420,
    passRate: 98.0,
    rating: 4.8,
    isVerified: true,
    divisionId: 'sylhet',
    district: 'সিলেট',
    upazila: 'বিয়ানীবাজার',
    principal: 'মাওলানা জিয়াউদ্দিন',
    phone: '01712556677',
    whatsapp: '8801712556677',
    mapX: 450,
    mapY: 220,
  },
  {
    id: 'm-7',
    name: 'রাজশাহী দারুল উলুম কওমি জামিয়া',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব বিভাগ',
    students: 950,
    passRate: 96.5,
    rating: 4.7,
    isVerified: true,
    divisionId: 'rajshahi',
    district: 'রাজশাহী',
    upazila: 'বোয়ালিয়া',
    principal: 'মুফতী উমর ফারুক',
    phone: '01713445566',
    whatsapp: '8801713445566',
    mapX: 115,
    mapY: 260,
  },
  {
    id: 'm-8',
    name: 'খুলনা দারুল কুরআন সিদ্দিকিয়া কামিল মাদরাসা',
    type: 'alia',
    typeLabel: 'আলিয়া শিক্ষা বোর্ড ও ফাজিল',
    students: 1650,
    passRate: 96.8,
    rating: 4.7,
    isVerified: true,
    divisionId: 'khulna',
    district: 'খুলনা',
    upazila: 'খুলনা সদর',
    principal: 'মাওলানা মোস্তাক আহমেদ',
    phone: '01815667788',
    whatsapp: '8801815667788',
    mapX: 180,
    mapY: 440,
  },
  {
    id: 'm-9',
    name: 'জামিয়া ইসলামিয়া মাহমুদীয়া বরিশাল',
    type: 'qawmi',
    typeLabel: 'কওমি ও হিফজ বিভাগ',
    students: 880,
    passRate: 97.0,
    rating: 4.8,
    isVerified: true,
    divisionId: 'barisal',
    district: 'বরিশাল',
    upazila: 'কোতোয়ালি',
    principal: 'মাওলানা মাহবুবুর রহমান',
    phone: '01714889900',
    whatsapp: '8801714889900',
    mapX: 295,
    mapY: 485,
  },
  {
    id: 'm-10',
    name: 'রংপুর কারামতিয়া কামিল মাদরাসা',
    type: 'alia',
    typeLabel: 'ঐতিহাসিক আলিয়া ক্যাম্পাস',
    students: 1720,
    passRate: 96.2,
    rating: 4.7,
    isVerified: true,
    divisionId: 'rangpur',
    district: 'রংপুর',
    upazila: 'রংপুর সদর',
    principal: 'মাওলানা শফিকুল বারী',
    phone: '01716112233',
    whatsapp: '8801716112233',
    mapX: 165,
    mapY: 115,
  },
  {
    id: 'm-11',
    name: 'ময়মনসিংহ জামিয়া ইসলামিয়া সেহড়া',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও ফতোয়া',
    students: 1150,
    passRate: 97.4,
    rating: 4.8,
    isVerified: true,
    divisionId: 'mymensingh',
    district: 'ময়মনসিংহ',
    upazila: 'সদর',
    principal: 'মাওলানা তাজুল ইসলাম',
    phone: '01715778899',
    whatsapp: '8801715778899',
    mapX: 290,
    mapY: 195,
  },
];

// Division SVG Territory Paths
const DIVISION_SHAPES: Array<{
  id: string;
  nameBn: string;
  nameEn: string;
  path: string;
  labelX: number;
  labelY: number;
  institutionsCount: number;
}> = [
  {
    id: 'rangpur',
    nameBn: 'রংপুর',
    nameEn: 'Rangpur',
    path: 'M 175 35 C 205 50, 230 85, 230 135 C 230 165, 200 190, 175 195 C 145 198, 120 185, 110 155 C 100 120, 115 65, 145 40 Z',
    labelX: 165,
    labelY: 115,
    institutionsCount: 64,
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী',
    nameEn: 'Rajshahi',
    path: 'M 120 175 C 145 185, 185 195, 205 235 C 215 275, 195 315, 165 335 C 135 355, 80 345, 50 315 C 30 280, 45 235, 75 195 Z',
    labelX: 115,
    labelY: 260,
    institutionsCount: 154,
  },
  {
    id: 'mymensingh',
    nameBn: 'ময়মনসিংহ',
    nameEn: 'Mymensingh',
    path: 'M 235 145 C 275 135, 325 145, 355 165 C 370 195, 360 235, 330 255 C 290 275, 250 260, 225 245 C 215 205, 215 165, 235 145 Z',
    labelX: 290,
    labelY: 200,
    institutionsCount: 58,
  },
  {
    id: 'sylhet',
    nameBn: 'সিলেট',
    nameEn: 'Sylhet',
    path: 'M 365 165 C 405 135, 465 140, 515 170 C 545 205, 535 250, 495 280 C 445 305, 395 285, 375 255 C 355 225, 350 185, 365 165 Z',
    labelX: 445,
    labelY: 215,
    institutionsCount: 98,
  },
  {
    id: 'dhaka',
    nameBn: 'ঢাকা',
    nameEn: 'Dhaka',
    path: 'M 220 255 C 260 255, 330 260, 365 270 C 390 305, 385 355, 365 395 C 325 425, 265 420, 225 395 C 190 365, 200 305, 220 255 Z',
    labelX: 285,
    labelY: 335,
    institutionsCount: 432,
  },
  {
    id: 'khulna',
    nameBn: 'খুলনা',
    nameEn: 'Khulna',
    path: 'M 165 345 C 205 355, 235 385, 245 435 C 255 485, 235 540, 195 565 C 155 580, 115 555, 100 505 C 90 445, 115 375, 165 345 Z',
    labelX: 175,
    labelY: 450,
    institutionsCount: 112,
  },
  {
    id: 'barisal',
    nameBn: 'বরিশাল',
    nameEn: 'Barisal',
    path: 'M 250 425 C 290 415, 340 430, 355 465 C 365 515, 345 560, 310 580 C 275 590, 245 565, 240 515 C 235 470, 240 440, 250 425 Z',
    labelX: 295,
    labelY: 490,
    institutionsCount: 76,
  },
  {
    id: 'chittagong',
    nameBn: 'চট্টগ্রাম',
    nameEn: 'Chattogram',
    path: 'M 370 300 C 415 295, 465 325, 490 375 C 515 435, 545 515, 535 595 C 525 655, 485 695, 450 665 C 425 625, 415 545, 405 485 C 390 425, 355 375, 360 335 Z',
    labelX: 445,
    labelY: 460,
    institutionsCount: 328,
  },
];

export default function MapDirectoryPage() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMadrasa, setActiveMadrasa] = useState<MapMadrasa | null>(MAP_MADRASAS[0]);
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);

  // Map view & theme controls
  const [viewMode, setViewMode] = useState<'split' | 'mapOnly' | 'listOnly'>('split');
  const [mapTheme, setMapTheme] = useState<'satellite' | 'emerald'>('satellite');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter logic
  const filteredMadrasas = MAP_MADRASAS.filter((m) => {
    const matchesDiv = selectedDivisionId === 'all' || m.divisionId === selectedDivisionId;
    const matchesType = selectedType === 'all' || m.type === selectedType;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.district.includes(searchQuery) ||
      m.upazila.includes(searchQuery);
    return matchesDiv && matchesType && matchesSearch;
  });

  const activeDivisionObj = DIVISION_SHAPES.find((d) => d.id === selectedDivisionId);

  return (
    <div style={{ padding: '1rem', maxWidth: '72rem', margin: '0 auto', fontFamily: 'Hind Siliguri, sans-serif' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.825rem' }}>
              ড্যাশবোর্ড
            </Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.825rem' }}>ভৌগোলিক মানচিত্র</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
            বাংলাদেশের ভৌগোলিক ইসলামিক শিক্ষা মানচিত্র (Interactive GIS Map)
          </h1>
          <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
            মানচিত্রে বিভাগের ভৌগোলিক সীমানা, সক্রিয় শিক্ষা হাবের জিপিএস পিন এবং শীর্ষ প্রতিষ্ঠানের পারফরম্যান্স পরখ করুন
          </p>
        </div>

        {/* View Switcher Controls */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px', display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={() => setViewMode('split')}
              style={{
                background: viewMode === 'split' ? '#ffffff' : 'transparent',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: '700',
                color: viewMode === 'split' ? '#0f172a' : '#64748b',
                cursor: 'pointer',
                boxShadow: viewMode === 'split' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              দ্বৈত ভিউ (ম্যাপ + তালিকা)
            </button>
            <button
              onClick={() => setViewMode('mapOnly')}
              style={{
                background: viewMode === 'mapOnly' ? '#ffffff' : 'transparent',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: '700',
                color: viewMode === 'mapOnly' ? '#0f172a' : '#64748b',
                cursor: 'pointer',
                boxShadow: viewMode === 'mapOnly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              শুধু মানচিত্র ভিউ
            </button>
            <button
              onClick={() => setViewMode('listOnly')}
              style={{
                background: viewMode === 'listOnly' ? '#ffffff' : 'transparent',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.775rem',
                fontWeight: '700',
                color: viewMode === 'listOnly' ? '#0f172a' : '#64748b',
                cursor: 'pointer',
                boxShadow: viewMode === 'listOnly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              শুধু তালিকা ভিউ
            </button>
          </div>

          <button
            onClick={() => setMapTheme(mapTheme === 'satellite' ? 'emerald' : 'satellite')}
            style={{
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.775rem',
              fontWeight: '700',
              cursor: 'pointer',
              color: '#334155',
            }}
          >
            {mapTheme === 'satellite' ? '🛰️ স্যাটেলাইট মোড' : '🗺️ এমারেল্ড ভৌগোলিক মোড'}
          </button>
        </div>
      </div>

      {/* Top Filter Bar */}
      <div
        className="card"
        style={{
          padding: '0.85rem 1rem',
          background: '#ffffff',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>বিভাগ নির্বাচন:</span>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedDivisionId('all')}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: selectedDivisionId === 'all' ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                background: selectedDivisionId === 'all' ? '#f0fdf4' : '#ffffff',
                color: selectedDivisionId === 'all' ? '#16a34a' : '#475569',
              }}
            >
              সমগ্র বাংলাদেশ (৮টি বিভাগ)
            </button>
            {DIVISION_SHAPES.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDivisionId(d.id)}
                style={{
                  padding: '0.25rem 0.55rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: selectedDivisionId === d.id ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                  background: selectedDivisionId === d.id ? '#f0fdf4' : '#ffffff',
                  color: selectedDivisionId === d.id ? '#16a34a' : '#475569',
                }}
              >
                {d.nameBn}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="মাদরাসা বা জেলা খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.8rem',
              width: '13rem',
            }}
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'mapOnly' ? '1fr' : viewMode === 'listOnly' ? '1fr' : '1.35fr 1fr', gap: '1.25rem' }}>
        {/* Left Column: Interactive Visual Bangladesh SVG Map */}
        {viewMode !== 'listOnly' && (
          <div
            className="card"
            style={{
              padding: '1.25rem',
              background: mapTheme === 'satellite' ? '#090d16' : '#f8fafc',
              border: mapTheme === 'satellite' ? '1.5px solid #1e293b' : '1.5px solid #cbd5e1',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}
          >
            {/* Map Header & Info Overlay */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 10px #22c55e' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: mapTheme === 'satellite' ? '#ffffff' : '#0f172a' }}>
                  {activeDivisionObj ? `${activeDivisionObj.nameBn} বিভাগীয় ম্যাপ ভিউ` : 'সমগ্র বাংলাদেশ ভৌগোলিক ম্যাপ'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
                  style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: mapTheme === 'satellite' ? '#ffffff' : '#0f172a', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  title="জুম ইন"
                >
                  +
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                  style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: mapTheme === 'satellite' ? '#ffffff' : '#0f172a', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  title="জুম আউট"
                >
                  -
                </button>
                <button
                  onClick={() => { setZoomLevel(1); setSelectedDivisionId('all'); }}
                  style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: mapTheme === 'satellite' ? '#ffffff' : '#0f172a', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  রিসেট
                </button>
              </div>
            </div>

            {/* Map Legend & Compass */}
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', zIndex: 10, background: mapTheme === 'satellite' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: mapTheme === 'satellite' ? '#94a3b8' : '#475569', marginBottom: '0.3rem' }}>
                ম্যাপ সংকেত (Map Legend):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.675rem', color: mapTheme === 'satellite' ? '#e2e8f0' : '#1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></span>
                  কওমি জামিয়া হাব
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
                  আন্তর্জাতিক হিফজ একাডেমি
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9333ea' }}></span>
                  আলিয়া কামিল মাদরাসা
                </div>
              </div>
            </div>

            {/* Compass */}
            <div style={{ position: 'absolute', top: '3.5rem', right: '1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: '900', fontSize: '0.75rem', background: 'rgba(0,0,0,0.3)' }}>
                N
              </div>
              <span style={{ fontSize: '0.65rem', color: mapTheme === 'satellite' ? '#94a3b8' : '#64748b' }}>উত্তর</span>
            </div>

            {/* The SVG Canvas */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}>
              <svg
                viewBox="0 0 600 700"
                style={{ width: '100%', maxHeight: '540px', overflow: 'visible' }}
              >
                {/* SVG Defs for Gradients & Filters */}
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <radialGradient id="radarPing" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Geographic Grid Lines (Latitudes & Longitudes) */}
                <g stroke={mapTheme === 'satellite' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} strokeWidth="1" strokeDasharray="3,3">
                  <line x1="20" y1="140" x2="580" y2="140" />
                  <line x1="20" y1="280" x2="580" y2="280" />
                  <line x1="20" y1="420" x2="580" y2="420" />
                  <line x1="20" y1="560" x2="580" y2="560" />
                  <line x1="150" y1="20" x2="150" y2="680" />
                  <line x1="300" y1="20" x2="300" y2="680" />
                  <line x1="450" y1="20" x2="450" y2="680" />
                </g>

                {/* Bay of Bengal Text */}
                <text
                  x="280"
                  y="660"
                  fill={mapTheme === 'satellite' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(14, 165, 233, 0.4)'}
                  fontSize="16"
                  fontWeight="800"
                  letterSpacing="4"
                  textAnchor="middle"
                >
                  বঙ্গোপসাগর (BAY OF BENGAL)
                </text>

                {/* 8 DIVISION REGION PATHS */}
                {DIVISION_SHAPES.map((div) => {
                  const isSelected = selectedDivisionId === div.id;
                  const isHovered = hoveredDivision === div.id;
                  const isDimmed = selectedDivisionId !== 'all' && selectedDivisionId !== div.id;

                  const fillColor = isSelected
                    ? (mapTheme === 'satellite' ? '#166534' : '#bbf7d0')
                    : isHovered
                    ? (mapTheme === 'satellite' ? '#1e3a5f' : '#dbeafe')
                    : isDimmed
                    ? (mapTheme === 'satellite' ? '#0f172a' : '#f1f5f9')
                    : (mapTheme === 'satellite' ? '#132338' : '#e2e8f0');

                  const strokeColor = isSelected
                    ? '#22c55e'
                    : isHovered
                    ? '#38bdf8'
                    : (mapTheme === 'satellite' ? '#334155' : '#cbd5e1');

                  return (
                    <g
                      key={div.id}
                      onClick={() => setSelectedDivisionId(selectedDivisionId === div.id ? 'all' : div.id)}
                      onMouseEnter={() => setHoveredDivision(div.id)}
                      onMouseLeave={() => setHoveredDivision(null)}
                      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                    >
                      <path
                        d={div.path}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? '3' : '1.75'}
                        filter={isSelected ? 'url(#glow)' : undefined}
                      />

                      {/* Division Center Label & Count Badge */}
                      <g transform={`translate(${div.labelX}, ${div.labelY})`}>
                        <rect
                          x="-35"
                          y="-16"
                          width="70"
                          height="28"
                          rx="6"
                          fill={isSelected ? '#16a34a' : mapTheme === 'satellite' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255,255,255,0.9)'}
                          stroke={isSelected ? '#4ade80' : 'rgba(255,255,255,0.2)'}
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="-2"
                          textAnchor="middle"
                          fill={isSelected ? '#ffffff' : mapTheme === 'satellite' ? '#f8fafc' : '#0f172a'}
                          fontSize="10"
                          fontWeight="800"
                        >
                          {div.nameBn}
                        </text>
                        <text
                          x="0"
                          y="9"
                          textAnchor="middle"
                          fill={isSelected ? '#dcfce7' : mapTheme === 'satellite' ? '#94a3b8' : '#64748b'}
                          fontSize="8"
                          fontWeight="700"
                        >
                          {div.institutionsCount} প্রতিষ্ঠান
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* GPS RADAR PIN MARKERS FOR MADRASAS */}
                {filteredMadrasas.map((madrasa) => {
                  const isMadrasaActive = activeMadrasa?.id === madrasa.id;
                  const pinColor = madrasa.type === 'qawmi' ? '#16a34a' : madrasa.type === 'hifz' ? '#2563eb' : '#9333ea';

                  return (
                    <g
                      key={madrasa.id}
                      transform={`translate(${madrasa.mapX}, ${madrasa.mapY})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMadrasa(madrasa);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Animated Radar Pulse Ring */}
                      <circle cx="0" cy="0" r={isMadrasaActive ? "18" : "12"} fill={pinColor} opacity="0.25">
                        <animate attributeName="r" values="8;22;8" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.5s" repeatCount="indefinite" />
                      </circle>

                      {/* Solid Pin Dot */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isMadrasaActive ? "7" : "5"}
                        fill={pinColor}
                        stroke="#ffffff"
                        strokeWidth="2"
                        filter={isMadrasaActive ? 'url(#glow)' : undefined}
                      />

                      {/* Pin Callout Marker */}
                      {isMadrasaActive && (
                        <g transform="translate(0, -14)">
                          <polygon points="-4,-6 4,-6 0,-1" fill="#ffffff" />
                          <rect
                            x="-50"
                            y="-24"
                            width="100"
                            height="18"
                            rx="4"
                            fill="#0f172a"
                            stroke="#38bdf8"
                            strokeWidth="1.5"
                          />
                          <text
                            x="0"
                            y="-12"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="8"
                            fontWeight="800"
                          >
                            {madrasa.name.slice(0, 14)}...
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Right Column: Active Pin Inspector Card & Ranked Madrasa List */}
        {viewMode !== 'mapOnly' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Active Madrasa Pin Inspector Card */}
            {activeMadrasa && (
              <div
                className="card"
                style={{
                  padding: '1.25rem',
                  background: '#ffffff',
                  borderTop: '4px solid #16a34a',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: activeMadrasa.type === 'qawmi' ? '#f0fdf4' : activeMadrasa.type === 'hifz' ? '#eff6ff' : '#f5f3ff',
                      color: activeMadrasa.type === 'qawmi' ? '#16a34a' : activeMadrasa.type === 'hifz' ? '#2563eb' : '#7c3aed',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    {activeMadrasa.typeLabel}
                  </span>

                  {activeMadrasa.isVerified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', fontWeight: '700', color: '#2563eb', background: '#eff6ff', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      ✓ অফিশিয়াল ব্লু ভেরিফাইড
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                  {activeMadrasa.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  {activeMadrasa.upazila}, {activeMadrasa.district} | প্রধান: <strong>{activeMadrasa.principal}</strong>
                </p>

                {/* Stats Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', marginBottom: '0.85rem' }}>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#64748b' }}>শিক্ষার্থী</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#16a34a' }}>{activeMadrasa.students} জন</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#64748b' }}>পাসের হার</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#2563eb' }}>{activeMadrasa.passRate}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.675rem', color: '#64748b' }}>রেটিং</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ca8a04' }}>{activeMadrasa.rating} ★</div>
                  </div>
                </div>

                {/* 1-Tap WhatsApp & Call Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={`https://wa.me/${activeMadrasa.whatsapp}?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি নূরহাব মানচিত্র ডিরেক্টরি থেকে ${activeMadrasa.name} সম্পর্কে জানতে চাই।`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      background: '#16a34a',
                      color: '#ffffff',
                      padding: '0.45rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    হোয়াটসঅ্যাপ ইনকোয়ারি
                  </a>

                  <a
                    href={`tel:${activeMadrasa.phone}`}
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    সরাসরি কল
                  </a>
                </div>
              </div>
            )}

            {/* List of Madrasas under current Filter */}
            <div className="card" style={{ padding: '1rem', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  মানচিত্রের শীর্ষ প্রতিষ্ঠানসমূহ ({filteredMadrasas.length}টি)
                </h4>
                <span style={{ fontSize: '0.725rem', color: '#64748b' }}>
                  (ট্যাপ করলে ম্যাপে জুম হবে)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '380px', overflowY: 'auto' }}>
                {filteredMadrasas.map((m) => {
                  const isSelected = activeMadrasa?.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setActiveMadrasa(m)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: isSelected ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                        background: isSelected ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '800', color: '#0f172a' }}>
                            {m.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {m.typeLabel} | {m.upazila}, {m.district}
                          </div>
                        </div>

                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16a34a' }}>
                          {m.passRate}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
