import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { LeadForm, type FormField } from "@/components/service/LeadForm";

/** Closing conversion block.
 *
 *  Left rail carries the ask; the form sits on the same continuous elevated
 *  panel the comparison table uses, so the two heaviest blocks on the page are
 *  built from one material. The WhatsApp action is the document's own secondary
 *  CTA for this section. */
export function CtaBand({
  label,
  index,
  title,
  strokeTitle,
  body,
  note,
  formFields,
  formSubmitLabel,
  whatsapp,
  whatsappLabel,
}: {
  /** DevTools handle: names the section in data-section. */
  label: string;
  index?: string;
  title: string;
  strokeTitle: string;
  body: string;
  /** A second, quieter line under the body. Optional because only the pages
   *  whose document supplies one pass it — nothing is invented to fill it. */
  note?: string;
  formFields: FormField[];
  formSubmitLabel: string;
  whatsapp: string;
  whatsappLabel: string;
}) {
  return (
    <section id="quote" data-section={label} className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-b absolute right-[-12%] top-0 h-[40vw] w-[40vw] rounded-full bg-brand/12 blur-[160px]" />
      </div>

      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Ask */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            {index && (
              <p className="mb-7 text-xs font-semibold uppercase text-brand">
                ({index})
              </p>
            )}
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block">
                <Chars text={title} />
              </span>{" "}
              <span className="block text-brand">
                <Chars text={strokeTitle} delay={0.15} />
              </span>
            </h2>

            <Rise delay={0.25} className="mt-8">
              <p className="max-w-md text-base leading-relaxed text-fog sm:text-lg">{body}</p>
            </Rise>

            {note && (
              <Rise delay={0.3} className="mt-5">
                <p className="max-w-md border-l-2 border-brand/40 pl-5 text-sm leading-relaxed text-fog">
                  {note}
                </p>
              </Rise>
            )}

            <Rise delay={0.35} className="mt-10">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-b border-line pb-2 text-sm font-semibold uppercase text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <span className="h-px w-8 bg-brand transition-all duration-500 group-hover:w-14" />
                {whatsappLabel}
              </a>
            </Rise>
          </div>

          {/* Form panel */}
          <Rise delay={0.2}>
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 sm:p-10">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />
              <LeadForm fields={formFields} submitLabel={formSubmitLabel} />
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}
