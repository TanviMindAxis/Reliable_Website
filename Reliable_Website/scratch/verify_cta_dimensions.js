const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkView(width, height, isMobile, label) {
  return new Promise((resolve) => {
    const port = 9982;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let raw = '';
        res.on('data', c => raw += c);
        res.on('end', () => {
          const tabs = JSON.parse(raw);
          const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
          const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height, deviceScaleFactor: 2, mobile: isMobile }
            }));
          };

          ws.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.id === 1) {
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
              }, 1000);
            }
            if (data.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 3,
                  method: 'Runtime.evaluate',
                  params: {
                    returnByValue: true,
                    expression: `(() => {
                      const b1 = document.querySelector('.cta-banner-btn-primary');
                      const b2 = document.querySelector('.cta-banner-btn-phone');
                      const rect1 = b1 ? b1.getBoundingClientRect() : {};
                      const rect2 = b2 ? b2.getBoundingClientRect() : {};
                      return {
                        primary: { width: Math.round(rect1.width), height: Math.round(rect1.height) },
                        phone: { width: Math.round(rect2.width), height: Math.round(rect2.height) }
                      };
                    })()`
                  }
                }));
              }, 400);
            }
            if (data.id === 3) {
              console.log(label + ':', JSON.stringify(data.result.result.value));
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 4,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 300);
            }
            if (data.id === 4) {
              const filename = path.join(__dirname, `verify_${label.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`);
              fs.writeFileSync(filename, Buffer.from(data.result.data, 'base64'));
              console.log('Saved screenshot:', filename);
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

async function runAll() {
  await checkView(360, 740, true, 'Mobile_360');
  await checkView(390, 844, true, 'Mobile_390');
  await checkView(768, 1024, true, 'Tablet_768');
  await checkView(820, 1180, false, 'Tablet_820');
  await checkView(1280, 800, false, 'Desktop_1280');
}

runAll().catch(console.error);
