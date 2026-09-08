"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NoteCard } from "@/components/insights/NoteCard";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import {
  matches,
  register,
  SEARCH_THRESHOLD,
  topics,
  type Note,
} from "@/content/insights";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** THE REGISTER: the whole archive, newest note first, in one grid.
 *
 *  TEAM DIRECTION, 2026-09-08: no year rows. The archive used to be broken
 *  into bands, one per calendar year, each opening with the year set at
 *  display scale beside a hairline and its own count of notes. Every note now
 *  sits in a single grid. The `byYear` grouping went with the bands.
 *
 *  What the bands were doing, for the record, in case the argument reopens: a
 *  long archive needs one piece of navigation that a topic filter cannot
 *  provide, and they also meant the page's proportions did not depend on how
 *  many notes existed -- correct at three notes and at three hundred. The
 *  filter rail and the count line carry the navigation on their own now.
 *
 *  EVERY CARD IS THE SAME CARD, which was already true and matters more with
 *  the bands gone. There was a second, side-on weight for one note in five and
 *  it is long gone, along with the `[grid-auto-flow:dense]` that existed only
 *  to fill the holes it left in the flow.
 *
 *  THE TOPIC RAIL IS DERIVED. Chips come from the categories actually present,
 *  with their real counts, so a migration that introduces a topic gets a chip
 *  for free and one that retires a topic loses it. Filtering is client-side and
 *  animated by Motion's layout engine -- reflowing a grid around cards that
 *  just moved is exactly what it is for, and exactly what GSAP would need
 *  hand-written FLIP to do.
 *
 *  THE SEARCH FIELD IS CONDITIONAL, and that is the honest version. Over an
 *  archive the reader can already see in one screen, a search box cannot do
 *  anything their eye has not done, and it is the first control that makes an
 *  editorial page look like an admin panel. It appears at SEARCH_THRESHOLD
 *  notes, which is where the register runs past a laptop fold on its own.
 *
 *  MOTION IS SPLIT BY WHAT EACH LIBRARY IS FOR. ScrollTrigger.batch drives the
 *  entrance as a wave across the wall -- it groups whatever crosses the line in
 *  the same frame, which is the difference between a wall arriving in waves and
 *  every card fading in on its own schedule. It writes to an inner wrapper,
 *  never to the <li> whose transform Motion owns. Under prefers-reduced-motion
 *  nothing is installed and no start state is ever set, so the wall is simply
 *  there. */
export function NoteRegister({ notes }: { notes: Note[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reduced = usePrefersReducedMotion();
  const wall = useRef<HTMLDivElement>(null);

  const chips = useMemo(
    () => [{ label: register.allLabel, key: null, count: notes.length }, ...topics(notes).map((t) => ({ label: t.label, key: t.label, count: t.count }))],
    [notes],
  );

  const shown = useMemo(
    () => notes.filter((n) => (topic === null || n.category === topic) && matches(n, query)),
    [notes, topic, query],
  );

  const searchable = notes.length >= SEARCH_THRESHOLD;
  const filtering = topic !== null || query.trim() !== "";

  /** The entrance wave. Re-installed whenever the visible set changes: filtering
   *  mounts cards the batch never observed, and an unobserved card would sit at
   *  opacity 0 for ever. */
  useEffect(() => {
    if (reduced || !wall.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".nr-reveal", wall.current);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 32 });
    const batch = ScrollTrigger.batch(cards, {
      start: "top 90%",
      once: true,
      batchMax: 6,
      onEnter: (group) =>
        gsap.to(group, {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
  }, [reduced, topic, query]);

  return (
    <section
      id="register"
      data-section="The Register"
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container>
        <SectionHeader
          index={register.index}
          title={register.title}
          strokeTitle={register.strokeTitle}
          lede={register.lede}
          className="mb-12"
        />

        {/* ------------------------------------------------ the topic rail */}
        <div className="mb-12 border-t border-line pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
              <p className="mr-2 w-full text-xs font-semibold uppercase tracking-wide text-brand-text sm:w-auto">
                {register.topicLabel}
              </p>
              {chips.map((chip) => {
                const on = topic === chip.key;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTopic(chip.key)}
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
                        "text-[0.6875rem] font-extrabold tabular-nums",
                        on ? "text-white/70" : "text-ash",
                      )}
                    >
                      {chip.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {searchable && (
              <div className="lg:w-64 lg:shrink-0">
                <label
                  htmlFor="register-search"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ash"
                >
                  {register.searchLabel}
                </label>
                <div className="group relative">
                  <input
                    id="register-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    /* Titles, topics and tags — what is on the cards. Searching
                       the body would return notes whose match the reader cannot
                       see, which reads as a broken result. */
                    placeholder="Title or topic"
                    className="w-full border-b border-line bg-transparent pb-2.5 pr-7 text-sm text-snow placeholder:text-ash focus:outline-none"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:w-full"
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute bottom-2.5 right-0 h-4 w-4 text-ash"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4.5 4.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------- the wall */}
        <div ref={wall}>
          <motion.ul
            layout={!reduced}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        {/* The count, stated plainly, and only where the reader has narrowed
            something. Unfiltered it would be telling them what they can see. */}
        {filtering && (
          <p className="mt-10 border-t border-line pt-7 text-sm leading-relaxed text-fog">
            {shown.length === 0 ? (
              <>
                Nothing in the archive answers that yet.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setTopic(null);
                    setQuery("");
                  }}
                  className="font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
                >
                  Show everything
                </button>
                .
              </>
            ) : (
              <>
                Showing {shown.length} of {notes.length}
                {topic ? ` filed under ${topic}` : ""}
                {query.trim() ? ` matching “${query.trim()}”` : ""}.
              </>
            )}
          </p>
        )}
      </Container>
    </section>
  );
}
