import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Why Choose ENH Marketing for Healthcare Marketing?" — seven claims, and
 *  three questions that are not ours to answer.
 *
 *  THE SECTION DOES NOT CLOSE ON A CLAIM, BECAUSE THE DOCUMENT DOES NOT. Its
 *  last full sentence before the scope line is this: "When comparing a
 *  healthcare SEO consultant, healthcare SEO firm or full-service agency,
 *  providers should check who creates the treatment content, how it is approved
 *  and which patient actions are being measured." Three questions to ask of
 *  anybody on that list, including us. On a page whose own limit is "without
 *  creating confusion or making unsupported promises", that sentence is the
 *  most valuable thing in the section and it is the reason this is a check
 *  register rather than a list of reasons.
 *
 *  SO THE DRAWING IS SEVEN TICKS AGAINST THREE EMPTY BOXES. Each of the seven
 *  statements is a thing this agency does, and each draws its own tick. The
 *  three checks are drawn as three boxes with nothing in them, because they are
 *  the reader's to tick and this page cannot tick them on their behalf. Nothing
 *  is labelled on either: the seven ticks stand on the seven sentences and the
 *  three boxes sit directly above the sentence that names all three.
 *
 *  THE THREE ARE MARKED IN THEIR OWN SENTENCE AND NOT LIFTED OUT. Pulling them
 *  into a list beside the sentence would print the same three phrases twice,
 *  which is the rule `Marked` exists to keep. */

const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** A tick, drawing itself. */
function Tick() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden focusable="false" className="block h-5 w-5" fill="none">
      <circle cx="11" cy="11" r="10" stroke={ASH} strokeWidth="1" strokeOpacity="0.4" />
      <path
        d="M5.5 11.4 L9.4 15.2 L16.6 7"
        pathLength="100"
        stroke={BRAND}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ci-draw"
      />
    </svg>
  );
}

/** Three boxes with nothing in them. */
function OpenChecks() {
  return (
    <svg viewBox="0 0 140 34" aria-hidden focusable="false" className="block h-8 w-[140px]" fill="none">
      {[3, 53, 103].map((x) => (
        <rect
          key={x}
          x={x}
          y="4"
          width="26"
          height="26"
          rx="4"
          stroke={ASH}
          strokeWidth="1.4"
          strokeOpacity="0.7"
          strokeDasharray="5 4"
        />
      ))}
    </svg>
  );
}

export function CheckRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  items,
  itemMarks,
  checkStem,
  checks,
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
  checkStem: string;
  /** The three, marked inside `checkStem` rather than listed beside it. */
  checks: readonly string[];
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

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* THE SEVEN. Each draws its own tick. */}
          <ol className="border-t border-line">
            {items.map((item, i) => (
              <li
                key={item}
                className="group flex items-start gap-5 border-b border-line py-6 transition-colors duration-500 motion-reduce:transition-none sm:gap-6"
              >
                <span className="mt-1 shrink-0">
                  <Tick />
                </span>
                <div className="min-w-0">
                  <p className="font-display max-w-[44ch] text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    <Marked text={item} mark={itemMarks[i]} className="text-brand-text" />
                  </p>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* THE THREE. Not ours to tick. */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <div className="rounded-[1.25rem] border border-line bg-ink-2 p-7 sm:p-9">
              <OpenChecks />
              <p className="mt-7 text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.5] text-fog">
                <Marked
                  text={checkStem}
                  mark={checks as string[]}
                  className="font-semibold text-brand-text"
                />
              </p>
              <p className="mt-7 border-t border-line pt-7 text-sm leading-relaxed text-fog sm:text-base">
                <Marked text={tail} mark={tailMark} className="font-semibold text-snow" />
              </p>
            </div>
          </div>
        </div>

        <Rise delay={0.12} className="mt-12">
          <p className="max-w-[76ch] text-sm leading-relaxed text-fog sm:text-base">{scope}</p>
        </Rise>
      </Container>
    </section>
  );
}
