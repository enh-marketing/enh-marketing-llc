import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Why Choose ENH Marketing for Automotive Digital Marketing?"
 *
 *  EIGHT CLAIMS, SET AS CLAIMS. Each is a single assertion in the document with
 *  no supporting paragraph, so nothing here pretends otherwise: no card, no
 *  icon, no invented sub-line. The claim itself takes the scale that a heading
 *  and a body paragraph would have taken between them.
 *
 *  THE SPECIFICS INSIDE EACH CLAIM ARE THE SUBSTANCE. "vehicle research, buying
 *  intent and service demand" and "calls, website visits and direction
 *  requests" are what a buyer is actually reading for, and they are short
 *  enough to read inside their own sentence — so they are marked where they
 *  stand rather than lifted into chips, which would print them twice.
 *
 *  THE LAST TWO PARAGRAPHS ARE NOT MORE CLAIMS. One tells the reader what to
 *  ask every agency they are comparing, including this one; the other says how
 *  wide the engagement can be. They sit under a rule, at a different weight,
 *  because they are addressed to a different question. */
export function ReasonRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  items,
  itemMarks,
  tail,
  tailMark,
  scope,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string[];
  items: string[];
  itemMarks: string[][];
  tail: string;
  tailMark: string[];
  scope: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={lead} mark={leadMark} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        <ul className="grid gap-x-14 gap-y-0 border-t border-line lg:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={item}
              className="group relative flex items-start gap-5 border-b border-line py-6 pl-4 transition-colors duration-500 motion-reduce:transition-none"
            >
              {/* One claim lit at a time down the run, on `ci-blink`. */}
              <span
                aria-hidden
                className="ci-blink absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r bg-brand"
                style={{ animationDelay: `${(i * 6400) / items.length}ms` }}
              />
              <span
                aria-hidden
                className="font-display shrink-0 text-[1.75rem] font-extrabold leading-none text-stroke opacity-40 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[clamp(0.95rem,1.5vw,1.15rem)] leading-[1.5] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                <Marked
                  text={item}
                  mark={itemMarks[i]}
                  className="font-semibold text-snow group-hover:text-brand-text"
                />
              </p>
            </li>
          ))}
        </ul>

        {/* What to ask every agency on the shortlist, and how far this one can
            be asked to go. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Rise>
            <p className="font-display border-l-2 border-brand pl-6 text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.18] text-snow sm:pl-8">
              <Marked text={tail} mark={tailMark} className="text-brand" />
            </p>
          </Rise>
          <Rise delay={0.1}>
            <p className="text-sm leading-relaxed text-fog sm:text-base">{scope}</p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
