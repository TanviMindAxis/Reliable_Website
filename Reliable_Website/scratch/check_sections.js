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
  'cad-gis-processing.html'
];

files.forEach(f => {
  const filePath = path.join(dir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const sectionMatch = content.match(/<section[^>]*class="[^"]*"[^>]*>/);
  console.log(f + ': ' + (sectionMatch ? sectionMatch[0] : 'no section match'));
});
