const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureFooter() {
  const port = 9992;
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
          // Mobile viewport 400x800
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 400, height: 800, deviceScaleFactor: 1, mobile: true }
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
                    const brand = document.querySelector('.footer-brand');
                    if (brand) {
                      brand.scrollIntoView({ block: 'start' });
                      const rect = brand.getBoundingClientRect();
                      return {
                        x: Math.max(0, rect.x - 10),
                        y: Math.max(0, rect.y + (window.scrollY || window.pageYOffset) - 10),
                        width: rect.width + 20,
                        height: rect.height + 80
                      };
                    }
                    return null;
                  })()`,
                  returnByValue: true
                }
              }));
            }, 500);
          }

          if (msg.id === 2) {
            const clip = msg.result.result.value || { x: 0, y: 0, width: 400, height: 400 };
            ws.send(JSON.stringify({
              id: 3,
              method: 'Page.captureScreenshot',
              params: {
                format: 'png',
                clip: {
                  x: clip.x,
                  y: clip.y,
                  width: Math.min(400, clip.width),
                  height: clip.height,
                  scale: 1
                }
              }
            }));
          }

          if (msg.id === 3) {
            fs.writeFileSync('scratch/footer_mobile_view.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/footer_mobile_view.png');
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1000);
}

captureFooter();
