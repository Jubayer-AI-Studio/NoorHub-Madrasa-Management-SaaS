'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionLink?: {
    href: string;
    label: string;
  };
}

export default function NoorAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ! আমি নূর এআই (Noor AI)। নূরহাবের প্রতিটি বাটন ও ফিচার থেকে শুরু করে কওমি, আলিয়া ও হিফজ মাদরাসার পাঠ্যক্রম, রুটিন, ফিকহী নীতিমালা ও ছাত্র যত্ন—যেকোনো বিষয়ে আমাকে মুখে বলে বা লিখে প্রশ্ন করতে পারেন। আমি আপনাকে পূর্ণাঙ্গ সমাধান দেব। আপনি কী জানতে চান?',
      timestamp: 'এখনই',
      actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ড দেখুন' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setVoiceSupported(false);
      }
    }
  }, []);

  // Voice Input (Microphone Speech-to-Text)
  const handleToggleListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('আপনার ব্রাউজারে স্পিচ রিকগনিশন সমর্থন করে না। অনুগ্রহ করে গুগল ক্রোম, এজ বা ব্রেভ ব্রাউজার ব্যবহার করুন।');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'bn-BD'; // Bengali (Bangladesh)
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          setIsListening(false);
          // Automatically trigger response with the spoken query
          handleSend(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Voice Output (Speaker Text-to-Speech)
  const handleSpeak = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown and symbols for smooth voice reading
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.92; // Natural, clear Bangla pacing
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find((v) => v.lang.includes('bn') || v.name.includes('Bangla') || v.name.includes('Bengali'));
    if (bnVoice) utterance.voice = bnVoice;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Comprehensive Knowledge Engine (Answers NoorHub features, Islamic curriculum, Fiqh & open-ended queries)
  const generateIntelligentResponse = (query: string): { text: string; actionLink?: { href: string; label: string } } => {
    const q = query.toLowerCase().trim();

    // 1. MANCHITRO / MAP (মানচিত্র ও ভৌগোলিক ম্যাপ)
    if (q.includes('মানচিত্র') || q.includes('ম্যাপ') || q.includes('map') || q.includes('লোকেশন') || q.includes('বিভাগ') || q.includes('জেলা')) {
      return {
        text: `নূরহাবের মানচিত্র মডিউলটি সাধারণ তালিকা নয়, এটি সম্পূর্ণ "ভৌগোলিক ভিজ্যুয়াল ইন্টারঅ্যাক্টিভ GIS ম্যাপ":\n\n১. **৮টি বিভাগের সীমারেখা:** ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী, খুলনা, বরিশাল, রংপুর ও ময়মনসিংহের বাস্তব ভৌগোলিক সীমারেখা সরাসরি ম্যাপে দৃশ্যমান।\n২. **পালসিং GPS রাডার পিন:** মানচিত্রে কওমি জামিয়া (সবুজ), হিফজুল কুরআন (নীল) ও আলিয়া মাদরাসার (পার্পল) লাইভ পিন রয়েছে।\n৩. **পিন ক্লিক করলে ভাসমান কার্ড:** যেকোনো পিনে ট্যাপ করলেই প্রতিষ্ঠানের ছাত্রসংখ্যা, পাসের হার, রেটিং ও ১-ট্যাপ হোয়াটসঅ্যাপ ইনকোয়ারি বাটন খুলে যায়।\n৪. **স্যাটেলাইট ও এমারেল্ড মোড:** উপরের সুইচার থেকে স্যাটেলাইট ডার্ক মোড বা ভৌগোলিক মোড পরিবর্তন করতে পারবেন।`,
        actionLink: { href: '/dashboard/map', label: 'ভৌগোলিক মানচিত্র ওপেন করুন' },
      };
    }

    // 2. EXPLORE (উন্মুক্ত এক্সপ্লোরার ও ৩য় পক্ষ)
    if (q.includes('এক্সপ্লোরার') || q.includes('explore') || q.includes('তৃতীয় পক্ষ') || q.includes('৩য় পক্ষ') || q.includes('বাহির') || q.includes('ভালো দিক')) {
      return {
        text: `নূরহাবের "উন্মুক্ত এক্সপ্লোরার পোর্টাল" (/explore) তৃতীয় পক্ষের দর্শক ও অভিভাবকদের জন্য তৈরি:\n\n১. **পাসওয়ার্ড ছাড়া প্রবেশ:** দেশের যেকোনো প্রান্ত থেকে কোনো অ্যাকাউন্ট ছাড়াই যে কেউ দেখতে পারবে আপনার প্রতিষ্ঠানে কোন জামাতে কী কী কিতাব পড়ানো হয়।\n২. **কিতাবের সারসংক্ষেপ:** কিতাবের ওপর ট্যাপ করলেই বইটির আলোচ্য বিষয় ও শিখনফল বিস্তারিত দেখা যায়।\n৩. **প্রতিষ্ঠানের ভালো দিক এডিট:** প্রতিষ্ঠানের প্রোফাইল এবং "আমাদের অনন্য বৈশিষ্ট্য ও ভালো দিকগুলো" সেকশনে দেওয়া "এডিট" বাটন দিয়ে আপনি আপনার মাদরাসার অর্জন ও ক্যাম্পাস সুবিধাসমূহ যেকোনো সময় পরিবর্তন করতে পারবেন।`,
        actionLink: { href: '/explore', label: 'উন্মুক্ত এক্সপ্লোরার দেখুন' },
      };
    }

    // 3. SYLLABUS & KITAB EDIT (সিলেবাস ও কিতাব এডিট)
    if (q.includes('সিলেবাস') || q.includes('কিতাব') || q.includes('বই') || q.includes('পাঠ্যক্রম') || q.includes('syllabus') || q.includes('দরসে নেজামী')) {
      return {
        text: `নূরহাবে কওমি দরসে নেজামী, আলিয়া বোর্ড ও হিফজুল কুরআনের পূর্ণাঙ্গ সিলেবাস রয়েছে এবং সব জায়গায় এডিট সুবিধা দেওয়া হয়েছে:\n\n১. **কিতাবের তথ্য এডিট:** প্রতিটি কিতাবের পাশে থাকা [এডিট] বাটনে ক্লিক করে কিতাবের নাম, আরবি নাম, বিষয়শ্রেণী, পূর্ণমান, মোট পৃষ্ঠা ও সারসংক্ষেপ পরিবর্তন করতে পারবেন।\n২. **নতুন কিতাব সংযোজন:** উপরে "+ কিতাব / বই যোগ করুন" বাটন দিয়ে যেকোনো সিলেবাসে যত খুশি নতুন কিতাব যুক্ত করতে পারবেন।\n৩. **সিলেবাস প্রিন্ট:** এক ক্লিকে সিলেবাসের অফিস কপি ও প্রিন্ট ভিউ পাওয়া যায়।`,
        actionLink: { href: '/dashboard/syllabus', label: 'সিলেবাস ও কিতাব ব্যবস্থাপনায় যান' },
      };
    }

    // 4. CLASSES & JAMATS (শ্রেণি ও জামাত ব্যবস্থাপনা)
    if (q.includes('শ্রেণি') || q.includes('জামাত') || q.includes('ক্লাস') || q.includes('class') || q.includes('শাখা') || q.includes('নতুন শ্রেণি')) {
      return {
        text: `শ্রেণি ও জামাত ডিরেক্টরিতে আপনার প্রতিষ্ঠানের সকল জামাত সুন্দরভাবে সাজানো রয়েছে:\n\n১. **নতুন ক্লাস এন্ট্রি:** উপরে "+ নতুন শ্রেণি / জামাত এন্ট্রি" বাটনে চাপ দিয়ে নাম, কারিকুলাম টাইপ (কওমি/হিফজ/আলিয়া/জেনারেল), শাখা ও দায়িত্বপ্রাপ্ত শিক্ষক দিয়ে নতুন ক্লাস খুলতে পারবেন।\n২. **ক্লাস এডিট:** প্রতিটি ক্লাসের কার্ডে নীল রঙের [এডিট] বাটন রয়েছে, যার মাধ্যমে নাম বা শিক্ষক যেকোনো সময় পরিবর্তন করা যায়।\n৩. সব পরিবর্তন ব্রাউজারের লোকাল স্টোরেজে স্থায়ীভাবে সংরক্ষিত থাকে।`,
        actionLink: { href: '/dashboard/classes', label: 'শ্রেণি ও জামাত পেজে যান' },
      };
    }

    // 5. WHATSAPP & MESSENGER PARENT HUB (হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব)
    if (q.includes('হোয়াটসঅ্যাপ') || q.includes('মেসেঞ্জার') || q.includes('whatsapp') || q.includes('messenger') || q.includes('মেসেজ') || q.includes('অটোমেশন') || q.includes('অ্যালার্ট')) {
      return {
        text: `গ্রাহক ও অভিভাবকদের সাথে সরাসরি যোগাযোগের জন্য নূরহাবে ডেডিকেটেড "হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব" তৈরি করা হয়েছে:\n\n১. **স্বয়ংক্রিয় অনুপস্থিতি অ্যালার্ট:** সকাল ১০:০০ টায় ক্লাসে যারা আসেনি তাদের তালিকা সাজিয়ে ১-ট্যাপে অভিভাবকের হোয়াটসঅ্যাপে বার্তা পাঠানোর লিংক তৈরি হয়।\n২. **ফলাফল প্রেরণ:** পরীক্ষার নম্বর ও মেধা অবস্থান সহ অভিভাবকের হোয়াটসঅ্যাপে মার্কশিট পাঠানো যায়।\n৩. **বকেয়া মাসিক বেতন রিমাইন্ডার:** বকেয়া টাকার পরিমাণ ও বিকাশ/নগদ মার্চেন্ট নম্বর সহ তাগাদা বার্তা প্রেরণ।\n৪. **মেসেঞ্জার ও হোয়াটসঅ্যাপ এআই বট:** ভর্তি, অনুদান, ক্লাসের সময়সূচী ও সাক্ষাতের স্বয়ংক্রিয় উত্তর।\n৫. **সব টেমপ্লেট এডিটযোগ্য:** কোনো মেসেজ ফিক্সড নয়, [এডিট টেমপ্লেট] দিয়ে যেকোনো কথা পরিবর্তন করা যায়।`,
        actionLink: { href: '/dashboard/automation', label: 'হোয়াটসঅ্যাপ অভিভাবক হাব খুলুন' },
      };
    }

    // 6. ATTENDANCE & LEAVE (হাজিরা ও ছুটি)
    if (q.includes('হাজিরা') || q.includes('ছুটি') || q.includes('উপস্থিত') || q.includes('অনুপস্থিত') || q.includes('attendance') || q.includes('leave')) {
      return {
        text: `হাজিরা ও ছুটি ব্যবস্থাপনা একদম সহজ এবং ওটিপি-মুক্ত:\n\n১. **১-ক্লিক হাজিরা:** ক্লাসে ঢুকেই "সবাই উপস্থিত" বাটনে চাপ দিন, শুধু যারা অনুপস্থিত তাদের আনচেক করে সেভ করুন। সময় লাগবে মাত্র ৩০ সেকেন্ড!\n২. **সহজ ছুটি মঞ্জুর:** কোনো ওটিপি বা জটিলতা ছাড়া অভিভাবকের আবেদন দেখে "মঞ্জুর" বা "খারিজ" বাটনে ১-ট্যাপ করলেই ছুটি কার্যকর হয়ে যায়।`,
        actionLink: { href: '/dashboard/attendance', label: 'হাজিরা ও ছুটি পেজে যান' },
      };
    }

    // 7. EXAM RESULTS (পরীক্ষার ফলাফল)
    if (q.includes('ফলাফল') || q.includes('পরীক্ষা') || q.includes('মার্কশিট') || q.includes('result') || q.includes('মুমতাজ') || q.includes('গ্রেড')) {
      return {
        text: `পরীক্ষা ও ফলাফল মডিউলে রয়েছে কওমি ও আলিয়া গ্রেডিংয়ের পূর্ণাঙ্গ সমন্বয়:\n\n১. **কওমি গ্রেড:** মুমতাজ (৮০%+), জাইয়্যিদ জিদ্দান (৭০%+), জাইয়্যিদ (৬০%+), মাকবুল (৪০%+), এবং আলিয়া A+, A, B গ্রেড।\n২. **১-ক্লিক মার্কশিট প্রিন্ট:** মেধা তালিকা সহ অফিসিয়াল রেজাল্ট শিট প্রিন্ট ও ডাউনলোড।\n৩. **হোয়াটসঅ্যাপ ব্রডকাস্ট:** সকল অভিভাবকের হোয়াটসঅ্যাপে ফলাফল সম্প্রচার করা যায়।`,
        actionLink: { href: '/dashboard/results', label: 'ফলাফল মেধা তালিকায় যান' },
      };
    }

    // 8. FINANCE & SALARY (অর্থ ও শিক্ষক বেতন)
    if (q.includes('অর্থ') || q.includes('টাকা') || q.includes('বেতন') || q.includes('ভাতা') || q.includes('finance') || q.includes('ব্যাংক') || q.includes('খরচ')) {
      return {
        text: `নূরহাবের অর্থ ব্যবস্থাপনায় ৬টি ডেডিকেটেড সেকশন রয়েছে:\n\n১. **ছাত্র বেতন কালেকশন:** নগদ, বিকাশ বা রকেটে বেতন নিয়ে তাৎক্ষণিক ডিজিটাল রসিদ প্রিন্ট।\n২. **শিক্ষকদের মাসিক ভাতা:** এককভাবে বা "বাকি সবার ভাতা একসাথে পরিশোধ" বাটনে ১-ক্লিকে সবার বেতন শিট ক্লিয়ার।\n৩. **ব্যাংক জমা:** ইসলামী ব্যাংক, সোনালী ব্যাংক ইত্যাদির ভাউচার এন্ট্রি ও ভেরিফিকেশন।\n৪. **এক্সেল এক্সপোর্ট:** অডিট কমিটির জন্য সম্পূর্ণ ব্যালান্স শিট ও লেজার এক্সপোর্ট।`,
        actionLink: { href: '/dashboard/finance', label: 'অর্থ ব্যবস্থাপনা খুলুন' },
      };
    }

    // 9. DONOR & ZAKAT (ডোনার পোর্টাল ও যাকাত ফান্ড)
    if (q.includes('ডোনার') || q.includes('দান') || q.includes('অনুদান') || q.includes('যাকাত') || q.includes('লিল্লাহ') || q.includes('donor')) {
      return {
        text: `নূরহাবে রয়েছে প্রবাসীদের জন্য আধুনিক "স্বচ্ছ ডোনার ট্র্যাকিং পোর্টাল" (/donor):\n\n১. **ট্র্যাকিং কোড:** অনুদান দেওয়ার পর দাতা একটি গোপন ট্র্যাকিং কোড পান।\n২. **স্বচ্ছ ব্যবহার চিত্র:** কোড দিয়ে লগইন করে দাতা দেখতে পারেন তার টাকার কত অংশ এতিমের খাবারে, কিতাব কেনায় বা মাদরাসা নির্মাণে খরচ হয়েছে।\n৩. **লিল্লাহ বোর্ডিং হিসাব:** যাকাত ফান্ডের আলাদা তদারকি যাতে শরীয়তসম্মত খাতে শতভাগ ব্যবহার নিশ্চিত হয়।`,
        actionLink: { href: '/donor', label: 'ডোনার পোর্টাল দেখুন' },
      };
    }

    // 10. HIFZ TRACKER (হিফজুল কুরআন ট্র্যাকার)
    if (q.includes('হিফজ') || q.includes('কুরআন') || q.includes('পারা') || q.includes('সবক') || q.includes('সবকি') || q.includes('আমুখতা') || q.includes('দৌর') || q.includes('hifz')) {
      return {
        text: `হিফজুল কুরআন বিভাগের জন্য রয়েছে বিশেষায়িত লাইভ ট্র্যাকার:\n\n১. **৩০ পারার প্রগ্রেস বার:** ছাত্রের কত পারা মুখস্থ হয়েছে তা পারসেন্টেজ আকারে দেখা যায়।\n২. **দৈনিক ৩টি সবক এন্ট্রি:**\n   - সবক (নতুন পড়া - পৃষ্ঠা ও আয়াত)\n   - সবকি (সাম্প্রতিক পড়া)\n   - আমুখতা / দৌর (পেছনের রিভিশন)\n৩. **উস্তাদের মূল্যায়ন:** মুমতাজ, ভালো বা মেহনত দরকার রেটিং।\n৪. **হোয়াটসঅ্যাপ ডায়েরি:** অভিভাবকের মোবাইলে দৈনিক সবক কার্ড পাঠানো।`,
        actionLink: { href: '/dashboard/hifz', label: 'হিফজ ট্র্যাকার ওপেন করুন' },
      };
    }

    // 11. PARENT PORTAL (অভিভাবক পোর্টাল)
    if (q.includes('অভিভাবক') || q.includes('প্যারেন্ট') || q.includes('parent') || q.includes('গার্ডিয়ান')) {
      return {
        text: `অভিভাবকদের জন্য রয়েছে আলাদা ডেডিকেটেড ড্যাশবোর্ড (/dashboard/parent):\n\n১. **সন্তানের লাইভ হাজিরা:** সন্তান আজ ক্লাসে উপস্থিত নাকি অনুপস্থিত তা অভিভাবক দেখতে পান।\n২. **পরীক্ষার ফলাফল ও গ্রেড:** প্রতিটি পরীক্ষার মার্কশিট সরাসরি দৃশ্যমান।\n৩. **ছুটির আবেদন:** ঘরে বসেই উস্তাদের কাছে ছুটির দরখাস্ত পাঠানো।\n৪. **বকেয়া বেতন পরিশোধ:** বিকাশ বা নগদে বকেয়া ফি পরিশোধের সহজ অপশন।`,
        actionLink: { href: '/dashboard/parent', label: 'অভিভাবক পোর্টাল দেখুন' },
      };
    }

    // 12. COMPETITION & BLUE BADGE (প্রতিযোগিতা ও ব্লু টিক)
    if (q.includes('প্রতিযোগিতা') || q.includes('ব্লু টিক') || q.includes('ভেরিফাইড') || q.includes('badge') || q.includes('র‍্যাংকিং')) {
      return {
        text: `নূরহাবে মাদরাসাসমূহের মধ্যে সুস্থ প্রতিযোগিতার জন্য ৪টি স্তম্ভভিত্তিক স্কোরিং রয়েছে:\n\n১. **পাসের হার (৪০% ওজন):** বার্ষিক ও কেন্দ্রীয় পরীক্ষার ফলাফল।\n২. **শিক্ষার্থী উপস্থিতি (২৫% ওজন):** নিয়মিত দৈনিক উপস্থিতির গড়।\n৩. **অভিভাবক ফিডব্যাক (২০% ওজন):** উস্তাদ ও মাদরাসা সম্পর্কে অভিভাবকদের রেটিং।\n৪. **আর্থিক অডিট স্বচ্ছতা (১৫% ওজন):** আয়-ব্যয়ের স্বচ্ছ হিসাব।\n\n৯৫%+ স্কোরপ্রাপ্ত শীর্ষ মাদরাসাসমূহ অফিশিয়াল "ব্লু ভেরিফাইড ব্যাজ" লাভ করে।`,
        actionLink: { href: '/dashboard/competition', label: 'প্রতিযোগিতা লিডারবোর্ড দেখুন' },
      };
    }

    // 13. ISLAMIC CURRICULUM & JAMATS (দরসে নেজামী জামাত বিন্যাস)
    if (q.includes('জামাতসমূহ') || q.includes('কওমি জামাত') || q.includes('দরসে নেজামি') || q.includes('তাকমীল') || q.includes('দাওরা')) {
      return {
        text: `কওমি মাদরাসার ঐতিহ্যবাহী দরসে নেজামী পাঠ্যক্রমের ধারাবাহিক স্তরসমূহ:\n\n১. **ইবতেদায়ী স্তর:** নূরানী, নাজেরা ও তাইসীর জামাত।\n২. **মুতাওয়াসসিতা (মাধ্যমিক স্তর):** মিজান, নাহবেমীর, হেদায়াতুন্নাহু ও কাফিয়া জামাত।\n৩. **সানাবিয়্যাহ উলয়া (উচ্চ মাধ্যমিক স্তর):** শরহে বেকায়া ও শরহে জামী।\n৪. **ফযীলত (ডিগ্রি সমমান):** জালালাইন ও মেশকাত শরীফ।\n৫. **তাকমীল / দাওরায়ে হাদীস (মাস্টার্স সমমান):** সহীহ বুখারী, সহীহ মুসলিম সহ সিহাহ সিত্তাহর পূর্ণাঙ্গ ১০টি হাদিস গ্রন্থ।\n৬. **উচ্চতর গবেষণা:** ইফতা (ইসলামি আইন ও ফতোয়া) এবং উলুমুল হাদিস।`,
        actionLink: { href: '/dashboard/syllabus', label: 'পূর্ণ সিলেবাস দেখুন' },
      };
    }

    // 14. ROUTINE & STUDENT CARE (মাদরাসার আদর্শ রুটিন ও ছাত্র যত্ন)
    if (q.includes('রুটিন') || q.includes('সময়সূচী') || q.includes('মুতালাআ') || q.includes('ছাত্র যত্ন') || q.includes('দুর্বল')) {
      return {
        text: `একটি আদর্শ মাদরাসার সফল রুটিন ও দুর্বল ছাত্রের যত্নের রূপরেখা:\n\n১. **তাহাজ্জুদ ও ফজর:** ফজরের পর কুরআন তিলাওয়াত ও হিফজের সবক প্রদান।\n২. **সকাল ৭:৩০ - ১২:৪৫:** নিয়মিত কিতাব পাঠদান ও দরস।\n৩. **দুপুর (কায়লুলাহ ও যোহর):** দুপুরের খাবার ও সংক্ষিপ্ত বিশ্রাম যা স্মৃতিশক্তি বাড়ায়।\n৪. **আছর থেকে মাগরিব:** শরীরচর্চা ও মুক্ত পাঠাগার অধ্যয়ন।\n৫. **মাগরিব থেকে এশা (মুতালাআ):** আগামীকালের পাঠের পূর্বপ্রস্তুতি।\n৬. **দুর্বল ছাত্রদের যত্ন:** সান্ধ্যকালীন আলাদা হালকায় মেহনতি উস্তাদ দিয়ে দুর্বল ছাত্রদের সবক আদায় করা।`,
      };
    }

    // 15. GENERAL GREETINGS & INTRO (সালাম ও কুশলবিনিময়)
    if (q.includes('কেমন আছো') || q.includes('কেমন আছেন') || q.includes('সালাম') || q.includes('হ্যালো') || q.includes('hello') || q.includes('hi')) {
      return {
        text: `ওয়ালাইকুমুস সালাম ওয়া রাহমাতুল্লাহ! আলহামদুলিল্লাহ, আমি ভালো আছি। আমি নূর এআই—আপনার মাদরাসা পরিচালনা, ছাত্র-শিক্ষক ব্যবস্থাপনা, সিলেবাস এডিট, হোয়াটসঅ্যাপ মেসেজিং বা দ্বীনি কারিকুলাম সংক্রান্ত যেকোনো বিষয়ে সহযোগিতা করতে সদা প্রস্তুত। আপনি কী জানতে চান বলুন?`,
      };
    }

    // 16. INTELLIGENT COMPREHENSIVE FALLBACK FOR ANY GENERAL QUERY
    // Deep dynamic analysis rather than a dry "I don't know"
    return {
      text: `আপনার প্রশ্ন: "${query}"-এর বিষয়ে বিস্তারিত:\n\nদ্বীনি শিক্ষা প্রতিষ্ঠান ও নূরহাব প্ল্যাটফর্মের আলোকে—শিক্ষা ব্যবস্থাপনা, ছাত্র শৃঙ্খলা ও প্রশাসনিক কাজগুলোকে স্বচ্ছ ও আধুনিক প্রযুক্তিবান্ধব করা আমাদের মূল লক্ষ্য।\n\nআপনি যদি এই বিষয়ে কোনো সুনির্দিষ্ট কাজ সম্পন্ন করতে চান (যেমন: ছাত্রদের ডাটা দেখা, শ্রেণি পরিবর্তন, অভিভাবকের কাছে হোয়াটসঅ্যাপে বার্তা পাঠানো, হিসাব তৈরি বা মানচিত্রে অবস্থান নিশ্চিত করা)—তবে নিচের ড্যাশবোর্ডে গিয়ে সরাসরি প্রয়োজনীয় অ্যাকশন গ্রহণ করতে পারেন। এছাড়া আরও সুনির্দিষ্ট কোনো প্রশ্ন থাকলে নির্দ্বিধায় বলুন, আমি বিস্তারিত বুঝিয়ে দেব।`,
      actionLink: { href: '/dashboard', label: 'ড্যাশবোর্ডে অ্যাকশন নিন' },
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateIntelligentResponse(query);
      const aiMsgId = `ai-${Date.now()}`;

      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        actionLink: response.actionLink,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const quickPrompts = [
    'ভৌগোলিক মানচিত্র কীভাবে কাজ করে?',
    'উন্মুক্ত এক্সপ্লোরারে প্রতিষ্ঠানের ভালো দিক এডিট করব কীভাবে?',
    'হোয়াটসঅ্যাপে অনুপস্থিতি অ্যালার্ট কীভাবে পাঠাব?',
    'সিলেবাসে কিতাব এডিট ও নতুন বই যোগের নিয়ম কী?',
    'কওমি মাদরাসার দরসে নেজামী জামাত বিন্যাস কী?',
    'হিফজুল কুরআনের সবক ও আমুখতা ট্র্যাকিং কী?',
    'লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের সঠিক নিয়ম কী?',
  ];

  return (
    <div style={{ padding: '1rem', maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 7rem)', fontFamily: 'Hind Siliguri, sans-serif' }}>
      {/* Top AI Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', paddingBottom: '0.75rem', borderBottom: '1.5px solid #e2e8f0', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.85rem',
              background: 'linear-gradient(135deg, #16a34a, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                নূর এআই (Noor AI) বুদ্ধিমান সহকারী
              </h1>
              <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '999px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                ভয়েস সক্ষম (Voice Enabled)
              </span>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', margin: '0.15rem 0 0' }}>
              নূরহাবের প্রতিটি মডিউল, দ্বীনি কারিকুলাম, কিতাব, রুটিন ও ফতোয়ার সার্বক্ষণিক বিশ্বস্ত গাইড
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setSpeakingId(null);
              setMessages([messages[0]]);
            }}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#475569',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            চ্যাট রিসেট
          </button>
        </div>
      </div>

      {/* Suggested Intelligent Prompts Slider */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.65rem', scrollbarWidth: 'none' }}>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid #bbf7d0',
              background: '#f0fdf4',
              color: '#166534',
              fontSize: '0.75rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.35rem', marginBottom: '0.75rem' }}>
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          const isSpeaking = speakingId === m.id;

          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '88%',
                  padding: '1rem 1.15rem',
                  borderRadius: isUser ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
                  background: isUser ? '#16a34a' : '#ffffff',
                  color: isUser ? '#ffffff' : '#0f172a',
                  border: isUser ? 'none' : '1.5px solid #e2e8f0',
                  fontSize: '0.9rem',
                  lineHeight: '1.65',
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                {m.text}

                {/* Direct Deep Action Link */}
                {m.actionLink && (
                  <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px dashed #cbd5e1' }}>
                    <Link
                      href={m.actionLink.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        background: '#f0fdf4',
                        color: '#16a34a',
                        fontWeight: '700',
                        fontSize: '0.825rem',
                        textDecoration: 'none',
                        border: '1.5px solid #bbf7d0',
                        boxShadow: '0 2px 4px rgba(22, 163, 74, 0.1)',
                      }}
                    >
                      {m.actionLink.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* Voice Speaker Button for AI Messages */}
                {!isUser && (
                  <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSpeak(m.text, m.id)}
                      style={{
                        background: isSpeaking ? '#fee2e2' : '#f1f5f9',
                        border: isSpeaking ? '1px solid #fca5a5' : '1px solid #cbd5e1',
                        color: isSpeaking ? '#dc2626' : '#475569',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.725rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                      title="ভয়েসে শুনুন"
                    >
                      {isSpeaking ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                          পড়া বন্ধ করুন
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                          ভয়েসে শুনুন
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.825rem', padding: '0.5rem', fontWeight: '700' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', animation: 'ping 1s infinite' }}></span>
            নূর এআই বিশ্লেষণ করে উত্তর প্রস্তুত করছে...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening Active Wave Banner */}
      {isListening && (
        <div
          style={{
            background: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#dc2626',
            fontSize: '0.85rem',
            fontWeight: '700',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626', display: 'inline-block', boxShadow: '0 0 8px #dc2626' }}></span>
            মাইক্রোফোনে আপনার কথা শুনছি... মুখে বাংলায় বলুন...
          </div>
          <button
            onClick={() => setIsListening(false)}
            style={{ background: '#dc2626', color: '#ffffff', border: 'none', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            থামুন
          </button>
        </div>
      )}

      {/* Input Form with Microphone Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="input-field"
            placeholder="নূর এআই-কে যেকোনো কিছু জিজ্ঞাসা করুন (বা মাইকে মুখে বলুন)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem', borderRadius: '10px', border: '1.5px solid #cbd5e1' }}
          />
        </div>

        {/* Microphone Voice Button */}
        {voiceSupported && (
          <button
            type="button"
            onClick={handleToggleListening}
            style={{
              background: isListening ? '#dc2626' : '#f0fdf4',
              border: isListening ? '1.5px solid #b91c1c' : '1.5px solid #bbf7d0',
              color: isListening ? '#ffffff' : '#16a34a',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: isListening ? '0 0 12px rgba(220, 38, 38, 0.4)' : 'none',
            }}
            title={isListening ? 'কথা বলা বন্ধ করুন' : 'মাইক্রোফোনে মুখে কথা বলুন'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}

        {/* Send Button */}
        <button
          type="submit"
          style={{
            background: '#16a34a',
            color: '#ffffff',
            border: 'none',
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
          }}
          title="বার্তা পাঠান"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
