'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NoorHubLogo from '@/components/brand/NoorHubLogo';
import { useLanguage } from '@/lib/language-store';
import {
  Home,
  Users,
  CalendarCheck,
  Award,
  Wallet,
  BookOpen,
  Compass,
  Trophy,
  Sparkles,
  FileText,
  Settings,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  PlusCircle,
  MonitorPlay,
  Smartphone,
} from 'lucide-react';

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  badge?: string;
  external?: boolean;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

import {
  getActiveMadrasa,
  DEFAULT_DEMO_MADRASA,
  MadrasaProfile,
} from '@/lib/madrasa-store';

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { t, lang } = useLanguage();
  const [activeMadrasa, setActiveMadrasaState] = React.useState<MadrasaProfile>(DEFAULT_DEMO_MADRASA);

  const menuGroups: MenuGroup[] = [
    {
      title: t('group_main'),
      items: [
        { href: '/dashboard', label: t('nav_dashboard'), icon: Home },
        { href: '/dashboard/students', label: t('nav_students'), icon: Users },
        { href: '/dashboard/attendance', label: t('nav_attendance'), icon: CalendarCheck },
        { href: '/dashboard/results', label: t('nav_results'), icon: Award },
        { href: '/dashboard/finance', label: t('nav_finance'), icon: Wallet },
      ],
    },
    {
      title: t('group_academic'),
      items: [
        { href: '/dashboard/hifz', label: t('nav_hifz'), icon: BookOpen },
        { href: '/dashboard/map', label: t('nav_map'), icon: Compass, badge: lang === 'en' ? 'Live' : 'লাইভ' },
        { href: '/dashboard/competition', label: t('nav_competition'), icon: Trophy },
        { href: '/dashboard/ai', label: t('nav_ai'), icon: Sparkles, badge: 'AI' },
        { href: '/dashboard/notice', label: t('nav_notice'), icon: FileText },
      ],
    },
    {
      title: t('group_system'),
      items: [
        { href: '/dashboard/showcase', label: t('nav_showcase'), icon: BookOpen },
        { href: '/register', label: t('nav_register'), icon: PlusCircle, badge: lang === 'en' ? 'Free' : 'ফ্রি' },
        { href: '/explore', label: t('nav_explore'), icon: ExternalLink, external: true },
        { href: '/dashboard/settings', label: t('nav_settings'), icon: Settings },
      ],
    },
  ];

  React.useEffect(() => {
    const sync = () => setActiveMadrasaState(getActiveMadrasa());
    sync();
    window.addEventListener('noorhub_madrasa_changed', sync);
    return () => window.removeEventListener('noorhub_madrasa_changed', sync);
  }, []);

  return (
    <aside
      style={{
        width: '270px',
        minWidth: '270px',
        maxWidth: '270px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backgroundColor: '#ffffff',
        borderRight: '1.5px solid #e2e8f0',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.03)',
      }}
      className="hidden lg:flex flex-col shrink-0"
    >
      {/* Brand Header */}
      <div
        style={{
          height: '74px',
          minHeight: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          background: 'linear-gradient(135deg, #022c22 0%, #064e3b 60%, #047857 100%)',
          color: 'white',
          borderBottom: '2px solid #f59e0b',
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <NoorHubLogo variant="horizontal" size="sm" theme="dark" showTagline={true} />
        </Link>

        <span
          style={{
            padding: '2px 7px',
            borderRadius: '999px',
            background: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            color: '#fef08a',
            fontSize: '10px',
            fontWeight: '800',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          PRO
        </span>
      </div>

      {/* Navigation Links (Scrollable) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
        className="no-scrollbar"
      >
        {menuGroups.map((group) => (
          <div key={group.title}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '800',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0 12px',
                marginBottom: '8px',
              }}
            >
              {group.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: isActive ? '800' : '600',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      backgroundColor: isActive ? '#059669' : 'transparent',
                      color: isActive ? '#ffffff' : '#334155',
                      boxShadow: isActive ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.color = '#0f172a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#334155';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon
                        style={{
                          width: '18px',
                          height: '18px',
                          color: isActive ? '#ffffff' : '#64748b',
                          flexShrink: 0,
                        }}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                          backgroundColor: isActive ? '#ffffff' : item.badge === 'AI' ? '#fef3c7' : '#dcfce7',
                          color: isActive ? '#065f46' : item.badge === 'AI' ? '#92400e' : '#15803d',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Institutional User Profile Card at Bottom */}
      <div
        style={{
          padding: '14px',
          borderTop: '1.5px solid #f1f5f9',
          backgroundColor: '#f8fafc',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '14px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              fontWeight: '900',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {activeMadrasa.principal ? activeMadrasa.principal.replace(/^(মাওলানা|মুফতি|মুহাম্মদ)\s*/, '')[0] || 'ম' : 'ম'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: '800',
                color: '#0f172a',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={activeMadrasa.principal}
            >
              {activeMadrasa.principal || 'মুহতামিম অফিস'}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#64748b',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={activeMadrasa.name}
            >
              {activeMadrasa.name}
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            style={{
              color: '#94a3b8',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
            }}
            title="সেটিংস"
          >
            <Settings style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
