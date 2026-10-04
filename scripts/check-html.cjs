const http = require('http');

http.get('http://localhost:8080/dashboard/map', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    const cssLinks = html.match(/<link[^>]*rel="stylesheet"[^>]*>/gi);
    console.log('CSS links:', cssLinks);
    const scriptLinks = html.match(/<script[^>]*src="[^"]+"[^>]*>/gi);
    console.log('Script links count:', scriptLinks ? scriptLinks.length : 0);
    // Find hrefs in cssLinks
    if (cssLinks) {
      cssLinks.forEach(l => {
        const m = l.match(/href="([^"]+)"/);
        if (m) {
          const path = m[1];
          if (path.startsWith('http')) {
            console.log('External CSS:', path);
          } else {
            http.get('http://localhost:8080' + path, cr => {
              console.log('Internal CSS:', path, 'Status:', cr.statusCode, 'Headers:', cr.headers['content-type']);
            });
          }
        }
      });
    }
  });
});
