const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureScreenshot(width, height, filename, scrollToFooter = false) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const port = 9270 + Math.floor(Math.random() * 25);
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/index.html'
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(data);
            const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('index.html')) || tabs[0];
            const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

            ws.onopen = () => {
              if (scrollToFooter) {
                ws.send(JSON.stringify({
                  id: 1,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const footer = document.querySelector('.footer');
                      if (footer) footer.scrollIntoView({ block: 'start' });
                      return new Promise(r => setTimeout(() => {
                        const rect = footer.getBoundingClientRect();
                        r({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
                      }, 500));
                    })()`,
                    awaitPromise: true,
                    returnByValue: true
                  }
                }));
              } else {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 1) {
                const rect = msg.result?.result?.value;
                console.log(`Footer rect for ${filename}:`, rect);
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Page.captureScreenshot',
                  params: {
                    format: 'png',
                    clip: {
                      x: 0,
                      y: Math.max(0, rect.y),
                      width: width,
                      height: Math.min(844, rect.height + 50),
                      scale: 1
                    }
                  }
                }));
              } else if (msg.id === 2 && msg.result && msg.result.data) {
                fs.writeFileSync(filename, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot: ${filename}`);
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };

            ws.onerror = () => {
              chromeProc.kill();
              resolve();
            };
          } catch(e) {
            chromeProc.kill();
            resolve();
          }
        });
      }).on('error', () => {
        chromeProc.kill();
        resolve();
      });
    }, 1200);
  });
}

async function run() {
  await captureScreenshot(820, 1180, 'scratch/tablet_footer_clipped.png', true);
  await captureScreenshot(390, 844, 'scratch/mobile_footer_clipped.png', true);
  console.log('Clipped footer screenshots captured.');
}

run();
