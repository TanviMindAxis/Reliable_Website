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

const standardizedCol2And3 = `                <!-- Column 2 -->
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <div class="footer-links">
                        <a href="index.html">Home</a>
                        <a href="about.html">About Us</a>
                        <a href="services.html">Our Services</a>
                        <a href="gallery.html">Project Gallery</a>
                        <a href="review.html">Client Reviews</a>
                        <a href="contact.html">Contact Us</a>
                    </div>
                </div>

                <!-- Column 3 -->
                <div class="footer-col">
                    <h4>Our Services</h4>
                    <div class="footer-links">
                        <a href="topographical-survey.html">Topographical Survey</a>
                        <a href="dgps-gnss-control.html">DGPS / GNSS Control</a>
                        <a href="total-station-survey.html">Total Station Survey</a>
                        <a href="rtk-drone-mapping.html">RTK Drone Mapping</a>
                        <a href="lidar-3d-scanning.html">Drone LiDAR Scanning</a>
                        <a href="road-highway.html">Road & Highway Survey</a>
                        <a href="rail-metro.html">Rail & Metro Survey</a>
                        <a href="cad-gis-processing.html">CAD & GIS Services</a>
                    </div>
                </div>`;

const col2to3Regex = /(?:<!--\s*Column\s*2\s*-->\s*)?<div class="footer-col">[\s\S]*?<h4>Quick Links<\/h4>[\s\S]*?<\/div>\s*<\/div>\s*(?:<!--\s*Column\s*3\s*-->\s*)?<div class="footer-col">[\s\S]*?<h4>(?:Services|Our Services)<\/h4>[\s\S]*?<\/div>\s*<\/div>/i;

const unlinkedLogoRegex = /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img" style="height: 100px; width: auto; display: block;">/g;
const linkedLogoHtml = `<a href="index.html" style="display: block;" title="Reliable Land Survey Consultancy"><img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img" style="height: 100px; width: auto; display: block;"></a>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // 1. Replace Col 2 and Col 3
  if (!col2to3Regex.test(content)) {
    console.error(`ERROR: Col 2 & 3 not found in ${f}`);
    return;
  }
  content = content.replace(col2to3Regex, standardizedCol2And3);

  // 2. Link footer logo if not already linked
  if (!content.includes('href="index.html" style="display: block;" title="Reliable Land Survey Consultancy"')) {
    content = content.replace(unlinkedLogoRegex, linkedLogoHtml);
  }

  fs.writeFileSync(f, content, 'utf8');
  console.log(`UPDATED: ${f}`);
});
