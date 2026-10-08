const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const pages = [
  { file: 'dgps-gnss-control.html', defaultName: 'DGPS & GNSS Control' },
  { file: 'total-station-survey.html', defaultName: 'Total Station Survey' },
  { file: 'rtk-drone-mapping.html', defaultName: 'RTK Drone Mapping' },
  { file: 'lidar-3d-scanning.html', defaultName: 'Drone LiDAR Scanning' },
  { file: 'drone-photogrammetry.html', defaultName: 'Drone Photogrammetry' },
  { file: 'road-highway.html', defaultName: 'Road & Highway Survey' },
  { file: 'rail-metro.html', defaultName: 'Rail & Metro Survey' },
  { file: 'cad-gis-processing.html', defaultName: 'CAD & GIS Processing' }
];

pages.forEach(p => {
  const filePath = path.join(dir, p.file);
  const content = fs.readFileSync(filePath, 'utf8');

  const heroMatch = content.match(/<div class="text-fade-in-left"[^>]*>([\s\S]*?)<\/h1>/);
  const imgCardMatch = content.match(/GEOSPATIAL EXPERTISE[\s\S]*?<\/div>\s*<\/div>/);
  const tableServiceType = content.match(/SERVICE TYPE<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/);

  console.log(`\n=================== ${p.file} ===================`);
  console.log('Hero block:\n' + (heroMatch ? heroMatch[0].trim() : 'NONE'));
  console.log('Img card:\n' + (imgCardMatch ? imgCardMatch[0].trim() : 'NONE'));
  console.log('Table service type:\n' + (tableServiceType ? tableServiceType[1].trim() : 'NONE'));
});
