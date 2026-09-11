/** Measures what blocks the main thread on the homepage, under a throttled CPU.
 *
 *  The iPhone reports have all been about the moment the preloader lifts. This
 *  reproduces that moment on a slow processor and records every long task
 *  (>50ms) with the time it started, so the blocking work can be pointed at
 *  rather than inferred.
 *
 *  Run: npm run build && npm run check:mainthread [cpuMultiplier]
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import puppeteer from "puppeteer-core";

const STATIC = ".vercel/output/static";
const PORT = 4396;
const BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const RATE = Number(process.argv[2] ?? 6); // 6x ~ a mid iPhone against this Mac
const PAGE = process.argv[3] ?? "/";

const TYPES = {
  ".html": "text/html;charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".mp4": "video/mp4", ".ico": "image/x-icon", ".avif": "image/avif",
};
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  let f = path.join(STATIC, decodeURIComponent(u.pathname));
  try { if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); } catch {}
  if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({
  executablePath: BRAVE, headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

const cdp = await page.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: RATE });

// Record long tasks and the two moments that matter, from inside the page.
await page.evaluateOnNewDocument(() => {
  window.__marks = [];
  window.__tasks = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__tasks.push({ start: Math.round(e.startTime), dur: Math.round(e.duration) });
  }).observe({ entryTypes: ["longtask"] });

  // when the curtain leaves the DOM, and when the headline is no longer masked
  const tick = () => {
    const curtain = document.querySelector('div[class*="z-[100]"]');
    // The moment the veil BEGINS to lift is the moment the page is handed over,
    // and it is the only one the reader feels. Detect it from the transform
    // rather than from the element leaving the DOM: removal is driven by the 4s
    // force-unmount, which says nothing about when the handover happened.
    if (curtain && !window.__marks.find((m) => m.k === "curtainLifts")) {
      const tr = getComputedStyle(curtain).transform;
      const m = tr && tr.startsWith("matrix") ? parseFloat(tr.split(",")[5]) : 0;
      if (m < -2) window.__marks.push({ k: "curtainLifts", t: Math.round(performance.now()) });
    }
    if (!window.__marks.find((m) => m.k === "curtainGone") && !curtain && performance.now() > 200) {
      window.__marks.push({ k: "curtainGone", t: Math.round(performance.now()) });
    }
    const ch = document.querySelector("h2 span span span span");
    if (ch && !window.__marks.find((m) => m.k === "headlineIn")) {
      const tr = getComputedStyle(ch).transform;
      if (tr === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(tr)) {
        window.__marks.push({ k: "headlineIn", t: Math.round(performance.now()) });
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

console.log(`\nCPU throttled ${RATE}x, viewport 390x844, page ${PAGE}\n`);
await page.goto(`http://localhost:${PORT}${PAGE}`, { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 7000));

const { tasks, marks, nav } = await page.evaluate(() => ({
  tasks: window.__tasks, marks: window.__marks,
  nav: (() => { const n = performance.getEntriesByType("navigation")[0];
    return n ? { domInteractive: Math.round(n.domInteractive), loadEnd: Math.round(n.loadEventEnd) } : {}; })(),
}));

const long = tasks.filter((t) => t.dur >= 50).sort((a, b) => a.start - b.start);
const blocking = long.reduce((s, t) => s + (t.dur - 50), 0);

console.log(`  domInteractive        ${nav.domInteractive}ms`);
for (const m of marks) console.log(`  ${m.k.padEnd(21)} ${m.t}ms`);
console.log(`\n  long tasks (>50ms)    ${long.length}`);
console.log(`  total blocking time   ${blocking}ms\n`);

console.log("  start    dur");
for (const t of long) {
  const bar = "#".repeat(Math.min(40, Math.round(t.dur / 25)));
  console.log(`  ${String(t.start).padStart(6)}ms ${String(t.dur).padStart(5)}ms  ${bar}`);
}

const worst = long.slice().sort((a, b) => b.dur - a.dur)[0];
if (worst) console.log(`\n  longest single block: ${worst.dur}ms at ${worst.start}ms`);

// The number the reader actually feels: blocking AFTER the veil has lifted.
const lift = marks.find((m) => m.k === "curtainLifts");
if (lift) {
  const after = long.filter((t) => t.start + t.dur > lift.t);
  const afterMs = after.reduce((s2, t) => s2 + Math.max(0, t.start + t.dur - Math.max(t.start, lift.t) - 50), 0);
  console.log(`\n  veil lifts at         ${lift.t}ms`);
  console.log(`  BLOCKING AFTER LIFT   ${Math.round(afterMs)}ms  across ${after.length} task(s)`);
  for (const t of after) console.log(`        ${t.start}ms  ${t.dur}ms`);
} else {
  console.log("\n  (veil lift not observed within the sample window)");
}

await browser.close();
server.close();
