const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

// 1. Check contact.html
const contactPath = path.join(baseDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

console.log('Contact HTML contains arrow svg:', contactHtml.includes('<line x1="5" y1="12" x2="19" y2="12">'));

// 2. Check and clean review.html
const reviewPath = path.join(baseDir, 'review.html');
let reviewHtml = fs.readFileSync(reviewPath, 'utf8');

const reviewBtnRegex = /<button type="submit" class="btn btn-primary"[^>]*>\s*Submit Your Review\s*<svg[\s\S]*?<\/svg>\s*<\/button>/;
if (reviewBtnRegex.test(reviewHtml)) {
    reviewHtml = reviewHtml.replace(
        reviewBtnRegex,
        '<button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">\n                                Submit Your Review\n                            </button>'
    );
    fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
    console.log('Updated review.html button to remove icon.');
} else {
    console.log('review.html button regex did not match, checking contents...');
}
