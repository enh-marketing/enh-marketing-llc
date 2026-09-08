# Case studies migration

The scripts that moved all twenty-two case studies from `enhmedia.com/case-studies`
(Webflow) into `src/content/case-studies/`, with their images. Kept because the
job is repeatable: a new case study on the old site, a correction published
there, or a re-run after the Block model changes all go through these rather
than through hand-editing generated files.

```
extract.py    the parts of a live case study page the model needs
              (h1, the four figures, profile, challenges, approach, outcome,
              the result card, the results sheet, the client's own site)
meta.py       THE ONLY EDITORIAL LAYER: client name, sector, service tags and
              the results-sheet alt text, each with the evidence it was read
              from. Read this file before changing anything about the labels.
convert.py    writes src/content/case-studies/<slug>.ts, rebuilds studies.ts,
              downloads every image and derives two webp widths of each
verify.py     the gate: word-multiset comparison against the live page, plus
              an evidence check and a figure check
urls.txt      the twenty-two slugs, in the order the live index lists them
```

## Re-running

```bash
cd scripts/migrate-case-studies
mkdir -p raw
curl -sS -L -o raw/index.html https://enhmedia.com/case-studies
while read -r s; do
  curl -sS -L -o "raw/$s.html" "https://enhmedia.com/case-studies/$s"
done < urls.txt
python3 convert.py          # writes the study files and the images
python3 verify.py           # must print 22/22 clean
```

`raw/` is not committed. `verify.py` is the gate and it checks three things:

- **Words.** The bag of words in the live page's five content regions against
  the bag in the migrated study. It ignores what is supposed to change (tags,
  whitespace, block structure) and catches what must not: a dropped paragraph,
  a truncated sentence, a mangled entity. The live side is read by stripping
  tags rather than through the block parser the converter uses, so a parser bug
  shows up as a difference rather than cancelling itself out.
- **Evidence.** Every `sectorEvidence` and every service `evidence` string has
  to be a verbatim substring of that study's own prose.
- **Figures.** The four published figures, value and label, in order.

## What is not migrated

- **Dates.** No case study on the live site publishes one. Several name a
  period inside their own prose ("throughout 2025", "over the first 12
  months"), and those sentences migrate with the rest, but no study carries a
  date field and none is inferred from one.
- **The website mockup section.** Twelve pages frame the client's live site
  inside a monitor graphic. The graphic is stock furniture and the frame is an
  iframe most sites now refuse, so what migrates is the URL itself, as
  `projectUrl`, offered as a link.
- **AllDay's results sheet.** Its slot upstream holds Webflow's own placeholder
  SVG rather than a sheet, so the study has none instead of a stand-in.
- **The empty video and gallery sections.** Every page carries them; all
  twenty-two are `w-condition-invisible` upstream, with no video ID and no
  gallery items behind them.

## One upstream defect worth fixing at source

`dgr-aviation` publishes its **challenge and approach in each other's slots**:
the block headed "challenges" contains "To address these challenges, a focused
digital strategy was implemented...", and the block headed "Approach" contains
"Despite offering essential and highly regulated certifications, DGR Aviation
operated within a crowded and competitive education market...". Both migrate
verbatim into the roles their own sentences describe, and the study carries
`sourceSectionsSwapped: true` so the change is visible in the content. Fix the
live page and the flag can go.
