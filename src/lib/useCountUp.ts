'use client';

import { useState, useEffect } from 'react';
import { useLanguage, type Language } from './language-store';

/**
 * Convert English number or digit string to Bengali numerals with comma separators
 */
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  if (typeof num === 'string') {
    // If it's already a formatted string, convert digits directly
    return num.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
  }

  // Format with Bangladeshi comma grouping: 1,24,500
  const rounded = Math.round(num);
  const formattedEn = rounded.toLocaleString('en-IN');
  return formattedEn.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

/**
 * Format number according to active language (English or Bengali)
 */
export function formatNumberByLang(num: number | string, lang: Language = 'bn'): string {
  if (lang === 'en') {
    if (typeof num === 'string') return num;
    const rounded = Math.round(num);
    return rounded.toLocaleString('en-US');
  }
  return toBengaliNumber(num);
}

/**
 * useCountUp hook: Smoothly animates a numeric value from 0 to target
 * Returns the animated value formatted in English or Bengali numerals depending on active language
 */
export function useCountUp(
  target: number,
  duration: number = 1200,
  delay: number = 0,
  overrideLang?: Language
): string {
  const { lang: storeLang } = useLanguage();
  const lang = overrideLang || storeLang;
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Ease-out Quart curve: 1 - (1 - x)^4
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCurrent(easeOut * target);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setCurrent(target);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, duration, delay]);

  return formatNumberByLang(current, lang);
}

