"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Capability, Screen } from "@/content/services/intelligent-web";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Scroll length per service. The stage holds for the rest of the track. */
const VH_PER = 82;
const W = 760;
const H = 470;

/** The six services, each drawn as what it does to a website.
 *
 *  WHY SCREENS. This is a page about websites, so the honest constant is a
 *  browser: one chrome around all six, and six completely different things
 *  happening inside it. A build is a site being assembled. An improvement is an
 *  existing page left intact with one capability dropped into it. Personalisation
 *  is the rule, not the result, because the result is what the banner already
 *  draws. Live data is the wiring. Readable structure is the page's own outline
 *  exposed. A migration is two trees and the mapping between them.
 *
 *  EVERY LABEL IS THE DOCUMENT'S. Five of the six bodies end in a list of nouns
 *  and those lists are what the screens are built from: the six stages of a
 *  build, the seven signals a rule may use, the seven kinds of live value, the
 *  four parts of a readable structure, the four things carried through a
 *  migration. Nothing is written for a screen and no page content is invented:
 *  copy is bars, values are bars, and no URL, price or stock figure appears
 *  anywhere, because the document states none.
 *
 *  NO RESULTS. FAQ 5 refuses placement outright, so no screen shows a ranking, a
 *  position or an AI answer containing the business. The readable screen draws
 *  access and structure, which is what is actually offered. */
export function SiteScreens({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  screens,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Capability[];
  screens: Screen[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const staged = enhanced && !reduced;

  /** Scroll to a service's own slice of the track. Five viewports is a lot to
   *  ask of someone who came for the migration, and it makes the rail's hover
   *  states honest. */
  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const run = el.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({ top: start + ((i + 0.5) / items.length) * run, behavior: "smooth" });
  };

  return (
    <section id={id} data-section={label} className="relative">
      <Container className="relative pt-14 sm:pt-16">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "network", label: "Six services, six screens" }}
          className="mb-10"
        />
      </Container>

      {staged ? (
        <div ref={track} style={{ height: `${items.length * VH_PER + 100}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <Container className="w-full">
              {/* The rail runs down the side rather than across the top, so this
                  section does not read as the same furniture as the other
                  pinned runs on the site. */}
              <div className="grid items-center gap-x-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
                <div>
                  <ol className="border-t border-line">
                    {items.map((c, i) => (
                      <li key={c.no} className="border-b border-line">
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={i === active ? "true" : undefined}
                          className="group flex w-full items-center gap-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          <span
                            className={cn(
                              "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                              i === active ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                            )}
                          >
                            {c.no}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[0.8125rem] font-bold uppercase leading-tight transition-colors duration-500 motion-reduce:transition-none",
                              i === active ? "text-snow" : "text-ash group-hover:text-snow",
                            )}
                          >
                            {c.title}
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "ml-auto h-0.5 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                              i === active ? "w-12 bg-brand" : "w-4 bg-line group-hover:w-8 group-hover:bg-ash",
                            )}
                          />
                        </button>
                      </li>
                    ))}
                  </ol>

                  <motion.div
                    key={items[active].no}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mt-8"
                  >
                    <h3 className="font-display text-[clamp(1.2rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.1] text-snow">
                      {items[active].title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fog">
                      {items[active].body}
                    </p>
                    <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                        Read from
                      </span>
                      <span className="font-display text-[0.8125rem] font-bold uppercase leading-tight text-brand-text">
                        {screens[active].cite}
                      </span>
                    </p>
                  </motion.div>
                </div>

                <SiteScreen screen={screens[active]} step={active} />
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <Container className="pb-14 sm:pb-16">
          <ol className="space-y-14">
            {items.map((c, i) => (
              <li key={c.no}>
                <p className="font-display text-[0.625rem] font-bold tabular-nums text-brand-text">
                  {c.no}
                </p>
                <h3 className="font-display mt-2 text-[clamp(1.2rem,4.4vw,1.7rem)] font-extrabold uppercase leading-[1.1] text-snow">
                  {c.title}
                </h3>
                <div className="mt-6">
                  <SiteScreen screen={screens[i]} step={i} still />
                </div>
                <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">
                  {c.body}
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                    Read from
                  </span>
                  <span className="font-display text-[0.8125rem] font-bold uppercase leading-tight text-brand-text">
                    {screens[i].cite}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      )}
    </section>
  );
}


/** Where each screen's labels sit, in viewBox units, paired with `parts` by
 *  index.
 *
 *  THEY ARE HTML, NOT SVG TEXT. SVG text is measured in user units, so a 13-unit
 *  label is 13px on a desktop-width drawing and 5.8px on a phone, which is half
 *  the type floor and unreadable. Rendering them over the drawing instead keeps
 *  11px at 11px whatever width the screen is drawn at. Same lesson as the
 *  callouts on the elements section. */
const LABELS: Record<Screen["kind"], { x: number; y: number; anchor: "start" | "middle" | "end"; tone?: "brand" }[]> = {
  build: Array.from({ length: 6 }, (_, i) => ({
    x: 48 + ((W - 96) / 6) * (i + 0.5),
    y: 368,
    anchor: "middle" as const,
    ...(i === 5 ? { tone: "brand" as const } : {}),
  })),
  improve: [{ x: 88, y: 200, anchor: "start", tone: "brand" }],
  rules: Array.from({ length: 7 }, (_, i) => ({
    x: 100,
    y: 62 + i * 52 + 20,
    anchor: "start" as const,
    ...(i === 4 ? { tone: "brand" as const } : {}),
  })),
  live: Array.from({ length: 7 }, (_, i) => ({ x: 742, y: 50 + i * 56 + 14, anchor: "end" as const })),
  readable: Array.from({ length: 4 }, (_, i) => ({ x: 438, y: 252 + i * 44, anchor: "start" as const })),
  migrate: Array.from({ length: 4 }, (_, i) => ({
    x: 88 + i * ((W - 140) / 4),
    y: 382,
    anchor: "start" as const,
  })),
};

/* -------------------------------------------------------------- the screen -- */

function SiteScreen({ screen, step, still = false }: { screen: Screen; step: number; still?: boolean }) {
  return (
    <motion.div
      key={still ? "still" : step}
      initial={still ? false : { opacity: 0, scale: 0.985, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 shadow-[0_26px_64px_-44px_rgba(0,0,0,0.45)]"
      aria-hidden
    >
      {/* One chrome around all six, so they read as one product shown six ways. */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="ml-3 h-2 flex-1 rounded-full bg-line" />
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
          <rect x="0" y="0" width={W} height={H} fill="var(--color-ink-3)" />
          {screen.kind === "build" && <Build parts={screen.parts} />}
          {screen.kind === "improve" && <Improve />}
          {screen.kind === "rules" && <Rules parts={screen.parts} />}
          {screen.kind === "live" && <Live parts={screen.parts} />}
          {screen.kind === "readable" && <Readable parts={screen.parts} />}
          {screen.kind === "migrate" && <Migrate parts={screen.parts} />}
        </svg>

        {/* On a phone the drawing is scaled to about 45%, but an 11px label is
            still 11px, so the long ones run off the frame. Below sm the parts
            are listed under the screen instead of pinned onto it: the same
            words, still the document's, and readable. */}
        {screen.parts.map((part, i) => {
          const at = LABELS[screen.kind][i];
          if (!at) return null;
          return (
            <span
              key={part}
              className={cn(
                "font-display pointer-events-none absolute hidden -translate-y-1/2 whitespace-nowrap text-[0.6875rem] font-bold uppercase leading-none tracking-[0.05em] sm:block",
                at.anchor === "middle" ? "-translate-x-1/2" : at.anchor === "end" ? "-translate-x-full" : "",
                at.tone === "brand" ? "text-brand-text" : "text-ash",
              )}
              style={{ left: `${(at.x / W) * 100}%`, top: `${(at.y / H) * 100}%` }}
            >
              {part}
            </span>
          );
        })}
      </div>

      {/* The same parts, under the drawing, where it is too small to carry
          them. */}
      <ul className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line px-4 py-4 sm:hidden">
        {screen.parts.map((part) => (
          <li
            key={part}
            className="font-display text-[0.6875rem] font-bold uppercase leading-none tracking-[0.05em] text-ash"
          >
            {part}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** Bars of copy. Never words: the document writes no page content. */
function Copy({ x, y, w, rows, gap = 14, h = 7, op = 0.3 }: {
  x: number; y: number; w: number; rows: number[]; gap?: number; h?: number; op?: number;
}) {
  return (
    <>
      {rows.map((f, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w * f} height={h} rx={h / 2} fill="var(--color-ash)" fillOpacity={op} />
      ))}
    </>
  );
}

/* -- 01 build ---------------------------------------------------------------- */

/** A site being made: the six stages the document names, and the page coming
 *  together as they complete. */
function Build({ parts }: { parts: string[] }) {
  const colW = (W - 96) / parts.length;
  return (
    <>
      {/* The page, assembling. */}
      <rect x="48" y="36" width={W - 96} height="230" rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="72" y="60" width="180" height="14" rx="7" fill="var(--color-snow)" fillOpacity="0.28" />
      <Copy x={72} y={92} w={W - 144} rows={[0.9, 0.72]} />
      <rect x="72" y="132" width="120" height="26" rx="13" fill="var(--color-brand)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={72 + i * ((W - 168) / 3 + 12)} y="176" width={(W - 168) / 3} height="66" rx="6" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
          <rect x={84 + i * ((W - 168) / 3 + 12)} y="190" width={(W - 168) / 3 - 24} height="26" rx="4" fill="var(--color-ash)" fillOpacity="0.18" />
        </g>
      ))}

      {/* The six stages, in the document's order. */}
      <line x1="48" y1="330" x2={W - 48} y2="330" stroke="var(--color-line)" strokeWidth="2" />
      {parts.map((p, i) => {
        const cx = 48 + colW * (i + 0.5);
        return (
          <g key={p}>
            <circle cx={cx} cy="330" r="7" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="2.5" />
            <circle
              className="ci-blink"
              cx={cx}
              cy="330"
              r="4"
              fill="var(--color-brand)"
              style={{ animationDelay: `${(i).toFixed(2)}s` }}
            />
          </g>
        );
      })}
    </>
  );
}

/* -- 02 improve -------------------------------------------------------------- */

/** The site that is already there, left alone, with one capability dropped into
 *  it. The document's claim is the negative one: "without rebuilding the entire
 *  website", so most of this screen is deliberately untouched. */
function Improve() {
  return (
    <>
      <rect x="40" y="32" width={W - 80} height={H - 64} rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="68" y="60" width="200" height="14" rx="7" fill="var(--color-snow)" fillOpacity="0.22" />
      <Copy x={68} y={94} w={W - 136} rows={[0.94, 0.78, 0.86]} />

      {/* The one thing that changes. */}
      <rect x="68" y="176" width={W - 136} height="96" rx="8" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="2.5" />
      <Copy x={88} y={224} w={W - 176} rows={[0.5, 0.34]} op={0.35} />
      <circle cx={W - 96} cy="224" r="9" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
      <circle className="ci-blink" cx={W - 96} cy="224" r="5" fill="var(--color-brand)" />

      {/* Everything else, untouched. */}
      <Copy x={68} y={300} w={W - 136} rows={[0.88, 0.7, 0.92, 0.6]} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={68 + i * ((W - 136 - 36) / 4 + 12)} y="382" width={(W - 136 - 36) / 4} height="46" rx="6" fill="var(--color-ash)" fillOpacity="0.12" />
      ))}
    </>
  );
}

/* -- 03 rules ---------------------------------------------------------------- */

/** The rule, not the result. The banner already draws a page changing for two
 *  visitors; what this service is, is the set of signals a rule may use, and the
 *  document names seven of them. */
function Rules({ parts }: { parts: string[] }) {
  const MATCH = 4;
  return (
    <>
      {/* What a rule may look at. */}
      <rect x="40" y="32" width="300" height={H - 64} rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      {parts.map((p, i) => {
        const y = 62 + i * 52;
        const on = i === MATCH;
        return (
          <g key={p}>
            <rect x="60" y={y} width="260" height="40" rx="6" fill={on ? "var(--color-ink-3)" : "transparent"} stroke={on ? "var(--color-brand)" : "var(--color-line)"} strokeWidth={on ? 2.5 : 1.5} />
            <circle cx="82" cy={y + 20} r="6" fill="none" stroke={on ? "var(--color-brand)" : "var(--color-ash)"} strokeWidth="2" />
            {on && <circle className="ci-blink" cx="82" cy={y + 20} r="3.5" fill="var(--color-brand)" />}
          </g>
        );
      })}

      {/* And the part of the page it decides. */}
      <path d="M352 232 H392" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M382 224 L392 232 L382 240" stroke="var(--color-brand)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="404" y="32" width={W - 444} height={H - 64} rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <Copy x={428} y={62} w={W - 492} rows={[0.86, 0.6]} />
      <rect x="428" y="132" width={W - 492} height="86" rx="8" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="2.5" />
      <rect x="448" y="156" width={(W - 492) * 0.6} height="12" rx="6" fill="var(--color-brand)" fillOpacity="0.5" />
      <rect x="448" y="180" width={(W - 492) * 0.42} height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.35" />
      <Copy x={428} y={244} w={W - 492} rows={[0.9, 0.74, 0.82]} />
      <rect x="428" y="330" width="140" height="30" rx="15" fill="var(--color-brand)" />
    </>
  );
}

/* -- 04 live ----------------------------------------------------------------- */

/** The wiring. The page shows a current value; the value comes from somewhere
 *  else. The seven kinds the document names are the things on the wire. */
function Live({ parts }: { parts: string[] }) {
  return (
    <>
      {/* The page. */}
      <rect x="40" y="32" width="320" height={H - 64} rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <Copy x={64} y={60} w={272} rows={[0.9, 0.66]} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="64" y={120 + i * 92} width="272" height="72" rx="6" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.5" />
          <rect x="84" y={140 + i * 92} width="110" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.35" />
          {/* The value itself, which is the part that is live. */}
          <rect x="84" y={160 + i * 92} width="76" height="18" rx="4" fill="var(--color-brand)" fillOpacity="0.16" />
          <rect
            className="ci-blink"
            x="84"
            y={160 + i * 92}
            width="76"
            height="18"
            rx="4"
            fill="var(--color-brand)"
            fillOpacity="0.5"
            style={{ animationDelay: `${(i * 2).toFixed(2)}s` }}
          />
        </g>
      ))}

      {/* The systems it reads from, and the wires. */}
      {parts.map((p, i) => {
        const y = 50 + i * 56;
        return (
          <g key={p}>
            <path
              className="ci-flow"
              d={`M562 ${y + 14} H432 C400 ${y + 14} 392 ${y + 14} 380 236`}
              pathLength={100}
              stroke="var(--color-brand)"
              strokeWidth="1.6"
              fill="none"
              style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }}
            />
            <path
              d={`M562 ${y + 14} H432 C400 ${y + 14} 392 ${y + 14} 380 236`}
              stroke="var(--color-line)"
              strokeWidth="1.2"
              fill="none"
            />
            <rect x="562" y={y} width="176" height="28" rx="5" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
          </g>
        );
      })}
    </>
  );
}

/* -- 05 readable ------------------------------------------------------------- */

/** The page's own outline, exposed. Not a result: FAQ 5 refuses placement, so
 *  nothing here shows a ranking or an answer. What is drawn is access and
 *  structure, which is what is offered. */
function Readable({ parts }: { parts: string[] }) {
  return (
    <>
      {/* The page, with its structure showing. */}
      <rect x="40" y="32" width="330" height={H - 64} rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      {[
        { i: 0, w: 0.8 },
        { i: 1, w: 0.6 },
        { i: 1, w: 0.66 },
        { i: 2, w: 0.5 },
        { i: 2, w: 0.56 },
        { i: 1, w: 0.62 },
      ].map((r, k) => (
        <g key={k}>
          <rect x={64 + r.i * 22} y={64 + k * 44} width={282 * r.w} height={r.i === 0 ? 14 : 10} rx="5" fill="var(--color-snow)" fillOpacity={0.3 - r.i * 0.07} />
          <rect x={64 + r.i * 22} y={64 + k * 44 + (r.i === 0 ? 22 : 18)} width={282 * r.w * 0.7} height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.22" />
        </g>
      ))}

      {/* What a machine is given, and that it can get in. */}
      <rect x="404" y="32" width={W - 444} height="180" rx="8" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="2.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={428 + (i % 2) * 18} y={62 + i * 28} width={12} height="4" rx="2" fill="var(--color-brand)" fillOpacity="0.5" />
          <rect x={452 + (i % 2) * 18} y={60 + i * 28} width={(W - 512) * [0.7, 0.5, 0.62, 0.44, 0.56][i]} height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.3" />
        </g>
      ))}

      {parts.map((p, i) => (
        <g key={p}>
          <circle cx="418" cy={252 + i * 44} r="6" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle
            className="ci-blink"
            cx="418"
            cy={252 + i * 44}
            r="3.5"
            fill="var(--color-brand)"
            style={{ animationDelay: `${(i * 1.5).toFixed(2)}s` }}
          />
        </g>
      ))}
    </>
  );
}

/* -- 06 migrate -------------------------------------------------------------- */

/** Two trees and the mapping between them. What matters in a migration is what
 *  survives it, and the document names four things. */
function Migrate({ parts }: { parts: string[] }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <>
      {/* Where it is now, and where it goes. */}
      <rect x="40" y="32" width="250" height="270" rx="8" fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x={W - 290} y="32" width="250" height="270" rx="8" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="2.5" />

      {rows.map((i) => {
        const y = 64 + i * 46;
        return (
          <g key={i}>
            <rect x={64 + (i % 2) * 20} y={y} width={200 - (i % 2) * 20} height="26" rx="5" fill="var(--color-ash)" fillOpacity="0.16" />
            <rect x={W - 266 + (i % 2) * 20} y={y} width={200 - (i % 2) * 20} height="26" rx="5" fill="var(--color-brand)" fillOpacity="0.12" />
            <path
              className="ci-flow"
              d={`M296 ${y + 13} H${W - 296}`}
              pathLength={100}
              stroke="var(--color-brand)"
              strokeWidth="1.8"
              fill="none"
              style={{ animationDelay: `${(i * 0.35).toFixed(2)}s` }}
            />
            <path d={`M296 ${y + 13} H${W - 296}`} stroke="var(--color-line)" strokeWidth="1.2" fill="none" />
          </g>
        );
      })}

      {/* What is carried across. */}
      <line x1="40" y1="342" x2={W - 40} y2="342" stroke="var(--color-line)" strokeWidth="1.5" />
      {parts.map((p, i) => (
        <g key={p}>
          <circle cx={70 + i * ((W - 140) / parts.length)} cy="382" r="6" fill="none" stroke="var(--color-brand)" strokeWidth="2" />
          <circle
            className="ci-blink"
            cx={70 + i * ((W - 140) / parts.length)}
            cy="382"
            r="3.5"
            fill="var(--color-brand)"
            style={{ animationDelay: `${(i * 1.5).toFixed(2)}s` }}
          />
        </g>
      ))}
    </>
  );
}
