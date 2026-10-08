const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('Total HTML files found:', files.length);

let passed = 0;
let failed = [];

files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const hasTel1 = content.includes('href="tel:+919604648777"') && content.includes('footer-phone-link');
    const hasTel2 = content.includes('href="tel:+918600044688"') && content.includes('footer-phone-link');
    const hasSvg = content.includes('<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">');

    if (hasTel1 && hasTel2 && hasSvg) {
        passed++;
    } else {
        failed.push({ file: f, hasTel1, hasTel2, hasSvg });
    }
});

console.log(`Passed: ${passed}/${files.length}`);
if (failed.length > 0) {
    console.error('Failed files:', JSON.stringify(failed, null, 2));
    process.exit(1);
} else {
    console.log('SUCCESS: All HTML files have proper calling links, SVGs, and classes.');
}
