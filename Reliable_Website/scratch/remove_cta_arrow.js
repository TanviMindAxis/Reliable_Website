const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const serviceFiles = [
  'topographical-survey.html',
  'total-station-survey.html',
  'dgps-gnss-control.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

const targetPattern = /<a href="contact\.html" class="cta-banner-btn-primary">\s*<span>Request Project Quotation<\/span>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*<\/a>/;

const replacement = `<a href="contact.html" class="cta-banner-btn-primary">
                    <span>Request Project Quotation</span>
                </a>`;

let count = 0;

for (const file of serviceFiles) {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  if (targetPattern.test(content)) {
    content = content.replace(targetPattern, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[REMOVED ARROW] ${file}`);
    count++;
  } else {
    console.warn(`[PATTERN NOT FOUND] ${file}`);
  }
}

console.log(`Updated ${count}/${serviceFiles.length} files.`);

// Bump cache buster in all html files
const allHtml = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));
let bumpCount = 0;
for (const f of allHtml) {
  const fp = path.join(baseDir, f);
  let c = fs.readFileSync(fp, 'utf8');
  if (c.includes('style.css?v=')) {
    c = c.replace(/style\.css\?v=[a-zA-Z0-9_-]+/g, 'style.css?v=20261008_6');
    c = c.replace(/responsive\.css\?v=[a-zA-Z0-9_-]+/g, 'responsive.css?v=20261008_6');
    fs.writeFileSync(fp, c, 'utf8');
    bumpCount++;
  }
}
console.log(`Bumped CSS cache to v=20261008_6 in ${bumpCount} files.`);
