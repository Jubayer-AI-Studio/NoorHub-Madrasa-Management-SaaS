'use client';

import { useState } from 'react';

interface NoticeItem {
  id: string;
  title: string;
  category: 'holiday' | 'exam' | 'fee' | 'general';
  categoryLabel: string;
  target: string;
  date: string;
  content: string;
  sentCount: number;
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: '1',
    title: 'তীব্র শৈত্যপ্রবাহের কারণে ৩ দিনের আকস্মিক ছুটি',
    category: 'holiday',
    categoryLabel: 'জরুরি ছুটি',
    target: 'সকল অভিভাবক ও ছাত্র',
    date: '২১ সেপ্টেম্বর ২০২৬',
    content: 'সম্মানিত অভিভাবকবৃন্দ, তীব্র শৈত্যপ্রবাহের কারণে মাদরাসার সকল ক্লাসের পাঠদান আগামী ২৩ সেপ্টেম্বর পর্যন্ত স্থগিত থাকবে। ২৪ সেপ্টেম্বর যথারীতি ক্লাস শুরু হবে ইনশাআল্লাহ।',
    sentCount: 347,
  },
  {
    id: '2',
    title: 'বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি ও প্রবেশপত্র বিতরণ',
    category: 'exam',
    categoryLabel: 'পরীক্ষা',
    target: 'সকল শ্রেণি',
    date: '১৫ সেপ্টেম্বর ২০২৬',
    content: 'আগামী ১ অক্টোবর থেকে বার্ষিক পরীক্ষা শুরু হবে। সকল শিক্ষার্থীকে অফিস কক্ষ থেকে পরীক্ষার প্রবেশপত্র (Admit Card) সংগ্রহ করার জন্য অনুরোধ করা যাচ্ছে।',
    sentCount: 347,
  },
  {
    id: '3',
    title: 'সেপ্টেম্বর মাসের বকেয়া ফি পরিশোধের তাগাদা',
    category: 'fee',
    categoryLabel: 'ফি তাগাদা',
    target: 'বকেয়া থাকা অভিভাবকবৃন্দ (৪৫ জন)',
    date: '১০ সেপ্টেম্বর ২০২৬',
    content: 'আস-সালামু আলাইকুম। চলতি সেপ্টেম্বর মাসের বকেয়া বেতন আগামী ২৫ তারিখের মধ্যে বিকাশ বা মাদরাসা অফিসে পরিশোধ করার জন্য বিনীত অনুরোধ করা হলো।',
    sentCount: 45,
  },
];

export default function NoticeBroadcastPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState<string | null>(null);

  // New Notice Form State
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'holiday' as 'holiday' | 'exam' | 'fee' | 'general',
    target: 'সকল অভিভাবক ও ছাত্র',
    content: '',
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    const categoryLabels = {
      holiday: 'জরুরি ছুটি',
      exam: 'পরীক্ষা',
      fee: 'ফি তাগাদা',
      general: 'সাধারণ ঘোষণা',
    };

    const notice: NoticeItem = {
      id: String(Date.now()),
      title: newNotice.title,
      category: newNotice.category,
      categoryLabel: categoryLabels[newNotice.category],
      target: newNotice.target,
      date: 'আজকের তারিখ',
      content: newNotice.content,
      sentCount: 347,
    };

    setNotices([notice, ...notices]);
    setShowCreateModal(false);
    setBroadcastSuccess(`"${notice.title}" নোটিশটি সফলভাবে ৩৪৭ জন অভিভাবকের ফোনে ব্রডকাস্ট পাঠানো হয়েছে!`);
    setTimeout(() => setBroadcastSuccess(null), 5000);

    setNewNotice({
      title: '',
      category: 'holiday',
      target: 'সকল অভিভাবক ও ছাত্র',
      content: '',
    });
  };

  const getWhatsAppShareLink = (notice: NoticeItem) => {
    const text = encodeURIComponent(
      `📢 *নূরহাব মাদরাসা অফিশিয়াল নোটিশ*\n` +
      `📌 *বিষয়:* ${notice.title}\n` +
      `📅 *তারিখ:* ${notice.date}\n\n` +
      `${notice.content}\n\n` +
      `— মাদরাসা প্রশাসন`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '700', color: '#0f172a' }}>
            নোটিশ ও জরুরি ব্রডকাস্ট সেন্টার
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            ১ ক্লিকে সকল অভিভাবক ও শিক্ষকের হোয়াটসঅ্যাপ এবং ফোনে বার্তা প্রেরণ
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#ea580c' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          নতুন নোটিশ তৈরি
        </button>
      </div>

      {/* Broadcast Alert Banner */}
      {broadcastSuccess && (
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
          {broadcastSuccess}
        </div>
      )}

      {/* Quick Template Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginBottom: '1.5rem' }}>
        {[
          {
            title: 'আকস্মিক ছুটি',
            desc: 'দুর্যোগ বা শীতকালীন ছুটি',
            color: '#ea580c',
            bg: '#fff7ed',
            action: () => {
              setNewNotice({
                title: 'আকস্মিক সাধারণ ছুটি সংক্রান্ত জরুরি নোটিশ',
                category: 'holiday',
                target: 'সকল অভিভাবক ও ছাত্র',
                content: 'বিশেষ অনিবার্য কারণবশত আগামীকাল মাদরাসার সকল ক্লাসের পাঠদান বন্ধ থাকবে। পরশু যথারীতি ক্লাস চলবে।',
              });
              setShowCreateModal(true);
            },
          },
          {
            title: 'ফি পরিশোধের তাগাদা',
            desc: 'বকেয়া বেতন রিমাইন্ডার',
            color: '#2563eb',
            bg: '#eff6ff',
            action: () => {
              setNewNotice({
                title: 'চলতি মাসের বেতন পরিশোধের বিনীত অনুরোধ',
                category: 'fee',
                target: 'বকেয়া থাকা অভিভাবকবৃন্দ',
                content: 'আস-সালামু আলাইকুম। সম্মানিত অভিভাবক, চলতি মাসের বকেয়া বেতন আগামী ২৫ তারিখের মধ্যে পরিশোধ করার অনুরোধ করা হলো।',
              });
              setShowCreateModal(true);
            },
          },
          {
            title: 'পরীক্ষার রুটিন',
            desc: 'পরীক্ষার তারিখ ঘোষণা',
            color: '#7c3aed',
            bg: '#f5f3ff',
            action: () => {
              setNewNotice({
                title: 'আসন্ন সাময়িক পরীক্ষার সময়সূচি',
                category: 'exam',
                target: 'সকল শ্রেণি ও জামাত',
                content: 'সকল শিক্ষার্থীকে জানানো যাচ্ছে যে আগামী রবিবার থেকে সাময়িক পরীক্ষা শুরু হবে। প্রবেশপত্র অফিস থেকে সংগ্রহ করুন।',
              });
              setShowCreateModal(true);
            },
          },
        ].map((tpl) => (
          <div
            key={tpl.title}
            onClick={tpl.action}
            className="card card-hover"
            style={{ padding: '0.875rem', cursor: 'pointer', border: '1.5px solid #f1f5f9' }}
          >
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '700', color: tpl.color, marginBottom: '0.2rem' }}>
              {tpl.title}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{tpl.desc}</div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.725rem', color: tpl.color, fontWeight: '700' }}>
              টেমপ্লেট ব্যবহার করুন →
            </div>
          </div>
        ))}
      </div>

      {/* Notices Feed */}
      <div>
        <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem' }}>
          প্রচারিত নোটিশসমূহ ({notices.length}টি)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="card"
              style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.625rem' }}>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      marginBottom: '0.35rem',
                      background: notice.category === 'holiday' ? '#fff7ed' : notice.category === 'fee' ? '#fef2f2' : '#eff6ff',
                      color: notice.category === 'holiday' ? '#ea580c' : notice.category === 'fee' ? '#dc2626' : '#2563eb',
                      border: `1px solid ${notice.category === 'holiday' ? '#fed7aa' : notice.category === 'fee' ? '#fecaca' : '#bfdbfe'}`,
                    }}
                  >
                    {notice.categoryLabel}
                  </span>
                  <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                    {notice.title}
                  </h3>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0, fontSize: '0.75rem', color: '#64748b' }}>
                  {notice.date}
                </div>
              </div>

              <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', color: '#475569', lineHeight: '1.6', marginBottom: '0.875rem' }}>
                {notice.content}
              </p>

              {/* Notice Footer: Recipient Count & 1-Click WhatsApp Share */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.625rem', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {notice.sentCount} জন অভিভাবককে পাঠানো হয়েছে
                </div>

                <a
                  href={getWhatsAppShareLink(notice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#16a34a',
                    fontFamily: 'Hind Siliguri, sans-serif',
                    fontWeight: '700',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  হোয়াটসঅ্যাপে ফরোয়ার্ড
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
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
          <div className="card fade-in" style={{ width: '100%', maxWidth: '28rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
                নতুন নোটিশ প্রচার করুন
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateNotice} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="label">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="যেমন: আকস্মিক ছুটি সংক্রান্ত নোটিশ"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">ক্যাটাগরি</label>
                  <select
                    className="input"
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                  >
                    <option value="holiday">জরুরি ছুটি</option>
                    <option value="exam">পরীক্ষা</option>
                    <option value="fee">ফি তাগাদা</option>
                    <option value="general">সাধারণ ঘোষণা</option>
                  </select>
                </div>

                <div>
                  <label className="label">কাদের কাছে যাবে</label>
                  <select
                    className="input"
                    value={newNotice.target}
                    onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })}
                  >
                    <option value="সকল অভিভাবক ও ছাত্র">সকল অভিভাবক ও ছাত্র</option>
                    <option value="সকল শিক্ষক / উস্তাদ">সকল শিক্ষক / উস্তাদ</option>
                    <option value="বকেয়া থাকা অভিভাবক">বকেয়া থাকা অভিভাবক</option>
                    <option value="শুধু হিফজ বিভাগ">শুধু হিফজ বিভাগ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">বিস্তারিত বক্তব্য *</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="নোটিশের বিস্তারিত বিবরণ বাংলায় লিখুন..."
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#ea580c' }}
                >
                  ১ ক্লিকে ব্রডকাস্ট পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
