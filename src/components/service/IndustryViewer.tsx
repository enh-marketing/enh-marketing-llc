"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

/** The industries, as a viewer you operate.
 *
 *  WHAT WAS ACTUALLY WRONG WITH THE EARLIER VERSIONS. Not the container, and
 *  not the scale -- the picture. Every one of them drew its industries as thin
 *  outlines: a hairline derrick, a hairline crane, a hairline gear. Eleven
 *  wireframes at any size read as clip art, and no amount of arranging them
 *  fixes that. These are built the other way round: filled, in three tonal
 *  layers on a horizon, with the subject in brand over a soft wash, which is
 *  what makes a drawing look like a picture instead of a diagram.
 *
 *  AND IT IS SOMETHING TO USE. A selector on one side, a frame on the other,
 *  and eleven scenes that change in it. The frame carries the furniture a real
 *  one has -- corner marks, a horizon, an index, a position bar -- and the three
 *  layers move at different rates under the pointer, so it has depth rather than
 *  being flat art. Arrow keys work, taps work, and scrolling the list plays the
 *  sequence through for a reader who never points at anything.
 *
 *  NOTHING IS RANKED OR ADDED. Eleven scenes, in the document's own order, all
 *  the same size. The drawings are conventional silhouettes for the industries
 *  the document names: iconography, never a claim about the work. This project
 *  has no photography, so the picture had to be drawn -- the fix was to draw it
 *  properly.
 *
 *  MOTION. The parallax and the crossfade are the reader's, and both are
 *  cancelled under prefers-reduced-motion. Every name is in the page whether or
 *  not any of it runs. */

/** Each scene is drawn on one horizon so the eleven read as one place seen
 *  eleven ways. Layer 0 is far, 1 is the subject, 2 is the foreground. */
function Scene({ i, layer }: { i: number; layer: 0 | 1 | 2 }) {
  if (layer === 0) {
    const far: Record<number, React.JSX.Element> = {
      0: <path d="M0 330l120-70 90 44 110-58 96 52 120-66 140 72 124-40V330z" className="fill-ash/12" />,
      1: <path d="M60 330V196h84v134zM620 330V174h96v156z" className="fill-ash/12" />,
      2: <path d="M40 330v-72h130v72zM610 330v-58h150v58z" className="fill-ash/12" />,
      3: <path d="M56 330V180h108v150zM640 330V206h116v124z" className="fill-ash/12" />,
      4: <path d="M40 330V214h140v116zM636 330V228h124v102z" className="fill-ash/12" />,
      5: <path d="M20 330V140h70v190zM110 330V196h56v134zM680 330V126h80v204z" className="fill-ash/12" />,
      6: <path d="M36 330V204h116v126zM646 330V178h114v152z" className="fill-ash/12" />,
      7: <path d="M46 330V192h124v138zM650 330V220h110v110z" className="fill-ash/12" />,
      8: <path d="M36 330V208h122v122zM656 330V190h104v140z" className="fill-ash/12" />,
      9: <path d="M46 330V178h114v152zM650 330V222h110v108z" className="fill-ash/12" />,
      10: <path d="M24 330V200h122v130zM672 330V178h96v152z" className="fill-ash/12" />,
    };
    return far[i] ?? null;
  }

  if (layer === 1) {
    const mid: Record<number, React.JSX.Element> = {
      /* 01 Oil, gas and energy — a derrick and its tanks. */
      0: (
        <>
          <path d="M400 60l72 270h-144z" className="fill-brand/55" />
          <path d="M352 236h96v14h-96zM366 176h68v13h-68z" className="fill-ink-2/70" />
          <rect x="392" y="34" width="16" height="30" rx="3" className="fill-brand" />
          <path d="M516 330v-64a34 34 0 0168 0v64z" className="fill-ash/35" />
          <rect x="536" y="238" width="28" height="16" rx="4" className="fill-ash/45" />
          <path d="M236 330v-56h72v56z" className="fill-ash/30" />
          <path d="M236 274a36 12 0 0172 0z" className="fill-ash/45" />
        </>
      ),
      /* 02 Construction and engineering — a crane over a rising frame. */
      1: (
        <>
          <path d="M300 330V72h18v258z" className="fill-brand/55" />
          <path d="M226 62h236v16H226z" className="fill-brand/55" />
          <path d="M300 62l38-24 6 12-26 16z" className="fill-brand" />
          <rect x="446" y="78" width="8" height="72" className="fill-brand/45" />
          <rect x="414" y="150" width="72" height="46" rx="4" className="fill-brand" />
          <path d="M498 330V162h108v168z" className="fill-ash/35" />
          <path d="M514 186h76v14h-76zM514 220h76v14h-76zM514 254h76v14h-76z" className="fill-ink-2/60" />
        </>
      ),
      /* 03 Logistics and supply chain — containers and the truck under them. */
      2: (
        <>
          <rect x="250" y="150" width="180" height="58" rx="5" className="fill-brand/55" />
          <rect x="250" y="216" width="180" height="58" rx="5" className="fill-ash/40" />
          <path d="M286 150v58M322 150v58M358 150v58M394 150v58M286 216v58M322 216v58M358 216v58M394 216v58" className="stroke-ink-2/60" strokeWidth="4" />
          <rect x="458" y="196" width="128" height="78" rx="6" className="fill-ash/30" />
          <path d="M586 230h44l24 32v12h-68z" className="fill-brand/55" />
          <circle cx="500" cy="296" r="22" className="fill-ash/55" />
          <circle cx="614" cy="296" r="22" className="fill-ash/55" />
          <circle cx="500" cy="296" r="9" className="fill-ink-2" />
          <circle cx="614" cy="296" r="9" className="fill-ink-2" />
        </>
      ),
      /* 04 Healthcare and clinics — the block, and the trace across it. */
      3: (
        <>
          <rect x="262" y="112" width="196" height="218" rx="6" className="fill-brand/55" />
          <path d="M344 156h32v34h34v32h-34v34h-32v-34h-34v-32h34z" className="fill-ink-2" />
          <rect x="286" y="262" width="48" height="46" rx="4" className="fill-ink-2/55" />
          <rect x="386" y="262" width="48" height="46" rx="4" className="fill-ink-2/55" />
          <path d="M486 236h34l20-52 26 104 18-52h60" className="stroke-brand" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
      /* 05 Education and training — a board and the room in front of it. */
      4: (
        <>
          <rect x="238" y="96" width="266" height="146" rx="6" className="fill-brand/55" />
          <rect x="270" y="132" width="150" height="14" rx="7" className="fill-ink-2/70" />
          <rect x="270" y="166" width="96" height="12" rx="6" className="fill-ink-2/50" />
          <path d="M214 330v-24h314v24z" className="fill-ash/40" />
          <path d="M246 306v-22h60v22zM342 306v-22h60v22zM438 306v-22h60v22z" className="fill-ash/28" />
          <path d="M560 214l72-32 72 32-72 32z" className="fill-brand/45" />
          <rect x="628" y="246" width="8" height="42" className="fill-brand/45" />
        </>
      ),
      /* 06 Real estate and development — a skyline still going up. */
      5: (
        <>
          <path d="M212 330V186h96v144z" className="fill-ash/40" />
          <path d="M324 330V112h112v218z" className="fill-brand/55" />
          <path d="M452 330V158h92v172z" className="fill-ash/30" />
          <path d="M236 210h20v18h-20zM272 210h20v18h-20zM236 250h20v18h-20zM272 250h20v18h-20z" className="fill-ink-2/50" />
          <path d="M350 142h26v22h-26zM392 142h26v22h-26zM350 190h26v22h-26zM392 190h26v22h-26zM350 238h26v22h-26zM392 238h26v22h-26z" className="fill-ink-2/60" />
          <path d="M474 186h20v18h-20zM510 186h20v18h-20zM474 226h20v18h-20zM510 226h20v18h-20z" className="fill-ink-2/45" />
          <rect x="368" y="86" width="10" height="28" className="fill-brand" />
        </>
      ),
      /* 07 Manufacturing and industrial — a gear over the line. */
      6: (
        <>
          <path d="M396 76l14 4 12-12 14 14-8 14 6 14 18 4v20l-18 4-6 14 8 14-14 14-12-12-14 4-6 18h-20l-6-18-14-4-12 12-14-14 8-14-6-14-18-4v-20l18-4 6-14-8-14 14-14 12 12 14-4 6-18h20z" className="fill-brand/55" />
          <circle cx="386" cy="150" r="26" className="fill-ink-2" />
          <rect x="216" y="272" width="340" height="16" rx="8" className="fill-ash/40" />
          <rect x="246" y="234" width="56" height="38" rx="4" className="fill-ash/35" />
          <rect x="336" y="234" width="56" height="38" rx="4" className="fill-brand/40" />
          <rect x="426" y="234" width="56" height="38" rx="4" className="fill-ash/35" />
        </>
      ),
      /* 08 Financial and professional services — a front, and what is measured. */
      7: (
        <>
          <path d="M232 130h230l-115-56z" className="fill-brand/55" />
          <rect x="246" y="130" width="26" height="180" className="fill-brand/55" />
          <rect x="296" y="130" width="26" height="180" className="fill-brand/55" />
          <rect x="346" y="130" width="26" height="180" className="fill-brand/55" />
          <rect x="396" y="130" width="26" height="180" className="fill-brand/55" />
          <rect x="222" y="310" width="250" height="20" className="fill-brand/55" />
          <rect x="518" y="248" width="34" height="82" rx="4" className="fill-ash/35" />
          <rect x="562" y="204" width="34" height="126" rx="4" className="fill-ash/45" />
          <rect x="606" y="152" width="34" height="178" rx="4" className="fill-brand/55" />
        </>
      ),
      /* 09 Hospitality and retail — a front and its awning. */
      8: (
        <>
          <path d="M234 152h250l-26 52H260z" className="fill-brand/55" />
          <rect x="260" y="204" width="198" height="126" className="fill-ash/30" />
          <rect x="300" y="240" width="52" height="90" rx="4" className="fill-ink-2/70" />
          <rect x="378" y="240" width="56" height="52" rx="4" className="fill-brand/40" />
          <path d="M520 176h140l-16 34H536z" className="fill-ash/35" />
          <rect x="536" y="210" width="108" height="120" className="fill-ash/22" />
        </>
      ),
      /* 10 Technology and corporate services — a die and its pins. */
      9: (
        <>
          <rect x="300" y="112" width="180" height="180" rx="14" className="fill-brand/55" />
          <rect x="348" y="160" width="84" height="84" rx="8" className="fill-ink-2/75" />
          <path d="M336 112V78M390 112V78M444 112V78M336 292v34M390 292v34M444 292v34M300 148h-34M300 202h-34M300 256h-34M480 148h34M480 202h34M480 256h34" className="stroke-brand/60" strokeWidth="9" strokeLinecap="round" />
          <rect x="560" y="150" width="86" height="180" rx="6" className="fill-ash/32" />
          <path d="M576 176h54v14h-54zM576 208h54v14h-54zM576 240h54v14h-54z" className="fill-ink-2/60" />
        </>
      ),
      /* 11 Events and exhibitions — a stage under its lights. */
      10: (
        <>
          <rect x="206" y="264" width="380" height="24" rx="4" className="fill-brand/55" />
          <rect x="230" y="288" width="332" height="42" className="fill-ash/28" />
          <rect x="242" y="140" width="308" height="124" rx="6" className="fill-ash/32" />
          <path d="M186 62l40 52-18 12-40-52zM606 62l-40 52 18 12 40-52z" className="fill-brand/45" />
          <rect x="382" y="44" width="28" height="46" rx="6" className="fill-brand" />
          <circle cx="330" cy="200" r="24" className="fill-brand/60" />
          <circle cx="462" cy="200" r="24" className="fill-brand/60" />
        </>
      ),
    };
    return mid[i] ?? null;
  }

  return (
    <>
      <rect x="0" y="330" width="800" height="120" className="fill-ash/8" />
      <path d="M0 330h800" className="stroke-line" strokeWidth="2" />
      {i % 3 === 0 && (
        <path d="M60 450v-56h26v56zM110 450v-40h20v40zM690 450v-48h24v48z" className="fill-ash/18" />
      )}
      {i % 3 === 1 && <path d="M0 396h240M560 396h240" className="stroke-ash/25" strokeWidth="6" strokeLinecap="round" />}
      {i % 3 === 2 && (
        <path d="M70 450a44 44 0 0188 0zM640 450a40 40 0 0180 0z" className="fill-ash/16" />
      )}
    </>
  );
}

export function IndustryViewer({
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
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
}) {
  const [shot, setShot] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const held = useRef(false);

  /* Scrolling the list plays the sequence for a reader who never points at
     anything; a pointer on the list takes over while it is there. */
  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || held.current) continue;
          setShot(Number((e.target as HTMLElement).dataset.row));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const move = (e: React.KeyboardEvent) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? Math.min(shot + 1, items.length - 1)
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? Math.max(shot - 1, 0)
          : null;
    if (next === null) return;
    e.preventDefault();
    setShot(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setPan({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-8">
          {/* The selector. */}
          <ol
            ref={listRef}
            onKeyDown={move}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") held.current = true;
            }}
            onPointerLeave={() => {
              held.current = false;
            }}
            className="order-2 overflow-hidden rounded-2xl border border-line bg-ink-3 lg:order-1"
          >
            {items.map((name, i) => {
              const on = i === shot;
              return (
                <li
                  key={name}
                  data-row={i}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShot(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setShot(i);
                    }}
                    onFocus={() => setShot(i)}
                    aria-pressed={on}
                    className={cn(
                      "group relative flex w-full items-center gap-4 border-b border-line px-5 py-3.5 text-left transition-colors duration-300 last:border-b-0 motion-reduce:transition-none",
                      on ? "bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)]" : "hover:bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-400 ease-out motion-reduce:transition-none",
                        on ? "scale-y-100 bg-brand" : "scale-y-0 bg-brand",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 text-[0.62rem] font-semibold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                        on ? "text-brand" : "text-ash",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[0.95rem] font-extrabold uppercase leading-[1.18] transition-colors duration-300 motion-reduce:transition-none",
                        on ? "text-brand" : "text-snow group-hover:text-brand",
                      )}
                    >
                      {name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The viewer. */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
                {/* Header strip. */}
                <div aria-hidden className="flex items-center gap-3 border-b border-line px-5 py-3">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-brand" />
                  <span className="font-display text-[0.62rem] font-bold tabular-nums text-brand">
                    {String(shot + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="ml-auto flex gap-1">
                    {items.map((k, i) => (
                      <span
                        key={k}
                        className={cn(
                          "h-1 rounded-full transition-all duration-400 motion-reduce:transition-none",
                          i === shot ? "w-5 bg-brand" : "w-1.5 bg-line",
                        )}
                      />
                    ))}
                  </span>
                </div>

                <div
                  onPointerMove={track}
                  onPointerLeave={() => setPan({ x: 0, y: 0 })}
                  className="relative aspect-video w-full bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]"
                >
                  {items.map((name, i) => (
                    <svg
                      key={name}
                      viewBox="0 0 800 450"
                      role={i === shot ? "img" : undefined}
                      aria-hidden={i !== shot}
                      aria-label={i === shot ? name : undefined}
                      className={cn(
                        "absolute inset-0 h-full w-full transition-opacity duration-500 motion-reduce:transition-none",
                        i === shot ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <g
                        style={{ transform: `translate(${pan.x * 12}px, ${pan.y * 7}px)` }}
                        className="transition-transform duration-500 ease-out motion-reduce:transition-none"
                      >
                        <Scene i={i} layer={0} />
                      </g>
                      <g
                        style={{ transform: `translate(${pan.x * 26}px, ${pan.y * 14}px)` }}
                        className="transition-transform duration-500 ease-out motion-reduce:transition-none"
                      >
                        <Scene i={i} layer={1} />
                      </g>
                      <g
                        style={{ transform: `translate(${pan.x * 44}px, ${pan.y * 22}px)` }}
                        className="transition-transform duration-500 ease-out motion-reduce:transition-none"
                      >
                        <Scene i={i} layer={2} />
                      </g>
                    </svg>
                  ))}

                  {/* The frame's furniture. */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-brand/40" />
                    <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-brand/40" />
                    <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-brand/40" />
                    <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-brand/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
