const fs = require('fs');
const path = require('path');

const NEW_VERSION = '20261009_20';
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log(`Updating ${htmlFiles.length} HTML files to version ${NEW_VERSION}...`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Update style.css
    const newStyle = `css/style.css?v=${NEW_VERSION}`;
    if (content.includes('css/style.css')) {
        content = content.replace(/css\/style\.css(\?v=[^"']*)?/g, newStyle);
        changed = true;
    }

    // 2. Update responsive.css
    const newResp = `css/responsive.css?v=${NEW_VERSION}`;
    if (content.includes('css/responsive.css')) {
        content = content.replace(/css\/responsive\.css(\?v=[^"']*)?/g, newResp);
        changed = true;
    }

    // 3. Update topbar.js
    const newTopbar = `js/topbar.js?v=${NEW_VERSION}`;
    if (content.includes('js/topbar.js')) {
        content = content.replace(/js\/topbar\.js(\?v=[^"']*)?/g, newTopbar);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`Skipped ${file} (no matches)`);
    }
});
console.log('Finished updating asset versions.');
