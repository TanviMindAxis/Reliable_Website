const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function verifyPage(url, outName) {
  return new Promise((resolve) => {
    const port = 9984;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      url
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
              params: { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }
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
                      const spec = document.querySelector('.service-spec-section');
                      if (spec) spec.scrollIntoView({ behavior: 'instant', block: 'start' });
                    })()`
                  }
                }));
              }, 1200);
            }
            if (msg.id === 2) {
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 500);
            }
            if (msg.id === 3) {
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
  await verifyPage('http://127.0.0.1:5501/Reliable_Website/topographical-survey.html', 'verified_topo_3cards.png');
  await verifyPage('http://127.0.0.1:5501/Reliable_Website/total-station-survey.html', 'verified_total_station_3cards.png');
  console.log('Verification finished.');
}

run().catch(console.error);
