import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/meta-ads";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { CreativeFeed } from "@/components/service/CreativeFeed";
import { MetaMark } from "@/components/service/MetaMark";
import { BudgetSplit } from "@/components/service/BudgetSplit";
import { ComparisonTable } from "@/components/service/ComparisonTable";
import { PathCompare } from "@/components/service/PathCompare";
import { SetupFlow } from "@/components/service/SetupFlow";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { StageLadder } from "@/components/service/StageLadder";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing/meta-ads";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: { title: c.meta.title, description: c.meta.description, type: "website", locale: "en_AE" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Meta Ads",
  serviceType: "Facebook and Instagram advertising management",
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
    name: "Performance Marketing",
    url: "https://enhmedia.com/services/performance-marketing",
  },
};

export default function MetaAdsPage() {
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
          footer={<TrustStrip key="trust" id="trust" credentials={false} compact />}
          formTitle={`${c.finalCta.title} ${c.finalCta.strokeTitle}`}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          visual={<CreativeFeed key="feed" />}
        />

        <BudgetSplit
          id="story"
          label="Budget Split"
          headline={c.narrative.headline}
          lead={c.narrative.questionLead}
          splitPrefix={c.narrative.splitPrefix}
          splitA={c.narrative.splitA}
          splitConjunction={c.narrative.splitConjunction}
          splitB={c.narrative.splitB}
          body={c.narrative.body}
          closing={c.narrative.oneBudget}
          highlight={c.narrative.highlight}
        />

        <ComparisonTable
          id="comparison"
          label="Meta vs Google Ads"
          index="01"
          title={c.compare.title}
          strokeTitle={c.compare.strokeTitle}
          lede={c.compare.lede}
          columns={c.compare.columns}
          rows={c.compare.rows}
          outro={c.compare.outro}
          markNode={<MetaMark variant="demand" />}
        />

        {/* Click-to-WhatsApp — the page's distinctive claim, so its own moment. */}
        <section
          id="click-to-whatsapp"
          data-section="Click-to-WhatsApp"
          className="relative overflow-hidden py-24 sm:py-32"
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div className="aurora-a absolute left-[-8%] top-[8%] h-[36vw] w-[36vw] rounded-full bg-brand/[0.10] blur-[150px]" />
          </div>

          <Container>
            {/* The claim sits beside the heading rather than under it: on its
                own the heading left half the band empty. */}
            <SectionHeader
              index="02"
              title={c.whatsapp.title}
              strokeTitle={c.whatsapp.strokeTitle}
              className="mb-14"
              aside={
                <Rise key="claim">
                  <p className="font-display text-[clamp(1.15rem,2vw,1.7rem)] font-extrabold uppercase leading-[1.2] tracking-tight text-brand">
                    {c.whatsapp.claim}
                  </p>
                </Rise>
              }
            />

            <Rise delay={0.1} className="max-w-3xl">
              <p className="leading-relaxed text-fog sm:text-lg">{c.whatsapp.body}</p>
            </Rise>

            <Rise delay={0.15} className="mt-12">
              <PathCompare
                origin="Ad"
                slow={c.whatsapp.slowPath.slice(1)}
                fast={c.whatsapp.fastPath.slice(1)}
              />
            </Rise>

            {/* The seven business types the copy lists, as a list. */}
            <Rise delay={0.2} className="mt-12">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fog">
                {c.whatsapp.fitLead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {c.whatsapp.fitItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-ink-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-snow transition-colors duration-500 hover:border-brand/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Rise>

            <div className="mt-14">
              <Rise>
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand-text">
                  {c.whatsapp.setupHeading}
                </h3>
              </Rise>
              <Rise delay={0.08} className="mt-6">
                <SetupFlow steps={c.whatsapp.setupSteps} />
              </Rise>
            </div>

            {/* The caution sits inside this section because that is where the
                document puts it: it qualifies click-to-WhatsApp, and reads as a
                precondition rather than a page-wide statement. */}
            <Rise delay={0.1} className="mt-14">
              <div className="relative overflow-hidden rounded-2xl border border-brand/35 bg-brand/[0.05] p-7 sm:p-9">
                <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-text">
                  {c.whatsapp.caution.label}
                </p>
                <p className="mt-5 max-w-3xl leading-relaxed text-fog sm:text-lg">
                  {c.whatsapp.caution.lead}{" "}
                  <strong className="font-semibold text-snow">
                    {c.whatsapp.caution.emphasis}
                  </strong>
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-fog">
                  {c.whatsapp.caution.commitment}
                </p>
              </div>
            </Rise>
          </Container>
        </section>

        <CapabilityCarousel
          id="what-we-do"
          label="What We Actually Do"
          index="03"
          title="What We"
          strokeTitle="Actually Do"
          items={c.capabilities}
        />

        <StageLadder
          id="process"
          label="How Meta Ads Management Works"
          index="04"
          title="How Meta Ads"
          strokeTitle="Management Works"
          stages={c.stages}
        />

        <IndustryRun
          id="industries"
          label="Industries"
          index="05"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items}
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={`${c.finalCta.title} ${c.finalCta.strokeTitle}`}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="06" label="Summits Reached" />

        <FaqList
          label="FAQs"
          index="07"
          title="FAQs"
          faqs={c.faqs}
        />

        <CtaBand
          label="Request a Quote"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
