const fs = require('fs');
const path = require('path');

const responsivePath = path.join(__dirname, '..', 'css', 'responsive.css');
let css = fs.readFileSync(responsivePath, 'utf8');

const targetStart = '/* Center footer logo on mobile & tablet (<= 1024px), while desktop remains left-aligned */';
const targetEnd = '/* Strictly remove section-label orange dot in responsive */';

const startIndex = css.indexOf(targetStart);
const endIndex = css.indexOf(targetEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `/* Center footer logo on mobile & tablet (<= 1024px), while text remains on the left side */
@media (max-width: 1024px) {
  .footer-brand,
  .footer-brand-inner {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }

  .footer-brand a,
  .footer-brand-inner a {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    margin: 0 auto 15px auto !important;
    text-align: center !important;
  }

  .footer-brand img,
  .footer-brand .footer-logo-img,
  .footer-logo-img {
    margin: 0 auto !important;
    align-self: center !important;
    display: block !important;
  }

  .footer-brand ul,
  .footer-brand .footer-brand-list,
  .footer-brand-list {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    justify-content: flex-start !important;
    width: 100% !important;
    padding-left: 0 !important;
  }

  .footer-brand ul li,
  .footer-brand .footer-brand-list li,
  .footer-brand-list li {
    text-align: left !important;
    align-self: flex-start !important;
  }
}

`;

  css = css.substring(0, startIndex) + replacement + css.substring(endIndex);
  fs.writeFileSync(responsivePath, css, 'utf8');
  console.log('Successfully updated css/responsive.css: Logo centered, text left-aligned on mobile/tablet');
} else {
  console.error('Target markers not found in css/responsive.css');
}
