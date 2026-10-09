const fs = require('fs');
const path = require('path');

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

let totalIssues = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerIdx = content.indexOf('<footer');
  if (footerIdx === -1) {
    console.error(`ERROR: ${f} has no footer!`);
    totalIssues++;
    return;
  }
  const footerHtml = content.substring(footerIdx);

  // Check for broken hashes like href="#home", href="#services", etc.
  const hashMatches = [...footerHtml.matchAll(/href="(#[a-zA-Z0-9_-]+)"/g)];
  if (hashMatches.length > 0) {
    console.error(`ERROR: ${f} has unresolved hash links in footer:`, hashMatches.map(m => m[1]));
    totalIssues += hashMatches.length;
  }

  // Extract all file hrefs and check if they exist
  const hrefMatches = [...footerHtml.matchAll(/href="([^":#]+(?:\.html)?)"/g)];
  hrefMatches.forEach(hm => {
    const targetFile = hm[1];
    if (!fs.existsSync(targetFile)) {
      console.error(`ERROR: ${f} footer links to non-existent file: ${targetFile}`);
      totalIssues++;
    }
  });
});

if (totalIssues === 0) {
  console.log('\n=== ALL FOOTER NAVIGATION LINKS VERIFIED 100% VALID & RESOLVABLE ===\n');
} else {
  console.error(`\nFound ${totalIssues} issue(s) across footers.`);
}
