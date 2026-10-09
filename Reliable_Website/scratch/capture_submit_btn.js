const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const port = 9988;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/contact.html'
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
            params: { width: 1300, height: 1600, deviceScaleFactor: 1, mobile: false }
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
                  document.querySelectorAll('.contact-box-card').forEach(c => {
                    c.classList.add('animate');
                    c.style.opacity = '1';
                    c.style.transform = 'none';
                  });
                  const btn = document.querySelector('.submit-consultation-btn');
                  if (btn) {
                    const box = btn.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo(0, box.top + scrollTop - 300);
                    const rect = btn.getBoundingClientRect();
                    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
                  }
                  return null;
                })()`,
                returnByValue: true
              }
            }));
          }

          if (msg.id === 2) {
            const rect = msg.result.result.value || { x: 100, y: 300, width: 500, height: 60 };
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: {
                  clip: {
                    x: Math.max(0, rect.x - 30),
                    y: Math.max(0, rect.y - 40),
                    width: rect.width + 60,
                    height: rect.height + 80,
                    scale: 1
                  }
                }
              }));
            }, 1000);
          }

          if (msg.id === 3) {
            fs.writeFileSync('scratch/submit_btn_animated.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved scratch/submit_btn_animated.png');
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
