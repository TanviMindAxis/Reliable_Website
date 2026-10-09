const fs = require('fs');
let html = fs.readFileSync('review.html', 'utf8');
const oldCss = `            .info-block-row {
                background: #f8fafc;
                border: 1px solid #edf2f7;
                border-radius: 10px;
                padding: 14px 16px;
                display: flex;
                gap: 14px;
                align-items: center;
                transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .info-block-row:hover {
                border-color: #cbd5e1;
                transform: translateY(-1px);
            }`;
const norm = s => s.replace(/\r\n/g, '\n');
if (norm(html).includes(norm(oldCss))) {
  html = norm(html).replace(norm(oldCss), '');
  html = html.replace(/\n/g, '\r\n');
  fs.writeFileSync('review.html', html, 'utf8');
  console.log('review.html updated successfully');
} else {
  console.log('not found in review.html');
}
