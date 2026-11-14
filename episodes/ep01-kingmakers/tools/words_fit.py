"""WORD-TIMING FALLBACK (Part A, A2) for when Whisper can't download: data/lines.json (exact line times from voice.py)
-> data/words.json. Each line's duration is split across its words in proportion to (letters + 2.5), plus the comma /
full-stop pauses estimate.py uses, after trimming the line's leading/trailing silence with the audio envelope.
   python3 tools/words_fit.py [project=.]"""
import json, re, sys, subprocess
from pathlib import Path
import numpy as np
P = Path(sys.argv[1] if len(sys.argv) > 1 else '.'); SR = 16000
S = json.loads((P / 'script.json').read_text()); Ls = json.loads((P / 'data/lines.json').read_text())['lines']
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(P / 'data/narration.wav'), '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
a = np.abs(np.frombuffer(raw, dtype=np.float32)); hop = SR // 100; n = len(a) // hop; envl = a[:n * hop].reshape(n, hop).mean(1); thr = 0.06 * envl.max()
norm = lambda w: re.sub(r'[^a-z0-9]+', '', w.lower()); words = []
for i, (ln, tl) in enumerate(zip(S['lines'], Ls)):
    f0, f1 = int(tl['start'] * 100), int(tl['end'] * 100); loud = np.where(envl[f0:f1] > thr)[0]
    lo, hi = (tl['start'], tl['end']) if not len(loud) else (tl['start'] + loud[0] / 100, tl['start'] + (loud[-1] + 1) / 100)
    toks = [w for w in ln['text'].split() if norm(w)]
    wts = [len(norm(w)) + 2.5 + (2.5 if w.endswith(',') else 4.5 if re.search(r'[.?!:]$', w) and k < len(toks) - 1 else 0) for k, w in enumerate(toks)]
    c, tot = lo, sum(wts)
    for w, wt in zip(toks, wts):
        d = (hi - lo) * wt / tot; speak = (hi - lo) * (len(norm(w)) + 2.5) / tot
        words.append({'w': w, 'line': i, 's': round(c, 3), 'e': round(c + speak * 0.92, 3)}); c += d
(P / 'data/words.json').write_text(json.dumps(words, indent=1)); print(f'data/words.json: {len(words)} words (fallback: fitted inside exact line times)')
