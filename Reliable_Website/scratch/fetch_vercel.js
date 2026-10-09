const https = require('https');

https.get('https://reliablewebsite-reliablewebsite-seven.vercel.app/', (res) => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Length:', d.length);

        const scripts = d.match(/<script[\s\S]*?<\/script>/gi) || [];
        console.log('Scripts count:', scripts.length);
        scripts.forEach(s => {
            if (s.includes('topbar') || s.includes('script.js')) {
                console.log('Script tag:', s.substring(0, 100));
            }
        });

        const cssLinks = d.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
        console.log('CSS links:');
        cssLinks.forEach(l => console.log('  ', l));

        const topbarExact = d.match(/<div class="top-bar-exact"[\s\S]*?<\/div>\s*<\/div>/);
        if (topbarExact) {
            console.log('Static top-bar found in HTML:');
            console.log(topbarExact[0].substring(0, 400));
        } else {
            console.log('No static top-bar found in HTML');
        }

        const siteTopbar = d.includes('site-topbar');
        console.log('Includes site-topbar div:', siteTopbar);

        // Check if there is an embedded style
        const embeddedStyles = d.match(/<style[\s\S]*?<\/style>/gi) || [];
        console.log('Style tags count:', embeddedStyles.length);
        embeddedStyles.forEach((s, idx) => {
            if (s.includes('top-bar')) {
                console.log(`Style tag ${idx} has top-bar rules:`, s.substring(0, 300));
            }
        });
    });
}).on('error', (e) => {
    console.error('Error fetching URL:', e);
});
