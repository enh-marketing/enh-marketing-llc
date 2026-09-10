import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "How Digital Marketing Helps Logistics Companies Generate Enquiries" — the
 *  opening, set rather than drawn.
 *
 *  WHY THIS SECTION HAS NO PICTURE. Its content is four channels and three
 *  endings, and the banner directly above it is that drawing: a cross-dock with
 *  four inbound doors and three loads leaving. Drawing it twice would put the
 *  same claim on the screen twice within one viewport of itself. The banner
 *  draws it; this section names it.
 *
 *  TWO WEIGHTS INSIDE ONE SENTENCE, AND THAT IS THE SECTION'S ONE IDEA. The
 *  client's sentence carries two lists that are not the same kind of thing:
 *  "search visibility, paid advertising, industry content and LinkedIn
 *  activity" are things this agency does, and "shipment enquiries, RFQs and
 *  partnership discussions" are things a logistics buyer does. Marking both in
 *  one colour flattens them into one list of seven. So the channels are set in
 *  the page's foreground weight and the endings in brand, in place, with not a
 *  word moved -- which is also why neither list is lifted out into chips beside
 *  the sentence: chips would print the same seven phrases twice.
 *
 *  THE ENDINGS TAKE `brand-text`, NOT `brand`. This paragraph bottoms out at
 *  17px, and `brand` is the display-size token: it clears 3:1, not the 4.5:1
 *  that body-adjacent copy needs. `brand-text` is the one that flips with the
 *  theme and holds the ratio at this size.
 *
 *  THE FIGURES ARE THE CLIENT'S OWN REPETITION. Three of the ten in the results
 *  section are stated again here in the client's own paragraph. That repetition
 *  is theirs and is left alone rather than edited out. */

/** One sentence, two sets of phrases, two weights. `Marked` takes a single
 *  className, and nesting two of them would need one to split a string the
 *  other has already turned into elements. This is the same match-in-place
 *  contract -- verbatim, contiguous substrings, longest first, unmatched
 *  phrases simply not marked -- with a class chosen per phrase, so stripped of
 *  tags the parts still concatenate back to the source exactly. */
function TwoWeights({
  text,
  strong,
  accent,
}: {
  text: string;
  strong: readonly string[];
  accent: readonly string[];
}) {
  const all = [...strong, ...accent].filter((m) => m && text.includes(m));
  if (!all.length) return <>{text}</>;

  const escaped = all
    .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "g"));

  return (
    <>
      {parts.map((part, i) =>
        accent.includes(part) ? (
          <span
            key={i}
            className="font-semibold text-brand-text transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none"
          >
            {part}
          </span>
        ) : strong.includes(part) ? (
          <span
            key={i}
            className="font-semibold text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function EnquiryBrief({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  actions,
  channels,
  outcomes,
  structure,
  dimensions,
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
  leadMark: string[];
  actions: string;
  /** What the agency does, in the order the sentence writes them. */
  channels: readonly string[];
  /** What the buyer does. Set in brand, because these are the section's
   *  subject: the heading asks how enquiries are generated. */
  outcomes: readonly string[];
  structure: string;
  dimensions: readonly string[];
  figures: string;
  figuresMark: string[];
}) {
  /** One rail segment per phrase the sentence joins: four channels and three
   *  endings. Derived, so a copy change upstream re-divides the rail rather
   *  than leaving it wrong. */
  const joined = channels.length + outcomes.length;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
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

        {/* The sentence the banner drawing was read from, on a rail with one
            segment per phrase it joins -- four channels and three endings,
            seven segments, lit in turn. The rail is inked in ash rather than
            in --color-line because it carries meaning rather than an edge, and
            it replaces the plain brand border this block used to carry: a
            static 2px rule beside a paragraph is the whole reason a set
            section reads as a dead one. */}
        <Rise>
          <div className="group flex gap-6 sm:gap-8">
            <span
              aria-hidden
              className="flex w-[3px] shrink-0 flex-col overflow-hidden rounded-full bg-ash/35 transition-colors duration-500 group-hover:bg-ash/60 motion-reduce:transition-none"
            >
              {Array.from({ length: joined }).map((_, i) => (
                <span key={i} className="relative flex-1">
                  <span
                    className="ci-blink absolute inset-0 bg-brand"
                    style={{ animationDelay: `${(i * 6300) / joined}ms` }}
                  />
                </span>
              ))}
            </span>
            <p className="max-w-[64ch] text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.5] text-fog transition-colors duration-500 group-hover:text-ash motion-reduce:transition-none">
              <TwoWeights text={actions} strong={channels} accent={outcomes} />
            </p>
          </div>
        </Rise>

        {/* How the campaign is organised, and what that has produced. Two
            statements of different kinds, so they sit side by side at the same
            weight rather than one under the other in a single column -- and on
            one board rather than as two loose paragraphs, so the section closes
            on something with an edge. */}
        <Rise delay={0.1} className="mt-14">
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:grid-cols-2">
            {[
              {
                key: "structure",
                text: structure,
                mark: dimensions as string[],
                className:
                  "font-semibold text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none",
              },
              {
                key: "figures",
                text: figures,
                mark: figuresMark,
                className:
                  "font-semibold text-brand-text transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none",
              },
            ].map((block, i) => (
              <li
                key={block.key}
                className="group relative flex flex-col justify-between bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-9"
              >
                <span
                  aria-hidden
                  className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                  style={{ animationDelay: `${i * 3200}ms` }}
                />
                <p className="max-w-[52ch] text-base leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none sm:text-lg">
                  <Marked text={block.text} mark={block.mark} className={block.className} />
                </p>
                <span
                  aria-hidden
                  className="mt-8 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none"
                />
              </li>
            ))}
          </ul>
        </Rise>
      </Container>
    </section>
  );
}
