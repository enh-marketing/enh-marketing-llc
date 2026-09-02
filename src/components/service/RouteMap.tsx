"use client";

import { SurfaceCard, CardTitle } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Route } from "@/content/services/lead-generation";
import { Crosslink } from "@/components/ui/Crosslink";

/** Two ranks of stems meeting on a bus. Stretched, never scaled: the stems
 *  must stay over the columns they belong to at every width. */
function Rules({ from, to, brandOut }: { from: number[]; to: number[]; brandOut?: boolean }) {
  const stroke = (accent?: boolean) => (accent ? "var(--color-brand)" : "var(--color-line)");
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 56"
      preserveAspectRatio="none"
      className="hidden h-14 w-full lg:block"
    >
      {from.map((x) => (
        <line
          key={`f${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="27"
          stroke={stroke()}
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <line
        x1={Math.min(...from, ...to)}
        y1="27"
        x2={Math.max(...from, ...to)}
        y2="27"
        stroke={stroke()}
        strokeWidth="0.25"
        vectorEffect="non-scaling-stroke"
      />
      {to.map((x) => (
        <line
          key={`t${x}`}
          x1={x}
          y1="27"
          x2={x}
          y2="56"
          stroke={stroke(brandOut)}
          strokeWidth={brandOut ? "0.6" : "0.25"}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** The six routes, drawn in the shape the document gives them.
 *
 *  WHY NOT SIX EQUAL CARDS. Because the document explicitly says they are not
 *  six of a kind: "The first two are end-to-end and shaped around who you sell
 *  to. The other four are the channels and assets they run on." A flat grid of
 *  six would contradict the sentence sitting directly above it.
 *
 *  So the two audience routes take the top rank, the channels they run on sit
 *  beneath them, and the rules between the ranks carry that relationship. The
 *  last route gets the bottom rank on its own because the document says it
 *  does: "Every other lead generation route on this list eventually lands
 *  here." It is drawn as the point the others converge on, and it is the only
 *  one of the six with a page built, so it is also the only one that links.
 *
 *  The rules are hidden below the large breakpoint. Once the ranks stack into
 *  one column the lines would be describing a layout that is no longer on
 *  screen, and a diagram that has stopped being true should stop being drawn.
 *
 *  Cards are the house SurfaceCard throughout: same spotlight, same wiping
 *  rule, same ghosted index. What changes between ranks is scale and density,
 *  not a second card system. */
export function RouteMap({
  endToEnd,
  channels,
}: {
  endToEnd: Route[];
  channels: Route[];
}) {
  const feeders = channels.slice(0, -1);
  const terminus = channels[channels.length - 1];

  const chips = (route: Route) =>
    route.chips && (
      <ul className="mt-4 flex flex-wrap gap-2">
        {route.chips.map((chip) => (
          <li
            key={chip}
            className="font-display rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs font-bold text-snow sm:text-sm"
          >
            {chip}
          </li>
        ))}
      </ul>
    );

  /** One route. The document writes B2C with its list first and B2B with its
   *  list in the middle, so the order of the blocks follows the source rather
   *  than being normalised into a template. */
  const body = (route: Route, size: "lead" | "compact") => (
    <>
      {route.chipsLead && (
        <p
          className={cn(
            "leading-relaxed text-fog",
            size === "lead" ? "mt-5 sm:text-lg" : "mt-4 text-sm",
          )}
        >
          {route.chipsLead}
        </p>
      )}
      {route.chipsLead && chips(route)}
      <p
        className={cn(
          "leading-relaxed text-fog",
          size === "lead" ? "mt-5 sm:text-lg" : "mt-4 text-sm",
        )}
      >
        {route.lead}
      </p>
      {!route.chipsLead && chips(route)}
      {route.tail && (
        <p
          className={cn(
            "border-l-2 border-brand/60 pl-5 leading-relaxed text-snow",
            size === "lead" ? "mt-6 sm:text-lg" : "mt-5 text-sm",
          )}
        >
          {route.tail}
        </p>
      )}
    </>
  );

  return (
    <div>
      {/* Rank one: shaped around who you sell to. */}
      <ol className="grid gap-4 lg:grid-cols-2">
        {endToEnd.map((route, i) => (
          <li key={route.no}>
            <Rise delay={i * 0.08} className="h-full">
              <SurfaceCard index={route.no} glyph={route.glyph} className="h-full">
                <CardTitle>{route.title}</CardTitle>
                {body(route, "lead")}
              </SurfaceCard>
            </Rise>
          </li>
        ))}
      </ol>

      <Rules from={[25, 75]} to={[16.67, 50, 83.33]} />

      {/* Rank two: the channels they run on, each of which also works alone. */}
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3">
        {feeders.map((route, i) => (
          <li key={route.no}>
            <Rise delay={i * 0.06} className="h-full">
              <SurfaceCard
                index={route.no}
                glyph={route.glyph}
                padding="tight"
                className="h-full"
              >
                <CardTitle className="text-base sm:text-lg">{route.title}</CardTitle>
                {body(route, "compact")}
              </SurfaceCard>
            </Rise>
          </li>
        ))}
      </ol>

      <Rules from={[16.67, 50, 83.33]} to={[50]} brandOut />

      {/* Rank three: where every other route lands. */}
      <div className="mt-4 lg:mt-0">
        <Rise delay={0.1}>
          <SurfaceCard index={terminus.no} glyph={terminus.glyph} className="border-brand/40">
            <div className="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
              <div>
                <CardTitle>
                  <Crosslink
                    href={terminus.href!}
                    className="transition-colors duration-300 hover:text-brand"
                  >
                    {terminus.title}
                  </Crosslink>
                </CardTitle>
              </div>
              <div className="mt-5 lg:mt-0">
                <p className="leading-relaxed text-fog sm:text-lg">{terminus.lead}</p>
                <p className="mt-5 border-l-2 border-brand/60 pl-5 leading-relaxed text-snow sm:text-lg">
                  {terminus.tail}
                </p>
              </div>
            </div>
          </SurfaceCard>
        </Rise>
      </div>
    </div>
  );
}
