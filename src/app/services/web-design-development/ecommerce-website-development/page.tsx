import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ecommerce";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard, CardTitle, CardBody } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { StorefrontPreview } from "@/components/service/StorefrontPreview";
import { Narrative } from "@/components/service/Narrative";
import { BuildGrid } from "@/components/service/BuildGrid";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/web-design-development/ecommerce-website-development";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    type: "website",
    locale: "en_AE",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ecommerce Website Development",
  serviceType: "Ecommerce website design, development and integration",
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
    name: "Web Design & Development",
    url: "https://enhmedia.com/services/web-design-development",
  },
};

export default function EcommercePage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

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
          formSubmitLabel="Request a Quote"
          visual={<StorefrontPreview key="storefront" />}
        />

        {/* The scene, then the three causes — decoded as three, because the
            document lists three. Flattening them into one sentence was the
            problem with the first pass: "the usual culprits are boring" is a
            promise of a list, and a wall of text is not one.

            The section closes on the ownership line at display scale. It is the
            page's through-line and it was rendering as fog body copy. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scenario}
          questionEmphasis={c.narrative.scenarioEmphasis}
          body={c.narrative.culprits}
          highlight={["seconds", "search", "payment", "billing"]}
          outro={[c.narrative.body]}
          closing={c.narrative.ownership}
        >
          {/* The lead-in the list belongs to, kept above it. */}
          <p className="sr-only">{c.narrative.culpritsLead}</p>
        </Narrative>

        <BuildGrid
          id="build"
          label="Everything Inside the Build"
          index="01"
          title={c.build.title}
          strokeTitle={c.build.strokeTitle}
          items={c.build.items}
          payments={c.payments}
          paymentsLabel="Ways to pay"
          related={c.relatedServices}
        />

        {/* Who these builds suit, drawn as a shelf of stores. Eight categories
            of shop is a shelf, and a shelf is the one arrangement where a
            reader looks for their own trade instead of reading down a column
            hoping to meet it.

            The document's order is principle, then list, then exception, and
            the section keeps it: the qualifying rule leads beside the heading,
            the eight follow, and the case against a build closes it. */}
        <PinnedExplorer
          id="audience"
          label="Who These Builds Suit"
          index="02"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          tone="ink-3"
          diagramSide="right"
          items={c.audience.items.map((item, i) => ({
            no: String(i + 1).padStart(2, "0"),
            title: item,
            body: "",
          }))}
          aside={
            <Rise key="lede">
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.7rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                {c.audience.lede}
              </p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-text">
                {c.audience.itemsLead}
              </p>
            </Rise>
          }
          diagram={{ kind: "shelf" }}
        >
          {/* And the case against one, which the document volunteers. */}
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-14">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ash">
                And when it is not
              </p>
              <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">
                {c.audience.caveat}
              </p>
            </div>
          </Rise>
        </PinnedExplorer>

        {/* Why brands pick ENH. Same card as everywhere else, composed
            asymmetrically rather than as another even grid: the first reason is
            about ownership, which is the page's through-line, so it takes the
            full left column while the other four stack beside it. */}
        <section
          id="why-enh"
          data-section="Why Brands Pick ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.reasons.title}
              strokeTitle={c.reasons.strokeTitle}
              mark={{ variant: "growth", label: "Five reasons, one through-line" }}
              className="mb-12"
            />

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* The ownership reason takes a column of its own, floor to
                  ceiling; the other four sit beside it as a two-by-two. */}
              <li className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
                <SurfaceCard index={c.reasons.items[0].no} glyph="entity" className="h-full">
                  <CardTitle>{c.reasons.items[0].title}</CardTitle>
                  <CardBody className="sm:text-lg">{c.reasons.items[0].body}</CardBody>
                </SurfaceCard>
              </li>

              {c.reasons.items.slice(1).map((reason, i) => (
                <li key={reason.no}>
                  <SurfaceCard index={reason.no} delay={(i % 2) * 0.06} padding="tight">
                    <CardTitle className="text-base sm:text-lg">{reason.title}</CardTitle>
                    {reason.body && (
                      <p className="mt-3 text-sm leading-relaxed text-fog">{reason.body}</p>
                    )}
                  </SurfaceCard>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="04" label="Summits Reached" />

        <FaqList label="FAQs" index="05" title="FAQs" faqs={c.faqs} />

        <CtaBand
          label="See What Your Store Should Cost to Build"
          index="06"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="07" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
