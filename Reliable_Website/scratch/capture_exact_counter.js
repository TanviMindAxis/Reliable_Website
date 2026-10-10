const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9233',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9233/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('index.html')) || tabs[0];
      const wsUrl = pageTab.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const el = document.querySelector('.counter-grid');
                if (el) el.scrollIntoView({ block: 'center' });
                return new Promise(r => setTimeout(() => {
                  const rect = el.getBoundingClientRect();
                  r({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, pageY: window.scrollY });
                }, 500));
              })()`,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          const val = msg.result.result.value;
          console.log('Counter grid rect:', val);

          ws.send(JSON.stringify({
            id: 2,
            method: 'Page.captureScreenshot',
            params: {
              format: 'png',
              clip: {
                x: 0,
                y: Math.max(0, val.y - 60),
                width: 390,
                height: Math.min(val.height + 120, 844),
                scale: 1
              }
            }
          }));
        } else if (msg.id === 2) {
          if (msg.result && msg.result.data) {
            fs.writeFileSync('scratch/exact_counter_grid_view.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved exact counter view to scratch/exact_counter_grid_view.png');
          }
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
