const fs = require('fs');

const files = [
  'road-highway.html',
  'topographical-survey.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'dgps-gnss-control.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const count = (content.match(/<span class="spec-bullet"><\/span>/g) || []).length;
  if (count > 0) {
    content = content.replace(/<span class="spec-bullet"><\/span>/g, '');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Removed ${count} bullets from ${f}`);
  } else {
    console.log(`No bullets in ${f}`);
  }
});
