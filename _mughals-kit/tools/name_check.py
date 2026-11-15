"""Ear-proxy pronunciation check: speaks "The name is <word>." for every script.json lexicon entry (and any extra
words given) with its IPA, then prints what Whisper (an English speech-to-text model) hears. A close English
spelling = probably fine; a different word = listen to it. Writes review/names.md.
  python tools/name_check.py [extra words...]   (skill venv python)"""
import json, sys, os, subprocess
from pathlib import Path
import numpy as np
from scipy import signal
from kokoro_onnx import Kokoro
from faster_whisper import WhisperModel
H = Path.home() / '.faceless-shorts' / 'kokoro'; S = json.loads(Path('script.json').read_text()); LEX = S.get('lexicon', {})
k = Kokoro(str(H / 'kokoro-v1.0.onnx'), str(H / 'voices-v1.0.bin')); m = WhisperModel('small.en', device='cpu', compute_type='int8')
voice, speed = S.get('voice', 'bm_george'), S.get('speed', 1.0)
rows = []
for w in list(LEX) + sys.argv[1:]:
    ph = f"ðə nˈeɪm ɪz {LEX[w]}." if w in LEX else k.tokenizer.phonemize(f'The name is {w}.', 'en-gb')
    a, sr = k.create(ph, voice=voice, speed=speed, lang='en-gb', is_phonemes=True)
    segs, _ = m.transcribe(signal.resample_poly(a, 2, 3).astype(np.float32))
    heard = ' '.join(s.text for s in segs).strip().removeprefix('The name is').strip(' .')
    rows.append((w, LEX.get(w, '(default)'), heard)); print(f'{w:18s} {LEX.get(w, "(default)"):24s} heard: {heard}', flush=True)
Path('review').mkdir(exist_ok=True)
Path('review/names.md').write_text('| Name | IPA used | What Whisper heard |\n|---|---|---|\n' + '\n'.join(f'| {a} | /{b}/ | "{c}" |' for a, b, c in rows) + '\n')
