import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9298;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,864',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-verify-' + Date.now(),
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
          await delay(800);

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

          // 1. Initial Hero load: Phase 1 & 2 (0.6s)
          await delay(600);
          const snapStep1 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_01_hero_autoplay_early.png', Buffer.from(snapStep1.data, 'base64'));
          console.log('Saved verify_01_hero_autoplay_early.png');

          // 2. Hero load: Phase 3 & 4 (1.5s)
          await delay(900);
          const snapStep2 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_02_hero_typography.png', Buffer.from(snapStep2.data, 'base64'));
          console.log('Saved verify_02_hero_typography.png');

          // 3. Hero load: Settled state (2.8s)
          await delay(1300);
          const snapStep3 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_03_hero_settled.png', Buffer.from(snapStep3.data, 'base64'));
          console.log('Saved verify_03_hero_settled.png');

          // 4. Test browser reload (refresh) to verify autoplay on refresh!
          console.log('Reloading page to test autoplay on refresh...');
          await send('Page.reload');
          await delay(1200);
          const snapReload = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_04_homepage_after_refresh.png', Buffer.from(snapReload.data, 'base64'));
          console.log('Saved verify_04_homepage_after_refresh.png');

          // 5. Test clicking Working Guilds in navbar
          console.log('Clicking Working Guilds nav link...');
          await send('Runtime.evaluate', {
            expression: `
              const link = Array.from(document.querySelectorAll('.nav-desktop a')).find(a => a.textContent.includes('Working Guilds'));
              if (link) link.click();
            `
          });
          await delay(1200);
          const snapGuilds = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_05_clicked_working_guilds.png', Buffer.from(snapGuilds.data, 'base64'));
          console.log('Saved verify_05_clicked_working_guilds.png');

          // 6. Test direct hit to /team#guilds
          console.log('Navigating directly to /team#guilds...');
          await send('Page.navigate', { url: 'http://localhost:5173/team#guilds' });
          await delay(1500);
          const snapTeam = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_06_team_guilds_direct.png', Buffer.from(snapTeam.data, 'base64'));
          console.log('Saved verify_06_team_guilds_direct.png');

          // 7. Test /team top hero banner
          console.log('Navigating to top of /team...');
          await send('Page.navigate', { url: 'http://localhost:5173/team' });
          await delay(1500);
          const snapTeamTop = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_07_team_page_top.png', Buffer.from(snapTeamTop.data, 'base64'));
          console.log('Saved verify_07_team_page_top.png');

          // 8. Verify no replay button exists in DOM
          const checkReplay = await send('Runtime.evaluate', {
            expression: `Boolean(document.querySelector('.cinematic-hud-btn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('REPLAY')))`
          });
          console.log('Replay button exists in DOM:', checkReplay.result?.value);

          // 9. Verify site-header presence and bounding box
          const headerBox = await send('Runtime.evaluate', {
            expression: `
              const h = document.querySelector('.site-header');
              if (!h) return null;
              const r = h.getBoundingClientRect();
              JSON.stringify({ visible: window.getComputedStyle(h).visibility !== 'hidden', opacity: window.getComputedStyle(h).opacity, height: r.height, top: r.top });
            `
          });
          console.log('Site header evaluation:', headerBox.result?.value);

          ws.close();
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
}, 1200);
