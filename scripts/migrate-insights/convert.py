"""Webflow rich text -> the ENH insights Block model.

Run:  python3 convert.py <slug> [<slug> ...]
Emits src/content/insights/<slug>.ts and downloads images into
public/insights/<slug>/.

The conversion is a pure transform: every string that reaches the output came
out of the source page. Nothing is written, reworded or summarised. The three
things it *decides* are recorded in MAPPING notes below, because each one is a
judgement someone may want to overrule.
"""
import html, json, os, re, struct, subprocess, sys
from html.parser import HTMLParser
from topics import TOPICS

REPO = "/Users/sourabh/Desktop/My Claude/Code/ENH V3"
SRC = os.path.join(REPO, "src/content/insights")
PUB = os.path.join(REPO, "public/insights")

# ---------------------------------------------------------------- link map
# The live site's URLs are flat keyword slugs; the new site has a pillar IA.
# Every internal target found across all 72 posts is listed here, and each was
# resolved by fetching the live page and reading its title AND by reading the
# anchor text the posts actually use for it. Three are judgement calls and are
# marked; the rest are exact equivalents.
LINKS = {
    "/": "/",
    "/contact-us": "/contact-us",
    # JUDGEMENT: the live page behind both of these is the Local SEO page, but
    # 10 of the 12 anchors across the posts read "SEO services in Dubai",
    # "best SEO company in Dubai", "SEO" — general SEO, not local. The pillar
    # answers that and links on to Local SEO; sending general SEO anchor text
    # to a Local SEO subpage would be the worse read.
    "/best-seo-company-in-dubai": "/services/seo",
    "/local-seo-services": "/services/seo",
    "/seo-agency-dubai": "/services/seo",
    "/ecommerce-seo-agency-dubai": "/services/seo/ecommerce-seo",
    "/corporate-video-production": "/services/video-marketing/corporate-video",
    "/event-video-production": "/services/video-marketing/event-video",
    "/social-media-agency-in-dubai": "/services/social-media-marketing",
    "/facebook-marketing-agency-in-dubai": "/services/social-media-marketing/facebook-marketing",
    "/google-adwords-company-dubai": "/services/performance-marketing/google-ads",
    "/web-design-company-dubai": "/services/web-design-development",
    "/b2b-lead-generation-dubai": "/services/lead-generation/b2b-lead-generation",
    # JUDGEMENT: "Digital Marketing Campaign Dubai" has no equivalent page in
    # the new IA. Anchors are "digital marketing campaign in Dubai", "Digital
    # campaigns", "Google Partner agency in Dubai" — all paid media.
    "/digital-marketing-campaign-dubai": "/services/performance-marketing",
    # JUDGEMENT: the live page covers SEO, PPC and social for e-commerce, which
    # no single new page does. E-commerce SEO is the closest built equivalent.
    "/e-commerce-marketing": "/services/seo/ecommerce-seo",
    # "content development services" -> written content, not social content.
    "/content-creation-in-dubai": "/services/seo/seo-content-creation",
}

def maplink(href: str) -> str:
    h = html.unescape(href).strip()
    h = re.sub(r"^https?://(www\.)?enhmedia\.com", "", h)
    if h.startswith("/blog/"):
        return "/insights/" + h[len("/blog/"):].strip("/")
    if h in LINKS:
        return LINKS[h]
    if h.startswith("/"):
        raise SystemExit(f"UNMAPPED internal link: {h!r} — add it to LINKS in convert.py")
    return h

# ------------------------------------------------------------------- parse
INLINE = {"a", "strong", "b", "em", "i", "code", "span", "u", "sup", "sub", "br"}
SKIP = {"script", "style"}

class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"tag": "#root", "attrs": {}, "kids": []}
        self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        node = {"tag": tag, "attrs": dict(attrs), "kids": []}
        self.stack[-1]["kids"].append(node)
        if tag not in ("br", "img", "hr", "meta", "link", "input"):
            self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.stack[-1]["kids"].append({"tag": tag, "attrs": dict(attrs), "kids": []})
    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i]["tag"] == tag:
                del self.stack[i:]
                return
    def handle_data(self, data):
        self.stack[-1]["kids"].append(data)

def parse(fragment: str):
    t = Tree(); t.feed(fragment); return t.root

# ------------------------------------------------------------------ inline
ZWJ = "‍"

def clean(s: str) -> str:
    return re.sub(r"[ \t\r\n]+", " ", s.replace(ZWJ, "").replace("\xa0", " "))

def inline(node, trim: bool = False) -> list:
    """A subtree -> Inline[]. Adjacent strings merge; empties disappear.

    `trim` strips the leading and trailing whitespace of the run, and is set
    ONLY by a block-level caller. It must never be set for a nested mark:
    "<strong>Dubai </strong>aimed" needs that trailing space, and stripping it
    joined the two words into "Dubaiaimed". Three posts carried that defect
    before the word-multiset check caught it."""
    out = []
    def push(v):
        if isinstance(v, str):
            if not v: return
            if out and isinstance(out[-1], str): out[-1] += v
            else: out.append(v)
        else:
            out.append(v)
    def walk(n):
        for k in n["kids"]:
            if isinstance(k, str):
                push(clean(k)); continue
            tag = k["tag"]
            if tag in SKIP: continue
            if tag == "br":
                push(" "); continue
            if tag in ("strong", "b"):
                inner = inline(k)
                if inner: push({"b": inner})
            elif tag in ("em", "i"):
                inner = inline(k)
                if inner: push({"i": inner})
            elif tag == "code":
                txt = text_of(k)
                if txt: push({"code": txt})
            elif tag == "a":
                inner = inline(k)
                href = k["attrs"].get("href", "")
                if inner:
                    if href: push({"a": maplink(href), "children": inner})
                    else: [push(x) for x in inner]
            else:
                walk(k)  # span, u, sup, and any stray block inside a paragraph
    walk(node)
    if trim:
        if out and isinstance(out[0], str): out[0] = out[0].lstrip()
        if out and isinstance(out[-1], str): out[-1] = out[-1].rstrip()
    return [x for x in out if x != ""]

def text_of(node) -> str:
    parts = []
    def walk(n):
        for k in n["kids"]:
            if isinstance(k, str): parts.append(k)
            elif k["tag"] == "br": parts.append(" ")
            elif k["tag"] not in SKIP: walk(k)
    walk(node)
    return clean("".join(parts)).strip()

def has_text(v) -> bool:
    if isinstance(v, str): return bool(v.strip())
    if isinstance(v, list): return any(has_text(x) for x in v)
    if isinstance(v, dict):
        for key in ("b", "i", "children"):
            if key in v: return has_text(v[key])
        return bool(v.get("code", "").strip())
    return False

# ------------------------------------------------------------------ images
def dimensions(path: str):
    with open(path, "rb") as f: d = f.read(64)
    if d[:4] == b"RIFF" and d[8:12] == b"WEBP":
        if d[12:16] == b"VP8X":
            w = int.from_bytes(d[24:27], "little") + 1
            h = int.from_bytes(d[27:30], "little") + 1
            return w, h
        if d[12:16] == b"VP8 ":
            return struct.unpack("<HH", d[26:30])[0] & 0x3FFF, struct.unpack("<HH", d[28:32])[0] & 0x3FFF
        if d[12:16] == b"VP8L":
            b = int.from_bytes(d[21:25], "little")
            return (b & 0x3FFF) + 1, ((b >> 14) & 0x3FFF) + 1
    if d[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", d[16:24])
    if d[:2] == b"\xff\xd8":
        with open(path, "rb") as f: raw = f.read()
        i = 2
        while i < len(raw) - 9:
            if raw[i] != 0xFF: i += 1; continue
            m = raw[i + 1]
            if m in (0xC0, 0xC1, 0xC2, 0xC3):
                h, w = struct.unpack(">HH", raw[i + 5:i + 9]); return w, h
            i += 2 + struct.unpack(">H", raw[i + 2:i + 4])[0]
    raise SystemExit(f"cannot read dimensions of {path}")

def download(url: str, slug: str, name: str):
    os.makedirs(os.path.join(PUB, slug), exist_ok=True)
    ext = os.path.splitext(url.split("?")[0])[1].lower() or ".webp"
    if ext not in (".webp", ".png", ".jpg", ".jpeg", ".avif", ".svg", ".gif"): ext = ".webp"
    rel = f"/insights/{slug}/{name}{ext}"
    dest = os.path.join(PUB, slug, f"{name}{ext}")
    if not os.path.exists(dest):
        r = subprocess.run(["curl", "-sS", "-L", "--max-time", "40", "-o", dest, url])
        if r.returncode or not os.path.getsize(dest):
            raise SystemExit(f"download failed: {url}")
    w, h = dimensions(dest)
    return rel, w, h

# ------------------------------------------------------------------ blocks
def convert(body_node, slug: str, stats: dict):
    """Top-level children -> Block[]."""
    # Heading levels are normalised per post. Webflow authors start wherever
    # they like: 27 of the 72 posts have no headings, 12 start at h3, one only
    # uses h4. The shallowest level present becomes h2 (the article's section
    # level, which is what the contents rail reads) and everything deeper
    # becomes h3, since the model has two levels by design.
    levels = sorted({int(n["tag"][1]) for n in walk_all(body_node)
                     if isinstance(n, dict) and re.fullmatch(r"h[1-6]", n["tag"])})
    top = levels[0] if levels else None
    img_n = [0]
    out = []

    def emit(node):
        tag = node["tag"]
        if tag in SKIP: return
        if tag == "p":
            # Webflow uses <br> as a paragraph break inside one <p>. Split so
            # each becomes a real paragraph rather than a run-on line.
            for seg in split_br(node):
                v = inline(seg, trim=True)
                if has_text(v): out.append({"type": "p", "text": v})
        elif re.fullmatch(r"h[1-6]", tag):
            t = text_of(node)
            if t:
                out.append({"type": "h2" if int(tag[1]) == top else "h3", "text": t})
        elif tag in ("ul", "ol"):
            items = []
            for li in node["kids"]:
                if not (isinstance(li, dict) and li["tag"] == "li"):
                    continue
                # A nested list is pulled OUT of the item before the item's own
                # text is read. Left in place, inline() walked into it and
                # joined the sub-points onto the label with no separator, which
                # concatenated words across the boundary ("keywordsExpand").
                subs = [k for k in li["kids"]
                        if isinstance(k, dict) and k["tag"] in ("ul", "ol")]
                own = {"tag": "li", "attrs": {}, "kids": [k for k in li["kids"] if k not in subs]}
                text = inline(own, trim=True)
                nested = []
                for sub in subs:
                    stats["nested_lists"] += 1
                    for sli in sub["kids"]:
                        if isinstance(sli, dict) and sli["tag"] == "li":
                            v = inline(sli, trim=True)
                            if has_text(v): nested.append(v)
                if not has_text(text) and nested:
                    # A bare nested list with no label of its own: promote its
                    # points rather than emitting an empty parent bullet.
                    items.extend({"text": v} for v in nested)
                elif has_text(text):
                    item = {"text": text}
                    if nested: item["items"] = nested
                    items.append(item)
            if items: out.append({"type": tag, "items": items})
        elif tag == "blockquote":
            v = inline(node, trim=True)
            if has_text(v): out.append({"type": "quote", "text": v})
        elif tag == "figure":
            im = first(node, "img")
            cap = first(node, "figcaption")
            if im and im["attrs"].get("src"):
                img_n[0] += 1
                rel, w, h = download(im["attrs"]["src"], slug, f"{img_n[0]:02d}")
                fig = {"src": rel, "alt": clean(im["attrs"].get("alt", "")).strip(), "w": w, "h": h}
                capv = inline(cap, trim=True) if cap else []
                if has_text(capv): fig["caption"] = capv
                # An in-body figure is evidence; it is unreadable at 68ch.
                fig["bleed"] = True
                out.append({"type": "figure", "figure": fig})
                stats["images"] += 1
        elif tag == "img":
            if node["attrs"].get("src"):
                img_n[0] += 1
                rel, w, h = download(node["attrs"]["src"], slug, f"{img_n[0]:02d}")
                out.append({"type": "figure", "figure": {
                    "src": rel, "alt": clean(node["attrs"].get("alt", "")).strip(),
                    "w": w, "h": h, "bleed": True}})
                stats["images"] += 1
        elif tag == "table":
            tb = table(node)
            if tb: out.append(tb); stats["tables"] += 1
        elif tag == "hr":
            out.append({"type": "hr"})
        else:
            for k in node["kids"]:
                if isinstance(k, dict): emit(k)
                elif k.strip():
                    out.append({"type": "p", "text": [clean(k).strip()]})

    for k in body_node["kids"]:
        if isinstance(k, dict): emit(k)
    return out

def walk_all(n):
    for k in n["kids"]:
        if isinstance(k, dict):
            yield k
            yield from walk_all(k)

def first(node, tag):
    for k in walk_all(node):
        if k["tag"] == tag: return k
    return None

def split_br(p):
    """One <p> containing <br> -> several pseudo-paragraph nodes."""
    groups, cur = [], {"tag": "p", "attrs": {}, "kids": []}
    for k in p["kids"]:
        if isinstance(k, dict) and k["tag"] == "br":
            groups.append(cur); cur = {"tag": "p", "attrs": {}, "kids": []}
        else:
            cur["kids"].append(k)
    groups.append(cur)
    return [g for g in groups if g["kids"]]

def walk_within_table(n):
    """Descendants, but never into a NESTED <table>.

    The Webflow table embed wraps each header cell's content in a one-cell
    table of its own: <th><div><table><tr><td>Label</td>. An unbounded walk
    collected those inner rows as if they belonged to the outer table, so every
    header label was emitted twice — once in `head`, once as a one-cell body
    row. text_of() on the <th> still reads the label through the wrapper, so
    the header itself is unaffected."""
    for k in n["kids"]:
        if isinstance(k, dict):
            if k["tag"] == "table":
                continue
            yield k
            yield from walk_within_table(k)

def table(node):
    rows = []
    for tr in walk_within_table(node):
        if tr["tag"] != "tr": continue
        cells, is_head = [], False
        for c in tr["kids"]:
            if isinstance(c, dict) and c["tag"] in ("td", "th"):
                if c["tag"] == "th": is_head = True
                cells.append(c)
        if cells: rows.append((is_head, cells))
    if not rows: return None
    head_is_first = rows[0][0] or True  # Webflow emits <td> throughout; row 1 is the header.
    head = [text_of(c) for c in rows[0][1]]
    body = [[inline(c, trim=True) for c in r[1]] for r in rows[1:]]
    if not body: return None
    return {"type": "table", "head": head, "rows": body}

# --------------------------------------------------------------------- emit
def ts(value) -> str:
    s = json.dumps(value, ensure_ascii=False, indent=2)
    # Unquote plain identifier keys so the file reads like the rest of src/content.
    return re.sub(r'^(\s*)"([A-Za-z_$][A-Za-z0-9_$]*)":', r"\1\2:", s, flags=re.M)

def build(slug: str) -> dict:
    import extract, datetime
    h = open(f"raw/{slug}.html", encoding="utf-8").read()
    bb = extract.banner_bits(h)
    stats = {"images": 0, "tables": 0, "nested_lists": 0}
    body = convert(parse(extract.body(h)), slug, stats)

    # The opening paragraph is set one step up, which is what the `lead` block
    # is for. Only where the article actually opens on a paragraph, and only
    # where it is short enough to carry the larger size without becoming a
    # wall: a 600-character lead at 1.35rem is worse than a plain one.
    if body and body[0]["type"] == "p" and len(json.dumps(body[0]["text"])) < 420:
        body[0] = {"type": "lead", "text": body[0]["text"]}

    hero_rel, hw, hh = download(bb["hero"], slug, "hero")
    note = {
        "slug": slug,
        "title": extract.title(h),
        "excerpt": extract.meta(h, "description"),
        # The one field that is not the source's own. See topics.py: the live
        # blog files all 72 posts under "News", so its own category cannot
        # drive a filter. Asserted rather than defaulted, so a new post cannot
        # slip through unclassified.
        "category": TOPICS[slug],
        "sourceCategory": bb["category"],
        "date": datetime.datetime.strptime(bb["date"], "%B %d, %Y").date().isoformat(),
        "hero": {"src": hero_rel, "alt": bb["heroAlt"], "w": hw, "h": hh},
        "body": body,
        "source": f"https://enhmedia.com/blog/{slug}",
    }
    return note, stats

def write(slug: str):
    note, stats = build(slug)
    os.makedirs(SRC, exist_ok=True)
    path = os.path.join(SRC, f"{slug}.ts")
    header = (
        "// Migrated from the live site, verbatim.\n"
        f"// SOURCE: {note['source']}\n"
        "//\n"
        "// Every string below is that page's own: the title and standfirst are its\n"
        "// <title> and meta description, the date is its banner's, and the body is its\n"
        "// rich-text block converted block for block. Nothing is reworded, summarised\n"
        "// or added. The hero image is the file the post serves, downloaded to\n"
        "// public/insights/ rather than hotlinked.\n"
        "//\n"
        "// ONE EXCEPTION: `category`. The live blog files every post under \"News\", so\n"
        "// its own taxonomy cannot drive a topic filter. The topic here was assigned\n"
        "// from the post's title and subject, named after the ENH service pillar it\n"
        "// belongs to. `sourceCategory` keeps what the source actually said, so the\n"
        "// substitution is visible rather than silent.\n"
        "//\n"
        "// Generated. To re-migrate, re-run the converter rather than editing by hand.\n\n"
        'import type { Note } from "@/content/insights";\n\n'
        "export const note: Note = "
    )
    open(path, "w", encoding="utf-8").write(header + ts(note) + ";\n")
    counts = {}
    for b in note["body"]: counts[b["type"]] = counts.get(b["type"], 0) + 1
    print(f"  {slug}")
    print(f"    {note['date']}  {note['category']}  hero {note['hero']['w']}x{note['hero']['h']}")
    print(f"    blocks: {counts}")
    if stats["nested_lists"]: print(f"    NOTE nested lists flattened: {stats['nested_lists']}")
    return note

if __name__ == "__main__":
    for s in sys.argv[1:]:
        write(s)
