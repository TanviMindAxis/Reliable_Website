const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'topographical-survey.html');
const original = fs.readFileSync(filePath, 'utf8');

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

fs.writeFileSync(filePath, original.replace(targetRegex, threeCards), 'utf8');

const port = 9985;
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
          params: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
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
                expression: `(() => {
                  const spec = document.querySelector('.service-spec-section');
                  if (spec) spec.scrollIntoView({ behavior: 'instant', block: 'start' });
                })()`
              }
            }));
          }, 1200);
        }
        if (msg.id === 2) {
          setTimeout(() => {
            ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
          }, 500);
        }
        if (msg.id === 3) {
          fs.writeFileSync(path.join(__dirname, 'spec_three_cards_mobile.png'), Buffer.from(msg.result.data, 'base64'));
          console.log('Saved spec_three_cards_mobile.png');
          ws.close();
          chrome.kill();
          fs.writeFileSync(filePath, original, 'utf8');
        }
      };
    });
  });
}, 1200);
