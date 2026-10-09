const fs = require('fs');
const lines = fs.readFileSync('contact.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('<section') || l.includes('class="contact-grid') || l.includes('class="contact-box') || l.includes('id="contactForm') || l.includes('<style') || l.includes('</style>')) {
    console.log((idx + 1) + ': ' + l.trim());
  }
});
