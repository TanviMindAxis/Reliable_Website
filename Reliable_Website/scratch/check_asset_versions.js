const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    const s = c.match(/style\.css[^"']*/);
    const r = c.match(/responsive\.css[^"']*/);
    const t = c.match(/topbar\.js[^"']*/);
    console.log(f, ':', s ? s[0] : 'none', '|', r ? r[0] : 'none', '|', t ? t[0] : 'none');
});
