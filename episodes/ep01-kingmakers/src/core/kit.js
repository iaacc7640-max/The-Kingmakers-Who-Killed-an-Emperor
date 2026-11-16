// ClearCut History · Paper Atlas 16:9 kit (series kit for "The Fall of the Mughals").
// Everything is cut paper on parchment: a light paper edge + a soft drop shadow. Maps are drawn in code.
import { ctx, W, H, TAU, lerp, clamp, seg, eo, eob, eio, rnd, rr, circle, ell, line } from './lib.js';
import { LAND } from './india-land.js';

export const P = {
  parch: '#E9DCBC', parchDark: '#D6C39B', ink: '#3E2C1E', sepia: '#8A6A48', crimson: '#A8322D', gold: '#C8952F', goldDark: '#A87A22',
  land: '#DCC9A0', ocean: '#2E4A6B', oceanLite: '#3D5C80', edge: '#F7EFDC', skin: '#D9A77E', skinShade: '#C08E66', pale: '#E2C6A6',
  mughal: '#2F5D3A', mughalLite: '#4C7A55', maratha: '#D9822B', afghan: '#5B6770', persia: '#3E8E8A', sikh: '#4A5F86', jat: '#B8892E',
  rajput: '#C0462C', hyderabad: '#3F7F6A', awadh: '#7A4B6B', bengal: '#6F7A3A', mysore: '#7E2F3A', travancore: '#7E8B5A', eic: '#A8322D',
  sand: '#A9553F', sandDark: '#86402F', sandLite: '#BF6B52', marble: '#EDE6D6', night: '#232A40', night2: '#1B2033', wine: '#7A2E3A',
  royal: '#3D5A80', stone: '#B9A98C', cream: '#F3E9D2', beard: '#F1EDE4', black: '#2A211A', grey: '#9A9184',
};
export const SERIF = 'Caladea';

// ═════════════ CUT PAPER ═════════════
export function cut(path, fill, { shadow = 1, edge = 3 } = {}) {
  ctx.save();
  if (shadow) { ctx.shadowColor = 'rgba(60,38,18,0.25)'; ctx.shadowBlur = 12 * shadow; ctx.shadowOffsetX = 7 * shadow; ctx.shadowOffsetY = 8 * shadow; path(); ctx.fillStyle = fill; ctx.fill(); }
  ctx.restore();
  if (edge) { path(); ctx.strokeStyle = P.edge; ctx.lineWidth = edge; ctx.lineJoin = 'round'; ctx.stroke(); }
  path(); ctx.fillStyle = fill; ctx.fill();
}
export const P_rr = (x, y, w, h, r) => () => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
export const P_circ = (x, y, r) => () => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); };
export const P_ell = (x, y, rx, ry, rot = 0) => () => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); };
export const P_poly = (pts) => () => { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); };
const rad = (d) => d * Math.PI / 180;

/** aged parchment page */
export function parchment(seed = 0, base = P.parch) {
  ctx.fillStyle = base; ctx.fillRect(-400, -400, W + 800, H + 800);
  for (let i = 0; i < 16; i++) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1); ctx.save(); ctx.translate(rnd(i + seed) * W, rnd(i + 30 + seed) * H); ctx.scale(200 + rnd(i + 5) * 320, 140 + rnd(i + 9) * 220); g.addColorStop(0, 'rgba(160,120,70,0.12)'); g.addColorStop(1, 'rgba(160,120,70,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 1, 0, TAU); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = 'rgba(120,90,50,0.07)'; ctx.lineWidth = 2; for (let i = 0; i < 200; i++) { const x = rnd(i * 2 + seed) * W, y = rnd(i * 3 + seed) * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 30 + rnd(i) * 60, y + (rnd(i + 1) - 0.5) * 10); ctx.stroke(); }
  vignette(0.34);
}
export function vignette(a = 0.34) { const g = ctx.createRadialGradient(W / 2, H / 2, 420, W / 2, H / 2, 1250); g.addColorStop(0, 'rgba(70,45,20,0)'); g.addColorStop(1, `rgba(70,45,20,${a})`); ctx.fillStyle = g; ctx.fillRect(-400, -400, W + 800, H + 800); }
/** the same parchment under a navy night wash, with faint stars */
export function nightPage(seed = 0, a = 0.84) { parchment(seed); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = P.night; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); for (let i = 0; i < 40; i++) circle(rnd(i + seed) * W, rnd(i + 40 + seed) * 500, 2 + rnd(i) * 2.5, 'rgba(233,220,188,0.7)'); }

// ═════════════ LABEL LAYER ═════════════
// Between beginLabels() and flushLabels() (main.js wraps every shot), slips, stat cards and ribbons are queued with
// the transform they were called under and drawn last, on top of every figure and prop.
let LAYER = null;
export function beginLabels() { LAYER = []; }
export function flushLabels() { const q = LAYER; LAYER = null; if (!q) return; for (const [m, a, fn] of q) { ctx.save(); ctx.setTransform(m); ctx.globalAlpha = a; fn(); ctx.restore(); } }
const later = (fn) => { if (!LAYER) return false; LAYER.push([ctx.getTransform(), ctx.globalAlpha, fn]); return true; };

// ═════════════ TEXT ═════════════
export function label(text, x, y, size = 30, color = P.ink, align = 'center') { ctx.font = `700 ${size}px ${SERIF}`; ctx.letterSpacing = '3px'; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color; ctx.fillText(text, x, y); ctx.letterSpacing = '0px'; }
/** a pinned paper slip with a few words */
export function slip(text, x, y, sc = 1, rot = -0.03, size = 46, { fill = P.edge, color = P.ink, pin = P.crimson } = {}) {
  if (sc <= 0) return; if (later(() => slip(text, x, y, sc, rot, size, { fill, color, pin }))) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.font = `700 ${size}px ${SERIF}`;
  const w = ctx.measureText(text).width + 60; cut(P_rr(-w / 2, -size * 0.78, w, size * 1.56, 4), fill);
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); if (pin) circle(0, -size * 0.78 + 6, 8, pin); ctx.restore();
}
/** gold date ribbon */
export function ribbon(text, x, y, sc = 1, size = 84) {
  if (sc <= 0) return; if (later(() => ribbon(text, x, y, sc, size))) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = `700 ${size}px ${SERIF}`;
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.35;
  for (const s of [-1, 1]) cut(P_poly([[s * w / 2, -h / 2 + 24], [s * (w / 2 + 90), -h / 2 + 24], [s * (w / 2 + 58), 24], [s * (w / 2 + 90), h / 2 + 24], [s * w / 2, h / 2 + 24]]), P.goldDark, { shadow: 0.6 });
  cut(P_rr(-w / 2, -h / 2, w, h, 6), P.gold); ctx.fillStyle = P.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 5);
  ctx.restore();
}
/** red wax seal */
export function seal(x, y, s = 1, letter = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(() => { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = i / 40 * TAU, r = 60 + Math.sin(a * 9) * 5; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); }, P.crimson, { shadow: 0.7, edge: 0 }); ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); ctx.strokeStyle = '#7E2420'; ctx.lineWidth = 5; ctx.stroke(); if (letter) { ctx.font = `700 50px ${SERIF}`; ctx.fillStyle = '#7E2420'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(letter, 0, 4); } else { for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; circle(Math.cos(a) * 20, Math.sin(a) * 20, 5, '#7E2420'); } } ctx.restore(); }
/** stat card popping from a pin: big number + small line */
export function statCard(big, small, x, y, sc = 1, rot = 0.02) {
  if (sc <= 0) return; if (later(() => statCard(big, small, x, y, sc, rot))) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.font = `400 92px Bebas`; const w1 = ctx.measureText(big).width; ctx.font = `700 30px ${SERIF}`; const w2 = ctx.measureText(small).width; const w = Math.max(w1, w2) + 70;
  cut(P_rr(-w / 2, -86, w, 160, 6), P.cream); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `400 92px Bebas`; ctx.fillStyle = P.crimson; ctx.fillText(big, 0, -24); ctx.font = `700 30px ${SERIF}`; ctx.fillStyle = P.ink; ctx.fillText(small, 0, 44);
  circle(0, -80, 9, P.gold); ctx.restore();
}
/** kinetic quote: words appear one by one on a torn strip, key words crimson. words: [{t, txt, hi}] p = current time */
export function quoteStrip(words, x, y, now, { size = 58, maxW = 1500, speaker = '', source = '' } = {}) {
  ctx.save(); ctx.font = `700 ${size}px ${SERIF}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  // wrap into lines
  const sp = size * 0.3, rows = [[]]; let rw = 0;
  words.forEach((w) => { const ww = ctx.measureText(w.txt).width; if (rw + ww > maxW && rows[rows.length - 1].length) { rows.push([]); rw = 0; } rows[rows.length - 1].push({ ...w, ww }); rw += ww + sp; });
  const lh = size * 1.35, hh = rows.length * lh / 2 + 40, hw = Math.min(maxW, Math.max(...rows.map((r) => r.reduce((a, w) => a + w.ww + sp, -sp)))) / 2 + 60;
  cut(() => { ctx.beginPath(); ctx.moveTo(x - hw, y - hh); for (let xx = -hw; xx <= hw; xx += 26) ctx.lineTo(x + xx, y - hh + (rnd(xx) - 0.5) * 12); for (let xx = hw; xx >= -hw; xx -= 26) ctx.lineTo(x + xx, y + hh + (rnd(xx + 7) - 0.5) * 12); ctx.closePath(); }, P.cream, { shadow: 1, edge: 0 });
  rows.forEach((r, j) => { const tw = r.reduce((a, w) => a + w.ww + sp, -sp); let cx = x - tw / 2; r.forEach((w) => { const a = clamp((now - w.t) / 0.15); if (a > 0) { ctx.globalAlpha = a; ctx.fillStyle = w.hi ? P.crimson : P.ink; ctx.fillText(w.txt, cx, y - (rows.length - 1) * lh / 2 + j * lh + (1 - a) * 10); } cx += w.ww + sp; }); });
  ctx.globalAlpha = 1;
  if (speaker) { ctx.font = `700 30px ${SERIF}`; ctx.textAlign = 'right'; ctx.fillStyle = P.sepia; ctx.fillText(`— ${speaker}${source ? ', ' + source : ''}`, x + hw - 30, y + hh + 34); }
  ctx.restore();
}

// ═════════════ CAPTIONS (torn paper strip, y≈935) ═════════════
export const CAPLOOK = { font: `700 68px ${SERIF}`, y: 958, maxW: 1500, fg: P.ink, hi: P.crimson };
export function captionStrip(words, x, y, sc = 1, look = CAPLOOK) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = look.font; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  const sp = 20, ws = words.map((w) => ctx.measureText(w.txt).width), tw = ws.reduce((a, b) => a + b, 0) + sp * (words.length - 1), hw = tw / 2 + 44;
  const fit = Math.min(1, (look.maxW || 1500) / (tw + 90)); ctx.scale(fit, fit);
  cut(() => { ctx.beginPath(); ctx.moveTo(-hw, -54); for (let x = -hw; x <= hw; x += 22) ctx.lineTo(x, -54 + (rnd(x) - 0.5) * 10); for (let x = hw; x >= -hw; x -= 22) ctx.lineTo(x, 54 + (rnd(x + 7) - 0.5) * 10); ctx.closePath(); }, '#F3E9D2', { shadow: 0.8, edge: 0 });
  let cx = -tw / 2; words.forEach((w, i) => { ctx.fillStyle = w.hi ? look.hi : look.fg; ctx.fillText(w.txt, cx, 5); cx += ws[i] + sp; });
  ctx.restore();
}

// ═════════════ BEAT CARD + ERA BAR ═════════════
/** 1.2 s gold year ribbon + 2-4 word slip, slips over the moving action. lt = time since the beat started */
export function beatCard(year, words, lt) {
  if (lt < 0 || lt > 1.45) return;
  const inP = eob(seg(lt, 0, 0.3)), out = eo(seg(lt, 1.1, 1.45));
  const y = lerp(460, 70, out), sc = lerp(1, 0.4, out) * inP; ctx.save(); ctx.globalAlpha = 1 - out * 0.9;
  ribbon(year, W / 2, y - 40 * (1 - out), sc, 96); slip(words, W / 2, y + 95, sc * (1 - out), -0.02, 50, { pin: null });
  ctx.restore();
}
/** small era bar at the top: year + beat name */
export function eraBar(year, text, a = 1) {
  // top-left corner (title-safe x 96), so it never sits on the centred labels
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.font = `700 26px ${SERIF}`; const s = `${year}  ·  ${text}`; const w = ctx.measureText(s).width + 90, x0 = 96;
  cut(P_rr(x0, 40, w, 48, 4), P.cream, { shadow: 0.5 }); rr(x0, 40, 9, 48, 2); ctx.fillStyle = P.gold; ctx.fill();
  ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '2px'; ctx.fillText(s, x0 + 32, 66); ctx.letterSpacing = '0px'; ctx.restore();
}

// ═════════════ IDLE MOTION ═════════════
export const idle = {
  breathe: (t, k = 0) => 1 + 0.012 * Math.sin(t * 2.1 + k * 1.7),
  sway: (t, k = 0, a = 0.012) => Math.sin(t * 0.9 + k * 2.3) * a,
  blink: (t, k = 0) => ((t + k * 1.3) % 3.7) < 0.12,
  flicker: (t, k = 0) => 1 + 0.08 * Math.sin(t * 13 + k) + 0.05 * Math.sin(t * 29 + k * 2),
  flutter: (t, k = 0) => Math.sin(t * 5 + k) * 0.08,
};

// ═════════════ INDIA MAP ═════════════
// equirectangular projection; view = { cx, cy (lon/lat at screen centre), s (px per degree) }
export const VIEW = { cx: 80, cy: 20.2, s: 31 };
/** a simple conic-style projection (east-west distances shrink with latitude, as on the Survey of India sheets) */
export function proj(lon, lat, v = VIEW) { return [W / 2 + (lon - v.cx) * Math.cos(lat * Math.PI / 180) * v.s * 1.04, H / 2 - (lat - v.cy) * v.s]; }
// Mughal Empire at Aurangzeb's death, 1707 (approximate): Kabul and Kashmir to Bengal and Chittagong, the Deccan to the
// Carnatic; not the far south, Assam or the Himalayan kingdoms. Clipped to the coastline when drawn.
export const MUGHAL1707 = [[66.4, 24.5], [66.8, 27.5], [66.3, 29.6], [67.6, 31.2], [68.3, 32.8], [67.3, 34.0], [68.6, 35.3], [70.6, 35.6], [71.8, 36.1], [73.6, 35.6], [75.4, 35.0], [76.6, 34.2], [76.1, 33.3], [76.8, 32.3], [77.8, 31.1], [79.1, 30.2], [80.2, 28.9], [82.0, 27.6], [84.1, 27.4], [86.0, 26.7], [88.1, 26.6], [89.8, 26.3], [91.6, 25.3], [92.3, 24.0], [92.6, 22.0], [91.5, 20.0], [87.0, 19.0], [85.5, 19.3], [84.3, 18.0], [82.6, 16.6], [81.3, 15.6], [80.6, 13.5], [80.1, 12.0], [79.0, 11.7], [77.6, 12.4], [76.2, 13.4], [75.0, 14.6], [74.0, 15.6], [72.0, 17.0], [70.0, 20.0], [67.5, 22.5]];
export const PLACES = { Delhi: [77.2, 28.6], Agra: [78.0, 27.2], Lahore: [74.3, 31.5], Kabul: [69.2, 34.5], Aurangabad: [75.3, 19.9], Hyderabad: [78.5, 17.4], Calcutta: [88.4, 22.6], Patna: [85.1, 25.6], Dhaka: [90.4, 23.8], Satara: [74.0, 17.7], Ajmer: [74.6, 26.4], Sirhind: [76.4, 30.6], Jajau: [77.9, 26.9], Murshidabad: [88.3, 24.2], Lucknow: [80.9, 26.8] };
const HIMALAYA = [[73.6, 35.6], [75.2, 34.6], [76.8, 33.4], [78.4, 32.0], [79.9, 30.8], [81.6, 29.9], [83.4, 29.0], [85.2, 28.4], [87.0, 28.1], [88.8, 28.0], [90.6, 28.0], [92.4, 28.1], [94.2, 28.6]];
export function landPath(v = VIEW) { ctx.beginPath(); for (const poly of LAND) { poly.forEach(([lo, la], i) => { const [x, y] = proj(lo, la, v); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); } }
const ptsP = (pts, v) => pts.map(([lo, la]) => proj(lo, la, v));
/** noise-edged blob that grows from (ox, oy) as p goes 0..1 (ink-bleed wipe); used as a clip path */
export function bleedPath(ox, oy, p, R = 1400, seed = 1) { ctx.beginPath(); const n = 90; for (let i = 0; i <= n; i++) { const a = i / n * TAU, k = 1 + 0.16 * Math.sin(5 * a + seed) + 0.09 * Math.sin(11 * a + seed * 3) + 0.05 * Math.sin(23 * a + seed * 7); const r = R * eio(clamp(p)) * k; i ? ctx.lineTo(ox + Math.cos(a) * r, oy + Math.sin(a) * r) : ctx.moveTo(ox + Math.cos(a) * r, oy + Math.sin(a) * r); } ctx.closePath(); }
/** territory with an ink-bleed wipe: poly in lon/lat, p 0..1 from origin [lon, lat] */
export function inkBleed(poly, fill, p, origin, v = VIEW, seed = 2, landClip = true) {
  if (p <= 0) return; const [ox, oy] = proj(origin[0], origin[1], v);
  ctx.save(); if (landClip) { landPath(v); ctx.clip(); } bleedPath(ox, oy, p, 1600 * v.s / 34, seed); ctx.clip();
  P_poly(ptsP(poly, v))(); ctx.fillStyle = fill; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(30,20,10,0.55)'; ctx.lineWidth = 3; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]);
  ctx.restore();
}
/** the India map page. o = { v, mughal (0..1 green bleed), pins: [{place|lonlat, p, color, label}], t } */
export function indiaMap(o = {}) {
  const v = o.v || VIEW, t = o.t || 0;
  parchment(o.seed ?? 3, P.parch);
  // ocean with paper waves
  ctx.save(); ctx.fillStyle = P.ocean; ctx.fillRect(-400, -400, W + 800, H + 800);
  ctx.strokeStyle = 'rgba(233,220,188,0.13)'; ctx.lineWidth = 3; for (let r = 0; r < 14; r++) { ctx.beginPath(); const y0 = r * 90 - 60; for (let x = -400; x <= W + 400; x += 30) ctx.lineTo(x, y0 + Math.sin(x * 0.01 + t * 0.8 + r) * 8); ctx.stroke(); }
  ctx.restore();
  cut(() => landPath(v), P.land, { shadow: 1.2, edge: 4 });
  // faint graticule on land (meridians curve with the projection)
  ctx.save(); landPath(v); ctx.clip(); ctx.strokeStyle = 'rgba(62,44,30,0.09)'; ctx.lineWidth = 2;
  for (let lo = 25; lo <= 135; lo += 5) { ctx.beginPath(); for (let la = -20; la <= 62; la += 2) { const [x, y] = proj(lo, la, v); la > -20 ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
  for (let la = -15; la <= 60; la += 5) { ctx.beginPath(); for (let lo = 20; lo <= 140; lo += 2) { const [x, y] = proj(lo, la, v); lo > 20 ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } ctx.restore();
  // Himalaya: a row of paper peaks along the range
  HIMALAYA.forEach(([lo, la]) => { const [x, y] = proj(lo, la, v), k = Math.min(1.6, v.s / 31); cut(P_poly([[x - 30 * k, y + 12 * k], [x, y - 26 * k], [x + 30 * k, y + 12 * k]]), '#C9B48A', { shadow: 0.3, edge: 2 }); });
  if (o.mughal) inkBleed(MUGHAL1707, P.mughal, o.mughal, [77.2, 28.6], v, 2);
  if (o.extra) o.extra(v);
  // sea labels
  label('ARABIAN SEA', ...proj(66, 15.5, v), 26, 'rgba(233,220,188,0.6)'); label('BAY OF BENGAL', ...proj(88.5, 14.5, v), 26, 'rgba(233,220,188,0.6)');
  if (!o.noCompass) compass(...proj(97, 11, v), 0.5);
  (o.pins || []).forEach((pn) => pin(pn, v, t));
}
export function pin(pn, v = VIEW, t = 0) {
  const ll = pn.ll || PLACES[pn.place]; if (!ll || (pn.p ?? 1) <= 0) return; const [x, y] = proj(ll[0], ll[1], v), s = eob(clamp(pn.p ?? 1));
  if (pn.pulse) { const k = ((t * 1000) % 1200) / 1200; ctx.beginPath(); ctx.arc(x, y, 14 + k * 40, 0, TAU); ctx.strokeStyle = `rgba(168,50,45,${1 - k})`; ctx.lineWidth = 5; ctx.stroke(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circle(3, 4, 13, 'rgba(40,25,10,0.35)'); circle(0, 0, 12, pn.color || P.ink); circle(0, 0, 5, P.edge); ctx.restore();
  if (pn.label) slip(pn.label, x + (pn.dx ?? 0), y + (pn.dy ?? -52), s, pn.rot ?? -0.03, pn.size || 30, { pin: null });
}
/** route that draws itself with an icon at the tip. pts in lon/lat. returns head [x,y,angle] */
export function route(ptsLL, p, color = P.crimson, v = VIEW, icon = null) {
  const pts = ptsP(ptsLL, v); const seglen = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seglen.push(l); tot += l; }
  let left = tot * clamp(p); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let head = [...pts[0], 0];
  for (let i = 1; i < pts.length && left > 0; i++) { const k = Math.min(1, left / seglen[i - 1]); const x = lerp(pts[i - 1][0], pts[i][0], k), y = lerp(pts[i - 1][1], pts[i][1], k); ctx.lineTo(x, y); head = [x, y, Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; left -= seglen[i - 1]; }
  if (p > 0) { ctx.setLineDash([18, 12]); ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke(); ctx.setLineDash([]); }
  if (icon && p > 0 && p < 1.2) icon(head[0], head[1], head[2]);
  return head;
}
/** pulsing battle marker: crimson ring 1.2 s */
export function battle(x, y, t, s = 1) { const k = (t % 1.2) / 1.2; ctx.beginPath(); ctx.arc(x, y, (18 + k * 46) * s, 0, TAU); ctx.strokeStyle = `rgba(168,50,45,${1 - k})`; ctx.lineWidth = 6; ctx.stroke(); crossedSwords(x, y, 0.5 * s); }
export function compass(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circle(0, 0, 100, 'rgba(233,220,188,0.92)'); ctx.strokeStyle = P.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 100, 0, TAU); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.beginPath(); ctx.moveTo(0, -90); ctx.lineTo(16, 0); ctx.lineTo(-16, 0); ctx.closePath(); ctx.fillStyle = i ? P.ink : P.crimson; ctx.fill(); ctx.restore(); } ctx.font = `700 38px ${SERIF}`; ctx.fillStyle = P.ink; ctx.textAlign = 'center'; ctx.fillText('N', 0, -110); ctx.restore(); }
export function crossedSwords(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const k of [-1, 1]) { ctx.save(); ctx.rotate(k * 0.7); cut(P_rr(-6, -60, 12, 90, 4), P.stone, { shadow: 0.4, edge: 2 }); cut(P_rr(-22, 26, 44, 10, 4), P.gold, { shadow: 0.3, edge: 2 }); cut(P_rr(-6, 34, 12, 26, 4), P.sepia, { shadow: 0.3, edge: 2 }); ctx.restore(); } ctx.restore(); }

// ═════════════ PROPS ═════════════
/** Mughal crown / taj: gold with a plume */
export function crown(x, y, s = 1, rot = 0, { year = '', plume = true } = {}) {
  if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_poly([[-70, 30], [-80, -40], [-45, -10], [-24, -62], [0, -18], [24, -62], [45, -10], [80, -40], [70, 30]]), P.gold, { shadow: 0.8 });
  cut(P_rr(-74, 16, 148, 28, 6), P.goldDark, { shadow: 0.4, edge: 2 }); for (const dx of [-40, 0, 40]) circle(dx, 30, 8, dx ? P.crimson : P.mughal);
  if (plume) cut(() => { ctx.beginPath(); ctx.moveTo(0, -20); ctx.quadraticCurveTo(30, -90, 8, -120); ctx.quadraticCurveTo(-4, -70, 0, -20); }, P.cream, { shadow: 0.3, edge: 2 });
  if (year) label(year, 0, 80, 34, P.ink); ctx.restore();
}
/** the Mughal throne: gilded seat with cushion, on a platform. empty = true */
export function throne(x, y, s = 1, { canopy = true, t = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-260, -40, 520, 60, 6), P.marble, { shadow: 1 }); cut(P_rr(-300, 10, 600, 50, 6), P.stone, { shadow: 0.8 });
  if (canopy) { for (const k of [-1, 1]) cut(P_rr(k * 190 - 10, -520, 20, 480, 6), P.gold, { shadow: 0.6, edge: 2 }); cut(() => { ctx.beginPath(); ctx.moveTo(-230, -500); ctx.quadraticCurveTo(0, -620, 230, -500); ctx.lineTo(230, -470); ctx.lineTo(-230, -470); ctx.closePath(); }, P.crimson, { shadow: 0.8 }); for (let i = 0; i < 9; i++) circle(-200 + i * 50, -462 + Math.sin(t * 2 + i) * 3, 9, P.gold); }
  cut(P_rr(-150, -330, 300, 300, 30), P.gold, { shadow: 1 }); cut(P_rr(-120, -300, 240, 200, 20), P.wine, { shadow: 0, edge: 2 });
  cut(P_rr(-170, -120, 340, 90, 18), P.goldDark, { shadow: 0.6 }); cut(P_ell(0, -120, 150, 26), P.crimson, { shadow: 0.4, edge: 2 });
  for (const k of [-1, 1]) cut(P_circ(k * 150, -330, 22), P.gold, { shadow: 0.5, edge: 2 });
  ctx.restore();
}
export function candle(x, y, s = 1, t = 0, out = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-26, -160, 52, 160, 6), P.cream); cut(P_rr(-50, -6, 100, 20, 6), P.gold, { shadow: 0.5, edge: 2 }); line([[0, -160], [0, -178]], P.ink, 4);
  if (out < 1) { const f = idle.flicker(t) * (1 - out); ctx.save(); ctx.translate(0, -178); ctx.scale(f, f); const g = ctx.createRadialGradient(0, -30, 0, 0, -30, 160); g.addColorStop(0, 'rgba(242,193,78,0.35)'); g.addColorStop(1, 'rgba(242,193,78,0)'); ctx.fillStyle = g; ctx.fillRect(-160, -190, 320, 320); cut(() => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-22, -26, 0, -70 + Math.sin(t * 9) * 4); ctx.quadraticCurveTo(22, -26, 0, 0); }, '#F2C14E', { shadow: 0, edge: 2 }); ctx.restore(); }
  if (out > 0) { ctx.save(); ctx.globalAlpha = clamp(1.4 - out); for (let i = 0; i < 4; i++) { const k = out * 1.4 - i * 0.12; if (k <= 0) continue; ctx.beginPath(); ctx.arc(Math.sin(k * 6 + i) * 14, -190 - k * 160, 8 + k * 16, 0, TAU); ctx.fillStyle = 'rgba(170,160,150,0.5)'; ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
/** a falling cloth (shawl). p 0..1 falls and settles */
export function cloth(x, y, s = 1, p = 1, color = P.crimson) { if (p <= 0) return; ctx.save(); ctx.translate(x, lerp(y - 360, y, eo(clamp(p)))); ctx.scale(s, s); const k = 1 - eo(clamp(p)); cut(() => { ctx.beginPath(); ctx.moveTo(-160, 0); for (let i = 0; i <= 8; i++) ctx.lineTo(-160 + i * 40, -10 - Math.sin(i * 1.3 + p * 6) * (12 + k * 30)); ctx.lineTo(170, 10); ctx.quadraticCurveTo(0, 30 + k * 80, -170, 12); ctx.closePath(); }, color, { shadow: 0.8 }); for (let i = 0; i < 6; i++) circle(-140 + i * 56, 18 + k * 10, 6, P.gold); ctx.restore(); }
/** a scroll / farman. open p 0..1, sealed s */
export function farman(x, y, s = 1, p = 1, sealP = 0, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const h = lerp(40, 420, eo(clamp(p)));
  cut(P_rr(-170, -h / 2, 340, h, 4), P.cream); ctx.save(); P_rr(-170, -h / 2, 340, h, 4)(); ctx.clip(); ctx.strokeStyle = 'rgba(62,44,30,0.55)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const yy = -170 + i * 36; ctx.beginPath(); for (let xx = -130; xx <= 120; xx += 12) ctx.lineTo(xx, yy + Math.sin(xx * 0.13 + i * 2) * 5); ctx.stroke(); } ctx.restore();
  for (const k of [-1, 1]) cut(P_rr(-190, k * h / 2 - 16, 380, 32, 16), P.sepia, { shadow: 0.5, edge: 2 }); seal(110, h / 2 - 70, sealP * 0.8); ctx.restore(); }
export function ledger(x, y, s = 1, rot = 0, open = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); cut(P_rr(-110, -80, 220, 160, 6), P.wine); if (open) { cut(P_rr(-100, -70, 96, 140, 3), P.cream, { shadow: 0, edge: 2 }); cut(P_rr(4, -70, 96, 140, 3), P.cream, { shadow: 0, edge: 2 }); for (let i = 0; i < 5; i++) { line([[-88, -46 + i * 24], [-18, -46 + i * 24]], 'rgba(62,44,30,0.5)', 3); line([[16, -46 + i * 24], [86, -46 + i * 24]], 'rgba(62,44,30,0.5)', 3); } } ctx.restore(); }
export function coin(x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); cut(P_circ(0, 0, 30), P.gold, { shadow: 0.6, edge: 2 }); ctx.beginPath(); ctx.arc(0, 0, 20, 0, TAU); ctx.strokeStyle = P.goldDark; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
export function sword(x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); cut(() => { ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(-10, -120, 20, -200); ctx.quadraticCurveTo(4, -110, 6, 0); ctx.closePath(); }, P.stone, { shadow: 0.5, edge: 2 }); cut(P_rr(-26, -4, 52, 12, 5), P.gold, { shadow: 0.4, edge: 2 }); cut(P_rr(-6, 6, 12, 40, 4), P.sepia, { shadow: 0.3, edge: 2 }); ctx.restore(); }
export function torch(x, y, s = 1, t = 0, k = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createRadialGradient(0, -80, 0, 0, -80, 260); g.addColorStop(0, 'rgba(242,170,70,0.32)'); g.addColorStop(1, 'rgba(242,170,70,0)'); ctx.fillStyle = g; ctx.fillRect(-260, -340, 520, 520); cut(P_rr(-10, -60, 20, 120, 4), P.sepia, { shadow: 0.5, edge: 2 }); const f = idle.flicker(t, k); ctx.save(); ctx.translate(0, -62); ctx.scale(f, f); cut(() => { ctx.beginPath(); ctx.moveTo(-24, 0); ctx.quadraticCurveTo(-30, -40, 0 + Math.sin(t * 7 + k) * 6, -90); ctx.quadraticCurveTo(30, -40, 24, 0); ctx.closePath(); }, P.crimson, { shadow: 0, edge: 2 }); cut(() => { ctx.beginPath(); ctx.moveTo(-13, 0); ctx.quadraticCurveTo(-14, -26, Math.sin(t * 9 + k) * 4, -56); ctx.quadraticCurveTo(14, -26, 13, 0); ctx.closePath(); }, '#F2C14E', { shadow: 0, edge: 0 }); ctx.restore(); ctx.restore(); }
/** a flag on a pole. Mughal green → the Mughal alam (triangular pennant, gold stars, sun-and-lion emblem);
 *  Maratha saffron → the Bhagwa Dhwaj (swallowtail); anything else → a plain banner in that colour. */
export function flag(x, y, s, t, color, k = 0) {
  if (color === P.mughal) return mughalFlag(x, y, s, t, k); if (color === P.maratha) return marathaFlag(x, y, s, t, k);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, 0], [0, -220]], P.sepia, 8); cut(() => { ctx.beginPath(); ctx.moveTo(0, -220); for (let i = 0; i <= 6; i++) ctx.lineTo(i * 26, -220 + Math.sin(t * 4 + i * 0.9 + k) * 8 * (i / 6)); for (let i = 6; i >= 0; i--) ctx.lineTo(i * 26, -150 + Math.sin(t * 4 + i * 0.9 + k) * 8 * (i / 6)); ctx.closePath(); }, color, { shadow: 0.4, edge: 2 }); ctx.restore();
}
const wave = (t, k, u, a = 7) => Math.sin(t * 4 + u * 5 + k) * a * u;
/** Mughal alam, after the reconstruction "Flag of the Mughal Empire (triangular).svg" (NikNaks, Wikimedia Commons, CC BY-SA 3.0):
 *  a right-angled green pennant (#01411c), full height at the pole, tapering to the fly along the top edge; gold stars; gold sun with a crouching lion. */
export function mughalFlag(x, y, s, t, k = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, 20], [0, -250]], P.sepia, 8); cut(P_circ(0, -254, 9), P.gold, { shadow: 0.3, edge: 2 });
  const L = 190, Hh = 127, top = -240, pt = (u, v) => [u * L, top + Hh * v + wave(t, k, u)];   // u along the fly, v down from the top
  const shape = () => { ctx.beginPath(); ctx.moveTo(...pt(0, 0)); for (let i = 1; i <= 8; i++) { const u = i / 8; ctx.lineTo(...pt(u, u)); } for (let i = 8; i >= 0; i--) { const u = i / 8; ctx.lineTo(...pt(u, 1)); } ctx.closePath(); };
  cut(shape, '#01411c', { shadow: 0.5, edge: 2 });
  ctx.save(); shape(); ctx.clip(); for (let i = 0; i < 26; i++) { const u = rnd(i + 3) * 0.95, v = u + rnd(i + 9) * (1 - u); const [sx, sy] = pt(u, v); circle(sx, sy, 2.2, '#fcd116'); } ctx.restore();
  const [ex, ey] = pt(0.33, 0.68); ctx.save(); ctx.translate(ex, ey);
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line([[Math.cos(a) * 12, Math.sin(a) * 12], [Math.cos(a) * 22, Math.sin(a) * 22]], '#fcd116', 3); }
  circle(0, 0, 12, '#fcd116');
  ctx.fillStyle = '#C8952F'; ctx.beginPath(); ctx.ellipse(-2, 9, 14, 6, 0, 0, TAU); ctx.fill(); circle(11, 4, 5.5, '#C8952F'); ctx.fillRect(-14, 10, 3, 6); ctx.fillRect(6, 10, 3, 6); line([[-15, 8], [-22, 2]], '#C8952F', 2.5);
  ctx.restore(); ctx.restore();
}
/** Maratha Bhagwa Dhwaj, after "Flag of the Maratha Empire.svg" (public domain): saffron (#ff9700) swallowtail, 600x280 with a 240-deep notch */
export function marathaFlag(x, y, s, t, k = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, 20], [0, -250]], P.sepia, 8); cut(P_circ(0, -254, 9), P.gold, { shadow: 0.3, edge: 2 });
  const L = 180, Hh = 84, top = -240, pt = (u, v) => [u * L, top + Hh * v + wave(t, k, u)];
  cut(() => { ctx.beginPath(); ctx.moveTo(...pt(0, 0)); for (let i = 1; i <= 8; i++) ctx.lineTo(...pt(i / 8, 0)); ctx.lineTo(...pt(0.6, 0.5)); ctx.lineTo(...pt(1, 1)); for (let i = 8; i >= 0; i--) ctx.lineTo(...pt(i / 8, 1)); ctx.closePath(); }, '#ff9700', { shadow: 0.5, edge: 2 });
  ctx.restore();
}
// ═════════════ HANDS, CALENDAR, DOOR, CHEST, FIELDS ═════════════
/** a big cut-paper hand. dir 1 = from the left, pointing right. open 0..1 */
export function hand(x, y, s = 1, rot = 0, dir = 1, skin = '#D9A77E', sleeve = '#F3E9D2') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * dir, s);
  cut(P_rr(-260, -46, 200, 92, 30), sleeve, { shadow: 0.7 }); cut(P_rr(-80, -52, 120, 104, 40), skin, { shadow: 0.6 });
  for (let i = 0; i < 4; i++) cut(P_rr(20, -46 + i * 26, 70 - Math.abs(i - 1.5) * 10, 22, 11), skin, { shadow: 0.3, edge: 2 });
  cut(P_rr(-20, -78, 22, 60, 11), skin, { shadow: 0.3, edge: 2 }); ctx.restore();
}
/** a hanging paper calendar showing `year`; flip 0..1 animates the top page lifting away */
export function calendar(x, y, s, year, nextYear, flip = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-230, -300, 460, 600, 10), P.wine, { shadow: 1 });
  for (const dx of [-120, 0, 120]) { cut(P_rr(dx - 10, -330, 20, 60, 8), P.stone, { shadow: 0.3, edge: 2 }); }
  const page = (yr) => { cut(P_rr(-205, -260, 410, 540, 6), P.cream, { shadow: 0.4, edge: 2 }); rr(-205, -260, 410, 90, 6); ctx.fillStyle = P.crimson; ctx.fill(); ctx.font = `700 46px ${SERIF}`; ctx.fillStyle = P.edge; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('YEAR', 0, -214); ctx.font = `400 210px Bebas`; ctx.fillStyle = P.ink; ctx.fillText(String(yr), 0, 50); for (let i = 0; i < 5; i++) line([[-150 + i * 75, 200], [-110 + i * 75, 200]], 'rgba(62,44,30,0.3)', 6); };
  page(nextYear ?? year);
  if (flip < 1) { ctx.save(); const k = eio(clamp(flip)); ctx.translate(0, -260); ctx.scale(1, Math.cos(k * Math.PI)); ctx.translate(0, 260); if (Math.cos(k * Math.PI) > 0) page(year); else { cut(P_rr(-205, -260, 410, 540, 6), P.parchDark, { shadow: 0.4, edge: 2 }); } ctx.restore(); }
  ctx.restore();
}
/** a heavy palace door pair; close 0..1 swings them shut */
export function doors(x, y, s, close = 1, fill = P.sandDark) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cutArch(0, 0, 260, 700, '#140F0C'); for (const k of [-1, 1]) { const w = 250 * clamp(close); cut(P_rr(k > 0 ? 0 : -w, -560, w, 560, 4), fill, { shadow: 0.6, edge: 3 }); for (let i = 0; i < 3; i++) circle(k * w * 0.5, -460 + i * 180, 10, P.gold); } ctx.restore(); }
/** a treasury chest; open 0..1; coins 0..1 how full */
export function chest(x, y, s, open = 1, coins = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-170, -150, 340, 150, 10), P.sepia); for (let i = 0; i < Math.round(coins * 14); i++) coin(-130 + (i % 7) * 44, -150 - Math.floor(i / 7) * 22 + 10, 0.7); for (const dx of [-120, 120]) cut(P_rr(dx - 12, -150, 24, 150, 4), P.gold, { shadow: 0.2, edge: 2 }); ctx.save(); ctx.translate(0, -150); ctx.rotate(-1.9 * clamp(open)); cut(P_rr(-170, -60, 340, 60, 14), P.sepiaDark || '#6E5238', { shadow: 0.5 }); ctx.restore(); ctx.restore(); }
/** a field with crop rows (paper strips) from y0 down to y1 */
export function field(y0, y1, t, ripe = 0) { cut(P_rr(-400, y0, W + 800, y1 - y0 + 400), '#9C8C5A', { shadow: 0, edge: 0 }); for (let i = 0; i < 9; i++) { const y = y0 + 20 + i * (y1 - y0) / 9; ctx.save(); ctx.strokeStyle = ripe ? '#C9A64A' : '#7E8B5A'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); for (let x = -200; x <= W + 200; x += 40) ctx.lineTo(x, y + Math.sin(x * 0.02 + t * 2 + i) * 4); ctx.stroke(); ctx.restore(); } }


// ═════════════ PLACES: the Mughal court set ═════════════
/** red sandstone hall: cusped arches, a jharokha balcony, throne platform. o = { night, t, throne: true, jharokha } */
export function court(o = {}) {
  const t = o.t || 0; parchment(7);
  cut(P_rr(-400, -400, W + 800, 1240), o.night ? '#6E3528' : P.sand, { shadow: 0, edge: 0 });
  for (let i = -1; i < 6; i++) { const x = 160 + i * 340; cutArch(x, 820, 120, 430, o.night ? '#4A2219' : P.sandDark); }
  // jharokha balcony centre
  if (o.jharokha !== false) { cut(P_rr(W / 2 - 230, 150, 460, 70, 8), P.marble); cut(() => { ctx.beginPath(); ctx.moveTo(W / 2 - 200, 150); ctx.quadraticCurveTo(W / 2, 30, W / 2 + 200, 150); ctx.closePath(); }, P.marble); cut(P_rr(W / 2 - 180, 220, 360, 60, 6), P.sandLite, { shadow: 0.4, edge: 2 }); for (let i = 0; i < 7; i++) cut(P_rr(W / 2 - 170 + i * 52, 226, 16, 50, 6), P.marble, { shadow: 0, edge: 0 }); }
  // floor + carpet
  cut(P_rr(-400, 820, W + 800, 700), o.night ? '#3E2A20' : P.sepia, { shadow: 0, edge: 0 }); cut(P_poly([[W / 2 - 300, 820], [W / 2 + 300, 820], [W / 2 + 520, 1500], [W / 2 - 520, 1500]]), P.wine, { shadow: 0, edge: 0 });
  ctx.save(); P_poly([[W / 2 - 300, 820], [W / 2 + 300, 820], [W / 2 + 520, 1500], [W / 2 - 520, 1500]])(); ctx.strokeStyle = P.gold; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  if (o.throne !== false) throne(W / 2, 800, 0.95, { t });
  for (const [x, k] of [[260, 0], [W - 260, 1]]) { if (o.night) torch(x, 560, 1, t, k); else { flag(x - 30, 820, 1.1, t, P.mughal, k); } }
  if (o.night) { ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = P.night; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); for (const [x, k] of [[260, 0], [W - 260, 1]]) torch(x, 560, 1, t, k); }
}
export function cutArch(x, base, hw, h, fill) { cut(() => { ctx.beginPath(); ctx.moveTo(x - hw, base); ctx.lineTo(x - hw, base - h + hw); for (let i = 0; i <= 4; i++) { const a0 = Math.PI + i * Math.PI / 5, a1 = Math.PI + (i + 1) * Math.PI / 5; const ax = x + Math.cos((a0 + a1) / 2) * hw * 0.82, ay = base - h + hw + Math.sin((a0 + a1) / 2) * hw * 1.05; ctx.arc(ax, ay, hw * 0.3, a0 - 0.4, a1 + 0.4); } ctx.lineTo(x + hw, base); ctx.closePath(); }, fill, { shadow: 0.5, edge: 3 }); }
/** night palace corridor with receding arches and torches; shadows 0..1 move along it */
export function corridor(t, sh = 0) {
  nightPage(5, 0.78);
  for (let i = 5; i >= 0; i--) { const s = 1 - i * 0.14, cx = W / 2, by = 560 + 360 * s; ctx.save(); ctx.globalAlpha = 1 - i * 0.1; for (const k of [-1, 1]) cutArch(cx + k * 560 * s, by, 140 * s, 640 * s, i % 2 ? '#5A2C22' : '#6E3528'); ctx.restore(); if (i < 4) for (const k of [-1, 1]) torch(cx + k * 420 * s, by - 380 * s, s * 0.8, t, i + k); }
  cut(P_poly([[W / 2 - 200, 560], [W / 2 + 200, 560], [W + 200, 1100], [-200, 1100]]), '#2C2420', { shadow: 0, edge: 0 });
  // two long shadows sliding forward
  if (sh > 0) for (const k of [0, 1]) { const x = W / 2 - 120 + k * 200 + Math.sin(t * 3 + k) * 6, y = lerp(640, 1000, sh); ctx.save(); ctx.globalAlpha = 0.55; ctx.translate(x, y); ctx.scale(lerp(0.4, 1.4, sh), lerp(0.4, 1.4, sh)); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(80 + k * 20, -560); ctx.lineTo(10 + k * 20, -600); ctx.closePath(); ctx.fillStyle = '#0C0E16'; ctx.fill(); ctx.restore(); }
}
/** a palace gate (for Shahu leaving) */
export function gate(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-320, -560, 640, 560, 6), P.sand); cutArch(0, 0, 170, 470, '#3E2A20'); for (const k of [-1, 1]) { cut(P_rr(k * 300 - 40, -660, 80, 660, 6), P.sandDark); cut(() => { ctx.beginPath(); ctx.arc(k * 300, -660, 56, Math.PI, TAU); ctx.closePath(); }, P.marble); } ctx.restore(); }

// ═════════════ PEOPLE: Mughal-era paper cut-outs ═════════════
// figure({ x, y, h, dir, jama, turban, sash, beard: 'white'|'grey'|'black'|'none', age, pale, thin, halo, prop, arm, t, k, smile, brows, plume })
export function figure(o) {
  if (o.h != null && o.h <= 1) return;   // a figure that hasn't popped in yet (h = size * pop) is not drawn
  const h = o.h ?? 520, d = o.dir || 1, s = h / 520, t = o.t || 0, k = o.k || 0;
  const thin = o.thin ? 0.78 : 1, br = idle.breathe(t, k), sw = idle.sway(t, k), wk = o.walk != null ? Math.sin(o.walk) : 0;
  const skin = o.pale ? P.pale : (o.skin || P.skin), jama = o.jama || P.cream;
  ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(sw); ctx.scale(s * d, s * br);
  if (o.silhouette) ctx.filter = 'brightness(0.18) saturate(0)';
  if (o.halo) { ctx.save(); ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(0, -430, 92, 0, TAU); ctx.strokeStyle = P.gold; ctx.lineWidth = 10; ctx.stroke(); ctx.globalAlpha = 0.25; ctx.fillStyle = P.gold; ctx.fill(); ctx.restore(); }
  // legs / feet (jama covers to the ankles)
  for (const q of [-1, 1]) cut(P_rr(q * 28 - 22 + q * wk * 20, -40, 44, 40, 10), P.black, { shadow: 0.4, edge: 2 });
  // back arm
  cut(() => { ctx.beginPath(); ctx.save(); ctx.translate(-34 * thin, -318); ctx.rotate(rad(8 - wk * 14)); ctx.roundRect(-18, 0, 36, 180, 18); ctx.restore(); }, shade(jama), { shadow: 0.4, edge: 2 });
  // jama: fitted torso + flared skirt
  cut(P_poly([[-58 * thin, -330], [58 * thin, -330], [70 * thin, -190], [130 * thin, -36], [-130 * thin, -36], [-70 * thin, -190]]), jama, { shadow: 1 });
  ctx.save(); P_poly([[-58 * thin, -330], [58 * thin, -330], [70 * thin, -190], [130 * thin, -36], [-130 * thin, -36], [-70 * thin, -190]])(); ctx.clip(); ctx.strokeStyle = 'rgba(62,44,30,0.18)'; ctx.lineWidth = 3; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * 10, -190); ctx.lineTo(i * 30, -36); ctx.stroke(); } ctx.restore();
  // sash (patka)
  cut(P_rr(-72 * thin, -206, 144 * thin, 26, 6), o.sash || P.gold, { shadow: 0.3, edge: 2 }); cut(P_rr(-10, -190, 26, 110, 6), o.sash || P.gold, { shadow: 0.3, edge: 2 });
  // necklace for royals
  if (o.halo || o.pearls) for (let i = 0; i < 7; i++) circle(-30 + i * 10, -318 + Math.abs(3 - i) * -3 + 10, 5, P.edge);
  // neck + head
  cut(P_rr(-16, -360, 32, 40, 8), skin, { shadow: 0, edge: 0 });
  cut(P_ell(4, -420, 50, 58), skin, { shadow: 0.6, edge: 3 });
  cut(P_poly([[48, -432], [66, -404], [48, -398]]), skin, { shadow: 0, edge: 0 }); // nose
  // eye + brow
  const bl = idle.blink(t, k); if (bl) line([[22, -428], [38, -428]], P.ink, 4); else { ell(30, -428, 6, o.age === 'teen' ? 8 : 6, P.ink); }
  line(o.brows === 'cold' ? [[16, -446], [42, -440]] : o.brows === 'worried' ? [[16, -440], [42, -450]] : [[16, -446], [42, -446]], P.ink, 4);
  if (o.beard && o.beard !== 'none') cut(() => { ctx.beginPath(); ctx.moveTo(-34, -420); ctx.quadraticCurveTo(-30, (o.beard === 'white' ? -330 : -350), 20, (o.beard === 'white' ? -322 : -350)); ctx.quadraticCurveTo(56, -372, 52, -396); ctx.quadraticCurveTo(30, -384, 10, -392); ctx.quadraticCurveTo(-10, -396, -34, -420); ctx.closePath(); }, o.beard === 'white' ? P.beard : o.beard === 'grey' ? P.grey : P.black, { shadow: 0.2, edge: 2 });
  else if (o.moustache) line([[30, -398], [50, -394]], P.black, 6);
  if (o.smile) { ctx.beginPath(); ctx.moveTo(26, o.beard && o.beard !== 'none' ? -386 : -390); ctx.quadraticCurveTo(40, -384, 52, -394); ctx.strokeStyle = P.ink; ctx.lineWidth = 4; ctx.stroke(); }
  // turban
  const tb = o.turban || P.cream;
  if (o.cap === 'pagdi') cut(P_poly([[-52, -450], [54, -470], [48, -500], [-40, -510], [-60, -476]]), tb, { shadow: 0.5, edge: 2 });
  else { cut(() => { ctx.beginPath(); ctx.ellipse(0, -468, 60, 40, -0.12, Math.PI * 0.95, TAU * 1.02); ctx.lineTo(56, -452); ctx.lineTo(-56, -446); ctx.closePath(); }, tb, { shadow: 0.5, edge: 2 }); ctx.strokeStyle = 'rgba(62,44,30,0.25)'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-50, -462 + i * 9); ctx.quadraticCurveTo(0, -492 + i * 12, 54, -470 + i * 9); ctx.stroke(); } }
  if (o.plume || o.halo) { cut(P_circ(28, -478, 10), P.crimson, { shadow: 0.2, edge: 2 }); cut(() => { ctx.beginPath(); ctx.moveTo(26, -480); ctx.quadraticCurveTo(52, -530, 30, -560 + idle.flutter(t, k) * 30); ctx.quadraticCurveTo(22, -520, 26, -480); }, P.cream, { shadow: 0.2, edge: 2 }); }
  // front arm (raise with o.arm degrees) + prop in hand
  ctx.save(); ctx.translate(34 * thin, -318); ctx.rotate(rad(-(o.arm || 0) - 8 + wk * 14));
  cut(P_rr(-18, 0, 36, 180, 18), jama, { shadow: 0.4, edge: 2 }); cut(P_circ(0, 184, 18), skin, { shadow: 0.3, edge: 2 });
  if (o.prop === 'ledger') ledger(10, 200, 0.5, -rad(-(o.arm || 0) - 8)); if (o.prop === 'sword') sword(0, 190, 0.8, 0); if (o.prop === 'scroll') farman(10, 200, 0.28, 0.2, 0, 0.3); if (o.prop === 'rose') { line([[0, 184], [0, 120]], P.mughal, 4); circle(0, 116, 14, P.crimson); }
  ctx.restore();
  ctx.restore();
}
function shade(hex) { const n = parseInt(hex.slice(1), 16), r = (n >> 16) * 0.82, g = ((n >> 8) & 255) * 0.82, b = (n & 255) * 0.82; return `rgb(${r | 0},${g | 0},${b | 0})`; }
// cast presets (episode 1 + series)
export const CAST = {
  aurangzeb: { jama: P.cream, turban: P.cream, beard: 'white', silhouette: true },
  bahadur: { jama: P.cream, turban: P.gold, sash: P.mughal, beard: 'white', halo: true },
  azam: { jama: P.royal, turban: P.cream, beard: 'black', silhouette: true }, kambakhsh: { jama: P.wine, turban: P.cream, beard: 'black', silhouette: true },
  shahu: { jama: P.cream, turban: P.maratha, cap: 'pagdi', sash: P.maratha, beard: 'none', moustache: true },
  jahandar: { jama: P.wine, turban: P.gold, beard: 'black', halo: true }, zulfikar: { jama: P.sepia, turban: P.cream, beard: 'grey', prop: 'ledger' },
  abdullah: { jama: P.mughal, turban: P.mughalLite, sash: P.gold, beard: 'black', prop: 'ledger' }, hussain: { jama: P.mughal, turban: P.mughalLite, sash: P.gold, beard: 'black', prop: 'sword' },
  farrukh: { jama: P.royal, turban: P.gold, beard: 'none', moustache: true, halo: true, brows: 'worried' },
  rafi1: { jama: P.cream, turban: P.cream, beard: 'none', pale: true, thin: true, halo: true }, rafi2: { jama: P.stone, turban: P.cream, beard: 'none', moustache: true, pale: true, thin: true, halo: true },
  mshahTeen: { jama: P.cream, turban: P.gold, beard: 'none', age: 'teen', halo: true }, mshah: { jama: P.cream, turban: P.gold, beard: 'black', halo: true, smile: true, prop: 'rose' },
  nizam: { jama: P.hyderabad, turban: P.cream, sash: P.gold, beard: 'grey' }, owen: { jama: P.ink, turban: P.ink },
};
export const person = (key, o) => figure({ ...CAST[key], ...o });

// ═════════════ SERIES PIECES ═════════════
/** gold strings from the brothers' hands to an emperor. from/to arrays of [x,y]; p draws them; snap 0..1 breaks them */
export function puppetStrings(from, to, t, p = 1, snap = 0) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = P.gold; ctx.lineWidth = 4; ctx.lineCap = 'round';
  from.forEach((f, i) => to.forEach((g, j) => {
    const sag = 30 + Math.sin(t * 2 + i + j) * 10;
    if (snap <= 0) { const ex = lerp(f[0], g[0], clamp(p)), ey = lerp(f[1], g[1], clamp(p)); ctx.beginPath(); ctx.moveTo(f[0], f[1]); ctx.quadraticCurveTo((f[0] + ex) / 2, (f[1] + ey) / 2 + sag, ex, ey); ctx.stroke(); }
    else { const k = eo(clamp(snap)); for (const [a, b, dir] of [[f, [(f[0] + g[0]) / 2, (f[1] + g[1]) / 2], -1], [g, [(f[0] + g[0]) / 2, (f[1] + g[1]) / 2], 1]]) { const mx = lerp(b[0], a[0], k * 0.6), my = lerp(b[1], a[1], k * 0.6) + k * 140 * dir * (dir > 0 ? -0.4 : 1); ctx.globalAlpha = 1 - k * 0.5; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo((a[0] + mx) / 2 + k * 30, (a[1] + my) / 2 + 50 * k, mx, my); ctx.stroke(); } }
  }));
  ctx.restore();
}
/** crowns cycle onto the throne: items [{ year, label }], p = index progress (0..n) */
export function throneCarousel(items, p, x, y, s = 1) {
  items.forEach((it, i) => { const u = p - i; if (u < -1 || u > 1.6) return; const xx = x + (u > 0 ? lerp(0, -520, eo(clamp((u - 0.7) / 0.9))) : lerp(520, 0, eo(clamp(1 + u)))), yy = y - Math.sin(clamp(Math.abs(u)) * Math.PI) * 30; ctx.save(); ctx.globalAlpha = u > 1.3 ? clamp((1.6 - u) / 0.3) : 1; crown(xx, yy, s * (u > -0.05 && u < 0.7 ? 1.12 : 0.9), 0, { year: it.year }); if (it.label) slip(it.label, xx, yy + 140 * s, s * 0.9, -0.02, 34, { pin: null }); ctx.restore(); });
}
/** India-shaped thumbnail scene helper: dark parchment */
export function darkParchment(seed = 9) { parchment(seed, '#3A2A1E'); ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = '#1E1610'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); vignette(0.6); }
