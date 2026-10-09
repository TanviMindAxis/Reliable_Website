const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const norm = s => s.replace(/\r\n/g, '\n');

// 1. UPDATE contact.html
const contactPath = path.join(baseDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

const oldMsg1 = `'<div style="display:flex;align-items:flex-start;gap:12px;">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Quotation Request Sent Successfully!</strong><br>' +
                    'Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). Our survey engineers will review the scope and contact you within 24 hours.</div></div>'`;

const oldMsg2 = `'<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Quotation Request Sent Successfully!</strong><br>' +
                        'Thank you. Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). Our survey engineers will review the scope and contact you within 24 hours.</div></div>'`;

const newSuccessHtml = `'<div style="display:flex;align-items:center;gap:12px;">' +
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Request Sent Successfully!</strong> ' +
                    '<span style="font-size:14px;color:#065f46;">It will get verified within 24 hours.</span></div></div>'`;

const newSuccessHtmlIndented = `'<div style="display:flex;align-items:center;gap:12px;">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Request Sent Successfully!</strong> ' +
                        '<span style="font-size:14px;color:#065f46;">It will get verified within 24 hours.</span></div></div>'`;

if (norm(contactHtml).includes(norm(oldMsg1))) {
    contactHtml = norm(contactHtml).replace(norm(oldMsg1), norm(newSuccessHtml));
    console.log('Replaced oldMsg1 in contact.html');
}
if (norm(contactHtml).includes(norm(oldMsg2))) {
    contactHtml = norm(contactHtml).replace(norm(oldMsg2), norm(newSuccessHtmlIndented));
    console.log('Replaced oldMsg2 in contact.html');
}

// Bump cache buster
contactHtml = contactHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_04');
contactHtml = contactHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Saved contact.html');

// 2. UPDATE review.html
const reviewPath = path.join(baseDir, 'review.html');
let reviewHtml = fs.readFileSync(reviewPath, 'utf8');

const oldReviewMsg1 = `'<div style="display:flex;align-items:flex-start;gap:12px;">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong><br>' +
                    'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.</div></div>'`;

const oldReviewMsg2 = `'<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong><br>' +
                        'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.</div></div>'`;

const newReviewSuccess1 = `'<div style="display:flex;align-items:center;gap:12px;">' +
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong> ' +
                    '<span style="font-size:14px;color:#065f46;">It will get verified within 24 hours.</span></div></div>'`;

const newReviewSuccess2 = `'<div style="display:flex;align-items:center;gap:12px;">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong> ' +
                        '<span style="font-size:14px;color:#065f46;">It will get verified within 24 hours.</span></div></div>'`;

if (norm(reviewHtml).includes(norm(oldReviewMsg1))) {
    reviewHtml = norm(reviewHtml).replace(norm(oldReviewMsg1), norm(newReviewSuccess1));
    console.log('Replaced oldReviewMsg1 in review.html');
}
if (norm(reviewHtml).includes(norm(oldReviewMsg2))) {
    reviewHtml = norm(reviewHtml).replace(norm(oldReviewMsg2), norm(newReviewSuccess2));
    console.log('Replaced oldReviewMsg2 in review.html');
}

reviewHtml = reviewHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_04');
reviewHtml = reviewHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
console.log('Saved review.html');

// 3. UPDATE js/script.js
const scriptPath = path.join(baseDir, 'js', 'script.js');
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

const oldScriptMsg1 = `'Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). We will review the scope and contact you within 24 hours.'`;
const oldScriptMsg2 = `'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.'`;

const oldScriptTemplate = `'<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Submitted Successfully!</strong><br>' +
                        successMsg + '</div></div>'`;

const newScriptTemplate = `'<div style="display:flex;align-items:center;gap:12px;">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Request Sent Successfully!</strong> ' +
                        '<span style="font-size:14px;color:#065f46;">' + successMsg + '</span></div></div>'`;

if (norm(scriptJs).includes(norm(oldScriptTemplate))) {
    scriptJs = norm(scriptJs).replace(norm(oldScriptTemplate), norm(newScriptTemplate));
    console.log('Updated scriptJs template');
}
if (norm(scriptJs).includes(norm(oldScriptMsg1))) {
    scriptJs = norm(scriptJs).replace(norm(oldScriptMsg1), `'It will get verified within 24 hours.'`);
    console.log('Updated scriptJs msg1');
}
if (norm(scriptJs).includes(norm(oldScriptMsg2))) {
    scriptJs = norm(scriptJs).replace(norm(oldScriptMsg2), `'It will get verified within 24 hours.'`);
    console.log('Updated scriptJs msg2');
}

scriptJs = scriptJs.replace(/\n/g, '\r\n');
fs.writeFileSync(scriptPath, scriptJs, 'utf8');
console.log('Saved js/script.js');
