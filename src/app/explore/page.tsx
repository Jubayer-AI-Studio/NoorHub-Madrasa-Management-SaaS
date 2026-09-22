'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface InstitutionProfile {
  id: string;
  name: string;
  type: 'qawmi' | 'alia' | 'hifz' | 'general';
  typeLabel: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  established: number;
  principal: string;
  phone: string;
  whatsapp: string;
  students: number;
  teachers: number;
  passRate: number;
  rating: number;
  isVerified: boolean;
  highlights: string[];
  facilities: string[];
  classesTaught: Array<{
    className: string;
    description: string;
    kitabs: Array<{
      name: string;
      originalName?: string;
      category: string;
      summary: string;
    }>;
  }>;
}

const INSTITUTIONS_DATA: InstitutionProfile[] = [
  {
    id: 'inst-1',
    name: 'দারুল উলুম নূরানী ও কওমি মাদরাসা ঢাকা',
    type: 'qawmi',
    typeLabel: 'কওমি কিতাব, হিফজ ও ইফতা',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'বাড্ডা',
    address: 'প্লট নং ১২, রোড নং ৪, আফতাবনগর, বাড্ডা, ঢাকা-১২১২',
    established: 1998,
    principal: 'মাওলানা মুফতী আব্দুর রহমান কাসেমী',
    phone: '01811223344',
    whatsapp: '8801811223344',
    students: 850,
    teachers: 34,
    passRate: 98.5,
    rating: 4.9,
    isVerified: true,
    highlights: [
      'সহীহ বুখারী ও সিহাহ সিত্তাহ হাদীসের উচ্চতর সনদপ্রাপ্ত শায়খুল হাদিসগণের প্রত্যক্ষ তদারকি',
      'আন্তর্জাতিক হিফজুল কুরআন বিভাগ ও মিশরী ক্বারীদের তাজভীদ প্রশিক্ষণ',
      'দুর্বল শিক্ষার্থীদের জন্য সান্ধ্যকালীন বিশেষ মুতালাআ ও আলাদা শিক্ষক যত্ন',
      'সম্পূর্ণ রাজনীতিমুক্ত, সুশৃঙ্খল ও আমলী পরিবেশ',
      'গরিব ও এতিম শিক্ষার্থীদের ১০০% বিনামূল্যে থাকা-খাওয়া ও কিতাব সরবরাহ',
    ],
    facilities: [
      'শীতাতপ নিয়ন্ত্রিত (AC) আধুনিক হিফজখানা',
      'স্বাস্থ্যসম্মত ও পুষ্টিকর ৩ বেলা খাবারের ব্যবস্থা',
      '১০ হাজার কিতাব সমৃদ্ধ বিশাল কুতুবখানা (লাইব্রেরি)',
      '২৪ ঘণ্টা সিসিটিভি ক্যামেরা ও সার্বক্ষণিক নিরাপত্তা',
      'জরুরি প্রাথমিক চিকিৎসা ও নিয়মিত ডাক্তারের সেবা',
    ],
    classesTaught: [
      {
        className: 'দাওরায়ে হাদীস (তাকমীল)',
        description: 'মাস্টার্স সমমান সর্বোচ্চ হাদিস শাস্ত্রের জামাত।',
        kitabs: [
          {
            name: 'সহীহ আল-বুখারী (১ম ও ২য় খণ্ড)',
            originalName: 'صحيح البخاري',
            category: 'হাদীস শাস্ত্র',
            summary: 'কুরআনুল কারীমের পর সর্বাধিক বিশুদ্ধতম হাদিস গ্রন্থ। এতে ওহীর সূচনা, ঈমান, সালাত, রোজা, লেনদেন ও বিশ্বনবী (সা.)-এর পবিত্র সুন্নাহর পূর্ণাঙ্গ ভাণ্ডার সংরক্ষিত।',
          },
          {
            name: 'সহীহ মুসলিম শরীফ',
            originalName: 'صحيح مسلم',
            category: 'হাদীস শাস্ত্র',
            summary: 'ইমাম মুসলিম নিশাপুরী রহ. কর্তৃক সংকলিত অতি বিশুদ্ধ হাদীস সংকলন, যাতে মুকাদ্দিমা সহ সনদ ও মতন সুবিন্যস্ত।',
          },
        ],
      },
      {
        className: 'মিজান ও নাহবেমীর জামাত',
        description: 'আরবি ব্যাকরণ ও শব্দরূপ তত্ত্বের বুনিয়াদী ক্লাস।',
        kitabs: [
          {
            name: 'মিজানুস সরফ ও মুন্শাআব',
            originalName: 'ميزان الصرف ومنشعب',
            category: 'ইলমুস সরফ',
            summary: 'আরবি শব্দরূপ ও ধাতুরূপের প্রাথমিক গ্রন্থ। মূল বর্ণ থেকে অতীত, বর্তমান ও ভবিষ্যৎ ক্রিয়া তৈরির নিয়ম শেখানো হয়।',
          },
          {
            name: 'নাহবেমীর',
            originalName: 'نحو مير',
            category: 'ইলমুন নাহু',
            summary: 'আরবি বাক্য গঠন, ব্যাকরণ ও ইয়ারাবের নিয়ম শেখার মূল কিতাব।',
          },
        ],
      },
      {
        className: 'হিফজুল কুরআন বিভাগ',
        description: 'আন্তর্জাতিক মানসম্মত তাজভীদ সহ ১-৩০ পারা মুখস্থকরণ।',
        kitabs: [
          {
            name: 'পবিত্র কুরআনুল কারীম (১-৩০ পারা)',
            originalName: 'القرآن الكريم',
            category: 'হিফজ ও তাজভীদ',
            summary: 'দৈনিক সবক, সবকি ও আমুখতার মাধ্যমে সম্পূর্ণ কুরআন হিফজ সম্পন্ন করা হয়।',
          },
        ],
      },
    ],
  },
  {
    id: 'inst-2',
    name: 'আল-জামিয়া আল-ইসলামিয়া পটিয়া',
    type: 'qawmi',
    typeLabel: 'ঐতিহ্যবাহী কওমি বিশ্ববিদ্যালয়',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    upazila: 'পটিয়া',
    address: 'পটিয়া পৌরসভা, চট্টগ্রাম',
    established: 1938,
    principal: 'মাওলানা ওবায়দুল্লাহ হামযাহ',
    phone: '01712345678',
    whatsapp: '8801712345678',
    students: 2450,
    teachers: 95,
    passRate: 99.1,
    rating: 4.9,
    isVerified: true,
    highlights: [
      'উপমহাদেশের অন্যতম প্রাচীন ও প্রখ্যাত ইসলামি বিদ্যাপীঠ',
      'তাফসীর, হাদীস ও ফতোয়া বিভাগের শীর্ষস্থানীয় পণ্ডিতগণের সমাবেশ',
      'আন্তর্জাতিক আরবি ভাষা ও সাহিত্য চর্চাকেন্দ্র',
      'জাতীয় পর্যায়ে ধারাবাহিক ১ম স্থান অধিকারের দীর্ঘ ঐতিহ্য',
    ],
    facilities: [
      'বিশাল অডিটোরিয়াম ও কেন্দ্রীয় জামে মসজিদ',
      'আধুনিক আরবি ভাষা ইনস্টিটিউট',
      '৫০ শয্যা বিশিষ্ট নিজস্ব দাতব্য চিকিৎসালয়',
      '৫০,০০০ এর অধিক দুর্লভ পান্ডুলিপি সমৃদ্ধ কেন্দ্রীয় পাঠাগার',
    ],
    classesTaught: [
      {
        className: 'উচ্চতর গবেষণা (ইফতা ও উলুমুল হাদিস)',
        description: 'দাওরায়ে হাদিস উত্তীর্ণ শিক্ষার্থীদের সমসাময়িক ফতোয়া ও হাদিস গবেষণা।',
        kitabs: [
          {
            name: 'রদ্দুল মুহতার (ফতোয়ায়ে শামী)',
            originalName: 'رد المحتار على الدر المختار',
            category: 'উচ্চতর ফিকহ ও ফতোয়া',
            summary: 'হানাফী ফিকহের সর্বোচ্চ প্রামাণ্য বিশ্বকোষ। সমসাময়িক আর্থিক ও সামাজিক মাসায়িলের নির্ভরযোগ্য সমাধান এতে বিদ্যমান।',
          },
        ],
      },
      {
        className: 'দাওরায়ে হাদীস জামাত',
        description: 'সিহাহ সিত্তাহর ১০টি মূল কিতাব পাঠদান।',
        kitabs: [
          {
            name: 'জামেউত তিরমিযী ও সুনানে আবু দাউদ',
            originalName: 'جامع الترمذي وسنن أبي داود',
            category: 'হাদীস ও ফিকহের তুলনামূলক বিশ্লেষণ',
            summary: 'চার মাযহাবের ইমামদের দলীলের গভীর পর্যালোচনা ও আইনি হাদিসতত্ত্ব।',
          },
        ],
      },
    ],
  },
  {
    id: 'inst-3',
    name: 'দারুল উলুম দেওবন্দ মডেল হিফজ একাডেমি',
    type: 'hifz',
    typeLabel: 'বিশেষায়িত হিফজুল কুরআন',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'উত্তরা',
    address: 'সেক্টর ৪, রোড ৭, উত্তরা, ঢাকা-১২৩০',
    established: 2015,
    principal: 'হাফেজ ক্বারী আবু ইউসুফ',
    phone: '01911998877',
    whatsapp: '8801911998877',
    students: 380,
    teachers: 18,
    passRate: 99.5,
    rating: 4.9,
    isVerified: true,
    highlights: [
      'মাত্র ২ থেকে আড়াই বছরে পূর্ণ ৩০ পারা হিফজ সম্পন্ন করার আধুনিক ট্র্যাক রেকর্ড',
      'আন্তর্জাতিক হিফজ প্রতিযোগিতায় জাতীয় পুরস্কারপ্রাপ্ত হাফেজদের সরাসরি প্রশিক্ষণ',
      'হিফজের পাশাপাশি প্রাথমিক বাংলা, ইংরেজি ও গণিত শিক্ষা বাধ্যতামূলক',
      'অভিভাবকদের প্রতিদিনের সবক ও অগ্রগতির ডিজিটাল লাইভ ট্র্যাকিং রিপোর্ট',
    ],
    facilities: [
      'সম্পূর্ণ শীতাতপ নিয়ন্ত্রিত ক্যাস্পাস ও সাউন্ডপ্রুফ হিফজ কক্ষ',
      'অভিভাবকদের জন্য সার্বক্ষণিক লাইভ সিসিটিভি মনিটরিং অ্যাপ',
      'বিশেষ শিশু মনস্তাত্ত্বিক কাউন্সিলিং ও স্নেহের পরিবেশ',
      'স্বাস্থ্যকর জৈব খাবার ও বিশেষজ্ঞ পুষ্টিবিদ কর্তৃক নির্ধারিত মেনু',
    ],
    classesTaught: [
      {
        className: 'হিফজ প্রাথমিক ও মধ্যম স্তর',
        description: 'নাজেরা সম্পন্নকারীদের জন্য দৈনিক ১ থেকে ৩ পৃষ্ঠা সবক মুখস্থ।',
        kitabs: [
          {
            name: 'হিফজুল কুরআনুল কারীম',
            originalName: 'تحفيظ القرآن الكريم',
            category: 'হিফজুল কুরআন',
            summary: '১ম পারা হতে ১৫তম পারা পর্যন্ত তাজভীদের সঠিক মাখরাজ সহ মুখস্থকরণ।',
          },
        ],
      },
      {
        className: 'দৌর ও মুরাফাআ (হিফজ সমাপনী)',
        description: 'আন্তর্জাতিক প্রতিযোগিতার উপযোগী করে ৩০ পারা ইয়াদ রাখা।',
        kitabs: [
          {
            name: 'তুহফাতুল আতফাল ও জাযারিয়া',
            originalName: 'تحفة الأطفال والجزرية',
            category: 'তাজভীদ বিজ্ঞান',
            summary: 'কুরআন তেলাওয়াতের বাধ্যতামূলক তাজভীদের ছন্দোবদ্ধ নীতি ও অনুশাসন।',
          },
        ],
      },
    ],
  },
  {
    id: 'inst-4',
    name: 'তা’মীরুল মিল্লাত কামিল মাদরাসা',
    type: 'alia',
    typeLabel: 'আলিয়া শিক্ষা বোর্ড ও কামিল',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'মিরপুর',
    address: 'মিরপুর-১, ঢাকা-১২১৬',
    established: 1982,
    principal: 'ড. মাওলানা আবু সাঈদ নোমান',
    phone: '01833445566',
    whatsapp: '8801833445566',
    students: 3200,
    teachers: 110,
    passRate: 97.8,
    rating: 4.8,
    isVerified: true,
    highlights: [
      'ইসলামি শিক্ষা ও আধুনিক বিজ্ঞান শিক্ষার সুষম মেলবন্ধন',
      'দাখিল ও আলিম পরীক্ষায় প্রতি বছর শতভাগ জিপিএ-৫ এর গৌরবময় ফলাফল',
      'ইসলামি বিশ্ববিদ্যালয়ের অধীনে ফাজিল ও কামিল (অনার্স ও মাস্টার্স) কোর্স',
      'আইসিটি ল্যাব ও সমৃদ্ধ বিজ্ঞান গবেষণাগার',
    ],
    facilities: [
      'হাই-স্পিড ইন্টারনেট সহ আধুনিক ডিজিটাল আইসিটি ল্যাব',
      'পদার্থ, রসায়ন ও জীববিজ্ঞানের পৃথক ব্যবহারিক ল্যাব',
      'বিশাল খেলার মাঠ ও শারীরিক কসরত সুবিধা',
      'ছাত্রদের জন্য নিজস্ব পরিবহন বাস সার্ভিস',
    ],
    classesTaught: [
      {
        className: 'দাখিল ৯ম ও ১০ম শ্রেণি (বিজ্ঞান ও সাধারণ)',
        description: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ডের সরকারি পাঠ্যক্রম।',
        kitabs: [
          {
            name: 'কুরআন মাজিদ, হাদিস শরিফ ও ফিকহ',
            category: 'ইসলামিয়াত',
            summary: 'বোর্ডের অনুমোদিত তাফসীর, হাদিস ও ইসলামি আইনশাস্ত্র।',
          },
          {
            name: 'উচ্চতর গণিত, পদার্থ ও রসায়ন বিজ্ঞান',
            category: 'বিজ্ঞান অনুষদ',
            summary: 'এনসিটিবি নির্ধারিত মাধ্যমিক বিজ্ঞান পাঠ্যপুস্তক।',
          },
        ],
      },
    ],
  },
];

export default function PublicExplorerPage() {
  const [institutions, setInstitutions] = useState<InstitutionProfile[]>(INSTITUTIONS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [activeInstitution, setActiveInstitution] = useState<InstitutionProfile>(INSTITUTIONS_DATA[0]);

  // Edit Institution Modal State
  const [isEditingInst, setIsEditingInst] = useState(false);
  const [editFormData, setEditFormData] = useState<InstitutionProfile | null>(null);
  const [newHighlight, setNewHighlight] = useState('');
  const [newFacility, setNewFacility] = useState('');

  // Selected Book for Summary Modal
  const [selectedKitabSummary, setSelectedKitabSummary] = useState<{
    name: string;
    originalName?: string;
    category: string;
    summary: string;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('noorhub_explore_institutions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setInstitutions(parsed);
          setActiveInstitution(parsed[0]);
        }
      }
    } catch {}
  }, []);

  const saveInstitutions = (updated: InstitutionProfile[]) => {
    setInstitutions(updated);
    try {
      localStorage.setItem('noorhub_explore_institutions', JSON.stringify(updated));
    } catch {}
  };

  const handleStartEditInst = () => {
    if (activeInstitution) {
      setEditFormData(JSON.parse(JSON.stringify(activeInstitution)));
      setIsEditingInst(true);
    }
  };

  const handleSaveEditInst = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    const updated = institutions.map((inst) =>
      inst.id === editFormData.id ? editFormData : inst
    );
    saveInstitutions(updated);
    setActiveInstitution(editFormData);
    setIsEditingInst(false);
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim() || !editFormData) return;
    setEditFormData({
      ...editFormData,
      highlights: [...editFormData.highlights, newHighlight.trim()],
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    if (!editFormData) return;
    setEditFormData({
      ...editFormData,
      highlights: editFormData.highlights.filter((_, i) => i !== idx),
    });
  };

  const handleAddFacility = () => {
    if (!newFacility.trim() || !editFormData) return;
    setEditFormData({
      ...editFormData,
      facilities: [...editFormData.facilities, newFacility.trim()],
    });
    setNewFacility('');
  };

  const handleRemoveFacility = (idx: number) => {
    if (!editFormData) return;
    setEditFormData({
      ...editFormData,
      facilities: editFormData.facilities.filter((_, i) => i !== idx),
    });
  };

  // Filter logic
  const filteredInstitutions = institutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.district.includes(searchQuery) ||
      inst.address.includes(searchQuery);
    const matchesType = selectedType === 'all' || inst.type === selectedType;
    const matchesDivision = selectedDivision === 'all' || inst.division === selectedDivision;
    return matchesSearch && matchesType && matchesDivision;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Hind Siliguri, sans-serif' }}>
      {/* Top Public Header */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1.5px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          padding: '0.75rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z" />
                <path d="M9 20v-5a3 3 0 0 1 6 0v5" />
                <path d="M12 2v3" />
                <circle cx="12" cy="7" r="1" />
              </svg>
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.15rem', color: '#0f172a' }}>নূরহাব</span>
              <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700', marginLeft: '0.4rem' }}>উন্মুক্ত পোর্টাল</span>
            </div>
          </Link>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link
              href="/login"
              style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#16a34a',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid #bbf7d0',
                textDecoration: 'none',
                background: '#f0fdf4',
              }}
            >
              ড্যাশবোর্ড প্রবেশ
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner for Third Parties */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '2.25rem 1.25rem 3rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '44rem', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(22, 163, 74, 0.2)',
              color: '#4ade80',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
            }}
          >
            সারাদেশের শিক্ষা প্রতিষ্ঠান, সিলেবাস ও বৈশিষ্ট্যের উন্মুক্ত ডিরেক্টরি
          </span>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.3' }}>
            কোথায় কী পড়ানো হচ্ছে ও তাদের ভালো দিকগুলো জানুন
          </h1>
          <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            কোনো পাসওয়ার্ড বা রেজিস্ট্রেশন ছাড়াই কওমি, আলিয়া ও হিফজ মাদরাসার পাঠ্যক্রম, কিতাবের সারসংক্ষেপ এবং প্রতিষ্ঠানের অনন্য অর্জন ও সুযোগ-সুবিধা সরাসরি পরখ করুন।
          </p>

          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '12px',
              padding: '0.35rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
              alignItems: 'center',
            }}
          >
            <div style={{ padding: '0 0.75rem', color: '#94a3b8' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="মাদরাসার নাম, জেলা বা এলাকা দিয়ে খুঁজুন (যেমন: ঢাকা, পটিয়া, হিফজ...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                color: '#0f172a',
                padding: '0.5rem 0',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0 0.5rem', fontSize: '1.1rem' }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '72rem', margin: '-1.5rem auto 3rem', padding: '0 1rem' }}>
        {/* Filters Row */}
        <div
          className="card"
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
          }}
        >
          {/* Curriculum type filter */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>ধরন:</span>
            {[
              { id: 'all', label: 'সকল' },
              { id: 'qawmi', label: 'কওমি' },
              { id: 'hifz', label: 'হিফজুল কুরআন' },
              { id: 'alia', label: 'আলিয়া' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  background: selectedType === t.id ? '#16a34a' : '#f1f5f9',
                  color: selectedType === t.id ? '#ffffff' : '#334155',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.775rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Division Filter */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>বিভাগ:</span>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            >
              <option value="all">সমগ্র বাংলাদেশ</option>
              <option value="ঢাকা">ঢাকা বিভাগ</option>
              <option value="চট্টগ্রাম">চট্টগ্রাম বিভাগ</option>
              <option value="সিলেট">সিলেট বিভাগ</option>
              <option value="রাজশাহী">রাজশাহী বিভাগ</option>
              <option value="খুলনা">খুলনা বিভাগ</option>
            </select>
          </div>
        </div>

        {/* Two Columns Layout: Left = Institution List, Right = Detailed Profile with Strengths & Curriculum */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '1.25rem', alignItems: 'start' }}>
          {/* Left Column: Institutions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '0.2rem' }}>
              প্রতিষ্ঠান নির্বাচন করুন ({filteredInstitutions.length}টি পাওয়া গেছে):
            </div>

            {filteredInstitutions.map((inst) => {
              const isSelected = activeInstitution.id === inst.id;
              return (
                <div
                  key={inst.id}
                  onClick={() => setActiveInstitution(inst)}
                  className="card"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #16a34a' : '1.5px solid #e2e8f0',
                    background: isSelected ? '#f0fdf4' : '#ffffff',
                    boxShadow: isSelected ? '0 4px 14px rgba(22, 163, 74, 0.15)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        background: isSelected ? '#dcfce7' : '#f1f5f9',
                        color: isSelected ? '#15803d' : '#475569',
                      }}
                    >
                      {inst.typeLabel}
                    </span>

                    {inst.isVerified && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          color: '#2563eb',
                          background: '#eff6ff',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563eb">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2.5" fill="none" />
                        </svg>
                        ভেরিফাইড
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
                    {inst.name}
                  </h3>

                  <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    {inst.district}, {inst.division} | স্থাপিত: {inst.established} খ্রি.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '0.4rem' }}>
                    <span>শিক্ষার্থী: <strong>{inst.students} জন</strong></span>
                    <span style={{ color: '#ca8a04', fontWeight: '700' }}>রেটিং: {inst.rating} / ৫.০</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Institution Details (Strengths & Curriculum) */}
          {activeInstitution && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Institution Profile Header Card */}
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  background: '#ffffff',
                  borderTop: '4px solid #16a34a',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '999px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                        {activeInstitution.typeLabel}
                      </span>
                      {activeInstitution.isVerified && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '700', color: '#2563eb', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid #bfdbfe' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563eb">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2.5" fill="none" />
                          </svg>
                          অফিশিয়াল ব্লু ভেরিফাইড প্রতিষ্ঠান
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                      {activeInstitution.name}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      {activeInstitution.address}
                    </p>
                    <p style={{ fontSize: '0.825rem', color: '#334155' }}>
                      মুহতামিম / প্রধান: <strong>{activeInstitution.principal}</strong>
                    </p>
                  </div>

                  {/* 1-Tap WhatsApp & Call Contact */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <a
                      href={`https://wa.me/${activeInstitution.whatsapp}?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি নূরহাব ডিরেক্টরি থেকে ${activeInstitution.name} সম্পর্কে তথ্য ও ভর্তির বিষয়ে জানতে চাই।`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#16a34a',
                        color: '#ffffff',
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.825rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      হোয়াটসঅ্যাপে তথ্য জানুন
                    </a>

                    <a
                      href={`tel:${activeInstitution.phone}`}
                      style={{
                        background: '#f1f5f9',
                        color: '#0f172a',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      সরাসরি ফোন কল
                    </a>

                    <button
                      onClick={handleStartEditInst}
                      style={{
                        background: '#eff6ff',
                        color: '#2563eb',
                        border: '1.5px solid #bfdbfe',
                        padding: '0.45rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer',
                        marginTop: '0.25rem',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      প্রতিষ্ঠানের তথ্য ও বৈশিষ্ট্য এডিট
                    </button>
                  </div>
                </div>

                {/* Key Metrics Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', marginTop: '1.25rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>মোট শিক্ষার্থী</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#16a34a' }}>{activeInstitution.students} জন</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>শিক্ষক ও উস্তাদ</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#2563eb' }}>{activeInstitution.teachers} জন</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>গড় পাসের হার</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#7c3aed' }}>{activeInstitution.passRate}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>অভিভাবক রেটিং</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ca8a04' }}>{activeInstitution.rating} / ৫</div>
                  </div>
                </div>
              </div>

              {/* SECTION 1: প্রতিষ্ঠানের ভালো দিক ও অনন্য বৈশিষ্ট্যসমূহ (Our Strengths & Highlights) */}
              <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #ca8a04' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      আমাদের অনন্য বৈশিষ্ট্য ও ভালো দিকগুলো
                    </h3>
                  </div>
                  <button
                    onClick={handleStartEditInst}
                    style={{
                      background: '#fefce8',
                      color: '#854d0e',
                      border: '1px solid #fde047',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.775rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    বৈশিষ্ট্য ও সুবিধা পরিবর্তন
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                  {activeInstitution.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        background: '#fefce8',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #fef08a',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#854d0e" strokeWidth="3" style={{ flexShrink: 0, marginTop: '0.15rem' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: '0.85rem', color: '#713f12', fontWeight: '600', lineHeight: '1.5' }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Facilities List */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#334155', marginBottom: '0.5rem' }}>
                  ক্যাম্পাস সুযোগ-সুবিধা:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeInstitution.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.775rem',
                        fontWeight: '600',
                      }}
                    >
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* SECTION 2: এখানে কী কী পড়ানো হচ্ছে (সিলেবাস ও কিতাবসমূহ) */}
              <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                      এখানে কী কী পড়ানো হচ্ছে (সিলেবাস ও কিতাব তালিকা)
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    (কিতাবে ট্যাপ করে পূর্ণাঙ্গ সারসংক্ষেপ পড়ুন)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeInstitution.classesTaught.map((cls, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '1rem',
                        background: '#f8fafc',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {cls.className}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700' }}>
                          {cls.kitabs.length}টি কিতাব
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                        {cls.description}
                      </p>

                      {/* Kitabs list in this class */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.65rem' }}>
                        {cls.kitabs.map((kitab, kIdx) => (
                          <div
                            key={kIdx}
                            onClick={() => setSelectedKitabSummary(kitab)}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '8px',
                              padding: '0.75rem',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#16a34a' }}>
                                {kitab.category}
                              </span>
                              <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: '700' }}>
                                সামারি পড়ুন →
                              </span>
                            </div>
                            <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                              {kitab.name}
                            </div>
                            {kitab.originalName && (
                              <div style={{ fontSize: '0.75rem', color: '#64748b', direction: 'rtl', textAlign: 'right' }}>
                                {kitab.originalName}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL: Interactive Book Summary */}
      {selectedKitabSummary && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setSelectedKitabSummary(null)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '32rem',
              padding: '1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem', marginBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a' }}>
                  {selectedKitabSummary.category}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0.3rem 0 0' }}>
                  {selectedKitabSummary.name}
                </h3>
                {selectedKitabSummary.originalName && (
                  <div style={{ fontSize: '0.85rem', color: '#2563eb', direction: 'rtl', textAlign: 'left' }}>
                    {selectedKitabSummary.originalName}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedKitabSummary(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
                বইটির সহজ সারসংক্ষেপ ও উদ্দেশ্য:
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6', background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {selectedKitabSummary.summary}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setSelectedKitabSummary(null)}
                className="btn btn-secondary"
                style={{ fontSize: '0.825rem', padding: '0.45rem 1rem' }}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
      {/* POPUP MODAL: Edit Institution Information & Highlights */}
      {isEditingInst && editFormData && (
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
              maxWidth: '38rem',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
              fontFamily: 'Hind Siliguri, sans-serif',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    প্রতিষ্ঠানের প্রোফাইল ও ভালো দিক এডিট
                  </h3>
                  <p style={{ fontSize: '0.775rem', color: '#64748b', margin: 0 }}>
                    তৃতীয় পক্ষের দর্শকদের জন্য আপনার প্রতিষ্ঠানের যাবতীয় তথ্য ও অনন্য অর্জন পরিবর্তন করুন
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingInst(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer', padding: '0.2rem' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveEditInst} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  প্রতিষ্ঠানের নাম *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    মুহতামিম / অধ্যক্ষের নাম
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={editFormData.principal}
                    onChange={(e) => setEditFormData({ ...editFormData, principal: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    প্রতিষ্ঠানের ধরন
                  </label>
                  <select
                    className="input-field"
                    value={editFormData.type}
                    onChange={(e) => {
                      const t = e.target.value as any;
                      const label = t === 'qawmi' ? 'কওমি কিতাব ও হিফজ' : t === 'alia' ? 'আলিয়া মাদরাসা' : t === 'hifz' ? 'হিফজুল কুরআন' : 'জেনারেল';
                      setEditFormData({ ...editFormData, type: t, typeLabel: label });
                    }}
                    style={{ width: '100%', padding: '0.5rem' }}
                  >
                    <option value="qawmi">কওমি মাদরাসা</option>
                    <option value="alia">আলিয়া মাদরাসা</option>
                    <option value="hifz">হিফজুল কুরআন</option>
                    <option value="general">জেনারেল একাডেমি</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    সরাসরি ফোন নম্বর
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    হোয়াটসঅ্যাপ নম্বর (যেমন: 88018...)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={editFormData.whatsapp}
                    onChange={(e) => setEditFormData({ ...editFormData, whatsapp: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  ঠিকানা
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={editFormData.address}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    শিক্ষার্থী
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={editFormData.students}
                    onChange={(e) => setEditFormData({ ...editFormData, students: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    শিক্ষক
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={editFormData.teachers}
                    onChange={(e) => setEditFormData({ ...editFormData, teachers: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    পাসের হার %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={editFormData.passRate}
                    onChange={(e) => setEditFormData({ ...editFormData, passRate: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    রেটিং (৫-এ)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-field"
                    value={editFormData.rating}
                    onChange={(e) => setEditFormData({ ...editFormData, rating: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* HIGHLIGHTS SECTION */}
              <div style={{ background: '#fefce8', padding: '0.85rem', borderRadius: '10px', border: '1px solid #fef08a' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#854d0e', display: 'block', marginBottom: '0.5rem' }}>
                  আমাদের ভালো দিক ও অনন্য বৈশিষ্ট্যসমূহ (যা দর্শকরা দেখবে)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '0.65rem' }}>
                  {editFormData.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="input-field"
                        value={h}
                        onChange={(e) => {
                          const updatedH = [...editFormData.highlights];
                          updatedH[i] = e.target.value;
                          setEditFormData({ ...editFormData, highlights: updatedH });
                        }}
                        style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.825rem', background: '#ffffff' }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        style={{
                          background: '#fee2e2',
                          border: '1px solid #fca5a5',
                          color: '#dc2626',
                          borderRadius: '6px',
                          padding: '0.4rem 0.6rem',
                          cursor: 'pointer',
                        }}
                        title="মুছে ফেলুন"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="নতুন একটি ভালো দিক বা বৈশিষ্ট্য লিখুন..."
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.825rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    style={{
                      background: '#ca8a04',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    + যোগ করুন
                  </button>
                </div>
              </div>

              {/* FACILITIES SECTION */}
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                  ক্যাম্পাস সুযোগ-সুবিধা
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.65rem' }}>
                  {editFormData.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.775rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      ✓ {fac}
                      <button
                        type="button"
                        onClick={() => handleRemoveFacility(idx)}
                        style={{ border: 'none', background: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="নতুন সুযোগ-সুবিধা লিখুন (যেমন: নিজস্ব জেনারেটর সুবিধা)..."
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    style={{ flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.825rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFacility}
                    style={{
                      background: '#3b82f6',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    + যোগ করুন
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsEditingInst(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#16a34a', border: 'none' }}
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
