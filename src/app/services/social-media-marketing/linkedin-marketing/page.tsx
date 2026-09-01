import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/linkedin-marketing";

import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { TileBreakout } from "@/components/service/TileBreakout";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { StartRoutes } from "@/components/service/StartRoutes";
import { DeliveryLadder } from "@/components/service/DeliveryLadder";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing/linkedin-marketing";
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
  name: "LinkedIn Marketing",
  serviceType:
    "LinkedIn company page management, executive personal branding, LinkedIn Ads, outreach and reporting",
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

export default function LinkedInMarketingPage() {
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
          formSubmitLabel={c.hero.primary}
          visual={<TileBreakout key="tiles" />}
        />

        {/* The opening is a complaint: the channel is usually sold as one tile
            in a social package. The decode resolves what that produces, and the
            closing is the plain statement of where the work happens. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          body={c.narrative.body}
          highlight={["Instagram", "pipeline"]}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        />

        {/* Why the channel works here, and the bill that comes with it.
            The document states one fact and then turns it over: everyone is on
            there, which is the opportunity, and "It also means the place is
            busy", which is the cost. So the section is built as that hinge —
            the same fact read twice, with a rule between the two readings.
            The three workforce traits are set at display scale rather than as
            chips, because they are the argument, not metadata. */}
        <section
          id="why-linkedin"
          data-section="Why LinkedIn Is the Strongest B2B Channel"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 30% 0%, black, transparent 72%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="01"
              title={c.why.title}
              strokeTitle={c.why.strokeTitle}
              mark={{ variant: "contrast", label: "One fact, read twice" }}
              className="mb-10"
            />

            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              {/* The workforce, as three statements. */}
              <div>
                <Rise>
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow">
                    {c.why.workforceLead}
                  </p>
                </Rise>

                <ol className="mt-6 border-t border-line">
                  {c.why.traits.map((trait, i) => (
                    <li key={trait} className="group border-b border-line py-4">
                      <Rise delay={i * 0.07}>
                        <div className="flex items-baseline gap-5">
                          <span
                            aria-hidden
                            className="font-display shrink-0 text-xs font-bold tabular-nums tracking-[0.2em] text-brand-text"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="font-display text-[clamp(1.1rem,2.1vw,1.55rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow transition-colors duration-500 group-hover:text-brand">
                            {trait}
                          </p>
                        </div>
                      </Rise>
                    </li>
                  ))}
                </ol>

                <Rise delay={0.12}>
                  <p className="mt-6 max-w-md leading-relaxed text-fog">{c.why.reason}</p>
                </Rise>
              </div>

              {/* The same fact, read twice. */}
              <div>
                <Rise delay={0.08}>
                  <p className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow">
                    {c.why.reach}
                  </p>
                  <p className="font-display mt-5 text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-brand">
                    {c.why.noOther}
                  </p>
                </Rise>

                {/* The hinge. */}
                <div aria-hidden className="my-7 flex items-center gap-4">
                  <span className="h-px flex-1 bg-line" />
                  <span className="h-2 w-2 rotate-45 border border-brand" />
                  <span className="h-px flex-1 bg-line" />
                </div>

                <Rise delay={0.14}>
                  <p className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-ash">
                    {c.why.busy}
                  </p>
                  <p className="mt-5 max-w-xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                    {c.why.cost}
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        {/* Six services. The document calls them one setup you can enter at any
            point, so the drawing keeps every region on screen and lights the
            selected one inside the frame, rather than running them in order or
            replacing itself on each choice. */}
        <PinnedExplorer
          id="services"
          label="Our LinkedIn Marketing Services"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
            note: s.note,
          }))}
          tone="ink-2"
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Six services, one setup" }}
          aside={
            <Rise key="svc-lede">
              <p className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                {c.services.lede}
              </p>
              <p className="mt-5 leading-relaxed text-fog sm:text-lg">{c.services.ledeTail}</p>
            </Rise>
          }
          diagram={{ kind: "setup" }}
        >
          {/* The ad formats the third service names, and where the work reaches
              past the platform. */}
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-text">
              {c.services.items[2].chipsLead}
            </p>
            <ul className="mt-5 flex flex-wrap gap-8">
              {c.services.items[2].chips?.map((format) => (
                <li
                  key={format}
                  className="font-display rounded-lg border border-line bg-ink-3 px-3.5 py-2 text-sm font-bold tracking-tight text-snow transition-colors duration-500 hover:border-brand/50"
                >
                  {format}
                </li>
              ))}
            </ul>
            <p className="mt-7 leading-relaxed text-fog sm:text-lg">
              {c.services.connect}
            </p>
          </Rise>
        </PinnedExplorer>

        {/* The section asks which route to start with, and the document
            answers it on one axis: time. So the routes go on that axis — ads
            begin "within the first week", organic "builds over 60 to 90 days",
            and the recommended route is visibly the union of the two. Only the
            start points are drawn; the source gives no magnitudes. */}
        <section
          id="start"
          data-section="Ads or Organic: Which to Start With"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.start.title}
              strokeTitle={c.start.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="start-lede">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                    {c.start.lede}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">{c.start.ledeTail}</p>
                </Rise>
              }
            />

            <StartRoutes
              columns={c.start.columns}
              axis={c.start.axis}
              options={c.start.options}
            />
          </Container>
        </section>

        {/* The programme. Every stage here ends with what the client receives,
            so the deliverables are collected in one sticky panel that fills up
            as the stages scroll past it, rather than repeated in a plate beside
            each stage. The stages carry the work; the panel carries what
            arrives. Nothing is printed twice. */}
        <section
          id="process"
          data-section="How Our LinkedIn Management Process Works"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              className="mb-10"
              mark={{ variant: "progression", label: "Five phases, five things in hand" }}
            />

            <DeliveryLadder
              stages={c.process.stages}
              ongoingLabel={c.process.ongoingLabel}
              span={c.process.span}
              promise={c.process.promise}
            />
          </Container>
        </section>

        {/* Who it is for. The qualifying sentence is three conditions and the
            document requires all three, so they are set as three gates rather
            than folded into a paragraph. The eight named job titles are the
            most concrete thing on the page and the document's own test is "you
            can name the buyer by job title", so they take the scale and the
            sectors sit above them as context. */}
        <section
          id="audience"
          data-section="Who We Run LinkedIn Campaigns For"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.audience.title}
              strokeTitle={c.audience.strokeTitle}
              mark={{ variant: "growth", label: "Three conditions, all of them" }}
              className="mb-10"
            />

            {/* All three have to hold. */}
            <Rise>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
                {c.audience.criteriaLead}
              </p>
            </Rise>
            <ol className="mt-5 grid gap-4 lg:grid-cols-3">
              {c.audience.conditions.map((condition, i) => (
                <li key={condition} className="h-full">
                  <Rise delay={i * 0.06} className="h-full">
                    <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-brand/45">
                      <span
                        aria-hidden
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-brand/60 bg-brand/15"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      </span>
                      <p className="font-display text-[clamp(0.98rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.2] tracking-tight text-snow">
                        {condition}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* The sectors, as context rather than the point. */}
            <Rise delay={0.1} className="mt-10 border-t border-line pt-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-text">
                {c.audience.lede}
              </p>
            </Rise>
            <ol className="mt-5 grid gap-x-12 gap-y-5 lg:grid-cols-3">
              {c.audience.sectors.map((sector, i) => (
                <li key={sector.name}>
                  <Rise delay={i * 0.05}>
                    <h3 className="font-display text-sm font-extrabold uppercase leading-[1.2] tracking-tight text-snow">
                      {sector.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">
                      {sector.examples.map((example, j) => (
                        <Fragment key={example}>
                          {j > 0 && ", "}
                          <span className="text-fog">{example}</span>
                        </Fragment>
                      ))}
                    </p>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* The names. This is the document's own test of fit. */}
            <Rise delay={0.14} className="mt-10 border-t border-line pt-8">
              <p className="max-w-2xl leading-relaxed text-fog sm:text-lg">
                {c.audience.titlesLead}
              </p>
            </Rise>
            <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {c.audience.titles.map((title, i) => (
                <li key={title} className="group border-b border-line">
                  <Rise delay={(i % 4) * 0.05}>
                    <div className="flex items-baseline gap-5 py-3.5">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums tracking-[0.2em] text-ash transition-colors duration-500 group-hover:text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow transition-colors duration-500 group-hover:text-brand">
                        {title}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Why us. Six claims, and the document's own framing is a comparison
            with other agencies, so they are set as statements at scale rather
            than as compact ledger rows: the claim leads, its substantiation
            sits beside it, and the numeral is a ghost behind both. The fourth
            is a refusal and carries the brand. */}
        <section
          id="why-enh"
          data-section="Why Choose ENH Marketing"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.whyEnh.title}
              strokeTitle={c.whyEnh.strokeTitle}
              mark={{ variant: "contrast", label: "Six claims, one of them a refusal" }}
              className="mb-10"
            />

            <ol className="border-t border-line">
              {c.whyEnh.items.map((claim, i) => {
                const refusal = i === 3;
                return (
                  <li
                    key={claim.title}
                    className={cn(
                      "group relative overflow-hidden border-b border-line py-7",
                      refusal && "bg-brand/[0.05]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    {/* The numeral sits behind the claim rather than beside it. */}
                    <span
                      aria-hidden
                      className={cn(
                        "font-display pointer-events-none absolute -top-3 right-2 text-[5rem] font-extrabold leading-none tracking-tight transition-colors duration-500 sm:text-[7rem]",
                        refusal ? "text-brand/[0.16]" : "text-snow/[0.04] group-hover:text-brand/[0.12]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <Rise delay={Math.min(i, 4) * 0.05}>
                      <div className="relative grid gap-x-14 gap-y-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-baseline">
                        <h3
                          className={cn(
                            "font-display text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] tracking-tight",
                            refusal ? "text-brand" : "text-snow",
                          )}
                        >
                          {claim.title}
                        </h3>
                        {claim.body && (
                          <p
                            className={cn(
                              "leading-relaxed sm:text-lg",
                              refusal ? "text-snow" : "text-fog",
                            )}
                          >
                            {claim.body}
                          </p>
                        )}
                      </div>
                    </Rise>
                  </li>
                );
              })}
            </ol>

            <Rise delay={0.12} className="mt-9">
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
          formSubmitLabel={c.hero.primary}
        />

        <Work index="07" label="Summits Reached" />

        <FaqList label="FAQs" index="08" title="FAQs" faqs={c.faqs} />

        <CtaBand
          label="Ready to Make LinkedIn Your Best B2B Channel"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
