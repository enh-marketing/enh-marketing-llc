"use client";

import type { ReactNode } from "react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { RouteIndex } from "@/components/insights/RouteIndex";
import { formatMonth, topics, type Note } from "@/content/insights";
import { masthead } from "@/content/insights";

/** THE MASTHEAD.
 *
 *  WHY IT IS NOT A HEADLINE OVER A PARAGRAPH. That is what a blog does, and it
 *  gives the reader nothing the browser tab did not already tell them. This
 *  one carries three things instead: what the archive is called, what is
 *  measurably in it, and a drawing that lets a reader pick a note before they
 *  have scrolled once.
 *
 *  WHY NOT ServiceHero. The seventeen service heroes stack a three-line
 *  tri-tone headline at `display-2xl` over a pair of buttons, and they are
 *  selling one service. This page is an archive: the primary action is to read
 *  something, not to enquire, so a hero whose loudest element is a lead-gen
 *  button would be pointing away from the page's own content. The type scale,
 *  the aurora ground, the grid wash, the kicker and the breadcrumb placement
 *  are all ServiceHero's, so this reads as the same site; the headline sits one
 *  step down at the section scale, and the buttons are gone.
 *
 *  THE DATELINE IS DERIVED, NEVER WRITTEN. Note count, the span the archive
 *  covers and the number of topics are all read off the data at render time, so
 *  they cannot go stale, and there is no sentence anywhere claiming a number
 *  that a reader could count for themselves and find wrong.
 *
 *  The <h1> carries `Chars` because this page's LCP element is the route
 *  drawing rather than the headline — the drawing is above the fold at every
 *  width and is the largest painted area in it — so the headline can afford an
 *  entrance where a service hero's cannot. */
export function InsightsMasthead({
  notes,
  breadcrumbs,
}: {
  /** Newest first. */
  notes: Note[];
  breadcrumbs?: ReactNode;
}) {
  /** Oldest first for the route: the trailhead is the first thing written. */
  const chronological = [...notes].reverse();
  const topicCount = topics(notes).length;
  const oldest = chronological[0];
  const newest = chronological[chronological.length - 1];

  /** THE ARCHIVE, IN FACTS. Each row is counted rather than composed, and the
   *  span row is omitted where every note shares a month, because "Apr 2026 to
   *  Apr 2026" is a range that says nothing. */
  const dateline: { term: string; detail: string }[] = [
    { term: notes.length === 1 ? "Note" : "Notes", detail: String(notes.length) },
    ...(oldest && newest && formatMonth(oldest.date) !== formatMonth(newest.date)
      ? [{ term: "Span", detail: `${formatMonth(oldest.date)} — ${formatMonth(newest.date)}` }]
      : []),
    { term: topicCount === 1 ? "Topic" : "Topics", detail: String(topicCount) },
  ];

  return (
    <section
      id="masthead"
      data-section="Insights Masthead"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[4%] top-[6%] h-[40vw] w-[40vw] rounded-full bg-brand/20 blur-[150px]" />
        <div className="aurora-b absolute bottom-[4%] right-[-10%] h-[32vw] w-[32vw] rounded-full bg-brand-deep/25 blur-[130px]" />
        {/* Horizontal rules only, the way the testimonials hero does it: this
            page is a record, so its ground is ruled paper rather than the
            square plan grid the service heroes carry. */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "100% 2.25rem",
            maskImage: "radial-gradient(ellipse at 32% 38%, black, transparent 80%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-8">
        {breadcrumbs && <div className="mb-7">{breadcrumbs}</div>}

        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-brand-text">
              (00) The ENH archive
            </p>

            {/* Real whitespace between the spans: they are block, so it never
                renders, but without it textContent runs the two halves together
                and the accessible name reads "Field notesfrom the climb." */}
            <h1 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block">
                <Chars text={masthead.title} immediate />
              </span>{" "}
              <span className="block text-stroke">
                <Chars text={masthead.strokeTitle} delay={0.12} immediate />
              </span>
            </h1>

            <Rise delay={0.22} className="mt-8">
              <p className="max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                {masthead.sub}
              </p>
            </Rise>
          </div>

          {/* The dateline. A definition list, because that is what it is: three
              terms and the figure each one counts. Set as a rail on desktop and
              a row on mobile, so it never competes with the headline for the
              first line of the page. */}
          <Rise delay={0.3}>
            <dl className="flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6 lg:min-w-[13rem] lg:flex-col lg:gap-y-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {dateline.map((row) => (
                <div key={row.term}>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
                    {row.term}
                  </dt>
                  <dd className="font-display mt-1.5 text-[1.35rem] font-extrabold leading-none text-snow tabular-nums">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>

        {/* The route. In flow at the base of the fold, which is where the
            service heroes put their trust strip, so the first viewport ends on
            something the reader can act on rather than on empty ground. */}
        <Rise delay={0.36} className="mt-14 lg:mt-16">
          <RouteIndex
            notes={chronological}
            label={masthead.routeLabel}
            hint={masthead.routeHint}
          />
        </Rise>
      </Container>
    </section>
  );
}
