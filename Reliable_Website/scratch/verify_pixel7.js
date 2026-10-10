const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9231',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=480,1151',
  'about:blank'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9231/json', (res) => {
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
                  const bar = document.querySelector('.top-bar-exact');
                  const track = document.querySelector('.top-bar-track');
                  const trackStyle = track ? window.getComputedStyle(track) : null;
                  return {
                    barHeight: bar ? bar.getBoundingClientRect().height : null,
                    trackWidth: track ? track.getBoundingClientRect().width : null,
                    animationName: trackStyle ? trackStyle.animationName : null,
                    animationPlayState: trackStyle ? trackStyle.animationPlayState : null,
                    transform: trackStyle ? trackStyle.transform : null
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 1200);
        }

        if (msg.id === 3) {
          const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
          console.log('LIVE VERCEL EVALUATION (480x1151 Pixel 7 Pro):', JSON.stringify(val, null, 2));

          ws.send(JSON.stringify({
            id: 4,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (msg.id === 4) {
          if (msg.result && msg.result.data) {
            fs.writeFileSync('scratch/live_vercel_verified_pixel7pro.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Saved screenshot to scratch/live_vercel_verified_pixel7pro.png');
          }
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
