const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testLiveViewport(width, height, label) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=9229`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'https://reliablewebsite-reliablewebsite-seven.vercel.app/'
    ]);

    setTimeout(() => {
      http.get('http://127.0.0.1:9229/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const tabs = JSON.parse(data);
          const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('vercel.app')) || tabs[0];
          const wsUrl = pageTab.webSocketDebuggerUrl;
          const ws = new WebSocket(wsUrl);

          ws.onopen = () => {
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 1,
                method: 'Runtime.evaluate',
                params: {
                  expression: `(() => {
                    const bar = document.querySelector('.top-bar-exact');
                    const track = document.querySelector('.top-bar-track');
                    const content = document.querySelector('.top-bar-content');
                    const duplicates = document.querySelectorAll('.top-bar-duplicate');
                    const nav = document.querySelector('.nav-exact');

                    const barRect = bar ? bar.getBoundingClientRect() : null;
                    const trackRect = track ? track.getBoundingClientRect() : null;
                    const contentRect = content ? content.getBoundingClientRect() : null;
                    const barStyle = bar ? window.getComputedStyle(bar) : null;
                    const trackStyle = track ? window.getComputedStyle(track) : null;
                    const navStyle = nav ? window.getComputedStyle(nav) : null;

                    return {
                      bar: barRect ? {
                        height: barRect.height,
                        overflow: barStyle.overflow,
                        display: barStyle.display,
                        position: barStyle.position
                      } : null,
                      track: trackRect ? {
                        width: trackRect.width,
                        animationName: trackStyle.animationName,
                        animationDuration: trackStyle.animationDuration,
                        animationPlayState: trackStyle.animationPlayState,
                        transform: trackStyle.transform
                      } : null,
                      content: contentRect ? {
                        width: contentRect.width,
                        height: contentRect.height,
                        duplicateCount: duplicates.length
                      } : null,
                      nav: navStyle ? {
                        top: navStyle.top
                      } : null
                    };
                  })()`,
                  returnByValue: true
                }
              }));
            }, 2000);
          };

          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
              const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
              console.log(`Live Vercel ${label} (${width}x${height}):`, JSON.stringify(val, null, 2));

              ws.send(JSON.stringify({
                id: 2,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            } else if (msg.id === 2) {
              if (msg.result && msg.result.data) {
                fs.writeFileSync(`scratch/live_vercel_${label.toLowerCase()}.png`, Buffer.from(msg.result.data, 'base64'));
                console.log(`Screenshot saved to scratch/live_vercel_${label.toLowerCase()}.png`);
              }
              ws.close();
              chromeProc.kill();
              resolve();
            }
          };
        });
      });
    }, 2000);
  });
}

(async () => {
  await testLiveViewport(393, 1149, 'iPhone14Pro');
  await testLiveViewport(480, 1151, 'Pixel7Pro');
  console.log('Finished testing live Vercel deployments.');
  process.exit(0);
})();
