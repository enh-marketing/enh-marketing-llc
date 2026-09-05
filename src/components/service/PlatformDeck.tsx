"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Platform } from "@/content/services/ecommerce-seo";

/** Five platforms, drawn as five different technical footings.
 *
 *  WHY NOT A LOGO ROW, AND WHY NOT FIVE MATCHING CARDS. The document never
 *  treats these as brands to display, and it never treats them as equivalent
 *  either: Shopify "automatically provides features such as canonical tags,
 *  sitemaps and robots files" but still needs review after theme, app and
 *  catalogue changes; WooCommerce "depends heavily on the wider WordPress
 *  setup" and is assessed with its plugins, theme, hosting and configuration;
 *  Magento may run "several storefronts"; custom stores need requirements
 *  documented for a development team. Five identical cards would contradict the
 *  copy printed inside them. So there is one stage, and the stage rebuilds
 *  itself for whichever platform is selected.
 *
 *  WHAT IS IN EACH BUILD. Only the nouns of the entry beside it, counted from
 *  its own sentence: three things Shopify provides and three that trigger a
 *  review; the five parts WooCommerce is assessed with; several storefronts on
 *  one Magento base; three settings to configure; six documented requirements
 *  handed to a development team. Nothing is ranked, scored or timed, and no
 *  platform is drawn as the better one -- the section's own closing claim is
 *  that we review the actual store rather than run a standard checklist.
 *
 *  EVERY BODY STAYS IN THE DOM. Unselected entries collapse to zero height
 *  rather than unmounting, so all five paragraphs are present for readers,
 *  crawlers and the visible-copy check.
 *
 *  RESPONSIVE. The stage leads on small screens and the index follows it,
 *  because a schematic at reading width is worth more above the copy than
 *  beside it. Everything is driven by the reader; nothing is on a timer. */

/** The stage all five builds are drawn in. */
const W = 480;
const H = 300;

/** A plate in the stack. The offsets give the build its depth without a filter
 *  or a shadow anywhere near the render. */
function Plate({
  x,
  y,
  w,
  h,
  tone = "base",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "base" | "lit" | "open";
}) {
  return (
    <>
      <rect x={x + 5} y={y + 5} width={w} height={h} rx="6" className="fill-ink-2" />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        className={cn(
          tone === "lit" && "fill-brand/[0.14] stroke-brand",
          tone === "base" && "fill-ink-3 stroke-line",
          tone === "open" && "fill-transparent stroke-brand",
        )}
        strokeWidth="1.6"
        strokeDasharray={tone === "open" ? "7 6" : "0"}
      />
    </>
  );
}

function Build({ i }: { i: number }) {
  switch (i) {
    /* What the platform hands you, and what still triggers a review. */
    case 0:
      return (
        <>
          <Plate x={40} y={186} w={400} h={80} tone="lit" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={70 + k * 128} y={210} width={94} height={32} rx="5" className="fill-brand/25" />
              <path
                d={"M" + (86 + k * 128) + " 226l7 7 14-15"}
                fill="none"
                className="stroke-brand"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <Plate x={70 + k * 128} y={44} w={94} h={54} />
              <circle cx={117 + k * 128} cy={71} r="9" className="fill-ash/50" />
              <path
                d={"M" + (117 + k * 128) + " 106v56"}
                className="stroke-brand"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <path
                d={"M" + (111 + k * 128) + " 156l6 8 6-8"}
                fill="none"
                className="stroke-brand"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </>
      );
    /* Substantial control on top, and everything underneath it. */
    case 1:
      return (
        <>
          <Plate x={120} y={30} w={240} h={62} tone="lit" />
          <rect x={148} y={50} width={90} height={8} rx="4" className="fill-brand/60" />
          <rect x={148} y={66} width={140} height={8} rx="4" className="fill-brand/35" />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <path d={"M240 92v" + (32 + k * 6)} className="stroke-line" strokeWidth="1.4" />
              <Plate x={26 + k * 88} y={150} w={72} h={104} />
              <rect x={40 + k * 88} y={176} width={44} height={7} rx="3.5" className="fill-fog/35" />
              <rect x={40 + k * 88} y={192} width={30} height={7} rx="3.5" className="fill-fog/22" />
              <path
                d={"M" + (62 + k * 88) + " 150L240 124"}
                className="stroke-line"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </>
      );
    /* Several storefronts on one base, and the variants under them. */
    case 2:
      return (
        <>
          <Plate x={30} y={220} w={420} h={54} tone="lit" />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <Plate x={44 + k * 142} y={62} w={116} h={128} />
              <rect x={60 + k * 142} y={82} width={84} height={9} rx="4.5" className="fill-brand/55" />
              {[0, 1, 2, 3].map((r) => (
                <rect
                  key={r}
                  x={60 + k * 142}
                  y={104 + r * 18}
                  width={r % 2 ? 60 : 84}
                  height="7"
                  rx="3.5"
                  className="fill-fog/25"
                />
              ))}
              <path d={"M" + (102 + k * 142) + " 190v30"} className="stroke-brand" strokeWidth="1.5" />
            </g>
          ))}
        </>
      );
    /* Three settings, all of which have to be right. */
    case 3:
      return (
        <>
          <Plate x={36} y={40} w={408} h={216} />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={70} y={78 + k * 58} width={200} height={10} rx="5" className="fill-line" />
              <rect x={70} y={78 + k * 58} width={200} height={10} rx="5" className="fill-brand/70" />
              <circle cx={270} cy={83 + k * 58} r="12" className="fill-brand" />
              <path
                d={"M" + 264 + " " + (83 + k * 58) + "l5 5 9-10"}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x={304} y={76 + k * 58} width={104} height={14} rx="7" className="fill-fog/20" />
            </g>
          ))}
        </>
      );
    /* Requirements written down and handed over. */
    default:
      return (
        <>
          <Plate x={30} y={36} w={210} h={228} tone="open" />
          <rect x={56} y={62} width={104} height={10} rx="5" className="fill-brand" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <g key={k}>
              <rect x={56} y={98 + k * 26} width={158} height={7} rx="3.5" className="fill-fog/35" />
              <path
                d={"M240 " + (101 + k * 26) + "H316"}
                className="stroke-brand"
                strokeWidth="1.3"
                strokeDasharray="4 5"
              />
            </g>
          ))}
          <Plate x={318} y={92} w={132} h={116} tone="lit" />
          <circle cx={360} cy={130} r="12" className="fill-brand/60" />
          <circle cx={392} cy={130} r="12" className="fill-brand/40" />
          <path d="M338 176a22 22 0 0144 0M370 176a22 22 0 0144 0" fill="none" className="stroke-brand" strokeWidth="1.6" />
        </>
      );
  }
}

const BUILD_LABEL = [
  "What the platform provides already, with the changes that send each part back for review.",
  "One layer of control over the store, resting on every other part of the setup.",
  "Several storefronts standing on one platform, each with its own variants.",
  "Three settings, each one switched on.",
  "A written set of requirements handed across to a development team.",
];

export function PlatformDeck({ items }: { items: Platform[] }) {
  const [at, setAt] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
      {/* The index. */}
      <ol className="order-2 border-t border-line lg:order-1">
        {items.map((p, i) => {
          const on = i === at;
          return (
            <li key={p.name} className="border-b border-line">
              <button
                type="button"
                onClick={() => setAt(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setAt(i);
                }}
                aria-expanded={on}
                className="group flex w-full items-baseline gap-4 py-5 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 text-[0.62rem] font-semibold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand" : "text-ash",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-display text-[clamp(1rem,1.8vw,1.25rem)] font-extrabold uppercase leading-[1.18] transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand" : "text-snow group-hover:text-brand",
                  )}
                >
                  {p.name}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto mt-1.5 h-px shrink-0 transition-all duration-500 motion-reduce:transition-none",
                    on ? "w-8 bg-brand" : "w-3 bg-line",
                  )}
                />
              </button>

              {/* Collapsed, never removed. */}
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 leading-relaxed text-fog">{p.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The stage, rebuilt for whichever platform is selected. */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-ink-3 p-4 sm:p-6">
            <svg
              viewBox={"0 0 " + W + " " + H}
              role="img"
              aria-label={BUILD_LABEL[at]}
              className="block w-full"
            >
              <Build i={at} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
