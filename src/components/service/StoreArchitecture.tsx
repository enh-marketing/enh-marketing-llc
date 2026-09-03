"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The store, drawn as the structure the eight areas of work act on.
 *
 *  WHY NOT THE SHELF. This site already has a StoreShelf, and it is the right
 *  drawing where a section lists kinds of merchant: eight shops is a shelf. This
 *  section lists something else entirely -- keyword research, architecture,
 *  category pages, product pages, technical crawl work, product data, content
 *  and international targeting. Six of those eight have nowhere to land on a row
 *  of storefronts, and pins that land arbitrarily turn the drawing back into
 *  decoration with a list beside it.
 *
 *  So this draws the store itself: demand above it, a root with categories and
 *  products beneath, the filter fan off to one side, a data tag on a product,
 *  outside sources pointing in, and separate market structures along the base.
 *  Every pin then sits on the thing its paragraph changes, which is the whole
 *  point of the pinned pattern.
 *
 *  IT IS ALSO THE DOCUMENT'S OWN ARGUMENT. The opening complains that "filters
 *  create more URLs than the store can manage properly", and the fan on the
 *  right is the only part of the drawing that multiplies. Seeing one category
 *  throw off more nodes than the catalogue beneath it makes that case without a
 *  sentence.
 *
 *  NOTHING IS NAMED OR COUNTED. No labels -- the panel beside the drawing
 *  carries the words, and repeating them here would halve the type size to say
 *  the same thing twice. No node count means anything: the document gives no
 *  figures at all, so three categories is a shape, not a catalogue. */

/** Where each pin sits, as percentages of the drawing, in item order. Kept
 *  beside the geometry it refers to rather than in the page body, so moving a
 *  node and moving its pin is one edit. */
const PINS: { left: string; top: string }[] = [
  { left: "50%", top: "6%" }, // 01 keyword research — the demand band
  { left: "50%", top: "21%" }, // 02 architecture — the root and its fan
  { left: "21%", top: "38%" }, // 03 category pages — a category node
  { left: "50%", top: "55%" }, // 04 product pages — the products beneath one
  { left: "85%", top: "50%" }, // 05 technical — the filter fan
  { left: "66%", top: "57%" }, // 06 product data — the tag on a product
  { left: "10%", top: "72%" }, // 07 content and authority — sources pointing in
  { left: "50%", top: "90%" }, // 08 international — separate market structures
];

export function StoreArchitecture({
  count,
  active,
  pin,
}: {
  /** Item count, so the pins can never outrun the panel beside them if the
   *  document's list is ever shortened. The drawing itself is fixed: it is the
   *  store, not one region per item. */
  count: number;
  active: number;
  pin: PinRenderer;
}) {
  /** A region is lit when its own item is selected, and sits back otherwise.
   *  Colour and opacity only: nothing moves, so a reader scanning the panel is
   *  never chasing a node around the drawing. */
  const reg = (i: number) =>
    cn(
      "transition-all duration-500",
      active === i ? "text-brand opacity-100" : "text-snow opacity-30",
    );

  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at 20% 10%, black, transparent 72%)",
        }}
      />

      <svg viewBox="0 0 400 300" className="relative w-full" aria-hidden>
        {/* 01 — demand. A band of searches above the store, a few of them the
            ones worth building for. */}
        <g className={reg(0)}>
          {Array.from({ length: 17 }, (_, i) => {
            const tall = i === 3 || i === 7 || i === 8 || i === 13;
            return (
              <rect
                key={i}
                x={40 + i * 19}
                y={tall ? 12 : 18}
                width="7"
                height={tall ? 18 : 12}
                rx="2"
                fill="currentColor"
                opacity={tall ? 1 : 0.45}
              />
            );
          })}
        </g>

        {/* 02 — the root and the fan that gives the store its shape. */}
        <g className={reg(1)}>
          <rect x="172" y="52" width="56" height="24" rx="5" {...line} />
          <path d="M200 76v14M85 110V90h230v20M200 90v20" {...line} strokeLinecap="round" />
        </g>

        {/* 03 — categories. */}
        <g className={reg(2)}>
          {[60, 172, 284].map((x) => (
            <rect key={x} x={x} y="110" width="56" height="24" rx="5" {...line} />
          ))}
        </g>

        {/* 04 — the products beneath one of them. */}
        <g className={reg(3)}>
          <path d="M200 134v12M156 168v-22h88v22M200 146v22" {...line} strokeLinecap="round" />
          {[142, 186, 230].map((x) => (
            <rect key={x} x={x} y="168" width="28" height="20" rx="4" {...line} />
          ))}
        </g>

        {/* 05 — the filter fan. One category, and the URL combinations sorting
            and filtering throw off it: the only part of the drawing that
            multiplies, which is the document's complaint. */}
        <g className={reg(4)}>
          <path
            d="M312 134v10M312 144h58M312 144h58M312 144v56h58"
            {...line}
            strokeLinecap="round"
            opacity="0.7"
          />
          <path d="M334 144v14h36M334 144v34h36" {...line} strokeLinecap="round" opacity="0.7" />
          {[138, 152, 172, 194].map((y, i) => (
            <rect
              key={y}
              x="366"
              y={y}
              width="26"
              height="12"
              rx="3"
              fill="currentColor"
              opacity={0.25 + i * 0.05}
            />
          ))}
        </g>

        {/* 06 — the data attached to a product: price, availability, variants. */}
        <g className={reg(5)}>
          <path d="M258 178h16" {...line} strokeLinecap="round" />
          <rect x="274" y="166" width="34" height="24" rx="4" {...line} />
          <path d="M281 174h20M281 182h12" {...line} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 07 — sources outside the store pointing back into it. */}
        <g className={reg(6)}>
          {[210, 236].map((y) => (
            <rect key={y} x="14" y={y} width="30" height="18" rx="4" {...line} />
          ))}
          <path
            d="M44 219h22v-73M44 245h34v-99"
            {...line}
            strokeLinecap="round"
            opacity="0.7"
          />
          <path d="M62 152l4-8 4 8M74 152l4-8 4 8" fill="currentColor" opacity="0.8" />
        </g>

        {/* 08 — separate structures for separate markets, planned rather than
            copied. Two, because the document writes about a store selling in
            more than one place, and never says how many. */}
        <g className={reg(7)}>
          {[112, 224].map((x) => (
            <g key={x}>
              <rect x={x} y="250" width="64" height="34" rx="6" {...line} />
              <rect x={x + 24} y="256" width="16" height="8" rx="2" fill="currentColor" opacity="0.6" />
              <path d={`M${x + 32} 264v5M${x + 16} 276v-7h32v7`} {...line} strokeWidth="1.2" />
              <rect x={x + 10} y="276" width="12" height="5" rx="1.5" fill="currentColor" opacity="0.45" />
              <rect x={x + 42} y="276" width="12" height="5" rx="1.5" fill="currentColor" opacity="0.45" />
            </g>
          ))}
          <path d="M176 267h48" {...line} strokeDasharray="4 4" opacity="0.6" />
        </g>
      </svg>

      {/* The pins, on the regions they select. */}
      {PINS.slice(0, count).map((at, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: at.left, top: at.top }}
        >
          {pin(i)}
        </span>
      ))}
    </div>
  );
}
