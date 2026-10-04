'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  BookOpen,
  Award,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  Phone,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Calendar,
  Clock,
  Printer,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { getActiveMadrasa } from '@/lib/madrasa-store';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

export default function ShowcasePage() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const activeMadrasa = getActiveMadrasa();
  const [activeTab, setActiveTab] = useState<'what_we_teach' | 'curriculum' | 'highlights' | 'tarbiyat'>('what_we_teach');

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Top Breadcrumb & Return */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            border: '1.5px solid #cbd5e1',
            color: '#334155',
            fontSize: '13px',
            fontWeight: '700',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          <span>{isEn ? 'Return to Dashboard' : 'ড্যাশবোর্ডে ফিরুন'}</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              color: '#065f46',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            <Printer style={{ width: '16px', height: '16px' }} />
            <span>{isEn ? 'Print Showcase' : 'প্রিন্ট শোকেস'}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner: Madrasa Public Identity */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '28px 24px',
          marginBottom: '24px',
          boxShadow: '0 10px 30px rgba(6, 78, 59, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.3px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              📖 {isEn ? 'Institutional Overview for Parents, Donors & Visitors' : 'অভিভাবক, শুভানুধ্যায়ী ও আগ্রহীদের জন্য মাদরাসা পরিচিতি'}
            </span>
            <span
              style={{
                backgroundColor: '#fef08a',
                color: '#854d0e',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '800',
              }}
            >
              {isEn ? 'Accredited Institution' : 'স্বীকৃত প্রতিষ্ঠান'}
            </span>
          </div>

          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 8px 0', lineHeight: 1.25 }}>
              {activeMadrasa.name}
            </h1>
            <p style={{ fontSize: '15px', color: '#d1fae5', margin: 0, maxWidth: '800px', lineHeight: 1.5 }}>
              {activeMadrasa.upazila}, {activeMadrasa.district} — {isEn
                ? 'Our curriculum, educational philosophy, moral tarbiyat, institutional achievements and comprehensive learning environment.'
                : 'আমাদের পাঠ্যক্রম, শিক্ষা দর্শন, শিক্ষার্থীদের নৈতিক তারবিয়াত এবং প্রতিষ্ঠানের অনন্য অর্জন ও পরিবেশের সার্বিক বিবরণ।'}
            </p>
          </div>

          {/* Quick Key Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{isEn ? 'Principal / Head' : 'মুহতামিম / অধ্যক্ষ'}</div>
              <div style={{ fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{activeMadrasa.principal || (isEn ? 'Mawlana Abdur Rahman' : 'মাওলানা আব্দুর রহমান')}</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{isEn ? 'Total Students' : 'মোট শিক্ষার্থী'}</div>
              <div style={{ fontSize: '15px', fontWeight: '800', marginTop: '2px' }}>
                {formatNumberByLang(347, lang)} {isEn ? 'Students (Res & Non-Res)' : 'জন (আবাসিক ও অনাবাসিক)'}
              </div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{isEn ? 'Faculty & Staff' : 'অভিজ্ঞ শিক্ষক ও স্টাফ'}</div>
              <div style={{ fontSize: '15px', fontWeight: '800', marginTop: '2px' }}>
                {formatNumberByLang(18, lang)} {isEn ? 'Qualified Ustadhs' : 'জন অভিজ্ঞ উস্তাদ'}
              </div>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{isEn ? 'Curricula' : 'শিক্ষা কারিকুলাম'}</div>
              <div style={{ fontSize: '14px', fontWeight: '800', marginTop: '2px' }}>{isEn ? 'Qawmi, Hifz & Alia' : 'কওমি, হিফজ ও আলিয়া'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: '20px',
          paddingBottom: '4px',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('what_we_teach')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: activeTab === 'what_we_teach' ? '#059669' : '#ffffff',
            color: activeTab === 'what_we_teach' ? '#ffffff' : '#475569',
            border: `1.5px solid ${activeTab === 'what_we_teach' ? '#059669' : '#cbd5e1'}`,
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <BookOpen style={{ width: '16px', height: '16px' }} />
          <span>{isEn ? '1. Department Syllabi & Subjects' : '১. কোন বিভাগে কী পড়ানো হয়'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tarbiyat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: activeTab === 'tarbiyat' ? '#059669' : '#ffffff',
            color: activeTab === 'tarbiyat' ? '#ffffff' : '#475569',
            border: `1.5px solid ${activeTab === 'tarbiyat' ? '#059669' : '#cbd5e1'}`,
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Heart style={{ width: '16px', height: '16px' }} />
          <span>{isEn ? '2. Moral Tarbiyat & Values' : '২. বাচ্চাদের কী শেখানো হয় (তারবিয়াত)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('highlights')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            backgroundColor: activeTab === 'highlights' ? '#059669' : '#ffffff',
            color: activeTab === 'highlights' ? '#ffffff' : '#475569',
            border: `1.5px solid ${activeTab === 'highlights' ? '#059669' : '#cbd5e1'}`,
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Award style={{ width: '16px', height: '16px' }} />
          <span>{isEn ? '3. Institutional Strengths & Facilities' : '৩. মাদরাসার ভালো ভালো বিষয় ও সুবিধা'}</span>
        </button>
      </div>

      {/* TAB CONTENT 1: WHAT WE TEACH (DEPARTMENT BY DEPARTMENT) */}
      {activeTab === 'what_we_teach' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '20px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                📖
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  হিফজুল কুরআন বিভাগ (আন্তর্জাতিক মানসম্মত হিফজখানা)
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  সহীহ মাখরাজ, মিশরী ক্বারীদের তাজভীদ ও দ্রুত মেমোরাইজেশন
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#15803d', marginBottom: '6px' }}>
                  ১. নাজেরা ও হুসনুত তিলাওয়াত
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  আরবি হরফের বিশুদ্ধ উচ্চারণ, নুন সাকিন ও তানভীনের নিয়ম, মাদ্দ ও গুন্নাহর বাস্তব প্রশিক্ষণ। সহীহ ও দ্রুত কুরআন পড়ার যোগ্যতা তৈরি করা।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#15803d', marginBottom: '6px' }}>
                  ২. দৈনিক সবক, সবকি ও আমুখতা
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  প্রতিদিন নতুন সবক প্রদান, পূর্বের সবক নিয়মিত ইয়াদ এবং পেছনের পড়া (আমুখতা) অন্তত ১ পারা করে দৈনন্দিন শোনানো।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#15803d', marginBottom: '6px' }}>
                  ৩. হিফজ সমাপনী ও দস্তারবন্দী
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  গড়ে ২ থেকে আড়াই বছরে পূর্ণ ৩০ পারা হিফজ সম্পন্ন করা। এক বৈঠকে ৫ থেকে ১০ পারা একটানা সুন্দর সুরে তিলাওয়াত করার যোগ্যতা অর্জন।
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '20px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                📚
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  কওমি কিতাব বিভাগ (দারসুল নিজামী সিলেবাস)
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  আরবি ভাষা, শব্দরূপ, ব্যাকরণ, ফিকহ ও উচ্চতর হাদীস গবেষণা
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#2563eb', marginBottom: '6px' }}>
                  মিজান ও নাহবেমীর জামাত
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  • <b>মিজানুস সরফ ও মুন্শাআব:</b> আরবি শব্দের ধাতু ও রূপান্তর তত্ত্ব।<br />
                  • <b>নাহবেমীর:</b> আরবি বাক্য গঠন ও ব্যাকরণ (নাহু)।<br />
                  • <b>পান্দেনামা ও গুলিস্তা:</b> ফার্সি নীতিশিক্ষা ও চারিত্রিক বিকাশ।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#2563eb', marginBottom: '6px' }}>
                  হেদায়া ও জালালাইন জামাত
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  • <b>মুখতাসারুল কুদূরী ও হেদায়া:</b> হানাফী ফিকহ ও আইনি মাসআলা।<br />
                  • <b>তাফসীরে জালালাইন:</b> কুরআনুল কারীমের নির্ভরযোগ্য প্রামাণ্য ব্যাখ্যা।<br />
                  • <b>শরহুন্নুখবা:</b> উসূলে হাদীস বা হাদিস যাচাইয়ের শাস্ত্র।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#2563eb', marginBottom: '6px' }}>
                  দাওরায়ে হাদীস (তাকমীল)
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  • <b>সহীহ আল-বুখারী ও মুসলিম:</b> রাসূলুল্লাহ (সা.)-এর পবিত্র সুন্নাহর সর্বোচ্চ স্তরের বিশ্লেষণ।<br />
                  • <b>তিরমিযী, আবু দাউদ, নাসাঈ, ইবনে মাজাহ:</b> সিহাহ সিত্তাহর পূর্ণাঙ্গ জ্ঞান।
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '20px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#fefce8', border: '1px solid #fef08a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                🎓
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  আলিয়া ও সাধারণ শিক্ষা শাখা (জাতীয় শিক্ষাক্রম ও মাদরাসা বোর্ড)
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  দ্বীনি শিক্ষার পাশাপাশি আধুনিক গণিত, বিজ্ঞান ও কম্পিউটার দক্ষতা
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#854d0e', marginBottom: '6px' }}>
                  বাংলা ও ইংরেজি ভাষা শিক্ষা
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  শুদ্ধ বাংলা বানান, সৃজনশীল লেখালেখি এবং দৈনন্দিন কার্যকর ইংরেজি ব্যাকরণ ও স্পোকেন অনুশীলন।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#854d0e', marginBottom: '6px' }}>
                  সাধারণ গণিত ও বিজ্ঞান
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  বোর্ড পরীক্ষার জন্য পূর্ণাঙ্গ পাটিগণিত, বীজগণিত, জ্যামিতি এবং দৈনন্দিন ব্যবহারিক বিজ্ঞান পাঠদান।
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: '#854d0e', marginBottom: '6px' }}>
                  কম্পিউটার ও তথ্যপ্রযুক্তি (ICT)
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  বেসিক টাইপিং (বাংলা ও ইংরেজি), অফিস সফটওয়্যার এবং নিরাপদ তথ্যপ্রযুক্তির নৈতিক ব্যবহার।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: TARBIYAT (WHAT WE TEACH THE CHILDREN FOR LIFE) */}
      {activeTab === 'tarbiyat' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
              🤲 শিশুদের নৈতিক তারবিয়াত ও চারিত্রিক গঠন
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
              শুধুমাত্র বইয়ের পড়া নয়; একজন আদর্শ, সত্যবাদী ও দেশপ্রেমিক খাঁটি মানুষ হিসেবে প্রতিটি শিশুকে গড়ে তুলতে যা যা শেখানো হয়:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ backgroundColor: '#ecfdf5', padding: '16px', borderRadius: '14px', border: '1px solid #a7f3d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🕌</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#065f46' }}>
                    ১. ৫ ওয়াক্ত নামাজ ও সুন্নাহর বাস্তব আমল
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#047857', lineHeight: 1.6 }}>
                  প্রতিটি ছাত্রকে জামাতে নামাজ আদায়ে অভ্যস্ত করা হয়। অজু, গোসল, তাহারাত ও সকাল-সন্ধ্যার মাসনূন দোয়া মুখস্থ করিয়ে নিয়মিত চর্চা করানো হয়।
                </div>
              </div>

              <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>👨‍👩‍👧‍👦</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#1e40af' }}>
                    ২. পিতা-মাতা ও শিক্ষকদের প্রতি আদব
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#1d4ed8', lineHeight: 1.6 }}>
                  পিতা-মাতার খেদমত করা, সালামের প্রসার ঘটানো, বড়দের সম্মান ও ছোটদের স্নেহ করার মতো চারিত্রিক গুণাবলী প্রতিদিন ক্লাসে যত্নসহকারে শেখানো হয়।
                </div>
              </div>

              <div style={{ backgroundColor: '#fefce8', padding: '16px', borderRadius: '14px', border: '1px solid #fef08a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🛡️</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#854d0e' }}>
                    ৩. সত্যবাদিতা ও আমানতদারিতা
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#713f12', lineHeight: 1.6 }}>
                  মিথ্যা না বলা, গিবত ও অপবাদ থেকে দূরে থাকা, অপরের জিনিস অনুমতি ছাড়া না ধরা এবং নিজের দায়িত্ব নিষ্ঠার সাথে পালন করার অভ্যাস গঠন।
                </div>
              </div>

              <div style={{ backgroundColor: '#faf5ff', padding: '16px', borderRadius: '14px', border: '1px solid #e9d5ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>✨</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#6b21a8' }}>
                    ৪. পরিচ্ছন্নতা ও স্বাস্থ্য সচেতনতা
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#581c87', lineHeight: 1.6 }}>
                  "পরিচ্ছন্নতা ঈমানের অঙ্গ"— জামাকাপড়, শোবার বিছানা, পড়ার স্থান পরিষ্কার রাখা এবং নিয়মিত নখ কাটা ও মিসওয়াক করার সুন্নাহ পালন।
                </div>
              </div>

              <div style={{ backgroundColor: '#fff7ed', padding: '16px', borderRadius: '14px', border: '1px solid #fed7aa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>💻</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#9a3412' }}>
                    ৫. সময়ের সঠিক মূল্য ও স্ক্রিন অ্যাডিকশন মুক্তি
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#c2410c', lineHeight: 1.6 }}>
                  মোবাইল ও গেইমস আসক্তি থেকে মুক্ত রেখে খেলাধুলা, পড়াশোনা এবং শারীরিক ব্যায়ামের সুনির্দিষ্ট দৈনিক রুটিনের মধ্যে রাখা হয়।
                </div>
              </div>

              <div style={{ backgroundColor: '#f0fdfa', padding: '16px', borderRadius: '14px', border: '1px solid #99f6e4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🤝</span>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#115e59' }}>
                    ৬. পারস্পরিক সহযোগিতা ও শৃঙ্খলা
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#0f766e', lineHeight: 1.6 }}>
                  সহপাঠী ও বন্ধুদের বিপদে পাশে দাঁড়ানো, খাবার ভাগ করে খাওয়া এবং দলগতভাবে কাজ করার মানসিকতা গড়ে তোলা হয়।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MADRASA HIGHLIGHTS & FACILITIES */}
      {activeTab === 'highlights' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
              🏆 মাদরাসার অনন্য বৈশিষ্ট্য ও সুযোগ-সুবিধাসমূহ
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
              অভিভাবক ও শুভাকাঙ্ক্ষীরা যেসব কারণে আমাদের মাদরাসার উপর পূর্ণ আস্থা রাখেন:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>নিরাপদ ও আমলী পরিবেশ</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    ২৪ ঘণ্টা ক্লোজড-সার্কিট (CCTV) ক্যামেরা দ্বারা নিয়ন্ত্রিত ক্যাম্পাস। রাজনীতি ও সব ধরনের অপসংস্কৃতিমুক্ত শতভাগ খাঁটি ইসলামি পরিবেশ।
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>স্বাস্থ্যসম্মত ও পুষ্টিকর বোর্ডিং খাবার</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    আবাসিক শিক্ষার্থীদের জন্য প্রতিদিন ৩ বেলা তাজা, পুষ্টিকর খাবার এবং বিশুদ্ধ ফিল্টার করা পানির সার্বক্ষণিক ব্যবস্থা।
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>দুর্বল শিক্ষার্থীদের বিশেষ তত্ত্বাবধান</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    যেকোনো বিষয়ের দুর্বল ছাত্রদের জন্য আলাদা শিক্ষকের দায়িত্বে সান্ধ্যকালীন বিশেষ মুতালাআ ও নিবিড় যত্ন নেওয়া হয়।
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>এতিম ও অসচ্ছলদের ১০০% ফ্রি পড়ালেখা</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    প্রতি বছর বহু এতিম ও দরিদ্র পরিবারের সন্তানদের সম্পূর্ণ বিনামূল্যে কিতাব, পোশাক ও থাকা-খাওয়ার ব্যবস্থা করা হয়।
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>স্বচ্ছ অডিট ও হিসাব ব্যবস্থা</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    দাতা ও মুতাওয়াল্লিদের জন্য লাইভ ডিজিটাল অডিট সিস্টেম— প্রতিটি দানের টাকা কোন খাতে ব্যবহৃত হলো তার পূর্ণ স্বচ্ছতা।
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>ডিজিটাল অভিভাবক পোর্টাল ও এসএমএস</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                    শিক্ষার্থীর অনুপস্থিতি, পরীক্ষার ফলাফল ও ফি-র আপডেট অভিভাবক সরাসরি ঘরে বসে মোবাইল ফোনে দেখতে পান।
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Direct CTA: Contact & Admission Information */}
      <div
        style={{
          marginTop: '24px',
          padding: '20px',
          borderRadius: '18px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>
            {isEn ? 'Admissions, Donations & Campus Visit Inquiries' : 'ভর্তি তথ্য, দান ও সরাসরি পরিদর্শনের জন্য যোগাযোগ'}
          </h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            {isEn
              ? 'Any guardian, donor or visitor is warmly welcome to visit our madrasa campus directly.'
              : 'যেকোনো অভিভাবক বা শুভানুধ্যায়ী সরাসরি মাদরাসা ক্যাম্পাসে এসে পরিদর্শন করতে পারেন।'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="tel:01711223344"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '800',
              textDecoration: 'none',
            }}
          >
            <Phone style={{ width: '16px', height: '16px' }} />
            <span>{isEn ? 'Direct Call: 017-11223344' : 'সরাসরি কল: ০১৭-১১২২৩৩৪'}</span>
          </a>

          <Link
            href="/dashboard/syllabus"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              fontSize: '13px',
              fontWeight: '800',
              textDecoration: 'none',
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            <span>{isEn ? 'Full Kitab & Syllabus' : 'সম্পূর্ণ কিতাব ও সিলেবাস'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
