const https = require('https');

function checkDeployment() {
    return new Promise((resolve) => {
        https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/', (res) => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => {
                const hasV21 = d.includes('20261010_01');
                const hasTechCounterLabel = d.includes('tech-counter-label');
                const cssMatch = d.match(/responsive\.css[^"']*/);
                console.log(`[${new Date().toLocaleTimeString()}] Status: ${res.statusCode} | Length: ${d.length} | Has v20261010_01: ${hasV21} | Has tech-counter-label: ${hasTechCounterLabel} | CSS: ${cssMatch ? cssMatch[0] : 'none'}`);
                resolve(hasV21 && hasTechCounterLabel);
            });
        }).on('error', (e) => {
            console.error('Error:', e.message);
            resolve(false);
        });
    });
}

async function loop() {
    console.log('Checking if Vercel has deployed commit be6332c...');
    for (let i = 0; i < 15; i++) {
        const updated = await checkDeployment();
        if (updated) {
            console.log('SUCCESS! Vercel has deployed the new version with full visible counter labels!');
            process.exit(0);
        }
        await new Promise(r => setTimeout(r, 6000));
    }
    console.log('Finished polling.');
    process.exit(0);
}

loop();
