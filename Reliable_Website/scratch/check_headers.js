const https = require('https');

https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/', (res) => {
    console.log('Headers:', res.headers);
}).on('error', e => console.error(e));
