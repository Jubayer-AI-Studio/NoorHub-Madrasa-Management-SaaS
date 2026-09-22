'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface KitabItem {
  id: string;
  name: string;
  originalName?: string;
  author: string;
  category: string;
  totalPages?: number;
  fullMarks?: number;
  summary: string;
  learningOutcomes?: string;
  classId: string;
  curriculumType: 'qawmi' | 'alia' | 'general' | 'hifz';
}

export interface ClassItem {
  id: string;
  name: string;
  curriculumType: 'qawmi' | 'alia' | 'general' | 'hifz';
  section?: string;
  classTeacher?: string;
  description: string;
}

const defaultClasses: ClassItem[] = [
  {
    id: 'c-qawmi-mizan',
    name: 'মিজান জামাত (ইবতেদায়ী)',
    curriculumType: 'qawmi',
    section: 'ক শাখা',
    classTeacher: 'মাওলানা মাহমুদ হাসান',
    description: 'আরবি ভাষার মৌলিক শব্দতত্ত্ব ও ফার্সি ব্যাকরণের প্রাথমিক জামাত।',
  },
  {
    id: 'c-qawmi-nahbemeer',
    name: 'নাহবেমীর জামাত',
    curriculumType: 'qawmi',
    section: 'ক শাখা',
    classTeacher: 'মাওলানা আবুল কালাম',
    description: 'আরবি ব্যাকরণ ও বাক্য গঠনের (ইলমুন নাহু) বুনিয়াদী জামাত।',
  },
  {
    id: 'c-qawmi-dawrah',
    name: 'দাওরায়ে হাদীস (তাকমীল)',
    curriculumType: 'qawmi',
    section: 'প্রধান জামাত',
    classTeacher: 'মুফতী আব্দুর রহমান',
    description: 'মাস্টার্স সমমান সর্বোচ্চ হাদিস শাস্ত্রের জামাত।',
  },
  {
    id: 'c-alia-dakhil',
    name: 'দাখিল ১০ম শ্রেণি (মাদরাসা বোর্ড)',
    curriculumType: 'alia',
    section: 'সাধারণ বিভাগ',
    classTeacher: 'মাওলানা আতিকুর রহমান',
    description: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ডের দাখিল সমাপনী পাবলিক পরীক্ষা শ্রেণি।',
  },
  {
    id: 'c-gen-class8',
    name: '৮ম শ্রেণি (জেনারেল স্কুল)',
    curriculumType: 'general',
    section: 'A শাখা',
    classTeacher: 'জনাব শফিকুল ইসলাম',
    description: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ডের (NCTB) নিম্ন-মাধ্যমিক শ্রেণি।',
  },
];

const defaultKitabs: KitabItem[] = [
  {
    id: 'k-1',
    classId: 'c-qawmi-mizan',
    curriculumType: 'qawmi',
    name: 'মিজানুস সরফ',
    originalName: 'ميزان الصرف',
    author: 'হযরত আল্লামা সিরাজুদ্দীন রহ.',
    category: 'ইলমুস সরফ (শব্দতত্ত্ব)',
    totalPages: 120,
    fullMarks: 100,
    summary:
      'মিজানুস সরফ হলো কওমি মাদরাসার শিক্ষার্থীদের আরবি ভাষা শেখার প্রথম ও প্রধান ভিত্তিগ্রন্থ। এই কিতাবের মাধ্যমে শিক্ষার্থীরা জানতে পারে কীভাবে একটি আরবি মূল ধাতু (মাছদার) থেকে অতীত কাল (মাজী), বর্তমান ও ভবিষ্যৎ কাল (মুজারে), আদেশ সূচক (আমর) এবং নিষেধ সূচক (নাহী) ক্রিয়া তৈরি হয়।',
    learningOutcomes:
      '১. আরবি শব্দের সিগাহ (রূপান্তর) শনাক্ত করার দক্ষতা।\n২. অতীত ও বর্তমান কালের বিভিন্ন পুংলিঙ্গ ও স্ত্রীলিঙ্গ সর্বনাম প্রয়োগ।\n৩. সহীহ ও মু’তাল শব্দের তারতম্য বোঝা।',
  },
  {
    id: 'k-2',
    classId: 'c-qawmi-dawrah',
    curriculumType: 'qawmi',
    name: 'সহীহ আল-বুখারী',
    originalName: 'الجامع المسند الصحيح المختصر',
    author: 'আমীরুল মুমিনীন ফিল হাদীস ইমাম মুহাম্মদ ইবনে ইসমাইল আল-বুখারী রহ.',
    category: 'হাদীস শাস্ত্র (সিহাহ সিত্তাহ)',
    totalPages: 1200,
    fullMarks: 100,
    summary:
      'পবিত্র কুরআনুল কারীমের পর সমগ্র মুসলিম উম্মাহর নিকট সর্বাধিক বিশুদ্ধতম ধর্মীয় গ্রন্থ। ইমাম বুখারী রহ. দীর্ঘ ১৬ বছর কঠোর সাধনায় ৬ লক্ষাধিক হাদিস থেকে যাচাই-বাছাই করে কেবল সর্বোচ্চ শর্তপূরণকারী সহীহ হাদিসসমূহ এতে সংকলন করেছেন। এতে ওহীর সূচনা থেকে শুরু করে ঈমান, সালাত, রোজা, হজ, যাকাত, ব্যবসা-বাণিজ্য ও রাষ্ট্র পরিচালনার যাবতীয় সুন্নাহ সন্নিবেশিত।',
    learningOutcomes:
      '১. রাসূলুল্লাহ (সা.)-এর সুন্নাহর বিশুদ্ধ সনদ ও মতন বিশ্লেষণ।\n২. ইমাম বুখারীর তারাজুমুল আবওয়াব (ফিকহী দৃষ্টিভঙ্গি) অনুধাবন।\n৩. চার মাযহাবের প্রখ্যাত ইমামগণের দলীলের সমন্বয় ও অগ্রাধিকার নির্ণয়।',
  },
  {
    id: 'k-3',
    classId: 'c-alia-dakhil',
    curriculumType: 'alia',
    name: 'আল-ফিকহ ও ফারায়েজ',
    originalName: 'الفقه الإسلامي وعلم الفرائض',
    author: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
    category: 'ইসলামি আইন ও উত্তরাধিকার',
    totalPages: 210,
    fullMarks: 100,
    summary:
      'দাখিল ১০ম শ্রেণির পাঠ্যবই। এটি শিক্ষার্থীদের ইসলামি শরীয়তের দৈনন্দিন বিধানাবলী এবং উত্তরাধিকারী সম্পত্তি বণ্টনের গাণিতিক বিজ্ঞান (ফারায়েজ) শিক্ষা দেয়। বইটিতে মুত্তাকী জীবনের জন্য হালাল-হারামের সীমারেখা অত্যন্ত প্রামাণ্যভাবে উপস্থাপন করা হয়েছে।',
    learningOutcomes:
      '১. ইবাদাত ও পারিবারিক শরিয়ত বিধানের সঠিক জ্ঞান।\n২. পিতা-মাতা, সন্তান ও আত্মীয়দের উত্তরাধিকার অংশের নির্ভুল হিসাব।\n৩. কুরআন ও হাদিসের আলোকে আধুনিক জীবনের ফিকহী সমাধান।',
  },
  {
    id: 'k-4',
    classId: 'c-gen-class8',
    curriculumType: 'general',
    name: 'English For Today',
    originalName: 'Communicative English Class 8',
    author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
    category: 'বিদেশী ভাষা ও সাহিত্য',
    totalPages: 160,
    fullMarks: 100,
    summary:
      'সাধারণ স্কুলের ৮ম শ্রেণির শিক্ষার্থীদের ইংরেজি ভাষা প্রয়োগের দক্ষতা বৃদ্ধির জন্য এনসিটিবি কর্তৃক প্রণীত। বিভিন্ন গল্প, কথোপকথন, সংস্কৃতি ও বৈজ্ঞানিক প্রবন্ধের মাধ্যমে শিক্ষার্থীদের রিডিং, রাইটিং, স্পিকিং ও লিসেনিং দক্ষতা মজবুত করা এই পাঠ্যবইয়ের লক্ষ্য।',
    learningOutcomes:
      '১. দৈনন্দিন বিষয়ে সাবলীল ইংরেজিতে যোগাযোগ করার সামর্থ্য।\n২. ব্যাকরণগত নির্ভুলতা ও সৃজনশীল রচনা লিখন।\n৩. বৈশ্বিক ভাষা হিসেবে ইংরেজির প্রায়োগিক ব্যবহারের আত্মবিশ্বাস।',
  },
];

// Preset Jamats to quick-load
const qawmiPresets: Array<{ name: string; desc: string }> = [
  { name: 'নূরানী ও মক্তব', desc: 'কুরআন শিক্ষা, কায়দা ও আমপারা' },
  { name: 'নাজেরা বিভাগ', desc: 'পূর্ণ কুরআন মাজিদ বিশুদ্ধ তেলাওয়াত' },
  { name: 'হিফজুল কুরআন', desc: '১-৩০ পারা হিফজ ও তাজভীদ' },
  { name: 'মিজান জামাত', desc: 'মিজান, মুন্শাআব, পাঞ্জেগাঞ্জ' },
  { name: 'নাহবেমীর জামাত', desc: 'নাহবেমীর, মিআতে আমেল, সরফ' },
  { name: 'হেদায়াতুন্নাহব জামাত', desc: 'হেদায়াতুন্নাহব, ইলমুস সীগাহ' },
  { name: 'কাফিয়া জামাত', desc: 'কাফিয়া, শরহে তাহজীব, কুদূরী' },
  { name: 'শরহে বেকায়া জামাত', desc: 'শরহে বেকায়া, উসুলুশ শাশী' },
  { name: 'জালালাইন জামাত', desc: 'তাফসীরে জালালাইন, মুখতাসার' },
  { name: 'মেশকাত জামাত', desc: 'মেশকাত শরীফ, হিদায়া' },
  { name: 'দাওরায়ে হাদীস (তাকমীল)', desc: 'বুখারী, মুসলিম, সিহাহ সিত্তাহ' },
];

export default function DynamicSyllabusPage() {
  const [classes, setClasses] = useState<ClassItem[]>(defaultClasses);
  const [kitabs, setKitabs] = useState<KitabItem[]>(defaultKitabs);
  const [activeCurriculum, setActiveCurriculum] = useState<'all' | 'qawmi' | 'alia' | 'general' | 'hifz'>('all');
  const [activeClassId, setActiveClassId] = useState<string>('c-qawmi-mizan');

  // Main Page View Mode: 'books' or 'class-manager'
  const [viewMode, setViewMode] = useState<'books' | 'class-manager'>('books');

  // Modal states
  const [viewingKitab, setViewingKitab] = useState<KitabItem | null>(null);
  const [showAddKitabModal, setShowAddKitabModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  // New Kitab form
  const [newKitab, setNewKitab] = useState({
    name: '',
    originalName: '',
    author: '',
    category: '',
    totalPages: 100,
    fullMarks: 100,
    summary: '',
    learningOutcomes: '',
  });

  // New Class form
  const [newClass, setNewClass] = useState({
    name: '',
    curriculumType: 'qawmi' as 'qawmi' | 'alia' | 'general' | 'hifz',
    section: 'ক শাখা',
    classTeacher: '',
    description: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedClasses = localStorage.getItem('noorhub_syllabus_classes');
      const savedKitabs = localStorage.getItem('noorhub_syllabus_kitabs');
      if (savedClasses) setClasses(JSON.parse(savedClasses));
      if (savedKitabs) setKitabs(JSON.parse(savedKitabs));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  const saveClasses = (updated: ClassItem[]) => {
    setClasses(updated);
    try {
      localStorage.setItem('noorhub_syllabus_classes', JSON.stringify(updated));
    } catch {}
  };

  const saveKitabs = (updated: KitabItem[]) => {
    setKitabs(updated);
    try {
      localStorage.setItem('noorhub_syllabus_kitabs', JSON.stringify(updated));
    } catch {}
  };

  const filteredClasses = classes.filter((c) =>
    activeCurriculum === 'all' ? true : c.curriculumType === activeCurriculum
  );

  const currentClass =
    classes.find((c) => c.id === activeClassId) || filteredClasses[0] || classes[0];

  const currentKitabs = kitabs.filter((k) => k.classId === currentClass?.id);

  // Add Kitab handler
  const handleCreateKitab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKitab.name || !newKitab.summary) return;

    const item: KitabItem = {
      id: `k-${Date.now()}`,
      classId: currentClass.id,
      curriculumType: currentClass.curriculumType,
      name: newKitab.name,
      originalName: newKitab.originalName || newKitab.name,
      author: newKitab.author || 'অজ্ঞাত / নির্ধারিত নয়',
      category: newKitab.category || 'সাধারণ বিষয়',
      totalPages: Number(newKitab.totalPages) || 100,
      fullMarks: Number(newKitab.fullMarks) || 100,
      summary: newKitab.summary,
      learningOutcomes: newKitab.learningOutcomes || 'শিক্ষার্থীদের বিষয়ভিত্তিক মৌলিক জ্ঞান বৃদ্ধি।',
    };

    const updated = [...kitabs, item];
    saveKitabs(updated);

    setNewKitab({
      name: '',
      originalName: '',
      author: '',
      category: '',
      totalPages: 100,
      fullMarks: 100,
      summary: '',
      learningOutcomes: '',
    });
    setShowAddKitabModal(false);
  };

  // Add Class handler
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name) return;

    const newClassItem: ClassItem = {
      id: `c-${Date.now()}`,
      name: newClass.name,
      curriculumType: newClass.curriculumType,
      section: newClass.section || 'ক শাখা',
      classTeacher: newClass.classTeacher || 'দায়িত্বপ্রাপ্ত শিক্ষক',
      description: newClass.description || 'প্রতিষ্ঠানের নিয়মিত পাঠ্যক্রম শ্রেণি।',
    };

    const updated = [...classes, newClassItem];
    saveClasses(updated);
    setActiveClassId(newClassItem.id);
    setNewClass({ name: '', curriculumType: 'qawmi', section: 'ক শাখা', classTeacher: '', description: '' });
    setShowAddClassModal(false);
  };

  // Load all standard Qawmi Jamats in 1-click
  const handleLoadQawmiPresets = () => {
    const existingNames = new Set(classes.map((c) => c.name));
    const newItems: ClassItem[] = [];
    qawmiPresets.forEach((p, idx) => {
      if (!existingNames.has(p.name)) {
        newItems.push({
          id: `c-qawmi-preset-${Date.now()}-${idx}`,
          name: p.name,
          curriculumType: 'qawmi',
          section: 'ক শাখা',
          classTeacher: 'দায়িত্বপ্রাপ্ত উস্তাদ',
          description: p.desc,
        });
      }
    });
    if (newItems.length > 0) {
      const updated = [...classes, ...newItems];
      saveClasses(updated);
      alert(`${newItems.length}টি কওমি জামাত সফলভাবে যুক্ত হয়েছে!`);
    } else {
      alert('সকল কওমি জামাত ইতিমধ্যে যুক্ত রয়েছে।');
    }
  };

  // Delete Kitab
  const handleDeleteKitab = (id: string) => {
    if (confirm('আপনি কি নিশ্চিতভাবে এই কিতাবটি সিলেবাস থেকে মুছে ফেলতে চান?')) {
      const updated = kitabs.filter((k) => k.id !== id);
      saveKitabs(updated);
      if (viewingKitab?.id === id) setViewingKitab(null);
    }
  };

  // Delete Class
  const handleDeleteClass = (classId: string, className: string) => {
    if (confirm(`আপনি কি "${className}" শ্রেণিটি এবং এর সকল কিতাব মুছে ফেলতে চান?`)) {
      const updatedClasses = classes.filter((c) => c.id !== classId);
      const updatedKitabs = kitabs.filter((k) => k.classId !== classId);
      saveClasses(updatedClasses);
      saveKitabs(updatedKitabs);
      if (activeClassId === classId && updatedClasses.length > 0) {
        setActiveClassId(updatedClasses[0].id);
      }
    }
  };

  // Printable View
  if (printMode && currentClass) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', background: '#ffffff', color: '#0f172a', fontFamily: 'Hind Siliguri, sans-serif' }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.25rem' }}>দারুল উলুম নূরানী ও কওমি মাদরাসা</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem' }}>অফিশিয়াল পাঠ্যক্রম ও কিতাবের তালিকা (Booklist) | শিক্ষাবর্ষ: ২০২৬-২০২৭</p>
          <div style={{ display: 'inline-block', background: '#f1f5f9', padding: '0.3rem 0.85rem', borderRadius: '4px', fontWeight: '700', fontSize: '1.05rem', border: '1px solid #cbd5e1' }}>
            {currentClass.name} — সিলেবাস ও বইয়ের বিবরণ
          </div>
        </div>

        {currentKitabs.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>এই শ্রেণিতে এখনো কোনো কিতাব যুক্ত করা হয়নি।</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
            {currentKitabs.map((k, idx) => (
              <div key={k.id} style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: '800', fontSize: '1rem' }}>
                      {idx + 1}. {k.name}
                    </span>
                    {k.originalName && k.originalName !== k.name && (
                      <span style={{ marginLeft: '0.5rem', color: '#2563eb', fontWeight: '600' }}>({k.originalName})</span>
                    )}
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      মুসান্নিফ/লেখক: <strong>{k.author}</strong> | শাস্ত্র: <strong>{k.category}</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                    <div>পূর্ণমান: <strong>{k.fullMarks} নম্বর</strong></div>
                    <div style={{ color: '#64748b' }}>মোট পৃষ্ঠা: {k.totalPages}</div>
                  </div>
                </div>

                <div>
                  <strong style={{ fontSize: '0.825rem', color: '#0f172a' }}>বইয়ের সারসংক্ষেপ ও কেন পড়ানো হয়:</strong>
                  <p style={{ fontSize: '0.825rem', color: '#334155', lineHeight: '1.5', marginTop: '0.2rem' }}>{k.summary}</p>
                </div>

                {k.learningOutcomes && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#16a34a' }}>শিক্ষার্থীর অর্জিত যোগ্যতা:</strong>
                    <div style={{ fontSize: '0.8rem', color: '#475569', whiteSpace: 'pre-line', marginTop: '0.15rem' }}>
                      {k.learningOutcomes}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ textAlign: 'center', width: '160px', borderTop: '1px solid #000', paddingTop: '0.4rem', fontSize: '0.8rem' }}>
            শিক্ষা সচিব
          </div>
          <div style={{ textAlign: 'center', width: '160px', borderTop: '1px solid #000', paddingTop: '0.4rem', fontSize: '0.8rem' }}>
            মুহতামিম / প্রধান শিক্ষক
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => window.print()}
            style={{ background: '#16a34a', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}
          >
            প্রিন্ট করুন (Print / PDF)
          </button>
          <button
            onClick={() => setPrintMode(false)}
            style={{ background: '#e2e8f0', color: '#0f172a', padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
          >
            ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '64rem', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.825rem' }}>
              ড্যাশবোর্ড
            </Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.825rem' }}>সিলেবাস ও কিতাব সারসংক্ষেপ</span>
          </div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            শ্রেণি, সিলেবাস ও কিতাব হাব
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#64748b' }}>
            নতুন জামাত/শ্রেণি এন্ট্রি করুন এবং যে কোনো ক্লাসে যত ইচ্ছা কিতাব যুক্ত করে দর্শনার্থীদের বিস্তারিত সারসংক্ষেপ পড়তে দিন
          </p>
        </div>

        {/* PROMINENT TOP ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* 1. Add Class Button (PROMINENT BLUE) */}
          <button
            onClick={() => setShowAddClassModal(true)}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.85rem',
              padding: '0.5rem 0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
            + নতুন শ্রেণি / জামাত এন্ট্রি
          </button>

          {/* 2. Add Kitab Button (PROMINENT GREEN) */}
          <button
            onClick={() => setShowAddKitabModal(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <line x1="12" y1="8" x2="12" y2="14" />
              <line x1="9" y1="11" x2="15" y2="11" />
            </svg>
            + কিতাব / বই যোগ করুন
          </button>

          {/* 3. Print Button */}
          <button
            onClick={() => setPrintMode(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            সিলেবাস প্রিন্ট
          </button>
        </div>
      </div>

      {/* VIEW SWITCHER TABS: [পাঠ্য কিতাব ও সামারি ভিউ] vs [শ্রেণি ও জামাত ডিরেক্টরি (নতুন এন্ট্রি)] */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <button
          onClick={() => setViewMode('books')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'books' ? '3px solid #16a34a' : '3px solid transparent',
            color: viewMode === 'books' ? '#16a34a' : '#64748b',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontWeight: '700',
            fontSize: '0.95rem',
            padding: '0.6rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          পাঠ্য কিতাব ও সারসংক্ষেপ ভিউ
        </button>

        <button
          onClick={() => setViewMode('class-manager')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'class-manager' ? '3px solid #2563eb' : '3px solid transparent',
            color: viewMode === 'class-manager' ? '#2563eb' : '#64748b',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontWeight: '700',
            fontSize: '0.95rem',
            padding: '0.6rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          সকল শ্রেণি ও জামাত ব্যবস্থাপনা ({classes.length}টি শ্রেণি)
        </button>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: BOOKS & SUMMARIES                                */}
      {/* ======================================================== */}
      {viewMode === 'books' && (
        <>
          {/* Public Notice Card */}
          <div
            className="card"
            style={{
              padding: '0.85rem 1.1rem',
              marginBottom: '1rem',
              background: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#1e40af', lineHeight: '1.5', margin: 0 }}>
              <strong>দর্শনার্থী ও সাধারণ অভিভাবকদের জন্য উন্মুক্ত:</strong> বাইরের যে কেউ যেকোনো কিতাবের উপর ট্যাপ করলেই সেই কিতাবে কী পড়ানো হচ্ছে, কেন পড়ানো হচ্ছে এবং ছাত্ররা কী শিখবে—তার প্রাঞ্জল সারসংক্ষেপ ও রূপরেখা পড়তে পারবেন।
            </p>
          </div>

          {/* Curriculum Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
            {[
              { id: 'all', label: 'সকল কারিকুলাম' },
              { id: 'qawmi', label: 'কওমি নেজামী' },
              { id: 'alia', label: 'আলিয়া মাদরাসা' },
              { id: 'general', label: 'জেনারেল স্কুল' },
              { id: 'hifz', label: 'হিফজুল কুরআন' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCurriculum(tab.id as any)}
                style={{
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontSize: '0.825rem',
                  fontWeight: activeCurriculum === tab.id ? '700' : '500',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '999px',
                  border: activeCurriculum === tab.id ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                  background: activeCurriculum === tab.id ? '#f0fdf4' : '#ffffff',
                  color: activeCurriculum === tab.id ? '#16a34a' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Classes Selector with BIG prominent "+ Add Class" button */}
          <div className="card" style={{ padding: '0.85rem', marginBottom: '1.25rem', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                শ্রেণি বা জামাত সিলেক্ট করুন ({filteredClasses.length}টি শ্রেণি উপলব্ধ):
              </span>

              {/* Explicit link to add new class */}
              <button
                onClick={() => setShowAddClassModal(true)}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '6px',
                  color: '#2563eb',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.6rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                + নতুন শ্রেণি এন্ট্রি করুন
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', alignItems: 'center' }}>
              {/* Highlighted "+ শ্রেণি তৈরি" button directly in the pills row */}
              <button
                onClick={() => setShowAddClassModal(true)}
                style={{
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontSize: '0.825rem',
                  fontWeight: '700',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px dashed #2563eb',
                  background: '#f8fafc',
                  color: '#2563eb',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                + নতুন জামাত/শ্রেণি
              </button>

              {filteredClasses.map((c) => {
                const count = kitabs.filter((k) => k.classId === c.id).length;
                const isSelected = activeClassId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveClassId(c.id)}
                    style={{
                      fontFamily: 'Hind Siliguri, sans-serif',
                      fontSize: '0.825rem',
                      fontWeight: isSelected ? '700' : '600',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      background: isSelected ? '#f0fdf4' : '#ffffff',
                      color: isSelected ? '#15803d' : '#334155',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      flexShrink: 0,
                    }}
                  >
                    {c.name}
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '999px',
                        background: isSelected ? '#dcfce7' : '#f1f5f9',
                        color: isSelected ? '#166534' : '#64748b',
                        fontWeight: '700',
                      }}
                    >
                      {count} বই
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Class Banner */}
          {currentClass && (
            <div
              className="card"
              style={{
                padding: '1rem',
                marginBottom: '1.25rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderLeft: '4px solid #16a34a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {currentClass.name}
                  </h2>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '999px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                    {currentClass.curriculumType === 'qawmi'
                      ? 'কওমি'
                      : currentClass.curriculumType === 'alia'
                      ? 'আলিয়া'
                      : currentClass.curriculumType === 'general'
                      ? 'জেনারেল'
                      : 'হিফজ'}
                  </span>
                  {currentClass.section && (
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>
                      শাখা: {currentClass.section}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>
                  {currentClass.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowAddKitabModal(true)}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                >
                  + এই শ্রেণিতে কিতাব যোগ করুন
                </button>
              </div>
            </div>
          )}

          {/* Kitabs List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
                নির্ধারিত পাঠ্য কিতাব ও বিষয়সমূহ ({currentKitabs.length}টি)
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                যেকোনো কিতাবে ট্যাপ করে পূর্ণাঙ্গ সারসংক্ষেপ পড়ুন
              </span>
            </div>

            {currentKitabs.length === 0 ? (
              <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: '#ffffff' }}>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem' }}>
                  এই শ্রেণিতে এখনও কোনো কিতাব যুক্ত করা হয়নি। আপনি আপনার মাদরাসার কিতাবের নাম ও সামারি দিয়ে যোগ করতে পারেন।
                </p>
                <button
                  onClick={() => setShowAddKitabModal(true)}
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  + প্রথম কিতাব যুক্ত করুন
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.85rem' }}>
                {currentKitabs.map((kitab) => (
                  <div
                    key={kitab.id}
                    className="card"
                    style={{
                      padding: '1.1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: '3px solid #16a34a',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onClick={() => setViewingKitab(kitab)}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: '#f1f5f9', color: '#475569', fontWeight: '600' }}>
                          {kitab.category}
                        </span>
                        <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#16a34a', background: '#f0fdf4', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {kitab.fullMarks} নম্বর
                        </span>
                      </div>

                      <h4 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.15rem' }}>
                        {kitab.name}
                      </h4>
                      {kitab.originalName && kitab.originalName !== kitab.name && (
                        <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: '600', marginBottom: '0.35rem', direction: 'rtl', textAlign: 'right' }}>
                          {kitab.originalName}
                        </div>
                      )}

                      <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '0.6rem' }}>
                        মুসান্নিফ/লেখক: <strong>{kitab.author}</strong>
                      </p>

                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#475569',
                          lineHeight: '1.5',
                          marginBottom: '0.85rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {kitab.summary}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingKitab(kitab);
                        }}
                        style={{
                          background: '#f0fdf4',
                          color: '#16a34a',
                          border: '1px solid #bbf7d0',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        সারসংক্ষেপ পড়ুন
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteKitab(kitab.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          padding: '0.35rem',
                        }}
                        title="মুছে ফেলুন"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: CLASS & JAMAT DIRECTORY & INLINE ADD             */}
      {/* ======================================================== */}
      {viewMode === 'class-manager' && (
        <div>
          {/* Quick Preset Actions */}
          <div
            className="card"
            style={{
              padding: '1.25rem',
              marginBottom: '1.5rem',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
                দ্রুত শ্রেণি ও জামাত লোডার
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                এক ক্লিকে সকল কওমি জামাত (নূরানী হতে দাওরায়ে হাদিস) সিস্টেমে যুক্ত করে নিতে পারেন
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleLoadQawmiPresets}
                style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  color: '#16a34a',
                  fontWeight: '700',
                  fontFamily: 'Hind Siliguri, sans-serif',
                  fontSize: '0.825rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                কওমির সকল জামাত একসাথে আনুন
              </button>

              <button
                onClick={() => setShowAddClassModal(true)}
                className="btn btn-primary"
                style={{ fontSize: '0.825rem', padding: '0.5rem 0.85rem' }}
              >
                + ম্যানুয়াল নতুন শ্রেণি তৈরি
              </button>
            </div>
          </div>

          {/* Inline Add Class Form Card */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
              নতুন শ্রেণি / জামাত এন্ট্রি ফর্ম
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              মাদরাসা বা স্কুলের যেকোনো নতুন শ্রেণি নিচের তথ্য পূরণ করে তাৎক্ষণিক যুক্ত করুন
            </p>

            <form onSubmit={handleCreateClass} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  শ্রেণি / জামাতের নাম *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: কাফিয়া জামাত / দাখিল ৯ম"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  কারিকুলাম ধরণ
                </label>
                <select
                  className="input-field"
                  value={newClass.curriculumType}
                  onChange={(e) => setNewClass({ ...newClass, curriculumType: e.target.value as any })}
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="qawmi">কওমি নেজামী</option>
                  <option value="alia">আলিয়া মাদরাসা</option>
                  <option value="general">জেনারেল স্কুল</option>
                  <option value="hifz">হিফজুল কুরআন</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  শাখা (Section)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: ক শাখা / বালক শাখা"
                  value={newClass.section}
                  onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  দায়িত্বপ্রাপ্ত শিক্ষক / উস্তাদ
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: মাওলানা আতিকুর রহমান"
                  value={newClass.classTeacher}
                  onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  শ্রেণির উদ্দেশ্য বা সংক্ষিপ্ত বিবরণ
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: শিক্ষার্থীদের আরবি ব্যাকরণ ও হাদিসের প্রামাণ্য জ্ঞান অর্জন..."
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.55rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  শ্রেণি সেভ করুন
                </button>
              </div>
            </form>
          </div>

          {/* All Classes List Table */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              বর্তমান সকল শ্রেণি ও জামাত তালিকা ({classes.length}টি)
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '0.6rem', color: '#64748b' }}>শ্রেণি / জামাত</th>
                    <th style={{ padding: '0.6rem', color: '#64748b' }}>কারিকুলাম</th>
                    <th style={{ padding: '0.6rem', color: '#64748b' }}>শাখা</th>
                    <th style={{ padding: '0.6rem', color: '#64748b' }}>দায়িত্বপ্রাপ্ত শিক্ষক</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center', color: '#64748b' }}>কিতাব সংখ্যা</th>
                    <th style={{ padding: '0.6rem', textAlign: 'center', color: '#64748b' }}>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => {
                    const kCount = kitabs.filter((k) => k.classId === cls.id).length;
                    return (
                      <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.65rem', fontWeight: '700', color: '#0f172a' }}>
                          {cls.name}
                          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal' }}>
                            {cls.description}
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem' }}>
                          <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', fontWeight: '700', border: '1px solid #bbf7d0' }}>
                            {cls.curriculumType === 'qawmi'
                              ? 'কওমি'
                              : cls.curriculumType === 'alia'
                              ? 'আলিয়া'
                              : cls.curriculumType === 'general'
                              ? 'জেনারেল'
                              : 'হিফজ'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem', color: '#475569' }}>{cls.section || '—'}</td>
                        <td style={{ padding: '0.65rem', color: '#2563eb', fontWeight: '600' }}>
                          {cls.classTeacher || '—'}
                        </td>
                        <td style={{ padding: '0.65rem', textAlign: 'center', fontWeight: '700', color: '#0f172a' }}>
                          {kCount}টি কিতাব
                        </td>
                        <td style={{ padding: '0.65rem', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => {
                                setActiveClassId(cls.id);
                                setViewMode('books');
                              }}
                              style={{
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                color: '#2563eb',
                                borderRadius: '4px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              বই দেখুন
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls.id, cls.name)}
                              style={{
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                                borderRadius: '4px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              মুছুন
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL: Interactive Book Summary                    */}
      {/* ======================================================== */}
      {viewingKitab && (
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
          onClick={() => setViewingKitab(null)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '36rem',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                  {viewingKitab.category}
                </span>
                <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0 0.1rem' }}>
                  {viewingKitab.name}
                </h3>
                {viewingKitab.originalName && viewingKitab.originalName !== viewingKitab.name && (
                  <div style={{ fontSize: '0.95rem', color: '#2563eb', fontWeight: '600', direction: 'rtl', textAlign: 'left' }}>
                    {viewingKitab.originalName}
                  </div>
                )}
              </div>

              <button
                onClick={() => setViewingKitab(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Book Meta Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>মুসান্নিফ / লেখক</div>
                <div style={{ fontSize: '0.825rem', fontWeight: '700', color: '#0f172a' }}>{viewingKitab.author}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>মোট পৃষ্ঠা</div>
                <div style={{ fontSize: '0.825rem', fontWeight: '700', color: '#2563eb' }}>{viewingKitab.totalPages || '—'} পৃষ্ঠা</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>পূর্ণমান</div>
                <div style={{ fontSize: '0.825rem', fontWeight: '700', color: '#16a34a' }}>{viewingKitab.fullMarks || 100} নম্বর</div>
              </div>
            </div>

            {/* The Summary Section */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                বইটির বিস্তারিত সারসংক্ষেপ ও উদ্দেশ্য:
              </h4>
              <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-line', background: '#fafafa', padding: '0.85rem', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                {viewingKitab.summary}
              </p>
            </div>

            {/* Learning Outcomes */}
            {viewingKitab.learningOutcomes && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  এই কিতাব থেকে শিক্ষার্থীরা কী শিখবে?
                </h4>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-line', background: '#eff6ff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                  {viewingKitab.learningOutcomes}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
              <button
                onClick={() => handleDeleteKitab(viewingKitab.id)}
                style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                মুছে ফেলুন
              </button>
              <button
                onClick={() => setViewingKitab(null)}
                className="btn btn-secondary"
                style={{ fontSize: '0.825rem', padding: '0.5rem 1.25rem' }}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL: Add Custom Kitab                            */}
      {/* ======================================================== */}
      {showAddKitabModal && (
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
          onClick={() => setShowAddKitabModal(false)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '34rem',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                নতুন কিতাব / পাঠ্যবই যোগ করুন
              </h3>
              <button
                onClick={() => setShowAddKitabModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              শ্রেণি: <strong>{currentClass?.name}</strong>
            </p>

            <form onSubmit={handleCreateKitab} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  কিতাব / বইয়ের নাম (বাংলায়) *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: নাহবেমীর / গণিত / শরহে বেকায়া"
                  value={newKitab.name}
                  onChange={(e) => setNewKitab({ ...newKitab, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  মূল আরবি / ইংরেজি নাম (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: نحو مير"
                  value={newKitab.originalName}
                  onChange={(e) => setNewKitab({ ...newKitab, originalName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', direction: 'rtl' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    মুসান্নিফ / লেখক / বোর্ড
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="যেমন: মীর সাইয়্যেদ শরীফ রহ."
                    value={newKitab.author}
                    onChange={(e) => setNewKitab({ ...newKitab, author: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    শাস্ত্র / বিষয়
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="যেমন: ইলমুন নাহু / ফিকহ"
                    value={newKitab.category}
                    onChange={(e) => setNewKitab({ ...newKitab, category: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    মোট পৃষ্ঠা সংখ্যা
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={newKitab.totalPages}
                    onChange={(e) => setNewKitab({ ...newKitab, totalPages: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    পরীক্ষার পূর্ণমান
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={newKitab.fullMarks}
                    onChange={(e) => setNewKitab({ ...newKitab, fullMarks: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  বইটির বিস্তারিত সারসংক্ষেপ (Summary) *
                  <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#64748b', marginLeft: '0.35rem' }}>
                    (বাইরের মানুষ ট্যাপ করলে যা দেখতে পাবে)
                  </span>
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="এই কিতাবে কী পড়ানো হয়? কেন পড়ানো হয়? এর বিষয়বস্তু কী..."
                  value={newKitab.summary}
                  onChange={(e) => setNewKitab({ ...newKitab, summary: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  এই কিতাব থেকে শিক্ষার্থীরা কী শিখবে? (আউটকাম)
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder="১. বাক্য বিশ্লেষণের নিয়ম...&#10;২. শব্দ ব্যবহারের যোগ্যতা..."
                  value={newKitab.learningOutcomes}
                  onChange={(e) => setNewKitab({ ...newKitab, learningOutcomes: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddKitabModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL: Add Custom Class                            */}
      {/* ======================================================== */}
      {showAddClassModal && (
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
          onClick={() => setShowAddClassModal(false)}
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
                নতুন শ্রেণি / জামাত এন্ট্রি
              </h3>
              <button
                onClick={() => setShowAddClassModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748b' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              কওমি, আলিয়া, হিফজ বা স্কুলের জন্য যেকোনো নতুন শ্রেণি তৈরি করুন
            </p>

            <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  শ্রেণি বা জামাতের নাম *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: কাফিয়া জামাত / ৭ম শ্রেণি / হিফজ ১ম বিভাগ"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    কারিকুলাম সিলেক্ট করুন:
                  </label>
                  <select
                    className="input-field"
                    value={newClass.curriculumType}
                    onChange={(e) => setNewClass({ ...newClass, curriculumType: e.target.value as any })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="qawmi">কওমি নেজামী</option>
                    <option value="alia">আলিয়া মাদরাসা</option>
                    <option value="general">জেনারেল স্কুল</option>
                    <option value="hifz">হিফজুল কুরআন</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    শাখা (Section)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="যেমন: ক শাখা / বালক শাখা"
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  দায়িত্বপ্রাপ্ত শিক্ষক / শ্রেণি উস্তাদ
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: মাওলানা মাহমুদ হাসান"
                  value={newClass.classTeacher}
                  onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  শ্রেণির উদ্দেশ্য বা সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder="এই শ্রেণির শিক্ষার্থীদের লক্ষ্য ও পাঠ্যক্রমের সংক্ষিপ্ত বিবরণ..."
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  শ্রেণি এন্ট্রি সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
