'use client';

import { useState } from 'react';
import Link from 'next/link';

interface KitabItem {
  id: string;
  name: string;
  originalName: string;
  author: string;
  category: string;
  totalPages: number;
  completedPages: number;
  fullMarks: number;
  description: string;
}

interface ClassCurriculum {
  id: string;
  className: string;
  curriculumType: 'qawmi' | 'alia' | 'general' | 'hifz';
  totalKitabs: number;
  kitabs: KitabItem[];
}

const initialCurriculums: ClassCurriculum[] = [
  // ------------------ কওমি মাদরাসা ------------------
  {
    id: 'qawmi-mizan',
    className: 'ইবতেদায়ী / মিজান জামাত',
    curriculumType: 'qawmi',
    totalKitabs: 5,
    kitabs: [
      {
        id: 'k-1',
        name: 'মিজানুস সরফ',
        originalName: 'ميزان الصرف',
        author: 'হযরত আল্লামা সিরাজুদ্দীন রহ.',
        category: 'ইলমুস সরফ (শব্দরূপতত্ত্ব)',
        totalPages: 120,
        completedPages: 75,
        fullMarks: 100,
        description: 'আরবি শব্দের সিগাহ ও রূপান্তরের প্রাথমিক মৌলিক কিতাব।',
      },
      {
        id: 'k-2',
        name: 'মুন্শাআব',
        originalName: 'منشعب',
        author: 'হামদুল্লাহ রহ.',
        category: 'ইলমুস সরফ (বাব পরিচিতি)',
        totalPages: 90,
        completedPages: 45,
        fullMarks: 100,
        description: 'সুলাসি মুজাররাদ ও মাজিদ ফিহের বিভিন্ন বাবের বিস্তারিত রূপান্তর।',
      },
      {
        id: 'k-3',
        name: 'পাঞ্জেগাঞ্জ',
        originalName: 'پنج گنج',
        author: 'শায়খ আশরাফ আলী রহ.',
        category: 'ফার্সি ব্যাকরণ ও সরফ',
        totalPages: 140,
        completedPages: 80,
        fullMarks: 100,
        description: 'হালত ও সিগাহ চেনার ফার্সি সহায়ক ব্যাকরণ শাস্ত্র।',
      },
      {
        id: 'k-4',
        name: 'তাইসীরুল মুবতাদী',
        originalName: 'تيسير المبتدي',
        author: 'শায়খ আমানুল্লাহ রহ.',
        category: 'ফার্সি আদব ও শিক্ষা',
        totalPages: 80,
        completedPages: 60,
        fullMarks: 50,
        description: 'প্রাথমিক ফার্সি বাক্য গঠন ও অনুবাদ শেখার পাঠ্য।',
      },
      {
        id: 'k-5',
        name: 'বেহেশতী জেওর (১ম-২য় খণ্ড)',
        originalName: 'بهشتى زيور',
        author: 'হাকীমুল উম্মত মাওলানা আশরাফ আলী থানভী রহ.',
        category: 'ফিকহ ও দৈনন্দিন মাসায়েল',
        totalPages: 210,
        completedPages: 110,
        fullMarks: 100,
        description: 'পবিত্রতা, নামাজ ও পারিবারিক জীবনের বিশুদ্ধ মাসায়েল।',
      },
    ],
  },
  {
    id: 'qawmi-nahbemeer',
    className: 'নাহবেমীর জামাত',
    curriculumType: 'qawmi',
    totalKitabs: 4,
    kitabs: [
      {
        id: 'k-6',
        name: 'নাহবেমীর',
        originalName: 'نحو مير',
        author: 'মীর সাইয়্যেদ শরীফ জুরজানী রহ.',
        category: 'ইলমুন নাহু (বাক্যতত্ত্ব)',
        totalPages: 160,
        completedPages: 90,
        fullMarks: 100,
        description: 'আরবি ব্যাকরণ ও বাক্য গঠনের সর্বজনবিদিত মূল গ্রন্থ।',
      },
      {
        id: 'k-7',
        name: 'মিআতে আমেল',
        originalName: 'مائة عامل',
        author: 'শায়খ আব্দুল কাহের জুরজানী রহ.',
        category: 'ইলমুন নাহু (আমেল শাস্ত্র)',
        totalPages: 80,
        completedPages: 50,
        fullMarks: 100,
        description: 'বাক্যে শব্দের উপর প্রভাব বিস্তারকারী ১০০ আমেলের বিশদ বিশ্লেষণ।',
      },
      {
        id: 'k-8',
        name: 'ইলমুস সরফ (১ম-৩য় অংশ)',
        originalName: 'علم الصرف',
        author: 'মুফতী কিফায়াতুল্লাহ রহ.',
        category: 'সরফ শাস্ত্র',
        totalPages: 240,
        completedPages: 140,
        fullMarks: 100,
        description: 'উর্দু মাধ্যমে সরফের গভীর ও সহজ নিয়মাবলি।',
      },
      {
        id: 'k-9',
        name: 'রওজাতুল আদব',
        originalName: 'روضة الأدب',
        author: 'আল্লামা মুহাম্মদ ইদরিস কান্ধলভী রহ.',
        category: 'আরবি সাহিত্য ও তরজমা',
        totalPages: 110,
        completedPages: 70,
        fullMarks: 50,
        description: 'সহজ আরবি গল্প ও প্রবাদ বাক্যের মাধ্যমে ভাষা শিক্ষা।',
      },
    ],
  },
  {
    id: 'qawmi-kafiya',
    className: 'কাফিয়া ও শরহে বেকায়া জামাত',
    curriculumType: 'qawmi',
    totalKitabs: 4,
    kitabs: [
      {
        id: 'k-10',
        name: 'আল-কাফিয়া',
        originalName: 'الكافية في النحو',
        author: 'আল্লামা ইবনে হাজিব রহ.',
        category: 'উচ্চতর নাহু শাস্ত্র',
        totalPages: 180,
        completedPages: 85,
        fullMarks: 100,
        description: 'আরবি ব্যাকরণের সর্বোচ্চ গ্রহণযোগ্য পাঠ্যপুস্তক।',
      },
      {
        id: 'k-11',
        name: 'শরহে বেকায়া (১ম ও ২য় খণ্ড)',
        originalName: 'شرح الوقاية',
        author: 'উবাইদুল্লাহ ইবনে মাসউদ আল-মাহবুবী রহ.',
        category: 'ফিকহে হানাফী',
        totalPages: 320,
        completedPages: 140,
        fullMarks: 100,
        description: 'ইবাদাত ও লেনদেনের প্রামাণিক ফিকহী গ্রন্থ।',
      },
      {
        id: 'k-12',
        name: 'শরহে তাহযীব',
        originalName: 'شرح التهذيب',
        author: 'আল্লামা সাআদুদ্দীন তাফতাযানী রহ.',
        category: 'ইলমুল মানতিক (যুক্তিবিদ্যা)',
        totalPages: 130,
        completedPages: 60,
        fullMarks: 100,
        description: 'যুক্তি ও দলীল উপস্থাপনের শাস্ত্রীয় নিয়মনীতি।',
      },
      {
        id: 'k-13',
        name: 'উসুলুশ শাশী',
        originalName: 'أصول الشاشي',
        author: 'ইমাম নিজামুদ্দীন শাশী রহ.',
        category: 'উসুলুল ফিকহ (ফিকহের উৎস)',
        totalPages: 150,
        completedPages: 75,
        fullMarks: 100,
        description: 'কুরআন, সুন্নাহ, ইজমা ও কিয়াস থেকে বিধান আহরণের মূলনীতি।',
      },
    ],
  },
  {
    id: 'qawmi-dawrah',
    className: 'দাওরায়ে হাদীস (মাস্টার্স সমমান)',
    curriculumType: 'qawmi',
    totalKitabs: 6,
    kitabs: [
      {
        id: 'k-14',
        name: 'সহীহ আল-বুখারী (১ম ও ২য় খণ্ড)',
        originalName: 'صحيح البخاري',
        author: 'ইমাম মুহাম্মদ বিন ইসমাইল আল-বুখারী রহ.',
        category: 'সিহাহ সিত্তাহ হাদীস',
        totalPages: 1200,
        completedPages: 580,
        fullMarks: 100,
        description: 'কুরআন মাজিদের পর পৃথিবীর সবচেয়ে বিশুদ্ধতম হাদীস গ্রন্থ।',
      },
      {
        id: 'k-15',
        name: 'সহীহ মুসলিম (১ম ও ২য় খণ্ড)',
        originalName: 'صحيح مسلم',
        author: 'ইমাম মুসলিম ইবনুল হাজ্জাজ নিশাপুরী রহ.',
        category: 'সিহাহ সিত্তাহ হাদীস',
        totalPages: 980,
        completedPages: 420,
        fullMarks: 100,
        description: 'মুকাদ্দিমা সহ সংকলিত বিশুদ্ধ হাদিসের শ্রেষ্ঠ সংকলন।',
      },
      {
        id: 'k-16',
        name: 'জামেউত তিরমিযী (১ম ও ২য় খণ্ড)',
        originalName: 'جامع الترمذي',
        author: 'ইমাম আবু ঈসা মুহাম্মদ আত-তিরমিযী রহ.',
        category: 'সিহাহ সিত্তাহ হাদীস ও ফিকহ',
        totalPages: 850,
        completedPages: 390,
        fullMarks: 100,
        description: 'চার মাযহাবের ইমামগণের ফিকহী ইখতিলাফ ও হাদীসের সনদ বিশ্লেষণ।',
      },
      {
        id: 'k-17',
        name: 'সুনানে আবু দাউদ',
        originalName: 'سنن أبي داود',
        author: 'ইমাম আবু দাউদ সুলাইমান সাজিস্তানী রহ.',
        category: 'আহকামের হাদীস',
        totalPages: 760,
        completedPages: 310,
        fullMarks: 100,
        description: 'আইন ও ফিকহ সম্পর্কিত হাদীসের নির্ভরযোগ্যতম আকর গ্রন্থ।',
      },
      {
        id: 'k-18',
        name: 'শরহু মাআনিল আসার (তহাবী শরীফ)',
        originalName: 'شرح معاني الآثار للطحاوي',
        author: 'ইমাম আবু জাফর আহমদ আত-তহাবী রহ.',
        category: 'হানাফী ফিকহের হাদীস দলীল',
        totalPages: 890,
        completedPages: 410,
        fullMarks: 100,
        description: 'বাহ্যত বিরোধপূর্ণ হাদীসসমূহের সমন্বয় ও হানাফী দলীল তত্ত্ব।',
      },
      {
        id: 'k-19',
        name: 'মুয়াত্তায়ে ইমাম মালিক ও ইমাম মুহাম্মদ',
        originalName: 'موطأ الإمام مالك',
        author: 'ইমাম মালিক ইবনে আনাস রহ.',
        category: 'মাদীনাবাসীদের সুন্নাহ ও আসার',
        totalPages: 640,
        completedPages: 290,
        fullMarks: 100,
        description: 'তাবেঈ ও তাবে তাবেঈদের যুগের প্রাচীনতম প্রামাণ্য হাদীস সংকলন।',
      },
    ],
  },

  // ------------------ আলিয়া মাদরাসা ------------------
  {
    id: 'alia-dakhil-10',
    className: 'দাখিল ১০ম শ্রেণি (বোর্ড পরীক্ষা)',
    curriculumType: 'alia',
    totalKitabs: 6,
    kitabs: [
      {
        id: 'k-20',
        name: 'কুরআন মাজিদ ও তাজভীদ',
        originalName: 'القرآن المجيد والتجويد',
        author: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
        category: 'কুরআন ও কিরাত',
        totalPages: 180,
        completedPages: 120,
        fullMarks: 100,
        description: 'সূরা আল-ফাতহ, হুজুরাত ও সূরাতুল আর-রহমানের তাফসীর ও তাজভীদের নিয়ম।',
      },
      {
        id: 'k-21',
        name: 'হাদিস শরিফ ও উসুলুল হাদিস',
        originalName: 'الحديث النبوي الشريف',
        author: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
        category: 'হাদিস শাস্ত্র',
        totalPages: 160,
        completedPages: 95,
        fullMarks: 100,
        description: 'মিশকাতুল মাসাবীহ থেকে নির্বাচিত ১০০টি হাদিস ও হাদিসের পরিভাষা।',
      },
      {
        id: 'k-22',
        name: 'আল-ফিকহ ও ফারায়েজ',
        originalName: 'الفقه والفرائض',
        author: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
        category: 'ইসলামি আইন ও উত্তরাধিকার',
        totalPages: 210,
        completedPages: 130,
        fullMarks: 100,
        description: 'কুদূরী ও সিরাজীর আলোকে ইবাদাত, মুয়ামালাত ও ওয়ারিশি সম্পত্তির বণ্টন।',
      },
      {
        id: 'k-23',
        name: 'আরবি ১ম পত্র (আল-লুগাতুল আরাবিয়্যা)',
        originalName: 'اللغة العربية الإتصاليه',
        author: 'বাংলাদেশ মাদরাসা শিক্ষা বোর্ড (BMEB)',
        category: 'আরবি সাহিত্য ও রচনা',
        totalPages: 170,
        completedPages: 110,
        fullMarks: 100,
        description: 'আরবি গদ্য, কবিতা ও সমসাময়িক বিষয়ের উপর আরবিতে কথোপকথন ও চিঠি।',
      },
      {
        id: 'k-24',
        name: 'ইংরেজি ও বাংলা ১ম ও ২য় পত্র',
        originalName: 'General English & Bengali',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'সাধারণ ভাষা ও ব্যাকরণ',
        totalPages: 340,
        completedPages: 220,
        fullMarks: 100,
        description: 'জাতীয় পাঠ্যক্রম অনুযায়ী বাংলা ও ইংরেজি সাহিত্য এবং রচনা ও ব্যাকরণ।',
      },
      {
        id: 'k-25',
        name: 'গণিত ও তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
        originalName: 'Mathematics & ICT',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'সাধারণ বিজ্ঞান ও আইসিটি',
        totalPages: 280,
        completedPages: 190,
        fullMarks: 100,
        description: 'বীজগণিত, জ্যামিতি, ত্রিকোণমিতি এবং ডিজিটাল ডেটাবেজ ও প্রোগ্রামিং ধারণা।',
      },
    ],
  },

  // ------------------ সাধারণ স্কুল (NCTB) ------------------
  {
    id: 'gen-class-8',
    className: '৮ম শ্রেণি (জেনারেল স্কুল)',
    curriculumType: 'general',
    totalKitabs: 5,
    kitabs: [
      {
        id: 'k-26',
        name: 'বাংলা (সাহিত্য ও ব্যাকরণ)',
        originalName: 'Bangla Sahitya',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'মাতৃভাষা সাহিত্য',
        totalPages: 190,
        completedPages: 130,
        fullMarks: 100,
        description: 'নির্বাচিত কবিতা, প্রবন্ধ এবং বাংলা ব্যাকরণ ও প্রায়োগিক নির্মিতি।',
      },
      {
        id: 'k-27',
        name: 'English For Today',
        originalName: 'English For Today Class 8',
        author: 'National Curriculum & Textbook Board (NCTB)',
        category: 'Foreign Language',
        totalPages: 160,
        completedPages: 100,
        fullMarks: 100,
        description: 'Communicative English, Grammar, Comprehension and Creative Writing.',
      },
      {
        id: 'k-28',
        name: 'গণিত (Mathematics)',
        originalName: 'General Mathematics',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'গাণিতিক বিজ্ঞান',
        totalPages: 220,
        completedPages: 145,
        fullMarks: 100,
        description: 'পাটিগণিত (মুনাফা ও পরিমাপ), বীজগণিতীয় সূত্রাবলি ও জ্যামিতি।',
      },
      {
        id: 'k-29',
        name: 'বিজ্ঞান (অনুসন্ধানী ও অনুশীলন পাঠ)',
        originalName: 'General Science',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'প্রাকৃতিক বিজ্ঞান',
        totalPages: 200,
        completedPages: 115,
        fullMarks: 100,
        description: 'জীবকোষ, আলো, রাসায়নিক বিক্রিয়া এবং সৌরজগতের পর্যবেক্ষণ।',
      },
      {
        id: 'k-30',
        name: 'ইসলাম ও নৈতিক শিক্ষা',
        originalName: 'Islamic Studies & Ethics',
        author: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)',
        category: 'ধর্মীয় ও নৈতিক মূল্যবোধ',
        totalPages: 150,
        completedPages: 110,
        fullMarks: 100,
        description: 'আকাইদ, ইবাদাত, আখলাক ও নবীদের জীবনচরিত।',
      },
    ],
  },
];

interface LessonEntry {
  id: string;
  date: string;
  className: string;
  kitabName: string;
  lessonTopic: string;
  pagesCovered: string;
  teacherName: string;
}

const initialLessonLog: LessonEntry[] = [
  {
    id: 'log-1',
    date: '২১ সেপ্টেম্বর ২০২৬',
    className: 'ইবতেদায়ী / মিজান জামাত',
    kitabName: 'মিজানুস সরফ',
    lessonTopic: 'সুলাসি মুজাররাদ ছালাছা আবওয়াব ছরফ সগীর',
    pagesCovered: 'পৃষ্ঠা ৭২ - ৭৫',
    teacherName: 'মাওলানা মাহমুদ হাসান',
  },
  {
    id: 'log-2',
    date: '২১ সেপ্টেম্বর ২০২৬',
    className: 'নাহবেমীর জামাত',
    kitabName: 'নাহবেমীর',
    lessonTopic: 'হুরুফে মুশাব্বাহা বিল ফিল এবং তাদের আমল',
    pagesCovered: 'পৃষ্ঠা ৮৮ - ৯১',
    teacherName: 'মাওলানা আবুল কালাম',
  },
  {
    id: 'log-3',
    date: '২০ সেপ্টেম্বর ২০২৬',
    className: 'দাওরায়ে হাদীস',
    kitabName: 'সহীহ আল-বুখারী (১ম খণ্ড)',
    lessonTopic: 'কিতাবুল ঈমান — বাবু দুআইকুম ঈমানুকুম',
    pagesCovered: 'পৃষ্ঠা ৫৭৫ - ৫৮০',
    teacherName: 'মুফতী আব্দুর রহমান',
  },
];

export default function SyllabusKitabPage() {
  const [curriculums, setCurriculums] = useState<ClassCurriculum[]>(initialCurriculums);
  const [selectedType, setSelectedType] = useState<'all' | 'qawmi' | 'alia' | 'general'>('all');
  const [activeClassId, setActiveClassId] = useState<string>('qawmi-mizan');
  const [lessonLogs, setLessonLogs] = useState<LessonEntry[]>(initialLessonLog);

  // New Lesson form state
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [newLesson, setNewLesson] = useState({
    kitabName: '',
    lessonTopic: '',
    pagesCovered: '',
    teacherName: '',
  });

  // Add custom Kitab modal state
  const [showAddKitabModal, setShowAddKitabModal] = useState(false);
  const [newKitab, setNewKitab] = useState({
    name: '',
    originalName: '',
    author: '',
    category: '',
    totalPages: 150,
    fullMarks: 100,
    description: '',
  });

  const [printMode, setPrintMode] = useState(false);

  const filteredCurriculums = curriculums.filter((c) =>
    selectedType === 'all' ? true : c.curriculumType === selectedType
  );

  const currentClass =
    curriculums.find((c) => c.id === activeClassId) || filteredCurriculums[0] || curriculums[0];

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson.kitabName || !newLesson.lessonTopic) return;
    const entry: LessonEntry = {
      id: `log-${Date.now()}`,
      date: '২১ সেপ্টেম্বর ২০২৬',
      className: currentClass.className,
      kitabName: newLesson.kitabName,
      lessonTopic: newLesson.lessonTopic,
      pagesCovered: newLesson.pagesCovered || 'সাধারণ আলোচনা',
      teacherName: newLesson.teacherName || 'দায়িত্বপ্রাপ্ত উস্তাদ',
    };
    setLessonLogs([entry, ...lessonLogs]);
    setNewLesson({ kitabName: '', lessonTopic: '', pagesCovered: '', teacherName: '' });
    setShowLessonModal(false);
  };

  const handleAddKitab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKitab.name) return;
    const createdKitab: KitabItem = {
      id: `k-${Date.now()}`,
      name: newKitab.name,
      originalName: newKitab.originalName || newKitab.name,
      author: newKitab.author || 'নির্ধারিত নয়',
      category: newKitab.category || 'সাধারণ বিষয়',
      totalPages: Number(newKitab.totalPages) || 100,
      completedPages: 0,
      fullMarks: Number(newKitab.fullMarks) || 100,
      description: newKitab.description || 'মাদরাসার নিজস্ব পাঠ্যবই।',
    };

    setCurriculums(
      curriculums.map((c) => {
        if (c.id === currentClass.id) {
          return {
            ...c,
            totalKitabs: c.totalKitabs + 1,
            kitabs: [...c.kitabs, createdKitab],
          };
        }
        return c;
      })
    );

    setNewKitab({
      name: '',
      originalName: '',
      author: '',
      category: '',
      totalPages: 150,
      fullMarks: 100,
      description: '',
    });
    setShowAddKitabModal(false);
  };

  // Printable Book-list View
  if (printMode) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', background: '#ffffff', color: '#000000', fontFamily: 'Hind Siliguri, sans-serif' }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.25rem' }}>দারুল উলুম নূরানী ও কওমি মাদরাসা</h1>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0 0 0.5rem' }}>আফতাবনগর, বাড্ডা, ঢাকা-১২১২ | শিক্ষাবর্ষ: ২০২৬-২০২৭</p>
          <div style={{ display: 'inline-block', background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: '700', fontSize: '1.1rem' }}>
            অফিশিয়াল পাঠ্যবই ও কিতাবের তালিকা (Booklist) — {currentClass.className}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
              <th style={{ padding: '0.6rem', textAlign: 'left', border: '1px solid #cbd5e1' }}>ক্রম</th>
              <th style={{ padding: '0.6rem', textAlign: 'left', border: '1px solid #cbd5e1' }}>কিতাব / পাঠ্যবইয়ের নাম</th>
              <th style={{ padding: '0.6rem', textAlign: 'left', border: '1px solid #cbd5e1' }}>মুসান্নিফ / লেখক / বোর্ড</th>
              <th style={{ padding: '0.6rem', textAlign: 'left', border: '1px solid #cbd5e1' }}>শাস্ত্র / বিষয়</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', border: '1px solid #cbd5e1' }}>মোট পৃষ্ঠা</th>
              <th style={{ padding: '0.6rem', textAlign: 'center', border: '1px solid #cbd5e1' }}>পূর্ণমান</th>
            </tr>
          </thead>
          <tbody>
            {currentClass.kitabs.map((k, idx) => (
              <tr key={k.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1', textAlign: 'center' }}>{idx + 1}</td>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1', fontWeight: '700' }}>
                  {k.name}
                  {k.originalName !== k.name && (
                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>
                      {k.originalName}
                    </span>
                  )}
                </td>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{k.author}</td>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{k.category}</td>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1', textAlign: 'center' }}>{k.totalPages}</td>
                <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: '700' }}>{k.fullMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', paddingTop: '3rem' }}>
          <div style={{ textAlign: 'center', width: '180px', borderTop: '1px solid #000', paddingTop: '0.5rem', fontSize: '0.85rem' }}>
            নাজেমে তালীমাত (শিক্ষা সচিব)
          </div>
          <div style={{ textAlign: 'center', width: '180px', borderTop: '1px solid #000', paddingTop: '0.5rem', fontSize: '0.85rem' }}>
            মুহতামিম / প্রিন্সিপাল
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="no-print">
          <button
            onClick={() => window.print()}
            style={{ background: '#16a34a', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer', marginRight: '0.75rem' }}
          >
            প্রিন্ট করুন (Print / Save as PDF)
          </button>
          <button
            onClick={() => setPrintMode(false)}
            style={{ background: '#e2e8f0', color: '#0f172a', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
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
            <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.825rem' }}>সিলেবাস ও কিতাব তালিকা</span>
          </div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            সিলেবাস, কিতাব তালিকা ও লেসন প্ল্যানার
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#64748b' }}>
            কওমি কিতাবাত, আলিয়া পাঠ্যক্রম ও সাধারণ স্কুলের বইয়ের তালিকা ও দৈনিক পড়াশোনা ট্র্যাকিং
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setPrintMode(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            বুক-লিস্ট প্রিন্ট শিট
          </button>
          <button
            onClick={() => setShowLessonModal(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            আজকের পাঠ (দারস) এন্ট্রি
          </button>
        </div>
      </div>

      {/* Curriculum Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {[
          { id: 'all', label: 'সকল সিলেবাস' },
          { id: 'qawmi', label: 'কওমি দারসে নেজামী' },
          { id: 'alia', label: 'আলিয়া মাদরাসা বোর্ড' },
          { id: 'general', label: 'জেনারেল স্কুল (NCTB)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id as any)}
            style={{
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.825rem',
              fontWeight: selectedType === tab.id ? '700' : '500',
              padding: '0.45rem 0.85rem',
              borderRadius: '999px',
              border: selectedType === tab.id ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
              background: selectedType === tab.id ? '#f0fdf4' : '#ffffff',
              color: selectedType === tab.id ? '#16a34a' : '#475569',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Jamat / Class Horizontal Selector */}
      <div className="card" style={{ padding: '0.75rem', marginBottom: '1.25rem', background: '#f8fafc' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          জামাত / শ্রেণি নির্বাচন করুন:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {filteredCurriculums.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveClassId(c.id)}
              style={{
                fontFamily: 'Hind Siliguri, sans-serif',
                fontSize: '0.85rem',
                fontWeight: activeClassId === c.id ? '700' : '600',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                border: activeClassId === c.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                background: activeClassId === c.id ? '#eff6ff' : '#ffffff',
                color: activeClassId === c.id ? '#1d4ed8' : '#334155',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: activeClassId === c.id ? '#2563eb' : '#94a3b8',
                }}
              />
              {c.className}
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '4px',
                  background: activeClassId === c.id ? '#dbeafe' : '#f1f5f9',
                  color: activeClassId === c.id ? '#1e40af' : '#64748b',
                }}
              >
                {c.kitabs.length}টি কিতাব
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Class Overview Banner */}
      <div
        className="card"
        style={{
          padding: '1rem',
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1.5px solid #bbf7d0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.725rem',
              fontWeight: '700',
              padding: '0.2rem 0.5rem',
              borderRadius: '999px',
              background: '#dcfce7',
              color: '#15803d',
              border: '1px solid #86efac',
            }}
          >
            {currentClass.curriculumType === 'qawmi'
              ? 'কওমি নেজামিয়া'
              : currentClass.curriculumType === 'alia'
              ? 'মাদরাসা বোর্ড'
              : 'এনসিটিবি পাঠ্যক্রম'}
          </span>
          <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0.35rem 0 0.15rem' }}>
            {currentClass.className}
          </h2>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8rem', color: '#475569' }}>
            মোট নির্ধারিত কিতাব/বিষয়: <strong>{currentClass.kitabs.length}টি</strong> | পূর্ণমান:{' '}
            <strong>{currentClass.kitabs.reduce((acc, curr) => acc + curr.fullMarks, 0)} নম্বর</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowAddKitabModal(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
          >
            + নতুন কিতাব যুক্ত করুন
          </button>
        </div>
      </div>

      {/* Kitabs & Books Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
          পাঠ্য কিতাব ও বিষয়সমূহ ({currentClass.kitabs.length}টি)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {currentClass.kitabs.map((kitab, index) => {
            const progressPercent = Math.min(100, Math.round((kitab.completedPages / kitab.totalPages) * 100));
            return (
              <div
                key={kitab.id}
                className="card"
                style={{
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `3px solid ${index % 2 === 0 ? '#16a34a' : '#2563eb'}`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.725rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: '#f1f5f9', color: '#475569', fontWeight: '600' }}>
                      {kitab.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#16a34a', background: '#f0fdf4', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      পূর্ণমান: {kitab.fullMarks}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.15rem' }}>
                    {kitab.name}
                  </h4>
                  {kitab.originalName !== kitab.name && (
                    <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '600', marginBottom: '0.4rem', direction: 'rtl', textAlign: 'right' }}>
                      {kitab.originalName}
                    </div>
                  )}

                  <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    মুসান্নিফ/লেখক: <strong>{kitab.author}</strong>
                  </p>

                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                    {kitab.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#64748b' }}>পড়ার অগ্রগতি:</span>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>
                      {kitab.completedPages} / {kitab.totalPages} পৃষ্ঠা ({progressPercent}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: progressPercent >= 75 ? '#16a34a' : progressPercent >= 40 ? '#2563eb' : '#ea580c',
                        borderRadius: '999px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Lesson (Dars) Progress Log */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
              দৈনিক দারস ও পাঠ পরিকল্পনা লগ
            </h3>
            <p style={{ fontSize: '0.775rem', color: '#64748b' }}>
              প্রতিদিন কোন কিতাবের কোন অধ্যায় কত পৃষ্ঠা পর্যন্ত পড়ানো হলো তার শিক্ষক লগ
            </p>
          </div>
          <button
            onClick={() => setShowLessonModal(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            + নতুন পাঠ এন্ট্রি
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>তারিখ</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>জামাত</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>কিতাব / বিষয়</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>পঠিত বিষয় / বাহাস</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>পৃষ্ঠা</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#64748b', fontWeight: '600' }}>শিক্ষক / হুজুর</th>
              </tr>
            </thead>
            <tbody>
              {lessonLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap' }}>{log.date}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#475569' }}>{log.className}</td>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: '700', color: '#16a34a' }}>{log.kitabName}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#334155' }}>{log.lessonTopic}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>{log.pagesCovered}</td>
                  <td style={{ padding: '0.6rem 0.75rem', color: '#2563eb', fontWeight: '600' }}>{log.teacherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Today's Lesson */}
      {showLessonModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div className="card" style={{ width: '100%', maxWidth: '28rem', padding: '1.5rem', background: '#ffffff', borderRadius: '12px' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
              আজকের পাঠ (দারস) এন্ট্রি
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              জামাত: <strong>{currentClass.className}</strong>
            </p>

            <form onSubmit={handleAddLesson} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  কিতাব নির্বাচন করুন:
                </label>
                <select
                  className="input-field"
                  value={newLesson.kitabName}
                  onChange={(e) => setNewLesson({ ...newLesson, kitabName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  <option value="">-- কিতাব সিলেক্ট করুন --</option>
                  {currentClass.kitabs.map((k) => (
                    <option key={k.id} value={k.name}>
                      {k.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  আজকের পাঠ / আলোচিত বাহাস:
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: কিতাবুস সালাত, বাবুল আযান..."
                  value={newLesson.lessonTopic}
                  onChange={(e) => setNewLesson({ ...newLesson, lessonTopic: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  পঠিত পৃষ্ঠা সংখ্যা:
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: পৃষ্ঠা ৪৫ হতে ৪৯"
                  value={newLesson.pagesCovered}
                  onChange={(e) => setNewLesson({ ...newLesson, pagesCovered: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  শিক্ষক / উস্তাদের নাম:
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: মাওলানা মাহমুদ হাসান"
                  value={newLesson.teacherName}
                  onChange={(e) => setNewLesson({ ...newLesson, teacherName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowLessonModal(false)}
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

      {/* Modal: Add New Kitab */}
      {showAddKitabModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div className="card" style={{ width: '100%', maxWidth: '30rem', padding: '1.5rem', background: '#ffffff', borderRadius: '12px' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
              নতুন কিতাব / পাঠ্যবই সংযোজন
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              জামাত: <strong>{currentClass.className}</strong>
            </p>

            <form onSubmit={handleAddKitab} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  কিতাবের নাম (বাংলায়):
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: শরহে জামী"
                  value={newKitab.name}
                  onChange={(e) => setNewKitab({ ...newKitab, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  মূল আরবি নাম:
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="যেমন: الفوائد الضيائية"
                  value={newKitab.originalName}
                  onChange={(e) => setNewKitab({ ...newKitab, originalName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', direction: 'rtl' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    মুসান্নিফ / লেখক:
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="যেমন: আল্লামা জামী রহ."
                    value={newKitab.author}
                    onChange={(e) => setNewKitab({ ...newKitab, author: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    শাস্ত্র / বিষয়:
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="যেমন: উচ্চতর নাহু"
                    value={newKitab.category}
                    onChange={(e) => setNewKitab({ ...newKitab, category: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    মোট পৃষ্ঠা সংখ্যা:
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
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                    পরীক্ষার পূর্ণমান:
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
                <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  সংক্ষিপ্ত পরিচিতি:
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder="কিতাবটির আলোচ্য বিষয় ও উদ্দেশ্য..."
                  value={newKitab.description}
                  onChange={(e) => setNewKitab({ ...newKitab, description: e.target.value })}
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
                  যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
