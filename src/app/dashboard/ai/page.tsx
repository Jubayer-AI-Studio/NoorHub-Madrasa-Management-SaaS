'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  provider?: 'gemini' | 'local-engine' | 'fallback';
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
      text: 'আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ! আমি নূর এআই (Noor AI)। নূরহাবের প্রতিটি মডিউল ও ফিচার থেকে শুরু করে কওমি, আলিয়া ও হিফজ মাদরাসার পাঠ্যক্রম, রুটিন, ফিকহী নীতিমালা, হিসাব-নিকাশ ও ছাত্র যত্ন—যেকোনো বিষয়ে আমাকে মুখে বলে বা লিখে প্রশ্ন করতে পারেন। আমি আপনাকে পূর্ণাঙ্গ ও বিস্তারিত সমাধান দেব। আপনি কী জানতে চান?',
      timestamp: 'এখনই',
      actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ড দেখুন' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Gemini API Key & Settings Modal
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load API key and autoSpeak preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('noorhub_gemini_key') || '';
      const savedAutoSpeak = localStorage.getItem('noorhub_auto_speak') === 'true';
      setGeminiApiKey(savedKey);
      setTempApiKey(savedKey);
      setAutoSpeak(savedAutoSpeak);
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, interimTranscript]);

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
      setVoiceError('আপনার ব্রাউজারে স্পিচ রিকগনিশন সমর্থন করে না। অনুগ্রহ করে গুগল ক্রোম (Google Chrome) বা এজ (Microsoft Edge) ব্যবহার করুন।');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setInterimTranscript('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'bn-BD'; // Bengali (Bangladesh)
      recognition.continuous = true;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }

        setInterimTranscript(currentTranscript);

        // If the last result is final, update the input field
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const finalQuery = currentTranscript.trim();
          if (finalQuery) {
            setInput(finalQuery);
            recognition.stop();
            setIsListening(false);
            setInterimTranscript('');
            handleSend(finalQuery);
          }
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setInterimTranscript('');
        if (event.error === 'not-allowed') {
          setVoiceError('মাইক্রোফোন ব্যবহারের অনুমতি পাওয়া যায়নি। দয়া করে ব্রাউজারের অ্যাড্রেস বারে ক্যামেরা/মাইক আইকনে ক্লিক করে Allow করুন।');
        } else if (event.error === 'no-speech') {
          setVoiceError('কোনো কথা শোনা যায়নি। অনুগ্রহ করে মাইক্রোফোনের কাছে স্পষ্ট করে বলুন।');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceError('মাইক্রোফোন চালু করতে সমস্যা হয়েছে। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করে আবার চেষ্টা করুন।');
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

    // Clean markdown, emojis and symbols for smooth voice reading
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis for clear Bengali pronunciation
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.92; // Natural Bangla pacing
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find(
      (v) => v.lang.includes('bn') || v.name.includes('Bangla') || v.name.includes('Bengali')
    );
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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Client-side fallback knowledge engine (Guarantees zero generic responses offline)
  const generateClientFallback = (query: string): { text: string; actionLink?: { href: string; label: string } } => {
    const q = query.toLowerCase().trim();

    // 1. GREETINGS & CASUAL HELLO / SALAM
    if (
      q === 'হ্যালো' ||
      q === 'হ্যালো হ্যালো' ||
      q === 'hello' ||
      q === 'hi' ||
      q === 'হাই' ||
      q.includes('হ্যালো') ||
      q.includes('hello') ||
      q.includes('hi ') ||
      q === 'hi' ||
      q.includes('সালাম') ||
      q.includes('আসসালামু') ||
      q.includes('আলাইকুম') ||
      q.includes('শুনছো') ||
      q.includes('শুনতে পাচ্ছ')
    ) {
      return {
        text: `ওয়ালাইকুমুস সালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ!\n\nজ্বী মুহতারাম, আমি শুনতে পাচ্ছি। আমি নূর এআই—নূরহাবের সকল মডিউল, কওমি ও আলিয়া সিলেবাস, হিফজ ট্র্যাকিং, হোয়াটসঅ্যাপ নোটিশ, শিক্ষক বেতন ও মাদরাসা পরিচালনার সার্বক্ষণিক সহযোগী।\n\nবলুন মুহতারাম, আপনাকে কীভাবে সহযোগিতা করতে পারি?`,
      };
    }

    // 2. CASUAL COURTESY / HOW ARE YOU
    if (q.includes('কেমন আছো') || q.includes('কেমন আছেন') || q.includes('ভালো আছো') || q.includes('খবর কি')) {
      return {
        text: `আলহামদুলিল্লাহ, আল্লাহ্‌র অশেষ মেহেরবানীতে আমি ভালো আছি। আশা করি আপনিও ভালো ও সুস্থ আছেন।\n\nদ্বীনি প্রতিষ্ঠানের সার্বিক খেদমত ও নূরহাবের যেকোনো মডিউলে কাজ করতে আমি সদা প্রস্তুত। আজ কোন বিষয়ে জানতে চান বলুন?`,
      };
    }

    // 3. GRATITUDE / THANKS
    if (q.includes('ধন্যবাদ') || q.includes('জাযাকাল্লাহ') || q.includes('থ্যাংক') || q.includes('শুকরিয়া')) {
      return {
        text: `ওয়া ইয়্যাকা! শুকরান ওয়া জাযাকাল্লাহু খাইরান। আপনার ও আপনার প্রতিষ্ঠানের উত্তরোত্তর বরকত কামনা করি। আর কোনো বিষয়ে সহযোগিতার প্রয়োজন হলে নির্দ্বিধায় বলুন।`,
      };
    }

    // 4. AFFIRMATIONS (ঠিক আছে, আচ্ছা, ওকে)
    if (q === 'ঠিক আছে' || q === 'আচ্ছা' || q === 'ওকে' || q === 'ok' || q === 'হুম' || q === 'হ্যাঁ') {
      return {
        text: `আলহামদুলিল্লাহ! আপনার আর কোনো প্রশ্ন আছে কি? অথবা নূরহাবের কোনো নির্দিষ্ট ফিচারে কাজ করতে চাইলে আমাকে বলুন, আমি সরাসরি লিংক সহ দেখিয়ে দিচ্ছি।`,
      };
    }

    // 5. ALL 15 FEATURES LIST
    if (
      q.includes('ফিচার') ||
      q.includes('কী কী আছে') ||
      q.includes('কি কি আছে') ||
      q.includes('কী আছে') ||
      q.includes('কি আছে') ||
      q.includes('সুবিধা') ||
      q.includes('কী করতে পারো') ||
      q.includes('কি করতে পারো') ||
      q.includes('কী পারো') ||
      q.includes('কাজ কি') ||
      q.includes('কী কাজ') ||
      q.includes('ফাংশন') ||
      q.includes('মডিউল') ||
      q.includes('লিস্ট')
    ) {
      return {
        text: `নূরহাব (NoorHub) প্ল্যাটফর্মে মোট ১৫টি আধুনিক শক্তিশালী ফিচার ও মডিউল রয়েছে:\n\n` +
          `১. 🗺️ **ভৌগোলিক GIS মানচিত্র (/dashboard/map):** ৮টি বিভাগের বাস্তব সীমারেখা সহ কওমি, হিফজ ও আলিয়া মাদরাসার রিয়েল-টাইম GPS রাডার পিন ও ভাসমান প্রোফাইল কার্ড।\n` +
          `২. 🌐 **উন্মুক্ত এক্সপ্লোরার পোর্টাল (/explore):** পাসওয়ার্ড ছাড়া ৩য় পক্ষ ও অভিভাবকদের জন্য জামাত ও কিতাবের তথ্য এবং প্রতিষ্ঠানের অনন্য ভালো দিক ও অর্জনের উন্মুক্ত প্রদর্শনী।\n` +
          `৩. 📚 **সিলেবাস ও কিতাব ব্যবস্থাপনা (/dashboard/syllabus):** দরসে নেজামী, আলিয়া ও হিফজের পূর্ণাঙ্গ কিতাব তালিকা, নতুন কিতাব এন্ট্রি ও যেকোনো কিতাবের তথ্য এডিট।\n` +
          `৪. 🏫 **শ্রেণি ও জামাত ব্যবস্থাপনা (/dashboard/classes):** নতুন জামাত এন্ট্রি, শাখা ও দায়িত্বপ্রাপ্ত উস্তাদ নির্ধারণ এবং প্রতিটি ক্লাসের তথ্য এডিট।\n` +
          `৫. 💬 **হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব (/dashboard/automation):** সকাল ১০:০০ টায় অনুপস্থিত ছাত্রদের স্বয়ংক্রিয় হোয়াটসঅ্যাপ অ্যালার্ট, পরীক্ষার ফলাফল সম্প্রচার ও বকেয়া বেতন তাগাদা।\n` +
          `৬. 📝 **১-ক্লিক ডিজিটাল হাজিরা ও ওটিপি-মুক্ত ছুটি (/dashboard/attendance):** ক্লাসে মাত্র ৩০ সেকেন্ডে হাজিরা এবং অভিভাবকের ছুটির আবেদন ১-ট্যাপে মঞ্জুর।\n` +
          `৭. 🏆 **পরীক্ষা ফলাফল ও মেধা তালিকা (/dashboard/results):** কওমি গ্রেডিং (মুমতাজ, জাইয়্যিদ জিদ্দান, জাইয়্যিদ, মাকবুল) ও আলিয়া গ্রেডিং সমন্বয়ে তৈরি মেধা তালিকা ও মার্কশিট প্রিন্ট।\n` +
          `৮. 💰 **অর্থ ও শিক্ষক বেতন ব্যবস্থাপনা (/dashboard/finance):** ছাত্র ফি আদায়, শিক্ষকদের এক ক্লিকে বেতন পরিশোধ, ব্যাংক জমা ও এক্সেল লেজার।\n` +
          `৯. 🤝 **স্বচ্ছ ডোনার ট্র্যাকিং পোর্টাল (/donor):** প্রবাসী ও দাতাদের জন্য গোপন ট্র্যাকিং কোডের মাধ্যমে লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের বাস্তব ব্যয় বিবরণী।\n` +
          `১০. 📖 **হিফজুল কুরআন ট্র্যাকার (/dashboard/hifz):** ৩০ পারার প্রগ্রেস বার, দৈনিক ৩ সবক (সবক, সবকি, আমুখতা/দৌর) ট্র্যাকিং ও অভিভাবকের জন্য সবক ডায়েরি।\n` +
          `১১. 👨‍👩‍👦 **অভিভাবক পোর্টাল (/dashboard/parent):** সন্তানের লাইভ হাজিরা, মার্কশিট, অনলাইন ফি পেমেন্ট ও ছুটির আবেদন।\n` +
          `১২. ⭐ **প্রতিযোগিতা ও ব্লু ভেরিফাইড ব্যাজ (/dashboard/competition):** ৪টি মানদণ্ডে স্কোরিং ও শীর্ষ মাদরাসাসমূহের জন্য ব্লু টিক।\n` +
          `১৩. 🤖 **নূর এআই বুদ্ধিমান সহকারী (/dashboard/ai):** লাইভ বাংলা ভয়েস ইনপুট ও আউটপুট সহ সার্বক্ষণিক পরামর্শক।\n` +
          `১৪. 📊 **পরিসংখ্যান ও ড্যাশবোর্ড অ্যানালিটিক্স (/dashboard):** ছাত্র, শিক্ষক, উপস্থিতি ও তহবিলের রিয়েল-টাইম তথ্য।\n` +
          `১৫. 📄 **অফিশিয়াল প্রেজেন্টেশন ডেক (/presentation):** পরিচালনা কমিটি ও দাতাদের জন্য প্রফেশনাল ব্রোশিউর ও স্লাইড।\n\n` +
          `আপনি যেকোনো মডিউল দেখতে চাইলে নিচের বাটনটি চাপুন অথবা আমাকে নাম বলুন, আমি সরাসরি বিস্তারিত গাইড করব।`,
        actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ড এক্সপ্লোর করুন' },
      };
    }

    // 6. WHO ARE YOU / WHAT IS NOORHUB
    if (q.includes('নূরহাব কি') || q.includes('নূরহাব কী') || q.includes('তুমি কে') || q.includes('তোমার কাজ কি') || q.includes('তোমার পরিচয়')) {
      return {
        text: `নূরহাব (NoorHub) হলো কওমি, আলিয়া ও হিফজ মাদরাসার জন্য নির্মিত একটি সর্বজনীন ইসলামিক শিক্ষা ব্যবস্থাপনা প্ল্যাটফর্ম।\n\n` +
          `আমি হলাম "নূর এআই" (Noor AI)—এই প্ল্যাটফর্মের কেন্দ্রীয় সহকারী।\n` +
          `আমার কাজ হলো:\n` +
          `• প্রতিষ্ঠান পরিচালনার দৈনন্দিন কাজগুলোকে (হাজিরা, রুটিন, ফলাফল, হিসাব) সহজ করে দেওয়া।\n` +
          `• কওমি দরসে নেজামী ও হিফজুল কুরআনের প্রতিটি ধাপ সঠিকভাবে পরিচালনা করতে দিকনির্দেশনা প্রদান করা।\n` +
          `• অভিভাবক ও শিক্ষকদের মধ্যে সরাসরি হোয়াটসঅ্যাপ নোটিশের মাধ্যমে শক্তিশালী মেলবন্ধন তৈরি করা।`,
        actionLink: { href: '/presentation', label: 'নূরহাব অফিশিয়াল প্রেজেন্টেশন দেখুন' },
      };
    }

    // 7. HIFZ TRACKER (Prioritized before Finance/Accounts)
    if (q.includes('হিফজ') || q.includes('কুরআন') || q.includes('পারা') || q.includes('সবক') || q.includes('সবকি') || q.includes('আমুখতা') || q.includes('দৌর') || q.includes('hifz')) {
      return {
        text: `হিফজুল কুরআন বিভাগের জন্য রয়েছে বিশেষায়িত লাইভ ট্র্যাকার:\n\n` +
          `১. **৩০ পারার প্রগ্রেস বার:** ছাত্রের কত পারা মুখস্থ হয়েছে তা পারসেন্টেজ আকারে দেখা যায়।\n` +
          `২. **দৈনিক ৩টি সবক এন্ট্রি:**\n   - সবক (নতুন পড়া - পৃষ্ঠা ও আয়াত)\n   - সবকি (সাম্প্রতিক পড়া)\n   - আমুখতা / দৌর (পেছনের রিভিশন)\n` +
          `৩. **উস্তাদের মূল্যায়ন:** মুমতাজ, ভালো বা মেহনত দরকার রেটিং।\n` +
          `৪. **হোয়াটসঅ্যাপ ডায়েরি:** অভিভাবকের মোবাইলে দৈনিক সবক কার্ড পাঠানো।`,
        actionLink: { href: '/dashboard/hifz', label: 'হিফজ ট্র্যাকার ওপেন করুন' },
      };
    }

    // 8. DARS-E-NIZAMI HIERARCHY & JAMATS
    if (q.includes('দরসে নেজামী') || q.includes('কওমি জামাত') || q.includes('জামাতগুলোর নাম') || q.includes('দাওরা') || q.includes('মিজান') || q.includes('নাহবেমীর') || q.includes('জালালাইন') || q.includes('মেশকাত') || q.includes('ইফতা')) {
      return {
        text: `কওমি মাদরাসার ঐতিহ্যবাহী দরসে নেজামী কারিকুলামের ধাপসমূহ:\n\n` +
          `১. **ইবতেদায়ী স্তর:** নূরানী, নাজেরা ও তাইসীর জামাত।\n` +
          `২. **মুতাওয়াসসিতা (মাধ্যমিক স্তর):** মিজান, নাহবেমীর, হেদায়াতুন্নাহু ও কাফিয়া জামাত।\n` +
          `৩. **সানাবিয়্যাহ উলয়া (উচ্চ মাধ্যমিক):** শরহে বেকায়া ও শরহে জামী।\n` +
          `৪. **ফযীলত (ডিগ্রি সমমান):** জালালাইন ও মেশকাত শরীফ।\n` +
          `৫. **তাকমীল / দাওরায়ে হাদীস (মাস্টার্স সমমান):** বুখারী ও মুসলিম সহ সিহাহ সিত্তাহর পূর্ণাঙ্গ হাদিস গ্রন্থসমূহ।\n` +
          `৬. **উচ্চতর গবেষণা:** ইফতা (ইসলামি আইন ও ফতোয়া) ও উলুমুল হাদিস।`,
        actionLink: { href: '/dashboard/syllabus', label: 'সিলেবাসে কিতাবসমূহ দেখুন' },
      };
    }

    // 9. MAP
    if (q.includes('মানচিত্র') || q.includes('ম্যাপ') || q.includes('map') || q.includes('বিভাগ') || q.includes('জেলা') || q.includes('লোকেশন')) {
      return {
        text: `নূরহাবের মানচিত্র মডিউলটি সম্পূর্ণ "ভৌগোলিক ভিজ্যুয়াল ইন্টারঅ্যাক্টিভ GIS ম্যাপ":\n\n১. **৮টি বিভাগের সীমারেখা:** বাংলাদেশের ৮টি প্রশাসনিক বিভাগের সীমানা ম্যাপে স্পষ্টভাবে আঁকা।\n২. **পালসিং রাডার পিন:** কওমি জামিয়া (সবুজ), হিফজুল কুরআন (নীল) ও আলিয়া মাদরাসার (পার্পল) লাইভ পিন।\n৩. **ভাসমান কার্ড:** পিনে ট্যাপ করলেই পাসের হার, রেটিং ও ১-ট্যাপ হোয়াটসঅ্যাপ ইনকোয়ারি বাটন খুলে যায়।\n৪. **স্যাটেলাইট মোড:** স্যাটেলাইট ডার্ক মোড ও এমারেল্ড মোড পরিবর্তন করা যায়।`,
        actionLink: { href: '/dashboard/map', label: 'ভৌগোলিক মানচিত্র ওপেন করুন' },
      };
    }

    // 10. WHATSAPP & AUTOMATION
    if (q.includes('হোয়াটসঅ্যাপ') || q.includes('মেসেঞ্জার') || q.includes('whatsapp') || q.includes('messenger') || q.includes('মেসেজ') || q.includes('অটোমেশন') || q.includes('অ্যালার্ট') || q.includes('অনুপস্থিতি') || q.includes('নোটিশ')) {
      return {
        text: `নূরহাবের "হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব":\n\n১. **অনুপস্থিতি অ্যালার্ট:** সকাল ১০:০০ টায় অনুপস্থিত ছাত্রদের তালিকা ১-ট্যাপে অভিভাবকের হোয়াটসঅ্যাপে যায়।\n২. **ফলাফল সম্প্রচার:** পরীক্ষার গ্রেড ও মার্কশিট অভিভাবকের মোবাইলে প্রেরণ।\n৩. **বকেয়া বেতন তাগাদা:** বিকাশ/নগদ নম্বর সহ বকেয়া ফি তাগাদা বার্তা।\n৪. **এআই চ্যাট বট:** ভর্তি ও সাক্ষাতের ২৪/৭ স্বয়ংক্রিয় উত্তর।\n৫. **সব টেমপ্লেট এডিটযোগ্য:** মেসেজের ভাষা নিজের মতো কাস্টমাইজ করা যায়।`,
        actionLink: { href: '/dashboard/automation', label: 'হোয়াটসঅ্যাপ অভিভাবক হাব দেখুন' },
      };
    }

    // 11. ATTENDANCE & LEAVE
    if (q.includes('হাজিরা') || q.includes('ছুটি') || q.includes('উপস্থিত') || q.includes('attendance') || q.includes('leave')) {
      return {
        text: `হাজিরা ও ছুটি ব্যবস্থাপনা একদম সহজ এবং সম্পূর্ণ ওটিপি-মুক্ত:\n\n১. **১-ক্লিক হাজিরা:** ক্লাসে ঢুকেই "সবাই উপস্থিত" বাটনে চাপ দিন, শুধু অনুপস্থিতদের আনচেক করুন।\n২. **সহজ ছুটি মঞ্জুর:** অভিভাবকের ছুটির আবেদন দেখে "মঞ্জুর" বাটনে ১-ট্যাপ করলেই ছুটি কার্যকর হয়।`,
        actionLink: { href: '/dashboard/attendance', label: 'হাজিরা ও ছুটি পেজে যান' },
      };
    }

    // 12. EXAM RESULTS
    if (q.includes('ফলাফল') || q.includes('পরীক্ষা') || q.includes('মার্কশিট') || q.includes('result') || q.includes('মুমতাজ')) {
      return {
        text: `পরীক্ষা ও ফলাফল মডিউলে রয়েছে কওমি ও আলিয়া গ্রেডিংয়ের পূর্ণাঙ্গ সমন্বয়:\n\n১. **কওমি গ্রেড:** মুমতাজ, জাইয়্যিদ জিদ্দান, জাইয়্যিদ, মাকবুল গ্রেড হিসাব।\n২. **মার্কশিট প্রিন্ট:** মেধা তালিকা সহ অফিসিয়াল রেজাল্ট শিট প্রিন্ট ও ডাউনলোড।\n৩. **হোয়াটসঅ্যাপ ব্রডকাস্ট:** সকল অভিভাবকের হোয়াটসঅ্যাপে ফলাফল পাঠানো যায়।`,
        actionLink: { href: '/dashboard/results', label: 'ফলাফল পেজে যান' },
      };
    }

    // 13. SYLLABUS & KITAB
    if (q.includes('সিলেবাস') || q.includes('কিতাব') || q.includes('বই') || q.includes('পাঠ্যক্রম') || q.includes('বই যোগ') || q.includes('কিতাব এডিট')) {
      return {
        text: `নূরহাবে কওমি দরসে নেজামী, আলিয়া ও হিফজের পূর্ণ সিলেবাস রয়েছে:\n\n১. **কিতাব এডিট:** প্রতিটি কিতাবের পাশে [এডিট] বাটন দিয়ে নাম, পৃষ্ঠা ও সারসংক্ষেপ এডিট করা যায়।\n২. **নতুন কিতাব যোগ:** "+ কিতাব যোগ করুন" বাটন দিয়ে যেকোনো সিলেবাসে নতুন বই যুক্ত করা যায়।\n৩. **সিলেবাস প্রিন্ট:** এক ক্লিকে সিলেবাস কপি প্রিন্ট করা যায়।`,
        actionLink: { href: '/dashboard/syllabus', label: 'সিলেবাস ও কিতাব ব্যবস্থাপনা' },
      };
    }

    // 14. CLASSES & JAMATS
    if (q.includes('শ্রেণি') || q.includes('জামাত') || q.includes('ক্লাস') || q.includes('class') || q.includes('নতুন শ্রেণি') || q.includes('নতুন ক্লাস')) {
      return {
        text: `শ্রেণি ও জামাত ডিরেক্টরিতে সব জামাত সাজানো রয়েছে:\n\n১. **নতুন ক্লাস এন্ট্রি:** "+ নতুন শ্রেণি / জামাত এন্ট্রি" বাটনে নাম, শাখা ও শিক্ষক দিয়ে নতুন ক্লাস খুলতে পারবেন।\n২. **ক্লাস এডিট:** প্রতিটি ক্লাসের কার্ডে থাকা [এডিট] বাটন দিয়ে যেকোনো তথ্য পরিবর্তন করা যায়।`,
        actionLink: { href: '/dashboard/classes', label: 'শ্রেণি ও জামাত পেজে যান' },
      };
    }

    // 15. FINANCE & SALARY
    if (
      q.includes('অর্থ') ||
      q.includes('টাকা') ||
      q.includes('বেতন') ||
      q.includes('ভাতা') ||
      q.includes('finance') ||
      q.includes('ব্যাংক') ||
      q.includes('আর্থিক') ||
      q.includes('টাকার হিসাব') ||
      q.includes('আয়-ব্যয়') ||
      (q.includes('হিসাব') && !q.includes('সবক') && !q.includes('হিফজ') && !q.includes('পড়া') && !q.includes('হাজিরা'))
    ) {
      return {
        text: `নূরহাবের অর্থ ব্যবস্থাপনায় রয়েছে:\n\n১. **ছাত্র বেতন কালেকশন:** নগদ, বিকাশ বা রকেটে বেতন গ্রহণ ও ডিজিটাল রসিদ।\n২. **শিক্ষক ভাতা:** এক ক্লিকে সকল শিক্ষকের মাসিক বেতন শিট ক্লিয়ার।\n৩. **ব্যাংক জমা:** ইসলামী ব্যাংক, সোনালী ব্যাংক ইত্যাদির স্লিপ ভেরিফিকেশন।`,
        actionLink: { href: '/dashboard/finance', label: 'অর্থ ব্যবস্থাপনা খুলুন' },
      };
    }

    // 16. DONOR & ZAKAT
    if (q.includes('ডোনার') || q.includes('দান') || q.includes('অনুদান') || q.includes('যাকাত') || q.includes('লিল্লাহ')) {
      return {
        text: `নূরহাবে রয়েছে প্রবাসীদের জন্য আধুনিক "স্বচ্ছ ডোনার ট্র্যাকিং পোর্টাল" (/donor):\n\n১. **ট্র্যাকিং কোড:** অনুদান দেওয়ার পর দাতা একটি গোপন ট্র্যাকিং কোড পান।\n২. **স্বচ্ছ ব্যয়ের চিত্র:** কোড দিয়ে লগইন করে দাতা দেখতে পারেন তার টাকার কত অংশ এতিমের খাবার বা কিতাব কেনায় খরচ হয়েছে।\n৩. **লিল্লাহ বোর্ডিং হিসাব:** যাকাত ফান্ডের আলাদা শরীয়তসম্মত তদারকি।`,
        actionLink: { href: '/donor', label: 'ডোনার পোর্টাল দেখুন' },
      };
    }

    // 17. ROUTINE & WEAK STUDENTS
    if (q.includes('রুটিন') || q.includes('সময়সূচী') || q.includes('দুর্বল ছাত্র') || q.includes('মুতালাআ')) {
      return {
        text: `মাদরাসার সফল রুটিন ও দুর্বল ছাত্রদের সফলভাবে গড়ে তোলার উপায়:\n\n১. **তাহাজ্জুদ ও ফজর:** ফজরের পর কুরআন তিলাওয়াত ও সবক আদায়।\n২. **সকাল ৭:৩০ - ১২:৪৫:** নিয়মিত দরস ও কিতাব পাঠদান।\n৩. **মাগরিব থেকে এশা (মুতালাআ):** আগামীকালের পাঠের পূর্বপ্রস্তুতি।\n৪. **দুর্বল ছাত্রদের যত্ন:** শারীরিক প্রহার পরিহার করে সান্ধ্যকালীন আলাদা হালকায় স্নেহশীল উস্তাদ দিয়ে দুর্বল ছাত্রদের সবক আদায় করা।`,
      };
    }

    // 18. EXPLORE PORTAL
    if (q.includes('এক্সপ্লোরার') || q.includes('explore') || q.includes('তৃতীয় পক্ষ') || q.includes('৩য় পক্ষ') || q.includes('পাবলিক') || q.includes('ভালো দিক')) {
      return {
        text: `নূরহাবের "উন্মুক্ত এক্সপ্লোরার পোর্টাল" (/explore) ৩য় পক্ষের দর্শক ও অভিভাবকদের জন্য তৈরি:\n\n১. **পাসওয়ার্ড ছাড়া প্রবেশ:** দেশের যেকোনো প্রান্ত থেকে যে কেউ প্রতিষ্ঠানের সিলেবাস ও কিতাব দেখতে পারে।\n২. **কিতাবের সারসংক্ষেপ:** প্রতিটি কিতাবের গুরুত্ব ও শিখনফল বিস্তারিত প্রদর্শিত।\n৩. **প্রতিষ্ঠানের ভালো দিক এডিট:** প্রতিষ্ঠানের প্রোফাইল এবং "আমাদের অনন্য বৈশিষ্ট্য" সেকশনে [এডিট] বাটন দিয়ে অর্জন ও সুযোগ-সুবিধা আপডেট করা যায়।`,
        actionLink: { href: '/explore', label: 'উন্মুক্ত এক্সপ্লোরার দেখুন' },
      };
    }

    // 19. Natural conversational response for open topics (Zero boilerplate!)
    const cleanSubject = query.replace(/[?।!]/g, '').trim();
    return {
      text: `মুহতারাম, আপনার জিজ্ঞাসা "${cleanSubject}"-এর বিষয়ে:\n\nদ্বীনি শিক্ষা প্রতিষ্ঠানের প্রশাসনিক শৃঙ্খলা ও শিক্ষাগত মানোন্নয়নে বিষয়টি অত্যন্ত গুরুত্বপূর্ণ। নূরহাব প্ল্যাটফর্মে আপনি সংশ্লিষ্ট মডিউল (যেমন: শ্রেণি ব্যবস্থাপনা, হাজিরা, হোয়াটসঅ্যাপ নোটিশ বা অর্থ বিভাগ) ব্যবহার করে বাস্তব সমাধান পেতে পারেন।\n\nএই বিষয়ে আপনি কি কোনো নির্দিষ্ট ফিচার দেখতে চান? নাম বলুন, আমি সরাসরি লিঙ্ক সহ বুঝিয়ে দিচ্ছি।`,
      actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ডে যান' },
    };
  };

  const handleSend = async (textToSend?: string) => {
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

    try {
      // Call backend API (handles Gemini + Comprehensive Local Engine)
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
          apiKey: geminiApiKey || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsgId = `ai-${Date.now()}`;
        const aiMsg: ChatMessage = {
          id: aiMsgId,
          sender: 'ai',
          text: data.text,
          timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
          provider: data.provider,
          actionLink: data.actionLink,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);

        // Auto speak if enabled
        if (autoSpeak) {
          handleSpeak(data.text, aiMsgId);
        }
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Client offline fallback
      const fallback = generateClientFallback(query);
      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: fallback.text,
        timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        provider: 'local-engine',
        actionLink: fallback.actionLink,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      if (autoSpeak) {
        handleSpeak(fallback.text, aiMsgId);
      }
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    setGeminiApiKey(trimmed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('noorhub_gemini_key', trimmed);
    }
    setShowSettingsModal(false);
  };

  const handleToggleAutoSpeak = () => {
    const nextVal = !autoSpeak;
    setAutoSpeak(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('noorhub_auto_speak', String(nextVal));
    }
  };

  const quickPrompts = [
    'আচ্ছা তোমার কী কী ফিচার আছে বলো তো?',
    'ভৌগোলিক মানচিত্র কীভাবে কাজ করে?',
    'উন্মুক্ত এক্সপ্লোরারে প্রতিষ্ঠানের ভালো দিক এডিট করব কীভাবে?',
    'হোয়াটসঅ্যাপে অনুপস্থিতি অ্যালার্ট কীভাবে পাঠাব?',
    'সিলেবাসে কিতাব এডিট ও নতুন বই যোগের নিয়ম কী?',
    'হিফজুল কুরআনের সবক ও আমুখতা ট্র্যাকিং কী?',
    'মাদরাসার দুর্বল ছাত্রদের কীভাবে পড়াব?',
    'লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের সঠিক নিয়ম কী?',
  ];

  return (
    <div style={{ padding: '0.85rem', maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 6.5rem)', fontFamily: 'Hind Siliguri, sans-serif' }}>
      
      {/* Top Header with Voice & AI Settings Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          paddingBottom: '0.75rem',
          borderBottom: '1.5px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.85rem',
              height: '2.85rem',
              borderRadius: '0.85rem',
              background: 'linear-gradient(135deg, #16a34a, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
              <path d="M19 10v3a7 7 0 0 1-14 0v-3" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                নূর এআই (Noor AI) বুদ্ধিমান সহকারী
              </h1>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: geminiApiKey ? '#eff6ff' : '#f0fdf4',
                  color: geminiApiKey ? '#1d4ed8' : '#16a34a',
                  border: geminiApiKey ? '1px solid #bfdbfe' : '1px solid #bbf7d0',
                }}
              >
                {geminiApiKey ? '🧠 জেমিনি এআই সংযুক্ত' : '⚡ নূরহাব সুপার ইঞ্জিন (আনলিমিটেড)'}
              </span>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', margin: '0.15rem 0 0' }}>
              নূরহাবের ১৫টি মডিউল, দ্বীনি কারিকুলাম, কিতাব এডিট, রুটিন ও ফতোয়ার সার্বক্ষণিক বিশ্বস্ত গাইড
            </p>
          </div>
        </div>

        {/* Header Action Controls */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Prominent Live Voice Button */}
          <button
            type="button"
            onClick={handleToggleListening}
            style={{
              background: isListening ? '#dc2626' : '#16a34a',
              border: 'none',
              color: '#ffffff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: isListening ? '0 0 14px rgba(220, 38, 38, 0.6)' : '0 2px 8px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            {isListening ? 'কথা বলা বন্ধ করুন' : '🎙️ মুখে বাংলায় বলুন'}
          </button>

          {/* Auto-Speak Toggle */}
          <button
            type="button"
            onClick={handleToggleAutoSpeak}
            style={{
              background: autoSpeak ? '#f0fdf4' : '#f8fafc',
              border: autoSpeak ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
              color: autoSpeak ? '#16a34a' : '#64748b',
              padding: '0.4rem 0.7rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            title="নূর এআই উত্তর দিলে স্বয়ংক্রিয়ভাবে পড়ে শোনাবে"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            {autoSpeak ? 'অটো-ভয়েস চালু' : 'অটো-ভয়েস বন্ধ'}
          </button>

          {/* AI Settings Button */}
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#334155',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
            title="গুগল জেমিনি এআই কী বা মডেল পরিবর্তন করুন"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            মডেল সেটিংস
          </button>

          {/* Reset Chat */}
          <button
            type="button"
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setSpeakingId(null);
              setMessages([messages[0]]);
            }}
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#64748b',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            রিসেট
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
              padding: '0.35rem 0.8rem',
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

      {/* Active Voice Listening Glowing Banner */}
      {isListening && (
        <div
          style={{
            background: 'linear-gradient(135deg, #fef2f2, #fff1f2)',
            border: '2px solid #ef4444',
            borderRadius: '12px',
            padding: '0.85rem 1.25rem',
            marginBottom: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)',
            animation: 'pulse 1.5s infinite',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#dc2626', display: 'inline-block', boxShadow: '0 0 10px #dc2626' }}></span>
              <span style={{ fontWeight: '800', color: '#b91c1c', fontSize: '0.9rem' }}>
                মাইক্রোফোন সক্রিয় আছে... মুখে বাংলায় আপনার প্রশ্ন বলুন...
              </span>
            </div>
            <button
              onClick={() => {
                if (recognitionRef.current) recognitionRef.current.stop();
                setIsListening(false);
              }}
              style={{ background: '#dc2626', color: '#ffffff', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.775rem', fontWeight: '700', cursor: 'pointer' }}
            >
              বলা শেষ (থামুন)
            </button>
          </div>

          {/* Real-time Interim Voice Transcription */}
          <div style={{ background: '#ffffff', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #fecaca', minHeight: '1.8rem', color: '#0f172a', fontSize: '0.875rem' }}>
            {interimTranscript ? (
              <span style={{ fontWeight: '600' }}>&ldquo;{interimTranscript}&rdquo;</span>
            ) : (
              <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>আপনার কথা শুনছি... কথা বলা শেষ হলে স্বয়ংক্রিয়ভাবে পাঠিয়ে উত্তর দেওয়া হবে...</span>
            )}
          </div>
        </div>
      )}

      {/* Voice Error Notification Banner */}
      {voiceError && (
        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            color: '#b45309',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>⚠️ {voiceError}</span>
          <button
            onClick={() => setVoiceError(null)}
            style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Messages Feed */}
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
                  padding: '1.1rem 1.25rem',
                  borderRadius: isUser ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
                  background: isUser ? '#16a34a' : '#ffffff',
                  color: isUser ? '#ffffff' : '#0f172a',
                  border: isUser ? 'none' : '1.5px solid #e2e8f0',
                  fontSize: '0.915rem',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {/* AI Provider Tag */}
                {!isUser && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1px dashed #e2e8f0' }}>
                    <span style={{ fontSize: '0.675rem', fontWeight: '800', color: m.provider === 'gemini' ? '#2563eb' : '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {m.provider === 'gemini' ? '🧠 GOOGLE GEMINI AI' : '⚡ NOORHUB INTELLIGENT AI'}
                    </span>
                  </div>
                )}

                {/* Message Content */}
                {m.text}

                {/* Action Link */}
                {m.actionLink && (
                  <div style={{ marginTop: '0.9rem', paddingTop: '0.75rem', borderTop: '1px dashed #cbd5e1' }}>
                    <Link
                      href={m.actionLink.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.45rem 0.95rem',
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
                  <div style={{ marginTop: '0.7rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSpeak(m.text, m.id)}
                      style={{
                        background: isSpeaking ? '#fee2e2' : '#f1f5f9',
                        border: isSpeaking ? '1px solid #fca5a5' : '1px solid #cbd5e1',
                        color: isSpeaking ? '#dc2626' : '#334155',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease',
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
                          🔊 মুখে পড়ে শোনান
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.85rem', padding: '0.5rem', fontWeight: '700' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', animation: 'ping 1s infinite' }}></span>
            নূর এআই সম্পূর্ণ জ্ঞান বিশ্লেষণ করে উত্তর প্রস্তুত করছে...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Dedicated Voice Mic Button */}
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
            placeholder="নূর এআই-কে যেকোনো কিছু জিজ্ঞাসা করুন (বা মাইক বাটনে মুখে বাংলায় বলুন)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.925rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none' }}
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
              width: '2.85rem',
              height: '2.85rem',
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
            width: '2.85rem',
            height: '2.85rem',
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

      {/* AI Settings & Google Gemini Key Modal */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '32rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  এআই মডেল ও জেমিনি সেটিংস
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              নূর এআই ডিফল্টভাবে আমাদের নিজস্ব <strong>নূরহাব সুপার ইন্টেলিজেন্ট ইঞ্জিনের</strong> মাধ্যমে আনলিমিটেড এবং সম্পূর্ণ বিনামূল্যে সকল প্রশ্নের নিখুঁত উত্তর দেয়।
              <br /><br />
              আপনি যদি গুগল জেমিনির (Google Gemini 1.5 / 2.0 Flash) ক্লাউড বুদ্ধিমত্তা যুক্ত করতে চান, তবে নিচে আপনার ফ্রি Gemini API Key প্রদান করতে পারেন:
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                Google Gemini API Key:
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.875rem' }}
              />
              <div style={{ marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
                >
                  👉 এখান থেকে ফ্রি জেমিনি এআই কী নিন (Google AI Studio)
                </a>
                {tempApiKey && (
                  <button
                    onClick={() => setTempApiKey('')}
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    কী মুছে ফেলুন
                  </button>
                )}
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.775rem', color: '#64748b' }}>
              💡 <strong>টিপস:</strong> কোনো এআই কী না থাকলেও কোনো সমস্যা নেই! নূরহাবের অন্তর্নির্মিত নলেজবেজ আপনার মাদরাসা পরিচালনা, রুটিন, সিলেবাস এডিট, হিফজ ট্র্যাকিং ও সবক সংক্রান্ত সব প্রশ্নের গভীর উত্তর দিতে প্রস্তুত।
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}
              >
                বাতিল
              </button>
              <button
                onClick={handleSaveApiKey}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#ffffff', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 6px rgba(22, 163, 74, 0.3)' }}
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
