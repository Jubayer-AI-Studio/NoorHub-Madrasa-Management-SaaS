'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentIdCardModal from '@/components/students/StudentIdCardModal';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface Student {
  id: string;
  name: string;
  nameEn?: string;
  admissionNo: string;
  roll: string;
  className: string;
  classNameEn?: string;
  curriculum: 'qawmi' | 'alia' | 'hifz' | 'general';
  isBoarding: boolean;
  bloodGroup: string;
  fatherName: string;
  parentName: string;
  parentNameEn?: string;
  parentPhone: string;
  feeStatus: 'paid' | 'due';
  dueAmount?: number;
  attendanceRate: number;
  photoUrl?: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'মুহাম্মদ আব্দুর রহমান',
    nameEn: 'Muhammad Abdur Rahman',
    admissionNo: 'NH-2026-001',
    roll: '০১',
    className: 'মিজান (কওমি)',
    classNameEn: 'Mizan (Qawmi)',
    curriculum: 'qawmi',
    isBoarding: true,
    bloodGroup: 'B+',
    fatherName: 'মাওলানা শফিকুর রহমান',
    parentName: 'মাওলানা শফিকুর রহমান (পিতা)',
    parentNameEn: 'Mawlana Shafiqur Rahman (Father)',
    parentPhone: '01711223344',
    feeStatus: 'paid',
    attendanceRate: 98,
  },
  {
    id: '2',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    nameEn: 'Muhammad Abdullah Al-Mamun',
    admissionNo: 'NH-2026-002',
    roll: '০২',
    className: 'হিফজুল কুরআন (১৮ পারা)',
    classNameEn: 'Hifzul Quran (18 Paras)',
    curriculum: 'hifz',
    isBoarding: true,
    bloodGroup: 'A+',
    fatherName: 'মোঃ রফিকুল ইসলাম',
    parentName: 'মোঃ রফিকুল ইসলাম (পিতা)',
    parentNameEn: 'Md. Rafiqul Islam (Father)',
    parentPhone: '01812345678',
    feeStatus: 'due',
    dueAmount: 850,
    attendanceRate: 95,
  },
  {
    id: '3',
    name: 'আহমদ উবায়দুল্লাহ',
    nameEn: 'Ahmad Ubaidullah',
    admissionNo: 'NH-2026-003',
    roll: '০৩',
    className: 'দাখিল ৯ম (আলিয়া)',
    classNameEn: 'Dakhil 9th (Alia)',
    curriculum: 'alia',
    isBoarding: false,
    bloodGroup: 'O+',
    fatherName: 'মাওলানা আবুল হোসেন',
    parentName: 'মাওলানা আবুল হোসেন (পিতা)',
    parentNameEn: 'Mawlana Abul Hossain (Father)',
    parentPhone: '01919876543',
    feeStatus: 'paid',
    attendanceRate: 92,
  },
  {
    id: '4',
    name: 'মুহাম্মদ জুবায়ের হোসেন',
    nameEn: 'Muhammad Zubayer Hossain',
    admissionNo: 'NH-2026-004',
    roll: '০৪',
    className: 'পঞ্চম শ্রেণি (জেনারেল)',
    classNameEn: 'Class 5 (General)',
    curriculum: 'general',
    isBoarding: false,
    bloodGroup: 'AB+',
    fatherName: 'মোঃ খোরশেদ আলম',
    parentName: 'মোসাঃ রোকেয়া বেগম (মাতা)',
    parentNameEn: 'Mst. Rokeya Begum (Mother)',
    parentPhone: '01611335577',
    feeStatus: 'due',
    dueAmount: 1200,
    attendanceRate: 88,
  },
  {
    id: '5',
    name: 'মুহাম্মদ হাসানুর রশীদ',
    nameEn: 'Muhammad Hasanur Rashid',
    admissionNo: 'NH-2026-005',
    roll: '০৫',
    className: 'কাফিয়া (কওমি)',
    classNameEn: 'Kafiya (Qawmi)',
    curriculum: 'qawmi',
    isBoarding: true,
    bloodGroup: 'B+',
    fatherName: 'হাফেজ মোশাররফ হোসেন',
    parentName: 'হাফেজ মোশাররফ হোসেন (পিতা)',
    parentNameEn: 'Hafez Mosharraf Hossain (Father)',
    parentPhone: '01511224466',
    feeStatus: 'paid',
    attendanceRate: 97,
  },
];

export default function StudentsPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const CURRICULUM_LABELS: Record<string, string> = {
    all: isEn ? 'All Curriculums' : 'সকল সিলেবাস',
    qawmi: isEn ? 'Qawmi Kitab' : 'কওমি কিতাব',
    hifz: isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন',
    alia: isEn ? 'Alia Board' : 'আলিয়া বোর্ড',
    general: isEn ? 'General' : 'জেনারেল',
  };

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [selectedIdCardStudentId, setSelectedIdCardStudentId] = useState<string | undefined>(undefined);
  const [photoToast, setPhotoToast] = useState<string | null>(null);
  const [newStudentPhoto, setNewStudentPhoto] = useState<string>('');

  // Load persisted students from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noorhub_students_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStudents(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveStudents = (updated: Student[]) => {
    setStudents(updated);
    try {
      localStorage.setItem('noorhub_students_v3', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper to compress image client-side to compact Base64
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (studentId: string, file: File) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      const updated = students.map((s) =>
        s.id === studentId ? { ...s, photoUrl: compressed } : s
      );
      saveStudents(updated);
      setPhotoToast('ছবি সফলভাবে সংরক্ষিত হয়েছে! আইডি কার্ডে স্বয়ংক্রিয়ভাবে আপডেট হয়েছে।');
      setTimeout(() => setPhotoToast(null), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewStudentPhoto = async (file: File) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setNewStudentPhoto(compressed);
    } catch (err) {
      console.error(err);
    }
  };

  const openIdCardModal = (studentId?: string) => {
    setSelectedIdCardStudentId(studentId);
    setShowIdCardModal(true);
  };

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
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(q) ||
      (student.nameEn && student.nameEn.toLowerCase().includes(q)) ||
      student.roll.includes(searchQuery) ||
      student.admissionNo.toLowerCase().includes(q) ||
      student.parentPhone.includes(searchQuery) ||
      (student.classNameEn && student.classNameEn.toLowerCase().includes(q)) ||
      (student.parentNameEn && student.parentNameEn.toLowerCase().includes(q));

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
      photoUrl: newStudentPhoto || undefined,
    };

    saveStudents([student, ...students]);
    setShowAddModal(false);
    setNewStudentPhoto('');
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
    <div
      className="px-3.5 py-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full overflow-x-hidden"
      style={{ fontFamily: "'Hind Siliguri', 'Inter', sans-serif" }}
    >
      {/* Toast Notification */}
      {photoToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#065f46',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(6, 95, 70, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: '700',
            border: '1.5px solid #34d399',
          }}
        >
          <span style={{ fontSize: '16px' }}>✓</span>
          <span>{photoToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.875rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Students & Learner Profiles' : 'ছাত্র ও শিক্ষার্থী প্রোফাইল'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            {isEn
              ? `Total Students: ${formatNumberByLang(students.length, lang)} · Photo Upload & ID Card Center Active`
              : `মোট শিক্ষার্থী: ${formatNumberByLang(students.length, lang)} জন · ছবি আপলোড ও আইডি কার্ড জেনারেটর সক্রিয়`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: '100%', maxWidth: 'fit-content' }}>
          <button
            type="button"
            onClick={() => openIdCardModal(undefined)}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#ecfdf5',
              color: '#065f46',
              border: '1.5px solid #a7f3d0',
              fontWeight: '700',
              padding: '7px 12px',
              borderRadius: '12px',
              fontSize: '0.825rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(6,95,70,0.1)',
            }}
          >
            <span style={{ fontSize: '15px' }}>🪪</span>
            {isEn ? 'ID Card Center' : 'আইডি কার্ড প্রিন্ট'}
          </button>
          <button
            onClick={handleExportStudentsCSV}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #bbf7d0', fontWeight: '700', padding: '7px 12px', borderRadius: '12px', fontSize: '0.825rem' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {isEn ? 'Export CSV' : 'এক্সেল / CSV'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)', padding: '7px 14px', borderRadius: '12px', background: 'linear-gradient(135deg, #16a34a, #15803d)', fontWeight: '700', fontSize: '0.825rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {isEn ? 'New Admission' : 'নতুন ভর্তি'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1rem', width: '100%', maxWidth: '600px' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          className="input"
          placeholder={isEn ? "Search by name, roll, phone, or ID..." : "নাম, রোল, ফোন নম্বর বা আইডি দিয়ে খুঁজুন..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', paddingLeft: '2.75rem', height: '44px', borderRadius: '12px', fontSize: '14px', border: '1.5px solid #e2e8f0' }}
        />
      </div>

      {/* Curriculum Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          width: '100%',
        }}
        className="no-scrollbar"
      >
        {Object.entries(CURRICULUM_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCurriculum(key)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              border: '1.5px solid',
              borderColor: selectedCurriculum === key ? '#16a34a' : '#e2e8f0',
              backgroundColor: selectedCurriculum === key ? '#f0fdf4' : '#ffffff',
              color: selectedCurriculum === key ? '#16a34a' : '#64748b',
              fontSize: '0.825rem',
              fontWeight: '700',
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

      {/* Students List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full">
        {filteredStudents.length === 0 ? (
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', gridColumn: '1 / -1' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: '0 auto 0.75rem' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ color: '#64748b', fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '500' }}>
              {isEn ? 'No student records found' : 'কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি'}
            </p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const studentDisplayName = isEn ? (student.nameEn || student.name) : student.name;
            const studentDisplayClass = isEn ? (student.classNameEn || student.className) : student.className;
            const studentDisplayParent = isEn ? (student.parentNameEn || student.parentName) : student.parentName;
            const studentDisplayRoll = formatNumberByLang(student.roll, lang);

            return (
              <div
                key={student.id}
                className="card card-hover"
                style={{ padding: '1rem', border: '1.5px solid #f1f5f9', width: '100%', overflow: 'hidden' }}
              >
                {/* Card Header: Avatar with Photo Upload, Name, Badges */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    {/* Photo Avatar with 1-Click Upload */}
                    <div
                      style={{
                        position: 'relative',
                        width: '3.25rem',
                        height: '3.25rem',
                        borderRadius: '0.875rem',
                        border: '2px solid #16a34a40',
                        flexShrink: 0,
                        cursor: 'pointer',
                        backgroundColor: '#f8fafc',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                      title={isEn ? "Click to change photo" : "ছবি পরিবর্তন করতে ক্লিক করুন"}
                      onClick={() => document.getElementById(`upload-${student.id}`)?.click()}
                    >
                      <input
                        type="file"
                        id={`upload-${student.id}`}
                        accept="image/png, image/jpeg, image/webp"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePhotoUpload(student.id, file);
                        }}
                      />

                      {student.photoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={student.photoUrl}
                          alt={studentDisplayName}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #16a34a15, #2563eb15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Hind Siliguri, sans-serif',
                            fontWeight: '800',
                            fontSize: '1.15rem',
                            color: '#16a34a',
                          }}
                        >
                          {studentDisplayName.split(' ')[1] ? studentDisplayName.split(' ')[1][0] : studentDisplayName[0]}
                        </div>
                      )}

                      {/* Camera Badge in Corner */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1px',
                          right: '1px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#16a34a',
                          border: '1.5px solid #ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                        }}
                        title={isEn ? "Upload photo" : "ছবি আপলোড করুন"}
                      >
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                      </div>
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <h2
                        style={{
                          fontFamily: 'Hind Siliguri, sans-serif',
                          fontSize: '0.975rem',
                          fontWeight: '700',
                          color: '#0f172a',
                          marginBottom: '0.15rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={studentDisplayName}
                      >
                        {studentDisplayName}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#16a34a' }}>
                          {isEn ? 'Roll: ' : 'রোল: '}{studentDisplayRoll}
                        </span>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <span style={{ fontSize: '0.725rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '110px' }} title={studentDisplayClass}>
                          {studentDisplayClass}
                        </span>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <span
                          onClick={() => document.getElementById(`upload-${student.id}`)?.click()}
                          style={{
                            fontSize: '0.7rem',
                            color: '#0d9488',
                            fontWeight: '700',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {student.photoUrl ? (isEn ? '📷 Edit' : '📷 পরিবর্তন') : (isEn ? '📷 Add' : '📷 যোগ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
                    <span
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '999px',
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        background: student.isBoarding ? '#eff6ff' : '#f8fafc',
                        color: student.isBoarding ? '#2563eb' : '#64748b',
                        border: `1px solid ${student.isBoarding ? '#bfdbfe' : '#e2e8f0'}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isEn ? (student.isBoarding ? 'Residential' : 'Day Scholar') : (student.isBoarding ? 'আবাসিক' : 'অনাবাসিক')}
                    </span>

                    {student.feeStatus === 'paid' ? (
                      <span
                        style={{
                          padding: '0.15rem 0.45rem',
                          borderRadius: '999px',
                          fontSize: '0.65rem',
                          fontWeight: '700',
                          background: '#f0fdf4',
                          color: '#16a34a',
                          border: '1px solid #bbf7d0',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isEn ? 'Paid' : 'পরিশোধিত'}
                      </span>
                    ) : (
                      <span
                        style={{
                          padding: '0.15rem 0.45rem',
                          borderRadius: '999px',
                          fontSize: '0.65rem',
                          fontWeight: '700',
                          background: '#fef2f2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isEn ? `Due ৳${formatNumberByLang(student.dueAmount || 0, lang)}` : `বকেয়া ৳${formatNumberByLang(student.dueAmount || 0, lang)}`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Guardian Info & Key Details Box */}
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '0.75rem',
                    padding: '0.65rem 0.75rem',
                    marginBottom: '0.75rem',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#475569', fontSize: '0.78rem', minWidth: 0, overflow: 'hidden' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span style={{ fontWeight: '600', flexShrink: 0 }}>{isEn ? 'Guardian:' : 'অভিভাবক:'}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={studentDisplayParent}>
                        {studentDisplayParent}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600', flexShrink: 0 }}>
                      {isEn ? 'Blood:' : 'রক্ত:'} {student.bloodGroup}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: '#0f172a', fontWeight: '600', letterSpacing: '0.5px' }}>
                      {student.parentPhone}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '600' }}>
                      {isEn ? 'Attd:' : 'হাজিরা:'} {formatNumberByLang(student.attendanceRate, lang)}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons: 1-Tap Call, WhatsApp, ID Card */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '6px', width: '100%' }}>
                  {/* 1-Tap Call */}
                  <a
                    href={`tel:${student.parentPhone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      padding: '0.5rem 0.25rem',
                      borderRadius: '0.625rem',
                      background: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid #bfdbfe',
                      textDecoration: 'none',
                      fontFamily: 'Hind Siliguri, sans-serif',
                      fontWeight: '600',
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{isEn ? 'Call' : 'কল'}</span>
                  </a>

                  {/* 1-Tap WhatsApp */}
                  <a
                    href={toWhatsApp(student.parentPhone, studentDisplayName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem',
                      padding: '0.5rem 0.25rem',
                      borderRadius: '0.625rem',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      border: '1px solid #bbf7d0',
                      textDecoration: 'none',
                      fontFamily: 'Hind Siliguri, sans-serif',
                      fontWeight: '600',
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>{isEn ? 'WhatsApp' : 'হোয়াটসঅ্যাপ'}</span>
                  </a>

                  {/* Student ID Card Button */}
                  <button
                    type="button"
                    onClick={() => openIdCardModal(student.id)}
                    title={isEn ? "Generate & Print ID Card" : "এই শিক্ষার্থীর আইডি কার্ড তৈরি ও প্রিন্ট করুন"}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '0.5rem 0.25rem',
                      borderRadius: '0.625rem',
                      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                      color: '#065f46',
                      border: '1.5px solid #a7f3d0',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      fontFamily: 'Hind Siliguri, sans-serif',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 1px 3px rgba(6, 95, 70, 0.1)',
                    }}
                  >
                    <span>🪪</span>
                    <span>{isEn ? 'ID Card' : 'কার্ড'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
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
            style={{ width: '100%', maxWidth: '28rem', maxHeight: '92vh', overflowY: 'auto', padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {isEn ? 'New Student Admission' : 'নতুন শিক্ষার্থী ভর্তি'}
                </h2>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                  {isEn ? 'Fill in student photo and required details' : 'শিক্ষার্থীর ছবি ও প্রয়োজনীয় তথ্য পূরণ করুন'}
                </p>
              </div>
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
              {/* Photo Upload Section in Add Modal */}
              <div
                style={{
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '14px',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  textAlign: 'center',
                }}
              >
                <input
                  type="file"
                  id="new-student-photo-file"
                  accept="image/png, image/jpeg, image/webp"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleNewStudentPhoto(file);
                  }}
                />

                {newStudentPhoto ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={newStudentPhoto}
                      alt="Student Preview"
                      style={{
                        width: '58px',
                        height: '66px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '2px solid #16a34a',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#16a34a', display: 'block' }}>
                        {isEn ? '✓ Photo added successfully' : '✓ ছবি সফলভাবে যুক্ত হয়েছে'}
                      </span>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                        <button
                          type="button"
                          onClick={() => document.getElementById('new-student-photo-file')?.click()}
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#2563eb',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {isEn ? 'Change Photo' : 'ছবি পরিবর্তন'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewStudentPhoto('')}
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#dc2626',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {isEn ? 'Remove' : 'মুছে ফেলুন'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById('new-student-photo-file')?.click()}
                    style={{ cursor: 'pointer', padding: '6px' }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>📸</div>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', display: 'block' }}>
                      {isEn ? 'Upload Student Photo' : 'শিক্ষার্থীর ছবি আপলোড করুন'}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                      {isEn ? 'JPG, PNG passport size photo (used on ID Card)' : 'JPG, PNG পাসপোর্ট সাইজ ছবি (আইডি কার্ডে যুক্ত হবে)'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="label">{isEn ? 'Full Student Name *' : 'শিক্ষার্থীর পুরো নাম *'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? "e.g. Muhammad Abdur Rahman" : "যেমন: মুহাম্মদ আব্দুর রহমান"}
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Roll Number' : 'রোল নম্বর'}</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={isEn ? "e.g. 01" : "যেমন: ০১"}
                    value={newStudent.roll}
                    onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">{isEn ? 'Blood Group' : 'রক্তের গ্রুপ'}</label>
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
                  <label className="label">{isEn ? 'Curriculum' : 'সিলেবাস'}</label>
                  <select
                    className="input"
                    value={newStudent.curriculum}
                    onChange={(e) => setNewStudent({ ...newStudent, curriculum: e.target.value as any })}
                  >
                    <option value="qawmi">{isEn ? 'Qawmi' : 'কওমি'}</option>
                    <option value="hifz">{isEn ? 'Hifz' : 'হিফজ'}</option>
                    <option value="alia">{isEn ? 'Alia' : 'আলিয়া'}</option>
                    <option value="general">{isEn ? 'General' : 'জেনারেল'}</option>
                  </select>
                </div>
                <div>
                  <label className="label">{isEn ? 'Class / Grade' : 'শ্রেণি / জামাত'}</label>
                  <input
                    type="text"
                    className="input"
                    placeholder={isEn ? "e.g. Mizan or Grade 8" : "যেমন: মিজান বা ৮ম"}
                    value={newStudent.className}
                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label">{isEn ? 'Guardian Name & Relation *' : 'অভিভাবকের নাম ও সম্পর্ক *'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? "e.g. Mawlana Shafiqur Rahman (Father)" : "যেমন: মাওলানা শফিকুর রহমান (পিতা)"}
                  required
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                />
              </div>

              <div>
                <label className="label">{isEn ? 'Guardian Mobile Number *' : 'অভিভাবকের মোবাইল নম্বর *'}</label>
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
                  {isEn ? 'Residential Student (Hostel / Boarding)' : 'আবাসিক শিক্ষার্থী (হোস্টেল / বোর্ডিং)'}
                </label>
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
                  {isEn ? 'Complete Admission' : 'ভর্তি সম্পন্ন করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student ID Card Generation & Print Modal */}
      <StudentIdCardModal
        isOpen={showIdCardModal}
        onClose={() => setShowIdCardModal(false)}
        students={students}
        selectedStudentId={selectedIdCardStudentId}
        onUpdatePhoto={handlePhotoUpload}
      />
    </div>
  );
}
