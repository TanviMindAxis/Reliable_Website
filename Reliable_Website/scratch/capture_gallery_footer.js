const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const port = 9995;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/gallery.html'
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
            params: { width: 1300, height: 1200, deviceScaleFactor: 1, mobile: false }
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
                    const el = document.querySelector('.footer');
                    if (el) {
                      el.scrollIntoView({ behavior: 'instant', block: 'end' });
                    }
                  })()`
                }
              }));
            }, 600);
          }

          if (msg.id === 2) {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 25,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const el = document.querySelector('.footer');
                    if (el) {
                      const rect = el.getBoundingClientRect();
                      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
                    }
                    return null;
                  })()`,
                  returnByValue: true
                }
              }));
            }, 300);
          }

          if (msg.id === 25) {
            const rect = msg.result.result.value || { x: 0, y: 700, width: 1300, height: 500 };
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: {
                  clip: {
                    x: Math.max(0, rect.x),
                    y: Math.max(0, rect.y),
                    width: rect.width,
                    height: rect.height,
                    scale: 1
                  }
                }
              }));
            }, 400);
          }

          if (msg.id === 3) {
            fs.writeFileSync('scratch/gallery_footer_verified.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/gallery_footer_verified.png successfully!');
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
  }, 1500);
}

capture();
