'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actionLink?: {
    href: string;
    label: string;
  };
}

const KNOWLEDGE_BASE: Record<string, { text: string; actionLink?: { href: string; label: string } }> = {
  leave: {
    text: 'ছাত্রদের ছুটি মঞ্জুর করা অত্যন্ত সহজ:\n১. নিচের "হাজিরা ও ছুটি" মেনুতে যান।\n২. উপরে ডানপাশে "সহজ ছুটি দিন" বাটনে চাপ দিন।\n৩. ছাত্র নির্বাচন করে ছুটির দিন ও কারণ সিলেক্ট করে সেভ করুন। কোনো ওটিপি বা জটিলতা লাগবে না।',
    actionLink: { href: '/dashboard/attendance', label: 'হাজিরা ও ছুটি পেজে যান' },
  },
  fees: {
    text: 'ছাত্রদের বকেয়া বেতন সংগ্রহের নিয়ম:\n১. নিচে "অর্থ" মেনুতে ট্যাপ করুন।\n২. "ছাত্র বেতন" ট্যাবে যান। সেখানে বকেয়া ছাত্রদের তালিকা পাবেন।\n৩. "বেতন নিন" বাটনে চাপ দিয়ে নগদ, বিকাশ বা রকেট সিলেক্ট করে রসিদ সংরক্ষণ ও প্রিন্ট করুন।',
    actionLink: { href: '/dashboard/finance', label: 'অর্থ ব্যবস্থাপনা খুলুন' },
  },
  salary: {
    text: 'উস্তাদ ও শিক্ষকদের মাসিক ভাতা/বেতন দেওয়ার নিয়ম:\n১. "অর্থ ব্যবস্থাপনা" পেজে "শিক্ষক ভাতা" ট্যাবে যান।\n২. প্রতিটি শিক্ষকের নামের পাশে "ভাতা দিন" বাটনে চাপুন, অথবা এক ক্লিকে "বাকি সবার ভাতা একসাথে পরিশোধ করুন" বাটন ব্যবহার করুন।\n৩. সাথে সাথে মানি রিসিট প্রিন্ট করা যাবে।',
    actionLink: { href: '/dashboard/finance', label: 'শিক্ষক ভাতা পেজে যান' },
  },
  admission: {
    text: 'নতুন শিক্ষার্থী ভর্তির নিয়ম:\n১. নিচে "ছাত্র" মেনুতে যান।\n২. উপরের ডানে "নতুন ভর্তি" বাটনে ট্যাপ করুন।\n৩. নাম, কওমি/আলিয়া/হিফজ সিলেবাস এবং অভিভাবকের ফোন নম্বর লিখে সেভ করুন। সাথে সাথে ১-ট্যাপ কল ও হোয়াটসঅ্যাপ বাটন সক্রিয় হবে।',
    actionLink: { href: '/dashboard/students', label: 'ছাত্র ভর্তি পেজে যান' },
  },
  map: {
    text: 'মানচিত্রে বাংলাদেশের মাদরাসা দেখার নিয়ম:\n১. "মানচিত্র" পেজে যান।\n২. প্রথমে আন্তর্জাতিক ও জাতীয় সারসংক্ষেপ দেখতে পাবেন।\n৩. যেকোনো বিভাগে (যেমন: ঢাকা) ট্যাপ করলে ওই বিভাগের জেলাগুলো এবং জেলায় ট্যাপ করলে উপজেলার মাদরাসা তালিকা চলে আসবে।',
    actionLink: { href: '/dashboard/map', label: 'মানচিত্র পেজে যান' },
  },
};

export default function NoorAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'আস-সালামু আলাইকুম! আমি নূর এআই। নূরহাব প্ল্যাটফর্মের প্রতিটি বাটন, সেটিংস ও ফিচার সম্পর্কে আমি আপনাকে যেকোনো মুহূর্তে সহজ বাংলায় বুঝিয়ে দিতে পারি। আপনি কী করতে চান?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: 'ছাত্রের ছুটি মঞ্জুর কীভাবে করব?', key: 'leave' },
    { label: 'বকেয়া বেতন কীভাবে কালেকশন করব?', key: 'fees' },
    { label: 'শিক্ষকদের ভাতা কীভাবে দেব?', key: 'salary' },
    { label: 'নতুন শিক্ষার্থী ভর্তি কীভাবে করব?', key: 'admission' },
    { label: 'মানচিত্র কীভাবে কাজ করে?', key: 'map' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let matchedResponse: { text: string; actionLink?: { href: string; label: string } } = {
        text: 'আমি আপনার প্রশ্নের উত্তর প্রস্তুত করছি। নূরহাবের যেকোনো মডিউল (ছাত্র, হাজিরা, শিক্ষক ভাতা, ডোনার ট্র্যাকিং বা মানচিত্র) সম্পর্কে জানতে উপরের শর্টকাট বাটনে চাপ দিতে পারেন।',
        actionLink: { href: '/dashboard', label: 'ড্যাশবোর্ডে ফিরে যান' },
      };

      const lower = query.toLowerCase();
      if (lower.includes('ছুটি') || lower.includes('leave')) {
        matchedResponse = KNOWLEDGE_BASE.leave;
      } else if (lower.includes('বেতন') || lower.includes('ফি') || lower.includes('fee')) {
        matchedResponse = KNOWLEDGE_BASE.fees;
      } else if (lower.includes('ভাতা') || lower.includes('শিক্ষক') || lower.includes('salary')) {
        matchedResponse = KNOWLEDGE_BASE.salary;
      } else if (lower.includes('ভর্তি') || lower.includes('ছাত্র') || lower.includes('student')) {
        matchedResponse = KNOWLEDGE_BASE.admission;
      } else if (lower.includes('মানচিত্র') || lower.includes('ম্যাপ') || lower.includes('map')) {
        matchedResponse = KNOWLEDGE_BASE.map;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: matchedResponse.text,
          actionLink: matchedResponse.actionLink,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '44rem', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 8rem)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #16a34a, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', fontWeight: '700', color: '#0f172a' }}>
            নূর এআই সহকারী
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
            নূরহাব প্ল্যাটফর্মের সার্বক্ষণিক বাংলা গাইড · ২৪/৭ লাইভ
          </p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.625rem', marginBottom: '0.75rem', scrollbarWidth: 'none' }}>
        {quickPrompts.map((p) => (
          <button
            key={p.key}
            onClick={() => handleSend(p.label)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid #bbf7d0',
              background: '#f0fdf4',
              color: '#16a34a',
              fontSize: '0.75rem',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.875rem', paddingRight: '0.25rem', marginBottom: '1rem' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                padding: '0.875rem 1rem',
                borderRadius: m.sender === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                background: m.sender === 'user' ? '#16a34a' : '#ffffff',
                color: m.sender === 'user' ? '#ffffff' : '#0f172a',
                border: m.sender === 'user' ? 'none' : '1.5px solid #e2e8f0',
                fontFamily: 'Hind Siliguri, sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {m.text}

              {m.actionLink && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed #cbd5e1' }}>
                  <Link
                    href={m.actionLink.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '0.5rem',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    {m.actionLink.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem', padding: '0.5rem' }}>
            <span className="spinner" style={{ width: '0.875rem', height: '0.875rem' }} />
            নূর এআই চিন্তা করছে...
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: 'flex', gap: '0.5rem' }}
      >
        <input
          type="text"
          className="input"
          placeholder="নূর এআই-কে যেকোনো প্রশ্ন করুন..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0 1.25rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
