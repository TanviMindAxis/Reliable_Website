const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function testHero(width) {
  return new Promise((resolve) => {
    const port = 9989;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let raw = '';
        res.on('data', c => raw += c);
        res.on('end', () => {
          const tabs = JSON.parse(raw);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height: 750, deviceScaleFactor: 2, mobile: true }
            }));
          };

          ws.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    returnByValue: true,
                    expression: `(() => {
                      const h1 = document.querySelector('h1');
                      const bc = document.querySelector('.text-fade-in-left > div');
                      return {
                        h1Text: h1 ? h1.innerText : '',
                        h1Rect: h1 ? h1.getBoundingClientRect() : null,
                        bcText: bc ? bc.innerText : '',
                        bcRect: bc ? bc.getBoundingClientRect() : null
                      };
                    })()`
                  }
                }));
              }, 800);
            }
            if (data.id === 2) {
              console.log('Width ' + width + ':', data.result.result.value);
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 400);
            }
            if (data.id === 3) {
              fs.writeFileSync(path.join(__dirname, `hero_${width}.png`), Buffer.from(data.result.data, 'base64'));
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

async function run() {
  await testHero(360);
  await testHero(375);
}
run();
