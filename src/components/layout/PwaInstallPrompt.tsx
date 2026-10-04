'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-store';

export default function PwaInstallPrompt() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed / standalone
    if (typeof window !== 'undefined') {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(standalone);

      // Check iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isApple = /iphone|ipad|ipod/.test(userAgent);
      setIsIos(isApple);

      // Check local storage snooze
      const dismissedUntil = localStorage.getItem('noorhub_pwa_dismissed');
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        setIsDismissed(true);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem('noorhub_pwa_installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      setShowManualGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Snooze for 2 hours
    localStorage.setItem('noorhub_pwa_dismissed', String(Date.now() + 2 * 60 * 60 * 1000));
  };

  // If already running inside standalone installed app, don't show
  if (isStandalone || isInstalled) return null;

  return (
    <>
      {/* 1. Floating Bottom Banner on Mobile Screens */}
      {!isDismissed && (
        <div
          className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 animate-bounce-once"
          style={{
            fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-emerald-500/40 flex items-center justify-between gap-3">
            {/* App Icon */}
            <div className="relative w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-400/50 p-1 flex-shrink-0 shadow-md overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-96x96.png"
                alt="NoorHub"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* App Title & Pitch */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-extrabold text-white truncate">
                  {isEn ? 'NoorHub Mobile App' : 'নূরহাব মোবাইল অ্যাপ'}
                </h4>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  PWA
                </span>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-tight truncate mt-0.5">
                {isEn ? 'Install on your home screen' : 'প্লে-স্টোর ছাড়াই সরাসরি ফোনে ডাউনলোড'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleInstallClick}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-900/50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>📱</span>
                <span>{isEn ? 'Install' : 'ইনস্টল'}</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center text-sm transition-colors cursor-pointer"
                title={isEn ? 'Dismiss' : 'বন্ধ করুন'}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Persistent Small Corner Badge if banner is dismissed (Mobile & Desktop) */}
      {isDismissed && (
        <button
          type="button"
          onClick={() => {
            setIsDismissed(false);
            handleInstallClick();
          }}
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-full shadow-lg border border-emerald-400/50 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          title={isEn ? 'Install Mobile App' : 'মোবাইল অ্যাপ ইনস্টল করুন'}
        >
          <span>📱</span>
          <span>{isEn ? 'Install App' : 'অ্যাপ ডাউনলোড'}</span>
        </button>
      )}

      {/* 3. iOS Safari Visual Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-sm w-full border border-slate-700 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-emerald-800 p-1.5 border border-emerald-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-192x192.png" alt="NoorHub" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h3 className="text-base font-extrabold">
                {isEn ? 'Install NoorHub on iPhone' : 'আইফোনে নূরহাব অ্যাপ ইনস্টল করুন'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isEn ? 'Follow 2 easy steps in Safari:' : 'সাফারি ব্রাউজারে নিচের ২টি সহজ ধাপ অনুসরণ করুন:'}
              </p>
            </div>

            <div className="space-y-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  ১
                </span>
                <span>
                  {isEn
                    ? 'Tap the Share button below ('
                    : 'সাফারির নিচে শেয়ার বাটনে চাপুন ('}
                  <span className="text-base">⎋</span>
                  {isEn ? ' Share icon)' : ' Share)'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  ২
                </span>
                <span>
                  {isEn ? 'Scroll down and tap ' : 'একটু নিচে স্ক্রল করে '}
                  <strong className="text-emerald-400">
                    &quot;{isEn ? 'Add to Home Screen' : 'Add to Home Screen'}&quot;
                  </strong>{' '}
                  {isEn ? '' : 'নির্বাচন করুন।'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              {isEn ? 'Got it!' : 'ঠিক আছে, বুঝেছি!'}
            </button>
          </div>
        </div>
      )}

      {/* 4. Android/Chrome Manual Guide (if beforeinstallprompt didn't trigger automatically) */}
      {showManualGuide && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl p-6 max-w-sm w-full border border-slate-700 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-emerald-800 p-1.5 border border-emerald-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-192x192.png" alt="NoorHub" className="w-full h-full object-contain rounded-xl" />
              </div>
              <h3 className="text-base font-extrabold">
                {isEn ? 'Install NoorHub App' : 'মোবাইলে নূরহাব অ্যাপ ইনস্টল'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isEn ? 'Quick installation steps in Chrome:' : 'ক্রোম ব্রাউজারে নিচের ২টি ধাপ অনুসরণ করুন:'}
              </p>
            </div>

            <div className="space-y-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs text-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  ১
                </span>
                <span>
                  {isEn
                    ? 'Tap the Chrome menu button (top right ⋮ three dots)'
                    : 'ব্রাউজারের ডানপাশের উপরের তিনটি ডট (⋮ মেনু) বাটনে চাপুন'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                  ২
                </span>
                <span>
                  <strong className="text-emerald-400">
                    &quot;{isEn ? 'Install app' : 'ইনস্টল অ্যাপ'}&quot;
                  </strong>{' '}
                  {isEn ? 'or ' : 'বা '}{' '}
                  <strong className="text-emerald-400">
                    &quot;{isEn ? 'Add to Home screen' : 'হোম স্ক্রিনে যোগ করুন'}&quot;
                  </strong>{' '}
                  {isEn ? 'tap to install.' : 'চাপুন।'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowManualGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              {isEn ? 'Close' : 'বন্ধ করুন'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
