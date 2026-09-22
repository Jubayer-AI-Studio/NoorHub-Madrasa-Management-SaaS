'use client';

import Link from 'next/link';

export default function MoreMenuPage() {
  const menuSections = [
    {
      title: 'প্রশাসন ও অ্যাকাডেমিক',
      items: [
        {
          href: '/dashboard/classes',
          label: 'শ্রেণি ও জামাত ব্যবস্থাপনা',
          desc: 'নতুন জামাত ও শ্রেণি এন্ট্রি, শিক্ষক দায়িত্ব ও শ্রেণি তালিকা',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          ),
          bg: '#eff6ff',
          border: '#bfdbfe',
        },
        {
          href: '/dashboard/teachers',
          label: 'উস্তাদ ও শিক্ষক ডিরেক্টরি',
          desc: 'শিক্ষক তালিকা, দায়িত্বপ্রাপ্ত জামাত ও মাসিক ভাতা',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            </svg>
          ),
          bg: '#eff6ff',
          border: '#bfdbfe',
        },
        {
          href: '/dashboard/results',
          label: 'পরীক্ষা ও ফলাফল মেধা তালিকা',
          desc: 'কওমি ও আলিয়া গ্রেডিং, মার্কশিট প্রিন্ট ও হোয়াটসঅ্যাপে রেজাল্ট',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          ),
          bg: '#f5f3ff',
          border: '#ddd6fe',
        },
        {
          href: '/dashboard/notice',
          label: 'জরুরি নোটিশ ও ব্রডকাস্ট সেন্টার',
          desc: 'আকস্মিক ছুটি, পরীক্ষার তারিখ ও ফি তাগাদার ১-ক্লিক ঘোষণা',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          ),
          bg: '#fff7ed',
          border: '#fed7aa',
        },
        {
          href: '/dashboard/automation',
          label: 'হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব',
          desc: 'অনুপস্থিতি অ্যালার্ট, পরীক্ষার ফলাফল ও ফি রিমাইন্ডার স্বয়ংক্রিয় নোটিফিকেশন',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          ),
          bg: '#f0fdf4',
          border: '#bbf7d0',
        },
        {
          href: '/dashboard/hifz',
          label: 'হিফজুল কুরআন দৈনিক ট্র্যাকার',
          desc: 'সবক, সবকি ও আমুখতা/মনজিল ট্র্যাকিং ও ৩০ পারা অগ্রগতি',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          ),
          bg: '#f0fdf4',
          border: '#bbf7d0',
        },
        {
          href: '/dashboard/syllabus',
          label: 'শ্রেণি, সিলেবাস ও কিতাব ব্যবস্থাপনা',
          desc: 'নতুন জামাত/শ্রেণি এন্ট্রি, কিতাবের তালিকা ও ১-ট্যাপ সামারি',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          ),
          bg: '#ecfdf5',
          border: '#a7f3d0',
        },
      ],
    },
    {
      title: 'জাতীয় মানচিত্র ও স্বচ্ছ অনুদান',
      items: [
        {
          href: '/explore',
          label: 'উন্মুক্ত প্রতিষ্ঠান ও কারিকুলাম পরিদর্শন',
          desc: 'কোথায় কী পড়ানো হয় ও প্রতিষ্ঠানের ভালো দিকগুলোর ডিরেক্টরি',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          ),
          bg: '#eff6ff',
          border: '#bfdbfe',
        },
        {
          href: '/dashboard/map',
          label: 'জাতীয় ও আন্তর্জাতিক মানচিত্র',
          desc: 'বাংলাদেশ, ৮ বিভাগ, ৬৪ জেলা ও উপজেলার মাদরাসা ডিরেক্টরি',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
          ),
          bg: '#f0fdf4',
          border: '#bbf7d0',
        },
        {
          href: '/dashboard/competition',
          label: 'সুস্থ প্রতিযোগিতা, রেটিং ও ব্লু-টিক',
          desc: 'জাতীয় ও জেলা র‍্যাংকিং, স্টার রেটিং ও অর্জিত ব্যাজ গ্যালারি',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563eb">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#ffffff" />
              <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
            </svg>
          ),
          bg: '#eff6ff',
          border: '#bfdbfe',
        },
        {
          href: '/donor',
          label: 'পাবলিক ডোনার ইমপ্যাক্ট পোর্টাল',
          desc: 'দাতার টাকার বাস্তব ব্যবহার, লাইভ ফলাফল ও ডিজিটাল রসিদ',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ),
          bg: '#fefce8',
          border: '#fef08a',
        },
      ],
    },
    {
      title: 'সেটিংস ও সহায়তা',
      items: [
        {
          href: '/dashboard/settings',
          label: 'প্রতিষ্ঠান সেটিংস ও সিলেবাস সুইচ',
          desc: 'মাদরাসার তথ্য, কওমি/হিফজ/আলিয়া কনফিগ ও ১-ক্লিক ব্যাকআপ',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          ),
          bg: '#f8fafc',
          border: '#e2e8f0',
        },
        {
          href: '/dashboard/guide',
          label: 'প্রেজেন্টেশন ও ইউজার গাইড শিট',
          desc: 'সম্পূর্ণ বাংলা ব্যবহারের ম্যানুয়াল ও প্রিন্টযোগ্য গাইড',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          ),
          bg: '#ecfeff',
          border: '#cffafe',
        },
        {
          href: '/dashboard/ai',
          label: 'নূর এআই সহকারী (২৪/৭)',
          desc: 'অ্যাপের যেকোনো বিষয়ে কথা বলে সাহায্য নেওয়ার এআই',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          ),
          bg: '#f0fdf4',
          border: '#bbf7d0',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '1rem', maxWidth: '44rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
          সকল মডিউল ও অপশন
        </h1>
        <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
          নূরহাব প্ল্যাটফর্মের সকল অতিরিক্ত ফিচার ও ব্যবস্থাপনা মেনু
        </p>
      </div>

      {/* Menu Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '700', color: '#64748b', marginBottom: '0.625rem', paddingLeft: '0.25rem' }}>
              {section.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card card-hover tap-area"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.875rem 1rem',
                    border: '1.5px solid #f1f5f9',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.75rem',
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.15rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.3' }}>
                      {item.desc}
                    </div>
                  </div>

                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Section */}
        <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <Link
            href="/login"
            className="card tap-area"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem',
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              color: '#dc2626',
              textDecoration: 'none',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: '700',
              fontSize: '0.9rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            লগআউট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
