// Boot: fonts → script + timing → captions → shots. draw(t) renders film time t (pure function of t).
// Camera per shot (cam.push / cam.pan / cam.snap), cam.whip between beats (0.30 s, motion-blurred, 6 sub-frames).
// window.OP is the API tools/capture.mjs drives: ready, bootError, duration(), draw(t), frame(t, q), cues(), shots(), events(), beats().
import { W, H, setCtx, ctx, clamp, lerp, eo, eio, eob } from './core/lib.js';
import { T, loadTiming } from './core/timing.js';
import { buildCaptions, drawCaption, captionList } from './core/captions.js';
import { beatCard, eraBar, beginLabels, flushLabels } from './core/kit.js';
import { buildShots } from './shots.js';

const cv = document.getElementById('cv'), main = cv.getContext('2d');
const off = document.createElement('canvas'); off.width = W; off.height = H; const offC = off.getContext('2d');
const off2 = document.createElement('canvas'); off2.width = W; off2.height = H; const offC2 = off2.getContext('2d');
setCtx(main);
const OP = (window.OP = { ready: false });
const WHIP = 0.3;

/** camera for a shot at local time lt (duration d): returns [cx, cy, zoom] */
function camAt(sh, lt, d) {
  const c = sh.cam || {}; let x = (c.at || [960, 540])[0], y = (c.at || [960, 540])[1];
  let z = 1 + (c.push ?? 0.07) * eio(clamp(lt / d));
  if (c.pan) { const k = eio(clamp(lt / d)); x = lerp(c.pan[0][0], c.pan[1][0], k); y = lerp(c.pan[0][1], c.pan[1][1], k); }
  if (c.z0) z *= c.z0;
  for (const s of c.snaps || []) { const k = eob(clamp((lt - s.t) / 0.15)); if (k > 0) { z *= lerp(1, s.z, k); if (s.at) { x = lerp(x, s.at[0], eo(clamp((lt - s.t) / 0.15))); y = lerp(y, s.at[1], eo(clamp((lt - s.t) / 0.15))); } } }
  return [x, y, z];
}
function drawShot(i, t) {
  const S = OP._shots, sh = S[i], end = i < S.length - 1 ? S[i + 1].at : T.dur, d = end - sh.at, lt = t - sh.at;
  const [x, y, z] = camAt(sh, lt, d), punch = sh.whip ? 1 : 1 + 0.035 * (1 - eo(clamp(lt / 0.22)));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z * punch, z * punch); ctx.translate(-x, -y);
  beginLabels(); sh.draw(lt, d, t); flushLabels(); ctx.restore(); ctx.globalAlpha = 1; ctx.letterSpacing = '0px'; ctx.filter = 'none';
  if (sh.ui) { sh.ui(lt, d, t); ctx.globalAlpha = 1; }
}
const shotIndex = (t) => { const S = OP._shots; let i = S.length - 1; while (i > 0 && S[i].at > t) i--; return i; };

function draw(t) {
  t = clamp(t, 0, T.dur - 1e-4);
  setCtx(main); main.setTransform(1, 0, 0, 1, 0, 0); main.globalAlpha = 1; main.fillStyle = '#000'; main.fillRect(0, 0, W, H);
  const S = OP._shots; const i = shotIndex(t);
  // whip window around a whip shot's start
  let wi = -1; if (S[i].whip && t - S[i].at < WHIP / 2) wi = i; else if (i + 1 < S.length && S[i + 1].whip && S[i + 1].at - t < WHIP / 2) wi = i + 1;
  if (wi >= 0) {
    // whip pan: the outgoing shot slides out left while the incoming one follows on its right edge, smeared over 6 sub-frames
    const t0 = S[wi].at - WHIP / 2, u = clamp((t - t0) / WHIP), pos = (uu) => -eio(clamp(uu)) * W;
    const dx = pos(u), vel = Math.abs(pos(u + 0.02) - pos(u - 0.02)) / 0.04 * (WHIP / 9);
    setCtx(offC); offC.setTransform(1, 0, 0, 1, 0, 0); offC.fillStyle = '#000'; offC.fillRect(0, 0, W, H); drawShot(wi - 1, Math.min(t, S[wi].at - 1e-3));
    setCtx(offC2); offC2.setTransform(1, 0, 0, 1, 0, 0); offC2.fillStyle = '#000'; offC2.fillRect(0, 0, W, H); drawShot(wi, Math.max(t, S[wi].at)); setCtx(main);
    for (let k = 0; k < 6; k++) { const sx = dx - vel * (k / 5 - 0.5); main.globalAlpha = 1 / (k + 1); main.drawImage(off, sx, 0); main.drawImage(off2, sx + W, 0); }
    main.globalAlpha = 1;
  } else drawShot(i, t);
  // overlays: beat card, era bar, captions
  const B = OP._beats; let bi = -1; for (let k = 0; k < B.length; k++) if (B[k].at <= t) bi = k;
  if (bi >= 0) { const lt = t - B[bi].at; if (lt < 1.45) beatCard(B[bi].year, B[bi].words, lt); if (lt > 1.2 && !B[bi].noBar && !(OP._noBarAfter && t > OP._noBarAfter)) eraBar(B[bi].year, B[bi].words, clamp((lt - 1.2) / 0.3)); }
  if (t > T.dur - 0.4) { main.fillStyle = '#000'; main.globalAlpha = clamp((t - (T.dur - 0.4)) / 0.4); main.fillRect(0, 0, W, H); main.globalAlpha = 1; }
  drawCaption(t);
}

(async () => {
  try {
    await document.fonts.load('900 100px Inter'); await document.fonts.load('700 100px Caladea'); await document.fonts.load('400 100px Bebas');
    const script = await (await fetch('script.json', { cache: 'no-store' })).json();
    await loadTiming();
    buildCaptions(script);
    const { shots, cues, beats, events } = buildShots(script);
    shots.sort((a, b) => a.at - b.at);
    OP._shots = shots; OP._beats = beats; OP.script = script;
    OP.duration = () => T.dur;
    OP.draw = draw;
    OP.frame = (t, q = 0.92) => { draw(t); return cv.toDataURL('image/jpeg', q); };
    OP.shots = () => shots.map((s, i) => ({ id: s.id, at: +s.at.toFixed(3), end: +(i < shots.length - 1 ? shots[i + 1].at : T.dur).toFixed(3), note: s.note || '' }));
    OP.captions = () => captionList().map((c) => ({ s: +c.s.toFixed(3), e: +c.e.toFixed(3), text: c.words.map((w) => (w.hi ? '*' : '') + w.txt).join(' ') }));
    OP.cues = () => cues.slice().sort((a, b) => a.t - b.t);
    OP.events = () => [...events, ...shots.map((s) => ({ t: s.at, kind: 'cut' })), ...cues.map((c) => ({ t: c.t, kind: c.type }))].sort((a, b) => a.t - b.t);
    OP.beats = () => beats.map((b) => ({ at: +b.at.toFixed(2), year: b.year, words: b.words }));
    OP.ready = true;
    const q = new URLSearchParams(location.search);
    if (!q.has('capture')) {
      if (q.has('t')) draw(+q.get('t'));
      else {
        const audio = new Audio('data/mix.wav'); let t0 = null;
        const btn = document.getElementById('play'); btn.hidden = false;
        btn.onclick = () => { btn.hidden = true; t0 = performance.now(); audio.currentTime = 0; audio.play().catch(() => {}); };
        const loop = (now) => { const t = t0 == null ? 0 : (now - t0) / 1000; draw(t0 == null ? 0 : t); if (t0 != null && t > T.dur) { t0 = null; btn.hidden = false; } requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      }
    }
  } catch (e) { OP.bootError = String(e && e.stack || e); console.error(e); }
})();
