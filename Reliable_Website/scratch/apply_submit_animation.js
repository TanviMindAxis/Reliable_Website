const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const norm = s => s.replace(/\r\n/g, '\n');

// 1. UPDATE contact.html
const contactPath = path.join(baseDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

const submitCss = `
            /* CONTINUOUS ANIMATION FOR SUBMIT BUTTON */
            @keyframes submitBtnFloat {
                0%, 100% {
                    transform: translateY(0);
                    box-shadow: 0 4px 14px rgba(244, 123, 32, 0.28);
                }
                50% {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 28px rgba(244, 123, 32, 0.48), 0 0 16px rgba(244, 123, 32, 0.32);
                }
            }
            @keyframes submitBtnShimmer {
                0%, 30% {
                    left: -120%;
                }
                70%, 100% {
                    left: 170%;
                }
            }
            .submit-consultation-btn {
                position: relative;
                overflow: hidden;
                animation: submitBtnFloat 3.6s ease-in-out infinite;
                will-change: transform, box-shadow;
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                            background-color 0.25s ease;
            }
            .submit-consultation-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: -120%;
                width: 60%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
                transform: skewX(-25deg);
                pointer-events: none;
                animation: submitBtnShimmer 3.6s ease-in-out infinite;
            }
            .submit-consultation-btn:hover {
                animation-play-state: paused !important;
                background: var(--accent-orange-hover) !important;
                transform: translateY(-4px) scale(1.01) !important;
                box-shadow: 0 16px 36px rgba(244, 123, 32, 0.52), 0 0 20px rgba(244, 123, 32, 0.35) !important;
            }
            .submit-consultation-btn:hover::after {
                opacity: 0;
            }
            .submit-consultation-btn:active {
                transform: translateY(-1px) scale(0.99) !important;
                box-shadow: 0 6px 18px rgba(244, 123, 32, 0.35) !important;
            }
`;

// Insert submitCss right before </style>
const styleEndTarget = `            .info-block-tag {
                font-size: 11.5px;
                font-weight: 800;
                color: #082b4c;
                letter-spacing: 0.8px;
                text-transform: uppercase;
                margin-bottom: 3px;
                font-family: var(--font-heading);
            }
        </style>`;

const newStyleEnd = `            .info-block-tag {
                font-size: 11.5px;
                font-weight: 800;
                color: #082b4c;
                letter-spacing: 0.8px;
                text-transform: uppercase;
                margin-bottom: 3px;
                font-family: var(--font-heading);
            }${submitCss}        </style>`;

if (norm(contactHtml).includes(norm(styleEndTarget))) {
    contactHtml = norm(contactHtml).replace(norm(styleEndTarget), norm(newStyleEnd));
    console.log('Inserted submit animation CSS into contact.html');
} else {
    console.error('styleEndTarget not found in contact.html');
}

// Add submit-consultation-btn class to the button in contact.html
const oldContactBtn = '<button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">\n                                Submit Consultation Request\n                            </button>';
const newContactBtn = '<button type="submit" class="btn btn-primary submit-consultation-btn" style="width: 100%; padding: 15px 24px; font-size: 15px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center;">\n                                Submit Consultation Request\n                            </button>';

if (norm(contactHtml).includes(norm(oldContactBtn))) {
    contactHtml = norm(contactHtml).replace(norm(oldContactBtn), norm(newContactBtn));
    console.log('Added submit-consultation-btn class to button in contact.html');
} else {
    console.log('Trying single line replace for button in contact.html');
    contactHtml = contactHtml.replace(
        '<button type="submit" class="btn btn-primary" style="width: 100%;',
        '<button type="submit" class="btn btn-primary submit-consultation-btn" style="width: 100%;'
    );
}

contactHtml = contactHtml.replace(/\n/g, '\r\n');
fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Saved contact.html');

// 2. UPDATE review.html
const reviewPath = path.join(baseDir, 'review.html');
let reviewHtml = fs.readFileSync(reviewPath, 'utf8');

reviewHtml = reviewHtml.replace(
    '<button type="submit" class="btn btn-primary" style="width: 100%;',
    '<button type="submit" class="btn btn-primary submit-consultation-btn" style="width: 100%;'
);
fs.writeFileSync(reviewPath, reviewHtml, 'utf8');
console.log('Saved review.html');

// 3. UPDATE css/style.css
const stylePath = path.join(baseDir, 'css', 'style.css');
let styleCss = fs.readFileSync(stylePath, 'utf8');

const globalSubmitCss = `
/* CONTINUOUS ANIMATION FOR SUBMIT CONSULTATION REQUEST BUTTON */
@keyframes submitBtnFloat {
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 4px 14px rgba(244, 123, 32, 0.28);
  }
  50% {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(244, 123, 32, 0.48), 0 0 16px rgba(244, 123, 32, 0.32);
  }
}

@keyframes submitBtnShimmer {
  0%, 30% {
    left: -120%;
  }
  70%, 100% {
    left: 170%;
  }
}

.submit-consultation-btn {
  position: relative;
  overflow: hidden;
  animation: submitBtnFloat 3.6s ease-in-out infinite;
  will-change: transform, box-shadow;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              background-color 0.25s ease;
}

.submit-consultation-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: skewX(-25deg);
  pointer-events: none;
  animation: submitBtnShimmer 3.6s ease-in-out infinite;
}

.submit-consultation-btn:hover {
  animation-play-state: paused !important;
  background: var(--accent-orange-hover) !important;
  transform: translateY(-4px) scale(1.01) !important;
  box-shadow: 0 16px 36px rgba(244, 123, 32, 0.52), 0 0 20px rgba(244, 123, 32, 0.35) !important;
}

.submit-consultation-btn:hover::after {
  opacity: 0;
}

.submit-consultation-btn:active {
  transform: translateY(-1px) scale(0.99) !important;
  box-shadow: 0 6px 18px rgba(244, 123, 32, 0.35) !important;
}
`;

styleCss = norm(styleCss) + '\n' + norm(globalSubmitCss);
styleCss = styleCss.replace(/\n/g, '\r\n');
fs.writeFileSync(stylePath, styleCss, 'utf8');
console.log('Saved css/style.css');
