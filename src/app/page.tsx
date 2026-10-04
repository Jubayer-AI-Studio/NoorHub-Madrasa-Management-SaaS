'use client';

import Link from 'next/link';
import NoorHubLogo from '@/components/brand/NoorHubLogo';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

export default function HomePage() {
  const { lang, t } = useLanguage();

  const roles = [
    {
      role: 'principal',
      label: t('role_principal_card'),
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
      label: t('role_teacher_card'),
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
      label: t('role_student_card'),
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
      label: t('role_parent_card'),
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
    <main className="min-h-screen bg-subtle flex flex-col items-center justify-center p-6 relative">
      {/* Top Language Toggle */}
      <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 20 }}>
        <LanguageToggle variant="pill" />
      </div>

      {/* Logo & Brand */}
      <div className="text-center mb-6 fade-in flex flex-col items-center">
        <div style={{ marginBottom: '1rem' }}>
          <NoorHubLogo variant="full" size="lg" theme="light" showTagline={true} />
        </div>
        <p
          style={{
            color: '#64748b',
            fontSize: '0.95rem',
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            maxWidth: '380px',
            lineHeight: 1.5,
          }}
        >
          {t('entry_subtitle')}
        </p>
      </div>

      {/* Direct Dashboard Access Banner */}
      <Link
        href="/dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          maxWidth: '26rem',
          padding: '13px 20px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #16a34a, #0d9488)',
          color: '#ffffff',
          border: '1.5px solid #10b981',
          fontFamily: 'Hind Siliguri, sans-serif',
          fontWeight: '700',
          fontSize: '1rem',
          textDecoration: 'none',
          marginBottom: '1rem',
          boxShadow: '0 6px 18px rgba(22, 163, 74, 0.25)',
        }}
      >
        <span>⚡ {t('entry_enter_dashboard')}</span>
        <span
          style={{
            backgroundColor: '#ffffff',
            color: '#15803d',
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '999px',
            fontWeight: '800',
            marginLeft: '4px',
          }}
        >
          {t('entry_live_badge')}
        </span>
      </Link>

      {/* Login Options Card */}
      <div
        className="card w-full slide-up"
        style={{ maxWidth: '26rem', padding: '1.75rem' }}
      >
        <Link
          href="/register"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#ffffff',
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            textDecoration: 'none',
            boxShadow: '0 6px 18px rgba(22, 163, 74, 0.25)',
            marginBottom: '1.25rem',
            border: '1.5px solid #4ade80',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.3rem' }}>🕌</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#ffffff' }}>
                {t('entry_add_madrasa')}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#dcfce7' }}>
                {t('entry_add_madrasa_sub')}
              </div>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>

        <h2
          style={{
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            fontSize: '1rem',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {t('entry_choose_role')}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {roles.map((item) => (
            <Link
              key={item.role}
              href={`/login?role=${item.role}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.875rem',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 200ms ease',
              }}
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
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
                  fontSize: '0.95rem',
                  flex: 1,
                }}
              >
                {item.label}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            gap: '0.75rem',
            padding: '0.875rem 1rem',
            borderRadius: '0.875rem',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            color: '#1e40af',
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            textDecoration: 'none',
            border: '1.5px solid #bfdbfe',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
            marginTop: '0.75rem',
            marginBottom: '0.65rem',
          }}
        >
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.625rem',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1e3a8a' }}>
              {t('entry_explore_title')}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#3b82f6', lineHeight: '1.2' }}>
              {t('entry_explore_sub')}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
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
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: '0.875rem',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            fontWeight: '600',
            fontSize: '0.875rem',
            textDecoration: 'none',
            border: '1px solid #bbf7d0',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          {t('entry_map_btn')}
        </Link>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: '1.75rem',
          color: '#94a3b8',
          fontSize: '0.8rem',
          fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
          textAlign: 'center',
        }}
      >
        {t('entry_footer')}
      </p>
    </main>
  );
}
