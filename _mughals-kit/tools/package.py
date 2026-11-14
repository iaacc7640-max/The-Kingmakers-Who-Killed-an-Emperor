"""Packaging (A11): renders/<slug>-packaging.md + renders/<slug>.srt from script.json, data/lines.json, data/cues.json.
   python3 tools/package.py <slug>"""
import json, re, sys
from pathlib import Path
P = Path('.'); slug = sys.argv[1]
S = json.loads((P / 'script.json').read_text()); Ls = json.loads((P / 'data/lines.json').read_text())['lines']; B = json.loads((P / 'data/cues.json').read_text())['beats']
mmss = lambda t: f"{int(t // 60):02d}:{int(t % 60):02d}"
def srt_t(t): h, r = divmod(t, 3600); m, s = divmod(r, 60); return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)):03d}"
clean = lambda c: re.sub(r'\s+', ' ', c.replace('*', '').replace('|', ' ')).strip()
srt = []
for i, (ln, tl) in enumerate(zip(S['lines'], Ls)): srt.append(f"{i + 1}\n{srt_t(tl['start'])} --> {srt_t(tl['end'] + 0.15)}\n{clean(ln.get('caps', ln['text']))}\n")
(P / f'renders/{slug}.srt').write_text('\n'.join(srt))
names = {'1707 · THE OLD MAN WINS': 'The Old Man Wins (1707)', '1707 · MAKE PEACE': 'Make Peace with Everyone', "1712 · THE MINISTER'S KING": "The Minister's King (1712)", '1713 · ENTER THE KINGMAKERS': 'Enter the Kingmakers (1713)',
         '1717 · A SMALL FAVOUR': 'The 1717 Farmans', '1719 · THE FIRST REGICIDE': 'The First Regicide (1719)', '1719 · FOUR EMPERORS': 'Four Emperors in One Year', '1720 · THE KINGMAKERS FALL': 'The Kingmakers Fall (1720)', 'AFTER 1720 · THE CENTRE CANNOT HOLD': 'Why It Mattered'}
ts = ['00:00 Cold open: an emperor dragged from his palace'] + [f"{mmss(b['at'])} {names.get(b['year'] + ' · ' + b['words'], b['words'].title())}" for b in B]
parts = ['The Kingmakers Who Killed an Emperor', '57 Days That Broke the Mughal Empire', "Why India's Fate Was Decided at Panipat", 'From Emperor to Pensioner', "Was It Really Aurangzeb's Fault?", 'The Empire That Ran Out of Land', 'Governors Who Became Kings', 'Rebels Who Built Their Own Kingdoms', 'Why No One Could Replace the Mughals', "When India Was the World's Factory", 'Everyday Life Before the British', 'The Empire Fell. The Art Flourished.']
prev = ['First In, Last Out: The Portuguese in India', 'The Dutch in India', 'From Merchants to Masters: The English in India', 'How France Almost Won India', 'Denmark Forgot Him. He Held the Fort.']
src = '\n'.join(f'- {s}' for s in S['sources'])
md = f"""# Packaging: {S['title']} (ClearCut History · The Fall of the Mughals, Part 1)

## Titles
- **Main (36 chars):** The Kingmakers Who Killed an Emperor
- Alternate 1: Four Emperors in One Year
- Alternate 2: The Brothers Who Owned the Mughal Throne

## Description (paste as is; replace [Link] when known)
In 1719, two noble brothers deposed, blinded and killed a Mughal emperor — the first time nobles had ever done it. Here's how the throne of the world's richest empire became a prize to be handed out.

🔔 Subscribe to ClearCut History for bite-sized, deep-dive historical documentaries: [Insert Link]

⏱️ TIMESTAMPS:
{chr(10).join(ts)}

📚 WATCH THE FULL SERIES (The Fall of the Mughals):
{chr(10).join(f'▶️ Part {i + 1} - {p}: [Link]' for i, p in enumerate(parts))}

🧭 PREVIOUS SERIES (Europeans in India):
{chr(10).join(f'▶️ {p}: [Link]' for p in prev)}

💬 QUESTION FOR THE COMMENTS: Who really ruled the Mughal Empire in 1719 — the emperor, or the Sayyid brothers?

📖 SOURCES: Rajiv Ahir, A Brief History of Modern India, Ch. 4 + the sources below.
{src}

#IndianHistory #ClearCutHistory #Documentary #MughalEmpire #LaterMughals #SayyidBrothers #Farrukhsiyar

## Pinned comment (post and pin within 10 minutes)
Who really ruled the Mughal Empire in 1719 — the emperor, or the Sayyid brothers? 👇

## Reply starters (personalise each)
1. **Agree and extend:** "Exactly — and notice that once the brothers showed it could be done, every strong noble after them started thinking the same way. That's Part 7."
2. **Gentle sourced correction:** "Good catch to check! Sources differ on the exact date Farrukhsiyar was killed (most of the sources we checked say April 1719), so we kept it to 'within weeks'. Wikipedia's 'Sayyid brothers' page lists the main sources."
3. **Follow-up question:** "If you'd been Muhammad Shah at 17, would you have moved against the brothers that fast — or waited longer?"
4. **Thank-you:** "Thank you for watching all the way through — glad the puppet-strings idea made it click!"
5. **Next episode:** "Next up: 1739, when a king from Persia rode into Delhi and left with the Peacock Throne. 57 Days That Broke the Mughal Empire: [Link]"

## Tags
Mughal Empire, Sayyid brothers, Farrukhsiyar, Later Mughals, Indian history, UPSC history, Bahadur Shah I, Muhammad Shah

## Captions
Upload `{slug}.srt` (below, also saved as `renders/{slug}.srt`). Spellings come from the on-screen captions, not the phonetic voice spellings.

```srt
{chr(10).join(srt)}
```
"""
(P / f'renders/{slug}-packaging.md').write_text(md); print(f'renders/{slug}-packaging.md + renders/{slug}.srt ({len(srt)} cues)')
