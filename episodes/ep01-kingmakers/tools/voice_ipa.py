"""Narration with exact name pronunciations (Kokoro-82M, local). Same output as the skill's voice.py
(data/narration.wav + data/lines.json), but every word listed in script.json "lexicon" is spoken from its IPA,
so captions and the script keep the real spellings ("Farrukhsiyar"), and the voice says /fəɹˈʊxsɪjˌɑːɹ/.

  python tools/voice_ipa.py [project=.]          (run with the skill's venv python)
  python tools/voice_ipa.py --say "Farrukhsiyar"  (print the phonemes a line would use)
"""
import json, re, sys, os
from pathlib import Path
import numpy as np
from scipy.io import wavfile
from kokoro_onnx import Kokoro

HOME = Path(os.environ.get('FACELESS_HOME', Path.home() / '.faceless-shorts')); SR = 24000
args = [a for a in sys.argv[1:] if not a.startswith('--')]; P = Path(args[0] if args and '--say' not in sys.argv else '.')
S = json.loads((P / 'script.json').read_text()); LEX = {k.lower(): v for k, v in S.get('lexicon', {}).items()}
voice, speed = S.get('voice', 'bm_george'), S.get('speed', 1.0); lang = 'en-gb' if voice.startswith('b') else 'en-us'
k = Kokoro(str(HOME / 'kokoro' / 'kokoro-v1.0.onnx'), str(HOME / 'kokoro' / 'voices-v1.0.bin'))

def phonemes(text):
    """plain words through espeak; lexicon words (case-insensitive, punctuation kept) from their IPA"""
    out, buf = [], []
    def flush():
        if buf: out.append(k.tokenizer.phonemize(' '.join(buf), lang)); buf.clear()
    for tok in text.split():
        m = re.match(r"^([\"'(]*)(.+?)([.,!?;:\"')]*)$", tok); pre, core, post = m.groups() if m else ('', tok, '')
        key = core.lower().rstrip("'s") if core.lower().endswith("'s") and core.lower()[:-2] in LEX else core.lower()
        if key in LEX:
            flush(); out.append(LEX[key] + ('z' if core.lower().endswith("'s") and key != core.lower() else '') + post)
        else: buf.append(tok)
    flush(); return ' '.join(x.strip() for x in out if x.strip())

if '--say' in sys.argv: print(phonemes(' '.join(args))); sys.exit()

def trim(x, thr=0.008):
    idx = np.where(np.abs(x) > thr)[0]
    if not len(idx): return x
    return x[max(0, idx[0] - int(0.01 * SR)): min(len(x), idx[-1] + int(0.03 * SR))]
def silences(x, thr=0.012, min_len=0.06):
    hop = int(0.01 * SR); n = len(x) // hop; rms = np.sqrt(np.mean(x[:n * hop].reshape(n, hop) ** 2, axis=1)); quiet = rms < thr * np.abs(x).max(); out, st = [], None
    for f, q in enumerate(quiet):
        if q and st is None: st = f
        if (not q or f == n - 1) and st is not None:
            if (f - st) * 0.01 >= min_len: out.append((st * 0.01, f * 0.01))
            st = None
    return out
say = lambda text: trim(np.asarray(k.create(phonemes(text), voice=voice, speed=speed, lang=lang, is_phonemes=True)[0], dtype=np.float64))

groups, cur = [], []
for i, ln in enumerate(S['lines']):
    cur.append(i)
    if re.search(r'[.?!]["\')]*$', ln['text'].strip()) or ln.get('break') or i == len(S['lines']) - 1: groups.append(cur); cur = []
out = [np.zeros(int(S.get('lead', 0.4) * SR))]; t = len(out[0]) / SR; lines = [None] * len(S['lines'])
for g in groups:
    x = say(' '.join(S['lines'][i]['text'] for i in g)); cuts = [0.0]
    if len(g) > 1:
        lens = np.array([len(say(S['lines'][i]['text'])) for i in g], dtype=float); pauses = silences(x)
        for c in np.cumsum(lens)[:-1] / lens.sum() * len(x) / SR:
            near = [p for p in pauses if abs((p[0] + p[1]) / 2 - c) < 0.4]
            if near: p = min(near, key=lambda p: abs((p[0] + p[1]) / 2 - c)); cuts.append((p[0], p[1]))
            else: cuts.append((c, c))
    n = len(x) / SR
    for j, i in enumerate(g):
        a = 0.0 if j == 0 else cuts[j][1]; b = n if j == len(g) - 1 else cuts[j + 1][0]
        lines[i] = {'i': i, 'text': S['lines'][i]['text'], 'start': round(t + a, 3), 'end': round(t + b, 3)}
        print(f'{i:3d} {lines[i]["start"]:7.2f}-{lines[i]["end"]:7.2f}  {S["lines"][i]["text"]}', flush=True)
    gap = np.zeros(int(float(S['lines'][g[-1]].get('gap', S.get('gap', 0.3))) * SR)); out += [x, gap]; t += (len(x) + len(gap)) / SR
out.append(np.zeros(int(float(S.get('outro', 0.9)) * SR)))
y = np.concatenate(out); y = y / (np.abs(y).max() + 1e-9) * 0.9
(P / 'data').mkdir(exist_ok=True); wavfile.write(P / 'data/narration.wav', SR, (y * 32767).astype(np.int16))
(P / 'data/lines.json').write_text(json.dumps({'duration': round(len(y) / SR, 3), 'voice': voice, 'speed': speed, 'lines': lines}, indent=1))
print(f'data/narration.wav ({len(y) / SR:.2f} s, {voice} x{speed}, {len(LEX)} lexicon words) + data/lines.json. Next: words.py')
