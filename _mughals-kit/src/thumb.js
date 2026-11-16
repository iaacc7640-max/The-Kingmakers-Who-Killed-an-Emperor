// Thumbnail scene (A10): drawn at 1920x1080 with the series kit, exported at 1280x720 (+128x72 check).
// 3 elements: one Sayyid brother (cold half-smile, rim light) holding gold strings · a small puppet emperor above an empty
// throne · 2-4 words in Bebas Neue with a dark stroke. Bottom-right 25% kept clear for the timestamp badge.
import { setCtx, ctx, W, H } from './core/lib.js';
import * as K from './core/kit.js';
const cv = document.getElementById('cv'); setCtx(cv.getContext('2d'));
function words(lines, x, y, size) {
  ctx.save(); ctx.font = `400 ${size}px Bebas`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  lines.forEach(([txt, col], i) => { const yy = y + i * size * 0.98; ctx.lineWidth = 16; ctx.strokeStyle = '#140D08'; ctx.strokeText(txt, x, yy); ctx.fillStyle = col; ctx.fillText(txt, x, yy); });
  ctx.restore();
}
function draw(variant) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); K.darkParchment(9);
  const g = ctx.createRadialGradient(560, 520, 50, 560, 520, 760); g.addColorStop(0, 'rgba(200,149,47,0.35)'); g.addColorStop(1, 'rgba(200,149,47,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // the empty throne + the small puppet emperor hanging on strings above it
  K.throne(1120, 1040, 0.6, { canopy: false });
  K.person('farrukh', { x: 1120, y: 880, h: 300, t: 0.4, arm: 60, brows: 'worried', halo: false });
  // the brother, rim-lit, his hand raised holding the strings
  const B = { x: 470, y: 1460, h: 900, t: 0, arm: 128, brows: 'cold', smile: true, prop: null };
  ctx.save(); ctx.shadowColor = 'rgba(242,193,78,0.9)'; ctx.shadowBlur = 40; K.person('abdullah', B); ctx.restore(); K.person('abdullah', B);
  const hx = 752, hy = 668;
  ctx.save(); ctx.strokeStyle = '#F2C14E'; ctx.lineWidth = 6; ctx.shadowColor = 'rgba(242,193,78,0.8)'; ctx.shadowBlur = 16;
  for (const [ex, ey] of [[1100, 660], [1170, 690], [1150, 760], [1090, 800]]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + ex) / 2, (hy + ey) / 2 + 40, ex, ey); ctx.stroke(); }
  ctx.restore();
  if (variant === 'B') words([['PUPPET', '#F3E9D2'], ['EMPEROR', '#E0483F']], 1300, 300, 200);
  else words([['4 EMPERORS.', '#F3E9D2'], ['1 YEAR.', '#E0483F']], 1235, 290, 158);
}
// ── Variant C: high-energy "clickbait" layout in the spirit of tabloid-style channels (bold outlined yellow title, red circle
// and arrow, a reaction face, a burst sticker) — drawn entirely in our own cut-paper kit, nothing copied.
function title3(x, y) {
  // THE KINGMAKERS / WHO KILLED / AN EMPEROR — heavy black stroke, hard drop shadow
  const rows = [['THE KINGMAKERS', '#FFFFFF', 150], ['WHO KILLED', '#FFD400', 196], ['AN EMPEROR', '#FFFFFF', 150]];
  let yy = y; ctx.save(); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  rows.forEach(([txt, col, size], i) => {
    ctx.font = `400 ${size}px Bebas`; yy += size * 0.9;
    if (i === 2) { const w = ctx.measureText(txt).width; ctx.fillStyle = '#D21F1F'; ctx.save(); ctx.translate(x - 22, yy - size * 0.82); ctx.rotate(-0.02); ctx.fillRect(0, 0, w + 44, size * 0.98); ctx.restore(); }
    ctx.fillStyle = 'rgba(0,0,0,0.65)'; ctx.fillText(txt, x + 9, yy + 9);
    ctx.lineWidth = 22; ctx.strokeStyle = '#000'; ctx.strokeText(txt, x, yy); ctx.fillStyle = col; ctx.fillText(txt, x, yy);
    yy += size * 0.06;
  });
  ctx.restore();
}
function shockedFace(x, y, r) {   // a paper "shocked" reaction face
  ctx.save(); ctx.translate(x, y); K.cut(K.P_circ(0, 0, r), '#FFC92E', { shadow: 1, edge: 6 });
  for (const k of [-1, 1]) { K.cut(K.P_ell(k * r * 0.33, -r * 0.18, r * 0.16, r * 0.22), '#fff', { shadow: 0, edge: 0 }); ctx.beginPath(); ctx.arc(k * r * 0.33, -r * 0.12, r * 0.08, 0, Math.PI * 2); ctx.fillStyle = '#2A1A0E'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(k * r * 0.18, -r * 0.48); ctx.lineTo(k * r * 0.5, -r * 0.56); ctx.strokeStyle = '#2A1A0E'; ctx.lineWidth = r * 0.07; ctx.lineCap = 'round'; ctx.stroke(); }
  K.cut(K.P_ell(0, r * 0.38, r * 0.17, r * 0.24), '#5A1A12', { shadow: 0, edge: 0 }); ctx.restore();
}
function burst(x, y, r, text) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.12); K.cut(() => { ctx.beginPath(); for (let i = 0; i <= 28; i++) { const a = i / 28 * Math.PI * 2, rr = i % 2 ? r * 0.78 : r; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); }, '#D21F1F', { shadow: 1, edge: 6 });
  ctx.font = `400 ${r * 0.62}px Bebas`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.fillText(text, 0, r * 0.06); ctx.restore();
}
function drawClickbet() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const bg = ctx.createRadialGradient(620, 560, 80, 620, 560, 1300); bg.addColorStop(0, '#7A1712'); bg.addColorStop(0.55, '#3A0B08'); bg.addColorStop(1, '#0E0403'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.28; for (let i = 0; i < 5; i++) K.cutArch(140 + i * 420, 1080, 150, 760, '#000'); ctx.restore();
  for (let i = 0; i < 18; i++) { const a = -1.9 + i * 0.07; ctx.save(); ctx.translate(560, 560); ctx.rotate(a); ctx.fillStyle = 'rgba(255,210,80,0.05)'; ctx.fillRect(0, -6, 1500, 12); ctx.restore(); }
  // the brother, huge, rim-lit gold, cold smile, hand raised with the strings
  const B = { x: 430, y: 1560, h: 1120, t: 0, arm: 128, brows: 'cold', smile: true, prop: null };
  ctx.save(); ctx.shadowColor = 'rgba(255,200,60,1)'; ctx.shadowBlur = 55; K.person('abdullah', B); ctx.restore(); K.person('abdullah', B);
  // the puppet emperor dangling on gold strings, ringed in red with a red arrow
  const px = 1000, py = 1000;
  K.person('farrukh', { x: px, y: py, h: 340, t: 0.4, arm: 70, brows: 'worried', halo: false });
  K.crown(px + 20, py - 345, 0.42, 0.35, { plume: false });
  const hx = 790, hy = 560; ctx.save(); ctx.strokeStyle = '#FFD15A'; ctx.lineWidth = 6; ctx.shadowColor = 'rgba(255,210,90,0.9)'; ctx.shadowBlur = 18;
  for (const [ex, ey] of [[970, 760], [1040, 790], [1030, 860], [960, 900]]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + ex) / 2 + 30, (hy + ey) / 2 - 30, ex, ey); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.strokeStyle = '#FF2A2A'; ctx.lineWidth = 16; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.ellipse(px + 10, py - 175, 175, 225, 0.08, 0, Math.PI * 2); ctx.stroke();
  // red arrow from the title down to the circle
  ctx.fillStyle = '#FF2A2A'; ctx.translate(1300, 860); ctx.rotate(Math.PI * 0.86); ctx.fillRect(0, -16, 150, 32); ctx.beginPath(); ctx.moveTo(150, -46); ctx.lineTo(220, 0); ctx.lineTo(150, 46); ctx.closePath(); ctx.fill(); ctx.restore();
  title3(1080, 40);
  shockedFace(1640, 600, 92);
  burst(250, 190, 120, '1719');
}
// ── Variant D (main): history-channel layout from the user's references — a real map as the backdrop, white heavy text on
// black bars, one huge red word, bold arrows carrying flags, and the story's characters in front.
function bar(txt, x, y, size, col = '#FFFFFF', bg = '#0B0B0B') {
  ctx.save(); ctx.font = `900 ${size}px Inter`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  const w = ctx.measureText(txt).width, pad = size * 0.22; ctx.fillStyle = bg; ctx.fillRect(x, y - size * 0.86 - pad * 0.6, w + pad * 2, size * 1.02 + pad * 0.9);
  ctx.fillStyle = col; ctx.fillText(txt, x + pad, y); ctx.restore(); return w + pad * 2;
}
function bigRed(txt, x, y, size) {
  ctx.save(); ctx.font = `900 ${size}px Inter`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillText(txt, x + 10, y + 12); ctx.lineWidth = size * 0.12; ctx.strokeStyle = '#FFFFFF'; ctx.strokeText(txt, x, y); ctx.fillStyle = '#D7261E'; ctx.fillText(txt, x, y); ctx.restore();
}
function fatArrow(pts, col = '#D7261E') {   // a thick curved arrow with a white outline, like campaign maps
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const path = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]); };
  const [a, b] = [pts[1], pts[2]], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const head = (grow) => { ctx.save(); ctx.translate(b[0], b[1]); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(30 + grow, 0); ctx.lineTo(-40 - grow, -46 - grow); ctx.lineTo(-40 - grow, 46 + grow); ctx.closePath(); ctx.restore(); };
  ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 50; path(); ctx.stroke(); head(9); ctx.fillStyle = '#FFFFFF'; ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 34; path(); ctx.stroke(); head(0); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}
function controlBar(x, y, s, rot) {   // a marionette's wooden control cross, gold
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  K.cut(K.P_rr(-150, -14, 300, 28, 10), '#C8952F', { shadow: 0.8, edge: 3 }); K.cut(K.P_rr(-14, -110, 28, 220, 10), '#C8952F', { shadow: 0.8, edge: 3 });
  for (const [cx, cy] of [[-150, 0], [150, 0], [0, -110], [0, 110]]) K.cut(K.P_circ(cx, cy, 16), '#A87A22', { shadow: 0.4, edge: 2 });
  ctx.restore();
}
function drawMapThumb() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const v = { cx: 67.3, cy: 24.0, s: 32 };
  K.indiaMap({ t: 0.6, mughal: 1, v, noCompass: true });
  const P = (lo, la) => K.proj(lo, la, v);
  const [sx, sy] = P(74.0, 17.7), [dx, dy] = P(77.2, 28.6), [bx, by] = P(88.4, 22.6);
  // dark left for the title, warm vignette
  const gl = ctx.createLinearGradient(0, 0, 980, 0); gl.addColorStop(0, 'rgba(10,6,4,0.75)'); gl.addColorStop(1, 'rgba(10,6,4,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H); K.vignette(0.45);
  // the Maratha march on Delhi, 1719 (Peshwa Balaji Vishwanath's troops with Hussain Ali)
  fatArrow([[sx - 10, sy + 60], [sx - 30, sy - 70], [dx - 25, dy + 205]]);
  K.marathaFlag(sx + 50, sy + 150, 0.8, 0.6);
  // the Mughal flag over Delhi and the emperor on strings
  K.mughalFlag(dx - 200, dy - 30, 0.8, 0.6);
  const ex = dx + 60, ey = dy + 175; K.person('farrukh', { x: ex, y: ey, h: 360, t: 0.4, arm: 70, brows: 'worried', halo: false });
  K.crown(ex + 16, ey - 372, 0.42, 0.25, { plume: false });
  ctx.save(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(dx, dy, 15, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#FFD400'; ctx.beginPath(); ctx.arc(dx, dy, 8, 0, Math.PI * 2); ctx.fill(); ctx.font = '900 40px Inter'; ctx.lineWidth = 11; ctx.lineJoin = 'round'; ctx.strokeStyle = '#111'; ctx.fillStyle = '#fff'; ctx.textAlign = 'right'; ctx.strokeText('DELHI', dx - 26, dy + 14); ctx.fillText('DELHI', dx - 26, dy + 14); ctx.restore();
  // the kingmakers' hand comes down from the top with the control cross
  const cx = ex + 20, cy = 40;
  controlBar(cx, cy + 40, 0.85, 0.06);
  K.hand(cx, cy - 30, 1.25, Math.PI / 2, 1, '#D9A77E', '#2F5D3A');
  ctx.save(); ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 4; ctx.shadowColor = 'rgba(255,210,90,0.9)'; ctx.shadowBlur = 10;
  const sc = 360 / 520, tips = [[ex - 30, ey - 470 * sc * 0.6], [ex + 40, ey - 470 * sc * 0.75], [ex + 70, ey - 520 * sc * 0.55], [ex - 50, ey - 300 * sc]];
  [[cx - 135, cy + 47], [cx + 135, cy + 33], [cx + 9, cy - 59], [cx - 9, cy + 139]].forEach(([hx, hy], i) => { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tips[i][0], tips[i][1]); ctx.stroke(); });
  ctx.restore();
  // title: black bars + one huge red line
  bar('THE KINGMAKERS', 56, 190, 104); bar('WHO KILLED', 56, 345, 104);
  bigRed('AN', 70, 570, 196); bigRed('EMPEROR', 70, 780, 196);
  K.ribbon('1719', 300, 950, 1, 74);
}
window.THUMB = { draw: (v) => { if (v === 'D') drawMapThumb(); else if (v === 'C') drawClickbet(); else draw(v); return cv.toDataURL('image/png'); }, ready: false };
(async () => { await document.fonts.load('900 100px Inter'); await document.fonts.load('400 100px Bebas'); await document.fonts.load('700 100px Caladea'); window.THUMB.ready = true; })();
