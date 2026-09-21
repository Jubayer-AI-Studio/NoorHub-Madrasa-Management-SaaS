import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind class merge utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format Bangladeshi Taka
export function formatTaka(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Format date in Bangla
export function formatDateBn(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Format date in English
export function formatDateEn(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

// Convert English digits to Bangla digits
export function toBanglaDigit(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}

// Generate receipt number
export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `NH-${year}-${random}`;
}

// Generate donor tracking code
export function generateTrackingCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DNR-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Attendance percentage
export function calcAttendancePercent(present: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
}

// Grade from marks (Qawmi style)
export function getQawmiGrade(obtained: number, full: number): string {
  const percent = (obtained / full) * 100;
  if (percent >= 80) return 'মুমতাজ';
  if (percent >= 65) return 'জাইয়্যিদ জিদ্দান';
  if (percent >= 50) return 'জাইয়্যিদ';
  if (percent >= 33) return 'মাকবুল';
  return 'ফেল';
}

// Grade from marks (General/Alia style)
export function getGeneralGrade(obtained: number, full: number): string {
  const percent = (obtained / full) * 100;
  if (percent >= 80) return 'A+';
  if (percent >= 70) return 'A';
  if (percent >= 60) return 'A-';
  if (percent >= 50) return 'B';
  if (percent >= 40) return 'C';
  if (percent >= 33) return 'D';
  return 'F';
}

// Format phone number for WhatsApp link (BD numbers)
export function toWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '').replace(/^0/, '880');
  const encodedMsg = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleaned}${encodedMsg ? `?text=${encodedMsg}` : ''}`;
}

// Format phone for tel: link
export function toCallLink(phone: string): string {
  return `tel:${phone}`;
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Is valid BD mobile number
export function isValidBDPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return /^(01[3-9]\d{8}|880[13-9]\d{8})$/.test(cleaned);
}
