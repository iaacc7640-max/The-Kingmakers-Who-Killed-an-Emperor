"""ClearCut History soundtrack (series kit): narration + procedural SFX + a sectioned procedural score, all numpy.
No samples, no downloads, no AI audio.

  python3 tools/mix.py [project=.]          → data/mix.wav (48 kHz stereo, ~-16 LUFS integrated)

Reads data/cues.json (node tools/capture.mjs cues: cues + beats) and data/narration.wav.
Music by section (script.json "music": "series"): tension (cold open, B5, B7) · court bed (B1-B4) · uneasy pulse (B6) ·
reflective (takeaway). Sidechain duck under the voice (attack 80 ms, release 400 ms): music 15-20 dB under the voice
while narration plays. SFX peak ~10 dB under the voice peak. Sting = short unresolved swell under each star line.
"""
import json, subprocess, sys, re
from pathlib import Path
import numpy as np
from scipy import signal
from scipy.io import wavfile

P = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
SR = 48000
rng = np.random.default_rng(11)
cj = json.loads((P / 'data/cues.json').read_text())
script = json.loads((P / 'script.json').read_text())
DUR = float(cj['duration'])
N = int(DUR * SR) + SR // 10
BEATS = [b['at'] for b in cj.get('beats', [])]

def lp(x, f, o=2): b, a = signal.butter(o, min(f, SR / 2 - 100) / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, f0, f1, o=2): b, a = signal.butter(o, [f0 / (SR / 2), f1 / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def db(x): return 10 ** (x / 20)
def tt(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=5):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    rest = n - na; e[na:] = np.exp(-np.linspace(0, r, rest)) if rest > 0 else 1; return e
def sweep(f0, f1, d):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR)
def noise(d): return rng.standard_normal(int(d * SR))
def nrm(x): return x / (np.abs(x).max() + 1e-9)

# ───────── effects (soft, rounded, nothing harsh) ─────────
def whoosh(d=0.38, **_):
    n = noise(d); lo, hi = lp(n, 500), lp(n, 2200); k = np.sin(np.pi * np.linspace(0, 1, len(n))); return nrm((lo * (1 - k) + hi * k) * k ** 1.5)
def slide(d=0.8, **_): n = lp(noise(d), 700); e = np.sin(np.pi * np.linspace(0, 1, len(n))) ** 2; return nrm(n * e)
def pop(**_): return nrm(lp(sweep(520, 240, 0.11) * env(int(0.11 * SR), 0.002, 6), 3000))
def tock(**_): t = tt(0.09); return nrm((np.sin(2 * np.pi * 420 * t) + 0.3 * np.sin(2 * np.pi * 840 * t)) * env(len(t), 0.001, 9))
def rustle(d=0.45, **_):
    n = bp(noise(d), 1200, 4200); e = np.zeros(len(n))
    for _ in range(9): i = rng.integers(0, max(1, len(n) - 2000)); e[i:i + 1800] += np.hanning(1800) * rng.uniform(0.3, 1)
    return nrm(n * lp(e, 60) * np.sin(np.pi * np.linspace(0, 1, len(n))))
def scribble(d=1.0, **_):
    n = bp(noise(d), 1500, 4000); m = (np.sin(2 * np.pi * 11 * tt(d) + 3 * np.sin(2 * np.pi * 2.3 * tt(d))) > 0.2).astype(float)
    return nrm(n * lp(m, 40) * np.minimum(1, np.linspace(0, 8, len(n))) * np.minimum(1, np.linspace(8, 0, len(n))))
def thud(**_):
    t = tt(0.35); return nrm(np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 30)) * t) * env(len(t), 0.002, 7) + lp(noise(0.35), 220) * env(len(t), 0.001, 12) * 0.3)
def seal(**_):
    t = tt(0.4); x = np.sin(2 * np.pi * (90 + 50 * np.exp(-t * 35)) * t) * env(len(t), 0.002, 8); return nrm(x + lp(noise(0.4), 700) * env(len(t), 0.001, 25) * 0.4)
def thump(**_): t = tt(0.5); return nrm(np.sin(2 * np.pi * (48 + 30 * np.exp(-t * 20)) * t) * env(len(t), 0.004, 6))
def coins(**_):
    x = np.zeros(int(0.9 * SR))
    for k in range(5):
        st = int(k * 0.12 * SR + rng.integers(0, 2000)); t = tt(0.35); f = rng.uniform(2100, 3300)
        c = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.48 * t) + 0.3 * np.sin(2 * np.pi * f * 2.1 * t)) * env(len(t), 0.001, 12)
        x[st:st + len(c)] += c * rng.uniform(0.5, 1)
    return nrm(x)
def cannon(**_):
    d = 1.6; t = tt(d); x = lp(noise(d), 160, 3) * env(len(t), 0.004, 4) + np.sin(2 * np.pi * (42 + 20 * np.exp(-t * 8)) * t) * env(len(t), 0.003, 5) * 0.8
    return nrm(lp(x, 400))
def ring(**_): t = tt(0.7); return nrm((np.sin(2 * np.pi * 1250 * t) + 0.6 * np.sin(2 * np.pi * 2980 * t) + 0.3 * np.sin(2 * np.pi * 4100 * t)) * env(len(t), 0.002, 9) * (1 + 0.2 * np.sin(2 * np.pi * 6 * t)))
def hooves(d=1.5, **_):
    x = np.zeros(int(d * SR) + SR // 4); clop = lambda: lp(bp(noise(0.06), 150, 900) * env(int(0.06 * SR), 0.001, 10), 900)
    for k, off in enumerate(np.arange(0, d, 0.36)):
        for j, dt in enumerate([0, 0.07, 0.15]): i = int((off + dt) * SR); c = clop() * (0.6 + 0.4 * (j == 0)); x[i:i + len(c)] += c
    return nrm(x * np.minimum(1, np.linspace(0, 4, len(x))))
def murmur(d=2.2, **_):
    n = bp(noise(d), 280, 1400); m = 0.6 + 0.4 * np.sin(2 * np.pi * 3.1 * tt(d)) * np.sin(2 * np.pi * 1.3 * tt(d) + 1)
    return nrm(n * m * np.sin(np.pi * np.linspace(0, 1, len(n))) ** 0.7)
def bells(**_):
    d = 3.0; t = tt(d); x = np.zeros(len(t))
    for f0, st in [(392, 0.0), (523.3, 0.55)]:   # two distant bells, equal weight
        s = int(st * SR); tb = t[:len(t) - s]; b = sum(a * np.sin(2 * np.pi * f0 * r * tb) for r, a in [(1, 1), (2.0, 0.5), (2.76, 0.3), (5.4, 0.12)]) * np.exp(-tb * 1.6); x[s:] += b
    return nrm(lp(x, 2600))
def hush(**_): d = 0.7; n = lp(bp(noise(d), 300, 2500), 1800); return nrm(n * env(len(n), 0.04, 5))
def steps(**_):
    x = np.zeros(int(0.5 * SR)); t = tt(0.12); s = np.sin(2 * np.pi * (80 + 50 * np.exp(-t * 40)) * t) * env(len(t), 0.002, 9) + lp(noise(0.12), 1200) * env(len(t), 0.001, 20) * 0.3
    x[:len(s)] += s; return nrm(x)
def roll(d=1.6, **_):
    x = np.zeros(int(d * SR) + SR // 4); tk = 0.0; k = 0
    while tk < d: i = int(tk * SR); t = tt(0.05); c = bp(noise(0.05), 1500, 3800) * env(len(t), 0.001, 14) + np.sin(2 * np.pi * 2400 * t) * env(len(t), 0.001, 16) * 0.5; x[i:i + len(c)] += c * (1 - tk / d * 0.6); tk += 0.04 + 0.12 * (tk / d) ** 2; k += 1
    return nrm(x)
def snap(**_): t = tt(0.45); return nrm(lp(sweep(900, 300, 0.45) * env(len(t), 0.001, 10) + bp(noise(0.45), 1500, 4000) * env(len(t), 0.0005, 30) * 0.6, 4500))
def sting(**_):
    d = 2.4; t = tt(d); sw = np.minimum(1, t / 0.5) * np.exp(-np.maximum(0, t - 0.5) * 1.4)
    x = (np.sin(2 * np.pi * 146.8 * t) + 0.8 * np.sin(2 * np.pi * 155.6 * t) + 0.5 * np.sin(2 * np.pi * 220 * t) * (t > 0.25)) * sw
    x += np.sin(2 * np.pi * (45 + 25 * np.exp(-t * 6)) * t) * env(len(t), 0.003, 3) * 1.2
    return nrm(lp(x, 1800))

FX = dict(whoosh=whoosh, slide=slide, pop=pop, tock=tock, rustle=rustle, scribble=scribble, thud=thud, seal=seal, thump=thump, coins=coins, cannon=cannon,
          ring=ring, hooves=hooves, murmur=murmur, bells=bells, hush=hush, steps=steps, roll=roll, snap=snap, sting=sting)
LEVEL = dict(whoosh=-2, slide=-6, pop=-4, tock=-8, rustle=-3, scribble=-6, thud=0, seal=0, thump=0, coins=-4, cannon=-3, ring=-8, hooves=-4, murmur=-6,
             bells=-6, hush=-4, steps=-3, roll=-3, snap=-3, sting=2)   # relative to "10 dB under the voice peak"

# ───────── score sections ─────────
def m_tension(n):
    t = np.arange(n) / SR; x = np.zeros(n)
    for f, g in [(55, 0.5), (82.4, 0.3), (110, 0.2), (116.5, 0.08)]: x += np.sin(2 * np.pi * f * t + np.sin(t * 0.3) * 0.5) * g
    x *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 8) ** 2
    beat = 60 / 72
    for k in range(int(n / SR / (beat * 2))):
        i = int(k * beat * 2 * SR); f = [220.0, 207.7, 196.0, 174.6][(k // 2) % 4]; pg = (np.sin(2 * np.pi * f * tt(1.4)) + 0.3 * np.sin(4 * np.pi * f * tt(1.4))) * env(int(1.4 * SR), 0.01, 5) * 0.3
        if i + len(pg) < n: x[i:i + len(pg)] += pg
    return lp(x, 2200)
def m_court(n):
    # drone (D + A, tanpura-like shimmer) + slow plucked arpeggio in a D major-pentatonic mode, 80 BPM
    t = np.arange(n) / SR; x = np.zeros(n)
    for f, g in [(73.4, 0.35), (110, 0.25), (146.8, 0.18), (220, 0.08)]: x += np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * 0.21 * t + f)) * g * (0.8 + 0.2 * np.sin(2 * np.pi * 0.5 * t + f))
    scale = [293.7, 329.6, 370.0, 440.0, 493.9, 587.3]; pat = [0, 2, 3, 2, 4, 3, 1, 0, 2, 3, 5, 3, 2, 1, 0, 1]
    beat = 60 / 80
    for k in range(int(n / SR / (beat / 2))):
        i = int(k * beat / 2 * SR); f = scale[pat[k % len(pat)]]; d = 0.9; pt = tt(d)
        pl = (np.sin(2 * np.pi * f * pt) + 0.4 * np.sin(4 * np.pi * f * pt) + 0.15 * np.sin(6 * np.pi * f * pt)) * env(int(d * SR), 0.002, 6) * (0.22 if k % 4 == 0 else 0.13)
        if i + len(pl) < n: x[i:i + len(pl)] += pl
    return lp(x, 3000)
def m_uneasy(n):
    t = np.arange(n) / SR; x = np.zeros(n)
    for f, g in [(61.7, 0.4), (65.4, 0.3), (130.8, 0.12), (138.6, 0.1)]: x += np.sin(2 * np.pi * f * t) * g
    x *= 0.7 + 0.3 * np.sin(2 * np.pi * t / 5)
    beat = 60 / 66
    for k in range(int(n / SR / beat)):
        i = int(k * beat * SR); p = np.sin(2 * np.pi * 55 * tt(0.25)) * env(int(0.25 * SR), 0.004, 6) * 0.8
        if i + len(p) < n: x[i:i + len(p)] += p
    return lp(x, 1500)
def m_reflect(n):
    t = np.arange(n) / SR; x = np.zeros(n)
    for f, g in [(73.4, 0.3), (110, 0.2), (146.8, 0.12)]: x += np.sin(2 * np.pi * f * t) * g
    for k, f in enumerate([587.3, 440.0, 493.9, 370.0] * 40):
        i = int(k * 2.2 * SR); pl = (np.sin(2 * np.pi * f * tt(2)) + 0.3 * np.sin(4 * np.pi * f * tt(2))) * env(int(2 * SR), 0.004, 4) * 0.2
        if i + len(pl) < n: x[i:i + len(pl)] += pl
    return lp(x, 2600)

def load_audio(f):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(f), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(out, dtype=np.float32).reshape(-1, 2).astype(np.float64)

# voice
v = load_audio(P / 'data/narration.wav')[:N]; voice = np.zeros((N, 2)); voice[:len(v)] = v
vpk = np.abs(voice).max() + 1e-9; voice *= 0.5 / vpk; vpk = 0.5
act = np.abs(voice.mean(1)) > 0.01
vrms = np.sqrt(np.mean(voice[act] ** 2)) if act.any() else 0.1

# music: sections by beat (0=cold open, 1-4 B1-B4 (+1717 re-hook), 5 B5, 6 B6, 7 B7, 8 takeaway)
kinds = ['tension', 'court', 'court', 'court', 'court', 'court', 'tension', 'uneasy', 'tension', 'reflect']
edges = [0.0] + BEATS + [DUR]
music = np.zeros(N)
gen = dict(tension=m_tension, court=m_court, uneasy=m_uneasy, reflect=m_reflect)
for s in range(len(edges) - 1):
    a, b = int(max(0, edges[s] - 0.6) * SR), min(N, int((edges[s + 1] + 0.6) * SR)); k = kinds[min(s, len(kinds) - 1)]
    seg_ = nrm(gen[k](b - a)); fade = np.ones(b - a); fl = int(1.2 * SR); fade[:fl] = np.linspace(0, 1, fl) if s else 1; fade[-fl:] = np.linspace(1, 0, fl)
    music[a:b] += seg_ * fade
music = music / (np.sqrt(np.mean(music ** 2)) + 1e-9)          # unit RMS
# sidechain duck: envelope follower, attack 80 ms / release 400 ms
lev = np.abs(voice.mean(1)); e = np.zeros(N); aa, rr_ = np.exp(-1 / (0.08 * SR)), np.exp(-1 / (0.4 * SR))
# vectorised-ish: block follower at 1 ms resolution
blk = SR // 1000; L = lev[: N // blk * blk].reshape(-1, blk).max(1); E = np.zeros(len(L)); a1, r1 = np.exp(-1 / 80), np.exp(-1 / 400); cur = 0.0
for i, x in enumerate(L): cur = (a1 * cur + (1 - a1) * x) if x > cur else (r1 * cur + (1 - r1) * x); E[i] = cur
E = np.clip(E / (np.percentile(E[E > 0], 90) + 1e-9), 0, 1); e[: len(E) * blk] = np.repeat(E, blk)
gdb = -11 - 7 * e                                                # -11 dB in gaps, -18 dB under the voice (relative to voice RMS)
music_out = music * vrms * db(gdb)
mix = voice + np.stack([music_out, music_out], 1)
# sound effects
for c in cj['cues']:
    fn = FX.get(c['type'])
    if not fn: print('unknown cue type, skipped:', c['type']); continue
    x = fn(**({'d': c['dur']} if c.get('dur') else {}))
    x = lp(x, 5000); x = x / (np.abs(x).max() + 1e-9) * vpk * db(-10 + LEVEL[c['type']]) * c.get('gain', 1.0)
    i = int(c['t'] * SR); n = min(len(x), N - i)
    if n > 0 and i >= 0: pan = c.get('pan', 0.0); mix[i:i + n, 0] += x[:n] * (1 - max(0, pan)); mix[i:i + n, 1] += x[:n] * (1 + min(0, pan))
# master: fades, loudness to ~-16 LUFS integrated, true-peak safe
fo = int(0.4 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
tmp = P / 'data/_premix.wav'; wavfile.write(tmp, SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16))
meas = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(tmp), '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', meas)[-1])
mix *= db(-16 - I)
pk = np.abs(mix).max()
if pk > db(-1.5): mix = np.tanh(mix / db(-1.5)) * db(-1.5)
wavfile.write(P / 'data/mix.wav', SR, (np.clip(mix, -1, 1) * 32767).astype(np.int16)); tmp.unlink()
meas = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(P / 'data/mix.wav'), '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
I2 = re.findall(r'I:\s+(-?[\d.]+) LUFS', meas)[-1]; TPk = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', meas)[-1]
print(f"data/mix.wav: {DUR:.2f} s · {len(cj['cues'])} cues · sections {len(edges) - 1} · integrated {I2} LUFS · true peak {TPk} dBFS")
