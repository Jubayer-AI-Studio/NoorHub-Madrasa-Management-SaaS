'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AbsentStudent {
  id: string;
  name: string;
  roll: string;
  className: string;
  parentName: string;
  phone: string;
  whatsapp: string;
  lastPresentDate: string;
}

interface ResultStudent {
  id: string;
  name: string;
  roll: string;
  className: string;
  parentPhone: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  position: string;
}

interface DueFeeStudent {
  id: string;
  name: string;
  roll: string;
  className: string;
  parentPhone: string;
  dueAmount: number;
  month: string;
}

interface BotResponse {
  id: string;
  queryLabel: string;
  triggerKeywords: string;
  replyText: string;
  isActive: boolean;
}

const DEFAULT_ABSENT_STUDENTS: AbsentStudent[] = [
  {
    id: 'ab-1',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    roll: '০১',
    className: 'দাওরায়ে হাদীস (তাকমীল)',
    parentName: 'মোঃ রফিকুল ইসলাম',
    phone: '01811223344',
    whatsapp: '8801811223344',
    lastPresentDate: 'গতকাল',
  },
  {
    id: 'ab-2',
    name: 'হাফেজ উমর ফারুক',
    roll: '০৫',
    className: 'হিফজুল কুরআন বিভাগ',
    parentName: 'মাওলানা ইসমাইল হোসেন',
    phone: '01922334455',
    whatsapp: '8801922334455',
    lastPresentDate: '২০ সেপ্টেম্বর',
  },
  {
    id: 'ab-3',
    name: 'আহমদ হাসান',
    roll: '১২',
    className: 'মিজান জামাত',
    parentName: 'হাজী নুরুল হুদা',
    phone: '01733445566',
    whatsapp: '8801733445566',
    lastPresentDate: '১৮ সেপ্টেম্বর',
  },
  {
    id: 'ab-4',
    name: 'মোছাঃ ফাতেমা আক্তার',
    roll: '০৭',
    className: 'দাখিল ১০ম শ্রেণি (মহিলা শাখা)',
    parentName: 'আব্দুস সবুর',
    phone: '01644556677',
    whatsapp: '8801644556677',
    lastPresentDate: 'গতকাল',
  },
];

const DEFAULT_RESULT_STUDENTS: ResultStudent[] = [
  {
    id: 'res-1',
    name: 'মুহাম্মদ আব্দুল্লাহ আল-মামুন',
    roll: '০১',
    className: 'দাওরায়ে হাদীস',
    parentPhone: '8801811223344',
    marksObtained: 940,
    totalMarks: 1000,
    percentage: 94.0,
    grade: 'মুমতাজ (A+)',
    position: '১ম স্থান',
  },
  {
    id: 'res-2',
    name: 'সালমান ফারসী',
    roll: '০২',
    className: 'দাওরায়ে হাদীস',
    parentPhone: '8801922334455',
    marksObtained: 890,
    totalMarks: 1000,
    percentage: 89.0,
    grade: 'জাইয়্যিদ জিদ্দান (A)',
    position: '২য় স্থান',
  },
  {
    id: 'res-3',
    name: 'হাফেজ উমর ফারুক',
    roll: '০৫',
    className: 'হিফজুল কুরআন',
    parentPhone: '8801733445566',
    marksObtained: 98,
    totalMarks: 100,
    percentage: 98.0,
    grade: 'মুমতাজ (গোল্ডেন)',
    position: '১ম স্থান',
  },
];

const DEFAULT_FEE_STUDENTS: DueFeeStudent[] = [
  {
    id: 'fee-1',
    name: 'মুহাম্মদ তালহা',
    roll: '০৮',
    className: 'নাহবেমীর জামাত',
    parentPhone: '8801811223344',
    dueAmount: 1500,
    month: 'সেপ্টেম্বর ২০২৬',
  },
  {
    id: 'fee-2',
    name: 'জুবায়ের বিন আরিফ',
    roll: '১৪',
    className: 'হিফজুল কুরআন',
    parentPhone: '8801922334455',
    dueAmount: 2000,
    month: 'সেপ্টেম্বর ২০২৬',
  },
  {
    id: 'fee-3',
    name: 'আহমদ হাসান',
    roll: '১২',
    className: 'মিজান জামাত',
    parentPhone: '8801733445566',
    dueAmount: 1200,
    month: 'আগস্ট-সেপ্টেম্বর ২০২৬',
  },
];

const DEFAULT_BOT_RESPONSES: BotResponse[] = [
  {
    id: 'bot-1',
    queryLabel: 'নতুন ভর্তি তথ্য ও ফি',
    triggerKeywords: 'ভর্তি, admission, vorti, ফি কত',
    replyText: 'আসসালামু আলাইকুম! আল-জামিয়া নূরহাবে ২০২৬-২৭ শিক্ষাবর্ষে কওমি কিতাব, হিফজুল কুরআন ও নূরানী বিভাগে ভর্তি চলছে। বিস্তারিত ফি ও প্রসপেক্টাস দেখতে আমাদের উন্মুক্ত পোর্টাল ভিজিট করুন অথবা সরাসরি অফিসে যোগাযোগ করুন: 01811223344। জাযাকাল্লাহু খাইরান।',
    isActive: true,
  },
  {
    id: 'bot-2',
    queryLabel: 'দান, সাদাকাহ ও যাকাত প্রদান',
    triggerKeywords: 'দান, অনুদান, যাকাত, donation, bikash, nogod',
    replyText: 'আসসালামু আলাইকুম! মাদরাসার লিল্লাহ বোর্ডিং, এতিম ও গরিব তলাবাদের শিক্ষা খরচে আপনার যাকাত ও অনুদান পাঠাতে পারেন: বিকাশ ও নগদ (মার্চেন্ট): 01811223344 (কাউন্টার নং ১)। ডোনার ট্র্যাকিং পোর্টালে সরাসরি জমার রসিদ পাওয়া যাবে। জাযাকাল্লাহু খাইরান।',
    isActive: true,
  },
  {
    id: 'bot-3',
    queryLabel: 'ছুটি ও ক্লাসের সময়সূচী',
    triggerKeywords: 'ছুটি, সময়সূচী, বন্ধ, schedule, holiday',
    replyText: 'আসসালামু আলাইকুম! মাদরাসার নিয়মিত ক্লাস সকাল ৭:৩০ টা থেকে দুপুর ১২:৪৫ টা পর্যন্ত এবং যোহরের পর থেকে আছর পর্যন্ত অনুষ্ঠিত হয়। আকস্মিক সরকারি বা ধর্মীয় ছুটির নোটিশ নূরহাব ড্যাশবোর্ডে নিয়মিত আপডেট করা হয়। যোগাযোগ: 01811223344।',
    isActive: true,
  },
  {
    id: 'bot-4',
    queryLabel: 'মুহতামিম / প্রধান শিক্ষকের সাথে সাক্ষাত',
    triggerKeywords: 'মুহতামিম, প্রিন্সিপাল, সাক্ষাত, দেখা করব, appointment',
    replyText: 'আসসালামু আলাইকুম! হযরত মুহতামিম সাহেব প্রতিদিন সকাল ১০:০০ টা থেকে যোহর পর্যন্ত এবং মাগরিবের পর মাদরাসা দফতরে অবস্থান করেন। সাক্ষাতের সময় নির্ধারণের জন্য অফিস সহকারীর সাথে যোগাযোগ করুন: 01811223344।',
    isActive: true,
  },
];

export default function AutomationHubPage() {
  const [activeTab, setActiveTab] = useState<'absence' | 'results' | 'fees' | 'bot' | 'notice'>('absence');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Institution info
  const [institutionName, setInstitutionName] = useState('দারুল উলুম নূরানী ও কওমি মাদরাসা ঢাকা');
  const [officePhone, setOfficePhone] = useState('01811223344');
  const [bkashNumber, setBkashNumber] = useState('01811223344');

  // Automatic Trigger Config
  const [autoAbsenceAlert, setAutoAbsenceAlert] = useState(true);
  const [alertTriggerTime, setAlertTriggerTime] = useState('10:00 AM');

  // Editable Message Templates
  const [absenceTemplate, setAbsenceTemplate] = useState(
    'আস-সালামু আলাইকুম। সম্মানিত অভিভাবক, আপনার সন্তান [ছাত্রের নাম] (রোল: [রোল], জামাত: [শ্রেণি]) আজ [তারিখ] সকাল [সময়] পর্যন্ত [মাদরাসার নাম]-এ উপস্থিত হয়নি। কোনো অসুবিধা থাকলে বা ছুটির প্রয়োজনে মাদরাসা অফিসে অবহিত করুন: [অফিস ফোন]। জাযাকাল্লাহু খাইরান।'
  );

  const [resultTemplate, setResultTemplate] = useState(
    'আস-সালামু আলাইকুম। সম্মানিত অভিভাবক, [মাদরাসার নাম]-এর সাম্প্রতিক পরীক্ষার ফলাফল প্রকাশিত হয়েছে। আপনার সন্তান [ছাত্রের নাম] (রোল: [রোল], জামাত: [শ্রেণি]) প্রাপ্ত নম্বর: [নম্বর]/[মোট নম্বর] ([শতাংশ]%), প্রাপ্ত গ্রেড: [গ্রেড], মেধা স্থান: [মেধাক্রম]। পূর্ণাঙ্গ মার্কশিট দেখতে নূরহাব অভিভাবক পোর্টালে লগইন করুন। অফিস: [অফিস ফোন]।'
  );

  const [feeTemplate, setFeeTemplate] = useState(
    'আস-সালামু আলাইকুম। সম্মানিত অভিভাবক, আপনার সন্তান [ছাত্রের নাম] (রোল: [রোল], জামাত: [শ্রেণি])-এর [মাস] মাসের প্রদেয় মাসিক বেতন/বকেয়া [টাকা] টাকা পরিশোধের অনুরোধ জানানো যাচ্ছে। বিকাশ বা নগদ মার্চেন্ট নম্বর: [বিকাশ নম্বর]। বিস্তারিত জানতে যোগাযোগ: [অফিস ফোন]।'
  );

  const [customNoticeTitle, setCustomNoticeTitle] = useState('জরুরি ছুটি ও অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি');
  const [customNoticeBody, setCustomNoticeBody] = useState(
    'আস-সালামু আলাইকুম। সকল সম্মানিত অভিভাবকদের সদয় অবগতির জন্য জানানো যাচ্ছে যে, আগামী বৃহস্পতিবার মাদরাসার বার্ষিক অভিভাবক সমাবেশ ও ফলাফল পর্যালোচনা অনুষ্ঠিত হবে। সকল অভিভাবকের সশরীরে উপস্থিতি কাম্য। সময়: সকাল ১০:০০ ঘটিকা।'
  );

  // Bot responses
  const [botResponses, setBotResponses] = useState<BotResponse[]>(DEFAULT_BOT_RESPONSES);

  // Template Edit Modals
  const [editingTemplateType, setEditingTemplateType] = useState<'absence' | 'result' | 'fee' | null>(null);
  const [tempTemplateText, setTempTemplateText] = useState('');

  // Bot Edit Modal
  const [editingBot, setEditingBot] = useState<BotResponse | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noorhub_automation_hub');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.institutionName) setInstitutionName(p.institutionName);
        if (p.officePhone) setOfficePhone(p.officePhone);
        if (p.bkashNumber) setBkashNumber(p.bkashNumber);
        if (p.absenceTemplate) setAbsenceTemplate(p.absenceTemplate);
        if (p.resultTemplate) setResultTemplate(p.resultTemplate);
        if (p.feeTemplate) setFeeTemplate(p.feeTemplate);
        if (p.botResponses) setBotResponses(p.botResponses);
        if (p.alertTriggerTime) setAlertTriggerTime(p.alertTriggerTime);
      }
    } catch {}
  }, []);

  const saveSettings = (newSettings?: Partial<any>) => {
    try {
      const data = {
        institutionName,
        officePhone,
        bkashNumber,
        absenceTemplate,
        resultTemplate,
        feeTemplate,
        botResponses,
        alertTriggerTime,
        ...newSettings,
      };
      localStorage.setItem('noorhub_automation_hub', JSON.stringify(data));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {}
  };

  // Helper to compile message
  const compileAbsenceMessage = (st: AbsentStudent) => {
    return absenceTemplate
      .replace(/\[ছাত্রের নাম\]/g, st.name)
      .replace(/\[রোল\]/g, st.roll)
      .replace(/\[শ্রেণি\]/g, st.className)
      .replace(/\[তারিখ\]/g, 'আজ')
      .replace(/\[সময়\]/g, alertTriggerTime)
      .replace(/\[মাদরাসার নাম\]/g, institutionName)
      .replace(/\[অফিস ফোন\]/g, officePhone);
  };

  const compileResultMessage = (st: ResultStudent) => {
    return resultTemplate
      .replace(/\[ছাত্রের নাম\]/g, st.name)
      .replace(/\[রোল\]/g, st.roll)
      .replace(/\[শ্রেণি\]/g, st.className)
      .replace(/\[নম্বর\]/g, String(st.marksObtained))
      .replace(/\[মোট নম্বর\]/g, String(st.totalMarks))
      .replace(/\[শতাংশ\]/g, String(st.percentage))
      .replace(/\[গ্রেড\]/g, st.grade)
      .replace(/\[মেধাক্রম\]/g, st.position)
      .replace(/\[মাদরাসার নাম\]/g, institutionName)
      .replace(/\[অফিস ফোন\]/g, officePhone);
  };

  const compileFeeMessage = (st: DueFeeStudent) => {
    return feeTemplate
      .replace(/\[ছাত্রের নাম\]/g, st.name)
      .replace(/\[রোল\]/g, st.roll)
      .replace(/\[শ্রেণি\]/g, st.className)
      .replace(/\[টাকা\]/g, String(st.dueAmount))
      .replace(/\[মাস\]/g, st.month)
      .replace(/\[বিকাশ নম্বর\]/g, bkashNumber)
      .replace(/\[মাদরাসার নাম\]/g, institutionName)
      .replace(/\[অফিস ফোন\]/g, officePhone);
  };

  const handleOpenEditTemplate = (type: 'absence' | 'result' | 'fee') => {
    setEditingTemplateType(type);
    if (type === 'absence') setTempTemplateText(absenceTemplate);
    if (type === 'result') setTempTemplateText(resultTemplate);
    if (type === 'fee') setTempTemplateText(feeTemplate);
  };

  const handleSaveTemplate = () => {
    if (editingTemplateType === 'absence') {
      setAbsenceTemplate(tempTemplateText);
      saveSettings({ absenceTemplate: tempTemplateText });
    } else if (editingTemplateType === 'result') {
      setResultTemplate(tempTemplateText);
      saveSettings({ resultTemplate: tempTemplateText });
    } else if (editingTemplateType === 'fee') {
      setFeeTemplate(tempTemplateText);
      saveSettings({ feeTemplate: tempTemplateText });
    }
    setEditingTemplateType(null);
  };

  const handleUpdateBotResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBot) return;
    const updated = botResponses.map((b) => (b.id === editingBot.id ? editingBot : b));
    setBotResponses(updated);
    saveSettings({ botResponses: updated });
    setEditingBot(null);
  };

  const copyToClipboard = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {}
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '64rem', margin: '0 auto', fontFamily: 'Hind Siliguri, sans-serif' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.825rem' }}>
              ড্যাশবোর্ড
            </Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.825rem' }}>অভিভাবক ও ক্লায়েন্ট হাব</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
            হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব
          </h1>
          <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
            গ্রাহক ও অভিভাবকদের সাথে সরাসরি যোগাযোগ — অনুপস্থিতি সতর্কতা, পরীক্ষার ফলাফল, বকেয়া ফি ও স্বয়ংক্রিয় এআই উত্তর
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', padding: '0.4rem 0.8rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.775rem', fontWeight: '700', color: '#166534' }}>হোয়াটসঅ্যাপ গেটওয়ে সচল</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            color: '#16a34a',
            marginBottom: '1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          আপনার সেটিংস ও টেমপ্লেটের যাবতীয় পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!
        </div>
      )}

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.35rem',
          overflowX: 'auto',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '0.25rem',
          marginBottom: '1.25rem',
        }}
      >
        <button
          onClick={() => setActiveTab('absence')}
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
            color: activeTab === 'absence' ? '#ea580c' : '#64748b',
            borderBottom: activeTab === 'absence' ? '3px solid #ea580c' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          অনুপস্থিতি অ্যালার্ট ({DEFAULT_ABSENT_STUDENTS.length})
        </button>

        <button
          onClick={() => setActiveTab('results')}
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
            color: activeTab === 'results' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'results' ? '3px solid #2563eb' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          পরীক্ষার ফলাফল প্রেরণ
        </button>

        <button
          onClick={() => setActiveTab('fees')}
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
            color: activeTab === 'fees' ? '#16a34a' : '#64748b',
            borderBottom: activeTab === 'fees' ? '3px solid #16a34a' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          বকেয়া ফি রিমাইন্ডার ({DEFAULT_FEE_STUDENTS.length})
        </button>

        <button
          onClick={() => setActiveTab('bot')}
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
            color: activeTab === 'bot' ? '#7c3aed' : '#64748b',
            borderBottom: activeTab === 'bot' ? '3px solid #7c3aed' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          হোয়াটসঅ্যাপ ও মেসেঞ্জার অটো-বট ({botResponses.length})
        </button>

        <button
          onClick={() => setActiveTab('notice')}
          style={{
            padding: '0.6rem 1rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
            color: activeTab === 'notice' ? '#0f172a' : '#64748b',
            borderBottom: activeTab === 'notice' ? '3px solid #0f172a' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          সাধারণ নোটিশ ব্রডকাস্ট
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ABSENTEE ALERTS (অনুপস্থিতি নোটিফিকেশন)              */}
      {/* ======================================================== */}
      {activeTab === 'absence' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Template Card with EDIT button */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff', borderLeft: '4px solid #ea580c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  স্বয়ংক্রিয় অনুপস্থিতি বার্তা টেমপ্লেট
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  সকাল {alertTriggerTime}-এ অনুপস্থিত ছাত্রদের তালিকা তৈরি করে অভিভাবকদের পাঠানো হয়
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <select
                  value={alertTriggerTime}
                  onChange={(e) => {
                    setAlertTriggerTime(e.target.value);
                    saveSettings({ alertTriggerTime: e.target.value });
                  }}
                  className="input-field"
                  style={{ padding: '0.3rem 0.5rem', fontSize: '0.775rem' }}
                >
                  <option value="09:30 AM">সকাল ০৯:৩০</option>
                  <option value="10:00 AM">সকাল ১০:০০ (স্ট্যান্ডার্ড)</option>
                  <option value="10:30 AM">সকাল ১০:৩০</option>
                </select>

                <button
                  onClick={() => handleOpenEditTemplate('absence')}
                  style={{
                    background: '#fff7ed',
                    border: '1.5px solid #fed7aa',
                    color: '#c2410c',
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
                  টেমপ্লেট এডিট করুন
                </button>
              </div>
            </div>

            <div style={{ background: '#fff7ed', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #ffedd5', fontSize: '0.825rem', color: '#9a3412', lineHeight: '1.5' }}>
              <strong>বর্তমান সক্রিয় টেমপ্লেট:</strong> "{absenceTemplate}"
            </div>
          </div>

          {/* Absent Students List */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  আজকের অনুপস্থিত শিক্ষার্থী ({DEFAULT_ABSENT_STUDENTS.length} জন)
                </h3>
                <p style={{ fontSize: '0.775rem', color: '#64748b', margin: 0 }}>
                  ১-ক্লিকে অভিভাবকের হোয়াটসঅ্যাপ সরাসরি ওপেন হবে ও প্রস্তুত বার্তা চলে যাবে
                </p>
              </div>

              <button
                onClick={() => {
                  alert('সকল অনুপস্থিত অভিভাবকের হোয়াটসঅ্যাপ বার্তা সারিতে সাজানো হয়েছে। নিচে প্রতিটি ছাত্রের "হোয়াটসঅ্যাপে পাঠান" বাটনে ক্লিক করে এক ট্যাপে সেন্ড করুন।');
                }}
                className="btn btn-primary"
                style={{ background: '#ea580c', border: 'none', fontSize: '0.8rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                একসাথে ব্যাচ অ্যালার্ট প্রস্তুত করুন
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEFAULT_ABSENT_STUDENTS.map((st) => {
                const msg = compileAbsenceMessage(st);
                const waUrl = `https://wa.me/${st.whatsapp}?text=${encodeURIComponent(msg)}`;

                return (
                  <div
                    key={st.id}
                    style={{
                      border: '1.5px solid #fed7aa',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      background: '#fffbf5',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.4rem', borderRadius: '4px', background: '#ea580c', color: '#ffffff' }}>
                          অনুপস্থিত
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {st.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          (রোল: {st.roll})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#475569' }}>
                        জামাত: <strong>{st.className}</strong> | অভিভাবক: <strong>{st.parentName}</strong> ({st.phone})
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button
                        onClick={() => copyToClipboard(msg, st.id)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {copiedId === st.id ? '✓ কপি হয়েছে' : 'বার্তা কপি'}
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#16a34a',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        হোয়াটসঅ্যাপে পাঠান
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: EXAM RESULTS BROADCAST (ফলাফল প্রেরণ)                */}
      {/* ======================================================== */}
      {activeTab === 'results' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Template Card */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  পরীক্ষার ফলাফল ও মার্কশিট বার্তা টেমপ্লেট
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  প্রতিটি ছাত্রের প্রাপ্ত নম্বর, গ্রেড ও মেধা অবস্থান স্বয়ংক্রিয়ভাবে সাজানো হয়
                </span>
              </div>

              <button
                onClick={() => handleOpenEditTemplate('result')}
                style={{
                  background: '#eff6ff',
                  border: '1.5px solid #bfdbfe',
                  color: '#1d4ed8',
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
                টেমপ্লেট এডিট করুন
              </button>
            </div>

            <div style={{ background: '#eff6ff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #dbeafe', fontSize: '0.825rem', color: '#1e40af', lineHeight: '1.5' }}>
              <strong>বর্তমান সক্রিয় টেমপ্লেট:</strong> "{resultTemplate}"
            </div>
          </div>

          {/* Results List */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              ফলাফল প্রাপ্ত ছাত্রদের তালিকা
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEFAULT_RESULT_STUDENTS.map((st) => {
                const msg = compileResultMessage(st);
                const waUrl = `https://wa.me/${st.parentPhone}?text=${encodeURIComponent(msg)}`;

                return (
                  <div
                    key={st.id}
                    style={{
                      border: '1.5px solid #bfdbfe',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      background: '#f8fafc',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {st.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          (রোল: {st.roll})
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '4px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                          {st.position}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#475569' }}>
                        জামাত: <strong>{st.className}</strong> | নম্বর: <strong>{st.marksObtained}/{st.totalMarks}</strong> ({st.percentage}%) | গ্রেড: <strong>{st.grade}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button
                        onClick={() => copyToClipboard(msg, st.id)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {copiedId === st.id ? '✓ কপি হয়েছে' : 'মেসেজ কপি'}
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#2563eb',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        হোয়াটসঅ্যাপে মার্কশিট পাঠান
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: DUE FEE REMINDERS (বকেয়া ফি রিমাইন্ডার)               */}
      {/* ======================================================== */}
      {activeTab === 'fees' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Template Card */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff', borderLeft: '4px solid #16a34a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  মাসিক বেতন ও বকেয়া ফি রিমাইন্ডার টেমপ্লেট
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  বিকাশ/নগদ মার্চেন্ট নম্বর ও টাকার পরিমাণ সহ স্বয়ংক্রিয় রিমাইন্ডার
                </span>
              </div>

              <button
                onClick={() => handleOpenEditTemplate('fee')}
                style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  color: '#15803d',
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
                টেমপ্লেট এডিট করুন
              </button>
            </div>

            <div style={{ background: '#f0fdf4', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #dcfce7', fontSize: '0.825rem', color: '#166534', lineHeight: '1.5' }}>
              <strong>বর্তমান সক্রিয় টেমপ্লেট:</strong> "{feeTemplate}"
            </div>
          </div>

          {/* Fee Students List */}
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              বকেয়া ফি তালিকা ({DEFAULT_FEE_STUDENTS.length} জন)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEFAULT_FEE_STUDENTS.map((st) => {
                const msg = compileFeeMessage(st);
                const waUrl = `https://wa.me/${st.parentPhone}?text=${encodeURIComponent(msg)}`;

                return (
                  <div
                    key={st.id}
                    style={{
                      border: '1.5px solid #bbf7d0',
                      borderRadius: '10px',
                      padding: '0.85rem 1rem',
                      background: '#fcfdfc',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {st.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          (রোল: {st.roll})
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#dc2626', background: '#fef2f2', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid #fecaca' }}>
                          বকেয়া: {st.dueAmount} ৳
                        </span>
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#475569' }}>
                        জামাত: <strong>{st.className}</strong> | মাস: <strong>{st.month}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button
                        onClick={() => copyToClipboard(msg, st.id)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {copiedId === st.id ? '✓ কপি হয়েছে' : 'মেসেজ কপি'}
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#16a34a',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        হোয়াটসঅ্যাপে রিমাইন্ডার পাঠান
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: AI BOT RESPONSES (মেসেঞ্জার ও হোয়াটসঅ্যাপ বট)          */}
      {/* ======================================================== */}
      {activeTab === 'bot' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff', borderLeft: '4px solid #7c3aed' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  মেসেঞ্জার ও হোয়াটসঅ্যাপ স্বয়ংক্রিয় উত্তর (AI Auto-Reply)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  গ্রাহক বা অভিভাবক মেসেজ দিলে এই নির্দিষ্ট কি-ওয়ার্ডের ভিত্তিতে চ্যাটবট তাৎক্ষণিক রিপ্লাই দিবে। প্রতিটি উত্তর সম্পূর্ণ এডিট করা সম্ভব।
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {botResponses.map((bot) => (
              <div
                key={bot.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderLeft: bot.isActive ? '4px solid #7c3aed' : '4px solid #94a3b8',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '4px', background: bot.isActive ? '#f5f3ff' : '#f1f5f9', color: bot.isActive ? '#7c3aed' : '#64748b' }}>
                        {bot.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        {bot.queryLabel}
                      </h4>
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '0.2rem' }}>
                      ট্রিগার কি-ওয়ার্ডসমূহ: <code>{bot.triggerKeywords}</code>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <button
                      onClick={() => setEditingBot({ ...bot })}
                      style={{
                        background: '#f5f3ff',
                        border: '1.5px solid #ddd6fe',
                        color: '#6d28d9',
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
                      উত্তর এডিট করুন
                    </button>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.825rem', color: '#334155', lineHeight: '1.5' }}>
                  <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: '800', display: 'block', marginBottom: '0.2rem' }}>
                    স্বয়ংক্রিয় রিপ্লাই টেক্সট:
                  </span>
                  {bot.replyText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: CUSTOM ANNOUNCEMENT (সাধারণ নোটিশ ব্রডকাস্ট)           */}
      {/* ======================================================== */}
      {activeTab === 'notice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem', background: '#ffffff', borderLeft: '4px solid #0f172a' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.35rem' }}>
              জরুরি সাধারণ বিজ্ঞপ্তি ব্রডকাস্ট
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
              আকস্মিক ছুটি, মাহফিল বা অভিভাবক সমাবেশের নোটিশ লিখে এক ক্লিকে সকল অভিভাবকের কাছে পৌঁছে দিন
            </p>
          </div>

          <div className="card" style={{ padding: '1.25rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  বিজ্ঞপ্তির শিরোনাম *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={customNoticeTitle}
                  onChange={(e) => setCustomNoticeTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                  বিজ্ঞপ্তির বিস্তারিত বিবরণ (হোয়াটসঅ্যাপে পাঠানো হবে) *
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  value={customNoticeBody}
                  onChange={(e) => setCustomNoticeBody(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', lineHeight: '1.5' }}
                />
              </div>

              {/* Preview */}
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>
                  বার্তা প্রিভিউ (হোয়াটসঅ্যাপে যেমন দেখাবে):
                </span>
                <div style={{ fontSize: '0.85rem', color: '#0f172a', lineHeight: '1.5' }}>
                  <strong>[{institutionName}]</strong>
                  <br />
                  <strong>📢 {customNoticeTitle}</strong>
                  <br /><br />
                  {customNoticeBody}
                  <br /><br />
                  <em>প্রয়োজনে যোগাযোগ: {officePhone}</em>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    const fullText = `[${institutionName}]\n📢 *${customNoticeTitle}*\n\n${customNoticeBody}\n\nপ্রয়োজনে যোগাযোগ: ${officePhone}`;
                    copyToClipboard(fullText, 'custom-notice');
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.5rem' }}
                >
                  {copiedId === 'custom-notice' ? '✓ সম্পূর্ণ নোটিশ কপি হয়েছে' : 'নোটিশ টেক্সট কপি করুন'}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`[${institutionName}]\n📢 *${customNoticeTitle}*\n\n${customNoticeBody}\n\nপ্রয়োজনে যোগাযোগ: ${officePhone}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#16a34a' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  হোয়াটসঅ্যাপে ব্রডকাস্ট করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL: EDIT MESSAGE TEMPLATE                       */}
      {/* ======================================================== */}
      {editingTemplateType && (
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
              maxWidth: '34rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  মেসেজ টেমপ্লেট কাস্টমাইজ ও এডিট
                </h3>
              </div>
              <button
                onClick={() => setEditingTemplateType(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '0.775rem', color: '#64748b', marginBottom: '0.75rem' }}>
              আপনি আপনার মাদরাসার নিয়ম অনুযায়ী বার্তাটি সম্পূর্ণ পরিবর্তন করতে পারেন। নিচের ট্যাগগুলো ব্যবহার করলে সেগুলো স্বয়ংক্রিয়ভাবে ছাত্রের তথ্যে পরিবর্তিত হবে:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
              {['[ছাত্রের নাম]', '[রোল]', '[শ্রেণি]', '[তারিখ]', '[মাদরাসার নাম]', '[অফিস ফোন]', '[টাকা]', '[মাস]', '[নম্বর]', '[গ্রেড]'].map((tag, i) => (
                <span key={i} style={{ fontSize: '0.7rem', background: '#f1f5f9', color: '#475569', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                  {tag}
                </span>
              ))}
            </div>

            <textarea
              className="input-field"
              rows={5}
              value={tempTemplateText}
              onChange={(e) => setTempTemplateText(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', lineHeight: '1.5', fontSize: '0.85rem', marginBottom: '1rem' }}
            />

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setEditingTemplateType(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSaveTemplate}
                className="btn btn-primary"
                style={{ flex: 1, background: '#16a34a', border: 'none' }}
              >
                টেমপ্লেট সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL: EDIT BOT RESPONSE                           */}
      {/* ======================================================== */}
      {editingBot && (
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
              maxWidth: '34rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                বট অটো-রিপ্লাই উত্তর এডিট করুন
              </h3>
              <button
                onClick={() => setEditingBot(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateBotResponse} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  ইনকোয়ারি শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={editingBot.queryLabel}
                  onChange={(e) => setEditingBot({ ...editingBot, queryLabel: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  ট্রিগার কি-ওয়ার্ডসমূহ (কমা দিয়ে লিখুন) *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={editingBot.triggerKeywords}
                  onChange={(e) => setEditingBot({ ...editingBot, triggerKeywords: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.2rem' }}>
                  স্বয়ংক্রিয় ফিরতি বার্তা (Auto-Reply Content) *
                </label>
                <textarea
                  required
                  className="input-field"
                  rows={4}
                  value={editingBot.replyText}
                  onChange={(e) => setEditingBot({ ...editingBot, replyText: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', lineHeight: '1.5' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="botActiveCheck"
                  checked={editingBot.isActive}
                  onChange={(e) => setEditingBot({ ...editingBot, isActive: e.target.checked })}
                  style={{ width: '1.1rem', height: '1.1rem', accentColor: '#7c3aed' }}
                />
                <label htmlFor="botActiveCheck" style={{ fontSize: '0.825rem', fontWeight: '700', color: '#334155', cursor: 'pointer' }}>
                  এই অটো-রিপ্লাই ট্রিগারটি সক্রিয় রাখুন
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingBot(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#7c3aed', border: 'none' }}
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
