const fs = require('fs');

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

// Target overlay pattern:
// <!-- Soft readability gradient overlay for mobile & tablet -->
// <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(234, 244, 252, 0.92) 0%, rgba(234, 244, 252, 0.78) 55%, rgba(234, 244, 252, 0.35) 100%); z-index: 1; pointer-events: none;"></div>
const overlayRegex = /\s*<!-- Soft readability gradient overlay for mobile & tablet -->\s*<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient\(90deg, rgba\(234, 244, 252, 0\.92\) 0%, rgba\(234, 244, 252, 0\.78\) 55%, rgba\(234, 244, 252, 0\.35\) 100%\); z-index: 1; pointer-events: none;"><\/div>/g;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (overlayRegex.test(content)) {
    content = content.replace(overlayRegex, '');
    fs.writeFileSync(f, content, 'utf8');
    console.log(`REMOVED white overlay from ${f}`);
  } else {
    console.error(`NOT FOUND in ${f}`);
  }
});
