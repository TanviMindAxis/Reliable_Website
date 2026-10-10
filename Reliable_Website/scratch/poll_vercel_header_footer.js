const https = require('https');

function checkDeployment() {
    return new Promise((resolve) => {
        https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/?t=' + Date.now(), (res) => {
            let d = '';
            res.on('data', chunk => d += chunk);
            res.on('end', () => {
                const hasV02 = d.includes('20261010_02');
                const hasHeaderFooterCSS = d.includes('header-footer.css');
                console.log(`[${new Date().toLocaleTimeString()}] Status: ${res.statusCode} | Has v20261010_02: ${hasV02} | Has header-footer.css: ${hasHeaderFooterCSS}`);
                resolve(hasV02 && hasHeaderFooterCSS);
            });
        }).on('error', (e) => {
            console.error('Error:', e.message);
            resolve(false);
        });
    });
}

async function loop() {
    console.log('Checking if Vercel has deployed commit 047a17a with common header-footer.css...');
    for (let i = 0; i < 20; i++) {
        const updated = await checkDeployment();
        if (updated) {
            console.log('\nSUCCESS! Vercel has deployed the unified header-footer.css sitewide!');
            process.exit(0);
        }
        await new Promise(r => setTimeout(r, 5000));
    }
    console.log('Finished polling.');
    process.exit(0);
}

loop();
