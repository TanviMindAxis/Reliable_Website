const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'css', 'style.css');
let originalCss = fs.readFileSync(cssPath, 'utf8');

// Test CSS: Both buttons equal size
const testCssAddition = `
/* Equal sizing for CTA banner buttons across all viewports */
.service-cta-buttons {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
}

.cta-banner-btn-primary,
.cta-banner-btn-phone {
  width: 100% !important;
  max-width: 310px !important;
  min-width: 280px !important;
  height: 58px !important;
  min-height: 58px !important;
  max-height: 58px !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
}

@media (max-width: 768px) {
  .service-cta-buttons {
    flex-direction: column !important;
    gap: 14px !important;
    width: 100% !important;
  }
  .cta-banner-btn-primary,
  .cta-banner-btn-phone {
    width: 100% !important;
    max-width: 320px !important;
    min-width: 0 !important;
    height: 56px !important;
    min-height: 56px !important;
    max-height: 56px !important;
  }
}
`;

function captureView(width, height, isMobile, outName) {
  return new Promise((resolve) => {
    const port = 9978;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height, deviceScaleFactor: 2, mobile: isMobile }
            }));
          };

          ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const cta = document.querySelector('.service-cta-banner');
                      if (cta) cta.scrollIntoView({ behavior: 'instant', block: 'center' });
                    })()`
                  }
                }));
              }, 1200);
            }
            if (msg.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 3,
                  method: 'Runtime.evaluate',
                  params: {
                    returnByValue: true,
                    expression: `(() => {
                      const b1 = document.querySelector('.cta-banner-btn-primary');
                      const b2 = document.querySelector('.cta-banner-btn-phone');
                      return {
                        primary: b1 ? { w: b1.offsetWidth, h: b1.offsetHeight } : null,
                        phone: b2 ? { w: b2.offsetWidth, h: b2.offsetHeight } : null
                      };
                    })()`
                  }
                }));
              }, 300);
            }
            if (msg.id === 3) {
              console.log(outName, 'Dimensions:', msg.result.result.value);
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 4, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 400);
            }
            if (msg.id === 4) {
              fs.writeFileSync(path.join(__dirname, outName), Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + outName);
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

async function run() {
  fs.writeFileSync(cssPath, originalCss + testCssAddition, 'utf8');

  // Test mobile 390px
  await captureView(390, 844, true, 'equal_btn_mobile_390.png');
  // Test tablet 768px
  await captureView(768, 1024, false, 'equal_btn_tab_768.png');
  // Test tablet 820px
  await captureView(820, 1180, false, 'equal_btn_tab_820.png');
  // Test desktop 1280px
  await captureView(1280, 800, false, 'equal_btn_desktop_1280.png');

  // Restore CSS
  fs.writeFileSync(cssPath, originalCss, 'utf8');
  console.log('Testing finished.');
}

run().catch(console.error);
