"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import type { Stage } from "@/content/industries/healthcare";

/** "How Our Healthcare Marketing Process Works" — five stages, drawn as the
 *  plan they write.
 *
 *  THE HINGE IS STAGE 2, AND IT IS THE REASON THIS SECTION IS NOT FIVE CARDS IN
 *  A ROW. "Each priority is connected to an appropriate page, campaign and
 *  patient action." That is three sockets against every priority, and the three
 *  stages after it are the client filling them: Stage 3 improves the pages,
 *  Stage 4 launches the campaigns, Stage 5 reads the actions and re-orders the
 *  list according to what it finds. So the section is one plan in five states
 *  rather than five pictures, and the reader can see the plan being written.
 *
 *  STAGE 1 FILLS NOTHING, ON PURPOSE. Its sentence is a review: "search
 *  visibility, treatment pages, advertising, social media, local listings and
 *  conversion tracking" — six things looked at before a single priority exists.
 *  They are the strip along the top, lit while the review is running and
 *  quieted once the plan starts. Drawing a partly-filled plan at Stage 1 would
 *  claim work the client's own sentence does not describe.
 *
 *  THREE PRIORITIES, BECAUSE STAGE 2 NAMES THREE KINDS. "the services,
 *  specialists and locations that need marketing support". Not three because
 *  three is tidy: three because the sentence has three nouns in it. Their name
 *  bars are different widths so three rows do not read as one row printed three
 *  times, and no row is above another in merit — until Stage 5, where the order
 *  changes, because that stage's own sentence says priorities are adjusted.
 *
 *  EXACTLY ONE THING IS BEING WORKED AT ANY STAGE, and it is the thing that
 *  stage's sentence describes: the review strip at Stage 1, the priorities
 *  themselves at Stage 2, then the page column, the campaign column and the
 *  action column. Everything already done stays drawn. Nothing is counted and
 *  there is no axis: a socket is either filled or it is not, which is the only
 *  claim the document supports.
 *
 *  ALL FIVE STAGES ARE READABLE AT ONCE. The titles and the bodies are always
 *  in the DOM and always visible — no panel is collapsed, nothing is behind a
 *  tab — because a process a reader has to click through to learn is a process
 *  they will not learn. Choosing a stage changes the plan beside it and nothing
 *  else. Below the large breakpoint the plan sits above the stages and the same
 *  choice still works, which is why the control is a button rather than a
 *  hover. */

const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** The six surfaces Stage 1's own sentence reviews: "search visibility,
 *  treatment pages, advertising, social media, local listings and conversion
 *  tracking". Six, because the sentence names six.
 *
 *  `SURVEY` is where they stand while the review is the whole panel; `REVIEWED`
 *  is where the same six sit once the plan has priorities on it. */
const SURVEY: [number, number][] = [
  [24, 26],
  [168, 26],
  [312, 26],
  [24, 158],
  [168, 158],
  [312, 158],
];
const REVIEWED = [40, 108, 176, 244, 312, 380];

/** The three priorities Stage 2's own sentence names, as name-bar widths.
 *  Different widths so three rows do not read as one row three times. */
const PRIORITIES = [118, 92, 134];

/** Row baselines, and the order they stand in. Stage 5 re-orders them. */
const ROW_Y = [104, 176, 248];
const REORDERED = [2, 0, 1];

/** The three sockets against every priority, in Stage 2's own order. */
const SOCKETS = [186, 274, 362];

function SocketMark({ kind, x, y }: { kind: 0 | 1 | 2; x: number; y: number }) {
  if (kind === 0) {
    // A page.
    return (
      <g stroke={BRAND} strokeWidth="1.3" strokeOpacity="0.9" fill="none">
        <rect x={x + 10} y={y + 7} width="20" height="24" rx="2.5" />
        <path d={`M${x + 15} ${y + 14} H${x + 25} M${x + 15} ${y + 19} H${x + 23} M${x + 15} ${y + 24} H${x + 25}`} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round" />
        <path d={`M${x + 40} ${y + 19} H${x + 66}`} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === 1) {
    // A campaign: a bought slot.
    return (
      <g stroke={BRAND} strokeWidth="1.3" strokeOpacity="0.9" fill="none">
        <rect x={x + 10} y={y + 9} width="56" height="20" rx="3" />
        <rect x={x + 15} y={y + 13} width="14" height="6" rx="3" fill={BRAND} fillOpacity="0.55" stroke="none" />
        <path d={`M${x + 15} ${y + 24} H${x + 60}`} strokeWidth="1" strokeOpacity="0.45" strokeLinecap="round" />
      </g>
    );
  }
  // A patient action.
  return (
    <g stroke={BRAND} strokeWidth="1.3" strokeOpacity="0.9" fill="none">
      <rect x={x + 12} y={y + 10} width="52" height="18" rx="9" fill={BRAND} fillOpacity="0.18" />
      <path d={`M${x + 22} ${y + 19} H${x + 54}`} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

export function TreatmentPlan({
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
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active] ?? stages[0];
  const order = stage.reorders ? REORDERED : [0, 1, 2];

  function onKeyDown(e: React.KeyboardEvent) {
    const last = stages.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  /** Which column is being worked at this stage, or null. Read from the
   *  stage's own `fills`: the column it turned on is the one it describes. */
  const working = (() => {
    if (!stage.fills.priorities) return null;
    const prev = stages[active - 1]?.fills;
    if (!prev?.page && stage.fills.page) return 0;
    if (!prev?.campaign && stage.fills.campaign) return 1;
    if (!prev?.action && stage.fills.action) return 2;
    return null;
  })();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* THE PLAN. First in the source order below the large breakpoint so
              a phone meets the drawing before the stages that change it. */}
          <Rise className="order-first lg:order-last">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-7">
                <span
                  aria-hidden
                  className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                />
                <svg
                  viewBox="0 0 460 320"
                  role="img"
                  aria-label={`${stage.title}. ${stage.body}`}
                  className="block h-auto w-full"
                  fill="none"
                >
                  {/* THE REVIEW, AT FULL SIZE. Six surfaces, looked at before
                      anything is chosen. This is the whole panel at Stage 1 --
                      the first build drew the review as a thin strip and left
                      two thirds of the frame empty until the reader clicked
                      Stage 2, which is an unfinished panel rather than a
                      picture of a review. */}
                  <g
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    opacity={stage.fills.priorities ? 0 : 1}
                  >
                    {SURVEY.map(([x, y], i) => (
                      <g key={`${x}-${y}`}>
                        <rect
                          x={x}
                          y={y}
                          width="124"
                          height="112"
                          rx="5"
                          stroke={ASH}
                          strokeWidth="1.3"
                          strokeOpacity="0.7"
                        />
                        <rect
                          x={x + 14}
                          y={y + 16}
                          width="52"
                          height="10"
                          rx="2.5"
                          fill={ASH}
                          fillOpacity="0.3"
                        />
                        <path
                          d={`M${x + 14} ${y + 44} H${x + 106} M${x + 14} ${y + 58} H${x + 88} M${x + 14} ${y + 72} H${x + 100}`}
                          stroke={ASH}
                          strokeWidth="1.1"
                          strokeOpacity="0.35"
                          strokeLinecap="round"
                        />
                        {/* The review passing over them, one at a time. */}
                        <rect
                          x={x + 14}
                          y={y + 88}
                          width="16"
                          height="8"
                          rx="2"
                          className="ci-blink fill-brand"
                          style={{ animationDelay: `${(i * 6000) / SURVEY.length}ms` }}
                        />
                      </g>
                    ))}
                  </g>

                  {/* THE SAME SIX, ONCE THE PLAN HAS PRIORITIES ON IT. They do
                      not disappear: the review is the ground the plan stands
                      on, so it stays at the head of the frame. */}
                  <g
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    opacity={stage.fills.priorities ? 0.5 : 0}
                  >
                    {REVIEWED.map((x) => (
                      <rect
                        key={x}
                        x={x}
                        y="18"
                        width="26"
                        height="20"
                        rx="3"
                        stroke={ASH}
                        strokeWidth="1.2"
                        strokeOpacity="0.7"
                      />
                    ))}
                    <path
                      d="M40 48 H406"
                      stroke={ASH}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      strokeDasharray="3 6"
                    />
                  </g>

                  {/* THE PLAN'S OWN HEAD RULE. */}
                  <path
                    d="M30 74 H430"
                    stroke={ASH}
                    strokeWidth="1.2"
                    strokeOpacity="0.55"
                    className="transition-opacity duration-500 motion-reduce:transition-none"
                    opacity={stage.fills.priorities ? 1 : 0}
                  />

                  {/* THREE PRIORITIES, EACH WITH THREE SOCKETS. */}
                  {PRIORITIES.map((w, row) => {
                    const y = ROW_Y[order.indexOf(row)];
                    return (
                      <g
                        key={row}
                        className="transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                        style={{ transform: `translateY(${y - ROW_Y[row]}px)` }}
                        opacity={stage.fills.priorities ? 1 : 0}
                      >
                        {/* The priority itself. */}
                        <rect
                          x="30"
                          y={ROW_Y[row]}
                          width={w}
                          height="13"
                          rx="3"
                          fill={BRAND}
                          fillOpacity="0.45"
                        />
                        <path
                          d={`M30 ${ROW_Y[row] + 28} H${30 + w + 18}`}
                          stroke={ASH}
                          strokeWidth="1"
                          strokeOpacity="0.28"
                          strokeLinecap="round"
                        />
                        {working === null && stage.fills.priorities && !stage.fills.page && (
                          <rect
                            x="16"
                            y={ROW_Y[row] + 2}
                            width="8"
                            height="8"
                            rx="1.5"
                            className="ci-blink fill-brand"
                            style={{ animationDelay: `${row * 2000}ms` }}
                          />
                        )}

                        {SOCKETS.map((x, s) => {
                          const filled =
                            (s === 0 && stage.fills.page) ||
                            (s === 1 && stage.fills.campaign) ||
                            (s === 2 && stage.fills.action);
                          return (
                            <g key={x}>
                              <rect
                                x={x}
                                y={ROW_Y[row] - 6}
                                width="76"
                                height="38"
                                rx="4"
                                stroke={filled ? BRAND : ASH}
                                strokeWidth={filled ? 1.4 : 1}
                                strokeOpacity={filled ? 0.85 : 0.35}
                                strokeDasharray={filled ? undefined : "4 5"}
                                fill={filled ? BRAND : "none"}
                                fillOpacity={filled ? 0.08 : 0}
                                className="transition-[stroke-opacity,fill-opacity] duration-500 motion-reduce:transition-none"
                              />
                              {filled && (
                                <SocketMark kind={s as 0 | 1 | 2} x={x} y={ROW_Y[row] - 6} />
                              )}
                              {filled && working === s && (
                                <rect
                                  x={x + 68}
                                  y={ROW_Y[row] - 2}
                                  width="6"
                                  height="6"
                                  rx="1.5"
                                  className="ci-blink fill-brand"
                                  style={{ animationDelay: `${row * 2000}ms` }}
                                />
                              )}
                            </g>
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </Rise>

          {/* THE FIVE STAGES. Every one of them readable without a click. */}
          <ol className="relative" onKeyDown={onKeyDown}>
            {stages.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.no}
                  className={`group border-l-2 py-6 pl-6 transition-colors duration-500 motion-reduce:transition-none sm:pl-8 ${
                    on ? "border-brand" : "border-line hover:border-ash/60"
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`font-display shrink-0 text-sm font-extrabold uppercase leading-none transition-colors duration-500 motion-reduce:transition-none ${
                        on ? "text-brand-text" : "text-ash"
                      }`}
                    >
                      {s.no.padStart(2, "0")}
                    </span>
                    <h3 className="font-display min-w-0 text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.16]">
                      <button
                        type="button"
                        ref={(el) => {
                          buttons.current[i] = el;
                        }}
                        aria-pressed={on}
                        onClick={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className={`text-left transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none ${
                          on ? "text-snow" : "text-fog group-hover:text-snow"
                        }`}
                      >
                        {s.title}
                      </button>
                    </h3>
                  </div>

                  <span
                    aria-hidden
                    className={`mt-4 block h-px transition-all duration-500 motion-reduce:transition-none ${
                      on ? "w-20 bg-brand" : "w-8 bg-line group-hover:w-14"
                    }`}
                  />

                  <p
                    className={`mt-4 max-w-[58ch] text-sm leading-relaxed transition-colors duration-500 motion-reduce:transition-none sm:text-base ${
                      on ? "text-fog" : "text-ash group-hover:text-fog"
                    }`}
                  >
                    {s.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
