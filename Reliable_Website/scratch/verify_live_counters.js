const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9235',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'about:blank'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9235/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
      const wsUrl = pageTab.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({
          id: 2,
          method: 'Page.navigate',
          params: { url: 'https://reliablewebsite-reliablewebsite-seven.vercel.app/' }
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const el = document.querySelector('.counter-grid');
                  if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' });
                  return true;
                })()`,
                returnByValue: true
              }
            }));
          }, 1500);
        }

        if (msg.id === 3) {
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 800);
        }

        if (msg.id === 4) {
          if (msg.result && msg.result.data) {
            fs.writeFileSync('scratch/live_vercel_counters_verified.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved live vercel counter screenshot to scratch/live_vercel_counters_verified.png');
          }
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
