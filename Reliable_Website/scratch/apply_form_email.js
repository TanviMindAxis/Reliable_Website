const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const norm = s => s.replace(/\r\n/g, '\n');

// 1. UPDATE contact.html
const contactPath = path.join(baseDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

const oldContactForm = `<form id="contactForm" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
                        <div class="contact-form-grid">
                            <div>
                                <label class="contact-label">Full Name *</label>
                                <input type="text" id="contact-name" class="contact-input-field" placeholder="Enter full name" required>
                            </div>
                            <div>
                                <label class="contact-label">Company / Firm Name</label>
                                <input type="text" id="contact-company" class="contact-input-field" placeholder="Organization name">
                            </div>
                            <div>
                                <label class="contact-label">Email Address *</label>
                                <input type="email" id="contact-email" class="contact-input-field" placeholder="name@example.com" required>
                            </div>
                            <div>
                                <label class="contact-label">Phone Number *</label>
                                <input type="tel" id="contact-phone" class="contact-input-field" placeholder="+91 96046 46777" required>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Survey Service Required *</label>
                                <select id="contact-service" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select a survey service...</option>
                                    <option value="Topographical Survey">Topographical & Land Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control Establishment</option>
                                    <option value="Total Station Survey">Total Station Measurement & Layout</option>
                                    <option value="RTK Drone Mapping">RTK Drone Aerial Mapping & Photogrammetry</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Alignment Survey</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Infrastructure Survey</option>
                                    <option value="CAD & GIS Processing">CAD Drafting & GIS Processing</option>
                                    <option value="General Consultation">General Survey Consultation</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Project Location & Scope</label>
                                <input type="text" id="contact-location" class="contact-input-field" placeholder="e.g. Pune, PCMC, Hinjewadi, or Acreage/KM">
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Message *</label>
                                <textarea id="contact-message" class="contact-input-field" rows="3" placeholder="Describe site details, required deliverables (Contours, 3D CAD, Point Cloud), and timeline..." required style="resize: vertical;"></textarea>
                            </div>
                        </div>

                        <div style="margin-top: 18px;">
                            <button type="submit" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                Submit Consultation Request
                            </button>
                        </div>
                    </form>`;

const newContactForm = `<div id="contactFormStatus" style="display: none; padding: 16px 20px; border-radius: 10px; margin-bottom: 22px; font-size: 14.5px; line-height: 1.55; box-shadow: 0 4px 15px rgba(8, 43, 76, 0.06); transition: all 0.3s ease;"></div>

                    <form id="contactForm" action="https://formsubmit.co/tanviii6104@gmail.com" method="POST" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
                        <!-- Destination & Configuration Fields -->
                        <input type="hidden" name="_subject" value="New Project Quotation Request - Reliable Land Survey">
                        <input type="hidden" name="_template" value="table">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_next" value="contact.html?submitted=true">
                        <input type="text" name="_honey" style="display:none">

                        <div class="contact-form-grid">
                            <div>
                                <label class="contact-label">Full Name *</label>
                                <input type="text" id="contact-name" name="Full Name" class="contact-input-field" placeholder="Enter full name" required>
                            </div>
                            <div>
                                <label class="contact-label">Company / Firm Name</label>
                                <input type="text" id="contact-company" name="Company / Firm Name" class="contact-input-field" placeholder="Organization name">
                            </div>
                            <div>
                                <label class="contact-label">Email Address *</label>
                                <input type="email" id="contact-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" required>
                            </div>
                            <div>
                                <label class="contact-label">Phone Number *</label>
                                <input type="tel" id="contact-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777" required>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Survey Service Required *</label>
                                <select id="contact-service" name="Survey Service Required" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select a survey service...</option>
                                    <option value="Topographical Survey">Topographical & Land Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control Establishment</option>
                                    <option value="Total Station Survey">Total Station Measurement & Layout</option>
                                    <option value="RTK Drone Mapping">RTK Drone Aerial Mapping & Photogrammetry</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Alignment Survey</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Infrastructure Survey</option>
                                    <option value="CAD & GIS Processing">CAD Drafting & GIS Processing</option>
                                    <option value="General Consultation">General Survey Consultation</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Project Location & Scope</label>
                                <input type="text" id="contact-location" name="Project Location & Scope" class="contact-input-field" placeholder="e.g. Pune, PCMC, Hinjewadi, or Acreage/KM">
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Message *</label>
                                <textarea id="contact-message" name="Project Details & Deliverables" class="contact-input-field" rows="3" placeholder="Describe site details, required deliverables (Contours, 3D CAD, Point Cloud), and timeline..." required style="resize: vertical;"></textarea>
                            </div>
                        </div>

                        <div style="margin-top: 18px;">
                            <button type="submit" id="contactSubmitBtn" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                Submit Consultation Request
                            </button>
                        </div>
                    </form>`;

if (norm(contactHtml).includes(norm(oldContactForm))) {
    contactHtml = norm(contactHtml).replace(norm(oldContactForm), norm(newContactForm));
    console.log('Successfully updated contact.html form structure.');
} else {
    console.error('Could not find oldContactForm in contact.html');
}

// Add inline script before </body> in contact.html for immediate handler
const contactScript = `
    <!-- Contact Form AJAX Submission & Redirect Handler -->
    <script>
    (function() {
        // Check for redirect return status (?submitted=true)
        if (window.location.search.indexOf('submitted=true') !== -1) {
            var statusBox = document.getElementById('contactFormStatus');
            if (statusBox) {
                statusBox.style.display = 'block';
                statusBox.style.background = '#ecfdf5';
                statusBox.style.border = '1.5px solid #10b981';
                statusBox.style.color = '#065f46';
                statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Quotation Request Sent Successfully!</strong><br>' +
                    'Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). Our survey engineers will review the scope and contact you within 24 hours.</div></div>';
                statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = document.getElementById('contactSubmitBtn') || form.querySelector('button[type="submit"]');
            var statusBox = document.getElementById('contactFormStatus');
            var originalText = btn ? btn.innerHTML : 'Submit Consultation Request';

            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.75';
                btn.style.cursor = 'not-allowed';
                btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">Submitting Request...</span>';
            }

            if (statusBox) {
                statusBox.style.display = 'none';
            }

            var formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/tanviii6104@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#ecfdf5';
                    statusBox.style.border = '1.5px solid #10b981';
                    statusBox.style.color = '#065f46';
                    statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Quotation Request Sent Successfully!</strong><br>' +
                        'Thank you. Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). Our survey engineers will review the scope and contact you within 24 hours.</div></div>';
                    statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
            })
            .catch(function(err) {
                console.warn('AJAX error, falling back to standard submit:', err);
                form.submit();
            })
            .finally(function() {
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.innerHTML = originalText;
                }
            });
        });
    })();
    </script>
`;

contactHtml = norm(contactHtml).replace('</body>', contactScript + '\n</body>');
// Update cache buster
contactHtml = contactHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_02');
contactHtml = contactHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Saved contact.html');

// 2. UPDATE review.html
const reviewPath = path.join(baseDir, 'review.html');
let reviewHtml = fs.readFileSync(reviewPath, 'utf8');

const oldReviewForm = `<form id="reviewForm" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
                        <div class="contact-form-grid">
                            <div>
                                <label class="contact-label">Full Name *</label>
                                <input type="text" id="review-name" class="contact-input-field" placeholder="Enter your full name" required>
                            </div>
                            <div>
                                <label class="contact-label">Company / Organization</label>
                                <input type="text" id="review-company" class="contact-input-field" placeholder="Firm or project name">
                            </div>
                            <div>
                                <label class="contact-label">Email Address *</label>
                                <input type="email" id="review-email" class="contact-input-field" placeholder="name@example.com" required>
                            </div>
                            <div>
                                <label class="contact-label">Phone Number</label>
                                <input type="tel" id="review-phone" class="contact-input-field" placeholder="+91 96046 46777">
                            </div>
                            <div>
                                <label class="contact-label">Service Utilized *</label>
                                <select id="review-service" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select service utilized...</option>
                                    <option value="Topographical Survey">Topographical Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control</option>
                                    <option value="Total Station Survey">Total Station Measurement</option>
                                    <option value="RTK Drone Mapping">RTK Drone Mapping & Photogrammetry</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Alignment</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Survey</option>
                                    <option value="CAD & GIS Services">CAD Drafting & GIS Processing</option>
                                </select>
                            </div>
                            <div>
                                <label class="contact-label">Service Rating *</label>
                                <select id="review-rating" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="5" selected>⭐⭐⭐⭐⭐ - Excellent (5/5)</option>
                                    <option value="4">⭐⭐⭐⭐ - Very Good (4/5)</option>
                                    <option value="3">⭐⭐⭐ - Good (3/5)</option>
                                    <option value="2">⭐⭐ - Average (2/5)</option>
                                    <option value="1">⭐ - Needs Improvement (1/5)</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Project Location / Scope</label>
                                <input type="text" id="review-location" class="contact-input-field" placeholder="e.g. Hinjewadi IT Park, Pune / 100 Acre Layout">
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Your Review & Comments *</label>
                                <textarea id="review-comments" class="contact-input-field" rows="3" placeholder="Please share your experience regarding our accuracy, team responsiveness, and delivery speed..." required style="resize: vertical;"></textarea>
                            </div>
                        </div>

                        <div style="margin-top: 18px;">
                            <button type="submit" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                Submit Your Review
                            </button>
                        </div>
                    </form>`;

const newReviewForm = `<div id="reviewFormStatus" style="display: none; padding: 16px 20px; border-radius: 10px; margin-bottom: 22px; font-size: 14.5px; line-height: 1.55; box-shadow: 0 4px 15px rgba(8, 43, 76, 0.06); transition: all 0.3s ease;"></div>

                    <form id="reviewForm" action="https://formsubmit.co/tanviii6104@gmail.com" method="POST" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
                        <input type="hidden" name="_subject" value="New Client Review - Reliable Land Survey">
                        <input type="hidden" name="_template" value="table">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_next" value="review.html?submitted=true">
                        <input type="text" name="_honey" style="display:none">

                        <div class="contact-form-grid">
                            <div>
                                <label class="contact-label">Full Name *</label>
                                <input type="text" id="review-name" name="Full Name" class="contact-input-field" placeholder="Enter your full name" required>
                            </div>
                            <div>
                                <label class="contact-label">Company / Organization</label>
                                <input type="text" id="review-company" name="Company / Organization" class="contact-input-field" placeholder="Firm or project name">
                            </div>
                            <div>
                                <label class="contact-label">Email Address *</label>
                                <input type="email" id="review-email" name="Email Address" class="contact-input-field" placeholder="name@example.com" required>
                            </div>
                            <div>
                                <label class="contact-label">Phone Number</label>
                                <input type="tel" id="review-phone" name="Phone Number" class="contact-input-field" placeholder="+91 96046 46777">
                            </div>
                            <div>
                                <label class="contact-label">Service Utilized *</label>
                                <select id="review-service" name="Service Utilized" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="" disabled selected>Select service utilized...</option>
                                    <option value="Topographical Survey">Topographical Survey</option>
                                    <option value="DGPS / GNSS Control">DGPS / GNSS Control</option>
                                    <option value="Total Station Survey">Total Station Measurement</option>
                                    <option value="RTK Drone Mapping">RTK Drone Mapping & Photogrammetry</option>
                                    <option value="Drone LiDAR Scanning">Drone LiDAR & 3D Scanning</option>
                                    <option value="Road & Highway Survey">Road & Highway Alignment</option>
                                    <option value="Rail & Metro Survey">Rail & Metro Survey</option>
                                    <option value="CAD & GIS Services">CAD Drafting & GIS Processing</option>
                                </select>
                            </div>
                            <div>
                                <label class="contact-label">Service Rating *</label>
                                <select id="review-rating" name="Service Rating" class="contact-input-field" required style="cursor: pointer;">
                                    <option value="5" selected>⭐⭐⭐⭐⭐ - Excellent (5/5)</option>
                                    <option value="4">⭐⭐⭐⭐ - Very Good (4/5)</option>
                                    <option value="3">⭐⭐⭐ - Good (3/5)</option>
                                    <option value="2">⭐⭐ - Average (2/5)</option>
                                    <option value="1">⭐ - Needs Improvement (1/5)</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Project Location / Scope</label>
                                <input type="text" id="review-location" name="Project Location / Scope" class="contact-input-field" placeholder="e.g. Hinjewadi IT Park, Pune / 100 Acre Layout">
                            </div>
                            <div class="full-width">
                                <label class="contact-label">Your Review & Comments *</label>
                                <textarea id="review-comments" name="Review & Comments" class="contact-input-field" rows="3" placeholder="Please share your experience regarding our accuracy, team responsiveness, and delivery speed..." required style="resize: vertical;"></textarea>
                            </div>
                        </div>

                        <div style="margin-top: 18px;">
                            <button type="submit" id="reviewSubmitBtn" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                                Submit Your Review
                            </button>
                        </div>
                    </form>`;

if (norm(reviewHtml).includes(norm(oldReviewForm))) {
    reviewHtml = norm(reviewHtml).replace(norm(oldReviewForm), norm(newReviewForm));
    console.log('Successfully updated review.html form structure.');
} else {
    console.error('Could not find oldReviewForm in review.html');
}

const reviewScript = `
    <!-- Review Form AJAX Submission & Redirect Handler -->
    <script>
    (function() {
        if (window.location.search.indexOf('submitted=true') !== -1) {
            var statusBox = document.getElementById('reviewFormStatus');
            if (statusBox) {
                statusBox.style.display = 'block';
                statusBox.style.background = '#ecfdf5';
                statusBox.style.border = '1.5px solid #10b981';
                statusBox.style.color = '#065f46';
                statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                    '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong><br>' +
                    'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.</div></div>';
                statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        var form = document.getElementById('reviewForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = document.getElementById('reviewSubmitBtn') || form.querySelector('button[type="submit"]');
            var statusBox = document.getElementById('reviewFormStatus');
            var originalText = btn ? btn.innerHTML : 'Submit Your Review';

            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.75';
                btn.style.cursor = 'not-allowed';
                btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">Submitting Review...</span>';
            }

            if (statusBox) {
                statusBox.style.display = 'none';
            }

            var formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/tanviii6104@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#ecfdf5';
                    statusBox.style.border = '1.5px solid #10b981';
                    statusBox.style.color = '#065f46';
                    statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Review Submitted Successfully!</strong><br>' +
                        'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.</div></div>';
                    statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
            })
            .catch(function(err) {
                console.warn('AJAX error, falling back to standard submit:', err);
                form.submit();
            })
            .finally(function() {
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.innerHTML = originalText;
                }
            });
        });
    })();
    </script>
`;

reviewHtml = norm(reviewHtml).replace('</body>', reviewScript + '\n</body>');
reviewHtml = reviewHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_02');
reviewHtml = reviewHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
console.log('Saved review.html');

// 3. UPDATE js/script.js
const scriptPath = path.join(baseDir, 'js', 'script.js');
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

const globalFormHandler = `
    /* ==========================================
       12. DIRECT EMAIL FORM SUBMISSION TO tanviii6104@gmail.com
    ========================================== */
    function setupFormSubmit(formId, statusId, btnId, successMsg) {
        var form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = document.getElementById(btnId) || form.querySelector('button[type="submit"]');
            var statusBox = document.getElementById(statusId);
            var originalText = btn ? btn.innerHTML : 'Submit';

            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.75';
                btn.style.cursor = 'not-allowed';
                btn.innerHTML = 'Submitting...';
            }

            if (statusBox) {
                statusBox.style.display = 'none';
            }

            var formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/tanviii6104@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#ecfdf5';
                    statusBox.style.border = '1.5px solid #10b981';
                    statusBox.style.color = '#065f46';
                    statusBox.innerHTML = '<div style="display:flex;align-items:flex-start;gap:12px;">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>' +
                        '<div><strong style="font-size:15px;color:#064e3b;">Submitted Successfully!</strong><br>' +
                        successMsg + '</div></div>';
                    statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
            })
            .catch(function(err) {
                console.warn('AJAX fallback to native POST:', err);
                form.submit();
            })
            .finally(function() {
                if (btn) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.innerHTML = originalText;
                }
            });
        });
    }

    setupFormSubmit('contactForm', 'contactFormStatus', 'contactSubmitBtn', 'Your project specifications have been submitted directly to our engineering desk (<strong>tanviii6104@gmail.com</strong>). We will review the scope and contact you within 24 hours.');
    setupFormSubmit('reviewForm', 'reviewFormStatus', 'reviewSubmitBtn', 'Thank you for your valuable feedback. Your review has been submitted to <strong>tanviii6104@gmail.com</strong>.');
`;

if (!norm(scriptJs).includes('tanviii6104@gmail.com')) {
    scriptJs = norm(scriptJs).replace('});\n\n', globalFormHandler + '\n});\n\n');
    scriptJs = scriptJs.replace(/\n/g, '\r\n');
    fs.writeFileSync(scriptPath, scriptJs, 'utf8');
    console.log('Saved js/script.js with email submission handler.');
} else {
    console.log('js/script.js already contains email handler.');
}
