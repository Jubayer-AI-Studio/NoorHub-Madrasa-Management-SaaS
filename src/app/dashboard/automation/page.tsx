'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AutomationHubPage() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);

  // Facebook Auto-post Settings
  const [fbConnected, setFbConnected] = useState(true);
  const [fbPageName, setFbPageName] = useState('আল-জামিয়া আল-ইসলামিয়া নূরহাব (অফিশিয়াল পেজ)');
  const [fbAutoPostNotice, setFbAutoPostNotice] = useState(true);
  const [fbAutoPostResults, setFbAutoPostResults] = useState(true);
  const [fbAutoPostHolidays, setFbAutoPostHolidays] = useState(true);

  // WhatsApp & Messenger AI Bot Settings
  const [waBotActive, setWaBotActive] = useState(true);
  const [messengerBotActive, setMessengerBotActive] = useState(true);
  const [autoReplyAdmission, setAutoReplyAdmission] = useState(true);
  const [autoReplyDonation, setAutoReplyDonation] = useState(true);
  const [autoReplyFees, setAutoReplyFees] = useState(true);

  // Automated Absence Alert Trigger
  const [autoAbsenceAlert, setAutoAbsenceAlert] = useState(true);
  const [alertTriggerTime, setAlertTriggerTime] = useState('10:00 AM');
  const [alertChannel, setAlertChannel] = useState<'whatsapp' | 'sms' | 'both'>('both');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleTestAutoPost = () => {
    setTestSuccess('টেস্ট পোস্ট সফল! ফেসবুক পেজ ও হোয়াটসঅ্যাপ টেস্ট নম্বরে ডেমো বার্তা প্রেরণ করা হয়েছে।');
    setTimeout(() => setTestSuccess(null), 5000);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            সোশ্যাল মিডিয়া ও মেসেজিং অটোমেশন হাব
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            ফেসবুক পেজ অটো-পোস্টিং, মেসেঞ্জার এআই বট ও হোয়াটসঅ্যাপ স্বয়ংক্রিয় নোটিফিকেশন
          </p>
        </div>

        <button
          onClick={handleTestAutoPost}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1.5px solid #cbd5e1' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          অটোমেশন টেস্ট করুন
        </button>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div
          className="card fade-in"
          style={{
            padding: '0.875rem 1rem',
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            color: '#16a34a',
            marginBottom: '1rem',
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
          অটোমেশন সেটিংস সফলভাবে সক্রিয় ও সংরক্ষিত হয়েছে!
        </div>
      )}

      {testSuccess && (
        <div
          className="card fade-in"
          style={{
            padding: '0.875rem 1rem',
            background: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            color: '#2563eb',
            marginBottom: '1rem',
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
          {testSuccess}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Section 1: Facebook Page Auto-Posting */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: '#eff6ff', color: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                  ১. ফেসবুক পেজ অটো-পোস্টিং (Facebook Auto-Posting)
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                  সংযুক্ত পেজ: {fbPageName}
                </div>
              </div>
            </div>

            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: fbConnected ? '#f0fdf4' : '#fef2f2', color: fbConnected ? '#16a34a' : '#dc2626', fontSize: '0.7rem', fontWeight: '700', border: '1px solid #bbf7d0' }}>
              {fbConnected ? 'কানেক্টেড' : 'ডিসকানেক্টেড'}
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
            নূরহাব থেকে কোনো বিজ্ঞপ্তি বা ফলাফল প্রকাশ করলে তা স্বয়ংক্রিয়ভাবে মাদরাসার ফেসবুক পেজে পাবলিশ হবে:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={fbAutoPostNotice}
                onChange={(e) => setFbAutoPostNotice(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#1877f2' }}
              />
              জরুরি নোটিশ প্রকাশের সাথে সাথে ফেসবুক পেজে অটো-পোস্ট হবে
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={fbAutoPostResults}
                onChange={(e) => setFbAutoPostResults(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#1877f2' }}
              />
              পরীক্ষার ফলাফল ও মেধা তালিকা বের হলে শীর্ষদের অভিনন্দন পোস্ট অটোমেটিক হবে
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={fbAutoPostHolidays}
                onChange={(e) => setFbAutoPostHolidays(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#1877f2' }}
              />
              আকস্মিক ছুটি বা দুর্যোগকালীন নোটিশ তাৎক্ষণিক পেজে প্রচার হবে
            </label>
          </div>
        </div>

        {/* Section 2: Messenger & WhatsApp Auto-Reply Bot */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                ২. মেসেঞ্জার ও হোয়াটসঅ্যাপ চ্যাটবট অটোমেশন (AI Auto-Reply)
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                ২৪ ঘণ্টা অভিভাবক ও দাতাদের প্রশ্নের তাৎক্ষণিক স্বয়ংক্রিয় উত্তর
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={autoReplyAdmission}
                onChange={(e) => setAutoReplyAdmission(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#16a34a' }}
              />
              <strong>ভর্তি তথ্য অটো-রিপ্লাই:</strong> কেউ "ভর্তি ফি কত?" বা "ভর্তি কীভাবে হব?" জানতে চাইলে স্বয়ংক্রিয় ফিরতি বার্তা।
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={autoReplyDonation}
                onChange={(e) => setAutoReplyDonation(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#16a34a' }}
              />
              <strong>দান ও অনুদান অটো-রিপ্লাই:</strong> কোনো প্রবাসী বা দাতা বিকাশ/ব্যাংক নম্বর চাইলে তাৎক্ষণিক হিসাব ও ডোনার পোর্টাল লিংক প্রেরণ।
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.85rem', color: '#334155' }}>
              <input
                type="checkbox"
                checked={autoReplyFees}
                onChange={(e) => setAutoReplyFees(e.target.checked)}
                style={{ width: '1.2rem', height: '1.2rem', accentColor: '#16a34a' }}
              />
              <strong>রোলভিত্তিক বকেয়া ইনকোয়ারি:</strong> অভিভাবক রোল নম্বর লিখে মেসেজ দিলে স্বয়ংক্রিয়ভাবে তার বকেয়া হিসেব রিপ্লাই।
            </label>
          </div>
        </div>

        {/* Section 3: Automatic Absence Notification Trigger */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                ৩. স্বয়ংক্রিয় অনুপস্থিতি নোটিফিকেশন ট্রিগার (Automatic Absence Trigger)
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                উস্তাদকে আলাদা মেসেজ দিতে হবে না; সিস্টেম নিজ দায়িত্বে অভিভাবককে জানাবে
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label className="label">স্বয়ংক্রিয় বার্তা পাঠানোর সময়</label>
              <select
                className="input"
                value={alertTriggerTime}
                onChange={(e) => setAlertTriggerTime(e.target.value)}
              >
                <option value="09:30 AM">সকাল ০৯:৩০ মিনিট</option>
                <option value="10:00 AM">সকাল ১০:০০ মিনিট (স্ট্যান্ডার্ড)</option>
                <option value="10:30 AM">সকাল ১০:৩০ মিনিট</option>
              </select>
            </div>

            <div>
              <label className="label">বার্তা প্রেরণের মাধ্যম</label>
              <select
                className="input"
                value={alertChannel}
                onChange={(e) => setAlertChannel(e.target.value as any)}
              >
                <option value="both">হোয়াটসঅ্যাপ + সরাসরি এসএমএস (উভয়টি)</option>
                <option value="whatsapp">শুধু হোয়াটসঅ্যাপ</option>
                <option value="sms">শুধু সরাসরি এসএমএস</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.625rem', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>নমুনা স্বয়ংক্রিয় বার্তা যা অভিভাবক পাবেন:</span>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8rem', color: '#166534', marginTop: '0.25rem', fontStyle: 'italic' }}>
              "আস-সালামু আলাইকুম। সম্মানিত অভিভাবক, আপনার সন্তান [ছাত্রের নাম] আজ [তারিখ] সকাল ১০:০০ পর্যন্ত আল-জামিয়া নূরহাব মাদরাসায় উপস্থিত হয়নি। জরুরি প্রয়োজনে মাদরাসা অফিসে যোগাযোগ করুন: 01711223344"
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary btn-full btn-lg"
          style={{ boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)' }}
        >
          সোশ্যাল ও মেসেজিং অটোমেশন সক্রিয় করুন
        </button>
      </form>
    </div>
  );
}
