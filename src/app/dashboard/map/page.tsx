'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BANGLADESH_DIVISIONS } from '@/lib/geo-data';

interface MadrasaListing {
  id: string;
  name: string;
  type: 'qawmi' | 'alia' | 'hifz';
  typeLabel: string;
  students: number;
  passRate: number;
  rating: number;
  isVerified: boolean;
  upazila: string;
  district: string;
  division: string;
  principal: string;
}

const SAMPLE_MADRASAS: MadrasaListing[] = [
  {
    id: '1',
    name: 'আল-জামিয়া আল-ইসলামিয়া পটিয়া',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও ইফতা',
    students: 2450,
    passRate: 98.4,
    rating: 4.9,
    isVerified: true,
    upazila: 'পটিয়া',
    district: 'চট্টগ্রাম',
    division: 'chittagong',
    principal: 'আল্লামা আব্দুল হালিম বুখারী রহ.',
  },
  {
    id: '2',
    name: 'জামিয়া শরইয়্যাহ মালিবাগ',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব ও দাওরা',
    students: 1850,
    passRate: 97.8,
    rating: 4.8,
    isVerified: true,
    upazila: 'ধানমন্ডি',
    district: 'ঢাকা',
    division: 'dhaka',
    principal: 'মাওলানা আশরাফ আলী',
  },
  {
    id: '3',
    name: 'দারুল উলুম দেওবন্দ মডেল হিফজ একাডেমি',
    type: 'hifz',
    typeLabel: 'আন্তর্জাতিক হিফজুল কুরআন',
    students: 380,
    passRate: 99.1,
    rating: 4.9,
    isVerified: true,
    upazila: 'উত্তরা',
    district: 'ঢাকা',
    division: 'dhaka',
    principal: 'হাফেজ কারী আবু ইউসুফ',
  },
  {
    id: '4',
    name: 'তা’মীরুল মিল্লাত কামিল মাদরাসা',
    type: 'alia',
    typeLabel: 'কামিল (মাস্টার্স সমমান)',
    students: 3100,
    passRate: 96.5,
    rating: 4.8,
    isVerified: true,
    upazila: 'মিরপুর',
    district: 'ঢাকা',
    division: 'dhaka',
    principal: 'ড. মাওলানা খলিলুর রহমান',
  },
  {
    id: '5',
    name: 'গাজীপুর দারুল উলুম মাদরাসা',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব বিভাগ',
    students: 820,
    passRate: 94.2,
    rating: 4.7,
    isVerified: true,
    upazila: 'গাজীপুর সদর',
    district: 'গাজীপুর',
    division: 'dhaka',
    principal: 'মাওলানা ইসমাইল হোসেন',
  },
];

export default function MapDirectoryPage() {
  const [currentLevel, setCurrentLevel] = useState<'global' | 'bangladesh' | 'division' | 'district'>('bangladesh');
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('dhaka');
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('ঢাকা');

  const selectedDivision = BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivisionId) || BANGLADESH_DIVISIONS[0];

  const divisionCounts: Record<string, number> = {
    dhaka: 432,
    chittagong: 328,
    rajshahi: 154,
    khulna: 112,
    sylhet: 98,
    barisal: 76,
    rangpur: 64,
    mymensingh: 58,
  };

  const handleSelectDivision = (id: string) => {
    setSelectedDivisionId(id);
    const div = BANGLADESH_DIVISIONS.find((d) => d.id === id);
    if (div && div.districts[0]) {
      setSelectedDistrictName(div.districts[0].nameBn);
    }
    setCurrentLevel('division');
  };

  const filteredMadrasas = SAMPLE_MADRASAS.filter((m) => {
    if (currentLevel === 'district') {
      return m.district === selectedDistrictName;
    }
    if (currentLevel === 'division') {
      return m.division === selectedDivisionId;
    }
    return true;
  });

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Top Competition & Performance Ticker Bar */}
      <div
        className="card"
        style={{
          padding: '0.875rem 1rem',
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', fontWeight: '700', color: '#4ade80', letterSpacing: '0.5px' }}>
              জাতীয় শিক্ষা পারফরম্যান্স লিডারবোর্ড
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>লাইভ হালনাগাদ</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>১,২৪৮</div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.65rem', color: '#94a3b8' }}>মোট মাদরাসা</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#4ade80' }}>৪.৫২ লাখ</div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.65rem', color: '#94a3b8' }}>মোট শিক্ষার্থী</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#60a5fa' }}>৯৭.২%</div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.65rem', color: '#94a3b8' }}>গড় পাসের হার</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#facc15' }}>৪.৮★</div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.65rem', color: '#94a3b8' }}>গড় রেটিং</div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setCurrentLevel('global')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem',
            color: currentLevel === 'global' ? '#16a34a' : '#64748b',
            fontWeight: currentLevel === 'global' ? '700' : '500',
          }}
        >
          আন্তর্জাতিক ম্যাপ
        </button>
        <span style={{ color: '#cbd5e1' }}>›</span>

        <button
          onClick={() => setCurrentLevel('bangladesh')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem',
            color: currentLevel === 'bangladesh' ? '#16a34a' : '#64748b',
            fontWeight: currentLevel === 'bangladesh' ? '700' : '500',
          }}
        >
          বাংলাদেশ
        </button>

        {(currentLevel === 'division' || currentLevel === 'district') && (
          <>
            <span style={{ color: '#cbd5e1' }}>›</span>
            <button
              onClick={() => setCurrentLevel('division')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem',
                color: currentLevel === 'division' ? '#16a34a' : '#64748b',
                fontWeight: currentLevel === 'division' ? '700' : '500',
              }}
            >
              {selectedDivision.nameBn} বিভাগ
            </button>
          </>
        )}

        {currentLevel === 'district' && (
          <>
            <span style={{ color: '#cbd5e1' }}>›</span>
            <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#16a34a', fontWeight: '700' }}>
              {selectedDistrictName} জেলা
            </span>
          </>
        )}
      </div>

      {/* ================= LEVEL 1: GLOBAL VIEW ================= */}
      {currentLevel === 'global' && (
        <div className="fade-in">
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              বিশ্বব্যাপী নূরহাব নেটওয়ার্ক
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1rem' }}>
              যেসব দেশে নূরহাব প্ল্যাটফর্ম পরিচালিত হচ্ছে। দেশের নামের ওপর ট্যাপ করে ভেতরে প্রবেশ করুন।
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { name: 'বাংলাদেশ', count: '১,২৪৮টি প্রতিষ্ঠান', students: '৪,৫২,০০০ ছাত্র', isMain: true, action: () => setCurrentLevel('bangladesh') },
                { name: 'ভারত (দেওবন্দ ও অন্যান্য)', count: '৪২টি প্রতিষ্ঠান', students: '১৮,০০০ ছাত্র', isMain: false, action: () => {} },
                { name: 'যুক্তরাজ্য (UK)', count: '১৫টি একাডেমি', students: '৩,২০০ ছাত্র', isMain: false, action: () => {} },
                { name: 'মধ্যপ্রাচ্য ও উপসাগরীয়', count: '২৮টি প্রতিষ্ঠান', students: '৭,৫০০ ছাত্র', isMain: false, action: () => {} },
              ].map((country) => (
                <div
                  key={country.name}
                  onClick={country.action}
                  className="card card-hover"
                  style={{
                    padding: '1rem',
                    cursor: country.isMain ? 'pointer' : 'default',
                    border: country.isMain ? '2px solid #16a34a' : '1px solid #e2e8f0',
                    background: country.isMain ? '#f0fdf4' : '#ffffff',
                  }}
                >
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: country.isMain ? '#16a34a' : '#0f172a', marginBottom: '0.25rem' }}>
                    {country.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#334155' }}>{country.count}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{country.students}</div>
                  {country.isMain && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.725rem', color: '#16a34a', fontWeight: '700' }}>
                      প্রবেশ করুন →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= LEVEL 2: BANGLADESH DIVISIONS ================= */}
      {currentLevel === 'bangladesh' && (
        <div className="fade-in">
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>
                  বাংলাদেশের ৮টি বিভাগ
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  যে কোনো বিভাগে ট্যাপ করে ওই বিভাগের জেলা ও মাদরাসাগুলোর তালিকা দেখুন
                </p>
              </div>
            </div>

            {/* 8 Divisions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {BANGLADESH_DIVISIONS.map((div) => (
                <div
                  key={div.id}
                  onClick={() => handleSelectDivision(div.id)}
                  className="card card-hover"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    border: '1.5px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>
                      {div.nameBn} বিভাগ
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {div.districts.length}টি জেলা
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.125rem', fontWeight: '800', color: '#16a34a' }}>
                      {divisionCounts[div.id] || 50}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600' }}>প্রতিষ্ঠান</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= LEVEL 3: DIVISION'S DISTRICTS ================= */}
      {currentLevel === 'division' && (
        <div className="fade-in">
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>
                  {selectedDivision.nameBn} বিভাগের জেলাসমূহ
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  উপজেলা ও মাদরাসার বিস্তারিত দেখতে জেলা নির্বাচন করুন
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
              {selectedDivision.districts.map((dist) => (
                <button
                  key={dist.id}
                  onClick={() => {
                    setSelectedDistrictName(dist.nameBn);
                    setCurrentLevel('district');
                  }}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid #e2e8f0',
                    background: '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '600',
                    color: '#0f172a',
                    fontSize: '0.85rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div>{dist.nameBn}</div>
                  <div style={{ fontSize: '0.7rem', color: '#16a34a', marginTop: '0.2rem' }}>
                    {dist.upazilas.length}টি উপজেলা
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= LEVEL 4: DISTRICT & MADRASAS LIST ================= */}
      {currentLevel === 'district' && (
        <div className="fade-in">
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.25rem' }}>
              {selectedDistrictName} জেলার উপজেলা ও প্রতিষ্ঠান
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#15803d' }}>
              নিচের প্রতিষ্ঠানগুলোর পারফরম্যান্স ও শীর্ষ ফলাফল দেখুন
            </p>
          </div>
        </div>
      )}

      {/* Madrasa Directory Listings (Ranked by Performance) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
          <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
            শীর্ষ মাদরাসা তালিকা (মেধা ও মানদণ্ড ক্রম)
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {filteredMadrasas.length}টি প্রতিষ্ঠান
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredMadrasas.map((madrasa, index) => (
            <div
              key={madrasa.id}
              className="card card-hover"
              style={{ padding: '1rem', border: '1.5px solid #f1f5f9' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  {/* Rank Badge */}
                  <div
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      borderRadius: '0.5rem',
                      background: index === 0 ? '#fef9c3' : '#f1f5f9',
                      color: index === 0 ? '#854d0e' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      border: index === 0 ? '1px solid #fde047' : 'none',
                    }}
                  >
                    #{index + 1}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <h4 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.975rem', fontWeight: '700', color: '#0f172a' }}>
                        {madrasa.name}
                      </h4>
                      {madrasa.isVerified && (
                        <span title="ভেরিফাইড প্রতিষ্ঠান" style={{ color: '#2563eb', display: 'inline-flex' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563eb">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffffff" />
                            <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {madrasa.typeLabel} · {madrasa.upazila}, {madrasa.district}
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    padding: '0.2rem 0.45rem',
                    borderRadius: '999px',
                    background: '#fefce8',
                    color: '#854d0e',
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    border: '1px solid #fef08a',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {madrasa.rating}
                </span>
              </div>

              {/* Stats Box */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                  background: '#f8fafc',
                  padding: '0.625rem',
                  borderRadius: '0.625rem',
                  textAlign: 'center',
                  fontSize: '0.75rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a' }}>{madrasa.students} জন</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.675rem' }}>শিক্ষার্থী</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#16a34a' }}>{madrasa.passRate}%</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.675rem' }}>মুমতাজ হার</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#2563eb' }}>{madrasa.upazila}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.675rem' }}>উপজেলা</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
