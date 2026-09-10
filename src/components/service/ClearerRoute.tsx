"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** The opening argument: one route, and the five things connected to it.
 *
 *  THE WORD THE DRAWING COMES FROM IS "ROUTE". "We connect search visibility,
 *  paid advertising, social media, content and online reputation with the guest
 *  journey. This gives the business a clearer route from online discovery to a
 *  measurable booking or reservation action." So there is a route, it starts at
 *  discovery, it ends at something measurable, and five things join it.
 *
 *  THEY JOIN IT — THEY DO NOT OWN STRETCHES OF IT. An earlier version split the
 *  route into five consecutive segments, one per channel, which reads as a
 *  relay and asserts an order the document never gives. The sentence says
 *  "connect ... with", so each channel is drawn as a feeder meeting the route
 *  at a joint, and the route itself is continuous whoever is selected. Pointing
 *  at a phrase raises its feeder and quiets the others; nothing about the route
 *  changes, because nothing in the copy says it would.
 *
 *  NOTHING IS LABELLED ON IT. The five channels are named once, in the client's
 *  sentence beside it, and the six guest actions are named once in the sentence
 *  above — which is also why the route ends in a single measurable action here
 *  rather than repeating the hero's fan.
 *
 *  MOTION. A travelling dash on the route and on the selected feeder, as
 *  stroke-dashoffset against pathLength="100"; everything else is a colour
 *  transition. The whole route and all five feeders are drawn underneath, so
 *  the resting frame is complete. See globals.css, "Clearer route". */

/** Where the five feeders meet the route, left to right, in the order the
 *  sentence writes the channels. Spread evenly: the document gives the five no
 *  order of arrival and no stage of the journey. */
const JOINTS = [180, 300, 420, 540, 660];
/** The portrait equivalent, top to bottom. */
const JOINTS_P = [96, 148, 200, 252, 304];

export function ClearerRoute({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  actions,
  actionsMark,
  connects,
  connectsMark,
  figures,
  figuresMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The sentence naming the six guest actions. */
  actions: string;
  actionsMark: string[];
  /** The sentence naming the five channels; its phrases are the control. */
  connects: string;
  connectsMark: [string, string, string, string, string];
  /** What the work has produced, which the document states here rather than in
   *  its results section. */
  figures: string;
  figuresMark: string[];
}) {
  const [held, setHeld] = useState(-1);
  const quiet = held !== -1;

  /* The sentence, split around its five phrases so each becomes a control
     without a single word moving. Same contract as Marked. */
  const present = connectsMark.filter((m) => connects.includes(m));
  const parts = present.length
    ? connects.split(
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
    : [connects];

  /** One feeder's tone: brand when it is the one being pointed at, quiet when
   *  another is, and even weight when none is. */
  const lane = (i: number) =>
    cn(
      "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
      held === i ? "text-brand opacity-100" : quiet ? "text-ash opacity-40" : "text-ash opacity-80",
    );

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        {/* The six endings, in the sentence that names them. */}
        <Rise>
          <p className="font-display max-w-5xl text-[clamp(1.2rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.12] text-snow">
            <Marked text={actions} mark={actionsMark} className="text-brand" />
          </p>
        </Rise>

        {/* ---- The route ---- */}
        <Rise delay={0.08} className="mt-12">
          <div
            className="rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-9"
            onPointerLeave={() => setHeld(-1)}
          >
            <p className="max-w-4xl text-base leading-relaxed text-fog sm:text-lg">
              {parts.map((part, i) => {
                const which = connectsMark.indexOf(part as (typeof connectsMark)[number]);
                if (which === -1) return <Fragment key={i}>{part}</Fragment>;
                const on = which === held;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onPointerEnter={() => setHeld(which)}
                    onFocus={() => setHeld(which)}
                    onBlur={() => setHeld(-1)}
                    onClick={() => setHeld(on ? -1 : which)}
                    className={cn(
                      "font-display rounded-md px-1.5 py-1 text-[0.95em] font-extrabold uppercase leading-none transition-colors duration-300 motion-reduce:transition-none",
                      on
                        ? "bg-brand text-white"
                        : "text-snow underline decoration-brand decoration-2 underline-offset-4 hover:text-brand",
                    )}
                  >
                    {part}
                  </button>
                );
              })}
            </p>

            {/* Wide: the route runs across. */}
            <svg
              aria-hidden
              viewBox="0 0 900 214"
              fill="none"
              className="mt-8 hidden w-full sm:block"
            >
              {/* Online discovery. */}
              <g stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round">
                {[100, 122, 144].map((y) => (
                  <path key={y} d={`M28 ${y} H72`} />
                ))}
                <path d="M72 100 C92 100 96 112 100 122" />
                <path d="M72 144 C92 144 96 132 100 122" />
              </g>

              {/* The route, whole. */}
              <path d="M100 122 H770" stroke="var(--color-line)" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M100 122 H770"
                pathLength="100"
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                className="cr-flow"
              />

              {/* The five, joining it. */}
              {JOINTS.map((x, i) => (
                <g key={x} className={lane(i)}>
                  <rect
                    x={x - 22}
                    y="26"
                    width="44"
                    height="20"
                    rx="6"
                    fill="currentColor"
                    fillOpacity="0.14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M${x} 46 V112`}
                    stroke="currentColor"
                    strokeWidth={held === i ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray={held === i ? undefined : "5 5"}
                  />
                  <circle
                    cx={x}
                    cy="122"
                    r={held === i ? 7 : 5}
                    fill="currentColor"
                    stroke="var(--color-void)"
                    strokeWidth="2"
                  />
                </g>
              ))}

              {/* A measurable booking or reservation action. */}
              <rect
                x="782"
                y="96"
                width="66"
                height="52"
                rx="10"
                className="fill-brand/15"
                stroke="var(--color-brand)"
                strokeWidth="1.75"
              />
              <rect x="798" y="112" width="34" height="8" rx="4" className="fill-brand" />
              <rect x="798" y="128" width="20" height="6" rx="3" className="fill-brand/55" />

              {/* The ground the route runs on. */}
              <path d="M28 200 H848" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 7" />
            </svg>

            {/* Narrow: the same route, turned. A 900-unit box on a phone puts
                this whole drawing under 90px tall and the joints three pixels
                across. */}
            <svg
              aria-hidden
              viewBox="0 0 320 420"
              fill="none"
              className="mx-auto mt-8 block w-full max-w-[20rem] sm:hidden"
            >
              <g stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round">
                {[132, 160, 188].map((x) => (
                  <path key={x} d={`M${x} 18 V50`} />
                ))}
                <path d="M132 50 C132 66 146 62 160 68" />
                <path d="M188 50 C188 66 174 62 160 68" />
              </g>

              <path d="M160 68 V330" stroke="var(--color-line)" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M160 68 V330"
                pathLength="100"
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                className="cr-flow"
              />

              {JOINTS_P.map((y, i) => (
                <g key={y} className={lane(i)}>
                  <rect
                    x="14"
                    y={y - 11}
                    width="44"
                    height="22"
                    rx="6"
                    fill="currentColor"
                    fillOpacity="0.14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M58 ${y} H150`}
                    stroke="currentColor"
                    strokeWidth={held === i ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray={held === i ? undefined : "5 5"}
                  />
                  <circle
                    cx="160"
                    cy={y}
                    r={held === i ? 7 : 5}
                    fill="currentColor"
                    stroke="var(--color-void)"
                    strokeWidth="2"
                  />
                </g>
              ))}

              <rect
                x="128"
                y="344"
                width="64"
                height="52"
                rx="10"
                className="fill-brand/15"
                stroke="var(--color-brand)"
                strokeWidth="1.75"
              />
              <rect x="144" y="360" width="32" height="8" rx="4" className="fill-brand" />
              <rect x="144" y="376" width="18" height="6" rx="3" className="fill-brand/55" />
            </svg>
          </div>
        </Rise>

        {/* What the work has produced. The document states these here, and
            again in its own results section; that repetition is the client's. */}
        <Rise delay={0.12} className="mt-14 border-t border-line pt-10">
          <p className="font-display max-w-5xl text-[clamp(1.05rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.18] text-snow">
            <Marked text={figures} mark={figuresMark} className="text-brand" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}
