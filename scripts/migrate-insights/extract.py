"""Pull the parts of a Webflow blog post that the ENH content model needs."""
import re, html, json, os

def unesc(s): return html.unescape(s or "")

def meta(h, name, attr="name"):
    m = re.search(r'<meta content="(.*?)" %s="%s"\s*/?>' % (attr, re.escape(name)), h, re.S)
    return unesc(m.group(1)).strip() if m else None

def title(h):
    m = re.search(r"<title>(.*?)</title>", h, re.S)
    t = unesc(m.group(1)) if m else ""
    return re.sub(r"\s*\|\s*ENH Marketing\s*$", "", t).strip()

def banner(h):
    m = re.search(r'<section class="outer-section bg-black inner-banner-height".*?</section>', h, re.S)
    return m.group(0) if m else ""

def banner_bits(h):
    b = banner(h)
    txt = re.sub(r"\s+", " ", unesc(re.sub(r"<[^>]+>", "\n", b))).strip()
    parts = [p.strip() for p in re.split(r"\n+", unesc(re.sub(r"<[^>]+>", "\n", b))) if p.strip()]
    date = next((p for p in parts if re.fullmatch(r"[A-Z][a-z]+ \d{1,2}, \d{4}", p)), None)
    cat = None
    mc = re.search(r'class="insight-categories"[^>]*>([^<]*)<', h)
    if mc: cat = unesc(mc.group(1)).strip()
    img = None; alt = None
    mi = re.search(r'<img[^>]*?src="(https://cdn\.prod\.website-files\.com/[^"]+)"[^>]*>', b)
    if mi:
        img = unesc(mi.group(1))
        ma = re.search(r'alt="([^"]*)"', mi.group(0))
        alt = unesc(ma.group(1)) if ma else ""
    return {"date": date, "category": cat, "hero": img, "heroAlt": alt}

def body(h):
    i = h.find("rich-text-block w-richtext")
    if i < 0: return ""
    start = h.rfind("<div", 0, i)
    depth, j = 0, start
    while j < len(h):
        m = re.compile(r"<(/?)div\b").search(h, j)
        if not m: break
        depth += -1 if m.group(1) else 1
        j = m.end()
        if depth == 0: break
    return h[start:j] + "</div>"

def record(slug):
    h = open(f"raw/{slug}.html", encoding="utf-8").read()
    bb = banner_bits(h)
    bd = body(h)
    tags = {}
    for t in re.findall(r"<(h[1-6]|p|ul|ol|li|blockquote|figure|table|img|a|strong|em|b|i|code|pre|iframe|br|hr)\b", bd):
        tags[t] = tags.get(t, 0) + 1
    return {
        "slug": slug,
        "title": title(h),
        "description": meta(h, "description"),
        "date": bb["date"],
        "category": bb["category"],
        "hero": bb["hero"],
        "heroAlt": bb["heroAlt"],
        "bodyChars": len(re.sub(r"<[^>]+>", "", bd)),
        "tags": tags,
    }

if __name__ == "__main__":
    slugs = open("urls.txt").read().split()
    out = [record(s) for s in slugs]
    json.dump(out, open("inventory.json", "w"), indent=1)
    print(f"{len(out)} posts\n")
    import collections
    print("CATEGORIES:", collections.Counter(r["category"] for r in out).most_common())
    print()
    print("MISSING FIELDS:")
    for k in ("title","description","date","category","hero"):
        bad = [r["slug"] for r in out if not r[k]]
        print(f"  {k:12} missing on {len(bad)}", (bad[:4] if bad else ""))
    print()
    print("BODY TAGS SEEN ACROSS ALL POSTS:", collections.Counter(t for r in out for t in r["tags"]).most_common())
    print()
    tiny = [(r['slug'], r['bodyChars']) for r in out if r['bodyChars'] < 900]
    print("SHORT/EMPTY BODIES:", tiny if tiny else "none")
