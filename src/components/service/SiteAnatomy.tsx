"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const W = 680;
const H = 720;

/** Where each element lives on the page, and where its number sits.
 *  `at` is the marker, `box` is the part of the site it belongs to. */
const SPOTS: { at: [number, number]; box: [number, number, number, number] }[] = [
  { at: [214, 150], box: [206, 96, 440, 132] }, // personalised content
  { at: [214, 300], box: [206, 250, 440, 86] }, // live data
  { at: [78, 210], box: [56, 96, 122, 300] }, // clear structure
  { at: [78, 470], box: [56, 420, 122, 150] }, // search and AI access
  { at: [598, 58], box: [190, 44, 456, 26] }, // performance
  { at: [606, 592], box: [206, 566, 440, 92] }, // analytics
];

/** The elements of an intelligent website, marked on one.
 *
 *  WHY NOT A STACK. The version before this drew six isometric planes. That is
 *  the standard "layers" picture, it was mine rather than the document's, and
 *  six pale diamonds on a near-white ground read as one faint pile. Worse, it
 *  was abstract about a thing that is not abstract at all: these six are
 *  properties of a website, and a website can simply be drawn.
 *
 *  So the section is one site, at size, with the six marked where they actually
 *  live. Personalised content is the headline, the offer and the case studies,
 *  which is the document's own list. Live data is the value on the page.
 *  Structure is the outline down the side. Search and AI access is the markup
 *  block a machine is given and the crawler reaching it. Performance sits on the
 *  frame itself, because it is a property of the whole thing. Analytics is at
 *  the foot, where a conversion is counted.
 *
 *  POINTING BOTH WAYS. Hovering a row lights its part of the page and hovering
 *  the page lights its row, so the list and the drawing teach each other. Nothing
 *  is dimmed to do it: the highlight adds, it does not subtract.
 *
 *  NO CONTENT, NO FIGURES. Copy is bars and the live value is a bar, because the
 *  document writes no page content and states no price, stock level or speed. */
export function SiteAnatomy({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  depends,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: { no: string; title: string; body: string }[];
  depends: {
    title: string;
    lead: string;
    cases: { who: string; needs: string }[];
    closing: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;
  const [on, setOn] = useState<number | null>(null);

  const lit = (i: number) => on === i;
  const ink = (i: number) => (lit(i) ? "var(--color-brand)" : "var(--color-ash)");

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One site, six elements" }}
          className="mb-12"
        />

        <div ref={ref} className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
          {/* The site. */}
          <div className="relative lg:sticky lg:top-24 lg:self-start">
            <motion.svg
              viewBox={`0 0 ${W} ${H}`}
              className="block h-auto w-full"
              aria-hidden
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* The browser. */}
              <rect x="26" y="14" width={W - 52} height={H - 28} rx="16" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="2" />
              <rect x="40" y="28" width={W - 80} height="30" rx="8" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
              {[60, 76, 92].map((cx) => (
                <circle key={cx} cx={cx} cy="43" r="4" fill="var(--color-ash)" fillOpacity="0.35" />
              ))}
              {/* 05 performance: a property of the whole thing, so it sits on
                  the chrome rather than on any one block. */}
              <rect x="190" y="36" width="300" height="14" rx="7" fill="var(--color-ink-2)" />
              <rect
                className="ci-grow-x"
                x="190"
                y="36"
                width="300"
                height="14"
                rx="7"
                fill={ink(4)}
                fillOpacity={lit(4) ? 0.45 : 0.18}
              />

              {/* 03 clear structure: the outline the page is organised around. */}
              <rect x="56" y="96" width="122" height="300" rx="10" fill="var(--color-ink-3)" stroke={lit(2) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={lit(2) ? 2.5 : 1.5} />
              {[
                [0, 0.72], [1, 0.56], [1, 0.62], [2, 0.44], [2, 0.5], [1, 0.6], [2, 0.42],
              ].map(([d, w], k) => (
                <rect
                  key={k}
                  x={72 + (d as number) * 14}
                  y={120 + k * 38}
                  width={94 * (w as number)}
                  height={(d as number) === 0 ? 9 : 7}
                  rx="4"
                  fill={ink(2)}
                  fillOpacity={lit(2) ? 0.5 : 0.28}
                />
              ))}

              {/* 04 search and AI access: what a machine is handed, and that it
                  can get in. */}
              <rect x="56" y="420" width="122" height="150" rx="10" fill="var(--color-ink-3)" stroke={lit(3) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={lit(3) ? 2.5 : 1.5} />
              {[0, 1, 2, 3].map((k) => (
                <g key={k}>
                  <rect x={72} y={444 + k * 30} width="10" height="5" rx="2.5" fill={ink(3)} fillOpacity={lit(3) ? 0.6 : 0.3} />
                  <rect x={90} y={443 + k * 30} width={72 * [0.86, 0.6, 0.74, 0.5][k]} height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.26" />
                </g>
              ))}
              <path
                className="ci-flow"
                d="M117 686 V590"
                pathLength={100}
                stroke={ink(3)}
                strokeWidth="2"
                fill="none"
              />
              <path d="M110 600 L117 586 L124 600" stroke={ink(3)} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* 01 personalised content: the headline, the offer, the calls to
                  action and the case studies, which is the document's own list. */}
              <rect x="206" y="96" width="440" height="132" rx="10" fill="var(--color-ink-3)" stroke={lit(0) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={lit(0) ? 2.5 : 1.5} />
              <rect x="228" y="118" width="300" height="16" rx="8" fill={ink(0)} fillOpacity={lit(0) ? 0.55 : 0.3} />
              <rect x="228" y="146" width="230" height="9" rx="4.5" fill="var(--color-ash)" fillOpacity="0.26" />
              <rect x="228" y="176" width="132" height="30" rx="15" fill={lit(0) ? "var(--color-brand)" : "var(--color-ash)"} fillOpacity={lit(0) ? 1 : 0.4} />

              {/* 02 live data: the value on the page, which is the part that is
                  current. */}
              <rect x="206" y="250" width="440" height="86" rx="10" fill="var(--color-ink-3)" stroke={lit(1) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={lit(1) ? 2.5 : 1.5} />
              {[0, 1, 2].map((k) => (
                <g key={k}>
                  <rect x={228 + k * 142} y="272" width="86" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.26" />
                  <rect x={228 + k * 142} y="290" width="70" height="20" rx="5" fill={ink(1)} fillOpacity={lit(1) ? 0.2 : 0.1} />
                  <rect
                    className="ci-blink"
                    x={228 + k * 142}
                    y="290"
                    width="70"
                    height="20"
                    rx="5"
                    fill={ink(1)}
                    fillOpacity={lit(1) ? 0.6 : 0.34}
                    style={{ animationDelay: `${(k * 2).toFixed(2)}s` }}
                  />
                </g>
              ))}

              {/* The case studies the personalisation list also names. */}
              {[0, 1, 2].map((k) => (
                <rect
                  key={k}
                  x={206 + k * 150}
                  y="358"
                  width="140"
                  height="104"
                  rx="8"
                  fill="var(--color-ink-3)"
                  stroke={lit(0) ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth={lit(0) ? 2 : 1.5}
                  strokeOpacity={lit(0) ? 0.7 : 1}
                />
              ))}

              {/* The form, which the personalisation list names too. */}
              <rect x="206" y="486" width="440" height="60" rx="10" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
              <rect x="228" y="506" width="280" height="20" rx="6" fill="var(--color-ash)" fillOpacity="0.16" />
              <rect x="528" y="506" width="96" height="20" rx="10" fill={lit(0) ? "var(--color-brand)" : "var(--color-ash)"} fillOpacity={lit(0) ? 1 : 0.4} />

              {/* 06 analytics and tracking: where an agreed action is counted. */}
              <rect x="206" y="566" width="440" height="92" rx="10" fill="var(--color-ink-3)" stroke={lit(5) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={lit(5) ? 2.5 : 1.5} />
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <rect
                  key={k}
                  x={228 + k * 58}
                  y={634 - [22, 34, 28, 46, 38, 54][k]}
                  width="40"
                  height={[22, 34, 28, 46, 38, 54][k]}
                  rx="4"
                  fill={ink(5)}
                  fillOpacity={lit(5) ? 0.5 : 0.26}
                />
              ))}

            </motion.svg>

            {/* The numbers, on the parts they name. HTML, not SVG text, so 11px
                is 11px whatever width the drawing is rendered at. */}
            {items.map((el, i) => {
              const [cx, cy] = SPOTS[i].at;
              return (
                <button
                  key={el.no}
                  type="button"
                  onMouseEnter={() => setOn(i)}
                  onMouseLeave={() => setOn(null)}
                  onFocus={() => setOn(i)}
                  onBlur={() => setOn(null)}
                  aria-label={el.title}
                  className={cn(
                    "font-display absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand text-[0.6875rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    lit(i) ? "bg-brand text-white" : "bg-ink-3 text-brand-text hover:bg-brand hover:text-white",
                  )}
                  style={{ left: `${(cx / W) * 100}%`, top: `${(cy / H) * 100}%` }}
                >
                  {el.no}
                </button>
              );
            })}
          </div>

          {/* What each one is. All six present: a drawing whose labels only
              appear on hover would hide the offer. */}
          <ol className="border-t border-line">
            {items.map((el, i) => (
              <li
                key={el.no}
                onMouseEnter={() => setOn(i)}
                onMouseLeave={() => setOn(null)}
                className={cn(
                  "group border-b border-line py-5 transition-colors duration-500 motion-reduce:transition-none",
                  lit(i) ? "bg-ink-2" : "hover:bg-ink-2",
                )}
              >
                <div className="flex items-baseline gap-3.5">
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                      lit(i) ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                    )}
                  >
                    {el.no}
                  </span>
                  <p className="font-display text-[1.0625rem] font-bold uppercase leading-tight text-snow">
                    {el.title}
                  </p>
                </div>
                <p className="mt-2.5 max-w-[62ch] pl-7 text-[0.9375rem] leading-relaxed text-fog">
                  {el.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* The rule that decides which of the six you get. */}
        <Rise delay={0.1} className="mt-16 border-t-2 border-line pt-10">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display max-w-[16ch] text-[clamp(1.3rem,2.7vw,2.05rem)] font-extrabold uppercase leading-[1.1] text-brand">
                {depends.title}
              </p>
              <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-fog">{depends.lead}</p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line">
              {depends.cases.map((c) => (
                <li key={c.who} className="group bg-ink-2 px-6 py-5 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none">
                  <p className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-brand-text">
                    {c.who}
                  </p>
                  <p className="mt-2 max-w-[46ch] text-[1.0625rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    may need {c.needs}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-9 max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">
            {depends.closing}
          </p>
        </Rise>
      </Container>
    </section>
  );
}
