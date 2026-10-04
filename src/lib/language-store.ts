'use client';

import { useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

const STORAGE_KEY_LANG = 'noorhub_preferred_language';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' ? 'en' : 'bn';
  } catch {
    return 'bn';
  }
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
    window.dispatchEvent(new CustomEvent('noorhub_language_changed', { detail: lang }));
  } catch (err) {
    console.error('Failed to save language preference', err);
  }
}

export function toggleStoredLanguage(): Language {
  const current = getStoredLanguage();
  const next: Language = current === 'bn' ? 'en' : 'bn';
  setStoredLanguage(next);
  return next;
}

/* =========================================================================
   TRANSLATIONS DICTIONARY
   ========================================================================= */
export const TRANSLATIONS = {
  bn: {
    // Navigation / Sidebar
    nav_dashboard: 'ড্যাশবোর্ড',
    nav_students: 'ছাত্র ও আইডি কার্ড',
    nav_attendance: 'স্মার্ট হাজিরা',
    nav_results: 'পরীক্ষা ও ফলাফল',
    nav_finance: 'হিসাব ও অর্থ',
    nav_hifz: 'হিফজ ট্র্যাকার',
    nav_map: 'ইসলামিক মানচিত্র (GIS)',
    nav_competition: 'সুস্থ প্রতিযোগিতা',
    nav_ai: 'নূর এআই অ্যাসিস্ট্যান্ট',
    nav_notice: 'নোটিশ বোর্ড',
    nav_showcase: 'মাদরাসা পরিচিতি',
    nav_register: 'নতুন মাদরাসা নিবন্ধন',
    nav_explore: 'পাবলিক এক্সপ্লোরার',
    nav_settings: 'সেটিংস',
    nav_teachers: 'শিক্ষক ও স্টাফ',
    nav_syllabus: 'সিলেবাস ও কিতাব',

    // Groups
    group_main: 'মূল ব্যবস্থাপনা',
    group_academic: 'একাডেমিক ও বিশেষ ফিচার',
    group_system: 'শোকেস ও সিস্টেম',

    // TopBar
    search_placeholder: 'ছাত্র, শিক্ষক, হিসাব বা মাদরাসা খুঁজুন...',
    calendar_hijri: 'রবিউস সানি ১৪৪৭ হিজরি',
    ai_btn: 'নূর এআই',
    public_portal: 'পাবলিক পোর্টাল',
    switch_madrasa: 'প্রতিষ্ঠান পরিবর্তন করুন',
    lang_toggle: 'English',

    // Dashboard Header
    greeting_principal: 'আস-সালামু আলাইকুম, মুহতারাম মুহতামিম সাহেব!',
    greeting_mutawalli: 'আস-সালামু আলাইকুম, মুহতারাম মুতাওয়াল্লি সাহেব!',
    status_live: 'সিস্টেম লাইভ',
    status_custom: 'কাস্টম প্রতিষ্ঠান',
    status_mutawalli: 'মুতাওয়াল্লি হাব',
    date_today: 'রবিবার, ২১ সেপ্টেম্বর ২০২৬',
    celebration_btn: 'মোবারকবাদ ✨',

    // Roles Bar
    role_principal: 'মুহতামিম ড্যাশবোর্ড',
    role_mutawalli: 'মুতাওয়াল্লি হাব',
    role_parent: 'অভিভাবক',
    role_donor: 'দাতা ও দান',
    role_showcase: 'মাদরাসা পরিচিতি',
    role_login_switch: 'লগইন / সুইচ',

    // 4 Key Metrics
    metric_students: 'মোট শিক্ষার্থী',
    metric_students_sub: 'নতুন ভর্তি +১২ জন এই মাসে',
    metric_students_badge: '৯২% উপস্থিতি',
    metric_attendance: 'আজকের উপস্থিতি',
    metric_attendance_sub: 'অনুপস্থিত ৩৫ জন • ছুটিতে ৪ জন',
    metric_attendance_badge: '৮৯.৯% লাইভ',
    metric_fees: 'মাসিক ফি আদায়',
    metric_fees_sub: 'বকেয়া ৩৫,০০০ ৳ • লক্ষ্যমাত্রা ৯৫%',
    metric_fees_badge: '৮৮% সংগৃহীত',
    metric_teachers: 'মোট শিক্ষক ও স্টাফ',
    metric_teachers_sub: 'উপস্থিত ২২ জন • ছুটিতে ২ জন',
    metric_teachers_badge: '১০০% কার্যকর',

    // Mutawalli stats
    metric_mutawalli_fund: 'মোট কোষাগার ও ব্যাংক তহবিল',
    metric_mutawalli_budget: 'মাসিক স্টাফ বেতন বাজেট',
    metric_mutawalli_property: 'ওয়াকফ ও স্থাবর সম্পত্তি',
    metric_mutawalli_resolution: 'কমিটি রেজুলেশন ও অনুমোদন',

    // Services
    services_title: 'প্রধান সেবাসমূহ',
    services_sub: 'দৈনন্দিন শিক্ষা, প্রশাসনিক ও আর্থিক ব্যবস্থাপনা',
    services_quick: 'দ্রুত প্রবেশ',

    // Attendance Breakdown
    dept_breakdown_title: 'বিভাগভিত্তিক উপস্থিতি ও একাডেমিক চিত্র',
    dept_breakdown_sub: 'আজকের ৩৪৭ জন শিক্ষার্থীর শ্রেণিভিত্তিক উপস্থিতি হার',
    dept_details_btn: 'বিস্তারিত হাজিরা',

    // Activity Feed
    activity_title: 'সাম্প্রতিক প্রশাসনিক কার্যক্রম ও অডিট',
    activity_sub: 'সর্বশেষ ফি আদায়, ছুটি ও হিফজ সবক এন্ট্রি',
    student_list_btn: 'ছাত্র তালিকা',

    // Finance Box
    finance_title: 'মাসিক আর্থিক স্বাস্থ্য',
    finance_income: 'মোট আয়',
    finance_expense: 'মোট ব্যয়',
    finance_balance: 'অবশিষ্ট তহবিল',
    finance_full_btn: 'পূর্ণ আর্থিক হিসাব ও লেনদেন দেখুন →',

    // Urgent Notices
    notices_title: 'জরুরি নোটিশ বোর্ড',
    notices_all: 'সকল নোটিশ',
    notice_exam_title: '📢 দ্বিতীয় সাময়িক পরীক্ষার সময়সূচি প্রকাশ',
    notice_exam_desc: 'আগামী রবিবার থেকে সকল জামাতের পরীক্ষা শুরু হবে।',
    notice_parents_title: '🤝 হিফজ বিভাগের অভিভাবক সমাবেশ',
    notice_parents_desc: 'শুক্রবার বাদ আসর মাদরাসা অডিটোরিয়ামে উপস্থিত থাকুন।',

    // Financial Values
    val_income: '৳১,২৪,৫০০',
    val_expense: '৳৮৯,২০০',
    val_balance: '৳৩৫,৩০০',
    month_name: 'সেপ্টেম্বর ২০২৬',

    // Entry Page & Login
    entry_title: 'নূরহাব',
    entry_subtitle: 'কওমি, আলিয়া, জেনারেল ও হিফজ শিক্ষা প্রতিষ্ঠান ব্যবস্থাপনা',
    entry_enter_dashboard: 'সরাসরি মূল ড্যাশবোর্ডে প্রবেশ করুন',
    entry_live_badge: 'লাইভ',
    entry_choose_role: 'আপনার ভূমিকা বেছে নিন',
    entry_add_madrasa: 'আপনার মাদরাসা যুক্ত করুন',
    entry_add_madrasa_sub: '৩ ধাপে বিনামূল্যে নতুন প্রতিষ্ঠান নিবন্ধন',
    entry_map_btn: 'বাংলাদেশের মাদরাসার মানচিত্র',
    entry_explore_title: 'উন্মুক্ত পরিদর্শন (লগইন ছাড়া)',
    entry_explore_sub: 'মাদরাসা তালিকা ও সিলেবাস এক্সপ্লোরার',
    entry_footer: 'নূরহাব (NOORHUB) · সর্বাধুনিক শিক্ষা ব্যবস্থাপনা প্ল্যাটফর্ম',
    role_principal_card: 'মুহতামিম / প্রধান শিক্ষক',
    role_teacher_card: 'শিক্ষক / উস্তাদ',
    role_student_card: 'ছাত্র / শিক্ষার্থী',
    role_parent_card: 'অভিভাবক',

    // Login Form
    login_back: 'ফিরে যান',
    login_welcome: 'স্বাগতম!',
    login_panel: 'প্যানেল',
    login_user_label: 'মোবাইল নম্বর বা রোল নম্বর',
    login_user_placeholder: '01XXXXXXXXX বা রোল নম্বর',
    login_pass_label: 'পাসওয়ার্ড',
    login_pass_placeholder: 'পাসওয়ার্ড দিন',
    login_submit: 'প্রবেশ করুন',
    login_submitting: 'প্রবেশ করা হচ্ছে...',
    login_need_madrasa: 'আপনার মাদরাসা এখনও যুক্ত করেননি?',
    login_register_now: '🕌 নতুন মাদরাসা যুক্ত করুন (ফ্রি নিবন্ধন) →',
    login_help: 'সহায়তা প্রয়োজন?',
    login_guide: 'নূর এআই গাইড',
  },

  en: {
    // Navigation / Sidebar
    nav_dashboard: 'Dashboard',
    nav_students: 'Students & ID Cards',
    nav_attendance: 'Smart Attendance',
    nav_results: 'Exams & Results',
    nav_finance: 'Finance & Accounts',
    nav_hifz: 'Hifz Tracker',
    nav_map: 'Islamic Map (GIS)',
    nav_competition: 'Healthy Competition',
    nav_ai: 'Noor AI Assistant',
    nav_notice: 'Notice Board',
    nav_showcase: 'Madrasa Showcase',
    nav_register: 'Register New Madrasa',
    nav_explore: 'Public Explorer',
    nav_settings: 'Settings',
    nav_teachers: 'Teachers & Staff',
    nav_syllabus: 'Syllabus & Kitabs',

    // Groups
    group_main: 'Core Management',
    group_academic: 'Academic & Features',
    group_system: 'Showcase & System',

    // TopBar
    search_placeholder: 'Search students, teachers, finances...',
    calendar_hijri: 'Rabi al-Thani 1447 AH',
    ai_btn: 'Noor AI',
    public_portal: 'Public Portal',
    switch_madrasa: 'Switch Institution',
    lang_toggle: 'বাংলা',

    // Dashboard Header
    greeting_principal: 'Assalamu Alaikum, Respected Principal!',
    greeting_mutawalli: 'Assalamu Alaikum, Respected Mutawalli!',
    status_live: 'System Live',
    status_custom: 'Custom Madrasa',
    status_mutawalli: 'Mutawalli Hub',
    date_today: 'Sunday, 21 September 2026',
    celebration_btn: 'Blessings ✨',

    // Roles Bar
    role_principal: 'Principal Mode',
    role_mutawalli: 'Mutawalli Hub',
    role_parent: 'Parent',
    role_donor: 'Donor & Charity',
    role_showcase: 'Showcase',
    role_login_switch: 'Login / Switch',

    // 4 Key Metrics
    metric_students: 'Total Students',
    metric_students_sub: '+12 new admissions this month',
    metric_students_badge: '92% Attendance',
    metric_attendance: "Today's Attendance",
    metric_attendance_sub: '35 absent • 4 on leave',
    metric_attendance_badge: '89.9% Live',
    metric_fees: 'Monthly Fee Collection',
    metric_fees_sub: 'Due: ৳35,000 • Target: 95%',
    metric_fees_badge: '88% Collected',
    metric_teachers: 'Teachers & Staff',
    metric_teachers_sub: '22 present • 2 on leave',
    metric_teachers_badge: '100% Active',

    // Mutawalli stats
    metric_mutawalli_fund: 'Treasury & Bank Fund',
    metric_mutawalli_budget: 'Staff Payroll Budget',
    metric_mutawalli_property: 'Waqf & Real Estate',
    metric_mutawalli_resolution: 'Committee Resolutions',

    // Services
    services_title: 'Core Services',
    services_sub: 'Daily academic, administrative & financial modules',
    services_quick: 'Quick Access',

    // Attendance Breakdown
    dept_breakdown_title: 'Department Attendance & Academics',
    dept_breakdown_sub: 'Classwise attendance breakdown for 347 students',
    dept_details_btn: 'Detailed Attendance',

    // Activity Feed
    activity_title: 'Recent Operations & Audit Log',
    activity_sub: 'Latest fee receipts, leave requests & Hifz updates',
    student_list_btn: 'Student Directory',

    // Finance Box
    finance_title: 'Monthly Financial Health',
    finance_income: 'Total Income',
    finance_expense: 'Total Expense',
    finance_balance: 'Net Reserves',
    finance_full_btn: 'View Full Financial Ledger →',

    // Urgent Notices
    notices_title: 'Urgent Notice Board',
    notices_all: 'All Notices',
    notice_exam_title: '📢 2nd Term Examination Schedule Released',
    notice_exam_desc: 'Examinations for all classes will commence from next Sunday.',
    notice_parents_title: '🤝 Hifz Department Guardians Assembly',
    notice_parents_desc: 'Please join in the madrasa auditorium on Friday after Asr prayer.',

    // Financial Values
    val_income: '৳124,500',
    val_expense: '৳89,200',
    val_balance: '৳35,300',
    month_name: 'September 2026',

    // Entry Page & Login
    entry_title: 'NOORHUB',
    entry_subtitle: 'Universal Islamic Education Management Platform',
    entry_enter_dashboard: 'Enter Main Dashboard Directly',
    entry_live_badge: 'LIVE',
    entry_choose_role: 'Choose Your Portal',
    entry_add_madrasa: 'Register Your Madrasa',
    entry_add_madrasa_sub: 'Free 3-step digital onboarding',
    entry_map_btn: 'Bangladesh Madrasa GIS Map',
    entry_explore_title: 'Public Explorer (Without Login)',
    entry_explore_sub: 'Madrasa Directory & Kitab Curriculum',
    entry_footer: 'NOORHUB · Next-Generation Madrasa SaaS Platform',
    role_principal_card: 'Principal / Headmaster',
    role_teacher_card: 'Teacher / Ustadh',
    role_student_card: 'Student / Talib Ilm',
    role_parent_card: 'Parent Portal',

    // Login Form
    login_back: 'Back',
    login_welcome: 'Welcome!',
    login_panel: 'Portal',
    login_user_label: 'Mobile Number or Roll No',
    login_user_placeholder: '01XXXXXXXXX or Roll Number',
    login_pass_label: 'Password',
    login_pass_placeholder: 'Enter your password',
    login_submit: 'Sign In',
    login_submitting: 'Signing in...',
    login_need_madrasa: "Haven't registered your madrasa yet?",
    login_register_now: '🕌 Register New Madrasa (Free Setup) →',
    login_help: 'Need assistance?',
    login_guide: 'Noor AI Guide',
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.bn;

export function useLanguage() {
  const [lang, setLangState] = useState<Language>('bn');

  useEffect(() => {
    setLangState(getStoredLanguage());

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail) {
        setLangState(customEvent.detail);
      } else {
        setLangState(getStoredLanguage());
      }
    };

    window.addEventListener('noorhub_language_changed', handleLangChange);
    return () => window.removeEventListener('noorhub_language_changed', handleLangChange);
  }, []);

  const t = (key: TranslationKey): string => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS.bn[key] || key;
  };

  const toggleLanguage = () => {
    toggleStoredLanguage();
  };

  const setLanguage = (newLang: Language) => {
    setStoredLanguage(newLang);
  };

  return { lang, t, toggleLanguage, setLanguage };
}
