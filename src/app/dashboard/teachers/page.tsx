'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  department: string;
  departmentEn: string;
  phone: string;
  monthlySalary: number;
  assignedClasses: string[];
  assignedClassesEn: string[];
  joinDate: string;
  joinDateEn: string;
  status: 'active' | 'leave';
}

const INITIAL_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'মাওলানা আব্দুল্লাহ আল-কাফী',
    nameEn: 'Mawlana Abdullah Al-Kafi',
    designation: 'শায়খুল হাদীস ও প্রধান মুফতি',
    designationEn: 'Shaykh-ul-Hadith & Chief Mufti',
    department: 'দাওরায়ে হাদীস ও ইফতা',
    departmentEn: 'Dawrah Hadith & Ifta',
    phone: '01712345678',
    monthlySalary: 22000,
    assignedClasses: ['দাওরা (বুখারী শরীফ)', 'ইফতা'],
    assignedClassesEn: ['Dawrah (Sahih Bukhari)', 'Ifta'],
    joinDate: '২০১৮',
    joinDateEn: '2018',
    status: 'active',
  },
  {
    id: '2',
    name: 'মাওলানা ইব্রাহিম খলিল',
    nameEn: 'Mawlana Ibrahim Khalil',
    designation: 'নাযিমে তালীমাত (শিক্ষা সচিব)',
    designationEn: 'Dean of Academics',
    department: 'কিতাব বিভাগ',
    departmentEn: 'Kitab Department',
    phone: '01819876543',
    monthlySalary: 18000,
    assignedClasses: ['কাফিয়া', 'হেদায়া'],
    assignedClassesEn: ['Kafiya', 'Hidayah'],
    joinDate: '২০২০',
    joinDateEn: '2020',
    status: 'active',
  },
  {
    id: '3',
    name: 'হাফেজ ক্বারী মোশাররফ হোসেন',
    nameEn: 'Hafez Qari Mosharraf Hossain',
    designation: 'প্রধান হিফজ শিক্ষক',
    designationEn: 'Head of Hifz Faculty',
    department: 'হিফজুল কুরআন',
    departmentEn: 'Hifzul Quran',
    phone: '01911223344',
    monthlySalary: 16000,
    assignedClasses: ['হিফজ ১ম গ্রুপ (১৫-৩০ পারা)'],
    assignedClassesEn: ['Hifz Group 1 (15-30 Paras)'],
    joinDate: '২০২১',
    joinDateEn: '2021',
    status: 'active',
  },
  {
    id: '4',
    name: 'মাওলানা নূরুল ইসলাম',
    nameEn: 'Mawlana Nurul Islam',
    designation: 'সহকারী শিক্ষক',
    designationEn: 'Assistant Teacher',
    department: 'নূরানী ও নাজেরা',
    departmentEn: 'Noorani & Nazera',
    phone: '01612334455',
    monthlySalary: 14000,
    assignedClasses: ['নূরানী জামাত'],
    assignedClassesEn: ['Noorani Class'],
    joinDate: '২০২২',
    joinDateEn: '2022',
    status: 'active',
  },
  {
    id: '5',
    name: 'মোঃ সাইফুল করিম',
    nameEn: 'Md. Saiful Karim',
    designation: 'জেনারেল শিক্ষক',
    designationEn: 'General Academic Teacher',
    department: 'বাংলা, গণিত ও ইংরেজি',
    departmentEn: 'Bangla, Math & English',
    phone: '01511223344',
    monthlySalary: 13000,
    assignedClasses: ['দাখিল ও সাধারণ শ্রেণি'],
    assignedClassesEn: ['Dakhil & General Class'],
    joinDate: '২০২৩',
    joinDateEn: '2023',
    status: 'active',
  },
];

export default function TeachersPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Teacher Form
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    designation: 'সহকারী শিক্ষক',
    department: 'কিতাব বিভাগ',
    phone: '',
    monthlySalary: '15000',
    assignedClass: '',
  });

  const filteredTeachers = teachers.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.nameEn.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.departmentEn.toLowerCase().includes(q) ||
      t.phone.includes(search)
    );
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.phone) return;

    const teacher: Teacher = {
      id: String(Date.now()),
      name: newTeacher.name,
      nameEn: newTeacher.name,
      designation: newTeacher.designation,
      designationEn: newTeacher.designation,
      department: newTeacher.department,
      departmentEn: newTeacher.department,
      phone: newTeacher.phone,
      monthlySalary: parseInt(newTeacher.monthlySalary) || 15000,
      assignedClasses: newTeacher.assignedClass ? [newTeacher.assignedClass] : ['সাধারণ জামাত'],
      assignedClassesEn: newTeacher.assignedClass ? [newTeacher.assignedClass] : ['General Class'],
      joinDate: '২০২৬',
      joinDateEn: '2026',
      status: 'active',
    };

    setTeachers([teacher, ...teachers]);
    setShowAddModal(false);
    setNewTeacher({
      name: '',
      designation: 'সহকারী শিক্ষক',
      department: 'কিতাব বিভাগ',
      phone: '',
      monthlySalary: '15000',
      assignedClass: '',
    });
  };

  const toWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '880');
    const msg = encodeURIComponent(
      isEn
        ? `Assalamu Alaikum Respected ${name}. Contacting you from NoorHub Madrasa Administration.`
        : `আস-সালামু আলাইকুম হযরত ${name}। নূরহাব মাদরাসা প্রশাসন থেকে আপনার সাথে যোগাযোগ করা হচ্ছে।`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Ustad & Teacher Directory' : 'উস্তাদ ও শিক্ষক ডিরেক্টরি'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? `Total Teachers & Staff: ${formatNumberByLang(teachers.length, lang)}`
              : `মোট শিক্ষক ও কর্মকর্তা: ${formatNumberByLang(teachers.length, lang)} জন`}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '800' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {isEn ? 'Add New Teacher' : 'নতুন শিক্ষক যুক্ত করুন'}
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          className="input"
          placeholder={isEn ? 'Search by teacher name, department or phone...' : 'শিক্ষকের নাম, বিভাগ বা ফোন নম্বর দিয়ে খুঁজুন...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Teachers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="card card-hover"
            style={{ padding: '1.15rem', border: '1.5px solid #f1f5f9' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '0.75rem',
                    background: '#eff6ff',
                    border: '1.5px solid #bfdbfe',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    flexShrink: 0,
                  }}
                >
                  {(isEn ? teacher.nameEn[0] : teacher.name[8] || teacher.name[0])}
                </div>

                <div>
                  <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>
                    {isEn ? teacher.nameEn : teacher.name}
                  </h2>
                  <div style={{ fontSize: '0.775rem', color: '#16a34a', fontWeight: '600' }}>
                    {isEn ? `${teacher.designationEn} · ${teacher.departmentEn}` : `${teacher.designation} · ${teacher.department}`}
                  </div>
                </div>
              </div>

              {/* Monthly Allowance Tag */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>
                  ৳{formatNumberByLang(teacher.monthlySalary, lang)}
                </div>
                <div style={{ fontSize: '0.675rem', color: '#64748b' }}>
                  {isEn ? 'Monthly Allowance' : 'মাসিক ভাতা'}
                </div>
              </div>
            </div>

            {/* Assigned Classes */}
            <div style={{ background: '#f8fafc', padding: '0.625rem 0.875rem', borderRadius: '0.625rem', marginBottom: '0.875rem', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <div style={{ color: '#475569' }}>
                  <strong>{isEn ? 'Assigned Classes:' : 'দায়িত্বপ্রাপ্ত জামাত:'}</strong>{' '}
                  {isEn ? teacher.assignedClassesEn.join(', ') : teacher.assignedClasses.join(', ')}
                </div>
                <div style={{ color: '#64748b' }}>
                  {isEn ? `Joined: ${teacher.joinDateEn}` : `যোগদান: ${teacher.joinDate}`}
                </div>
              </div>
            </div>

            {/* Contact Actions: Call & WhatsApp */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <a
                href={`tel:${teacher.phone}`}
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
                {isEn ? 'Direct Call' : 'সরাসরি কল'}
              </a>

              <a
                href={toWhatsApp(teacher.phone, isEn ? teacher.nameEn : teacher.name)}
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
                {isEn ? 'WhatsApp' : 'হোয়াটসঅ্যাপ'}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
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
          <div className="card fade-in" style={{ width: '100%', maxWidth: '26rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
                {isEn ? 'New Teacher / Ustad Information' : 'নতুন শিক্ষক / উস্তাদ তথ্য'}
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

            <form onSubmit={handleAddTeacher} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="label">{isEn ? 'Full Name *' : 'উস্তাদ / শিক্ষকের পুরো নাম *'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? 'e.g. Mawlana Abdullah' : 'যেমন: মাওলানা আব্দুল্লাহ'}
                  required
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Designation' : 'পদবী'}</label>
                  <select
                    className="input"
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                  >
                    <option value="মুহতামিম">{isEn ? 'Principal (Muhtamim)' : 'মুহতামিম'}</option>
                    <option value="শায়খুল হাদীস">{isEn ? 'Shaykh-ul-Hadith' : 'শায়খুল হাদীস'}</option>
                    <option value="নাযিমে তালীমাত">{isEn ? 'Academic Dean' : 'নাযিমে তালীমাত'}</option>
                    <option value="হিফজ উস্তাদ">{isEn ? 'Hifz Teacher' : 'হিফজ উস্তাদ'}</option>
                    <option value="সহকারী শিক্ষক">{isEn ? 'Assistant Teacher' : 'সহকারী শিক্ষক'}</option>
                    <option value="জেনারেল শিক্ষক">{isEn ? 'General Teacher' : 'জেনারেল শিক্ষক'}</option>
                  </select>
                </div>

                <div>
                  <label className="label">{isEn ? 'Department' : 'বিভাগ'}</label>
                  <select
                    className="input"
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                  >
                    <option value="দাওরা ও ইফতা">{isEn ? 'Dawrah & Ifta' : 'দাওরা ও ইফতা'}</option>
                    <option value="কিতাব বিভাগ">{isEn ? 'Kitab Department' : 'কিতাব বিভাগ'}</option>
                    <option value="হিফজুল কুরআন">{isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন'}</option>
                    <option value="নূরানী ও নাজেরা">{isEn ? 'Noorani & Nazera' : 'নূরানী ও নাজেরা'}</option>
                    <option value="সাধারণ বিষয়">{isEn ? 'General Subjects' : 'সাধারণ বিষয়'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">{isEn ? 'Mobile Number *' : 'মোবাইল নম্বর *'}</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="01XXXXXXXXX"
                  required
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Monthly Allowance (BDT)' : 'মাসিক ভাতা (টাকা)'}</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="15000"
                    value={newTeacher.monthlySalary}
                    onChange={(e) => setNewTeacher({ ...newTeacher, monthlySalary: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">{isEn ? 'Assigned Class' : 'দায়িত্বপ্রাপ্ত জামাত'}</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={isEn ? 'e.g. Mizan or Hifz' : 'যেমন: মিজান বা হিফজ'}
                    value={newTeacher.assignedClass}
                    onChange={(e) => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                  {isEn ? 'Save Teacher' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
