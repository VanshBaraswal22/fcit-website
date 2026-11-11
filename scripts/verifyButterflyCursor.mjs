import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:/Users/Vansh Baraswal/.gemini/antigravity/brain/26e535b7-8a3d-45e7-a622-288844d73456';
const PORT = 9299;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--window-size=1536,864',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-bfcursor-' + Date.now(),
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
          await send('Input.enable');
          await send('Emulation.setDeviceMetricsOverride', {
            width: 1536,
            height: 864,
            deviceScaleFactor: 1,
            mobile: false,
          });

          await delay(1000);

          // 1. Check if portal exists in document.body
          const portalCheck = await send('Runtime.evaluate', {
            expression: `
              const el = document.body.querySelector('.butterfly-cursor-wrapper');
              Boolean(el && el.parentElement === document.body);
            `
          });
          console.log('Butterfly rendered directly in document.body:', portalCheck.result?.value);

          // 2. Simulate moving mouse across hero to (500, 400)
          console.log('Dispatching mouse moves across hero...');
          for (let i = 0; i < 20; i++) {
            const x = 300 + i * 20;
            const y = 300 + Math.sin(i * 0.3) * 50;
            await send('Input.dispatchMouseEvent', {
              type: 'mouseMoved',
              x,
              y,
            });
            await delay(20);
          }
          await delay(200);

          // Capture screenshot with butterfly trailing cursor
          const snap1 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_bf_cursor_hero.png', Buffer.from(snap1.data, 'base64'));
          console.log('Saved verify_bf_cursor_hero.png');

          // 3. Move mouse over Discover FCIT button (interactive hover)
          console.log('Moving mouse over Discover FCIT button...');
          const btnPos = await send('Runtime.evaluate', {
            expression: `
              const btn = document.querySelector('.fcit-atmosphere__button');
              if (!btn) null;
              const r = btn.getBoundingClientRect();
              JSON.stringify({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            `
          });
          const btnCoord = JSON.parse(btnPos.result?.value || '{"x": 600, "y": 600}');
          await send('Input.dispatchMouseEvent', {
            type: 'mouseMoved',
            x: btnCoord.x,
            y: btnCoord.y,
          });
          await delay(300);

          const snap2 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_bf_cursor_hover_btn.png', Buffer.from(snap2.data, 'base64'));
          console.log('Saved verify_bf_cursor_hover_btn.png');

          // 4. Dispatch a mouse click to trigger stardust burst
          await send('Input.dispatchMouseEvent', {
            type: 'mousePressed',
            button: 'left',
            clickCount: 1,
            x: btnCoord.x,
            y: btnCoord.y,
          });
          await send('Input.dispatchMouseEvent', {
            type: 'mouseReleased',
            button: 'left',
            clickCount: 1,
            x: btnCoord.x,
            y: btnCoord.y,
          });
          await delay(80);

          const snap3 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_bf_cursor_click_burst.png', Buffer.from(snap3.data, 'base64'));
          console.log('Saved verify_bf_cursor_click_burst.png');

          // 5. Scroll down to Working Guilds section and move cursor there
          console.log('Scrolling down to Working Guilds...');
          await send('Runtime.evaluate', {
            expression: `
              const guilds = document.getElementById('guilds');
              if (guilds) guilds.scrollIntoView({ behavior: 'instant' });
            `
          });
          await delay(500);

          for (let i = 0; i < 15; i++) {
            await send('Input.dispatchMouseEvent', {
              type: 'mouseMoved',
              x: 400 + i * 25,
              y: 350 + i * 10,
            });
            await delay(20);
          }
          await delay(200);

          const snap4 = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(ARTIFACTS_DIR + '/verify_bf_cursor_in_guilds.png', Buffer.from(snap4.data, 'base64'));
          console.log('Saved verify_bf_cursor_in_guilds.png');

          // 6. Inspect cursor layer computed styles
          const layerStyles = await send('Runtime.evaluate', {
            expression: `
              const bf = document.querySelector('.cursor-butterfly-layer');
              const wp = document.querySelector('.butterfly-cursor-wrapper');
              if (!bf || !wp) null;
              JSON.stringify({
                wrapperZIndex: window.getComputedStyle(wp).zIndex,
                wrapperPointerEvents: window.getComputedStyle(wp).pointerEvents,
                wrapperOpacity: window.getComputedStyle(wp).opacity,
                bfTransform: bf.style.transform,
                bfInteractive: bf.classList.contains('butterfly--interactive')
              });
            `
          });
          console.log('Layer styles evaluation:', layerStyles.result?.value);

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
