const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log('Testing internal links across all 15 HTML files...\n');

let totalLinks = 0;
let brokenLinks = 0;

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const hrefs = Array.from(c.matchAll(/href=["']([^"']+)["']/g)).map(m => m[1]);
    
    hrefs.forEach(href => {
        // Skip external, tel, mailto, javascript, pure anchor #
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:') || href === '#') {
            return;
        }

        totalLinks++;
        // Remove query parameters and hash
        const cleanHref = href.split('?')[0].split('#')[0];
        if (!cleanHref) return; // pure anchor like #section

        // Check if file exists
        if (!fs.existsSync(cleanHref)) {
            console.error(`[BROKEN LINK in ${f}]: "${href}" -> file not found: "${cleanHref}"`);
            brokenLinks++;
        }
    });
});

console.log(`\nChecked ${totalLinks} internal links. Broken links found: ${brokenLinks}`);
