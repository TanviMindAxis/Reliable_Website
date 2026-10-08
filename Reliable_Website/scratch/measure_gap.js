const http = require('http');
const { spawn } = require('child_process');

async function measure() {
  const port = 9987;
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
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }
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
                  returnByValue: true,
                  expression: `(() => {
                    const grid = document.querySelector('.service-spec-grid');
                    if (!grid) return 'NO GRID';
                    const leftCol = grid.children[0];
                    const rightCol = grid.children[1];
                    const topBox = leftCol.children[0];
                    const btnBox = leftCol.children[1];
                    return {
                      leftColHeight: leftCol.offsetHeight,
                      rightColHeight: rightCol.offsetHeight,
                      topBoxHeight: topBox.offsetHeight,
                      btnBoxHeight: btnBox.offsetHeight,
                      emptySpace: leftCol.offsetHeight - topBox.offsetHeight - btnBox.offsetHeight
                    };
                  })()`
                }
              }));
            }, 1000);
          }
          if (msg.id === 2) {
            console.log('Result:', msg.result.result.value);
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
