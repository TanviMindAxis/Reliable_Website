const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const norm = s => s.replace(/\r\n/g, '\n');

// 1. UPDATE contact.html
const contactPath = path.join(baseDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

// Ensure contact-box-left and contact-box-right are ALWAYS visible
contactHtml = norm(contactHtml).replace(
    `.contact-box-left {
                opacity: 0;
                transform: translateX(-120px);
                transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
            }
            .contact-box-right {
                opacity: 0;
                transform: translateX(120px);
                transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
            }`,
    `.contact-box-left,
            .contact-box-right {
                opacity: 1 !important;
                transform: none !important;
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
            }`
);

// Remove fade-up from section tags in contact.html so sections are never hidden
contactHtml = contactHtml.replace('<section class="section fade-up" style="padding: 85px 0 95px 0;', '<section class="section" style="padding: 85px 0 95px 0;');
contactHtml = contactHtml.replace('<section class="section fade-up" style="position: relative; padding: 100px 0 115px 0;', '<section class="section" style="position: relative; padding: 100px 0 115px 0;');

// Update cache buster in contact.html
contactHtml = contactHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_03');

contactHtml = contactHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Saved contact.html with permanent visibility.');

// 2. UPDATE review.html
const reviewPath = path.join(baseDir, 'review.html');
let reviewHtml = fs.readFileSync(reviewPath, 'utf8');

reviewHtml = norm(reviewHtml).replace(
    `.contact-box-left {
                opacity: 0;
                transform: translateX(-120px);
                transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
            }
            .contact-box-right {
                opacity: 0;
                transform: translateX(120px);
                transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
            }`,
    `.contact-box-left,
            .contact-box-right {
                opacity: 1 !important;
                transform: none !important;
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
            }`
);
reviewHtml = reviewHtml.replace(/script\.js\?v=[^"']*/, 'script.js?v=20261009_03');
reviewHtml = reviewHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
console.log('Saved review.html with permanent visibility.');

// 3. UPDATE css/style.css
const stylePath = path.join(baseDir, 'css', 'style.css');
let styleCss = fs.readFileSync(stylePath, 'utf8');

styleCss = norm(styleCss).replace(
    `.contact-box-left {
  opacity: 0;
  transform: translateX(-120px);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
}

.contact-box-right {
  opacity: 0;
  transform: translateX(120px);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
}`,
    `.contact-box-left,
.contact-box-right {
  opacity: 1 !important;
  transform: none !important;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}`
);

styleCss = styleCss.replace(/\n/g, '\r\n');
fs.writeFileSync(stylePath, styleCss, 'utf8');
console.log('Saved css/style.css with permanent visibility.');

// 4. UPDATE js/script.js
const scriptPath = path.join(baseDir, 'js', 'script.js');
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

// Improve observer so elements never get hidden again once visible
const oldObserver = `    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Prevent jitter by only removing animation when scrolling back up (element goes below viewport)
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('animate');
                }
            }
        });
    }, observerOptions);`;

const newObserver = `    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);`;

if (norm(scriptJs).includes(norm(oldObserver))) {
    scriptJs = norm(scriptJs).replace(norm(oldObserver), norm(newObserver));
    console.log('Updated IntersectionObserver in js/script.js');
}

// Add setupFormSubmit at end of DOMContentLoaded
const formSubmitCode = `
    /* ==========================================
       12. DIRECT EMAIL FORM SUBMISSION TO tanviii6104@gmail.com
    ========================================== */
    function setupFormSubmit(formId, statusId, btnId, successMsg) {
        var form = document.getElementById(formId);
        if (!form || form._hasSubmitHandler) return;
        form._hasSubmitHandler = true;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var btn = document.getElementById(btnId) || form.querySelector('button[type="submit"]');
            var statusBox = document.getElementById(statusId);
            var originalText = btn ? btn.innerHTML : 'Submit';

            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.75';
                btn.style.cursor = 'not-allowed';
                btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">Submitting...</span>';
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

// Insert before the last closing });
const domEnd = '\n    /* Custom cursor removed per user request */\n\n});';
const newDomEnd = '\n    /* Custom cursor removed per user request */' + formSubmitCode + '\n});';

if (norm(scriptJs).includes(norm(domEnd))) {
    scriptJs = norm(scriptJs).replace(norm(domEnd), norm(newDomEnd));
    console.log('Appended formSubmitCode properly inside DOMContentLoaded in js/script.js');
}

scriptJs = scriptJs.replace(/\n/g, '\r\n');
fs.writeFileSync(scriptPath, scriptJs, 'utf8');
console.log('Saved js/script.js cleanly.');
