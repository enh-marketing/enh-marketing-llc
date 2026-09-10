import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

type Stage = { no: string; title: string; body: string };

/** "How Our Logistics Marketing Process Works" — five stages, one population.
 *
 *  WHAT THE DOCUMENT ACTUALLY DESCRIBES, AND WHY IT IS NOT FIVE STEPS. Read the
 *  five stages against each other and they are not five equal moves along a
 *  line. Stage 1 looks at everything there is. Stage 2 chooses from it -- "the
 *  freight services, cargo types, locations, routes and customer segments that
 *  deserve priority". Stages 3 and 4 build on what was chosen. Stage 5 chooses
 *  again: "Priorities are adjusted according to the services, routes and
 *  audiences producing qualified opportunities." So the subject of this process
 *  is a set, and what changes between stages is which members of it are being
 *  worked and what has been built on them.
 *
 *  SO IT IS DRAWN AS ONE FLOOR IN FIVE FRAMES. The same eight units stand at
 *  the same eight positions in every panel and the floor line runs edge to edge
 *  through all five, so the strip reads as one thing photographed five times
 *  rather than as five diagrams. Nothing is a bay, a spiral, a booking path or
 *  a runner on a track: those are the process sections of the other three
 *  industry pages and each of them draws work done to a single journey, which
 *  is the wrong shape for a document about choosing and re-choosing.
 *
 *  NOTHING IS COUNTED OR SCORED. Eight units because a set needs enough members
 *  to be a set and few enough to count by eye; three worked because "priority"
 *  means some and not all. There is no axis, no proportion and no unit
 *  anywhere: the marks above a unit are things built on it, not a height, and
 *  they are the same size on every unit that has them.
 *
 *  THE PANELS CARRY NO WORDS. Each stage is named exactly once, in its own
 *  column directly beneath its panel. */

/** The eight unit positions, shared by all five panels. Integers only: a
 *  coordinate arrived at by trigonometry rounds differently on the server and
 *  in the browser, and the mismatch costs the route its island. */
const UNITS = [15, 36, 57, 78, 99, 120, 141, 162];

/** Which units are worked. Indices into UNITS, and the same three in stages
 *  2, 3 and 4. */
const WORKED = [1, 4, 6];

/** Stage 5 adjusts: one worked unit is set down and a different one taken up. */
const DROPPED = 4;
const TAKEN = 2;

function StageFrame({ no }: { no: string }) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";
  const n = Number(no);

  /** A unit on the floor. `state` is what this stage does to it. */
  const unit = (cx: number, state: "idle" | "worked" | "set-down" | "taken-up") => (
    <g key={cx}>
      <rect
        x={cx - 6}
        y="88"
        width="12"
        height="12"
        rx="2"
        stroke={state === "worked" || state === "taken-up" ? BRAND : ASH}
        strokeWidth={state === "worked" || state === "taken-up" ? "1.6" : "1.1"}
        strokeOpacity={state === "idle" || state === "set-down" ? "0.4" : "1"}
        fill={state === "worked" || state === "taken-up" ? BRAND : "none"}
        fillOpacity={state === "worked" ? "0.16" : state === "taken-up" ? "0.1" : "0"}
      />
      {state === "taken-up" && (
        <rect
          x={cx - 9}
          y="85"
          width="18"
          height="18"
          rx="4"
          stroke={BRAND}
          strokeWidth="1"
          strokeOpacity="0.5"
          className="ci-blink"
        />
      )}
    </g>
  );

  /** What has been built on a worked unit: a page and a campaign, the same
   *  two marks on every unit that has them. */
  const built = (cx: number) => (
    <g key={`b-${cx}`}>
      <rect x={cx - 7} y="72" width="14" height="5" rx="1.6" fill={BRAND} fillOpacity="0.32" />
      <rect x={cx - 7} y="62" width="14" height="5" rx="1.6" fill={BRAND} fillOpacity="0.32" />
      <path d={`M${cx} 77 V88`} stroke={BRAND} strokeWidth="1" strokeOpacity="0.45" />
      <path d={`M${cx} 67 V72`} stroke={BRAND} strokeWidth="1" strokeOpacity="0.45" />
    </g>
  );

  return (
    <svg viewBox="0 0 180 120" aria-hidden focusable="false" className="block w-full" fill="none">
      {/* THE FLOOR. Edge to edge in every panel, so the five join. */}
      <path d="M0 100 H180" stroke={ASH} strokeWidth="1.2" strokeOpacity="0.6" />

      {/* STAGE 1 — everything there is, surveyed. */}
      {n === 1 && (
        <g>
          {UNITS.map((cx) => unit(cx, "idle"))}
          <rect x="-24" y="56" width="20" height="46" className="ci-scan-x fill-brand/[0.18]" />
        </g>
      )}

      {/* STAGE 2 — some of it chosen. */}
      {n === 2 && (
        <g>
          {UNITS.map((cx, i) => unit(cx, WORKED.includes(i) ? "worked" : "idle"))}
          {WORKED.map((i, k) => (
            <rect
              key={`m-${UNITS[i]}`}
              x={UNITS[i] - 10}
              y="84"
              width="20"
              height="20"
              rx="5"
              stroke={BRAND}
              strokeWidth="1"
              strokeOpacity="0.5"
              className="ci-blink"
              style={{ animationDelay: `${k * 2000}ms` }}
            />
          ))}
        </g>
      )}

      {/* STAGE 3 — built on. */}
      {n === 3 && (
        <g>
          {UNITS.map((cx, i) => unit(cx, WORKED.includes(i) ? "worked" : "idle"))}
          {WORKED.map((i) => built(UNITS[i]))}
          {WORKED.map((i, k) => (
            <rect
              key={`g-${UNITS[i]}`}
              x={UNITS[i] - 7}
              y="62"
              width="14"
              height="5"
              rx="1.6"
              fill={BRAND}
              className="ci-blink"
              style={{ animationDelay: `${k * 2000}ms` }}
            />
          ))}
        </g>
      )}

      {/* STAGE 4 — the way to the quotation, joined up and closed. */}
      {n === 4 && (
        <g>
          {UNITS.map((cx, i) => unit(cx, WORKED.includes(i) ? "worked" : "idle"))}
          {WORKED.map((i) => built(UNITS[i]))}
          {/* The three routes gathered on one line. */}
          <path d="M36 52 H141" stroke={ASH} strokeWidth="1.1" strokeOpacity="0.55" />
          {WORKED.map((i) => (
            <path
              key={`r-${UNITS[i]}`}
              d={`M${UNITS[i]} 62 V52`}
              stroke={ASH}
              strokeWidth="1.1"
              strokeOpacity="0.55"
            />
          ))}
          {/* And the last stretch to the request, closed. */}
          <path
            d="M88 52 V30"
            pathLength="100"
            stroke={BRAND}
            strokeWidth="2.2"
            strokeLinecap="round"
            className="ci-draw"
          />
          <path
            d="M74 30 H70 V10 H106 V30 H102"
            stroke={BRAND}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M78 18 H98 M78 24 H92" stroke={BRAND} strokeWidth="1.2" strokeOpacity="0.55" />
        </g>
      )}

      {/* STAGE 5 — one set down, another taken up, and round again. */}
      {n === 5 && (
        <g>
          {UNITS.map((cx, i) =>
            unit(
              cx,
              i === DROPPED
                ? "set-down"
                : i === TAKEN
                  ? "taken-up"
                  : WORKED.includes(i)
                    ? "worked"
                    : "idle",
            ),
          )}
          {WORKED.filter((i) => i !== DROPPED).map((i) => built(UNITS[i]))}
          {/* The return. Drawn right to left, so the packet on it travels the
              way the arrowhead points. */}
          <path
            d="M168 44 H40 A10 10 0 0 0 30 54 V80"
            stroke={ASH}
            strokeWidth="1.2"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M168 44 H40 A10 10 0 0 0 30 54 V80"
            pathLength="100"
            stroke={BRAND}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="ci-flow"
          />
          <path
            d="M35 74 L30 81 L25 74"
            stroke={BRAND}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

export function PriorityRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <Rise>
          <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((s) => (
              <li
                key={s.no}
                className="group flex flex-col bg-ink-2 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none"
              >
                {/* The frame. No padding at the sides, so the floor line runs
                    into its neighbours and the five read as one floor. */}
                <div className="border-b border-line py-8 transition-colors duration-500 group-hover:border-brand/40 motion-reduce:transition-none">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
                    <StageFrame no={s.no} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    ({s.no.padStart(2, "0")})
                  </p>
                  <h3 className="font-display mt-3 text-[clamp(1.05rem,1.6vw,1.25rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {s.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                  />
                  <p className="mt-4 text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Rise>
      </Container>
    </section>
  );
}
