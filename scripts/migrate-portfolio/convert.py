"""Turn extracted portfolio projects into src/content/portfolio/<slug>.ts + images.

WHAT THIS WRITES
  public/portfolio/<slug>/card.webp        the index card, 1400w
  public/portfolio/<slug>/card-700.webp    the same at half width
  public/portfolio/<slug>/work-N.webp      a lightbox image, 1080w
  public/portfolio/<slug>/work-N-540.webp  the same at half width
  public/portfolio/<slug>/site.webp        the website screenshot, 1600w
  public/portfolio/<slug>/site-800.webp    the same at half width
  src/content/portfolio/<slug>.ts          the project
  src/content/portfolio/projects.ts        the thirty-five, in the index's order

IMAGES ARE DOWNLOADED, NOT HOTLINKED, for the same reason the case studies
migration downloads them: they live on Webflow's CDN today and the point of the
migration is that this site stops depending on it. Two widths each, so a card
shown at 420px in a grid does not fetch a 1920px file.

THE VIMEO FILMS ARE NOT DOWNLOADED. A film is an id and a player, and eleven
hosted videos are not this repository's to carry. What migrates is the id.
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
PUBLIC = os.path.join(ROOT, "public", "portfolio")
CONTENT = os.path.join(ROOT, "src", "content", "portfolio")
CACHE = os.path.join(HERE, "raw", "img")

CARD_WIDTHS = (1400, 700)
WORK_WIDTHS = (1080, 540)
SITE_WIDTHS = (1600, 800)


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
    """Write one webp per width. Returns [(width, path, size), ...], largest first."""
    os.makedirs(out_dir, exist_ok=True)
    im = Image.open(src_path)
    if im.mode in ("RGBA", "P", "LA"):
        # Several screenshots and creatives export as PNG with alpha. Flattened
        # onto white, which is the ground they were designed on.
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


def figure(src_url, out_dir, stem, widths, alt, quality=80):
    made = derive(fetch(src_url), out_dir, stem, widths, quality=quality)
    (_, path, size) = made[0]
    fig = {"src": rel(path), "alt": alt, "w": size[0], "h": size[1]}
    if len(made) > 1:
        # `small` sits between src and alt so every figure in the generated
        # files reads in the same order.
        fig = {"src": fig["src"], "small": rel(made[1][1]), "alt": alt, "w": fig["w"], "h": fig["h"]}
    return fig


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
    return "p" + "".join(p[:1].upper() + p[1:] for p in re.split(r"[^A-Za-z0-9]+", slug))


HEADER = '''// Migrated from the live site, verbatim.
// SOURCE: {source}
//
// The title is that page's <h1> and the profile is its COMPANY PROFILE rich
// text, converted block for block. Nothing is reworded, summarised, shortened
// or added. A portfolio entry publishes no figures, so none appear here: the
// numbers for this client, where there are any, live in the case study.
//
// WHAT IS NOT THE SOURCE'S OWN: the alt text on every picture, because the
// source publishes none, and the category labels, because those are the live
// index's tab names. See scripts/migrate-portfolio/meta.py. `categories` is
// read from the index's tab panes rather than assigned.
//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type {{ Project }} from "@/content/portfolio";

export const project: Project = '''


def build(rec):
    slug = rec["slug"]
    name = (rec["listingTitle"] or rec["title"] or "").strip()
    out_dir = os.path.join(PUBLIC, slug)

    thumb = figure(rec["thumb"]["src"], out_dir, "card", CARD_WIDTHS, meta.thumb_alt(name))

    gallery = [
        figure(
            g["src"],
            out_dir,
            f"work-{i + 1}",
            WORK_WIDTHS,
            meta.gallery_alt(name, i + 1, len(rec["gallery"])),
        )
        for i, g in enumerate(rec["gallery"])
    ]

    shot = None
    if rec["siteShot"]:
        shot = figure(
            rec["siteShot"]["src"], out_dir, "site", SITE_WIDTHS, meta.shot_alt(name), quality=82
        )

    project = {
        "slug": slug,
        "title": name,
        "categories": rec["categories"],
        "order": rec["order"],
        "profile": rec["profile"],
        "thumb": thumb,
    }
    if gallery:
        project["gallery"] = gallery
    if shot:
        project["siteShot"] = shot
    if rec["projectUrl"]:
        project["projectUrl"] = rec["projectUrl"]
    if rec["film"]:
        project["film"] = {"provider": "vimeo", "id": rec["film"], "title": name}
    if rec["caseStudy"]:
        project["caseStudy"] = rec["caseStudy"]
    project["source"] = rec["source"]

    os.makedirs(CONTENT, exist_ok=True)
    with open(os.path.join(CONTENT, f"{slug}.ts"), "w", encoding="utf-8") as f:
        f.write(HEADER.format(source=rec["source"]) + ts(project, 0) + ";\n")
    return project


INDEX_HEADER = """// The thirty-five portfolio projects, as one array.
//
// ONE FILE PER PROJECT, the convention src/content/case-studies,
// src/content/insights and src/content/services already use.
//
// THE ORDER IS THE LIVE INDEX'S OWN. Its three tabs are walked in the order
// the site lists them -- Digital Marketing, Video Production, Web Design --
// and a project takes the position of its first appearance. Nine projects are
// filed under two tabs and appear once here, with one page and one URL.
//
// Generated by scripts/migrate-portfolio/convert.py.

import type {{ Project }} from "@/content/portfolio";

{imports}

export const projects: Project[] = [
{names}
];
"""


def write_index(records):
    imports = "\n".join(
        f'import {{ project as {camel(r["slug"])} }} from "@/content/portfolio/{r["slug"]}";'
        for r in records
    )
    names = "\n".join(f'  {camel(r["slug"])},' for r in records)
    with open(os.path.join(CONTENT, "projects.ts"), "w", encoding="utf-8") as f:
        f.write(INDEX_HEADER.format(imports=imports, names=names))


if __name__ == "__main__":
    idx = extract.index()
    slugs = sys.argv[1:] or sorted(idx, key=lambda s: idx[s]["order"])
    records = [extract.record(s, idx) for s in slugs]
    for rec in records:
        built = build(rec)
        print(
            "wrote",
            rec["slug"],
            f"(gallery {len(built.get('gallery', []))},",
            f"site {'y' if 'siteShot' in built else '-'},",
            f"film {'y' if 'film' in built else '-'})",
        )
    write_index(records)
    print(f"wrote projects.ts with {len(records)} projects")
