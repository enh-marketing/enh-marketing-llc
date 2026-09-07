"""Pull the parts of a live enhmedia.com case study page the content model needs.

The live pages are Webflow and every one of the twenty-two is built from the
same five components: an <h1>, a counter strip of four figures, a COMPANY
PROFILE rich text, a `challenges` rich text, and an Approach / Outcome pair.
Everything below is that structure, read literally.

TWO COPIES OF APPROACH AND OUTCOME EXIST IN THE MARKUP. Webflow renders the
pair twice, once as <h3 class="main-heading"> for one breakpoint and once as
<h2 class="main-heading"> for the other. Only the h3 copy is read, so nothing
is migrated twice.
"""
import html
import json
import os
import re
import sys

RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")

# A non-breaking space sits inside "COMPANY PROFILE" on every page.
SP = r"[\s ]"


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

    Only the marks the twenty-two pages actually use are handled: <strong>,
    <em> and <a>. Anything else is walked through for its text, so an unknown
    tag loses its formatting and never its words.

    ENDS ARE NOT TRIMMED, and that is deliberate: the insights migration lost a
    space this way ("<strong>Dubai </strong>aimed" -> "Dubaiaimed"). Runs are
    collapsed to single spaces instead, and only the outermost list is stripped.
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


def richtext_after(b, heading_re):
    """The .w-richtext div that follows a heading matching heading_re."""
    m = re.search(heading_re, b, flags=re.S)
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


# ------------------------------------------------------------------- figures


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
    return {"src": widest(tag), "alt": unesc(alt.group(1)) if alt else ""}


def sheet_image(b):
    """The results sheet: the one <img class="infoimg"> on the page.

    Twenty-one of the twenty-two carry one. AllDay's slot holds Webflow's own
    placeholder SVG, which is not an image of anything, so it is filtered out
    here rather than migrated as artwork.
    """
    m = re.search(r"<img[^>]*infoimg[^>]*>", b)
    if not m:
        return None
    found = img(m.group(0))
    if not found["src"] or "plugins/Basic/assets/placeholder" in found["src"]:
        return None
    return found


def metrics(b):
    """The four published figures, value then label."""
    i = b.find("case-study-counter")
    if i < 0:
        return []
    chunk = b[i : b.find("</section>", i)]
    return [
        {"value": text(m.group(1)), "label": text(m.group(2))}
        for m in re.finditer(
            r'class="counterup[^"]*">(.*?)</div>.*?class="countertext[^"]*">(.*?)</div>',
            chunk,
            flags=re.S,
        )
    ]


def project_url(b):
    """The client site the page frames in its monitor mockup.

    Real, published metadata: the URL is in the page's own markup. The map
    embed in the site footer is the only other iframe on the page and is
    excluded by host.
    """
    for m in re.finditer(r'<iframe[^>]*src="([^"]*)"', b):
        u = unesc(m.group(1)).strip()
        if u and "google.com/maps" not in u:
            return u
    return None


# -------------------------------------------------------------------- index


def index(path=None):
    """slug -> its card on the live /case-studies index: thumbnail and title.

    The order of this list is the agency's own curation of its work, so it is
    kept as `order` rather than re-sorted.
    """
    path = path or os.path.join(RAW, "index.html")
    b = body(open(path, encoding="utf-8").read())
    out = {}
    for i, m in enumerate(
        re.finditer(
            r'<a href="/case-studies/([^"]+)" class="casestudiesbox[^"]*"[^>]*>(.*?)</a>',
            b,
            flags=re.S,
        )
    ):
        slug, guts = m.group(1), m.group(2)
        tag = re.search(r"<img[^>]*>", guts)
        title = re.search(r'<h3 class="casestudiestitleline">(.*?)</h3>', guts, flags=re.S)
        out[slug] = {
            "order": i,
            "thumb": img(tag.group(0)) if tag else None,
            "listingTitle": text(title.group(1)) if title else None,
        }
    return out


def index_meta(path=None):
    path = path or os.path.join(RAW, "index.html")
    h = open(path, encoding="utf-8").read()
    return {"title": page_title(h), "description": meta(h, "description")}


# ------------------------------------------------------------------- record


def record(slug, idx):
    h = open(os.path.join(RAW, f"{slug}.html"), encoding="utf-8").read()
    b = body(h)
    card = idx.get(slug, {})
    return {
        "slug": slug,
        "source": f"https://enhmedia.com/case-studies/{slug}",
        "order": card.get("order"),
        "metaTitle": page_title(h),
        "metaDescription": meta(h, "description"),
        "title": h1(b),
        "listingTitle": card.get("listingTitle"),
        "metrics": metrics(b),
        "profile": blocks(richtext_after(b, r'<h2 class="heading-6">%sCOMPANY%s+PROFILE%s</h2>' % (SP + "*", SP, SP + "*"))),
        "challenge": blocks(richtext_after(b, r'<h2 class="heading-6">\s*challenges\s*</h2>')),
        "approach": blocks(richtext_after(b, r'<h3 class="main-heading[^"]*">\s*Approach\s*</h3>')),
        "outcome": blocks(richtext_after(b, r'<h3 class="main-heading[^"]*">\s*Outcome\s*</h3>')),
        "thumb": card.get("thumb"),
        "sheet": sheet_image(b),
        "projectUrl": project_url(b),
    }


if __name__ == "__main__":
    idx = index()
    slugs = sys.argv[1:] or list(idx)
    print(json.dumps([record(s, idx) for s in slugs], indent=2, ensure_ascii=False))
