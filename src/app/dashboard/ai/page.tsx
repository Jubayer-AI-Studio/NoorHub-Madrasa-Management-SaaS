'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-store';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  provider?: 'groq' | 'gemini' | 'local-engine' | 'fallback';
  model?: string;
  actionLink?: {
    href: string;
    label: string;
  };
}

export default function NoorAIPage() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ! আমি "নূর এআই" (Noor AI)—নূরহাবের ৩ডি এআই সহকারী। নূরহাবের সকল ১৫টি মডিউল, কওমি দরসে নেজামী কারিকুলাম, হিফজের ৩ সবক ও আমুখতা, রুটিন, দুর্বল ছাত্র যত্ন, হিসাব-নিকাশ ও যাকাত ফান্ড—যেকোনো বিষয়ে আমাকে মুখে বাংলায় বলে বা লিখে প্রশ্ন করতে পারেন। আমি আপনাকে পুঙ্খানুপুঙ্খ সমাধান দেব।',
      timestamp: 'এখনই',
      provider: 'groq',
      actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ড দেখুন' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Robot Mascot States
  const [showRobotBubble, setShowRobotBubble] = useState(true);
  const [robotMood, setRobotMood] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // API Key & Settings Modal
  const [groqApiKey, setGroqApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempGroqKey, setTempGroqKey] = useState('');
  const [tempGeminiKey, setTempGeminiKey] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Update robot mood based on active states
  useEffect(() => {
    if (isListening) {
      setRobotMood('listening');
    } else if (speakingId) {
      setRobotMood('speaking');
    } else if (isTyping) {
      setRobotMood('thinking');
    } else {
      setRobotMood('idle');
    }
  }, [isListening, speakingId, isTyping]);

  // Load API keys and preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGroqKey = localStorage.getItem('noorhub_groq_key') || '';
      const savedGeminiKey = localStorage.getItem('noorhub_gemini_key') || '';
      const savedAutoSpeak = localStorage.getItem('noorhub_auto_speak') === 'true';

      setGroqApiKey(savedGroqKey);
      setTempGroqKey(savedGroqKey);
      setGeminiApiKey(savedGeminiKey);
      setTempGeminiKey(savedGeminiKey);
      setAutoSpeak(savedAutoSpeak);

      // Auto-clear legacy service-worker caches if any
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            if (name.includes('v1') || name.includes('v2')) {
              caches.delete(name);
            }
          });
        });
      }
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
      setVoiceError(
        isEn
          ? 'Speech recognition is not supported in this browser. Please use Chrome or Edge.'
          : 'আপনার ব্রাউজারে স্পিচ রিকগনিশন সমর্থন করে না। অনুগ্রহ করে গুগল ক্রোম বা এজ ব্রাউজার ব্যবহার করুন।'
      );
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
      recognition.lang = 'bn-BD';
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
          setVoiceError(
            isEn
              ? 'Microphone permission denied. Please allow microphone in browser.'
              : 'মাইক্রোফোন ব্যবহারের অনুমতি পাওয়া যায়নি। ব্রাউজারের অ্যাড্রেস বার থেকে Allow করুন।'
          );
        } else if (event.error === 'no-speech') {
          setVoiceError(
            isEn
              ? 'No speech detected. Please speak clearly into the microphone.'
              : 'কোনো কথা শোনা যায়নি। অনুগ্রহ করে স্পষ্ট করে বলুন।'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceError(
        isEn
          ? 'Failed to start microphone. Please refresh the page.'
          : 'মাইক্রোফোন চালু করতে সমস্যা হয়েছে। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।'
      );
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

    // Clean markdown, emojis and symbols for smooth voice pronunciation
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.95;
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

  // Offline Client Fallback Engine
  const generateClientFallback = (query: string): { text: string; actionLink?: { href: string; label: string } } => {
    const q = query.toLowerCase().trim();

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

    if (
      q.includes('ফিচার') ||
      q.includes('কী কী আছে') ||
      q.includes('কি কি আছে') ||
      q.includes('কী আছে') ||
      q.includes('কি আছে') ||
      q.includes('সুবিধা') ||
      q.includes('কী করতে পারো') ||
      q.includes('কাজ কি') ||
      q.includes('লিস্ট')
    ) {
      return {
        text: `নূরহাব (NoorHub) প্ল্যাটফর্মে মোট ১৫টি আধুনিক শক্তিশালী ফিচার ও মডিউল রয়েছে:\n\n` +
          `১. 🗺️ **ভৌগোলিক GIS মানচিত্র (/dashboard/map):** ৮টি বিভাগের বাস্তব সীমারেখা সহ কওমি, হিফজ ও আলিয়া মাদরাসার রিয়েল-টাইম GPS রাডার পিন ও ভাসমান প্রোফাইল কার্ড।\n` +
          `২. 🌐 **উন্মুক্ত এক্সপ্লোরার পোর্টাল (/explore):** পাসওয়ার্ড ছাড়া ৩য় পক্ষ ও অভিভাবকদের জন্য জামাত ও কিতাবের তথ্য এবং প্রতিষ্ঠানের অনন্য অর্জনের উন্মুক্ত প্রদর্শনী।\n` +
          `৩. 📚 **সিলেবাস ও কিতাব ব্যবস্থাপনা (/dashboard/syllabus):** দরসে নেজামী, আলিয়া ও হিফজের পূর্ণাঙ্গ কিতাব তালিকা, নতুন কিতাব এন্ট্রি ও যেকোনো কিতাবের তথ্য এডিট।\n` +
          `৪. 🏫 **শ্রেণি ও জামাত ব্যবস্থাপনা (/dashboard/classes):** নতুন জামাত এন্ট্রি, শাখা ও দায়িত্বপ্রাপ্ত উস্তাদ নির্ধারণ এবং প্রতিটি ক্লাসের তথ্য এডিট।\n` +
          `৫. 💬 **হোয়াটসঅ্যাপ ও মেসেঞ্জার অভিভাবক হাব (/dashboard/automation):** সকাল ১০:০০ টায় অনুপস্থিত ছাত্রদের স্বয়ংক্রিয় হোয়াটসঅ্যাপ অ্যালার্ট, পরীক্ষার ফলাফল সম্প্রচার ও বকেয়া বেতন তাগাদা।\n` +
          `৬. 📝 **১-ক্লিক ডিজিটাল হাজিরা ও ওটিপি-মুক্ত ছুটি (/dashboard/attendance):** ক্লাসে মাত্র ৩০ সেকেন্ডে হাজিরা এবং অভিভাবকের ছুটির আবেদন ১-ট্যাপে মঞ্জুর।\n` +
          `৭. 🏆 **পরীক্ষা ফলাফল ও মেধা তালিকা (/dashboard/results):** কওমি গ্রেডিং (মুমতাজ, জাইয়্যিদ জিদ্দান, জাইয়্যিদ, মাকবুল) ও আলিয়া গ্রেডিং সমন্বয়ে তৈরি মেধা তালিকা ও মার্কশিট প্রিন্ট।\n` +
          `৮. 💰 **অর্থ ও শিক্ষক বেতন ব্যবস্থাপনা (/dashboard/finance):** ছাত্র ফি আদায়, শিক্ষকদের এক ক্লিকে বেতন পরিশোধ, ব্যাংক জমা ও এক্সেল লেজার।\n` +
          `৯. 🤝 **স্বচ্ছ ডোনার ট্র্যাকিং পোর্টাল (/donor):** প্রবাসী ও দাতাদের জন্য গোপন ট্র্যাকিং কোডের মাধ্যমে লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের বাস্তব ব্যয় বিবরণী।\n` +
          `১০. 📖 **হিফজুল কুরআন ট্র্যাকার [/dashboard/hifz]:** ৩০ পারার প্রগ্রেস বার, দৈনিক ৩ সবক (সবক, সবকি, আমুখতা/দৌর) ট্র্যাকিং ও অভিভাবকের জন্য সবক ডায়েরি।\n` +
          `১১. 👨‍👩‍👦 **অভিভাবক পোর্টাল (/dashboard/parent):** সন্তানের লাইভ হাজিরা, মার্কশিট, অনলাইন ফি পেমেন্ট ও ছুটির আবেদন।\n` +
          `১২. ⭐ **প্রতিযোগিতা ও ব্লু ভেরিফাইড ব্যাজ (/dashboard/competition):** ৪টি মানদণ্ডে স্কোরিং ও শীর্ষ মাদরাসাসমূহের জন্য ব্লু টিক।\n` +
          `১৩. 🤖 **নূর এআই বুদ্ধিমান সহকারী (/dashboard/ai):** ৩ডি রোবট অ্যাসিস্ট্যান্ট ও লাইভ ভয়েস ইনপুট/আউটপুট সহ সার্বক্ষণিক পরামর্শক।\n` +
          `১৪. 📊 **পরিসংখ্যান ও ড্যাশবোর্ড অ্যানালিটিক্স (/dashboard):** ছাত্র, শিক্ষক, উপস্থিতি ও তহবিলের রিয়েল-টাইম তথ্য।\n` +
          `১৫. 📖 **মাদরাসা পরিচিতি ও পাঠ্যক্রম (/dashboard/showcase):** পাঠ্যক্রম, তারবিয়াত, অর্জন ও সার্বিক পরিচিতি।\n\n` +
          `আপনি যেকোনো মডিউল দেখতে চাইলে আমাকে নাম বলুন, আমি বিস্তারিত গাইড করব।`,
        actionLink: { href: '/dashboard', label: 'মূল ড্যাশবোর্ড এক্সপ্লোর করুন' },
      };
    }

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
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6),
          groqApiKey: groqApiKey || undefined,
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
          model: data.model,
          actionLink: data.actionLink,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);

        if (autoSpeak) {
          handleSpeak(data.text, aiMsgId);
        }
      } else {
        throw new Error('API request failed');
      }
    } catch {
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

  const handleSaveSettings = () => {
    const trimmedGroq = tempGroqKey.trim();
    const trimmedGemini = tempGeminiKey.trim();
    setGroqApiKey(trimmedGroq);
    setGeminiApiKey(trimmedGemini);
    if (typeof window !== 'undefined') {
      localStorage.setItem('noorhub_groq_key', trimmedGroq);
      localStorage.setItem('noorhub_gemini_key', trimmedGemini);
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

  const quickPrompts = isEn
    ? [
        'What features does NoorHub provide?',
        'How does the GIS Map work?',
        'How do I edit institutional info in Explore?',
        'How do I send WhatsApp absence alerts?',
        'How to edit kitabs and syllabus?',
        'How does Hifz Sabak & Amukhta tracking work?',
        'How can teachers support weak students?',
        'What are the guidelines for Lillah Boarding & Zakat?',
      ]
    : [
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
    <div
      style={{
        padding: '16px 20px',
        maxWidth: '1500px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 80px)',
        fontFamily: 'Hind Siliguri, sans-serif',
      }}
    >
      <style jsx global>{`
        @keyframes floatMascot {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.8deg);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(37, 99, 235, 0.25), 0 0 50px rgba(16, 185, 129, 0.15);
          }
          50% {
            box-shadow: 0 0 35px rgba(37, 99, 235, 0.45), 0 0 70px rgba(16, 185, 129, 0.3);
          }
        }
        @keyframes soundWave {
          0%, 100% { height: 6px; }
          50% { height: 22px; }
        }
        .robot-floating {
          animation: floatMascot 4s ease-in-out infinite;
        }
        .robot-glow-platform {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          paddingBottom: '0.65rem',
          borderBottom: '1.5px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.85rem',
              background: 'linear-gradient(135deg, #10b981, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
              <path d="M19 10v3a7 7 0 0 1-14 0v-3" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                {isEn ? 'Noor AI Intelligent Mascot' : 'নূর এআই (Noor AI) বুদ্ধিমান সহকারী'}
              </h1>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '999px',
                  background: '#f0fdf4',
                  color: '#15803d',
                  border: '1px solid #bbf7d0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                ⚡ Groq AI (GPT-OSS-120B) Active
              </span>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', margin: '0.15rem 0 0' }}>
              {isEn
                ? 'Your trusted 24/7 intelligent guide for NoorHub modules, curriculum, routines, and madrasa management'
                : 'নূরহাবের ১৫টি মডিউল, কওমি ও হিফজ কারিকুলাম, রুটিন, কিতাব এডিট ও মাদরাসা ফতোয়ার সার্বক্ষণিক বিশ্বস্ত গাইড'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
            {isListening ? (isEn ? 'Stop Listening' : 'কথা বলা বন্ধ করুন') : (isEn ? '🎙️ Speak Bangla' : '🎙️ মুখে বাংলায় বলুন')}
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
            title={isEn ? 'Automatically read out Noor AI replies' : 'নূর এআই উত্তর দিলে স্বয়ংক্রিয়ভাবে পড়ে শোনাবে'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            {autoSpeak ? (isEn ? 'Auto-Voice ON' : 'অটো-ভয়েস চালু') : (isEn ? 'Auto-Voice OFF' : 'অটো-ভয়েস বন্ধ')}
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
            title={isEn ? 'Groq & Gemini AI API Settings' : 'গ্রক ও জেমিনি এআই এপিআই সেটিংস'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            {isEn ? 'AI Settings' : 'এআই সেটিংস'}
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
            {isEn ? 'Reset' : 'রিসেট'}
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
          flex: 1,
          minHeight: 0,
        }}
        className="noor-ai-main-grid"
      >
        {/* ======================================================== */}
        {/* LEFT COLUMN: 300px VISUAL 3D ROBOT ASSISTANT MASCOT      */}
        {/* ======================================================== */}
        <div
          style={{
            maxWidth: '350px',
            width: '100%',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1.25rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Islamic geometric background accent */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Status Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background:
                robotMood === 'listening'
                  ? '#fee2e2'
                  : robotMood === 'speaking'
                  ? '#e0e7ff'
                  : robotMood === 'thinking'
                  ? '#fef3c7'
                  : '#f0fdf4',
              border:
                robotMood === 'listening'
                  ? '1.5px solid #f87171'
                  : robotMood === 'speaking'
                  ? '1.5px solid #818cf8'
                  : robotMood === 'thinking'
                  ? '1.5px solid #fcd34d'
                  : '1.5px solid #86efac',
              fontSize: '0.785rem',
              fontWeight: '700',
              color:
                robotMood === 'listening'
                  ? '#b91c1c'
                  : robotMood === 'speaking'
                  ? '#4338ca'
                  : robotMood === 'thinking'
                  ? '#b45309'
                  : '#15803d',
              transition: 'all 0.3s ease',
              zIndex: 2,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background:
                  robotMood === 'listening'
                    ? '#dc2626'
                    : robotMood === 'speaking'
                    ? '#4f46e5'
                    : robotMood === 'thinking'
                    ? '#d97706'
                    : '#16a34a',
                display: 'inline-block',
                boxShadow:
                  robotMood === 'listening'
                    ? '0 0 8px #dc2626'
                    : robotMood === 'speaking'
                    ? '0 0 8px #4f46e5'
                    : 'none',
              }}
            />
            {robotMood === 'listening' && (isEn ? 'Listening to voice...' : 'শুনছি... মুখে বলুন')}
            {robotMood === 'speaking' && (isEn ? 'Speaking out aloud...' : 'পড়ে শোনাচ্ছি...')}
            {robotMood === 'thinking' && (isEn ? 'Analyzing knowledge...' : 'চিন্তা করছি...')}
            {robotMood === 'idle' && (isEn ? 'Noor AI Ready & Online' : 'নূর এআই প্রস্তুত ও সক্রিয়')}
          </div>

          {/* Interactive Speech Bubble with Close Toggle */}
          {showRobotBubble && (
            <div
              style={{
                position: 'relative',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '14px',
                padding: '0.65rem 0.95rem',
                fontSize: '0.825rem',
                color: '#1e293b',
                fontWeight: '600',
                marginTop: '0.75rem',
                marginBottom: '0.25rem',
                width: '94%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                zIndex: 3,
                textAlign: 'center',
                lineHeight: '1.4',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: '800', letterSpacing: '0.5px' }}>
                  ● NOOR AI ASSISTANT
                </span>
                <button
                  type="button"
                  onClick={() => setShowRobotBubble(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    lineHeight: '1',
                    padding: '0 0.2rem',
                  }}
                  title="Close Bubble"
                >
                  ✕
                </button>
              </div>
              {robotMood === 'listening' ? (
                <span style={{ color: '#dc2626' }}>
                  &ldquo;মুখে বাংলায় বলুন, আমি গভীর মনোযোগ দিয়ে শুনছি...&rdquo;
                </span>
              ) : robotMood === 'speaking' ? (
                <span style={{ color: '#2563eb' }}>
                  &ldquo;উত্তরটি আপনার সুবিধার্থে পড়ে শোনাচ্ছি...&rdquo;
                </span>
              ) : robotMood === 'thinking' ? (
                <span style={{ color: '#d97706' }}>
                  &ldquo;নূরহাবের সকল মডিউল ও ডাটা যাচাই করছি...&rdquo;
                </span>
              ) : (
                <span>
                  &ldquo;Ask me anything! নূরহাবের যেকোনো মডিউল, কিতাব বা রুটিন সম্পর্কে আমাকে প্রশ্ন করুন।&rdquo;
                </span>
              )}
              {/* Bubble Triangle pointer */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '12px',
                  background: '#ffffff',
                  borderRight: '1.5px solid #cbd5e1',
                  borderBottom: '1.5px solid #cbd5e1',
                  rotate: '45deg',
                }}
              />
            </div>
          )}

          {/* 300px VISUAL ROBOT ASSISTANT */}
          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.5rem 0',
            }}
          >
            {/* Glowing Aura Ring / Energy Pedestal under robot */}
            <div
              className="robot-glow-platform"
              style={{
                position: 'absolute',
                bottom: '15px',
                width: '240px',
                height: '50px',
                borderRadius: '50%',
                background:
                  robotMood === 'listening'
                    ? 'radial-gradient(ellipse, rgba(239,68,68,0.35) 0%, rgba(239,68,68,0) 70%)'
                    : robotMood === 'speaking'
                    ? 'radial-gradient(ellipse, rgba(37,99,235,0.4) 0%, rgba(16,185,129,0.2) 70%)'
                    : 'radial-gradient(ellipse, rgba(16,185,129,0.3) 0%, rgba(37,99,235,0.2) 70%)',
                zIndex: 1,
              }}
            />

            {/* Sound Wave Equalizer during speaking or listening */}
            {(robotMood === 'speaking' || robotMood === 'listening') && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                  zIndex: 4,
                  background: 'rgba(255, 255, 255, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {[0.2, 0.4, 0.1, 0.5, 0.3].map((delay, i) => (
                  <span
                    key={i}
                    style={{
                      width: '3px',
                      background: robotMood === 'listening' ? '#dc2626' : '#2563eb',
                      borderRadius: '2px',
                      animation: `soundWave 0.8s ease-in-out ${delay}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* 300px Robot Image with Floating Animation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/noor-ai-robot.png"
              alt="Noor AI 3D Robot Assistant"
              width={300}
              height={300}
              className="robot-floating"
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain',
                zIndex: 2,
                cursor: 'pointer',
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))',
                transition: 'transform 0.2s ease',
              }}
              title="Noor AI Robot - Click to say Salam!"
              onClick={() => {
                setShowRobotBubble(true);
                handleSpeak(
                  'আস-সালামু আলাইকুম! আমি নূর এআই। নূরহাব ও মাদরাসা বিষয়ে আমাকে মুখে বা লিখে যেকোনো প্রশ্ন করতে পারেন।',
                  'robot-click'
                );
              }}
            />
          </div>

          {/* Robot Bottom Info Badge & Quick Chips */}
          <div style={{ width: '100%', textAlign: 'center', zIndex: 2 }}>
            <div
              style={{
                fontSize: '0.785rem',
                fontWeight: '700',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                marginBottom: '0.5rem',
              }}
            >
              <span>🤖 নূরহাব ৩ডি সহকারী</span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ color: '#16a34a' }}>৩০০ পিক্সেল ভিজ্যুয়াল</span>
            </div>

            {/* Quick action chips on robot side */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleSend('নূরহাবের ১৫টি মূল ফিচার কী কী?')}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                ১৫টি ফিচার 📋
              </button>
              <button
                type="button"
                onClick={() => handleSend('হিফজুল কুরআনের সবক ও আমুখতা কীভাবে ট্র্যাকিং করব?')}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                হিফজ ট্র্যাকার 📖
              </button>
              <button
                type="button"
                onClick={() => handleSend('ভৌগোলিক GIS মানচিত্রের সুবিধা কী?')}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                GIS মানচিত্র 🗺️
              </button>
              <button
                type="button"
                onClick={() => handleSend('হোয়াটসঅ্যাপে অনুপস্থিতি নোটিশ কীভাবে পাঠাব?')}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                হোয়াটসঅ্যাপ 💬
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: INTERACTIVE CONVERSATION CHAT FEED         */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '20px',
            padding: '1rem 1.25rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Quick Prompts Slider */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              paddingBottom: '0.45rem',
              marginBottom: '0.65rem',
              scrollbarWidth: 'none',
              borderBottom: '1px dashed #e2e8f0',
            }}
          >
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

          {/* Active Voice Listening Banner */}
          {isListening && (
            <div
              style={{
                background: 'linear-gradient(135deg, #fef2f2, #fff1f2)',
                border: '2px solid #ef4444',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                marginBottom: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#dc2626',
                      display: 'inline-block',
                      boxShadow: '0 0 10px #dc2626',
                    }}
                  />
                  <span style={{ fontWeight: '800', color: '#b91c1c', fontSize: '0.85rem' }}>
                    {isEn ? 'Microphone is active... Please speak your question...' : 'মাইক্রোফোন সক্রিয় আছে... মুখে বাংলায় আপনার প্রশ্ন বলুন...'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (recognitionRef.current) recognitionRef.current.stop();
                    setIsListening(false);
                  }}
                  style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  {isEn ? 'Done (Stop)' : 'বলা শেষ (থামুন)'}
                </button>
              </div>

              {/* Real-time Interim Transcription */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  minHeight: '1.8rem',
                  color: '#0f172a',
                  fontSize: '0.85rem',
                }}
              >
                {interimTranscript ? (
                  <span style={{ fontWeight: '600' }}>&ldquo;{interimTranscript}&rdquo;</span>
                ) : (
                  <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                    {isEn
                      ? 'Listening to your voice... Answer will be generated automatically when finished...'
                      : 'আপনার কথা শুনছি... কথা বলা শেষ হলে স্বয়ংক্রিয়ভাবে উত্তর আসবে...'}
                  </span>
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
                padding: '0.55rem 0.9rem',
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
                type="button"
                onClick={() => setVoiceError(null)}
                style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat Messages Feed */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
              paddingRight: '0.35rem',
              marginBottom: '0.75rem',
            }}
          >
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
                      maxWidth: '90%',
                      padding: '1rem 1.15rem',
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
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.4rem',
                          marginBottom: '0.5rem',
                          paddingBottom: '0.4rem',
                          borderBottom: '1px dashed #e2e8f0',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.675rem',
                            fontWeight: '800',
                            color: m.provider === 'groq' ? '#2563eb' : m.provider === 'gemini' ? '#7c3aed' : '#16a34a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          {m.provider === 'groq'
                            ? '⚡ GROQ AI (GPT-OSS-120B)'
                            : m.provider === 'gemini'
                            ? '🧠 GOOGLE GEMINI AI'
                            : '⚡ NOORHUB INTELLIGENT AI'}
                        </span>
                        <span style={{ fontSize: '0.675rem', color: '#94a3b8' }}>{m.timestamp}</span>
                      </div>
                    )}

                    {/* Message Content */}
                    {m.text}

                    {/* Action Link */}
                    {m.actionLink && (
                      <div style={{ marginTop: '0.85rem', paddingTop: '0.7rem', borderTop: '1px dashed #cbd5e1' }}>
                        <Link
                          href={m.actionLink.href}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
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
                      <div
                        style={{
                          marginTop: '0.65rem',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <button
                          type="button"
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
                          title={isEn ? 'Listen with Voice' : 'ভয়েসে শুনুন'}
                        >
                          {isSpeaking ? (
                            <>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                              </svg>
                              {isEn ? 'Stop Speaking' : 'পড়া বন্ধ করুন'}
                            </>
                          ) : (
                            <>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                              </svg>
                              {isEn ? '🔊 Read Aloud' : '🔊 মুখে পড়ে শোনান'}
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#2563eb',
                  fontSize: '0.85rem',
                  padding: '0.5rem',
                  fontWeight: '700',
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#2563eb',
                    display: 'inline-block',
                    animation: 'ping 1s infinite',
                  }}
                />
                {isEn
                  ? 'Noor AI is thinking & retrieving deep madrasa knowledge...'
                  : 'নূর এআই সম্পূর্ণ জ্ঞান বিশ্লেষণ করে উত্তর প্রস্তুত করছে...'}
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
                placeholder={
                  isEn
                    ? 'Ask Noor AI anything (or tap mic to speak)...'
                    : 'নূর এআই-কে যেকোনো কিছু জিজ্ঞাসা করুন (বা মাইক বাটনে মুখে বাংলায় বলুন)...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.925rem',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  outline: 'none',
                }}
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
                title={isListening ? (isEn ? 'Stop Speaking' : 'কথা বলা বন্ধ করুন') : (isEn ? 'Speak with Microphone' : 'মাইক্রোফোনে মুখে কথা বলুন')}
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
              title={isEn ? 'Send Message' : 'বার্তা পাঠান'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* AI Settings Modal */}
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
              maxWidth: '34rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>
                  {isEn ? 'AI Provider & Key Settings' : 'এআই প্রোভাইডার ও এপিআই সেটিংস'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', marginBottom: '1rem' }}>
              নূর এআই ডিফল্টভাবে আপনার প্রদত্ত <strong>Groq Cloud API Key</strong> এর মাধ্যমে অত্যন্ত দ্রুতগতিতে এবং গভীর ইসলামিক জ্ঞানে উত্তর দেয়। আপনি চাইলে নিচের ফিল্ডে পরিবর্তন করতে পারেন।
            </p>

            {/* Groq API Key Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                ⚡ Groq API Key (Pre-configured):
              </label>
              <input
                type="password"
                placeholder="gsk_..."
                value={tempGroqKey}
                onChange={(e) => setTempGroqKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                }}
              />
              <div style={{ marginTop: '0.25rem', fontSize: '0.72rem', color: '#64748b' }}>
                গ্রোক ক্লাউড কী (ঐচ্ছিক): <code style={{ background: '#f1f5f9', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>gsk_your_key_here</code>
              </div>
            </div>

            {/* Gemini API Key Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.35rem' }}>
                🧠 Google Gemini API Key (Optional Fallback):
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempGeminiKey}
                onChange={(e) => setTempGeminiKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1.25rem',
                fontSize: '0.775rem',
                color: '#64748b',
              }}
            >
              💡 <strong>টিপস:</strong> নূরহাবের নিজস্ব ইন্টেলিজেন্ট ইঞ্জিন অফলাইনেও সার্বক্ষণিক সক্রিয় থাকে যাতে ইন্টারনেট বা এপিআই ব্যাহত হলেও প্রতিষ্ঠান পরিচালনা ব্যাহত না হয়।
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Cancel' : 'বাতিল'}
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(22, 163, 74, 0.3)',
                }}
              >
                {isEn ? 'Save' : 'সেভ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
