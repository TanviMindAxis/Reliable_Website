const fs = require('fs');

const files = [
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
  const content = fs.readFileSync(f, 'utf8');
  const specGridIdx = content.indexOf('service-spec-grid');
  const specGridEndIdx = content.indexOf('<!-- KEY SERVICE CAPABILITIES -->', specGridIdx);
  const snippet = content.substring(specGridIdx, specGridEndIdx);
  
  const hasOldImgBox = snippet.includes('border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08)');
  const cardCount = (snippet.match(/border-left: 4px solid/g) || []).length;
  const rowCount = (snippet.match(/border-bottom: 1px solid #edf2f7/g) || []).length;
  
  console.log(`${f}: OldImgBox=${hasOldImgBox}, CardCount=${cardCount}, RowCount=${rowCount}`);
});
