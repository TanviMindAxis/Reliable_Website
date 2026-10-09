const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html',
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
  const content = fs.readFileSync(f, 'utf8');
  const footerIdx = content.indexOf('<footer');
  if (footerIdx === -1) return;
  const footerHtml = content.substring(footerIdx);
  
  // Find column 4
  const cols = [...footerHtml.matchAll(/<div class="footer-col">[\s\S]*?<\/div>\s*<\/div>/g)];
  if (cols.length >= 3) {
    const col4 = cols[2][0];
    const phones = [...col4.matchAll(/href="([^"]*)"/g)].map(m => m[1]);
    console.log(`${f}: Col4 links count = ${phones.length}`, phones);
  }
});
