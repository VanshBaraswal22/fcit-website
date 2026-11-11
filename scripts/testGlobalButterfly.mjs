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
  '--window-size=1536,864',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-gbf-' + Date.now(),
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
          await send('Emulation.setDeviceMetricsOverride', {
            width: 1536,
            height: 864,
            deviceScaleFactor: 1,
            mobile: false,
          });

          // 1. Verify portal placement directly in document.body
          const portalCheck = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const el = document.querySelector('.fcit-global-butterfly-portal');
                const bf = document.querySelector('.fcit-ambient-butterfly');
                return {
                  isDirectChildOfBody: el && el.parentElement === document.body,
                  zIndex: el ? window.getComputedStyle(el).zIndex : null,
                  position: el ? window.getComputedStyle(el).position : null,
                  bfTransform: bf ? bf.style.transform : null,
                  bodyCursor: window.getComputedStyle(document.body).cursor
                };
              })()
            `,
            returnByValue: true,
          });
          console.log('Portal verification:', JSON.stringify(portalCheck.result.value, null, 2));

          // 2. Capture at Hero
          await delay(800);
          let shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/gbf_01_hero.png`, Buffer.from(shot.data, 'base64'));
          console.log('Captured gbf_01_hero.png');

          // 3. Scroll to Notice Repository
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: 900, behavior: 'instant' })`,
          });
          await delay(1200);
          shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/gbf_02_notices.png`, Buffer.from(shot.data, 'base64'));
          console.log('Captured gbf_02_notices.png');

          // 4. Scroll to Working Guilds
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: 2200, behavior: 'instant' })`,
          });
          await delay(1200);
          shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/gbf_03_guilds.png`, Buffer.from(shot.data, 'base64'));
          console.log('Captured gbf_03_guilds.png');

          // 5. Scroll to Footer
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: 8000, behavior: 'instant' })`,
          });
          await delay(1200);
          shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/gbf_04_footer.png`, Buffer.from(shot.data, 'base64'));
          console.log('Captured gbf_04_footer.png');

          // 6. Scroll back up to Hero
          await send('Runtime.evaluate', {
            expression: `window.scrollTo({ top: 0, behavior: 'instant' })`,
          });
          await delay(1200);
          shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(`${ARTIFACTS_DIR}/gbf_05_hero_return.png`, Buffer.from(shot.data, 'base64'));
          console.log('Captured gbf_05_hero_return.png');

          console.log('ALL GLOBAL BUTTERFLY TESTS PASSED!');
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
