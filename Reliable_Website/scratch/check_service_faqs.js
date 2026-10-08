const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const files = [
  'topographical-survey.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'dgps-gnss-control.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

files.forEach(f => {
  const full = path.join(baseDir, f);
  const content = fs.readFileSync(full, 'utf8');
  console.log('==============================');
  console.log('PAGE: ' + f);
  const faqSection = content.match(/<div class="faq-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  if (faqSection) {
    const qMatches = [...faqSection[1].matchAll(/<span class="faq-question">([\s\S]*?)<\/span>/g)];
    const cMatches = [...faqSection[1].matchAll(/<div class="faq-card-content">\s*([\s\S]*?)\s*<\/div>/g)];
    qMatches.forEach((m, idx) => {
      console.log('  Q' + (idx+1) + ': ' + m[1].trim());
      if (cMatches[idx]) {
        console.log('    A: ' + cMatches[idx][1].trim().substring(0, 80) + '...');
      }
    });
  } else {
    console.log('  No faq-list found!');
  }
});
