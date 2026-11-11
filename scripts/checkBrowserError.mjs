import { spawn } from 'node:child_process';
import http from 'node:http';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9302;

const cp = spawn(CHROME, [
  '--remote-debugging-port=' + PORT,
  '--headless=new',
  '--user-data-dir=' + (process.env.TEMP || 'C:/temp') + '/ch-err-' + Date.now(),
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

          ws.addEventListener('message', (ev) => {
            const m = JSON.parse(ev.data);
            if (m.method === 'Runtime.exceptionThrown') {
              console.error('EXCEPTION:', JSON.stringify(m.params.exceptionDetails));
            }
            if (m.method === 'Runtime.consoleAPICalled') {
              console.log('CONSOLE:', m.params.type, m.params.args.map(a => a.value || a.description).join(' '));
            }
          });

          await send('Runtime.enable');
          await send('Page.enable');

          await new Promise(r => setTimeout(r, 2000));
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
