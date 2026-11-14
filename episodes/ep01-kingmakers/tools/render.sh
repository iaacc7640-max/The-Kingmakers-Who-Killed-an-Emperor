#!/bin/bash
# Final render in ranges of <= 60 s (each shell command must finish within 10 min), 3 in parallel,
# then concat the video parts (-c copy) and mux data/mix.wav once over the whole film.
#   bash tools/render.sh <slug> [parallel=3]
set -eu
cd "$(dirname "$0")/.."; SLUG=${1:?slug}; PAR=${2:-3}
DUR=$(node -e "console.log(JSON.parse(require('fs').readFileSync('data/lines.json')).duration)")
mkdir -p renders/parts; rm -f renders/parts/*.mp4 renders/parts/list.txt
n=0; for s in $(seq 0 60 $(printf '%.0f' "$DUR")); do
  e=$(node -e "console.log(Math.min($s+60,$DUR))"); [ "$(node -e "console.log($s < $DUR ? 1 : 0)")" = 1 ] || break
  f=$(printf 'renders/parts/part-%02d.mp4' $n); echo "file '$(basename $f)'" >> renders/parts/list.txt
  ( node tools/capture.mjs video "$f" "$s" "$e" > "renders/parts/part-$n.log" 2>&1 ) &
  n=$((n+1)); while [ "$(jobs -rp | wc -l)" -ge "$PAR" ]; do sleep 2; done
done
wait
ffmpeg -v error -y -f concat -safe 0 -i renders/parts/list.txt -c copy -an renders/_video.mp4
ffmpeg -v error -y -i renders/_video.mp4 -i data/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "renders/$SLUG.mp4"
ffmpeg -v error -y -i "renders/$SLUG.mp4" -vf scale=1280:720 -c:v libx264 -crf 26 -preset veryfast -c:a aac -b:a 128k -movflags +faststart "renders/$SLUG-review.mp4"
rm -f renders/_video.mp4; ls -la "renders/$SLUG.mp4" "renders/$SLUG-review.mp4"; echo RENDER DONE
