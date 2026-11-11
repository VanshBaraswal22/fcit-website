import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/c1c09ce2-8c02-4bbc-a1f0-41c8bdc840a2';
const PORT = 9335;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,950',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-check-' + Date.now(),
]);

setTimeout(async () => {
  try {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/json/new?http://localhost:5173/',
        method: 'PUT',
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', async () => {
          const tab = JSON.parse(d);
          const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);
          await new Promise((r) => ws.addEventListener('open', r));
          await delay(1500);

          let msgId = 1;
          const send = (method, params = {}) => {
            const id = msgId++;
            return new Promise((resolve) => {
              const handler = (ev) => {
                const m = JSON.parse(ev.data);
                if (m.id === id) {
                  ws.removeEventListener('message', handler);
                  resolve(m.result);
                }
              };
              ws.addEventListener('message', handler);
              ws.send(JSON.stringify({ id, method, params }));
            });
          };

          await send('Page.enable');
          await send('Emulation.setDeviceMetricsOverride', {
            width: 1536,
            height: 950,
            deviceScaleFactor: 1,
            mobile: false,
          });

          // Scroll directly to the grid
          await send('Runtime.evaluate', {
            expression: `
              (() => {
                const grid = document.querySelector('.home-guilds-preview-grid');
                if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'center' });
              })()
            `,
          });
          await delay(1500);

          const shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/guilds_cards_centered.png`, Buffer.from(shot.data, 'base64'));
          console.log('Saved guilds_cards_centered.png');

          // Check card text and bounding box
          const info = await send('Runtime.evaluate', {
            expression: `
              (() => {
                return Array.from(document.querySelectorAll('.home-guild-editorial-card')).map(c => {
                  const r = c.getBoundingClientRect();
                  return {
                    heading: c.querySelector('.guild-heading')?.innerText?.replace(/\\n/g, ' '),
                    domain: c.querySelector('.guild-domain-label')?.innerText,
                    tagline: c.querySelector('.guild-tagline')?.innerText,
                    explore: c.querySelector('.guild-explore')?.innerText,
                    rect: { width: Math.round(r.width), height: Math.round(r.height), top: Math.round(r.top) }
                  };
                });
              })()
            `,
            returnByValue: true,
          });
          console.log('Card details:', JSON.stringify(info.result.value, null, 2));

          cp.kill();
          process.exit(0);
        });
      }
    );
    req.end();
  } catch (err) {
    console.error(err);
    cp.kill();
    process.exit(1);
  }
}, 1500);
