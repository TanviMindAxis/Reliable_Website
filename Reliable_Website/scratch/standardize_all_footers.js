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
                        <a href="services.html">All Services</a>
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

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Find from Column 2 up to before Column 4
  // Look for: <!-- Column 2 --> or <div class="footer-col">\s*<h4>Quick Links</h4>
  // up to <div class="footer-col">\s*<h4>(Contact|Pune Headquarters)</h4>
  const col2to3Regex = /(?:<!--\s*Column\s*2\s*-->\s*)?<div class="footer-col">[\s\S]*?<h4>Quick Links<\/h4>[\s\S]*?<\/div>\s*<\/div>\s*(?:<!--\s*Column\s*3\s*-->\s*)?<div class="footer-col">[\s\S]*?<h4>(?:Services|Our Services)<\/h4>[\s\S]*?<\/div>\s*<\/div>/i;

  const match = content.match(col2to3Regex);
  if (match) {
    console.log(`PASS: ${f} matched Col2 & Col3 pattern (${match[0].length} chars)`);
  } else {
    console.error(`FAIL: ${f} did NOT match Col2 & Col3 pattern`);
  }
});
