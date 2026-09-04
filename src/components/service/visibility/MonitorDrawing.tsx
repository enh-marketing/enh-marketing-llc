"use client";

/** The agreed searches put again, and the report that comes back.
 *
 *  WHY THIS DRAWING. Service 07 has two sentences worth drawing and they pull
 *  in different directions. The first is repetition: "We repeat the agreed
 *  searches and record changes in mentions, citations and competitor
 *  visibility." The last is a refusal: "The report separates confirmed results
 *  from estimates and manual observations." The obvious drawing for monitoring
 *  is a line going up and to the right, and it would be a lie twice over: this
 *  page promises "no counts, no scores" and the copy never claims a direction.
 *  So there is no trend, no axis and no number anywhere here. What is drawn is
 *  the loop and the separation.
 *
 *  THE LEFT HALF is the same agreed questions going round again. The same
 *  slips, the same stack, with the return running around them: the reading of
 *  service 01 taken a second time rather than a new one started, which is why
 *  the two of them bracket the whole chapter.
 *
 *  THE RIGHT HALF is the report, cut into three bands that are deliberately not
 *  alike. Confirmed results are solid and closed. Estimates are drawn open, on
 *  a dashed edge, because an estimate is not a result. Manual observations are
 *  marked by hand: their marks sit slightly off the rule the others line up on,
 *  because a person put them there. The dividers between the bands are the
 *  heaviest lines in the drawing, since the separation is the point.
 *
 *  THE MARKS ARE 01's MARKS. A filled disc for a mention, a turned-corner page
 *  for a citation, an open plate for a competitor. Service 07 records changes
 *  in exactly those three things, so it records them in exactly the shapes the
 *  baseline used.
 *
 *  INKED IN ASH, NOT LINE. On this chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. Brand is spent only on
 *  the return and on what is confirmed. */

/** The three things the copy says are recorded, in its own order, each with
 *  the shape the baseline drew it with. */
const RECORDED = ["mention", "citation", "competitor"] as const;

export function MonitorDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="The same agreed searches put again, and a report whose confirmed results are kept separate from its estimates and its manual observations."
      >
        {/* ============================================ the agreed searches ==
            The same slips as the baseline, and the return around them. */}
        {[0, 1, 2].map((i) => {
          const y = 96 + i * 52;
          return (
            <g key={i}>
              <rect
                x="66"
                y={y}
                width="182"
                height="38"
                rx="8"
                fill="var(--color-ash)"
                fillOpacity="0.1"
                stroke="var(--color-ash)"
                strokeOpacity="0.5"
                strokeWidth="1.3"
              />
              <circle cx="86" cy={y + 19} r="3.5" fill="var(--color-brand)" fillOpacity="0.8" />
              <rect
                x="100"
                y={y + 15}
                width={124 - i * 22}
                height="7"
                rx="3.5"
                fill="var(--color-ash)"
                fillOpacity="0.45"
              />
            </g>
          );
        })}

        {/* The return. It leaves the foot of the stack, runs out and around,
            and comes back to the head, because the copy repeats the searches
            rather than asking new ones. */}
        <path
          d="M 66 268 H 34 C 20 268 20 254 20 240 V 96 C 20 82 20 68 34 68 H 248"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          strokeDasharray="5 6"
        />
        <path
          d="M 66 268 H 34 C 20 268 20 254 20 240 V 96 C 20 82 20 68 34 68 H 248"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="ci-flow"
          style={{ animationDuration: "5.4s" }}
        />
        {/* The head it returns to. */}
        <path
          d="M 240 62 L 252 68 L 240 74 Z"
          fill="var(--color-brand)"
        />

        {/* The hand-off into the report. */}
        <path
          d="M 262 174 H 320"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />

        {/* ========================================================= report ==
            One sheet, cut into three bands that do not look alike. */}
        <rect
          x="336"
          y="24"
          width="550"
          height="292"
          rx="14"
          fill="var(--color-ash)"
          fillOpacity="0.06"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />

        {/* ---- band one: confirmed results. Solid, closed, brand. ---------- */}
        <rect x="362" y="44" width="76" height="8" rx="4" fill="var(--color-brand)" />
        {RECORDED.map((kind, i) => {
          const y = 66 + i * 26;
          return (
            <g key={kind}>
              <rect
                x="362"
                y={y}
                width={468 - i * 54}
                height="18"
                rx="5"
                fill="var(--color-brand)"
                fillOpacity="0.14"
                stroke="var(--color-brand)"
                strokeOpacity="0.7"
                strokeWidth="1.2"
              />
              {/* A mention is a disc, a citation a turned page, a competitor an
                  open plate: the baseline's three shapes, kept. */}
              {kind === "mention" && (
                <circle cx="380" cy={y + 9} r="5" fill="var(--color-brand)" />
              )}
              {kind === "citation" && (
                <path
                  d="M 374 3 h 8 l 4 4 v 9 h -12 z"
                  transform={`translate(0 ${y + 1})`}
                  fill="var(--color-brand)"
                />
              )}
              {kind === "competitor" && (
                <rect
                  x="373"
                  y={y + 4}
                  width="14"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="var(--color-ash)"
                  strokeOpacity="0.85"
                  strokeWidth="1.4"
                />
              )}
            </g>
          );
        })}

        {/* The first cut. The heaviest line on the sheet, because separating
            these is the sentence the whole service ends on. */}
        <line
          x1="336"
          y1="150"
          x2="886"
          y2="150"
          stroke="var(--color-ash)"
          strokeOpacity="0.9"
          strokeWidth="2.2"
        />

        {/* ---- band two: estimates. Open, on a dashed edge. ---------------- */}
        <rect x="362" y="166" width="58" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        {[0, 1].map((i) => (
          <rect
            key={i}
            x="362"
            y={188 + i * 24}
            width={382 - i * 76}
            height="15"
            rx="5"
            fill="none"
            stroke="var(--color-ash)"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            strokeDasharray="6 5"
          />
        ))}

        {/* The second cut. */}
        <line
          x1="336"
          y1="244"
          x2="886"
          y2="244"
          stroke="var(--color-ash)"
          strokeOpacity="0.9"
          strokeWidth="2.2"
        />

        {/* ---- band three: manual observations. Marked by hand, so the marks
                sit off the rule the other bands line up on. ----------------- */}
        <rect x="362" y="260" width="92" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        {[0, 1].map((i) => (
          <g key={i}>
            <rect
              x={368 + i * 4}
              y={282 + i * 20}
              width={300 - i * 88}
              height="14"
              rx="5"
              fill="var(--color-ash)"
              fillOpacity="0.1"
              stroke="var(--color-ash)"
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
            {/* A tick someone placed, deliberately not square to the row. */}
            <path
              d={`M ${694 - i * 88} ${288 + i * 20} l 5 6 l 10 -12`}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}

        {/* What is confirmed is read across, once per pass. Nothing grows from
            zero and nothing rests hidden: the sweep only lightens a band that
            is already fully drawn. */}
        <rect
          x="352"
          y="60"
          width="6"
          height="86"
          rx="3"
          fill="var(--color-brand)"
          className="ci-scan-y"
          style={{ animationDuration: "4.6s" }}
        />
      </svg>

      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {/* Every label verbatim from service 07's own body:
            "We repeat the agreed searches and record changes in mentions,
            citations and competitor visibility." and "The report separates
            confirmed results from estimates and manual observations." */}
        {["repeat the agreed searches", "confirmed results", "estimates and manual observations"].map(
          (label, i) => (
            <span
              key={label}
              className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash"
            >
              <span
                aria-hidden
                className={
                  i === 2
                    ? "h-1.5 w-1.5 shrink-0 rounded-full border border-ash bg-transparent"
                    : "h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                }
              />
              {label}
            </span>
          ),
        )}
      </figcaption>
    </figure>
  );
}
