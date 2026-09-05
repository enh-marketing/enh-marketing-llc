"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TrackStage } from "@/components/service/StageTrack";

gsap.registerPlugin(ScrollTrigger);

/** The project, drawn as one line that becomes a video.
 *
 *  WHY A MURAL AND NOT SIX OF ANYTHING. Six cards, six steps, six panels on a
 *  ruler: every one of them says the same wrong thing, that this is six jobs of
 *  equal size sitting next to each other. It is one account, given once by one
 *  person, carried the whole way. So the section is a single continuous scene
 *  travelled left to right, and the thing travelling through it is a line that
 *  never breaks: it leaves the customer as a thread, gains a schedule, becomes
 *  a voice, is cut, and splits into the versions at the end. Nobody has to be
 *  told it is one thing, because it visibly is.
 *
 *  EACH SEGMENT IS ITS OWN STAGE'S SENTENCE. A shortlist with one story chosen
 *  out of it; a prepared participant with the subjects, not the lines; a room,
 *  a light and a day; a conversation in frame with the audio taken separately;
 *  the strongest answers cut and supported; the approved files in the agreed
 *  formats. Nothing is drawn that the stage beside it does not say.
 *
 *  NOTHING IS TIMED, PRICED OR COUNTED IN CREW. The line carries no scale, the
 *  schedule strip carries no dates and no panel states a duration: the document
 *  gives one session length and one finished length, both hedged, both inside
 *  FAQ answers, and neither is lifted out here.
 *
 *  THE PIN IS ON AN INNER STAGE, NEVER ON THE SECTION. GSAP wraps a pinned
 *  target in a .pin-spacer, and wrapping the <section> would push it out of
 *  `main > section` and silently kill the page's background banding.
 *
 *  BELOW THE LARGE BREAKPOINT, AND UNDER prefers-reduced-motion, none of this
 *  runs: the same six panels render as a native snap-scroll rail, which is what
 *  the server renders too, so the section works before hydration and for
 *  crawlers. */

/** Where the line sits in every panel, so the six segments join into one. */
const LINE = 176;
const PW = 544;
const PH = 300;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One segment of the mural. Every segment leaves its right edge at the same
 *  height it was handed in at, which is the whole trick. */
function Scene({ i }: { i: number }) {
  switch (i) {
    /* 1 — a shortlist, and the one story worth filming. */
    case 0:
      return (
        <>
          <g className="text-ash">
            {[0, 2].map((k) => (
              <g key={k} opacity="0.5">
                <circle cx={96 + k * 108} cy="70" r="15" {...S} />
                <path d={"M" + (72 + k * 108) + " 116a24 24 0 0148 0"} {...S} />
              </g>
            ))}
          </g>
          <g className="text-brand">
            <circle cx="204" cy="70" r="15" {...S} />
            <path d="M180 116a24 24 0 0148 0" {...S} />
            <circle cx="204" cy="88" r="42" {...S} strokeDasharray="5 7" opacity="0.6" />
          </g>
          {/* The line leaves the person it belongs to. */}
          <path
            d={"M204 132v" + (LINE - 132) + "H" + PW}
            className="stroke-brand"
            strokeWidth="1.8"
            strokeDasharray="3 7"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    /* 2 — the subjects, not the lines. */
    case 1:
      return (
        <>
          <g className="text-brand">
            <circle cx="120" cy="66" r="15" {...S} />
            <path d="M96 112a24 24 0 0148 0" {...S} />
          </g>
          <g className="text-ash">
            <rect x="212" y="34" width="150" height="94" rx="6" {...S} />
            {[0, 1, 2].map((k) => (
              <g key={k}>
                <circle cx="232" cy={58 + k * 24} r="4" className="stroke-brand" {...S} />
                <path d={"M246 " + (58 + k * 24) + "h" + (k % 2 ? 76 : 100)} {...S} opacity="0.6" />
              </g>
            ))}
          </g>
          <path d={"M156 88h44"} className="stroke-brand" strokeWidth="1.6" strokeDasharray="4 5" />
          <path d={"M0 " + LINE + "H" + PW} className="stroke-brand" strokeWidth="1.8" strokeDasharray="3 7" />
        </>
      );
    /* 3 — the room, the light and the day. */
    case 2:
      return (
        <>
          <g className="text-ash">
            <path d="M96 128V52h180v76" {...S} />
            <path d="M76 128h220" {...S} />
            <path d="M132 128v-30h34v30" {...S} opacity="0.65" />
          </g>
          <g className="text-brand">
            <path d="M330 128V74M312 128h36" {...S} />
            <path d="M318 74h24l-6-16h-12z" {...S} />
            <path d="M300 52l14 8M356 40l-12 14" {...S} opacity="0.6" />
            <circle cx="230" cy="86" r="12" {...S} />
          </g>
          {/* The day, marked out but never dated. */}
          <path d={"M0 " + LINE + "H" + PW} className="stroke-brand" strokeWidth="1.8" />
          {Array.from({ length: 13 }).map((_, k) => (
            <path
              key={k}
              d={"M" + (24 + k * 40) + " " + LINE + "v" + (k % 3 === 0 ? -10 : -5)}
              className="stroke-brand"
              strokeWidth="1.4"
              opacity="0.6"
            />
          ))}
        </>
      );
    /* 4 — the conversation, with the audio taken separately. */
    case 3:
      return (
        <>
          <g className="text-ash">
            <rect x="150" y="26" width="244" height="118" rx="6" {...S} />
            <path d="M162 38h18M382 38h-18M162 132h18M382 132h-18" {...S} opacity="0.5" />
          </g>
          <g className="text-brand">
            <circle cx="252" cy="70" r="18" {...S} />
            <path d="M222 122a30 30 0 0160 0" {...S} />
            <rect x="322" y="60" width="14" height="30" rx="7" {...S} />
            <path d="M314 84a15 15 0 0030 0M329 99v14M320 113h18" {...S} opacity="0.8" />
          </g>
          {/* The line is a voice now. */}
          <g className="fill-brand">
            {Array.from({ length: 48 }).map((_, k) => {
              const h = 6 + ((k * 41) % 34);
              return (
                <rect key={k} x={8 + k * 11.2} y={LINE - h / 2} width="4" height={h} rx="2" />
              );
            })}
          </g>
        </>
      );
    /* 5 — the strongest answers, cut and supported. */
    case 4:
      return (
        <>
          <g className="text-ash">
            {[0, 1, 2].map((k) => (
              <rect key={k} x={48 + k * 130} y="34" width="104" height="62" rx="5" {...S} opacity="0.7" />
            ))}
            <path d="M100 108v22M230 108v22M360 108v22" {...S} strokeDasharray="4 5" opacity="0.6" />
          </g>
          {/* Kept, cut, kept. */}
          <g className="fill-brand">
            {Array.from({ length: 48 }).map((_, k) => {
              const gap = (k > 13 && k < 20) || (k > 31 && k < 36);
              if (gap) return null;
              const h = 6 + ((k * 41) % 34);
              return (
                <rect key={k} x={8 + k * 11.2} y={LINE - h / 2} width="4" height={h} rx="2" />
              );
            })}
          </g>
          <g className="text-brand">
            <path d={"M162 " + (LINE - 30) + "v60M356 " + (LINE - 30) + "v60"} {...S} strokeDasharray="5 6" />
            <path d={"M0 " + LINE + "h8M536 " + LINE + "h8"} {...S} />
          </g>
          <g className="text-brand">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <rect key={k} x={40 + k * 78} y={LINE + 44} width={k % 2 ? 40 : 56} height="8" rx="4" className="fill-snow/45" />
            ))}
          </g>
        </>
      );
    /* 6 — the approved versions, in the agreed formats. */
    default:
      return (
        <>
          <g className="text-brand">
            <rect x="60" y="30" width="150" height="86" rx="5" {...S} />
            <rect x="230" y="30" width="86" height="86" rx="5" {...S} opacity="0.8" />
            <rect x="336" y="24" width="58" height="98" rx="5" {...S} opacity="0.65" />
            <path d="M124 62l24 14-24 14zM264 62l20 12-20 12zM356 62l18 11-18 11z" className="fill-brand" />
          </g>
          {/* The line splits into what was asked for. */}
          <path
            d={"M0 " + LINE + "H120C170 " + LINE + " 150 132 200 132"}
            className="stroke-brand"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d={"M120 " + LINE + "C200 " + LINE + " 200 " + LINE + " 273 " + LINE}
            className="stroke-brand"
            strokeWidth="1.8"
            fill="none"
            opacity="0.75"
          />
          <path
            d={"M120 " + LINE + "C210 " + LINE + " 300 " + (LINE + 48) + " 365 " + (LINE + 48)}
            className="stroke-brand"
            strokeWidth="1.8"
            fill="none"
            opacity="0.55"
          />
          <circle cx="120" cy={LINE} r="5" className="fill-brand" />
        </>
      );
  }
}

export function StoryMural({
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
  stages: TrackStage[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = root.current;
        const rail = track.current;
        if (!el || !rail) return;

        // Only stop being a native scroller once the pin is really installed.
        rail.style.overflow = "visible";

        // Travel until the last panel's right edge reaches the right of the
        // viewport, so the mural ends on its own ending rather than parking the
        // last panel in the middle with empty space beside it.
        const distance = () => Math.max(0, rail.scrollWidth - el.clientWidth);

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
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { x: 0 });
          rail.style.overflow = "";
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One account, carried the whole way" }}
          className="mb-12"
        />
      </Container>

      <div ref={root} className="relative">
        <div
          ref={track}
          data-lenis-prevent=""
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pl-6 sm:pl-8 lg:snap-none lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {stages.map((s, i) => (
            <div
              key={s.title}
              data-panel
              /* No divider and no padding on the drawing: the panels have to
                 touch or the line running through them is not one line. The
                 copy underneath keeps the gutter instead. */
              className="relative w-[21rem] shrink-0 snap-center pb-2 sm:w-[26rem] lg:w-[34rem]"
            >
              <svg viewBox={"0 0 " + PW + " " + PH} aria-hidden className="block w-full">
                <Scene i={i} />
              </svg>

              <div className="pr-6 pt-6 sm:pr-10">
                <span
                  aria-hidden
                  className="font-display text-xs font-extrabold tabular-nums text-brand"
                >
                  {s.no}
                </span>
                <h3 className="font-display mt-3 text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.14] text-snow">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[30rem] leading-relaxed text-fog">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How far along the account is. */}
        <Container className="mt-10">
          <span aria-hidden className="block h-px w-full bg-line">
            <span
              ref={progress}
              className="block h-px w-full origin-left scale-x-0 bg-brand"
            />
          </span>
        </Container>
      </div>
    </section>
  );
}
