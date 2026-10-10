const http = require('http');
const { spawn } = require('child_process');

async function testViewport(width, height, deviceName) {
  return new Promise((resolve) => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const port = 9240 + Math.floor(Math.random() * 50);
    const chromeProc = spawn(chromePath, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      '--disable-gpu',
      `--window-size=${width},${height}`,
      'file:///E:/MindAxis_Web/Reliable_Website/index.html'
    ]);

    setTimeout(() => {
      http.get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const tabs = JSON.parse(data);
            const pageTab = tabs.find(t => t.type === 'page' || t.url.includes('index.html')) || tabs[0];
            const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

            ws.onopen = () => {
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 1,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const topBar = document.querySelector('.top-bar-exact');
                      const topBarTrack = document.querySelector('.top-bar-track');
                      const nav = document.querySelector('.nav-exact');
                      const hamburger = document.querySelector('.hamburger-exact');
                      const footer = document.querySelector('.footer');
                      const footerGrid = document.querySelector('.footer-grid');
                      const footerLogo = document.querySelector('.footer-logo-img');
                      const sheets = Array.from(document.styleSheets).map(s => s.href ? s.href.split('/').pop() : 'inline');

                      const topBarStyle = topBar ? window.getComputedStyle(topBar) : null;
                      const trackStyle = topBarTrack ? window.getComputedStyle(topBarTrack) : null;
                      const navStyle = nav ? window.getComputedStyle(nav) : null;
                      const hambStyle = hamburger ? window.getComputedStyle(hamburger) : null;
                      const footerGridStyle = footerGrid ? window.getComputedStyle(footerGrid) : null;
                      const logoStyle = footerLogo ? window.getComputedStyle(footerLogo) : null;

                      return {
                        hasHeaderFooterCSS: sheets.some(s => s && s.includes('header-footer.css')),
                        allSheets: sheets,
                        topBarHeight: topBarStyle ? topBarStyle.height : null,
                        topBarPos: topBarStyle ? topBarStyle.position : null,
                        topBarTrackAnim: trackStyle ? trackStyle.animationName : null,
                        navTop: navStyle ? navStyle.top : null,
                        navHeight: navStyle ? navStyle.height : null,
                        hamburgerDisplay: hambStyle ? hambStyle.display : null,
                        footerGridDisplay: footerGridStyle ? footerGridStyle.display : null,
                        footerGridCols: footerGridStyle ? footerGridStyle.gridTemplateColumns : null,
                        footerGridFlexDir: footerGridStyle ? footerGridStyle.flexDirection : null,
                        footerLogoMargin: logoStyle ? logoStyle.margin : null,
                        footerLogoAlignSelf: logoStyle ? logoStyle.alignSelf : null
                      };
                    })()`,
                    returnByValue: true
                  }
                }));
              }, 1500);
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 1) {
                console.log(`\n=== RESULTS FOR ${deviceName} (${width}x${height}) ===`);
                const val = msg.result?.result?.value || msg.result?.value || msg;
                console.log(JSON.stringify(val, null, 2));
                ws.close();
                chromeProc.kill();
                resolve();
              }
            };

            ws.onerror = (err) => {
              console.error(`WS error:`, err);
              chromeProc.kill();
              resolve();
            };
          } catch(e) {
            console.error('Error parsing CDP tab info:', e);
            chromeProc.kill();
            resolve();
          }
        });
      }).on('error', (e) => {
        console.error('HTTP error connecting to CDP:', e);
        chromeProc.kill();
        resolve();
      });
    }, 1200);
  });
}

async function run() {
  await testViewport(1280, 800, 'DESKTOP');
  await testViewport(820, 1180, 'TABLET_IPAD_AIR');
  await testViewport(390, 844, 'MOBILE_IPHONE14');
}

run();
