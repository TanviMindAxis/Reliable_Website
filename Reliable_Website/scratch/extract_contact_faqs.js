const fs = require('fs');
const c = fs.readFileSync('contact.html', 'utf8');

const qMatches = Array.from(c.matchAll(/<h4[^>]*class=["']faq-question["'][^>]*>([\s\S]*?)<\/h4>/gi));
const aMatches = Array.from(c.matchAll(/<div[^>]*class=["']faq-answer["'][^>]*>([\s\S]*?)<\/div>/gi));

console.log('Found Qs:', qMatches.length, 'As:', aMatches.length);
const faqs = [];
qMatches.forEach((q, i) => {
    const qText = q[1].replace(/<[^>]*>/g, '').trim();
    const aText = aMatches[i] ? aMatches[i][1].replace(/<[^>]*>/g, '').trim() : '';
    faqs.push({ question: qText, answer: aText });
});

console.log(JSON.stringify(faqs, null, 2));
