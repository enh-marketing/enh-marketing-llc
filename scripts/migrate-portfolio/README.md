# Portfolio migration

The scripts that moved all thirty-five projects from `enhmedia.com/portfolio`
(Webflow) into `src/content/portfolio/`, with their images. Kept because the job
is repeatable: a new project on the old site, a correction published there, or a
re-run after the model changes all go through these rather than through
hand-editing generated files.

Sibling of `scripts/migrate-case-studies/`, which it is modelled on line for
line. The two archives were built from the same Webflow rich text and share the
same block model, so the inline and block parsers here are that migration's,
unchanged.

```
extract.py    the parts of a live portfolio page the model needs
              (h1, the COMPANY PROFILE rich text, the lightbox gallery, the
              site URL or its screenshot, the Vimeo id, the case study link),
              plus the index's three tab panes, which is where the categories
              come from
meta.py       THE ONLY EDITORIAL LAYER: the three category labels and the alt
              text on every picture. Read this file before changing anything
              about what the pictures say.
convert.py    writes src/content/portfolio/<slug>.ts, rebuilds projects.ts,
              downloads every image and derives two webp widths of each
verify.py     the gate: word-multiset comparison against the live page, plus a
              title, category, artefact and file-existence check
urls.txt      the thirty-five slugs, in the order the live index lists them
```

## Re-running

```bash
cd scripts/migrate-portfolio
mkdir -p raw
curl -sS -L -o raw/index.html https://enhmedia.com/portfolio
while read -r s; do
  curl -sS -L -o "raw/$s.html" "https://enhmedia.com/portfolio/$s"
done < urls.txt
python3 convert.py          # writes the project files and the images
python3 verify.py           # must print 35/35 clean
```

`raw/` is not committed. `verify.py` is the gate and it checks four things:

- **Words.** The bag of words in the live page's COMPANY PROFILE against the bag
  in the migrated project. It ignores what is supposed to change (tags,
  whitespace, block structure) and catches what must not: a dropped paragraph, a
  truncated sentence, a mangled entity.
- **Title.** Against the live `<h1>` *and* against the label on the live index
  card. All thirty-five publish the same string in both places.
- **Categories.** Read back out of the index's tab panes. This is the one field
  the model carries that no single project page states, so it is the one most
  likely to drift if the index is re-ordered.
- **Artefacts.** The Vimeo id, the site URL, the gallery count and the
  screenshot, each against the live markup — plus that every generated image
  path exists on disk. A project quietly losing its film is invisible on the
  page, because the section simply is not rendered.

## The categories are read, not assigned

The live index is three tabs — Digital Marketing, Web Design, Video Production —
and `extract.index()` walks the panes. Nine projects appear in two of them:
AllDay, Autobahn, Datagram, Healthy Farm, Lotus, PKF, Royal Caviar, Ultracare
and Venesta. They are one project each, with one file, one page and one URL, and
`categories` is a list. **`order` is the position of a project's first
appearance**, walking the tabs in the order `CATEGORY_ORDER` lists them
(Digital Marketing, Video Production, Web Design), which is the order the
brief asked the site to present them in.

## What is not migrated

- **Figures.** A portfolio page publishes none — no counter strip, nothing. The
  numbers for a client live in that client's case study, and twelve projects
  link to one. Nothing here computes, derives or infers a figure.
- **Dates.** No portfolio page on the live site publishes one, and none is
  inferred.
- **The monitor mockup.** Twenty-three pages frame the client's live site inside
  a monitor graphic. The graphic is stock furniture and the frame is an iframe
  most sites now refuse, so what migrates is the URL itself, as `projectUrl`,
  offered as a link — and, on the six pages that publish one instead of a live
  frame, the screenshot, as a picture.
- **The films themselves.** Eleven projects embed a Vimeo player. The id
  migrates; eleven hosted videos do not belong in this repository.
- **The "Our Work" carousel** at the foot of every page. It is the site's own
  case study slider, which this site already has as a component.

## Image quality, and why the artwork grid is five across

Thirteen of the forty-nine gallery files are **219px square upstream** — that is
the whole file on Webflow's CDN, not a thumbnail of one. They are migrated as
they are, because upscaling them would fabricate detail. Two things in the site
code follow from it and should not be "tidied" without reading this: the artwork
grid runs five across so a tile is about 230px, and `canOpen()` in
`src/content/portfolio.ts` gates the full-size viewer on the file being
materially larger than the tile, so the small ones are set as plain figures with
no hover state behind them.
