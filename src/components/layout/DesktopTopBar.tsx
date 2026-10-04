'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sparkles,
  Calendar,
  Building2,
  ChevronDown,
  Globe,
  ExternalLink,
  Check,
  PlusCircle,
  Smartphone,
} from 'lucide-react';
import {
  getActiveMadrasa,
  setActiveMadrasa,
  getCustomMadrasas,
  DEFAULT_DEMO_MADRASA,
  MadrasaProfile,
} from '@/lib/madrasa-store';
import { useLanguage } from '@/lib/language-store';
import LanguageToggle from '@/components/layout/LanguageToggle';

export default function DesktopTopBar() {
  const { t } = useLanguage();
  const [activeMadrasa, setActiveMadrasaState] = useState<MadrasaProfile>(DEFAULT_DEMO_MADRASA);
  const [customMadrasas, setCustomMadrasasState] = useState<MadrasaProfile[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const syncMadrasas = () => {
    setActiveMadrasaState(getActiveMadrasa());
    setCustomMadrasasState(getCustomMadrasas());
  };

  useEffect(() => {
    syncMadrasas();

    window.addEventListener('noorhub_madrasa_changed', syncMadrasas);
    return () => {
      window.removeEventListener('noorhub_madrasa_changed', syncMadrasas);
    };
  }, []);

  const handleSelect = (id: string) => {
    setActiveMadrasa(id);
    setIsDropdownOpen(false);
  };

  return (
    <header
      style={{
        height: '70px',
        minHeight: '70px',
        width: '100%',
        padding: '0 28px',
        backgroundColor: '#ffffff',
        borderBottom: '1.5px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        fontFamily: "'Hind Siliguri', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      className="hidden lg:flex items-center justify-between"
    >
      {/* Left: Dynamic Multi-Tenancy Institution Switcher + Global Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '680px' }}>
        {/* Institutional Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              fontSize: '13px',
              fontWeight: '700',
              color: '#1e293b',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Building2 style={{ width: '16px', height: '16px', color: '#059669' }} />
            <span>{activeMadrasa.name}</span>
            <ChevronDown style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '300px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                padding: '8px',
                zIndex: 50,
              }}
            >
              <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>
                প্রতিষ্ঠান পরিবর্তন করুন
              </div>

              {/* Demo Default */}
              <div
                onClick={() => handleSelect(DEFAULT_DEMO_MADRASA.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: activeMadrasa.id === DEFAULT_DEMO_MADRASA.id ? '#f0fdf4' : 'transparent',
                  color: activeMadrasa.id === DEFAULT_DEMO_MADRASA.id ? '#166534' : '#334155',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800' }}>{DEFAULT_DEMO_MADRASA.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>ডেমো প্রতিষ্ঠান • মিরপুর, ঢাকা</div>
                </div>
                {activeMadrasa.id === DEFAULT_DEMO_MADRASA.id && (
                  <Check style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                )}
              </div>

              {/* Custom Registered Madrasas */}
              {customMadrasas.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelect(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: activeMadrasa.id === m.id ? '#f0fdf4' : 'transparent',
                    color: activeMadrasa.id === m.id ? '#166534' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800' }}>{m.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {m.upazila}, {m.district}
                    </div>
                  </div>
                  {activeMadrasa.id === m.id && (
                    <Check style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                  )}
                </div>
              ))}

              {/* Add New Madrasa Option */}
              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '6px', paddingTop: '6px' }}>
                <Link
                  href="/register"
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    color: '#16a34a',
                    fontSize: '13px',
                    fontWeight: '800',
                    textDecoration: 'none',
                    backgroundColor: '#f0fdf4',
                  }}
                >
                  <PlusCircle style={{ width: '16px', height: '16px' }} />
                  <span>+ নতুন মাদরাসা যুক্ত করুন</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Global Quick Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '380px' }}>
          <Search
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '14px',
              paddingTop: '9px',
              paddingBottom: '9px',
              fontSize: '13px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              outline: 'none',
              fontFamily: "'Hind Siliguri', sans-serif",
              color: '#0f172a',
              transition: 'all 0.15s ease',
            }}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Hijri Calendar Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '12px',
            backgroundColor: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            fontSize: '13px',
            fontWeight: '700',
            color: '#065f46',
            whiteSpace: 'nowrap',
          }}
        >
          <Calendar style={{ width: '15px', height: '15px', color: '#059669' }} />
          <span>{t('calendar_hijri')}</span>
        </div>

        {/* Noor AI Quick Launcher */}
        <Link
          href="/dashboard/ai"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #059669, #0d9488)',
            color: 'white',
            fontSize: '13px',
            fontWeight: '800',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
            whiteSpace: 'nowrap',
          }}
        >
          <Sparkles style={{ width: '15px', height: '15px' }} />
          <span>{t('ai_btn')}</span>
        </Link>

        {/* Global Bilingual Language Switcher Toggle */}
        <LanguageToggle variant="pill" />

        {/* Notifications */}
        <button
          type="button"
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Notifications"
        >
          <Bell style={{ width: '18px', height: '18px' }} />
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              border: '2px solid #ffffff',
            }}
          />
        </button>

        {/* Explore Public Portal Button */}
        <Link
          href="/explore"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#334155',
            border: '1.5px solid #e2e8f0',
            padding: '8px 14px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <Globe style={{ width: '15px', height: '15px', color: '#64748b' }} />
          <span>{t('public_portal')}</span>
          <ExternalLink style={{ width: '13px', height: '13px', color: '#94a3b8' }} />
        </Link>
      </div>
    </header>
  );
}
