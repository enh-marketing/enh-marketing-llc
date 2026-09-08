/* Draws the tiles the AI Creative Production chapter flies through.
 *
 * NO GRAIN, DESPITE THE COMPONENT'S NAME. The first version carried an
 * feTurbulence layer per tile. It came out on the wrong side of two things at
 * once. The tiles are flown to translateZ 1050px against a 1200px perspective,
 * roughly eight times their laid-out size, and the component puts
 * `will-change: transform` on every tile wrap, which makes Chromium pin the
 * layer's raster scale rather than re-raster as the scale climbs. So fine grain
 * is the first thing lost: it either gets stretched into mush or costs a
 * filter re-raster at eight times the area to avoid that. A gradient survives
 * the same treatment gracefully, because a slightly soft gradient is still a
 * gradient. Dropped rather than paid for.
 */

import fs from "node:fs";
const OUT = "public/ai-hub/grainient";

/* Aspect ratios are the component's own, so the tiles keep its composition.
   Palette is the page's: deep space, the warm sun that carries through it, and
   the brand red used the way the site uses it, sparingly and never as a wash. */
const TILES = [
  { id: "01", ar: 0.981928, a: "#12203a", b: "#3b2b6b", c: "#8e6bd6" },
  { id: "02", ar: 1.07432,  a: "#1a1207", b: "#6b3a12", c: "#ff9838" },
  { id: "03", ar: 1.25243,  a: "#0b1626", b: "#1f4a6b", c: "#5fd8ff" },
  { id: "04", ar: 0.889706, a: "#1c0a0c", b: "#6b0810", c: "#e8000d" },
  { id: "05", ar: 1.43434,  a: "#0a1018", b: "#2a3f52", c: "#a8c6d8" },
  { id: "06", ar: 0.920188, a: "#161029", b: "#4a2a7a", c: "#b48cff" },
  { id: "07", ar: 1.03226,  a: "#1d1508", b: "#8e5a12", c: "#fff2cc" },
  { id: "08", ar: 1.39815,  a: "#08131a", b: "#155163", c: "#7fe6e0" },
  { id: "09", ar: 0.72619,  a: "#1a0d18", b: "#5c1f4a", c: "#ff8fd0" },
  { id: "10", ar: 1.14724,  a: "#0d1420", b: "#2b3a6b", c: "#6f8cff" },
  { id: "11", ar: 1.09574,  a: "#1e1204", b: "#7a4a0a", c: "#ffc46b" },
  { id: "12", ar: 1.22857,  a: "#101a14", b: "#1f5c42", c: "#6be0a8" },
  { id: "13", ar: 1.22857,  a: "#150f22", b: "#3a2a5c", c: "#cbb6ff" },
];

const W = 560;
let total = 0;

for (const t of TILES) {
  const H = Math.round(W / t.ar);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<linearGradient id="g${t.id}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${t.a}"/><stop offset="0.55" stop-color="${t.b}"/><stop offset="1" stop-color="${t.c}"/>
</linearGradient>
<radialGradient id="r${t.id}" cx="0.72" cy="0.24" r="0.9">
<stop offset="0" stop-color="${t.c}" stop-opacity="0.85"/><stop offset="0.5" stop-color="${t.b}" stop-opacity="0.35"/><stop offset="1" stop-color="${t.a}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#g${t.id})"/>
<rect width="${W}" height="${H}" fill="url(#r${t.id})"/>
</svg>`;
  const file = `${OUT}/tile-${t.id}.svg`;
  fs.writeFileSync(file, svg);
  total += Buffer.byteLength(svg);
}
console.log(`${TILES.length} tiles, ${(total / 1024).toFixed(1)} KB total, ${(total / TILES.length).toFixed(0)} bytes average`);
