import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9297;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,864',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-intro-' + Date.now(),
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
          await delay(1000);

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

          // Snapshot at 1.5s
          await delay(1500);
          const snap1 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/inspect_home_1500ms.png', Buffer.from(snap1.data, 'base64'));

          // Snapshot at 3.0s (settled)
          await delay(1500);
          const snap2 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/inspect_home_3000ms.png', Buffer.from(snap2.data, 'base64'));

          // Now navigate to /team#guilds
          await send('Page.navigate', { url: 'http://localhost:5173/team#guilds' });
          await delay(2000);
          const snapTeam = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/inspect_team_guilds.png', Buffer.from(snapTeam.data, 'base64'));

          console.log('Screenshots saved!');
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
