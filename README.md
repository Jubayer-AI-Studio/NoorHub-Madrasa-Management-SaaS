<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=10,61,98,6,82,221&height=220&section=header&text=NoorHub%20(নূরহাব)%20✨&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Universal%20Islamic%20Education%20Management%20%26%20Cloud%20SaaS%20Platform&descFontSize=19&descAlignY=62" width="100%"/>

  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-mobile-pwa">Mobile PWA</a>
  </p>

  [![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
  [![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-8E75C2?style=for-the-badge&logo=google)](https://ai.google.dev/)
</div>

---

## 🌟 Overview

**NoorHub (নূরহাব)** is an enterprise-grade, modern, and bilingual (**বাংলা ⇄ English**) Islamic Education Management & Cloud SaaS platform. Designed specifically for contemporary Islamic institutes, Madrasas, and community academies, NoorHub provides end-to-end administration including student & faculty lifecycle management, high-resolution student ID card generation, geographical GIS mapping of institutions across Bangladesh, interactive syllabus tracking, finance & donations, and an integrated AI assistant (**Noor AI**).

---

## 🚀 Key Features

### 1. 🪪 Digital Student ID Card Center (`/dashboard/students`)
* **Dual Orientations:** Premium Portrait (Lanyard Hanging) and Landscape (Executive) ID card modes.
* **Themes:** 3 royal aesthetic themes (Emerald Gold, Royal Navy Blue, and Majestic Maroon).
* **Automated QR & Barcodes:** Real-time generation of QR codes and barcodes for rapid attendance scanning.
* **Instant Export:** High-DPI bulk printing, PDF generation, and Excel/CSV exports.
* **Direct Communication:** 1-tap guardian phone calling and WhatsApp messaging integration.

### 2. 🗺️ Dual Geographic GIS Mapping System (`/dashboard/map` & `/explore`)
* **Vector SVG Map:** Native interactive vector SVG map of Bangladesh featuring all 8 administrative divisions and 64 districts.
* **Leaflet GIS Map:** Deep drill-down satellite & street map tiles with institutional markers, cluster statistics, and geo-search.

### 3. 🤖 Noor AI Assistant (`/dashboard/ai`)
* **Google Gemini Integration:** Real-time cloud-backed knowledge generation for curriculum management and institutional administration.
* **Intelligent Offline Mode:** Built-in fallback knowledge base of 200+ canonical Q&A entries for Hifz routines, syllabus standards, and madrasa bylaws.
* **Voice Capabilities:** Dual-direction speech interface with Speech-to-Text (Bengali Voice Typing) and Text-to-Speech (Bengali Voice Speaker).

### 4. 🌐 Dynamic Bilingual Experience (বাংলা ⇄ English)
* Instant global language switching across all 29 routes without page reloads.
* Smart Bengali numerical parsing (e.g. `০১২৩৪৫৬৭৮৯` ⇄ `0123456789`).

### 5. 📱 Progressive Web App (PWA) Offline Architecture
* 1-Tap installation prompt for Android and iOS Safari.
* Service Worker caching (`sw.js`) enabling offline navigation and dashboard resilience.
* Responsive design adaptive across ultra-wide monitors, tablets, and smartphones.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons, Custom Animated Brand SVGs |
| **Database & ORM** | Drizzle ORM, Supabase / PostgreSQL Ready |
| **Mapping & GIS** | Leaflet.js, React-Leaflet, Custom GeoJSON Boundaries |
| **Artificial Intelligence** | Google Gemini AI Flash Engine, Web Speech API |
| **Mobile & Offline** | Web App Manifest, Service Workers, PWA Caching |

---

## 📂 Project Structure

```bash
NOORHUB/
├── src/
│   ├── app/
│   │   ├── dashboard/          # 29+ Core management views (students, teachers, finance, etc.)
│   │   ├── api/                # Next.js Serverless API endpoints (Gemini AI, Auth)
│   │   ├── explore/            # Public GIS map & institutional directory
│   │   └── donor/              # Transparent donation & sponsor portal
│   ├── components/
│   │   ├── brand/              # Brand identity, vector logos, animated splash
│   │   ├── map/                # Bangladesh Vector Map & Leaflet GIS components
│   │   └── students/           # ID card generator, QR modals, data tables
│   └── lib/                    # Language stores, ORM schemas, geo utilities
├── public/                     # High-res icons, GeoJSON map files, audio assets
├── next.config.js              # Next.js configuration & PWA headers
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
* **Node.js**: v18.18.0 or newer
* **npm** or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS.git
   cd NoorHub-Madrasa-Management-SaaS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your optional Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 👤 Author

* **Developer:** [Jubayer Ahmad](https://github.com/Jubayer-AI-Studio)
* **Email:** [jubayerahmadaistudio@gmail.com](mailto:jubayerahmadaistudio@gmail.com)
* **Location:** Dhaka, Bangladesh 🇧🇩

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
