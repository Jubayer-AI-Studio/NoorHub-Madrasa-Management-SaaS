'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CalendarCheck,
  Award,
  Wallet,
  BookOpen,
  Compass,
  Sparkles,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  GraduationCap,
  Calendar,
  Building2,
  DollarSign,
  UserCheck,
  Crown,
  HeartHandshake,
  LogIn,
  PlusCircle,
  MessageSquare,
  Trophy,
  Settings,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  getActiveMadrasa,
  DEFAULT_DEMO_MADRASA,
  MadrasaProfile,
} from '@/lib/madrasa-store';
import { useCountUp, formatNumberByLang } from '@/lib/useCountUp';
import MagicConfetti from '@/components/layout/MagicConfetti';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

export default function DashboardPage() {
  const { t, lang } = useLanguage();
  const [activeMadrasa, setActiveMadrasa] = useState<MadrasaProfile>(DEFAULT_DEMO_MADRASA);
  const [selectedRole, setSelectedRole] = useState<'principal' | 'mutawalli'>('principal');
  const [showConfetti, setShowConfetti] = useState(false);

  // 60fps Magic Live Count-up with Easing (Bilingual: English in EN mode, Bengali in BN mode)
  const animatedStudents = useCountUp(347, 1100, 200, lang);
  const animatedAttendance = useCountUp(312, 1100, 250, lang);
  const animatedFees = useCountUp(124500, 1300, 300, lang);
  const animatedTeachers = useCountUp(24, 900, 350, lang);

  const animatedMutawalliFund = useCountUp(685400, 1300, 300, lang);
  const animatedMutawalliBudget = useCountUp(220000, 1200, 350, lang);

  useEffect(() => {
    const updateActive = () => {
      setActiveMadrasa(getActiveMadrasa());
    };
    updateActive();
    window.addEventListener('noorhub_madrasa_changed', updateActive);
    return () => window.removeEventListener('noorhub_madrasa_changed', updateActive);
  }, []);

  const stats = [
    {
      label: t('metric_students'),
      value: animatedStudents,
      unit: lang === 'en' ? 'Students' : 'জন',
      subText: t('metric_students_sub'),
      badge: t('metric_students_badge'),
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
      icon: Users,
      iconColor: '#16a34a',
      iconBg: '#dcfce7',
      borderColor: '#bbf7d0',
      href: '/dashboard/students',
    },
    {
      label: t('metric_attendance'),
      value: animatedAttendance,
      unit: lang === 'en' ? 'Present' : 'জন',
      subText: t('metric_attendance_sub'),
      badge: t('metric_attendance_badge'),
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: CalendarCheck,
      iconColor: '#2563eb',
      iconBg: '#dbeafe',
      borderColor: '#bfdbfe',
      href: '/dashboard/attendance',
    },
    {
      label: t('metric_fees'),
      value: animatedFees,
      unit: '৳',
      subText: t('metric_fees_sub'),
      badge: t('metric_fees_badge'),
      badgeColor: '#d97706',
      badgeBg: '#fef3c7',
      icon: Wallet,
      iconColor: '#d97706',
      iconBg: '#fef3c7',
      borderColor: '#fde68a',
      href: '/dashboard/finance',
    },
    {
      label: t('metric_teachers'),
      value: animatedTeachers,
      unit: lang === 'en' ? 'Staff' : 'জন',
      subText: t('metric_teachers_sub'),
      badge: t('metric_teachers_badge'),
      badgeColor: '#7c3aed',
      badgeBg: '#f5f3ff',
      icon: GraduationCap,
      iconColor: '#7c3aed',
      iconBg: '#ede9fe',
      borderColor: '#ddd6fe',
      href: '/dashboard/teachers',
    },
  ];

  const mutawalliStats = [
    {
      label: t('metric_mutawalli_fund'),
      value: animatedMutawalliFund,
      unit: '৳',
      subText: lang === 'en' ? 'General Fund + Lillah Boarding + Construction' : 'সাধারণ তহবিল + লিল্লাহ বোডিং + নির্মাণ ফান্ড',
      badge: lang === 'en' ? '100% Audited' : '১০০% অডিটেড',
      badgeColor: '#0d9488',
      badgeBg: '#f0fdfa',
      icon: Wallet,
      iconColor: '#0d9488',
      iconBg: '#ccfbf1',
      borderColor: '#99f6e4',
      href: '/dashboard/finance',
    },
    {
      label: t('metric_mutawalli_budget'),
      value: animatedMutawalliBudget,
      unit: '৳',
      subText: lang === 'en' ? '24 Teachers & Staff • Approved for Current Month' : '২৪ জন শিক্ষক ও স্টাফ • চলতি মাস অনুমোদিত',
      badge: lang === 'en' ? 'Approved' : 'ছাড়পত্র সম্পন্ন',
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
      icon: Users,
      iconColor: '#16a34a',
      iconBg: '#dcfce7',
      borderColor: '#bbf7d0',
      href: '/dashboard/teachers',
    },
    {
      label: t('metric_mutawalli_property'),
      value: lang === 'en' ? '4 Buildings' : '৪টি ভবন',
      unit: lang === 'en' ? 'Complex' : 'কমপ্লেক্স',
      subText: lang === 'en' ? '2 Acres Waqf Land • 1 Orphanage Hostel' : '২ একর ওয়াকফ জমি • ১টি এতিমখানা ছাত্রাবাস',
      badge: lang === 'en' ? 'Updated' : 'রেকর্ড হালনাগাদ',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      icon: Building2,
      iconColor: '#2563eb',
      iconBg: '#dbeafe',
      borderColor: '#bfdbfe',
      href: '/dashboard/settings',
    },
    {
      label: t('metric_mutawalli_resolution'),
      value: lang === 'en' ? '12 Decisions' : '১২টি',
      unit: lang === 'en' ? 'Resolved' : 'সিদ্ধান্ত',
      subText: lang === 'en' ? 'Last General Meeting: 15 Sep 2026' : 'সর্বশেষ সাধারণ সভা: ১৫ সেপ্টেম্বর ২০২৬',
      badge: lang === 'en' ? 'Effective' : 'কার্যকর',
      badgeColor: '#7c3aed',
      badgeBg: '#f5f3ff',
      icon: Award,
      iconColor: '#7c3aed',
      iconBg: '#ede9fe',
      borderColor: '#ddd6fe',
      href: '/dashboard/notice',
    },
  ];

  const primaryServices = [
    {
      title: lang === 'en' ? 'Students & ID Cards' : 'ছাত্র ও আইডি কার্ড',
      desc: lang === 'en' ? 'Admissions, ID card & records' : 'ভর্তি, আইডি কার্ড ও তথ্য',
      href: '/dashboard/students',
      icon: Users,
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      badge: lang === 'en' ? 'ID Card' : 'আইডি কার্ড',
    },
    {
      title: lang === 'en' ? 'Smart Attendance' : 'স্মার্ট হাজিরা',
      desc: lang === 'en' ? 'Daily classwise attendance' : 'শ্রেণিভিত্তিক দৈনিক হাজিরা',
      href: '/dashboard/attendance',
      icon: CalendarCheck,
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#bfdbfe',
      badge: lang === 'en' ? 'Digital' : 'ডিজিটাল',
    },
    {
      title: lang === 'en' ? 'Hifzul Quran' : 'হিফজুল কুরআন',
      desc: lang === 'en' ? 'Sabaq, Sabaqi & Manzil' : 'সবক, সবকি ও মনজিল',
      href: '/dashboard/hifz',
      icon: BookOpen,
      color: '#059669',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      badge: lang === 'en' ? '30 Para' : '৩০ পারা',
    },
    {
      title: lang === 'en' ? 'Exams & Results' : 'পরীক্ষা ও ফলাফল',
      desc: lang === 'en' ? 'Marksheet & merit lists' : 'মার্কশিট ও মেধা তালিকা',
      href: '/dashboard/results',
      icon: Award,
      color: '#7c3aed',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      badge: lang === 'en' ? 'Merit' : 'মেধা তালিকা',
    },
    {
      title: lang === 'en' ? 'Finance & Accounts' : 'হিসাব ও অর্থ',
      desc: lang === 'en' ? 'Fees, salary & receipts' : 'ফি আদায়, বেতন ও রসিদ',
      href: '/dashboard/finance',
      icon: Wallet,
      color: '#d97706',
      bg: '#fef3c7',
      border: '#fde68a',
      badge: lang === 'en' ? 'Receipts' : 'রসিদ প্রিন্ট',
    },
    {
      title: lang === 'en' ? 'Notices & SMS' : 'নোটিশ ও বার্তা',
      desc: lang === 'en' ? 'Urgent notice & SMS alerts' : 'জরুরি নোটিশ ও এসএমএস',
      href: '/dashboard/notice',
      icon: FileText,
      color: '#ea580c',
      bg: '#fff7ed',
      border: '#fed7aa',
      badge: lang === 'en' ? 'SMS' : 'এসএমএস',
    },
    {
      title: lang === 'en' ? 'Syllabus & Kitabs' : 'সিলেবাস ও কিতাব',
      desc: lang === 'en' ? 'Kitab & class curriculum' : 'কিতাব ও জামাত কারিকুলাম',
      href: '/dashboard/syllabus',
      icon: GraduationCap,
      color: '#0284c7',
      bg: '#f0f9ff',
      border: '#bae6fd',
      badge: lang === 'en' ? 'Curriculum' : 'কারিকুলাম',
    },
    {
      title: lang === 'en' ? 'Islamic Map (GIS)' : 'ইসলামিক মানচিত্র',
      desc: lang === 'en' ? 'National madrasa directory' : 'জাতীয় মাদরাসা ডিরেক্টরি',
      href: '/dashboard/map',
      icon: Compass,
      color: '#0d9488',
      bg: '#f0fdfa',
      border: '#99f6e4',
      badge: lang === 'en' ? 'GIS' : 'জিআইএস',
    },
  ];

  const departmentAttendance = [
    {
      name: lang === 'en' ? 'Hifzul Quran Department' : 'হিফজুল কুরআন বিভাগ',
      total: 50,
      present: 48,
      rate: 96,
      color: '#10b981',
    },
    {
      name: lang === 'en' ? 'Kitab Department (Qawmi Branch)' : 'কিতাব বিভাগ (কওমি শাখা)',
      total: 144,
      present: 132,
      rate: 92,
      color: '#3b82f6',
    },
    {
      name: lang === 'en' ? 'Dakhil & Alim (Alia Branch)' : 'দাখিল ও আলিম (আলিয়া শাখা)',
      total: 153,
      present: 132,
      rate: 86,
      color: '#f59e0b',
    },
  ];

  const activities = [
    {
      student: lang === 'en' ? 'Muhammad Abdur Rahman' : 'মুহাম্মদ আব্দুর রহমান',
      action: lang === 'en' ? 'Monthly tuition fee paid (৳850)' : 'মাসিক বেতন পরিশোধ (৮৫০ টাকা)',
      badge: lang === 'en' ? 'Fee Paid' : 'ফি পরিশোধ',
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
      time: lang === 'en' ? '10 min ago' : '১০ মিনিট আগে',
    },
    {
      student: lang === 'en' ? 'Mizan Class (Qawmi)' : 'মিজান জামাত (কওমি)',
      action: lang === 'en' ? 'Daily attendance completed (38/40)' : 'দৈনিক হাজিরা গ্রহণ সম্পন্ন (৩৮/৪০ জন)',
      badge: lang === 'en' ? 'Attendance' : 'হাজিরা',
      badgeColor: '#2563eb',
      badgeBg: '#eff6ff',
      time: lang === 'en' ? '25 min ago' : '২৫ মিনিট আগে',
    },
    {
      student: lang === 'en' ? 'Md. Kamal Hossain' : 'মোঃ কামাল হোসেন',
      action: lang === 'en' ? '2-day leave approved for family reasons' : 'পারিবারিক কারণে ২ দিনের ছুটি অনুমোদিত',
      badge: lang === 'en' ? 'Leave Approved' : 'ছুটি মঞ্জুর',
      badgeColor: '#ea580c',
      badgeBg: '#fff7ed',
      time: lang === 'en' ? '1 hour ago' : '১ ঘণ্টা আগে',
    },
    {
      student: lang === 'en' ? 'Md. Ibrahim Khalil' : 'মোঃ ইব্রাহিম খলিল',
      action: lang === 'en' ? 'New admission confirmed in Hifz dept' : 'হিফজ বিভাগে নতুন ভর্তি নিশ্চিত হয়েছে',
      badge: lang === 'en' ? 'Admission' : 'নতুন ভর্তি',
      badgeColor: '#7c3aed',
      badgeBg: '#f5f3ff',
      time: lang === 'en' ? '2 hours ago' : '২ ঘণ্টা আগে',
    },
    {
      student: lang === 'en' ? 'Abdullah Al-Mamun' : 'আব্দুল্লাহ আল-মামুন',
      action: lang === 'en' ? 'Hifz update: Para 18, Page 12 memorized' : 'হিফজ সবক আপডেট: পারা ১৮, পৃষ্ঠা ১২ সফলভাবে মুখস্থ',
      badge: lang === 'en' ? 'Hifz Progress' : 'হিফজ অগ্রগতি',
      badgeColor: '#059669',
      badgeBg: '#ecfdf5',
      time: lang === 'en' ? '3 hours ago' : '৩ ঘণ্টা আগে',
    },
  ];

  return (
    <div
      className="p-3 sm:p-5 lg:p-8 relative min-h-screen"
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Ambient background light movement */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none -z-10 animate-ambient-1"></div>
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl pointer-events-none -z-10 animate-ambient-2"></div>

      {/* Silent Islamic Gold/Emerald Celebration Confetti */}
      <MagicConfetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* =========================================================
          TOP BANNER & CLEAN HEADER (POWERFUL INSIDE, SIMPLE OUTSIDE)
         ========================================================= */}
      <div
        className="animate-magic-1"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px',
          paddingBottom: '18px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '900',
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {selectedRole === 'mutawalli'
                ? t('greeting_mutawalli')
                : activeMadrasa.principal
                ? (lang === 'en' ? `Assalamu Alaikum, ${activeMadrasa.principal}!` : `আস-সালামু আলাইকুম, ${activeMadrasa.principal}!`)
                : t('greeting_principal')}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                color: selectedRole === 'mutawalli' ? '#0d9488' : '#059669',
                backgroundColor: selectedRole === 'mutawalli' ? '#f0fdfa' : '#ecfdf5',
                border: `1px solid ${selectedRole === 'mutawalli' ? '#99f6e4' : '#a7f3d0'}`,
                padding: '2px 9px',
                borderRadius: '999px',
              }}
            >
              ● {selectedRole === 'mutawalli' ? t('status_mutawalli') : activeMadrasa.isCustom ? t('status_custom') : t('status_live')}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: '500' }}>
            {activeMadrasa.name} ({activeMadrasa.upazila}, {activeMadrasa.district}) — {selectedRole === 'mutawalli' ? (lang === 'en' ? 'Board & Treasury Overview' : 'পরিচালনা কমিটি ও তহবিল ওভারভিউ') : (lang === 'en' ? 'Academic & Administration Dashboard' : 'শিক্ষা ও প্রশাসনিক ড্যাশবোর্ড')}
          </p>
        </div>

        {/* Quick Date, Celebration, Language Toggle & AI Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '7px 12px',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
            }}
          >
            📅 {t('date_today')}
          </div>

          {/* Bilingual Language Switcher */}
          <LanguageToggle variant="pill" />

          <button
            type="button"
            onClick={() => setShowConfetti(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '7px 12px',
              borderRadius: '10px',
              backgroundColor: '#fefce8',
              border: '1px solid #fef08a',
              color: '#854d0e',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={lang === 'en' ? 'Celebrate Blessings' : 'নূরানি মোবারকবাদ স্পার্কল'}
          >
            <Sparkles style={{ width: '14px', height: '14px', color: '#ca8a04' }} />
            <span>{t('celebration_btn')}</span>
          </button>

          <Link
            href="/dashboard/ai"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669, #0d9488)',
              color: 'white',
              fontSize: '12px',
              fontWeight: '800',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            <span>{t('ai_btn')}</span>
          </Link>
        </div>
      </div>

      {/* =========================================================
          SLEEK SEGMENTED ROLE & PORTAL BAR (MAGIC ENTRANCE 2)
         ========================================================= */}
      <div
        className="animate-magic-2"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '22px',
          padding: '6px 8px',
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        }}
      >
        {/* Horizontal Pill Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', maxWidth: '100%', padding: '2px 0' }}>
          <button
            type="button"
            onClick={() => setSelectedRole('principal')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: selectedRole === 'principal' ? '#15803d' : 'transparent',
              color: selectedRole === 'principal' ? '#ffffff' : '#334155',
              border: selectedRole === 'principal' ? '1px solid #15803d' : '1px solid transparent',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              boxShadow: selectedRole === 'principal' ? '0 2px 6px rgba(21,128,61,0.25)' : 'none',
            }}
          >
            <Building2 style={{ width: '14px', height: '14px', color: selectedRole === 'principal' ? '#ffffff' : '#15803d' }} />
            <span>{t('role_principal')}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('mutawalli')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: selectedRole === 'mutawalli' ? '#0f766e' : 'transparent',
              color: selectedRole === 'mutawalli' ? '#ffffff' : '#334155',
              border: selectedRole === 'mutawalli' ? '1px solid #0f766e' : '1px solid transparent',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              boxShadow: selectedRole === 'mutawalli' ? '0 2px 6px rgba(15,118,110,0.25)' : 'none',
            }}
          >
            <Crown style={{ width: '14px', height: '14px', color: selectedRole === 'mutawalli' ? '#fde047' : '#0f766e' }} />
            <span>{t('role_mutawalli')}</span>
          </button>

          <Link
            href="/dashboard/parent"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              backgroundColor: '#fff7ed',
              color: '#9a3412',
              border: '1px solid #fed7aa',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <UserCheck style={{ width: '13px', height: '13px', color: '#ea580c' }} />
            <span>{t('role_parent')}</span>
          </Link>

          <Link
            href="/donor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              backgroundColor: '#fefce8',
              color: '#854d0e',
              border: '1px solid #fef08a',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <HeartHandshake style={{ width: '13px', height: '13px', color: '#ca8a04' }} />
            <span>{t('role_donor')}</span>
          </Link>

          <Link
            href="/dashboard/showcase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <BookOpen style={{ width: '13px', height: '13px', color: '#2563eb' }} />
            <span>{t('role_showcase')}</span>
          </Link>
        </div>

        {/* Right side login/switch link */}
        <Link
          href="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 10px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            color: '#475569',
            fontSize: '11px',
            fontWeight: '700',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            marginLeft: 'auto',
          }}
        >
          <LogIn style={{ width: '12px', height: '12px', color: '#64748b' }} />
          <span>{t('role_login_switch')}</span>
        </Link>
      </div>

      {/* Onboarding Guide Card for Newly Registered Custom Madrasas */}
      {activeMadrasa.isCustom && (
        <div
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
            border: '1.5px solid #86efac',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🎉</span>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#166534', margin: 0 }}>
                মুহতারাম, {activeMadrasa.name} সফলভাবে যুক্ত হয়েছে! (আইডি: {activeMadrasa.id})
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#1e3a8a', margin: '6px 0 0 0', fontWeight: '600' }}>
              আপনার প্রতিষ্ঠান সক্রিয় রয়েছে। প্রাথমিক ৩টি ধাপ সম্পন্ন করে ক্লাস কার্যক্রম শুরু করুন:
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px', flexWrap: 'wrap', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a' }} /> ১. প্রতিষ্ঠান ও বিভাগ নিবন্ধন সম্পন্ন
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users style={{ width: '16px', height: '16px', color: '#2563eb' }} /> ২. শিক্ষার্থী তালিকা যোগ করুন
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CalendarCheck style={{ width: '16px', height: '16px', color: '#d97706' }} /> ৩. ডিজিটাল হাজিরা ও ফি চালু করুন
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/dashboard/students"
              style={{
                backgroundColor: '#16a34a',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>শিক্ষার্থী তালিকা যোগ করুন</span>
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================
          ROW 1: 4 KEY METRIC CARDS (MAGIC ENTRANCE 3 WITH LIVE COUNT-UP)
         ========================================================= */}
      <div
        className="animate-magic-3"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        {(selectedRole === 'mutawalli' ? mutawalliStats : stats).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="glow-card-hover"
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '18px',
                padding: '20px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = item.borderColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {/* Card Top: Icon & Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: item.iconBg,
                    border: `1px solid ${item.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon style={{ width: '22px', height: '22px', color: item.iconColor }} />
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '800',
                    color: item.badgeColor,
                    backgroundColor: item.badgeBg,
                    border: `1px solid ${item.borderColor}`,
                    padding: '3px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Number Value */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight: '900',
                      color: '#0f172a',
                      lineHeight: '1.1',
                    }}
                  >
                    {item.value}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#64748b' }}>
                    {item.unit}
                  </span>
                </div>

                <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155', marginTop: '6px' }}>
                  {item.label}
                </div>

                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', fontWeight: '500' }}>
                  {item.subText}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* =========================================================
          ROW 2: 8 CORE SERVICES (MAGIC ENTRANCE 4)
         ========================================================= */}
      <div className="animate-magic-4" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              ✨ {t('services_title')}
            </h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
              {t('services_sub')}
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '3px 10px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
            ● {t('services_quick')}
          </span>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          style={{ width: '100%', boxSizing: 'border-box' }}
        >
          {primaryServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="glow-card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '11px',
                    backgroundColor: service.bg,
                    border: `1px solid ${service.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px', color: service.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#1e293b', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {service.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>


      {/* =========================================================
          ROW 3: RESPONSIVE TWO-COLUMN ENTERPRISE WORKSPACE (MAGIC ENTRANCE 5)
          Mobile: Clean 100% full-width single column (No right cutoff!)
          Desktop: 2-column workspace (Left 65%, Right 35%)
         ========================================================= */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-magic-5"
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT COLUMN: OPERATIONAL INTELLIGENCE */}
        <div className="lg:col-span-2 flex flex-col gap-6" style={{ minWidth: 0, width: '100%' }}>
          {/* Section A: Today's Academic Attendance Breakdown */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  📊 {t('dept_breakdown_title')}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '3px 0 0 0' }}>
                  {t('dept_breakdown_sub')}
                </p>
              </div>
              <Link
                href="/dashboard/attendance"
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#059669',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{t('dept_details_btn')}</span>
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {departmentAttendance.map((dept) => (
                <div key={dept.name}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                      {dept.name}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: dept.color, whiteSpace: 'nowrap' }}>
                      {lang === 'en'
                        ? `${dept.present}/${dept.total} (${dept.rate}%)`
                        : `${formatNumberByLang(dept.present, 'bn')}/${formatNumberByLang(dept.total, 'bn')} জন (${formatNumberByLang(dept.rate, 'bn')}%)`}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${dept.rate}%`,
                        height: '100%',
                        backgroundColor: dept.color,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Real-Time Audit Activity Feed */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  📝 {t('activity_title')}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '3px 0 0 0' }}>
                  {t('activity_sub')}
                </p>
              </div>
              <Link
                href="/dashboard/students"
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>{t('student_list_btn')}</span>
                <ChevronRight style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activities.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '13px',
                        color: '#059669',
                        flexShrink: 0,
                      }}
                    >
                      {item.student[0]}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.student}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.action}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: item.badgeColor,
                        backgroundColor: item.badgeBg,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FINANCIAL HEALTH & NOTICES */}
        <div className="lg:col-span-1 flex flex-col gap-6" style={{ minWidth: 0, width: '100%' }}>
          {/* Financial Summary Card */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '20px',
              border: '1.5px solid #1e293b',
              padding: '24px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DollarSign style={{ width: '18px', height: '18px', color: '#4ade80' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', margin: 0 }}>
                  {t('finance_title')}
                </h3>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
                {t('month_name')}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '12px 8px', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{t('finance_income')}</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#4ade80', marginTop: '4px' }}>
                  {t('val_income')}
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '12px 8px', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{t('finance_expense')}</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#f87171', marginTop: '4px' }}>
                  {t('val_expense')}
                </div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '12px 8px', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{t('finance_balance')}</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#60a5fa', marginTop: '4px' }}>
                  {t('val_balance')}
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/finance"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '11px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
              }}
            >
              {t('finance_full_btn')}
            </Link>
          </div>

          {/* Urgent Notices Board */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {t('notices_title')}
                </h3>
              </div>
              <Link
                href="/dashboard/notice"
                style={{ fontSize: '12px', fontWeight: '700', color: '#ea580c', textDecoration: 'none' }}
              >
                {t('notices_all')}
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #fed7aa',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#9a3412', marginBottom: '3px' }}>
                  {t('notice_exam_title')}
                </div>
                <div style={{ fontSize: '12px', color: '#7c2d12' }}>
                  {t('notice_exam_desc')}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#166534', marginBottom: '3px' }}>
                  {t('notice_parents_title')}
                </div>
                <div style={{ fontSize: '12px', color: '#14532d' }}>
                  {t('notice_parents_desc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
