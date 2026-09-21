'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const ROLES = {
  principal: {
    label: 'মুহতামিম / প্রধান শিক্ষক',
    shortLabel: 'মুহতামিম',
    color: '#16a34a',
    bg: '#f0fdf4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  teacher: {
    label: 'শিক্ষক / উস্তাদ',
    shortLabel: 'শিক্ষক',
    color: '#2563eb',
    bg: '#eff6ff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  student: {
    label: 'ছাত্র / শিক্ষার্থী',
    shortLabel: 'ছাত্র',
    color: '#7c3aed',
    bg: '#f5f3ff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  parent: {
    label: 'অভিভাবক',
    shortLabel: 'অভিভাবক',
    color: '#ea580c',
    bg: '#fff7ed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
} as const;

type Role = keyof typeof ROLES;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = (searchParams.get('role') as Role) || 'principal';

  const [role, setRole] = useState<Role>(roleParam in ROLES ? roleParam : 'principal');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentRole = ROLES[role];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim()) {
      setError('মোবাইল নম্বর দিন');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Back Button */}
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          color: '#64748b',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontFamily: 'Hind Siliguri, sans-serif',
          fontWeight: '600',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.625rem',
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid #e2e8f0',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        ফিরে যান
      </Link>

      {/* Card */}
      <div
        className="card fade-in"
        style={{ width: '100%', maxWidth: '23rem', padding: '1.75rem' }}
      >
        {/* Role Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '3.75rem',
              height: '3.75rem',
              background: currentRole.bg,
              color: currentRole.color,
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              border: `2px solid ${currentRole.color}25`,
            }}
          >
            {currentRole.icon}
          </div>
          <h1
            style={{
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.2rem',
            }}
          >
            স্বাগতম!
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
            {currentRole.label} প্যানেল
          </p>
        </div>

        {/* Role Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            marginBottom: '1.25rem',
            background: '#f1f5f9',
            borderRadius: '0.75rem',
            padding: '0.25rem',
          }}
        >
          {(Object.keys(ROLES) as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: '0.45rem 0.25rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.725rem',
                fontFamily: 'Hind Siliguri, sans-serif',
                fontWeight: '600',
                transition: 'all 150ms ease',
                background: role === r ? '#ffffff' : 'transparent',
                color: role === r ? ROLES[r].color : '#64748b',
                boxShadow: role === r ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {ROLES[r].shortLabel}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="label">মোবাইল নম্বর বা রোল নম্বর</label>
            <input
              className="input"
              type="text"
              placeholder="01XXXXXXXXX বা রোল নম্বর"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="label">পাসওয়ার্ড</label>
            <input
              className="input"
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#dc2626',
                fontSize: '0.85rem',
                fontFamily: 'Hind Siliguri, sans-serif',
                background: '#fee2e2',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ background: currentRole.color, marginTop: '0.25rem' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="spinner" style={{ width: '1rem', height: '1rem', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                প্রবেশ করা হচ্ছে...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                প্রবেশ করুন
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Support Link */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '1.25rem',
            color: '#94a3b8',
            fontSize: '0.8rem',
            fontFamily: 'Hind Siliguri, sans-serif',
          }}
        >
          সহায়তা প্রয়োজন?{' '}
          <Link href="/dashboard" style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>
            নূর এআই গাইড
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="spinner" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
