const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testMobileViewport(width, height, label) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=9232`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/index.html'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9232/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('index.html')) || tabs[0];
          const wsUrl = pageTab.webSocketDebuggerUrl;
          const ws = new WebSocket(wsUrl);

          ws.onopen = () => {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const section = document.querySelector('.counter-grid');
                    if (section) section.scrollIntoView();

                    const cards = Array.from(document.querySelectorAll('.tech-counter-item'));
                    return cards.map(c => {
                      const num = c.querySelector('.tech-number');
                      const label = c.querySelector('.tech-counter-label') || c.querySelector('.tech-label');
                      const cardRect = c.getBoundingClientRect();
                      const numRect = num ? num.getBoundingClientRect() : null;
                      const labelRect = label ? label.getBoundingClientRect() : null;
                      const labelStyle = label ? window.getComputedStyle(label) : null;

                      return {
                        cardWidth: cardRect.width,
                        cardHeight: cardRect.height,
                        numberText: num ? num.innerText : '',
                        labelText: label ? label.innerText : '',
                        labelWidth: labelRect ? labelRect.width : 0,
                        labelHeight: labelRect ? labelRect.height : 0,
                        isLabelContained: labelRect ? (labelRect.left >= cardRect.left && labelRect.right <= cardRect.right + 1) : false,
                        labelPosition: labelStyle ? labelStyle.position : '',
                        labelDisplay: labelStyle ? labelStyle.display : ''
                      };
                    });
                  })()`,
                  returnByValue: true
                }
              }));
            }, 1000);
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
              console.log(`Mobile Counter Cards (${label} - ${width}x${height}):`, JSON.stringify(val, null, 2));

              ws.send(JSON.stringify({
                id: 2,
                method: 'Page.captureScreenshot',
                params: {
                  format: 'png',
                  clip: {
                    x: 0,
                    y: 400,
                    width: width,
                    height: 600,
                    scale: 1
                  }
                }
              }));
            } else if (msg.id === 2) {
              if (msg.result && msg.result.data) {
                fs.writeFileSync(`scratch/counter_cards_${label.toLowerCase()}.png`, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot to scratch/counter_cards_${label.toLowerCase()}.png`);
              }
              ws.close();
              chromeProc.kill();
              resolve();
            }
          };
        });
      });
    }, 1500);
  });
}

(async () => {
  await testMobileViewport(390, 844, 'iPhone14');
  await testMobileViewport(360, 800, 'SmallAndroid');
  console.log('Finished testing mobile counter viewports.');
  process.exit(0);
})();
