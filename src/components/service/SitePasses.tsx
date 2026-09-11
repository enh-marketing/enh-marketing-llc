"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The SEO programme, drawn as the one website every stage of it acts on.
 *
 *  WHY THIS AND NOT THE SHARED `ProcessTrack`. That one draws an ordered run as
 *  numbered nodes on a rail with a grey block of work beside each: correct for
 *  Performance Marketing and Meta Ads, where the stages are campaign phases
 *  with no shared object between them. It is wrong here, and it read as very
 *  basic, because it throws away the one thing this document keeps saying --
 *  that all six stages are done TO A WEBSITE, and the reader can watch it
 *  change.
 *
 *  EVERY STATE BELOW IS READ OFF A STAGE'S OWN SENTENCE:
 *
 *    1 Audit and Plan    "a prioritised list of problems" -- faults surface on
 *                        the pages that have them, and they carry an order.
 *    2 Research          "site structure, page targeting and internal links" --
 *                        the links between pages get drawn.
 *    3 Fix and Optimise  "titles, headings, content, schema and internal links
 *                        are improved" -- the faults clear and the parts of a
 *                        page resolve from broken to solid.
 *    4 Build the Content "each page ... has a defined place within the
 *                        website" -- new pages arrive already attached.
 *    5 Off-Page          "Google Business Profile ... citations, reviews ...
 *                        editorial link building" -- THE ONLY STAGE THAT ACTS
 *                        OUTSIDE THE SITE, so it is the only one that lights
 *                        anything outside the browser frame, and it points
 *                        back in.
 *    6 Review and Adjust "the next month's priorities come from what the data
 *                        shows" -- a readout fills and returns to the first
 *                        pass.
 *
 *  THE TWO NOTATIONS ARE INSIDE/OUTSIDE AND THE RETURN, and nobody has to be
 *  taught either. Everything else is a recognisable object: a browser window,
 *  pages, links between them, a profile, review stars. So the drawing carries
 *  NO LABELS AT ALL -- the panel beside it prints the stage's own title and
 *  sentence, and a word here would be that sentence printed twice.
 *
 *  THE SITE IS ALWAYS WHOLE. A stage lifts what it acts on and quiets the
 *  rest; it never empties the frame, because the document's claim is that
 *  these six happen to one site over time rather than replacing each other.
 *
 *  NOTHING IS COUNTED. Four pages becoming six is not a claim about how many
 *  pages a site has -- this document contains no figure of any kind. It is the
 *  smallest number that can show a structure gaining a member in a defined
 *  place. */

const AUDIT = 0;
const RESEARCH = 1;
const FIX = 2;
const BUILD = 3;
const OFFPAGE = 4;
const REVIEW = 5;

/** Decorative copy inside a page. Never text. `settled` is the Fix stage's
 *  doing: before it the rules are broken, after it they are whole. */
function Lines({ rows, on, settled }: { rows: number[]; on: boolean; settled: boolean }) {
  return (
    <span aria-hidden className="mt-1.5 flex flex-col gap-1">
      {rows.map((w, i) => (
        <span
          key={i}
          className={cn(
            "h-[2px] rounded-full transition-all duration-500 motion-reduce:transition-none",
            on ? "bg-brand/70" : "bg-line",
          )}
          style={{
            width: `${w}%`,
            /* Broken until the Fix stage has run, whole after it. A dashed
               background rather than a border so the rule keeps its weight. */
            ...(settled
              ? {}
              : {
                  backgroundImage:
                    "repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 7px)",
                  backgroundColor: "transparent",
                  color: "var(--color-line)",
                }),
          }}
        />
      ))}
    </span>
  );
}

/** One page in the site. */
function Page({
  on,
  fault,
  settled,
  arriving,
  rows,
  className,
  children,
}: {
  on: boolean;
  fault: boolean;
  settled: boolean;
  /** Pages 5 and 6 do not exist until the Build stage puts them there. */
  arriving?: boolean;
  rows: number[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-md border p-2 transition-all duration-500 motion-reduce:transition-none",
        on ? "border-brand bg-brand/[0.07]" : "border-line/60 bg-transparent opacity-45",
        /* `hidden`, not `opacity-0`. Left in the flow at four columns the two
           unbuilt pages wrapped onto a second row and sat there as empty
           boxes, which said the site already had six pages and the Build
           stage merely coloured two of them in. Out of the flow, the grid
           genuinely goes from four to six and the reflow IS the arrival. */
        arriving ? "flex" : "hidden",
        className,
      )}
    >
      {/* The fault the audit found, sitting on the page that has it. It clears
          when Fix runs, which is what that stage's sentence says it does. */}
      <span
        aria-hidden
        className={cn(
          "absolute -right-1 -top-1 h-2 w-2 rounded-full bg-brand transition-all duration-500 motion-reduce:transition-none",
          fault ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "h-[3px] w-1/2 rounded-full transition-colors duration-500 motion-reduce:transition-none",
          on ? "bg-brand" : "bg-ash/60",
        )}
      />
      <Lines rows={rows} on={on} settled={settled} />
      {children}
    </div>
  );
}

export function SitePasses({ active, pin }: { active: number; pin: PinRenderer }) {
  const on = (i: number) => active === i;

  /* What has happened by the time you are standing on `active`. The site
     accumulates rather than resetting, because the document describes one
     programme run in order and not six alternatives. */
  const linked = active >= RESEARCH;
  const settled = active >= FIX;
  const built = active >= BUILD;
  const faults = active === AUDIT || active === RESEARCH;
  const outside = active === OFFPAGE;
  const reading = active === REVIEW;

  return (
    <div className="relative">
      {/* ------------------------------------------------ the site itself */}
      <div
        className={cn(
          "overflow-hidden rounded-[1.75rem] border bg-ink-2 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.5)] transition-colors duration-500 motion-reduce:transition-none",
          outside ? "border-line/50" : "border-line",
        )}
      >
        {/* Browser chrome, so the frame reads as a website rather than a
            diagram, and so "outside the site" below it means something. */}
        <div aria-hidden className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 h-3 flex-1 rounded-full bg-ink-3" />
        </div>

        <div className="relative p-4 sm:p-5">
          {/* The home page, and the pin for the pass that surveys everything. */}
          <div className="relative">
            {pin(AUDIT, "absolute -left-1 -top-1 z-10")}
            <Page on={on(AUDIT)} fault={false} settled={settled} arriving rows={[72, 50]} />
          </div>

          {/* The links between pages. Drawn from the Research stage on, which
              is the stage whose sentence names internal links. A spine down
              from the home page, a bar across, and one drop per page --
              because a structure has a spine, and because a drop that lands
              between two pages is drawing a link to nothing.

              THE DROPS ARE A GRID, NOT PERCENTAGES. They were a hand-written
              list of percentages, and hand-written percentages cannot know
              where a grid column's centre is: with `gap-2` between six
              columns the centres sit at 7.6/24.6/41.5/58.5/75.4/92.4 percent
              of the row, and the list read 8/30.4/52.8/75.2/91 -- five drops
              for six pages, four of them off centre. A grid with the same
              template and the same gap as the pages below puts every drop on
              its own page's centre line at any width, and follows the
              four-to-six change for free. The bar is inset by half a column
              -- `(100% - (N-1)*gap) / N / 2` -- so it runs first centre to
              last centre rather than wall to wall. */}
          <div aria-hidden className="relative h-6">
            <span
              className={cn(
                "absolute left-1/2 top-0 w-px -translate-x-1/2 bg-brand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                linked ? "h-3 opacity-100" : "h-0 opacity-0",
                on(RESEARCH) && "bg-brand",
              )}
            />
            <span
              className={cn(
                "absolute top-3 h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                linked ? "opacity-100" : "opacity-0",
                on(RESEARCH) ? "bg-brand" : "bg-line",
              )}
              style={{
                left: built ? "calc((100% - 40px) / 12)" : "calc((100% - 24px) / 8)",
                right: built ? "calc((100% - 40px) / 12)" : "calc((100% - 24px) / 8)",
              }}
            />
            <div
              className={cn(
                "absolute inset-x-0 top-3 grid gap-2",
                built ? "grid-cols-6" : "grid-cols-4",
              )}
            >
              {Array.from({ length: built ? 6 : 4 }, (_, i) => (
                <span key={i} className="flex justify-center">
                  <span
                    className={cn(
                      "h-3 w-px transition-all duration-700 motion-reduce:transition-none",
                      linked ? "opacity-100" : "opacity-0",
                      on(RESEARCH) ? "bg-brand" : "bg-line",
                    )}
                  />
                </span>
              ))}
            </div>
            {pin(RESEARCH, "absolute right-0 top-0 z-10")}
          </div>

          {/* The pages. Four to begin with; Build adds two, already attached to
              the rail above, which is that stage's "a defined place within the
              website". */}
          <div
            className={cn(
              "grid gap-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              built ? "grid-cols-6" : "grid-cols-4",
            )}
          >
            <Page on={on(FIX)} fault={faults} settled={settled} arriving rows={[80, 55]} />
            <Page on={on(FIX)} fault={false} settled={settled} arriving rows={[64, 44]}>
              {/* On a page, because Fix is the stage that works on pages. */}
              {pin(FIX, "absolute -right-2 -top-2 z-10")}
            </Page>
            <Page on={on(FIX)} fault={faults} settled={settled} arriving rows={[74, 38]} />
            <Page on={on(FIX)} fault={false} settled={settled} arriving rows={[58, 50]} />
            <Page on={on(BUILD)} fault={false} settled={settled} arriving={built} rows={[70, 42]} />
            <Page on={on(BUILD)} fault={false} settled={settled} arriving={built} rows={[62, 48]} />
          </div>

          {/* Build's pin cannot live on a page that does not exist yet, so it
              sits at the edge the new pages grow into. */}
          <div className="relative h-0">{pin(BUILD, "absolute -top-3 right-0 z-10")}</div>

          {/* What the last stage reads. A strip of bars that fills only when
              Review is the stage being read. */}
          {/* At the LEFT end of the readout. On the right it landed within a
              few pixels of Build's pin, which sits at the edge the new pages
              grow into, and the two badges overlapped.

              The clearance is arithmetic, not taste. The badge is 28px and
              grows to nearly 31 when it is the active one, so it needs 16px
              of daylight to sit in: at the first spacing it covered the first
              bar of the readout by 8px, and at the second it cleared it by
              one. `mt-10` with `-top-8` leaves 8px above and 8px below. */}
          <div className="relative mt-10">
            {pin(REVIEW, "absolute -left-1 -top-8 z-10")}
          </div>
          {/* TWELVE BARS AT 0.55, NOT EIGHT AT 0.28. Aspect ratio is the whole
              difference between a reading and a row of blocks: eight bars in
              a 460px row are 55px wide, and at the first scale factor the
              tallest was 25px, so the thing that was supposed to be data read
              as eight red bricks. Twelve are 35px wide and run from 17px to
              52px, which is taller than wide at the top end and legibly
              uneven across. The count is not a claim -- this document
              contains no figure of any kind -- it is the smallest number that
              draws as a series rather than as a row of objects. */}
          <div data-readout aria-hidden className="mt-1 flex items-end gap-1">
            {[30, 44, 36, 52, 46, 62, 55, 70, 64, 82, 76, 95].map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  reading ? "bg-brand/80" : "bg-line",
                )}
                style={{
                  height: reading ? `${h * 0.55}px` : "2px",
                  transitionDelay: reading ? `${i * 35}ms` : "0ms",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------- and what is not the site at all */}
      {/* Off-page is the only stage that acts outside the website, so it is
          the only thing drawn outside the frame. The connectors point IN,
          because that is the direction the document describes: these
          strengthen the site rather than replace anything on it. */}
      {/* Same `flex gap-2` as the row of cards below, so each connector stands
          on its own card's centre line. `justify-around` inside a padded row
          put them near the centres without being on them, which on a drawing
          this small reads as three ticks pointing at nothing. */}
      <div aria-hidden className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex flex-1 justify-center">
            <span
              className={cn(
                "h-5 w-px transition-all duration-500 motion-reduce:transition-none",
                outside ? "bg-brand opacity-100" : "bg-line opacity-40",
              )}
              style={{ transitionDelay: outside ? `${i * 70}ms` : "0ms" }}
            />
          </span>
        ))}
      </div>

      <div className="relative flex items-stretch gap-2">
        {pin(OFFPAGE, "absolute -top-2 right-0 z-10")}

        {/* A profile: a mark, a name rule, an address rule. */}
        <Outside on={outside}>
          <span className="flex items-center gap-1.5">
            <span className={cn("h-3 w-3 rounded-sm", outside ? "bg-brand" : "bg-ash/50")} />
            <span className={cn("h-[3px] w-8 rounded-full", outside ? "bg-brand/70" : "bg-line")} />
          </span>
          <span className={cn("mt-1.5 h-[2px] w-10 rounded-full", outside ? "bg-brand/40" : "bg-line")} />
        </Outside>

        {/* Reviews: five marks, because a rating is five marks everywhere. */}
        <Outside on={outside}>
          <span className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} on={outside} delay={i * 60} />
            ))}
          </span>
          <span className={cn("mt-1.5 h-[2px] w-12 rounded-full", outside ? "bg-brand/40" : "bg-line")} />
        </Outside>

        {/* Citations: the same details, repeated somewhere else. */}
        <Outside on={outside}>
          <span className="flex flex-col gap-1">
            {[26, 20, 24].map((w, i) => (
              <span
                key={i}
                className={cn("h-[3px] rounded-full", outside ? "bg-brand/60" : "bg-line")}
                style={{ width: `${w}px` }}
              />
            ))}
          </span>
        </Outside>
      </div>

      {/* The return. The last stage's sentence sends the next month's
          priorities back to the FIRST stage, so the drawing has to arrive
          there rather than merely turn around.

          IT WRAPS THE WHOLE DRAWING. The first version was a short loop under
          the off-page row: down, across, and up -- and the thing it pointed up
          at was the bottom of the off-page column, which is stage five. A
          cycle that returns to the wrong stage is worse than no cycle. This
          one leaves at the bottom right, runs back along the foot, climbs the
          outside of the left edge and turns in at the home page, where pass
          one's mark is sitting. The arrow lands about sixteen pixels short of
          that mark, pointing at it.

          BUILT FROM DIVS, NOT AN SVG. It was a path in a 320x46 viewBox inside
          a container that is nearer 500 wide, so `preserveAspectRatio`
          letterboxed it: the curve scaled to 87% and sat centred, the arrow
          head landed a hundred pixels from the column it was supposed to point
          at, and the dashes all but vanished. Four rules and a triangle need
          no viewBox and cannot be scaled out of register. */}
      <div
        aria-hidden
        className={cn(
          "relative -mx-5 mt-3 h-8 transition-opacity duration-500 motion-reduce:transition-none",
          reading ? "opacity-100" : "opacity-0",
        )}
      >
        {/* the foot, joining the two risers outside either edge */}
        <span
          className="absolute inset-x-0 top-4 h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--color-brand) 0 5px, transparent 5px 9px)",
          }}
        />
      </div>

      {/* The two risers. Siblings of the foot strip rather than part of it,
          because each has to span most of the drawing's height.

          BOTH OFFSETS ARE MEASURED, NOT GUESSED, and neither moves with the
          viewport: the chrome bar, the frame padding, a page's own height and
          the readout's are all fixed pixels, and the column only ever changes
          width. `bottom-4` is the foot rule's own line; `top-[75.5px]` is the
          home page's centre; `top-[218.1px]` is the readout's, while it is
          filled -- which is the only state this is drawn in. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-5 bottom-4 top-[218.1px] w-5 transition-opacity duration-500 motion-reduce:transition-none",
          reading ? "opacity-100" : "opacity-0",
        )}
      >
        {/* out of the readout, and down the outside */}
        <span className="absolute inset-x-0 top-0 h-px bg-brand" />
        <span className="absolute inset-y-0 right-0 w-px bg-brand" />
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -left-5 bottom-4 top-[75.5px] w-5 transition-opacity duration-500 motion-reduce:transition-none",
          reading ? "opacity-100" : "opacity-0",
        )}
      >
        {/* up the outside, and in at the first pass. The arrow lands a little
            short of pass one's own mark, pointing at it. */}
        <span className="absolute inset-y-0 left-0 w-px bg-brand" />
        <span className="absolute inset-x-0 top-0 h-px bg-brand" />
        <span
          className="absolute right-0 top-0 -translate-y-1/2 border-y-[5px] border-l-[7px] border-y-transparent"
          style={{ borderLeftColor: "var(--color-brand)" }}
        />
      </div>
    </div>
  );
}

/** A thing that is not on your website. Dashed, always, because none of these
 *  are ours to own -- the document calls them signals, not assets. */
function Outside({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col rounded-md border border-dashed p-2 transition-all duration-500 motion-reduce:transition-none",
        on ? "border-brand bg-brand/[0.06] opacity-100" : "border-line/60 opacity-45",
      )}
    >
      {children}
    </div>
  );
}

function Star({ on, delay }: { on: boolean; delay: number }) {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
      <path
        d="M6 1l1.5 3.2 3.5.4-2.6 2.3.7 3.4L6 8.6 2.9 10.3l.7-3.4L1 4.6l3.5-.4z"
        className="transition-all duration-500 motion-reduce:transition-none"
        fill={on ? "var(--color-brand)" : "var(--color-line)"}
        style={{ transitionDelay: `${delay}ms` }}
      />
    </svg>
  );
}
