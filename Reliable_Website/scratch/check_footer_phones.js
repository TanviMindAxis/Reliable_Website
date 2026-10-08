const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/);
  if (footerMatch) {
    const fHtml = footerMatch[0];
    const telMatches = fHtml.match(/<a[^>]*href=["']tel:[^"']*["'][^>]*>[\s\S]*?<\/a>/g);
    const propMatch = fHtml.match(/Proprietors:[\s\S]*?<\/p>/);
    console.log(`${file}:`);
    console.log('  Proprietors block:', propMatch ? propMatch[0].replace(/\s+/g, ' ') : 'NOT FOUND');
    console.log('  Tel links in footer:', telMatches ? telMatches.length : 0);
  }
});
