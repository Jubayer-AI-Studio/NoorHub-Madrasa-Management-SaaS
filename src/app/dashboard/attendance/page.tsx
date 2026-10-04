'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface AttendanceStudent {
  id: string;
  name: string;
  nameEn: string;
  roll: string;
  rollEn: string;
  status: 'present' | 'absent' | 'leave';
  leaveDaysRemaining?: number;
  leaveReason?: string;
  leaveReasonEn?: string;
}

const INITIAL_ATTENDANCE: AttendanceStudent[] = [
  { id: '1', name: 'মুহাম্মদ আব্দুর রহমান', nameEn: 'Muhammad Abdur Rahman', roll: '০১', rollEn: '01', status: 'present' },
  { id: '2', name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন', nameEn: 'Muhammad Abdullah Al-Mamun', roll: '০২', rollEn: '02', status: 'present' },
  { id: '3', name: 'আহমদ উবায়দুল্লাহ', nameEn: 'Ahmad Ubaidullah', roll: '০৩', rollEn: '03', status: 'leave', leaveDaysRemaining: 2, leaveReason: 'জ্বর / অসুস্থতা', leaveReasonEn: 'Fever / Sickness' },
  { id: '4', name: 'মুহাম্মদ জুবায়ের হোসেন', nameEn: 'Muhammad Zubayer Hossain', roll: '০৪', rollEn: '04', status: 'absent' },
  { id: '5', name: 'মুহাম্মদ হাসানুর রশীদ', nameEn: 'Muhammad Hasanur Rashid', roll: '০৫', rollEn: '05', status: 'present' },
  { id: '6', name: 'মুহাম্মদ সাইফুল ইসলাম', nameEn: 'Muhammad Saiful Islam', roll: '০৬', rollEn: '06', status: 'present' },
];

const CLASSES = [
  { id: 'mizan', bn: 'মিজান (কওমি)', en: 'Mizan (Qawmi)' },
  { id: 'kafiya', bn: 'কাফিয়া (কওমি)', en: 'Kafiya (Qawmi)' },
  { id: 'hifz', bn: 'হিফজুল কুরআন', en: 'Hifzul Quran' },
  { id: 'dakhil', bn: 'দাখিল ৯ম (আলিয়া)', en: 'Dakhil 9th (Alia)' },
  { id: 'class5', bn: 'পঞ্চম শ্রেণি', en: 'Class Five' },
];

export default function AttendancePage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [students, setStudents] = useState<AttendanceStudent[]>(INITIAL_ATTENDANCE);
  const [selectedClassId, setSelectedClassId] = useState('mizan');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedStudentForLeave, setSelectedStudentForLeave] = useState<string>('');
  const [leaveDays, setLeaveDays] = useState('2');
  const [leaveReason, setLeaveReason] = useState('অসুস্থতা');
  const [submitted, setSubmitted] = useState(false);

  const selectedClassObj = CLASSES.find((c) => c.id === selectedClassId) || CLASSES[0];

  const setStatus = (id: string, status: 'present' | 'absent' | 'leave') => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const markAllPresent = () => {
    setStudents(
      students.map((s) => (s.status === 'leave' ? s : { ...s, status: 'present' }))
    );
  };

  const handleGrantLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForLeave) return;

    const reasonEnMap: Record<string, string> = {
      'অসুস্থতা': 'Sickness / Illness',
      'পারিবারিক অনুষ্ঠান': 'Family Function',
      'জরুরি প্রয়োজন': 'Urgent Need',
      'বাড়ি গমন': 'Visiting Home',
    };

    setStudents(
      students.map((s) =>
        s.id === selectedStudentForLeave
          ? {
              ...s,
              status: 'leave',
              leaveDaysRemaining: parseInt(leaveDays) || 1,
              leaveReason,
              leaveReasonEn: reasonEnMap[leaveReason] || leaveReason,
            }
          : s
      )
    );

    setShowLeaveModal(false);
    setSelectedStudentForLeave('');
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const leaveCount = students.filter((s) => s.status === 'leave').length;

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Daily Attendance & Leave Management' : 'দৈনিক হাজিরা ও ছুটি'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn ? 'Sunday, September 21, 2026' : 'রবিবার, ২১ সেপ্টেম্বর ২০২৬'} · {isEn ? selectedClassObj.en : selectedClassObj.bn}
          </p>
        </div>

        {/* Grant Leave Button */}
        <button
          onClick={() => setShowLeaveModal(true)}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            border: '1.5px solid #0891b230',
            color: '#0891b2',
            background: '#ecfeff',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {isEn ? 'Grant Leave' : 'সহজ ছুটি দিন'}
        </button>
      </div>

      {/* Class Selector Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          scrollbarWidth: 'none',
        }}
      >
        {CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClassId(cls.id)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '0.625rem',
              border: '1.5px solid',
              borderColor: selectedClassId === cls.id ? '#16a34a' : '#e2e8f0',
              backgroundColor: selectedClassId === cls.id ? '#f0fdf4' : '#ffffff',
              color: selectedClassId === cls.id ? '#16a34a' : '#64748b',
              fontSize: '0.78rem',
              fontWeight: '600',
              fontFamily: 'Hind Siliguri, sans-serif',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {isEn ? cls.en : cls.bn}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #bbf7d0' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#16a34a' }}>
            {formatNumberByLang(presentCount, lang)}
          </div>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
            {isEn ? 'Present' : 'উপস্থিত'}
          </div>
        </div>

        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #fecaca' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#dc2626' }}>
            {formatNumberByLang(absentCount, lang)}
          </div>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
            {isEn ? 'Absent' : 'অনুপস্থিত'}
          </div>
        </div>

        <div className="card" style={{ padding: '0.875rem', textAlign: 'center', border: '1.5px solid #cffafe' }}>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#0891b2' }}>
            {formatNumberByLang(leaveCount, lang)}
          </div>
          <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
            {isEn ? 'On Leave' : 'ছুটিতে'}
          </div>
        </div>
      </div>

      {/* Quick Action: Mark All Present */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>
          {isEn
            ? `Student List (${formatNumberByLang(students.length, lang)} Students)`
            : `শিক্ষার্থী তালিকা (${formatNumberByLang(students.length, lang)} জন)`}
        </span>
        <button
          onClick={markAllPresent}
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            borderRadius: '0.5rem',
            padding: '0.35rem 0.75rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '0.775rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {isEn ? 'Mark All Present' : 'সবাই উপস্থিত দিন'}
        </button>
      </div>

      {/* Students Attendance List */}
      <div className="card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
        {students.map((student, i) => (
          <div
            key={student.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.875rem 1rem',
              borderBottom: i < students.length - 1 ? '1px solid #f1f5f9' : 'none',
              gap: '0.75rem',
            }}
          >
            {/* Student Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '1.6rem',
                    height: '1.6rem',
                    borderRadius: '0.375rem',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    color: '#475569',
                    flexShrink: 0,
                  }}
                >
                  {isEn ? student.rollEn : student.roll}
                </span>
                <span
                  style={{
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {isEn ? student.nameEn : student.name}
                </span>
              </div>

              {student.status === 'leave' && (
                <div style={{ fontSize: '0.725rem', color: '#0891b2', marginTop: '0.2rem', paddingLeft: '2.1rem' }}>
                  {isEn
                    ? `Leave: ${student.leaveReasonEn || student.leaveReason} (${formatNumberByLang(student.leaveDaysRemaining || 1, lang)} days left)`
                    : `ছুটি: ${student.leaveReason} (বাকি ${formatNumberByLang(student.leaveDaysRemaining || 1, lang)} দিন)`}
                </div>
              )}
            </div>

            {/* Attendance Buttons */}
            <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setStatus(student.id, 'present')}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1.5px solid',
                  borderColor: student.status === 'present' ? '#16a34a' : '#e2e8f0',
                  background: student.status === 'present' ? '#16a34a' : '#ffffff',
                  color: student.status === 'present' ? '#ffffff' : '#64748b',
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {isEn ? 'Present' : 'উপস্থিত'}
              </button>

              <button
                type="button"
                onClick={() => setStatus(student.id, 'absent')}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1.5px solid',
                  borderColor: student.status === 'absent' ? '#dc2626' : '#e2e8f0',
                  background: student.status === 'absent' ? '#dc2626' : '#ffffff',
                  color: student.status === 'absent' ? '#ffffff' : '#64748b',
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {isEn ? 'Absent' : 'অনুপস্থিত'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedStudentForLeave(student.id);
                  setShowLeaveModal(true);
                }}
                style={{
                  padding: '0.4rem 0.65rem',
                  borderRadius: '0.5rem',
                  border: '1.5px solid',
                  borderColor: student.status === 'leave' ? '#0891b2' : '#e2e8f0',
                  background: student.status === 'leave' ? '#ecfeff' : '#ffffff',
                  color: student.status === 'leave' ? '#0891b2' : '#94a3b8',
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Leave' : 'ছুটি'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Attendance Button */}
      <button
        onClick={() => {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
        }}
        className="btn btn-primary btn-full btn-lg"
        style={{ boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)' }}
      >
        {submitted ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {isEn ? 'Attendance Submitted Successfully!' : 'হাজিরা সফলভাবে জমা হয়েছে!'}
          </span>
        ) : (
          isEn ? 'Save Today\'s Attendance' : 'আজকের হাজিরা সংরক্ষণ করুন'
        )}
      </button>

      {/* Grant Leave Modal */}
      {showLeaveModal && (
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
          <div className="card fade-in" style={{ width: '100%', maxWidth: '24rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
                  {isEn ? 'Grant Student Leave' : 'ছুটি মঞ্জুর করুন'}
                </h2>
              </div>

              <button
                onClick={() => setShowLeaveModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleGrantLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label">{isEn ? 'Select Student' : 'শিক্ষার্থী নির্বাচন করুন'}</label>
                <select
                  className="input"
                  value={selectedStudentForLeave}
                  onChange={(e) => setSelectedStudentForLeave(e.target.value)}
                  required
                >
                  <option value="">{isEn ? 'Choose student...' : 'ছাত্র বেছে নিন...'}</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isEn ? `Roll ${s.rollEn}: ${s.nameEn}` : `রোল ${s.roll}: ${s.name}`}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Leave Duration (Days)' : 'ছুটির মেয়াদ (দিন)'}</label>
                  <select
                    className="input"
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(e.target.value)}
                  >
                    <option value="1">{isEn ? '1 Day' : '১ দিন'}</option>
                    <option value="2">{isEn ? '2 Days' : '২ দিন'}</option>
                    <option value="3">{isEn ? '3 Days' : '৩ দিন'}</option>
                    <option value="5">{isEn ? '5 Days' : '৫ দিন'}</option>
                    <option value="7">{isEn ? '7 Days (1 Week)' : '৭ দিন (১ সপ্তাহ)'}</option>
                  </select>
                </div>

                <div>
                  <label className="label">{isEn ? 'Reason for Leave' : 'ছুটির কারণ'}</label>
                  <select
                    className="input"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  >
                    <option value="অসুস্থতা">{isEn ? 'Illness / Sickness' : 'অসুস্থতা'}</option>
                    <option value="পারিবারিক অনুষ্ঠান">{isEn ? 'Family Event' : 'পারিবারিক অনুষ্ঠান'}</option>
                    <option value="জরুরি প্রয়োজন">{isEn ? 'Urgent Need' : 'জরুরি প্রয়োজন'}</option>
                    <option value="বাড়ি গমন">{isEn ? 'Visiting Home' : 'বাড়ি গমন'}</option>
                  </select>
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'Hind Siliguri, sans-serif' }}>
                {isEn
                  ? '* No OTP required. Saving marks the student as on leave automatically for this period.'
                  : '* কোনো ওটিপি লাগবে না। সেভ করলেই এই কয়দিন ছাত্রের হাজিরায় স্বয়ংক্রিয় "ছুটি" মার্ক থাকবে।'}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Cancel' : 'বাতিল'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#0891b2' }}
                >
                  {isEn ? 'Grant Leave' : 'ছুটি মঞ্জুর করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
