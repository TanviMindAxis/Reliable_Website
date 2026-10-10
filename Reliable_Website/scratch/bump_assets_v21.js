const fs = require('fs');

const NEW_VERSION = '20261010_01';
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log(`Updating ${htmlFiles.length} HTML files to version ${NEW_VERSION}...`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('css/style.css')) {
        content = content.replace(/css\/style\.css(\?v=[^"']*)?/g, `css/style.css?v=${NEW_VERSION}`);
        changed = true;
    }

    if (content.includes('css/responsive.css')) {
        content = content.replace(/css\/responsive\.css(\?v=[^"']*)?/g, `css/responsive.css?v=${NEW_VERSION}`);
        changed = true;
    }

    if (content.includes('js/topbar.js')) {
        content = content.replace(/js\/topbar\.js(\?v=[^"']*)?/g, `js/topbar.js?v=${NEW_VERSION}`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log('Finished updating asset versions to ' + NEW_VERSION);
