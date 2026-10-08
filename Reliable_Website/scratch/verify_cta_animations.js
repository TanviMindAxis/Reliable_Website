const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function captureState(action, outName, isMobile = false) {
  return new Promise((resolve) => {
    const port = 9990;
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      '--remote-debugging-port=' + port,
      '--no-sandbox',
      '--disable-gpu',
      'http://127.0.0.1:5501/Reliable_Website/topographical-survey.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:' + port + '/json', res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const ws = new WebSocket((tabs.find(t => t.type === 'page') || tabs[0]).webSocketDebuggerUrl);

          ws.onopen = () => {
            const metrics = isMobile
              ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
              : { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false };
            ws.send(JSON.stringify({
              id: 1,
              method: 'Emulation.setDeviceMetricsOverride',
              params: metrics
            }));
          };

          ws.onmessage = async (e) => {
            const msg = JSON.parse(e.data);

            if (msg.id === 1) {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const cta = document.querySelector('.service-cta-banner');
                      if (cta) cta.scrollIntoView({ behavior: 'instant', block: 'center' });
                    })()`
                  }
                }));
              }, 1200);
            }

            if (msg.id === 2) {
              if (action === 'hover_quote') {
                const boxRes = await new Promise(r => {
                  const subId = 201;
                  const handler = (m) => {
                    const parsed = JSON.parse(m.data);
                    if (parsed.id === subId) {
                      ws.removeEventListener('message', handler);
                      r(parsed.result.value);
                    }
                  };
                  ws.addEventListener('message', handler);
                  ws.send(JSON.stringify({
                    id: subId,
                    method: 'Runtime.evaluate',
                    params: {
                      returnByValue: true,
                      expression: `(() => {
                        const btn = document.querySelector('.cta-banner-btn-primary');
                        if (!btn) return null;
                        const rect = btn.getBoundingClientRect();
                        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                      })()`
                    }
                  }));
                });

                if (boxRes) {
                  ws.send(JSON.stringify({
                    id: 202,
                    method: 'Input.dispatchMouseEvent',
                    params: { type: 'mouseMoved', x: boxRes.x, y: boxRes.y }
                  }));
                }
              } else if (action === 'hover_phone') {
                const boxRes = await new Promise(r => {
                  const subId = 301;
                  const handler = (m) => {
                    const parsed = JSON.parse(m.data);
                    if (parsed.id === subId) {
                      ws.removeEventListener('message', handler);
                      r(parsed.result.value);
                    }
                  };
                  ws.addEventListener('message', handler);
                  ws.send(JSON.stringify({
                    id: subId,
                    method: 'Runtime.evaluate',
                    params: {
                      returnByValue: true,
                      expression: `(() => {
                        const btn = document.querySelector('.cta-banner-btn-phone');
                        if (!btn) return null;
                        const rect = btn.getBoundingClientRect();
                        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                      })()`
                    }
                  }));
                });

                if (boxRes) {
                  ws.send(JSON.stringify({
                    id: 302,
                    method: 'Input.dispatchMouseEvent',
                    params: { type: 'mouseMoved', x: boxRes.x, y: boxRes.y }
                  }));
                }
              }

              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 600);
            }

            if (msg.id === 3) {
              fs.writeFileSync(path.join(__dirname, outName), Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + outName);
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
  await captureState('resting', 'cta_resting_no_arrow.png');
  await captureState('hover_quote', 'cta_hover_quote.png');
  await captureState('hover_phone', 'cta_hover_phone.png');
  await captureState('resting', 'cta_mobile_no_arrow.png', true);
  console.log('Finished all CTA captures.');
}

run().catch(console.error);
