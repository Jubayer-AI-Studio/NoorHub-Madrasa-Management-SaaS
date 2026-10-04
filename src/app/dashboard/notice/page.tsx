'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-store';
import { formatNumberByLang } from '@/lib/useCountUp';

interface NoticeItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'holiday' | 'exam' | 'fee' | 'general';
  categoryLabel: string;
  categoryLabelEn: string;
  target: string;
  targetEn: string;
  date: string;
  dateEn: string;
  content: string;
  contentEn: string;
  sentCount: number;
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: '1',
    title: 'তীব্র শৈত্যপ্রবাহের কারণে ৩ দিনের আকস্মিক ছুটি',
    titleEn: '3-Day Sudden Holiday Due to Extreme Cold Wave',
    category: 'holiday',
    categoryLabel: 'জরুরি ছুটি',
    categoryLabelEn: 'Urgent Holiday',
    target: 'সকল অভিভাবক ও ছাত্র',
    targetEn: 'All Guardians & Students',
    date: '২১ সেপ্টেম্বর ২০২৬',
    dateEn: '21 September 2026',
    content: 'সম্মানিত অভিভাবকবৃন্দ, তীব্র শৈত্যপ্রবাহের কারণে মাদরাসার সকল ক্লাসের পাঠদান আগামী ২৩ সেপ্টেম্বর পর্যন্ত স্থগিত থাকবে। ২৪ সেপ্টেম্বর যথারীতি ক্লাস শুরু হবে ইনশাআল্লাহ।',
    contentEn: 'Respected parents, due to the severe cold wave, all classes of the madrasa will remain suspended until September 23. Regular classes will resume on September 24 Insha\'Allah.',
    sentCount: 347,
  },
  {
    id: '2',
    title: 'বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি ও প্রবেশপত্র বিতরণ',
    titleEn: 'Annual Examination 2026 Schedule & Admit Card Distribution',
    category: 'exam',
    categoryLabel: 'পরীক্ষা',
    categoryLabelEn: 'Examination',
    target: 'সকল শ্রেণি',
    targetEn: 'All Classes',
    date: '১৫ সেপ্টেম্বর ২০২৬',
    dateEn: '15 September 2026',
    content: 'আগামী ১ অক্টোবর থেকে বার্ষিক পরীক্ষা শুরু হবে। সকল শিক্ষার্থীকে অফিস কক্ষ থেকে পরীক্ষার প্রবেশপত্র (Admit Card) সংগ্রহ করার জন্য অনুরোধ করা যাচ্ছে।',
    contentEn: 'The annual examination will commence from October 1st. All students are requested to collect their Admit Cards from the administrative office.',
    sentCount: 347,
  },
  {
    id: '3',
    title: 'সেপ্টেম্বর মাসের বকেয়া ফি পরিশোধের তাগাদা',
    titleEn: 'Reminder for Payment of Due September Tuition Fees',
    category: 'fee',
    categoryLabel: 'ফি তাগাদা',
    categoryLabelEn: 'Fee Reminder',
    target: 'বকেয়া থাকা অভিভাবকবৃন্দ (৪৫ জন)',
    targetEn: 'Guardians with Dues (45 People)',
    date: '১০ সেপ্টেম্বর ২০২৬',
    dateEn: '10 September 2026',
    content: 'আস-সালামু আলাইকুম। চলতি সেপ্টেম্বর মাসের বকেয়া বেতন আগামী ২৫ তারিখের মধ্যে বিকাশ বা মাদরাসা অফিসে পরিশোধ করার জন্য বিনীত অনুরোধ করা হলো।',
    contentEn: 'Assalamu Alaikum. You are kindly requested to clear pending fees for September by the 25th via bKash or at the madrasa accounts desk.',
    sentCount: 45,
  },
];

export default function NoticeBroadcastPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

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
      holiday: { bn: 'জরুরি ছুটি', en: 'Urgent Holiday' },
      exam: { bn: 'পরীক্ষা', en: 'Examination' },
      fee: { bn: 'ফি তাগাদা', en: 'Fee Reminder' },
      general: { bn: 'সাধারণ ঘোষণা', en: 'General Notice' },
    };

    const targetMap: Record<string, string> = {
      'সকল অভিভাবক ও ছাত্র': 'All Guardians & Students',
      'বকেয়া থাকা অভিভাবকবৃন্দ': 'Guardians with Dues',
      'সকল শিক্ষক ও কর্মকর্তা': 'All Teachers & Staff',
    };

    const notice: NoticeItem = {
      id: String(Date.now()),
      title: newNotice.title,
      titleEn: newNotice.title,
      category: newNotice.category,
      categoryLabel: categoryLabels[newNotice.category].bn,
      categoryLabelEn: categoryLabels[newNotice.category].en,
      target: newNotice.target,
      targetEn: targetMap[newNotice.target] || newNotice.target,
      date: isEn ? 'Today' : 'আজকের তারিখ',
      dateEn: 'Today',
      content: newNotice.content,
      contentEn: newNotice.content,
      sentCount: 347,
    };

    setNotices([notice, ...notices]);
    setShowCreateModal(false);
    setBroadcastSuccess(
      isEn
        ? `Notice "${notice.title}" successfully broadcasted to 347 guardians!`
        : `"${notice.title}" নোটিশটি সফলভাবে ৩৪৭ জন অভিভাবকের ফোনে ব্রডকাস্ট পাঠানো হয়েছে!`
    );
    setTimeout(() => setBroadcastSuccess(null), 5000);

    setNewNotice({
      title: '',
      category: 'holiday',
      target: 'সকল অভিভাবক ও ছাত্র',
      content: '',
    });
  };

  const getWhatsAppShareLink = (notice: NoticeItem) => {
    const title = isEn ? notice.titleEn : notice.title;
    const date = isEn ? notice.dateEn : notice.date;
    const content = isEn ? notice.contentEn : notice.content;

    const text = encodeURIComponent(
      `📢 *${isEn ? 'NoorHub Madrasa Official Notice' : 'নূরহাব মাদরাসা অফিশিয়াল নোটিশ'}*\n` +
      `📌 *${isEn ? 'Subject:' : 'বিষয়:'}* ${title}\n` +
      `📅 *${isEn ? 'Date:' : 'তারিখ:'}* ${date}\n\n` +
      `${content}\n\n` +
      `— ${isEn ? 'Madrasa Administration' : 'মাদরাসা প্রশাসন'}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            {isEn ? 'Notice & Emergency Broadcast Center' : 'নোটিশ ও জরুরি ব্রডকাস্ট সেন্টার'}
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '15px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>
            {isEn
              ? '1-Click messaging to all guardians and teachers via WhatsApp and SMS'
              : '১ ক্লিকে সকল অভিভাবক ও শিক্ষকের হোয়াটসঅ্যাপ এবং ফোনে বার্তা প্রেরণ'}
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
          {isEn ? 'Create New Notice' : 'নতুন নোটিশ তৈরি'}
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

      {/* Notices List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="card card-hover"
            style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.725rem',
                    fontWeight: '700',
                    background:
                      notice.category === 'holiday'
                        ? '#fef2f2'
                        : notice.category === 'exam'
                        ? '#eff6ff'
                        : notice.category === 'fee'
                        ? '#fff7ed'
                        : '#f1f5f9',
                    color:
                      notice.category === 'holiday'
                        ? '#dc2626'
                        : notice.category === 'exam'
                        ? '#2563eb'
                        : notice.category === 'fee'
                        ? '#ea580c'
                        : '#475569',
                    border: '1px solid currentColor',
                  }}
                >
                  {isEn ? notice.categoryLabelEn : notice.categoryLabel}
                </span>

                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {isEn ? `Audience: ${notice.targetEn}` : `প্রাপক: ${notice.target}`}
                </span>
              </div>

              <span style={{ fontSize: '0.75rem', color: '#94a3b8', flexShrink: 0 }}>
                {isEn ? notice.dateEn : notice.date}
              </span>
            </div>

            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              {isEn ? notice.titleEn : notice.title}
            </h2>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              {isEn ? notice.contentEn : notice.content}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {isEn
                  ? `Delivered to ${formatNumberByLang(notice.sentCount, lang)} recipients`
                  : `${formatNumberByLang(notice.sentCount, lang)} জনের কাছে পাঠানো হয়েছে`}
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <a
                  href={getWhatsAppShareLink(notice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    textDecoration: 'none',
                    color: '#16a34a',
                    border: '1.5px solid #bbf7d0',
                    background: '#f0fdf4',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {isEn ? 'Share WhatsApp' : 'হোয়াটসঅ্যাপে শেয়ার'}
                </a>
              </div>
            </div>
          </div>
        ))}
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
                {isEn ? 'Publish New Notice' : 'নতুন নোটিশ তৈরি ও প্রচার'}
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
                <label className="label">{isEn ? 'Notice Title *' : 'নোটিশের শিরোনাম *'}</label>
                <input
                  type="text"
                  className="input"
                  placeholder={isEn ? 'e.g. Ramadan Break Announcement' : 'যেমন: রমজানের ছুটির নোটিশ'}
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <div>
                  <label className="label">{isEn ? 'Category' : 'বিভাগ'}</label>
                  <select
                    className="input"
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                  >
                    <option value="holiday">{isEn ? 'Urgent Holiday' : 'জরুরি ছুটি'}</option>
                    <option value="exam">{isEn ? 'Examination' : 'পরীক্ষা'}</option>
                    <option value="fee">{isEn ? 'Fee Reminder' : 'ফি তাগাদা'}</option>
                    <option value="general">{isEn ? 'General Announcement' : 'সাধারণ ঘোষণা'}</option>
                  </select>
                </div>

                <div>
                  <label className="label">{isEn ? 'Target Audience' : 'প্রাপক নির্বাচন'}</label>
                  <select
                    className="input"
                    value={newNotice.target}
                    onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })}
                  >
                    <option value="সকল অভিভাবক ও ছাত্র">{isEn ? 'All Guardians & Students' : 'সকল অভিভাবক ও ছাত্র'}</option>
                    <option value="বকেয়া থাকা অভিভাবকবৃন্দ">{isEn ? 'Only Unpaid Guardians' : 'বকেয়া থাকা অভিভাবকবৃন্দ'}</option>
                    <option value="সকল শিক্ষক ও কর্মকর্তা">{isEn ? 'All Teachers & Staff' : 'সকল শিক্ষক ও কর্মকর্তা'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">{isEn ? 'Notice Content *' : 'নোটিশের বিবরণ *'}</label>
                <textarea
                  className="input"
                  rows={4}
                  placeholder={isEn ? 'Write detailed notice message...' : 'নোটিশের বিস্তারিত বার্তা এখানে লিখুন...'}
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
                  {isEn ? 'Cancel' : 'বাতিল'}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#ea580c' }}
                >
                  {isEn ? 'Broadcast Notice' : 'নোটিশ প্রচার করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
