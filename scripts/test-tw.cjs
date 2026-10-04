const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const fs = require('fs');

const cssInput = fs.readFileSync('src/app/globals.css', 'utf8');

postcss([tailwind()])
  .process(cssInput, { from: 'src/app/globals.css' })
  .then(res => {
    console.log('Result CSS length:', res.css.length);
    console.log('Has flex:', res.css.includes('.flex {'));
    console.log('Has hidden:', res.css.includes('.hidden {'));
    console.log('Has bg-white:', res.css.includes('.bg-white {'));
    console.log('Has lg\\:flex:', res.css.includes('lg:flex') || res.css.includes('lg\\:flex'));
  })
  .catch(err => console.error('PostCSS Error:', err));
