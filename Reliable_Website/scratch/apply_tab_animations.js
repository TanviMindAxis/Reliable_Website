const fs = require('fs');
const path = require('path');

// 1. UPDATE contact.html
const contactPath = path.join(__dirname, '..', 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

const oldInfoBlockCss = `            .info-block-row {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 10px;
                padding: 14px 16px;
                display: flex;
                gap: 14px;
                align-items: center;
                transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            }
            .info-block-row:hover {
                border-color: #94a3b8;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(8, 43, 76, 0.08);
                background: #ffffff;
            }`;

const newInfoBlockCss = `            /* CONTINUOUS ANIMATED TABS SYSTEM */
            @keyframes tabFloatContinuous {
                0%, 100% {
                    transform: translateY(0);
                    border-color: #cbd5e1;
                    box-shadow: 0 3px 10px rgba(8, 43, 76, 0.04);
                    background: #f8fafc;
                }
                50% {
                    transform: translateY(-3.5px);
                    border-color: rgba(244, 123, 32, 0.55);
                    box-shadow: 0 10px 24px rgba(8, 43, 76, 0.09), 0 0 0 1px rgba(244, 123, 32, 0.22);
                    background: #ffffff;
                }
            }
            @keyframes tabShimmerSweep {
                0%, 35% {
                    left: -120%;
                }
                75%, 100% {
                    left: 170%;
                }
            }
            @keyframes iconBeaconGlow {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(244, 123, 32, 0);
                }
                50% {
                    transform: scale(1.08);
                    box-shadow: 0 0 14px 2px rgba(244, 123, 32, 0.28);
                }
            }
            @keyframes actionMapFloat {
                0%, 100% {
                    transform: translateY(0);
                    box-shadow: 0 4px 12px rgba(8, 43, 76, 0.15);
                }
                50% {
                    transform: translateY(-2.5px);
                    box-shadow: 0 8px 20px rgba(8, 43, 76, 0.28);
                }
            }
            @keyframes actionWaFloat {
                0%, 100% {
                    transform: translateY(0);
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
                }
                50% {
                    transform: translateY(-2.5px);
                    box-shadow: 0 10px 22px rgba(37, 211, 102, 0.45);
                }
            }
            @keyframes faqCardContinuous {
                0%, 100% {
                    transform: translateY(0);
                    border-color: #cbd5e1;
                    box-shadow: 0 4px 15px rgba(8, 43, 76, 0.03);
                }
                50% {
                    transform: translateY(-2.5px);
                    border-color: rgba(244, 123, 32, 0.42);
                    box-shadow: 0 10px 24px rgba(8, 43, 76, 0.08), 0 0 0 1px rgba(244, 123, 32, 0.18);
                }
            }
            @keyframes faqBarContinuous {
                0%, 100% {
                    opacity: 0.25;
                    transform: scaleY(0.35);
                }
                50% {
                    opacity: 0.85;
                    transform: scaleY(0.9);
                }
            }

            .info-block-row {
                background: #f8fafc;
                border: 1.5px solid #cbd5e1;
                border-radius: 10px;
                padding: 14px 16px;
                display: flex;
                gap: 14px;
                align-items: center;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            border-color 0.3s ease, 
                            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            background 0.3s ease;
                animation: tabFloatContinuous 4s ease-in-out infinite;
                will-change: transform, box-shadow, border-color;
            }

            /* Elegant light sheen reflection moving across each tab */
            .info-block-row::after {
                content: '';
                position: absolute;
                top: 0;
                left: -120%;
                width: 60%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
                transform: skewX(-22deg);
                pointer-events: none;
                animation: tabShimmerSweep 4s ease-in-out infinite;
            }

            /* Staggered continuous delays for the 5 tabs */
            .info-block-row:nth-child(1),
            .info-block-row:nth-child(1)::after {
                animation-delay: 0s;
            }
            .info-block-row:nth-child(2),
            .info-block-row:nth-child(2)::after {
                animation-delay: 0.8s;
            }
            .info-block-row:nth-child(3),
            .info-block-row:nth-child(3)::after {
                animation-delay: 1.6s;
            }
            .info-block-row:nth-child(4),
            .info-block-row:nth-child(4)::after {
                animation-delay: 2.4s;
            }
            .info-block-row:nth-child(5),
            .info-block-row:nth-child(5)::after {
                animation-delay: 3.2s;
            }

            /* Continuous soft pulse for icon badges inside the tabs */
            .info-block-row > div:first-child {
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
                animation: iconBeaconGlow 4s ease-in-out infinite;
            }
            .info-block-row:nth-child(1) > div:first-child { animation-delay: 0s; }
            .info-block-row:nth-child(2) > div:first-child { animation-delay: 0.8s; }
            .info-block-row:nth-child(3) > div:first-child { animation-delay: 1.6s; }
            .info-block-row:nth-child(4) > div:first-child { animation-delay: 2.4s; }
            .info-block-row:nth-child(5) > div:first-child { animation-delay: 3.2s; }

            /* Interactive Hover State: pauses continuous wave and locks in elevated focus */
            .info-block-row:hover {
                animation-play-state: paused;
                border-color: var(--accent-orange) !important;
                transform: translateY(-4px) scale(1.01) !important;
                box-shadow: 0 14px 28px rgba(8, 43, 76, 0.12), 0 0 0 1.5px rgba(244, 123, 32, 0.35) !important;
                background: #ffffff !important;
            }
            .info-block-row:hover::after {
                opacity: 0;
            }
            .info-block-row:hover > div:first-child {
                animation-play-state: paused;
                transform: scale(1.12);
                box-shadow: 0 0 16px 3px rgba(244, 123, 32, 0.35);
            }

            /* Action tabs (View on Map & WhatsApp) continuous breathing */
            .contact-map-tab-btn {
                animation: actionMapFloat 3.2s ease-in-out infinite;
            }
            .contact-wa-tab-btn {
                animation: actionWaFloat 3.2s ease-in-out infinite 1.6s;
            }
            .contact-map-tab-btn:hover,
            .contact-wa-tab-btn:hover {
                animation-play-state: paused !important;
            }

            /* FAQ continuous breathing animations */
            .faq-card {
                animation: faqCardContinuous 4.8s ease-in-out infinite;
                will-change: transform, box-shadow, border-color;
            }
            .faq-card::before {
                animation: faqBarContinuous 4.8s ease-in-out infinite;
            }
            .faq-card:nth-child(1), .faq-card:nth-child(1)::before { animation-delay: 0s; }
            .faq-card:nth-child(2), .faq-card:nth-child(2)::before { animation-delay: 0.8s; }
            .faq-card:nth-child(3), .faq-card:nth-child(3)::before { animation-delay: 1.6s; }
            .faq-card:nth-child(4), .faq-card:nth-child(4)::before { animation-delay: 2.4s; }
            .faq-card:nth-child(5), .faq-card:nth-child(5)::before { animation-delay: 3.2s; }
            .faq-card:nth-child(6), .faq-card:nth-child(6)::before { animation-delay: 4.0s; }
            .faq-card:hover, .faq-card:focus-within, .faq-card.is-active {
                animation-play-state: paused;
            }
            .faq-card:hover::before, .faq-card:focus-within::before, .faq-card.is-active::before {
                animation-play-state: paused;
            }`;

// Normalize line endings for replacement
const normalize = s => s.replace(/\r\n/g, '\n');

if (normalize(contactHtml).includes(normalize(oldInfoBlockCss))) {
  contactHtml = normalize(contactHtml).replace(normalize(oldInfoBlockCss), normalize(newInfoBlockCss));
  // Convert back to CRLF
  contactHtml = contactHtml.replace(/\n/g, '\r\n');
  console.log('Successfully replaced info-block-row CSS in contact.html');
} else {
  console.error('Could not find oldInfoBlockCss in contact.html');
}

// Add classes to Map and WhatsApp buttons in contact.html
contactHtml = contactHtml.replace(
  '<a href="https://maps.google.com/?q=Pune,+Maharashtra" target="_blank" rel="noopener" style="background: var(--dark-navy);',
  '<a href="https://maps.google.com/?q=Pune,+Maharashtra" target="_blank" rel="noopener" class="contact-map-tab-btn" style="background: var(--dark-navy);'
);
contactHtml = contactHtml.replace(
  '<a href="https://wa.me/919604646777" target="_blank" rel="noopener" style="background: #25D366;',
  '<a href="https://wa.me/919604646777" target="_blank" rel="noopener" class="contact-wa-tab-btn" style="background: #25D366;'
);

fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Saved contact.html');

// 2. UPDATE css/style.css for sitewide rules
const stylePath = path.join(__dirname, '..', 'css', 'style.css');
let styleCss = fs.readFileSync(stylePath, 'utf8');

// Update .faq-card and .faq-card::before in style.css
const oldFaqCardCss = `.faq-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(8, 43, 76, 0.03);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.faq-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent-orange);
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}`;

const newFaqCardCss = `/* FAQ CONTINUOUS ANIMATIONS */
@keyframes faqCardContinuous {
  0%, 100% {
    transform: translateY(0);
    border-color: #cbd5e1;
    box-shadow: 0 4px 15px rgba(8, 43, 76, 0.03);
  }
  50% {
    transform: translateY(-2.5px);
    border-color: rgba(244, 123, 32, 0.42);
    box-shadow: 0 10px 24px rgba(8, 43, 76, 0.08), 0 0 0 1px rgba(244, 123, 32, 0.18);
  }
}

@keyframes faqBarContinuous {
  0%, 100% {
    opacity: 0.25;
    transform: scaleY(0.35);
  }
  50% {
    opacity: 0.85;
    transform: scaleY(0.9);
  }
}

.faq-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(8, 43, 76, 0.03);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  animation: faqCardContinuous 4.8s ease-in-out infinite;
  will-change: transform, box-shadow, border-color;
}

.faq-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent-orange);
  opacity: 0.25;
  transform: scaleY(0.35);
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  animation: faqBarContinuous 4.8s ease-in-out infinite;
}

.faq-card:nth-child(1), .faq-card:nth-child(1)::before { animation-delay: 0s; }
.faq-card:nth-child(2), .faq-card:nth-child(2)::before { animation-delay: 0.8s; }
.faq-card:nth-child(3), .faq-card:nth-child(3)::before { animation-delay: 1.6s; }
.faq-card:nth-child(4), .faq-card:nth-child(4)::before { animation-delay: 2.4s; }
.faq-card:nth-child(5), .faq-card:nth-child(5)::before { animation-delay: 3.2s; }
.faq-card:nth-child(6), .faq-card:nth-child(6)::before { animation-delay: 4.0s; }

.faq-card:hover, .faq-card:focus-within, .faq-card.is-active {
  animation-play-state: paused;
}
.faq-card:hover::before, .faq-card:focus-within::before, .faq-card.is-active::before {
  animation-play-state: paused;
}`;

if (normalize(styleCss).includes(normalize(oldFaqCardCss))) {
  styleCss = normalize(styleCss).replace(normalize(oldFaqCardCss), normalize(newFaqCardCss));
  console.log('Successfully replaced .faq-card in style.css');
} else {
  console.error('Could not find oldFaqCardCss in style.css');
}

// Also update .info-block-row in style.css
const oldStyleInfoBlock = `.info-block-row {
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.info-block-row:hover {
  border-color: #94a3b8;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(8, 43, 76, 0.08);
  background: #ffffff;
}`;

const newStyleInfoBlock = `/* INFO TAB CONTINUOUS ANIMATIONS */
@keyframes tabFloatContinuous {
  0%, 100% {
    transform: translateY(0);
    border-color: #cbd5e1;
    box-shadow: 0 3px 10px rgba(8, 43, 76, 0.04);
    background: #f8fafc;
  }
  50% {
    transform: translateY(-3.5px);
    border-color: rgba(244, 123, 32, 0.55);
    box-shadow: 0 10px 24px rgba(8, 43, 76, 0.09), 0 0 0 1px rgba(244, 123, 32, 0.22);
    background: #ffffff;
  }
}
@keyframes tabShimmerSweep {
  0%, 35% {
    left: -120%;
  }
  75%, 100% {
    left: 170%;
  }
}
@keyframes iconBeaconGlow {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 123, 32, 0);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 14px 2px rgba(244, 123, 32, 0.28);
  }
}

.info-block-row {
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  gap: 14px;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              border-color 0.3s ease, 
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              background 0.3s ease;
  animation: tabFloatContinuous 4s ease-in-out infinite;
  will-change: transform, box-shadow, border-color;
}

.info-block-row::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent);
  transform: skewX(-22deg);
  pointer-events: none;
  animation: tabShimmerSweep 4s ease-in-out infinite;
}

.info-block-row:nth-child(1), .info-block-row:nth-child(1)::after { animation-delay: 0s; }
.info-block-row:nth-child(2), .info-block-row:nth-child(2)::after { animation-delay: 0.8s; }
.info-block-row:nth-child(3), .info-block-row:nth-child(3)::after { animation-delay: 1.6s; }
.info-block-row:nth-child(4), .info-block-row:nth-child(4)::after { animation-delay: 2.4s; }
.info-block-row:nth-child(5), .info-block-row:nth-child(5)::after { animation-delay: 3.2s; }

.info-block-row > div:first-child {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  animation: iconBeaconGlow 4s ease-in-out infinite;
}
.info-block-row:nth-child(1) > div:first-child { animation-delay: 0s; }
.info-block-row:nth-child(2) > div:first-child { animation-delay: 0.8s; }
.info-block-row:nth-child(3) > div:first-child { animation-delay: 1.6s; }
.info-block-row:nth-child(4) > div:first-child { animation-delay: 2.4s; }
.info-block-row:nth-child(5) > div:first-child { animation-delay: 3.2s; }

.info-block-row:hover {
  animation-play-state: paused;
  border-color: var(--accent-orange) !important;
  transform: translateY(-4px) scale(1.01) !important;
  box-shadow: 0 14px 28px rgba(8, 43, 76, 0.12), 0 0 0 1.5px rgba(244, 123, 32, 0.35) !important;
  background: #ffffff !important;
}
.info-block-row:hover::after {
  opacity: 0;
}
.info-block-row:hover > div:first-child {
  animation-play-state: paused;
  transform: scale(1.12);
  box-shadow: 0 0 16px 3px rgba(244, 123, 32, 0.35);
}`;

if (normalize(styleCss).includes(normalize(oldStyleInfoBlock))) {
  styleCss = normalize(styleCss).replace(normalize(oldStyleInfoBlock), normalize(newStyleInfoBlock));
  console.log('Successfully replaced .info-block-row in style.css');
} else {
  console.error('Could not find oldStyleInfoBlock in style.css');
}

// Convert back to CRLF and save style.css
styleCss = styleCss.replace(/\n/g, '\r\n');
fs.writeFileSync(stylePath, styleCss, 'utf8');
console.log('Saved css/style.css');

// 3. UPDATE review.html
const reviewPath = path.join(__dirname, '..', 'review.html');
if (fs.existsSync(reviewPath)) {
  let reviewHtml = fs.readFileSync(reviewPath, 'utf8');
  if (normalize(reviewHtml).includes(normalize(oldInfoBlockCss))) {
    reviewHtml = normalize(reviewHtml).replace(normalize(oldInfoBlockCss), normalize(newInfoBlockCss));
    reviewHtml = reviewHtml.replace(/\n/g, '\r\n');
    fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
    console.log('Saved review.html');
  }
}
