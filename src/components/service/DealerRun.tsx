import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

type Move = { key: string; title: string; body: string };

/** "Digital Marketing for Car Dealerships and Automotive Brands" — the long
 *  clock, and the first of the document's two business chapters.
 *
 *  THE PLATE ANSWERS ONE QUESTION: WHERE SHOULD A CAMPAIGN SEND PEOPLE? The
 *  document is unusually direct about it — "Paid campaigns should send people
 *  to the most relevant vehicle or offer rather than a general homepage" — and
 *  that sentence contains a right answer and a wrong one, which is a junction
 *  with a rejected branch and not a funnel. The branch that is struck through
 *  is the homepage; the branch that carries the flow is the model or offer
 *  page. Nobody has to be taught that a crossed line is the one not to take.
 *
 *  AND WHAT HAPPENS TO THE ONES WHO LEAVE. "Retargeting can reconnect the
 *  dealership with people who viewed a model without submitting an enquiry."
 *  They leave the plate to the right and a dashed approach brings them back in.
 *  It is a return, because the client's own verb is "reconnect"; it is one
 *  element of a larger drawing rather than the shape of the section.
 *
 *  THREE LABELS, ALL VERBATIM. "the most relevant vehicle or offer", "a general
 *  homepage" and "without submitting an enquiry" are the document's own
 *  phrases, and they are the only words on the plate. They are HTML positioned
 *  on the drawing's own coordinates rather than SVG text, so they hold their
 *  size when the plate scales.
 *
 *  BELOW THE MEDIUM BREAKPOINT the plate is dropped. At 375px its 900-unit box
 *  renders about 120 pixels tall, which puts the struck branch — the one thing
 *  it exists to show — at four pixels. The three moves under it are the same
 *  three sentences either way, so nothing is lost but the picture. */
export function DealerRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  narrowing,
  moves,
  searchStem,
  searchItems,
  searchTail,
  social,
  socialMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  narrowing: [string, string, string, string];
  moves: Move[];
  searchStem: string;
  searchItems: string[];
  searchTail: string;
  social: string;
  socialMark: string[];
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
              <Marked text={lead} mark={narrowing} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        {/* THE JUNCTION. */}
        <Rise>
          <div className="relative hidden rounded-[1.25rem] border border-line bg-ink-2 p-6 md:block lg:p-8">
            <div className="relative">
              <svg viewBox="0 0 900 320" aria-hidden className="block w-full" fill="none">
                {/* The campaign. */}
                <rect x="20" y="128" width="150" height="64" rx="10" stroke="var(--color-ash)" strokeWidth="1.6" strokeOpacity="0.75" />
                <path d="M44 150 H120" stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />
                <path d="M44 166 H96" stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.32" strokeLinecap="round" />

                {/* The branch that carries the flow. */}
                <path d="M170 150 C300 150 340 90 520 90" stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
                <path
                  d="M170 150 C300 150 340 90 520 90"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="ci-flow"
                />
                <rect x="520" y="50" width="210" height="80" rx="10" stroke="var(--color-brand)" strokeWidth="1.8" />
                <path d="M546 76 H660" stroke="var(--color-ash)" strokeWidth="2.4" strokeOpacity="0.6" strokeLinecap="round" />
                <path d="M546 94 H620" stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round" />
                <rect x="546" y="104" width="66" height="12" rx="6" fill="var(--color-brand)" />

                {/* The branch that is not to be taken. */}
                <path
                  d="M170 172 C300 172 340 250 520 250"
                  stroke="var(--color-ash)"
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                  strokeDasharray="7 8"
                />
                <path d="M332 196 L364 228 M364 196 L332 228" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
                <rect x="520" y="214" width="210" height="72" rx="10" stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="7 8" />
                <path d="M546 242 H660" stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />
                <path d="M546 260 H690" stroke="var(--color-ash)" strokeWidth="2" strokeOpacity="0.22" strokeLinecap="round" />

                {/* The ones who leave without enquiring. */}
                {[762, 792, 822].map((x, i) => (
                  <circle
                    key={x}
                    cx={x}
                    cy="90"
                    r="5"
                    className="ci-twinkle fill-ash"
                    style={{ animationDelay: `${i * 700}ms` }}
                  />
                ))}
                <path d="M730 90 H744" stroke="var(--color-ash)" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />

                {/* Reconnected. */}
                <path
                  d="M846 108 C880 176 780 196 700 158"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 7"
                />
                <path d="M712 148 L698 159 L713 168" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* The three labels, in HTML at a real size, positioned as
                  percentages of the drawing's own viewBox so they hold their
                  place at every width: 520/900 = 57.8% across and 50/320 =
                  15.6% down puts the first one on the top edge of the
                  destination plate, and `-translate-y-full` lifts it clear.
                  SVG <text> would have scaled with the box and dropped below
                  the eleven-pixel floor on a laptop.

                  The third label sits ABOVE its dots rather than below them:
                  under them it was crossed by the return arc, and a caption
                  with a dashed line drawn through it is unreadable. */}
              <p className="absolute left-[57.8%] top-[15.6%] -translate-y-full pb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text">
                the most relevant vehicle or offer
              </p>
              <p className="absolute left-[57.8%] top-[92%] text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash">
                a general homepage
              </p>
              <p className="absolute left-[84%] top-[28%] -translate-y-full pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash">
                without submitting
                <br />
                an enquiry
              </p>
            </div>
          </div>
        </Rise>

        {/* The three sentences the plate was read from. */}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-3">
          {moves.map((m, i) => (
            <li
              key={m.key}
              className="group bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-7"
            >
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                ({String(i + 1).padStart(2, "0")})
              </p>
              <h3 className="font-display mt-4 text-[clamp(1.05rem,1.7vw,1.3rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {m.title}
              </h3>
              <span
                aria-hidden
                className="mt-4 block h-px w-8 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand motion-reduce:transition-none"
              />
              <p className="mt-5 text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                {m.body}
              </p>
            </li>
          ))}
        </ul>

        {/* What the search side has to cover while all of that is happening. */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Rise>
            <p className="text-base leading-relaxed text-fog sm:text-lg">{searchStem}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {searchItems.map((s) => (
                <li
                  key={s}
                  className="group rounded-full border border-line bg-ink-2 px-4 py-2 text-sm text-fog transition-colors duration-500 hover:border-brand/55 hover:bg-ink-3 hover:text-snow motion-reduce:transition-none"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fog sm:text-base">
              {searchTail}
            </p>
          </Rise>

          <Rise delay={0.1}>
            <p className="max-w-[62ch] border-l-2 border-brand pl-6 text-[clamp(1rem,1.7vw,1.3rem)] leading-[1.5] text-fog sm:pl-8">
              <Marked text={social} mark={socialMark} className="font-semibold text-snow" />
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
