import { Rise } from "@/components/fx/Reveal";

/** Where TikTok works, built on the four words the document actually tests for.
 *
 *  The section used to open with its lead as a quiet paragraph beside the
 *  heading and then run eight categories as ruled rows, which is the same
 *  texture as the stages, the examples and the claims elsewhere on this page.
 *  It also buried the useful part. The lead is not throat-clearing: "something
 *  people can see, experience, compare or learn" is the actual test, and the
 *  eight categories are only its consequences.
 *
 *  So the four verbs are the section. They are set at display scale as the
 *  criteria they are, pulled out of the sentence rather than retyped, with the
 *  clause that introduces them kept in front so the sentence still reads as a
 *  sentence. The eight categories then run as one block of type instead of a
 *  ruled list, which is a different texture from anything else on the page and
 *  treats them as the single enumeration the document writes.
 *
 *  The limits close it, with the refusal last and loudest, because that is the
 *  sentence the section is really for. */

/** The four criteria, taken out of the lead. Null if the sentence is ever
 *  rewritten without that hinge, in which case the lead prints whole. */
function splitCriteria(lead: string) {
  const k = " people can ";
  const at = lead.indexOf(k);
  if (at < 0) return null;
  const verbs = lead
    .slice(at + k.length)
    .replace(/\.$/, "")
    .split(/,\s*|\s+or\s+/)
    .filter(Boolean);
  if (verbs.length < 2) return null;
  return { prefix: lead.slice(0, at + k.length - 1), verbs };
}

export function SuitabilityBlock({
  lead,
  ledeTail,
  items,
  limitOne,
  limitTwo,
  limitThree,
}: {
  lead: string;
  ledeTail: string;
  items: string[];
  limitOne: string;
  limitTwo: string;
  limitThree: string;
}) {
  const criteria = splitCriteria(lead);

  return (
    <div>
      {/* The test. */}
      {criteria ? (
        <Rise>
          <p className="max-w-2xl leading-relaxed text-fog sm:text-lg">{criteria.prefix}</p>
          <ul className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:gap-x-10">
            {criteria.verbs.map((verb, i) => (
              <li key={verb} className="flex items-baseline gap-6 sm:gap-10">
                <span className="font-display display-xl font-extrabold uppercase leading-[0.95] text-snow">
                  {verb}
                </span>
                {i < criteria.verbs.length - 1 && (
                  <span
                    aria-hidden
                    className="font-display text-[clamp(1.4rem,3vw,2.6rem)] font-extrabold leading-none text-brand"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Rise>
      ) : (
        <Rise>
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{lead}</p>
        </Rise>
      )}

      {/* The consequences, as one block rather than eight rows. */}
      <Rise delay={0.12} className="mt-14">
        <p className="font-display text-[0.62rem] font-semibold uppercase text-brand-text">
          {ledeTail}
        </p>
        <p className="font-display mt-6 flex flex-wrap items-baseline gap-x-1 gap-y-2 text-[clamp(1.1rem,2.5vw,1.9rem)] font-extrabold uppercase leading-[1.16]">
          {items.map((item, i) => (
            <span key={item} className="inline-flex items-baseline">
              <span className="text-snow transition-colors duration-300 hover:text-brand">
                {item}
              </span>
              {i < items.length - 1 && (
                <span aria-hidden className="mx-3 text-brand sm:mx-4">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      </Rise>

      {/* And where it does not. The refusal is the point of the section, so it
          is set larger than the two limits that lead to it. */}
      <Rise delay={0.18} className="mt-14 border-t border-line pt-10">
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <p className="leading-relaxed text-snow sm:text-lg">{limitOne}</p>
            <p className="mt-4 leading-relaxed text-fog sm:text-lg">{limitTwo}</p>
          </div>
          <p className="font-display text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.14] text-brand">
            {limitThree}
          </p>
        </div>
      </Rise>
    </div>
  );
}
