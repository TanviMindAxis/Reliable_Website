const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');
console.log(`Auditing ${files.length} HTML files...\n`);

const results = [];

files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const titleMatch = c.match(/<title>([^<]*)<\/title>/i);
    const descMatch = c.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const h1s = (c.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || []).map(h => h.replace(/<[^>]*>/g, '').trim());
    const hasCanonical = c.includes('rel="canonical"');
    const hasSchema = c.includes('application/ld+json');
    const hasOGTitle = c.includes('property="og:title"');
    const hasOGImage = c.includes('property="og:image"');
    const hasTwitterCard = c.includes('name="twitter:card"');
    const hasRobots = fs.existsSync('robots.txt');
    const hasSitemap = fs.existsSync('sitemap.xml');
    
    // Check images
    const allImgs = c.match(/<img\b[^>]*>/gi) || [];
    let noAltCount = 0;
    let emptyAltCount = 0;
    allImgs.forEach(img => {
        if (!/alt\s*=/i.test(img)) noAltCount++;
        else if (/alt\s*=\s*["']\s*["']/i.test(img)) emptyAltCount++;
    });

    // Check buttons without aria-label or text
    const buttons = c.match(/<button\b[^>]*>([\s\S]*?)<\/button>/gi) || [];
    let emptyButtons = 0;
    buttons.forEach(btn => {
        const text = btn.replace(/<[^>]*>/g, '').trim();
        const hasAria = /aria-label\s*=/i.test(btn);
        if (!text && !hasAria) emptyButtons++;
    });

    results.push({
        file: f,
        title: titleMatch ? titleMatch[1].trim() : 'MISSING',
        titleLength: titleMatch ? titleMatch[1].trim().length : 0,
        descLength: descMatch ? descMatch[1].trim().length : 0,
        h1Count: h1s.length,
        h1Text: h1s.join(' | '),
        hasCanonical,
        hasSchema,
        hasOGTitle,
        hasOGImage,
        hasTwitterCard,
        totalImgs: allImgs.length,
        noAltCount,
        emptyAltCount,
        emptyButtons
    });
});

console.table(results.map(r => ({
    file: r.file,
    titleLen: r.titleLength,
    descLen: r.descLength,
    H1s: r.h1Count,
    Canon: r.hasCanonical,
    Schema: r.hasSchema,
    OG: r.hasOGTitle && r.hasOGImage,
    Twitter: r.hasTwitterCard,
    noAlt: r.noAltCount,
    emptyAlt: r.emptyAltCount,
    emptyBtn: r.emptyButtons
})));

console.log('\nRobots.txt exists:', fs.existsSync('robots.txt'));
console.log('Sitemap.xml exists:', fs.existsSync('sitemap.xml'));
