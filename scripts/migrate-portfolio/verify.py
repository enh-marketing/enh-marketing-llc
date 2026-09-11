"""The gate. Compares every migrated project against the live page it came from.

Run after convert.py. It must print 35/35 clean.

FOUR CHECKS, and each one catches a different way a migration goes wrong:

  WORDS       The bag of words in the live page's COMPANY PROFILE against the
              bag in the migrated project. It ignores what is supposed to
              change (tags, whitespace, block structure) and catches what must
              not: a dropped paragraph, a truncated sentence, a mangled entity.
              The live side is read by stripping tags rather than through the
              block parser the converter uses, so a parser bug shows up as a
              difference instead of cancelling itself out.

  TITLE       The migrated title against the live <h1> and against the label on
              the live index card. All thirty-five publish the same string in
              both places, so a project where they disagree is a change
              upstream worth looking at rather than something to average.

  CATEGORIES  Read back out of the index's tab panes and compared. This is the
              one field the model carries that no single project page states,
              so it is the one most likely to drift if the index is re-ordered.

  ARTEFACTS   The film id, the site URL and the number of gallery images, each
              against the live markup. A project quietly losing its film is
              invisible on the page -- the section simply is not rendered --
              which is exactly why it is checked here.

WHAT IS NOT CHECKED, because it is authored rather than migrated: the alt text
on every picture, and the three category labels. See meta.py.
"""
import html
import json
import os
import re
import sys
from collections import Counter

import extract

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
CONTENT = os.path.join(ROOT, "src", "content", "portfolio")


def words(s):
    return Counter(re.findall(r"[0-9a-z]+", html.unescape(s or "").lower()))


def plain(nodes):
    out = []
    for n in nodes:
        if isinstance(n, str):
            out.append(n)
        elif "b" in n:
            out.append(plain(n["b"]))
        elif "i" in n:
            out.append(plain(n["i"]))
        else:
            out.append(plain(n["children"]))
    return "".join(out)


def block_text(blocks):
    out = []
    for b in blocks:
        if b["type"] == "p":
            out.append(plain(b["text"]))
        elif b["type"] == "h3":
            out.append(b["text"])
        else:
            out.extend(plain(i) for i in b["items"])
    return " ".join(out)


def migrated(slug):
    """The generated <slug>.ts, read as data.

    The file is a TypeScript literal, so the object is lifted out between the
    first `= {` and the trailing `};` and read as JSON5-ish: keys unquoted,
    trailing commas. Both are normalised here rather than shelling out to node,
    so the gate has no runtime dependency the converter does not already have.
    """
    src = open(os.path.join(CONTENT, f"{slug}.ts"), encoding="utf-8").read()
    body = src[src.index("export const project: Project = ") + len("export const project: Project = ") :]
    body = body.rstrip().rstrip(";")
    # Quote bare keys, drop trailing commas. String contents are left alone:
    # the key pattern requires a preceding { or , and a following :, which no
    # quoted string in this data produces.
    body = re.sub(r'([{,]\s*)([A-Za-z_$][A-Za-z0-9_$]*)(\s*:)', r'\1"\2"\3', body)
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    return json.loads(body)


def check(slug, idx):
    live = extract.record(slug, idx)
    mine = migrated(slug)
    problems = []

    live_html = extract.profile_richtext(extract.body(open(os.path.join(extract.RAW, f"{slug}.html"), encoding="utf-8").read()))
    a, b = words(extract.text(live_html or "")), words(block_text(mine["profile"]))
    if a != b:
        lost = a - b
        gained = b - a
        problems.append(f"profile words differ: dropped {dict(lost)} added {dict(gained)}")

    name = (live["listingTitle"] or "").strip()
    if (live["title"] or "").strip() != name:
        problems.append(f"live <h1> {live['title']!r} != live index label {name!r}")
    if mine["title"] != name:
        problems.append(f"title {mine['title']!r} != live {name!r}")

    if mine["categories"] != live["categories"]:
        problems.append(f"categories {mine['categories']} != live {live['categories']}")

    if (mine.get("film") or {}).get("id") != live["film"]:
        problems.append(f"film {(mine.get('film') or {}).get('id')} != live {live['film']}")
    if mine.get("projectUrl") != live["projectUrl"]:
        problems.append(f"projectUrl {mine.get('projectUrl')} != live {live['projectUrl']}")
    if len(mine.get("gallery", [])) != len(live["gallery"]):
        problems.append(f"gallery {len(mine.get('gallery', []))} images != live {len(live['gallery'])}")
    if bool(mine.get("siteShot")) != bool(live["siteShot"]):
        problems.append(f"siteShot {bool(mine.get('siteShot'))} != live {bool(live['siteShot'])}")
    if mine.get("caseStudy") != live["caseStudy"]:
        problems.append(f"caseStudy {mine.get('caseStudy')} != live {live['caseStudy']}")

    # Every referenced image is on disk. A generated path pointing at nothing
    # renders as a broken frame and nothing else in the build complains.
    figs = [mine["thumb"], *mine.get("gallery", [])] + ([mine["siteShot"]] if mine.get("siteShot") else [])
    for fig in figs:
        for key in ("src", "small", "full"):
            if fig.get(key) and not os.path.exists(os.path.join(ROOT, "public", fig[key].lstrip("/"))):
                problems.append(f"missing file {fig[key]}")

    return problems


if __name__ == "__main__":
    idx = extract.index()
    slugs = sys.argv[1:] or sorted(idx, key=lambda s: idx[s]["order"])
    clean = 0
    for slug in slugs:
        problems = check(slug, idx)
        if problems:
            print(f"FAIL {slug}")
            for p in problems:
                print(f"     {p}")
        else:
            clean += 1
    print(f"\n{clean}/{len(slugs)} clean")
    sys.exit(0 if clean == len(slugs) else 1)
