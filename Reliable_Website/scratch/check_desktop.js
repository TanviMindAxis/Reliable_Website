const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function captureDesktop() {
  const port = 9994;
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
            params: { width: 1280, height: 800, deviceScaleFactor: 2, mobile: false }
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
            }, 1000);
          }
          if (data.id === 2) {
            fs.writeFileSync(path.join(__dirname, 'fixed_hero_desktop_1280.png'), Buffer.from(data.result.data, 'base64'));
            console.log('Saved desktop screenshot');
            ws.close();
            chrome.kill();
          }
        };
      });
    });
  }, 1200);
}

captureDesktop();
