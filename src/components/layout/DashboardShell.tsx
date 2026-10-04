'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Building2,
  Users,
  CalendarCheck,
  Award,
  Wallet,
  BookOpen,
  Compass,
  FileText,
  Settings,
  ExternalLink,
  PlusCircle,
  MonitorPlay,
  Crown,
  HeartHandshake,
  UserCheck,
  LogIn,
  GraduationCap,
  MessageSquare,
  Trophy,
  Check,
  CreditCard,
} from 'lucide-react';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import DesktopTopBar from '@/components/layout/DesktopTopBar';
import NoorHubLogo from '@/components/brand/NoorHubLogo';
import AppOpenAnimation from '@/components/brand/AppOpenAnimation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { useLanguage } from '@/lib/language-store';
import {
  getActiveMadrasa,
  setActiveMadrasa,
  getCustomMadrasas,
  DEFAULT_DEMO_MADRASA,
  MadrasaProfile,
} from '@/lib/madrasa-store';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const pathname = usePathname();
  const isMapRoute = pathname === '/dashboard/map' || pathname?.startsWith('/dashboard/map');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMadrasaModalOpen, setIsMadrasaModalOpen] = useState(false);
  const [activeMadrasa, setActiveMadrasaState] = useState<MadrasaProfile>(DEFAULT_DEMO_MADRASA);
  const [customMadrasas, setCustomMadrasasState] = useState<MadrasaProfile[]>([]);
  const [activeRole, setActiveRole] = useState<'mutawalli' | 'principal' | 'parent' | 'donor'>('principal');

  const syncMadrasas = () => {
    setActiveMadrasaState(getActiveMadrasa());
    setCustomMadrasasState(getCustomMadrasas());
  };

  useEffect(() => {
    syncMadrasas();
    window.addEventListener('noorhub_madrasa_changed', syncMadrasas);
    return () => window.removeEventListener('noorhub_madrasa_changed', syncMadrasas);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsMadrasaModalOpen(false);
  }, [pathname]);

  const handleSelectMadrasa = (id: string) => {
    setActiveMadrasa(id);
    setIsMadrasaModalOpen(false);
  };

  // When on the map route, render ONLY the full-screen map without any sidebar or topbar pushing it
  if (isMapRoute) {
    return <main className="w-screen h-screen overflow-hidden bg-[#021810]">{children}</main>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', fontFamily: "'Hind Siliguri', 'Inter', sans-serif" }}>
      {/* App Open Storyboard Splash Animation */}
      <AppOpenAnimation />

      {/* =========================================================
          DESKTOP SIDEBAR (Visible only on Desktop PC: lg and above)
         ========================================================= */}
      <div className="hidden lg:flex shrink-0">
        <DesktopSidebar />
      </div>

      {/* Main Content Workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* DESKTOP TOP BAR (Visible only on Desktop PC) */}
        <div className="hidden lg:block">
          <DesktopTopBar />
        </div>

        {/* =========================================================
            MOBILE TOP APP BAR (Visible only on Mobile phones: lg:hidden)
           ========================================================= */}
        <header
          className="lg:hidden"
          style={{
            height: '62px',
            backgroundColor: '#ffffff',
            borderBottom: '1.5px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Left: Mobile Menu Button (☰) + NoorHub Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                border: '1.5px solid #cbd5e1',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="সকল মেনু ও অপশন"
            >
              <Menu style={{ width: '20px', height: '20px', color: '#15803d' }} />
            </button>

            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <NoorHubLogo variant="horizontal" size="xs" theme="light" showTagline={false} />
            </Link>
          </div>

          {/* Right: Madrasa Switcher + Language Toggle + AI Launcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
            {/* Madrasa Quick Pill */}
            <button
              type="button"
              onClick={() => setIsMadrasaModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '5px 7px',
                borderRadius: '999px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                maxWidth: '92px',
                flexShrink: 0,
              }}
              title={isEn ? "Switch Madrasa / Campus" : "মাদরাসা পরিবর্তন করুন"}
            >
              <Building2 style={{ width: '12px', height: '12px', color: '#059669', flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeMadrasa.name.slice(0, 6)}..
              </span>
              <ChevronDown style={{ width: '11px', height: '11px', color: '#059669', flexShrink: 0 }} />
            </button>

            {/* Global Language Toggle (Mobile) */}
            <LanguageToggle variant="compact" />

            {/* Noor AI Quick Launcher */}
            <Link
              href="/dashboard/ai"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '5px 8px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #059669, #0d9488)',
                color: 'white',
                fontSize: '11px',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <Sparkles style={{ width: '11px', height: '11px' }} />
              <span>{isEn ? 'AI' : 'এআই'}</span>
            </Link>

            {/* Role Switcher Avatar Badge (Visible on sm and up) */}
            <button
              type="button"
              onClick={() => setIsMadrasaModalOpen(true)}
              className="hidden sm:flex"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: activeRole === 'mutawalli'
                  ? 'linear-gradient(135deg, #0d9488, #0f766e)'
                  : activeRole === 'parent'
                  ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                  : activeRole === 'donor'
                  ? 'linear-gradient(135deg, #ca8a04, #a16207)'
                  : 'linear-gradient(135deg, #16a34a, #15803d)',
                color: 'white',
                fontWeight: '800',
                fontSize: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              title={isEn ? "Role & Portal Switch" : "রোল ও পোর্টাল সুইচ"}
            >
              {isEn
                ? (activeRole === 'mutawalli' ? 'Mut' : activeRole === 'parent' ? 'Par' : activeRole === 'donor' ? 'Don' : 'Prn')
                : (activeRole === 'mutawalli' ? 'মুতা' : activeRole === 'parent' ? 'অভি' : activeRole === 'donor' ? 'দাতা' : 'মুহ')}
            </button>
          </div>
        </header>

        {/* =========================================================
            MOBILE FULL-FEATURED MENU MODAL (Hamburger ☰ Click)
           ========================================================= */}
        {isDrawerOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '14px 18px',
                background: 'linear-gradient(135deg, #064e3b, #022c1b)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <NoorHubLogo variant="horizontal" size="xs" theme="dark" showTagline={true} />
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#6ee7b7', backgroundColor: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '6px', width: 'fit-content' }}>
                  <Building2 style={{ width: '10px', height: '10px' }} />
                  <span style={{ fontWeight: '600' }}>{activeMadrasa.name}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LanguageToggle variant="compact" />
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>

            {/* Scrollable Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f8fafc' }}>
              {/* 1. TOP PORTAL SWITCHER CARDS */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  👑 পোর্টাল ও ব্যবহারকারীর ভূমিকা:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('mutawalli');
                      setIsDrawerOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: activeRole === 'mutawalli' ? '#0d9488' : '#ffffff',
                      color: activeRole === 'mutawalli' ? '#ffffff' : '#0f172a',
                      border: `1.5px solid ${activeRole === 'mutawalli' ? '#0d9488' : '#cbd5e1'}`,
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Crown style={{ width: '16px', height: '16px', color: activeRole === 'mutawalli' ? '#fef08a' : '#0d9488', flexShrink: 0 }} />
                    <span>👑 মুতাওয়াল্লি হাব</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('principal');
                      setIsDrawerOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: activeRole === 'principal' ? '#16a34a' : '#ffffff',
                      color: activeRole === 'principal' ? '#ffffff' : '#0f172a',
                      border: `1.5px solid ${activeRole === 'principal' ? '#16a34a' : '#cbd5e1'}`,
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Building2 style={{ width: '16px', height: '16px', color: activeRole === 'principal' ? '#ffffff' : '#16a34a', flexShrink: 0 }} />
                    <span>🕌 মুহতামিম মোড</span>
                  </button>

                  <Link
                    href="/dashboard/parent"
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      color: '#c2410c',
                      border: '1.5px solid #fed7aa',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <UserCheck style={{ width: '16px', height: '16px', color: '#ea580c', flexShrink: 0 }} />
                    <span>👨‍👩‍👦 অভিভাবক পোর্টাল</span>
                  </Link>

                  <Link
                    href="/donor"
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      color: '#a16207',
                      border: '1.5px solid #fef08a',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <HeartHandshake style={{ width: '16px', height: '16px', color: '#ca8a04', flexShrink: 0 }} />
                    <span>🤝 দাতা ও অডিট</span>
                  </Link>

                  <Link
                    href="/dashboard/showcase"
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1.5px solid #bfdbfe',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      gridColumn: 'span 2',
                    }}
                  >
                    <Compass style={{ width: '16px', height: '16px', color: '#2563eb', flexShrink: 0 }} />
                    <span>📖 মাদরাসা পরিচিতি ও পাঠ্যক্রম</span>
                  </Link>
                </div>
              </div>

              {/* 2. ALL MODULES LIST (BEAUTIFULLY STYLED CARDS) */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚡ সকল ফিচার ও মডিউল:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {[
                    { href: '/dashboard', label: 'মূল ড্যাশবোর্ড', icon: Building2, color: '#16a34a', bg: '#f0fdf4' },
                    { href: '/dashboard/showcase', label: 'মাদরাসা পরিচিতি ও পাঠ্যক্রম', icon: BookOpen, color: '#059669', bg: '#ecfdf5' },
                    { href: '/dashboard/students', label: 'ছাত্রছাত্রী ও আইডি কার্ড সিস্টেম', icon: Users, color: '#2563eb', bg: '#eff6ff', badge: '🪪 আইডি কার্ড' },
                    { href: '/dashboard/attendance', label: 'স্মارت হাজিরা', icon: CalendarCheck, color: '#059669', bg: '#ecfdf5' },
                    { href: '/dashboard/hifz', label: 'হিফজুল কুরআন ট্র্যাকার', icon: BookOpen, color: '#16a34a', bg: '#f0fdf4' },
                    { href: '/dashboard/results', label: 'পরীক্ষা ও ফলাফল', icon: Award, color: '#7c3aed', bg: '#f5f3ff' },
                    { href: '/dashboard/finance', label: 'হিসাব ও অর্থ', icon: Wallet, color: '#d97706', bg: '#fef3c7' },
                    { href: '/dashboard/map', label: 'ইসলামিক মানচিত্র (GIS)', icon: Compass, color: '#0284c7', bg: '#f0f9ff', badge: 'লাইভ' },
                    { href: '/dashboard/classes', label: 'শ্রেণি ও জামাত সিলেবাস', icon: GraduationCap, color: '#475569', bg: '#f8fafc' },
                    { href: '/dashboard/teachers', label: 'উস্তাদ ও শিক্ষক ডিরেক্টরি', icon: Users, color: '#0d9488', bg: '#f0fdfa' },
                    { href: '/dashboard/notice', label: 'নোটিশ বোর্ড ও সার্কুলার', icon: FileText, color: '#ea580c', bg: '#fff7ed' },
                    { href: '/dashboard/automation', label: 'হোয়াটসঅ্যাপ অটোমেশন হাব', icon: MessageSquare, color: '#16a34a', bg: '#f0fdf4' },
                    { href: '/dashboard/competition', label: 'সুস্থ প্রতিযোগিতা ও রেটিং', icon: Trophy, color: '#ca8a04', bg: '#fefce8' },
                    { href: '/dashboard/ai', label: 'নূর এআই সহকারী (২৪/৭)', icon: Sparkles, color: '#059669', bg: '#ecfdf5', badge: 'AI' },
                    { href: '/dashboard/settings', label: 'প্রতিষ্ঠান সেটিংস', icon: Settings, color: '#64748b', bg: '#f8fafc' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDrawerOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          backgroundColor: isActive ? '#ecfdf5' : '#ffffff',
                          border: `1.5px solid ${isActive ? '#10b981' : '#e2e8f0'}`,
                          textDecoration: 'none',
                          color: '#0f172a',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: item.bg,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon style={{ width: '18px', height: '18px', color: item.color }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '700' }}>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '2px 8px',
                              borderRadius: '999px',
                              backgroundColor: '#ecfdf5',
                              color: '#047857',
                              border: '1px solid #a7f3d0',
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
            </div>

            {/* Modal Bottom Fixed Actions */}
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                borderTop: '1.5px solid #e2e8f0',
                display: 'flex',
                gap: '8px',
              }}
            >
              <Link
                href="/register"
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #16a34a, #0d9488)',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '800',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
                }}
              >
                ➕ নতুন মাদরাসা যুক্ত করুন
              </Link>
              <Link
                href="/login"
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#f1f5f9',
                  border: '1.5px solid #cbd5e1',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: '800',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                🔑 লগইন
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================
            MADRASA & ROLE SWITCHER BOTTOM SHEET MODAL
           ========================================================= */}
        {isMadrasaModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(3px)',
              fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                backgroundColor: '#ffffff',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '20px',
                maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    মাদরাসা ও রোল নির্বাচন
                  </h3>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>
                    যেকোনো রোল বা মাদরাসায় ১-ক্লিকে সুইচ করুন
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMadrasaModalOpen(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                  }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              {/* Roles Section */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  আপনার ভূমিকা (রোল) পরিবর্তন:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('mutawalli');
                      setIsMadrasaModalOpen(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${activeRole === 'mutawalli' ? '#0d9488' : '#e2e8f0'}`,
                      backgroundColor: activeRole === 'mutawalli' ? '#f0fdfa' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#0d9488' }}>👑 মুতাওয়াল্লি</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>কমিটি ও ফান্ড অডিট</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveRole('principal');
                      setIsMadrasaModalOpen(false);
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${activeRole === 'principal' ? '#16a34a' : '#e2e8f0'}`,
                      backgroundColor: activeRole === 'principal' ? '#f0fdf4' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#16a34a' }}>🕌 মুহতামিম</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>প্রধান শিক্ষক এডমিন</div>
                  </button>

                  <Link
                    href="/dashboard/parent"
                    onClick={() => setIsMadrasaModalOpen(false)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #fed7aa',
                      backgroundColor: '#fff7ed',
                      textAlign: 'left',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#ea580c' }}>👨‍👩‍👦 অভিভাবক</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>সন্তানের প্রোগ্রেস ও ফি</div>
                  </Link>

                  <Link
                    href="/donor"
                    onClick={() => setIsMadrasaModalOpen(false)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #fef08a',
                      backgroundColor: '#fefce8',
                      textAlign: 'left',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#ca8a04' }}>🤝 দাতা ও অডিট</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>স্বচ্ছ অনুদান ও রসিদ</div>
                  </Link>
                </div>
              </div>

              {/* Madrasa Switcher List */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  নিবন্ধিত প্রতিষ্ঠান নির্বাচন:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div
                    onClick={() => handleSelectMadrasa(DEFAULT_DEMO_MADRASA.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${activeMadrasa.id === DEFAULT_DEMO_MADRASA.id ? '#10b981' : '#e2e8f0'}`,
                      backgroundColor: activeMadrasa.id === DEFAULT_DEMO_MADRASA.id ? '#f0fdf4' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>{DEFAULT_DEMO_MADRASA.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{DEFAULT_DEMO_MADRASA.typeLabel} • {DEFAULT_DEMO_MADRASA.district}</div>
                    </div>
                    {activeMadrasa.id === DEFAULT_DEMO_MADRASA.id && (
                      <Check style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                    )}
                  </div>

                  {customMadrasas.map((madrasa) => (
                    <div
                      key={madrasa.id}
                      onClick={() => handleSelectMadrasa(madrasa.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: `1.5px solid ${activeMadrasa.id === madrasa.id ? '#10b981' : '#e2e8f0'}`,
                        backgroundColor: activeMadrasa.id === madrasa.id ? '#f0fdf4' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>{madrasa.name}</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{madrasa.typeLabel} • {madrasa.district}</div>
                      </div>
                      {activeMadrasa.id === madrasa.id && (
                        <Check style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Login & Register Buttons */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                <Link
                  href="/register"
                  onClick={() => setIsMadrasaModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: '#16a34a',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '800',
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                >
                  ➕ নতুন মাদরাসা নিবন্ধন
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMadrasaModalOpen(false)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#f1f5f9',
                    border: '1.5px solid #cbd5e1',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: '800',
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                >
                  🔑 লগইন
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, minWidth: 0, paddingBottom: '4.5rem' }}>
          {children}
        </main>

        {/* =========================================================
            MOBILE BOTTOM NAVIGATION BAR (Visible only on Mobile phones: lg:hidden)
           ========================================================= */}
        <nav
          className="lg:hidden"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#ffffff',
            borderTop: '1.5px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 40,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
          }}
        >
          {[
            {
              href: '/dashboard',
              label: isEn ? 'Home' : 'হোম',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              ),
            },
            {
              href: '/dashboard/students',
              label: isEn ? 'Students' : 'ছাত্র ও আইডি',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
            },
            {
              href: '/dashboard/attendance',
              label: isEn ? 'Attendance' : 'হাজিরা',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              ),
            },
            {
              href: '/dashboard/map',
              label: isEn ? 'GIS Map' : 'মানচিত্র',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
              ),
            },
            {
              href: '/dashboard/more',
              label: isEn ? 'All Menu' : 'সকল মেনু',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              ),
            },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  textDecoration: 'none',
                  color: isActive ? '#16a34a' : '#64748b',
                  fontSize: '11px',
                  fontWeight: isActive ? '800' : '600',
                  padding: '4px 8px',
                  borderRadius: '8px',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
