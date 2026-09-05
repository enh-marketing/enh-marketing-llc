import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** What leaves the room with you, drawn as the document it actually is.
 *
 *  WHY ONE SHEET. Eight deliverables as eight cards would say the reader
 *  receives eight things to choose between. They receive one pack, and the
 *  document treats it as one: "Depending on the agreed format, the deliverables
 *  can include". So it is set as a single sheet with a contents page, divided by
 *  hairlines rather than broken into tiles, and the section has one object in it.
 *
 *  THE PUNCHLINE IS INSIDE THE SHEET. One of the eight outlives the engagement,
 *  and the document says so outright: the use-case shortlist "remains useful
 *  even if the business does not proceed with another ENH service". That is the
 *  most persuasive sentence in the section and it is a refusal of a lock-in, so
 *  it is set at display scale on the sheet's own foot rather than left as the
 *  first clause of a closing paragraph. */
export function WorkshopPack({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  keep,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  intro: string;
  items: string[];
  /** The clause the section exists for, set at display scale. */
  keep: string;
  closing: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One pack, eight entries" }}
          className="mb-12"
        />

        <Rise>
          <p className="max-w-[62ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
        </Rise>

        {/* The pack. */}
        <Rise delay={0.08} className="mt-10">
          <div className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-2">
            <p className="font-display border-b border-line px-6 py-5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text sm:px-8">
              {intro}
            </p>

            {/* Contents. Hairlines, not tiles: this is one document. */}
            <ol className="grid sm:grid-cols-2">
              {items.map((entry, i) => (
                <li
                  key={entry}
                  className="group flex items-baseline gap-4 border-b border-line px-6 py-5 transition-colors duration-500 last:border-b-0 hover:bg-ink-3 sm:px-8 sm:odd:border-r"
                >
                  <span className="font-display shrink-0 text-[0.625rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow">
                    {entry}
                  </span>
                </li>
              ))}
            </ol>

            {/* The one that outlives the engagement. */}
            <div className="border-t-2 border-brand/40 bg-ink-3 px-6 py-8 sm:px-8">
              <p className="font-display max-w-[34ch] text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.15] text-brand">
                {keep}
              </p>
            </div>
          </div>
        </Rise>

        <Rise delay={0.14} className="mt-8">
          <p className="max-w-[70ch] text-base leading-relaxed text-fog">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}
