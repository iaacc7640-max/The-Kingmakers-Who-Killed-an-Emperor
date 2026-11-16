// THE KINGMAKERS WHO KILLED AN EMPEROR · ClearCut History, The Fall of the Mughals, Episode 1 · shot list (16:9).
// Every shot is placed on the narration clock: L(i) = line i start, Wd('word', i) = that word's start.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
const { P, cut, P_rr, P_poly, P_circ, P_ell, person, proj, PLACES } = K;

// ── episode set pieces ──
const pop = (lt, a, d = 0.35) => (lt > a ? eob(seg(lt, a, a + d)) : 0);
const FLOOR = 880;
function dayCourt(t, o = {}) { K.court({ t, ...o }); }
function nightCourt(t, o = {}) { K.court({ t, night: true, ...o }); }
function silhouetteRow(n, x0, y, dx, h, t, fill = '#2A211A', seed = 0) { for (let i = 0; i < n; i++) person('owen', { x: x0 + i * dx, y, h: h * (0.92 + rnd(i + seed) * 0.12), t, k: i + seed, jama: fill, turban: fill, dir: i % 2 ? -1 : 1 }); }
function bars(x, y, w, h, p = 1) { ctx.save(); ctx.translate(x, y); cut(P_rr(-w / 2 - 20, -h, w + 40, 30, 4), P.ink, { shadow: 0.6 }); for (let i = 0; i < 7; i++) { const bx = -w / 2 + i * w / 6, hh = h * eo(clamp(p * 1.4 - i * 0.06)); cut(P_rr(bx - 9, -h, 18, hh, 6), '#4A4038', { shadow: 0.6, edge: 2 }); } ctx.restore(); }
function rider(x, y, s, t, color = P.sikh) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = Math.sin(t * 9) * 8;
  for (const [lx, ph] of [[-70, 0], [-40, 1.5], [50, 0.7], [80, 2.2]]) cut(P_rr(lx - 8 + Math.sin(t * 9 + ph) * 10, -60, 16, 70, 6), P.sepia, { shadow: 0.3, edge: 2 });
  cut(P_ell(0, -80 + g * 0.2, 110, 45), P.sepia, { shadow: 0.6 }); cut(P_poly([[90, -100], [150, -170], [175, -150], [120, -80]]), P.sepia, { shadow: 0.4 }); cut(P_poly([[-100, -100], [-150, -60], [-110, -90]]), P.ink, { shadow: 0.2, edge: 2 });
  cut(P_rr(-30, -190 + g * 0.2, 60, 100, 20), color, { shadow: 0.5 }); cut(P_circ(0, -215 + g * 0.2, 26), P.skin, { shadow: 0.3, edge: 2 }); cut(P_ell(0, -240 + g * 0.2, 30, 20), color, { shadow: 0.3, edge: 2 }); line([[30, -170], [70, -280]], P.ink, 5); ctx.restore(); }
function keys(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); ctx.strokeStyle = P.gold; ctx.lineWidth = 10; ctx.stroke(); for (const a of [-0.6, 0.3, 1.2]) { ctx.save(); ctx.rotate(a); cut(P_rr(30, -7, 120, 14, 6), P.gold, { shadow: 0.4, edge: 2 }); cut(P_rr(130, -7, 14, 36, 4), P.gold, { shadow: 0.3, edge: 2 }); ctx.restore(); } ctx.restore(); }
function sack(x, y, s, fill = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s * lerp(0.55, 1, fill)); cut(() => { ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(-120, -140, -40, -190); ctx.lineTo(40, -190); ctx.quadraticCurveTo(120, -140, 90, 0); ctx.closePath(); }, '#C9A46A', { shadow: 0.8 }); line([[-44, -180], [44, -180]], P.sepia, 8); ctx.restore(); }
function cup(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_poly([[-50, -110], [50, -110], [30, -20], [-30, -20]]), P.stone, { shadow: 0.7 }); cut(P_rr(-8, -24, 16, 24, 4), P.stone, { shadow: 0.3, edge: 2 }); cut(P_ell(0, 0, 50, 12), P.stone, { shadow: 0.5, edge: 2 }); ctx.restore(); }
function peasant(x, y, h, t, k = 0, dir = 1) { K.figure({ x, y, h, t, k, dir, jama: '#C9B48A', turban: P.cream, sash: P.sepia, beard: 'grey' }); }
function cracks(cx, cy, p, seed = 1, color = P.ink) { if (p <= 0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 7; i++) { let x = cx, y = cy, a = rnd(i + seed) * TAU; ctx.beginPath(); ctx.moveTo(x, y); const n = Math.floor(8 * clamp(p)); for (let j = 0; j < n; j++) { a += (rnd(i * 10 + j + seed) - 0.5) * 1.1; x += Math.cos(a) * 46; y += Math.sin(a) * 46; ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore(); }
function prizeTag(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, -60], [0, 0]], P.ink, 3); cut(P_poly([[-90, 0], [90, 0], [110, 40], [90, 80], [-90, 80]]), P.gold, { shadow: 0.7 }); circle(-60, 40, 10, P.edge); ctx.font = '400 54px Bebas'; ctx.fillStyle = P.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PRIZE', 14, 44); ctx.restore(); }
function letter(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); cut(P_rr(-70, -46, 140, 92, 4), P.cream, { shadow: 0.6 }); line([[-70, -46], [0, 6], [70, -46]], 'rgba(62,44,30,0.4)', 3); K.seal(0, 8, 0.32); ctx.restore(); }
function soldiers(x0, y, n, s, t, color, dx = 90) { for (let i = 0; i < n; i++) K.flag(x0 + i * dx, y + (i % 2) * 24, s, t, color, i); }
/** two guards drag a figure (the emperor) by the arms, to the left; blindfold appears from blindAt (local time) when > 0 */
function dragGroup(ex, t, lt, h, blindAt) {
  K.figure({ x: ex - 175, y: FLOOR + 30, h, t, k: 4, walk: lt * 6, jama: '#4A3A2E', turban: '#2A211A', beard: 'black', arm: 72 });
  ctx.save(); ctx.translate(ex, FLOOR + 30); ctx.rotate(0.12 + Math.sin(lt * 9) * 0.02); ctx.translate(-ex, -(FLOOR + 30));
  person('farrukh', { x: ex, y: FLOOR + 30, h, t, k: 2, arm: 95, brows: 'worried', halo: false, walk: lt * 3 }); if (blindAt > 0 && lt > blindAt) blindfold(ex, FLOOR + 30, h, eo(clamp((lt - blindAt) / 0.35)));
  ctx.restore();
  K.figure({ x: ex + 165, y: FLOOR + 30, h, t, k: 5, walk: lt * 6, jama: '#4A3A2E', turban: '#2A211A', beard: 'black', arm: 62, dir: -1 });
}
/** a dark cloth band over a figure's eyes (figure drawn at x, y with height h, facing right) */
function blindfold(x, y, h, p) { if (p <= 0) return; const sc = h / 520; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_rr(-50, -446, 108 * p, 34, 8), '#16110D', { shadow: 0.3, edge: 2 }); if (p > 0.9) cut(P_poly([[-50, -440], [-82, -420], [-74, -404], [-50, -418]]), '#16110D', { shadow: 0.2, edge: 2 }); ctx.restore(); }
/** two heavy doors slide shut over the whole frame; p 0..1 */
function slamDoors(p) { if (p <= 0) return; for (const k of [-1, 1]) { const w = (W / 2 + 60) * p; ctx.save(); ctx.translate(k < 0 ? -60 : W + 60, 0); cut(P_rr(k < 0 ? 0 : -w, -400, w, H + 800, 4), '#5A2C22', { shadow: 1.2, edge: 3 }); for (let i = 0; i < 3; i++) circle(k < 0 ? w - 80 : -w + 80, 250 + i * 260, 14, P.gold); ctx.restore(); } }
/** a sickle swinging at (x, y) */
function sickle(x, y, t, k) { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 6 + k) * 0.6); line([[0, 0], [0, 50]], P.sepia, 7); ctx.beginPath(); ctx.arc(16, 62, 20, Math.PI * 0.5, Math.PI * 1.7); ctx.strokeStyle = P.stone; ctx.lineWidth = 7; ctx.stroke(); ctx.restore(); }
const persianArrow = (v, p) => K.route([[55.5, 32.6], [60.5, 31.8], [65.7, 31.6], [69.2, 34.5], [71.6, 34.0], [74.3, 31.5], [76.98, 29.69], [77.1, 29.0]], p, P.persia, v, (x, y, a) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); cut(P_poly([[24, 0], [-14, -20], [-14, 20]]), P.persia, { shadow: 0.5, edge: 2 }); ctx.restore(); });

export function buildShots() {
  const S = [], CUES = [], EV = [], BEATS = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  // ev(t, kind): event log + motion → sound map (sfxFor)
  const SFX = { pop: ['pop', 0.5], slip: ['rustle', 0.8], stamp: ['seal', 1], whip: ['whoosh', 1], map: ['rustle', 0.7], coin: ['coins', 0.8], crown: ['roll', 0.9], write: ['scribble', 0.8], battle: ['cannon', 0.8], march: ['hooves', 0.7], court: ['murmur', 0.8], snuff: ['hush', 0.8], hush: ['hush', 0.7], slam: ['thump', 1.1], step: ['steps', 0.8], snap: ['snap', 0.9], thump: ['thump', 0.8], sword: ['ring', 0.5], bells: ['bells', 0.6], sting: ['sting', 1], tick: ['tock', 0.5], slide: ['slide', 0.5] };
  const sfxFor = (kind) => SFX[kind];
  const ev = (t, kind, o = {}) => { EV.push({ t: +t.toFixed(3), kind }); const s = sfxFor(kind); if (s && !o.silent) cue(t, s[0], { gain: (o.gain ?? 1) * s[1], ...(o.dur ? { dur: o.dur } : {}) }); };
  const at = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const beat = (i, year, words) => { const t0 = at(i); BEATS.push({ at: t0, year, words }); ev(t0, 'whip'); return t0; };

  // ════════════ COLD OPEN (0:00-0:21) ════════════
  // C1 · the two brothers stride down the night corridor with their guards
  add({ id: 'C1', at: 0, cam: { at: [960, 620], push: 0.10 }, note: 'night corridor: the two Sayyid brothers stride forward, guards behind', draw(lt, d, t) { K.corridor(t, 0); const p = eio(clamp(lt / d));
    for (const dx of [-340, 340]) K.figure({ x: 960 + dx * lerp(0.55, 1, p), y: lerp(690, 830, p), h: lerp(190, 330, p), t, k: 3, walk: lt * 5, jama: '#4A3A2E', turban: '#2A211A', beard: 'black', prop: 'sword', dir: dx > 0 ? -1 : 1 });
    for (const [k, dx] of [[0, -140], [1, 140]]) person(k ? 'hussain' : 'abdullah', { x: 960 + dx * lerp(0.6, 1, p), y: lerp(720, 920, p), h: lerp(260, 480, p), t, k, walk: lt * 5 + k, brows: 'cold', dir: k ? -1 : 1, prop: null });
    K.slip('THE SAYYID BROTHERS', 960, 150, pop(lt, 0.5), -0.02, 40, { color: P.crimson }); } });
  ev(0, 'step'); ev(0.5, 'slip'); ev(1.0, 'step', { gain: 0.8 }); ev(1.9, 'step', { gain: 0.9 });
  { const s = 2.5, dr = Wd('dragged', 0) - s;
    add({ id: 'C2', at: s, cam: { pan: [[1080, 560], [880, 560]], push: 0.05 }, note: 'guards drag Emperor Farrukhsiyar out of the throne room; the brothers watch; his crown falls', draw(lt, d, t) { nightCourt(t);
      const p = eio(clamp((lt - 0.1) / (d - 0.1))), ex = lerp(1120, 660, p);
      person('abdullah', { x: 1580, y: FLOOR + 40, h: 520, t, brows: 'cold', dir: -1, prop: null }); person('hussain', { x: 1780, y: FLOOR + 40, h: 520, t, k: 1, brows: 'cold', dir: -1, prop: null });
      dragGroup(ex, t, lt, 470, 0);
      const cf = clamp((lt - dr) / 1.0); K.crown(lerp(ex + 40, ex + 420, eo(cf)), lerp(FLOOR - 400, FLOOR + 10, cf * cf), 0.3 + 0.12 * cf, cf * 6, { plume: false });
      K.slip('EMPEROR FARRUKHSIYAR', ex, 140, pop(lt, 0.2), -0.02, 38); } });
    ev(s + 0.2, 'slip'); ev(s + 0.4, 'step'); ev(s + 1.1, 'step'); ev(s + dr, 'crown', { dur: 1 }); ev(s + 2.2, 'step'); }
  { const s = L(1) - 0.05, bl = Wd('blinded', 1) - s, ki = Wd('killed', 1) - s;
    add({ id: 'C3', at: s, cam: { at: [960, 520], push: 0.06 }, note: 'a blindfold over the emperor’s eyes; the doors slam shut; a candle goes out (nothing violent shown)', draw(lt, d, t) { K.nightPage(3, 0.86);
      person('farrukh', { x: 880, y: 1560, h: 1300, t, brows: 'worried', halo: false, prop: null }); blindfold(880, 1560, 1300, eo(clamp((lt - bl + 0.1) / 0.35)));
      K.candle(1540, 1000, 1.3, t, clamp((lt - ki - 0.15) / 0.5)); slamDoors(eo(clamp((lt - ki + 0.05) / 0.3))); } });
    ev(s + bl - 0.1, 'slide', { gain: 0.6 }); ev(s + ki, 'slam'); ev(s + ki + 0.2, 'snuff'); }
  { const s = L(2) - 0.1, ever = Wd('ever', 2) - s;
    add({ id: 'C4', at: s, cam: { pan: [[820, 560], [1100, 540]], push: 0.06 }, note: 'a row of court nobles; two step forward in crimson', draw(lt, d, t) { nightCourt(t, { throne: false });
      silhouetteRow(7, 300, FLOOR, 220, 420, t); for (const [k, x] of [[0, 860], [1, 1060]]) { const fw = pop(lt, ever + k * 0.25, 0.5); person(k ? 'hussain' : 'abdullah', { x, y: FLOOR + 40 * fw, h: 420 + 80 * fw, t, k, silhouette: fw < 0.5, dir: k ? -1 : 1 }); }
      K.slip('NEVER BEFORE', 960, 200, pop(lt, ever + 0.6), -0.03, 52); } });
    ev(s + 0.1, 'court'); ev(s + ever, 'step'); ev(s + ever + 0.6, 'slip'); ev(s + ever + 1.8, 'pop', { gain: 0.4 }); }
  { const s = L(3) - 0.1, four = Wd('four', 4) - s;
    const WHO = [['farrukh', 'FARRUKHSIYAR'], ['rafi1', 'RAFI-UD-DARAJAT'], ['rafi2', 'SHAH JAHAN II'], ['mshahTeen', 'MUHAMMAD SHAH']];
    add({ id: 'C5', at: s, cam: { at: [960, 500], push: 0.08 }, note: '1719: four different men sit on the Mughal throne, one after another', draw(lt, d, t) { nightCourt(t); K.ribbon('1719', 960, 120, pop(lt, 0.1), 76);
      const i = lt < four ? -1 : Math.min(3, Math.floor((lt - four) / 0.55)); if (i >= 0) { const [key, name] = WHO[i], p = pop(lt, four + i * 0.55, 0.2); person(key, { x: 960, y: 760, h: 430 * p, t }); K.slip(name, 520, 480, p, -0.03, 34); }
      for (let j = 0; j <= i; j++) K.crown(1290 + (j % 2) * 150, 330 + Math.floor(j / 2) * 150, 0.42 * pop(lt, four + j * 0.55, 0.2), 0, { plume: false }); K.label('×' + Math.max(0, i + 1), 1650, 560, 60, P.gold); } });
    ev(s + 0.1, 'slip'); for (let i = 0; i < 4; i++) ev(s + four + i * 0.55, 'stamp', { gain: 0.8 }); }
  { const s = L(5) - 0.1, gr = Wd('greatest', 5) - s;
    add({ id: 'C6', at: s, cam: { at: [960, 480], push: 0.06, z0: 1.1 }, note: 'anchor map: India 1707, huge and green', draw(lt, d, t) { K.indiaMap({ t, mughal: clamp((lt - gr + 0.3) / 1.2), pins: [{ place: 'Delhi', p: pop(lt, gr + 0.8), label: 'DELHI', pulse: true }] }); } });
    ev(s, 'map'); ev(s + gr, 'slide', { gain: 0.7, dur: 1.2 }); ev(s + gr + 0.8, 'pop'); }
  { const s = L(6) - 0.1, pr = Wd('prize', 6) - s, ha = Wd('handed', 6) - s;
    add({ id: 'C7', at: s, cam: { at: [960, 540], push: 0.10 }, note: 'one hand passes the crown, tagged PRIZE, to another hand', draw(lt, d, t) { nightCourt(t); const k = eio(clamp((lt - ha) / 0.9));
      K.hand(lerp(700, 560, k), 560, 1.3, 0, 1); K.hand(lerp(1560, 1290, eo(clamp((lt - ha + 0.4) / 0.6))), 600, 1.3, 0, -1, '#C08E66', P.mughalLite);
      const cx = lerp(690, 1250, k); K.crown(cx, 450 + Math.sin(t * 2) * 5 - Math.sin(k * Math.PI) * 70, 0.95); prizeTag(cx + 150, 400, pop(lt, pr)); } });
    ev(s, 'court', { gain: 0.6 }); ev(s + pr, 'pop'); ev(s + ha, 'slide', { gain: 0.6 }); cue(Le(6) - 0.2, 'sting'); EV.push({ t: Le(6) - 0.2, kind: 'sting' }); }
  // ════════════ B1 · 1707 · THE OLD MAN WINS ════════════
  { const s = beat(7, '1707', 'THE OLD MAN WINS'), f0 = 22.0 - s, f1 = 24.4 - s;
    add({ id: 'B1a', at: s, whip: true, cam: { at: [960, 520], push: 0.05 }, note: 'a wall calendar flips backwards page by page, 1719 → 1707', draw(lt, d, t) { K.parchment(21);
      const n = 12, u = clamp((lt - f0) / (f1 - f0)) * n, i = Math.min(n - 1, Math.floor(u)), fr = u >= n ? 1 : u - i, yr = lt < f0 ? 1719 : u >= n ? 1707 : 1719 - i;
      K.calendar(960, 520, 1.0, yr, u >= n ? 1707 : yr - 1, lt < f0 ? 0 : fr); K.slip('BACK TO 1707', 1480, 300, pop(lt, f1), 0.04, 44, { color: P.crimson }); } });
    for (let i = 0; i < 12; i++) ev(22.0 + i * 0.2, 'slip', { gain: 0.45 }); ev(24.4, 'stamp', { gain: 0.6 }); }
  { const s = at(8), ru = Wd('ruled', 8) - s, fi = Wd('fifty', 8) - s;
    add({ id: 'B1b', at: s, cam: { at: [960, 380], push: 0.08 }, note: 'Aurangzeb, an aged silhouette at the jharokha window', draw(lt, d, t) { dayCourt(t, { throne: false }); person('aurangzeb', { x: 960, y: 300, h: 300, t }); K.slip('AURANGZEB', 560, 230, pop(lt, 0.3), -0.02, 44); K.statCard('~50 YEARS', 'ON THE THRONE · 1658–1707', 1420, 280, pop(lt, fi)); silhouetteRow(5, 380, FLOOR, 290, 380, t, '#5A4636'); } });
    ev(s, 'court'); ev(s + 0.3, 'slip'); ev(s + ru, 'pop', { gain: 0.4 }); ev(s + fi, 'pop'); }
  { const s = at(9), th = Wd('three', 9) - s, em = Wd('empire', 9) - s, he = Wd('heir', 10) - s;
    add({ id: 'B1c', at: s, cam: { pan: [[900, 540], [1020, 520]], push: 0.06 }, note: 'the window empties; three princes below; NO HEIR', draw(lt, d, t) { dayCourt(t, { throne: false }); ctx.save(); ctx.globalAlpha = clamp(1 - lt / 0.8); person('aurangzeb', { x: 960, y: 300, h: 300, t }); ctx.restore();
      ['azam', 'bahadur', 'kambakhsh'].forEach((k, i) => { const p = pop(lt, th + i * 0.2); if (p > 0) person(k, { x: 600 + i * 360, y: FLOOR, h: 460 * p, t, k: i, halo: false, silhouette: true, dir: i === 2 ? -1 : 1 }); });
      K.crown(960, 200, pop(lt, em) * 0.9); K.slip('NO AGREED HEIR', 960, 120 + 300, pop(lt, he), 0.03, 50, { color: P.crimson }); } });
    ev(s, 'slide', { gain: 0.5 }); [0, 1, 2].forEach((i) => ev(s + th + i * 0.2, 'pop', { gain: 0.6 })); ev(s + em, 'crown', { gain: 0.5, dur: 0.6 }); ev(s + he, 'stamp'); }
  { const s = at(11), fo = Wd('fought', 12) - s;
    add({ id: 'B1d', at: s, cam: { at: [880, 430], push: 0.08, z0: 1.15 }, note: 'map: three princes’ armies converge; battle', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Agra', label: 'AGRA', p: 1 }] });
      const v = K.VIEW; K.route([[69.2, 34.5], [72.5, 32.5], [74.3, 31.5], [77.2, 28.6], [78.0, 27.2]], clamp(lt / 3), P.gold, v); K.route([[75.3, 19.9], [76.5, 23.5], [77.6, 26.0], [78.0, 27.0]], clamp((lt - 0.4) / 3), P.royal, v); K.route([[78.5, 17.4], [77.7, 19.5]], clamp((lt - 0.8) / 2), P.wine, v);
      if (lt > fo) K.battle(...proj(77.9, 26.9), t, 1.2); } });
    ev(s, 'march', { dur: 3 }); ev(s + 1.4, 'pop', { gain: 0.4 }); ev(s + fo, 'battle'); ev(s + fo + 0.1, 'sword'); }
  { const s = at(13), inh = Wd('inherited', 13) - s, won = Wd('won', 13) - s;
    add({ id: 'B1e', at: s, cam: { at: [960, 520], push: 0.08 }, note: 'a crown balanced on a sword point', draw(lt, d, t) { K.parchment(13); K.sword(960, 880, 3, 0); K.crown(980, 300 + Math.sin(t * 2) * 5, 1.2, Math.sin(t * 1.3) * 0.05);
      K.slip('NEVER INHERITED', 560, 500, pop(lt, inh), -0.05, 48); K.slip('WON', 1380, 500, pop(lt, won), 0.05, 70, { color: P.crimson }); } });
    ev(s, 'sword'); ev(s + inh, 'slip'); ev(s + won, 'stamp'); }
  { const s = at(14), mu = Wd('prince', 14) - s, si = Wd('sixty', 14) - s, wa = Wd('warrior', 15) - s, won = Wd('won', 16) - s;
    add({ id: 'B1f', at: s, cam: { pan: [[760, 480], [1000, 470]], push: 0.08 }, note: 'Prince Muazzam, about 63, white beard', draw(lt, d, t) { dayCourt(t, { throne: false }); person('bahadur', { x: 760, y: FLOOR, h: 620, t, halo: false, arm: lt > won ? 60 : 10, prop: lt > wa ? 'sword' : null });
      K.slip('PRINCE MUAZZAM', 1300, 200, pop(lt, mu), -0.03, 44); K.statCard('ABOUT 63', 'YEARS OLD', 1300, 380, pop(lt, si)); K.ribbon('VICTOR', 1300, 640, pop(lt, won), 70); } });
    ev(s + mu, 'slip'); ev(s + si, 'pop'); ev(s + wa, 'sword'); ev(s + won, 'stamp'); }
  { const s = at(17), ba = Wd('battle', 17) - s, ka = Wd('his', 18) - s, fi = Wd('fighting', 18) - s;
    add({ id: 'B1g', at: s, cam: { pan: [[900, 380], [960, 560]], push: 0.05, z0: 1.15 }, note: 'map: Azam falls at Jajau 1707; Kam Bakhsh near Hyderabad 1709', draw(lt, d, t) { K.indiaMap({ t, mughal: 1 }); const [jx, jy] = proj(77.9, 26.9), [hx, hy] = proj(78.5, 17.4);
      if (lt > ba) K.battle(jx, jy, t, 1.1); K.slip('AZAM · 1707', jx + 200, jy - 40, pop(lt, ba + 0.2), 0.03, 34); person('azam', { x: jx - 180, y: jy + 120, h: 200 * pop(lt, 0.2), t });
      if (lt > fi) K.battle(hx, hy, t, 1.1); K.slip('KAM BAKHSH · 1709', hx + 250, hy - 40, pop(lt, fi + 0.2), -0.03, 34); person('kambakhsh', { x: hx - 180, y: hy + 120, h: 200 * pop(lt, ka), t }); } });
    ev(s + 0.2, 'pop', { gain: 0.5 }); ev(s + ba, 'battle'); ev(s + ba + 0.2, 'slip'); ev(s + ka, 'pop', { gain: 0.5 }); ev(s + fi, 'battle'); ev(s + fi + 0.2, 'slip'); }
  { const s = at(19), th = Wd('throne', 19) - s, fi = Wd('first', 19) - s;
    add({ id: 'B1h', at: s, cam: { at: [960, 480], push: 0.10 }, note: 'coronation: the crown lowers; BAHADUR SHAH I', draw(lt, d, t) { dayCourt(t); const p = eo(clamp((lt - th + 0.6) / 0.8)); person('bahadur', { x: 960, y: 760, h: 520, t, halo: lt > th + 0.3 }); K.crown(960, lerp(-80, 270, p), 0.55 * (p > 0 ? 1 : 0), 0);
      K.ribbon('BAHADUR SHAH I', 960, 140, pop(lt, fi), 64); } });
    ev(s, 'court'); ev(s + th - 0.6, 'slide', { gain: 0.5 }); ev(s + th + 0.2, 'bells'); ev(s + fi, 'stamp'); }
  { const s = at(20), wo = Wd('won', 20) - s;
    add({ id: 'B1i', at: s, cam: { at: [960, 520], push: 0.08 }, note: 'Bahadur Shah plants the Mughal flag on the hilltop; rival banners lie fallen: the war is won', draw(lt, d, t) { K.parchment(20); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 1300);
      cut(() => { ctx.beginPath(); ctx.moveTo(-400, 1150); ctx.quadraticCurveTo(960, 560, 2320, 1150); ctx.closePath(); }, '#B9A47A', { shadow: 0.6 });
      for (const [x, r, c] of [[460, 1.25, P.royal], [1480, -1.3, P.wine]]) { ctx.save(); ctx.translate(x, 900); ctx.rotate(r); K.flag(0, 0, 0.9, t, c); ctx.restore(); }
      const up = eob(clamp((lt - wo + 0.4) / 0.5)); person('bahadur', { x: 860, y: 790, h: 430, t, arm: 20 + 110 * up }); K.flag(1000, 800 - 150 * up, 1.4 * clamp(up * 1.2), t, P.mughal);
      K.slip('THE WAR IS WON', 960, 150, pop(lt, wo), -0.02, 48, { color: P.crimson }); } });
    ev(s + wo - 0.4, 'thump'); ev(s + wo, 'stamp'); }
  { const s = at(21), ho = Wd('hold', 21) - s, to = Wd('together', 21) - s;
    add({ id: 'B1j', at: s, cam: { at: [920, 470], push: 0.05, z0: 1.12 }, note: 'map: the empire pulls apart into four pieces; two hands press it back together; gold stitches', draw(lt, d, t) {
      const push = eo(clamp((lt - ho) / Math.max(0.4, to - ho + 0.3))), drift = 70 * Math.min(1, lt / 0.6) * (1 - push), [cx, cy] = proj(78.5, 24.5);
      K.indiaMap({ t, mughal: 0, extra: (v) => { for (const [qx, qy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { ctx.save(); ctx.translate(qx * drift, qy * drift * 0.7); ctx.beginPath(); ctx.rect(qx < 0 ? cx - 2400 : cx, qy < 0 ? cy - 2400 : cy, 2400, 2400); ctx.clip(); K.inkBleed(K.MUGHAL1707, P.mughal, 1, [77.2, 28.6], v, 2); ctx.restore(); } } });
      if (lt > ho - 0.3) { const hp = eo(clamp((lt - ho + 0.3) / 0.6)); K.hand(lerp(-260, cx - 440, hp), cy, 1.5, 0, 1); K.hand(lerp(W + 260, cx + 440, hp), cy, 1.5, 0, -1); }
      if (lt > to) { ctx.save(); ctx.strokeStyle = P.gold; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (let i = -5; i <= 5; i++) { const k = clamp((lt - to - Math.abs(i) * 0.05) / 0.2); if (k <= 0) continue; ctx.beginPath(); ctx.moveTo(cx - 14, cy + i * 60 - 14 * k); ctx.lineTo(cx + 14, cy + i * 60 + 14 * k); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + i * 70 - 14 * k, cy - 14); ctx.lineTo(cx + i * 70 + 14 * k, cy + 14); ctx.stroke(); } ctx.restore(); }
      K.slip('HOLD IT TOGETHER', 960, 140, pop(lt, ho), -0.02, 46); } });
    ev(s + 0.1, 'slide', { gain: 0.6 }); ev(s + ho - 0.3, 'whip', { gain: 0.6 }); ev(s + ho + 0.3, 'thump'); ev(s + to, 'write'); }
  // ════════════ B2 · 1707 · MAKE PEACE ════════════
  { const s = beat(22, '1707', 'MAKE PEACE'), pe = Wd('peace', 22) - s, ev_ = Wd('everyone', 22) - s;
    add({ id: 'B2a', at: s, whip: true, cam: { at: [960, 500], push: 0.07 }, note: 'Bahadur Shah opens his arms to Maratha and Rajput envoys; a peace farman is sealed', draw(lt, d, t) { dayCourt(t); person('bahadur', { x: 960, y: 760, h: 430, t, arm: 30 + 50 * pop(lt, pe) });
      [[420, P.maratha, 'MARATHAS'], [1500, P.rajput, 'RAJPUTS']].forEach(([x, c, n], i) => { const a = pop(lt, 1.3 + i * 0.3); if (a <= 0) return; K.figure({ x, y: FLOOR + 40, h: 420, t, k: i, jama: P.cream, turban: c, sash: c, beard: 'black', moustache: true, cap: i ? null : 'pagdi', dir: x < 960 ? 1 : -1, arm: 40 }); K.flag(x + (x < 960 ? -120 : 120), FLOOR + 40, 0.95 * a, t, c, i); K.slip(n, x, 300, a, (i ? 0.03 : -0.03), 32); });
      K.farman(1240, 420, 0.42, 1, pop(lt, pe)); K.slip('PEACE WITH EVERYONE', 960, 130, pop(lt, ev_), -0.02, 44, { color: P.crimson }); } });
    ev(s + 1.3, 'step'); ev(s + 1.6, 'step'); ev(s + pe, 'stamp'); ev(s + ev_, 'slip'); }
  { const s = at(23), fr = Wd('free', 24) - s, ho = Wd('home', 24) - s;
    add({ id: 'B2b', at: s, cam: { pan: [[820, 520], [1120, 520]], push: 0.05 }, note: 'Shahu, the young Maratha prince, walks out of a gate', draw(lt, d, t) { K.parchment(23); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 1300); K.gate(700, FLOOR + 10, 1.05); cut(P_rr(-400, FLOOR, W + 800, 500), P.sepia, { shadow: 0, edge: 0 });
      const wx = lerp(700, 1350, eio(clamp((lt - 0.4) / (d - 0.6)))); person('shahu', { x: wx, y: FLOOR, h: 480, t, walk: lt * 6 });
      K.slip('SHAHU · MARATHA PRINCE', 700, 140, pop(lt, 0.3), -0.03, 44); K.slip('SET FREE', 1400, 300, pop(lt, fr), 0.04, 54, { color: P.crimson }); K.flag(1650, FLOOR, 1.3 * pop(lt, ho), t, P.maratha); } });
    ev(s, 'step'); ev(s + 0.3, 'slip'); ev(s + 1.6, 'step'); ev(s + fr, 'stamp'); ev(s + ho, 'pop'); }
  { const s = at(25), co = Wd('confirmed', 25) - s;
    const RAJ = [[69.6, 26.2], [70.3, 28.0], [72.6, 29.9], [74.6, 29.9], [75.8, 28.6], [77.4, 27.4], [77.3, 26.0], [76.6, 24.5], [75.8, 23.3], [74.4, 23.2], [73.4, 24.0], [72.2, 24.4], [70.7, 24.8]];
    add({ id: 'B2c', at: s, cam: { at: [740, 380], push: 0.06, z0: 1.35 }, note: 'map: Rajput lands ink in; seals stamp on Amber, Jodhpur, Udaipur', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, extra: (v) => K.inkBleed(RAJ, P.rajput, clamp((lt - 0.2) / 1.2), [74, 26], v, 5) });
      [[75.85, 26.98, 'AMBER'], [73.0, 26.3, 'JODHPUR'], [73.7, 24.6, 'UDAIPUR']].forEach(([lo, la, n], i) => { const [x, y] = proj(lo, la); K.seal(x, y, pop(lt, co + i * 0.35) * 0.45); K.slip(n, x + [60, -70, 0][i], y + [-50, -50, 50][i], pop(lt, co + i * 0.35), 0, 22, { pin: null }); });
      K.slip('RAJPUT KINGS CONFIRMED', 760, 140 + 60, pop(lt, 0.4), -0.02, 40); } });
    ev(s + 0.2, 'map'); ev(s + 0.4, 'slip'); [0, 1, 2].forEach((i) => ev(s + co + i * 0.35, 'stamp', { gain: 0.7 })); }
  { const s = at(26), ar = Wd('armies', 26) - s, ba = Wd('Banda', 27) - s;
    // Banda Singh Bahadur's Punjab, close up (coordinates: Wikipedia): Sirhind, Chappar Chiri (May 1710), Sadhaura, Lohgarh (his fort,
    // besieged by the Mughal army in December 1710)
    const v = { cx: 76.9, cy: 29.4, s: 280 };
    add({ id: 'B2d', at: s, cam: { at: [960, 500], push: 0.06 }, note: 'Punjab close up: the Mughal army marches from Delhi to besiege Banda Bahadur at Lohgarh (Dec 1710); Sirhind, Chappar Chiri, Sadhaura', draw(lt, d, t) {
      K.indiaMap({ t, mughal: 1, v, noCompass: true, pins: [
        { place: 'Delhi', label: 'DELHI', p: 1, dy: 52 },
        { ll: [76.383, 30.617], label: 'SIRHIND', p: pop(lt, 0.3), color: P.sikh, dy: -48 },
        { ll: [76.667, 30.7], label: 'CHAPPAR CHIRI', p: pop(lt, 0.5), color: P.sikh, dy: 50, dx: -70, size: 26 },
        { ll: [77.217, 30.383], label: 'SADHAURA', p: pop(lt, 0.7), color: P.sikh, dy: 52, size: 26 },
        { ll: [77.407, 30.429], label: 'LOHGARH', p: pop(lt, 0.9), color: P.sikh, dy: -50, dx: 40, pulse: lt > ar + 1.4 }] });
      K.route([[77.2, 28.6], [77.05, 29.2], [77.15, 29.85], [77.38, 30.36]], clamp((lt - ar + 0.3) / 1.6), P.mughal, v, (x, y) => K.flag(x, y + 10, 0.5, t, P.mughal));
      if (lt > ar + 1.3) K.battle(...proj(77.407, 30.429, v), t, 0.9);
      const [rx, ry] = proj(78.0, 30.2, v); rider(rx + (1 - pop(lt, ba)) * 240, ry + 40, 0.5, t); K.slip('BANDA SINGH BAHADUR', rx + 200, ry - 150, pop(lt, ba + 0.2), -0.03, 30);
      K.slip('SIEGE OF LOHGARH · DEC 1710', 1480, 640, pop(lt, ar + 1.2), 0.02, 34); K.slip('THE PUNJAB', 520, 520, pop(lt, 0.2), -0.03, 40); } });
    ev(s + 0.2, 'slip'); ev(s + 0.5, 'pop', { gain: 0.4 }); ev(s + ar, 'march', { dur: 1.8 }); ev(s + ar + 1.3, 'battle', { gain: 0.6 }); ev(s + ba, 'march', { gain: 0.6, dur: 1.4 }); ev(s + ba + 0.2, 'slip'); }
  { const s = at(28), ti = Wd('titles', 28) - s, re = Wd('rewards', 28) - s, ha = Wd('happy', 28) - s;
    add({ id: 'B2e', at: s, cam: { pan: [[880, 520], [1060, 520]], push: 0.06 }, note: 'titles and coins fly from the throne to bowing nobles', draw(lt, d, t) { dayCourt(t); person('bahadur', { x: 960, y: 760, h: 440, t, arm: 40 + Math.sin(t * 3) * 10 });
      const nob = [[300, 'nizam'], [560, 'zulfikar'], [1360, 'abdullah'], [1620, 'hussain']]; nob.forEach(([x, k], i) => person(k, { x, y: FLOOR + 60, h: 400, t, k: i, prop: null, dir: x < 960 ? 1 : -1 }));
      nob.forEach(([x], i) => { const p = clamp((lt - ti - i * 0.25) / 0.7); if (p > 0 && p < 1) { const xx = lerp(960, x, eo(p)), yy = lerp(450, 520, p) - Math.sin(p * Math.PI) * 160; K.farman(xx, yy, 0.18, 0.2, 0, p * 6); } const q = clamp((lt - re - i * 0.2) / 0.7); if (q > 0 && q < 1) K.coin(lerp(960, x, eo(q)), lerp(500, 640, q) - Math.sin(q * Math.PI) * 120, 0.8, q * 8); });
      K.slip('TITLES & REWARDS', 960, 140, pop(lt, ti), 0.02, 46); if (lt > ha) K.slip('EVERY FACTION HAPPY', 960, 250, pop(lt, ha), -0.03, 36); } });
    ev(s, 'court'); [0, 1, 2, 3].forEach((i) => ev(s + ti + i * 0.25, 'slip', { gain: 0.6 })); ev(s + re, 'coin'); ev(s + re + 0.4, 'coin', { gain: 0.7 }); ev(s + ha, 'pop'); }
  { const s = at(29), ni = Wd('nickname', 29) - s, un = Wd('unaware', 31) - s;
    add({ id: 'B2f', at: s, cam: { at: [960, 500], push: 0.10 }, note: 'historian Khafi Khan writes; SHAH-I-BEKHABAR stamped', draw(lt, d, t) { K.parchment(29); cut(P_rr(260, 640, 620, 60, 6), P.sepia); K.figure({ x: 420, y: 860, h: 460, t, jama: P.mughalLite, turban: P.cream, beard: 'grey', arm: 30 + Math.sin(t * 10) * 4, prop: null });
      K.farman(680, 560, 0.55, 1, 0, -0.1); K.slip('KHAFI KHAN · HISTORIAN', 520, 140, pop(lt, 0.3), -0.02, 40);
      const st = L(30) - s; if (lt > st) { K.slip('SHAH-I-BEKHABAR', 1340, 420, pop(lt, st, 0.3), 0.03, 64, { color: P.crimson }); } K.slip('THE UNAWARE KING', 1340, 600, pop(lt, un), -0.03, 46); if (lt > ni) K.slip('A NICKNAME', 1340, 260, pop(lt, ni), -0.02, 34, { pin: null }); } });
    ev(s, 'write', { dur: 2 }); ev(s + 0.3, 'slip'); ev(s + ni, 'pop', { gain: 0.5 }); ev(L(30), 'stamp'); ev(s + un, 'slip'); }
  { const s = at(32), pl = Wd('plan', 33) - s, ne = Wd('next', 33) - s;
    add({ id: 'B2g', at: s, cam: { at: [960, 520], push: 0.12 }, note: '★ a blank succession scroll; NO PLAN; four shadow crowns', draw(lt, d, t) { dayCourt(t); K.farman(960, 520, 1.0, clamp(lt / 0.8), 0); K.slip('NO PLAN', 960, 520, pop(lt, pl), -0.05, 80, { color: P.crimson });
      for (let i = 0; i < 4; i++) { const p = pop(lt, ne + i * 0.12); if (p > 0) { ctx.save(); ctx.filter = 'brightness(0.25)'; K.crown(420 + i * 360, 250, 0.7 * p); ctx.restore(); } } } });
    ev(s + 0.1, 'slip'); ev(s + pl, 'stamp'); ev(s + ne, 'pop', { gain: 0.5 }); cue(Le(33) - 0.1, 'sting'); EV.push({ t: Le(33) - 0.1, kind: 'sting' }); }

  // ════════════ B3 · 1712 · THE MINISTER'S KING ════════════
  { const s = beat(34, '1712', "THE MINISTER'S KING"), di = Wd('died', 34) - s;
    add({ id: 'B3a', at: s, whip: true, cam: { at: [960, 560], push: 0.08 }, note: 'the crown set down on a cushion; the candle goes out', draw(lt, d, t) { nightCourt(t); cut(P_ell(960, 720, 220, 50), P.crimson); K.crown(960, 650, 0.9); K.candle(1300, 880, 1, t, clamp((lt - di) / 0.7)); K.slip('FEB 1712', 600, 260, pop(lt, 1.6), -0.03, 46); } });
    ev(s + 1.6, 'slip'); ev(s + di, 'snuff'); }
  { const s = at(35), wa = Wd('war', 35) - s;
    add({ id: 'B3b', at: s, cam: { at: [960, 520], push: 0.08 }, note: 'Bahadur Shah’s four sons draw swords against each other', draw(lt, d, t) { K.parchment(35); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 1300); cut(P_rr(-400, FLOOR, W + 800, 400), '#B9A47A', { shadow: 0, edge: 0 });
      const cols = [P.wine, P.royal, P.mughalLite, P.sepia]; for (let i = 0; i < 4; i++) { const x = [420, 780, 1140, 1500][i], up = pop(lt, wa + i * 0.12); K.figure({ x, y: FLOOR, h: 430, t, k: i, jama: cols[i], turban: P.gold, beard: 'black', prop: 'sword', arm: 30 + 90 * up, dir: i < 2 ? 1 : -1 }); }
      K.crown(960, 320, 0.8, Math.sin(t * 2) * 0.05); K.slip('FOUR SONS', 960, 140, pop(lt, 0.2), -0.02, 46); if (lt > wa) K.crossedSwords(960, 560, pop(lt, wa) * 1.2); } });
    ev(s + 0.2, 'slip'); ev(s + wa, 'sword'); ev(s + wa + 0.2, 'battle', { gain: 0.6 }); }
  { const s = at(36), ja = Wd('winner', 36) - s;
    add({ id: 'B3c', at: s, cam: { at: [960, 500], push: 0.10 }, note: 'Jahandar Shah wins the crown', draw(lt, d, t) { dayCourt(t); person('jahandar', { x: 960, y: 800, h: 560, t }); K.ribbon('JAHANDAR SHAH', 960, 140, pop(lt, ja + 0.4), 62); } });
    ev(s, 'court'); ev(s + ja + 0.4, 'stamp'); }
  { const s = at(37), be = Wd('beside', 37) - s, zu = Wd('minister', 38) - s;
    add({ id: 'B3d', at: s, cam: { pan: [[960, 520], [1300, 520]], push: 0.08 }, note: 'pan from the emperor to Zulfikar Khan with his ledger', draw(lt, d, t) { dayCourt(t); person('jahandar', { x: 960, y: 800, h: 520, t }); person('zulfikar', { x: 1380, y: FLOOR + 20, h: 560, t, k: 1, dir: -1, arm: 30 });
      K.slip('THE REAL POWER', 1380, 165, pop(lt, be), 0.0, 42, { color: P.crimson }); K.slip('ZULFIKAR KHAN · CHIEF MINISTER', 1380, 300, pop(lt, zu), 0.0, 34); } });
    ev(s + be, 'pop'); ev(s + zu, 'slip'); ev(s + zu + 1.6, 'write', { gain: 0.5 }); }
  { const s = at(39), cr = Wd('crown', 39) - s, ke = Wd('keys', 39) - s;
    add({ id: 'B3e', at: s, cam: { at: [960, 480], push: 0.06 }, note: 'crown on the left, the keys of the empire on the right', draw(lt, d, t) { K.parchment(39); person('jahandar', { x: 560, y: FLOOR, h: 500, t }); person('zulfikar', { x: 1360, y: FLOOR, h: 520, t, k: 2, dir: -1, prop: null, arm: 50 });
      K.crown(560, 220, pop(lt, cr) * 0.7); keys(1300, 340 + Math.sin(t * 2) * 6, pop(lt, ke) * 0.9, Math.sin(t) * 0.1); K.slip('THE CROWN', 560, 110, pop(lt, cr + 0.1), -0.03, 40); K.slip('THE KEYS', 1360, 110, pop(lt, ke + 0.1), 0.03, 40, { color: P.crimson }); } });
    ev(s + cr, 'crown', { gain: 0.5, dur: 0.5 }); ev(s + ke, 'coin', { gain: 0.7 }); }
  { const s = at(40), mo = Wd('money', 40) - s;
    add({ id: 'B3f', at: s, cam: { at: [960, 540], push: 0.08 }, note: 'Zulfikar Khan opens the treasury chest: almost empty', draw(lt, d, t) { dayCourt(t, { throne: false }); person('zulfikar', { x: 640, y: FLOOR + 30, h: 520, t, arm: 50, brows: 'worried', prop: null }); K.chest(1120, FLOOR + 10, 1.3, eo(clamp((lt - 0.2) / 0.5)), 0.08);
      K.slip('THE TREASURY: EMPTY', 1120, 380, pop(lt, mo), 0.03, 44, { color: P.crimson }); } });
    ev(s + 0.2, 'thump', { gain: 0.6 }); ev(s + mo, 'slip'); ev(s + mo + 0.4, 'coin', { gain: 0.4 }); }
  { const s = at(41), iz = Wd('izara', 41) - s, fa = Wd('farming', 41) - s;
    add({ id: 'B3g1', at: s, cam: { pan: [[820, 540], [1080, 520]], push: 0.05 }, note: 'revenue farming: farmers harvest the fields while a noble on a platform gives orders', draw(lt, d, t) { K.parchment(41); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 700); K.field(500, 900, t, 1);
      for (let i = 0; i < 4; i++) { const x = 260 + i * 300, bend = 0.3 + 0.12 * Math.sin(t * 3 + i), dir = i % 2 ? -1 : 1; ctx.save(); ctx.translate(x, 870); ctx.rotate(bend * dir); ctx.translate(-x, -870); peasant(x, 870, 320, t, i, dir); ctx.restore(); sickle(x + dir * 110, 800, t, i); }
      cut(P_rr(1440, 640, 340, 70, 8), P.sandDark); K.figure({ x: 1620, y: 650, h: 430, t, k: 7, jama: P.wine, turban: P.gold, sash: P.gold, beard: 'black', arm: 75 + 15 * Math.sin(t * 4), prop: null, dir: -1 }); K.ledger(1500, 560, 0.55, 0.1);
      K.slip('IZARA', 620, 150, pop(lt, iz), -0.03, 52, { color: P.crimson }); K.slip('REVENUE FARMING', 1120, 160, pop(lt, fa), 0.02, 44); K.slip('the revenue farmer', 1620, 140 + 60, pop(lt, fa + 0.4), -0.02, 28, { pin: null }); } });
    ev(s + 0.2, 'court', { gain: 0.4 }); ev(s + iz, 'slip'); ev(s + fa, 'pop'); ev(s + fa + 0.4, 'pop', { gain: 0.3 }); }
  { const s = at(42), ta = Wd('taxes', 42) - s, bi = Wd('bid', 42) - s, mo = Wd('most', 42) - s;
    add({ id: 'B3g2', at: s, cam: { at: [960, 520], push: 0.06 }, note: 'auction: bidders pile up coins for the right to collect one district’s taxes; the highest bid wins the scroll', draw(lt, d, t) { dayCourt(t, { throne: false }); person('zulfikar', { x: 360, y: FLOOR + 40, h: 520, t, arm: 80, prop: null });
      const win = clamp((lt - mo) / 0.7), sx = lerp(480, 1500, eo(win)), sy = lerp(470, 470, win) - Math.sin(win * Math.PI) * 120; K.farman(sx, sy, 0.3, 1, 1, -0.1); K.slip("ONE DISTRICT'S TAXES", 560, 250, pop(lt, ta), -0.03, 34);
      [[880, 1], [1190, 2], [1500, 3]].forEach(([x, n], i) => { K.figure({ x, y: FLOOR + 40, h: 400, t, k: i + 2, jama: [P.royal, P.sepia, P.wine][i], turban: P.cream, beard: 'black', arm: lt > bi ? 110 : 30, dir: -1 }); const stack = 1 + Math.round(n * 2 * clamp((lt - bi + 0.8 - i * 0.2) / 0.8)); for (let c = 0; c < stack; c++) K.coin(x - 100, FLOOR + 20 - c * 20, 0.8); });
      K.slip('HIGHEST BID WINS', 1500, 290, pop(lt, mo + 0.3), 0.03, 40, { color: P.crimson }); } });
    ev(s + ta, 'slip'); ev(s + bi - 0.8, 'coin', { gain: 0.6 }); ev(s + bi, 'coin'); ev(s + mo, 'slide', { gain: 0.6 }); ev(s + mo + 0.3, 'stamp'); }
  { const s = at(43), ca = Wd('cash', 43) - s, sq = Wd('squeeze', 43) - s, pe = Wd('peasants', 43) - s;
    add({ id: 'B3g3', at: s, cam: { pan: [[1100, 540], [860, 540]], push: 0.05 }, note: 'coins pour into the treasury; the revenue farmer’s man carries off the peasant’s grain', draw(lt, d, t) { K.parchment(43); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 1300); cut(P_rr(-400, FLOOR, W + 800, 400), '#9C8C70', { shadow: 0, edge: 0 });
      K.chest(1520, FLOOR, 1.1, 1, clamp((lt - ca) / 1.5)); for (let i = 0; i < 5; i++) { const k = ((lt - ca + i * 0.3) % 1.5) / 1.5; if (lt > ca) K.coin(lerp(1150, 1520, k), 560 - Math.sin(k * Math.PI) * 140 + k * 200, 0.7, k * 6); }
      const take = clamp((lt - sq) / 1.4); peasant(400, FLOOR, 430, t, 1, 1); sack(600, FLOOR, 1.0, 1 - take * 0.75); K.figure({ x: 880, y: FLOOR, h: 440, t, k: 5, jama: P.wine, turban: P.cream, beard: 'black', arm: 60, prop: null, dir: -1 }); if (take > 0) sack(lerp(780, 1080, take), FLOOR - 40 * Math.sin(take * Math.PI), 0.6, 1);
      K.slip('QUICK CASH', 1520, 300, pop(lt, ca), 0.03, 44); K.slip('PEASANTS SQUEEZED', 560, 300, pop(lt, pe), -0.03, 40, { color: P.crimson }); } });
    ev(s + ca, 'coin'); ev(s + ca + 0.8, 'coin', { gain: 0.6 }); ev(s + sq, 'thump'); ev(s + pe, 'slip'); }
  { const s = at(44), ab = Wd('abolished', 44) - s;
    add({ id: 'B3h', at: s, cam: { at: [960, 520], push: 0.08 }, note: 'tax ledger: JIZYA struck out', draw(lt, d, t) { K.parchment(44); cut(P_rr(560, 200, 800, 600, 6), P.cream); line([[960, 210], [960, 790]], 'rgba(62,44,30,0.3)', 3);
      K.label('JIZYA', 760, 360, 64, P.ink); K.label('tax on non-Muslims', 760, 440, 30, P.sepia); for (let i = 0; i < 6; i++) line([[1010, 300 + i * 70], [1300, 300 + i * 70]], 'rgba(62,44,30,0.35)', 4);
      if (lt > ab) { const k = clamp((lt - ab) / 0.4); line([[620, 380], [lerp(620, 900, k), 340]], P.crimson, 12); } K.seal(1180, 640, pop(lt, ab + 0.4) * 0.9); K.slip('ABOLISHED', 760, 620, pop(lt, ab + 0.3), -0.04, 50, { color: P.crimson }); } });
    ev(s, 'slip'); ev(s + ab, 'write'); ev(s + ab + 0.4, 'stamp'); }
  { const s = at(45), ye = Wd('year', 45) - s, ea = Wd('east', 46) - s, ar = Wd('army', 46) - s;
    add({ id: 'B3i', at: s, cam: { at: [1060, 380], push: 0.06, z0: 1.2 }, note: 'map: a short reign bar; an army forms at Patna in the east', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Delhi', label: 'DELHI', p: 1 }, { place: 'Patna', label: 'PATNA', p: pop(lt, ea), dy: 54 }] });
      cut(P_rr(560, 130, 800, 30, 15), P.cream, { shadow: 0.4 }); rr(560, 130, 800 * clamp((lt - 0.2) / (ye + 0.2)), 30, 15); ctx.fillStyle = P.crimson; ctx.fill(); K.label('1712', 560, 100, 28); K.label('1713', 1360, 100, 28);
      const [px, py] = proj(85.1, 25.6); if (lt > ar) soldiers(px - 90, py + 20, 3, 0.35 * pop(lt, ar), t, P.royal, 60); } });
    ev(s + 0.2, 'slide', { gain: 0.5 }); ev(s + ea, 'pop'); ev(s + ar, 'march', { dur: 1.5 }); }

  // ════════════ B4 · 1713 · ENTER THE KINGMAKERS ════════════
  { const s = beat(47, '1713', 'ENTER THE KINGMAKERS'), al = Wd('allies', 48) - s;
    add({ id: 'B4a', at: s, whip: true, cam: { at: [960, 480], push: 0.08 }, note: 'Farrukhsiyar, young and nervous; two empty outlines behind', draw(lt, d, t) { K.parchment(47); person('farrukh', { x: 960, y: FLOOR, h: 580, t, halo: false }); K.ribbon('FARRUKHSIYAR', 960, 140, pop(lt, 1.5), 60);
      for (const [x, k] of [[560, 0], [1360, 1]]) { const p = pop(lt, al + k * 0.2); if (p > 0) { ctx.save(); ctx.globalAlpha = 0.5 * p; person(k ? 'hussain' : 'abdullah', { x, y: FLOOR, h: 620, t, k, silhouette: true, dir: k ? -1 : 1 }); ctx.restore(); } } } });
    ev(s + 1.5, 'stamp', { gain: 0.6 }); ev(s + al, 'pop', { gain: 0.5 }); ev(s + al + 0.2, 'pop', { gain: 0.5 }); }
  { const s = at(49), so = Wd('soldiers', 50) - s, ar = Wd('armies', 50) - s;
    add({ id: 'B4b', at: s, cam: { at: [960, 500], push: 0.08, snaps: [{ t: 0.05, z: 1.06 }] }, note: 'the Sayyid brothers step in: matching turbans; armies behind', draw(lt, d, t) { K.parchment(49); if (lt > ar) soldiers(240, 640, 17, 0.8 * pop(lt, ar), t, P.mughal, 90);
      person('abdullah', { x: 760, y: FLOOR, h: 640, t, brows: 'cold' }); person('hussain', { x: 1160, y: FLOOR, h: 640, t, k: 1, dir: -1, brows: 'cold' }); K.slip('THE SAYYID BROTHERS', 960, 120, pop(lt, 0.1), -0.02, 56, { color: P.crimson }); K.slip('A FAMILY OF SOLDIERS', 1560, 330, pop(lt, so), 0.03, 34); } });
    ev(s, 'step'); ev(s + 0.1, 'stamp'); ev(s + so, 'slip'); ev(s + ar, 'march', { dur: 1.6 }); ev(L(50), 'pop', { gain: 0.3 }); }
  { const s = at(51), hu = Wd('Hussain', 52) - s;
    add({ id: 'B4c', at: s, cam: { pan: [[700, 480], [1220, 480]], push: 0.06 }, note: 'name cards: Abdullah Khan (ledger), Hussain Ali (sword)', draw(lt, d, t) { K.parchment(51); person('abdullah', { x: 700, y: FLOOR, h: 620, t, brows: 'cold', arm: 30 }); person('hussain', { x: 1220, y: FLOOR, h: 620, t, k: 1, dir: -1, brows: 'cold', arm: 40 });
      K.slip('ABDULLAH KHAN', 700, 150, pop(lt, 0.2), -0.03, 44); K.slip('also called HASSAN ALI', 700, 240, pop(lt, 1.5), 0.02, 30, { pin: null }); K.slip('HUSSAIN ALI', 1220, 150, pop(lt, hu), 0.03, 44); K.slip('the younger brother', 1220, 240, pop(lt, hu + 0.3), -0.02, 30, { pin: null }); } });
    ev(s + 0.2, 'slip'); ev(s + 1.5, 'pop', { gain: 0.4 }); ev(s + hu, 'slip'); ev(s + hu + 0.3, 'pop', { gain: 0.4 }); }
  { const s = at(53), de = Wd('Delhi', 53) - s;
    add({ id: 'B4d', at: s, cam: { at: [1020, 320], push: 0.06, z0: 1.4 }, note: 'map: march from Patna on Agra and Delhi', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Patna', label: 'PATNA', p: 1, dy: 54 }, { place: 'Delhi', label: 'DELHI', p: pop(lt, de), pulse: lt > de }] });
      const h = K.route([[85.1, 25.6], [83, 25.4], [80.4, 26.4], [78.0, 27.2], [77.2, 28.6]], clamp(lt / (de + 0.3)), P.mughal, K.VIEW, (x, y) => K.flag(x, y + 20, 0.4, t, P.mughal)); } });
    ev(s, 'march', { dur: 3.2 }); ev(s + 1.6, 'pop', { gain: 0.4 }); ev(s + de, 'pop'); }
  { const s = at(54), th = Wd('throne', 54) - s, li = Wd('life', 54) - s;
    add({ id: 'B4e', at: s, cam: { at: [960, 600], push: 0.08 }, note: 'Jahandar’s crown topples; a candle goes out (no violence)', draw(lt, d, t) { nightCourt(t); K.ribbon('1713', 960, 140, pop(lt, 0.2), 70); const p = clamp((lt - th) / 0.9); K.crown(lerp(960, 1300, eo(p)), lerp(560, 860, p * p), 0.8, p * 4, { plume: false }); K.candle(620, 880, 1, t, clamp((lt - li) / 0.6)); } });
    ev(s + 0.2, 'slip'); ev(s + th, 'crown', { dur: 1 }); ev(s + li, 'snuff'); }
  { const s = at(55), mi = Wd('minister', 56) - s, ar = Wd('army', 56) - s;
    add({ id: 'B4f', at: s, cam: { at: [960, 480], push: 0.08 }, note: 'Farrukhsiyar enthroned; the brothers take the top jobs', draw(lt, d, t) { dayCourt(t); person('farrukh', { x: 960, y: 760, h: 480, t }); person('abdullah', { x: 520, y: FLOOR + 40, h: 560, t, k: 1 }); person('hussain', { x: 1400, y: FLOOR + 40, h: 560, t, k: 2, dir: -1 });
      K.slip('CHIEF MINISTER', 520, 160, pop(lt, mi), -0.03, 40); K.slip('ARMY', 1400, 160, pop(lt, ar), 0.03, 52, { color: P.crimson }); if (lt > ar) K.flag(1600, FLOOR, 1.2, t, P.mughal); } });
    ev(s, 'court'); ev(s + mi, 'slip'); ev(s + ar, 'stamp'); }
  { const s = at(57), cr = Wd('crown', 57) - s, go = Wd('government', 57) - s;
    add({ id: 'B4g', at: s, cam: { at: [960, 440], push: 0.10 }, note: 'gold puppet strings appear from the brothers’ hands', draw(lt, d, t) { K.parchment(57); person('farrukh', { x: 960, y: FLOOR, h: 520, t, arm: 20 + Math.sin(t * 2) * 10 }); person('abdullah', { x: 520, y: 520, h: 420, t, k: 1, arm: 60 }); person('hussain', { x: 1400, y: 520, h: 420, t, k: 2, dir: -1, arm: 60 });
      K.puppetStrings([[600, 200], [1320, 200]], [[930, 430], [1000, 560]], t, clamp((lt - cr - 0.2) / 0.8)); K.slip('THE CROWN', 960, 140, pop(lt, cr), -0.02, 40); K.slip('THE GOVERNMENT', 960, 245, pop(lt, go), 0.02, 40, { color: P.crimson }); } });
    ev(s + cr, 'pop', { gain: 0.5 }); ev(s + cr + 0.2, 'slide', { gain: 0.6 }); ev(s + go, 'stamp'); }
  { const s = at(58), ji = Wd('again', 58) - s, pi = Wd('pilgrimage', 58) - s;
    add({ id: 'B4h', at: s, cam: { at: [960, 520], push: 0.07 }, note: 'ledger: JIZYA and PILGRIMAGE TAX struck out', draw(lt, d, t) { K.parchment(58); cut(P_rr(460, 220, 1000, 540, 6), P.cream);
      K.label('JIZYA', 700, 400, 60); K.label('PILGRIMAGE TAX', 1180, 400, 52); if (lt > ji - 0.4) line([[560, 410], [lerp(560, 840, clamp((lt - ji + 0.4) / 0.4)), 380]], P.crimson, 12); if (lt > pi) line([[950, 410], [lerp(950, 1410, clamp((lt - pi) / 0.4)), 380]], P.crimson, 12); K.slip('ABOLISHED AGAIN', 960, 620, pop(lt, ji), -0.03, 46, { color: P.crimson }); } });
    ev(s + ji - 0.4, 'write'); ev(s + ji, 'slip'); ev(s + pi, 'write'); }

  // re-hook: 1717 · A SMALL FAVOUR
  { const s = beat(59, '1717', 'A SMALL FAVOUR'), fa = Wd('royal', 59) - s;
    add({ id: 'B4i', at: s, whip: true, cam: { at: [960, 520], push: 0.10 }, note: 'a farman unrolls and is sealed', draw(lt, d, t) { K.parchment(59); K.farman(960, 540, 1.25, clamp((lt - 1.3) / 0.7), pop(lt, d - 0.6)); K.slip('ROYAL ORDERS: FARMANS', 960, 140, pop(lt, fa), -0.02, 44); } });
    ev(s + 1.3, 'slip'); ev(s + fa, 'pop', { gain: 0.5 }); ev(L(60) - 0.7, 'stamp'); }
  { const s = at(60), be = Wd('Bengal', 60) - s, du = Wd('duty', 60) - s;
    const v = { cx: 87.6, cy: 23.4, s: 120 };
    add({ id: 'B4j', at: s, cam: { at: [960, 520], push: 0.06 }, note: 'Bengal: a crimson pin at Calcutta, 1717 farmans; a Company ship sails up', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, v, pins: [{ place: 'Calcutta', label: 'CALCUTTA · 1717 FARMANS', p: pop(lt, be - 0.3), color: P.eic, pulse: true, dy: -70, size: 34 }] });
      const hd = K.route([[88.2, 21.4], [88.15, 21.9], [88.3, 22.3], [88.4, 22.6]], clamp(lt / 3), P.eic, v, (x, y, a) => { ctx.save(); ctx.translate(x, y); ctx.scale(0.5, 0.5); cut(P_poly([[-80, -20], [80, -20], [60, 20], [-60, 20]]), P.sepia, { shadow: 0.5 }); line([[0, -20], [0, -130]], P.ink, 6); cut(P_poly([[0, -130], [70, -110], [0, -90]]), P.eic, { shadow: 0.3, edge: 2 }); ctx.restore(); });
      K.statCard('DUTY FREE', 'TRADE IN BENGAL', 560, 330, pop(lt, du)); } });
    ev(s, 'map'); ev(s + be - 0.3, 'pop'); ev(s + du, 'stamp'); ev(s + 0.4, 'slide', { gain: 0.4, dur: 2 }); }
  { const s = at(61), sm = Wd('small', 61) - s, be = Wd('Bengal', 61) - s;
    const v = { cx: 87.6, cy: 23.6, s: 70 };
    const BEN = [[86.0, 21.6], [86.5, 24.8], [87.8, 25.6], [89.5, 26.3], [92.0, 25.1], [92.4, 22.0], [90.0, 21.6]];
    add({ id: 'B4k', at: s, cam: { at: [960, 540], push: 0.10 }, note: 'a small coin; Bengal’s outline pulses crimson (foreshadow)', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, v, pins: [{ place: 'Calcutta', p: 1, color: P.eic, pulse: true }] });
      K.coin(1500, 300, pop(lt, sm) * 1.2); K.slip('A SMALL FAVOUR', 1500, 420, pop(lt, sm + 0.2), 0.03, 40);
      if (lt > be - 0.6) { const k = 0.5 + 0.5 * Math.sin((lt - be) * 6); ctx.save(); P_poly(BEN.map(([a, b]) => proj(a, b, v)))(); ctx.setLineDash([16, 10]); ctx.strokeStyle = `rgba(168,50,45,${0.5 + 0.5 * k})`; ctx.lineWidth = 8; ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } } });
    ev(s + sm, 'coin'); ev(s + sm + 0.2, 'slip'); ev(s + be - 0.6, 'thump', { gain: 0.6 }); ev(s + be + 0.8, 'pop', { gain: 0.3 }); }
  { const s = at(62), hi = Wd('him', 62) - s, op = Wd('opposite', 63) - s;
    add({ id: 'B4l', at: s, cam: { at: [960, 620], push: 0.04, snaps: [{ t: op - 0.2, z: 0.82, at: [960, 470] }] }, note: '★ Farrukhsiyar smiles; the camera pulls back: strings lead up to the brothers', draw(lt, d, t) { dayCourt(t); const jerk = lt > op ? Math.sin((lt - op) * 10) * 20 * Math.exp(-(lt - op) * 2) : 0; person('farrukh', { x: 960, y: 760, h: 480, t, smile: lt < op, brows: lt > op ? 'worried' : null, arm: lt > op ? 70 + jerk : 10 });
      person('abdullah', { x: 600, y: 140, h: 260, t, k: 1, arm: 50 }); person('hussain', { x: 1320, y: 140, h: 260, t, k: 2, dir: -1, arm: 50 }); K.puppetStrings([[640, 30], [1280, 30]], [[940, 360], [1010, 520]], t, 1); K.slip('WORKED FOR HIM?', 1500, 520, pop(lt, hi), 0.04, 40); } });
    ev(s + hi, 'slip'); ev(s + op - 0.2, 'whip', { gain: 0.6 }); cue(Le(63) - 0.1, 'sting'); EV.push({ t: Le(63) - 0.1, kind: 'sting' }); }

  // ════════════ B5 · 1719 · THE FIRST REGICIDE ════════════
  { const s = beat(64, '1719', 'THE FIRST REGICIDE'), pl = Wd('plotted', 64) - s, no = Wd('noble', 65) - s;
    add({ id: 'B5a', at: s, whip: true, cam: { pan: [[820, 520], [1100, 520]], push: 0.06 }, note: 'night: Farrukhsiyar writes secret letters; they fly to nobles', draw(lt, d, t) { K.nightPage(64); cut(P_rr(300, 640, 700, 50, 6), P.sepia); K.candle(860, 640, 0.8, t); person('farrukh', { x: 520, y: FLOOR, h: 460, t, arm: 30 + Math.sin(t * 10) * 4, brows: 'worried' });
      for (let i = 0; i < 4; i++) { const p = clamp((lt - no - i * 0.5) / 1); if (p > 0 && p < 1) letter(lerp(760, 1500, eo(p)), lerp(560, 300 + i * 90, p) - Math.sin(p * Math.PI) * 120, 0.8, p * 2); } silhouetteRow(3, 1350, FLOOR, 200, 380, t, '#2A211A', 4);
      K.slip('SECRET LETTERS', 760, 150, pop(lt, pl), -0.03, 44); } });
    ev(s + 1.4, 'write', { dur: 2 }); ev(s + pl, 'slip'); [0, 1, 2, 3].forEach((i) => ev(s + no + i * 0.5, 'slide', { gain: 0.4 })); }
  { const s = at(66), su = Wd('suspicious', 66) - s;
    add({ id: 'B5b', at: s, cam: { at: [960, 400], push: 0.14 }, note: 'the brothers, close: cold, suspicious eyes', draw(lt, d, t) { K.nightPage(66); person('abdullah', { x: 760, y: 1000, h: 820, t, brows: 'cold', prop: null }); person('hussain', { x: 1160, y: 1000, h: 820, t, k: 1, dir: -1, brows: 'cold', prop: null }); K.letter && 0; letter(960, 200, pop(lt, su) * 1.4, 0.1); K.slip('SUSPICIOUS', 960, 320, pop(lt, su + 0.3), -0.03, 40, { color: P.crimson }); } });
    ev(s, 'hush', { silent: false }); ev(s + su, 'pop'); ev(s + su + 0.3, 'slip'); }
  { const s = at(67), fi = Wd('first', 67) - s, no = Wd('north', 68) - s, ma = Wd('Maratha', 69) - s, pe = Wd('Peshwa', 69) - s;
    add({ id: 'B5c', at: s, cam: { pan: [[760, 560], [820, 320]], push: 0.05, z0: 1.25 }, note: 'map: Hussain Ali marches north from the Deccan; Maratha troops join', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Aurangabad', label: 'DECCAN', p: 1, dy: 54 }, { place: 'Satara', p: pop(lt, ma - 0.3), color: P.maratha }, { place: 'Delhi', label: 'DELHI', p: 1, pulse: lt > no }] });
      if (lt > fi) K.crossedSwords(...proj(76, 23), pop(lt, fi) * 0.8); K.route([[75.3, 19.9], [76.2, 22.6], [77.0, 25.4], [77.2, 28.6]], clamp((lt - no) / 5), P.mughal, K.VIEW, (x, y) => K.flag(x, y + 10, 0.45, t, P.mughal));
      K.route([[74.0, 17.7], [74.6, 19.6], [75.6, 22.6], [76.4, 25.4], [76.9, 28.3]], clamp((lt - ma) / 4.5), P.maratha, K.VIEW, (x, y) => K.flag(x, y + 10, 0.45, t, P.maratha));
      K.slip('PESHWA BALAJI VISHWANATH', 1400, 300, pop(lt, pe), -0.02, 32); K.slip('(per historian Rajiv Ahir)', 1400, 380, pop(lt, pe + 0.4), 0.02, 24, { pin: null }); } });
    ev(s + fi, 'sword'); ev(s + no, 'march', { dur: 3 }); ev(s + ma, 'march', { dur: 3, gain: 0.8 }); ev(s + ma - 0.3, 'pop'); ev(s + pe, 'slip'); ev(s + pe + 2, 'pop', { gain: 0.3 }); ev(Wd('historian', 69), 'pop', { gain: 0.3 }); }
  { const s = at(70), se = Wd('seized', 70) - s;
    add({ id: 'B5d', at: s, cam: { at: [960, 480], push: 0.08 }, note: 'night palace: the brothers’ green banners rise on the walls', draw(lt, d, t) { K.nightPage(70); K.gate(960, FLOOR, 1.2); cut(P_rr(-400, FLOOR, W + 800, 400), '#2C2420', { shadow: 0, edge: 0 }); for (let i = 0; i < 5; i++) { const p = pop(lt, se + i * 0.15); if (p > 0) K.flag(300 + i * 330, 380 + (1 - p) * 200, 1.0, t, P.mughal, i); } K.torch(500, 700, 0.9, t); K.torch(1420, 700, 0.9, t, 2); K.ribbon('FEB 1719', 960, 140, pop(lt, 0.2), 60); } });
    ev(s + 0.2, 'slip'); ev(s, 'march', { gain: 0.6, dur: 2 }); ev(s + se, 'thump'); ev(s + se + 0.5, 'pop', { gain: 0.4 }); }
  { const s = at(71), dr = Wd('dragged', 71) - s, bl = Wd('blinded', 71) - s, lo = Wd('locked', 71) - s;
    add({ id: 'B5e', at: s, cam: { at: [960, 560], push: 0.08 }, note: 'guards drag Farrukhsiyar out; a blindfold; prison bars come down (nothing violent shown)', draw(lt, d, t) { nightCourt(t); const ex = lerp(1150, 760, eio(clamp((lt - dr) / 1.6)));
      dragGroup(ex, t, lt, 460, bl); if (lt > lo) bars(960, 1000, 1100, 1000, clamp((lt - lo) / 0.6));
      K.slip('DRAGGED OUT', 520, 200, pop(lt, dr), -0.03, 40); K.slip('BLINDED', 960, 140, pop(lt, bl), 0.02, 44, { color: P.crimson }); } });
    ev(s + dr, 'step'); ev(s + dr + 0.6, 'step'); ev(s + bl, 'slide', { gain: 0.5 }); ev(s + lo, 'slam'); }
  { const s = at(72), ki = Wd('killed', 72) - s;
    add({ id: 'B5f', at: s, cam: { at: [960, 520], push: 0.12 }, note: 'prison bars; a second candle goes out', draw(lt, d, t) { K.nightPage(72, 0.9); K.candle(960, 760, 1.4, t, clamp((lt - ki) / 0.8)); bars(960, 1000, 1200, 1100, 1); K.slip('WITHIN WEEKS', 960, 160, pop(lt, 0.2), -0.03, 44); } });
    ev(s + 0.2, 'slip'); ev(s + ki, 'snuff', { gain: 1.2 }); }
  { const s = at(73), no = Wd('nobles', 73) - s;
    add({ id: 'B5g', at: s, cam: { pan: [[700, 480], [1260, 480]], push: 0.05 }, note: 'a row of crowns; the last one cracks crimson: 1719', draw(lt, d, t) { K.parchment(73); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = i < 5 ? 0.45 + i * 0.08 : 1; K.crown(300 + i * 260, 480, 0.75, 0, { plume: false }); ctx.restore(); }
      if (lt > 0.6) cracks(1600, 470, clamp((lt - 0.6) / 1), 5, P.crimson); K.ribbon('1719', 1600, 700, pop(lt, 0.6), 60); K.slip('KILLED BY HIS OWN NOBLES', 960, 200, pop(lt, no), -0.02, 48, { color: P.crimson }); } });
    ev(s + 0.6, 'stamp'); ev(s + no, 'slip'); }
  { const s = at(74), tr = Wd('truth', 74) - s, ar = Wd('army', 75) - s;
    add({ id: 'B5h', at: s, cam: { at: [960, 500], push: 0.10 }, note: 'the throne tied to a sword: WHOEVER HELD THE ARMY', draw(lt, d, t) { dayCourt(t); K.sword(1500, 860, 2.6 * pop(lt, ar - 0.4), -0.2); if (lt > ar) K.puppetStrings([[1470, 380]], [[1050, 560], [880, 560]], t, clamp((lt - ar) / 0.6)); K.slip('THE TRUTH', 960, 150, pop(lt, tr), -0.02, 46); K.slip('WHOEVER HELD THE ARMY', 960, 250, pop(lt, ar + 0.2), 0.02, 40, { color: P.crimson }); } });
    ev(s + tr, 'slip'); ev(s + ar - 0.4, 'sword'); ev(s + ar + 0.2, 'stamp'); }

  // ════════════ B6 · 1719 · FOUR EMPERORS ════════════
  const CR = [{ year: '1713', label: 'FARRUKHSIYAR' }, { year: 'FEB 1719', label: 'RAFI-UD-DARAJAT' }, { year: 'JUN 1719', label: 'SHAH JAHAN II' }, { year: 'SEP 1719', label: 'MUHAMMAD SHAH' }];
  { const s = beat(76, '1719', 'FOUR EMPERORS'), ch = Wd('chose', 76) - s;
    add({ id: 'B6a', at: s, whip: true, cam: { pan: [[860, 520], [1060, 520]], push: 0.06 }, note: 'the brothers choose from a row of thin, pale princes', draw(lt, d, t) { K.parchment(76); for (let i = 0; i < 4; i++) person(i % 2 ? 'rafi2' : 'rafi1', { x: 900 + i * 230, y: FLOOR, h: 440, t, k: i, halo: false }); person('abdullah', { x: 360, y: FLOOR, h: 560, t, arm: lt > ch ? 85 : 20, prop: null }); person('hussain', { x: 560, y: FLOOR, h: 560, t, k: 1, brows: 'cold' }); K.slip('CHOSEN', 900, 280, pop(lt, ch + 0.2), 0.04, 40, { color: P.crimson }); } });
    ev(s + 1.4, 'court', { gain: 0.6 }); ev(s + ch, 'pop'); }
  { const s = at(77), mo = Wd('months', 78) - s;
    add({ id: 'B6b', at: s, cam: { at: [960, 480], push: 0.08 }, note: 'puppet 1 on the throne: Rafi-ud-Darajat, just over three months', draw(lt, d, t) { dayCourt(t); person('rafi1', { x: 960, y: 760, h: 440, t }); K.puppetStrings([[700, 0], [1220, 0]], [[930, 380], [1000, 500]], t, clamp(lt / 0.8)); K.throneCarousel(CR, 1, 1500, 300, 0.6); K.statCard('3 MONTHS', 'FEB – JUN 1719', 420, 380, pop(lt, mo)); } });
    ev(s, 'crown', { gain: 0.5, dur: 0.6 }); ev(s + 0.3, 'slide', { gain: 0.4 }); ev(s + mo, 'pop'); ev(L(78), 'pop', { gain: 0.3 }); ev(Wd('young', 77), 'pop', { gain: 0.3 }); }
  { const s = at(79), cr = Wd('crowned', 79) - s, to = Wd('too', 80) - s;
    add({ id: 'B6c', at: s, cam: { at: [960, 480], push: 0.08 }, note: 'puppet 2: Shah Jahan II, about three months too', draw(lt, d, t) { dayCourt(t); person(lt < cr ? 'rafi1' : 'rafi2', { x: 960, y: 760, h: 440, t }); K.puppetStrings([[700, 0], [1220, 0]], [[930, 380], [1000, 500]], t, 1); K.throneCarousel(CR, lerp(1, 2, eo(clamp((lt - cr) / 0.8))), 1500, 300, 0.6); K.statCard('3 MONTHS', 'JUN – SEP 1719', 420, 380, pop(lt, to - 0.6)); } });
    ev(s + cr, 'crown', { dur: 0.8 }); ev(s + to - 0.6, 'pop'); ev(L(80), 'pop', { gain: 0.3 }); }
  { const s = at(81), pu = Wd('puppet', 81) - s, se = Wd('seventeen', 82) - s, cr = Wd('crowned', 83) - s;
    add({ id: 'B6d', at: s, cam: { at: [960, 480], push: 0.08, snaps: [{ t: se, z: 1.08, at: [960, 420] }] }, note: 'empty strings dangle; a 17-year-old becomes Muhammad Shah', draw(lt, d, t) { dayCourt(t); const on = lt > se - 0.2; if (on) person('mshahTeen', { x: 960, y: 760, h: 420 * pop(lt, se - 0.2), t, halo: lt > cr });
      K.puppetStrings([[700, 0], [1220, 0]], on ? [[930, 400], [1000, 510]] : [[930, 500 + Math.sin(t * 3) * 30], [1000, 520 + Math.sin(t * 3 + 1) * 30]], t, 1); K.slip('A THIRD PUPPET', 420, 300, pop(lt, pu), -0.03, 40);
      K.statCard('17', 'RAUSHAN AKHTAR', 420, 520, pop(lt, se + 0.2)); K.throneCarousel(CR, lerp(2, 3, eo(clamp((lt - cr) / 0.8))), 1500, 300, 0.6); K.ribbon('MUHAMMAD SHAH', 960, 140, pop(lt, cr + 0.6), 54); } });
    ev(s + pu, 'slip'); ev(s + se - 0.2, 'pop'); ev(s + se, 'whip', { gain: 0.5 }); ev(s + cr, 'crown', { dur: 0.8 }); ev(s + cr + 0.6, 'stamp'); ev(Wd('September', 83), 'pop', { gain: 0.3 }); ev(Wd('prince', 82), 'pop', { gain: 0.3 }); }
  { const s = at(84), fo = Wd('Four', 84) - s;
    add({ id: 'B6e', at: s, cam: { at: [960, 460], push: 0.10 }, note: 'four crowns cycle onto the throne; four men, one year', draw(lt, d, t) { dayCourt(t, { throne: true }); const p = clamp((lt - fo) / (d - 1.2)) * 3.0; K.throneCarousel(CR, p, 960, 420, 1.1); K.puppetStrings([[700, 0], [1220, 0]], [[930, 330], [1000, 330]], t, 1); K.statCard('4 MEN', '1 YEAR', 1560, 640, pop(lt, d - 1)); } });
    for (let i = 0; i < 4; i++) ev(s + fo + i * (Le(85) - L(84) - 1.2) / 3, 'crown', { gain: 0.6, dur: 0.6 }); ev(s + Le(85) - L(84) - 0.9, 'pop'); }
  { const s = at(86), co = Wd('control', 86) - s, wr = Wd('wrong', 87) - s;
    add({ id: 'B6f', at: s, cam: { at: [960, 420], push: 0.04, snaps: [{ t: wr - 0.1, z: 1.25, at: [990, 330] }] }, note: '★ the teenager glances aside; a string frays', draw(lt, d, t) { dayCourt(t); person('mshahTeen', { x: 960, y: 760, h: 440, t, brows: lt > wr ? 'cold' : null });
      person('abdullah', { x: 520, y: FLOOR + 40, h: 520, t, k: 1, smile: lt > co, prop: null }); person('hussain', { x: 1400, y: FLOOR + 40, h: 520, t, k: 2, dir: -1, smile: lt > co, prop: null });
      K.puppetStrings([[700, 0], [1220, 0]], [[930, 400], [1000, 510]], t, 1, lt > wr ? 0.15 + 0.05 * Math.sin(t * 8) : 0); K.slip('EASY TO CONTROL?', 960, 140, pop(lt, co), -0.03, 44); } });
    ev(s + co, 'slip'); ev(s + wr - 0.1, 'snap', { gain: 0.6 }); cue(Le(87) - 0.05, 'sting'); EV.push({ t: Le(87) - 0.05, kind: 'sting' }); }

  // ════════════ B7 · 1720 · THE KINGMAKERS FALL ════════════
  { const s = beat(88, '1720', 'THE KINGMAKERS FALL'), al = Wd('allies', 88) - s;
    add({ id: 'B7a', at: s, whip: true, cam: { at: [960, 480], push: 0.08 }, note: 'Muhammad Shah waits; notes slide quietly to nobles', draw(lt, d, t) { nightCourt(t); person('mshahTeen', { x: 960, y: 760, h: 440, t }); for (let i = 0; i < 3; i++) { const p = clamp((lt - al - i * 0.4) / 0.8); if (p > 0 && p < 1) letter(lerp(1000, [300, 1600, 1700][i], eo(p)), lerp(600, 780, p), 0.5, p); } silhouetteRow(2, 220, FLOOR + 40, 160, 380, t, '#2A211A', 2); silhouetteRow(2, 1560, FLOOR + 40, 160, 380, t, '#2A211A', 6); K.slip('WAITING', 960, 140, pop(lt, 1.5), -0.03, 44); } });
    ev(s + 1.5, 'slip'); [0, 1, 2].forEach((i) => ev(s + al + i * 0.4, 'slide', { gain: 0.4 })); }
  { const s = at(89), ni = Wd('important', 89) - s;
    add({ id: 'B7b', at: s, cam: { at: [1080, 480], push: 0.08 }, note: 'Nizam-ul-Mulk in Deccan dress beside Muhammad Shah', draw(lt, d, t) { dayCourt(t); person('mshahTeen', { x: 800, y: 780, h: 440, t }); person('nizam', { x: 1300, y: FLOOR + 30, h: 600 * pop(lt, ni - 0.3), t, k: 3, dir: -1 }); K.slip('NIZAM-UL-MULK', 1300, 150, pop(lt, ni + 0.6), 0.03, 46); } });
    ev(s + ni - 0.3, 'step'); ev(s + ni + 0.6, 'slip'); }
  { const s = at(90), ar = Wd('army', 90) - s, mo = Wd('moved', 91) - s;
    add({ id: 'B7c', at: s, cam: { at: [860, 520], push: 0.06, z0: 1.2 }, note: 'map: Nizam’s army in the Deccan; two forces move on the brothers', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Hyderabad', label: 'DECCAN', p: 1, color: P.hyderabad, dy: 54 }, { place: 'Delhi', label: 'DELHI', p: 1 }] }); const [hx, hy] = proj(77.6, 19.2);
      if (lt > ar) soldiers(hx - 60, hy, 3, 0.45 * pop(lt, ar), t, P.hyderabad, 60); K.route([[77.6, 19.4], [77.4, 23.5], [77.3, 26.4]], clamp((lt - mo) / 2), P.hyderabad); K.route([[77.2, 28.6], [77.3, 27.4]], clamp((lt - mo) / 1.5), P.gold); } });
    ev(s + ar, 'march', { dur: 1.5 }); ev(s + mo, 'march', { dur: 2 }); ev(s + mo + 0.4, 'pop', { gain: 0.4 }); }
  { const s = at(92), mu = Wd('murdered', 92) - s;
    add({ id: 'B7d', at: s, cam: { at: [960, 520], push: 0.08 }, note: 'on the march: Hussain Ali’s banner falls (no violence)', draw(lt, d, t) { K.parchment(92); ctx.fillStyle = '#E7D7AE'; ctx.fillRect(-400, -400, W + 800, 1300); cut(P_rr(-400, FLOOR, W + 800, 400), P.sepia, { shadow: 0, edge: 0 }); for (let i = 0; i < 6; i++) cut(P_poly([[200 + i * 300, FLOOR], [300 + i * 300, FLOOR - 160], [400 + i * 300, FLOOR]]), '#C9B48A', { shadow: 0.3, edge: 2 });
      const fall = clamp((lt - mu) / 0.8); ctx.save(); ctx.translate(960, FLOOR); ctx.rotate(eo(fall) * 1.35); K.flag(0, 0, 2.2, t, P.mughal); ctx.restore(); K.ribbon('1720', 960, 140, pop(lt, 0.2), 70); K.slip('HUSSAIN ALI', 1460, 380, pop(lt, mu - 0.6), 0.03, 44); } });
    ev(s + 0.2, 'slip'); ev(s, 'march', { gain: 0.5, dur: 2 }); ev(s + mu, 'thump'); ev(s + mu + 0.8, 'hush'); }
  { const s = at(93), ba = Wd('battle', 93) - s, pr = Wd('prisoner', 93) - s;
    add({ id: 'B7e', at: s, cam: { at: [780, 330], push: 0.06, z0: 1.6 }, note: 'map: battle near Delhi; Abdullah Khan taken prisoner', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, pins: [{ place: 'Delhi', label: 'DELHI', p: 1, dy: -60 }] }); const [x, y] = proj(77.6, 27.9); if (lt > ba - 0.2) K.battle(x, y, t, 1.1); K.slip('ABDULLAH KHAN', x + 230, y + 30, pop(lt, 0.3), -0.03, 34); if (lt > pr) { ctx.save(); ctx.translate(x + 230, y + 150); ctx.scale(0.25, 0.25); bars(0, 0, 400, 400, clamp((lt - pr) / 0.5)); ctx.restore(); } } });
    ev(s + 0.3, 'slip'); ev(s + ba - 0.2, 'battle'); ev(s + ba, 'sword'); ev(s + pr, 'thump'); }
  { const s = at(94), po = Wd('poisoned', 94) - s;
    add({ id: 'B7f', at: s, cam: { at: [960, 560], push: 0.10 }, note: 'a prison cup set down; the candle goes out; 1722', draw(lt, d, t) { K.nightPage(94, 0.9); cut(P_rr(560, 780, 800, 40, 6), P.sepia); cup(880, 780, 1.4 * pop(lt, po - 0.4)); K.candle(1160, 780, 1, t, clamp((lt - po) / 0.7)); bars(960, 1060, 1300, 1100, 1); K.ribbon('1722', 960, 150, pop(lt, 0.3), 70); } });
    ev(s + 0.3, 'slip'); ev(s + po - 0.4, 'thump', { gain: 0.5 }); ev(s + po, 'snuff'); }
  { const s = at(95), go = Wd('gone', 95) - s, da = Wd('damage', 96) - s;
    add({ id: 'B7g', at: s, cam: { at: [960, 460], push: 0.08 }, note: 'the strings SNAP; Nizam stands beside Muhammad Shah; cracks spread', draw(lt, d, t) { dayCourt(t); person('mshahTeen', { x: 960, y: 760, h: 440, t }); person('nizam', { x: 1360, y: FLOOR + 30, h: 560, t, k: 3, dir: -1 });
      K.puppetStrings([[700, 0], [1220, 0]], [[930, 400], [1000, 510]], t, 1, clamp((lt - go + 0.1) / 0.6)); if (lt > da) cracks(960, 1000, clamp((lt - da) / 1.2), 7, P.ink); K.slip('THE KINGMAKERS: GONE', 960, 150, pop(lt, go), -0.02, 46, { color: P.crimson }); } });
    ev(s + go - 0.1, 'snap'); ev(s + go, 'slip'); ev(s + da, 'thump'); }

  // ════════════ B8 · TAKEAWAY ════════════
  { const s = beat(97, 'AFTER 1720', 'THE CENTRE CANNOT HOLD'), br = Wd('break', 97) - s, ce = Wd('centre', 98) - s;
    add({ id: 'B8a', at: s, whip: true, cam: { at: [960, 520], push: 0.08 }, note: 'a small emperor in a ring of nobles who grow larger; a crown cracks', draw(lt, d, t) { K.parchment(97); const g = clamp((lt - ce) / 1.5); person('mshahTeen', { x: 960, y: 700, h: lerp(380, 300, g), t });
      for (let i = 0; i < 6; i++) { const a = Math.PI + i / 5 * Math.PI; K.figure({ x: 960 + Math.cos(a) * 640, y: 820 + Math.sin(a) * -40, h: lerp(300, 460, g), t, k: i, jama: [P.hyderabad, P.awadh, P.bengal, P.maratha, P.sikh, P.jat][i], turban: P.cream, beard: 'black', dir: i < 3 ? 1 : -1 }); }
      K.crown(960, 280, 0.9); if (lt > br) cracks(960, 270, clamp((lt - br) / 0.6), 2, P.crimson); K.slip('NO LONGER THE CENTRE', 960, 130, pop(lt, ce), -0.02, 44); } });
    ev(s + 1.4, 'court'); ev(s + br, 'stamp'); ev(s + ce, 'slip'); ev(s + ce + 0.8, 'slide', { gain: 0.4 }); }
  { const s = at(99), go = Wd('governor', 99) - s, de = Wd('Deccan', 100) - s, aw = Wd('Awadh', 100) - s, be = Wd('Bengal', 100) - s, ki = Wd('kings', 100) - s;
    add({ id: 'B8b', at: s, cam: { at: [960, 470], push: 0.06, z0: 1.05 }, note: 'map: governors’ flags rise in the Deccan, Awadh and Bengal', draw(lt, d, t) { K.indiaMap({ t, mughal: 1 }); [[78.5, 17.4, P.hyderabad, 'DECCAN', de], [80.9, 26.8, P.awadh, 'AWADH', aw], [88.3, 24.2, P.bengal, 'BENGAL', be]].forEach(([lo, la, c, n, w]) => { const [x, y] = proj(lo, la); const p = pop(lt, w); if (p > 0) { K.flag(x, y, 0.7 * p, t, c); K.slip(n, x + 30, y + 50, p, 0.02, 30, { pin: null }); } });
      K.slip('RULING LIKE KINGS', 960, 140, pop(lt, ki), -0.02, 44, { color: P.crimson }); } });
    [0, 1, 2, 3, 4].forEach((i) => ev(s + go + i * 0.2, 'pop', { gain: 0.4 })); ev(s + de, 'pop'); ev(s + aw, 'pop'); ev(s + be, 'pop'); ev(s + ki, 'slip'); ev(Wd('followed', 100), 'pop', { gain: 0.3 }); ev(Wd('general', 99), 'pop', { gain: 0.3 }); ev(Wd('power', 99), 'pop', { gain: 0.3 }); }
  { const s = at(101), ow = Wd('Owen', 101) - s;
    const qs = L(102), words = T.words.filter((w) => w.line === 102);
    add({ id: 'B8c', at: s, cam: { at: [960, 520], push: 0.05 }, note: 'Sidney Owen’s verdict, word by word', draw(lt, d, t) { K.parchment(101); K.figure({ x: 300, y: FLOOR + 40, h: 520, t, jama: P.ink, turban: P.ink, beard: 'grey', silhouette: false, cap: null }); K.slip('SIDNEY OWEN · HISTORIAN', 300, 260, pop(lt, ow), -0.03, 30);
      const K0 = ['Bahadur', 'Shah', 'I,'], tw = ['"was', 'the', 'last', 'Emperor', 'of', 'whom', 'anything', 'favourable', 'can', 'be', 'said."'];
      const sw = words.filter((w) => /^(was|the|last|emperor|of|whom|anything|favourable|can|be|said)/i.test(w.w.replace(/[^a-z]/gi, ''))).slice(-11);
      const qw = tw.map((x, i) => ({ txt: x, hi: x === 'last' || x === 'favourable', t: (sw[i] ? sw[i].s : qs + 2 + i * 0.3) - s }));
      if (lt > qs - s - 0.2) { ctx.save(); K.quoteStrip([{ txt: 'Bahadur Shah I', hi: false, t: qs - s }, ...qw], 1120, 470, lt, { size: 56, maxW: 1100, speaker: 'Sidney Owen', source: 'quoted in R. Ahir, p. 67' }); ctx.restore(); }
      const hv = L(103) - s; K.slip('A HARSH VERDICT', 1120, 780, pop(lt, hv + 0.4), -0.03, 40, { color: P.crimson }); } });
    ev(s + ow, 'slip'); ev(L(102), 'write', { dur: 3 }); ev(L(102) + 3, 'pop', { gain: 0.3 }); ev(L(103) + 0.4, 'stamp'); ev(L(102) + 5.5, 'pop', { gain: 0.25 }); ev(L(103) + 2.2, 'pop', { gain: 0.25 }); }
  { const s = at(104), ba = Wd('battle', 104) - s, pr = Wd('prize', 105) - s, aw = Wd('away', 105) - s;
    add({ id: 'B8d', at: s, cam: { pan: [[820, 480], [1100, 480]], push: 0.06 }, note: 'no single battle; the crown passes hand to hand as a PRIZE', draw(lt, d, t) { dayCourt(t); K.crossedSwords(560, 300, pop(lt, ba) * 1.2); if (lt > ba + 0.3) line([[460, 200], [660, 400]], P.crimson, 10);
      silhouetteRow(5, 360, FLOOR + 30, 300, 420, t, '#3A2E26', 1); const k = clamp((lt - pr) / (d - (pr) - 0.3)); const xx = lerp(360, 1560, k), yy = 380 - Math.abs(Math.sin(k * Math.PI * 4)) * 80; K.crown(xx, yy, 0.6); prizeTag(xx + 120, yy, pop(lt, pr)); } });
    ev(s + ba, 'battle', { gain: 0.5 }); ev(s + ba + 0.3, 'write'); ev(s + pr, 'pop'); for (let i = 0; i < 4; i++) ev(s + pr + i * 0.9, 'slide', { gain: 0.35 }); ev(s + aw, 'pop', { gain: 0.4 }); }
  { const s = at(106), ye = Wd('years', 106) - s;
    add({ id: 'B8e', at: s, cam: { at: [860, 460], push: 0.08 }, note: 'tease: Muhammad Shah rules on (29 years)', draw(lt, d, t) { dayCourt(t); person('mshah', { x: 960, y: 760, h: 460, t }); K.statCard('29 YEARS', 'MUHAMMAD SHAH · 1719–1748', 480, 400, pop(lt, ye)); } });
    ev(s, 'court', { gain: 0.6 }); ev(s + ye, 'pop'); }
  { const s = at(107), pe = Wd('Persia', 108) - s, th = Wd('throne', 108) - s;
    add({ id: 'B8f', at: s, cam: { at: [820, 420], push: 0.12, z0: 1.1 }, note: 'tease: 1739; a turquoise arrow from Persia points at Delhi', draw(lt, d, t) { K.indiaMap({ t, mughal: 1, noCompass: true, pins: [{ place: 'Delhi', label: 'DELHI', p: 1, pulse: lt > th }] }); K.ribbon('1739', 1300, 230, pop(lt, 0.2), 80); persianArrow(K.VIEW, clamp((lt - pe + 0.4) / 1.6)); K.slip('PERSIA', ...proj(55.5, 34.2), pop(lt, pe), -0.03, 40); } });
    ev(s + 0.2, 'stamp'); ev(s + pe - 0.4, 'march', { dur: 2 }); ev(s + th, 'pop'); cue(Le(108) + 0.3, 'sting'); EV.push({ t: Le(108) + 0.3, kind: 'sting' }); ev(Le(108) + 1.2, 'pop', { gain: 0.2, silent: true }); }

  return { shots: S, cues: CUES, beats: BEATS, events: EV };
}
