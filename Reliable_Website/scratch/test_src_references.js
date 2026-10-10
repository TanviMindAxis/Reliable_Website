const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log('Testing image and script sources across all 15 HTML files...\n');

let totalSrcs = 0;
let brokenSrcs = 0;

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const srcs = Array.from(c.matchAll(/src=["']([^"']+)["']/g)).map(m => m[1]);
    
    srcs.forEach(src => {
        if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
            return;
        }

        totalSrcs++;
        const cleanSrc = src.split('?')[0].split('#')[0];
        if (!cleanSrc) return;

        if (!fs.existsSync(cleanSrc)) {
            console.error(`[BROKEN SRC in ${f}]: "${src}" -> file not found: "${cleanSrc}"`);
            brokenSrcs++;
        }
    });
});

console.log(`\nChecked ${totalSrcs} internal src references. Broken sources found: ${brokenSrcs}`);
