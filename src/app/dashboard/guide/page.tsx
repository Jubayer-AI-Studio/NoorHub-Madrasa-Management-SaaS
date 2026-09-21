'use client';

export default function PresentationGuidePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '48rem', margin: '0 auto' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '800', color: '#0f172a' }}>
            নূরহাব — পূর্ণাঙ্গ প্রেজেন্টেশন ও ইউজার গাইড শিট
          </h1>
          <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
            মাদরাসা পরিচালনা পরিষদ, শিক্ষক ও অভিভাবকদের জন্য সহজ বাংলা নির্দেশিকা
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          শিট প্রিন্ট / PDF
        </button>
      </div>

      {/* Hero Presentation Card */}
      <div
        className="card"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff',
          marginBottom: '1.5rem',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z" />
              <path d="M9 20v-5a3 3 0 0 1 6 0v5" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.2rem', fontWeight: '800' }}>
              নূরহাব (NoorHub) — একটি যুগান্তকারী বিপ্লব
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              কওমি, হিফজ, আলিয়া ও সাধারণ শিক্ষা প্রতিষ্ঠানের একক সমাধান
            </div>
          </div>
        </div>

        <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', lineHeight: '1.7', color: '#cbd5e1' }}>
          নূরহাব কোনো গতানুগতিক সফটওয়্যার নয়। এটি এমনভাবে তৈরি করা হয়েছে যেন প্রবীণতম হুজুর থেকে শুরু করে সাধারণ অভিভাবক—সবাই কোনো প্রকার ওটিপি বা টেকনিক্যাল ঝামেলা ছাড়াই অতি সহজে মাদরাসার যাবতীয় কাজ সম্পন্ন করতে পারেন।
        </p>
      </div>

      {/* Module-by-Module Guide */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Module 1 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ১
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              অর্থ ও বেতন ব্যবস্থাপনা (Finance Hub)
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>ছাত্র বেতন আদায়:</strong> ছাত্রের নামের পাশে শুধু "বেতন নিন" চাপুন। নগদ, বিকাশ বা রকেট সিলেক্ট করে সাথে সাথে রসিদ প্রিন্ট করুন।</li>
            <li><strong>উস্তাদ ও শিক্ষক ভাতা:</strong> শিক্ষক তালিকা থেকে প্রত্যেকের মাসিক ভাতা দেখুন এবং এক ক্লিকে "বাকি সবার ভাতা একসাথে পরিশোধ করুন" বাটন দিয়ে বেতন শিট কমপ্লিট করুন।</li>
            <li><strong>যাকাত ও লিল্লাহ অনুদান:</strong> সাধারণ দান, যাকাত বা লিল্লাহর পৃথক রেজিস্টার এবং দাতার জন্য স্বয়ংক্রিয় ট্র্যাকিং কোড তৈরি।</li>
          </ul>
        </div>

        {/* Module 2 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ২
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              ছাত্র ও শিক্ষক প্রোফাইল (১-ট্যাপ সরাসরি কল ও হোয়াটসঅ্যাপ)
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>১-ট্যাপ সরাসরি কল:</strong> ছাত্র বা শিক্ষকের কার্ডের "সরাসরি কল" চাপলেই ফোন ডায়ালারে চলে যাবে। নম্বর মুখস্থ বা খোঁজার দরকার নেই।</li>
            <li><strong>১-ট্যাপ হোয়াটসঅ্যাপ:</strong> অভিভাবকের সাথে জরুরি প্রয়োজনে এক ক্লিকে অফিশিয়াল বার্তা নিয়ে হোয়াটসঅ্যাপ চ্যাট চালু হবে।</li>
            <li><strong>সিলেবাস ফিল্টারিং:</strong> কওমি, আলিয়া, হিফজ বা জেনারেল অনুসারে আলাদা আলাদা তালিকা দেখার ব্যবস্থা।</li>
          </ul>
        </div>

        {/* Module 3 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ৩
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              দৈনিক হাজিরা ও ওটিপি-বিহীন সহজ ছুটি মঞ্জুর
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>১-ক্লিক উপস্থিতি:</strong> "সবাই উপস্থিত দিন" বাটনে চাপ দিলেই পুরো ক্লাসের হাজিরা ২ সেকেন্ডে শেষ। এরপর শুধু যারা আসেনি তাদের "অনুপস্থিত" মার্ক করুন।</li>
            <li><strong>সহজ ছুটি:</strong> কোনো ওটিপি বা বায়োমেট্রিকের ঝামেলা ছাড়া ছাত্র নির্বাচন করে ২ দিন বা ৩ দিনের ছুটি সিলেক্ট করে সেভ করলেই স্বয়ংক্রিয় ছুটি কার্যকর থাকবে।</li>
          </ul>
        </div>

        {/* Module 4 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#fefce8', color: '#ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ৪
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              পাবলিক ডোনার ইমপ্যাক্ট পোর্টাল (স্বচ্ছ অনুদান)
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>দাতার আত্মতুষ্টি ও ফলাফল:</strong> দাতা একটি কোড দিয়েই দেখতে পাবেন তার দেওয়া অর্থ কোন কোন খাতে (এতিমদের খাবার, কিতাব বিতরণ, চিকিৎসা) খরচ হয়েছে।</li>
            <li><strong>ডিজিটাল রসিদ:</strong> দাতা নিজেই নিজের মোবাইলে ভেরিফাইড রসিদ ডাউনলোড ও প্রিন্ট করতে পারেন।</li>
          </ul>
        </div>

        {/* Module 5 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ৫
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              পরীক্ষা, মেধা তালিকা ও মার্কশিট সম্প্রচার
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>দ্বৈত গ্রেডিং:</strong> কওমি মাদরাসার জন্য মুমতাজ/জাইয়্যিদ জিদ্দান এবং জেনারেল/আলিয়ার জন্য A+/A গ্রেড।</li>
            <li><strong>১-ক্লিক ব্রডকাস্ট:</strong> পরীক্ষা শেষ হলে "অভিভাবকদের ফলাফল পাঠান" বাটনে চাপ দিলেই স্বয়ংক্রিয়ভাবে সবার হোয়াটসঅ্যাপে ফলাফল পৌঁছে যাবে।</li>
            <li><strong>অফিশিয়াল মার্কশিট:</strong> মেধা তালিকার পাশেই মার্কশিট প্রিন্ট করার অপশন।</li>
          </ul>
        </div>

        {/* Module 6 */}
        <div className="card" style={{ padding: '1.25rem', border: '1.5px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
              ৬
            </span>
            <h3 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
              নূর এআই সহকারী (Noor AI Copilot)
            </h3>
          </div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', fontFamily: 'Hind Siliguri, sans-serif' }}>
            <li><strong>সার্বক্ষণিক গাইড:</strong> অ্যাপের কোথায় কী আছে না বুঝলে নূর এআই-কে জিজ্ঞেস করলেই সে সহজ বাংলায় বুঝিয়ে দিবে এবং সরাসরি সেই পেজে যাওয়ার লিঙ্ক প্রদান করবে।</li>
          </ul>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
        <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.85rem', color: '#64748b' }}>
          নূরহাব v1.0 · সকল শিক্ষা প্রতিষ্ঠানের জন্য আধুনিক, সহজ ও নির্ভরযোগ্য ডিজিটাল ম্যানেজমেন্ট প্ল্যাটফর্ম
        </p>
      </div>
    </div>
  );
}
