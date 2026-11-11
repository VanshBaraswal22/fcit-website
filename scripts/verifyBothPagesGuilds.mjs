import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9310;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,960',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-verify-both-' + Date.now(),
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

          async function setViewport(w, h, mobile = false) {
            await send('Emulation.setDeviceMetricsOverride', {
              width: w,
              height: h,
              deviceScaleFactor: 1,
              mobile,
            });
            await delay(400);
          }

          async function captureScreenshot(filename) {
            const shot = await send('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(`${ARTIFACTS_DIR}/${filename}`, Buffer.from(shot.data, 'base64'));
            console.log(`Saved screenshot: ${filename}`);
          }

          async function scrollToElement(selector, offsetY = -70) {
            await send('Runtime.evaluate', {
              expression: `
                (() => {
                  const el = document.querySelector('${selector}');
                  if (el) {
                    el.scrollIntoView({ behavior: 'instant', block: 'start' });
                    window.scrollBy(0, ${offsetY});
                  }
                })()
              `,
            });
            await delay(800);
          }

          async function navigateTo(url) {
            await send('Page.navigate', { url });
            await delay(2500);
          }

          // -------------------------------------------------------------
          // PART 1: HOMEPAGE VERIFICATION
          // -------------------------------------------------------------
          console.log('--- VERIFYING HOMEPAGE PREVIEW ---');
          await setViewport(1440, 900);
          await scrollToElement('#guilds');
          await captureScreenshot('verify_both_01_home_desktop.png');

          await setViewport(390, 844, true);
          await scrollToElement('#guilds');
          await captureScreenshot('verify_both_02_home_mobile.png');

          // -------------------------------------------------------------
          // PART 2: DEDICATED WORKING GUILDS PAGE VERIFICATION
          // -------------------------------------------------------------
          console.log('--- VERIFYING DEDICATED /working-guilds PAGE ---');
          await setViewport(1440, 960);
          await navigateTo('http://localhost:5173/working-guilds');

          // Chapter 01: Dev's Guild
          await scrollToElement('#devs-guild');
          await captureScreenshot('verify_both_03_stage_devs.png');

          // Hover on Dev's Guild artwork stage
          const hoverDevs = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const el = document.querySelector('#devs-guild .guild-stage-frame');
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
              })()
            `,
            returnByValue: true,
          });
          if (hoverDevs.result && hoverDevs.result.value) {
            await send('Input.dispatchMouseEvent', {
              type: 'mouseMoved',
              x: hoverDevs.result.value.x,
              y: hoverDevs.result.value.y,
            });
            await delay(600);
            await captureScreenshot('verify_both_03b_stage_devs_hover.png');
          }

          // Chapter 02: Intelligence Guild
          await scrollToElement('#intelligence-guild');
          await captureScreenshot('verify_both_04_stage_intelligence.png');

          // Chapter 03: AlgoCrew
          await scrollToElement('#algocrew');
          await captureScreenshot('verify_both_05_stage_algocrew.png');

          // Chapter 04: Fusion X
          await scrollToElement('#fusion-x');
          await captureScreenshot('verify_both_06_stage_fusion.png');

          // Mobile View of /working-guilds
          await setViewport(390, 844, true);
          await scrollToElement('#devs-guild');
          await captureScreenshot('verify_both_07_stage_mobile_devs.png');

          await scrollToElement('#intelligence-guild');
          await captureScreenshot('verify_both_08_stage_mobile_intel.png');

          console.log('ALL VERIFICATION SCREENSHOTS CAPTURED SUCCESSFULLY!');
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
