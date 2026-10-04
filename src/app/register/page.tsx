'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BANGLADESH_DIVISIONS,
  Division,
  District,
  Upazila,
} from '@/lib/geo-data';
import {
  Building2,
  MapPin,
  UserCheck,
  Phone,
  Lock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Home,
  Check,
} from 'lucide-react';
import { saveRegisteredMadrasa } from '@/lib/madrasa-store';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

export default function RegisterMadrasaPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // Step state (1, 2, 3, or 4 for success)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form States
  // Step 1: Institution Info
  const [madrasaName, setMadrasaName] = useState('');
  const [madrasaType, setMadrasaType] = useState<'qawmi' | 'alia' | 'hifz' | 'combined'>('qawmi');
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
  const [madrasaAddress, setMadrasaAddress] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');

  // Step 2: Principal / Admin Info
  const [principalName, setPrincipalName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  // Step 3: Academic Setup
  const [studentCountRange, setStudentCountRange] = useState('100-300');
  const [boardingType, setBoardingType] = useState('both');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([
    'নূরানি ও নাজেরা',
    'হিফজুল কুরআন',
    'কিতাব বিভাগ (মিজান ও কাফিয়া)',
  ]);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Validation Error
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  // Derived geographical lists
  const currentDivision = BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivisionId);
  const currentDistrict = currentDivision?.districts.find((d) => d.id === selectedDistrictId);

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  // Step 1 Validation & Next
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!madrasaName.trim()) {
      setError(isEn ? 'Please enter madrasa name' : 'মাদরাসার নাম লিখুন');
      return;
    }
    if (!selectedDivisionId) {
      setError(isEn ? 'Please select a division' : 'বিভাগ নির্বাচন করুন');
      return;
    }
    if (!selectedDistrictId) {
      setError(isEn ? 'Please select a district' : 'জেলা নির্বাচন করুন');
      return;
    }
    if (!selectedUpazilaName) {
      setError(isEn ? 'Please select an upazila' : 'উপজেলা নির্বাচন করুন');
      return;
    }
    setStep(2);
  };

  // Step 2 Validation & Next
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!principalName.trim()) {
      setError(isEn ? 'Please enter principal / admin name' : 'মুহতামিম / দায়িত্বশীল ব্যক্তির নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setError(isEn ? 'Please enter a valid 11-digit mobile number' : 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (লগইন আইডি হিসেবে ব্যবহৃত হবে)');
      return;
    }
    if (!password || password.length < 6) {
      setError(isEn ? 'Password must be at least 6 characters' : 'কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন');
      return;
    }
    if (password !== confirmPassword) {
      setError(isEn ? 'Passwords do not match' : 'পাসওয়ার্ড দুটি মিলছে না');
      return;
    }
    setStep(3);
  };

  // Step 3 Final Submit
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedClasses.length === 0) {
      setError(isEn ? 'Please select at least one class / department' : 'কমপক্ষে একটি শ্রেণি বা বিভাগ নির্বাচন করুন');
      return;
    }
    if (!agreeTerms) {
      setError(isEn ? 'Please agree to terms and conditions' : 'শর্তাবলীতে সম্মতি প্রদান করুন');
      return;
    }

    setIsSubmitting(true);

    const randomId = `NH-BD-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedId(randomId);

    // Save in central multi-tenancy store & sync across Map & Directory
    saveRegisteredMadrasa({
      id: randomId,
      name: madrasaName,
      type: madrasaType,
      typeLabel:
        madrasaType === 'qawmi'
          ? (isEn ? 'Qawmi Madrasa' : 'কওমি মাদরাসা')
          : madrasaType === 'alia'
          ? (isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা')
          : madrasaType === 'hifz'
          ? (isEn ? 'Hifz Academy' : 'হিফজ একাডেমি')
          : (isEn ? 'Combined Institution' : 'সমন্বিত প্রতিষ্ঠান'),
      divisionId: selectedDivisionId,
      division: isEn ? (currentDivision?.name || '') : (currentDivision?.nameBn || ''),
      districtId: selectedDistrictId,
      district: isEn ? (currentDistrict?.name || '') : (currentDistrict?.nameBn || ''),
      upazila: selectedUpazilaName,
      address: madrasaAddress || `${selectedUpazilaName}, ${isEn ? currentDistrict?.name : currentDistrict?.nameBn}`,
      principal: principalName,
      phone: phone,
      studentCount: studentCountRange,
      classes: selectedClasses,
      registeredAt: new Date().toISOString(),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success screen
    }, 800);
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #eff6ff 100%)',
        padding: '24px 16px 60px',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top Header Navbar */}
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#0f172a',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z"/>
              <path d="M9 20v-5a3 3 0 0 1 6 0v5"/>
              <path d="M12 2v3"/>
              <circle cx="12" cy="7" r="1"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', lineHeight: '1.2' }}>
              {isEn ? 'NOORHUB' : 'নূরহাব'}
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700' }}>
              {isEn ? 'Madrasa Registration Portal' : 'মাদরাসা নিবন্ধন পোর্টাল'}
            </div>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LanguageToggle variant="compact" />

          <Link
            href="/login"
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#334155',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
            }}
          >
            {isEn ? 'Already registered? ' : 'আগে থেকেই অ্যাকাউন্ট আছে? '}
            <span style={{ color: '#16a34a' }}>{isEn ? 'Login' : 'লগইন'}</span>
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Step Progress Header */}
        {step !== 4 && (
          <div
            style={{
              padding: '24px 28px',
              backgroundColor: '#f8fafc',
              borderBottom: '1.5px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isEn ? `Step ${step} / 3` : `ধাপ ${step} / ৩`}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '2px 0 0 0' }}>
                  {step === 1 && (isEn ? '1. Madrasa General Information' : '১. মাদরাসার প্রাথমিক তথ্য')}
                  {step === 2 && (isEn ? '2. Principal & Security Credentials' : '২. মুহতামিম ও লগইন নিরাপত্তা')}
                  {step === 3 && (isEn ? '3. Academic Setup & Departments' : '৩. জামাত ও ক্লাস সেটআপ')}
                </h2>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#16a34a',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}
              >
                {isEn ? 'Free Registration' : 'বিনামূল্যে নিবন্ধন'}
              </span>
            </div>

            {/* 3 Steps Visual Line */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ height: '6px', borderRadius: '4px', backgroundColor: step >= 1 ? '#16a34a' : '#e2e8f0', transition: 'background 0.3s' }} />
              <div style={{ height: '6px', borderRadius: '4px', backgroundColor: step >= 2 ? '#16a34a' : '#e2e8f0', transition: 'background 0.3s' }} />
              <div style={{ height: '6px', borderRadius: '4px', backgroundColor: step >= 3 ? '#16a34a' : '#e2e8f0', transition: 'background 0.3s' }} />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            style={{
              margin: '20px 28px 0',
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div style={{ padding: '28px' }}>
          {/* =========================================================
              STEP 1: INSTITUTION INFORMATION
             ========================================================= */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Madrasa Name */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Full Madrasa / Institution Name *' : 'মাদরাসার পূর্ণ নাম *'}
                </label>
                <input
                  type="text"
                  placeholder={isEn ? 'e.g. Jamia Islamia Darul Uloom Madrasa' : 'যেমন: জামিয়া ইসলামিয়া দারুল উলুম মাদরাসা'}
                  value={madrasaName}
                  onChange={(e) => setMadrasaName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Hind Siliguri', sans-serif",
                  }}
                  required
                />
              </div>

              {/* Madrasa Curriculum / Type */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Curriculum / Institutional Type *' : 'মাদরাসার ধরন / কারিকুলাম *'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'qawmi', label: isEn ? 'Qawmi Madrasa' : 'কওমি মাদরাসা', desc: isEn ? 'Befaq & Qawmi Board' : 'বেফাক ও জাতীয় কওমি সিলেবাস' },
                    { id: 'alia', label: isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা', desc: isEn ? 'Madrasa Education Board' : 'মাদরাসা শিক্ষা বোর্ড' },
                    { id: 'hifz', label: isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন', desc: isEn ? 'Hifz & Tajweed Academy' : 'হিফজ ও তাজবিদ একাডেমি' },
                    { id: 'combined', label: isEn ? 'Combined Model' : 'সমন্বিত প্রতিষ্ঠান', desc: isEn ? 'Noorani, Hifz & General' : 'নূরানি, হিফজ ও জেনারেল' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMadrasaType(t.id as any)}
                      style={{
                        padding: '14px 12px',
                        borderRadius: '14px',
                        border: '1.5px solid',
                        borderColor: madrasaType === t.id ? '#16a34a' : '#e2e8f0',
                        backgroundColor: madrasaType === t.id ? '#f0fdf4' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '800', color: madrasaType === t.id ? '#15803d' : '#1e293b' }}>
                        {t.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Division, District, Upazila (3 Connected Dropdowns) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {/* Division */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                    {isEn ? 'Division *' : 'বিভাগ *'}
                  </label>
                  <select
                    value={selectedDivisionId}
                    onChange={(e) => {
                      setSelectedDivisionId(e.target.value);
                      setSelectedDistrictId('');
                      setSelectedUpazilaName('');
                    }}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                    required
                  >
                    <option value="">{isEn ? '-- Select Division --' : '-- বিভাগ নির্বাচন করুন --'}</option>
                    {BANGLADESH_DIVISIONS.map((div) => (
                      <option key={div.id} value={div.id}>
                        {isEn ? `${div.name} Division` : `${div.nameBn} বিভাগ`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                    {isEn ? 'District *' : 'জেলা *'}
                  </label>
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => {
                      setSelectedDistrictId(e.target.value);
                      setSelectedUpazilaName('');
                    }}
                    disabled={!selectedDivisionId}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: !selectedDivisionId ? '#f8fafc' : '#ffffff',
                      outline: 'none',
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                    required
                  >
                    <option value="">{isEn ? '-- Select District --' : '-- জেলা নির্বাচন করুন --'}</option>
                    {currentDivision?.districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {isEn ? `${dist.name} District` : `${dist.nameBn} জেলা`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                    {isEn ? 'Upazila / Thana *' : 'উপজেলা / থানা *'}
                  </label>
                  <select
                    value={selectedUpazilaName}
                    onChange={(e) => setSelectedUpazilaName(e.target.value)}
                    disabled={!selectedDistrictId}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: !selectedDistrictId ? '#f8fafc' : '#ffffff',
                      outline: 'none',
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                    required
                  >
                    <option value="">{isEn ? '-- Select Upazila --' : '-- উপজেলা নির্বাচন করুন --'}</option>
                    {currentDistrict?.upazilas.map((up) => (
                      <option key={up.name} value={isEn ? up.name : up.nameBn}>
                        {isEn ? up.name : up.nameBn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exact Address / Village */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Detailed Address / Village' : 'বিস্তারিত ঠিকানা ও গ্রাম / এলাকা'}
                </label>
                <input
                  type="text"
                  placeholder={isEn ? 'e.g. Near Sirajdikhan Bazar, Main Road' : 'যেমন: চরশেলহাতা, সিরাজদিখান বাজার সংলগ্ন'}
                  value={madrasaAddress}
                  onChange={(e) => setMadrasaAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Hind Siliguri', sans-serif",
                  }}
                />
              </div>

              {/* Next Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                  }}
                >
                  <span>{isEn ? 'Next Step (Principal Info)' : 'পরবর্তী ধাপ (মুহতামিম তথ্য)'}</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </form>
          )}

          {/* =========================================================
              STEP 2: PRINCIPAL / ADMIN & LOGIN SECURITY
             ========================================================= */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Principal / Muhtamim Full Name *' : 'মুহতামিম / প্রধান শিক্ষকের নাম *'}
                </label>
                <input
                  type="text"
                  placeholder={isEn ? 'e.g. Mawlana Muhammad Abdullah' : 'যেমন: মাওলানা মুহাম্মদ আব্দুল্লাহ'}
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: "'Hind Siliguri', sans-serif",
                  }}
                  required
                />
              </div>

              {/* Mobile Number (Login ID) */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Mobile Number (Will be your Login ID) *' : 'মুহতামিমের মোবাইল নম্বর (এটিই হবে আপনার লগইন আইডি) *'}
                </label>
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '14px',
                      fontWeight: '800',
                      color: '#64748b',
                    }}
                  >
                    +88
                  </span>
                  <input
                    type="tel"
                    placeholder="01711223344"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{
                      width: '100%',
                      paddingLeft: '50px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: "'Hind Siliguri', sans-serif",
                    }}
                    maxLength={11}
                    required
                  />
                </div>
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  {isEn ? 'SMS notifications and login access will be dispatched to this number.' : 'এই নম্বরে ড্যাশবোর্ড অ্যাক্সেস ও এসএমএস নোটিফিকেশন পাঠানো হবে।'}
                </span>
              </div>

              {/* Password & Confirm Password */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                    {isEn ? 'Create Password *' : 'গোপন পাসওয়ার্ড তৈরি করুন *'}
                  </label>
                  <input
                    type="password"
                    placeholder={isEn ? 'At least 6 characters...' : 'কমপক্ষে ৬ অক্ষর...'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                    {isEn ? 'Confirm Password *' : 'পাসওয়ার্ডটি পুনরায় লিখুন *'}
                  </label>
                  <input
                    type="password"
                    placeholder={isEn ? 'Re-type password...' : 'একই পাসওয়ার্ড লিখুন...'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Email Address (Optional)' : 'ইমেইল অ্যাড্রেস (ঐচ্ছিক)'}
                </label>
                <input
                  type="email"
                  placeholder="madrasa@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Back & Next Navigation */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 20px',
                    borderRadius: '14px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowLeft style={{ width: '16px', height: '16px' }} />
                  <span>{isEn ? 'Previous Step' : 'আগের ধাপ'}</span>
                </button>

                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                  }}
                >
                  <span>{isEn ? 'Next Step (Class Setup)' : 'পরবর্তী ধাপ (ক্লাস সেটআপ)'}</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </form>
          )}

          {/* =========================================================
              STEP 3: ACADEMIC SETUP & LAUNCH
             ========================================================= */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Estimated Student Capacity */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Estimated Total Students *' : 'মাদরাসায় আনুমানিক মোট শিক্ষার্থী সংখ্যা *'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'under-50', label: isEn ? 'Under 50' : '৫০ এর কম' },
                    { id: '50-100', label: isEn ? '50 — 100' : '৫০ — ১০০ জন' },
                    { id: '100-300', label: isEn ? '100 — 300' : '১০০ — ৩০০ জন' },
                    { id: '300-500', label: isEn ? '300 — 500' : '৩০০ — ৫০০ জন' },
                    { id: '500+', label: isEn ? '500+ Students' : '৫০০+ শিক্ষার্থী' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStudentCountRange(s.id)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '12px',
                        border: '1.5px solid',
                        borderColor: studentCountRange === s.id ? '#16a34a' : '#e2e8f0',
                        backgroundColor: studentCountRange === s.id ? '#f0fdf4' : '#ffffff',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: studentCountRange === s.id ? '#16a34a' : '#334155',
                        cursor: 'pointer',
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Classes / Jamats Checkboxes */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                  {isEn ? 'Active Departments in your Madrasa (Check all that apply) *' : 'আপনার মাদরাসায় যে যে বিভাগ চালু আছে (টিক দিন) *'}
                </label>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '10px' }}>
                  {isEn ? 'You can add or customize more classes anytime from the dashboard.' : 'পরবর্তীতে ড্যাশবোর্ড থেকে আরও ক্লাস ও বিভাগ যোগ করতে পারবেন।'}
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'noorani', bn: 'নূরানি ও নাজেরা', en: 'Noorani & Nazera' },
                    { id: 'hifz', bn: 'হিফজুল কুরআন', en: 'Hifzul Quran' },
                    { id: 'kitab', bn: 'কিতাব বিভাগ (মিজান ও কাফিয়া)', en: 'Kitab Dept (Mizan & Kafiya)' },
                    { id: 'dawrah', bn: 'দাওরায়ে হাদিস (তাকমিল)', en: 'Dawrah-e-Hadith (Takmil)' },
                    { id: 'dakhil', bn: 'ইবতেদায়ী ও দাখিল (আলিয়া)', en: 'Ibtedayi & Dakhil (Alia)' },
                    { id: 'ifta', bn: 'ইফতা ও বিশেষ উচ্চতর বিভাগ', en: 'Ifta & Higher Islamic Research' },
                  ].map((cls) => {
                    const isChecked = selectedClasses.includes(cls.bn);
                    return (
                      <div
                        key={cls.id}
                        onClick={() => toggleClass(cls.bn)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1.5px solid',
                          borderColor: isChecked ? '#16a34a' : '#e2e8f0',
                          backgroundColor: isChecked ? '#f0fdf4' : '#ffffff',
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '6px',
                            backgroundColor: isChecked ? '#16a34a' : '#ffffff',
                            border: `1.5px solid ${isChecked ? '#16a34a' : '#cbd5e1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                          }}
                        >
                          {isChecked && <Check style={{ width: '14px', height: '14px', strokeWidth: '3' }} />}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: isChecked ? '800' : '600', color: isChecked ? '#15803d' : '#334155' }}>
                          {isEn ? cls.en : cls.bn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Boarding Facility */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                  {isEn ? 'Boarding & Hostel Facility' : 'আবাসিক ও বোর্ডিং সুবিধা'}
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'both', label: isEn ? 'Both Residential & Day' : 'আবাসিক ও অনাবাসিক উভয়ই' },
                    { id: 'residential', label: isEn ? 'Fully Residential' : 'সম্পূর্ণ আবাসিক' },
                    { id: 'daycare', label: isEn ? 'Day Scholar Only' : 'শুধুমাত্র অনাবাসিক (ডে-কেয়ার)' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBoardingType(b.id)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1.5px solid',
                        borderColor: boardingType === b.id ? '#16a34a' : '#e2e8f0',
                        backgroundColor: boardingType === b.id ? '#f0fdf4' : '#ffffff',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: boardingType === b.id ? '#16a34a' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <div
                onClick={() => setAgreeTerms(!agreeTerms)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    backgroundColor: agreeTerms ? '#16a34a' : '#ffffff',
                    border: `1.5px solid ${agreeTerms ? '#16a34a' : '#cbd5e1'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  {agreeTerms && <Check style={{ width: '14px', height: '14px', strokeWidth: '3' }} />}
                </div>
                <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                  {isEn
                    ? 'I hereby confirm that all information provided is accurate and agree to manage institutional administration under NoorHub policies.'
                    : 'আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সঠিক এবং নূরহাবের নীতিমালার অধীনে মাদরাসার প্রশাসনিক কাজ পরিচালনার জন্য সম্মত আছি।'}
                </div>
              </div>

              {/* Back & Complete Registration */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 20px',
                    borderRadius: '14px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowLeft style={{ width: '16px', height: '16px' }} />
                  <span>{isEn ? 'Previous Step' : 'আগের ধাপ'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 32px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '900',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(22, 163, 74, 0.4)',
                  }}
                >
                  {isSubmitting ? (
                    <span>{isEn ? 'Setting up workspace...' : 'নিবন্ধন প্রস্তুত হচ্ছে...'}</span>
                  ) : (
                    <>
                      <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                      <span>{isEn ? 'Complete Registration' : 'মাদরাসা নিবন্ধন সম্পন্ন করুন'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* =========================================================
              STEP 4: REGISTRATION SUCCESS SCREEN
             ========================================================= */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 10px 30px rgba(22, 163, 74, 0.25)',
                }}
              >
                <CheckCircle2 style={{ width: '48px', height: '48px' }} />
              </div>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#059669',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                }}
              >
                {isEn ? 'Successfully Onboarded • Live' : 'সফল অন্তর্ভুক্তি • লাইভ'}
              </span>

              <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '12px 0 6px' }}>
                {isEn ? 'Masha\'Allah! Registration Completed' : 'মাশাআল্লাহ! মাদরাসা সফলভাবে যুক্ত হয়েছে'}
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                {isEn ? (
                  <>A brand new administrative dashboard has been provisioned for <strong style={{ color: '#0f172a' }}>{madrasaName}</strong> in the NoorHub ecosystem.</>
                ) : (
                  <><strong style={{ color: '#0f172a' }}>{madrasaName}</strong>-এর জন্য নূরহাব ইকোসিস্টেমে সম্পূর্ণ নতুন প্রশাসনিক ড্যাশবোর্ড তৈরি করা হয়েছে।</>
                )}
              </p>

              {/* Dossier Card */}
              <div
                style={{
                  maxWidth: '460px',
                  margin: '0 auto 28px',
                  padding: '20px',
                  borderRadius: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{isEn ? 'Madrasa ID:' : 'মাদরাসা আইডি:'}</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#16a34a' }}>{generatedId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{isEn ? 'Location:' : 'অবস্থান:'}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                    {selectedUpazilaName}, {isEn ? currentDistrict?.name : currentDistrict?.nameBn}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{isEn ? 'Principal:' : 'মুহতামিম:'}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{principalName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{isEn ? 'Login Mobile:' : 'লগইন মোবাইল:'}</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7' }}>+88 {phone}</span>
                </div>
              </div>

              {/* CTA Go to Dashboard */}
              <button
                type="button"
                onClick={handleGoToDashboard}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 36px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(22, 163, 74, 0.4)',
                }}
              >
                <span>{isEn ? 'Access Management Dashboard Now' : 'সরাসরি ড্যাশবোর্ডে প্রবেশ করুন'}</span>
                <ArrowRight style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
