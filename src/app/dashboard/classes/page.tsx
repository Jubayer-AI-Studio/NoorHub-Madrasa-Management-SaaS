'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface ClassItem {
  id: string;
  name: string;
  nameEn?: string;
  curriculumType: 'qawmi' | 'alia' | 'general' | 'hifz';
  section?: string;
  sectionEn?: string;
  classTeacher?: string;
  classTeacherEn?: string;
  studentCount?: number;
  description: string;
  descriptionEn?: string;
}

const initialClasses: ClassItem[] = [
  {
    id: 'c-qawmi-noorani',
    name: 'নূরানী ও মক্তব',
    nameEn: 'Noorani & Maktab',
    curriculumType: 'qawmi',
    section: 'ক শাখা',
    sectionEn: 'Section A',
    classTeacher: 'হাফেজ ক্বারী ফয়েজ উল্লাহ',
    classTeacherEn: 'Hafez Qari Fayez Ullah',
    studentCount: 35,
    description: 'সহজ কুরআন শিক্ষা, আমপারা ও মাসায়েল শিক্ষা।',
    descriptionEn: 'Basic Quran reading, Ampara, and fundamental Islamic morals.',
  },
  {
    id: 'c-qawmi-nazera',
    name: 'নাজেরা বিভাগ',
    nameEn: 'Nazera Faculty',
    curriculumType: 'qawmi',
    section: 'খ শাখা',
    sectionEn: 'Section B',
    classTeacher: 'হাফেজ জুবায়ের আহমেদ',
    classTeacherEn: 'Hafez Zubayer Ahmed',
    studentCount: 28,
    description: 'সম্পূর্ণ ৩০ পারা সহীহ তেলাওয়াত ও তাজভীদ অনুশীলন।',
    descriptionEn: 'Full 30 Paras recitation with proper Tajweed articulation.',
  },
  {
    id: 'c-qawmi-hifz',
    name: 'হিফজুল কুরআন বিভাগ',
    nameEn: 'Hifzul Quran Faculty',
    curriculumType: 'hifz',
    section: 'প্রধান শাখা',
    sectionEn: 'Main Section',
    classTeacher: 'হাফেজ মাওলানা আবু বকর',
    classTeacherEn: 'Hafez Mawlana Abu Bakr',
    studentCount: 42,
    description: '১ থেকে ৩০ পারা কুরআন হেফজ ও দৈনিক সবক-সবকি।',
    descriptionEn: 'Complete 30 Paras Quran memorization with daily Sabaq and Sabqi.',
  },
  {
    id: 'c-qawmi-mizan',
    name: 'মিজান জামাত (ইবতেদায়ী)',
    nameEn: 'Mizan Jamat (Elementary)',
    curriculumType: 'qawmi',
    section: 'ক শাখা',
    sectionEn: 'Section A',
    classTeacher: 'মাওলানা মাহমুদ হাসান',
    classTeacherEn: 'Mawlana Mahmud Hasan',
    studentCount: 24,
    description: 'আরবি শব্দতত্ত্ব (সরফ), মুন্শাআব ও ফার্সি ব্যাকরণ।',
    descriptionEn: 'Arabic morphology (Saraf), Munshaib, and Persian grammar.',
  },
  {
    id: 'c-qawmi-nahbemeer',
    name: 'নাহবেমীর জামাত',
    nameEn: 'Nahbemeer Jamat',
    curriculumType: 'qawmi',
    section: 'ক শাখা',
    sectionEn: 'Section A',
    classTeacher: 'মাওলানা আবুল কালাম',
    classTeacherEn: 'Mawlana Abul Kalam',
    studentCount: 22,
    description: 'আরবি বাক্যতত্ত্ব (নাহু), মিআতে আমেল ও আরবি সাহিত্য।',
    descriptionEn: 'Arabic syntax (Nahw), Miat-e-Amil, and Arabic literature.',
  },
  {
    id: 'c-qawmi-dawrah',
    name: 'দাওরায়ে হাদীস (তাকমীল)',
    nameEn: 'Dawrah-e-Hadith (Takmil)',
    curriculumType: 'qawmi',
    section: 'প্রধান জামাত',
    sectionEn: 'Main Jamat',
    classTeacher: 'মুফতী আব্দুর রহমান',
    classTeacherEn: 'Mufti Abdur Rahman',
    studentCount: 38,
    description: 'মাস্টার্স সমমান সর্বোচ্চ জামাত, সিহাহ সিত্তাহ ও বুখারী শরীফ।',
    descriptionEn: 'Master\'s equivalent final year, Sihah Sittah and Sahih Bukhari.',
  },
  {
    id: 'c-alia-dakhil',
    name: 'দাখিল ১০ম শ্রেণি',
    nameEn: 'Dakhil 10th Grade',
    curriculumType: 'alia',
    section: 'সাধারণ',
    sectionEn: 'General',
    classTeacher: 'মাওলানা আতিকুর রহমান',
    classTeacherEn: 'Mawlana Atiqur Rahman',
    studentCount: 30,
    description: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড দাখিল সমাপনী পরীক্ষা।',
    descriptionEn: 'Bangladesh Madrasa Education Board Dakhil public examinations.',
  },
  {
    id: 'c-gen-class8',
    name: '৮ম শ্রেণি (জেনারেল)',
    nameEn: 'Class 8 (General School)',
    curriculumType: 'general',
    section: 'A শাখা',
    sectionEn: 'Section A',
    classTeacher: 'জনাব শফিকুল ইসলাম',
    classTeacherEn: 'Mr. Shafiqul Islam',
    studentCount: 32,
    description: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) নিম্ন-মাধ্যমিক।',
    descriptionEn: 'National Curriculum & Textbook Board (NCTB) lower secondary education.',
  },
];

export default function ClassesManagementPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [selectedType, setSelectedType] = useState<'all' | 'qawmi' | 'alia' | 'general' | 'hifz'>('all');
  const [showModal, setShowModal] = useState(false);

  const [newClass, setNewClass] = useState({
    name: '',
    curriculumType: 'qawmi' as 'qawmi' | 'alia' | 'general' | 'hifz',
    section: 'ক শাখা',
    classTeacher: '',
    studentCount: 0,
    description: '',
  });

  // Edit Class State
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('noorhub_classes_all');
      if (saved) setClasses(JSON.parse(saved));
    } catch {}
  }, []);

  const saveClasses = (updated: ClassItem[]) => {
    setClasses(updated);
    try {
      localStorage.setItem('noorhub_classes_all', JSON.stringify(updated));
    } catch {}
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) return;

    const item: ClassItem = {
      id: `c-${Date.now()}`,
      name: newClass.name,
      nameEn: newClass.name,
      curriculumType: newClass.curriculumType,
      section: newClass.section || 'ক শাখা',
      sectionEn: newClass.section || 'Section A',
      classTeacher: newClass.classTeacher || 'দায়িত্বপ্রাপ্ত শিক্ষক',
      classTeacherEn: newClass.classTeacher || 'Assigned Teacher',
      studentCount: Number(newClass.studentCount) || 0,
      description: newClass.description || 'মাদরাসার নিয়মিত শ্রেণি।',
      descriptionEn: newClass.description || 'Regular madrasa academic class.',
    };

    const updated = [item, ...classes];
    saveClasses(updated);
    setNewClass({ name: '', curriculumType: 'qawmi', section: 'ক শাখা', classTeacher: '', studentCount: 0, description: '' });
    setShowModal(false);
  };

  const handleUpdateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass || !editingClass.name) return;

    const updated = classes.map((c) => (c.id === editingClass.id ? editingClass : c));
    saveClasses(updated);
    setEditingClass(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(isEn ? `Are you sure you want to delete class "${name}"?` : `আপনি কি "${name}" শ্রেণিটি মুছে ফেলতে চান?`)) {
      const updated = classes.filter((c) => c.id !== id);
      saveClasses(updated);
    }
  };

  const filtered = classes.filter((c) =>
    selectedType === 'all' ? true : c.curriculumType === selectedType
  );

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>
              {isEn ? 'Dashboard' : 'ড্যাশবোর্ড'}
            </Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '14px' }}>
              {isEn ? 'Class & Jamat Management' : 'শ্রেণি ও জামাত ব্যবস্থাপনা'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Class & Jamat Directory' : 'শ্রেণি ও জামাত ডিরেক্টরি'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#64748b' }}>
            {isEn
              ? 'Institutional classes, assigned class teachers, and curriculum management hub'
              : 'প্রতিষ্ঠানের সকল জামাত ও ক্লাসের তালিকা, দায়িত্বপ্রাপ্ত শিক্ষক ও নতুন শ্রেণি এন্ট্রি হাব'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            href="/dashboard/syllabus"
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {isEn ? 'View Syllabus & Kitabs' : 'সিলেবাস ও কিতাব দেখুন'}
          </Link>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.85rem',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {isEn ? '+ Add New Class / Jamat' : '+ নতুন শ্রেণি / জামাত এন্ট্রি'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
        {[
          { id: 'all', label: isEn ? `All Classes (${formatNumberByLang(classes.length, lang)})` : `সকল শ্রেণি (${classes.length})` },
          { id: 'qawmi', label: isEn ? 'Qawmi Nezami' : 'কওমি নেজামী' },
          { id: 'hifz', label: isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন' },
          { id: 'alia', label: isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা' },
          { id: 'general', label: isEn ? 'General School' : 'জেনারেল স্কুল' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id as any)}
            style={{
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.825rem',
              fontWeight: selectedType === tab.id ? '700' : '500',
              padding: '0.4rem 0.85rem',
              borderRadius: '999px',
              border: selectedType === tab.id ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
              background: selectedType === tab.id ? '#eff6ff' : '#ffffff',
              color: selectedType === tab.id ? '#2563eb' : '#475569',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Classes Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
        {filtered.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{
              padding: '1.25rem',
              borderTop: '3.5px solid #2563eb',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe',
                  }}
                >
                  {isEn
                    ? (c.curriculumType === 'qawmi' ? 'Qawmi' : c.curriculumType === 'hifz' ? 'Hifz' : c.curriculumType === 'alia' ? 'Alia' : 'General')
                    : (c.curriculumType === 'qawmi' ? 'কওমি' : c.curriculumType === 'hifz' ? 'হিফজ' : c.curriculumType === 'alia' ? 'আলিয়া' : 'জেনারেল')}
                </span>
                {(c.section || c.sectionEn) && (
                  <span style={{ fontSize: '0.725rem', color: '#64748b', background: '#f1f5f9', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    {isEn ? (c.sectionEn || c.section) : c.section}
                  </span>
                )}
              </div>

              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                {isEn ? (c.nameEn || c.name) : c.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.5', marginBottom: '0.65rem' }}>
                {isEn ? (c.descriptionEn || c.description) : c.description}
              </p>

              <div style={{ fontSize: '0.775rem', color: '#475569', marginBottom: '0.4rem' }}>
                {isEn ? 'Class Teacher:' : 'দায়িত্বপ্রাপ্ত শিক্ষক:'}{' '}
                <strong style={{ color: '#0f172a' }}>
                  {isEn ? (c.classTeacherEn || c.classTeacher || 'Not Assigned') : (c.classTeacher || 'নির্ধারিত নয়')}
                </strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#16a34a' }}>
                {isEn ? `${formatNumberByLang(c.studentCount || 0, lang)} Students` : `${formatNumberByLang(c.studentCount || 0, lang)} জন শিক্ষার্থী`}
              </span>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <Link
                  href="/dashboard/syllabus"
                  style={{
                    background: '#f0fdf4',
                    color: '#16a34a',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'Syllabus' : 'সিলেবাস দেখুন'}
                </Link>

                <button
                  onClick={() => setEditingClass({ ...c })}
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    borderRadius: '6px',
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                  title={isEn ? 'Edit class' : 'শ্রেণি এডিট করুন'}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {isEn ? 'Edit' : 'এডিট'}
                </button>

                <button
                  onClick={() => handleDelete(c.id, isEn ? (c.nameEn || c.name) : c.name)}
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    borderRadius: '6px',
                    padding: '0.3rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                  title={isEn ? 'Delete class' : 'শ্রেণি মুছে ফেলুন'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add New Class */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
            padding: '1rem',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '30rem',
              padding: '1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
                {isEn ? 'Add New Class / Jamat' : 'নতুন শ্রেণি / জামাত এন্ট্রি করুন'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              {isEn ? 'Fill in the form to register a new academic class' : 'মাদরাসা বা স্কুলের যেকোনো নতুন শ্রেণি নিচের ফর্ম পূরণ করে যুক্ত করুন'}
            </p>

            <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  {isEn ? 'Class Name *' : 'শ্রেণি বা জামাতের নাম *'}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={isEn ? 'e.g. Kafiya Jamat / Dakhil 9th / Class 6' : 'যেমন: কাফিয়া জামাত / দাখিল ৯ম / ৬ষ্ঠ শ্রেণি'}
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Curriculum:' : 'সিলেবাস কারিকুলাম:'}
                  </label>
                  <select
                    className="input-field"
                    value={newClass.curriculumType}
                    onChange={(e) => setNewClass({ ...newClass, curriculumType: e.target.value as any })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="qawmi">{isEn ? 'Qawmi Nezami' : 'কওমি নেজামী'}</option>
                    <option value="hifz">{isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন'}</option>
                    <option value="alia">{isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা'}</option>
                    <option value="general">{isEn ? 'General School' : 'জেনারেল স্কুল'}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Section' : 'শাখা (Section)'}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={isEn ? 'e.g. Section A' : 'যেমন: ক শাখা / বালক শাখা'}
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Assigned Class Teacher' : 'দায়িত্বপ্রাপ্ত শ্রেণি উস্তাদ / শিক্ষক'}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={isEn ? 'e.g. Mawlana Atiqur Rahman' : 'যেমন: মাওলানা আতিকুর রহমান'}
                    value={newClass.classTeacher}
                    onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Estimated Students' : 'আনুমানিক শিক্ষার্থী সংখ্যা'}
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="25"
                    value={newClass.studentCount}
                    onChange={(e) => setNewClass({ ...newClass, studentCount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  {isEn ? 'Brief Description / Aim' : 'শ্রেণির সংক্ষিপ্ত উদ্দেশ্য / বিবরণ'}
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder={isEn ? 'Goals, subjects, and description of class...' : 'এই শ্রেণির লক্ষ্য, পাঠ্য বিষয় ও বিবরণ...'}
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Cancel' : 'বাতিল'}
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {isEn ? 'Save Class' : 'শ্রেণি এন্ট্রি সম্পন্ন করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Class */}
      {editingClass && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '32rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              border: '1px solid #e2e8f0',
              fontFamily: 'Hind Siliguri, sans-serif',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {isEn ? 'Edit Class / Jamat Information' : 'শ্রেণি / জামাতের তথ্য পরিবর্তন (এডিট)'}
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                    {isEn ? 'Update class title, assigned teacher, section, or curriculum' : 'যেকোনো সময় শ্রেণির নাম, শিক্ষক, শাখা বা সিলেবাসের ধরন পরিবর্তন করুন'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingClass(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateClass} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  {isEn ? 'Class Name *' : 'শ্রেণি / জামাতের নাম *'}
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder={isEn ? 'e.g. Sharh-e-Beqaya, 10th Grade...' : 'যেমন: শরহে বেকায়া, ১০ম শ্রেণি...'}
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Curriculum Type' : 'শিক্ষাক্রমের ধরন'}
                  </label>
                  <select
                    className="input-field"
                    value={editingClass.curriculumType}
                    onChange={(e) => setEditingClass({ ...editingClass, curriculumType: e.target.value as any })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="qawmi">{isEn ? 'Qawmi Madrasa' : 'কওমি মাদরাসা'}</option>
                    <option value="alia">{isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা'}</option>
                    <option value="hifz">{isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন'}</option>
                    <option value="general">{isEn ? 'General / School' : 'জেনারেল / স্কুল'}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Section / Division' : 'শাখা / বিভাগ'}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={isEn ? 'e.g. Section A / Day' : 'যেমন: ক শাখা / দিবা'}
                    value={editingClass.section || ''}
                    onChange={(e) => setEditingClass({ ...editingClass, section: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Class Teacher / Nigran' : 'শ্রেণি শিক্ষক / নিগরান'}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={isEn ? 'Assigned Teacher' : 'দায়িত্বপ্রাপ্ত শিক্ষক'}
                    value={editingClass.classTeacher || ''}
                    onChange={(e) => setEditingClass({ ...editingClass, classTeacher: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    {isEn ? 'Student Count' : 'শিক্ষার্থী সংখ্যা'}
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="25"
                    value={editingClass.studentCount || 0}
                    onChange={(e) => setEditingClass({ ...editingClass, studentCount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  {isEn ? 'Class Description / Goals' : 'শ্রেণির বিবরণ / উদ্দেশ্য'}
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder={isEn ? 'Goals and description of this class...' : 'এই শ্রেণির লক্ষ্য ও বিবরণ...'}
                  value={editingClass.description}
                  onChange={(e) => setEditingClass({ ...editingClass, description: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingClass(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Cancel' : 'বাতিল'}
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#2563eb' }}>
                  {isEn ? 'Save Changes' : 'পরিবর্তন সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
