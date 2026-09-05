"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Format } from "@/content/services/ai-workshops-and-training";
import { cn } from "@/lib/cn";

/** Scroll length per room. The stage holds for the rest of the track. */
const VH_PER = 95;

/* ---------------------------------------------------------- the room box ----
 *
 *  One-point perspective. Room space is x from -1 (left wall) to 1 (right) and
 *  z from 0 (nearest the viewer) to 1 (against the back wall); the two helpers
 *  below project that onto the viewBox, so furniture is placed in the room and
 *  the perspective is arithmetic rather than eyeballed.
 *
 *  An earlier version of this section drew four flat top-down plans at
 *  thumbnail size inside four cards. They were honest and completely without
 *  presence. A room you are standing in the back of is the same information
 *  with a body. */
const W = 720;
const H = 440;
/** Floor edges: full width at the front, narrowed to the back wall. */
const FRONT_HALF = 348;
const BACK_HALF = 152;
const FRONT_Y = 436;
const BACK_Y = 262;
const CENTRE = W / 2;
/** Back wall top, and the ceiling line at the front. */
const BACK_TOP = 96;
const FRONT_TOP = 8;

const halfWidth = (z: number) => FRONT_HALF - z * (FRONT_HALF - BACK_HALF);
const px = (x: number, z: number) => CENTRE + x * halfWidth(z);
const py = (z: number) => FRONT_Y - z * (FRONT_Y - BACK_Y);

/** A rectangle of floor, in perspective. */
function quad(x0: number, x1: number, z0: number, z1: number) {
  return `${px(x0, z0)},${py(z0)} ${px(x1, z0)},${py(z0)} ${px(x1, z1)},${py(z1)} ${px(x0, z1)},${py(z1)}`;
}

/** A solid standing on the floor: the same footprint, lifted by `h` viewBox
 *  units at the front and proportionally less at the back, so tabletops read as
 *  tabletops rather than as rugs. */
function solid(x0: number, x1: number, z0: number, z1: number, h: number) {
  const lift = (z: number) => h * (1 - z * 0.42);
  return {
    top: `${px(x0, z0)},${py(z0) - lift(z0)} ${px(x1, z0)},${py(z0) - lift(z0)} ${px(x1, z1)},${py(z1) - lift(z1)} ${px(x0, z1)},${py(z1) - lift(z1)}`,
    front: `${px(x0, z0)},${py(z0) - lift(z0)} ${px(x1, z0)},${py(z0) - lift(z0)} ${px(x1, z0)},${py(z0)} ${px(x0, z0)},${py(z0)}`,
  };
}

/** The four workshop formats, each drawn as the room it is held in, and the
 *  four rooms travelled through sideways while the section holds.
 *
 *  WHY A ROOM, AND WHY IN PERSPECTIVE. The four formats are not four products.
 *  They are the same subject at four shapes of session, and what separates them
 *  is who is in the room and how the room is laid out: a half day faces a board,
 *  a full day breaks into tables and works, a leadership session is one table,
 *  a multi-session programme is the same room returned to. Drawn flat and small
 *  that reads as four diagrams. Drawn as a room you are standing at the back of,
 *  it reads as a place you would be sitting in, which is what is being sold.
 *
 *  NO PEOPLE, NO HEADCOUNT. The document declines to give one: FAQ 8 says only
 *  that "hands-on workshops work best with smaller groups". So the rooms hold
 *  furniture, a board and orientation, and nothing in them can be counted. The
 *  clause each arrangement was read from is printed with it, so the picture is
 *  checkable against the source.
 *
 *  THE STAGE HOLDS, THE PAGE DOES NOT STOP. A tall track with a sticky stage and
 *  a track that travels sideways, not a GSAP pin: the reader keeps their scroll.
 *  Below lg, and under prefers-reduced-motion, and before hydration, the four
 *  render as a plain stacked run, which is what the server sends. */
export function WorkshopStage({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Format[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  /** The track travels one panel width per room, so room i is centred at
   *  progress i/(n-1). */
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(items.length - 1) * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.round(p * (items.length - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  const staged = enhanced && !reduced;

  /** Jump the scroll to a room's own slice of the track. Four viewports is a
   *  lot to ask of someone who wants the leadership session, and it also makes
   *  the header's hover states honest: they now respond to something a reader
   *  can actually do. */
  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    /* getBoundingClientRect, not offsetTop: the section is position:relative and
       is therefore the track's offsetParent. */
    const start = el.getBoundingClientRect().top + window.scrollY;
    const run = el.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({ top: start + (i / (items.length - 1)) * run, behavior: "smooth" });
  };

  return (
    <section id={id} data-section={label} className="relative">
      <Container className="relative pt-14 sm:pt-16">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Four rooms, one subject" }}
          className="mb-10"
        />
      </Container>

      {staged ? (
        <div ref={track} style={{ height: `${items.length * VH_PER + 100}vh` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            {/* Which room, and how far along. */}
            <Container className="w-full">
              <div className="flex items-end gap-2">
                {items.map((f, i) => (
                  <button
                    key={f.no}
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "true" : undefined}
                    className="group min-w-0 flex-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <p
                      className={cn(
                        "font-display truncate text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-colors duration-500 motion-reduce:transition-none",
                        i === active ? "text-brand-text" : "text-ash group-hover:text-snow",
                      )}
                    >
                      <span className="tabular-nums">{f.no}</span>
                      <span className="ml-2">{f.title}</span>
                    </p>
                    <span
                      className={cn(
                        "mt-2 block h-[3px] w-full transition-colors duration-500 motion-reduce:transition-none",
                        i === active
                          ? "bg-brand"
                          : i < active
                            ? "bg-brand/30"
                            : "bg-line group-hover:bg-ash",
                      )}
                    />
                  </button>
                ))}
              </div>
            </Container>

            {/* The rooms, travelling sideways. */}
            <motion.div className="mt-8 flex" style={{ x }}>
              {items.map((f, i) => (
                <div key={f.no} className="w-screen shrink-0 px-6 sm:px-10">
                  <div className="mx-auto grid max-w-[1320px] items-center gap-x-14 lg:grid-cols-[minmax(0,1.32fr)_minmax(0,0.85fr)]">
                    <Room kind={f.room} on={i === active} />
                    <div>
                      <p className="text-[0.9375rem] leading-relaxed text-fog">{f.body}</p>
                      <p className="mt-4 border-l-2 border-brand/40 pl-4 text-[0.9375rem] leading-relaxed text-fog">
                        {f.note}
                      </p>
                      <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                          Room read from
                        </span>
                        <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-brand-text">
                          {f.cite}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <Container className="pb-14 sm:pb-16">
          <ol className="space-y-16">
            {items.map((f) => (
              <li key={f.no}>
                <p className="font-display text-[0.625rem] font-bold tabular-nums text-brand-text">
                  {f.no}
                </p>
                <h3 className="font-display mt-2 text-[clamp(1.25rem,4.5vw,1.8rem)] font-extrabold uppercase leading-[1.1] text-snow">
                  {f.title}
                </h3>
                <div className="mt-6">
                  <Room kind={f.room} on still />
                </div>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-fog">{f.body}</p>
                <p className="mt-4 border-l-2 border-brand/40 pl-4 text-[0.9375rem] leading-relaxed text-fog">
                  {f.note}
                </p>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                    Room read from
                  </span>
                  <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-brand-text">
                    {f.cite}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      )}
    </section>
  );
}

/* --------------------------------------------------------------- the room -- */

/** One room, seen from the back. Same box every time, so only the arrangement
 *  differs, which is the only thing the document distinguishes. */
function Room({ kind, on, still = false }: { kind: Format["room"]; on: boolean; still?: boolean }) {
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";
  /** Four rooms render at once inside one document, so the gradient ids have to
   *  differ or every room paints with the first one's. */
  const gid = `room-${kind}`;

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        aria-hidden
        style={{ display: "block" }}
      >
        <defs>
          {/* Front-to-back falloff on the floor, so the room has a direction of
              light instead of five surfaces at one value. Shading is painted as
              void over ink-3 rather than as a chosen grey, so it inverts with
              the theme like every other surface on the site. */}
          <linearGradient id={`${gid}-floor`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--color-void)" stopOpacity="0.30" />
            <stop offset="100%" stopColor="var(--color-void)" stopOpacity="0.04" />
          </linearGradient>
          {/* The board is the only thing in the room that is lit. */}
          <radialGradient id={`${gid}-lamp`} cx="0.5" cy="0.42" r="0.55">
            <stop offset="0%" stopColor="var(--color-snow)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-snow)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Every surface starts at the top surface tone, then takes its own
            amount of shade: ceiling darkest, side walls next, back wall lit. */}
        <rect x="0" y="0" width={W} height={H} fill="var(--color-ink-3)" />
        <polygon
          points={`0,${FRONT_TOP} ${px(-1, 1)},${BACK_TOP} ${px(1, 1)},${BACK_TOP} ${W},${FRONT_TOP}`}
          fill="var(--color-void)"
          fillOpacity="0.16"
        />
        <polygon
          points={`0,${FRONT_TOP} ${px(-1, 1)},${BACK_TOP} ${px(-1, 1)},${BACK_Y} 0,${FRONT_Y}`}
          fill="var(--color-void)"
          fillOpacity="0.10"
        />
        <polygon
          points={`${W},${FRONT_TOP} ${px(1, 1)},${BACK_TOP} ${px(1, 1)},${BACK_Y} ${W},${FRONT_Y}`}
          fill="var(--color-void)"
          fillOpacity="0.055"
        />
        <polygon points={quad(-1, 1, 0, 1)} fill={`url(#${gid}-floor)`} />
        {/* The wall-to-floor and wall-to-ceiling creases. */}
        {[
          `M0,${FRONT_TOP} L${px(-1, 1)},${BACK_TOP}`,
          `M${W},${FRONT_TOP} L${px(1, 1)},${BACK_TOP}`,
          `M0,${FRONT_Y} L${px(-1, 1)},${BACK_Y}`,
          `M${W},${FRONT_Y} L${px(1, 1)},${BACK_Y}`,
          `M${px(-1, 1)},${BACK_TOP} L${px(1, 1)},${BACK_TOP}`,
          `M${px(-1, 1)},${BACK_Y} L${px(1, 1)},${BACK_Y}`,
          `M${px(-1, 1)},${BACK_TOP} L${px(-1, 1)},${BACK_Y}`,
          `M${px(1, 1)},${BACK_TOP} L${px(1, 1)},${BACK_Y}`,
        ].map((d) => (
          <path key={d} d={d} stroke="var(--color-line)" strokeWidth="1.25" fill="none" />
        ))}
        {/* What the board throws back into the room. */}
        <rect
          x={px(-1, 1)}
          y={BACK_TOP}
          width={px(1, 1) - px(-1, 1)}
          height={BACK_Y - BACK_TOP}
          fill={`url(#${gid}-lamp)`}
        />

        {/* Floor grid, so the depth is legible rather than asserted. */}
        {[0.2, 0.4, 0.6, 0.8].map((z) => (
          <line
            key={z}
            x1={px(-1, z)}
            y1={py(z)}
            x2={px(1, z)}
            y2={py(z)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        ))}
        {[-0.66, -0.33, 0, 0.33, 0.66].map((x) => (
          <line
            key={x}
            x1={px(x, 0)}
            y1={py(0)}
            x2={px(x, 1)}
            y2={py(1)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
        ))}

        {/* The board on the back wall. Every format has one; what changes is
            what the room in front of it is doing. */}
        <rect
          x={px(-0.62, 1)}
          y={BACK_TOP + 26}
          width={px(0.62, 1) - px(-0.62, 1)}
          height="64"
          fill="var(--color-ink-2)"
          stroke={mark}
          strokeWidth="2"
        />
        {/* Something written on it, always working. */}
        {[0, 1, 2].map((r) => (
          <rect
            key={r}
            className="ci-grow-x"
            x={px(-0.55, 1)}
            y={BACK_TOP + 40 + r * 15}
            width={(px(0.55, 1) - px(-0.55, 1)) * [0.82, 0.6, 0.7][r]}
            height="5"
            rx="2.5"
            fill={mark}
            fillOpacity={on ? 0.6 : 0.3}
            style={still ? { animation: "none" } : { animationDelay: `${r * 0.9}s` }}
          />
        ))}

        <Furniture kind={kind} on={on} />
      </svg>
    </div>
  );
}

/** A tabletop and its front edge, so it stands up off the floor. */
function Slab({
  x0,
  x1,
  z0,
  z1,
  h,
  tone,
  edge,
}: {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  h: number;
  tone: string;
  edge: string;
}) {
  const s = solid(x0, x1, z0, z1, h);
  return (
    <>
      <polygon points={s.front} fill={edge} fillOpacity="0.9" />
      <polygon points={s.top} fill={tone} stroke="var(--color-line)" strokeWidth="1" />
    </>
  );
}

function Furniture({ kind, on }: { kind: Format["room"]; on: boolean }) {
  const top = "var(--color-ink-2)";
  const edge = "var(--color-void)";
  const mark = on ? "var(--color-brand)" : "var(--color-ash)";

  if (kind === "rows") {
    /* Faces the board. Long benches, an aisle down the middle, all one way. */
    return (
      <>
        {[0.14, 0.4, 0.66].map((z) => (
          <g key={z}>
            <Slab x0={-0.78} x1={-0.08} z0={z} z1={z + 0.13} h={26} tone={top} edge={edge} />
            <Slab x0={0.08} x1={0.78} z0={z} z1={z + 0.13} h={26} tone={top} edge={edge} />
          </g>
        ))}
      </>
    );
  }

  if (kind === "clusters") {
    /* Breaks into tables and works. The mark on each table is the work. */
    const TABLES: [number, number, number][] = [
      [-0.74, -0.16, 0.14],
      [0.16, 0.74, 0.14],
      [-0.66, -0.14, 0.52],
      [0.14, 0.66, 0.52],
    ];
    return (
      <>
        {TABLES.map(([x0, x1, z]) => {
          const s = solid(x0 + 0.14, x1 - 0.14, z + 0.05, z + 0.14, 44);
          return (
            <g key={`${x0}-${z}`}>
              <Slab x0={x0} x1={x1} z0={z} z1={z + 0.2} h={30} tone={top} edge={edge} />
              <polygon points={s.top} fill={mark} fillOpacity={on ? 0.5 : 0.28} />
            </g>
          );
        })}
      </>
    );
  }

  if (kind === "table") {
    /* One table, and the decision it is there to make. */
    const s = solid(-0.24, 0.24, 0.36, 0.5, 46);
    return (
      <>
        <Slab x0={-0.56} x1={0.56} z0={0.3} z1={0.62} h={32} tone={top} edge={edge} />
        <polygon points={s.top} fill={mark} fillOpacity={on ? 0.5 : 0.28} />
      </>
    );
  }

  /* The same room, returned to over an agreed period: the tables that are
     there now, and the outline of the same tables at two earlier sittings. */
  return (
    <>
      {[0.62, 0.44].map((z, k) => (
        <polygon
          key={z}
          points={solid(-0.6, 0.6, z, z + 0.16, 30).top}
          fill="none"
          stroke="var(--color-ash)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          opacity={0.32 + k * 0.14}
        />
      ))}
      <Slab x0={-0.62} x1={0.62} z0={0.16} z1={0.34} h={30} tone={top} edge={edge} />
      <polygon
        points={solid(-0.2, 0.2, 0.21, 0.3, 44).top}
        fill={mark}
        fillOpacity={on ? 0.5 : 0.28}
      />
    </>
  );
}
