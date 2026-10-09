const http = require('http');
const { spawn } = require('child_process');

async function testForm() {
  const port = 9987;
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
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const form = document.getElementById('contactForm');
                if (!form) return { error: 'form not found' };
                const inputs = Array.from(form.querySelectorAll('input, select, textarea')).map(el => ({
                  id: el.id,
                  name: el.name,
                  type: el.type,
                  required: el.required
                }));
                return {
                  action: form.action,
                  method: form.method,
                  inputs: inputs
                };
              })()`,
              returnByValue: true
            }
          }));
        };

        ws.onmessage = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === 1) {
            console.log('Form details in headless Chrome:');
            console.log(JSON.stringify(msg.result.result.value, null, 2));
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
}
testForm();
