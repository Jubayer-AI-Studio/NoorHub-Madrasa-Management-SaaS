'use client';

import { useState } from 'react';

interface HifzStudent {
  id: string;
  name: string;
  roll: string;
  completedParas: number;
  currentPara: number;
  todaySabaq: string;
  todaySabqi: string;
  todayManzil: string;
  teacherRating: 'মুমতাজ' | 'ভালো' | 'মেহনত দরকার';
  parentPhone: string;
  lastUpdated: string;
}

const INITIAL_HIFZ_STUDENTS: HifzStudent[] = [
  {
    id: '1',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    roll: '০২',
    completedParas: 18,
    currentPara: 19,
    todaySabaq: 'সূরা আল-ফুরকান (আয়াত ২১-৪৪, ২ পৃষ্ঠা)',
    todaySabqi: '১৮ নম্বর পারা সম্পূর্ণ',
    todayManzil: 'পারা ১ থেকে ৩ রিভিশন',
    teacherRating: 'মুমতাজ',
    parentPhone: '01812345678',
    lastUpdated: 'আজ আসরের পর',
  },
  {
    id: '2',
    name: 'মুহাম্মদ তালহা জুবায়ের',
    roll: '০৬',
    completedParas: 27,
    currentPara: 28,
    todaySabaq: 'সূরা আল-মুজাদালাহ (১ পৃষ্ঠা)',
    todaySabqi: '২৭ নম্বর পারা (অর্ধেক)',
    todayManzil: 'পারা ৫ থেকে ৮ রিভিশন',
    teacherRating: 'মুমতাজ',
    parentPhone: '01711224455',
    lastUpdated: 'আজ জোহরের পর',
  },
  {
    id: '3',
    name: 'মুহাম্মদ ইউসুফ হাসান',
    roll: '০৯',
    completedParas: 6,
    currentPara: 7,
    todaySabaq: 'সূরা আল-আনআম (আয়াত ১-২০)',
    todaySabqi: '৬ নম্বর পারা (১ম রুকু)',
    todayManzil: 'পারা ১ রিভিশন',
    teacherRating: 'ভালো',
    parentPhone: '01911335577',
    lastUpdated: 'আজ সকাল',
  },
  {
    id: '4',
    name: 'মুহাম্মদ সালমান ফারসি',
    roll: '১১',
    completedParas: 12,
    currentPara: 13,
    todaySabaq: 'সূরা ইউসুফ (আয়াত ৫১-৭৫)',
    todaySabqi: '১২ নম্বর পারা দুর্বল',
    todayManzil: 'পারা ২ রিভিশন',
    teacherRating: 'মেহনত দরকার',
    parentPhone: '01611446688',
    lastUpdated: 'আজ সকাল',
  },
];

export default function HifzTrackerPage() {
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
      sabaq: s.todaySabaq,
      sabqi: s.todaySabqi,
      manzil: s.todayManzil,
      completedParas: s.completedParas,
      rating: s.teacherRating,
    });
    setShowEntryModal(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              todaySabaq: entryForm.sabaq,
              todaySabqi: entryForm.sabqi,
              todayManzil: entryForm.manzil,
              completedParas: entryForm.completedParas,
              currentPara: Math.min(30, entryForm.completedParas + 1),
              teacherRating: entryForm.rating,
              lastUpdated: 'এইমাত্র',
            }
          : s
      )
    );
    setShowEntryModal(false);
  };

  const toWhatsAppProgress = (s: HifzStudent) => {
    const cleanPhone = s.parentPhone.replace(/\D/g, '').replace(/^0/, '880');
    const msg = encodeURIComponent(
      `📖 *নূরহাব মাদরাসা হিফজুল কুরআন দৈনিক ডায়েরি*\n` +
      `👤 *ছাত্রের নাম:* ${s.name} (রোল: ${s.roll})\n` +
      `🏆 *মোট সম্পন্ন:* ৩০ পারার মধ্যে ${s.completedParas} পারা সম্পন্ন!\n` +
      `📗 *আজকের সবক (নতুন পড়া):* ${s.todaySabaq}\n` +
      `📘 *সবকি (পেছনের পড়া):* ${s.todaySabqi}\n` +
      `📙 *আমুখতা/মনজিল:* ${s.todayManzil}\n` +
      `⭐ *উস্তাদের মূল্যায়ন:* ${s.teacherRating}\n\n` +
      `দোয়া করবেন আল্লাহ যেন আপনার সন্তানকে কুরআনের হাফেজ হিসেবে কবুল করেন।`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            হিফজুল কুরআন দৈনিক ট্র্যাকার
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            সবক (নতুন পড়া), সবকি ও আমুখতা/মনজিল ট্র্যাকিং ও ১-৩০ পারা অগ্রগতি
          </p>
        </div>

        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#16a34a', padding: '0.4rem 0.85rem', borderRadius: '0.625rem', fontSize: '0.8rem', fontWeight: '700' }}>
          মোট হিফজ শিক্ষার্থী: {students.length} জন
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #bbf7d0' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#16a34a' }}>
            ২৭ পারা
          </div>
          <div style={{ fontSize: '0.725rem', color: '#64748b' }}>সর্বোচ্চ সম্পন্ন</div>
        </div>

        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #bfdbfe' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#2563eb' }}>
            ১৫.৮
          </div>
          <div style={{ fontSize: '0.725rem', color: '#64748b' }}>গ্রুপের গড় পারা</div>
        </div>

        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #fef08a' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#ca8a04' }}>
            ১০০%
          </div>
          <div style={{ fontSize: '0.725rem', color: '#64748b' }}>আজকের সবক প্রদান</div>
        </div>
      </div>

      {/* Students Hifz Progression Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {students.map((student) => {
          const progressPercent = Math.round((student.completedParas / 30) * 100);

          return (
            <div
              key={student.id}
              className="card card-hover"
              style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}
            >
              {/* Header: Name, Roll, Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '1.125rem',
                      flexShrink: 0,
                    }}
                  >
                    {student.completedParas}
                  </div>

                  <div>
                    <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>
                      {student.name}
                    </h2>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      রোল: {student.roll} · বর্তমান চলিত: {student.currentPara}ম পারা
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      background: student.teacherRating === 'মুমতাজ' ? '#f0fdf4' : student.teacherRating === 'ভালো' ? '#eff6ff' : '#fff7ed',
                      color: student.teacherRating === 'মুমতাজ' ? '#16a34a' : student.teacherRating === 'ভালো' ? '#2563eb' : '#ea580c',
                      border: `1px solid ${student.teacherRating === 'মুমতাজ' ? '#bbf7d0' : student.teacherRating === 'ভালো' ? '#bfdbfe' : '#fed7aa'}`,
                    }}
                  >
                    {student.teacherRating}
                  </span>
                  <div style={{ fontSize: '0.675rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    {student.lastUpdated}
                  </div>
                </div>
              </div>

              {/* 30 Paras Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', fontSize: '0.75rem' }}>
                  <span style={{ fontWeight: '600', color: '#334155' }}>
                    হিফজুল কুরআন অগ্রগতি (৩০ পারার মধ্যে {student.completedParas} পারা সম্পন্ন)
                  </span>
                  <span style={{ fontWeight: '800', color: '#16a34a' }}>{progressPercent}%</span>
                </div>
                <div style={{ height: '0.5rem', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPercent}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '999px', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Today's Hifz Log Details */}
              <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9', marginBottom: '0.875rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
                  <div>
                    <strong style={{ color: '#16a34a' }}>📗 সবক (নতুন পড়া):</strong>{' '}
                    <span style={{ color: '#0f172a' }}>{student.todaySabaq}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#2563eb' }}>📘 সবকি (পেছনের পড়া):</strong>{' '}
                    <span style={{ color: '#0f172a' }}>{student.todaySabqi}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#7c3aed' }}>📙 আমুখতা / মনজিল:</strong>{' '}
                    <span style={{ color: '#0f172a' }}>{student.todayManzil}</span>
                  </div>
                </div>
              </div>

              {/* Actions: Daily Entry Modal & 1-Tap WhatsApp Progress */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => handleOpenEntry(student)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', border: '1.5px solid #cbd5e1' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  আজকের পড়া এন্ট্রি
                </button>

                <a
                  href={toWhatsAppProgress(student)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem',
                    borderRadius: '0.625rem',
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    color: '#16a34a',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  অভিভাবককে আপডেট পাঠান
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
                  দৈনিক হিফজ পড়া এন্ট্রি
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>
                  ছাত্র: {selectedStudent.name} (রোল: {selectedStudent.roll})
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
                <label className="label">আজকের সবক (নতুন পড়া) *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: সূরা আল-ফুরকান ২১-৪৪ আয়াত"
                  required
                  value={entryForm.sabaq}
                  onChange={(e) => setEntryForm({ ...entryForm, sabaq: e.target.value })}
                />
              </div>

              <div>
                <label className="label">সবকি (পেছনের পড়া)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: ১৮ নম্বর পারা সম্পূর্ণ"
                  value={entryForm.sabqi}
                  onChange={(e) => setEntryForm({ ...entryForm, sabqi: e.target.value })}
                />
              </div>

              <div>
                <label className="label">আমুখতা / মনজিল (রিভিশন)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: ১ থেকে ৩ পারা রিভিশন"
                  value={entryForm.manzil}
                  onChange={(e) => setEntryForm({ ...entryForm, manzil: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">মোট সম্পন্ন পারা (১-৩০)</label>
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
                  <label className="label">উস্তাদের মূল্যায়ন</label>
                  <select
                    className="input"
                    value={entryForm.rating}
                    onChange={(e) => setEntryForm({ ...entryForm, rating: e.target.value as any })}
                  >
                    <option value="মুমতাজ">মুমতাজ (চমৎকার)</option>
                    <option value="ভালো">ভালো</option>
                    <option value="মেহনত দরকার">মেহনত দরকার</option>
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
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
