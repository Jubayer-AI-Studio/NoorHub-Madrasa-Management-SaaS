'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-store';

interface LanguageToggleProps {
  variant?: 'pill' | 'compact' | 'minimal';
  className?: string;
}

export default function LanguageToggle({ variant = 'pill', className = '' }: LanguageToggleProps) {
  const { lang, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-emerald-700 text-white shadow-xs'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
        } ${className}`}
        title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer ${className}`}
        title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 12px',
        borderRadius: '10px',
        backgroundColor: lang === 'en' ? '#047857' : '#f8fafc',
        color: lang === 'en' ? '#ffffff' : '#334155',
        border: lang === 'en' ? '1.5px solid #047857' : '1.5px solid #e2e8f0',
        fontSize: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        boxShadow: lang === 'en' ? '0 2px 6px rgba(4,120,87,0.25)' : 'none',
        whiteSpace: 'nowrap',
      }}
      className={className}
      title={lang === 'bn' ? 'Switch application to English' : 'অ্যাপের ভাষা বাংলায় পরিবর্তন করুন'}
    >
      <Globe style={{ width: '14px', height: '14px', color: lang === 'en' ? '#a7f3d0' : '#059669' }} />
      <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
    </button>
  );
}
