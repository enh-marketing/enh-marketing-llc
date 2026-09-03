"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/facebook-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PageDrift } from "@/components/service/PageDrift";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { SplitLedger } from "@/components/service/SplitLedger";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing/facebook-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function FacebookMarketingPage() {
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
          visual={<PageDrift key="drift" />}
        />

        {/* The drift, then the one-sentence paragraph that makes it matter, then
            the service. The document's order exactly. */}
        <Narrative
          id="story"
          label="Keep Your Facebook Page Useful Between Campaigns"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.pivot}
          highlight={c.narrative.pivotEmphasis}
          outro={[c.narrative.agency, c.narrative.scope]}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              {c.narrative.primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Seven areas of the management scope. The document's bracketed link
            to the content-creation page is rendered once beneath, as a real
            link, rather than flattened into the third item's body. */}
        <PinnedExplorer
          id="services"
          label="What Our Facebook Marketing Services in Dubai Cover"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Seven parts of one monthly scope" }}
          diagram={{ kind: "setup" }}
        >
          <Rise delay={0.1} className="mt-10 border-t border-line pt-6">
            <p className="flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
              <span>{c.services.referenceLead}</span>
              <Crosslink href={c.services.referenceHref}>
                {c.services.referenceLabel}
              </Crosslink>
              <span>{c.services.referenceTail}</span>
            </p>
          </Rise>
        </PinnedExplorer>

        {/* Paid, and the two things the document is careful about: matching the
            objective to the outcome, and not overclaiming tracking. */}
        <section
          id="advertising"
          data-section="When Facebook Advertising Is Included"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.advertising.title}
              strokeTitle={c.advertising.strokeTitle}
              mark={{ variant: "contrast", label: "Organic reach and paid delivery are not the same thing" }}
              className="mb-12"
            />

            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.advertising.contrast}</p>
                <p className="mt-6 border-l-2 border-brand pl-6 leading-relaxed text-fog">
                  {c.advertising.scope}
                </p>
              </Rise>

              {/* The objectives, and the mismatch the document warns about. */}
              <Rise delay={0.08}>
                <p className="leading-relaxed text-snow sm:text-lg">
                  {c.advertising.objectivesLead}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {c.advertising.objectives.map((o) => (
                    <li
                      key={o}
                      className="font-display rounded-lg border border-brand/45 bg-brand/[0.06] px-4 py-2 text-sm font-bold text-snow"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="font-display mt-7 text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow">
                  {c.advertising.objectivesRule}
                </p>
                <p className="mt-4 flex gap-3 text-sm leading-relaxed text-ash">
                  <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                    </svg>
                  </span>
                  <span>{c.advertising.objectivesWarning}</span>
                </p>
              </Rise>
            </div>

            {/* Tracking, and the limit stated in the same breath. */}
            <Rise delay={0.14} className="mt-12 border-t border-line pt-8">
              <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <p className="leading-relaxed text-snow sm:text-lg">
                  {c.advertising.tracking}
                </p>
                <p className="leading-relaxed text-fog">{c.advertising.trackingCaveat}</p>
              </div>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
                <span>{c.advertising.referenceLead}</span>
                <Crosslink href={c.advertising.referenceHref}>
                  {c.advertising.referenceLabel}
                </Crosslink>
                <span>{c.advertising.referenceTail}</span>
              </p>
            </Rise>
          </Container>
        </section>

        {/* THE SECOND ARGUMENT. Two ledgers, never added together. See
            SplitLedger. */}
        <section
          id="measure"
          data-section="What We Measure"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.measure.title}
              strokeTitle={c.measure.strokeTitle}
              className="mb-12"
            />
            <SplitLedger
              claim={c.measure.claim}
              organic={c.measure.organic}
              organicTerm={c.measure.organicTerm}
              paid={c.measure.paid}
              paidTerm={c.measure.paidTerm}
              agreement={c.measure.agreement}
              agreementCase={c.measure.agreementCase}
            />
          </Container>
        </section>

        <IndustryRun
          id="sectors"
          label="Businesses We Manage Facebook For"
          index="05"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          note={c.sectors.caveat}
          items={c.sectors.items.map((label) => ({ label }))}
        />

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.promises.items.map((p, i) => (
                <SurfaceCard key={p.title} index={String(i + 1).padStart(2, "0")} delay={0.05 * i}>
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        <Work index="07" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Tell Us How the Page Is Run Today"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
