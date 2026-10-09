const https = require('https');

https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/js/topbar.js', (res) => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Length:', d.length);
        console.log('Contains topBarMarquee:', d.includes('topBarMarquee'));
        console.log('First 300 chars:', d.substring(0, 300));
    });
}).on('error', e => console.error(e));
