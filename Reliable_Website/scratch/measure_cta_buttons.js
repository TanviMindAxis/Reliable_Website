const http = require('http');
const { spawn } = require('child_process');

async function measure() {
  const port = 9979;
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
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              returnByValue: true,
              expression: `(() => {
                const b1 = document.querySelector('.cta-banner-btn-primary');
                const b2 = document.querySelector('.cta-banner-btn-phone');
                return {
                  primaryWidth: b1 ? b1.offsetWidth : 0,
                  primaryHeight: b1 ? b1.offsetHeight : 0,
                  phoneWidth: b2 ? b2.offsetWidth : 0,
                  phoneHeight: b2 ? b2.offsetHeight : 0
                };
              })()`
            }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            console.log('Button dimensions on desktop:', msg.result.result.value);

            // Now test at mobile 390px
            ws.send(JSON.stringify({
              id: 2,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
            }));
          }

          if (msg.id === 2) {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: {
                returnByValue: true,
                expression: `(() => {
                  const b1 = document.querySelector('.cta-banner-btn-primary');
                  const b2 = document.querySelector('.cta-banner-btn-phone');
                  return {
                    primaryWidth: b1 ? b1.offsetWidth : 0,
                    primaryHeight: b1 ? b1.offsetHeight : 0,
                    phoneWidth: b2 ? b2.offsetWidth : 0,
                    phoneHeight: b2 ? b2.offsetHeight : 0
                  };
                })()`
              }
            }));
          }

          if (msg.id === 3) {
            console.log('Button dimensions on mobile (390px):', msg.result.result.value);

            // Now test at tablet (768px)
            ws.send(JSON.stringify({
              id: 4,
              method: 'Emulation.setDeviceMetricsOverride',
              params: { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false }
            }));
          }

          if (msg.id === 4) {
            ws.send(JSON.stringify({
              id: 5,
              method: 'Runtime.evaluate',
              params: {
                returnByValue: true,
                expression: `(() => {
                  const b1 = document.querySelector('.cta-banner-btn-primary');
                  const b2 = document.querySelector('.cta-banner-btn-phone');
                  const wrapper = document.querySelector('.service-cta-buttons');
                  return {
                    wrapperWidth: wrapper ? wrapper.offsetWidth : 0,
                    primaryWidth: b1 ? b1.offsetWidth : 0,
                    primaryHeight: b1 ? b1.offsetHeight : 0,
                    phoneWidth: b2 ? b2.offsetWidth : 0,
                    phoneHeight: b2 ? b2.offsetHeight : 0
                  };
                })()`
              }
            }));
          }

          if (msg.id === 5) {
            console.log('Button dimensions on tablet (768px):', msg.result.result.value);
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1200);
}

measure().catch(console.error);
