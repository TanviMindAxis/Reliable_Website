const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function captureSpecImg(width, height, isMobile, outName) {
  return new Promise((resolve) => {
    const port = 9985;
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
                      const spec = document.querySelector('.service-spec-section');
                      if (spec) spec.scrollIntoView({ behavior: 'instant', block: 'start' });
                    })()`
                  }
                }));
              }, 1000);
            }
            if (data.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 3,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 600);
            }
            if (data.id === 3) {
              const outPath = path.join(__dirname, outName);
              fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
              console.log('Saved screenshot:', outPath);
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
  await captureSpecImg(390, 844, true, 'geospatial_white_mobile.png');
  await captureSpecImg(1280, 800, false, 'geospatial_white_desktop.png');
}

run().catch(console.error);
