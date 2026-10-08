const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function captureServicePage(pageUrl, width, height, outName) {
  return new Promise((resolve) => {
    const port = 9998;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      pageUrl
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
              const outPath = path.join(__dirname, outName);
              fs.writeFileSync(outPath, Buffer.from(data.result.data, 'base64'));
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
  await captureServicePage('http://127.0.0.1:5501/Reliable_Website/rtk-drone-mapping.html', 390, 844, 'verify_rtk_mobile.png');
  await captureServicePage('http://127.0.0.1:5501/Reliable_Website/total-station-survey.html', 390, 844, 'verify_total_station_mobile.png');
  await captureServicePage('http://127.0.0.1:5501/Reliable_Website/road-highway.html', 390, 844, 'verify_road_mobile.png');
  await captureServicePage('http://127.0.0.1:5501/Reliable_Website/rtk-drone-mapping.html', 1280, 800, 'verify_rtk_desktop.png');
}

run().catch(console.error);
