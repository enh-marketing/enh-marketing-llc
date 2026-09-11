"""Pull the parts of a live enhmedia.com/portfolio page the content model needs.

The live pages are Webflow and all thirty-five are built from the same
components: an <h1>, a COMPANY PROFILE rich text, an optional lightbox gallery,
an optional monitor mockup holding either a live frame of the client's site or
a screenshot of it, and an optional Vimeo embed. A page carries some of those
and never all of them, which is the whole shape of the section: a video
production entry is a film, a web design entry is a site, a digital marketing
entry is a set of campaign artwork.

THE CATEGORY IS READ, NOT ASSIGNED. The live index files every project under
one or more of three tabs -- Digital Marketing, Web Design, Video Production --
and `index()` reads that membership out of the tab panes. Nine projects sit in
two tabs and keep one page, which is why the model carries a list.

Same conventions as scripts/migrate-case-studies/extract.py, which this is a
sibling of: tags out, entities resolved, only the marks the pages actually use.
"""
import html
import json
import os
import re
import sys

RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")

# A non-breaking space sits inside "COMPANY PROFILE" on every page.
SP = r"[\s\xa0]"


def unesc(s):
    return html.unescape(s or "")


def body(h):
    """Everything after <body>, with script and style removed."""
    b = h.split("<body", 1)[1]
    return re.sub(r"<(script|style)\b.*?</\1>", " ", b, flags=re.S)


def meta(h, name, attr="name"):
    m = re.search(r'<meta content="(.*?)" %s="%s"\s*/?>' % (attr, re.escape(name)), h, re.S)
    return unesc(m.group(1)).strip() if m else None


def page_title(h):
    m = re.search(r"<title>(.*?)</title>", h, re.S)
    return unesc(m.group(1)).strip() if m else ""


def text(frag):
    """Tags out, entities resolved, whitespace collapsed."""
    return re.sub(r"\s+", " ", unesc(re.sub(r"<[^>]+>", " ", frag))).strip()


def h1(b):
    m = re.search(r"<h1[^>]*>(.*?)</h1>", b, flags=re.S)
    return text(m.group(1)) if m else None


# ------------------------------------------------------------------- inline


def inline(frag):
    """HTML -> the Inline node list src/content/case-studies.ts declares.

    Lifted from the case studies extractor unchanged, because the block model
    is the same one: these pages use <strong>, <em> and <a> and nothing else,
    and anything outside that union is walked through for its text so an
    unknown tag loses its formatting and never its words.
    """
    out = []
    pos = 0
    pattern = re.compile(r"<(strong|b|em|i|a)\b([^>]*)>(.*?)</\1>", flags=re.S)
    for m in pattern.finditer(frag):
        if m.start() < pos:
            continue
        lead = frag[pos : m.start()]
        if lead:
            out.append(("t", lead))
        tag, attrs, guts = m.group(1), m.group(2), m.group(3)
        kids = inline(guts)
        if tag in ("strong", "b"):
            out.append(("b", kids))
        elif tag in ("em", "i"):
            out.append(("i", kids))
        else:
            href = re.search(r'href="([^"]*)"', attrs)
            out.append(("a", unesc(href.group(1)) if href else "", kids))
        pos = m.end()
    tail = frag[pos:]
    if tail:
        out.append(("t", tail))

    nodes = []
    for node in out:
        if node[0] == "t":
            s = re.sub(r"\s+", " ", unesc(re.sub(r"<[^>]+>", "", node[1])))
            # A zero-width joiner is Webflow's empty-paragraph filler.
            s = s.replace("‍", "").replace("‌", "")
            if s:
                nodes.append(s)
        elif node[0] in ("b", "i"):
            if node[1]:
                nodes.append({node[0]: node[1]})
        else:
            if node[2]:
                nodes.append({"a": node[1], "children": node[2]})

    if nodes and isinstance(nodes[0], str):
        nodes[0] = nodes[0].lstrip()
        if not nodes[0]:
            nodes.pop(0)
    if nodes and isinstance(nodes[-1], str):
        nodes[-1] = nodes[-1].rstrip()
        if not nodes[-1]:
            nodes.pop()
    return nodes


# ------------------------------------------------------------------- blocks


def profile_richtext(b):
    """The .w-richtext that follows the COMPANY PROFILE heading."""
    m = re.search(r'<h2 class="heading-6">%sCOMPANY%s+PROFILE%s</h2>' % (SP + "*", SP, SP + "*"), b, flags=re.S)
    if not m:
        return None
    rest = b[m.end() :]
    i = rest.find('class="main-text')
    if i < 0 or i > 400:
        return None
    start = rest.rfind("<div", 0, i)
    depth, j = 0, start
    while j < len(rest):
        mm = re.compile(r"<(/?)div\b").search(rest, j)
        if not mm:
            break
        depth += -1 if mm.group(1) else 1
        j = mm.end()
        if depth == 0:
            break
    return rest[start:j] + "</div>"


def blocks(frag):
    """<p>, <h3>/<h4> and <ul>/<ol>, in document order. Empty paragraphs (the
    zero-width joiners Webflow leaves between blocks) are dropped."""
    if not frag:
        return []
    out = []
    for m in re.finditer(r"<(p|h3|h4|ul|ol)\b[^>]*>(.*?)</\1>", frag, flags=re.S):
        tag, guts = m.group(1), m.group(2)
        if tag in ("ul", "ol"):
            items = [inline(li) for li in re.findall(r"<li\b[^>]*>(.*?)</li>", guts, flags=re.S)]
            items = [i for i in items if i]
            if items:
                out.append({"type": "ul", "items": items})
            continue
        nodes = inline(guts)
        if not nodes:
            continue
        if tag in ("h3", "h4"):
            out.append({"type": "h3", "text": text(guts)})
        else:
            out.append({"type": "p", "text": nodes})
    return out


# ------------------------------------------------------------------ figures


def widest(tag):
    """The largest file in a srcset, or the plain src."""
    src = re.search(r'src="([^"]+)"', tag)
    srcset = re.search(r'srcset="([^"]+)"', tag)
    best = unesc(src.group(1)) if src else None
    if srcset:
        cands = []
        for part in unesc(srcset.group(1)).split(","):
            p = part.strip().split()
            if len(p) == 2 and p[1].endswith("w"):
                cands.append((int(p[1][:-1]), p[0]))
        if cands:
            best = max(cands)[1]
    return best


def img(tag):
    alt = re.search(r'alt="([^"]*)"', tag)
    return {"src": widest(tag), "alt": unesc(alt.group(1) or "").strip()}


def gallery(b):
    """The lightbox strip: the client's own campaign artwork.

    Ten of the thirty-five publish one. The <img> carries no alt upstream on a
    single one of them, so alt text is authored by the converter rather than
    migrated -- the same arrangement the case studies make for their results
    sheets. See meta.py.
    """
    out = []
    for m in re.finditer(r'<div role="listitem" class="collection-item-2[^"]*">(.*?)</div>', b, flags=re.S):
        tag = re.search(r"<img[^>]*>", m.group(1))
        if tag:
            found = img(tag.group(0))
            if found["src"]:
                out.append(found)
    return out


def monitor(b):
    """The mockup section: either a live frame of the client's site or a
    screenshot of it, and never both.

    THE FRAME IS NOT MIGRATED AS A FRAME. Same call the case studies migration
    made and for the same two reasons: the monitor graphic is stock furniture,
    and an iframe of somebody else's site is refused by most of them. What
    migrates is the URL, as a link, and the screenshot, as a picture of the
    work -- which on a web design entry is the work.
    """
    i = b.find("main-website-box")
    if i < 0:
        return {"url": None, "shot": None, "hidden": True}
    section = b.rfind("<section", 0, i)
    chunk = b[section : b.find("</section>", i)]
    hidden = "w-condition-invisible" in chunk[: chunk.find(">") + 1]

    frame = re.search(r'id="wf-site-frame"\s*\n?\s*data-src="([^"]*)"', chunk)
    shot = re.search(r'id="wf-site-screenshot"\s*\n?\s*data-src="([^"]*)"', chunk)
    url = unesc(frame.group(1)).strip() if frame else ""
    shot_src = unesc(shot.group(1)).strip() if shot else ""

    # A Vimeo player in the frame slot is the film, not a website. It is read
    # from the film embed below instead, so it is dropped here.
    if "player.vimeo.com" in url:
        url = ""

    return {
        "url": url or None,
        "shot": {"src": shot_src, "alt": ""} if shot_src else None,
        "hidden": hidden,
    }


def film(b):
    """The Vimeo id of the page's own film, where it publishes one."""
    m = re.search(r'<div class="html-embed-3([^"]*)"[^>]*>(.*?)</div>\s*</div>', b, flags=re.S)
    if not m:
        return None
    if "w-condition-invisible" in m.group(1):
        return None
    src = re.search(r'<iframe src="([^"]*)"', m.group(2))
    if not src:
        return None
    vid = re.search(r"player\.vimeo\.com/video/(\d+)", unesc(src.group(1)))
    return vid.group(1) if vid else None


def case_study(b):
    """The case study the page links out to, where it links to one.

    Nine of the thirty-five carry a "View Case Study" button pointing at this
    agency's own /case-studies archive, which is already migrated. The slug is
    kept so the two sections join up rather than the portfolio entry sending a
    reader off-site to the page it was migrated from.
    """
    m = re.search(r'href="https?://(?:www\.)?enhmedia\.com/case-studies/([^"/?#]+)"', b)
    return m.group(1) if m else None


# -------------------------------------------------------------------- index


TABS = {
    "Digital Marketing": "digital-marketing",
    "Video Production": "video-production",
    "Web Design": "web-design",
}


def index(path=None):
    """slug -> its cards on the live /portfolio index.

    The index is three tab panes and a project can appear in more than one.
    `order` is the position of its FIRST appearance walking the panes in the
    order the model lists them, which is what gives the archive a stable
    sequence without inventing a ranking. `categories` is every pane it is in.
    """
    path = path or os.path.join(RAW, "index.html")
    b = body(open(path, encoding="utf-8").read())
    out = {}
    n = 0
    # The panes are siblings with no closing marker of their own, so each one
    # runs from its own opening tag to the next pane's (or to the end of the
    # document for the last). Matching to a lookahead that only exists between
    # panes silently loses whichever tab the index happens to list last.
    marks = [(m.start(), m.group(1)) for m in re.finditer(r'<div data-w-tab="([^"]+)" class="w-tab-pane', b)]
    panes = {
        label: b[start : (marks[i + 1][0] if i + 1 < len(marks) else len(b))]
        for i, (start, label) in enumerate(marks)
    }
    for label, key in TABS.items():
        pane = panes.get(label)
        if pane is None:
            raise SystemExit(f"tab pane missing from the index: {label}")
        for m in re.finditer(r'<a href="/portfolio/([^"]+)" class="casestudiesbox[^"]*"[^>]*>(.*?)</a>', pane, flags=re.S):
            slug, guts = m.group(1), m.group(2)
            tag = re.search(r"<img[^>]*>", guts)
            title = re.search(r'<h3 class="casestudiestitleline">(.*?)</h3>', guts, flags=re.S)
            card = out.setdefault(
                slug,
                {
                    "order": n,
                    "categories": [],
                    "thumb": img(tag.group(0)) if tag else None,
                    "listingTitle": text(title.group(1)) if title else None,
                },
            )
            if card["order"] == n:
                n += 1
            if key not in card["categories"]:
                card["categories"].append(key)
    return out


def index_meta(path=None):
    path = path or os.path.join(RAW, "index.html")
    h = open(path, encoding="utf-8").read()
    b = body(h)
    heading = re.search(r'<h1 class="main-heading[^"]*">(.*?)</h1>', b, flags=re.S)
    lede = re.search(r'<h1 class="main-heading[^"]*">.*?</h1><h3 class="tag-heading">(.*?)</h3>', b, flags=re.S)
    return {
        "title": page_title(h),
        "description": meta(h, "description"),
        "heading": text(heading.group(1)) if heading else None,
        "lede": text(lede.group(1)) if lede else None,
    }


# ------------------------------------------------------------------- record


def record(slug, idx):
    h = open(os.path.join(RAW, f"{slug}.html"), encoding="utf-8").read()
    b = body(h)
    card = idx.get(slug, {})
    mon = monitor(b)
    return {
        "slug": slug,
        "source": f"https://enhmedia.com/portfolio/{slug}",
        "order": card.get("order"),
        "categories": card.get("categories", []),
        "metaTitle": page_title(h),
        "metaDescription": meta(h, "description"),
        "title": h1(b),
        "listingTitle": card.get("listingTitle"),
        "profile": blocks(profile_richtext(b)),
        "thumb": card.get("thumb"),
        "gallery": gallery(b),
        "projectUrl": mon["url"],
        "siteShot": mon["shot"],
        "film": film(b),
        "caseStudy": case_study(b),
    }


if __name__ == "__main__":
    idx = index()
    slugs = sys.argv[1:] or sorted(idx, key=lambda s: idx[s]["order"])
    print(json.dumps([record(s, idx) for s in slugs], indent=2, ensure_ascii=False))
