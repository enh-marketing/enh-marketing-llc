"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type PipelineStep = { no: string; title: string; body: string };

/** The dashboard project, drawn as the pipeline it builds.
 *
 *  WHY A PIPE AND NOT A SCHEDULE. The section above this one watches a
 *  dashboard assemble itself, so this one must not be a second assembly and it
 *  must not be a numbered column either. What these seven steps actually build
 *  is not the screen — it is everything behind the screen that keeps the screen
 *  true. So the section is one continuous line of plumbing that runs the width
 *  of the seven stations, and each station is drawn as the piece of it that
 *  step installs: loose reports that connect to nothing, a diagnostic that
 *  finds the gaps, a specification that fixes what each thing means, the
 *  connection and the strainer, the view the pipe finally rises into, the gate
 *  everything is tested at, and the watch that stays on afterwards.
 *
 *  THE LINE IS THE POINT AND IT NEVER BREAKS. It runs edge to edge through
 *  every station at the same height, so the seven read as one system being
 *  built rather than seven cards about building one. It is absent at station
 *  one, because at station one there is nothing joined to anything; it is
 *  holed at station two, because that is what the diagnostic finds; and past
 *  the launch mark it goes dashed and runs off the end, because the document's
 *  last step begins "After launch" and monitoring does not finish.
 *
 *  NO DURATIONS AND NO SCALE. The document gives no timings and none are drawn.
 *  The run marks order, not weeks.
 *
 *  PINNED WHERE THERE IS WIDTH AND MOTION IS WELCOME, and a native snap rail
 *  everywhere else — the same arrangement ChannelScroller uses, for the same
 *  reason: the horizontal travel is the section's idea, and a phone can still
 *  perform it with a thumb. */

const CARD = 480;
const VB_H = 176;
const PIPE_Y = 116;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** The two walls of the pipe, over a given span. */
function Pipe({ from, to, dashed = false }: { from: number; to: number; dashed?: boolean }) {
  return (
    <g className={dashed ? "text-brand" : "text-brand"}>
      <path
        d={`M${from} ${PIPE_Y - 9}H${to}`}
        {...S}
        strokeWidth={1.6}
        strokeDasharray={dashed ? "7 6" : undefined}
        opacity={dashed ? 0.7 : 1}
      />
      <path
        d={`M${from} ${PIPE_Y + 9}H${to}`}
        {...S}
        strokeWidth={1.6}
        strokeDasharray={dashed ? "7 6" : undefined}
        opacity={dashed ? 0.7 : 1}
      />
    </g>
  );
}

/** What flows through it, once there is a through it. */
function Flow({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) {
  return (
    <path
      d={`M${from} ${PIPE_Y}H${to}`}
      fill="none"
      pathLength={100}
      stroke="var(--color-brand)"
      strokeWidth={5}
      strokeLinecap="round"
      className="ci-flow"
      style={{ animationDelay: `${delay}ms`, animationDuration: "2.6s" }}
    />
  );
}

function Station({ i }: { i: number }) {
  switch (i) {
    // 01 — the reports being used now: separate, hand-prepared, joined to nothing.
    case 0:
      return (
        <>
          {[
            { x: 40, y: 22, w: 96, h: 68, r: -6 },
            { x: 168, y: 14, w: 78, h: 78, r: 4 },
            { x: 274, y: 26, w: 104, h: 60, r: -3 },
            { x: 396, y: 18, w: 62, h: 72, r: 7 },
          ].map((s, k) => (
            <g key={k} transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={3} {...S} strokeWidth={1.2} className="text-fog" />
              {[0, 1, 2].map((r) => (
                <rect
                  key={r}
                  x={s.x + 8}
                  y={s.y + 12 + r * 12}
                  width={s.w - 16 - r * 8}
                  height={4}
                  rx={2}
                  fill="currentColor"
                  className="text-fog"
                  opacity={0.3}
                />
              ))}
            </g>
          ))}
          <Pipe from={0} to={480} dashed />
        </>
      );

    // 02 — the sources identified, and the holes in what they can supply.
    case 1:
      return (
        <>
          {[60, 150, 240, 330, 420].map((x, k) => (
            <g key={x}>
              <rect x={x - 16} y={18} width={32} height={18} rx={3} {...S} strokeWidth={1.2} className="text-line" />
              <path d={`M${x} 36v${PIPE_Y - 46}`} {...S} strokeWidth={1} strokeDasharray={k === 2 ? "3 4" : undefined} className={k === 2 ? "text-ash" : "text-line"} />
            </g>
          ))}
          <Pipe from={0} to={196} />
          <Pipe from={268} to={392} />
          <Pipe from={444} to={480} />
          {/* what is not there */}
          <circle cx={232} cy={PIPE_Y} r={26} {...S} strokeWidth={1.4} className="text-brand" />
          <path d={`M250 ${PIPE_Y + 18}l16 16`} {...S} strokeWidth={1.6} className="text-brand" />
        </>
      );

    // 03 — what each thing is going to mean, written down.
    case 2:
      return (
        <>
          <rect x={104} y={14} width={272} height={72} rx={5} {...S} strokeWidth={1.3} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 6%, transparent)" />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={116} y={26 + r * 20} width={92} height={6} rx={3} fill="currentColor" className="text-fog" opacity={0.4} />
              <rect x={220} y={26 + r * 20} width={[112, 84, 100][r]} height={6} rx={3} fill="currentColor" className="text-brand" opacity={0.6} />
              <path d={`M348 ${28 + r * 20}l4 5 7-9`} {...S} strokeWidth={1.5} className="text-brand" />
            </g>
          ))}
          <path d={`M240 86v${PIPE_Y - 96}`} {...S} strokeWidth={1.1} className="text-brand" />
          <Pipe from={0} to={480} />
          {/* the collar the definitions clamp on */}
          <rect x={216} y={PIPE_Y - 16} width={48} height={32} rx={4} {...S} strokeWidth={1.4} className="text-brand" fill="var(--color-ink-2)" />
        </>
      );

    // 04 — connected, and cleaned on the way through.
    case 3:
      return (
        <>
          <Pipe from={0} to={480} />
          <Flow from={0} to={160} />
          <Flow from={300} to={480} delay={700} />
          {/* duplicates going in */}
          {[52, 68, 110, 126].map((x, k) => (
            <rect key={x} x={x} y={PIPE_Y - 5} width={11} height={10} rx={2} fill="currentColor" className={k === 1 || k === 3 ? "text-ash" : "text-brand"} opacity={k === 1 || k === 3 ? 0.4 : 0.85} />
          ))}
          {/* the strainer */}
          <rect x={186} y={PIPE_Y - 34} width={108} height={68} rx={6} {...S} strokeWidth={1.4} className="text-brand" fill="var(--color-ink-2)" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M${200 + k * 20} ${PIPE_Y - 24}v48`} {...S} strokeWidth={1.2} className="text-brand" opacity={0.6} />
          ))}
          {/* and what comes out */}
          {[318, 348, 378, 408].map((x) => (
            <rect key={x} x={x} y={PIPE_Y - 5} width={11} height={10} rx={2} fill="currentColor" className="text-brand" opacity={0.85} />
          ))}
        </>
      );

    // 05 — the pipe rising into the thing people actually look at.
    case 4:
      return (
        <>
          <Pipe from={0} to={140} />
          <Flow from={0} to={140} />
          <path d={`M140 ${PIPE_Y - 9}h20v-58h230`} {...S} strokeWidth={1.6} className="text-brand" />
          <path d={`M140 ${PIPE_Y + 9}h38v-40h212`} {...S} strokeWidth={1.6} className="text-brand" />
          <rect x={250} y={14} width={216} height={124} rx={6} {...S} strokeWidth={1.4} className="text-brand" fill="var(--color-ink-2)" />
          <path d="M250 40h216" {...S} strokeWidth={1} className="text-line" />
          {[0, 1, 2, 3].map((k) => (
            <rect
              key={k}
              x={262 + (k % 2) * 100}
              y={52 + Math.floor(k / 2) * 42}
              width={90}
              height={34}
              rx={4}
              {...S}
              strokeWidth={1.1}
              className={k === 3 ? "text-line" : "text-brand"}
              strokeDasharray={k === 3 ? "4 4" : undefined}
              opacity={k === 3 ? 0.6 : 1}
            />
          ))}
        </>
      );

    // 06 — nothing goes live until it has been tried.
    case 5:
      return (
        <>
          <Pipe from={0} to={480} />
          <Flow from={0} to={170} />
          <rect x={172} y={PIPE_Y - 46} width={136} height={92} rx={6} {...S} strokeWidth={1.4} className="text-brand" fill="var(--color-ink-2)" />
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <path d={`M${188} ${PIPE_Y - 30 + k * 20}l5 6 9-11`} {...S} strokeWidth={1.5} className="text-brand" />
              <rect x={210} y={PIPE_Y - 30 + k * 20} width={[76, 58, 68, 48][k]} height={5} rx={2.5} fill="currentColor" className="text-fog" opacity={0.4} />
            </g>
          ))}
          {/* the valve */}
          <circle cx={372} cy={PIPE_Y} r={22} {...S} strokeWidth={1.5} className="text-brand" />
          <path d={`M372 ${PIPE_Y - 22}v44M350 ${PIPE_Y}h44M356 ${PIPE_Y - 16}l32 32M388 ${PIPE_Y - 16}l-32 32`} {...S} strokeWidth={1.3} className="text-brand" opacity={0.7} />
          <Flow from={400} to={480} delay={900} />
        </>
      );

    // 07 — and the watch that does not finish.
    default:
      return (
        <>
          <Pipe from={0} to={200} />
          <Pipe from={200} to={480} dashed />
          <Flow from={0} to={330} />
          <circle cx={200} cy={PIPE_Y} r={30} {...S} strokeWidth={1.4} className="text-brand ci-twinkle" />
          <circle cx={200} cy={PIPE_Y} r={7} fill="var(--color-brand)" />
          <path d={`M200 ${PIPE_Y - 30}v-40`} {...S} strokeWidth={1.2} className="text-brand" />
          <rect x={138} y={20} width={124} height={46} rx={5} {...S} strokeWidth={1.3} className="text-brand" fill="var(--color-ink-2)" />
          <path d="M150 52c14-4 22-18 38-14s24 14 42 6" {...S} strokeWidth={1.5} className="text-brand" />
          <path d="M420 100l14 16-14 16" {...S} strokeWidth={1.4} className="text-brand" opacity={0.6} />
        </>
      );
  }
}

export function DataPipeline({
  items,
  launchLabel,
}: {
  items: PipelineStep[];
  /** The boundary the last step is measured from: its first words are "After
   *  launch", and step six is "Testing and Launch". */
  launchLabel: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.pinned) return;
      const el = root.current;
      const rail = track.current;
      if (!el || !rail) return;
      rail.style.overflow = "visible";

      /* Travel far enough that the last station clears the right edge, so the
         run genuinely ends rather than stopping with a card half off-screen. */
      const distance = () => {
        const last = rail.lastElementChild as HTMLElement | null;
        if (!last) return 0;
        return Math.max(0, last.offsetLeft + last.offsetWidth - el.clientWidth + 40);
      };

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 0.8,
          start: "center center",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(rail, { x: 0 });
        rail.style.overflow = "";
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div>
      <div ref={root}>
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto px-6 sm:px-10 lg:px-[calc((100vw-1320px)/2+2.5rem)]"
        >
          {items.map((step, i) => {
            const afterLaunch = i === items.length - 1;
            return (
              <div
                key={step.no}
                className="relative w-[86vw] shrink-0 snap-start sm:w-[62vw] lg:w-[30rem]"
              >
                {/* The boundary the last step is measured from, drawn ON the
                    card rather than as padding inside it. Padding would narrow
                    this card's drawing, and a narrower drawing scales its
                    viewBox down, which would put the pipe at a different height
                    from the six before it and jog the one line the section is
                    built on. */}
                {afterLaunch && (
                  <>
                    <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-brand" />
                    <span className="font-display absolute left-4 top-0 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.2em] text-brand-text">
                      {launchLabel}
                    </span>
                  </>
                )}

                {/* Every card reserves the same top row, so every drawing sits
                    at the same height and the pipe runs true across all seven. */}
                <div aria-hidden className="h-6" />

                {/* The piece of the system this step installs. */}
                <svg viewBox={`0 0 ${CARD} ${VB_H}`} aria-hidden className="block w-full">
                  <Station i={i} />
                </svg>

                <div className={cn("mt-8 pr-10", afterLaunch && "pl-5")}>
                  <span className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">
                    {step.no}
                  </span>
                  <h3 className="font-display mt-3 text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold uppercase leading-[1.12] text-snow">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-fog">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Where in the run the reader is, since the page is not scrolling while
          the track is. */}
      <div className="mx-auto mt-12 hidden w-full max-w-[1320px] px-6 sm:px-10 lg:block">
        <span className="block h-px w-full bg-line">
          <span ref={progress} aria-hidden className="block h-px w-full origin-left scale-x-0 bg-brand" />
        </span>
      </div>
    </div>
  );
}
