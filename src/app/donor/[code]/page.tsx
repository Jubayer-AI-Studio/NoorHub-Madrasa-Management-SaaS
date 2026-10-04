'use client';

import { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';
import LanguageToggle from '@/components/layout/LanguageToggle';

interface DonorPageProps {
  params: Promise<{ code: string }>;
}

export default function DonorImpactDetailsPage({ params }: DonorPageProps) {
  const resolvedParams = use(params);
  const code = resolvedParams.code || 'DNR-87654321';
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const donationData = {
    trackingCode: code,
    donorName: 'হাজী মোঃ আব্দুল আলী',
    donorNameEn: 'Haji Md. Abdul Ali',
    phone: '01711***789',
    amount: 15000,
    donationType: 'যাকাত ও লিল্লাহ ফান্ড',
    donationTypeEn: 'Zakat & Lillah Fund',
    madrasaName: 'আল-জামিয়া আল-ইসলামিয়া পটিয়া',
    madrasaNameEn: 'Al-Jamia Al-Islamia Patiya',
    date: '১৮ সেপ্টেম্বর ২০২৬',
    dateEn: '18 September 2026',
    receiptNo: 'NH-REC-2026-8941',
    paymentMethod: 'বিকাশ মার্চেন্ট পে',
    paymentMethodEn: 'bKash Merchant Pay',
    isVerified: true,
    impactSummary: 'আপনার প্রদত্ত ১৫,০০০ টাকার সম্পূর্ণ হিসাব ও বাস্তব ব্যবহারের বিবরণ:',
    impactSummaryEn: 'Transparent audit and utilization breakdown of your BDT 15,000 donation:',
    impactItems: [
      {
        title: 'এতিম শিক্ষার্থীদের খোরাকি ও পোশাক',
        titleEn: 'Orphan Students Food & Clothing',
        amount: '১০,০০০ ৳',
        amountEn: '৳10,000',
        description: 'হিফজ বিভাগের ৫ জন এতিম শিক্ষার্থীর ১ মাসের খাবার ও নতুন পোশাক ক্রয়ে ব্যয়িত হয়েছে।',
        descriptionEn: 'Spent on 1-month boarding meals and clothing for 5 orphan Hifz students.',
        percent: 66,
      },
      {
        title: 'দরসি কিতাব ও শিক্ষা সামগ্রী',
        titleEn: 'Academic Kitabs & Study Supplies',
        amount: '৩,৫০০ ৳',
        amountEn: '৳3,500',
        description: 'নতুন ভর্তি হওয়া শিক্ষার্থীদের পবিত্র কুরআনুল কারীম ও কিতাব প্রদান করা হয়েছে।',
        descriptionEn: 'Distributed copies of the Holy Quran and textbook kitabs to newly admitted students.',
        percent: 24,
      },
      {
        title: 'জরুরি চিকিৎসা তহবিল',
        titleEn: 'Emergency Healthcare Fund',
        amount: '১,৫০০ ৳',
        amountEn: '৳1,500',
        description: 'আবাসিক ছাত্রদের জরুরি প্রাথমিক চিকিৎসা ফান্ডে জমা রয়েছে।',
        descriptionEn: 'Reserved for urgent medical checkups and first-aid for residential students.',
        percent: 10,
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: '#f8fafc',
        padding: '1.5rem 1rem',
      }}
    >
      <div style={{ maxWidth: '38rem', margin: '0 auto' }}>
        {/* Top bar with back link and LanguageToggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <Link
            href="/donor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: '#64748b',
              textDecoration: 'none',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {isEn ? 'Verify Another Code' : 'অন্য রসিদ যাচাই করুন'}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LanguageToggle variant="compact" />

            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '0.625rem',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#334155',
                fontFamily: 'Hind Siliguri, sans-serif',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              {isEn ? 'Print / PDF' : 'রসিদ প্রিন্ট / PDF'}
            </button>
          </div>
        </div>

        {/* Verified Banner */}
        <div
          className="card"
          style={{
            padding: '1rem 1.25rem',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#ffffff',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700' }}>
                {isEn ? 'Donation Transparency Verified' : 'অনুদানের স্বচ্ছতা নিশ্চিতকৃত'}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                {isEn ? `Tracking Code: ${donationData.trackingCode}` : `অফিসিয়াল ট্র্যাকিং কোড: ${donationData.trackingCode}`}
              </div>
            </div>
          </div>
          <span style={{ background: '#ffffff', color: '#16a34a', padding: '0.2rem 0.625rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700' }}>
            {isEn ? '100% Transparent' : '১০০% স্বচ্ছ'}
          </span>
        </div>

        {/* Receipt Overview Card */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ textAlign: 'center', paddingBottom: '1rem', borderBottom: '1px dashed #e2e8f0', marginBottom: '1.25rem' }}>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
              {isEn ? donationData.madrasaNameEn : donationData.madrasaName}
            </div>
            <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: '#16a34a', margin: '0.25rem 0' }}>
              ৳{formatNumberByLang(donationData.amount, lang)}
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '600' }}>
              {isEn ? `Fund: ${donationData.donationTypeEn}` : `খাত: ${donationData.donationType}`}
            </div>
          </div>

          {/* Key-Value Pairs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{isEn ? 'Donor Name' : 'দাতার নাম'}</div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{isEn ? donationData.donorNameEn : donationData.donorName}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{isEn ? 'Date' : 'প্রদানের তারিখ'}</div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{isEn ? donationData.dateEn : donationData.date}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{isEn ? 'Receipt No.' : 'রসিদ নম্বর'}</div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{donationData.receiptNo}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.725rem' }}>{isEn ? 'Payment Method' : 'পরিশোধ মাধ্যম'}</div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{isEn ? donationData.paymentMethodEn : donationData.paymentMethod}</div>
            </div>
          </div>
        </div>

        {/* Live Impact Breakdown */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                {isEn ? 'How Was Your Donation Utilized?' : 'আপনার দানের অর্থ কোথায় ব্যবহার হয়েছে?'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {isEn ? 'Live updates verified against institutional expense ledgers' : 'মাদরাসার দৈনন্দিন স্বচ্ছ রেজিস্টার থেকে স্বয়ংক্রিয় হালনাগাদ'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {donationData.impactItems.map((item, index) => (
              <div key={index} style={{ background: '#f8fafc', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.875rem', color: '#0f172a' }}>
                    {isEn ? item.titleEn : item.title}
                  </span>
                  <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '800', fontSize: '0.875rem', color: '#16a34a' }}>
                    {isEn ? item.amountEn : item.amount}
                  </span>
                </div>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.78rem', color: '#64748b', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                  {isEn ? item.descriptionEn : item.description}
                </p>
                {/* Progress Bar */}
                <div style={{ height: '0.35rem', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.percent}%`, background: '#16a34a', borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dua & Contact Box */}
        <div
          className="card"
          style={{
            padding: '1.25rem',
            textAlign: 'center',
            background: '#fefce8',
            border: '1.5px solid #fef08a',
          }}
        >
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', color: '#854d0e', fontWeight: '600', marginBottom: '0.75rem', lineHeight: '1.6' }}>
            {isEn
              ? '"Jazakumullah Khairan! May Allah accept your contribution and grant you the best rewards in this life and the hereafter."'
              : '"জাযাকাল্লাহু খাইরান! আল্লাহ তা’আলা আপনার এই দানকে কবুল করুন এবং দুনিয়া ও আখিরাতে উত্তম প্রতিদান দান করুন।"'}
          </p>
          <a
            href="https://wa.me/8801711000000"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.625rem',
              background: '#16a34a',
              color: '#ffffff',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: '700',
              fontSize: '0.825rem',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {isEn ? 'Contact Madrasa via WhatsApp' : 'মাদরাসার সাথে হোয়াটসঅ্যাপে যোগাযোগ করুন'}
          </a>
        </div>
      </div>
    </main>
  );
}
