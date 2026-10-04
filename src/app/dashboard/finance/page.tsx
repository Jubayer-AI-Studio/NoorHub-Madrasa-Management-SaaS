'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';

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
type Tab = 'overview' | 'student-fees' | 'teacher-salary' | 'donations' | 'expenses' | 'bank-transfers';

const IconBuilding = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="2" />
    <line x1="15" y1="22" x2="15" y2="2" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

// ============ MOCK DATA ============
const studentFees = [
  { id: 1, name: 'মোঃ আব্দুর রহমান', nameEn: 'Md. Abdur Rahman', class: 'দশম শ্রেণি', classEn: 'Class 10', roll: '০১', rollEn: '01', month: 'সেপ্টেম্বর', monthEn: 'September', amount: 850, paid: true,  method: 'বিকাশ', methodEn: 'bKash', date: '২০ সেপ্টেম্বর', dateEn: '20 Sep' },
  { id: 2, name: 'মোঃ আব্দুল করিম',  nameEn: 'Md. Abdul Karim',  class: 'নবম শ্রেণি',  classEn: 'Class 9',  roll: '০৫', rollEn: '05', month: 'সেপ্টেম্বর', monthEn: 'September', amount: 850, paid: false, method: '', methodEn: '',      date: '', dateEn: '' },
  { id: 3, name: 'মোঃ ইব্রাহিম খলিল', nameEn: 'Md. Ibrahim Khalil', class: 'হিফজ বিভাগ', classEn: 'Hifz Dept', roll: '০২', rollEn: '02', month: 'সেপ্টেম্বর', monthEn: 'September', amount: 700, paid: true,  method: 'নগদ', methodEn: 'Cash',   date: '১৯ সেপ্টেম্বর', dateEn: '19 Sep' },
  { id: 4, name: 'মোঃ ইউসুফ আলী',   nameEn: 'Md. Yusuf Ali',    class: 'অষ্টম শ্রেণি', classEn: 'Class 8',  roll: '০৮', rollEn: '08', month: 'সেপ্টেম্বর', monthEn: 'September', amount: 750, paid: false, method: '', methodEn: '',      date: '', dateEn: '' },
  { id: 5, name: 'মোঃ মুহাম্মদ হাসান', nameEn: 'Md. Muhammad Hasan', class: 'দাওরা',     classEn: 'Dawra',    roll: '০৩', rollEn: '03', month: 'সেপ্টেম্বর', monthEn: 'September', amount: 600, paid: true,  method: 'রকেট', methodEn: 'Rocket', date: '১৮ সেপ্টেম্বর', dateEn: '18 Sep' },
];

const teacherSalaries = [
  { id: 1, name: 'মাওলানা আব্দুল্লাহ', nameEn: 'Mawlana Abdullah', subject: 'হাদীস',         subjectEn: 'Hadith',          salary: 18000, paid: true,  month: 'সেপ্টেম্বর', monthEn: 'September', date: '২০ সেপ্টেম্বর', dateEn: '20 Sep' },
  { id: 2, name: 'মাওলানা ইব্রাহিম',  nameEn: 'Mawlana Ibrahim',  subject: 'ফিক্হ',          subjectEn: 'Fiqh',            salary: 16000, paid: true,  month: 'সেপ্টেম্বর', monthEn: 'September', date: '২০ সেপ্টেম্বর', dateEn: '20 Sep' },
  { id: 3, name: 'হাফেজ কামাল উদ্দিন', nameEn: 'Hafez Kamal Uddin', subject: 'হিফজ উস্তাদ',   subjectEn: 'Hifz Ustadh',     salary: 14000, paid: false, month: 'সেপ্টেম্বর', monthEn: 'September', date: '', dateEn: '' },
  { id: 4, name: 'মোঃ রফিকুল ইসলাম', nameEn: 'Md. Rafiqul Islam',  subject: 'বাংলা / ইংরেজি', subjectEn: 'Bangla / English', salary: 12000, paid: false, month: 'সেপ্টেম্বর', monthEn: 'September', date: '', dateEn: '' },
  { id: 5, name: 'মোঃ সাইফুল করিম',  nameEn: 'Md. Saiful Karim',   subject: 'গণিত / বিজ্ঞান', subjectEn: 'Math / Science',   salary: 13000, paid: true,  month: 'সেপ্টেম্বর', monthEn: 'September', date: '১৯ সেপ্টেম্বর', dateEn: '19 Sep' },
];

export default function FinancePage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [exportSuccess, setExportSuccess] = useState(false);

  const isEn = lang === 'en';

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview',       label: isEn ? 'Overview' : 'সার-সংক্ষেপ',  icon: <IconDollarSign /> },
    { id: 'student-fees',   label: isEn ? 'Student Fees' : 'ছাত্র বেতন',   icon: <IconUsers /> },
    { id: 'teacher-salary', label: isEn ? 'Teacher Salaries' : 'শিক্ষক ভাতা',  icon: <IconBriefcase /> },
    { id: 'donations',      label: isEn ? 'Donations' : 'অনুদান',       icon: <IconHeart /> },
    { id: 'expenses',       label: isEn ? 'Expenses' : 'ব্যয়',         icon: <IconTrendingDown /> },
    { id: 'bank-transfers', label: isEn ? 'Bank & Gateways' : 'ব্যাংক ও গেটওয়ে', icon: <IconBuilding /> },
  ];

  const handleExportExcel = () => {
    setExportSuccess(true);
    const csvContent = "data:text/csv;charset=utf-8," 
      + (isEn
          ? "Date,Sector,Description,Method,Amount (BDT),Status\n20 Sep 2026,Student Fee,Md. Abdur Rahman,bKash,850,Paid\n20 Sep 2026,Teacher Salary,Mawlana Abdullah,Bank Transfer,18000,Paid\n18 Sep 2026,Zakat/Donation,Haji Md. Ali,bKash,15000,Verified\n17 Sep 2026,Kitchen Market,Cook & Groceries,Cash,15200,Disbursed\n"
          : "তারিখ,খাত,বিবরণ,মাধ্যম,পরিমাণ (টাকা),স্ট্যাটাস\n২০ সেপ্টেম্বর ২০২৬,ছাত্র বেতন,মোঃ আব্দুর রহমান,বিকাশ,৮৫০,পরিশোধিত\n২০ সেপ্টেম্বর ২০২৬,শিক্ষক ভাতা,মাওলানা আব্দুল্লাহ,ব্যাংক ট্রান্সফার,১৮০০০,পরিশোধিত\n১৮ সেপ্টেম্বর ২০২৬,দান/যাকাত,হাজী মোঃ আলী,বিকাশ,১৫০০০,স্বচ্ছ\n১৭ সেপ্টেম্বর ২০২৬,রান্নার বাজার,বাবুর্চি খরচ,নগদ,১৫২০০,ব্যয়িত\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `noorhub_financial_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Finance & Accounts Management' : 'অর্থ ও ব্যাংক ব্যবস্থাপনা'}
          </h1>
          <p style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? 'September 2026 · Student Fees, Staff Payroll, Donations & Bank Ledger'
              : 'সেপ্টেম্বর ২০২৬ · ছাত্র বেতন, শিক্ষক ভাতা, অনুদান ও ব্যাংক লেজার'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleExportExcel}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #bbf7d0', fontWeight: '700' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {isEn ? 'Export Excel / CSV' : 'এক্সেল / CSV ডাউনলোড'}
          </button>
          <button
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <IconPlus /> {isEn ? 'New Entry' : 'নতুন এন্ট্রি'}
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="card fade-in" style={{ padding: '0.75rem 1rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#16a34a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: '700' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          {isEn ? 'Complete financial ledger downloaded successfully in CSV!' : 'মাদরাসার সম্পূর্ণ অর্থ লেজার এক্সেলে (CSV) সফলভাবে ডাউনলোড হয়েছে!'}
        </div>
      )}

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
              fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontWeight: '600',
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
              { label: isEn ? 'Total Income' : 'মোট আয়',         value: isEn ? '৳ 124,500' : '১,২৪,৫০০ ৳', icon: <IconTrendingUp />,   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
              { label: isEn ? 'Total Expenses' : 'মোট ব্যয়',        value: isEn ? '৳ 89,200' : '৮৯,২০০ ৳',   icon: <IconTrendingDown />, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
              { label: isEn ? 'Tuition Fees Collected' : 'ছাত্র বেতন আদায়', value: isEn ? '৳ 87,750' : '৮৭,৭৫০ ৳',   icon: <IconUsers />,       color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
              { label: isEn ? 'Staff Salary Due' : 'শিক্ষক ভাতা বকেয়া', value: isEn ? '৳ 26,000' : '২৬,০০০ ৳', icon: <IconAlertCircle />, color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
            ].map((item) => (
              <div key={item.label} className="card" style={{ padding: '1rem', border: `1.5px solid ${item.border}` }}>
                <div style={{ width: '2rem', height: '2rem', background: item.bg, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, marginBottom: '0.625rem' }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '1.0625rem', fontWeight: '800', color: item.color, marginBottom: '0.25rem' }}>
                  {item.value}
                </div>
                <div style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '0.75rem', color: '#64748b' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Progress Bar */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
                {isEn ? 'Tuition Fee Collection This Month' : 'এই মাসে বেতন আদায়'}
              </span>
              <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontWeight: '700', color: '#16a34a', fontSize: '0.875rem' }}>
                {isEn ? '78%' : '৭৮%'}
              </span>
            </div>
            <div style={{ height: '0.75rem', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '999px', transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '0.75rem', color: '#64748b' }}>
                {isEn ? 'Collected: ৳ 87,750' : 'আদায়: ৮৭,৭৫০ ৳'}
              </span>
              <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '0.75rem', color: '#dc2626' }}>
                {isEn ? 'Due: ৳ 24,500' : 'বকেয়া: ২৪,৫০০ ৳'}
              </span>
            </div>
          </div>

          {/* Payment Methods Breakdown */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontWeight: '700', color: '#0f172a', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {isEn ? 'Payment Channels' : 'পরিশোধের মাধ্যম'}
            </h3>
            {[
              { method: isEn ? 'Cash Desk' : 'নগদ কাউন্টার', amount: isEn ? '৳ 45,200' : '৪৫,২০০ ৳', percent: 52, color: '#16a34a' },
              { method: isEn ? 'bKash Merchant' : 'বিকাশ', amount: isEn ? '৳ 28,350' : '২৮,৩৫০ ৳', percent: 32, color: '#ea580c' },
              { method: isEn ? 'Nagad' : 'নগদ (অ্যাপ)', amount: isEn ? '৳ 9,500' : '৯,৫০০ ৳', percent: 11, color: '#2563eb' },
              { method: isEn ? 'Rocket' : 'রকেট', amount: isEn ? '৳ 4,700' : '৪,৭০০ ৳', percent: 5, color: '#7c3aed' },
            ].map((item) => (
              <div key={item.method} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '0.8125rem', color: '#334155' }}>{item.method}</span>
                  <span style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: '600', color: '#0f172a' }}>{item.amount}</span>
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
              { label: isEn ? 'Paid' : 'পরিশোধিত', value: isEn ? '3' : '৩', color: '#16a34a', bg: '#f0fdf4' },
              { label: isEn ? 'Due' : 'বকেয়া',    value: isEn ? '2' : '২', color: '#dc2626', bg: '#fef2f2' },
              { label: isEn ? 'Total Collected' : 'মোট আদায়', value: isEn ? '৳ 2,150' : '৳২,১৫০', color: '#2563eb', bg: '#eff6ff' },
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
                  {(isEn ? fee.nameEn[0] : fee.name[2])}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.125rem' }}>
                    {isEn ? fee.nameEn : fee.name}
                  </div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                    {isEn ? fee.classEn : fee.class} · {isEn ? `Roll ${fee.rollEn}` : `রোল ${fee.roll}`}
                  </div>
                </div>

                {/* Amount & Status */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                    ৳{isEn ? fee.amount.toLocaleString('en-US') : fee.amount.toLocaleString('bn-BD')}
                  </div>
                  {fee.paid ? (
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {isEn ? fee.methodEn : fee.method}
                    </span>
                  ) : (
                    <button
                      className="badge"
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontSize: '0.65rem' }}
                    >
                      {isEn ? 'Collect Fee' : 'বেতন নিন'}
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
              { label: isEn ? 'Paid' : 'পরিশোধিত',  value: isEn ? '3' : '৩',      color: '#16a34a', bg: '#f0fdf4' },
              { label: isEn ? 'Due' : 'বকেয়া',     value: isEn ? '2' : '২',      color: '#dc2626', bg: '#fef2f2' },
              { label: isEn ? 'Total Salary' : 'মোট ভাতা',  value: isEn ? '৳ 73,000' : '৳৭৩,০০০', color: '#7c3aed', bg: '#f5f3ff' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: '0.875rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.125rem', fontWeight: '800', color: s.color }}>
                  {s.value}
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
                  {isEn ? teacher.nameEn[0] : (teacher.name[8] ?? 'ম')}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.125rem' }}>
                    {isEn ? teacher.nameEn : teacher.name}
                  </div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                    {isEn ? teacher.subjectEn : teacher.subject}
                  </div>
                </div>

                {/* Salary & Status */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                    ৳{isEn ? teacher.salary.toLocaleString('en-US') : teacher.salary.toLocaleString('bn-BD')}
                  </div>
                  {teacher.paid ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'flex-end' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        {isEn ? 'Disbursed' : 'প্রদান হয়েছে'}
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
                      {isEn ? 'Pay Allowance' : 'ভাতা দিন'}
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
              {isEn ? 'Pay All Outstanding Salaries Together' : 'বাকি সবার ভাতা একসাথে পরিশোধ করুন'}
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
              {isEn ? '৳ 38,500' : '৳৩৮,৫০০'}
            </div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', color: '#64748b' }}>
              {isEn ? 'Total Donations This Month' : 'এই মাসে মোট অনুদান'}
            </div>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            {[
              { donor: isEn ? 'Haji Md. Ali' : 'হাজী মোঃ আলী', type: isEn ? 'Zakat' : 'যাকাত', amount: isEn ? '15,000' : '১৫,০০০', date: isEn ? '18 Sep' : '১৮ সেপ্টেম্বর', method: isEn ? 'bKash' : 'বিকাশ' },
              { donor: isEn ? 'Md. Kashem' : 'মোঃ কাশেম সাহেব', type: isEn ? 'Lillah' : 'লিল্লাহ', amount: isEn ? '10,000' : '১০,০০০', date: isEn ? '15 Sep' : '১৫ সেপ্টেম্বর', method: isEn ? 'Cash' : 'নগদ' },
              { donor: isEn ? 'Anonymous Donor' : 'অজ্ঞাত দাতা', type: isEn ? 'Orphan Fund' : 'এতিম ফান্ড', amount: isEn ? '5,500' : '৫,৫০০', date: isEn ? '12 Sep' : '১২ সেপ্টেম্বর', method: isEn ? 'Cash' : 'নগদ' },
              { donor: isEn ? 'Md. Rahim' : 'মোঃ রহিম সাহেব', type: isEn ? 'Sadaqah' : 'সাদাকাহ', amount: isEn ? '8,000' : '৮,০০০', date: isEn ? '10 Sep' : '১০ সেপ্টেম্বর', method: isEn ? 'Bank' : 'ব্যাংক' },
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
              { name: isEn ? 'Teacher Salaries' : 'শিক্ষক বেতন', amount: isEn ? '47,000' : '৪৭,০০০', category: isEn ? 'Salary' : 'বেতন', color: '#7c3aed' },
              { name: isEn ? 'Electricity & Gas' : 'বিদ্যুৎ ও গ্যাস', amount: isEn ? '8,500' : '৮,৫০০', category: isEn ? 'Utility' : 'ইউটিলিটি', color: '#0891b2' },
              { name: isEn ? 'Kitchen & Groceries' : 'রান্নার বাজার', amount: isEn ? '15,200' : '১৫,২০০', category: isEn ? 'Food' : 'খাদ্য', color: '#ea580c' },
              { name: isEn ? 'Books & Academic Supplies' : 'কিতাব ও শিক্ষা সামগ্রী', amount: isEn ? '6,300' : '৬,৩০০', category: isEn ? 'Education' : 'শিক্ষা', color: '#16a34a' },
              { name: isEn ? 'Repair & Maintenance' : 'মেরামত ও রক্ষণাবেক্ষণ', amount: isEn ? '4,700' : '৪,৭০০', category: isEn ? 'Infrastructure' : 'অবকাঠামো', color: '#64748b' },
              { name: isEn ? 'Miscellaneous' : 'অন্যান্য', amount: isEn ? '7,500' : '৭,৫০০', category: isEn ? 'Misc' : 'বিবিধ', color: '#94a3b8' },
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

      {/* ==================== BANK TRANSFERS TAB ==================== */}
      {activeTab === 'bank-transfers' && (
        <div className="fade-in">
          {/* Bank Accounts Display */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div className="card" style={{ padding: '1rem', border: '1.5px solid #bfdbfe', background: '#eff6ff' }}>
              <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700', textTransform: 'uppercase' }}>
                {isEn ? 'Islami Bank Bangladesh PLC' : 'ইসলামী ব্যাংক বাংলাদেশ পিএলসি'}
              </div>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: '0.25rem 0' }}>
                {isEn ? '2050-1220-0100-786' : '২০৫০-১২২০-০১০০-৭৮৬'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {isEn ? 'Account Name: Al-Jamia Al-Islamia NoorHub' : 'হিসাবের নাম: আল-জামিয়া আল-ইসলামিয়া নূরহাব'}<br />
                {isEn ? 'Branch: Dhanmondi Branch, Dhaka' : 'শাখা: ধানমন্ডি শাখা, ঢাকা'}
              </div>
            </div>

            <div className="card" style={{ padding: '1rem', border: '1.5px solid #bbf7d0', background: '#f0fdf4' }}>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700', textTransform: 'uppercase' }}>
                {isEn ? 'Sonali Bank PLC' : 'সোনালী ব্যাংক পিএলসি'}
              </div>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: '0.25rem 0' }}>
                {isEn ? '0102-4552-0987-001' : '০১০২-৪৫৫২-০৯৮৭-০০১'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {isEn ? 'Account Name: NoorHub Madrasa General Fund' : 'হিসাবের নাম: নূরহাব মাদরাসা জেনারেল ফান্ড'}<br />
                {isEn ? 'Branch: New Market Branch, Dhaka' : 'শাখা: নিউ মার্কেট শাখা, ঢাকা'}
              </div>
            </div>
          </div>

          {/* Deposit Slips Verification List */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>
                {isEn ? 'Bank Deposits & Slip Tracking (Recent Submissions)' : 'ব্যাংক ডিপোজিট ও চালান ট্র্যাকিং (সাম্প্রতিক জমা)'}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>
                {isEn ? '3 Verified' : '৩টি যাচাইকৃত'}
              </span>
            </div>

            {[
              { 
                bank: isEn ? 'Islami Bank' : 'ইসলামী ব্যাংক', 
                depositor: isEn ? 'Md. Kamrul Hasan (Father - Roll 03)' : 'মোঃ কামরুল হাসান (পিতা - রোল ০৩)', 
                amount: isEn ? '8,500' : '৮,৫০০', 
                slipNo: 'IBBL-SLIP-9841', 
                date: isEn ? '21 Sep' : '২১ সেপ্টেম্বর', 
                status: isEn ? 'Verified' : 'যাচাইকৃত' 
              },
              { 
                bank: isEn ? 'Sonali Bank' : 'সোনালী ব্যাংক', 
                depositor: isEn ? 'Haji Md. Shah Alam (Lillah Donation)' : 'হাজী মোঃ শাহ আলম (লিল্লাহ অনুদান)', 
                amount: isEn ? '25,000' : '২৫,০০০', 
                slipNo: 'SONALI-CHALAN-4421', 
                date: isEn ? '20 Sep' : '২০ সেপ্টেম্বর', 
                status: isEn ? 'Verified' : 'যাচাইকৃত' 
              },
              { 
                bank: isEn ? 'Al-Arafah Islami Bank' : 'আল-আরাফাহ ইসলামী ব্যাংক', 
                depositor: isEn ? 'Mst. Shahanaj Begum (Mother - Roll 11)' : 'মোসাঃ শাহানাজ বেগম (পিতা - রোল ১১)', 
                amount: isEn ? '4,200' : '৪,২০০', 
                slipNo: 'AIBL-99812', 
                date: isEn ? '19 Sep' : '১৯ সেপ্টেম্বর', 
                status: isEn ? 'Pending' : 'অপেক্ষমাণ' 
              },
            ].map((slip, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.875rem 1rem',
                  borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconBuilding />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                    {slip.depositor}
                  </div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b' }}>
                    {slip.bank} · {isEn ? 'Slip No: ' : 'চালান নম্বর: '}{slip.slipNo} · {slip.date}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                    ৳{slip.amount}
                  </div>
                  <span
                    style={{
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      background: (slip.status === 'যাচাইকৃত' || slip.status === 'Verified') ? '#f0fdf4' : '#fff7ed',
                      color: (slip.status === 'যাচাইকৃত' || slip.status === 'Verified') ? '#16a34a' : '#ea580c',
                      border: `1px solid ${(slip.status === 'যাচাইকৃত' || slip.status === 'Verified') ? '#bbf7d0' : '#fed7aa'}`,
                    }}
                  >
                    {slip.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
