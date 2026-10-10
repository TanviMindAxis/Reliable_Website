const fs = require('fs');

const NEW_VERSION = '20261010_02';
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log(`Adding header-footer.css link and bumping to ${NEW_VERSION} in ${htmlFiles.length} files...`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Update style.css
    content = content.replace(/css\/style\.css(\?v=[^"']*)?/g, `css/style.css?v=${NEW_VERSION}`);

    // 2. Update responsive.css
    content = content.replace(/css\/responsive\.css(\?v=[^"']*)?/g, `css/responsive.css?v=${NEW_VERSION}`);

    // 3. Update topbar.js
    content = content.replace(/js\/topbar\.js(\?v=[^"']*)?/g, `js/topbar.js?v=${NEW_VERSION}`);

    // 4. Inject header-footer.css if not already present
    if (!content.includes('header-footer.css')) {
        const linkTag = `    <link rel="stylesheet" href="css/header-footer.css?v=${NEW_VERSION}">`;
        // Insert after responsive.css
        if (content.includes(`css/responsive.css?v=${NEW_VERSION}`)) {
            content = content.replace(
                `<link rel="stylesheet" href="css/responsive.css?v=${NEW_VERSION}">`,
                `<link rel="stylesheet" href="css/responsive.css?v=${NEW_VERSION}">\n${linkTag}`
            );
            changed = true;
        } else if (content.includes('</head>')) {
            content = content.replace('</head>', `${linkTag}\n</head>`);
            changed = true;
        }
    } else {
        content = content.replace(/css\/header-footer\.css(\?v=[^"']*)?/g, `css/header-footer.css?v=${NEW_VERSION}`);
        changed = true;
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});

console.log('Finished updating all HTML files.');
