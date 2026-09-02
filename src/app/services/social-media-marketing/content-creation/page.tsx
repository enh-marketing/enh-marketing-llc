import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/content-creation";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { OneShoot } from "@/components/service/OneShoot";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";
import { ScopeSheet } from "@/components/service/ScopeSheet";
import { ClaimCascade } from "@/components/service/ClaimCascade";

const HREF = "/services/social-media-marketing/content-creation";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: { title: c.meta.title, description: c.meta.description, type: "website", locale: "en_AE" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Social Media Content Creation",
  serviceType:
    "Social content production: direction, short-form video, photography, design, copy and creator content",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
  isPartOf: {
    "@type": "Service",
    name: "Social Media Marketing",
    url: "https://enhmedia.com/services/social-media-marketing",
  },
};

export default function ContentCreationPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

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
          formSubmitLabel={c.narrative.cta}
          visual={<OneShoot key="shoot" />}
        />

        {/* The material already exists; finding what is worth making is the
            work. The definition sits above the decode because the document
            opens with it. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          bodyLead={c.narrative.definition}
          body={c.narrative.sources}
          highlight={["questions", "knowledge", "moments"]}
          outro={[c.narrative.hard, c.narrative.agency]}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              {c.narrative.cta}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.hero.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Seven services, drawn as the seven things they hand over. The
            document's promise is about what arrives — "you will know how many
            videos, photographs, carousels or other assets are included" — so the
            drawing is the board of deliverables rather than a rail of stages. */}
        <PinnedExplorer
          id="handle"
          label="What We Handle"
          index="01"
          title={c.handle.title}
          strokeTitle={c.handle.strokeTitle}
          items={c.handle.items}
          tone="ink-2"
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Seven services, one process" }}
          aside={
            <Rise key="handle-lead">
              <p className="leading-relaxed text-fog sm:text-lg">{c.handle.lead}</p>
              <p className="mt-5 text-[0.62rem] font-semibold uppercase text-brand-text">
                {c.handle.ledeTail}
              </p>
            </Rise>
          }
          diagram={{ kind: "outputs" }}
        >
          {/* This one route is built, so it links. */}
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">
              <Link
                href={c.handle.referenceHref}
                className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
              >
                {c.handle.reference}
              </Link>
            </p>
          </Rise>
        </PinnedExplorer>

        {/* The volume question, which the document answers by refusing to name a
            number. Two businesses that cannot share a schedule, then the seven
            things that decide it. */}
        <section
          id="how-much"
          data-section="How Much Content Do You Actually Need"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.howMuch.title}
              strokeTitle={c.howMuch.strokeTitle}
              mark={{ variant: "growth", label: "Seven inputs, one figure" }}
              className="mb-10"
            />

            <ScopeSheet
              noNumber={c.howMuch.noNumber}
              restaurant={c.howMuch.restaurant}
              professional={c.howMuch.professional}
              platforms={c.howMuch.platforms}
              factorsLead={c.howMuch.factorsLead}
              factors={c.howMuch.factors}
              proposal={c.howMuch.proposal}
            />

          </Container>
        </section>

        {/* Five stages as a vertical run with a rail, deliberately different
            from the horizontal grid the TikTok page uses for its five: that
            page spends its vertical rhythm on a loop, this one does not. */}
        <section
          id="stages"
          data-section="How the Work Moves"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 25% 0%, black, transparent 72%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.stages.title}
              strokeTitle={c.stages.strokeTitle}
              mark={{ variant: "progression", label: "Five stages, each better informed" }}
              className="mb-10"
            />

            <div className="relative">
              {/* The rail sits outside the list: a <span> as a direct child of
                  <ol> is invalid markup, and this site has shipped that twice. */}
              <span
                aria-hidden
                className="absolute bottom-8 left-[7px] top-8 hidden w-px bg-line lg:block"
              />

              <ol className="lg:pl-10">
                {c.stages.items.map((stage, i) => (
                  <li key={stage.no} className="group relative border-t border-line last:border-b">
                    <span
                      aria-hidden
                      className="absolute -left-10 top-9 hidden h-3.5 w-3.5 rounded-full border-2 border-line bg-ink-3 transition-colors duration-500 group-hover:border-brand lg:block"
                    />
                    <Rise delay={Math.min(i, 4) * 0.05}>
                      <div className="grid gap-x-14 gap-y-3 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-baseline">
                        <div className="flex items-baseline gap-5">
                          <span
                            aria-hidden
                            className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-brand-text"
                          >
                            {stage.no}
                          </span>
                          <h3 className="font-display text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-snow">
                            {stage.title}
                          </h3>
                        </div>
                        <p className="leading-relaxed text-fog sm:text-lg">{stage.body}</p>
                      </div>
                    </Rise>
                  </li>
                ))}
              </ol>
            </div>

            <Rise delay={0.14} className="mt-9">
              <p className="font-display max-w-4xl text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-brand">
                {c.stages.point}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Four reasons, drawn as four overlapping planes rather than a fourth
            vertical run on a page that already has three. See ClaimCascade. */}
        <section
          id="why-enh"
          data-section="Why Choose ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.whyEnh.title}
              strokeTitle={c.whyEnh.strokeTitle}
              mark={{ variant: "network", label: "Four reasons that narrow to one scope" }}
              className="mb-10"
            />

            <ClaimCascade items={c.whyEnh.items} />

            <Rise delay={0.14} className="mt-9">
              <a
                href="#quote"
                className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
              >
                {c.whyEnh.cta}
              </a>
            </Rise>
          </Container>
        </section>

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.cta}
        />

        <Work index="05" label="Summits Reached" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Turn What Your Business Does Into Content"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.cta}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
