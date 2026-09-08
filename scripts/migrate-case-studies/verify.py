"""The gate. Nothing ships from this migration until this prints 22/22.

THREE CHECKS, and each one catches a different way a migration lies.

  WORDS       The bag of words on the live page's five content regions (the
              <h1>, the counter strip and the four rich-text sections) against
              the bag of words in the migrated study. Markup, whitespace and
              block structure are supposed to change; a dropped paragraph, a
              truncated sentence or a mangled entity is not. The live side is
              read by stripping tags rather than by the block parser the
              converter uses, so the two paths are independent and a parser bug
              shows up as a difference.

  EVIDENCE    Every `sectorEvidence` and every service `evidence` string has to
              be a verbatim substring of that study's own prose. This is what
              keeps the two assigned fields honest: a label whose quote cannot
              be found in the study is a label somebody invented.

  FIGURES     Every metric value and label on the live counter strip appears in
              the migrated study, and the study publishes no figure the live
              page does not.
"""
import collections
import html
import json
import os
import re
import sys

import extract
import meta

HERE = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.abspath(os.path.join(HERE, "..", "..", "src", "content", "case-studies"))
SP = r"[\s ]"

SECTIONS = [
    ("profile", r'<h2 class="heading-6">%s*COMPANY%s+PROFILE%s*</h2>' % (SP, SP, SP)),
    ("challenge", r'<h2 class="heading-6">\s*challenges\s*</h2>'),
    ("approach", r'<h3 class="main-heading[^"]*">\s*Approach\s*</h3>'),
    ("outcome", r'<h3 class="main-heading[^"]*">\s*Outcome\s*</h3>'),
]


def words(s):
    s = html.unescape(s)
    for a, b in (("‍", " "), ("‌", " "), ("\xa0", " "), ("’", "'"), ("‘", "'"),
                 ("“", '"'), ("”", '"'), ("—", " "), ("–", " ")):
        s = s.replace(a, b)
    return collections.Counter(
        w for w in re.findall(r"[A-Za-z0-9'%$+.#×]+", s.lower()) if w.strip("'.,")
    )


def live(slug):
    h = open(os.path.join(extract.RAW, f"{slug}.html"), encoding="utf-8").read()
    b = extract.body(h)
    parts = [extract.h1(b) or ""]
    for m in extract.metrics(b):
        parts += [m["value"], m["label"]]
    for _, rx in SECTIONS:
        frag = extract.richtext_after(b, rx) or ""
        parts.append(re.sub(r"<[^>]+>", " ", frag))
    return words(" ".join(parts))


def literal(slug):
    """The generated study, back as a dict."""
    ts = open(os.path.join(CONTENT, f"{slug}.ts"), encoding="utf-8").read()
    body = ts[ts.index("export const study: Study = ") :].split("= ", 1)[1].rstrip().rstrip(";")
    j = re.sub(r"^(\s*)([A-Za-z_$][A-Za-z0-9_$]*):", r'\1"\2":', body, flags=re.M)
    # The emitted literal is TypeScript: identifier keys and trailing commas.
    j = re.sub(r",(\s*[}\]])", r"\1", j)
    return json.loads(j)


def text_of(node, out):
    if isinstance(node, str):
        out.append(node)
    elif isinstance(node, list):
        for x in node:
            text_of(x, out)
    elif isinstance(node, dict):
        for k in ("text", "items", "children", "b", "i"):
            if k in node:
                text_of(node[k], out)
    return out


def flat(block):
    """One block as the string a reader sees, runs concatenated."""
    return "".join(text_of(block, []))


def prose(study):
    parts = [study["title"]]
    for m in study["metrics"]:
        parts += [m["value"], m["label"]]
    for key in ("profile", "challenge", "approach", "outcome"):
        parts += text_of(study[key], [])
    return parts


def check(slug):
    study = literal(slug)
    mine = words(" ".join(prose(study)))
    theirs = live(slug)
    lost = theirs - mine
    added = mine - theirs

    # Blocks are joined with a space; the inline runs INSIDE a block are not.
    # A link splits "a comprehensive Shopping Ads strategy on platforms" into
    # three runs, and joining those with spaces would invent two that the
    # sentence does not have, so every evidence quote spanning a mark would
    # fail against text the study actually contains.
    body = " ".join(
        flat(b) for k in ("profile", "challenge", "approach", "outcome") for b in study[k]
    )
    profile = " ".join(flat(b) for b in study["profile"])

    missing_evidence = []
    if study["sectorEvidence"] not in profile:
        missing_evidence.append(f"sector: {study['sectorEvidence'][:60]}")
    for m in study["services"]:
        if m["evidence"] not in body:
            missing_evidence.append(f"{m['key']}: {m['evidence'][:60]}")

    b = extract.body(open(os.path.join(extract.RAW, f"{slug}.html"), encoding="utf-8").read())
    live_metrics = [(m["value"], m["label"]) for m in extract.metrics(b)]
    mine_metrics = [(m["value"], m["label"]) for m in study["metrics"]]

    ok = not lost and not added and not missing_evidence and live_metrics == mine_metrics
    print(f"\n{slug}")
    print(f"  live words {sum(theirs.values()):>5}   migrated {sum(mine.values()):>5}")
    print(f"  in live, not migrated : {sum(lost.values())} {dict(list(lost.items())[:10]) if lost else '(none)'}")
    print(f"  in migrated, not live : {sum(added.values())} {dict(list(added.items())[:10]) if added else '(none)'}")
    print(f"  figures               : {'match' if live_metrics == mine_metrics else 'DIFFER'}")
    print(f"  evidence              : {'all found' if not missing_evidence else 'NOT FOUND -> ' + '; '.join(missing_evidence)}")
    if slug in meta.SWAPPED:
        print("  note                  : challenge/approach published swapped upstream, migrated into their real roles")
    print("  VERDICT:", "clean" if ok else "DIFFERS - inspect above")
    return ok


if __name__ == "__main__":
    idx = extract.index()
    slugs = sys.argv[1:] or sorted(idx, key=lambda s: idx[s]["order"])
    results = [check(s) for s in slugs]
    print(f"\n{sum(results)}/{len(results)} clean")
    sys.exit(0 if all(results) else 1)
