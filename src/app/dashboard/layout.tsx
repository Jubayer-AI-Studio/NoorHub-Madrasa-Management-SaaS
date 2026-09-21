import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ড্যাশবোর্ড',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100dvh', background: '#f8fafc' }}>
      {/* Top App Bar */}
      <header className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Mosque SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 5 5 5 9v1H3v2h2v8h14v-8h2V10h-2V9c0-4-3-7-7-7z"/>
              <path d="M9 20v-5a3 3 0 0 1 6 0v5"/>
              <path d="M12 2v3"/>
              <circle cx="12" cy="7" r="1"/>
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'Hind Siliguri, sans-serif',
              fontWeight: '700',
              fontSize: '1.0625rem',
              color: '#0f172a',
            }}
          >
            নূরহাব
          </span>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Noor AI Button */}
          <button
            style={{
              background: 'linear-gradient(135deg, #f0fdf4, #eff6ff)',
              border: '1.5px solid #bbf7d0',
              borderRadius: '0.625rem',
              padding: '0.375rem 0.75rem',
              fontFamily: 'Hind Siliguri, sans-serif',
              fontSize: '0.8rem',
              fontWeight: '600',
              color: '#16a34a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            {/* Sparkle SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            নূর এআই
          </button>

          {/* Notification Bell */}
          <button
            style={{
              width: '2.25rem', height: '2.25rem',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '0.625rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {/* Notification dot */}
            <span style={{
              position: 'absolute', top: '0.375rem', right: '0.375rem',
              width: '0.5rem', height: '0.5rem',
              background: '#ef4444', borderRadius: '50%',
              border: '1.5px solid white',
            }} />
          </button>

          {/* Profile Avatar */}
          <div
            style={{
              width: '2.25rem', height: '2.25rem',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: '700', fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'Hind Siliguri, sans-serif',
            }}
          >
            ম
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        {[
          {
            href: '/dashboard',
            label: 'হোম',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            ),
          },
          {
            href: '/dashboard/students',
            label: 'ছাত্র',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            ),
          },
          {
            href: '/dashboard/attendance',
            label: 'হাজিরা',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            ),
          },
          {
            href: '/dashboard/finance',
            label: 'অর্থ',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            ),
          },
          {
            href: '/dashboard/more',
            label: 'আরও',
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            ),
          },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="bottom-nav-item tap-area"
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
