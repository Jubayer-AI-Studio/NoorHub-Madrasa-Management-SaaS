'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PresentationDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: 'কভার স্লাইড / পরিচিতি',
      title: 'নূরহাব (NoorHub)',
      subtitle: 'সকল শিক্ষা প্রতিষ্ঠানের জন্য আধুনিক ডিজিটাল ম্যানেজমেন্ট প্ল্যাটফর্ম',
      badge: 'এক্সিকিউটিভ প্রেজেন্টেশন ডেক ২০২৬',
      content: (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div
            style={{
              width: '5.5rem',
              height: '5.5rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(22, 163, 74, 0.3)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z" />
              <path d="M9 20v-5a3 3 0 0 1 6 0v5" />
              <path d="M12 2v3" />
              <circle cx="12" cy="7" r="1" />
            </svg>
          </div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
            নূরহাব (NoorHub)
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.15rem', color: '#16a34a', fontWeight: '700', marginBottom: '1.5rem' }}>
            কওমি, হিফজ, আলিয়া ও সাধারণ শিক্ষা প্রতিষ্ঠানের যুগান্তকারী ডিজিটাল সমাধান
          </p>
          <div style={{ display: 'inline-flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ background: '#f0fdf4', color: '#16a34a', border: '1.5px solid #bbf7d0', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
              জিরো ওটিপি ও জিরো জটিলতা
            </span>
            <span style={{ background: '#eff6ff', color: '#2563eb', border: '1.5px solid #bfdbfe', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
              ১০০% আন্তর্জাতিক ভেক্টর আইকন
            </span>
            <span style={{ background: '#fefce8', color: '#ca8a04', border: '1.5px solid #fef08a', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
              স্বচ্ছ ডোনার ও অর্থ ব্যবস্থাপনা
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      tag: 'সমস্যা বিশ্লেষণ',
      title: 'বর্তমান শিক্ষা সফটওয়্যারের মূল সমস্যাসমূহ',
      subtitle: 'কেন অধিকাংশ মাদরাসা ও প্রতিষ্ঠানে ডিজিটাল সিস্টেম সফল হয় না?',
      badge: 'The Problem Statement',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          {[
            {
              num: '১',
              title: 'অতিরিক্ত জটিল ইউজার ইন্টারফেস',
              desc: 'বর্তমানে বাজারে থাকা অ্যাপগুলো এত হিজিবিজি যে সাধারণ শিক্ষক ও প্রবীণ উস্তাদরা তা চালাতে গিয়ে হিমশিম খান।',
              color: '#dc2626',
              bg: '#fef2f2',
            },
            {
              num: '২',
              title: 'অযাচিত ওটিপি (OTP) ও বায়োমেট্রিক',
              desc: 'মোবাইল নেটওয়ার্ক সমস্যার কারণে ওটিপি না আসা, ডিভাইস নষ্ট হওয়া এবং ফিঙ্গারপ্রিন্ট মেশিনের অতিরিক্ত খরচ।',
              color: '#ea580c',
              bg: '#fff7ed',
            },
            {
              num: '৩',
              title: 'সিলেবাসের সীমাবদ্ধতা',
              desc: 'সফটওয়্যারগুলো কেবল স্কুলের জন্য তৈরি, কওমি কিতাব বা হিফজুল কুরআনের সবক/সবকি/আমুখতা ট্র্যাকিং থাকে না।',
              color: '#7c3aed',
              bg: '#f5f3ff',
            },
            {
              num: '৪',
              title: 'অনুদানের আস্থার ঘাটতি',
              desc: 'দাতারা দান করার পর জানেন না তাদের টাকা কোন খাতে খরচ হলো। ফলে বড় বড় ডোনেশনের প্রবাহ কমে যায়।',
              color: '#0891b2',
              bg: '#ecfeff',
            },
          ].map((item) => (
            <div key={item.num} className="card" style={{ padding: '1.25rem', borderLeft: `4px solid ${item.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '1.6rem', height: '1.6rem', borderRadius: '50%', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem' }}>
                  {item.num}
                </span>
                <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.975rem', fontWeight: '700', color: '#0f172a' }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#475569', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      tag: 'নূরহাবের বিপ্লব',
      title: 'নূরহাব (NoorHub)-এর যুগান্তকারী সমাধান',
      subtitle: 'প্রযুক্তি হবে পানির মতো সহজ, শক্তিশালী এবং সবার জন্য উন্মুক্ত',
      badge: 'The Core Pillars',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {[
            {
              title: 'জিরো ওটিপি ও ১-ক্লিক লগইন',
              desc: 'কোনো পাসওয়ার্ড বা ওটিপির ঝামেলা নেই। মোবাইল বা রোল দিয়ে যে কেউ এক ক্লিকে ড্যাশবোর্ডে প্রবেশ করতে পারেন।',
              color: '#16a34a',
              bg: '#f0fdf4',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              title: 'সার্বজনীন সিলেবাস সাপোর্ট',
              desc: 'কওমি কিতাব বিভাগ, হিফজুল কুরআন, আলিয়া মাদরাসা ও সাধারণ স্কুল—যেকোনো কারিকুলামে এক ক্লিকে সুইচ করা যায়।',
              color: '#2563eb',
              bg: '#eff6ff',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              ),
            },
            {
              title: '২৪/৭ নূর এআই সহকারী',
              desc: 'অ্যাপের কোনো ফিচার বা বাটন না বুঝলে নূর এআই তাৎক্ষণিকভাবে সহজ বাংলায় সমাধান ও সরাসরি অ্যাকশন লিংক দেয়।',
              color: '#7c3aed',
              bg: '#f5f3ff',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
              ),
            },
          ].map((col) => (
            <div key={col.title} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: col.bg, margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {col.icon}
              </div>
              <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.35rem' }}>
                {col.title}
              </h3>
              <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.6' }}>
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      tag: 'আর্থিক স্বচ্ছতা',
      title: 'অর্থ, বেতন ও শিক্ষক ভাতা ব্যবস্থাপনা',
      subtitle: 'প্রতিটি টাকার স্বচ্ছ হিসাব এবং এক ক্লিকে বেতন শিট প্রসেসিং',
      badge: 'Financial & Payroll Hub',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.5rem' }}>
              ছাত্র বেতন ও ফি কালেকশন
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: '#475569', lineHeight: '1.8', fontFamily: 'Hind Siliguri, sans-serif' }}>
              <li><strong>১-ক্লিক কালেকশন:</strong> ছাত্রের নামের পাশে শুধু "বেতন নিন" চাপলেই নগদ, বিকাশ বা রকেটের অপশন পাওয়া যায়।</li>
              <li><strong>বকেয়া তালিকা:</strong> কার কত টাকা বকেয়া আছে তা আলাদা ট্যাবে এক পলকেই দেখা যায়।</li>
              <li><strong>ডিজিটাল রসিদ:</strong> ফি আদায়ের সাথে সাথে প্রফেশনাল মানি রিসিট প্রিন্ট করার অপশন।</li>
            </ul>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.5rem' }}>
              উস্তাদ ও শিক্ষক মাসিক ভাতা শিট
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: '#475569', lineHeight: '1.8', fontFamily: 'Hind Siliguri, sans-serif' }}>
              <li><strong>নির্দিষ্ট মাসিক ভাতা:</strong> প্রতিটি উস্তাদ ও শিক্ষকের পদবী অনুযায়ী নির্ধারিত বেতন শিট।</li>
              <li><strong>এক ক্লিকে পরিশোধ:</strong> "বাকি সবার ভাতা একসাথে পরিশোধ করুন" বাটন দিয়ে সম্পূর্ণ মাদরাসার বেতন এক সেকেন্ডে পরিশোধ সম্পন্ন।</li>
              <li><strong>আয়-ব্যয়ের ভারসাম্য:</strong> বিদ্যুৎ, খাদ্য, শিক্ষা সামগ্রী ও অবকাঠামোগত খরচের রিয়েল-টাইম ব্যালেন্স।</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      tag: 'দান ও অনুদান',
      title: 'পাবলিক ডোনার ইমপ্যাক্ট পোর্টাল (স্বচ্ছ অনুদান)',
      subtitle: 'দাতা দেখবেন তার দানের বাস্তব ফলাফল, বাড়বে প্রাতিষ্ঠানিক আস্থা',
      badge: 'Donor Transparency',
      content: (
        <div style={{ marginTop: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem', background: '#fefce8', border: '1.5px solid #fef08a', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '800', color: '#854d0e', marginBottom: '0.25rem' }}>
              "আমার দানের টাকা দিয়ে মাদরাসা কী করেছে?" — এই প্রশ্নের চূড়ান্ত সমাধান
            </h3>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#713f12', lineHeight: '1.6' }}>
              নূরহাবের অনন্য ফিচারের মাধ্যমে যেকোনো দাতা তার মোবাইল থেকেই ট্র্যাকিং কোড (যেমন: DNR-87654321) দিয়ে তার দেওয়া অনুদানের পুঙ্খানুপুঙ্খ ব্যবহার দেখতে পারবেন।
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[
              { label: 'বাস্তব ব্যবহার বিবরণ', desc: 'এতিমদের খাবার, শীতবস্ত্র বা কিতাব ক্রয়ের পুঙ্খানুপুঙ্খ হিসাব প্রদর্শন।' },
              { label: 'ডিজিটাল ভেরিফাইড রসিদ', desc: 'দাতা যেকোনো সময় নিজে তার অফিশিয়াল রসিদ প্রিন্ট বা সেভ করতে পারেন।' },
              { label: '১-ট্যাপ হোয়াটসঅ্যাপ যোগাযোগ', desc: 'রসিদের নিচ থেকেই সরাসরি মুহতামিম সাহেবের সাথে হোয়াটসঅ্যাপে যোগাযোগ ও দোয়া বিনিময়।' },
            ].map((d) => (
              <div key={d.label} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
                  {d.label}
                </div>
                <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.5' }}>
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 6,
      tag: 'যোগাযোগ ও গতি',
      title: '১-ট্যাপ যোগাযোগ, হাজিরা ও সহজ ছুটি',
      subtitle: 'অভিভাবক ও শিক্ষকদের সাথে যোগাযোগের দ্রুততম মাধ্যম',
      badge: 'Operations & Communication',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              ১-ট্যাপ সরাসরি কল ও হোয়াটসঅ্যাপ
            </h3>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#475569', lineHeight: '1.7' }}>
              প্রত্যেক ছাত্র ও শিক্ষকের প্রোফাইল কার্ডে দুটি ডেডিকেটেড বাটন রয়েছে:<br />
              📞 <strong>[সরাসরি কল]:</strong> কোনো নম্বর ডায়াল না করেই ১ ক্লিকে ফোন চলে যায়।<br />
              💬 <strong>[হোয়াটসঅ্যাপ]:</strong> অফিশিয়াল শুভেচ্ছা বার্তাসহ সরাসরি চ্যাট উইন্ডো খুলে যায়।
            </p>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              ওটিপি-বিহীন সহজ ছুটি ও হাজিরা
            </h3>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#475569', lineHeight: '1.7' }}>
              ✅ <strong>২ সেকেন্ডে হাজিরা:</strong> "সবাই উপস্থিত দিন" বাটন দিয়ে পুরো ক্লাসের উপস্থিতি সম্পন্ন।<br />
              🏖️ <strong>সহজ ছুটি:</strong> কোনো ওটিপি বা জটিলতা ছাড়াই দিন ও কারণ সিলেক্ট করে সেভ করলেই স্বয়ংক্রিয় ছুটি কার্যকর থাকে।
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      tag: 'জাতীয় মানচিত্র ও মেধা',
      title: 'পরীক্ষা, মেধা তালিকা ও জাতীয় মানচিত্র',
      subtitle: 'সুস্থ প্রতিযোগিতা এবং প্রাতিষ্ঠানিক স্বীকৃতির আধুনিক ডিরেক্টরি',
      badge: 'Leaderboard & GIS Map',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#7c3aed', marginBottom: '0.5rem' }}>
              দ্বৈত গ্রেডিং ও মার্কশিট সম্প্রচার
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: '#475569', lineHeight: '1.8', fontFamily: 'Hind Siliguri, sans-serif' }}>
              <li><strong>কওমি গ্রেড:</strong> মুমতাজ (A+), জাইয়্যিদ জিদ্দান (A), জাইয়্যিদ (B), মাকবুল (C)।</li>
              <li><strong>মেধা তালিকা:</strong> ১ম, ২য়, ৩য় মেধাক্রম স্বয়ংক্রিয়ভাবে তৈরি।</li>
              <li><strong>১-ক্লিক ব্রডকাস্ট:</strong> এক ক্লিকে সকল শিক্ষার্থীর অভিভাবকের হোয়াটসঅ্যাপে রেজাল্ট প্রেরণ।</li>
            </ul>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.5rem' }}>
              বহু-স্তরীয় মানচিত্র ও ডিরেক্টরি
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: '#475569', lineHeight: '1.8', fontFamily: 'Hind Siliguri, sans-serif' }}>
              <li><strong>ড্রিলডাউন কাঠামো:</strong> বিশ্ব → বাংলাদেশ → ৮টি বিভাগ → ৬৪ জেলা → উপজেলা।</li>
              <li><strong>পারফরম্যান্স টিকার:</strong> মোট শিক্ষার্থী, পাসের হার ও জাতীয় র‍্যাংকিং কার্ড।</li>
              <li><strong>ব্লু ভেরিফাইড টিক:</strong> মানসম্মত প্রতিষ্ঠানের জন্য বিশেষ ব্লু টিক ব্যাজ।</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      tag: 'কারিগরি শ্রেষ্ঠত্ব',
      title: '১০–৩০ লাখ ইউজারের জন্য উচ্চ স্কেল আর্কিটেকচার',
      subtitle: 'কোনো ল্যাগ ছাড়া কমদামী স্মার্টফোনেও বিদ্যুৎ গতিতে কাজ করবে',
      badge: 'High-Scale Engineering',
      content: (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#16a34a' }}>১০৩ kB</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>ফার্স্ট লোড সাইজ</div>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#2563eb' }}>১.১ সেকেন্ড</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>সার্ভার রেসপন্স স্পিড</div>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#ea580c' }}>১-ক্লিক</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>সম্পূর্ণ অফলাইন ব্যাকআপ</div>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#7c3aed' }}>PWA</div>
              <div style={{ fontSize: '0.725rem', color: '#64748b' }}>প্লে স্টোর ছাড়াও ইনস্টল</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', background: '#f8fafc' }}>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.825rem', color: '#475569', lineHeight: '1.6', textAlign: 'center' }}>
              <strong>নিরাপত্তা ও ডেটা সুরক্ষার প্রতিশ্রুতি:</strong> আপনার সমস্ত ডেটা এনক্রিপ্টেড থাকে এবং "প্রতিষ্ঠান সেটিংস" থেকে যেকোনো সময় এক ক্লিকে সম্পূর্ণ ডেটাবেজের ব্যাকআপ কম্পিউটারে সংরক্ষণ করা যায়।
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      tag: 'উপসংহার',
      title: 'নূরহাব — আগামীর পথচলা',
      subtitle: 'ঐতিহ্য ও আধুনিক প্রযুক্তির এক অনন্য মেলবন্ধন',
      badge: 'Conclusion & Next Steps',
      content: (
        <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
          <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
              আমাদের সাথে থাকার জন্য আন্তরিক ধন্যবাদ!
            </h3>
            <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              নূরহাব মাদরাসা শিক্ষার মর্যাদা ও দক্ষতাকে বহুগুণ বৃদ্ধি করতে প্রতিশ্রুতিবদ্ধ। যেকোনো শিক্ষা প্রতিষ্ঠান আজই এটি ব্যবহার শুরু করতে পারে।
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link href="/dashboard" className="btn btn-primary">
                লাইভ ড্যাশবোর্ড দেখুন →
              </Link>
              <button onClick={() => window.print()} className="btn btn-secondary">
                সম্পূর্ণ প্রেজেন্টেশন PDF ডাউনলোড
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  return (
    <div style={{ minHeight: '100dvh', background: '#f1f5f9', padding: '1.5rem 1rem' }}>
      {/* Top Controller Bar (Hidden in Print) */}
      <div
        className="no-print"
        style={{
          maxWidth: '56rem',
          margin: '0 auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontFamily: 'Hind Siliguri, sans-serif',
            fontWeight: '600',
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          ড্যাশবোর্ড
        </Link>

        {/* Slide Numbers / Pager */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                border: idx === currentSlide ? '2px solid #16a34a' : '1px solid #cbd5e1',
                background: idx === currentSlide ? '#16a34a' : '#ffffff',
                color: idx === currentSlide ? '#ffffff' : '#475569',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={() => window.print()}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          PDF হিসেবে সেভ / প্রিন্ট করুন
        </button>
      </div>

      {/* Screen Interactive Slide View (For Live Meeting Presentation) */}
      <div className="no-print" style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <div
          className="card fade-in"
          style={{
            padding: '2rem',
            minHeight: '28rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '2px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          {/* Slide Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {current.tag}
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '700' }}>
                স্লাইড {currentSlide + 1} / {slides.length}
              </span>
            </div>

            {currentSlide !== 0 && (
              <>
                <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
                  {current.title}
                </h2>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.9rem', color: '#64748b' }}>
                  {current.subtitle}
                </p>
              </>
            )}
          </div>

          {/* Slide Body */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {current.content}
          </div>

          {/* Slide Footer Navigator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', marginTop: '1.5rem' }}>
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="btn btn-secondary btn-sm"
              style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
            >
              ‹ পূর্ববর্তী স্লাইড
            </button>

            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'Hind Siliguri, sans-serif' }}>
              নূরহাব অফিশিয়াল প্রেজেন্টেশন
            </span>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="btn btn-primary btn-sm"
              style={{ opacity: currentSlide === slides.length - 1 ? 0.5 : 1 }}
            >
              পরবর্তী স্লাইড ›
            </button>
          </div>
        </div>
      </div>

      {/* Complete Print Document Layout (All Slides Sequentially Printed as A4 Pages) */}
      <div className="print-only">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            style={{
              pageBreakAfter: 'always',
              padding: '2.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: '800', color: '#16a34a' }}>নূরহাব (NoorHub) প্রেজেন্টেশন</span>
                <span style={{ color: '#64748b' }}>স্লাইড {idx + 1} / {slides.length}</span>
              </div>
              {idx !== 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>{s.title}</h2>
                  <p style={{ fontSize: '1rem', color: '#64748b' }}>{s.subtitle}</p>
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>{s.content}</div>

            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '0.5rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>কওমি, হিফজ, আলিয়া ও সাধারণ শিক্ষা ব্যবস্থাপনা</span>
              <span>গোপনীয় ও প্রাতিষ্ঠানিক ব্যবহারের জন্য সংরক্ষিত</span>
            </div>
          </div>
        ))}
      </div>

      {/* Print CSS Styles */}
      <style jsx global>{`
        @media screen {
          .print-only {
            display: none !important;
          }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
