// node tools/thumb.mjs → renders/thumb.png, renders/thumb-b.png (1280x720) + 128x72 checks in review/
import { spawn, spawnSync } from 'node:child_process'; import http from 'node:http'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.otf': 'font/otf', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.json': 'application/json' };
const srv = http.createServer((req, r) => { const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((res) => srv.listen(0, '127.0.0.1', res)); const port = srv.address().port;
const CHROME = [process.env.CHROME, '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => p && fs.existsSync(p));
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'th-')); const ch = spawn(CHROME, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${prof}`, '--no-sandbox', '--window-size=1920,1080', 'about:blank'], { stdio: 'ignore' });
let dbg; for (let i = 0; i < 200 && !dbg; i++) { try { dbg = fs.readFileSync(path.join(prof, 'DevToolsActivePort'), 'utf8').split('\n')[0].trim(); } catch { await sleep(100); } }
const tg = await (await fetch(`http://127.0.0.1:${dbg}/json/new?${encodeURIComponent(`http://127.0.0.1:${port}/thumb.html`)}`, { method: 'PUT' })).json();
const ws = new WebSocket(tg.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const pend = new Map(); ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const ev = (expr) => new Promise((res) => { const i = ++id; pend.set(i, (m) => res(m.result?.result?.value ?? m.result?.exceptionDetails?.exception?.description)); ws.send(JSON.stringify({ id: i, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true, awaitPromise: true } })); });
for (let i = 0; i < 200; i++) { if (await ev('window.THUMB && THUMB.ready') === true) break; await sleep(100); }
fs.mkdirSync(path.join(ROOT, 'renders'), { recursive: true }); fs.mkdirSync(path.join(ROOT, 'review'), { recursive: true });
for (const [v, name] of [['A', 'thumb'], ['B', 'thumb-b'], ['C', 'thumb-clickbet'], ['D', 'thumb-map']]) {
  const d = await ev(`THUMB.draw('${v}')`); if (typeof d !== 'string' || !d.startsWith('data:')) throw new Error(String(d));
  const raw = path.join(os.tmpdir(), `${name}-raw.png`); fs.writeFileSync(raw, Buffer.from(d.split(',')[1], 'base64'));
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', 'scale=1280:720:flags=lanczos', path.join(ROOT, 'renders', `${name}.png`)]);
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', 'scale=128:72:flags=lanczos', path.join(ROOT, 'review', `${name}-128.png`)]);
  console.log(`renders/${name}.png`);
}
ws.close(); ch.kill('SIGKILL'); srv.close();
