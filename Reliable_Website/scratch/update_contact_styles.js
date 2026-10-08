const fs = require('fs');

// 1. Update css/style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const targetCss = `.contact-card-header {
  font-size: 22px;
  color: var(--dark-navy);
  font-weight: 800;
  font-family: var(--font-heading);
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.contact-card-sub {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 22px 0;
}

.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .contact-form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .contact-form-grid .full-width {
    grid-column: span 1 !important;
  }
}

.contact-form-grid .full-width {
  grid-column: span 2;
}

.contact-label {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--dark-navy);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
  font-family: var(--font-heading);
}

.contact-input-field {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #d9e2ec;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-main);
  color: var(--text-dark);
  background: #ffffff;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
  display: block;
}

.contact-input-field:focus {
  border-color: var(--accent-orange);
  box-shadow: 0 0 0 3px rgba(244, 123, 32, 0.15);
  background: #ffffff;
}

.info-block-row {
  background: #f8fafc;
  border: 1px solid #edf2f7;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.info-block-row:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(8, 43, 76, 0.05);
}`;

const replacementCss = `.contact-card-header {
  font-size: 24px;
  color: #082b4c;
  font-weight: 800;
  font-family: var(--font-heading);
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.contact-card-sub {
  color: #1e293b;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.6;
  margin: 0 0 22px 0;
}

.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .contact-form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .contact-form-grid .full-width {
    grid-column: span 1 !important;
  }
}

.contact-form-grid .full-width {
  grid-column: span 2;
}

.contact-label {
  font-size: 12px;
  font-weight: 800;
  color: #082b4c;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
  font-family: var(--font-heading);
}

.contact-input-field {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14.5px;
  font-family: var(--font-main);
  color: #0f172a;
  font-weight: 600;
  background: #ffffff;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
  display: block;
}

.contact-input-field::placeholder {
  color: #475569;
  font-weight: 500;
  opacity: 0.95;
}

.contact-input-field:focus {
  border-color: var(--accent-orange);
  box-shadow: 0 0 0 3px rgba(244, 123, 32, 0.15);
  background: #ffffff;
}

.info-block-row {
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.info-block-row:hover {
  border-color: #94a3b8;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(8, 43, 76, 0.08);
  background: #ffffff;
}

.info-block-tag {
  font-size: 11.5px;
  font-weight: 800;
  color: #082b4c;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 3px;
  font-family: var(--font-heading);
}`;

// Normalize CRLF to LF for reliable replace, then write back with system CRLF
const normalizedCss = css.replace(/\r\n/g, '\n');
if (normalizedCss.includes(targetCss)) {
  const updatedCss = normalizedCss.replace(targetCss, replacementCss);
  fs.writeFileSync('css/style.css', updatedCss.replace(/\n/g, '\r\n'), 'utf8');
  console.log('SUCCESS: css/style.css updated!');
} else {
  console.log('Target CSS not found in css/style.css');
}

// 2. Also update review.html if needed
let reviewHtml = fs.readFileSync('review.html', 'utf8');
let reviewModified = false;

// In review.html, replace any #8898aa with info-block-tag or #082b4c
if (reviewHtml.includes('#8898aa')) {
  reviewHtml = reviewHtml.replace(/color:\s*#8898aa;/g, 'color: #082b4c;');
  reviewModified = true;
}
if (reviewHtml.includes('.contact-card-sub {\n                color: var(--text-muted);')) {
  reviewHtml = reviewHtml.replace(
    '.contact-card-sub {\n                color: var(--text-muted);',
    '.contact-card-sub {\n                color: #1e293b; font-weight: 500;'
  );
  reviewModified = true;
}
if (reviewModified) {
  fs.writeFileSync('review.html', reviewHtml, 'utf8');
  console.log('SUCCESS: review.html updated!');
}
