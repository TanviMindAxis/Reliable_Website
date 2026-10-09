const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testViewport(width, height, label) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=9228`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/index.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9228/json', (res) => {
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
                    const bar = document.querySelector('.top-bar-exact');
                    const track = document.querySelector('.top-bar-track');
                    const content = document.querySelector('.top-bar-content');
                    const duplicates = Array.from(document.querySelectorAll('.top-bar-duplicate'));

                    const trackStyle = window.getComputedStyle(track);
                    const duplicateDisplays = duplicates.map(d => window.getComputedStyle(d).display);

                    return {
                      animationName: trackStyle.animationName,
                      animationDuration: trackStyle.animationDuration,
                      transform: trackStyle.transform,
                      duplicateDisplays: duplicateDisplays
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            }, 1000);
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
              console.log(`${label} (${width}x${height}):`, JSON.stringify(val, null, 2));

              ws.send(JSON.stringify({
                id: 2,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            } else if (msg.id === 2) {
              if (msg.result && msg.result.data) {
                fs.writeFileSync(`scratch/verified_${label.toLowerCase()}.png`, Buffer.from(msg.result.data, 'base64'));
              }
              ws.close();
              chromeProc.kill();
              resolve();
            }
          };
        });
      });
    }, 1500);
  });
}

(async () => {
  await testViewport(820, 1180, 'Tablet');
  await testViewport(1280, 800, 'Desktop');
  console.log('Finished testing tablet and desktop.');
  process.exit(0);
})();
