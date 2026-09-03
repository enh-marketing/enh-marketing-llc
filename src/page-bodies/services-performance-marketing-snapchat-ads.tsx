"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/snapchat-ads";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { GeoLens } from "@/components/service/GeoLens";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { ExclusionBand } from "@/components/service/ExclusionBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing/snapchat-ads";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function SnapchatAdsPage() {
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
          formSubmitLabel={c.narrative.primary}
          visual={<GeoLens key="geo" />}
        />

        {/* The opening is a fork: for some brands skipping Snapchat is the right
            call, for others it means passing on the cheapest reach they have.
            Two outcomes, not two steps, so the decode branches. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          bodyLead={c.narrative.smallest}
          body={c.narrative.body}
          bodyVariant="fork"
          highlight={["call", "reach"]}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
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

        {/* The smallest audience of the majors, stated as the figure it is, and
            then the three things that make it worth the budget anyway. The
            figure leads because the document leads with it — the argument only
            works once the weakness is admitted. */}
        <section
          id="fit"
          data-section="Where Snapchat Actually Fits"
          className="relative overflow-x-clip py-14 sm:py-16"
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
              index="01"
              title={c.fit.title}
              strokeTitle={c.fit.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="audience">
                  <p className="text-[0.62rem] font-semibold uppercase text-ash">
                    {c.fit.audienceLead}
                  </p>
                  <p className="font-display display-xl mt-3 font-extrabold uppercase text-snow">
                    {c.fit.figure}
                  </p>
                  <p className="mt-4 leading-relaxed text-fog sm:text-lg">
                    {c.fit.audienceTail.replace(/^,\s*/, "")}
                  </p>
                </Rise>
              }
            />

            <Rise>
              <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-brand">
                {c.fit.lead}
              </p>
            </Rise>

            <ol className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:grid-cols-3">
              {c.fit.reasons.map((reason, i) => (
                <li key={reason.no} className="group bg-ink-2">
                  <Rise delay={i * 0.07} className="h-full">
                    <div className="flex h-full flex-col gap-5 p-7 transition-colors duration-500 group-hover:bg-ink-3 sm:p-8">
                      <span
                        aria-hidden
                        className="font-display text-[0.62rem] font-bold tabular-nums text-brand-text"
                      >
                        {reason.no}
                      </span>
                      <h3 className="font-display text-[clamp(1.1rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-snow">
                        {reason.title}
                      </h3>
                      <p className="leading-relaxed text-fog">{reason.body}</p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* The formats, drawn where each one appears. Every entry in the
            document's table is really a statement about location — between
            Stories, in the Discover feed, through the camera, inside an area you
            define — so the drawing is the app and selecting a format lights the
            surface it lives on. */}
        <PinnedExplorer
          id="formats"
          label="Snap Ads, Lenses and Geofilters"
          index="02"
          title={c.formats.title}
          strokeTitle={c.formats.strokeTitle}
          items={c.formats.items.map((f) => ({
            no: f.no,
            title: f.name,
            body: f.does,
            note: f.bestFor,
            glyph: f.glyph,
          }))}
          bodyLabel={c.formats.columns[1]}
          noteLabel={c.formats.columns[2]}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Four formats, four surfaces" }}
          diagram={{ kind: "snap" }}
        >
          {/* Why the last two are the reason to look at all. */}
          <Rise delay={0.12} className="mt-12 border-t border-line pt-9">
            <p className="leading-relaxed text-fog sm:text-lg">
              {c.formats.argumentLead}
            </p>
            <p className="font-display mt-6 text-[clamp(1.15rem,2.3vw,1.8rem)] font-extrabold uppercase leading-[1.16] text-brand">
              {c.formats.argument}
            </p>
            <p className="mt-6 border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
              {c.formats.argumentTail}
            </p>
            <p className="mt-8 text-sm leading-relaxed text-fog">{c.formats.connect}</p>
          </Rise>
        </PinnedExplorer>

        {/* Who should not run it. The document offers this as its differentiator
            ("A straight answer, since it is rarely offered here") and, unlike
            every other disqualifier list on the site, it sets a threshold
            rather than just listing: "if two or more of those apply". So the
            four sit in one band and the rule carries at display scale
            whatever the reader does. See ExclusionBand. */}
        <section
          id="not-for"
          data-section="Who Should Not Run Snapchat Ads"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.notFor.title}
              strokeTitle={c.notFor.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="straight">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.notFor.lead}
                  </p>
                </Rise>
              }
            />

            <ExclusionBand items={c.notFor.items} rule={c.notFor.rule} />

          </Container>
        </section>

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
        />

        <Work index="04" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="05" faqs={c.faqs} />

        <CtaBand
          label="Find Out Whether Snapchat Earns a Place"
          index="06"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="07" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
