"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { PinnedItem } from "@/components/service/PinnedExplorer";
import type { Screen } from "@/content/services/conversational-ai";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Scroll length per service. The stage holds for the rest of the track. */
const VH_PER = 80;

/** The six services, as the six screens they actually are.
 *
 *  WHY A SCREEN AND NOT A DIAGRAM. Every other version of this section drew six
 *  small abstract panels, and the honest criticism of them was that they all
 *  looked like each other. They did, because a chatbot, a phone call and a
 *  booking calendar have nothing in common at the level of boxes and arrows.
 *  They have everything in common at the level of *interface*, and they differ
 *  completely there: a widget in the corner of a page, a call in progress, a
 *  console with a ticket open, a source list being checked, a calendar, a phone
 *  thread. So the section is built as the product, held full height while the
 *  scroll moves through it.
 *
 *  NO SCRIPTED DIALOGUE, AND NO INVENTED UI COPY. Every label on every screen is
 *  a verbatim clause of that service's own two paragraphs: the chatbot's chips
 *  are the five things the document says it can do, the console's two groups are
 *  its routine enquiries and the four things it transfers, the knowledge base's
 *  rows are the seven sources it names. Messages themselves stay as bars,
 *  because the document writes no dialogue and inventing a customer's words on
 *  a page that promises approved information only would be the one unforgivable
 *  error here. Nothing is counted, timed or scored.
 *
 *  THE STAGE HOLDS, THE PAGE DOES NOT STOP. A tall track with a sticky stage,
 *  not a GSAP pin: the reader keeps their scroll and can leave whenever they
 *  like. Below lg, and before hydration, the same six render as a plain stacked
 *  run with their screens, which is what the server sends and what a reader who
 *  asked for no motion keeps. */
export function AgentScreens({
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
  items: PinnedItem[];
  screens: Screen[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const staged = enhanced && !reduced;

  /** Scroll to the middle of a service's own slice of the track. Six viewports
   *  of scrolling is a lot to ask of someone who wants the fourth one. */
  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    /* getBoundingClientRect, not offsetTop: the section is position:relative, so
       it is the track's offsetParent and offsetTop measures from the section
       rather than from the page. That silently lands the reader on the wrong
       service. */
    const start = el.getBoundingClientRect().top + window.scrollY;
    const run = el.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({ top: start + ((i + 0.5) / items.length) * run, behavior: reduced ? "auto" : "smooth" });
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
        /* ── held full height while the scroll moves through the six ─────── */
        <div ref={track} style={{ height: `${items.length * VH_PER + 100}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <Container className="w-full">
              <div className="grid items-center gap-x-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
                <Index items={items} active={active} label={label} onJump={jump} />
                <div className="relative">
                  <AgentScreen screen={screens[active]} step={active} />
                </div>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        /* ── the same six, stacked ───────────────────────────────────────── */
        <Container className="pb-14 sm:pb-16">
          <ol className="space-y-14">
            {items.map((s, i) => (
              <li key={s.no} className="border-t border-line pt-8">
                <p className="font-display text-[0.625rem] font-bold tabular-nums text-brand-text">
                  {s.no}
                </p>
                <h3 className="font-display mt-2 text-[clamp(1.25rem,4vw,1.75rem)] font-extrabold uppercase leading-[1.12] text-snow">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">
                  {s.body}
                </p>
                <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">
                  {s.note}
                </p>
                <div className="mt-7">
                  <AgentScreen screen={screens[i]} step={i} still />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      )}
    </section>
  );
}

/* --------------------------------------------------------------- the copy -- */

/** Every service name on screen at once, and the one being shown, in full. */
function Index({
  items,
  active,
  label,
  onJump,
}: {
  items: PinnedItem[];
  active: number;
  label: string;
  onJump: (i: number) => void;
}) {
  const s = items[active];
  return (
    <div>
      {/* The section's own name, because the heading has scrolled past. */}
      <p className="font-display mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
        {label}
      </p>
      <ol className="mb-9 border-t border-line">
        {items.map((it, i) => (
          <li key={it.no} className="border-b border-line">
            <button
              type="button"
              onClick={() => onJump(i)}
              aria-current={i === active ? "true" : undefined}
              className="group flex w-full items-center gap-4 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span
                className={cn(
                  "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                  i === active ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                )}
              >
                {it.no}
              </span>
              <span
                className={cn(
                  "font-display text-[0.8125rem] font-bold uppercase leading-tight transition-colors duration-500 motion-reduce:transition-none",
                  i === active ? "text-snow" : "text-ash group-hover:text-snow",
                )}
              >
                {it.title}
              </span>
              <span
                aria-hidden
                className={cn(
                  "ml-auto h-0.5 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  i === active ? "w-14 bg-brand" : "w-4 bg-line group-hover:w-9 group-hover:bg-ash",
                )}
              />
            </button>
          </li>
        ))}
      </ol>

      <motion.div
        key={s.no}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3 className="font-display text-[clamp(1.35rem,2.6vw,2.05rem)] font-extrabold uppercase leading-[1.08] text-snow">
          {s.title}
        </h3>
        <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-fog">{s.body}</p>
        <p className="mt-3.5 max-w-[52ch] border-l-2 border-brand/40 pl-4 text-[0.9375rem] leading-relaxed text-fog">
          {s.note}
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------- the screens -- */

/** One agent, as the interface it runs in. `still` renders the finished frame
 *  with no entrance motion, for the stacked fallback and reduced motion. */
function AgentScreen({ screen, step, still = false }: { screen: Screen; step: number; still?: boolean }) {
  const body = () => {
    switch (screen.kind) {
      case "chat":
        return <ChatScreen s={screen} still={still} />;
      case "voice":
        return <VoiceScreen s={screen} still={still} />;
      case "console":
        return <ConsoleScreen s={screen} still={still} />;
      case "knowledge":
        return <KnowledgeScreen s={screen} still={still} />;
      case "booking":
        return <BookingScreen s={screen} still={still} />;
      default:
        return <MessagingScreen s={screen} still={still} />;
    }
  };

  return (
    <motion.div
      key={still ? "still" : step}
      initial={still ? false : { opacity: 0, scale: 0.985, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.4)]"
      aria-hidden
    >
      {/* Every screen sits in the same chrome, so the six read as one product
          shown six ways rather than six unrelated pictures. */}
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="h-2.5 w-2.5 rounded-full bg-ash/35" />
        <span className="ml-3 h-1.5 w-28 rounded-full bg-line" />
        <span className="ml-auto h-1.5 w-10 rounded-full bg-line" />
      </div>
      <div className="p-5 sm:p-6 lg:h-[27rem] lg:overflow-hidden">{body()}</div>
    </motion.div>
  );
}

/** A control the screen offers, labelled in the document's own words. */
function Chip({
  children,
  tone = "quiet",
  i = 0,
  still,
}: {
  children: React.ReactNode;
  tone?: "quiet" | "live" | "out";
  i?: number;
  still?: boolean;
}) {
  return (
    <motion.li
      initial={still ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: still ? 0 : 0.35 + i * 0.07 }}
      className={cn(
        "font-display rounded-full border px-3 py-1.5 text-[0.6875rem] font-bold uppercase leading-none tracking-[0.04em]",
        tone === "live" && "border-brand/55 text-brand-text",
        tone === "out" && "border-dashed border-ash/70 text-ash",
        tone === "quiet" && "border-line text-fog",
      )}
    >
      {children}
    </motion.li>
  );
}

/** The second group every screen carries: what is agreed, checked or handed on. */
function Aside({ s, tone = "quiet", still }: { s: Screen; tone?: "quiet" | "out"; still?: boolean }) {
  if (!s.aside) return null;
  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
        {s.aside.label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {s.aside.items.map((a, i) => (
          <Chip key={a} tone={tone} i={i + 6} still={still}>
            {a}
          </Chip>
        ))}
      </ul>
    </div>
  );
}

/** A message. Never words: the document scripts no dialogue. */
function Bubble({
  w,
  mine,
  i,
  still,
}: {
  w: number;
  mine?: boolean;
  i: number;
  still?: boolean;
}) {
  return (
    <motion.span
      initial={still ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: still ? 0 : i * 0.13 }}
      className={cn(
        "block h-7 rounded-xl",
        mine ? "ml-auto rounded-br-sm bg-brand/16" : "rounded-bl-sm bg-snow/12",
      )}
      style={{ width: `${w}%` }}
    />
  );
}

/* -- 01 ---------------------------------------------------------------------- */

/** A widget in the corner of a page, which is where a website chatbot lives. */
function ChatScreen({ s, still }: { s: Screen; still?: boolean }) {
  return (
    <div className="flex gap-5">
      {/* The page it sits on. */}
      <div className="hidden flex-1 space-y-2.5 pt-1 sm:block">
        <span className="block h-3 w-[70%] rounded-sm bg-snow/18" />
        <span className="block h-1.5 w-[90%] rounded-full bg-line" />
        <span className="block h-1.5 w-[82%] rounded-full bg-line" />
        <span className="block h-1.5 w-[60%] rounded-full bg-line" />
        <span className="mt-4 block h-7 w-[38%] rounded-full bg-ash/20" />
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block rounded-lg border border-line p-2">
              <span className="block h-8 rounded-sm bg-ash/14" />
              <span className="mt-2 block h-1 w-4/5 rounded-full bg-line" />
              <span className="mt-1.5 block h-1 w-3/5 rounded-full bg-line" />
            </span>
          ))}
        </div>
      </div>

      {/* The chatbot. */}
      <div className="w-full shrink-0 rounded-xl border border-brand/45 bg-ink-3 sm:w-[300px]">
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <span className="h-6 w-6 rounded-full border-2 border-brand" />
          <span className="h-1.5 w-20 rounded-full bg-snow/25" />
          <span className="ml-auto h-1.5 w-3 rounded-full bg-line" />
        </div>

        <div className="space-y-2.5 px-4 py-4">
          <Bubble w={72} i={0} still={still} />
          <Bubble w={58} mine i={1} still={still} />
          <Bubble w={84} i={2} still={still} />
          {/* Thinking, not speaking. */}
          <motion.span
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: still ? 0 : 0.5 }}
            className="flex h-7 w-14 items-center justify-center gap-1 rounded-xl rounded-br-sm bg-brand/16"
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-brand"
                animate={still ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18, ease: "easeInOut" }}
              />
            ))}
          </motion.span>
        </div>

        {/* What it can actually do, in the document's own words. */}
        <ul className="flex flex-wrap gap-2 px-4 pb-4">
          {s.does.map((d, i) => (
            <Chip key={d} tone="live" i={i} still={still}>
              {d}
            </Chip>
          ))}
        </ul>

        <div className="flex items-center gap-2 border-t border-line px-4 py-3">
          <span className="h-6 flex-1 rounded-full border border-ash/40" />
          <span className="h-6 w-6 shrink-0 rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

/* -- 02 ---------------------------------------------------------------------- */

/** A spoken line has shape. Flat bars read as a loading state, so the run has
 *  real peaks and troughs, and nothing about it is measured or labelled. */
const WAVE = [
  10, 26, 16, 44, 22, 58, 30, 68, 38, 52, 26, 40, 18, 62, 34, 72, 44, 30, 20, 48,
  28, 56, 36, 24, 14, 42, 22, 34, 16, 26,
];

/** A call in progress, and the transfer that ends some of them. */
function VoiceScreen({ s, still }: { s: Screen; still?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-brand/35"
            animate={still ? undefined : { scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                stroke="var(--color-brand)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <span className="block h-2 w-[45%] rounded-full bg-snow/28" />
          <span className="block h-1.5 w-[30%] rounded-full bg-line" />
        </div>
      </div>

      {/* Spoken conversation. */}
      <div className="mt-7 flex h-28 items-center justify-between gap-[3px] rounded-xl border border-line bg-ink-3 px-4">
        {WAVE.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] shrink-0 rounded-full bg-brand/50"
            style={{ height: h }}
            animate={still ? undefined : { scaleY: [1, 0.3, 1.25, 0.55, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
          />
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {s.does.map((d, i) => (
          <Chip key={d} tone="live" i={i} still={still}>
            {d}
          </Chip>
        ))}
      </ul>

      <Aside s={s} still={still} />
    </div>
  );
}

/* -- 03 ---------------------------------------------------------------------- */

/** A console with the request open, and the two places it can go. */
function ConsoleScreen({ s, still }: { s: Screen; still?: boolean }) {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="space-y-2.5 rounded-xl border border-line bg-ink-3 p-4">
          <Bubble w={78} i={0} still={still} />
          <Bubble w={54} mine i={1} still={still} />
          <Bubble w={88} i={2} still={still} />
          <Bubble w={62} mine i={3} still={still} />
        </div>

        {/* What gets written while the conversation runs. */}
        <div className="rounded-xl border border-line bg-ink-3 p-4">
          <span className="block h-1.5 w-16 rounded-full bg-brand/60" />
          <div className="mt-4 space-y-3">
            {[86, 70, 92, 58].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="h-1 w-6 shrink-0 rounded-full bg-line" />
                <motion.span
                  className="block h-2 rounded-full bg-snow/22"
                  initial={still ? false : { width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 0.6, ease: EASE, delay: still ? 0 : 0.4 + i * 0.14 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Routine, and the four that are not. */}
      <div className="mt-5">
        <ul className="flex flex-wrap gap-2">
          {s.does.map((d, i) => (
            <Chip key={d} i={i} still={still}>
              {d}
            </Chip>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-start gap-4 border-t border-line pt-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <path
              d="M3 10h11m-4-4 4 4-4 4"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-brand-text">
            {s.aside?.label}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {(s.aside?.items ?? []).map((a, i) => (
              <Chip key={a} tone="live" i={i + 6} still={still}>
                {a}
              </Chip>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -- 04 ---------------------------------------------------------------------- */

/** Sources being checked before the agent is allowed to answer from them. */
function KnowledgeScreen({ s, still }: { s: Screen; still?: boolean }) {
  /** One source fails review. The document names three ways it can. */
  const STALE = 3;
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <ul className="space-y-1.5">
          {s.does.map((src, i) => (
            <motion.li
              key={src}
              initial={still ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: still ? 0 : i * 0.09 }}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3 py-2",
                i === STALE ? "border-dashed border-ash/60" : "border-line",
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  i === STALE ? "border-ash" : "border-brand",
                )}
              >
                {i !== STALE && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                    <path
                      d="M2.5 6.2 5 8.6 9.5 3.4"
                      stroke="var(--color-brand)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={cn(
                  "font-display text-[0.6875rem] font-bold uppercase tracking-[0.04em]",
                  i === STALE ? "text-ash line-through decoration-ash/70" : "text-fog",
                )}
              >
                {src}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* What the agent is then allowed to say, and where it came from. */}
        <div className="rounded-xl border border-brand/45 bg-ink-3 p-4">
          <div className="space-y-2.5">
            {[92, 74, 86, 60].map((w, i) => (
              <motion.span
                key={i}
                className="block h-2 rounded-full bg-snow/22"
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: still ? 0 : 0.7 + i * 0.1 }}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
            <span className="h-4 w-4 shrink-0 rounded-sm border border-brand" />
            <span className="h-1 flex-1 rounded-full bg-brand/45" />
          </div>
        </div>
      </div>

      <Aside s={s} tone="out" still={still} />
    </div>
  );
}

/* -- 05 ---------------------------------------------------------------------- */

/** Availability, and the one slot that becomes a booking. */
function BookingScreen({ s, still }: { s: Screen; still?: boolean }) {
  const GRID = [
    [1, 1, 0, 1, 1, 0],
    [1, 0, 1, 2, 1, 1],
    [0, 1, 1, 1, 0, 1],
  ];
  return (
    <div>
      <ol className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        {s.does.map((d, i) => (
          <li key={d} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="h-px w-5 bg-line" />}
            <motion.span
              initial={still ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: still ? 0 : i * 0.12 }}
              className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-fog"
            >
              {d}
            </motion.span>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-line bg-ink-3 p-4">
        <div className="mb-3 flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <span key={c} className="h-1.5 flex-1 rounded-full bg-line" />
          ))}
        </div>
        <div className="space-y-2">
          {GRID.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((slot, c) => (
                <motion.span
                  key={c}
                  initial={still ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                    delay: still ? 0 : 0.25 + (r * 6 + c) * 0.025,
                  }}
                  className={cn(
                    "relative h-10 flex-1 rounded-md border",
                    slot === 2
                      ? "border-brand bg-brand/10"
                      : slot === 1
                        ? "border-line bg-ink-2"
                        : "border-dashed border-line",
                  )}
                >
                  {slot === 2 && (
                    <svg
                      viewBox="0 0 20 20"
                      className="absolute inset-0 m-auto h-4 w-4"
                      fill="none"
                    >
                      <path
                        d="M4 10.5 8 14.5 16 5.5"
                        stroke="var(--color-brand)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Aside s={s} still={still} />
    </div>
  );
}

/* -- 06 ---------------------------------------------------------------------- */

/** The channel's own shape, and what is allowed to travel on it. */
function MessagingScreen({ s, still }: { s: Screen; still?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
      {/* The handset. */}
      <div className="mx-auto w-full max-w-[210px] rounded-[1.25rem] border border-line bg-ink-3 p-3">
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-ash/40" />
        <div className="flex items-center gap-2 border-b border-line pb-2.5">
          <span className="h-5 w-5 rounded-full border border-brand/60" />
          <span className="h-1.5 w-16 rounded-full bg-snow/22" />
        </div>
        <div className="space-y-2 pt-3">
          <Bubble w={78} i={0} still={still} />
          <Bubble w={62} mine i={1} still={still} />
          <Bubble w={86} i={2} still={still} />
          <Bubble w={54} mine i={3} still={still} />
        </div>
      </div>

      <div>
        <ul className="flex flex-wrap gap-2">
          {s.does.map((d, i) => (
            <Chip key={d} tone="live" i={i} still={still}>
              {d}
            </Chip>
          ))}
        </ul>
        <Aside s={s} still={still} />
      </div>
    </div>
  );
}
