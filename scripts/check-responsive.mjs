/** Responsive QA across the built site, measured in a real browser.
 *
 *  Drives headless Brave (Chromium) over the production build and, at each
 *  width, measures the things that actually break a layout rather than eyeing
 *  screenshots:
 *
 *    - horizontal overflow of the document
 *    - any element whose box crosses the right edge of the viewport
 *    - text clipped by its own container (scrollWidth > clientWidth)
 *    - interactive targets below the 24px minimum
 *
 *  It reports the ELEMENT, not just the page, so a fix can be aimed. Selectors
 *  are rebuilt from tag + classes, which is enough to find the component in
 *  source.
 *
 *  Run:  npm run build && npm run check:responsive
 *        npm run check:responsive -- 375,768        (only these widths)
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import puppeteer from "puppeteer-core";

const STATIC = ".vercel/output/static";
const PORT = 4399;
const BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";

const WIDTHS = process.argv[2]
  ? process.argv[2].split(",").map(Number)
  : [320, 360, 375, 390, 414, 430, 480, 600, 768, 820, 912, 1024, 1280, 1366, 1440, 1536, 1920];

/** One page per distinct template. 188 pages x 17 widths is mostly the same
 *  five layouts repeated; these cover every one of them. Override by listing
 *  paths in RESPONSIVE_PAGES. */
const PAGES = (process.env.RESPONSIVE_PAGES ?? [
  "/",
  "/seo-company-in-dubai",
  "/local-seo-services",
  "/healthcare-marketing-agency",
  "/ai-hub",
  "/ai-automation-agency-dubai",
  "/blog",
  "/blog/how-ai-is-transforming-social-media-marketing-for-uae-brands",
  "/case-studies",
  "/portfolio",
  "/testimonial",
  "/about-us",
  "/contact-us",
  "/marketing-consultations-strategies-dubai",
].join(",")).split(",");

const TYPES = {
  ".html": "text/html;charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".avif": "image/avif", ".json": "application/json", ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  let f = path.join(STATIC, decodeURIComponent(url.pathname));
  try {
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  } catch { /* fall through to 404 */ }
  if (!fs.existsSync(f)) { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

/** Runs inside the page. Returns every measurable responsive failure. */
function audit(width) {
  const sel = (el) => {
    const cls = (el.className || "").toString().trim().split(/\s+/).filter(Boolean).slice(0, 4).join(".");
    return el.tagName.toLowerCase() + (cls ? "." + cls : "") + (el.id ? "#" + el.id : "");
  };
  const out = { overflowX: 0, offenders: [], clipped: [], smallTargets: [] };
  const candidates = [];

  out.overflowX = Math.max(0, document.documentElement.scrollWidth - width);

  const all = document.querySelectorAll("body *");
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    // Crosses the right edge. Ignore anything the author deliberately parked
    // off-screen (honeypots, decorative bleeds behind overflow-hidden parents).
    if (r.right > width + 1) {
      let clipped = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const pcs = getComputedStyle(p);
        if (pcs.overflow !== "visible" || pcs.overflowX !== "visible") { clipped = true; break; }
      }
      if (!clipped && out.offenders.length < 12) {
        out.offenders.push({ sel: sel(el), right: Math.round(r.right), w: Math.round(r.width) });
      }
    }

    // Text clipped by its own box.
    //
    // sr-only is excluded: a visually-hidden span is a 1px box with overflow
    // hidden by definition, so every one of them reports as clipped text. They
    // are the single largest source of noise here and none is a defect.
    const srOnly = el.classList.contains("sr-only") || (r.width <= 1 && r.height <= 1);
    if (!srOnly && el.children.length === 0 && el.textContent.trim() && cs.overflow !== "visible") {
      if (el.scrollWidth > el.clientWidth + 1 && out.clipped.length < 12) {
        out.clipped.push({ sel: sel(el), scroll: el.scrollWidth, client: el.clientWidth,
          text: el.textContent.trim().slice(0, 28) });
      }
    }

    // Touch targets.
    if (/^(a|button)$/i.test(el.tagName) || el.getAttribute("role") === "button") {
      // WCAG 2.2 exempts a link sitting inline within a sentence, which is
      // most of what a bare height check flags. Only standalone controls count.
      const inlineInText = cs.display.startsWith("inline") && el.closest("p, li, blockquote");
      if (!inlineInText && cs.position !== "fixed" && el.textContent.trim() && (r.height < 24 || r.width < 24)) {
        candidates.push(el);
            }
    }
  }

  // SECOND PASS: measure what a finger actually hits.
  //
  // getBoundingClientRect() reports the element's own border box, and a control
  // can carry a larger pointer target than that -- .tap-safe centres a
  // transparent pseudo-element on it for exactly this reason.
  //
  // elementFromPoint only answers for coordinates INSIDE the viewport, so each
  // candidate is scrolled to the middle of the screen before it is probed. The
  // first version of this check skipped that and reported a 1px hit area for
  // every control below the fold, which is an artefact of the probe and not a
  // property of the page.
  const restore = window.scrollY;
  for (const el of candidates) {
    if (out.smallTargets.length >= 12) break;
    el.scrollIntoView({ block: "center", behavior: "instant" });
    const r2 = el.getBoundingClientRect();
    const cx = Math.min(width - 2, Math.max(2, r2.left + r2.width / 2));
    const cy = r2.top + r2.height / 2;
    const hits = (y) => {
      if (y < 1 || y > window.innerHeight - 2) return false;
      const hit = document.elementFromPoint(cx, y);
      return !!hit && (hit === el || el.contains(hit) || hit.closest("a,button") === el);
    };
    if (!hits(cy)) continue;          // obscured or off-screen: not measurable
    let up = 0, down = 0;
    while (up < 22 && hits(cy - up - 1)) up += 1;
    while (down < 22 && hits(cy + down + 1)) down += 1;
    const effectiveH = up + down + 1;
    if (effectiveH < 24) {
      out.smallTargets.push({ sel: sel(el), size: `${Math.round(r2.width)}x${Math.round(r2.height)}`,
        hit: `${Math.round(r2.width)}x${effectiveH}`, text: el.textContent.trim().slice(0, 24) });
    }
  }
  window.scrollTo(0, restore);
  return out;
}

const browser = await puppeteer.launch({
  executablePath: BRAVE,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const findings = [];
let checks = 0;

for (const page of PAGES) {
  const tab = await browser.newPage();
  await tab.setUserAgent("Mozilla/5.0 (responsive-audit) Chrome/120 Safari/537.36");
  for (const width of WIDTHS) {
    await tab.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await tab.goto(`http://localhost:${PORT}${page}`, { waitUntil: "networkidle2", timeout: 45000 });
    // let reveals settle so measured boxes are the resting ones
    await new Promise((r) => setTimeout(r, 900));
    const res = await tab.evaluate(audit, width);
    checks += 1;
    if (res.overflowX > 0 || res.offenders.length || res.clipped.length || res.smallTargets.length) {
      findings.push({ page, width, ...res });
    }
    process.stdout.write(res.overflowX > 0 || res.offenders.length ? "x" : ".");
  }
  await tab.close();
}
console.log(`\n\n${checks} page x width checks across ${PAGES.length} pages, ${WIDTHS.length} widths\n`);

const byKind = { overflowX: [], offenders: [], clipped: [], smallTargets: [] };
for (const f of findings) {
  if (f.overflowX > 0) byKind.overflowX.push(f);
  if (f.offenders.length) byKind.offenders.push(f);
  if (f.clipped.length) byKind.clipped.push(f);
  if (f.smallTargets.length) byKind.smallTargets.push(f);
}

const head = (t, n) => console.log(`\n${"=".repeat(58)}\n${t}: ${n}\n${"=".repeat(58)}`);

head("PAGES WITH HORIZONTAL SCROLL", byKind.overflowX.length);
for (const f of byKind.overflowX.slice(0, 30)) {
  console.log(`  ${String(f.width).padStart(4)}px  ${f.page}   +${f.overflowX}px`);
  for (const o of f.offenders.slice(0, 3)) console.log(`          ${o.sel}  right=${o.right}`);
}

head("ELEMENTS CROSSING THE RIGHT EDGE", byKind.offenders.length);
const seen = new Map();
for (const f of byKind.offenders)
  for (const o of f.offenders) {
    const k = o.sel;
    if (!seen.has(k)) seen.set(k, { widths: new Set(), pages: new Set(), right: o.right });
    seen.get(k).widths.add(f.width); seen.get(k).pages.add(f.page);
  }
for (const [k, v] of [...seen].sort((a, b) => b[1].widths.size - a[1].widths.size).slice(0, 20))
  console.log(`  ${k}\n      at ${[...v.widths].join(",")}px on ${v.pages.size} page(s)`);

head("CLIPPED TEXT", byKind.clipped.length);
const ctext = new Map();
for (const f of byKind.clipped)
  for (const c of f.clipped) {
    const k = c.sel + " :: " + c.text;
    if (!ctext.has(k)) ctext.set(k, new Set());
    ctext.get(k).add(f.width);
  }
for (const [k, w] of [...ctext].slice(0, 20)) console.log(`  ${k}\n      at ${[...w].join(",")}px`);

head("TOUCH TARGETS UNDER 24px", byKind.smallTargets.length);
const targ = new Map();
for (const f of byKind.smallTargets)
  for (const t of f.smallTargets) {
    const k = `${t.sel} :: "${t.text}" box=${t.size} hit=${t.hit}`;
    if (!targ.has(k)) targ.set(k, new Set());
    targ.get(k).add(f.width);
  }
for (const [k, w] of [...targ].slice(0, 20)) console.log(`  ${k}\n      at ${[...w].join(",")}px`);

await browser.close();
server.close();

const total = byKind.overflowX.length + seen.size + ctext.size + targ.size;
console.log(`\n${total === 0 ? "✓ No responsive failures measured." : `${total} distinct issue group(s).`}\n`);
process.exit(0);
