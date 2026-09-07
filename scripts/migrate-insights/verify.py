"""Word-multiset comparison of the live post against the migrated note.

The same check MIGRATION.md used to prove the Next -> Astro move lost nothing:
compare the bag of words, not the markup. It catches a dropped paragraph, a
truncated sentence or a mangled entity, and ignores the things that are
*supposed* to change (tag names, whitespace, block structure).
"""
import json, re, subprocess, sys, collections, html
import extract

def words(s):
    s = html.unescape(s)
    s = s.replace("‍", " ").replace("\xa0", " ")
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    s = s.replace("—", " ").replace("–", " ")
    return collections.Counter(w for w in re.findall(r"[A-Za-z0-9'%$+.]+", s.lower()) if w.strip("'.,"))

def live_words(slug):
    h = open(f"raw/{slug}.html", encoding="utf-8").read()
    body = extract.body(h)
    # A <style> block inside the rich text is markup, not prose. One post
    # ("Google's AI Search Update") embeds 286 words of CSS in its body, which
    # the converter correctly skips; counting it here reported those 286 words
    # as lost content. Drop the contents of style and script before stripping
    # tags, so prose is compared with prose.
    body = re.sub(r"<(style|script)\b.*?</\1>", " ", body, flags=re.S | re.I)
    return words(re.sub(r"<[^>]+>", " ", body))

def note_text(node, out):
    if isinstance(node, str):
        out.append(node)
    elif isinstance(node, list):
        for x in node: note_text(x, out)
    elif isinstance(node, dict):
        for k in ("text", "items", "children", "b", "i", "rows", "caption"):
            if k in node: note_text(node[k], out)
        for k in ("code", "head"):
            if k in node: note_text(node[k], out)
        if "figure" in node:
            f = node["figure"]
            if "caption" in f: note_text(f["caption"], out)
    return out

def migrated_words(slug):
    ts = open(f"/Users/sourabh/Desktop/My Claude/Code/ENH V3/src/content/insights/{slug}.ts",
              encoding="utf-8").read()
    body = ts[ts.index("export const note: Note = "):].split("= ", 1)[1].rstrip().rstrip(";")
    # The emitted literal is JSON with identifier keys unquoted; requote them.
    j = re.sub(r'^(\s*)([A-Za-z_$][A-Za-z0-9_$]*):', r'\1"\2":', body, flags=re.M)
    note = json.loads(j)
    return words(" ".join(note_text(note["body"], []))), note

def check(slug):
    live = live_words(slug)
    mine, note = migrated_words(slug)
    lost = live - mine
    added = mine - live
    print(f"\n{slug}")
    print(f"  live body words : {sum(live.values())}")
    print(f"  migrated words  : {sum(mine.values())}")
    print(f"  IN LIVE, NOT MIGRATED : {sum(lost.values())} {dict(list(lost.items())[:12]) if lost else '(none)'}")
    print(f"  IN MIGRATED, NOT LIVE : {sum(added.values())} {dict(list(added.items())[:12]) if added else '(none)'}")
    ok = not lost and not added
    print("  VERDICT:", "identical word multiset" if ok else "DIFFERS — inspect above")
    return ok

if __name__ == "__main__":
    slugs = sys.argv[1:] or [l.strip() for l in open("migrated.txt")] if len(sys.argv) > 1 else sys.argv[1:]
    results = [check(s) for s in slugs]  # no short-circuit: check every post
    allok = all(results)
    print(f"\n{sum(results)}/{len(results)} identical")
    sys.exit(0 if allok else 1)
