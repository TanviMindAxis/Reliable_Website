const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const htmlFiles = [
  'about.html',
  'cad-gis-processing.html',
  'contact.html',
  'dgps-gnss-control.html',
  'drone-photogrammetry.html',
  'gallery.html',
  'index.html',
  'lidar-3d-scanning.html',
  'rail-metro.html',
  'review.html',
  'road-highway.html',
  'rtk-drone-mapping.html',
  'services.html',
  'topographical-survey.html',
  'total-station-survey.html'
];

const newProprietorsBlock = `<p style="margin: 0; line-height: 1.55;"><strong>Proprietors:</strong><br>
                            Mahesh Deshmukh<br>
                            <a href="tel:+919604648777" class="footer-phone-link" title="Click to Call Mahesh Deshmukh (+91 96046 48777)" aria-label="Call Mahesh Deshmukh +91 96046 48777">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 96046 48777</span>
                            </a><br>
                            <span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br>
                            <a href="tel:+918600044688" class="footer-phone-link" title="Click to Call Sharad Pingale (+91 86000 44688)" aria-label="Call Sharad Pingale +91 86000 44688">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 86000 44688</span>
                            </a>
                        </p>`;

// Target pattern matching the current proprietors block
const propRegex = /<p style="margin:\s*0;\s*line-height:\s*[0-9.]+;(?:\s*color:\s*#000\s*!important;)?"\s*>\s*<strong>Proprietors:<\/strong><br>\s*Mahesh Deshmukh<br>\s*<a href="tel:\+919604648777"[^>]*>\+91 96046 48777<\/a><br>\s*<span style="display:inline-block;\s*margin-top:\s*6px;">Sharad Pingale<\/span><br>\s*<a href="tel:\+918600044688"[^>]*>\+91 86000 44688<\/a>\s*<\/p>/;

let count = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (propRegex.test(content)) {
    content = content.replace(propRegex, newProprietorsBlock);
    count++;
    console.log(`Updated footer proprietors in ${file}`);
  } else {
    console.warn(`Could not find proprietors block in ${file}`);
  }

  // Update script cache buster
  content = content.replace(/src="js\/script\.js(\?v=[^"]*)?"/g, 'src="js/script.js?v=20261008_11"');
  // Update css cache buster
  content = content.replace(/style\.css\?v=[0-9_]+/g, 'style.css?v=20261008_11');
  content = content.replace(/responsive\.css\?v=[0-9_]+/g, 'responsive.css?v=20261008_11');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Finished. Total proprietors blocks updated: ${count}`);
