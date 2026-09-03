"use client";

import { cn } from "@/lib/cn";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/lead-generation";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryList } from "@/components/service/IndustryList";
import { SurfaceCard, CardTitle } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { EnquiryDesk } from "@/components/service/EnquiryDesk";
import { Narrative } from "@/components/service/Narrative";
import { RouteMap } from "@/components/service/RouteMap";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/lead-generation";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function LeadGenerationPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>

      <main>
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          secondary={c.hero.secondary}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<EnquiryDesk key="desk" />}
        />

        {/* The thesis, which the document states in its second line: getting
            enquiries is the easy half. The decode resolves the paragraph about
            what we actually run, and the closing is the promise the document
            makes before anything goes live. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          body={c.narrative.body}
          highlight={["B2B", "B2C", "WhatsApp", "pages"]}
          closing={c.narrative.definition}
        />

        {/* The six routes, in the shape the document gives them rather than a
            flat grid of six: two shaped around who you sell to, the channels
            they run on beneath, and the one every other route lands on at the
            foot. The sentence above the section says exactly this, so a grid
            of six equal cards would contradict its own lede. */}
        <section
          id="routes"
          data-section="The Six Routes We Run"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 70%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="01"
              title={c.routes.title}
              strokeTitle={c.routes.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="routes-lede">
                  <p className="font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {c.routes.lede}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">
                    {c.routes.structure}
                  </p>
                </Rise>
              }
            />

            <RouteMap endToEnd={c.routes.endToEnd} channels={c.routes.channels} />
          </Container>
        </section>

        {/* The programme, drawn as the system the document describes rather
            than as another stage track: a gate that must be signed, plumbing
            built before any traffic, four taps that open after it, and budget
            moving between them from month two. */}
        <PinnedExplorer
          id="process"
          label="How Our Lead Generation Process Works"
          index="02"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          items={c.process.items}
          tone="ink-2"
          diagramSide="left"
          diagram={{ kind: "leadsystem" }}
          aside={
            <Rise key="threshold">
              <p className="text-xs font-semibold uppercase text-ash">
                {c.process.span}
              </p>
              <p className="font-display mt-5 text-[clamp(1.3rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.14] text-brand">
                {c.process.threshold}
              </p>
            </Rise>
          }
        >
          {/* The document leaves this phase unnumbered, so it closes the
              section rather than joining the run of stages. */}
          <Rise delay={0.12} className="mt-14 border-t border-line pt-9">
            <p className="font-display max-w-3xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.16] text-snow">
              {c.process.closingLead}
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-fog sm:text-lg">
              {c.process.closing}
            </p>
          </Rise>
        </PinnedExplorer>

        {/* Six things most agencies leave out. Not six identical rows: the
            document's items are not the same size as each other, and the one
            it ends on is a refusal. So the grid is uneven on purpose — the two
            with the longest arguments take double cells, the short ones stay
            compact, and the refusal takes the wide cell with the brand on it.
            The section's opening claim sits in the header rather than becoming
            a seventh item, which is what keeps the heading's count honest. */}
        <section
          id="differentiators"
          data-section="Six Things Most Agencies Leave Out"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              maskImage: "radial-gradient(ellipse at 20% 10%, black, transparent 70%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.differentiators.title}
              strokeTitle={c.differentiators.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="diff-lede">
                  <p className="leading-relaxed text-fog sm:text-lg">
                    {c.differentiators.lede}
                  </p>
                </Rise>
              }
            />

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.differentiators.items.map((claim, i) => {
                // Cells 0, 3 and 4 run double. 4 is the refusal.
                const wide = i === 0 || i === 3 || i === 4;
                const refusal = i === 4;
                return (
                  <li
                    key={claim.title}
                    className={cn("h-full", wide && "sm:col-span-2 lg:col-span-2")}
                  >
                    <Rise delay={(i % 3) * 0.06} className="h-full">
                      <SurfaceCard
                        index={String(i + 1).padStart(2, "0")}
                        padding={wide ? "default" : "tight"}
                        className={cn(
                          "h-full",
                          // The double cells only exist above sm. Once they
                          // collapse to one column they are ordinary cards, so
                          // they should not keep desktop padding: that was the
                          // whole of a 0.48 density reading at 375.
                          wide && "p-6 sm:p-8 lg:p-10",
                          refusal && "border-brand/45 bg-brand/[0.05]",
                        )}
                      >
                        <CardTitle
                          className={
                            wide ? "text-lg sm:text-2xl" : "text-base sm:text-lg"
                          }
                        >
                          {claim.title}
                        </CardTitle>
                        {claim.body && (
                          <p
                            className={cn(
                              "mt-4 leading-relaxed",
                              refusal ? "text-snow" : "text-fog",
                              wide ? "text-sm sm:text-base lg:text-lg" : "text-sm",
                            )}
                          >
                            {claim.body}
                          </p>
                        )}
                      </SurfaceCard>
                    </Rise>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        {/* Where it works. The Performance Marketing page's industries index,
            reused as-is: same brand ordinal, same oversized label, same detail
            brightening on hover. The content fits it exactly — a sector name
            and the examples under it — and the detail slot takes the document's
            own comma-separated list unchanged.

            The mark is overridden because the default asserts the opposite of
            what this document argues: its closing line is that the sector is
            not the common factor, and that line takes the footer. */}
        <IndustryList
          id="sectors"
          label="Where This Works Best"
          index="04"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lede={c.sectors.lede}
          mark="Eight sectors, one common factor"
          items={c.sectors.items.map((sector) => ({
            label: sector.name,
            detail: sector.examples.join(", "),
          }))}
          footer={
            <Rise delay={0.14} className="mt-14">
              <p className="font-display text-[clamp(1.4rem,3vw,2.4rem)] font-extrabold uppercase leading-[1.12] text-brand">
                {c.sectors.closingLead}
              </p>
              <p className="mt-6 max-w-3xl leading-relaxed text-snow sm:text-lg">
                {c.sectors.closing}
              </p>
            </Rise>
          }
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Where Your Enquiries Are Leaking"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
