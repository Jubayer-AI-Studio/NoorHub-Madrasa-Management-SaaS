'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface HifzStudent {
  id: string;
  name: string;
  nameEn: string;
  roll: string;
  rollEn: string;
  completedParas: number;
  currentPara: number;
  todaySabaq: string;
  todaySabaqEn: string;
  todaySabqi: string;
  todaySabqiEn: string;
  todayManzil: string;
  todayManzilEn: string;
  teacherRating: 'মুমতাজ' | 'ভালো' | 'মেহনত দরকার';
  teacherRatingEn: 'Mumtaz (Excellent)' | 'Good' | 'Needs Effort';
  parentPhone: string;
  lastUpdated: string;
  lastUpdatedEn: string;
}

const INITIAL_HIFZ_STUDENTS: HifzStudent[] = [
  {
    id: '1',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    nameEn: 'Muhammad Abdullah Al-Mamun',
    roll: '০২',
    rollEn: '02',
    completedParas: 18,
    currentPara: 19,
    todaySabaq: 'সূরা আল-ফুরকান (আয়াত ২১-৪৪, ২ পৃষ্ঠা)',
    todaySabaqEn: 'Surah Al-Furqan (Verses 21-44, 2 Pages)',
    todaySabqi: '১৮ নম্বর পারা সম্পূর্ণ',
    todaySabqiEn: 'Para 18 Complete',
    todayManzil: 'পারা ১ থেকে ৩ রিভিশন',
    todayManzilEn: 'Para 1 to 3 Revision',
    teacherRating: 'মুমতাজ',
    teacherRatingEn: 'Mumtaz (Excellent)',
    parentPhone: '01812345678',
    lastUpdated: 'আজ আসরের পর',
    lastUpdatedEn: 'Today after Asr',
  },
  {
    id: '2',
    name: 'মুহাম্মদ তালহা জুবায়ের',
    nameEn: 'Muhammad Talha Zubayer',
    roll: '০৬',
    rollEn: '06',
    completedParas: 27,
    currentPara: 28,
    todaySabaq: 'সূরা আল-মুজাদালাহ (১ পৃষ্ঠা)',
    todaySabaqEn: 'Surah Al-Mujadilah (1 Page)',
    todaySabqi: '২৭ নম্বর পারা (অর্ধেক)',
    todaySabqiEn: 'Para 27 (Half)',
    todayManzil: 'পারা ৫ থেকে ৮ রিভিশন',
    todayManzilEn: 'Para 5 to 8 Revision',
    teacherRating: 'মুমতাজ',
    teacherRatingEn: 'Mumtaz (Excellent)',
    parentPhone: '01711224455',
    lastUpdated: 'আজ জোহরের পর',
    lastUpdatedEn: 'Today after Dhuhr',
  },
  {
    id: '3',
    name: 'মুহাম্মদ ইউসুফ হাসান',
    nameEn: 'Muhammad Yusuf Hasan',
    roll: '০৯',
    rollEn: '09',
    completedParas: 6,
    currentPara: 7,
    todaySabaq: 'সূরা আল-আনআম (আয়াত ১-২০)',
    todaySabaqEn: 'Surah Al-An\'am (Verses 1-20)',
    todaySabqi: '৬ নম্বর পারা (১ম রুকু)',
    todaySabqiEn: 'Para 6 (1st Ruku)',
    todayManzil: 'পারা ১ রিভিশন',
    todayManzilEn: 'Para 1 Revision',
    teacherRating: 'ভালো',
    teacherRatingEn: 'Good',
    parentPhone: '01911335577',
    lastUpdated: 'আজ সকাল',
    lastUpdatedEn: 'Today morning',
  },
  {
    id: '4',
    name: 'মুহাম্মদ সালমান ফারসি',
    nameEn: 'Muhammad Salman Farsi',
    roll: '১১',
    rollEn: '11',
    completedParas: 12,
    currentPara: 13,
    todaySabaq: 'সূরা ইউসুফ (আয়াত ৫১-৭৫)',
    todaySabaqEn: 'Surah Yusuf (Verses 51-75)',
    todaySabqi: '১২ নম্বর পারা দুর্বল',
    todaySabqiEn: 'Para 12 Needs Practice',
    todayManzil: 'পারা ২ রিভিশন',
    todayManzilEn: 'Para 2 Revision',
    teacherRating: 'মেহনত দরকার',
    teacherRatingEn: 'Needs Effort',
    parentPhone: '01611446688',
    lastUpdated: 'আজ সকাল',
    lastUpdatedEn: 'Today morning',
  },
];

export default function HifzTrackerPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [students, setStudents] = useState<HifzStudent[]>(INITIAL_HIFZ_STUDENTS);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<HifzStudent | null>(null);

  // Daily Entry Form State
  const [entryForm, setEntryForm] = useState({
    sabaq: '',
    sabqi: '',
    manzil: '',
    completedParas: 18,
    rating: 'মুমতাজ' as 'মুমতাজ' | 'ভালো' | 'মেহনত দরকার',
  });

  const handleOpenEntry = (s: HifzStudent) => {
    setSelectedStudent(s);
    setEntryForm({
      sabaq: isEn ? s.todaySabaqEn : s.todaySabaq,
      sabqi: isEn ? s.todaySabqiEn : s.todaySabqi,
      manzil: isEn ? s.todayManzilEn : s.todayManzil,
      completedParas: s.completedParas,
      rating: s.teacherRating,
    });
    setShowEntryModal(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const ratingEnMap: Record<string, 'Mumtaz (Excellent)' | 'Good' | 'Needs Effort'> = {
      'মুমতাজ': 'Mumtaz (Excellent)',
      'ভালো': 'Good',
      'মেহনত দরকার': 'Needs Effort',
    };

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              todaySabaq: entryForm.sabaq,
              todaySabaqEn: entryForm.sabaq,
              todaySabqi: entryForm.sabqi,
              todaySabqiEn: entryForm.sabqi,
              todayManzil: entryForm.manzil,
              todayManzilEn: entryForm.manzil,
              completedParas: entryForm.completedParas,
              currentPara: Math.min(30, entryForm.completedParas + 1),
              teacherRating: entryForm.rating,
              teacherRatingEn: ratingEnMap[entryForm.rating] || 'Good',
              lastUpdated: 'এইমাত্র',
              lastUpdatedEn: 'Just now',
            }
          : s
      )
    );
    setShowEntryModal(false);
  };

  const toWhatsAppProgress = (s: HifzStudent) => {
    const cleanPhone = s.parentPhone.replace(/\D/g, '').replace(/^0/, '880');
    const sName = isEn ? s.nameEn : s.name;
    const sRoll = isEn ? s.rollEn : s.roll;
    const sSabaq = isEn ? s.todaySabaqEn : s.todaySabaq;
    const sSabqi = isEn ? s.todaySabqiEn : s.todaySabqi;
    const sManzil = isEn ? s.todayManzilEn : s.todayManzil;
    const sRating = isEn ? s.teacherRatingEn : s.teacherRating;

    const msg = encodeURIComponent(
      `📖 *NoorHub Madrasa Hifzul Quran Daily Diary*\n` +
      `👤 *Student Name:* ${sName} (Roll: ${sRoll})\n` +
      `🏆 *Completed:* ${s.completedParas} of 30 Paras!\n` +
      `📗 *Today\'s Sabaq:* ${sSabaq}\n` +
      `📘 *Sabqi (Recent):* ${sSabqi}\n` +
      `📙 *Manzil (Revision):* ${sManzil}\n` +
      `⭐ *Teacher Evaluation:* ${sRating}\n\n` +
      `May Allah grant your child ease in memorizing the Holy Quran.`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Hifzul Quran Daily Tracker' : 'হিফজুল কুরআন দৈনিক ট্র্যাকার'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? 'Daily Sabaq (new lesson), Sabqi (recent revision), and Manzil (full revision) tracker for 1-30 Paras'
              : 'সবক (নতুন পড়া), সবকি ও আমুখতা/মনজিল ট্র্যাকিং ও ১-৩০ পারা অগ্রগতি'}
          </p>
        </div>

        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#16a34a', padding: '8px 18px', borderRadius: '12px', fontSize: '14px', fontWeight: '800' }}>
          {isEn
            ? `Total Hifz Students: ${formatNumberByLang(students.length, lang)}`
            : `মোট হিফজ শিক্ষার্থী: ${formatNumberByLang(students.length, lang)} জন`}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        <div className="card" style={{ padding: '20px', textAlign: 'center', border: '1.5px solid #bbf7d0', background: '#ffffff', borderRadius: '16px' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '32px', fontWeight: '900', color: '#16a34a' }}>
            {isEn ? `${formatNumberByLang(27, lang)} Paras` : `${formatNumberByLang(27, lang)} পারা`}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '700', marginTop: '4px' }}>
            {isEn ? 'Highest Completed' : 'সর্বোচ্চ সম্পন্ন'}
          </div>
        </div>

        <div className="card" style={{ padding: '20px', textAlign: 'center', border: '1.5px solid #bfdbfe', background: '#ffffff', borderRadius: '16px' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '32px', fontWeight: '900', color: '#2563eb' }}>
            {isEn ? '15.8' : '১৫.৮'}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '700', marginTop: '4px' }}>
            {isEn ? 'Group Average Para' : 'গ্রুপের গড় পারা'}
          </div>
        </div>

        <div className="card" style={{ padding: '20px', textAlign: 'center', border: '1.5px solid #fef08a', background: '#ffffff', borderRadius: '16px' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '32px', fontWeight: '900', color: '#ca8a04' }}>
            {isEn ? '100%' : '১০০%'}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '700', marginTop: '4px' }}>
            {isEn ? 'Today\'s Sabaq Given' : 'আজকের সবক প্রদান'}
          </div>
        </div>
      </div>

      {/* Students Hifz Progression Cards: Desktop 2-Column Responsive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {students.map((student) => {
          const progressPercent = Math.round((student.completedParas / 30) * 100);

          return (
            <div
              key={student.id}
              className="card card-hover"
              style={{ padding: '24px', border: '1.5px solid #e2e8f0', background: '#ffffff', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header: Name, Roll, Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #16a34a, #15803d)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '22px',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                      }}
                    >
                      {formatNumberByLang(student.completedParas, lang)}
                    </div>

                    <div>
                      <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 3px 0' }}>
                        {isEn ? student.nameEn : student.name}
                      </h2>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                        {isEn
                          ? `Roll: ${student.rollEn} · Current Para: ${formatNumberByLang(student.currentPara, lang)}`
                          : `রোল: ${student.roll} · বর্তমান চলিত: ${formatNumberByLang(student.currentPara, lang)}ম পারা`}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: '800',
                        background: student.teacherRating === 'মুমতাজ' ? '#f0fdf4' : student.teacherRating === 'ভালো' ? '#eff6ff' : '#fff7ed',
                        color: student.teacherRating === 'মুমতাজ' ? '#16a34a' : student.teacherRating === 'ভালো' ? '#2563eb' : '#ea580c',
                        border: `1px solid ${student.teacherRating === 'মুমতাজ' ? '#bbf7d0' : student.teacherRating === 'ভালো' ? '#bfdbfe' : '#fed7aa'}`,
                      }}
                    >
                      {isEn ? student.teacherRatingEn : student.teacherRating}
                    </span>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', fontWeight: '500' }}>
                      {isEn ? student.lastUpdatedEn : student.lastUpdated}
                    </div>
                  </div>
                </div>

                {/* 30 Paras Progress Bar */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '14px' }}>
                    <span style={{ fontWeight: '700', color: '#334155' }}>
                      {isEn
                        ? `Hifzul Quran Progress (${formatNumberByLang(student.completedParas, lang)} of 30 Paras Completed)`
                        : `হিফজুল কুরআন অগ্রগতি (৩০ পারার মধ্যে ${formatNumberByLang(student.completedParas, lang)} পারা সম্পন্ন)`}
                    </span>
                    <span style={{ fontWeight: '900', color: '#16a34a' }}>{formatNumberByLang(progressPercent, lang)}%</span>
                  </div>
                  <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '999px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>

                {/* Today's Hifz Log Details */}
                <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '14px', border: '1px solid #f1f5f9', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.6' }}>
                    <div>
                      <strong style={{ color: '#16a34a' }}>{isEn ? '📗 Sabaq (New Lesson):' : '📗 সবক (নতুন পড়া):'}</strong>{' '}
                      <span style={{ color: '#0f172a', fontWeight: '600' }}>{isEn ? student.todaySabaqEn : student.todaySabaq}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#2563eb' }}>{isEn ? '📘 Sabqi (Recent Revision):' : '📘 সবকি (পেছনের পড়া):'}</strong>{' '}
                      <span style={{ color: '#0f172a', fontWeight: '600' }}>{isEn ? student.todaySabqiEn : student.todaySabqi}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#7c3aed' }}>{isEn ? '📙 Manzil (Full Revision):' : '📙 আমুখতা / মনজিল:'}</strong>{' '}
                      <span style={{ color: '#0f172a', fontWeight: '600' }}>{isEn ? student.todayManzilEn : student.todayManzil}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: Daily Entry Modal & 1-Tap WhatsApp Progress */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  onClick={() => handleOpenEntry(student)}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1.5px solid #cbd5e1', padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '700' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {isEn ? 'Enter Daily Lesson' : 'আজকের পড়া এন্ট্রি'}
                </button>

                <a
                  href={toWhatsAppProgress(student)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    color: '#16a34a',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '800',
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(22, 163, 74, 0.1)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {isEn ? 'Send WhatsApp Update' : 'অভিভাবককে আপডেট পাঠান'}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Sabaq Entry Modal */}
      {showEntryModal && selectedStudent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div className="card fade-in" style={{ width: '100%', maxWidth: '28rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  {isEn ? 'Enter Daily Hifz Progress' : 'দৈনিক হিফজ পড়া এন্ট্রি'}
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>
                  {isEn
                    ? `Student: ${selectedStudent.nameEn} (Roll: ${selectedStudent.rollEn})`
                    : `ছাত্র: ${selectedStudent.name} (রোল: ${selectedStudent.roll})`}
                </div>
              </div>
              <button
                onClick={() => setShowEntryModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveEntry} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="label">{isEn ? 'Today\'s Sabaq (New Lesson) *' : 'আজকের সবক (নতুন পড়া) *'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? 'e.g. Surah Al-Furqan verses 21-44' : 'যেমন: সূরা আল-ফুরকান ২১-৪৪ আয়াত'}
                  required
                  value={entryForm.sabaq}
                  onChange={(e) => setEntryForm({ ...entryForm, sabaq: e.target.value })}
                />
              </div>

              <div>
                <label className="label">{isEn ? 'Sabqi (Recent Revision)' : 'সবকি (পেছনের পড়া)'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? 'e.g. Para 18 Complete' : 'যেমন: ১৮ নম্বর পারা সম্পূর্ণ'}
                  value={entryForm.sabqi}
                  onChange={(e) => setEntryForm({ ...entryForm, sabqi: e.target.value })}
                />
              </div>

              <div>
                <label className="label">{isEn ? 'Amukhta / Manzil (Full Revision)' : 'আমুখতা / মনজিল (রিভিশন)'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? 'e.g. Para 1 to 3 Revision' : 'যেমন: ১ থেকে ৩ পারা রিভিশন'}
                  value={entryForm.manzil}
                  onChange={(e) => setEntryForm({ ...entryForm, manzil: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Completed Paras (1-30)' : 'মোট সম্পন্ন পারা (১-৩০)'}</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    className="input"
                    value={entryForm.completedParas}
                    onChange={(e) => setEntryForm({ ...entryForm, completedParas: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="label">{isEn ? 'Teacher Evaluation' : 'উস্তাদের মূল্যায়ন'}</label>
                  <select
                    className="input"
                    value={entryForm.rating}
                    onChange={(e) => setEntryForm({ ...entryForm, rating: e.target.value as any })}
                  >
                    <option value="মুমতাজ">{isEn ? 'Mumtaz (Excellent)' : 'মুমতাজ (চমৎকার)'}</option>
                    <option value="ভালো">{isEn ? 'Good' : 'ভালো'}</option>
                    <option value="মেহনত দরকার">{isEn ? 'Needs Effort' : 'মেহনত দরকার'}</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowEntryModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Cancel' : 'বাতিল'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Save Entry' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
