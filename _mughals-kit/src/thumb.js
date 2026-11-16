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
window.THUMB = { draw: (v) => { if (v === 'C') drawClickbet(); else draw(v); return cv.toDataURL('image/png'); }, ready: false };
(async () => { await document.fonts.load('400 100px Bebas'); await document.fonts.load('700 100px Caladea'); window.THUMB.ready = true; })();
