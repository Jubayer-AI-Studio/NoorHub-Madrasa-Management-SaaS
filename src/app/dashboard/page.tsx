export default function DashboardPage() {
  const stats = [
    {
      label: 'মোট ছাত্র',
      value: '৩৪৭',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: 'আজ উপস্থিত',
      value: '৩১২',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#bfdbfe',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
    },
    {
      label: 'বকেয়া ফি',
      value: '৪৫',
      color: '#dc2626',
      bg: '#fef2f2',
      border: '#fecaca',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
    },
    {
      label: 'মোট শিক্ষক',
      value: '২৪',
      color: '#7c3aed',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
          <line x1="12" y1="12" x2="12" y2="12.01"/>
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      label: 'হাজিরা নিন',
      href: '/dashboard/attendance/take',
      color: '#16a34a',
      bg: '#f0fdf4',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
    },
    {
      label: 'ফি সংগ্রহ',
      href: '/dashboard/finance/collect',
      color: '#2563eb',
      bg: '#eff6ff',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'রেজাল্ট',
      href: '/dashboard/results',
      color: '#7c3aed',
      bg: '#f5f3ff',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
    },
    {
      label: 'নোটিশ',
      href: '/dashboard/notice',
      color: '#ea580c',
      bg: '#fff7ed',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
    {
      label: 'ছুটি মঞ্জুর',
      href: '/dashboard/leaves',
      color: '#0891b2',
      bg: '#ecfeff',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'নূর এআই',
      href: '/dashboard/ai',
      color: '#16a34a',
      bg: '#f0fdf4',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      ),
    },
  ];

  const activities = [
    {
      text: 'মোঃ আব্দুর রহমান — ফি পরিশোধ (৮৫০ টাকা)',
      time: '১০ মিনিট আগে',
      color: '#16a34a',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
    {
      text: 'দশম শ্রেণি হাজিরা সম্পন্ন — ৩৮/৪০ জন',
      time: '৩০ মিনিট আগে',
      color: '#2563eb',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
    },
    {
      text: 'মোঃ কামাল হোসেন — ২ দিনের ছুটি মঞ্জুর',
      time: '১ ঘণ্টা আগে',
      color: '#ea580c',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      text: 'নতুন ছাত্র ভর্তি — মোঃ ইব্রাহিম (হিফজ বিভাগ)',
      time: '২ ঘণ্টা আগে',
      color: '#7c3aed',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      {/* Greeting */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.375rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>
          আস-সালামু আলাইকুম
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', fontFamily: 'Hind Siliguri, sans-serif' }}>
          রবিবার, ২১ সেপ্টেম্বর ২০২৬
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card card-hover" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <span style={{ background: stat.bg, color: stat.color, padding: '0.125rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: '700', border: `1px solid ${stat.border}` }}>
                লাইভ
              </span>
            </div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: stat.color, lineHeight: '1', marginBottom: '0.25rem' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem' }}>
          দ্রুত কাজ
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="tap-area"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem 0.5rem', background: '#ffffff', borderRadius: '1rem', border: '1.5px solid #f1f5f9', textDecoration: 'none', transition: 'all 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <div style={{ width: '3rem', height: '3rem', background: action.bg, borderRadius: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {action.icon}
              </div>
              <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', fontWeight: '600', color: '#334155', textAlign: 'center', lineHeight: '1.3' }}>
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Financial Summary Bar */}
      <div
        className="card"
        style={{ padding: '1rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.875rem', fontWeight: '600', color: '#94a3b8' }}>
            এই মাসের অর্থ বিবরণ
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { label: 'মোট আয়',   value: '১,২৪,৫০০', color: '#4ade80' },
            { label: 'মোট ব্যয়', value: '৮৯,২০০',   color: '#f87171' },
            { label: 'অবশিষ্ট',  value: '৩৫,৩০০',   color: '#60a5fa' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1.0625rem', fontWeight: '800', color: item.color, marginBottom: '0.25rem' }}>
                ৳{item.value}
              </div>
              <div style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.6875rem', color: '#64748b' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem' }}>
          সাম্প্রতিক কার্যক্রম
        </h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {activities.map((activity, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', padding: '0.875rem 1rem', borderBottom: i < activities.length - 1 ? '1px solid #f1f5f9' : 'none' }}
            >
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: `${activity.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {activity.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.8125rem', color: '#334155', lineHeight: '1.5', marginBottom: '0.25rem' }}>
                  {activity.text}
                </p>
                <p style={{ fontFamily: 'Hind Siliguri, sans-serif', fontSize: '0.75rem', color: '#94a3b8' }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
