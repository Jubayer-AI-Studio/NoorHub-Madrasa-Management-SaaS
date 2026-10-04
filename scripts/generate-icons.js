const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// High-resolution SVG for NoorHub Brand Icon (Islamic Arch, Minaret, Crescent, and Book)
const svgTemplate = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46" />
      <stop offset="50%" stop-color="#047857" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="30%" stop-color="#f59e0b" />
      <stop offset="70%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#34d399" stop-opacity="0" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Squircle App Background -->
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)" />
  <rect width="504" height="504" x="4" y="4" rx="111" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-opacity="0.6" />

  <!-- Inner Soft Aura -->
  <circle cx="256" cy="230" r="170" fill="url(#glowGrad)" />

  <!-- Central Islamic Arch & Minaret Motif -->
  <g filter="url(#shadow)">
    <!-- Outer Arch -->
    <path d="M156 360 V240 C156 160 256 100 256 100 C256 100 356 160 356 240 V360 Z"
          fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Inner Arch Accent -->
    <path d="M180 360 V250 C180 185 256 135 256 135 C256 135 332 185 332 250 V360"
          fill="none" stroke="#34d399" stroke-width="4" stroke-opacity="0.5" stroke-linecap="round" />

    <!-- Minaret Dome & Spire -->
    <path d="M236 140 C236 120 256 95 256 95 C256 95 276 120 276 140 Z" fill="url(#goldGrad)" />
    <line x1="256" y1="95" x2="256" y2="70" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" />

    <!-- Golden Crescent (Hilal) -->
    <path d="M256 68 A16 16 0 1 1 268 46 A13 13 0 1 0 256 68 Z" fill="url(#goldGrad)" />

    <!-- Open Book / Quran (Rehal) Base -->
    <path d="M166 330 C206 315 246 325 256 335 C266 325 306 315 346 330 V355 C306 340 266 350 256 360 C246 350 206 340 166 355 Z"
          fill="url(#goldGrad)" />
    
    <!-- Central Light Core -->
    <circle cx="256" cy="235" r="18" fill="url(#goldGrad)" />
    <circle cx="256" cy="235" r="8" fill="#ffffff" />
  </g>

  <!-- Brand Typography -->
  <text x="256" y="430" text-anchor="middle" font-family="'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="52" letter-spacing="4" fill="#ffffff">NOOR<tspan fill="#34d399">HUB</tspan></text>
  <text x="256" y="465" text-anchor="middle" font-family="'Hind Siliguri', 'Segoe UI', sans-serif" font-weight="600" font-size="20" letter-spacing="1" fill="#fde68a">মাদরাসা ম্যানেজমেন্ট</text>
</svg>
`;

const SIZES = [
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-128x128.png', size: 128 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generate() {
  console.log('Generating NoorHub PWA Icons...');
  const baseSvg = Buffer.from(svgTemplate(512));

  for (const item of SIZES) {
    const dest = path.join(ICONS_DIR, item.name);
    await sharp(baseSvg)
      .resize(item.size, item.size)
      .png()
      .toFile(dest);
    console.log(`✓ Created ${item.name} (${item.size}x${item.size})`);
  }

  // Also create apple-touch-icon in public root if desired
  await sharp(baseSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'));

  // Also create favicon.png
  await sharp(baseSvg)
    .resize(48, 48)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));

  console.log('All icons generated successfully!');
}

generate().catch(console.error);
