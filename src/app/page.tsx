'use client';

import Link from 'next/link';

export default function HomePage() {
  const roles = [
    {
      role: 'principal',
      label: 'মুহতামিম / প্রধান শিক্ষক',
      color: '#16a34a',
      bg: '#f0fdf4',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      role: 'teacher',
      label: 'শিক্ষক / উস্তাদ',
      color: '#2563eb',
      bg: '#eff6ff',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      role: 'student',
      label: 'ছাত্র / শিক্ষার্থী',
      color: '#7c3aed',
      bg: '#f5f3ff',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      role: 'parent',
      label: 'অভিভাবক',
      color: '#ea580c',
      bg: '#fff7ed',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-subtle flex flex-col items-center justify-center p-6">
      {/* Logo & Brand */}
      <div className="text-center mb-8 fade-in">
        <div
          style={{
            width: '4.75rem',
            height: '4.75rem',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 12px 30px rgb(22 163 74 / 0.25)',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z"/>
            <path d="M9 20v-5a3 3 0 0 1 6 0v5"/>
            <path d="M12 2v3"/>
            <circle cx="12" cy="7" r="1"/>
          </svg>
        </div>
        <h1
          style={{
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '0.35rem',
          }}
        >
          নূরহাব
        </h1>
        <p
          style={{
            color: '#64748b',
            fontSize: '0.95rem',
            fontFamily: 'Hind Siliguri, sans-serif',
          }}
        >
          কওমি, আলিয়া, জেনারেল ও হিফজ শিক্ষা প্রতিষ্ঠান ব্যবস্থাপনা
        </p>
      </div>

      {/* Login Options */}
      <div
        className="card w-full slide-up"
        style={{ maxWidth: '24rem', padding: '1.75rem' }}
      >
        <h2
          style={{
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}
        >
          আপনার ভূমিকা বেছে নিন
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {roles.map((item) => (
            <Link
              key={item.role}
              href={`/login?role=${item.role}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.875rem 1rem',
                borderRadius: '0.875rem',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 200ms ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.625rem',
                  backgroundColor: item.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontWeight: '600',
                  color: '#0f172a',
                  fontSize: '0.975rem',
                  flex: 1,
                }}
              >
                {item.label}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Public Visitor Explorer Link */}
        <Link
          href="/explore"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1rem',
            borderRadius: '0.875rem',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            color: '#1e40af',
            fontFamily: 'Hind Siliguri, sans-serif',
            textDecoration: 'none',
            border: '1.5px solid #bfdbfe',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.625rem',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#1e3a8a' }}>
              উন্মুক্ত পরিদর্শন (লগইন ছাড়া)
            </div>
            <div style={{ fontSize: '0.775rem', color: '#3b82f6', lineHeight: '1.3' }}>
              কোথায় কী পড়ানো হচ্ছে, তাদের সিলেবাস ও ভালো দিকগুলো দেখুন
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>

        {/* Map Link */}
        <Link
          href="/dashboard/map"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            padding: '0.875rem',
            borderRadius: '0.875rem',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontWeight: '600',
            fontSize: '0.9rem',
            textDecoration: 'none',
            border: '1px solid #bbf7d0',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          বাংলাদেশের শিক্ষা প্রতিষ্ঠানের মানচিত্র দেখুন
        </Link>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: '2rem',
          color: '#94a3b8',
          fontSize: '0.8rem',
          fontFamily: 'Hind Siliguri, sans-serif',
          textAlign: 'center',
        }}
      >
        নূরহাব · সর্বাধুনিক শিক্ষা ব্যবস্থাপনা প্ল্যাটফর্ম
      </p>
    </main>
  );
}
