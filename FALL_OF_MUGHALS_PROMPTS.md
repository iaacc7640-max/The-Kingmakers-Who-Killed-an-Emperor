<!-- Converted from the PDF "ClearCut History — The Fall of the Mughals: 12 Claude Code Prompts" (text extraction; page headers removed). -->





ClearCut History — The Fall of the Mughals:
12 Claude Code Prompts
  ​Nov 14, 2026       ·   ​@Pratik Mekhe




How to use this file (v2: Claude Code on the web and Android)
You paste one episode prompt into a Claude Code session on claude.ai or the Android
app. The session runs end to end in the cloud, with no stops for approval. You get back the
review sheet. You then send all your changes in one message, and Claude Code delivers
the revised video.

What I tested in a cloud session like yours (14 Nov 2026):


  Part of the pipeline                                               Result in the cloud

  faceless-shorts skill                                              Available (it syncs from your account)

  Node 22, ffmpeg, Chrome, Python                                    Already installed

  Kokoro voice download (from GitHub)                                Works

  Whisper word-timing model (from                                    Blocked by the session's network rules, so
  huggingface.co)                                                    Part A uses a fallback: exact line timings from
                                                                     the voice, with word timings fitted inside
                                                                     each line

  Google Fonts                                                       Blocked; Bebas Neue is installed from npm
                                                                     instead ( @fontsource/bebas-neue )

  Render speed                                                       A 10 s Paper Atlas clip took about 20 s, so a 6–
                                                                     7 min episode needs roughly 12–15 min for the
                                                                     final render


One-time setup (details in the Episode 1 Production Guide):

   1. Create a private GitHub repo called clearcut-history . Upload this file to it as
      FALL_OF_MUGHALS_PROMPTS.md , and the book as ahir.pdf .
   2. Start every episode's Claude Code session on that repo. The session commits the
      shared kit and each episode's project back to it, so later episodes can reuse them.
      Cloud sessions start fresh each time, and the repo is what carries work between
       them.








   3. Turn off the groundwork plugin for these sessions. In this cloud session it blocked
      every file save outside a git repo, and it also adds a spec-and-approval process that
      would stop a one-prompt run.
   4. (Optional, for better caption timing) If your Claude Code environment settings let you
      allow extra domains, add huggingface.co so Whisper can download.

Each episode: open a new session on the repo, paste that episode's prompt block (Part B),
and wait for the delivery. Review on your phone, then send one consolidated change list.


  #           Title (45 chars or fewer)                              Thumbnail text          Length    Release

  1           The Kingmakers Who Killed an                           4 EMPERORS. 1 YEAR.     6–7       3rd
              Emperor                                                                        min

  2           57 Days That Broke the Mughal                          HE TOOK EVERYTHING      6–7       1st
              Empire                                                                         min

  3           Why India's Fate Was Decided at                        SAME FIELD. 3 TIMES.    7–8 min   2nd
              Panipat

  4           From Emperor to Pensioner                              SIGNED IT AWAY          6–7       4th
                                                                                             min

  5           Was It Really Aurangzeb's Fault?                       5 HISTORIANS. 5         7–8 min   5th
                                                                     VERDICTS.

  6           The Empire That Ran Out of Land                        NO LAND LEFT            6–7       6th
                                                                                             min

  7           Governors Who Became Kings                             LOYAL? NOT REALLY.      6–7       7th
                                                                                             min

  8           Rebels Who Built Their Own                             BORN IN REVOLT          7–8 min   8th
              Kingdoms

  9           Why No One Could Replace the                           THE EMPTY THRONE        6–7       9th
              Mughals                                                                        min

  10          When India Was the World's                             EUROPE PAID IN SILVER   6–7       10th
              Factory                                                                        min

  11          Everyday Life Before the British                       SCHOOL IN 1750          6–8       11th
                                                                                             min

  12          The Empire Fell. The Art Flourished.                   WHILE IT FELL           5–6       12th
                                                                                             min








Build Episode 1 first, because it creates the shared kit. If you can't use a GitHub repo,
paste Part A and then the episode block together into one message. It's long, but it works.
Each session then rebuilds the kit from scratch, and the look may drift slightly between
episodes.


Part A — Series base rules, v2 (every episode prompt says "follow
Part A")
Copy everything from A0 to A13 when you need to paste Part A by hand.

   PART A — CLEARCUT HISTORY SERIES RULES (v2, cloud / one-prompt run)

   A0. WHERE YOU ARE AND HOW THIS RUN WORKS
   - You are Claude Code in a CLOUD session (web or Android app). The user is
   not at a terminal and will NOT approve
       steps. Run the WHOLE pipeline end to end without stopping or asking: plan -
   > self-review -> build -> QA -> fix ->
     final render -> packaging -> delivery. Ask a question only if something is
   truly impossible; otherwise pick the
       reasonable option, note it in the review sheet and carry on. Do not end
   your turn until the delivery (A9) is sent.
   - Paths: wherever an episode prompt says ~/faceless-shorts/, read it as THE
   REPO ROOT of this session (the
     clearcut-history repo). Project folder = episodes/epNN-<slug>/ (this
   overrides the "Project:" path in the episode header). Series kit = _mughals-
   kit/. Book = ahir.pdf.
     Prompts file = FALL_OF_MUGHALS_PROMPTS.md. If the repo or a file is
   missing, carry on without it and say so in the
       review sheet (if ahir.pdf is missing, use the book quotes exactly as
   written in the episode prompt).
   - Setup: run the faceless-shorts skill's scripts/setup.sh. Known cloud
   result: Node, ffmpeg, Chrome, the Python env and
       the Kokoro voice work; the Whisper model download from huggingface.co is
   BLOCKED (proxy 403). Do not retry it or route
     around it. If whisper fails, use the WORD-TIMING FALLBACK in A2.
   selftest.sh may fail on the Whisper step for the same
     reason; that is expected. Instead, prove the engine by rendering one Paper
   Atlas test frame.
   - Fonts: Google Fonts is blocked. Install Bebas Neue with `npm i
   @fontsource/bebas-neue` and load the .woff2 from
       node_modules; Caladea comes with the skill.
   - Long renders: a shell command can run at most 10 minutes. Render in ranges
   of 60 s or less
     (`node tools/capture.mjs video renders/part-NN.mp4 <start> <end>`),
   concatenate the video parts with ffmpeg (concat







       demuxer, -c copy), then mux data/mix.wav once over the whole film. Measured
   cloud speed: about 2 s of render per
       second of video at 1080p.
   - Commit to the repo at the end (and after the kit is built in Ep 1):
   scripts, src, data/*.json, script.json, kit,
       packaging and review files. NEVER commit mp4/wav/png renders (add a
   .gitignore: renders/, review/, *.mp4, *.wav,
       data/narration.wav, data/mix.wav). Commit message: "epNN: <what>". Push to
   the session's branch.


   A1. ENGINE AND KIT
   - Use the faceless-shorts skill, style Paper Atlas. Read SKILL.md and
   styles/paper-atlas/STYLE.md in full and open
       style-sheet.png first. Follow the skill's rules and its "Never" list; where
   Part A or the episode prompt differs, they win.
   - If _mughals-kit/ exists in the repo, copy it into the project. If it does
   NOT exist (Ep 1, or a no-repo session):
     run new_video.sh paper-atlas <slug> into episodes/, then CONVERT TO 16:9:
   grep -rn "1080\|1920" src index.html tools
       and convert every hit (lib.js W=1920 H=1080; index.html canvas 1920x1080;
   capture.mjs --window-size=1920,1080; kit
       harbor()/parchment()/map()/CAPLOOK; sheet.js scales). Then build these kit
   modules: cam (push/pan/snap/whip with
     motion blur from 6 averaged sub-frames), idle (breathing, sway, blink,
   flutter), ev(t, kind) event log, statCard,
       inkBleed (noise-edged territory wipe), sfxFor (motion -> sound map),
   beatCard (1.2 s gold year ribbon + 2-4 word
       slip over moving action), a ranged contact sheet (`capture.mjs sheet <out>
   <step> <cols> <start> <end>`),
       `capture.mjs events` (fails on any gap > 3.5 s without an event) and
   `capture.mjs beats` (fails on any gap > 60 s
     between beat starts). Ep 1 also builds the series pieces named in its
   prompt and saves them all in _mughals-kit/.


   A2. FORMAT, VOICE, TIMING
   - 1920x1080, 30 fps, H.264 + AAC. Length per the episode prompt (5-8 min).
   - English narration, Kokoro voice bm_george, speed 0.95-1.0 (voice.py gives
   exact LINE timings in data/lines.json).
   - WORD-TIMING FALLBACK (when Whisper is unavailable): write
   tools/words_fit.py. For each line in data/lines.json, split
       the line's exact duration across its words in proportion to (letters +
   2.5), add the comma/full-stop pauses the
       skill's estimate.py uses, then trim leading/trailing silence using the
   audio envelope of that line. Write
     data/words.json in the same format words.py writes. Caption chunks stay 2-5
   words, so small drift is acceptable. Note








       in the review sheet that captions used the fallback.
   - Captions: torn-paper strip centred at y~935, Caladea 64-72 px, max width
   1500, 2-5 words, one crimson key word,
     visible from 0.0 s. Era bar at y~70 from the first beat card on. Title-safe
   x 96-1824, y 54-1026. Keep the
       bottom-right 420x260 clear in the last 20 s (end-screen elements).


   A3. SCRIPT AND STORY (retention first)
   1. 15-SECOND HOOK: frame 1 is the story. No greeting, channel intro, logo,
   title card or "today we will". The first
      sentence is mid-conflict; the central question lands by 0:15; the first
   visual change by 0:03, then every 2-3 s to 0:18.
   2. OPEN LOOPS every 90-120 s: at each star (★) point the narration ends a
   segment on the twist/question line given in
         the episode prompt, word for word.
   3. VISUAL RE-HOOKS every 45-60 s: each beat opens with a whip pan + new scene
   or map state + a beat card.
   4. BUT / THEREFORE: link beats by cause or conflict. Zero "and then", "after
   that", "next,", sentence-initial "Then".
   5. PERSONIFY: each beat is carried by 1-2 named people with a motive (given
   per episode).
   6. TAKEAWAY in the last 20-30 s: a realisation, not a summary, plus a one-
   line tease of the next episode.
   7. Write the narration yourself from the beat sheet and fact list: plain
   spoken English, numbers as spoken, word count
      per the episode prompt. Before building, SELF-REVIEW the script against A3
   and A7 and fix it (do not wait for the user).


   A4. LOOK: PAPER CUT-OUT COLLAGE + ANIMATED MAPS
   - Every figure, ship, cannon, scroll, coin and treaty is a cut-out: soft drop
   shadow (offset 6-10 px, blur 12, 25% ink),
     2-3 px white paper edge, small motion (rotation +/-1-3 deg; scale pop 0.92
   -> 1.04 -> 1.0 over 0.35 s, ease-out-back;
       slide-ins). Figures are drawn in code in the Paper Atlas look, with
   caricature carried by costume and props.
   - Optional: public-domain portrait PNGs placed by the user in
   assets/portraits/ may be used as cut-outs (list each
     source in script.json "sources"). Never generate images with AI; never
   download images yourself.
   - Maps: beige land #DCC9A0 on paper #E9DCBC, deep blue ocean #2E4A6B
   (`oceanDeep`), ink borders; territory changes as
       ink-bleed wipes; routes draw themselves with an icon at the tip; battle
   markers pulse (crimson ring, 1.2 s); stat
       cards pop from pins.
   - SERIES ANCHOR MAP: India in 1707 in Mughal green. Each episode's first map
   beat opens on the state the previous episode








       ended on (stored in _mughals-kit/anchor-states.json), then changes it. Save
   the new end state back to that file.
   - Colours: Mughal #2F5D3A + gold · Marathas #D9822B · Afghans #5B6770 ·
   Persia #3E8E8A · Sikhs #4A5F86 · Jats
     #B8892E · Rajputs #C0462C · Hyderabad #3F7F6A · Awadh #7A4B6B · Bengal
   Nawabs #6F7A3A · Mysore #7E2F3A ·
       Travancore #7E8B5A · English East India Company #A8322D. Otherwise the
   Paper Atlas palette only.


   A5. VISUAL PACING
   - Nothing static for more than 3-4 s. Every shot has a continuous camera
   move: cam.push (slow 5-10% zoom), cam.pan
       (gentle pan across portraits and courts), cam.snap (quick zoom landing on a
   reveal word), cam.whip (0.30 s motion-
       blurred pan for every change of place or beat; never a cross-fade). An ev()
   event at least every 3 s.
   - Kinetic text for quotes: word by word on a torn strip, key words crimson,
   speaker + source label. Quotes verbatim from
     the book or labelled "paraphrase".
   - Idle motion on everything: breathing, sway, flags, torches, rivers, dust.


   A6. SOUND
   - Every on-screen move gets a subtle sound via sfxFor: parchment rustle, pen
   scribble, wax-seal thud, soft whoosh, low
     thump, coin clinks, waves and timber, distant muffled cannon and a short
   sword ring (never gory or loud), hooves,
       court murmur, temple and mosque bells far away (equal treatment), crowd
   hush.
   - Music 15-20 dB below the voice whenever narration plays (sidechain duck in
   mix.py: attack 80 ms, release 400 ms);
     SFX peak ~10 dB under the voice; ~-16 LUFS integrated final mix; no SFX
   masks a word. Music from frame 1; a short
     unresolved sting under every star line. All audio procedural (numpy); no
   downloaded audio.


   A7. ACCURACY AND SENSITIVITY
   - Facts only from the episode's fact list or a reliable source you check
   (WebSearch/WebFetch are fine); add every source
     to script.json "sources". Work through the episode's VERIFY list before the
   final render; fix any failing line.
     If a fact can't be checked, keep the book's wording, hedge it, and list it
   in the review sheet.
   - Say estimates as estimates. No gore, bodies, executions or blindings on
   screen; tell violence with objects.
   - Religion, caste, gender and slavery: neutral, factual, attributed; give
   competing views where the book does; no








     caricature of any community; no temple-vs-mosque imagery for effect; equal
   respect for all faiths.
   - Never invent quotes. No real Persian/Urdu/Sanskrit text on screen unless
   verified; use stylised script shapes.


   A8. PRONUNCIATION
   - Phonetic spellings in script.json "text" only; correct spellings in "caps".
   Without Whisper, check names by ear-proxy:
     synthesize each name in a short sentence and compare durations against
   similar names; list every name and the
     spelling used in the review sheet so the user can flag any that sound
   wrong. Anchor Wd() cues on plain English words.
   - Series list: Aurangzeb "Or-ung-zeb" · Mughal "Moo-gul" · Bahadur "Ba-haa-
   dur" · Farrukhsiyar "Fa-rukh-see-yar" · Sayyid
     "Sai-yid" · Nadir "Naa-dir" · Karnal "Kar-nal" · Abdali "Ab-daa-lee" ·
   Durrani "Dur-raa-nee" · Panipat "Paa-nee-put" ·
     Peshwa "Pesh-wa" · Sadashivrao Bhau "Sa-daa-shiv-rao Bhaa-oo" · Nizam-ul-
   Mulk "Ni-zaam ul Mulk" · Awadh "A-wudh" ·
     Murshid Quli "Mur-shid Koo-lee" · Alivardi "A-lee-var-dee" · Diwani "Dee-
   waa-nee" · jagir "jaa-geer" · zamindar
     "za-meen-daar" · mansab "mun-sub" · chauth "chowth" · sardeshmukhi "sar-
   desh-mukh-ee" · Ranjit "Run-jeet" · Suraj Mal
     "Soo-raj Mul" · Travancore "Tra-van-kor".


   A9. THE RUN, THE DELIVERY, AND THE ONE REVISION ROUND
   Run order (no stops): setup -> kit (copy or build) -> script + self-review ->
   voice + timing -> build all beats ->
   per-beat QA (ranged contact sheets at 0.5 s, LOOK at every sheet, fix
   collisions, sync, pacing) -> `events` + `beats`
   checks -> VERIFY list -> full mix -> final render (in ranges, A0) -> pre-
   export checklist (A12), fix every FAIL ->
   packaging (A10-A11) -> commit -> DELIVER.
   DELIVER in the chat, using the tool that sends files to the user, in this
   order:
     1. renders/<slug>-review.mp4: 720p, CRF 26, for quick phone viewing.
     2. renders/<slug>.mp4: final 1080p master (if > 100 MB, also send a 1080p
   CRF 23 share copy).
     3. thumb.png and thumb-b.png (1280x720).
     4. renders/<slug>-packaging.md (titles, description, pinned comment, reply
   starters, hashtags, captions .srt
        exported from data/words.json with correct spellings from caps).
     5. renders/<slug>-REVIEW-SHEET.md, containing: a table with one row per
   beat (start time, beat name, what is on screen,
        the narration lines); every name with the phonetic spelling used; the
   VERIFY results (passed / changed / unverifiable);
             every judgement call you made; the A12 checklist PASS/FAIL; known weak








   spots you would fix with more time; and,
             at the end, this CHANGE TEMPLATE for the user to fill:
               CHANGES FOR <slug> (send all at once)
               1. [mm:ss] [what is wrong] -> [what I want instead]
                 2. ...
                 THUMBNAIL: [A or B] + changes
          TITLE: [keep / alternate / new]
   Then end with a 5-line chat summary: length, the 3 strongest moments,
   anything unverified, and "Send all changes in one
   message using the template in the review sheet."
   REVISION ROUND: when the user sends the change list, apply EVERY item, re-
   render only the changed ranges, re-run A12,
   and re-deliver files 1-5 marked v2 (the review sheet lists each change and
   where it landed). If an item conflicts with
   Part A (e.g. adds gore or an invented fact), do the nearest safe version and
   say so.


   A10. THUMBNAIL
   - A dedicated 1280x720 scene (thumb.js) with the episode's own art, not a
   video frame with text added.
   - 3 elements only: (1) one figure with an expressive face, cut out with a
   soft rim light; (2) one high-stakes symbol;
     (3) 2-4 words in Bebas Neue (npm @fontsource/bebas-neue), with a 2-3 px
   dark stroke. Dark or textured parchment
     background; the figure fills 40-55% of the height; the bottom-right 25% is
   clear (timestamp badge); the text never
     repeats the title.
   - Export thumb.png, thumb-b.png (variant) and 128x72 versions; LOOK at the
   small ones and confirm they still read.


   A11. TITLE, DESCRIPTION, PINNED COMMENT
   - Title 45 characters or fewer, curiosity or conflict first, no dates, no
   series tag. Main title + 2 alternates.
   - Description template (fill timestamps from data/beats.json; keep [Link]
   where no link is known):
     <2-3 sentence hook>
     🔔  Subscribe to ClearCut History for bite-sized, deep-dive historical
   documentaries: [Insert Link]
     ⏱️ TIMESTAMPS: 00:00 <cold-open name> / <mm:ss> <beat name> ... (first must
   be 00:00)
     📚 WATCH THE FULL SERIES (The Fall of the Mughals): Part 1 - The Kingmakers
   Who Killed an Emperor: [Link] · Part 2 -
     57 Days That Broke the Mughal Empire: [Link] · Part 3 - Why India's Fate
   Was Decided at Panipat: [Link] · Part 4 -
     From Emperor to Pensioner: [Link] · Part 5 - Was It Really Aurangzeb's
   Fault?: [Link] · Part 6 - The Empire That Ran








     Out of Land: [Link] · Part 7 - Governors Who Became Kings: [Link] · Part 8
   - Rebels Who Built Their Own Kingdoms:
     [Link] · Part 9 - Why No One Could Replace the Mughals: [Link] · Part 10 -
   When India Was the World's Factory: [Link]
     · Part 11 - Everyday Life Before the British: [Link] · Part 12 - The Empire
   Fell. The Art Flourished.: [Link]
     (one        ▶️
             line per part)
       🧭 PREVIOUS SERIES (Europeans in India): First In, Last Out: The Portuguese
   in India · The Dutch in India · From
     Merchants to Masters: The English in India · How France Almost Won India ·
   Denmark Forgot Him. He Held the Fort.
     (one        ▶️
             line each, [Link])
       💬 QUESTION FOR THE COMMENTS: <episode question>
       📖 SOURCES: Rajiv Ahir, A Brief History of Modern India, Ch. 4 + every
   source in script.json
     #IndianHistory #ClearCutHistory #Documentary #MughalEmpire + 2-3 episode
   hashtags
   - Pinned comment: the episode's question, ready to paste (pin within 10
   minutes of publishing), plus 5 short reply
     starters (agree-and-extend, a gentle sourced correction, a follow-up
   question, a thank-you, a "next episode" pointer).


   A12. PRE-EXPORT CHECKLIST (PASS/FAIL per beat in the review sheet; fix every
   FAIL before delivering)
   1 Hook (no intro; mid-conflict first line; question by 0:15; change by 0:03
   and every 2-3 s to 0:18; captions from 0.0 s)
   2 Open loops at every star point with a sting                     3 Re-hooks: `beats` gaps 60 s
   or less; whip + new scene + beat card
   4 Pacing: `events` no gap > 3.5 s; nothing static > 4 s; idle motion visible
   5 Camera: every shot moves; zero
   cross-fades; snap-zoom within 0.15 s of each reveal word 6 Maps: ink-bleeds,
   self-drawing routes, pulsing markers,
   anchor map continuity 7 Collage: shadow + paper edge + subtle motion;
   portrait sources listed 8 Audio: SFX on every
   move; music ducked 15-20 dB; voice clear 9 Story: no "and then"/"after
   that"/"next,"/"Then"; takeaway + tease
   10 Accuracy: VERIFY done; estimates hedged; quotes verbatim or labelled; A7
   met 11 Length in target 12 Packaging: title
   45 chars or fewer, no dates or tag; thumbnail 3 elements, 2-4 words, readable
   at 10%, bottom-right clear, text differs from
   the title; description complete; pinned comment ready.


   A13. NEVER
   AI-generated images/video or any voice but the local Kokoro; paid APIs or
   credits; downloading images yourself;








   copying another creator's script, art or frames; invented quotes or numbers;
   gore; an intro, logo or greeting before
   the story; delivering a frame you haven't looked at; committing renders;
   stopping mid-run to ask for approval.




Episode 1 — The Kingmakers Who Killed an Emperor
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 1 of 12
   # Title: "The Kingmakers Who Killed an Emperor"   Project: ~/faceless-
   shorts/mughals-ep01-kingmakers
   # Target length: 6:00–7:00 (≈ 950–1,050 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md in full and
   follow it. This episode ALSO builds the
   series kit ~/faceless-shorts/_mughals-kit/ (A1): the anchor map (India 1707,
   Mughal green), a Mughal court set (red
   sandstone arches, jharokha balcony, throne platform), an emperor-figure base
   with costume variants, the cut-out collage
   helpers (shadow, paper edge, pop, rotate) and the thumbnail scene template.
   Book: ~/faceless-shorts/ahir.pdf (pp. 64, 67–68).

   ## Story
   Logline: in twelve years after Aurangzeb's death, the throne of the world's
   richest empire became a prize that two noble
   brothers handed out — and took back.
   Conflict: emperors vs the nobles who made them. Personify: Bahadur Shah I
   (the peacemaker with no plan), Jahandar Shah and
   Zulfikar Khan (the minister who ran him), the Sayyid brothers (the
   kingmakers), Farrukhsiyar (the emperor who tried to
   escape them), Muhammad Shah (the teenager who turned on them), Nizam-ul-Mulk
   (the noble who helped).


   COLD OPEN (0:00–0:18), verbatim:
   "In 1719, two brothers had a Mughal emperor dragged from his palace, blinded
   and killed. No nobles had ever done that to an
   emperor before. And within a single year, four different men sat on the
   Mughal throne. How did the greatest empire in the
   world become a prize to be handed out?"
   Shots: 0.0 s night palace corridor, torches, two long shadows moving
   (cam.push) · 2.5 s snap to an empty throne, a crown
   rolling to a stop · 5 s a cloth dropped on the floor (no violence) · 8 s four
   crowns stamp in a row with "1719" · 12 s
   anchor map of the 1707 empire, huge and green · 15 s slow push on the throne;
   sting.








   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "1707 · THE OLD MAN WINS" — Aurangzeb dies (1707); a succession
   war; Prince Muazzam, about 63, wins and kills his
      brothers Azam and Kam Bakhsh; becomes Bahadur Shah I.
   B2 (~1:05) "1707 · MAKE PEACE" — frees the Maratha prince Shahu, confirms
   Rajput chiefs; acts against Banda Bahadur in
      Punjab; Khafi Khan calls him "Shah-i-Bekhabar" (the unaware king).
      ★ (~1:45) "But the man who made peace with everyone left no plan for who
   came next."
   B3 (~1:50) "1712 · THE MINISTER'S KING" — Bahadur Shah dies (Feb 1712);
   Jahandar Shah rules through Zulfikar Khan, who starts
      izara (revenue farming); Jahandar abolishes the jizya.
   B4 (~2:35) "1713 · ENTER THE KINGMAKERS" — the Sayyid brothers, Abdullah Khan
   (Hassan Ali) and Hussain Ali, back Farrukhsiyar;
      Jahandar Shah is killed; Farrukhsiyar abolishes jizya and the pilgrimage
   tax; in 1717 he grants the English Company its
      farmans (callback to the English episode).
      ★ (~3:20) "Farrukhsiyar thought the brothers worked for him. He was about
   to learn the opposite."
   B5 (~3:25) "1719 · THE FIRST REGICIDE" — the brothers, helped (per the book)
   by Peshwa Balaji Vishwanath, depose Farrukhsiyar;
      he is blinded and killed — the first Mughal emperor killed by his own
   nobles (book).
   B6 (~4:10) "1719 · FOUR EMPERORS" — Rafi-ud-Darajat (28 Feb–4 Jun 1719, the
   shortest reign); Rafi-ud-Daula as Shah Jahan II
      (6 Jun–17 Sep 1719); then a 17-year-old, Raushan Akhtar, becomes Muhammad
   Shah.
      ★ (~4:55) "The brothers thought a teenager would be easy to control. They
   were wrong."
   B7 (~5:00) "1720 · THE KINGMAKERS FALL" — Muhammad Shah, with Nizam-ul-Mulk
   and others, moves against them: Hussain Ali
      murdered (1720), Abdullah defeated (1720) and later poisoned (1722).
   B8 (~5:45) TAKEAWAY — when nobles can make and break emperors, the emperor
   stops being the centre; everyone starts
      building their own power. Sidney Owen (kinetic text, verbatim, book p.
   67): Bahadur Shah I "was the last Emperor of whom
      anything favourable can be said." Tease Ep 2: "Muhammad Shah would rule
   for 29 years. But in 1739, a king from Persia was
         coming for his throne."


   ## Facts allowed (book pp. 64, 67–68 unless marked)
   Aurangzeb ruled 1658–1707; wars of succession; Bahadur Shah I aged 63 at
   accession, killed brothers Azam and Kam Bakhsh;
   Shah-i-Bekhabar (Khafi Khan); pacific policy (Shahu released, Rajputs
   confirmed); action vs Banda Bahadur; died Feb 1712;
   Jahandar Shah Mar 1712–Feb 1713 with Zulfikar Khan, izara, jizya abolished;








   Farrukhsiyar 1713–1719, killed Jahandar with
   the Sayyid brothers ("King Makers"); abolished jizya and pilgrimage tax; 1717
   farmans; dethroned 1719 with Balaji
   Vishwanath's help (book), blinded and killed, the first emperor killed by
   nobles; Rafi-ud-Darajat 28 Feb–4 Jun 1719;
   Rafi-ud-Daula 6 Jun–17 Sep 1719 as Shah Jahan II; Muhammad Shah (Raushan
   Akhtar) "Rangeela"; with Nizam-ul-Mulk he
   killed the Sayyids.
   Wikipedia "Sayyid brothers": Hassan Ali Khan (Qutb-ul-Mulk) and Hussain Ali
   Khan; Muhammad Shah aged 17; Hussain Ali
   murdered 1720; Hassan Ali defeated Nov 1720, poisoned 1722.
   CORRECTION (do not revert): Bahadur Shah I reigned 1707–1712 (Britannica).
   The book's "1709" is when the succession fight
   ended, not his accession. Say "1707".
   Do NOT repeat the book's "opium addict" label for Shah Jahan II.

   ## VERIFY before rendering
   Balaji Vishwanath's role in 1719 (book only); exact manner and date of
   Farrukhsiyar's death; Muhammad Shah's age; Khafi
   Khan's title for Bahadur Shah I; Jahandar Shah's jizya abolition.


   ## Cast and kit (new)
   Aurangzeb (only as an aged silhouette at a window, B1) · Bahadur Shah I
   (white beard, gentle) · Azam, Kam Bakhsh (brief
   silhouettes) · Shahu (young Maratha prince leaving a gate) · Banda Bahadur
   (distant rider) · Jahandar Shah · Zulfikar
   Khan (minister with ledger) · the Sayyid brothers (matching turbans, one with
   a sword, one with a ledger, always together;
   a recurring "puppet strings" motif) · Farrukhsiyar (young, nervous) · two
   puppet emperors (thin, pale) · Muhammad Shah
   (teen, then confident) · Nizam-ul-Mulk (Deccan dress).
   Kit: `throneCarousel` (crowns cycle onto the throne), `puppetStrings` (gold
   strings from the brothers' hands to an emperor;
   snapped in B7).
   Map: anchor map stays green; a small crimson pin at Calcutta flashes on "1717
   farmans".

   ## Sound
   Court murmur, palace footsteps, a crown's metallic roll (cold open), wax
   seals on farmans, hooves for messengers. Tension
   music in cold open, B5, B7; courtly bed in B1–B4; uneasy pulse in B6.


   ## Packaging
   Title: "The Kingmakers Who Killed an Emperor" (36). Alternates: "Four
   Emperors in One Year" · "The Brothers Who Owned the
   Mughal Throne".








   Thumbnail: (1) one Sayyid brother, cold half-smile, holding gold puppet
   strings, rim light; (2) a small emperor figure on
   the strings above an empty throne; (3) text "4 EMPERORS. 1 YEAR." (variant B:
   "PUPPET EMPEROR").
   Description hook: "In 1719, two noble brothers deposed, blinded and killed a
   Mughal emperor — the first time nobles had ever
   done it. Here's how the throne of the world's richest empire became a prize
   to be handed out."
   Comment question: "Who really ruled the Mughal Empire in 1719 — the emperor,
   or the Sayyid brothers?"
   Hashtags: #LaterMughals #SayyidBrothers #Farrukhsiyar




Episode 2 — 57 Days That Broke the Mughal Empire
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 2 of 12
   # Title: "57 Days That Broke the Mughal Empire"   Project: ~/faceless-
   shorts/mughals-ep02-nadir-shah
   # Target length: 6:00–7:00 (≈ 950–1,050 words)

   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy ~/faceless-shorts/_mughals-kit/.
   Book pp. 64–65, 68, 76. NOTE: this is the FIRST episode released, so it must
   stand alone (no "as we saw last time"); a
   one-line callback to Ep 1 is fine.

   ## Story
   Logline: in 1739 a Persian conqueror held Delhi for a few weeks and left the
   Mughal Empire broken — and, one historian
   argues, opened the door for the East India Company.
   Conflict: Nadir Shah vs Muhammad Shah. Personify: Muhammad Shah "Rangeela"
   (pleasure over the border), Nadir Shah
   (ruthless, fast), Saadat Khan of Awadh (caught in between), Nizam-ul-Mulk
   (already half-independent).


   COLD OPEN (0:00–0:18), verbatim:
   "In 1739, a Persian king rode into Delhi as its master. When he left a few
   weeks later, he took the Peacock Throne and the
   Kohinoor diamond with him. One historian says those days made it possible for
   a trading company to conquer India. How?"
   Shots: 0.0 s Delhi gate at dawn, turquoise Persian banners pour through
   (cam.push) · 2.5 s snap to the Peacock Throne being
   lifted onto a cart · 5.5 s the Kohinoor glows in a gloved hand · 9 s anchor
   map: a turquoise arrow strikes from the
   north-west · 12 s a tiny crimson Company flag in Bengal flickers on · 15 s
   slow push on the empty throne platform; sting.







   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "1719 · THE PLEASURE KING" — Muhammad Shah rules 29 years (1719–
   48), called "Rangeela" for his luxurious life;
         independent states form in his reign (Hyderabad 1724, Bengal, Awadh,
   Punjab) (p. 64).
   B2 (~1:00) "1737 · WARNING SHOTS" — the north-west border neglected (book);
   Peshwa Baji Rao I raids up to Delhi in 1737 with
         500 horsemen (p. 68).
      ★ (~1:40) "Delhi had just been shown how weak it was. Someone in Persia
   was watching."
   B3 (~1:45) "1738 · THE STORM" — Nadir Shah, the Persian emperor, takes Lahore
   and marches on.
   B4 (~2:30) "1739 · KARNAL" — 13 February 1739: the Mughal army is defeated at
   Karnal; Muhammad Shah is captured (pulsing battle
         marker; no fighting shown).
      ★ (~3:10) "The battle at Karnal was only the beginning. The real damage
   happened inside Delhi."
   B5 (~3:15) "1739 · DELHI" — Nadir enters Delhi (20 March 1739); after an
   attack on his troops, a massacre on 22 March kills an
      estimated 20,000–30,000 people (figures uncertain; show only empty
   streets, closed doors, smoke); a huge fine on the city.
   B6 (~4:00) "1739 · THE LOOT" — the Peacock Throne, the Kohinoor and the
   Darya-i-Noor; by one estimate seventy crore rupees from
      the treasury and nobles' safes (book); Saadat Khan of Awadh under pressure
   — the book says he took his own life (say it
      briefly and gently; no visual); Persia takes the lands west of the Indus,
   including Kabul.
         ★ (~4:45) "Nadir Shah went home in May. But he had shown everyone —
   Afghans, Marathas, even a company of merchants — that
      Delhi could be taken."
   B7 (~4:50) "AFTERSHOCKS" — Jon Wilson (kinetic text, verbatim from book p.
   65, trimmed with "…"): "Nader Shah was Mughal
      emperor for only fifty-seven days, in 1739, but those days created
   aftershocks that transformed India's politics… Those
         fifty-seven days laid the ground which allowed the East India Company to
   conquer territory in India for the first time."
      Label: "Jon Wilson, India Conquered".
   B8 (~5:40) TAKEAWAY — an empire's real wealth is its reputation for being
   untouchable; once that's gone, every rival moves at
      once. Tease Ep 3: "Eight years later, Nadir Shah was dead. His successor,
   an Afghan named Ahmad Shah Abdali, would come
         back again and again — until a battlefield called Panipat."

   ## Facts allowed
   Book pp. 64–65, 68, 76: Nadir Shah attacked 1738–39, took Lahore, defeated








   the Mughals at Karnal on 13 Feb 1739, captured
   Muhammad Shah, looted Delhi; Peacock Throne, Kohinoor, "seventy crore rupees"
   by one estimate; territory west of the Indus
   incl. Kabul; Muhammad Shah 1719–48 "Rangeela"; Baji Rao I's 1737 raid with
   500 horsemen; Saadat Khan's suicide under
   Nadir's demands (p. 76); the Jon Wilson quote.
   Military History wiki, "Nader Shah's invasion of the Mughal Empire": entered
   Delhi 20 Mar 1739; massacre 22 Mar, estimated
   20,000–30,000 dead (uncertain); Darya-i-Noor also taken; a fine on Delhi;
   left at the start of May 1739.
   "57 days" is Jon Wilson's figure — always attribute it to him.

   ## VERIFY before rendering
   "57 days" against the dates (Karnal 13 Feb → departure early May); Saadat
   Khan's death (manner, date); the size of Baji
   Rao's 1737 force; whether Muhammad Shah stayed on the throne after Nadir left
   (say "left Muhammad Shah on a throne without
   its treasure" only if confirmed).

   ## Cast and kit (new)
   Muhammad Shah (silks, flowers, musicians) · Nadir Shah (Persian armour, tall
   lambskin hat, fierce) · Saadat Khan ·
   Nizam-ul-Mulk (watching from the side) · Baji Rao I (rider at the horizon) ·
   Persian soldiers (turquoise sashes).
   Kit: `peacockThrone` (gold, jewelled peacock silhouettes), `kohinoor` (glow +
   sparkle), `treasureCount` (coin stacks rising
   to "70 CRORE — one estimate"), `turquoiseArrow` (the invasion on the anchor
   map).
   Map: the anchor map loses the land west of the Indus (turquoise ink-bleed);
   Hyderabad, Bengal and Awadh tint their own
   colours lightly to show autonomy.


   ## Sound
   Court music cut off by war drums; massing hooves; one distant cannon thud at
   Karnal; city silence and a dog bark for the
   massacre beat (no screams); coins pouring; a heavy cart creak for the throne.

   ## Packaging
   Title: "57 Days That Broke the Mughal Empire" (36). Alternates: "The Persian
   King Who Looted Delhi" · "How One Raid Opened
   India to the British".
   Thumbnail: (1) Nadir Shah, fierce, holding the glowing Kohinoor, rim light;
   (2) the Peacock Throne tilted on a cart;
   (3) text "HE TOOK EVERYTHING" (variant B: "DELHI FELL").
   Description hook: "In 1739, Nadir Shah of Persia crushed the Mughal army at
   Karnal, sacked Delhi and carried off the Peacock








   Throne and the Kohinoor. Historian Jon Wilson argues those few weeks made the
   British conquest of India possible. Here's
   how."
   Comment question: "Was Nadir Shah's invasion the real beginning of British
   India? Jon Wilson thinks so — do you?"
   Hashtags: #NadirShah #Kohinoor #PeacockThrone




Episode 3 — Why India's Fate Was Decided at Panipat
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 3 of 12
   # Title: "Why India's Fate Was Decided at Panipat"                Project: ~/faceless-
   shorts/mughals-ep03-panipat
   # Target length: 7:00–8:00 (≈ 1,050–1,150 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 65–67 and 78
   (incl. the box "Why Many Empire-shaking Battles at Panipat?").


   ## Story
   Logline: three times in 235 years, India's fate was decided on the same plain
   north of Delhi; the third time, an Afghan
   king stopped the Marathas from inheriting the Mughal Empire.
   Conflict: Ahmad Shah Abdali vs the Marathas. Personify: Abdali (relentless
   raider), Najib-ud-Daula (his man in Delhi),
   Raghunath Rao (pushes into Punjab), Sadashivrao Bhau (commander at Panipat),
   Vishwasrao (the Peshwa's young son),
   Shuja-ud-Daula of Awadh (chooses the Afghan side).


   COLD OPEN (0:00–0:18), verbatim:
   "Three times in 235 years, the fate of India was decided on the same flat
   field, less than a hundred kilometres north of
   Delhi. The third time, in 1761, it stopped the Marathas from inheriting an
   empire. Why there — and why then?"
   Shots: 0.0 s wide plain at dawn, mist, three ghostly armies fade in and out
   (cam.push) · 2.5 s snap: three pulsing markers
   "1526", "1556", "1761" on the anchor map · 6 s saffron banners face slate-
   grey banners · 10 s a Maratha helmet in the grass
   (no bodies) · 14 s slow push on the empty field; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "1526 · 1556 · THE FIELD" — Babur vs Ibrahim Lodi (1526, founds the
   Mughal Empire); Akbar vs Hemu (1556, Mughal rule
      continues).
   B2 (~1:05) "WHY PANIPAT?" — the book's box as a living map: the route from
   the Khyber toward Delhi; close enough to supply from







         Delhi, far enough to protect it; flat ground for cavalry; on Sher Shah
   Suri's Grand Trunk Road; a short monsoon; local
         smiths for weapons.
      ★ (~1:50) "The Mughals knew danger came from the north-west. Their answer
   was to pay it to go away."
   B3 (~1:55) "1748 · THE AFGHAN" — Ahmad Shah Abdali (Durrani), an Afghan
   elected successor of Nadir Shah after 1747, raids India
      again and again (1748–1767); the Mughals cede Punjab to buy peace (1751–
   52).
   B4 (~2:40) "1757 · DELHI AGAIN" — Abdali takes Delhi (1757), recognises
   Alamgir II, leaves Najib-ud-Daula as Mir Bakhshi and his
      agent.
         ★ (~3:25) "But the Marathas were on their way north — and they did not
   intend to share."
   B5 (~3:30) "1758 · SAFFRON IN PUNJAB" — Raghunath Rao expels Najib from Delhi
   and takes Punjab (1758); Abdali returns in 1759
         for revenge.
   B6 (~4:15) "1760 · CHOOSING SIDES" — Najib wins over the Rohillas; Shuja-ud-
   Daula of Awadh joins the Afghan side.
         ★ (~4:55) "On 14 January 1761, the two armies finally met on that same
   field."
   B7 (~5:00) "14 JAN 1761 · PANIPAT" — Sadashivrao Bhau commands; Vishwasrao,
   the Peshwa's son, is killed early; an Afghan victory;
         losses in the tens of thousands, still disputed by historians (pulsing
   marker, falling banners, a helmet in the grass;
      no bodies).
   B8 (~5:50) "AFTER" — Maratha expansion in the north halted for about a
   decade; they recover (Peshwa Madhavrao; Mahadji Shinde
      back in the north in 1771) and become the Company's strongest rival (p.
   78). Abdali's last invasion: 1767.
   B9 (~6:40) TAKEAWAY — Panipat had no real winner: Abdali went home, the
   Marathas were bled, the Mughals were spectators — and
      in Bengal a trading company, which had won at Plassey in 1757, was
   watching. Tease Ep 4: "While Indian powers fought at
         Panipat, the Mughal emperor was about to sign away Bengal."

   ## Facts allowed
   Book pp. 65–67, 78 as listed, incl. the box's six reasons and the three
   battles.
   Wikipedia "Third Battle of Panipat": 14 Jan 1761; Sadashivrao Bhau;
   Vishwasrao killed early; allies Najib-ud-Daula and
   Shuja-ud-Daula; deaths disputed (tens of thousands; estimates vary widely);
   Maratha expansion in the north halted for about
   ten years; Madhavrao and Mahadji Shinde's 1771 return; Panipat about 97 km
   north of Delhi.
   CORRECTION (do not revert): Abdali was AFGHAN (Durrani). The book once calls








   him "the Iranian invader" (p. 68); never repeat
   that.

   ## VERIFY before rendering
   Abdali's succession (1747) and invasion years; cession of Punjab 1751–52;
   Najib as Mir Bakhshi 1757; Raghunath Rao 1758;
   casualty wording (keep "tens of thousands, disputed").


   ## Cast and kit (new)
   Babur, Ibrahim Lodi, Akbar, Hemu (small cameo cut-outs in B1) · Abdali
   (Afghan dress, slate banner) · Najib-ud-Daula
   (Rohilla) · Raghunath Rao · Sadashivrao Bhau (saffron, determined) ·
   Vishwasrao (young) · Shuja-ud-Daula (plum) · Alamgir II.
   Kit: `battlePlain` (layered plain with mist, banners and dust),
   `whyPanipatInfographic` (six icons popping in turn: Khyber
   route, Delhi supply line, flat ground, GT Road, short monsoon, smithies).
   Map: anchor map — slate Afghan raids; Punjab ink-bleeds slate (1752), then
   saffron (1758), then slate (1761).


   ## Sound
   Wind over the plain; war drums building; distant cannon thuds and one sword
   ring at B7 (no screams); horses; a Maratha nagara
   drum and an Afghan drum alternating in B6.

   ## Packaging
   Title: "Why India's Fate Was Decided at Panipat" (39). Alternates: "The
   Battle That Stopped the Marathas" · "Same Field, Three
   Empires".
   Thumbnail: (1) Sadashivrao Bhau, determined, saffron, rim light; (2) a split
   map with crossed swords on Panipat and a slate
   Afghan arrow; (3) text "SAME FIELD. 3 TIMES." (variant B: "WHO REALLY WON?").
   Description hook: "Babur, Akbar and Abdali all decided India's future on the
   same plain north of Delhi. Here's why Panipat
   kept deciding empires — and how the 1761 battle stopped the Marathas from
   inheriting the Mughal throne."
   Comment question: "Which Battle of Panipat changed India the most — 1526,
   1556 or 1761?"
   Hashtags: #Panipat #Marathas #AhmadShahAbdali




Episode 4 — From Emperor to Pensioner
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 4 of 12
   # Title: "From Emperor to Pensioner"   Project: ~/faceless-shorts/mughals-
   ep04-pensioner
   # Target length: 6:00–7:00 (≈ 950–1,050 words)







   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 68–69.


   ## Story
   Logline: how the Mughal emperor went from ruler of India to a man living on a
   Company pension — by signing, not by losing
   one final battle.
   Conflict: Shah Alam II vs the powers that "protect" him. Personify: Ahmad
   Shah and the court of Udham Bai (power behind the
   throne), Alamgir II (an emperor in Abdali's shadow), Shah Alam II (the
   survivor who keeps signing), Akbar II (dignity
   without power), Bahadur Shah Zafar (the last emperor).


   COLD OPEN (0:00–0:18), verbatim:
   "In 1765, the Mughal emperor signed a paper that gave a trading company the
   right to collect the taxes of Bengal, Bihar and
   Orissa — forever. He wasn't forced at swordpoint. He signed it in exchange
   for protection. How did an emperor end up
   needing a company to protect him?"
   Shots: 0.0 s a quill dips in ink, close (cam.push) · 2.5 s snap to a seal
   stamping "DIWANI" · 5 s anchor map: Bengal, Bihar,
   Orissa ink-bleed crimson · 9 s a coin pouch passes from a Company hand to the
   emperor · 13 s slow push on the emperor's
   face, lit by one candle; sting.

   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "1748 · A COURT WITHOUT A KING" — Ahmad Shah (1748–54) leaves the
   state to the queen mother Udham Bai (titled
      Qibla-i-Alam) and the eunuch Javid Khan. State it neutrally; do NOT repeat
   the book's insulting adjectives.
   B2 (~1:00) "1754 · THE AFGHAN'S EMPEROR" — Alamgir II (1754–58), grandson of
   Jahandar Shah; Abdali reaches Delhi (Jan 1757).
      ★ (~1:40) "That same year, a small battle in faraway Bengal — at a village
   called Plassey — barely registered in Delhi.
         It should have."
   B3 (~1:45) "1757 · PLASSEY" — June 1757: the Battle of Plassey in Alamgir
   II's reign (one line; the next playlist covers it);
         Shah Jahan III (1758–59).
   B4 (~2:30) "1759 · THE WANDERING EMPEROR" — Shah Alam II (1759–1806): his
   reign sees Panipat (1761) and Buxar (1764).
         ★ (~3:10) "At Buxar, Shah Alam lost to the Company. Then the winners
   offered him a deal."
   B5 (~3:15) "1765 · ALLAHABAD" — Treaty of Allahabad (August 1765): Company
   protection, living at Allahabad; the farman granting
         the Company the Diwani of Bengal, Bihar and Orissa in perpetuity.








   B6 (~4:00) "1772 · HOME, ON SOMEONE ELSE'S TERMS" — the Marathas take him
   back to Delhi (1772); in 1803, after the English defeat
         Daulat Rao Scindia, he accepts English protection again; the emperors
   become Company pensioners.
      ★ (~4:45) "By the 1830s, the emperor's name was about to vanish from
   India's own money."
   B7 (~4:50) "1806 · A NAME WITHOUT POWER" — Akbar II (1806–37) gives Rammohan
   Roy the title "Raja"; in 1835 coins stop bearing
      the Mughal emperor's name.
   B8 (~5:30) "1857 · THE LAST EMPEROR" — Bahadur Shah II "Zafar" (1837–57); the
   Revolt of 1857 tries to proclaim him; captured,
      exiled to Rangoon, dies 1862; the empire ends legally on 1 November 1858
   with Queen Victoria's proclamation.
   B9 (~6:10) TAKEAWAY — the Mughal Empire did not fall in one battle. It was
   signed away, one "protection" at a time. Tease
      Ep 5: "So whose fault was it? Five historians have five different
   answers."


   ## Facts allowed
   Book pp. 68–69 exactly as above. Do not use the book's words "lady of poor
   intellect" or "paramour". Callback lines to the
   English and Panipat episodes are allowed.

   ## VERIFY before rendering
   Treaty of Allahabad date (Aug 1765); the 1772 return to Delhi; 1803
   protection; 1835 coins; Zafar's death in Rangoon
   (1862); the 1 Nov 1858 proclamation date; Akbar II and Rammohan Roy's title.


   ## Cast and kit (new)
   Ahmad Shah (young, distracted) · Udham Bai (dignified, veiled court
   silhouette) · Javid Khan · Alamgir II · Shah Alam II
   (three ages: young prince, emperor in a tent at Allahabad, old man) · Company
   officers (crimson) · Maratha escort
   (saffron) · Akbar II · Rammohan Roy (brief) · Bahadur Shah Zafar (old poet,
   white beard).
   Kit: `diwaniScroll` (a big farman labelled "Bengal · Bihar · Orissa"),
   `pensionLedger` (a Company ledger with stylised
   lines, no readable real text), `coinMorph` (a Mughal coin turning into a
   Company coin, 1835).
   Map: anchor map — Bengal/Bihar/Orissa turn crimson (1765); the Delhi pin
   shrinks to a dot; by 1858 the Mughal green is gone.


   ## Sound
   Quill scratches; a wax-seal thud on the Diwani; a tent flap in wind at
   Allahabad; coins; a soft, distant ship's horn for
   Rangoon; a single sitar note for Zafar's poetry.








   ## Packaging
   Title: "From Emperor to Pensioner" (25). Alternates: "The Emperor Who Signed
   India Away" · "How the Mughals Ended Up on a
   Pension".
   Thumbnail: (1) Shah Alam II, weary, handing over a scroll, rim light; (2) a
   crimson Company seal over the map of Bengal;
   (3) text "SIGNED IT AWAY" (variant B: "ON A PENSION").
   Description hook: "In 1765, the Mughal emperor Shah Alam II handed the East
   India Company the revenue of Bengal, Bihar and
   Orissa — forever. Here's how the most powerful throne in India ended up
   living on a company pension."
   Comment question: "Could Shah Alam II have refused the Diwani? What would you
   have done in his place?"
   Hashtags: #ShahAlamII #Diwani #BahadurShahZafar




Episode 5 — Was It Really Aurangzeb's Fault?
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 5 of 12
   # Title: "Was It Really Aurangzeb's Fault?"                       Project: ~/faceless-
   shorts/mughals-ep05-five-verdicts
   # Target length: 7:00–8:00 (≈ 1,050–1,150 words)

   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 69–72, 74, 86
   (causes; the "Views" boxes; "Causes of the Mughals' Downfall in a Nutshell").


   ## Story
   Logline: a courtroom of historians — five scholars, five culprits for the
   fall of the Mughal Empire — and why the honest
   answer is "all of the above".
   Format: a paper-cut COURTROOM. The "case" is the fall of the Mughal Empire.
   Each historian takes the witness stand in turn,
   with a quote (kinetic text) and an exhibit (a map or object). The viewer is
   the jury.
   SENSITIVITY (binding): this episode is about historians' arguments, not a
   judgement of any religion. Show Aurangzeb with
   the same dignity as every other figure. No temple-vs-mosque imagery. Present
   each view as that historian's view, and give
   the counter-views equal time. The narrator never gives a personal verdict on
   Aurangzeb's faith.


   COLD OPEN (0:00–0:18), verbatim:
   "Five historians studied the fall of the greatest empire in Indian history.
   They came back with five different culprits:







   one emperor, a broken army, a rotten court, a farm crisis, and a system that
   simply ran out of room. Who was right?"
   Shots: 0.0 s courtroom doors swing open (cam.push) · 2 s five witness chairs
   light up one by one with five icons (crown,
   sword, cracked mirror, plough, cracked map) · 8 s a gavel bangs · 11 s the
   anchor map in an "evidence" frame, green
   cracking · 15 s slow push on the empty judge's chair; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "THE CASE" — the book's framing: empire-centric vs region-centric
   explanations; the decline began under Aurangzeb
         and sped up after 1707; with capable successors the empire "might not have
   fallen" (p. 70).
   B2 (~1:00) "WITNESS 1 · SIDNEY OWEN" — blames Aurangzeb's policies:
   reimposing the jizya estranged the Rajputs; Shivaji's
         Marathas drained the treasury; Nadir Shah completed the ruin (p. 72; short
   verbatim quote, labelled).
      ★ (~1:45) "Case closed? Not according to the next witness, who said none
   of that mattered as much as one thing."
   B3 (~1:50) "WITNESS 2 · WILLIAM IRVINE" — military inefficiency was "the
   principal, if not the sole, cause"; the empire was
         doomed even without Nadir, Abdali, Dupleix or Clive (pp. 71–72).
   Paraphrase his "bandit/freebooter" line; do not quote
      those words.
   B4 (~2:35) "WITNESS 3 · J.N. SARKAR" — a "rottenness at the core": a depraved
   royalty, selfish nobles, corruption (p. 72).
      ★ (~3:20) "Three witnesses, three villains — all inside the palace. The
   next witness looked outside, in the fields."
   B5 (~3:25) "WITNESS 4 · IRFAN HABIB" — the 17th- and 18th-century sources
   stress economic and administrative causes and "know
      little of religious reaction or national consciousness" (p. 71); the
   agrarian crisis.
   B6 (~4:10) "WITNESS 5 · SATISH CHANDRA" — a structural crisis: a stagnant
   economy, the jagirdari crisis, factions of nobles,
      the failure to accommodate the Marathas; "individual failings… have
   necessarily to be seen against the background of
         these deeper… factors" (p. 71).
      ★ (~4:55) "So the witnesses disagree. But the evidence on the table points
   the same way."
   B7 (~5:00) "THE EVIDENCE" — the book's nutshell list (p. 74) as exhibits
   popping onto the table: personal despotism and weak
      successors; no law of succession, so wars of succession; degenerating
   nobles; a deteriorating army; an empire too vast
         for the transport of the day; Aurangzeb's religious policy and the revolts
   it fed; the failed Deccan policy that kept
      him away from the capital; the Irani and Durrani invasions; plus the








   arrival of the Europeans (p. 86).
   B8 (~6:00) "THE VERDICT" — no single culprit: personal choices mattered
   (Owen, Sarkar), but they acted on a system already under
         strain (Habib, Chandra), and the army could no longer hold it together
   (Irvine).
   B9 (~6:40) TAKEAWAY — big collapses are rarely one person's fault; they
   happen when a system's weaknesses meet weak hands.
         Tease Ep 6: "And the weakest point in the Mughal system was surprisingly
   simple: it was running out of land."

   ## Facts allowed
   Only the five historians' views as printed in the book (pp. 71–72), the
   empire- vs region-centric framing (pp. 69–70), the
   nutshell list (p. 74) and the summary (p. 86). Quotes verbatim and short, or
   labelled paraphrase. Show each historian's name
   and book title under every quote.


   ## VERIFY before rendering
   That every quote fragment matches the book exactly (copy from the PDF, never
   retype from memory); the book titles as
   credited in Ahir: Owen, "The Fall of the Mughal Empire"; Irvine, "Army of the
   Indian Mughals"; Sarkar, "Fall of the Mughal
   Empire, Vol. IV"; Habib, "The Agrarian System of Mughal India"; Satish
   Chandra, "Parties and Politics at the Mughal Court,
   1707–40".


   ## Cast and kit (new)
   Five historians as neutral scholar cut-outs (name cards, generic faces, no
   attempt at a real likeness) · Aurangzeb
   (dignified, inside the "exhibit" frame only) · an empty judge's chair (the
   viewer is the judge).
   Kit: `courtroom` (paper-cut set with jury box, witness stand, evidence
   table), `exhibitPop` (objects drop onto the table
   with a thud), `verdictScale` (a balance with five weights).
   Map: the anchor map in an evidence frame; cracks appear as each cause is
   named.


   ## Sound
   Courtroom murmur, a gavel, chair creaks, paper slides for exhibits, a soft
   heartbeat-like pulse under the verdict.


   ## Packaging
   Title: "Was It Really Aurangzeb's Fault?" (32). Alternates: "Who Really
   Killed the Mughal Empire?" · "Five Historians, Five
   Culprits".
   Thumbnail: (1) a stern scholar figure pointing, rim light (not Aurangzeb, to








   avoid a one-man "guilty" framing); (2) a
   cracked Mughal crown on an evidence table under a gavel; (3) text "5
   HISTORIANS. 5 VERDICTS." (variant B: "WHO'S GUILTY?").
   Description hook: "Was it Aurangzeb's policies, a rotten army, a farm crisis,
   or a system that ran out of room? We put five
   great historians on the stand to explain why the Mughal Empire fell — and let
   you decide."
   Comment question: "Which historian convinced you the most — Owen, Irvine,
   Sarkar, Habib or Satish Chandra? Why?"
   Hashtags: #Aurangzeb #MughalDecline #UPSCHistory




Episode 6 — The Empire That Ran Out of Land
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 6 of 12
   # Title: "The Empire That Ran Out of Land"   Project: ~/faceless-
   shorts/mughals-ep06-out-of-land
   # Target length: 6:00–7:00 (≈ 950–1,050 words)

   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 67, 70, 73–75, 80, 83.

   ## Story
   Logline: the Mughal Empire paid its nobles in land; when it ran out of land,
   the nobles squeezed the peasants, the zamindars
   switched sides and the provinces started looking after themselves.
   Personify: composite characters, clearly labelled on screen as "a typical
   noble", "a typical peasant family", "a typical
   zamindar" (not real people), plus a Rajput chief, a Maratha revenue
   collector, and Aurangzeb and Zulfikar Khan as the
   officials who try fixes.


   COLD OPEN (0:00–0:18), verbatim:
   "The Mughal Empire paid its nobles in land. By Aurangzeb's reign, it had more
   nobles than land to give. So the empire started
   paying them in promises — and someone else had to pay the difference."
   Shots: 0.0 s a noble's hand reaches for a land deed on a table, and the table
   is empty (cam.push) · 2.5 s snap: a map of jagirs
   fills up like a sold-out board · 6 s a deed with an inflated "₹ ???" stamped
   "ON PAPER" · 10 s a peasant's grain basket being
   emptied · 14 s slow push on the peasant's face; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "HOW THE EMPIRE PAID" — nobles held mansabs and jagirs or ran
   subahs; Mughal rule as "the rule of the nobility";
         Akbar's well-knit organisation (pp. 70, 73).







   B2 (~1:00) "BEJAGIRI" — the number of amirs and ranks grew sharply; little
   land left (bejagiri); Aurangzeb records higher
      incomes on paper (p. 74).
      ★ (~1:40) "On paper, everyone got paid. In the fields, someone had to find
   the money."
   B3 (~1:45) "THE SQUEEZE" — nobles press peasants to collect the recorded
   income; nobles and peasants both turn against the
      state; peasants pay the state, zamindars, jagirdars and revenue farmers
   (pp. 74, 80); Zulfikar Khan's izara (revenue
      farming) under Jahandar Shah (p. 67).
   B4 (~2:30) "THE MIDDLEMEN" — zamindars (rais, rajas, thakurs, khuts,
   deshmukhs): hereditary, collected revenue, kept soldiers;
      their power grew under Aurangzeb; regional loyalties grew; they helped
   ambitious nobles (p. 70).
      ★ (~3:15) "Now the people who collected the empire's money had their own
   armies — and their own ideas."
   B5 (~3:20) "FACTIONS" — nobles split by religion, homeland and tribe (Irani,
   Turani, Afghan, Hindustani) and fight for power at
      court (pp. 73, 83).
   B6 (~4:05) "THE PROVINCES PUSH BACK" — the Rajputs no longer trust the
   Mughals; the Marathas demand chauth and sardeshmukhi and,
      by 1740, spread over Gujarat, Malwa and Bundelkhand (p. 73).
      ★ (~4:45) "By 1740, the Mughals were losing money from below, from inside
   and from the side. And they were spending
      more than ever."
   B7 (~4:50) "THE DEFICIT" — wars, luxury and a shrinking khalisa (crown land):
   spending exceeds income; no scientific or
      technical progress to grow a stagnant economy; trade grows but doesn't
   fill the treasury, while Europeans gain on the
      coasts (pp. 74–75, 80).
   B8 (~5:40) TAKEAWAY — an empire that pays its officials in land has to keep
   conquering; when the conquests stop, the system eats
      itself. Tease Ep 7: "And the officials who stopped waiting for pay simply
   kept the provinces for themselves."


   ## Facts allowed
   Book pp. 67, 70, 73–75, 80, 83 as cited. No numbers beyond the book's (no
   invented incomes; "₹ ???" is a visual only).


   ## VERIFY before rendering
   The meanings of khalisa and izara (one-line on-screen definitions); that
   bejagiri is explained correctly; the list of
   zamindar titles.


   ## Cast and kit (new)
   A typical noble (composite, labelled) · a peasant family (composite,








   labelled, dignified) · a zamindar (composite) · a Rajput
   chief · a Maratha revenue collector · Aurangzeb (brief) · Zulfikar Khan
   (brief).
   Kit: `jagirBoard` (a map divided into plots that fill up, with a "SOLD OUT"
   ribbon), `incomeGap` (two bars, "on paper" vs
   "collected", with the gap animated and no real figures), `deficitScale`
   (income vs spending), `taxTier` (a peasant at the
   bottom with four collectors stacked above).
   Map: anchor map — Gujarat, Malwa and Bundelkhand ink-bleed saffron by 1740.


   ## Sound
   Quill scratches on ledgers, a coin trickle vs a coin pour, grain falling into
   baskets, a plough in soil, court murmur for
   the factions, a Maratha nagara drum (B6).


   ## Packaging
   Title: "The Empire That Ran Out of Land" (31). Alternates: "Why the Mughals
   Went Broke" · "The Mughal Crisis Nobody Talks
   About".
   Thumbnail: (1) an angry noble holding an empty land deed, rim light; (2) a
   map of the empire stamped "SOLD OUT"; (3) text
   "NO LAND LEFT" (variant B: "PAID IN PROMISES").
   Description hook: "The Mughals paid their nobles in land. When the land ran
   out, the nobles squeezed the peasants, the
   zamindars changed sides and the provinces broke away. Here's the jagirdari
   crisis, explained simply."
   Comment question: "Can any empire that pays its officials in land survive
   once it stops conquering?"
   Hashtags: #JagirdariCrisis #MughalEconomy #UPSCHistory




Episode 7 — Governors Who Became Kings
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 7 of 12
   # Title: "Governors Who Became Kings"   Project: ~/faceless-shorts/mughals-
   ep07-successor-states
   # Target length: 6:00–7:00 (≈ 950–1,050 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 75–76, 79, 86.


   ## Story
   Logline: three Mughal governors never declared independence — yet Hyderabad,
   Awadh and Bengal became family kingdoms, and
   Bengal's headed straight for Plassey.
   Personify: Nizam-ul-Mulk (Kilich Khan, the patient strategist), Saadat Khan







   Burhan-ul-Mulk (the ambitious courtier), Murshid
   Quli Khan (the capable administrator), Alivardi Khan (the deputy who seized
   power).

   COLD OPEN (0:00–0:18), verbatim:
   "Three Mughal governors never declared independence. They still called the
   emperor their master. Yet soon they were
   handing their thrones down within their own families. How do you leave an
   empire without ever saying goodbye?"
   Shots: 0.0 s a governor bows deeply toward a distant throne (cam.push) · 3 s
   snap: behind his back he passes a crown to a
   younger man · 7 s anchor map: three provinces glow teal-green, plum and olive
   · 11 s a seal with two names (emperor's and
   governor's) · 15 s slow push on the governor's face; sting.

   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "THREE KINDS OF STATES" — the book's three categories with one-line
   examples (successor states, independent
      kingdoms, new states) (p. 75); this episode covers the successor states.
   B2 (~1:00) "1713 · A DREAM IN THE DECCAN" — Zulfikar Khan first imagines an
   independent Deccan and dies in 1713 (p. 75).
      ★ (~1:40) "The idea didn't die with him. It found a patient new owner."
   B3 (~1:45) "1724 · SHAKAR KHEDA" — Kilich Khan (Nizam-ul-Mulk), angry that
   the emperor made Mubariz Khan viceroy of the Deccan,
      defeats and kills him at Shakar Kheda (1724), takes the Deccan, becomes
   viceroy (1725) and takes the title Asaf Jah: the
      Asaf Jahi house of Hyderabad (pp. 75–76; callback: he helped topple the
   Sayyids in Ep 1).
   B4 (~2:30) "AWADH" — Saadat Khan Burhan-ul-Mulk, a Shia noble, joins the plot
   against the Sayyid brothers, is rewarded, is
      later pushed out of the court, and builds his own state in Awadh (1722,
   per the book's summary).
      ★ (~3:10) "Then Nadir Shah arrived — and Saadat Khan was caught in the
   middle."
   B5 (~3:15) "1739 · THE PRICE" — under pressure from Nadir Shah's demands, the
   book says Saadat Khan took his own life (brief,
      gentle, no visual; Ep 2 callback); Safdar Jang succeeds him (p. 76).
   B6 (~4:00) "BENGAL" — Murshid Quli Khan, the founder (1717, per the book's
   summary), makes Bengal prosperous; in 1727 his
      son-in-law Shuja-ud-din succeeds him.
      ★ (~4:40) "Shuja's son, Sarfaraz Khan, inherited a rich province — and a
   deputy who wanted it."
   B7 (~4:45) "1740 · GIRIA" — Alivardi Khan, deputy governor of Bihar, kills
   Sarfaraz Khan at Giria (Gheria) in 1740, takes power,
      and pays the emperor a yearly tribute to stay nominally loyal (p. 76).
   B8 (~5:30) TAKEAWAY — these states kept the emperor as an umbrella while








   ruling for themselves (p. 79): loyal in name,
      independent in practice. Alivardi's grandson would be Siraj-ud-Daula, the
   Nawab who fought at Plassey (one line; tease
      for the next playlist). Tease Ep 8: "But some new kingdoms didn't bother
   pretending. They were born in revolt."


   ## Facts allowed
   Book pp. 75–76, 79, 86 as cited.
   CORRECTION (do not revert): Shuja-ud-din was Murshid Quli Khan's SON-IN-LAW
   (Wikipedia, "Shuja-ud-Din Muhammad Khan"), not
   his son as the book says; Sarfaraz Khan was Shuja-ud-din's son.


   ## VERIFY before rendering
   The Battle of Shakar Kheda (1724) and that Mubariz Khan was killed; Saadat
   Khan's death (manner, date) and Safdar Jang's
   relation to him (if unsure, say "his successor"); the Awadh 1722 and Bengal
   1717 dates; the Battle of Giria (1740); that
   Siraj-ud-Daula was Alivardi's grandson.


   ## Cast and kit (new)
   Zulfikar Khan (brief) · Nizam-ul-Mulk (Deccan dress, calm) · Mubariz Khan ·
   Saadat Khan · Safdar Jang · Murshid Quli Khan
   (administrator with ledgers) · Shuja-ud-din · Sarfaraz Khan · Alivardi Khan
   (a soldier's bearing) · the emperor (distant,
   small on his throne).
   Kit: `doubleSeal` (a seal with two names), `bowAndPass` (a bow toward Delhi
   while a crown passes behind the back — the
   episode's recurring gag, used three times).
   Map: anchor map — Hyderabad (teal-green), Awadh (plum) and Bengal (olive)
   ink-bleed in; a thin gold "umbrella" outline of the
   empire stays over them.


   ## Sound
   Court bows (fabric rustle), a battle drum and one sword ring at Shakar Kheda
   and Giria (no screams), coins for tribute, a
   river ferry in Bengal.


   ## Packaging
   Title: "Governors Who Became Kings" (26). Alternates: "How Three Governors
   Broke the Mughal Empire" · "Loyal in Name Only".
   Thumbnail: (1) Nizam-ul-Mulk with a sly, calm smile, rim light; (2) a Mughal
   crown slipped behind his back as he bows;
   (3) text "LOYAL? NOT REALLY." (variant B: "NEVER SAID GOODBYE").
   Description hook: "Hyderabad, Awadh and Bengal never declared independence
   from the Mughals — yet their governors turned them








   into family kingdoms. Here's how the empire was taken apart from the inside."
   Comment question: "Were these governors traitors, or realists saving their
   provinces from a collapsing empire?"
   Hashtags: #Hyderabad #Awadh #BengalNawabs




Episode 8 — Rebels Who Built Their Own Kingdoms
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 8 of 12
   # Title: "Rebels Who Built Their Own Kingdoms"   Project: ~/faceless-
   shorts/mughals-ep08-rebel-kingdoms
   # Target length: 7:00–8:00 (≈ 1,050–1,150 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 75, 77–79, 86.

   ## Story
   Logline: a farming community near Agra, the Sikhs of Punjab, the Marathas and
   Afghan settlers all rose against the Mughals
   — and each built a kingdom of its own.
   Personify: Suraj Mal (the Jat state-builder), Banda Bahadur and Ranjit Singh
   (from Sikh resistance to a Sikh kingdom), the
   Peshwas (Maratha ambition), Ali Muhammad Khan and Mohammad Khan Bangash
   (Afghan opportunists).
   SENSITIVITY: describe the Sikh and Jat revolts as the book does, as
   resistance to Mughal policy; no communal framing. Depict
   Guru Gobind Singh with full respect: consider showing a symbol (a lit lamp or
   a khanda emblem) rather than a face, and
   say which you chose in the plan screen.


   COLD OPEN (0:00–0:18), verbatim:
   "A farming community near Agra, a band of Sikh fighters in Punjab and a
   Maratha army from the Deccan all rebelled against
   the Mughal Empire. All three ended up ruling kingdoms of their own. How do
   rebels become kings?"
   Shots: 0.0 s three torches light in three corners of the anchor map
   (cam.push) · 2.5 s snap: ochre, blue-grey and saffron
   banners rise · 6 s a plough morphs into a spear, then a sceptre (cut-out
   morph) · 11 s three crowns drop onto three maps ·
   15 s slow push on the crumbling green centre; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "NEW STATES" — the book's "new states", set up by rebels against
   the empire: Marathas, Sikhs, Jats, Afghans (pp. 75, 86).
   B2 (~0:55) "THE JATS" — Jat farming settlers around Delhi, Mathura and Agra
   revolt against Aurangzeb's policies; Churaman and







         Badan Singh set up the Jat state of Bharatpur (p. 77).
      ★ (~1:35) "Then came a ruler who turned a revolt into a real state."
   B3 (~1:40) "SURAJ MAL" — efficient administration; territory from the Ganga
   to the Chambal, including Agra, Mathura, Meerut and
      Aligarh; after his death in 1763 the state breaks up (p. 77).
   B4 (~2:25) "THE SIKHS" — Guru Gobind Singh makes the Sikhs a fighting force
   to defend their faith and liberties; Banda Bahadur
      leads from 1708 and is defeated and killed (pp. 77–78).
      ★ (~3:05) "It looked like the end. It wasn't — two foreign invasions gave
   the Sikhs their chance."
   B5 (~3:10) "THE MISLS" — after Nadir Shah and Abdali, the Sikhs reassert
   themselves in 12 misls (confederacies) (p. 78).
   B6 (~3:55) "RANJIT SINGH" — son of Mahan Singh of the Sukarchakiya misl;
   Lahore (1799), Amritsar (1802); rules from the Sutlej
      to the Jhelum; modernises his army with European help; the Treaty of
   Amritsar recognises British rights over the
      cis-Sutlej lands; the Tripartite Treaty (1838); dies 1839; his successors
   lose Punjab (p. 78).
      ★ (~4:45) "But the most ambitious rebels of all didn't want a kingdom.
   They wanted the whole empire."
   B7 (~4:50) "THE MARATHAS" — under the Peshwas they drive the Mughals out of
   Malwa and Gujarat and claim to be the empire's
      heirs; Panipat (1761) stops them; they recover and become the Company's
   most formidable rival (p. 78; Ep 3 callback).
   B8 (~5:40) "THE AFGHAN STATES" — Afghan migration amid turmoil at home; Ali
   Muhammad Khan's Rohilkhand (between Kumaon and
      the Ganga) after Nadir Shah's invasion; Mohammad Khan Bangash's
   Farrukhabad; the Rohillas squeezed by the Jats, Awadh, the
      Marathas and the British (pp. 78–79).
   B9 (~6:30) TAKEAWAY — revolt can build a state, but holding it needs
   institutions: the Jat state broke after Suraj Mal, Punjab
      after Ranjit Singh. Tease Ep 9: "So with all these new powers, why did
   none of them take the Mughals' place?"

   ## Facts allowed
   Book pp. 75, 77–79, 86 as cited.

   ## VERIFY before rendering
   The Treaty of Amritsar year (1809); Ranjit Singh's Lahore 1799 and Amritsar
   1802; Suraj Mal's death (1763); Banda Bahadur's
   death year if mentioned; the "12 misls" count.


   ## Cast and kit (new)
   Jat farmers (composite) · Churaman, Badan Singh (brief) · Suraj Mal (sturdy,
   practical) · Guru Gobind Singh (see
   SENSITIVITY) · Banda Bahadur (rider) · misl chiefs (twelve small banners) ·








   Ranjit Singh · Peshwa figures · Ali Muhammad Khan
   · Mohammad Khan Bangash.
   Kit: `bannerRise` (a banner growing from a plough or sword), `mislCircle` (12
   banners forming a ring that becomes one flag
   under Ranjit Singh), `riverBounds` (the Ganga–Chambal and Sutlej–Jhelum
   ranges highlighted).
   Map: anchor map — an ochre Jat patch near Agra; blue-grey Punjab; saffron
   across Malwa and Gujarat; a small slate Rohilkhand.


   ## Sound
   Village drums, hooves, a Sikh nagara drum (respectful), a Maratha nagara,
   river water at the Sutlej, a quill on treaties.


   ## Packaging
   Title: "Rebels Who Built Their Own Kingdoms" (35). Alternates: "How Rebels
   Became Kings" · "The Kingdoms Born Fighting the
   Mughals".
   Thumbnail: (1) Ranjit Singh, determined, rim light; (2) a map with three new
   kingdoms bursting out of cracked Mughal green;
   (3) text "BORN IN REVOLT" (variant B: "REBELS TO KINGS").
   Description hook: "The Jats near Agra, the Sikhs of Punjab and the Marathas
   all rose against the Mughals — and each built a
   kingdom of its own. Here's how Suraj Mal, Ranjit Singh and the Peshwas turned
   revolt into rule."
   Comment question: "Which rebel kingdom do you think came closest to replacing
   the Mughals?"
   Hashtags: #RanjitSingh #SurajMal #Marathas




Episode 9 — Why No One Could Replace the Mughals
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 9 of 12
   # Title: "Why No One Could Replace the Mughals"                   Project: ~/faceless-
   shorts/mughals-ep09-empty-throne
   # Target length: 6:00–7:00 (≈ 950–1,050 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 75–77, 79, 86.


   ## Story
   Logline: India in 1750 was full of kingdoms strong enough to defy Delhi — and
   not one able to replace it. That gap is where
   the British walked in.
   Personify: Ajit Singh and the Rajput alliance, Martanda Varma (the reformer
   of Travancore), Haidar Ali and Tipu Sultan (the
   modernisers of Mysore).







   COLD OPEN (0:00–0:18), verbatim:
   "By 1750, the Mughal Empire was collapsing, and India was full of kingdoms
   strong enough to fight it. Hyderabad. The
   Marathas. Mysore. Travancore. The Rajputs. Yet not one of them could take its
   place. Why not — and who did?"
   Shots: 0.0 s an empty Mughal throne in a dark hall (cam.push) · 2.5 s snap:
   crowns of many colours circle it, none lands ·
   7 s anchor map: a mosaic of regional colours · 11 s a crimson Company boot
   steps onto the map's edge · 15 s slow push on the
   empty throne; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "INDEPENDENT KINGDOMS" — kingdoms that rose as Mughal control
   weakened: the Rajputs, Mysore, Kerala (p. 75).
   B2 (~0:55) "THE RAJPUTS" — Bahadur Shah I marches against Ajit Singh (1708),
   who is allied with Jai Singh II and Durgadas
      Rathor; the alliance breaks; at one point the Rajputs control the land
   from south of Delhi to the west coast (p. 76).
      ★ (~1:35) "The Rajputs could defeat the Mughals in battle. Uniting with
   each other was harder."
   B3 (~1:40) "TRAVANCORE" — Martanda Varma builds an independent state in
   Kerala, with Travancore as his capital, from Kanyakumari
      to Cochin, and organises his army on the Western model (p. 77; callback to
   the Dutch episode: Colachel and De Lannoy).
   B4 (~2:25) "MYSORE" — the Wodeyars' land at the junction of the Eastern and
   Western Ghats, a constant battlefield; Haidar Ali
      takes power; he and his son Tipu Sultan fight the British again and again
   (p. 77).
      ★ (~3:05) "Strong, modern, defiant — so what was missing?"
   B5 (~3:10) "THE UMBRELLA" — the regional states kept ties with the Mughal
   emperor as an umbrella; even the Marathas and Sikhs
      recognised him; they ruled with zamindars, merchants, nobles and chiefs
   (Mysore an exception) (p. 79).
   B6 (~3:55) "THREE WEAKNESSES" — no sound financial, administrative and
   military system; backward in science and technology
      (Mysore tried to modernise); constant wars with neighbours that none could
   win (p. 79). Show as three cracks in a stone.
      ★ (~4:40) "Strong enough to challenge the Mughals. Not strong enough to
   replace them. And someone had noticed."
   B7 (~4:45) "THE GAP" — the book's verdict (kinetic text, verbatim p. 79):
   "these states were strong enough to challenge Mughal
      power, but none was able to replace it with a stable polity at an all-
   India level."
   B8 (~5:25) TAKEAWAY — power vacuums are rarely filled by the strongest local
   player; they are filled by whoever has money,








         organisation and patience. In India, that was a company. Tease Ep 10: "And
   what made India worth the trouble? It was one
      of the richest trading economies on earth."


   ## Facts allowed
   Book pp. 75–77, 79, 86 as cited. Callback lines to the Dutch (Colachel) and
   French episodes are allowed.


   ## VERIFY before rendering
   Ajit Singh's 1708 campaign; Martanda Varma's territorial extent; the year
   Haidar Ali took power (about 1761) if you mention
   it.


   ## Cast and kit (new)
   Ajit Singh, Jai Singh II, Durgadas Rathor (the Rajput trio) · Martanda Varma
   (gold and forest green) · Haidar Ali (soldier) ·
   Tipu Sultan (tiger motif) · regional rulers as small crowned silhouettes · a
   Company officer (crimson, seen from behind).
   Kit: `crownCarousel` (crowns circling an empty throne), `crackedStone` (three
   labelled cracks), `umbrellaOverlay` (a thin gold
   Mughal umbrella over the regional mosaic).
   Map: anchor map — full regional mosaic; Mughal green reduced to the Delhi
   region; crimson in Bengal (from Ep 4).


   ## Sound
   Hall echo, crowns ringing as they circle, desert wind (Rajputs), monsoon rain
   and surf (Travancore), a soft distant tiger
   growl for Tipu, a marching drum for the Company's step.


   ## Packaging
   Title: "Why No One Could Replace the Mughals" (36). Alternates: "Who Should
   Have Ruled India After the Mughals?" · "India's
   Empty Throne".
   Thumbnail: (1) Tipu Sultan, defiant, rim light; (2) an empty Mughal throne
   with a crimson Company shadow falling on it;
   (3) text "THE EMPTY THRONE" (variant B: "WHO TAKES IT?").
   Description hook: "By 1750 India was full of strong kingdoms — the Marathas,
   Mysore, Travancore, the Rajputs — but none could
   replace the Mughals. Here's why, and how that gap let the East India Company
   in."
   Comment question: "If one Indian kingdom had united the rest after the
   Mughals, which one could it have been?"
   Hashtags: #TipuSultan #MartandaVarma #RegionalKingdoms








Episode 10 — When India Was the World's Factory
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 10 of 12
   # Title: "When India Was the World's Factory"   Project: ~/faceless-
   shorts/mughals-ep10-worlds-factory
   # Target length: 6:00–7:00 (≈ 950–1,050 words)

   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 80–82, 86–87.

   ## Story
   Logline: while its empire fell, 18th-century India still made the cloth the
   world wanted — so much that Europe paid in
   silver and gold — yet the farmers who fed it stayed poor.
   Personify: a composite Bengal weaver (labelled), a composite peasant family
   (labelled), a European factor buying cloth, the
   Zamorin's Kunjali Marakkar admirals, and Shivaji's navy (as a historic
   reference).


   COLD OPEN (0:00–0:18), verbatim:
   "In the 1700s, Europe wanted India's cloth so badly that it paid in silver
   and gold — because India wanted almost nothing
   Europe made. India was called a sink of precious metals. So why were the
   people who grew its food still so poor?"
   Shots: 0.0 s a bolt of fine muslin unrolls across the whole frame, catching
   light (cam.pan) · 2.5 s snap: a European ship
   unloads chests of silver coins · 6 s a scale tips, cloth outweighing coins ·
   10 s a peasant's thin harvest basket · 14 s
   slow push on the peasant's face; sting.

   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "A LAND OF CONTRASTS" — extreme poverty and extreme luxury side by
   side; the book argues ordinary life was still
      better than after a century of British rule (attribute it: "the book
   argues") (p. 80).
   B2 (~1:00) "THE FARMER'S SHARE" — technically backward farming but very hard
   work; peasants pay the state, zamindars,
      jagirdars and revenue farmers; this got worse under British rule (p. 80;
   Ep 6 callback).
      ★ (~1:40) "The farmers barely got by. But the goods they and India's
   artisans made were wanted across the world."
   B3 (~1:45) "THE SINK OF PRECIOUS METALS" — self-sufficient in crafts and farm
   goods; exports exceed imports; the balance paid
      in silver and gold (p. 80).
   B4 (~2:30) "WHAT WENT OUT, WHAT CAME IN" — exports: cotton textiles, raw silk
   and silk fabrics, hardware, indigo, saltpetre,







      opium, rice, wheat, sugar, pepper and spices, precious stones, drugs.
   Imports by region: pearls, raw silk, dates, rose
      water (the Gulf); coffee, gold, honey (Arabia); tea, porcelain, silk
   (China); gold, musk, wool (Tibet); ivory (Africa);
      woollen cloth, copper, iron, lead, paper (Europe) (pp. 81, 87). Animated
   trade routes from the anchor map's coasts.
      ★ (~3:15) "And at the centre of it all was one product."
   B5 (~3:20) "CLOTH" — textile centres pop onto the map: Dacca, Murshidabad,
   Patna, Surat, Ahmedabad, Broach, Chanderi,
      Burhanpur, Jaunpur, Varanasi, Lucknow, Agra, Multan, Lahore, Masulipatnam,
   Aurangabad, Chicacole, Vishakhapatnam,
      Bangalore, Coimbatore, Madurai; Kashmir for wool (p. 82). Shashi Tharoor
   (kinetic text, verbatim p. 81): Bengal muslins
      "light as 'woven air'".
   B6 (~4:10) "SHIPS" — shipbuilding in Maharashtra, Andhra and Bengal; Calicut
   and Quilon; the Zamorin's Kunjali Marakkars;
      Shivaji's navy against the Portuguese; per Bipan Chandra, European
   companies bought Indian-built ships (p. 82).
      ★ (~4:55) "A country this rich in trade should have been able to defend
   itself. But wealth and power are not the same
      thing."
   B7 (~5:00) "WHO WAS WATCHING" — J.T. Sunderland (kinetic text, short,
   verbatim p. 81): "India was a far greater industrial and
      manufacturing nation than any in Europe or any other in Asia." The book
   also quotes Peter the Great: do NOT use that
      quote unless VERIFY confirms its source.
   B8 (~5:40) TAKEAWAY — wealth without a strong state is a target: India's
   trade made it worth conquering, and its farmers paid
      for the conquerors. Tease Ep 11: "So what was everyday life like in this
   India — at school, at home, in society?"


   ## Facts allowed
   Book pp. 80–82, 86–87 as cited. No trade figures or GDP shares that aren't in
   the book.


   ## VERIFY before rendering
   The Peter the Great quote's authenticity (drop it if unverifiable); the Bipan
   Chandra attribution on Indian-built ships; the
   spelling "Kunjali Marakkar".

   ## Cast and kit (new)
   A Bengal weaver at a pit loom (composite, labelled) · a peasant family
   (composite) · a European factor with a ledger · a
   Kunjali Marakkar admiral · a shipwright.
   Kit: `muslinBolt` (translucent cloth with light passing through), `tradeWeb`
   (routes from Indian ports to the Gulf, Arabia,








   China, Tibet, Africa and Europe that draw themselves, with goods icons riding
   them), `balanceScale` (cloth vs coins),
   `centreRain` (textile-centre pins popping in quick succession, each with a
   soft pop).
   Map: anchor map zoomed out to the Indian Ocean world; coasts glow.


   ## Sound
   Looms clacking, a shuttle's whoosh, coins pouring, ship timbers and adzes in
   a shipyard, waves, market bustle.


   ## Packaging
   Title: "When India Was the World's Factory" (34). Alternates: "Why Europe
   Paid India in Silver" · "The Richest Economy Nobody
   Defended".
   Thumbnail: (1) a Bengal weaver holding up glowing muslin, proud expression,
   rim light; (2) a European chest spilling silver
   coins; (3) text "EUROPE PAID IN SILVER" (variant B: "RICH… AND POOR").
   Description hook: "In the 1700s India exported so much more than it imported
   that Europe paid in silver and gold. Yet the
   farmers who fed the country stayed poor. Here's India's 18th-century economy
   — and why its wealth made it a target."
   Comment question: "Why do you think a country this rich in trade still had
   such poor farmers?"
   Hashtags: #IndianEconomy #BengalMuslin #IndianTrade




Episode 11 — Everyday Life Before the British
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 11 of 12
   # Title: "Everyday Life Before the British"   Project: ~/faceless-
   shorts/mughals-ep11-everyday-life
   # Target length: 6:00–8:00 (≈ 950–1,150 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 82–85, 87.


   ## Story
   Logline: a walk through 18th-century Indian life — schools, caste, women's
   lives and slavery — and how much depended on who
   you were born as.
   Device: follow ONE composite day in a composite town, labelled "a typical
   town, c. 1750", moving from school to home to market
   to port; each stop opens a topic.
   SENSITIVITY (binding): caste, religion, women and slavery are described
   factually and neutrally from the book; no
   caricature of any community; no depiction of sati, child marriage or violence







   (use symbols: a closed door, an empty chair, a
   broken bangle on a table, a ledger page); Hindu and Muslim social divisions
   get equal weight, as in the book.

   COLD OPEN (0:00–0:18), verbatim:
   "Picture a village school in 1750 India. The children learn reading, writing
   and arithmetic — and almost none of them are
   girls. Who got to learn, who got to choose their work, and who could be sold?
   It depended on who you were born as."
   Shots: 0.0 s a pathshala under a tree, children chanting (cam.push) · 2.5 s
   snap: an empty spot on the mat where a girl
   would sit · 6 s a caste ladder of paper rungs · 10 s a ledger page with a
   broken-chain stamp · 14 s slow push on a child's
   slate; sting.


   BEATS (re-hook every 45–60 s; open loops at ★):
   B1 (0:18) "SCHOOL" — traditional learning: literature, law, religion,
   philosophy, logic; no physical sciences, technology or
      geography; elementary schools widespread (pathshalas for Hindus, maktabs
   for Muslims) teaching reading, writing and
      arithmetic; lower-caste children sometimes, girls rarely (p. 82).
   B2 (~1:00) "HIGHER LEARNING" — chatuspathis or tols (Bihar, Bengal); Sanskrit
   centres at Kashi, Tirhut (Mithila), Nadia and
      Utkala; madrasas for Persian and Arabic; Persian, the court language,
   learned by Hindus and Muslims alike; Azimabad
      (Patna) (pp. 82–83).
      ★ (~1:45) "But what you could do with your learning often depended on your
   birth."
   B3 (~1:50) "CASTE" — broad cultural unity, but divided by caste, religion,
   region, tribe and language; caste central to Hindu
      social life; sub-castes; work mostly decided by caste, with many
   exceptions; caste councils and panchayats (p. 83).
   B4 (~2:35) "NOT ONLY HINDUS" — Muslims, despite Islam's teaching of equality,
   divided by caste, race, tribe and status;
      Sunni and Shia; Irani, Afghan, Turani and Hindustani nobles; sharif vs
   ajlaf (p. 83).
      ★ (~3:20) "And inside every one of these groups, one half of society had
   the least say of all."
   B5 (~3:25) "WOMEN" — patriarchal families (except some groups in Kerala);
   upper-class women at home, lower-class women in the
      fields and at work; purdah, sati, child marriage, polygamy; the hardship
   of widows; dowry in Bengal and Rajputana; Sawai
      Jai Singh of Amber and the Maratha general Parashuram Bhau tried to
   promote widow remarriage and failed; Abbé Dubois'
      contrasting observation (kinetic text, verbatim p. 84, labelled with his
   name and "early 19th century") (pp. 83–84).








   B6 (~4:15) "SLAVERY" — European travellers in the 17th century reported
   slavery; people sold children in famine and distress;
      higher classes kept women slaves for domestic work; the book says slaves
   in India were usually treated as hereditary
      servants and their children could be free (attribute it to the book).
      ★ (~4:55) "Then the Europeans arrived — and made it worse."
   B7 (~5:00) "THE EUROPEAN TRADE" — European companies bought slaves in Bengal,
   Assam and Bihar for European and American markets;
      Abyssinian slaves were sold at Surat, Madras and Calcutta (pp. 84–85).
   Show only ledgers, ships and ports.
   B8 (~5:45) TAKEAWAY — 18th-century India had deep learning and deep
   inequality side by side; the reformers of the next century
      would start from exactly these fault lines. Tease Ep 12: "Yet even as the
   empire fell, its artists, poets and astronomers
      were doing some of their best work."


   ## Facts allowed
   Book pp. 82–85, 87 as cited. Spell "Parashuram Bhau" (the book has
   "Prashuram"). No statistics beyond the book.

   ## VERIFY before rendering
   Parashuram Bhau's widow-remarriage attempt; Abbé Dubois' dates; the four
   Sanskrit centres; the spelling of chatuspathi/tol.


   ## Cast and kit (new)
   Composite children, a pandit and a maulvi teacher (equal dignity), composite
   townspeople of several groups (told apart by
   dress only, no caricature), Sawai Jai Singh (brief), Parashuram Bhau (brief),
   Abbé Dubois (a European traveller with a
   notebook), European factors, ships.
   Kit: `townDay` (a composite town with school, home, market and port; the
   camera travels between them with whip pans),
   `slateWrite` (letters appearing on a slate), `ladderRungs` (a paper caste
   ladder whose edges slowly fray), `ledgerChain` (a
   ledger page with a broken-chain stamp).
   Map: the anchor map at the start and end only (education centres pinned in
   B2; slave-trade ports in B7).


   ## Sound
   Children chanting tables, a school bell, market chatter, temple and mosque
   bells far away (equal), a ship's bell and waves
   (B7), a soft, serious music bed through B5–B7.


   ## Packaging
   Title: "Everyday Life Before the British" (32). Alternates: "What Life Was
   Like in 1750 India" · "Born Into It: India Before








   the British".
   Thumbnail: (1) a girl at the edge of a pathshala, curious and longing, rim
   light; (2) a slate with letters, half in shadow;
   (3) text "SCHOOL IN 1750" (variant B: "WHO GOT TO LEARN?").
   Description hook: "What was it like to go to school, marry, work or be sold
   in 18th-century India? Here's everyday life on
   the eve of British rule — its learning, its divisions and its injustices —
   straight from the history books."
   Comment question: "What surprised you most about everyday life in 18th-
   century India?"
   Hashtags: #SocialHistory #18thCenturyIndia #UPSCHistory




Episode 12 — The Empire Fell. The Art Flourished.
   # TASK: ClearCut History — "The Fall of the Mughals", Episode 12 of 12
   (FINALE)
   # Title: "The Empire Fell. The Art Flourished."   Project: ~/faceless-
   shorts/mughals-ep12-art-flourished
   # Target length: 5:00–6:00 (≈ 800–900 words)


   First read PART A of ~/faceless-shorts/FALL_OF_MUGHALS_PROMPTS.md and follow
   it. Copy _mughals-kit. Book pp. 85–87.


   ## Story
   Logline: as the Mughal centre collapsed, its painters, poets, architects and
   astronomers moved to new regional courts — and
   produced some of 18th-century India's finest work.
   Personify: Sawai Jai Singh (the astronomer-king), Asaf-ud-Daula (the builder
   of Lucknow), Mir and Sauda (poets of a fallen
   Delhi), Waris Shah, Shah Abdul Latif and Tayumanavar (voices in the regional
   languages).


   COLD OPEN (0:00–0:18), verbatim:
   "As the Mughal Empire fell apart, a king in Rajasthan built five giant
   observatories and a whole new pink city. Poets wrote
   in a young language called Urdu. Painters in the hills found a new style. How
   does art flourish while an empire dies?"
   Shots: 0.0 s the shadow of a giant sundial (Jantar Mantar) sweeping across
   stone (cam.push) · 2.5 s snap: pink city walls rise
   in cut-paper layers · 6 s a quill writes stylised Urdu-like script shapes
   (not real text) · 10 s a miniature painting's
   colours bloom · 14 s pull out to the anchor map, Mughal green almost gone,
   bright cultural dots everywhere; sting.

   BEATS (re-hook every 45–60 s; open loops at ★):







   B1 (0:18) "TALENT ON THE MOVE" — artists leave Delhi for new courts:
   Hyderabad, Lucknow, Jaipur, Murshidabad, Patna, Kashmir
      (p. 85). Animated routes of artists' carts leaving Delhi.
   B2 (~1:00) "THE ASTRONOMER-KING" — Sawai Jai Singh builds the pink city of
   Jaipur and five observatories (Delhi, Jaipur,
      Benares, Mathura, Ujjain) and the Zij Muhammad Shahi astronomical tables
   (the book spells it "Jij Muhammad-shahi") (p. 85).
      ★ (~1:45) "Science in Rajasthan. In Lucknow, the ambition went into
   stone."
   B3 (~1:50) "LUCKNOW" — Asaf-ud-Daula builds the Bara Imambara (1784) (p. 85).
   B4 (~2:30) "THE SOUTH" — Kerala's Padmanabhapuram Palace, famous for its
   architecture and murals (p. 85).
      ★ (~3:05) "Walls and towers last. But the period's most lasting creation
   was a language."
   B5 (~3:10) "URDU" — the growth of Urdu language and poetry: Mir, Sauda and
   Nazir; and, in the 19th century, Ghalib (p. 85).
   B6 (~3:50) "PAINTING" — the Rajasthani and Kangra schools rise with new
   vitality (p. 85).
   B7 (~4:25) "MANY LANGUAGES" — Malayalam flourishes under the Travancore
   rulers (Kunchan Nambiar; the book spells "Kanchan"); Tamil
      sittar poetry and Tayumanavar (1706–44), who protested against abuses of
   temple rule and caste; Waris Shah's Heer Ranjha
      in Punjabi; Shah Abdul Latif's Risalo in Sindhi (p. 85).
   B8 (~5:00) SERIES TAKEAWAY — empires are not the same as civilisations: the
   Mughal state fell, but the culture spread out and
      grew in new places. A quick 10-second recap of all 12 episodes on the
   anchor map (green shrinking, colours rising,
      crimson in Bengal). Tease the NEXT PLAYLIST: "But the strongest new power
   in India wasn't a kingdom at all. It was a
      company. Next: how the British took Bengal."


   ## Facts allowed
   Book pp. 85–87 as cited.


   ## VERIFY before rendering
   Kunchan Nambiar's spelling and dates; Padmanabhapuram Palace's 18th-century
   history (the book says "constructed"; say
   "rebuilt" or "expanded" if that is more accurate); Jaipur's founding (1727);
   the Zij Muhammad Shahi spelling;
   Tayumanavar's dates (1706–44, per the book).


   ## Cast and kit (new)
   Sawai Jai Singh (astronomer with instruments) · Asaf-ud-Daula · Mir and Sauda
   (poets with books) · Nazir · Ghalib (a 19th-century
   cameo) · a Kangra painter · Kunchan Nambiar · Tayumanavar · Waris Shah · Shah
   Abdul Latif (all dignified, generic faces).








   Kit: `jantarMantar` (a giant sundial with a moving shadow), `pinkCity`
   (layered walls in pink cut paper), `imambara` (an arched
   hall), `miniatureBloom` (a painting whose colours fill in), `scriptFlow`
   (stylised calligraphy shapes, NOT real text).
   Map: anchor map — the series' final state; cultural dots glow; the Company
   crimson in Bengal pulses as the tease.


   ## Sound
   Wind over stone, a quill, a sitar phrase, a wordless ghazal-like hum, a bell
   in Kerala, a soft Punjabi folk drum, water, a
   warm resolving music cue at the end; the tease ends on a single cannon thud
   from Bengal.


   ## Packaging
   Title: "The Empire Fell. The Art Flourished." (36). Alternates: "How India's
   Art Boomed as the Mughals Fell" · "The King Who
   Built Five Observatories".
   Thumbnail: (1) Sawai Jai Singh looking up in wonder, rim light; (2) the
   Jantar Mantar sundial with a crumbling Mughal arch
   behind; (3) text "WHILE IT FELL" (variant B: "ART > EMPIRE").
   Description hook: "As the Mughal Empire collapsed, India produced Jaipur,
   Jantar Mantar, the Bara Imambara, Urdu poetry, Kangra
   painting and Heer Ranjha. Here's how culture flourished while an empire died
   — the finale of The Fall of the Mughals."
   Comment question: "Which 18th-century creation would you most like to visit
   or read — Jantar Mantar, the Bara Imambara, or
   Heer Ranjha?"
   Hashtags: #JantarMantar #UrduPoetry #IndianArt




Part C — Facts checked and sources
I checked six claims while writing these prompts. Three corrected the book, and one is an
estimate that has to be attributed. Everything else comes from the book, and each
episode's VERIFY list tells Claude Code what to check before rendering.


  Claim                                                    Result                   Source

  Bahadur Shah I's reign                                   The book says 1709;      Britannica: Bahadur Shah I
                                                           corrected to 1707–1712








  Claim                                                    Result                           Source

  Farrukhsiyar blinded, deposed                            Confirmed                        Wikipedia: Sayyid
  and killed (1719); Muhammad                                                               brothers
  Shah enthroned at 17; Hussain
  Ali murdered 1720; Hassan Ali
  poisoned 1722

  Balaji Vishwanath helped                                 Book only (not on the            Ahir, p. 68
  depose Farrukhsiyar                                      Wikipedia page); on Ep 1's
                                                           VERIFY list

  Karnal 13 Feb 1739; Delhi                                Confirmed                        Military History wiki:
  entered 20 Mar; massacre 22                                                               Nader Shah's invasion
  Mar (est. 20,000–30,000);
  Nadir left early May; Darya-i-
  Noor also taken

  "57 days"                                                Jon Wilson's figure, quoted in   Ahir, p. 65
                                                           the book; always attributed

  Third Battle of Panipat: 14 Jan                          Confirmed; the book's            Wikipedia: Third Battle of
  1761; Bhau; Vishwasrao killed;                           "Iranian invader" corrected      Panipat
  Abdali was Afghan; deaths
  disputed

  Shuja-ud-din's relation to                               The book says son; corrected     Wikipedia: Shuja-ud-Din
  Murshid Quli Khan                                        to son-in-law                    Muhammad Khan


Not checked here: every item on the episodes' VERIFY lists, the Peter the Great quote
(Episode 10 drops it unless Claude Code can source it), and the tools Part A names that
may not exist in your kit yet ( cam.pan , sidechain ducking, thumb.js ). Claude Code builds
those during Episode 1.


Sources
       Rajiv Ahir, A Brief History of Modern India, Chapter 4, "India on the Eve of British
       Conquest" (attached PDF, book pp. 64–87)
       Britannica: Bahadur Shah I
       Wikipedia: Sayyid brothers
       Military History wiki: Nader Shah's invasion of the Mughal Empire
       Wikipedia: Third Battle of Panipat
       Wikipedia: Shuja-ud-Din Muhammad Khan





