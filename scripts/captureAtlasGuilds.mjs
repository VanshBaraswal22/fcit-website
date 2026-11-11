import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9288;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,864',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-atlas-' + Date.now(),
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

          // Helper to set viewport & capture
          async function captureSection(w, h, scrollSelector, filename) {
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
                      window.scrollBy(0, -84);
                    }
                  })()
                `,
              });
              await delay(800);
            }

            // Park mouse at side of screen
            await send('Input.dispatchMouseEvent', {
              type: 'mouseMoved',
              x: 20,
              y: 20,
            });
            await delay(200);

            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(`${ARTIFACTS_DIR}/${filename}`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved screenshot: ${filename}`);
          }

          // Test 1536x864: Intro & all 4 guild panels
          await captureSection(1536, 864, '#guilds-intro', 'atlas_1536_00_intro.png');
          await captureSection(1536, 864, '#devs-guild', 'atlas_1536_01_devs.png');
          await captureSection(1536, 864, '#intelligence-guild', 'atlas_1536_02_intelligence.png');
          await captureSection(1536, 864, '#algocrew', 'atlas_1536_03_algocrew.png');
          await captureSection(1536, 864, '#fusion-x', 'atlas_1536_04_fusion.png');

          // Test 1920x1080: Devs & Intelligence
          await captureSection(1920, 1080, '#devs-guild', 'atlas_1920_01_devs.png');
          await captureSection(1920, 1080, '#intelligence-guild', 'atlas_1920_02_intelligence.png');

          // Test 1366x768: AlgoCrew & Fusion
          await captureSection(1366, 768, '#algocrew', 'atlas_1366_03_algocrew.png');
          await captureSection(1366, 768, '#fusion-x', 'atlas_1366_04_fusion.png');

          // Test Mobile 390x844: Intro, Devs, Intelligence
          await captureSection(390, 844, '#guilds-intro', 'atlas_390_00_intro.png');
          await captureSection(390, 844, '#devs-guild', 'atlas_390_01_devs.png');
          await captureSection(390, 844, '#fusion-x', 'atlas_390_04_fusion.png');

          console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
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
