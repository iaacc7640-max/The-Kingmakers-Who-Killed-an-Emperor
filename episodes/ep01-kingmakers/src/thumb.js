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
window.THUMB = { draw: (v) => { draw(v); return cv.toDataURL('image/png'); }, ready: false };
(async () => { await document.fonts.load('400 100px Bebas'); await document.fonts.load('700 100px Caladea'); window.THUMB.ready = true; })();
