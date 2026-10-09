const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerIdx = content.indexOf('<footer');
  if (footerIdx === -1) {
    console.log(`=== ${f}: NO FOOTER FOUND ===`);
    return;
  }
  const footerHtml = content.substring(footerIdx);
  console.log(`\n=================== ${f} ===================`);
  
  const footerLinksRegex = /<div class="footer-links"[\s\S]*?<\/div>/g;
  let matches = [...footerHtml.matchAll(footerLinksRegex)];
  matches.forEach((m, i) => {
    console.log(`-- Column ${i + 2} links:`);
    const linkRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    let linkMatches = [...m[0].matchAll(linkRegex)];
    linkMatches.forEach(lm => {
      const href = lm[1];
      const text = lm[2].replace(/<[^>]+>/g, '').trim();
      console.log(`   [${text}] -> ${href}`);
    });
  });
});
