"""Turn extracted case studies into src/content/case-studies/<slug>.ts + images.

WHAT THIS WRITES
  public/case-studies/<slug>/card.webp        the result card, 1400w
  public/case-studies/<slug>/card-700.webp    the same at half width
  public/case-studies/<slug>/sheet.webp       the results sheet, 1200w
  public/case-studies/<slug>/sheet-full.webp  the same at 2000w, for the viewer
  src/content/case-studies/<slug>.ts          the study
  src/content/case-studies/studies.ts         the twenty-two, in source order

IMAGES ARE DOWNLOADED, NOT HOTLINKED. They live on Webflow's CDN today and the
whole point of the migration is that this site stops depending on that. Two
widths each, because a card shown at 620px on a laptop should not fetch a
2160px file, and a results sheet that is unreadable below about 1200px should
not be capped at card size.
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request

from PIL import Image

import extract
import meta

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
PUBLIC = os.path.join(ROOT, "public", "case-studies")
CONTENT = os.path.join(ROOT, "src", "content", "case-studies")
CACHE = os.path.join(HERE, "raw", "img")

CARD_WIDTHS = (1400, 700)
SHEET_WIDTHS = (2000, 1200)


# --------------------------------------------------------------------- images


def fetch(url):
    """The original file, cached under raw/img so a re-run is offline."""
    os.makedirs(CACHE, exist_ok=True)
    name = re.sub(r"[^A-Za-z0-9._-]", "_", os.path.basename(urllib.parse.urlparse(url).path))
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
            f.write(r.read())
    return path


def derive(src_path, out_dir, stem, widths, quality=80):
    """Write one webp per width. Returns (src, small, w, h) of the largest."""
    os.makedirs(out_dir, exist_ok=True)
    im = Image.open(src_path)
    if im.mode in ("RGBA", "P", "LA"):
        # The sheets exported as palette PNGs with alpha. Flattened onto white,
        # which is the ground they were designed on, so nothing goes grey.
        flat = Image.new("RGB", im.size, (255, 255, 255))
        im = im.convert("RGBA")
        flat.paste(im, mask=im.split()[-1])
        im = flat
    else:
        im = im.convert("RGB")

    out = []
    for w in widths:
        if im.width <= w and w != widths[0]:
            continue
        scale = min(1.0, w / im.width)
        size = (round(im.width * scale), round(im.height * scale))
        copy = im.resize(size, Image.LANCZOS) if scale < 1.0 else im
        path = os.path.join(out_dir, f"{stem}.webp" if w == widths[0] else f"{stem}-{w}.webp")
        copy.save(path, "WEBP", quality=quality, method=6)
        out.append((w, path, size))
    return out


def rel(path):
    return "/" + os.path.relpath(path, os.path.join(ROOT, "public")).replace(os.sep, "/")


# ------------------------------------------------------------------ ts output


def ts(value, indent=2):
    """JSON that TypeScript is happy to read: keys unquoted where they are
    plain identifiers, strings double-quoted with the escapes JSON uses."""
    pad = " " * indent
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return "undefined"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        if not value:
            return "[]"
        inner = ",\n".join(pad + "  " + ts(v, indent + 2) for v in value)
        return "[\n" + inner + ",\n" + pad + "]"
    if isinstance(value, dict):
        if not value:
            return "{}"
        rows = []
        for k, v in value.items():
            key = k if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", k) else json.dumps(k)
            rows.append(pad + "  " + f"{key}: {ts(v, indent + 2)}")
        return "{\n" + ",\n".join(rows) + ",\n" + pad + "}"
    raise TypeError(type(value))


def camel(slug):
    return "s" + "".join(p[:1].upper() + p[1:] for p in re.split(r"[^A-Za-z0-9]+", slug))


HEADER = '''// Migrated from the live site, verbatim.
// SOURCE: {source}
//
// Every sentence below is that page's own: the title is its <h1>, the four
// figures are its counter strip, and the four sections are its COMPANY
// PROFILE, challenges, Approach and Outcome rich text, converted block for
// block. Nothing is reworded, summarised, shortened or added, and no figure
// appears anywhere that the page does not publish.
//
// WHAT IS NOT THE SOURCE'S OWN, and why each one is here rather than invented:
// `client` is lifted from the profile's first sentence, `sector` is assigned
// with the phrase it was read from beside it, each entry in `services` carries
// the sentence that names it, and the results sheet's alt text is authored
// because the source publishes none. See scripts/migrate-case-studies/meta.py.
{extra}//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type {{ Study }} from "@/content/case-studies";

export const study: Study = '''

SWAP_NOTE = """//
// THIS PAGE IS PUBLISHED WITH ITS TWO MIDDLE SECTIONS SWAPPED. Upstream, the
// block headed "challenges" holds the approach and the block headed "Approach"
// holds the challenge. Both are migrated verbatim into the roles their own
// sentences describe, and `sourceSectionsSwapped` records it. Fix at source.
"""


def build(rec):
    slug = rec["slug"]
    client = meta.CLIENTS[slug]
    sector, sector_evidence = meta.SECTORS[slug]
    out_dir = os.path.join(PUBLIC, slug)

    card = derive(fetch(rec["thumb"]["src"]), out_dir, "card", CARD_WIDTHS)
    (cw, cpath, csize) = card[0]
    thumb = {
        "src": rel(cpath),
        "small": rel(card[1][1]) if len(card) > 1 else None,
        "alt": (
            f"Result card published for {client}."
            if slug in meta.THUMB_ALT_AUTHORED
            else rec["thumb"]["alt"]
        ),
        "w": csize[0],
        "h": csize[1],
    }
    if thumb["small"] is None:
        del thumb["small"]

    sheet = None
    if rec["sheet"]:
        made = derive(fetch(rec["sheet"]["src"]), out_dir, "sheet-full", SHEET_WIDTHS, quality=82)
        (_, full_path, full_size) = made[0]
        inline_path = made[1][1] if len(made) > 1 else full_path
        sheet = {
            "src": rel(inline_path),
            "full": rel(full_path),
            "alt": f"Results sheet published for {client}: a one-page summary of the campaign's figures.",
            "w": full_size[0],
            "h": full_size[1],
        }

    challenge, approach = rec["challenge"], rec["approach"]
    swapped = slug in meta.SWAPPED
    if swapped:
        challenge, approach = approach, challenge

    study = {
        "slug": slug,
        "client": client,
        "title": rec["title"],
        "sector": sector,
        "sectorEvidence": sector_evidence,
        "order": rec["order"],
        "metrics": rec["metrics"],
        "services": [{"key": k, "evidence": e} for k, e in meta.SERVICES.get(slug, [])],
        "profile": rec["profile"],
        "challenge": challenge,
        "approach": approach,
        "outcome": rec["outcome"],
        "thumb": thumb,
    }
    if sheet:
        study["sheet"] = sheet
    if rec["projectUrl"]:
        study["projectUrl"] = rec["projectUrl"]
    if swapped:
        study["sourceSectionsSwapped"] = True
    study["source"] = rec["source"]

    os.makedirs(CONTENT, exist_ok=True)
    header = HEADER.format(source=rec["source"], extra=SWAP_NOTE if swapped else "")
    with open(os.path.join(CONTENT, f"{slug}.ts"), "w", encoding="utf-8") as f:
        f.write(header + ts(study, 0) + ";\n")
    return study


INDEX_HEADER = """// The twenty-two case studies, as one array.
//
// ONE FILE PER STUDY, the convention src/content/insights and
// src/content/services already use. The order is the order the live
// /case-studies index lists them in, which is the agency's own curation of its
// work, so it is preserved rather than re-sorted.
//
// Generated by scripts/migrate-case-studies/convert.py.

import type {{ Study }} from "@/content/case-studies";

{imports}

export const studies: Study[] = [
{names}
];
"""


def write_index(records):
    imports = "\n".join(
        f'import {{ study as {camel(r["slug"])} }} from "@/content/case-studies/{r["slug"]}";'
        for r in records
    )
    names = "\n".join(f'  {camel(r["slug"])},' for r in records)
    with open(os.path.join(CONTENT, "studies.ts"), "w", encoding="utf-8") as f:
        f.write(INDEX_HEADER.format(imports=imports, names=names))


if __name__ == "__main__":
    idx = extract.index()
    slugs = sys.argv[1:] or sorted(idx, key=lambda s: idx[s]["order"])
    records = [extract.record(s, idx) for s in slugs]
    for rec in records:
        build(rec)
        print("wrote", rec["slug"])
    write_index(records)
    print(f"wrote studies.ts with {len(records)} studies")
