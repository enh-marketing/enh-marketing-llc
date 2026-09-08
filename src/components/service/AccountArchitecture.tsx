"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CapabilityGlyph } from "@/components/service/CapabilityGlyph";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Managed } from "@/content/services/google-ads";

/** What we manage, drawn as the shape of the account it makes.
 *
 *  WHAT THE PREVIOUS VERSION GOT WRONG. It mapped each service onto a region of
 *  the account named after that same service, so the drawing restated the list
 *  instead of adding to it. Seven things pointing at seven boxes with the same
 *  seven names teaches a reader nothing.
 *
 *  THERE IS A REAL STRUCTURE IN THE COPY, AND THIS IS IT. Search "forms the core
 *  of many Google Ads accounts", so it is the largest block and it sits first.
 *  Shopping, Performance Max, Display and local advertising are campaign types
 *  that sit alongside it. Conversion tracking is not a campaign at all: it names
 *  "CRM connections that trace leads back to campaigns", so it is a band running
 *  under every one of them. And landing page work is the only entry that is not
 *  inside the ad account: it is the destination, which is the same boundary the
 *  section above this one is about. A reader leaves knowing the shape of a
 *  Google Ads account, not just what we are willing to do.
 *
 *  SCALE IS THE RANKING. The core is drawn largest because the document calls it
 *  the core; the three the document makes conditional are drawn on a broken edge
 *  because they apply only when it says they do. No label announces any of that:
 *  each entry's own sentence says when it applies.
 *
 *  NUMERALS COUPLE THE TWO HALVES. The blocks carry the document's own index and
 *  nothing else, so the drawing is never a second copy of the words beside it.
 *  Pointing at an entry raises its block, and pointing at a block raises its
 *  entry: the same link read from either end.
 *
 *  NOTHING IS COUNTED. Block sizes are a legible layout, not a budget split.
 *  The document gives no figures at all. */

type Block = { no: string; x: number; y: number; w: number; h: number; outside?: boolean };

/** The architecture. Positions are the structure the copy describes, not a
 *  chart: the core first and largest, campaign types alongside, measurement
 *  underneath them all, and the destination beyond the account's edge. */
const BLOCKS: Block[] = [
  { no: "01", x: 40, y: 66, w: 186, h: 132 },
  { no: "02", x: 244, y: 66, w: 186, h: 62 },
  { no: "03", x: 244, y: 140, w: 186, h: 58 },
  { no: "04", x: 40, y: 212, w: 186, h: 58 },
  { no: "05", x: 244, y: 212, w: 186, h: 58 },
  { no: "06", x: 40, y: 284, w: 390, h: 56 },
  { no: "07", x: 508, y: 150, w: 96, h: 120, outside: true },
];

export function AccountArchitecture({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  youtube,
  cta,
  ctaHref,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Managed[];
  youtube: { before: string; link: string; href: string; after: string };
  cta: string;
  ctaHref: string;
}) {
  const [lit, setLit] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        <div
          className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start lg:gap-14"
          onPointerLeave={() => setLit(null)}
        >
          {/* --------------------------------------------- the account --- */}
          {/* Dropped on the narrowest screens. At 285px wide the seven blocks
              put their index at about five pixels and the architecture reads as
              noise; the entries beside it carry every word of the copy on their
              own, so nothing is lost by not drawing it there. Same rule the
              pinned explorer uses for its own diagram. */}
          <div className="hidden sm:block lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-ink-2 p-5 sm:p-7">
              <svg
                viewBox="0 0 620 380"
                className="h-auto w-full"
                role="img"
                aria-label={`${title} ${strokeTitle}`}
              >
                {/* The account, and the edge the destination sits beyond. */}
                <rect x="16" y="34" width="438" height="322" rx="14" className="fill-none stroke-line" strokeWidth="1.2" />
                <line x1="482" y1="26" x2="482" y2="364" className="stroke-brand/40" strokeWidth="1" strokeDasharray="6 6" />

                {BLOCKS.map((b, i) => {
                  const item = items[i];
                  const on = lit === i;
                  const conditional = item?.weight === "conditional";
                  const core = item?.weight === "core";
                  return (
                    <g
                      key={b.no}
                      onPointerEnter={() => setLit(i)}
                      style={{ cursor: "default" }}
                    >
                      <rect
                        x={b.x}
                        y={b.y}
                        width={b.w}
                        height={b.h}
                        rx="10"
                        className={cn(
                          on
                            ? "fill-brand/[0.13] stroke-brand"
                            : core
                              ? "fill-brand/[0.05] stroke-brand/50"
                              : "fill-ink-3 stroke-line",
                        )}
                        strokeWidth={on ? 2 : 1.2}
                        strokeDasharray={conditional || b.outside ? "5 5" : undefined}
                        style={{ transition: "all 420ms cubic-bezier(0.16,1,0.3,1)" }}
                      />
                      {/* The document's own index, and nothing else. */}
                      <text
                        x={b.x + 14}
                        y={b.y + 24}
                        className={cn(
                          "font-display text-[11px] font-bold",
                          on ? "fill-brand" : core ? "fill-brand/70" : "fill-ash",
                        )}
                        style={{ transition: "fill 420ms ease-out" }}
                      >
                        {b.no}
                      </text>
                      {/* Abstract contents. Bars, never words. */}
                      {[0, 1].map((k) => (
                        <rect
                          key={k}
                          x={b.x + 14}
                          y={b.y + 36 + k * 11}
                          width={(b.w - 28) * [0.72, 0.46][k]}
                          height="4"
                          rx="2"
                          className={on ? "fill-brand/60" : "fill-line"}
                          style={{ transition: "fill 420ms ease-out" }}
                        />
                      ))}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ---------------------------------------------- the entries --- */}
          <ul className="flex flex-col gap-2.5">
            {items.map((item, i) => {
              const on = lit === i;
              const conditional = item.weight === "conditional";
              return (
                <li key={item.no}>
                  <div
                    onPointerEnter={() => setLit(i)}
                    className={cn(
                      "rounded-2xl border p-5 transition-all duration-300 motion-reduce:transition-none sm:p-6",
                      on
                        ? "border-brand bg-ink-2"
                        : conditional
                          ? "border-dashed border-line bg-transparent"
                          : "border-line bg-ink-2",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          "h-9 w-9 shrink-0 transition-colors duration-300 motion-reduce:transition-none",
                          on ? "text-brand" : conditional ? "text-ash" : "text-brand/70",
                        )}
                      >
                        <CapabilityGlyph variant={item.glyph} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          aria-hidden
                          className="block text-[0.6rem] font-semibold tabular-nums text-brand-text"
                        >
                          {item.no}
                        </span>
                        <h3 className="font-display mt-1 text-base font-extrabold uppercase leading-[1.15] text-snow sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Rise delay={0.12} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-fog">
              {youtube.before}
              <a
                href={youtube.href}
                className="font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand motion-reduce:transition-none"
              >
                {youtube.link}
              </a>
              {youtube.after}
            </p>
            <a
              href={ctaHref}
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep motion-reduce:transition-none"
            >
              {cta}
            </a>
          </div>
        </Rise>
      </Container>
    </section>
  );
}
