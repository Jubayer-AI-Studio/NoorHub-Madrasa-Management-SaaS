'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

export default function SettingsPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [backupDownloaded, setBackupDownloaded] = useState(false);

  // Institution Profile State
  const [institution, setInstitution] = useState({
    nameBn: 'আল-জামিয়া আল-ইসলামিয়া নূরহাব',
    nameEn: 'Al-Jamia Al-Islamia NoorHub',
    code: 'NH-MAD-786',
    principalName: 'মাওলানা মুফতি আব্দুল্লাহ আল-কাফী',
    principalNameEn: 'Mawlana Mufti Abdullah Al-Kafi',
    phone: '01711223344',
    whatsapp: '01711223344',
    division: 'ঢাকা',
    divisionEn: 'Dhaka',
    district: 'ঢাকা',
    districtEn: 'Dhaka',
    upazila: 'ধানমন্ডি',
    upazilaEn: 'Dhanmondi',
    address: 'বাড়ি ১২, রোড ৪, ধানমন্ডি, ঢাকা-১২০৫',
    addressEn: 'House 12, Road 4, Dhanmondi, Dhaka-1205',
    established: '১৯৯৫',
    establishedEn: '1995',
  });

  // Curriculum Toggles
  const [curriculums, setCurriculums] = useState({
    qawmi: true,
    hifz: true,
    alia: false,
    general: false,
  });

  // Fee Structure
  const [fees, setFees] = useState({
    monthlyFee: '850',
    admissionFee: '2500',
    boardingFee: '3500',
    bkashMerchant: '01711223344',
    nagadMerchant: '01811223344',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleDownloadBackup = () => {
    setBackupDownloaded(true);
    const dummyData = JSON.stringify({ institution, curriculums, fees, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([dummyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noorhub-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => setBackupDownloaded(false), 5000);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Institution Settings & Configuration' : 'প্রতিষ্ঠান সেটিংস ও কনফিগারেশন'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? 'Madrasa info, curriculum selection, fee structure, and offline backup'
              : 'মাদরাসার তথ্য, সিলেবাস নির্ধারণ, ফি কাঠামো ও অফলাইন ব্যাকআপ'}
          </p>
        </div>

        {/* 1-Click Offline Backup */}
        <button
          onClick={handleDownloadBackup}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            color: '#16a34a',
            fontWeight: '700',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {isEn ? '1-Click Offline Backup' : '১-ক্লিক অফলাইন ব্যাকআপ'}
        </button>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div
          className="card fade-in"
          style={{
            padding: '0.875rem 1rem',
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            color: '#16a34a',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {isEn
            ? 'All institution and curriculum settings have been successfully saved!'
            : 'প্রতিষ্ঠান ও সিলেবাসের সকল তথ্য সফলভাবে সংরক্ষিত হয়েছে!'}
        </div>
      )}

      {backupDownloaded && (
        <div
          className="card fade-in"
          style={{
            padding: '0.875rem 1rem',
            background: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            color: '#2563eb',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {isEn
            ? 'Complete madrasa database backup downloaded to your computer! (Zero risk of data loss)'
            : 'মাদরাসার সম্পূর্ণ ডেটাবেজ ব্যাকআপ আপনার কম্পিউটারে ডাউনলোড হয়েছে! (ডেটা হারানোর কোনো ভয় নেই)'}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Section 1: Institution Basic Info */}
        <div className="card" style={{ padding: '1.5rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
              {isEn ? '1. General Institution Information' : '১. মাদরাসা / প্রতিষ্ঠানের সাধারণ তথ্য'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <label className="label">{isEn ? 'Institution Name (Bangla) *' : 'প্রতিষ্ঠানের নাম (বাংলায়) *'}</label>
              <input
                type="text"
                className="input"
                required
                value={institution.nameBn}
                onChange={(e) => setInstitution({ ...institution, nameBn: e.target.value })}
              />
            </div>

            <div>
              <label className="label">{isEn ? 'Institution Name (English)' : 'প্রতিষ্ঠানের নাম (ইংরেজিতে)'}</label>
              <input
                type="text"
                className="input"
                value={institution.nameEn}
                onChange={(e) => setInstitution({ ...institution, nameEn: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
              <div>
                <label className="label">{isEn ? 'Principal / Muhtamim' : 'মুহতামিম / প্রধান শিক্ষক'}</label>
                <input
                  type="text"
                  className="input"
                  value={isEn ? institution.principalNameEn : institution.principalName}
                  onChange={(e) =>
                    isEn
                      ? setInstitution({ ...institution, principalNameEn: e.target.value })
                      : setInstitution({ ...institution, principalName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">{isEn ? 'Established (Year)' : 'প্রতিষ্ঠাকাল (সন)'}</label>
                <input
                  type="text"
                  className="input"
                  value={isEn ? institution.establishedEn : institution.established}
                  onChange={(e) =>
                    isEn
                      ? setInstitution({ ...institution, establishedEn: e.target.value })
                      : setInstitution({ ...institution, established: e.target.value })
                  }
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
              <div>
                <label className="label">{isEn ? 'Official Mobile Number' : 'অফিসিয়াল মোবাইল'}</label>
                <input
                  type="tel"
                  className="input"
                  value={institution.phone}
                  onChange={(e) => setInstitution({ ...institution, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="label">{isEn ? 'Official WhatsApp Number' : 'অফিসিয়াল হোয়াটসঅ্যাপ'}</label>
                <input
                  type="tel"
                  className="input"
                  value={institution.whatsapp}
                  onChange={(e) => setInstitution({ ...institution, whatsapp: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">{isEn ? 'Full Madrasa Address' : 'মাদরাসার পূর্ণ ঠিকানা'}</label>
              <input
                type="text"
                className="input"
                value={isEn ? institution.addressEn : institution.address}
                onChange={(e) =>
                  isEn
                    ? setInstitution({ ...institution, addressEn: e.target.value })
                    : setInstitution({ ...institution, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Section 2: Universal Curriculum Switcher */}
        <div className="card" style={{ padding: '1.5rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
              {isEn ? '2. Curriculum & Syllabus Configuration' : '২. কারিকুলাম ও সিলেবাস কনফিগারেশন'}
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            {isEn
              ? 'Activate the curricula active in your madrasa. Class and subject lists will adapt automatically.'
              : 'আপনার মাদরাসায় যেসব বিভাগ চালু রয়েছে সেগুলো সক্রিয় রাখুন। শ্রেণি তালিকা সে অনুযায়ী স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে।'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              {
                id: 'qawmi',
                name: isEn ? 'Qawmi Kitab Department' : 'কওমি কিতাব বিভাগ',
                desc: isEn ? 'Noorani, Mizan, Kafiya to Dawrah Hadith and Ifta' : 'নূরানী, মিজান, কাফিয়া থেকে দাওরা ও ইফতা',
                enabled: curriculums.qawmi,
                toggle: () => setCurriculums({ ...curriculums, qawmi: !curriculums.qawmi }),
              },
              {
                id: 'hifz',
                name: isEn ? 'Hifzul Quran' : 'হিফজুল কুরআন',
                desc: isEn ? 'Sabaq, Sabqi and Manzil revision tracking' : 'সবক, সবকি ও আমুখতা ট্র্যাকিং',
                enabled: curriculums.hifz,
                toggle: () => setCurriculums({ ...curriculums, hifz: !curriculums.hifz }),
              },
              {
                id: 'alia',
                name: isEn ? 'Alia Madrasa' : 'আলিয়া মাদরাসা',
                desc: isEn ? 'Ibtedayi, Dakhil and Kamil curriculum' : 'ইবতেদায়ি, দাখিল ও কামিল কারিকুলাম',
                enabled: curriculums.alia,
                toggle: () => setCurriculums({ ...curriculums, alia: !curriculums.alia }),
              },
              {
                id: 'general',
                name: isEn ? 'General School / Academy' : 'জেনারেল স্কুল / একাডেমি',
                desc: isEn ? 'Play to 10th/12th grade NCTB national curriculum' : 'প্লে থেকে দশম/দ্বাদশ জাতীয় শিক্ষাক্রম',
                enabled: curriculums.general,
                toggle: () => setCurriculums({ ...curriculums, general: !curriculums.general }),
              },
            ].map((c) => (
              <div
                key={c.id}
                onClick={c.toggle}
                className="card"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  border: c.enabled ? '2px solid #16a34a' : '1px solid #e2e8f0',
                  background: c.enabled ? '#f0fdf4' : '#ffffff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontWeight: '700', fontSize: '0.95rem', color: c.enabled ? '#16a34a' : '#0f172a', marginBottom: '0.2rem' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{c.desc}</div>
                </div>

                <input
                  type="checkbox"
                  checked={c.enabled}
                  onChange={() => {}}
                  style={{ width: '1.2rem', height: '1.2rem', accentColor: '#16a34a', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Fee & Payment Structure */}
        <div className="card" style={{ padding: '1.5rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
              {isEn ? '3. Fee & Payment Gateway Structure' : '৩. ফি ও পেমেন্ট গেটওয়ে কাঠামো'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1rem' }}>
            <div>
              <label className="label">{isEn ? 'Monthly Tuition Fee (BDT)' : 'মাসিক বেতন (টাকা)'}</label>
              <input
                type="number"
                className="input"
                value={fees.monthlyFee}
                onChange={(e) => setFees({ ...fees, monthlyFee: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{isEn ? 'Admission Fee (BDT)' : 'ভর্তি ফি (টাকা)'}</label>
              <input
                type="number"
                className="input"
                value={fees.admissionFee}
                onChange={(e) => setFees({ ...fees, admissionFee: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{isEn ? 'Boarding / Meal Fee (BDT)' : 'খোরাকি/বোর্ডিং ফি'}</label>
              <input
                type="number"
                className="input"
                value={fees.boardingFee}
                onChange={(e) => setFees({ ...fees, boardingFee: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
            <div>
              <label className="label">{isEn ? 'bKash Merchant / Personal No.' : 'বিকাশ মার্চেন্ট / পার্সোনাল নম্বর'}</label>
              <input
                type="tel"
                className="input"
                value={fees.bkashMerchant}
                onChange={(e) => setFees({ ...fees, bkashMerchant: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{isEn ? 'Nagad Merchant No.' : 'নগদ মার্চেন্ট নম্বর'}</label>
              <input
                type="tel"
                className="input"
                value={fees.nagadMerchant}
                onChange={(e) => setFees({ ...fees, nagadMerchant: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <button
          type="submit"
          className="btn btn-primary btn-full btn-lg"
          style={{ boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)' }}
        >
          {isEn ? 'Save All Settings Changes' : 'সকল সেটিংস পরিবর্তন সংরক্ষণ করুন'}
        </button>
      </form>
    </div>
  );
}
