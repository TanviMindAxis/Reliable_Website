const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('v=20261008_9')) {
    content = content.replace(/style\.css\?v=20261008_9/g, 'style.css?v=20261008_10');
    content = content.replace(/responsive\.css\?v=20261008_9/g, 'responsive.css?v=20261008_10');
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Updated cache buster in ${file}`);
  }
});

console.log(`Total files updated: ${count}`);
