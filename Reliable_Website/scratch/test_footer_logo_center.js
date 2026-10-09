const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function test(name, width, height) {
  return new Promise(resolve => {
    const port = 9994;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'file:///e:/MindAxis_Web/Reliable_Website/gallery.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          const tabs = JSON.parse(d);
          const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width, height, deviceScaleFactor: 1, mobile: width < 800 }
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
                        const r = brand.getBoundingClientRect();
                        return {
                          x: 0,
                          y: Math.max(0, r.y + (window.scrollY || window.pageYOffset) - 20),
                          w: ${width},
                          h: Math.min(800, r.height + 150)
                        };
                      }
                      return { x: 0, y: 0, w: ${width}, h: 500 };
                    })()`,
                    returnByValue: true
                  }
                }));
              }, 600);
            }

            if (msg.id === 2) {
              const clip = msg.result.result.value;
              ws.send(JSON.stringify({
                id: 3,
                method: 'Page.captureScreenshot',
                params: {
                  clip: {
                    x: clip.x,
                    y: clip.y,
                    width: clip.w,
                    height: clip.h,
                    scale: 1
                  }
                }
              }));
            }

            if (msg.id === 3) {
              fs.writeFileSync(`scratch/${name}.png`, Buffer.from(msg.result.data, 'base64'));
              console.log(`Saved scratch/${name}.png`);
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
  await test('footer_preview_mobile_current', 390, 844);
}
run();
