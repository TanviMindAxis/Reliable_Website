const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'topographical-survey.html');
const original = fs.readFileSync(filePath, 'utf8');

// 2 Cards Total:
const twoCards = `                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="background: #f1f5f9; border-left: 4px solid var(--accent-orange); border-radius: 0 8px 8px 0; padding: 16px 18px;">
                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 3px;">Rapid Field Dispatch Across Maharashtra</div>
                                <div style="font-size: 12.5px; color: var(--text-muted); line-height: 1.45;">Direct mobilization from Pune headquarters for urgent infrastructure & topographical requirements.</div>
                            </div>
                            <div style="background: #f1f5f9; border-left: 4px solid var(--primary-navy); border-radius: 0 8px 8px 0; padding: 16px 18px;">
                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 3px;">Survey of India (SOI) Datum & Multi-Format CAD</div>
                                <div style="font-size: 12.5px; color: var(--text-muted); line-height: 1.45;">Tied to national geodetic benchmarks with ready-to-use AutoCAD .DWG, 3D DTM, and contour models.</div>
                            </div>
                        </div>`;

// 3 Cards Total:
const threeCards = `                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="background: #f1f5f9; border-left: 4px solid var(--accent-orange); border-radius: 0 8px 8px 0; padding: 14px 16px;">
                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 2px;">Rapid Field Dispatch Across Maharashtra</div>
                                <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">Direct mobilization from Pune headquarters for urgent infrastructure & topographical requirements.</div>
                            </div>
                            <div style="background: #f1f5f9; border-left: 4px solid var(--primary-navy); border-radius: 0 8px 8px 0; padding: 14px 16px;">
                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 2px;">Survey of India (SOI) Datum Compliance</div>
                                <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">Tied to national permanent GTS control pillars with closed-loop traverse mathematical closure.</div>
                            </div>
                            <div style="background: #f1f5f9; border-left: 4px solid var(--accent-orange); border-radius: 0 8px 8px 0; padding: 14px 16px;">
                                <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 2px;">Multi-Layered CAD & 3D Deliverables</div>
                                <div style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">Handover includes 2D/3D AutoCAD .DWG, LandXML, DTM surface meshes, and stamped survey drawings.</div>
                            </div>
                        </div>`;

const targetRegex = /<div style="background: #f1f5f9; border-left: 4px solid var\(--accent-orange\); border-radius: 0 8px 8px 0; padding: 18px 20px;">[\s\S]*?<\/div>\s*<\/div>/;

function testSetup(replacement, outName) {
  return new Promise((resolve) => {
    fs.writeFileSync(filePath, original.replace(targetRegex, replacement), 'utf8');

    const port = 9986;
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
                      const spec = document.querySelector('.service-spec-section');
                      if (spec) spec.scrollIntoView({ behavior: 'instant', block: 'start' });
                      const grid = document.querySelector('.service-spec-grid');
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
              }, 1200);
            }
            if (msg.id === 2) {
              console.log(outName, 'Stats:', msg.result.result.value);
              setTimeout(() => {
                ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
              }, 500);
            }
            if (msg.id === 3) {
              fs.writeFileSync(path.join(__dirname, outName), Buffer.from(msg.result.data, 'base64'));
              console.log('Saved ' + outName);
              ws.close();
              chrome.kill();
              resolve();
            }
          };
        });
      });
    }, 1200);
  });
}

async function main() {
  await testSetup(twoCards, 'spec_two_cards.png');
  await testSetup(threeCards, 'spec_three_cards.png');
  fs.writeFileSync(filePath, original, 'utf8');
}

main().catch(console.error);
