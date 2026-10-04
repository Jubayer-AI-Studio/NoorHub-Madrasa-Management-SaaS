'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

export default function DonorLookupPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [code, setCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/donor/${code.trim().toUpperCase()}`);
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
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
        <Link
          href="/dashboard/finance"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.625rem',
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid #e2e8f0',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {isEn ? 'Back to Dashboard' : 'ড্যাশবোর্ডে ফিরে যান'}
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
        <LanguageToggle variant="compact" />
      </div>

      <div className="card fade-in" style={{ width: '100%', maxWidth: '24rem', padding: '2rem', textAlign: 'center' }}>
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '1rem',
            background: '#fef9c3',
            color: '#ca8a04',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            border: '2px solid #fef08a',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
          {isEn ? 'Donor Impact & Receipt Verification' : 'ডোনার ইমপ্যাক্ট ও রসিদ যাচাই'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.85rem', fontFamily: 'Hind Siliguri, sans-serif', marginBottom: '1.5rem' }}>
          {isEn
            ? 'Enter your tracking code to view the transparent breakdown of how your donation was utilized'
            : 'আপনার দানের টাকা মাদরাসায় কীভাবে ব্যবহৃত হয়েছে তা দেখতে ট্র্যাকিং কোড লিখুন'}
        </p>

        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            type="text"
            className="input"
            placeholder={isEn ? 'e.g. DNR-87654321' : 'যেমন: DNR-87654321'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', fontWeight: '700' }}
          />

          <button type="submit" className="btn btn-primary btn-full">
            {isEn ? 'View Utilization Breakdown' : 'ব্যবহারের বিবরণ দেখুন'}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {isEn ? 'Try sample tracking code: ' : 'নমুনা ট্র্যাকিং কোড পরীক্ষা করুন: '}
          </span>
          <Link href="/donor/DNR-87654321" style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700', textDecoration: 'none' }}>
            DNR-87654321
          </Link>
        </div>
      </div>
    </main>
  );
}
