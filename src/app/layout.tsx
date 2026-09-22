import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'নূরহাব — মাদরাসা ম্যানেজমেন্ট প্ল্যাটফর্ম',
    template: '%s | নূরহাব',
  },
  description: 'কওমি, আলিয়া, হিফজ ও সকল শিক্ষা প্রতিষ্ঠানের জন্য আধুনিক ডিজিটাল ম্যানেজমেন্ট সিস্টেম',
  keywords: ['মাদরাসা', 'নূরহাব', 'madrasa', 'NoorHub', 'school management', 'hifz tracker'],
  authors: [{ name: 'NoorHub Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'নূরহাব',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'নূরহাব — মাদরাসা ম্যানেজমেন্ট প্ল্যাটফর্ম',
    description: 'সকল শিক্ষা প্রতিষ্ঠানের জন্য আধুনিক ডিজিটাল ম্যানেজমেন্ট',
    siteName: 'NoorHub',
  },
};

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,      // মোবাইলে accidental zoom বন্ধ
  userScalable: false,
  viewportFit: 'cover', // iPhone notch support
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" dir="ltr">
      <head>
        {/* PWA & Mobile Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Leaflet GIS CSS for Mobile & Desktop */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    reg.update();
                  }).catch(function(err) {
                    console.log('SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
