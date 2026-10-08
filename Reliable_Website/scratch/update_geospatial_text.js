const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = [
  'topographical-survey.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'road-highway.html',
  'rail-metro.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'dgps-gnss-control.html',
  'cad-gis-processing.html'
];

const targetStr = '<div style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: var(--accent-orange); text-transform: uppercase;">GEOSPATIAL EXPERTISE</div>';
const replacementStr = '<div style="font-size: 11px; font-weight: 800; letter-spacing: 1.2px; color: #ffffff; text-transform: uppercase; text-shadow: 0 1px 4px rgba(0,0,0,0.6);">GEOSPATIAL EXPERTISE</div>';

let updatedCount = 0;
files.forEach(f => {
  const filePath = path.join(dir, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(targetStr)) {
      content = content.replace(targetStr, replacementStr);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${f}`);
      updatedCount++;
    } else {
      console.log(`Target string not found in ${f}`);
    }
  }
});

console.log(`Total files updated: ${updatedCount}`);
