const https = require('https');

function checkDeployment() {
    return new Promise((resolve) => {
        https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/', (res) => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => {
                const hasV20 = d.includes('20261009_20');
                const hasTrack = d.includes('top-bar-track');
                const cssMatch = d.match(/responsive\.css[^"']*/);
                console.log(`[${new Date().toLocaleTimeString()}] Status: ${res.statusCode} | Length: ${d.length} | Has v20: ${hasV20} | CSS: ${cssMatch ? cssMatch[0] : 'none'}`);
                resolve(hasV20);
            });
        }).on('error', (e) => {
            console.error('Error:', e.message);
            resolve(false);
        });
    });
}

async function loop() {
    console.log('Checking if Vercel has updated...');
    for (let i = 0; i < 12; i++) {
        const updated = await checkDeployment();
        if (updated) {
            console.log('SUCCESS! Vercel has deployed the new version with v20261009_20!');
            process.exit(0);
        }
        await new Promise(r => setTimeout(r, 6000));
    }
    console.log('Vercel has not updated yet. You may need to trigger deployment or wait another minute.');
    process.exit(0);
}

loop();
