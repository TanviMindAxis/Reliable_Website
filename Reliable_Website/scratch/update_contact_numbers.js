const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

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

console.log('=== STARTING CONTACT NUMBER UPDATE ===');

// 1. Update js/topbar.js
const topbarPath = path.join(baseDir, 'js', 'topbar.js');
let topbarContent = fs.readFileSync(topbarPath, 'utf8');

// Replace top bar numbers
topbarContent = topbarContent.replace(
  '+91 96046 48777 / +91 86000 44688',
  '+91 86000 44688 / +91 96046 46777'
);
topbarContent = topbarContent.replace(
  'href="https://wa.me/919604648777"',
  'href="https://wa.me/919604646777"'
);
topbarContent = topbarContent.replace(
  'href="tel:+919604648777"',
  'href="tel:+919604646777"'
);

fs.writeFileSync(topbarPath, topbarContent, 'utf8');
console.log('Updated js/topbar.js successfully');

// Footer replacement pattern across all 15 HTML files
const oldFooterRegex = /Mahesh Deshmukh<br>\s*<a href="tel:\+919604648777" class="footer-phone-link" title="Click to Call Mahesh Deshmukh \(\+91 96046 48777\)" aria-label="Call Mahesh Deshmukh \+91 96046 48777">\s*<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="[^"]*"\s*\/><\/svg>\s*<span>\+91 96046 48777<\/span>\s*<\/a><br>\s*<span style="display:inline-block; margin-top: 6px;">Sharad Pingale<\/span><br>\s*<a href="tel:\+918600044688" class="footer-phone-link" title="Click to Call Sharad Pingale \(\+91 86000 44688\)" aria-label="Call Sharad Pingale \+91 86000 44688">\s*<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="[^"]*"\s*\/><\/svg>\s*<span>\+91 86000 44688<\/span>\s*<\/a>/;

const newFooterBlock = `Mahesh Deshmukh<br>
                            <a href="tel:+918600044688" class="footer-phone-link" title="Click to Call Mahesh Deshmukh (+91 86000 44688)" aria-label="Call Mahesh Deshmukh +91 86000 44688">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 86000 44688</span>
                            </a><br>
                            <span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br>
                            <a href="tel:+919604646777" class="footer-phone-link" title="Click to Call Sharad Pingale (+91 96046 46777)" aria-label="Call Sharad Pingale +91 96046 46777">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                <span>+91 96046 46777</span>
                            </a>`;

htmlFiles.forEach(file => {
  const filePath = path.join(baseDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check footer match
  if (!oldFooterRegex.test(content)) {
    console.error('ERROR: oldFooterRegex failed to match in ' + file);
  } else {
    content = content.replace(oldFooterRegex, newFooterBlock);
  }

  // Floating WhatsApp & Call button updates (applies to all html files)
  content = content.replace(/https:\/\/wa\.me\/919604648777/g, 'https://wa.me/919604646777');
  content = content.replace(/href="tel:\+919604648777"/g, 'href="tel:+919604646777"');

  // CTA banner phone in service pages:
  // <span>+91 96046 48777</span>
  content = content.replace(/<span>\+91 96046 48777<\/span>/g, '<span>+91 96046 46777</span>');

  // Page-specific updates:
  if (file === 'contact.html') {
    // Placeholder: placeholder="+91 96046 48777"
    content = content.replace('placeholder="+91 96046 48777"', 'placeholder="+91 96046 46777"');
    
    // Direct contact phones:
    // Mahesh Deshmukh: +91 96046 48777 -> +91 86000 44688
    // Sharad Pingale: +91 86000 44688 -> +91 96046 46777
    const oldMaheshContact = '<span style="font-weight: 600; color: #64748b;">Mahesh Deshmukh:</span> <a href="tel:+919604648777" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 96046 48777</a>';
    const newMaheshContact = '<span style="font-weight: 600; color: #64748b;">Mahesh Deshmukh:</span> <a href="tel:+918600044688" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 86000 44688</a>';
    
    const oldSharadContact = '<span style="font-weight: 600; color: #64748b;">Sharad Pingale:</span> <a href="tel:+918600044688" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 86000 44688</a>';
    const newSharadContact = '<span style="font-weight: 600; color: #64748b;">Sharad Pingale:</span> <a href="tel:+919604646777" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 96046 46777</a>';

    if (!content.includes(oldMaheshContact)) {
      console.error('ERROR: oldMaheshContact not found in contact.html');
    } else {
      content = content.replace(oldMaheshContact, newMaheshContact);
    }

    if (!content.includes(oldSharadContact)) {
      console.error('ERROR: oldSharadContact not found in contact.html');
    } else {
      content = content.replace(oldSharadContact, newSharadContact);
    }
  }

  if (file === 'review.html') {
    // Placeholder
    content = content.replace('placeholder="+91 96046 48777"', 'placeholder="+91 96046 46777"');

    // Direct contact phones:
    const oldReviewPhones = '<div style="display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center;">\n                                        <a href="tel:+919604648777" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 96046 48777</a>\n                                        <span style="color: #cbd5e1;">|</span>\n                                        <a href="tel:+918600044688" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 86000 44688</a>\n                                    </div>';

    const newReviewPhones = '<div style="display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center;">\n                                        <a href="tel:+918600044688" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 86000 44688</a>\n                                        <span style="color: #cbd5e1;">|</span>\n                                        <a href="tel:+919604646777" style="color: var(--dark-navy); font-size: 14.5px; font-weight: 800; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color=\'var(--accent-orange)\'" onmouseout="this.style.color=\'var(--dark-navy)\'">+91 96046 46777</a>\n                                    </div>';

    if (!content.includes(oldReviewPhones)) {
      console.error('ERROR: oldReviewPhones not found in review.html');
    } else {
      content = content.replace(oldReviewPhones, newReviewPhones);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file + ' successfully');
});

console.log('=== UPDATE COMPLETE ===');
