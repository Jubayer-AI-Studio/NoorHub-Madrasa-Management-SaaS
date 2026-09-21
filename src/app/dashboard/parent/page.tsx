'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ParentPortalPage() {
  const [paySuccess, setPaySuccess] = useState(false);
  const [showLeaveReqModal, setShowLeaveReqModal] = useState(false);
  const [leaveDays, setLeaveDays] = useState('1');
  const [leaveReason, setLeaveReason] = useState('পারিবারিক কারণ');
  const [leaveSuccess, setLeaveSuccess] = useState(false);

  // Student Child Profile for Parent
  const child = {
    name: 'মুহাম্মদ আব্দুর রহমান',
    roll: '০১',
    admissionNo: 'NH-2026-001',
    className: 'মিзан (কওমি বিভাগ)',
    isBoarding: true,
    attendanceRate: 98,
    todayAttendance: 'উপস্থিত',
    dueFee: 850,
    examResult: {
      exam: 'বার্ষিক পরীক্ষা ২০২৬',
      grade: 'মুমতাজ (A+)',
      position: '১ম স্থান',
      totalMarks: '৫৬৮ / ৬০০',
    },
    teacherName: 'মাওলানা ইব্রাহিম খলিল (শ্রেণি উস্তাদ)',
    teacherPhone: '01819876543',
    madrasaName: 'আল-জামিয়া আল-ইসলামিয়া নূরহাব',
  };

  const handlePayFee = () => {
    setPaySuccess(true);
    setTimeout(() => setPaySuccess(false), 5000);
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeaveReqModal(false);
    setLeaveSuccess(true);
    setTimeout(() => setLeaveSuccess(false), 5000);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '44rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ea580c', background: '#fff7ed', padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid #fed7aa' }}>
            অভিভাবক পোর্টাল
          </span>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a', marginTop: '0.35rem' }}>
            আস-সালামু আলাইকুম, সম্মানিত অভিভাবক
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            {child.madrasaName}
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.5rem',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            color: '#475569',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontSize: '0.8rem',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          মূল ড্যাশবোর্ড
        </Link>
      </div>

      {/* Alerts */}
      {paySuccess && (
        <div className="card fade-in" style={{ padding: '0.875rem 1rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#16a34a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          বেতন সফলভাবে পরিশোধ করা হয়েছে! ডিজিটাল রসিদ আপনার হোয়াটসঅ্যাপে পাঠানো হয়েছে।
        </div>
      )}

      {leaveSuccess && (
        <div className="card fade-in" style={{ padding: '0.875rem 1rem', background: '#ecfeff', border: '1.5px solid #cffafe', color: '#0891b2', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          ছুটির আবেদনটি উস্তাদের কাছে পৌঁছেছে এবং তা মঞ্জুর করা হয়েছে।
        </div>
      )}

      {/* Child Profile Card */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem', border: '1.5px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '3.75rem',
              height: '3.75rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #16a34a, #2563eb)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: '800',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}
          >
            {child.name.split(' ')[1] ? child.name.split(' ')[1][0] : child.name[0]}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.2rem' }}>
              {child.name}
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              রোল: {child.roll} · আইডি: {child.admissionNo}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '600', marginTop: '0.15rem' }}>
              জামাত: {child.className} ({child.isBoarding ? 'আবাসিক' : 'অনাবাসিক'})
            </div>
          </div>
        </div>

        {/* Live Attendance Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', background: '#16a34a' }} />
            <span style={{ fontSize: '0.825rem', fontWeight: '700', color: '#0f172a' }}>
              আজকের হাজিরা: <span style={{ color: '#16a34a' }}>{child.todayAttendance}</span>
            </span>
          </div>
          <span style={{ fontSize: '0.775rem', color: '#64748b' }}>
            মাসিক গড়: {child.attendanceRate}%
          </span>
        </div>
      </div>

      {/* Fee Due & 1-Click Payment Card */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem', border: '1.5px solid #fecaca', background: '#fffbfa' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.725rem', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase' }}>
              চলতি মাসের বেতন
            </span>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#dc2626' }}>
              ৳{child.dueFee}
            </div>
          </div>

          <button
            onClick={handlePayFee}
            className="btn btn-primary"
            style={{ background: '#16a34a', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }}
          >
            বিকাশ / নগদে বেতন দিন →
          </button>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
          * কোনো ওটিপি ছাড়াই সরাসরি বিকাশ, নগদ বা ব্যাংক স্লিপে ফি পরিশোধ করে তাৎক্ষণিক ডিজিটাল রসিদ সংগ্রহ করতে পারেন।
        </p>
      </div>

      {/* Latest Exam Result Card */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem', border: '1.5px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
            সর্বশেষ পরীক্ষার ফলাফল
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{child.examResult.exam}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', textAlign: 'center', background: '#f8fafc', padding: '0.875rem', borderRadius: '0.75rem' }}>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#16a34a' }}>
              {child.examResult.grade}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>প্রাপ্ত ফলাফল</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#2563eb' }}>
              {child.examResult.position}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>মেধাক্রম</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#7c3aed' }}>
              {child.examResult.totalMarks}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>মোট নম্বর</div>
          </div>
        </div>

        <div style={{ marginTop: '0.875rem', textAlign: 'center' }}>
          <Link href="/dashboard/results" style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '700', textDecoration: 'none' }}>
            সম্পূর্ণ মার্কশিট ও বিষয়ভিত্তিক নম্বর দেখুন →
          </Link>
        </div>
      </div>

      {/* Quick Action Grid: Contact Teacher & Apply Leave */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <a
          href={`tel:${child.teacherPhone}`}
          className="card card-hover"
          style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', border: '1.5px solid #bfdbfe', background: '#eff6ff' }}
        >
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: '#ffffff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', fontWeight: '700', color: '#2563eb' }}>
              শ্রেণি উস্তাদকে সরাসরি কল
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{child.teacherName}</div>
          </div>
        </a>

        <button
          onClick={() => setShowLeaveReqModal(true)}
          className="card card-hover"
          style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1.5px solid #fed7aa', background: '#fff7ed', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: '#ffffff', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', fontWeight: '700', color: '#ea580c' }}>
              সহজ ছুটির আবেদন
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>জরুরি ছুটির বার্তা পাঠান</div>
          </div>
        </button>
      </div>

      {/* Parent Leave Request Modal */}
      {showLeaveReqModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div className="card fade-in" style={{ width: '100%', maxWidth: '24rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>
                ছুটির আবেদন করুন
              </h2>
              <button onClick={() => setShowLeaveReqModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="label">ছুটির মেয়াদ</label>
                <select className="input" value={leaveDays} onChange={(e) => setLeaveDays(e.target.value)}>
                  <option value="1">১ দিন</option>
                  <option value="2">২ দিন</option>
                  <option value="3">৩ দিন</option>
                </select>
              </div>

              <div>
                <label className="label">ছুটির কারণ</label>
                <select className="input" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)}>
                  <option value="অসুস্থতা">অসুস্থতা</option>
                  <option value="পারিবারিক কারণ">পারিবারিক কারণ</option>
                  <option value="জরুরি প্রয়োজন">জরুরি প্রয়োজন</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowLeaveReqModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#ea580c' }}>
                  আবেদন পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
