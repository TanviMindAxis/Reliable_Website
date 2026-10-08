const http = require('http');
const { spawn } = require('child_process');

const port = 9999;
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
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              returnByValue: true,
              expression: `(() => {
                const links = Array.from(document.querySelectorAll('a[href*="tel:"]'));
                return {
                  title: document.title,
                  allTelLinks: links.map(l => ({ text: l.innerText, href: l.getAttribute('href'), outerHTML: l.outerHTML })),
                  footerHtml: document.querySelector('.footer-col:last-child') ? document.querySelector('.footer-col:last-child').innerHTML : 'not found'
                };
              })()`
            }
          }));
        }, 1500);
      };

      ws.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.id === 1) {
          console.log('Result:', JSON.stringify(data.result.result.value, null, 2));
          ws.close();
          chrome.kill();
        }
      };
    });
  });
}, 1500);
