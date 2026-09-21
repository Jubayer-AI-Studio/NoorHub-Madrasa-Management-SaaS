'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  admissionNo: string;
  roll: string;
  className: string;
  curriculum: 'qawmi' | 'alia' | 'hifz' | 'general';
  isBoarding: boolean;
  bloodGroup: string;
  fatherName: string;
  parentName: string;
  parentPhone: string;
  feeStatus: 'paid' | 'due';
  dueAmount?: number;
  attendanceRate: number;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'মুহাম্মদ আব্দুর রহমান',
    admissionNo: 'NH-2026-001',
    roll: '০১',
    className: 'মিজান (কওমি)',
    curriculum: 'qawmi',
    isBoarding: true,
    bloodGroup: 'B+',
    fatherName: 'মাওলানা শফিকুর রহমান',
    parentName: 'মাওলানা শফিকুর রহমান (পিতা)',
    parentPhone: '01711223344',
    feeStatus: 'paid',
    attendanceRate: 98,
  },
  {
    id: '2',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    admissionNo: 'NH-2026-002',
    roll: '০২',
    className: 'হিফজুল কুরআন (১৮ পারা)',
    curriculum: 'hifz',
    isBoarding: true,
    bloodGroup: 'A+',
    fatherName: 'মোঃ রফিকুল ইসলাম',
    parentName: 'মোঃ রফিকুল ইসলাম (পিতা)',
    parentPhone: '01812345678',
    feeStatus: 'due',
    dueAmount: 850,
    attendanceRate: 95,
  },
  {
    id: '3',
    name: 'আহমদ উবায়দুল্লাহ',
    admissionNo: 'NH-2026-003',
    roll: '০৩',
    className: 'দাখিল ৯ম (আলিয়া)',
    curriculum: 'alia',
    isBoarding: false,
    bloodGroup: 'O+',
    fatherName: 'মাওলানা আবুল হোসেন',
    parentName: 'মাওলানা আবুল হোসেন (পিতা)',
    parentPhone: '01919876543',
    feeStatus: 'paid',
    attendanceRate: 92,
  },
  {
    id: '4',
    name: 'মুহাম্মদ জুবায়ের হোসেন',
    admissionNo: 'NH-2026-004',
    roll: '০৪',
    className: 'পঞ্চম শ্রেণি (জেনারেল)',
    curriculum: 'general',
    isBoarding: false,
    bloodGroup: 'AB+',
    fatherName: 'মোঃ খোরশেদ আলম',
    parentName: 'মোসাঃ রোকেয়া বেগম (মাতা)',
    parentPhone: '01611335577',
    feeStatus: 'due',
    dueAmount: 1200,
    attendanceRate: 88,
  },
  {
    id: '5',
    name: 'মুহাম্মদ হাসানুর রশীদ',
    admissionNo: 'NH-2026-005',
    roll: '০৫',
    className: 'কাফিয়া (কওমি)',
    curriculum: 'qawmi',
    isBoarding: true,
    bloodGroup: 'B+',
    fatherName: 'হাফেজ মোশাররফ হোসেন',
    parentName: 'হাফেজ মোশাররফ হোসেন (পিতা)',
    parentPhone: '01511224466',
    feeStatus: 'paid',
    attendanceRate: 97,
  },
];

const CURRICULUM_LABELS = {
  all: 'সকল সিলেবাস',
  qawmi: 'কওমি কিতাব',
  hifz: 'হিফজুল কুরআন',
  alia: 'আলিয়া বোর্ড',
  general: 'জেনারেল',
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    roll: '',
    className: 'মিজান (কওমি)',
    curriculum: 'qawmi' as 'qawmi' | 'alia' | 'hifz' | 'general',
    isBoarding: true,
    bloodGroup: 'B+',
    parentName: '',
    parentPhone: '',
  });

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.includes(searchQuery) ||
      student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentPhone.includes(searchQuery);

    const matchesCurriculum =
      selectedCurriculum === 'all' || student.curriculum === selectedCurriculum;

    return matchesSearch && matchesCurriculum;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentPhone) return;

    const student: Student = {
      id: String(Date.now()),
      name: newStudent.name,
      admissionNo: `NH-2026-${String(students.length + 1).padStart(3, '0')}`,
      roll: newStudent.roll || String(students.length + 1).padStart(2, '0'),
      className: newStudent.className,
      curriculum: newStudent.curriculum,
      isBoarding: newStudent.isBoarding,
      bloodGroup: newStudent.bloodGroup,
      fatherName: newStudent.parentName,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
      feeStatus: 'paid',
      attendanceRate: 100,
    };

    setStudents([student, ...students]);
    setShowAddModal(false);
    setNewStudent({
      name: '',
      roll: '',
      className: 'মিজান (কওমি)',
      curriculum: 'qawmi',
      isBoarding: true,
      bloodGroup: 'B+',
      parentName: '',
      parentPhone: '',
    });
  };

  const toWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '880');
    const msg = encodeURIComponent(`আস-সালামু আলাইকুম। নূরহাব মাদরাসা থেকে ${name}-এর অভিভাবক মহোদয়ের সাথে যোগাযোগ করা হচ্ছে।`);
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  const handleExportStudentsCSV = () => {
    let csv = "data:text/csv;charset=utf-8,রোল,আইডি,শিক্ষার্থীর নাম,শ্রেণি,সিলেবাস,আবাসিক/অনাবাসিক,রক্তের গ্রুপ,অভিভাবকের নাম,মোবাইল নম্বর,হাজিরা হার,বেতন স্ট্যাটাস\n";
    students.forEach((s) => {
      csv += `${s.roll},${s.admissionNo},${s.name},${s.className},${s.curriculum},${s.isBoarding ? 'আবাসিক' : 'অনাবাসিক'},${s.bloodGroup},${s.parentName},${s.parentPhone},${s.attendanceRate}%,${s.feeStatus === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}\n`;
    });
    const encoded = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `noorhub_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '700', color: '#0f172a' }}>
            ছাত্র ও শিক্ষার্থী প্রোফাইল
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            মোট শিক্ষার্থী: {students.length} জন · কওমি, হিফজ, আলিয়া ও জেনারেল
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleExportStudentsCSV}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: '700' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            এক্সেল / CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            নতুন ভর্তি
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          className="input"
          placeholder="নাম, রোল, ফোন নম্বর বা আইডি দিয়ে খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Curriculum Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem',
          scrollbarWidth: 'none',
        }}
      >
        {Object.entries(CURRICULUM_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCurriculum(key)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '999px',
              border: '1.5px solid',
              borderColor: selectedCurriculum === key ? '#16a34a' : '#e2e8f0',
              backgroundColor: selectedCurriculum === key ? '#f0fdf4' : '#ffffff',
              color: selectedCurriculum === key ? '#16a34a' : '#64748b',
              fontSize: '0.78rem',
              fontWeight: '600',
              fontFamily: 'Hind Siliguri, sans-serif',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Students List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {filteredStudents.length === 0 ? (
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: '0 auto 0.75rem' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ color: '#64748b', fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '500' }}>
              কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="card card-hover"
              style={{ padding: '1.15rem', border: '1.5px solid #f1f5f9' }}
            >
              {/* Card Header: Avatar, Name, Badges */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  {/* Photo Avatar Placeholder with Initials */}
                  <div
                    style={{
                      width: '3.25rem',
                      height: '3.25rem',
                      borderRadius: '0.875rem',
                      background: 'linear-gradient(135deg, #16a34a15, #2563eb15)',
                      border: '1.5px solid #16a34a30',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Hind Siliguri, sans-serif',
                      fontWeight: '700',
                      fontSize: '1.15rem',
                      color: '#16a34a',
                      flexShrink: 0,
                    }}
                  >
                    {student.name.split(' ')[1] ? student.name.split(' ')[1][0] : student.name[0]}
                  </div>

                  <div>
                    <h2
                      style={{
                        fontFamily: 'Hind Siliguri, sans-serif',
                        fontSize: '1.025rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {student.name}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#16a34a' }}>
                        রোল: {student.roll}
                      </span>
                      <span style={{ color: '#cbd5e1' }}>•</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {student.className}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      background: student.isBoarding ? '#eff6ff' : '#f8fafc',
                      color: student.isBoarding ? '#2563eb' : '#64748b',
                      border: `1px solid ${student.isBoarding ? '#bfdbfe' : '#e2e8f0'}`,
                    }}
                  >
                    {student.isBoarding ? 'আবাসিক' : 'অনাবাসিক'}
                  </span>

                  {student.feeStatus === 'paid' ? (
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        background: '#f0fdf4',
                        color: '#16a34a',
                        border: '1px solid #bbf7d0',
                      }}
                    >
                      ফি পরিশোধিত
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        background: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                      }}
                    >
                      বকেয়া ৳{student.dueAmount}
                    </span>
                  )}
                </div>
              </div>

              {/* Guardian Info & Key Details Box */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  marginBottom: '0.875rem',
                  border: '1px solid #f1f5f9',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.8rem' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span style={{ fontWeight: '600' }}>অভিভাবক:</span> {student.parentName}
                  </div>
                  <span style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: '600' }}>
                    রক্ত: {student.bloodGroup}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {student.parentPhone}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: '600' }}>
                    হাজিরা: {student.attendanceRate}%
                  </span>
                </div>
              </div>

              {/* Action Buttons: 1-Tap Call & WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2.5rem', gap: '0.5rem' }}>
                {/* 1-Tap Call */}
                <a
                  href={`tel:${student.parentPhone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem',
                    borderRadius: '0.625rem',
                    background: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe',
                    textDecoration: 'none',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.825rem',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  সরাসরি কল
                </a>

                {/* 1-Tap WhatsApp */}
                <a
                  href={toWhatsApp(student.parentPhone, student.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem',
                    borderRadius: '0.625rem',
                    background: '#f0fdf4',
                    color: '#16a34a',
                    border: '1px solid #bbf7d0',
                    textDecoration: 'none',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.825rem',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  হোয়াটসঅ্যাপ
                </a>

                {/* More Details */}
                <button
                  title="বিস্তারিত দেখুন"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.625rem',
                    background: '#f8fafc',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
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
            style={{ width: '100%', maxWidth: '26rem', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
                নতুন শিক্ষার্থী ভর্তি
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="label">শিক্ষার্থীর পুরো নাম *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: মুহাম্মদ আব্দুর রহমান"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">রোল নম্বর</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="যেমন: ০১"
                    value={newStudent.roll}
                    onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">রক্তের গ্রুপ</label>
                  <select
                    className="input"
                    value={newStudent.bloodGroup}
                    onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">সিলেবাস</label>
                  <select
                    className="input"
                    value={newStudent.curriculum}
                    onChange={(e) => setNewStudent({ ...newStudent, curriculum: e.target.value as any })}
                  >
                    <option value="qawmi">কওমি</option>
                    <option value="hifz">হিফজ</option>
                    <option value="alia">আলিয়া</option>
                    <option value="general">জেনারেল</option>
                  </select>
                </div>
                <div>
                  <label className="label">শ্রেণি / জামাত</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="যেমন: মিজান বা ৮ম"
                    value={newStudent.className}
                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label">অভিভাবকের নাম ও সম্পর্ক *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: মাওলানা শফিকুর রহমান (পিতা)"
                  required
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                />
              </div>

              <div>
                <label className="label">অভিভাবকের মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="01XXXXXXXXX"
                  required
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input
                  type="checkbox"
                  id="boarding"
                  checked={newStudent.isBoarding}
                  onChange={(e) => setNewStudent({ ...newStudent, isBoarding: e.target.checked })}
                  style={{ width: '1.15rem', height: '1.15rem', accentColor: '#16a34a' }}
                />
                <label htmlFor="boarding" style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  আবাসিক শিক্ষার্থী (হোস্টেল / বোর্ডিং)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                  ভর্তি সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
