"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Platform } from "@/content/services/ecommerce-seo";

/** Five platforms, drawn as five different situations.
 *
 *  WHY NOT A LOGO ROW. The document never treats these as brands to display.
 *  Every entry describes a different technical footing: Shopify "automatically
 *  provides features such as canonical tags, sitemaps and robots files" but
 *  still needs review; WooCommerce "depends heavily on the wider WordPress
 *  setup"; Magento involves "several storefronts" and the development resources
 *  to change them safely; custom stores "require closer coordination with the
 *  development team". The section's own closing claim is that we "review the
 *  actual store setup rather than relying on a standard checklist for every
 *  implementation" -- so a row of five identical cards under five logos would
 *  contradict the copy sitting inside them.
 *
 *  So each card carries its own schematic, built from the same three primitives
 *  (a platform layer, a store layer, and the pieces that sit between them)
 *  arranged differently per entry. The shapes are diagrams of what the copy
 *  already says, not new claims: nothing is labelled, counted or ranked, and no
 *  card asserts that one platform is better than another.
 *
 *  THE GRID IS DELIBERATELY UNEVEN. Five entries into a four-column grid leaves
 *  a hole, and five into a uniform row of five squeezes every body to a column.
 *  The spans below give the first and last cards more room, which also stops the
 *  section reading as the same card grid used further down the page.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only on
 *  anything carrying words. See globals.css, "Platform stack". */

/** One schematic per platform, in source order. Each is the same idea drawn
 *  differently: what the platform hands you, and what still has to be worked
 *  on. Marks only -- no labels, no numbers. */
function Schematic({ i }: { i: number }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.4, strokeLinecap: "round" as const };

  return (
    <svg viewBox="0 0 64 40" className="h-10 w-16 text-brand" aria-hidden>
      {i === 0 && (
        <>
          {/* Shopify: a fixed platform base, with the collection and product
              layers above it that the work actually touches. */}
          <rect x="3" y="29" width="58" height="8" rx="2" {...common} opacity={0.45} />
          <rect x="9" y="17" width="46" height="8" rx="2" {...common} />
          <rect x="16" y="5" width="32" height="8" rx="2" {...common} />
        </>
      )}
      {i === 1 && (
        <>
          {/* WooCommerce: the store sits inside a wider setup, and the ring is
              what it depends on. */}
          <rect x="20" y="14" width="24" height="14" rx="2" {...common} />
          <rect x="5" y="5" width="54" height="32" rx="4" {...common} opacity={0.45} />
          <path d="M12 12h4M12 30h4M48 12h4M48 30h4" {...common} opacity={0.45} />
        </>
      )}
      {i === 2 && (
        <>
          {/* Magento: several storefronts off one catalogue. */}
          <rect x="24" y="4" width="16" height="8" rx="2" {...common} />
          <path d="M32 12v7M12 26v-5h40v5" {...common} opacity={0.6} />
          <rect x="3" y="26" width="18" height="10" rx="2" {...common} />
          <rect x="23" y="26" width="18" height="10" rx="2" {...common} />
          <rect x="43" y="26" width="18" height="10" rx="2" {...common} />
        </>
      )}
      {i === 3 && (
        <>
          {/* BigCommerce and OpenCart: templates configured correctly, or not. */}
          <rect x="3" y="6" width="26" height="12" rx="2" {...common} />
          <rect x="35" y="6" width="26" height="12" rx="2" {...common} opacity={0.4} />
          <rect x="3" y="23" width="26" height="12" rx="2" {...common} opacity={0.4} />
          <rect x="35" y="23" width="26" height="12" rx="2" {...common} />
        </>
      )}
      {i === 4 && (
        <>
          {/* Custom: nothing is given, so everything is drawn as a requirement
              running between two parties. */}
          <rect x="3" y="14" width="14" height="12" rx="2" {...common} />
          <rect x="47" y="14" width="14" height="12" rx="2" {...common} />
          <path d="M17 20h30" {...common} />
          <path d="M22 20v-8M30 20v-8M38 20v-8M26 20v8M34 20v8" {...common} opacity={0.55} />
        </>
      )}
    </svg>
  );
}

/** Column spans, so the five cards do not sit in a dead-even row. Applied on
 *  the six-column grid only; below that the cards stack. */
const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function PlatformStack({ items }: { items: Platform[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={root}
      className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-6", shown && "is-in")}
    >
      {items.map((p, i) => (
        <article
          key={p.name}
          className={cn(
            "plat-card group relative flex flex-col rounded-2xl border border-line bg-ink-3 p-7 transition-colors duration-500 hover:border-brand/60",
            SPANS[i],
          )}
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <Schematic i={i} />
          <h3 className="font-display mt-6 text-[1.05rem] font-extrabold uppercase leading-[1.18] text-snow">
            {p.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
        </article>
      ))}
    </div>
  );
}
