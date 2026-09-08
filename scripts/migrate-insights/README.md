# Insights migration

The scripts that moved all 72 posts from `enhmedia.com/blog` (Webflow) into
`src/content/insights/`. Kept because the job is repeatable: a new post on the
old site, a correction published there, or a re-run after the Block model
changes all go through these rather than through hand-editing generated files.

```
extract.py    the parts of a Webflow post page the model needs
              (title, meta description, banner date/category, hero, rich text)
convert.py    rich-text HTML -> the typed Block model, plus image download
              and the live-URL -> new-IA link map
topics.py     slug -> topic. THE ONE FIELD THAT IS NOT THE SOURCE'S OWN
verify.py     word-multiset comparison of each live page against its note
genposts.py   rebuilds src/content/insights/posts.ts from the note files
urls.txt      the 72 slugs, cross-checked against the live /blog index
```

## Re-running

```bash
cd scripts/migrate-insights
mkdir -p raw && while read -r s; do
  curl -sS -L -o "raw/$s.html" "https://enhmedia.com/blog/$s"
done < urls.txt
python3 convert.py $(cat urls.txt)   # writes note files + downloads images
python3 genposts.py                  # rebuilds posts.ts
python3 verify.py $(cat urls.txt)    # must print 72/72 identical
```

`verify.py` is the gate. It compares the bag of words on the live page against
the bag of words in the migrated note — the same technique MIGRATION.md used to
prove the Next → Astro move lost nothing. It ignores what is supposed to change
(tags, whitespace, block structure) and catches what must not: a dropped
paragraph, a truncated sentence, a mangled entity, a duplicated table row.

It found four real defects that reading the output would not have:

- `inline()` trimmed the ends of every subtree, including nested marks, so
  `<strong>Dubai </strong>aimed` lost its space and became "Dubaiaimed". Three
  posts were affected.
- A nested `<ul>` inside an `<li>` was walked into the parent bullet with no
  separator, concatenating words across the boundary ("keywordsExpand"). That
  is why `ListItem` exists in the model.
- The Webflow table embed wraps each header cell in a one-cell `<table>`, and
  an unbounded row walk collected those as extra body rows, so every header
  label was emitted twice.
- One post embeds 286 words of CSS in its body. The converter skipped it
  correctly; the *verifier* counted it and reported the words as lost.

## What is not migrated

- **Authors.** The live blog publishes no byline on any post, so no note has an
  `author` and none is invented.
- **The category.** All 72 are filed under "News" upstream, which cannot drive
  a filter. `topics.py` assigns one, and each note keeps `sourceCategory` so the
  substitution is visible rather than silent.
- **In-body CSS and Webflow embed markup.** One post's collapsible "Key
  Takeaways" widget migrates as its paragraphs; the checkbox, label and
  stylesheet that drove it do not.
