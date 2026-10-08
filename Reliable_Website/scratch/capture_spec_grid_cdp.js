const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const port = 9991;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/road-highway.html'
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
            params: { width: 1280, height: 950, deviceScaleFactor: 1, mobile: false }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const el = document.querySelector('.service-spec-grid');
                  if (el) {
                    el.scrollIntoView({ behavior: 'instant', block: 'center' });
                    const rect = el.getBoundingClientRect();
                    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          }

          if (msg.id === 2) {
            const rect = msg.result.result.value;
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: {
                  clip: {
                    x: Math.max(0, rect.x - 20),
                    y: Math.max(0, rect.y - 20),
                    width: rect.width + 40,
                    height: rect.height + 40,
                    scale: 1
                  }
                }
              }));
            }, 600);
          }

          if (msg.id === 3) {
            fs.writeFileSync('scratch/spec_section_animated.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/spec_section_animated.png successfully!');
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    }).on('error', err => {
      console.error(err);
      chrome.kill();
      process.exit(1);
    });
  }, 1200);
}

capture();
