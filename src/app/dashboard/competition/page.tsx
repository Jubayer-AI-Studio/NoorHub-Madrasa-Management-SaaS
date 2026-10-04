'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

export default function CompetitionBadgesPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';
  const [requestTickSuccess, setRequestTickSuccess] = useState(false);

  const institutionRank = {
    name: isEn ? 'Al-Jamia Al-Islamia NoorHub' : 'আল-জামিয়া আল-ইসলামিয়া নূরহাব',
    nationalRank: 12,
    divisionRank: 3,
    districtRank: 1,
    overallScore: 96.4,
    starRating: 4.9,
    isBlueVerified: true,
    performanceMetrics: [
      {
        label: isEn ? 'Academic Results & Pass Rate' : 'একাডেমিক ফলাফল ও পাসের হার',
        score: isEn ? '98%' : '৯৮%',
        weight: isEn ? '40%' : '৪০%',
        scoreWidth: '98%',
        color: '#16a34a',
      },
      {
        label: isEn ? 'Daily Regular Attendance Rate' : 'দৈনিক নিয়মিত উপস্থিতি হার',
        score: isEn ? '95%' : '৯৫%',
        weight: isEn ? '25%' : '২৫%',
        scoreWidth: '95%',
        color: '#2563eb',
      },
      {
        label: isEn ? 'Parent Feedback & Satisfaction' : 'অভিভাবক মূল্যায়ন ও ফিডব্যাক',
        score: isEn ? '96%' : '৯৬%',
        weight: isEn ? '20%' : '২০%',
        scoreWidth: '96%',
        color: '#7c3aed',
      },
      {
        label: isEn ? 'Financial Transparency & Audit Report' : 'আর্থিক স্বচ্ছতা ও অডিট রিপোর্ট',
        score: isEn ? '99%' : '৯৯%',
        weight: isEn ? '15%' : '১৫%',
        scoreWidth: '99%',
        color: '#ca8a04',
      },
    ],
    badges: [
      {
        id: 'blue-tick',
        name: isEn ? 'Official Blue Verified Tick' : 'অফিশিয়াল ব্লু ভেরিফাইড টিক',
        desc: isEn
          ? '100% verified and accredited institution by Central Board & District Committee.'
          : 'বোর্ড ও কমিটি কর্তৃক শতভাগ যাচাইকৃত ও অনুমোদিত শিক্ষাপ্রতিষ্ঠান।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffffff" />
            <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
          </svg>
        ),
      },
      {
        id: 'top-hifz',
        name: isEn ? 'Best Hifzul Quran Madrasa 2026' : 'সেরা হিফজুল কুরআন মাদরাসা ২০২৬',
        desc: isEn
          ? 'Prestigious national recognition for producing international standard Huffaz.'
          : 'সর্বোচ্চ সংখ্যক আন্তর্জাতিক মানের হাফেজ তৈরির গৌরবময় স্বীকৃতি।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ca8a04">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#ca8a04" />
          </svg>
        ),
      },
      {
        id: 'attendance-star',
        name: isEn ? '95%+ Attendance Excellence Star' : '৯৫%+ নিয়মিত উপস্থিতি স্টার',
        desc: isEn
          ? 'Top benchmark for discipline and regular daily attendance among students and teachers.'
          : 'শিক্ষার্থী ও শিক্ষকদের নিয়মানুবর্তিতা ও উপস্থিতির শীর্ষ মানদণ্ড।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
      {
        id: 'transparency',
        name: isEn ? '100% Financial Transparency & Audit Badge' : 'শতভাগ স্বচ্ছ হিসাব ও অডিট ব্যাজ',
        desc: isEn
          ? 'Accreditation for complete transparency in donor tracking and digital audit registers.'
          : 'ডোনার ট্র্যাকিং ও অডিট রেজিস্টারে সম্পূর্ণ স্বচ্ছতার স্বীকৃতি।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ),
      },
    ],
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'National Excellence Competition & Blue-Tick Badging' : 'জাতীয় সুস্থ প্রতিযোগিতা ও ব্লু-টিক ব্যাজিং'}
          </h1>
          <p style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? 'Healthy institutional competition, nationwide star ratings & official accreditations'
              : 'সুস্থ মেধার প্রতিযোগিতা, প্রাতিষ্ঠানিক স্টার রেটিং ও স্বীকৃতি'}
          </p>
        </div>

        <Link href="/dashboard/map" className="btn btn-secondary btn-sm">
          {isEn ? 'View Rankings on Map →' : 'মানচিত্রে র‍্যাংকিং দেখুন →'}
        </Link>
      </div>

      {/* Institution Overall Score Card */}
      <div
        className="card"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff',
          marginBottom: '1.25rem',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h2 style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '800' }}>
                {institutionRank.name}
              </h2>
              {institutionRank.isBlueVerified && (
                <span title={isEn ? 'Blue Verified Tick' : 'ব্লু ভেরিফাইড টিক'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffffff" />
                    <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              {isEn ? 'Rating Score: ' : 'রেটিং স্কোর: '}
              <strong>
                {formatNumberByLang(institutionRank.overallScore, lang)}/{formatNumberByLang(100, lang)}
              </strong>{' '}
              · {isEn ? 'National Rating: ' : 'জাতীয় রেটিং: '}
              <strong>{formatNumberByLang(institutionRank.starRating, lang)}★</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ background: '#16a34a', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              {isEn ? '1st in District' : 'জেলায় ১ম স্থান'}
            </span>
          </div>
        </div>

        {/* 3 Rank Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '0.75rem' }}>
          <div>
            <div style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#facc15' }}>
              #{formatNumberByLang(institutionRank.nationalRank, lang)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              {isEn ? 'National Rank (Nationwide)' : 'জাতীয় অবস্থান (সমগ্র দেশ)'}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#60a5fa' }}>
              #{formatNumberByLang(institutionRank.divisionRank, lang)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              {isEn ? 'Division Rank (Dhaka)' : 'বিভাগীয় অবস্থান (ঢাকা)'}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#4ade80' }}>
              #{formatNumberByLang(institutionRank.districtRank, lang)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              {isEn ? 'District Rank' : 'জেলা পর্যায়ে অবস্থান'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Pillars */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem' }}>
          {isEn ? '4 Core Evaluation Criteria (Scoring Breakdown)' : 'রেটিং নির্ধারণের ৪টি মূল মানদণ্ড (Scoring Breakdown)'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {institutionRank.performanceMetrics.map((metric) => (
            <div key={metric.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#334155', fontWeight: '600' }}>
                  {metric.label} ({isEn ? 'Weight: ' : 'ওজন: '}{metric.weight})
                </span>
                <span style={{ fontWeight: '800', color: metric.color }}>{metric.score}</span>
              </div>
              <div style={{ height: '0.45rem', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: metric.scoreWidth, background: metric.color, borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Gallery */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
            {isEn
              ? `Earned Institutional Badges (${formatNumberByLang(institutionRank.badges.length, lang)})`
              : `অর্জিত প্রাতিষ্ঠানিক ব্যাজসমূহ (${formatNumberByLang(institutionRank.badges.length, lang)}টি)`}
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>
            {isEn ? 'All Badges Active' : 'সকল ব্যাজ সক্রিয়'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.875rem' }}>
          {institutionRank.badges.map((b) => (
            <div
              key={b.id}
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1.5px solid #f1f5f9',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
            >
              <div style={{ flexShrink: 0, marginTop: '0.15rem' }}>{b.icon}</div>
              <div>
                <div style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {b.name}
                </div>
                <div style={{ fontFamily: isEn ? 'inherit' : 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>
                  {b.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
