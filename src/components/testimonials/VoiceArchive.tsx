"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import {
  voices,
  layout,
  archive,
  LOGOS,
  countFor,
  STARS,
  SERVICE_LABEL,
  type Service,
  type Voice,
} from "@/content/testimonials";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;
const SERVICES: Service[] = ["seo", "web", "social", "craft"];

/** ALL EIGHTEEN, AS A WALL OF CARDS THAT DO SOMETHING.
 *
 *  THE PROBLEM THIS SOLVES. The eighteen testimonials run from nineteen words
 *  to a hundred and twenty. Eighteen equal cards either truncate the long ones
 *  into nonsense or set the short ones in a box four-fifths empty, and either
 *  way the reader gets eighteen things of identical weight with no way in. So:
 *
 *    THE FIVE THAT NAME A DURATION ARE WIDE CARDS. They are the only claim on
 *    the page nobody could have written on our behalf — fifteen years, eight,
 *    four, two, and one start date — so the years are set at display scale
 *    beside the quote and the card takes two columns. Interleaved one every
 *    four slots, they give the wall a beat instead of a grid.
 *
 *    A CARD OPENS IN PLACE. Ten of the eighteen fit whole; the other eight are
 *    clamped, and only those eight carry a control. Opening one gives it the
 *    full row and the grid reflows around it, animated per card, so nothing is
 *    truncated away and no dialog appears over the top.
 *
 *  WHY THERE IS SO LITTLE ON A CARD. The first version carried an index
 *  number, a star row, a monogram, a name, a company, up to three pill tags, a
 *  years badge and a button — nine elements competing at the same weight, which
 *  is what makes a card wall look cheap. What is left is the client's mark, the
 *  words, and who said them, in that order of weight. The services are one line
 *  of small caps rather than pills; the stars are a single quiet row; the index
 *  is gone.
 *
 *  THE LOGOS ARE REAL AND THEY SIT ON A PLATE. See LOGOS in the content file:
 *  every file carries its own opaque background, so a common white plate at one
 *  fixed height is what makes eighteen marks at eighteen aspect ratios read as
 *  a set rather than as pasted-in images.
 *
 *  MOTION IS SPLIT BY WHAT EACH LIBRARY IS ACTUALLY GOOD AT. GSAP ScrollTrigger
 *  drives the entrance, as a wave across the wall rather than a uniform
 *  stagger; Motion owns layout, because reflowing a grid around a card that
 *  just doubled in width is exactly what its layout animations do and exactly
 *  what GSAP would need hand-written FLIP for. They never write to the same
 *  element: GSAP has an inner wrapper of its own.
 *
 *  THE FILTER IS HONEST ABOUT BEING INCOMPLETE. A service tag exists only where
 *  the client names that service in their own sentence, and the phrase it came
 *  from is the tag's title. Eight of the eighteen name none, so they answer no
 *  chip, which is why the control is labelled by what clients mention rather
 *  than by what we did for them.
 *
 *  FIVE STARS IS A CONSTANT, NOT AN AVERAGE. Every testimonial on the source
 *  page carries five, so the row is drawn from that one fact and never
 *  aggregated into a score, because no scale or count is published anywhere. */
export function VoiceArchive({ id, label }: { id: string; label: string }) {
  const [filter, setFilter] = useState<Service | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const grid = useRef<HTMLUListElement>(null);

  const shown = filter
    ? layout.filter((v) => v.mentions?.some((m) => m.service === filter))
    : layout;

  const chips: { key: Service | null; label: string; count: number }[] = [
    { key: null, label: "All eighteen", count: voices.length },
    ...SERVICES.map((s) => ({ key: s, label: SERVICE_LABEL[s], count: countFor(s) })),
  ];

  /** THE ENTRANCE, AS A WAVE ACROSS THE WALL.
   *
   *  ScrollTrigger.batch rather than one trigger per card: it groups whatever
   *  crosses the line in the same frame and animates them together, which is
   *  the difference between a wall arriving in waves and eighteen cards each
   *  fading in on their own schedule. The delay is ordered by column so each
   *  wave sweeps left to right rather than appearing all at once.
   *
   *  IT WRITES TO .va-reveal, NEVER TO THE CARD. Motion's layout animation owns
   *  the <li>'s transform; two libraries writing one transform is the classic
   *  way this breaks.
   *
   *  Under prefers-reduced-motion nothing is installed and no starting state is
   *  ever set, so the wall is simply there. */
  useEffect(() => {
    if (reduced || !grid.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".va-reveal", grid.current);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 34 });
    const batch = ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      batchMax: 6,
      onEnter: (group) =>
        gsap.to(group, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: { each: 0.07, from: "start" },
          overwrite: true,
        }),
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      batch.forEach((t) => t.kill());
      gsap.set(cards, { clearProps: "opacity,transform" });
    };
    // Re-installed when the visible set changes: filtering mounts new cards,
    // and a card that was never observed would stay at opacity 0 forever.
  }, [reduced, filter]);

  return (
    <section id={id} data-section={label} className="relative py-14 sm:py-16">
      <Container>
        <SectionHeader
          index={archive.index}
          title={archive.title}
          strokeTitle={archive.strokeTitle}
          lede={archive.lede}
          className="mb-10"
        />

        {/* The control. Five options is a row of chips, not a select. */}
        <div className="mb-10 flex flex-wrap items-center gap-x-2.5 gap-y-3 border-t border-line pt-8">
          <p className="mr-3 w-full text-xs font-semibold uppercase text-brand-text sm:w-auto">
            What they mention
          </p>
          {chips.map((chip) => {
            const on = filter === chip.key;
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFilter(chip.key);
                  // An open card would otherwise be filtered away mid-animation.
                  setOpen(null);
                }}
                className={cn(
                  "inline-flex items-baseline gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                  on
                    ? "border-brand bg-brand text-white"
                    : "border-line text-fog hover:border-brand/60 hover:text-snow",
                )}
              >
                {chip.label}
                <span
                  className={cn(
                    "text-[0.68rem] font-extrabold tabular-nums",
                    on ? "text-white/70" : "text-ash",
                  )}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dense auto-flow, because the wide cards leave holes a normal grid
            would carry all the way down the wall. */}
        <motion.ul
          ref={grid}
          layout={!reduced}
          transition={{ duration: 0.55, ease: EASE }}
          className="grid grid-cols-1 gap-5 [grid-auto-flow:dense] sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((v) => (
              <Card
                key={v.no}
                voice={v}
                open={open === v.no}
                anyOpen={open !== null}
                reduced={reduced}
                onToggle={() => setOpen(open === v.no ? null : v.no)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* The label keeps its own casing: lower-casing it turned "SEO" into
            "seo" mid-sentence, and a colon lets it sit there as a label. */}
        <p className="mt-8 text-sm leading-relaxed text-fog">
          {filter === null
            ? `All ${voices.length} shown, transcribed exactly as published.`
            : `Showing ${shown.length} of ${voices.length}: the clients who name ${SERVICE_LABEL[filter]} in their own words.`}
        </p>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------- card */

function Card({
  voice: v,
  open,
  anyOpen,
  reduced,
  onToggle,
}: {
  voice: Voice;
  open: boolean;
  anyOpen: boolean;
  reduced: boolean;
  onToggle: () => void;
}) {
  const box = useRef<HTMLLIElement>(null);
  const quote = useRef<HTMLParagraphElement>(null);
  /** Only the cards whose words do not fit get a control. */
  const [clipped, setClipped] = useState(false);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const x = useSpring(lx, { stiffness: 130, damping: 20 });
  const y = useSpring(ly, { stiffness: 130, damping: 20 });

  const logo = LOGOS[v.no];
  const wide = Boolean(v.held);

  /* Measured rather than guessed from a character count: the clamp is a line
     count at a fluid font size, so where it bites depends on the column width
     the card ended up with. Re-measured on resize for the same reason. */
  useEffect(() => {
    const el = quote.current;
    if (!el) return;
    const measure = () => setClipped(el.scrollHeight > el.clientHeight + 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  /** The spotlight and the lean read the same pointer position: one goes to two
   *  CSS custom properties the gradient uses, the other to a spring. */
  const track = (e: React.PointerEvent<HTMLLIElement>) => {
    const el = box.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    lx.set((px - 0.5) * 8);
    ly.set((py - 0.5) * 8);
  };

  return (
    <motion.li
      ref={box}
      /* The hero's wall links straight to a card by this id. */
      id={`voice-card-${v.no}`}
      layout={reduced ? false : open || anyOpen ? true : "position"}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: EASE, layout: { duration: 0.55, ease: EASE } }}
      onPointerMove={track}
      onPointerLeave={() => {
        lx.set(0);
        ly.set(0);
      }}
      className={cn(
        "va-card group relative isolate",
        open ? "sm:col-span-2 lg:col-span-3" : wide && "sm:col-span-2",
      )}
    >
      {/* GSAP's entrance writes here, so it never touches the transform Motion
          is animating on the <li>. */}
      <div className="va-reveal h-full">
        <motion.div
          style={reduced ? undefined : { x, y }}
          /* The surface ladder puts a card one step above this section, which
             is a real step but a quiet one, so the card earns the rest of its
             presence on approach: the border takes brand, and a soft shadow
             lifts it off the band. Restrained deliberately — eighteen cards
             each carrying a drop shadow at rest is the look this page is
             trying not to have. */
          className="va-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-3"
        >
          {/* The spotlight, and the rule that draws across the top edge. */}
          <span aria-hidden className="va-glow pointer-events-none absolute inset-0 z-0" />
          <span
            aria-hidden
            className="va-rule pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 origin-left"
          />

          <div
            className={cn(
              "relative z-10 flex flex-1 gap-8 p-7 sm:p-8",
              wide && !open ? "flex-col lg:flex-row lg:items-start lg:gap-10" : "flex-col",
              open && "lg:gap-12",
            )}
          >
            {/* ---- the mark, and the years where the client names them ---- */}
            <div
              className={cn(
                "flex shrink-0 flex-col items-start gap-6",
                wide && !open && "lg:w-[13.5rem]",
              )}
            >
              {/* Fixed height, width follows: thirteen of these marks are
                  square and five are landscape, so one box would either shrink
                  the wordmarks to a square or strand the square ones in air.
                  The plate is pure white rather than a theme token, because
                  every file carries its own opaque white background and any
                  off-white plate shows the seam where they meet. */}
              <span className="flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-3">
                <img
                  src={logo.src}
                  alt={`${v.org} logo`}
                  width={logo.w}
                  height={logo.h}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto max-w-[10rem] object-contain"
                />
              </span>

              {wide && (
                <span className="hidden lg:block">
                  <YearMark voice={v} />
                </span>
              )}
            </div>

            {/* ---------------------------- the words --------------------- */}
            <div className="flex min-w-0 flex-1 flex-col">
              {wide && (
                <div className="mb-6 lg:hidden">
                  <YearMark voice={v} />
                </div>
              )}

              <blockquote className="relative flex-1">
                <p
                  ref={quote}
                  className={cn(
                    "font-display font-bold text-snow",
                    open
                      ? "text-[clamp(1.1rem,1.7vw,1.45rem)] leading-[1.45] lg:max-w-4xl"
                      : wide
                        ? "line-clamp-6 text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.5]"
                        : "line-clamp-6 text-[1.02rem] leading-[1.5]",
                  )}
                >
                  {/* The claim carries a drawn brand rule rather than a colour
                      change: on a card this small, three words in red read as a
                      link, and a rule reads as emphasis. */}
                  <Marked text={v.quote} mark={v.mark} className="tm-mark" />
                </p>
              </blockquote>

              {/* Only where the words are actually cut. Ten of the eighteen fit
                  whole and carry no control at all, which is most of what stops
                  the wall looking like eighteen forms. */}
              {(clipped || open) && (
                <button
                  type="button"
                  onClick={onToggle}
                  aria-expanded={open}
                  className="group/btn mt-6 inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-wide text-snow transition-colors duration-300 hover:text-brand"
                >
                  <span
                    aria-hidden
                    className="h-px w-6 bg-brand transition-all duration-500 group-hover/btn:w-10"
                  />
                  {open ? "Close" : "Read in full"}
                  {/* Eighteen controls all labelled "Read in full" is eighteen
                      identical entries in a screen reader's button list. This
                      completes each into a sentence without printing the name
                      twice on screen. */}
                  <span className="sr-only">
                    {" "}
                    the testimonial from {v.name}, {v.org}
                  </span>
                </button>
              )}

              {/* WHO SAID IT, AND HOW THEY RATED IT, ON ONE LINE.
                  The stars started in the card's top-right corner, which read
                  well on the narrow cards and collided with the first line of
                  the quote on the wide ones, where the words column runs to
                  the card's right edge. Here they cannot collide with
                  anything, and they sit with the attribution they belong to
                  rather than floating above the words.

                  Not a rating widget: every testimonial on the source page
                  carries five, so this is a constant, never an average. */}
              <footer className="mt-7 flex items-start justify-between gap-6 border-t border-line pt-6">
                <div className="min-w-0">
                <cite className="font-display block text-sm font-extrabold uppercase not-italic leading-tight text-snow">
                  {v.name}
                </cite>
                <span className="mt-1.5 block text-[0.82rem] leading-snug text-fog">
                  {v.org}
                </span>
                {v.mentions && (
                  /* One line of small caps rather than pill tags. Pills put
                     three more bordered shapes on a card that already has a
                     plate and a button, and that is the clutter. Each service
                     still carries the phrase it was read from. */
                  <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-ash">
                    {v.mentions.map((m, i) => (
                      <span key={m.service} className="flex items-center gap-2">
                        {i > 0 && <span aria-hidden className="text-line">/</span>}
                        <span title={`Named in this testimonial: “${m.evidence}”`}>
                          {SERVICE_LABEL[m.service]}
                        </span>
                      </span>
                    ))}
                  </span>
                )}
                </div>

                <span
                  className="mt-0.5 flex shrink-0 items-center gap-0.5 text-brand"
                  role="img"
                  aria-label={`Rated ${STARS} out of ${STARS}`}
                >
                  {Array.from({ length: STARS }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.5l2.9 6.06 6.6.83-4.85 4.5 1.23 6.55L12 17.3l-5.88 3.14 1.23-6.55L2.5 9.39l6.6-.83z" />
                    </svg>
                  ))}
                </span>
              </footer>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
}

/** The years, where the client states them. The one strictly factual figure a
 *  card can carry, and it is always shown next to the client's own wording so
 *  the number is never presented as ours. */
function YearMark({ voice: v }: { voice: Voice }) {
  const years = v.held?.years;
  return (
    <span className="block border-t-2 border-brand pt-4">
      {years ? (
        <span className="font-display flex items-baseline gap-2 leading-none">
          <span className="text-[clamp(2.6rem,4.4vw,3.6rem)] font-extrabold tabular-nums text-snow">
            {years}
          </span>
          <span className="text-[0.9rem] font-extrabold uppercase text-brand">
            {years === 1 ? "Year" : "Years"}
          </span>
        </span>
      ) : (
        <span className="font-display block text-[clamp(1.3rem,2vw,1.7rem)] font-extrabold uppercase leading-tight text-snow">
          Since
          <br />
          Jan 2018
        </span>
      )}
      <span className="mt-3 block max-w-[14rem] text-[0.78rem] leading-snug text-fog">
        Their words: &ldquo;{v.held?.phrase}&rdquo;
      </span>
    </span>
  );
}
