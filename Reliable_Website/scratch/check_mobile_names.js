const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function captureViews(width, height, label) {
  return new Promise((resolve) => {
    const port = 9992;
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
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height, deviceScaleFactor: 2, mobile: width <= 768 }
            }));
          };

          ws.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 1200);
            }
            if (data.id === 2) {
              fs.writeFileSync(path.join(__dirname, `fixed_hero_${label}.png`), Buffer.from(data.result.data, 'base64'));
              // scroll to specs table
              ws.send(JSON.stringify({
                id: 3,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const el = document.querySelector('.service-spec-grid table');
                    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
                  })()`
                }
              }));
            }
            if (data.id === 3) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 4,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 500);
            }
            if (data.id === 4) {
              fs.writeFileSync(path.join(__dirname, `fixed_table_${label}.png`), Buffer.from(data.result.data, 'base64'));
              console.log(`Saved views for ${label}`);
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
  await captureViews(360, 740, 'mobile_360');
  await captureViews(390, 844, 'mobile_390');
}
run();
