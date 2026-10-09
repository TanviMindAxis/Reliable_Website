const https = require('https');

https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/', (res) => {
    Object.keys(res.headers).forEach(k => {
        if (k.includes('vercel') || k.includes('git')) {
            console.log(k, ':', res.headers[k]);
        }
    });
});
