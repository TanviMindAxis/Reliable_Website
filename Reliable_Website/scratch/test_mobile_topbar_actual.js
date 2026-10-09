const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromeProc = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9227',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=390,844',
  'file:///E:/MindAxis_Web/Reliable_Website/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9227/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      console.log('Available tabs:', tabs.map(t => ({ title: t.title, url: t.url })));
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
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
          console.log('ACTUAL Mobile Topbar Evaluation (t=1s):', JSON.stringify(val, null, 2));

          // Wait 2 seconds and measure transform to verify movement
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const track = document.querySelector('.top-bar-track');
                  const trackRect = track.getBoundingClientRect();
                  const style = window.getComputedStyle(track);
                  return {
                    left: trackRect.left,
                    transform: style.transform
                  };
                })()`,
                returnByValue: true
              }
            }));
          }, 2000);
        } else if (msg.id === 2) {
          const val = msg.result && msg.result.result ? msg.result.result.value : msg.result;
          console.log('ACTUAL Mobile Topbar Movement (t=3s):', JSON.stringify(val, null, 2));

          // Capture screenshot
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        } else if (msg.id === 3) {
          if (msg.result && msg.result.data) {
            fs.writeFileSync('scratch/verified_mobile_sliding_topbar.png', Buffer.from(msg.result.data, 'base64'));
            console.log('Screenshot successfully saved to scratch/verified_mobile_sliding_topbar.png');
          }
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
