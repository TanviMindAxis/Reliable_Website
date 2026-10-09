const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const port = 9984;
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
          params: { width: 1280, height: 1800, deviceScaleFactor: 1, mobile: false }
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
                  return {
                    url: window.location.href,
                    readyState: document.readyState,
                    bodyLength: document.body.innerHTML.length,
                    sections: Array.from(document.querySelectorAll('section')).map(s => ({
                      className: s.className,
                      display: window.getComputedStyle(s).display,
                      visibility: window.getComputedStyle(s).visibility,
                      opacity: window.getComputedStyle(s).opacity
                    })),
                    contactBoxLeft: (() => {
                      const el = document.querySelector('.contact-box-left');
                      return el ? {
                        opacity: window.getComputedStyle(el).opacity,
                        transform: window.getComputedStyle(el).transform,
                        className: el.className
                      } : null;
                    })(),
                    contactBoxRight: (() => {
                      const el = document.querySelector('.contact-box-right');
                      return el ? {
                        opacity: window.getComputedStyle(el).opacity,
                        transform: window.getComputedStyle(el).transform,
                        className: el.className
                      } : null;
                    })(),
                    faqList: (() => {
                      const el = document.querySelector('.faq-list');
                      return el ? {
                        opacity: window.getComputedStyle(el).opacity,
                        display: window.getComputedStyle(el).display
                      } : null;
                    })()
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 800);
        }

        if (msg.id === 2) {
          console.log('Diagnosis Result:', JSON.stringify(msg.result.result.value, null, 2));

          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }

        if (msg.id === 3) {
          fs.writeFileSync('scratch/diagnose_contact_full.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved scratch/diagnose_contact_full.png');
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
