const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const port = 9989;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/contact.html?submitted=true'
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
            params: { width: 1200, height: 1200, deviceScaleFactor: 1, mobile: false }
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
                    const statusBox = document.getElementById('contactFormStatus');
                    if (statusBox) {
                      const rect = statusBox.getBoundingClientRect();
                      const scrollY = window.scrollY || window.pageYOffset;
                      const scrollX = window.scrollX || window.pageXOffset;
                      return {
                        display: window.getComputedStyle(statusBox).display,
                        innerHTML: statusBox.innerHTML,
                        rect: {
                          x: rect.x + scrollX,
                          y: rect.y + scrollY,
                          width: rect.width,
                          height: rect.height
                        }
                      };
                    }
                    return null;
                  })()`,
                  returnByValue: true
                }
              }));
            }, 600);
          }

          if (msg.id === 2) {
            console.log('Evaluated:', JSON.stringify(msg.result.result.value, null, 2));
            const val = msg.result.result.value;
            const rect = (val && val.rect) ? val.rect : { x: 100, y: 100, width: 800, height: 600 };
            ws.send(JSON.stringify({
              id: 3,
              method: 'Page.captureScreenshot',
              params: {
                format: 'png',
                clip: {
                  x: Math.max(0, rect.x - 15),
                  y: Math.max(0, rect.y - 15),
                  width: Math.max(100, rect.width + 30),
                  height: Math.max(50, rect.height + 30),
                  scale: 1
                }
              }
            }));
          }

          if (msg.id === 3) {
            const buf = Buffer.from(msg.result.data, 'base64');
            fs.writeFileSync('scratch/contact_submitted_alert.png', buf);
            console.log('Saved scratch/contact_submitted_alert.png');
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1000);
}

capture();
