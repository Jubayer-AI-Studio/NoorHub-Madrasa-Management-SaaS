'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CompetitionBadgesPage() {
  const [requestTickSuccess, setRequestTickSuccess] = useState(false);

  const institutionRank = {
    name: 'আল-জামিয়া আল-ইসলামিয়া নূরহাব',
    nationalRank: 12,
    divisionRank: 3,
    districtRank: 1,
    overallScore: 96.4,
    starRating: 4.9,
    isBlueVerified: true,
    performanceMetrics: [
      { label: 'একাডেমিক ফলাফল ও পাসের হার', score: '৯৮%', weight: '৪০%', color: '#16a34a' },
      { label: 'দৈনিক নিয়মিত উপস্থিতি হার', score: '৯৫%', weight: '২৫%', color: '#2563eb' },
      { label: 'অভিভাবক মূল্যায়ন ও ফিডব্যাক', score: '৯৬%', weight: '২০%', color: '#7c3aed' },
      { label: 'আর্থিক স্বচ্ছতা ও অডিট রিপোর্ট', score: '৯৯%', weight: '১৫%', color: '#ca8a04' },
    ],
    badges: [
      {
        id: 'blue-tick',
        name: 'অফিশিয়াল ব্লু ভেরিফাইড টিক',
        desc: 'বোর্ড ও কমিটি কর্তৃক শতভাগ যাচাইকৃত ও অনুমোদিত শিক্ষাপ্রতিষ্ঠান।',
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
        name: 'সেরা হিফজুল কুরআন মাদরাসা ২০২৬',
        desc: 'সর্বোচ্চ সংখ্যক আন্তর্জাতিক মানের হাফেজ তৈরির গৌরবময় স্বীকৃতি।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ca8a04">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#ca8a04" />
          </svg>
        ),
      },
      {
        id: 'attendance-star',
        name: '৯৫%+ নিয়মিত উপস্থিতি স্টার',
        desc: 'শিক্ষার্থী ও শিক্ষকদের নিয়মানুবর্তিতা ও উপস্থিতির শীর্ষ মানদণ্ড।',
        earned: true,
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
      {
        id: 'transparency',
        name: 'শতভাগ স্বচ্ছ হিসাব ও অডিট ব্যাজ',
        desc: 'ডোনার ট্র্যাকিং ও অডিট রেজিস্টারে সম্পূর্ণ স্বচ্ছতার স্বীকৃতি।',
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
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            জাতীয় সুস্থ প্রতিযোগিতা ও ব্লু-টিক ব্যাজিং
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            সুস্থ মেধার প্রতিযোগিতা, প্রাতিষ্ঠানিক স্টার রেটিং ও স্বীকৃতি
          </p>
        </div>

        <Link href="/dashboard/map" className="btn btn-secondary btn-sm">
          মানচিত্রে র‍্যাংকিং দেখুন →
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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '800' }}>
                {institutionRank.name}
              </h2>
              {institutionRank.isBlueVerified && (
                <span title="ব্লু ভেরিফাইড টিক">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563eb">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffffff" />
                    <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              রেটিং স্কোর: <strong>{institutionRank.overallScore}/১০০</strong> · জাতীয় রেটিং: <strong>{institutionRank.starRating}★</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ background: '#16a34a', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
              জেলায় ১ম স্থান
            </span>
          </div>
        </div>

        {/* 3 Rank Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '0.75rem' }}>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#facc15' }}>
              #{institutionRank.nationalRank}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>জাতীয় অবস্থান (সমগ্র দেশ)</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#60a5fa' }}>
              #{institutionRank.divisionRank}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>বিভাগীয় অবস্থান (ঢাকা)</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#4ade80' }}>
              #{institutionRank.districtRank}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>জেলা পর্যায়ে অবস্থান</div>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Pillars */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem' }}>
          রেটিং নির্ধারণের ৪টি মূল মানদণ্ড (Scoring Breakdown)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {institutionRank.performanceMetrics.map((metric) => (
            <div key={metric.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem' }}>
                <span style={{ color: '#334155', fontWeight: '600' }}>
                  {metric.label} (ওজন: {metric.weight})
                </span>
                <span style={{ fontWeight: '800', color: metric.color }}>{metric.score}</span>
              </div>
              <div style={{ height: '0.45rem', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: metric.score, background: metric.color, borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Gallery */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
            অর্জিত প্রাতিষ্ঠানিক ব্যাজসমূহ ({institutionRank.badges.length}টি)
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>সকল ব্যাজ সক্রিয়</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
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
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.2rem' }}>
                  {b.name}
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>
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
