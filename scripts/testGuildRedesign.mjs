import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/c1c09ce2-8c02-4bbc-a1f0-41c8bdc840a2';
const PORT = 9336;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1920,1080',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-guilds-final-' + Date.now(),
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

          async function captureViewport(w, h, filename, hoverIndex = null, scrollToCards = true) {
            await send('Emulation.setDeviceMetricsOverride', {
              width: w,
              height: h,
              deviceScaleFactor: 1,
              mobile: w < 600,
            });
            await delay(400);

            if (scrollToCards) {
              await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const grid = document.querySelector('.home-guilds-preview-grid');
                    if (grid) {
                      grid.scrollIntoView({ behavior: 'instant', block: 'center' });
                    }
                  })()
                `,
              });
              await delay(1200);
            }

            if (hoverIndex !== null) {
              const rectResult = await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const cards = document.querySelectorAll('.home-guild-editorial-card');
                    if (cards[${hoverIndex}]) {
                      const r = cards[${hoverIndex}].getBoundingClientRect();
                      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
                    }
                    return null;
                  })()
                `,
                returnByValue: true,
              });

              if (rectResult?.result?.value) {
                const { x, y } = rectResult.result.value;
                await send('Input.dispatchMouseEvent', {
                  type: 'mouseMoved',
                  x,
                  y,
                });
                await delay(600);
              }
            } else {
              await send('Input.dispatchMouseEvent', {
                type: 'mouseMoved',
                x: 10,
                y: 10,
              });
              await delay(200);
            }

            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(`${ARTIFACTS_DIR}/${filename}`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved screenshot: ${filename} (${w}x${h})`);
          }

          // 1. 1920 x 1080
          console.log('Testing 1920x1080...');
          await captureViewport(1920, 1080, 'guilds_1920x1080.png');

          // 2. 1536 x 864
          console.log('Testing 1536x864...');
          await captureViewport(1536, 864, 'guilds_1536x864.png');

          // 3. 1366 x 768
          console.log('Testing 1366x768...');
          await captureViewport(1366, 768, 'guilds_1366x768.png');

          // 4. 1024 x 768
          console.log('Testing 1024x768...');
          await captureViewport(1024, 768, 'guilds_1024x768.png');

          // 5. 768 x 1024
          console.log('Testing 768x1024...');
          await captureViewport(768, 1024, 'guilds_768x1024.png');

          // 6. 390 x 844
          console.log('Testing 390x844...');
          await captureViewport(390, 844, 'guilds_390x844.png');

          // 7. 360 x 800
          console.log('Testing 360x800...');
          await captureViewport(360, 800, 'guilds_360x800.png');

          // 8. Hover test on 1536x864 (Dev's Guild)
          console.log('Testing hover on 1536x864 (Devs Guild)...');
          await captureViewport(1536, 864, 'guilds_1536x864_hover.png', 0);

          // DOM Content & Routing Verification
          const domCheck = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const cards = Array.from(document.querySelectorAll('.home-guild-editorial-card'));
                return cards.map(c => ({
                  heading: c.querySelector('.guild-heading')?.innerText?.replace(/\\s+/g, ' ').trim(),
                  domain: c.querySelector('.guild-domain-label')?.innerText?.trim(),
                  tagline: c.querySelector('.guild-tagline')?.innerText?.trim(),
                  explore: c.querySelector('.guild-explore')?.innerText?.replace(/\\s+/g, ' ').trim(),
                  bg: c.querySelector('.home-guild-card__bg')?.getAttribute('src'),
                  href: c.getAttribute('href')
                }));
              })()
            `,
            returnByValue: true,
          });

          console.log('DOM & Route Verification:');
          console.log(JSON.stringify(domCheck?.result?.value, null, 2));

          console.log('ALL VERIFICATIONS AND SCREENSHOTS COMPLETED!');
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
