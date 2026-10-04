'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Calendar,
  Clock,
  Sparkles,
  Check,
  Building2,
  Phone,
  QrCode,
  ShieldCheck,
  Download,
  Users,
  Eye,
  RefreshCw,
  Layers,
  ChevronDown,
  Camera,
  Upload,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Smartphone,
  CreditCard,
} from 'lucide-react';
import { getActiveMadrasa } from '@/lib/madrasa-store';
import { useLanguage } from '@/lib/language-store';

export interface StudentData {
  id: string;
  name: string;
  admissionNo: string;
  roll: string;
  className: string;
  section?: string;
  curriculum: 'qawmi' | 'alia' | 'hifz' | 'general';
  isBoarding: boolean;
  bloodGroup: string;
  fatherName?: string;
  parentName: string;
  parentPhone: string;
  attendanceRate: number;
  photoUrl?: string;
}

interface StudentIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentData[];
  selectedStudentId?: string;
  onUpdatePhoto?: (studentId: string, file: File) => void;
}

export default function StudentIdCardModal({
  isOpen,
  onClose,
  students,
  selectedStudentId,
  onUpdatePhoto,
}: StudentIdCardModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const activeMadrasa = getActiveMadrasa();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Date Configuration
  const [issueDate, setIssueDate] = useState<string>('2026-09-24');
  const [expiryDate, setExpiryDate] = useState<string>('2027-12-31');
  const [session, setSession] = useState<string>(isEn ? '2026-2027' : '২০২৬-২০২৭');

  // Customization State
  const [cardOrientation, setCardOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [cardTheme, setCardTheme] = useState<'emerald' | 'navy' | 'maroon'>('emerald');
  const [cardSide, setCardSide] = useState<'both' | 'front' | 'back'>('both');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [currentStudentId, setCurrentStudentId] = useState<string>(
    selectedStudentId || (students[0]?.id ?? '')
  );
  const [isBulkMode, setIsBulkMode] = useState<boolean>(false);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Local temporary photo state for instant preview
  const [localPhotos, setLocalPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedStudentId) {
      setCurrentStudentId(selectedStudentId);
    }
  }, [selectedStudentId, isOpen]);

  if (!isOpen) return null;

  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0];

  // Effective photo URL (local instant preview or student.photoUrl)
  const getStudentPhoto = (student: StudentData) => {
    return localPhotos[student.id] || student.photoUrl || '';
  };

  // Handle Photo File Pick
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentStudent) return;

    // Create immediate local object URL for instant UI preview
    const objectUrl = URL.createObjectURL(file);
    setLocalPhotos((prev) => ({ ...prev, [currentStudent.id]: objectUrl }));

    // Trigger parent persistent compression & save
    if (onUpdatePhoto) {
      onUpdatePhoto(currentStudent.id, file);
    }

    setToastMsg('✓ ছবি সফলভাবে আপলোড হয়েছে ও আইডি কার্ডে যুক্ত হয়েছে!');
    setTimeout(() => setToastMsg(null), 3500);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Unique classes for filtering in bulk mode
  const uniqueClasses = Array.from(new Set(students.map((s) => s.className)));
  const bulkStudents =
    selectedClassFilter === 'all'
      ? students
      : students.filter((s) => s.className === selectedClassFilter);

  // Helper to format date in Bengali
  const formatBengaliDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const toBn = (str: string) =>
      str.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

    return `${toBn(day)}/${toBn(month)}/${toBn(year)}`;
  };

  const setTodayIssue = () => {
    setIssueDate(new Date().toISOString().slice(0, 10));
  };

  const addOneYearExpiry = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    d.setMonth(11);
    d.setDate(31);
    setExpiryDate(d.toISOString().slice(0, 10));
    setSession(`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`);
  };

  const addTwoYearsExpiry = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    d.setMonth(11);
    d.setDate(31);
    setExpiryDate(d.toISOString().slice(0, 10));
    setSession(`${new Date().getFullYear()}-${new Date().getFullYear() + 2}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setToastMsg('📄 পিডিএফ সেভ করতে প্রিন্ট ডায়ালগ থেকে "Save as PDF" নির্বাচন করুন');
    setTimeout(() => {
      window.print();
      setTimeout(() => setToastMsg(null), 3000);
    }, 600);
  };

  // Luxury Islamic Theme Palettes
  const THEME_STYLES = {
    emerald: {
      headerBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%)',
      goldRibbon: 'linear-gradient(90deg, #b45309, #d97706, #fbbf24, #f59e0b, #b45309)',
      goldBorder: '#f59e0b',
      primaryText: '#047857',
      border: '#059669',
      badgeBg: '#ecfdf5',
      badgeText: '#065f46',
      accentBg: '#f0fdf4',
      outerBorder: '#059669',
      stampColor: '#064e3b',
      name: 'ইসলামিক এমারেল্ড গোল্ড',
    },
    navy: {
      headerBg: 'linear-gradient(135deg, #0a1128 0%, #102a43 50%, #1e3a8a 100%)',
      goldRibbon: 'linear-gradient(90deg, #0284c7, #38bdf8, #7dd3fc, #0284c7)',
      goldBorder: '#38bdf8',
      primaryText: '#1e3a8a',
      border: '#2563eb',
      badgeBg: '#eff6ff',
      badgeText: '#1e40af',
      accentBg: '#f8fafc',
      outerBorder: '#2563eb',
      stampColor: '#1e3a8a',
      name: 'রয়েল নেভি ব্লু',
    },
    maroon: {
      headerBg: 'linear-gradient(135deg, #3b0713 0%, #650b20 50%, #881337 100%)',
      goldRibbon: 'linear-gradient(90deg, #b45309, #f59e0b, #fde047, #f59e0b)',
      goldBorder: '#fbbf24',
      primaryText: '#831843',
      border: '#be123c',
      badgeBg: '#fdf2f8',
      badgeText: '#9d174d',
      accentBg: '#fff1f2',
      outerBorder: '#be123c',
      stampColor: '#881337',
      name: 'আভিজাত্যময় মেরুন গোল্ড',
    },
  };

  const currentTheme = THEME_STYLES[cardTheme];

  // =========================================================================
  // 1. RENDER PORTRAIT ID CARD (Vertical Hanging Lanyard Badge: 360px x 550px)
  // =========================================================================
  const renderPortraitCard = (student: StudentData, keyPrefix: string) => {
    const photo = getStudentPhoto(student);
    const qrData = `NOORHUB-ID:${student.admissionNo}|NAME:${student.name}|MADRASA:${activeMadrasa.name}|SESSION:${session}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
      qrData
    )}`;

    return (
      <div
        key={`${keyPrefix}-${student.id}`}
        className="flex flex-wrap items-center justify-center gap-8 print:m-0 print:gap-6 print:break-inside-avoid"
      >
        {/* FRONT SIDE (Portrait) */}
        {(cardSide === 'both' || cardSide === 'front') && (
          <div
            className="id-card-item relative w-[360px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 print:shadow-none print:border-2 font-hind flex flex-col justify-between"
            style={{
              borderColor: currentTheme.goldBorder,
              boxShadow: '0 18px 45px -10px rgba(0,0,0,0.18)',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Lanyard Punch Hole Representation */}
            <div className="pt-2 flex justify-center bg-slate-100/60 print:bg-white">
              <div className="w-12 h-3 rounded-full bg-slate-300/80 border border-slate-400/60 flex items-center justify-center">
                <div className="w-8 h-1 bg-white/60 rounded-full" />
              </div>
            </div>

            {/* Top Brand Header */}
            <div
              className="px-4 py-3 text-white text-center relative"
              style={{
                background: currentTheme.headerBg,
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-sm border border-white/30 shadow-xs">
                  🕌
                </div>
                <h3 className="text-[16px] font-black tracking-tight text-white leading-tight truncate max-w-[270px]">
                  {activeMadrasa.name}
                </h3>
              </div>
              <p className="text-[10px] text-amber-200 tracking-wide font-medium">
                {activeMadrasa.district || 'ঢাকা'} • শিক্ষার্থী ডিজিটাল পরিচয়পত্র
              </p>

              {/* Gold Ribbon Line */}
              <div
                className="h-[3px] w-full absolute bottom-0 left-0"
                style={{ background: currentTheme.goldRibbon }}
              />
            </div>

            {/* Middle Body: Photo & Particulars */}
            <div className="p-4 flex-1 flex flex-col items-center justify-start bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40">
              {/* Photo Frame with Interactive Upload Button */}
              <div
                className="relative group cursor-pointer mt-1"
                onClick={() => fileInputRef.current?.click()}
                title="ছবি আপলোড বা পরিবর্তন করতে ক্লিক করুন"
              >
                <div
                  className="w-[115px] h-[135px] rounded-2xl bg-white border-[3.5px] shadow-md overflow-hidden relative flex flex-col items-center justify-center transition-all group-hover:scale-[1.02]"
                  style={{
                    borderColor: currentTheme.goldBorder,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  }}
                >
                  {photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={photo}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-amber-50 to-emerald-50 border-2 border-dashed border-amber-300 p-2 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1 text-xl shadow-xs">
                        📷
                      </div>
                      <span className="text-[11px] font-extrabold text-amber-900 leading-tight">
                        ছবি দিন
                      </span>
                      <span className="text-[8.5px] text-slate-500 mt-0.5">
                        (ক্লিক করুন)
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center backdrop-blur-xs">
                    <Camera className="w-6 h-6 mb-1 text-amber-300" />
                    <span className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                      ছবি পরিবর্তন
                    </span>
                  </div>
                </div>

                {/* Residential Badge Under Photo */}
                <div className="flex justify-center -mt-2 relative z-10">
                  <span
                    className="px-3 py-0.5 text-[10px] font-extrabold rounded-full tracking-wide shadow-sm"
                    style={{
                      backgroundColor: student.isBoarding ? '#1e40af' : '#475569',
                      color: '#ffffff',
                      border: '1.5px solid #ffffff',
                    }}
                  >
                    {student.isBoarding ? 'আবাসিক' : 'অনাবাসিক'}
                  </span>
                </div>
              </div>

              {/* Student Name */}
              <h2 className="text-[17px] font-black text-slate-900 tracking-tight text-center mt-2.5 leading-snug line-clamp-1 w-full px-2">
                {student.name}
              </h2>

              {/* ID & Roll Badges */}
              <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                <span className="text-[11px] font-extrabold font-mono bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
                  আইডি: {student.admissionNo}
                </span>
                <span
                  className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: currentTheme.badgeBg,
                    color: currentTheme.badgeText,
                    border: `1px solid ${currentTheme.border}`,
                  }}
                >
                  রোল: {student.roll}
                </span>
              </div>

              {/* Details Box Table */}
              <div className="w-full bg-white rounded-xl border border-slate-200 p-2.5 text-[11.5px] space-y-1.5 shadow-2xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="text-slate-500">শ্রেণি / জামাত:</span>
                  <span className="font-extrabold text-slate-800">{student.className}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="text-slate-500">শিক্ষাবর্ষ:</span>
                  <span className="font-extrabold text-amber-700 font-mono">{session}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                  <span className="text-slate-500">রক্তের গ্রুপ:</span>
                  <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.2 rounded border border-rose-200">
                    {student.bloodGroup}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-100 pb-1 truncate">
                  <span className="text-slate-500 shrink-0">অভিভাবক:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[190px]">
                    {student.parentName}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">জরুরি যোগাযোগ:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">
                    {student.parentPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Bar: QR Code, Expiry & Signature Stamp */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px]">
              {/* QR Code & Expiry */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded border border-slate-300 p-0.5 bg-white flex items-center justify-center shrink-0 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR" className="w-full h-full object-contain" />
                </div>
                <div className="leading-tight">
                  <div className="text-[9.5px] font-bold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>মেয়াদ: {formatBengaliDate(expiryDate)}</span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono">
                    নূরহাব ডিজিটাল ভেরিফায়েড
                  </span>
                </div>
              </div>

              {/* Official Seal Stamp & Muhtamim Signature */}
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-0.5 leading-none shrink-0"
                  style={{
                    borderColor: currentTheme.stampColor,
                    color: currentTheme.stampColor,
                    transform: 'rotate(-6deg)',
                  }}
                  title="মাদরাসার সিলমোহর"
                >
                  <span className="text-[7px] font-black">মাদরাসা</span>
                  <span className="text-[8px] font-black">সিলমোহর</span>
                  <span className="text-[6.5px]">★ অনুমোদিত ★</span>
                </div>

                <div className="text-right">
                  <div
                    className="font-serif italic text-[11.5px] font-black leading-none pb-0.5 border-b"
                    style={{
                      color: currentTheme.primaryText,
                      borderColor: '#94a3b8',
                    }}
                  >
                    মুহাম্মদ আব্দুর রহমান
                  </div>
                  <div className="text-[8px] text-slate-400 font-bold mt-0.5">
                    মুহতামিমের স্বাক্ষর
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BACK SIDE (Portrait) */}
        {(cardSide === 'both' || cardSide === 'back') && (
          <div
            className="id-card-item relative w-[360px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 print:shadow-none print:border-2 font-hind flex flex-col justify-between p-4"
            style={{
              borderColor: currentTheme.goldBorder,
              boxShadow: '0 18px 45px -10px rgba(0,0,0,0.18)',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Lanyard Hole */}
            <div className="flex justify-center -mt-1 mb-2">
              <div className="w-12 h-3 rounded-full bg-slate-300/80 border border-slate-400/60" />
            </div>

            {/* Back Header */}
            <div className="border-b-2 border-slate-200 pb-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-black">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>মাদরাসা নীতিমালা ও জরুরি তথ্যাবলী</span>
              </div>
            </div>

            {/* Guardian Box */}
            <div className="my-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">পিতা / অভিভাবক:</span>
                <span className="font-extrabold text-slate-900">{student.parentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">জরুরি যোগাযোগ:</span>
                <span className="font-extrabold text-emerald-700 font-mono">
                  {student.parentPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">শিক্ষার্থী আইডি:</span>
                <span className="font-extrabold text-slate-800 font-mono">
                  {student.admissionNo}
                </span>
              </div>
            </div>

            {/* Campus Code of Conduct */}
            <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
              <h4 className="font-extrabold text-slate-900 border-b border-amber-200 pb-1 text-xs">
                📜 কার্ড ব্যবহারের নির্দেশনাবলী:
              </h4>
              <p>১. পরিচয়পত্রটি মাদরাসা ক্যাম্পাসে ও শ্রেণিকক্ষে দৃশ্যমানভাবে ঝুলিয়ে রাখা বাধ্যতামূলক।</p>
              <p>২. এই পরিচয়পত্রটি কোনোভাবেই হস্তান্তরযোগ্য নয়।</p>
              <p>৩. পরীক্ষার হল ও আবাসিক হোস্টেলে প্রবেশের ক্ষেত্রে কার্ডটি প্রদর্শন করতে হবে।</p>
              <p>৪. কার্ডটি হারিয়ে গেলে অবিলম্বে মাদরাসা অফিসে লিখিতভাবে অবহিত করুন।</p>
            </div>

            {/* Return Address & Barcode Footer */}
            <div className="border-t-2 border-slate-200 pt-3">
              <div className="text-[10px] font-black text-slate-800 text-center">
                কার্ডটি পাওয়া গেলে ফেরত দিন:
              </div>
              <div className="text-[9.5px] text-slate-600 text-center font-bold">
                {activeMadrasa.name}
              </div>
              <div className="text-[9px] text-slate-500 text-center">
                {activeMadrasa.address || `${activeMadrasa.district}, বাংলাদেশ`}
              </div>
              <div className="text-[10px] text-emerald-700 font-mono font-black text-center mt-1">
                ফোন: {activeMadrasa.phone}
              </div>

              {/* Barcode Graphic */}
              <div className="mt-2 flex flex-col items-center">
                <div className="w-40 h-7 flex items-center justify-center gap-0.5 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                  <div className="w-[1.5px] h-5 bg-slate-900" />
                  <div className="w-[3px] h-5 bg-slate-900" />
                  <div className="w-[1px] h-5 bg-slate-900" />
                  <div className="w-[2px] h-5 bg-slate-900" />
                  <div className="w-[4px] h-5 bg-slate-900" />
                  <div className="w-[1px] h-5 bg-slate-900" />
                  <div className="w-[2.5px] h-5 bg-slate-900" />
                  <div className="w-[1.5px] h-5 bg-slate-900" />
                  <div className="w-[3px] h-5 bg-slate-900" />
                  <div className="w-[1px] h-5 bg-slate-900" />
                  <div className="w-[2px] h-5 bg-slate-900" />
                  <div className="w-[3.5px] h-5 bg-slate-900" />
                  <div className="w-[1.5px] h-5 bg-slate-900" />
                </div>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5 tracking-wider">
                  {student.admissionNo} • NOORHUB SECURE
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =========================================================================
  // 2. RENDER LANDSCAPE ID CARD (Wide Executive Card: 480px x 305px)
  // =========================================================================
  const renderLandscapeCard = (student: StudentData, keyPrefix: string) => {
    const photo = getStudentPhoto(student);
    const qrData = `NOORHUB-ID:${student.admissionNo}|NAME:${student.name}|MADRASA:${activeMadrasa.name}|SESSION:${session}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
      qrData
    )}`;

    return (
      <div
        key={`${keyPrefix}-${student.id}`}
        className="flex flex-wrap items-center justify-center gap-8 print:m-0 print:gap-6 print:break-inside-avoid"
      >
        {/* FRONT SIDE (Landscape) */}
        {(cardSide === 'both' || cardSide === 'front') && (
          <div
            className="id-card-item relative w-[480px] h-[305px] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 print:shadow-none print:border-2 font-hind flex flex-col justify-between"
            style={{
              borderColor: currentTheme.goldBorder,
              boxShadow: '0 18px 45px -10px rgba(0,0,0,0.18)',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-3 text-white flex items-center justify-between relative"
              style={{
                background: currentTheme.headerBg,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg border border-white/35 shadow-xs">
                  🕌
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-white leading-tight truncate max-w-[280px]">
                    {activeMadrasa.name}
                  </h3>
                  <p className="text-[10px] text-amber-200 mt-0.5">
                    {activeMadrasa.district || 'ঢাকা'} • শিক্ষার্থী ডিজিটাল পরিচয়পত্র
                  </p>
                </div>
              </div>

              {/* Session Badge */}
              <div className="text-right">
                <span className="text-[10px] font-black px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                  {session}
                </span>
                <div className="text-[8px] text-emerald-200 font-sans mt-0.5">
                  NOORHUB VERIFIED
                </div>
              </div>

              {/* Gold Ribbon Line */}
              <div
                className="h-[3px] w-full absolute bottom-0 left-0"
                style={{ background: currentTheme.goldRibbon }}
              />
            </div>

            {/* Body */}
            <div className="px-5 py-3.5 flex items-center gap-5 flex-1 bg-gradient-to-b from-white to-slate-50/60">
              {/* Photo Frame */}
              <div
                className="flex flex-col items-center shrink-0 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                title="ছবি আপলোড বা পরিবর্তন করতে ক্লিক করুন"
              >
                <div
                  className="w-[105px] h-[125px] rounded-2xl bg-white border-[3.5px] shadow-md overflow-hidden relative flex flex-col items-center justify-center transition-all group-hover:scale-[1.02]"
                  style={{
                    borderColor: currentTheme.goldBorder,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  }}
                >
                  {photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={photo}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-amber-50 to-emerald-50 border-2 border-dashed border-amber-300 p-2 flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1 text-lg shadow-xs">
                        📷
                      </div>
                      <span className="text-[10px] font-black text-amber-900">ছবি দিন</span>
                      <span className="text-[8px] text-slate-500">(ক্লিক)</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center backdrop-blur-xs">
                    <Camera className="w-5 h-5 mb-1 text-amber-300" />
                    <span className="text-[9px] font-extrabold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                      ছবি পরিবর্তন
                    </span>
                  </div>
                </div>

                <span
                  className="mt-1.5 px-3 py-0.5 text-[9.5px] font-extrabold rounded-full tracking-wide shadow-xs"
                  style={{
                    backgroundColor: student.isBoarding ? '#1e40af' : '#475569',
                    color: '#ffffff',
                  }}
                >
                  {student.isBoarding ? 'আবাসিক' : 'অনাবাসিক'}
                </span>
              </div>

              {/* Student Particulars */}
              <div className="flex-1 min-w-0 pr-1">
                <h2 className="text-[17px] font-black text-slate-900 leading-tight truncate">
                  {student.name}
                </h2>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2 text-[12px] leading-tight">
                  <div>
                    <span className="text-slate-400 text-[10.5px]">আইডি নম্বর:</span>{' '}
                    <span className="font-extrabold text-slate-900 font-mono">
                      {student.admissionNo}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10.5px]">রোল:</span>{' '}
                    <span
                      className="font-extrabold px-2 py-0.2 rounded-md"
                      style={{
                        backgroundColor: currentTheme.badgeBg,
                        color: currentTheme.badgeText,
                      }}
                    >
                      {student.roll}
                    </span>
                  </div>

                  <div className="col-span-2 truncate">
                    <span className="text-slate-400 text-[10.5px]">শ্রেণি/জামাত:</span>{' '}
                    <span className="font-extrabold text-slate-800">{student.className}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10.5px]">রক্তের গ্রুপ:</span>{' '}
                    <span className="font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      {student.bloodGroup}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10.5px]">ইস্যু:</span>{' '}
                    <span className="font-bold text-slate-700">
                      {formatBengaliDate(issueDate)}
                    </span>
                  </div>

                  <div className="col-span-2 truncate pt-1 border-t border-slate-100">
                    <span className="text-slate-400 text-[10.5px]">অভিভাবক:</span>{' '}
                    <span className="font-bold text-slate-800">{student.parentName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded border border-slate-300 p-0.5 bg-white flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR" className="w-full h-full object-contain" />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1 text-slate-700 font-bold">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>মেয়াদ: {formatBengaliDate(expiryDate)}</span>
                  </div>
                  <span className="text-[8.5px] text-slate-400 font-mono">
                    নূরহাব ডিজিটাল ভেরিফায়েড
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-0.5 leading-none shrink-0"
                  style={{
                    borderColor: currentTheme.stampColor,
                    color: currentTheme.stampColor,
                    transform: 'rotate(-6deg)',
                  }}
                >
                  <span className="text-[7px] font-black">মাদরাসা</span>
                  <span className="text-[8px] font-black">সিলমোহর</span>
                  <span className="text-[6.5px]">★ অনুমোদিত ★</span>
                </div>

                <div className="text-right">
                  <div
                    className="font-serif italic text-[12px] font-black leading-none pb-0.5 border-b"
                    style={{
                      color: currentTheme.primaryText,
                      borderColor: '#94a3b8',
                    }}
                  >
                    মুহাম্মদ আব্দুর রহমান
                  </div>
                  <div className="text-[8.5px] text-slate-400 font-bold mt-0.5">
                    মুহতামিমের স্বাক্ষর
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BACK SIDE (Landscape) */}
        {(cardSide === 'both' || cardSide === 'back') && (
          <div
            className="id-card-item relative w-[480px] h-[305px] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 print:shadow-none print:border-2 font-hind flex flex-col justify-between p-4.5"
            style={{
              borderColor: currentTheme.goldBorder,
              boxShadow: '0 18px 45px -10px rgba(0,0,0,0.18)',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Header */}
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                জরুরি যোগাযোগ ও মাদরাসা নীতিমালা
              </span>
              <span className="text-[10.5px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded font-mono font-black border border-emerald-200">
                {student.admissionNo}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 my-1 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">পিতা / অভিভাবক:</span>
                  <span className="font-extrabold text-slate-800 truncate block">
                    {student.parentName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">জরুরি ফোন নম্বর:</span>
                  <span className="font-extrabold text-emerald-700 font-mono block">
                    {student.parentPhone}
                  </span>
                </div>
              </div>

              <div className="text-[10.5px] text-slate-600 leading-snug space-y-1">
                <p>১. এই কার্ডটি মাদরাসা ক্যাম্পাসে অবস্থানকালে দৃশ্যমান রাখা বাধ্যতামূলক।</p>
                <p>২. এই কার্ডটি হস্তান্তরযোগ্য নয়। হারানো গেলে অবিলম্বে মাদরাসা অফিসে জানান।</p>
                <p>৩. পরীক্ষার হল ও আবাসিক হোস্টেলে প্রবেশের সময় এই কার্ড প্রদর্শন করতে হবে।</p>
              </div>
            </div>

            {/* Return Address & Barcode */}
            <div className="border-t border-slate-200 pt-2.5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black text-slate-800">
                  কার্ডটি পাওয়া গেলে ফেরত দিন:
                </div>
                <div className="text-[9.5px] text-slate-700 font-bold">{activeMadrasa.name}</div>
                <div className="text-[8.5px] text-slate-400">
                  {activeMadrasa.address || `${activeMadrasa.district}, বাংলাদেশ`}
                </div>
                <div className="text-[9.5px] text-emerald-700 font-mono font-black">
                  ফোন: {activeMadrasa.phone}
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="w-32 h-6 flex items-center justify-center gap-0.5 bg-slate-100 px-1 py-0.5 rounded border border-slate-300">
                  <div className="w-[1.5px] h-4 bg-slate-900" />
                  <div className="w-[3px] h-4 bg-slate-900" />
                  <div className="w-[1px] h-4 bg-slate-900" />
                  <div className="w-[2px] h-4 bg-slate-900" />
                  <div className="w-[4px] h-4 bg-slate-900" />
                  <div className="w-[1px] h-4 bg-slate-900" />
                  <div className="w-[2.5px] h-4 bg-slate-900" />
                  <div className="w-[1.5px] h-4 bg-slate-900" />
                  <div className="w-[3px] h-4 bg-slate-900" />
                </div>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5">
                  NOORHUB-CAMPUS-PASS
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Hidden File Input for Direct Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity print:hidden"
        onClick={onClose}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-60 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce print:hidden">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-700 font-hind max-h-[96vh] flex flex-col print:bg-white print:border-none print:shadow-none print:max-h-none print:max-w-none print:w-auto print:rounded-none">
        {/* =======================================================
            HEADER (Excluded from Print)
           ======================================================= */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <span className="text-xl">🪪</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  {isEn ? 'Student Digital ID Card Center' : 'প্রিমিয়াম শিক্ষার্থী ডিজিটাল আইডি কার্ড সেন্টার'}
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                  {isEn ? 'HD Photo & Print Ready' : 'এইচডি ফটো ও প্রিন্ট রেডি'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Spacious Size, Islamic Colors, Photo Upload & Direct A4 Print Ready'
                  : 'বড় সাইজ, প্রফেশনাল ইসলামিক কালার, ফটো আপলোড ও সরাসরি A4 প্রিন্ট সুবিধা'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs cursor-pointer transition-all"
              title={isEn ? "Download as PDF" : "পিডিএফ হিসেবে ডাউনলোড করুন"}
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Save PDF' : 'পিডিএফ সেভ'}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Print ID Cards' : 'আইডি কার্ড প্রিন্ট করুন'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =======================================================
            SUPER PROMINENT PHOTO UPLOAD BANNER & CONTROLS
           ======================================================= */}
        <div className="p-4 bg-slate-950/90 border-b border-slate-800 shrink-0 print:hidden space-y-3">
          {/* 1. PHOTO UPLOAD HIGHLIGHT BOX (The User's specific query: "ছবি দিব কই?") */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/50 flex items-center justify-between flex-wrap gap-3 shadow-md">
            <div className="flex items-center gap-3">
              {/* Photo Thumbnail */}
              <div
                className="w-12 h-14 rounded-xl border-2 border-amber-400 overflow-hidden bg-slate-800 flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                title={isEn ? "Click to change photo" : "ছবি পরিবর্তন করতে ক্লিক করুন"}
              >
                {getStudentPhoto(currentStudent) ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={getStudentPhoto(currentStudent)}
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-amber-400" />
                )}
              </div>

              <div>
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Upload Student Photo:' : 'শিক্ষার্থীর ছবি আপলোড করুন:'}</span>
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  <strong className="text-white">{currentStudent.name}</strong> ({currentStudent.className}) - {isEn ? 'Select photo from device' : 'এর ছবি কম্পিউটার থেকে নির্বাচন করুন'}
                </p>
              </div>
            </div>

            {/* Direct Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer transition-all animate-pulse hover:animate-none"
            >
              <Upload className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>{isEn ? '📂 Upload / Change Photo' : '📂 ছবি আপলোড / পরিবর্তন করুন'}</span>
            </button>
          </div>

          {/* 2. Format, Date, & Theme Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Format Toggle: Portrait vs Landscape */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <label className="text-xs font-bold text-amber-400 block mb-1.5">
                {isEn ? 'Card Format & Size:' : 'কার্ড ফরম্যাট ও সাইজ:'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setCardOrientation('portrait')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                    cardOrientation === 'portrait'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Portrait' : 'পোর্ট্রেট (ঝুলানো)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardOrientation('landscape')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                    cardOrientation === 'landscape'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Landscape' : 'ল্যান্ডস্কেপ (প্রশস্ত)'}</span>
                </button>
              </div>
            </div>

            {/* Issue Date */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Issue Date:' : 'ইস্যু তারিখ:'}</span>
                </label>
                <button
                  type="button"
                  onClick={setTodayIssue}
                  className="text-[10px] text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  {isEn ? 'Today' : 'আজকের তারিখ'}
                </button>
              </div>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Expiry Date */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-teal-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Expiry Date:' : 'মেয়াদ উত্তীর্ণ:'}</span>
                </label>
                <div className="flex items-center gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={addOneYearExpiry}
                    className="text-teal-400 hover:underline font-semibold cursor-pointer"
                  >
                    {isEn ? '+1 Year' : '+১ বছর'}
                  </button>
                </div>
              </div>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-teal-500 font-mono"
              />
            </div>

            {/* Session & Theme */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-amber-400">{isEn ? 'Session:' : 'শিক্ষাবর্ষ:'}</label>
                <input
                  type="text"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-white text-right font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs">
                <span className="text-slate-400">{isEn ? 'Theme:' : 'রঙের থিম:'}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCardTheme('emerald')}
                    className={`w-5 h-5 rounded-full bg-emerald-600 border-2 transition-all cursor-pointer ${
                      cardTheme === 'emerald'
                        ? 'border-white scale-110 shadow-sm'
                        : 'border-transparent opacity-60'
                    }`}
                    title="Islamic Emerald Gold"
                  />
                  <button
                    type="button"
                    onClick={() => setCardTheme('navy')}
                    className={`w-5 h-5 rounded-full bg-blue-700 border-2 transition-all cursor-pointer ${
                      cardTheme === 'navy'
                        ? 'border-white scale-110 shadow-sm'
                        : 'border-transparent opacity-60'
                    }`}
                    title="Royal Navy Blue"
                  />
                  <button
                    type="button"
                    onClick={() => setCardTheme('maroon')}
                    className={`w-5 h-5 rounded-full bg-rose-800 border-2 transition-all cursor-pointer ${
                      cardTheme === 'maroon'
                        ? 'border-white scale-110 shadow-sm'
                        : 'border-transparent opacity-60'
                    }`}
                    title="Noble Maroon Gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Sub-controls: Student picker & Side switcher */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsBulkMode(false)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  !isBulkMode
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                👤 {isEn ? 'Single Card' : 'একক কার্ড'}
              </button>

              <button
                type="button"
                onClick={() => setIsBulkMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  isBulkMode
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{isEn ? `Bulk Print Mode (${students.length})` : `বাল্ক প্রিন্ট মোড (${students.length} জন)`}</span>
              </button>

              {!isBulkMode ? (
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-slate-400">{isEn ? 'Student:' : 'শিক্ষার্থী:'}</span>
                  <select
                    value={currentStudentId}
                    onChange={(e) => setCurrentStudentId(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs outline-none cursor-pointer max-w-[200px] truncate"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.roll}. {s.name} ({s.className})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-slate-400">{isEn ? 'Filter Class:' : 'শ্রেণি ফিল্টার:'}</span>
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs outline-none cursor-pointer"
                  >
                    <option value="all">{isEn ? `All Classes (${students.length})` : `সকল জামাত ও শ্রেণি (${students.length})`}</option>
                    {uniqueClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Side Selection & Zoom Scale */}
            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.85, prev - 0.1))}
                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                  title={isEn ? "Zoom Out" : "সাইজ ছোট করুন"}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1 text-slate-300">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(1.4, prev + 0.1))}
                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                  title={isEn ? "Zoom In" : "সাইজ বড় করুন"}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Side Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setCardSide('both')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    cardSide === 'both'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isEn ? 'Both' : 'উভয় পিঠ'}
                </button>
                <button
                  type="button"
                  onClick={() => setCardSide('front')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    cardSide === 'front'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isEn ? 'Front' : 'সম্মুখভাগ'}
                </button>
                <button
                  type="button"
                  onClick={() => setCardSide('back')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                    cardSide === 'back'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isEn ? 'Back' : 'বিপরীতভাগ'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            MAIN PRINTABLE CANVAS
           ======================================================= */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex flex-col items-center justify-start print:bg-white print:p-0 print:overflow-visible">
          {/* Instructions tag */}
          <div className="mb-4 flex items-center justify-between w-full max-w-4xl text-xs text-slate-400 print:hidden bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                💡 <strong>ছবি যুক্ত করার নিয়ম:</strong> কার্ডের ভেতরের ছবির ফ্রেমে ক্লিক করুন অথবা উপরের <strong>"ছবি আপলোড"</strong> বাটনে ক্লিক করে ছাত্রের ছবি নির্বাচন করুন।
              </span>
            </div>
            <span className="text-[10.5px] text-amber-400 font-bold bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800">
              {cardOrientation === 'portrait' ? '🏷️ পোর্ট্রেট ঝুলানো মোড' : '💳 ল্যান্ডস্কেপ প্রশস্ত মোড'}
            </span>
          </div>

          {/* Cards Render Canvas with Zoom Transform */}
          <div
            className="id-card-printable w-full flex flex-col items-center gap-8 print:gap-4 print:m-0"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
            }}
          >
            {isBulkMode ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4 justify-items-center">
                {bulkStudents.map((student, idx) => (
                  <div
                    key={`bulk-${student.id}`}
                    className="relative flex flex-col items-center p-2 rounded-2xl print:p-0 print:border print:border-dashed print:border-slate-300"
                  >
                    {cardOrientation === 'portrait'
                      ? renderPortraitCard(student, `bulk-${idx}`)
                      : renderLandscapeCard(student, `bulk-${idx}`)}

                    {/* Cutting Guide Hint */}
                    <div className="text-[9.5px] text-slate-500 mt-2 flex items-center gap-1 print:text-slate-400 print:text-[8px]">
                      <span>✂️</span>
                      <span>কাটার গাইডলাইন ({student.roll}. {student.name})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : cardOrientation === 'portrait' ? (
              renderPortraitCard(currentStudent, 'single')
            ) : (
              renderLandscapeCard(currentStudent, 'single')
            )}
          </div>
        </div>
      </div>

      {/* Global Print Media Styles ensuring Background Colors & Crisp Dimensions */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          .id-card-item {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
