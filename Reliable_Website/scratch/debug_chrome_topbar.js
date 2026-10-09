const http = require('http');
const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9226',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///e:/MindAxis_Web/Reliable_Website/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9226/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const wsUrl = tabs[0].webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        // Enable log and runtime
        ws.send(JSON.stringify({ id: 1, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                return {
                  url: window.location.href,
                  title: document.title,
                  hasPlaceholder: !!document.getElementById('site-topbar'),
                  hasTopBarExact: !!document.querySelector('.top-bar-exact'),
                  hasTopBarTrack: !!document.querySelector('.top-bar-track'),
                  scriptTags: Array.from(document.querySelectorAll('script')).map(s => s.src)
                };
              })()`,
              returnByValue: true
            }
          }));
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled' || msg.method === 'Runtime.exceptionThrown') {
          console.log('CHROME CONSOLE/ERROR:', JSON.stringify(msg.params));
        }
        if (msg.id === 3) {
          console.log('PAGE STATE:', JSON.stringify(msg.result.result.value, null, 2));
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
