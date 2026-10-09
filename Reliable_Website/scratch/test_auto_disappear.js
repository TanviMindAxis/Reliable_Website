const http = require('http');
const { spawn } = require('child_process');

async function testTimer() {
  const port = 9991;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--no-sandbox',
    '--disable-gpu',
    'file:///e:/MindAxis_Web/Reliable_Website/contact.html?submitted=true'
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
              expression: `(() => {
                const b = document.getElementById('contactFormStatus');
                return {
                  displayInitial: window.getComputedStyle(b).display,
                  opacityInitial: window.getComputedStyle(b).opacity
                };
              })()`,
              returnByValue: true
            }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);

          if (msg.id === 1) {
            console.log('Initial status:', msg.result.result.value);
            // Wait 6 seconds and check again
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 2,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const b = document.getElementById('contactFormStatus');
                    return {
                      displayAfter6s: window.getComputedStyle(b).display,
                      opacityAfter6s: window.getComputedStyle(b).opacity
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            }, 6000);
          }

          if (msg.id === 2) {
            console.log('After 6s status:', msg.result.result.value);
            ws.close();
            chrome.kill();
            process.exit(0);
          }
        };
      });
    });
  }, 1000);
}

testTimer();
