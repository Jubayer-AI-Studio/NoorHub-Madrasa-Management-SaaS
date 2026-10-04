const https = require('https');

https.get('https://left-eight-mattress-fiscal.trycloudflare.com/dashboard/map', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    const css = b.match(/href="(\/_next\/static\/css\/[^"]+)"/g);
    console.log('CSS matches:', css);
    if (css) {
      css.forEach(link => {
        const u = link.replace('href="', '').replace('"', '');
        https.get('https://left-eight-mattress-fiscal.trycloudflare.com' + u, cr => {
          console.log(u, 'status:', cr.statusCode, 'size:', cr.headers['content-length']);
        });
      });
    }
  });
});
