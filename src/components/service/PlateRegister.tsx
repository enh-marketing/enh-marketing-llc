import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Who We Work With" — eight kinds of automotive business.
 *
 *  A READER ARRIVES AT THIS SECTION WITH ONE QUESTION: am I on this list? So
 *  the eight names take the scale, they are all on one screen, and none of them
 *  is given a line of body copy — the document supplies no detail on any of the
 *  eight and none is invented to balance a card.
 *
 *  THE PLATES ARE SIZED BY THEIR OWN NAMES. They wrap as a run rather than
 *  filling a grid, so "Used car dealers" and "Automotive product and service
 *  providers" occupy the room their words need. An eight-cell grid would either
 *  leave a hole or pad six names out to the width of the longest, and equal
 *  cells would also say the eight are interchangeable — which the section's own
 *  closing sentence denies.
 *
 *  THE FILL IS A BRAND TINT, NOT A SURFACE TOKEN, AND THAT IS DELIBERATE.
 *  Section banding assigns ink-2 and ink-3 to sections by position, so a plate
 *  painted ink-2 disappears into its own section on any page where this one
 *  lands on an ink-2 band -- which is exactly where it lands today. A tint over
 *  whatever is behind it shifts both tones by the same amount and cannot vanish.
 *  Same fix, same reason, as the equivalent section on the hospitality page.
 *
 *  THE NOTE IS THE PAGE'S THESIS, ONE LAST TIME. "A dealership promoting
 *  specific vehicles needs a different campaign structure from a repair shop
 *  targeting urgent local searches" is the sentence the banner drawing and the
 *  two business chapters were both built on, so the two halves it contrasts are
 *  marked where they stand and the note closes the section at weight. */
export function PlateRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  note,
  noteMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the run. */
  lead: string;
  items: { label: string }[];
  note: string;
  noteMark: string[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        <Rise>
          <ul className="flex flex-wrap gap-4">
            {items.map((item, i) => (
              <li
                key={item.label}
                className="group flex min-w-0 items-stretch overflow-hidden rounded-xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1 hover:border-brand/55 hover:bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* The index sits in its own strip, the way the country band
                    sits on a plate: it is a position in the list, not a rank. */}
                <span className="relative flex items-center overflow-hidden bg-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text transition-colors duration-500 group-hover:bg-brand group-hover:text-ink-3 motion-reduce:transition-none">
                  {/* One plate lit at a time down the run: the same duration on
                      every strip with a delay of duration over eight, which is
                      what `ci-blink` is for. It rests lit. */}
                  <span
                    aria-hidden
                    className="ci-blink absolute inset-y-0 left-0 w-[3px] bg-brand"
                    style={{ animationDelay: `${(i * 6400) / items.length}ms` }}
                  />
                  <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="font-display px-5 py-4 text-[clamp(1rem,1.7vw,1.35rem)] font-extrabold uppercase leading-[1.14] text-snow sm:px-6 sm:py-5">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Rise>

        <Rise delay={0.14} className="mt-12">
          <p className="font-display max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1.05rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.18] text-snow sm:pl-8">
            <Marked text={note} mark={noteMark} className="text-brand" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}
