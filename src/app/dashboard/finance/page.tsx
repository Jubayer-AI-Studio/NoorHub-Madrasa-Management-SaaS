'use client';
import { useState } from 'react';

// ============ ICONS ============
const IconCreditCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconTrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconTrendingDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
);
const IconAlertCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconPrinter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconDollarSign = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

// ============ TYPES ============
type Tab = 'overview' | 'student-fees' | 'teacher-salary' | 'donations' | 'expenses';

// ============ MOCK DATA ============
const studentFees = [
  { id: 1, name: 'মোঃ আব্দুর রহমান', class: 'দশম শ্রেণি', roll: '০১', month: 'সেপ্টেম্বর', amount: 850, paid: true,  method: 'বিকাশ', date: '২০ সেপ্টেম্বর' },
  { id: 2, name: 'মোঃ আব্দুল করিম',  class: 'নবম শ্রেণি',  roll: '০৫', month: 'সেপ্টেম্বর', amount: 850, paid: false, method: '',      date: '' },
  { id: 3, name: 'মোঃ ইব্রাহিম খলিল', class: 'হিফজ বিভাগ', roll: '০২', month: 'সেপ্টেম্বর', amount: 700, paid: true,  method: 'নগদ',   date: '১৯ সেপ্টেম্বর' },
  { id: 4, name: 'মোঃ ইউসুফ আলী',   class: 'অষ্টম শ্রেণি', roll: '০৮', month: 'সেপ্টেম্বর', amount: 750, paid: false, method: '',      date: '' },
  { id: 5, name: 'মোঃ মুহাম্মদ হাসান', class: 'দাওরা',       roll: '০৩', month: 'সেপ্টেম্বর', amount: 600, paid: true,  method: 'রকেট', date: '১৮ সেপ্টেম্বর' },
];

const teacherSalaries = [
  { id: 1, name: 'মাওলানা আব্দুল্লাহ', subject: 'হাদীস',         salary: 18000, paid: true,  month: 'সেপ্টেম্বর', date: '২০ সেপ্টেম্বর' },
  { id: 2, name: 'মাওলানা ইব্রাহিম',  subject: 'ফিক্হ',          salary: 16000, paid: true,  month: 'সেপ্টেম্বর', date: '২০ সেপ্টেম্বর' },
  { id: 3, name: 'হাফেজ কামাল উদ্দিন', subject: 'হিফজ উস্তাদ',   salary: 14000, paid: false, month: 'সেপ্টেম্বর', date: '' },
  { id: 4, name: 'মোঃ রফিকুল ইসলাম', subject: 'বাংলা / ইংরেজি', salary: 12000, paid: false, month: 'সেপ্টেম্বর', date: '' },
  { id: 5, name: 'মোঃ সাইফুল করিম',  subject: 'গণিত / বিজ্ঞান', salary: 13000, paid: true,  month: 'সেপ্টেম্বর', date: '১৯ সেপ্টেম্বর' },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview',       label: 'সার-সংক্ষেপ',  icon: <IconDollarSign /> },
    { id: 'student-fees',   label: 'ছাত্র বেতন',   icon: <IconUsers /> },
    { id: 'teacher-salary', label: 'শিক্ষক ভাতা',  icon: <IconBriefcase /> },
    { id: 'donations',      label: 'অনুদান',       icon: <IconHeart /> },
    { id: 'expenses',       label: 'ব্যয়',         icon: <IconTrendingDown /> },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
            অর্থ ব্যবস্থাপনা
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8125rem', color: '#64748b' }}>
            সেপ্টেম্বর ২০২৬
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <IconPlus /> নতুন এন্ট্রি
        </button>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex', gap: '0.25rem', marginBottom: '1.25rem',
          background: '#f1f5f9', borderRadius: '0.875rem', padding: '0.25rem',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 0.875rem', borderRadius: '0.625rem', border: 'none',
              cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8125rem',
              fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '600',
              transition: 'all 150ms ease',
              background: activeTab === tab.id ? '#ffffff' : 'transparent',
              color: activeTab === tab.id ? '#16a34a' : '#64748b',
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <span style={{ color: activeTab === tab.id ? '#16a34a' : '#94a3b8' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== OVERVIEW TAB ==================== */}
      {activeTab === 'overview' && (
        <div className="fade-in">
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'মোট আয়',         value: '১,২৪,৫০০ ৳', icon: <IconTrendingUp />,   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: 'মোট ব্যয়',        value: '৮৯,২০০ ৳',   icon: <IconTrendingDown />, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
              { label: 'ছাত্র বেতন আদায়', value: '৮৭,৭৫০ ৳',   icon: <IconUsers />,       color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
              { label: 'শিক্ষক ভাতা বকেয়া', value: '২৬,০০০ ৳', icon: <IconAlertCircle />, color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
            ].map((item) => (
              <div key={item.label} className="card" style={{ padding: '1rem', border: `1.5px solid ${item.border}` }}>
                <div style={{ width: '2rem', height: '2rem', background: item.bg, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginBottom: '0.625rem' }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.0625rem', fontWeight: '800', color: item.color, marginBottom: '0.25rem' }}>
                  {item.value}
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Progress Bar */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                এই মাসে বেতন আদায়
              </span>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', color: '#16a34a', fontSize: '0.875rem' }}>
                ৭৮%
              </span>
            </div>
            <div style={{ height: '0.75rem', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '999px', transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>আদায়: ৮৭,৭৫০ ৳</span>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#dc2626' }}>বকেয়া: ২৪,৫০০ ৳</span>
            </div>
          </div>

          {/* Payment Methods Breakdown */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', color: '#0f172a', fontSize: '0.9rem', marginBottom: '1rem' }}>
              পরিশোধের মাধ্যম
            </h3>
            {[
              { method: 'নগদ', amount: '৪৫,২০০ ৳', percent: 52, color: '#16a34a' },
              { method: 'বিকাশ', amount: '২৮,৩৫০ ৳', percent: 32, color: '#ea580c' },
              { method: 'নগদ (অ্যাপ)', amount: '৯,৫০০ ৳', percent: 11, color: '#2563eb' },
              { method: 'রকেট', amount: '৪,৭০০ ৳', percent: 5, color: '#7c3aed' },
            ].map((item) => (
              <div key={item.method} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8125rem', color: '#334155' }}>{item.method}</span>
                  <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8125rem', fontWeight: '600', color: '#0f172a' }}>{item.amount}</span>
                </div>
                <div style={{ height: '0.375rem', background: '#f1f5f9', borderRadius: '999px' }}>
                  <div style={{ height: '100%', width: `${item.percent}%`, background: item.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== STUDENT FEES TAB ==================== */}
      {activeTab === 'student-fees' && (
        <div className="fade-in">
          {/* Summary Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'পরিশোধিত', value: '৩', color: '#16a34a', bg: '#f0fdf4' },
              { label: 'বকেয়া',    value: '২', color: '#dc2626', bg: '#fef2f2' },
              { label: 'মোট আদায়', value: '৳২,১৫০', color: '#2563eb', bg: '#eff6ff' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: '0.875rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '800', color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.7rem', color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Student Fee List */}
          <div className="card" style={{ overflow: 'hidden' }}>
            {studentFees.map((fee, i) => (
              <div
                key={fee.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '0.875rem 1rem',
                  borderBottom: i < studentFees.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '2.5rem', height: '2.5rem', flexShrink: 0,
                  background: fee.paid ? '#f0fdf4' : '#fef2f2',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '1rem',
                  color: fee.paid ? '#16a34a' : '#dc2626',
                  border: `2px solid ${fee.paid ? '#bbf7d0' : '#fecaca'}`,
                }}>
                  {fee.name[2]}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.125rem' }}>
                    {fee.name}
                  </div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                    {fee.class} · রোল {fee.roll}
                  </div>
                </div>

                {/* Amount & Status */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                    ৳{fee.amount}
                  </div>
                  {fee.paid ? (
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {fee.method}
                    </span>
                  ) : (
                    <button
                      className="badge"
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontSize: '0.65rem' }}
                    >
                      বেতন নিন
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TEACHER SALARY TAB ==================== */}
      {activeTab === 'teacher-salary' && (
        <div className="fade-in">
          {/* Summary Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'পরিশোধিত',  value: '৩',      color: '#16a34a', bg: '#f0fdf4' },
              { label: 'বকেয়া',     value: '২',      color: '#dc2626', bg: '#fef2f2' },
              { label: 'মোট ভাতা',  value: '৭৩,০০০', color: '#7c3aed', bg: '#f5f3ff' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: '0.875rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.125rem', fontWeight: '800', color: s.color }}>
                  {s.label === 'মোট ভাতা' ? `৳${s.value}` : s.value}
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.7rem', color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Teacher Salary List */}
          <div className="card" style={{ overflow: 'hidden' }}>
            {teacherSalaries.map((teacher, i) => (
              <div
                key={teacher.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '0.875rem 1rem',
                  borderBottom: i < teacherSalaries.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '2.5rem', height: '2.5rem', flexShrink: 0,
                  background: teacher.paid ? '#f0fdf4' : '#fff7ed',
                  borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.875rem',
                  color: teacher.paid ? '#16a34a' : '#ea580c',
                  border: `2px solid ${teacher.paid ? '#bbf7d0' : '#fed7aa'}`,
                }}>
                  {teacher.name[8] ?? 'ম'}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.125rem' }}>
                    {teacher.name}
                  </div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                    {teacher.subject}
                  </div>
                </div>

                {/* Salary & Status */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                    ৳{teacher.salary.toLocaleString('bn-BD')}
                  </div>
                  {teacher.paid ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'flex-end' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        প্রদান হয়েছে
                      </span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <IconPrinter />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="badge"
                      style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa', cursor: 'pointer', fontSize: '0.65rem' }}
                    >
                      ভাতা দিন
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pay All Button */}
          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary btn-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <IconCreditCard />
              বাকি সবার ভাতা একসাথে পরিশোধ করুন
            </button>
          </div>
        </div>
      )}

      {/* ==================== DONATIONS TAB ==================== */}
      {activeTab === 'donations' && (
        <div className="fade-in">
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ color: '#16a34a', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
              <IconHeart />
            </div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: '#16a34a', marginBottom: '0.25rem' }}>
              ৳৩৮,৫০০
            </div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', color: '#64748b' }}>
              এই মাসে মোট অনুদান
            </div>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            {[
              { donor: 'হাজী মোঃ আলী', type: 'যাকাত',    amount: '১৫,০০০', date: '১৮ সেপ্টেম্বর', method: 'বিকাশ' },
              { donor: 'মোঃ কাশেম সাহেব', type: 'লিল্লাহ',  amount: '১০,০০০', date: '১৫ সেপ্টেম্বর', method: 'নগদ' },
              { donor: 'অজ্ঞাত দাতা',   type: 'এতিম ফান্ড', amount: '৫,৫০০', date: '১২ সেপ্টেম্বর', method: 'নগদ' },
              { donor: 'মোঃ রহিম সাহেব', type: 'সাদাকাহ',  amount: '৮,০০০', date: '১০ সেপ্টেম্বর', method: 'ব্যাংক' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', background: '#fef9c3', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8a04', flexShrink: 0 }}>
                  <IconHeart />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{d.donor}</div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>{d.type} · {d.date} · {d.method}</div>
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#ca8a04' }}>৳{d.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== EXPENSES TAB ==================== */}
      {activeTab === 'expenses' && (
        <div className="fade-in">
          <div className="card" style={{ overflow: 'hidden' }}>
            {[
              { name: 'শিক্ষক বেতন',      amount: '৪৭,০০০', category: 'বেতন',    color: '#7c3aed' },
              { name: 'বিদ্যুৎ ও গ্যাস',  amount: '৮,৫০০',  category: 'ইউটিলিটি', color: '#0891b2' },
              { name: 'রান্নার বাজার',     amount: '১৫,২০০', category: 'খাদ্য',   color: '#ea580c' },
              { name: 'কিতাব ও শিক্ষা সামগ্রী', amount: '৬,৩০০', category: 'শিক্ষা', color: '#16a34a' },
              { name: 'মেরামত ও রক্ষণাবেক্ষণ', amount: '৪,৭০০', category: 'অবকাঠামো', color: '#64748b' },
              { name: 'অন্যান্য',          amount: '7,500',  category: 'বিবিধ',   color: '#94a3b8' },
            ].map((exp, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: '0.25rem', height: '2.5rem', background: exp.color, borderRadius: '999px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{exp.name}</div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>{exp.category}</div>
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#dc2626' }}>৳{exp.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
