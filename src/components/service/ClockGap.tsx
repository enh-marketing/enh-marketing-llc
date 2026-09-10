import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** "Why Automotive Marketing Needs Its Own Strategy" — the page's argument.
 *
 *  ONE FINISH LINE, TWO STARTING POINTS. The document's sentence is the most
 *  specific claim in the file: a buyer compares "for weeks before making
 *  contact", and someone with an urgent repair "may choose a workshop within
 *  minutes". Both journeys end in the same thing — the business being
 *  contacted — so both runs are flush to the same right-hand edge, and
 *  everything that differs about them is visible in where they begin and how
 *  much they carry.
 *
 *  WHY IT IS NOT THE HOSPITALITY DRAWING. That page has a two-clock sentence
 *  too, and it is drawn there as one measure rescaling its own axis. Nothing
 *  here rescales: the two runs are on one shared scale at the same time, which
 *  is the only way the four-stops-against-three comparison can be seen at all.
 *  This document also supplies what the hospitality one does not — the four
 *  things the buyer weighs and the three the driver weighs — so the stops carry
 *  the client's own words rather than being anonymous ticks.
 *
 *  NOTHING IS MEASURED. "For weeks" and "within minutes" are the document's
 *  only durations and there is no third. So the runs carry no axis, no ticks at
 *  intervals, no unit and no number: only the two words, printed where each run
 *  starts, and the fact that one run is nearly four times the other. A reader
 *  can check the ratio by eye, which is all this section asks of them.
 *
 *  MOTION IS THE ARGUMENT. Both runners use the same keyframe and differ only
 *  in duration — eleven seconds against two and a half. The slip journey
 *  completes four times while the buyer's is still on its second stop, which is
 *  the difference between weeks and minutes as an experience rather than as a
 *  claim. Both runs are drawn in full underneath, so a stopped frame is two
 *  complete journeys.
 *  See globals.css, "Clock gap". */

/** Where each run stops to compare, as a percentage of its own length. Set by
 *  hand and evenly spread: the document says what is being compared, never when
 *  or for how long, so a stop at 12% claims nothing beyond "early on". */
const STOPS: Record<"long" | "short", number[]> = {
  long: [12, 38, 63, 86],
  short: [16, 50, 84],
};

/** How much of the shared width each run occupies. The only quantity on this
 *  section, and it is a ratio between two words — "weeks" against "minutes" —
 *  not a measurement of either. */
const WIDTH: Record<"long" | "short", string> = { long: "100%", short: "26%" };

type Journey = {
  who: string;
  rest: string;
  duration: string;
  extent: "long" | "short";
  carries: string[];
};

function Run({ journey }: { journey: Journey }) {
  const { extent, carries } = journey;
  const stops = STOPS[extent];
  /* A caption under every dot only where the run is wide enough to hold one.
     Measured at 1240px the short run is 216 pixels across, and three
     eleven-pixel captions with tracking need about 330 — so they collided into
     "LOCATIONAVAILABILITYREVIEWS". The eleven-pixel floor is not negotiable and
     the run's width IS the argument, so neither of those can give: the short
     journey's three considerations become a row instead, which is also the
     truer picture of them. "Within minutes" does not mean three things weighed
     in sequence; it means three things weighed at once. */
  const spread = extent === "long";

  return (
    <div className="group grid gap-6 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-10">
      {/* Who, and the one word the document gives for how long. */}
      <div className="min-w-0">
        <p className="font-display text-[clamp(1.05rem,1.8vw,1.35rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {journey.who}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text transition-colors duration-500 group-hover:border-brand/55 motion-reduce:transition-none">
          <span
            aria-hidden
            className={cn("h-1.5 w-1.5 rounded-full bg-brand", extent === "short" && "cg-urgent")}
          />
          {journey.duration}
        </p>
      </div>

      <div className="min-w-0">
        {/* The run. Flush right, because both journeys end in the same place. */}
        <div
          className={cn("relative ml-auto", spread ? "pb-9" : "pb-0")}
          style={{ width: WIDTH[extent] }}
        >
          {/* The ground it covers. */}
          <span aria-hidden className="block h-px w-full bg-ash/45" />

          {/* Where it starts. An open end: neither journey begins on anything
              this business owns. */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ash bg-void"
          />

          {/* Where it ends. The same edge for both. */}
          <span
            aria-hidden
            className="absolute right-0 top-0 h-5 w-[2.5px] -translate-y-1/2 rounded-full bg-brand"
          />

          {/* The travelling runner. Full-width and transparent, with the mark
              on its right edge, so a GPU transform of -100% to 0 walks the mark
              from one end of this run to the other whatever the run's width. */}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px">
            <span className={cn("absolute inset-0", extent === "long" ? "cg-run-long" : "cg-run-short")}>
              <span className="absolute right-0 top-1/2 h-[9px] w-[9px] -translate-y-1/2 translate-x-1/2 rounded-full bg-brand shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand)_18%,transparent)]" />
            </span>
          </span>

          {/* What it is comparing while it runs. */}
          {stops.map((pct, i) => (
            <span
              key={carries[i] ?? pct}
              aria-hidden
              className="absolute top-0 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ash bg-ink transition-colors duration-500 group-hover:border-brand/70 motion-reduce:transition-none"
              style={{ left: `${pct}%` }}
            />
          ))}

          {/* The stop names, in HTML at a real font size rather than as SVG
              text that would scale down with its box. */}
          {spread && (
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block">
              {stops.map((pct, i) => (
                <span
                  key={carries[i] ?? pct}
                  className="absolute mt-4 -translate-x-1/2 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash transition-colors duration-500 group-hover:text-fog motion-reduce:transition-none"
                  style={{ left: `${pct}%` }}
                >
                  {carries[i]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* The same names, readable, wherever a caption under a dot would be
            forty pixels across — the short run always, and both runs below the
            large breakpoint. */}
        <ul className={cn("mt-5 flex flex-wrap gap-2", spread ? "lg:hidden" : "lg:justify-end")}>
          {carries.map((c) => (
            <li
              key={c}
              className="rounded-full border border-line px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash transition-colors duration-500 group-hover:border-ash/60 group-hover:text-fog motion-reduce:transition-none"
            >
              {c}
            </li>
          ))}
        </ul>

        {/* The client's own sentence for this journey, so the run above can be
            checked against the words it was read from. */}
        <p className="mt-6 text-sm leading-relaxed text-fog sm:text-base">
          <Marked text={journey.rest} mark={[journey.duration]} className="font-semibold text-snow" />
        </p>
      </div>
    </div>
  );
}

export function ClockGap({
  id,
  label,
  index,
  title,
  strokeTitle,
  journeys,
  requiresStem,
  requiresItems,
  broad,
  broadMark,
  accountStem,
  accountItems,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  journeys: Journey[];
  requiresStem: string;
  requiresItems: string[];
  broad: string;
  broadMark: string[];
  accountStem: string;
  accountItems: string[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={broad} mark={broadMark} className="text-brand" />
            </p>
          }
          className="mb-16"
        />

        <Rise>
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-9 lg:p-12">
            <div className="grid gap-12 lg:gap-16">
              {journeys.map((j) => (
                <Run key={j.who} journey={j} />
              ))}
            </div>
          </div>
        </Rise>

        {/* THE CONSEQUENCE. Four pieces of equipment that have to exist twice,
            and six things the agency has to account for. Both lists are the
            document's own, and both were single buried sentences. */}
        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Rise>
            <p className="text-base leading-relaxed text-fog sm:text-lg">{requiresStem}</p>
            <ul className="mt-6 grid gap-3">
              {requiresItems.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-4 border-b border-line pb-3 last:border-b-0"
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1rem,1.7vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {item}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-px w-8 self-center bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </li>
              ))}
            </ul>
          </Rise>

          <Rise delay={0.1}>
            <p className="text-base leading-relaxed text-fog sm:text-lg">{accountStem}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {accountItems.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3 transition-colors duration-500 hover:border-ash/50 hover:bg-ink-3 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none"
                  />
                  <span className="text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
