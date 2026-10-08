const fs = require('fs');

const svgIcons = [
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
];

function transformServicePage(html) {
  let modified = html;

  const mediaRegex = /<div style="border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba\(0,0,0,0\.08\); margin-bottom: 24px; position: relative;">\s*<img src="([^"]+)" alt="([^"]+)"[^>]*>\s*<div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient\(transparent, rgba\(8,43,76,0\.85\)\); padding: 20px 20px 15px; color: #fff;">\s*<div[^>]*>GEOSPATIAL EXPERTISE<\/div>\s*<div[^>]*>([^<]+)<\/div>\s*<\/div>\s*<\/div>/;

  const mediaMatch = modified.match(mediaRegex);
  if (!mediaMatch) {
    console.error("Failed to match mediaRegex");
    return null;
  }

  const imgSrc = mediaMatch[1];
  const imgAlt = mediaMatch[2];
  const serviceTitle = mediaMatch[3].trim();

  const newMediaCard = `<!-- Animated Geospatial Media Card -->
                        <div class="spec-media-card">
                            <img src="${imgSrc}" alt="${imgAlt}">
                            <div class="spec-live-pill">
                                <span class="spec-live-dot"></span>
                                <span>SURVEY-GRADE ACCURACY</span>
                            </div>
                            <div class="spec-media-overlay">
                                <div class="media-subtitle">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                    GEOSPATIAL EXPERTISE
                                </div>
                                <div class="media-title">${serviceTitle}</div>
                            </div>
                        </div>`;

  modified = modified.replace(mediaRegex, newMediaCard);

  const cardsContainerRegex = /<div style="display: flex; flex-direction: column; gap: 10px;">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="service-spec-cta-grid"/;
  const cardsMatch = modified.match(cardsContainerRegex);
  if (!cardsMatch) {
    console.error("Failed to match cardsContainerRegex");
    return null;
  }

  const cardsHtml = cardsMatch[1];
  const singleCardRegex = /<div style="background: #f1f5f9; border-left: 4px solid [^;]+; border-radius: 0 8px 8px 0; padding: 14px 16px;">\s*<div style="font-size: 13\.5px; font-weight: 700; color: var\(--dark-navy\); margin-bottom: 2px;">([\s\S]*?)<\/div>\s*<div style="font-size: 12px; color: var\(--text-muted\); line-height: 1\.4;">([\s\S]*?)<\/div>\s*<\/div>/g;

  const cardMatches = [...cardsHtml.matchAll(singleCardRegex)];
  if (cardMatches.length !== 3) {
    console.error("Expected 3 cards, found:", cardMatches.length);
    return null;
  }

  const newCards = cardMatches.map((m, idx) => {
    const title = m[1].trim();
    const desc = m[2].trim();
    const themeNavy = idx === 1 ? ' theme-navy' : '';
    const icon = svgIcons[idx];
    return `                            <div class="spec-feature-card${themeNavy}">
                                <div class="spec-feature-icon">
                                    ${icon}
                                </div>
                                <div>
                                    <div class="spec-feature-title">${title}</div>
                                    <div class="spec-feature-desc">${desc}</div>
                                </div>
                            </div>`;
  }).join('\n');

  const newFeatureCardsBlock = `<!-- Animated Feature Highlight Cards -->
                        <div class="spec-feature-cards">
${newCards}
                        </div>`;

  modified = modified.replace(cardsMatch[0], `${newFeatureCardsBlock}\n                    </div>\n                    \n                    <div class="service-spec-cta-grid"`);

  const headingRegex = /<div class="section-label" style="margin-bottom: 6px;">ENGINEERING SPECIFICATIONS<\/div>\s*<h2 style="color: var\(--dark-navy\); font-size: clamp\(1\.6rem, 3vw, 2\.2rem\); margin: 0 0 14px 0; font-weight: 800; font-family: var\(--font-heading\); line-height: 1\.25;">Technical Standards & Deliverables<\/h2>/;
  
  const newHeading = `<div class="section-label" style="margin-bottom: 6px; font-weight: 800; letter-spacing: 1.5px;">ENGINEERING SPECIFICATIONS</div>
                        <h2 style="color: var(--dark-navy); font-size: clamp(1.6rem, 3vw, 2.2rem); margin: 0 0 6px 0; font-weight: 800; font-family: var(--font-heading); line-height: 1.25;">Technical Standards & Deliverables</h2>
                        <span class="spec-heading-accent"></span>`;

  if (!headingRegex.test(modified)) {
    console.error("Failed to match headingRegex");
    return null;
  }
  modified = modified.replace(headingRegex, newHeading);

  const rowRegex = /<tr style="border-bottom: 1px solid #edf2f7;">\s*<td style="padding: 13px 0; font-weight: 800; color: #64748b; font-size: 13px; letter-spacing: 0\.5px; text-transform: uppercase; font-family: var\(--font-heading\); width: 35%;">([\s\S]*?)<\/td>\s*<td style="padding: 13px 0; font-weight: 700; color: var\(--dark-navy\); font-size: 14\.5px; line-height: 1\.4;">([\s\S]*?)<\/td>\s*<\/tr>/g;

  let rowMatches = [...modified.matchAll(rowRegex)];
  if (rowMatches.length < 5) {
    console.error("Expected at least 5 table rows, found:", rowMatches.length);
    return null;
  }

  modified = modified.replace(rowRegex, (match, label, val) => {
    return `<tr class="spec-table-row">
                            <td class="spec-table-label"><span class="spec-bullet"></span>${label.trim()}</td>
                            <td class="spec-table-val">${val.trim()}</td>
                        </tr>`;
  });

  return modified;
}

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

const doWrite = process.argv.includes('--write');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const res = transformServicePage(content);
  if (res) {
    if (doWrite) {
      fs.writeFileSync(f, res, 'utf8');
      console.log(`WRITTEN: ${f}`);
    } else {
      console.log(`PASS (dry-run): ${f}`);
    }
  } else {
    console.error(`ERROR: ${f}`);
  }
});
