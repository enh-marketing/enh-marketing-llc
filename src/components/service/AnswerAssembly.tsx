"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** "Can Hospitality Brands Appear in AI Search Results?" — answered by taking
 *  the answer apart.
 *
 *  WHAT THIS REPLACES AND WHY. The first version was two paragraphs, one static
 *  diagram and a big closing statement. Every word was the document's and the
 *  section still did nothing: a reader had no reason to look at the picture,
 *  because the picture was not going to change.
 *
 *  THE DOCUMENT MAKES A CAUSAL CLAIM, SO THE SECTION RUNS IT. "Hospitality
 *  brands need clear, consistent and well-structured information across their
 *  websites and important third-party profiles. We support this through [six
 *  things]." And then: "Search engines and AI assistants need to understand
 *  what the business provides, where it operates and which guest questions its
 *  content answers." That is six inputs and three requirements, with a stated
 *  relationship between them — which is a machine, not a paragraph.
 *
 *  So the six are switches, and they start ON. The brand's own surfaces are
 *  structured, the assistant's three requirements are legible, and the answer
 *  gets assembled. Turn one off and its row of structure scrambles, the three
 *  requirements lose a sixth of their legibility, and the answer has less to
 *  work with. Removing things is the useful direction: it is much easier to see
 *  what structured FAQs are doing when they are gone.
 *
 *  AND THE ANSWER NEVER BECOMES OURS. Its edge stays dashed at every setting,
 *  and the one line in it that could be the brand's stays an outline rather
 *  than filling in — because the document's last paragraph withdraws exactly
 *  that guarantee: "Visibility cannot be guaranteed within a particular AI
 *  response." A drawing in which turning all six on delivered the answer would
 *  be the one invented claim on this page. The limit is drawn, not just said.
 *
 *  NOTHING IS COUNTED AND NOTHING IS LABELLED ON IT. The rows of structure are
 *  six because the document names six things; they are not six pages, six
 *  fields or six of anything measurable. The three requirement tracks carry no
 *  scale. Every word is in the sentences beside it, once.
 *
 *  MOTION. The answer streams on CSS keyframes so the card is alive whatever
 *  the switches say; everything else is a colour or width transition driven by
 *  the reader. See globals.css, "Answer assembly". */

/** Where the six rows of structure sit: three surfaces, two rows each. The
 *  rows carry no labels, so nothing here claims that a particular support lives
 *  on a particular surface — only that there are six of them. */
const BLOCKS = [20, 112, 204];

/** A scrambled row: fragments at the wrong offsets and the wrong widths, which
 *  is what unstructured information looks like to something reading it. */
const SCRAMBLE = [
  [30, 34],
  [72, 22],
  [102, 58],
];

export function AnswerAssembly({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  supports,
  supportsMark,
  foundations,
  limit,
  limitMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The sentence naming the six supports; its phrases are the switches. */
  supports: string;
  supportsMark: string[];
  foundations: string;
  limit: string;
  limitMark: string;
}) {
  /** All six in place is the finished state, so that is where it rests. */
  const [on, setOn] = useState<boolean[]>(() => supportsMark.map(() => true));
  const count = on.filter(Boolean).length;
  const share = count / supportsMark.length;

  const toggle = (i: number) =>
    setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

  /* The sentence, split around its six phrases so each becomes a switch
     without a single word moving. Same contract as Marked: stripped of tags the
     parts concatenate back to the source exactly. */
  const present = supportsMark.filter((m) => supports.includes(m));
  const parts = present.length
    ? supports.split(
        new RegExp(
          "(" +
            present
              .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .sort((a, b) => b.length - a.length)
              .join("|") +
            ")",
          "g",
        ),
      )
    : [supports];

  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const swap = `opacity 420ms ${ease}, fill 420ms ${ease}`;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {/* The six, as switches. */}
            <Rise>
              <p className="text-base leading-relaxed text-fog sm:text-lg">
                {parts.map((part, i) => {
                  const which = supportsMark.indexOf(part);
                  if (which === -1) return <Fragment key={i}>{part}</Fragment>;
                  const live = on[which];
                  return (
                    <button
                      key={i}
                      type="button"
                      role="switch"
                      aria-checked={live}
                      onClick={() => toggle(which)}
                      /* IN PLACE IS THE RESTING STATE, so it has to be quiet.
                         Six solid brand pills — and two of these phrases run to
                         nine words — turned the paragraph into a block of red
                         with prose wedged between it. An underline says "in
                         place" just as clearly and leaves a sentence readable;
                         the struck-through state is the one that should stop
                         the eye, because that is the one the reader caused. */
                      className={cn(
                        "font-display rounded-sm px-1 py-1 text-[0.95em] font-extrabold uppercase leading-none transition-colors duration-300 motion-reduce:transition-none",
                        live
                          ? "bg-brand/[0.08] text-snow underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
                          : "text-ash line-through decoration-brand decoration-[3px] hover:text-fog",
                      )}
                    >
                      {part}
                    </button>
                  );
                })}
              </p>
            </Rise>

            <Rise delay={0.08} className="mt-8 border-t border-line pt-8">
              <p className="leading-relaxed text-fog sm:text-lg">{foundations}</p>
            </Rise>

            {/* The limit, and it holds at every setting of the switches. */}
            <Rise delay={0.12} className="mt-10">
              <p className="font-display border-l-2 border-brand pl-6 text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.16] text-snow">
                <Marked text={limit} mark={limitMark} className="text-brand" />
              </p>
            </Rise>
          </div>

          {/* ---- The machine ---- */}
          <Rise delay={0.1}>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-5 sm:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  maskImage: "radial-gradient(ellipse at 85% 15%, black, transparent 72%)",
                }}
              />
              <svg viewBox="0 0 460 436" fill="none" aria-hidden className="relative block w-full">
                {/* THE BRAND'S OWN SURFACES: its site, and the third-party
                    profiles the document names alongside it. */}
                {BLOCKS.map((by, b) => (
                  <g key={by}>
                    <rect
                      x="14"
                      y={by}
                      width="200"
                      height="80"
                      rx="7"
                      stroke="var(--color-ash)"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />
                    <rect x="28" y={by + 12} width={b === 0 ? 62 : 44} height="7" rx="3.5" className="fill-fog/45" />

                    {[0, 1].map((r) => {
                      const idx = b * 2 + r;
                      const y = by + 34 + r * 22;
                      const live = on[idx];
                      return (
                        <g key={r}>
                          {/* In place: a label and its value, aligned. */}
                          <g style={{ opacity: live ? 1 : 0, transition: swap }}>
                            <rect x="28" y={y} width="40" height="8" rx="4" className="fill-brand" />
                            <rect x="76" y={y} width="122" height="8" rx="4" className="fill-fog/35" />
                          </g>
                          {/* Gone: fragments, at the wrong offsets. */}
                          <g style={{ opacity: live ? 0 : 1, transition: swap }}>
                            {SCRAMBLE.map(([x, w], f) => (
                              <rect
                                key={f}
                                x={x}
                                y={y + (f % 2 === 0 ? -2 : 3)}
                                width={w}
                                height="6"
                                rx="3"
                                className="fill-ash/45"
                              />
                            ))}
                          </g>
                        </g>
                      );
                    })}
                  </g>
                ))}

                {/* Read. */}
                <g stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round">
                  <path d="M214 60 C240 60 244 100 252 128" />
                  <path d="M214 152 C240 152 246 120 252 128" />
                  <path d="M214 244 C240 244 248 160 252 128" />
                </g>
                <circle cx="258" cy="128" r="6" className="fill-ash" />

                {/* WHAT AN ASSISTANT HAS TO UNDERSTAND. The document names
                    three things; each track carries how much of it is legible,
                    and no scale, because there is none to give. */}
                <rect
                  x="272"
                  y="20"
                  width="174"
                  height="152"
                  rx="10"
                  stroke="var(--color-ash)"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                {[46, 88, 130].map((y, i) => (
                  <g key={y}>
                    <rect x="288" y={y} width="26" height="8" rx="4" className="fill-fog/40" />
                    <rect x="324" y={y} width="106" height="8" rx="4" className="fill-line" />
                    <rect
                      x="324"
                      y={y}
                      width={Math.round(106 * share)}
                      height="8"
                      rx="4"
                      className="fill-brand"
                      style={{
                        transition: `width 520ms ${ease}`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  </g>
                ))}

                <path
                  d="M359 172 V196"
                  stroke="var(--color-ash)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="4 5"
                />

                {/* THE ANSWER. Dashed at every setting, and the line that could
                    be the brand's is an outline that never fills. */}
                <rect
                  x="272"
                  y="200"
                  width="174"
                  height="220"
                  rx="12"
                  className="fill-brand/[0.04]"
                  stroke="var(--color-brand)"
                  strokeWidth="1.75"
                  strokeDasharray="7 6"
                />
                {[
                  [222, 130],
                  [246, 142],
                  [270, 118],
                  [318, 134],
                  [342, 104],
                  [366, 126],
                  [390, 88],
                ].map(([y, w], i) => (
                  <rect
                    key={y}
                    x="290"
                    y={y}
                    width={w}
                    height="8"
                    rx="4"
                    className="aa-stream fill-fog/35"
                    style={{ animationDelay: `${i * 260}ms` }}
                  />
                ))}
                {/* Possibly ours. It is drawn, and it is not filled in. */}
                <rect
                  x="290"
                  y="294"
                  width={Math.round(60 + 78 * share)}
                  height="10"
                  rx="5"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  style={{ transition: `width 520ms ${ease}` }}
                />
              </svg>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
