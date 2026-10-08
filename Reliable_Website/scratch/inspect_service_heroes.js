const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = [
  'topographical-survey.html',
  'dgps-gnss-control.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html',
  'services.html'
];

files.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const bcMatch = content.match(/HOME[\s\S]*?<\/div>/);
  console.log(`=== ${f} ===`);
  console.log('H1:', h1Match ? h1Match[0] : 'none');
  console.log('BC snippet:', bcMatch ? bcMatch[0].replace(/\s+/g, ' ') : 'none');
});
