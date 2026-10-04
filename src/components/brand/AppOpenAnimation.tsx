'use client';

import React, { useState, useEffect } from 'react';
import NoorHubLogo from '@/components/brand/NoorHubLogo';
import { useLanguage } from '@/lib/language-store';

interface AppOpenAnimationProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function AppOpenAnimation({
  onComplete,
  forceShow = false,
}: AppOpenAnimationProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<number>(0); // 0: Init, 1: Particles, 2: Shape, 3: Complete, 4: Text, 5: Steady, 6: Exit
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if animation has already played in this browser session
    const hasPlayed = sessionStorage.getItem('noorhub_splash_opened_v2');
    if (!hasPlayed || forceShow) {
      setIsVisible(true);
      sessionStorage.setItem('noorhub_splash_opened_v2', 'true');

      // Timeline sequence matching storyboard
      // 0.0s - Stage 1: Particles & Light
      setStage(1);

      // 0.6s - Stage 2: Shape Formation (Arch + Book)
      const t1 = setTimeout(() => setStage(2), 600);

      // 1.3s - Stage 3: Icon Complete (Glow)
      const t2 = setTimeout(() => setStage(3), 1300);

      // 1.9s - Stage 4: Text Animation (NOORHUB)
      const t3 = setTimeout(() => setStage(4), 1900);

      // 2.5s - Stage 5: Steady Hold
      const t4 = setTimeout(() => setStage(5), 2500);

      // 3.3s - Stage 6: Fluid Exit Transition
      const t5 = setTimeout(() => {
        setIsExiting(true);
      }, 3300);

      // 3.7s - Finish & Unmount
      const t6 = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 3700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    } else {
      if (onComplete) onComplete();
    }
  }, [forceShow, onComplete]);

  // Immediate Skip Handler
  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at center, #064e3b 0%, #022c22 45%, #021810 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* =========================================================
          1. FLOATING COSMIC PARTICLES & RADIAL LIGHT
         ========================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.22) 0%, transparent 55%),
            radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(5, 150, 105, 0.15) 0%, transparent 45%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Sparkles & Light Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '22%', left: '28%', size: '6px', color: '#fbbf24', delay: '0.2s' },
          { top: '65%', left: '20%', size: '8px', color: '#34d399', delay: '0.5s' },
          { top: '35%', left: '74%', size: '7px', color: '#fbbf24', delay: '0.3s' },
          { top: '75%', left: '70%', size: '9px', color: '#10b981', delay: '0.7s' },
          { top: '18%', left: '55%', size: '5px', color: '#fef08a', delay: '0.1s' },
          { top: '82%', left: '45%', size: '6px', color: '#fde047', delay: '0.6s' },
        ].map((pt, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
              borderRadius: '50%',
              backgroundColor: pt.color,
              boxShadow: `0 0 14px ${pt.color}`,
              opacity: stage >= 1 ? 0.85 : 0,
              transform: stage >= 1 ? 'scale(1) translateY(0)' : 'scale(0) translateY(12px)',
              transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${pt.delay}`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          2. ASSEMBLED LOGO CONTAINER
         ========================================================= */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
          transform: stage >= 2 ? 'scale(1)' : 'scale(0.82)',
          opacity: stage >= 2 ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Soft Golden Lens-Flare Halo behind Logo */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'scale(1.2)' : 'scale(0.6)',
            transition: 'all 0.7s ease-out',
            pointerEvents: 'none',
          }}
        />

        {/* The Exact Vector Logo Emblem */}
        <div
          style={{
            filter: stage >= 3 ? 'drop-shadow(0 10px 25px rgba(245, 158, 11, 0.35))' : 'none',
            transition: 'filter 0.6s ease-out',
          }}
        >
          <NoorHubLogo variant="icon-only" size="xl" />
        </div>

        {/* =========================================================
            3. "NOORHUB" TYPOGRAPHY REVEAL
           ========================================================= */}
        <div
          style={{
            marginTop: '20px',
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              fontSize: '36px',
              fontWeight: '900',
              letterSpacing: '-0.02em',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              textShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
            }}
          >
            <span style={{ color: '#ffffff' }}>NOOR</span>
            <span
              style={{
                color: '#10b981',
                textShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
              }}
            >
              HUB
            </span>
          </div>

          {/* Subtitle Tagline */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#fcd34d',
              marginTop: '8px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              opacity: stage >= 4 ? 0.95 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          >
            Learn • Manage • Grow
          </div>

          <div
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#94a3b8',
              marginTop: '4px',
              fontFamily: "'Hind Siliguri', sans-serif",
              opacity: stage >= 5 ? 0.85 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            শিক্ষা হোক সহজ, প্রশাসন হোক স্মার্ট
          </div>
        </div>

        {/* =========================================================
            4. SUBTLE SLIM PROGRESS BAR (Panel 8 in Storyboard)
           ========================================================= */}
        <div
          style={{
            marginTop: '32px',
            width: '160px',
            height: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            overflow: 'hidden',
            opacity: stage >= 4 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: '#10b981',
              borderRadius: '999px',
              width: stage >= 5 ? '100%' : '55%',
              boxShadow: '0 0 10px #10b981',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        <span
          style={{
            fontSize: '11px',
            color: '#6ee7b7',
            marginTop: '8px',
            fontWeight: '600',
            fontFamily: "'Hind Siliguri', sans-serif",
            opacity: stage >= 4 ? 0.8 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          {isEn ? 'Preparing Dashboard...' : 'ড্যাশবোর্ড প্রস্তুত হচ্ছে...'}
        </span>
      </div>

      {/* =========================================================
          5. TOP-RIGHT SKIP BUTTON
         ========================================================= */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#cbd5e1',
          fontSize: '11px',
          fontWeight: '700',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.15s ease',
          fontFamily: "'Hind Siliguri', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.color = '#cbd5e1';
        }}
      >
        {isEn ? 'Skip ✕' : 'বাদ দিন (Skip ✕)'}
      </button>
    </div>
  );
}
