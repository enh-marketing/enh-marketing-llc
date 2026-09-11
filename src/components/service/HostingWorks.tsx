import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard, CardTitle, CardBody } from "@/components/ui/SurfaceCard";
import { HostingPlate } from "@/components/service/HostingPlate";
import type { Cover } from "@/content/services/web-hosting";

/** The seven covered areas, on the house card at seven widths.
 *
 *  WHY THE HOUSE CARD AND NOT AN INVENTED FRAME. DESIGN.md records four
 *  rejected attempts at giving a list its own shape, and the rule they yielded:
 *  SurfaceCard's devices, the spotlight, the top-edge wipe, the ghost numeral,
 *  the one-pixel lift, are the material rather than a fallback. What makes a
 *  page's version its own is not the frame, it is what the page's own document
 *  puts inside it. Here that is seven different drawings, one per entry, and
 *  seven different widths, so the run is never a grid of the same tile
 *  repeated: 7 and 5, then 4 and 4 and 4, then 5 and 7.
 *
 *  EVERY SERVICE NAME IS LEGIBLE AT ONCE, which is rule 1: a reader who cannot
 *  see what is being sold has been failed before the drawings are judged.
 *  Nothing here is behind a selection, a pin or a scroll.
 *
 *  THE MIDDLE ROW IS THE NARROW ONE ON PURPOSE. SSL, backups and monitoring are
 *  the three the banner sells by name and the three a reader scans for, so they
 *  sit together at equal width where they can be compared. The two entries that
 *  carry the page's arguments, the environment configured around the site and
 *  the support whose scope has an edge, take the full-width positions that open
 *  and close the run. */

/** Tailwind needs the class written out, so the span cannot be interpolated. */
const SPAN: Record<Cover["span"], string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
};

/** The section's own mark: the ground, and the seven places work happens on and
 *  under it. The arrangement's shape before the cards draw it in full. */
function WorksMark() {
  return (
    <div className="hidden shrink-0 lg:block">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="A surface line with hatched ground beneath it, three marks standing on the surface and four set into the ground below."
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        <line x1="16" y1="96" x2="184" y2="96" stroke="var(--color-ash)" strokeWidth="1.4" />
        <rect x="16" y="96" width="168" height="88" fill="url(#wh-plate-hatch)" />
        <rect x="16" y="96" width="168" height="88" stroke="var(--color-line)" strokeWidth="1.1" fill="none" />
        {[44, 100, 156].map((x) => (
          <rect key={x} x={x - 16} y="62" width="32" height="34" rx="3" stroke="var(--color-line)" strokeWidth="1.2" fill="var(--color-ink-3)" />
        ))}
        {[
          [40, 118],
          [96, 118],
          [152, 118],
          [96, 152],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 14} y={y - 9} width="28" height="18" rx="2" stroke="var(--color-ash)" strokeWidth="1.1" fill="var(--color-ink-2)" />
            <rect x={x - 9} y={y - 4} width="18" height="8" rx="1" fill="var(--color-brand)" className="ci-blink" style={{ animationDelay: `${i * 1.5}s` }} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function HostingWorks({
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
  items: Cover[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} markNode={<WorksMark />} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          {items.map((item, i) => (
            <div key={item.no} className={SPAN[item.span]}>
              <SurfaceCard index={item.no} delay={(i % 3) * 0.06} className="flex h-full flex-col">
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
                {/* The plate sits at the foot of the card rather than above the
                    title, so every one of the seven names is on the same line
                    across the row and the seven drawings align along one base
                    like plates on a survey sheet. It also means a card left
                    tall by a shorter neighbour has its drawing in the space
                    rather than a hole. */}
                <div className="mt-auto rounded-xl border border-line bg-ink-3/60 px-4 pb-3 pt-4 sm:px-5">
                  <HostingPlate plate={item.plate} />
                </div>
              </SurfaceCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
