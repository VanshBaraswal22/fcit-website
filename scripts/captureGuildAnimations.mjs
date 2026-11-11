import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9295;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,960',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-guilds-anim-' + Date.now(),
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
          await delay(2000);

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

          async function captureView(w, h, scrollSelector, filename, hoverSelector = null) {
            await send('Emulation.setDeviceMetricsOverride', {
              width: w,
              height: h,
              deviceScaleFactor: 1,
              mobile: w < 600,
            });
            await delay(400);

            if (scrollSelector) {
              await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const el = document.querySelector('${scrollSelector}');
                    if (el) {
                      el.scrollIntoView({ behavior: 'instant', block: 'start' });
                      window.scrollBy(0, -60);
                    }
                  })()
                `,
              });
              await delay(1000);
            }

            if (hoverSelector) {
              const rectRes = await send('Runtime.evaluate', {
                expression: `
                  (() => {
                    const el = document.querySelector('${hoverSelector}');
                    if (!el) return null;
                    const r = el.getBoundingClientRect();
                    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
                  })()
                `,
                returnByValue: true,
              });

              if (rectRes.result && rectRes.result.value) {
                const pt = rectRes.result.value;
                await send('Input.dispatchMouseEvent', {
                  type: 'mouseMoved',
                  x: pt.x,
                  y: pt.y,
                });
                await delay(600);
              }
            } else {
              await send('Input.dispatchMouseEvent', {
                type: 'mouseMoved',
                x: 10,
                y: 10,
              });
              await delay(300);
            }

            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(`${ARTIFACTS_DIR}/${filename}`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved screenshot: ${filename}`);
          }

          // 1. Desktop 1440x900 view of Guilds
          await captureView(1440, 960, '#guilds', 'verify_guilds_animated_1440.png');

          // 2. Desktop Hover state on Dev's Guild card
          await captureView(1440, 960, '#guilds', 'verify_guilds_hover_devs.png', '.home-guild-editorial-card:nth-child(1)');

          // 3. Desktop Hover state on Intelligence Guild card
          await captureView(1440, 960, '#guilds', 'verify_guilds_hover_intel.png', '.home-guild-editorial-card:nth-child(2)');

          // 4. Tablet 768x1024 view
          await captureView(768, 1024, '#guilds', 'verify_guilds_animated_768.png');

          // 5. Mobile 390x844 view
          await captureView(390, 844, '#guilds', 'verify_guilds_animated_390.png');

          console.log('ALL GUILD ANIMATION SCREENSHOTS CAPTURED SUCCESSFULLY!');
          cp.kill();
          process.exit(0);
        });
      }
    );
    req.on('error', (e) => {
      console.error('Request error:', e);
      cp.kill();
      process.exit(1);
    });
    req.end();
  } catch (err) {
    console.error('Catch error:', err);
    cp.kill();
    process.exit(1);
  }
}, 1500);
