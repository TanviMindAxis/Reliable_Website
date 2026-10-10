const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');
let allValid = true;
let totalSchemas = 0;

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const matches = Array.from(c.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi));
    matches.forEach((m, idx) => {
        totalSchemas++;
        try {
            const parsed = JSON.parse(m[1].trim());
            if (!parsed['@context'] || !parsed['@type']) {
                console.error(`Missing context or type in ${f} schema #${idx}`);
                allValid = false;
            }
        } catch(e) {
            console.error(`Invalid JSON in ${f} schema #${idx}:`, e.message);
            allValid = false;
        }
    });
});

console.log(`Audited ${totalSchemas} JSON-LD schemas across ${files.length} HTML files.`);
if (allValid) {
    console.log('=== ALL JSON-LD SCHEMAS ARE 100% VALID SYNTAX ===');
} else {
    process.exit(1);
}
