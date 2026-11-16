# _mughals-kit: series kit for ClearCut History, "The Fall of the Mughals"

Built in Episode 1 (episodes/ep01-kingmakers). Every later episode copies this folder into its project
(`cp -R _mughals-kit/. episodes/epNN-<slug>/`), then writes its own `script.json` and `src/shots.js`
(see `example-ep01-shots.js` for a full working shot list).

Format: Paper Atlas look converted to **16:9, 1920x1080, 30 fps**. Captions on a torn strip at y≈958
(Caladea 68 px, max width 1500, one crimson key word; captions start at 0.0 s; in the last 20 s they move left to
keep the bottom-right 420x260 clear for end-screen elements). Era bar in the top-left corner after each beat card. Keep labels between y≈140 and y≈820 (the caption strip starts at y≈904).

## Engine (`src/main.js`)
- **Camera per shot** (`cam`): `push` (slow 5-10% zoom), `pan: [[x0,y0],[x1,y1]]`, `snaps: [{ t, z, at }]` (quick zoom
  landing on a reveal word, 0.15 s), `z0` (base zoom).
- **cam.whip**: a shot with `whip: true` gets a 0.30 s whip pan from the previous shot, motion-blurred from 6 averaged
  sub-frames. Used at every beat start (never a cross-fade).
- **Beat cards**: `beat(i, year, words)` in shots.js = 1.2 s gold year ribbon + 2-4 word slip over the moving action,
  then it shrinks into the era bar.
- `window.OP`: `duration() draw(t) frame(t) shots() captions() cues() events() beats()`.

## Kit (`src/core/kit.js`, `import * as K`)
- **Label layer:** main.js wraps each shot in `beginLabels()` / `flushLabels()`, so every `slip`, `statCard` and `ribbon` is drawn last, on top of all figures and props.
- `figure` draws nothing while `h` is 0 (a pop-in at its start), so pass `h: size * pop(...)` freely.
- Paper: `cut`, `P_rr P_circ P_ell P_poly`, `parchment`, `nightPage`, `darkParchment`, `vignette`.
- Text: `label`, `slip`, `ribbon`, `seal`, `statCard` (pops from pins), `quoteStrip` (kinetic quote, word by word, key words crimson, speaker + source).
- Captions: `CAPLOOK`, `captionStrip`. Beat: `beatCard`, `eraBar`.
- Idle motion: `idle.breathe / sway / blink / flicker / flutter` (figures breathe, sway and blink on their own).
- **India map** (real coastlines: `india-land.js` = Natural Earth 1:10m, rebuilt by `tools/coast.mjs`; conic-style projection like the Survey of India sheets; no modern borders): `VIEW`, `proj(lon, lat, v)`, `landPath`, `MUGHAL1707`, `PLACES`, `indiaMap({ t, v, mughal, pins, extra, noCompass })` (series anchor
  map, 1707 Mughal green), `inkBleed(poly, colour, p, origin)` (noise-edged territory wipe), `pin` (pulsing), `route`
  (draws itself with an icon at the tip), `battle` (crimson ring, 1.2 s), `compass`, `crossedSwords`.
- Flags: `flag(x, y, s, t, colour)` draws the **Mughal alam** for `P.mughal` (triangular green pennant, gold stars, sun-and-lion; after NikNaks' Commons reconstruction, CC BY-SA 3.0 — credit it in the description) and the **Maratha Bhagwa Dhwaj** for `P.maratha` (saffron swallowtail, public domain); `mughalFlag`, `marathaFlag`.
- Props: `hand` (big paper hand), `calendar` (pages flip backwards), `doors`, `chest` (treasury), `field` (crop rows), `crown`, `throne`, `candle` (snuff), `cloth`, `farman` (scroll + seal), `ledger`, `coin`, `sword`, `torch`, `flag`.
- Places: `court({ night, throne, jharokha })` (red sandstone cusped arches, jharokha balcony, throne platform),
  `corridor`, `gate`, `cutArch`.
- People: `figure(o)` Mughal-era cut-out (jama, turban + plume, sash, beard, halo, props, blink, smile, brows) and the
  cast presets `CAST` / `person(key, o)`: aurangzeb, bahadur, azam, kambakhsh, shahu, jahandar, zulfikar, abdullah,
  hussain, farrukh, rafi1, rafi2, mshahTeen, mshah, nizam.
- Series pieces: `puppetStrings(from, to, t, p, snap)`, `throneCarousel(items, p, x, y, s)`.

## Tools
- `node tools/capture.mjs check | cues | events | beats | sheet out.jpg step cols [start end] | frames dir "t1,t2" | video out.mp4 [start end]`
  - `events` fails on any gap > 3.5 s without an event; `beats` fails on any gap > 60 s between beat starts.
- `python tools/mix.py .` (needs numpy + scipy: the skill's venv): procedural SFX for every `ev()` kind
  (`sfxFor` map in shots.js), a sectioned score (tension / court / uneasy / reflective), sidechain duck
  (attack 80 ms, release 400 ms), stings, mastered to about -16 LUFS.
- `python tools/voice_ipa.py .`: the narration with **exact name pronunciations** from `script.json` "lexicon" (IPA per word; captions keep the real spellings). Use it instead of the skill's voice.py.
- `python tools/name_check.py`: ear-proxy check of every lexicon name (Whisper transcribes each one) → `review/names.md`.
- `python tools/words_fit.py .`: word timings when Whisper can't download (fitted inside the exact line times).
- `node tools/thumb.mjs`: `renders/thumb.png` + `thumb-b.png` (1280x720) and 128x72 checks (edit `src/thumb.js` per episode).
- `bash tools/render.sh <slug>`: final render in 60 s parts, 3 at a time, concat, mux the mix once, plus a 720p review copy.
- `python tools/package.py <slug>`: packaging file + .srt (edit the episode-specific text inside first).

`anchor-states.json`: where the series map stands after each episode.
- `lexicon.json`: the series name-pronunciation list (copy into each episode's script.json "lexicon").
