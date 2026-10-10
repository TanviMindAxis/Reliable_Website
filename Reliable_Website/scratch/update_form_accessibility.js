const fs = require('fs');

// 1. Update contact.html
let contact = fs.readFileSync('contact.html', 'utf8');
contact = contact.replace('<label class="contact-label">Full Name *</label>', '<label class="contact-label" for="contact-name">Full Name *</label>');
contact = contact.replace('id="contact-name" name="Full Name" class="contact-input-field" placeholder="Enter full name" required', 'id="contact-name" name="Full Name" class="contact-input-field" placeholder="Enter full name" autocomplete="name" required');

contact = contact.replace('<label class="contact-label">Company / Firm Name</label>', '<label class="contact-label" for="contact-company">Company / Firm Name</label>');
contact = contact.replace('id="contact-company" name="Company / Firm Name" class="contact-input-field" placeholder="Organization name"', 'id="contact-company" name="Company / Firm Name" class="contact-input-field" placeholder="Organization name" autocomplete="organization"');

contact = contact.replace('<label class="contact-label">Email Address *</label>', '<label class="contact-label" for="contact-email">Email Address *</label>');
contact = contact.replace('id="contact-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" required', 'id="contact-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" autocomplete="email" required');

contact = contact.replace('<label class="contact-label">Phone Number *</label>', '<label class="contact-label" for="contact-phone">Phone Number *</label>');
contact = contact.replace('id="contact-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777" required', 'id="contact-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777" autocomplete="tel" required');

contact = contact.replace('<label class="contact-label">Survey Service Required *</label>', '<label class="contact-label" for="contact-service">Survey Service Required *</label>');
contact = contact.replace('<label class="contact-label">Project Location & Scope</label>', '<label class="contact-label" for="contact-location">Project Location & Scope</label>');
contact = contact.replace('<label class="contact-label">Message *</label>', '<label class="contact-label" for="contact-message">Message *</label>');
fs.writeFileSync('contact.html', contact, 'utf8');
console.log('Updated contact.html accessibility attributes.');

// 2. Update review.html
let review = fs.readFileSync('review.html', 'utf8');
review = review.replace('<label class="contact-label">Full Name *</label>', '<label class="contact-label" for="review-name">Full Name *</label>');
review = review.replace('id="review-name" name="Full Name" class="contact-input-field" placeholder="Enter your full name" required', 'id="review-name" name="Full Name" class="contact-input-field" placeholder="Enter your full name" autocomplete="name" required');

review = review.replace('<label class="contact-label">Company / Organization</label>', '<label class="contact-label" for="review-company">Company / Organization</label>');
review = review.replace('id="review-company" name="Company / Organization" class="contact-input-field" placeholder="Firm or project name"', 'id="review-company" name="Company / Organization" class="contact-input-field" placeholder="Firm or project name" autocomplete="organization"');

review = review.replace('<label class="contact-label">Email Address *</label>', '<label class="contact-label" for="review-email">Email Address *</label>');
review = review.replace('id="review-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" required', 'id="review-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" autocomplete="email" required');

review = review.replace('<label class="contact-label">Phone Number</label>', '<label class="contact-label" for="review-phone">Phone Number</label>');
review = review.replace('id="review-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777"', 'id="review-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777" autocomplete="tel"');

review = review.replace('<label class="contact-label">Service Utilized *</label>', '<label class="contact-label" for="review-service">Service Utilized *</label>');
review = review.replace('<label class="contact-label">Service Rating *</label>', '<label class="contact-label" for="review-rating">Service Rating *</label>');
review = review.replace('<label class="contact-label">Project Location / Scope</label>', '<label class="contact-label" for="review-location">Project Location / Scope</label>');
review = review.replace('<label class="contact-label">Your Review & Comments *</label>', '<label class="contact-label" for="review-comments">Your Review & Comments *</label>');
fs.writeFileSync('review.html', review, 'utf8');
console.log('Updated review.html accessibility attributes.');
