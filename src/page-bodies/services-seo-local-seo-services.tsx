"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/local-seo-services";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { MissedCall } from "@/components/service/MissedCall";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { SetupModel } from "@/components/service/SetupModel";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/local-seo-services";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function LocalSeoServicesPage() {
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
          visual={<MissedCall key="missed" />}
        />

        {/* Three incomplete results, then the one-line paragraph that makes it
            matter, then the service and its refusal to promise a ranking. */}
        <Narrative
          id="story"
          label="Be Easier to Find When Nearby Customers Are Ready to Act"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.pivot}
          highlight={c.narrative.pivotEmphasis}
          outro={[c.narrative.agency]}
          closing={c.narrative.goal}
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

        <PinnedExplorer
          id="services"
          label="What Our Local SEO Services Cover"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "network", label: "Profile, website and listings kept in agreement" }}
          diagram={{ kind: "setup" }}
        />

        {/* THE PAGE'S ARGUMENT. Eligibility, and the shortcut that gets a
            profile suspended. See SetupModel. */}
        <section
          id="setup"
          data-section="The Right Setup Depends on How Your Business Operates"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.setup.title}
              strokeTitle={c.setup.strokeTitle}
              mark={{ variant: "contrast", label: "Three ways to be a local business" }}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.setup.lead}</p>
                </Rise>
              }
            />
            <SetupModel models={c.setup.models} warning={c.setup.warning} />
          </Container>
        </section>

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
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.measure.claim}
              </p>
            </Rise>
            <div className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.measure.available}</p>
              </Rise>
              <div className="space-y-6">
                {/* What a click does not prove. */}
                <Rise delay={0.08}>
                  <p className="flex gap-3 leading-relaxed text-ash">
                    <span aria-hidden className="mt-1 shrink-0 text-brand">
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{c.measure.limit}</span>
                  </p>
                </Rise>
                <Rise delay={0.14}>
                  <p className="border-t border-line pt-6 leading-relaxed text-fog">
                    {c.measure.reporting}
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="discovery"
          data-section="Where Voice and AI Search Fit"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.discovery.title}
              strokeTitle={c.discovery.strokeTitle}
              className="mb-12"
            />
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.discovery.lead}</p>
              </Rise>
              <div className="space-y-6">
                <Rise delay={0.08}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                    {c.discovery.limit}
                  </p>
                </Rise>
                <Rise delay={0.14}>
                  <p className="flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
                    <span>{c.discovery.referenceLead}</span>
                    <Crosslink href={c.discovery.referenceHref}>
                      {c.discovery.referenceLabel}
                    </Crosslink>
                    <span>{c.discovery.referenceTail}</span>
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <IndustryRun
          id="sectors"
          label="Businesses That Benefit From Local SEO"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items.map((label) => ({ label }))}
        />

        {/* Where local SEO is the wrong purchase. The document says so, and the
            page it points at is built. */}
        <section
          id="boundary"
          data-section="When Local SEO Is Not the Right Scope"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <Rise>
              <p className="font-display mx-auto max-w-4xl text-center text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.16] text-snow">
                <span>{c.sectors.boundaryLead}</span>{" "}
                <Crosslink href={c.sectors.boundaryHref} className="text-brand underline-offset-4 hover:underline">
                  {c.sectors.boundaryLabel}
                </Crosslink>{" "}
                <span>{c.sectors.boundaryTail}</span>
              </p>
            </Rise>
          </Container>
        </section>

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
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
            <Rise delay={0.14}>
              <p className="mt-10 max-w-3xl border-t border-line pt-8 leading-relaxed text-fog">
                {c.promises.tail}
              </p>
            </Rise>
          </Container>
        </section>

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Where the Business Operates"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
