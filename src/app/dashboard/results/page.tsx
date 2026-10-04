'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface ResultItem {
  id: string;
  studentName: string;
  studentNameEn: string;
  roll: string;
  rollEn: string;
  admissionNo: string;
  totalMarks: number;
  fullMarks: number;
  grade: string;
  position: number;
  qawmiGrade: string;
  qawmiGradeEn: string;
  parentPhone: string;
  status: 'passed' | 'failed';
  subjects: { name: string; nameEn: string; marks: number; full: number }[];
}

const SAMPLE_RESULTS: ResultItem[] = [
  {
    id: '1',
    studentName: 'মুহাম্মদ আব্দুর রহমান',
    studentNameEn: 'Muhammad Abdur Rahman',
    roll: '০১',
    rollEn: '01',
    admissionNo: 'NH-2026-001',
    totalMarks: 568,
    fullMarks: 600,
    grade: 'A+',
    qawmiGrade: 'মুমতাজ (প্রথম শ্রেণি)',
    qawmiGradeEn: 'Mumtaz (1st Division)',
    position: 1,
    parentPhone: '01711223344',
    status: 'passed',
    subjects: [
      { name: 'কুরআন ও তাজবীদ', nameEn: 'Quran & Tajweed', marks: 98, full: 100 },
      { name: 'হাদীস শরীফ', nameEn: 'Hadith Sharif', marks: 95, full: 100 },
      { name: 'ফিকহ (ইসলামি আইন)', nameEn: 'Fiqh (Islamic Jurisprudence)', marks: 94, full: 100 },
      { name: 'আরবি ব্যাকরণ (নাহব-সরফ)', nameEn: 'Arabic Grammar (Nahw-Saraf)', marks: 96, full: 100 },
      { name: 'বাংলা ও সাহিত্য', nameEn: 'Bangla & Literature', marks: 92, full: 100 },
      { name: 'গণিত ও সাধারণ জ্ঞান', nameEn: 'Mathematics & GK', marks: 93, full: 100 },
    ],
  },
  {
    id: '2',
    studentName: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    studentNameEn: 'Muhammad Abdullah Al-Mamun',
    roll: '০২',
    rollEn: '02',
    admissionNo: 'NH-2026-002',
    totalMarks: 542,
    fullMarks: 600,
    grade: 'A',
    qawmiGrade: 'জাইয়্যিদ জিদ্দান',
    qawmiGradeEn: 'Jayyid Jiddan (2nd Div High)',
    position: 2,
    parentPhone: '01812345678',
    status: 'passed',
    subjects: [
      { name: 'কুরআন ও তাজবীদ', nameEn: 'Quran & Tajweed', marks: 96, full: 100 },
      { name: 'হাদীস শরীফ', nameEn: 'Hadith Sharif', marks: 90, full: 100 },
      { name: 'ফিকহ', nameEn: 'Fiqh', marks: 88, full: 100 },
      { name: 'আরবি ব্যাকরণ', nameEn: 'Arabic Grammar', marks: 92, full: 100 },
      { name: 'বাংলা', nameEn: 'Bangla', marks: 88, full: 100 },
      { name: 'গণিত', nameEn: 'Mathematics', marks: 88, full: 100 },
    ],
  },
  {
    id: '3',
    studentName: 'মুহাম্মদ হাসানুর রশীদ',
    studentNameEn: 'Muhammad Hasanur Rashid',
    roll: '০৫',
    rollEn: '05',
    admissionNo: 'NH-2026-005',
    totalMarks: 512,
    fullMarks: 600,
    grade: 'A',
    qawmiGrade: 'জাইয়্যিদ',
    qawmiGradeEn: 'Jayyid (2nd Division)',
    position: 3,
    parentPhone: '01511224466',
    status: 'passed',
    subjects: [
      { name: 'কুরআন ও তাজবীদ', nameEn: 'Quran & Tajweed', marks: 92, full: 100 },
      { name: 'হাদীস শরীফ', nameEn: 'Hadith Sharif', marks: 84, full: 100 },
      { name: 'ফিকহ', nameEn: 'Fiqh', marks: 82, full: 100 },
      { name: 'আরবি ব্যাকরণ', nameEn: 'Arabic Grammar', marks: 85, full: 100 },
      { name: 'বাংলা', nameEn: 'Bangla', marks: 85, full: 100 },
      { name: 'গণিত', nameEn: 'Mathematics', marks: 84, full: 100 },
    ],
  },
];

const EXAMS = [
  { id: 'annual', bn: 'বার্ষিক পরীক্ষা ২০২৬', en: 'Annual Examination 2026' },
  { id: 'half-yearly', bn: 'অর্ধ-বার্ষিক পরীক্ষা ২০২৬', en: 'Half-Yearly Examination 2026' },
  { id: 'first-term', bn: 'প্রথম সাময়িক পরীক্ষা', en: 'First Term Examination' },
];

const CLASSES = [
  { id: 'mizan', bn: 'মিজান (কওমি)', en: 'Mizan (Qawmi)' },
  { id: 'kafiya', bn: 'কাফিয়া (কওমি)', en: 'Kafiya (Qawmi)' },
  { id: 'hifz', bn: 'হিফজুল কুরআন', en: 'Hifzul Quran' },
  { id: 'dakhil', bn: 'দাখিল ৯ম (আলিয়া)', en: 'Dakhil 9th (Alia)' },
];

export default function ResultsPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [selectedExamId, setSelectedExamId] = useState('annual');
  const [selectedClassId, setSelectedClassId] = useState('mizan');
  const [selectedStudentForMarksheet, setSelectedStudentForMarksheet] = useState<ResultItem | null>(null);
  const [notifiedCount, setNotifiedCount] = useState<number | null>(null);

  const selectedExamObj = EXAMS.find((e) => e.id === selectedExamId) || EXAMS[0];
  const selectedClassObj = CLASSES.find((c) => c.id === selectedClassId) || CLASSES[0];

  const handleBroadcastResults = () => {
    setNotifiedCount(SAMPLE_RESULTS.length);
    setTimeout(() => setNotifiedCount(null), 4000);
  };

  const getWhatsAppResultLink = (student: ResultItem) => {
    const cleanPhone = student.parentPhone.replace(/\D/g, '').replace(/^0/, '880');
    const examName = isEn ? selectedExamObj.en : selectedExamObj.bn;
    const sName = isEn ? student.studentNameEn : student.studentName;
    const grade = isEn ? student.qawmiGradeEn : student.qawmiGrade;
    const msg = encodeURIComponent(
      `Assalamu Alaikum. NoorHub Madrasa Result for ${sName} (${examName}):\n` +
      `Roll: ${isEn ? student.rollEn : student.roll}\n` +
      `Marks: ${student.totalMarks}/${student.fullMarks}\n` +
      `Result: ${grade} (Rank: ${student.position})\n` +
      `View official marksheet: http://localhost:8080/dashboard/results`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Examination Results & Merit List' : 'পরীক্ষার ফলাফল ও মেধা তালিকা'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn ? selectedExamObj.en : selectedExamObj.bn} · {isEn ? selectedClassObj.en : selectedClassObj.bn}
          </p>
        </div>

        {/* 1-Click Broadcast Button */}
        <button
          onClick={handleBroadcastResults}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#2563eb' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {isEn ? 'Broadcast Results to Parents' : 'অভিভাবকদের ফলাফল পাঠান'}
        </button>
      </div>

      {/* Broadcast Alert */}
      {notifiedCount !== null && (
        <div
          className="card fade-in"
          style={{
            padding: '0.875rem 1rem',
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            color: '#16a34a',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {isEn
            ? `Results automatically sent to the WhatsApp of ${formatNumberByLang(notifiedCount, lang)} students' guardians!`
            : `স্বয়ংক্রিয়ভাবে ${formatNumberByLang(notifiedCount, lang)} জন শিক্ষার্থীর অভিভাবকের হোয়াটসঅ্যাপে ফলাফল পাঠানো হয়েছে!`}
        </div>
      )}

      {/* Selector Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div>
          <label className="label">{isEn ? 'Select Examination' : 'পরীক্ষা নির্বাচন'}</label>
          <select
            className="input"
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
          >
            {EXAMS.map((e) => (
              <option key={e.id} value={e.id}>
                {isEn ? e.en : e.bn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">{isEn ? 'Class / Jamat' : 'শ্রেণি / জামাত'}</label>
          <select
            className="input"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            {CLASSES.map((c) => (
              <option key={c.id} value={c.id}>
                {isEn ? c.en : c.bn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results & Merit List */}
      <div className="card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.875rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>
            {isEn ? 'Merit List' : 'মেধা তালিকা (Merit List)'}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700' }}>
            {isEn ? 'Pass Rate: 100%' : 'পাসের হার: ১০০%'}
          </span>
        </div>

        {SAMPLE_RESULTS.map((result, i) => (
          <div
            key={result.id}
            style={{
              padding: '1rem',
              borderBottom: i < SAMPLE_RESULTS.length - 1 ? '1px solid #f1f5f9' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            {/* Position & Student Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.5rem',
                  background: result.position === 1 ? '#fef9c3' : result.position === 2 ? '#f1f5f9' : '#fff7ed',
                  color: result.position === 1 ? '#854d0e' : '#475569',
                  border: result.position === 1 ? '1px solid #fde047' : '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  flexShrink: 0,
                }}
              >
                {isEn ? `${result.position}` : `${formatNumberByLang(result.position, lang)}ম`}
              </div>

              <div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.975rem', color: '#0f172a' }}>
                  {isEn ? result.studentNameEn : result.studentName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {isEn
                    ? `Roll: ${result.rollEn} · Obtained: ${formatNumberByLang(result.totalMarks, lang)} / ${formatNumberByLang(result.fullMarks, lang)}`
                    : `রোল: ${result.roll} · প্রাপ্ত নম্বর: ${formatNumberByLang(result.totalMarks, lang)} / ${formatNumberByLang(result.fullMarks, lang)}`}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: '600', marginTop: '0.15rem' }}>
                  {isEn ? result.qawmiGradeEn : result.qawmiGrade} ({result.grade})
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              {/* Marksheet View Button */}
              <button
                onClick={() => setSelectedStudentForMarksheet(result)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontSize: '0.775rem',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                {isEn ? 'Marksheet' : 'মার্কশিট'}
              </button>

              {/* 1-Tap WhatsApp Result */}
              <a
                href={getWhatsAppResultLink(result)}
                target="_blank"
                rel="noopener noreferrer"
                title={isEn ? 'Send result via WhatsApp' : 'অভিভাবককে হোয়াটসঅ্যাপে পাঠান'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.5rem',
                  background: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  color: '#16a34a',
                  textDecoration: 'none',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Marksheet Print Modal */}
      {selectedStudentForMarksheet && (
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
          <div
            className="card fade-in"
            style={{ width: '100%', maxWidth: '30rem', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', background: '#ffffff' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
                {isEn ? 'Official Marksheet' : 'অফিশিয়াল মার্কশিট (Marksheet)'}
              </h2>
              <button
                onClick={() => setSelectedStudentForMarksheet(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Printable Marksheet Container */}
            <div style={{ border: '2px solid #0f172a', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.875rem', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#16a34a' }}>
                  {isEn ? 'Al-Jamia Al-Islamia NoorHub' : 'আল-জামিয়া আল-ইসলামিয়া নূরহাব'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
                  {isEn ? selectedExamObj.en : selectedExamObj.bn} · {isEn ? selectedClassObj.en : selectedClassObj.bn}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <div><strong>{isEn ? 'Student:' : 'শিক্ষার্থী:'}</strong> {isEn ? selectedStudentForMarksheet.studentNameEn : selectedStudentForMarksheet.studentName}</div>
                <div><strong>{isEn ? 'Roll:' : 'রোল:'}</strong> {isEn ? selectedStudentForMarksheet.rollEn : selectedStudentForMarksheet.roll}</div>
                <div><strong>{isEn ? 'ID:' : 'আইডি:'}</strong> {selectedStudentForMarksheet.admissionNo}</div>
                <div><strong>{isEn ? 'Merit Rank:' : 'মেধাক্রম:'}</strong> {isEn ? `${selectedStudentForMarksheet.position}th Place` : `${formatNumberByLang(selectedStudentForMarksheet.position, lang)}ম স্থান`}</div>
              </div>

              {/* Subject Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #cbd5e1' }}>
                    <th style={{ textAlign: 'left', padding: '0.4rem' }}>{isEn ? 'Subject' : 'বিষয়'}</th>
                    <th style={{ textAlign: 'center', padding: '0.4rem' }}>{isEn ? 'Full Marks' : 'পূর্ণমান'}</th>
                    <th style={{ textAlign: 'right', padding: '0.4rem' }}>{isEn ? 'Marks Obtained' : 'প্রাপ্ত নম্বর'}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudentForMarksheet.subjects.map((sub, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.4rem' }}>{isEn ? sub.nameEn : sub.name}</td>
                      <td style={{ textAlign: 'center', padding: '0.4rem' }}>{formatNumberByLang(sub.full, lang)}</td>
                      <td style={{ textAlign: 'right', padding: '0.4rem', fontWeight: '700', color: '#16a34a' }}>{formatNumberByLang(sub.marks, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf4', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.85rem' }}>
                  {isEn ? 'Total:' : 'মোট:'} {formatNumberByLang(selectedStudentForMarksheet.totalMarks, lang)} / {formatNumberByLang(selectedStudentForMarksheet.fullMarks, lang)}
                </span>
                <span style={{ fontWeight: '800', color: '#16a34a', fontSize: '0.9rem' }}>
                  {isEn ? 'Result:' : 'ফলাফল:'} {isEn ? selectedStudentForMarksheet.qawmiGradeEn : selectedStudentForMarksheet.qawmiGrade}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setSelectedStudentForMarksheet(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                {isEn ? 'Close' : 'বন্ধ করুন'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                {isEn ? 'Print Marksheet' : 'মার্কশিট প্রিন্ট করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
