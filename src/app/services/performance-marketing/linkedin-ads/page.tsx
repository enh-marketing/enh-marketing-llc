import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/linkedin-ads";

import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ProfileMatch } from "@/components/service/ProfileMatch";
import { Narrative } from "@/components/service/Narrative";
import { ArithmeticSheet } from "@/components/service/ArithmeticSheet";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { StageLadder } from "@/components/service/StageLadder";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing/linkedin-ads";
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
  name: "LinkedIn Ads",
  serviceType:
    "LinkedIn advertising: Sponsored Content, Lead Gen Forms, Message Ads and account-based campaigns",
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

export default function LinkedInAdsPage() {
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
          formSubmitLabel={c.narrative.primary}
          visual={<ProfileMatch key="match" />}
        />

        {/* The opening position, which is unusually blunt for a service page:
            the channel is the most expensive one, and for some businesses it
            will never pay. The decode resolves that split, and the closing is
            the undertaking to work the numbers before anything goes live. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          body={c.narrative.body}
          bodyVariant="fork"
          highlight={["arithmetic", "client"]}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        >
          <Rise delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
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

        {/* The page's spine. The document sets four steps "in this order" and
            makes the third depend on the first two, so the section is drawn as
            that calculation rather than as four parallel points. */}
        <section
          id="arithmetic"
          data-section="The Honest Arithmetic"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 72%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="01"
              title={c.arithmetic.title}
              strokeTitle={c.arithmetic.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="cost">
                  <p className="font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.14] text-brand">
                    {c.arithmetic.cost}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">
                    {c.arithmetic.costBody}
                  </p>
                </Rise>
              }
            />

            {/* The turn the section is built on. */}
            <Rise className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase text-ash">
                {c.arithmetic.pivotLead}
              </p>
              <p className="font-display mt-4 text-[clamp(1.2rem,2.5vw,1.95rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.arithmetic.pivot}
              </p>
              <p className="mt-8 text-xs font-semibold uppercase text-brand-text">
                {c.arithmetic.stepsLead}
              </p>
            </Rise>

            <ArithmeticSheet
              steps={c.arithmetic.steps}
              exampleCloseRate={c.arithmetic.exampleCloseRate}
              exampleValue={c.arithmetic.exampleValue}
            />

            {/* Where it tends to work, and the antithesis the section turns on. */}
            <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
              <p className="max-w-3xl leading-relaxed text-snow sm:text-lg">
                {c.arithmetic.worksLead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-8">
                {c.arithmetic.sectors.map((sector) => (
                  <li
                    key={sector}
                    className="font-display rounded-lg border border-line bg-ink-2 px-3.5 py-2 text-sm font-bold text-snow transition-colors duration-500 hover:border-brand/50"
                  >
                    {sector}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise delay={0.16} className="mt-8">
              <p className="font-display text-[clamp(1.25rem,2.6vw,2.05rem)] font-extrabold uppercase leading-[1.14]">
                <span className="text-brand">{c.arithmetic.closingA}</span>{" "}
                <span className="text-snow">{c.arithmetic.closingB}</span>
              </p>
              <p className="mt-6 leading-relaxed text-fog sm:text-lg">
                {c.arithmetic.closingTail}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Six formats. Not stages and not a run: distinct units that appear in
            different places and behave differently, so the drawing changes
            entirely with the selection rather than lighting a rail position. */}
        <PinnedExplorer
          id="formats"
          label="What We Run"
          index="02"
          title={c.formats.title}
          strokeTitle={c.formats.strokeTitle}
          items={c.formats.items.map((f) => ({
            no: f.no,
            title: f.title,
            body: f.body,
            glyph: f.glyph,
            note: f.standout,
          }))}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Six formats, two of them singled out" }}
          diagram={{ kind: "adformat" }}
        >
          <Rise delay={0.12} className="mt-10 border-t border-line pt-7">
            <p className=" leading-relaxed text-fog sm:text-lg">{c.formats.connect}</p>
          </Rise>
        </PinnedExplorer>

        {/* Targeting. The document draws this as a two-sentence contrast, so the
            section is a two-sentence contrast: what one platform guesses beside
            what the other was told. */}
        <section
          id="targeting"
          data-section="How LinkedIn Targeting Differs"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.targeting.title}
              strokeTitle={c.targeting.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="precision">
                  <p className="leading-relaxed text-fog sm:text-lg">
                    {c.targeting.precisionLead}
                  </p>
                </Rise>
              }
            />

            <ol className="grid gap-4 lg:grid-cols-2">
              {/* Inferred: signals scattered, and a guess assembled from them. */}
              <li>
                <Rise className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-7 sm:p-8">
                    <div aria-hidden className="relative h-28">
                      {[
                        [8, 22], [26, 62], [44, 14], [61, 48], [79, 28],
                        [17, 78], [37, 38], [55, 82], [72, 66], [89, 54],
                      ].map(([x, y], i) => (
                        <span
                          key={i}
                          className="absolute h-1.5 w-1.5 rounded-full bg-fog/45"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        />
                      ))}
                      <span className="absolute left-1/2 top-1/2 h-16 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fog/10 blur-xl" />
                    </div>
                    <p className="font-display mt-6 text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16] text-fog">
                      {c.targeting.inferred}
                    </p>
                  </div>
                </Rise>
              </li>

              {/* Declared: a record, kept current by the person it describes. */}
              <li>
                <Rise delay={0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-brand/40 bg-brand/[0.05] p-7 sm:p-8">
                    <div aria-hidden className="flex h-28 flex-col justify-center gap-2.5">
                      {["72%", "54%", "84%", "63%"].map((w, i) => (
                        <span key={i} className="flex items-center gap-3">
                          <span
                            className="h-1.5 rounded-full bg-brand/80"
                            style={{ width: w }}
                          />
                          <span className="h-px flex-1 bg-line" />
                          <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                        </span>
                      ))}
                    </div>
                    <p className="font-display mt-6 text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16] text-snow">
                      {c.targeting.declared}
                    </p>
                  </div>
                </Rise>
              </li>
            </ol>

            {/* What that lets you target by. */}
            <Rise delay={0.12} className="mt-9 border-t border-line pt-8">
              <p className="text-xs font-semibold uppercase text-ash">
                {c.targeting.facetsLead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.targeting.facets.map((facet) => (
                  <li
                    key={facet}
                    className="font-display rounded-lg border border-line bg-ink-2 px-3.5 py-2 text-sm font-bold text-snow transition-colors duration-500 hover:border-brand/50"
                  >
                    {facet}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-3xl leading-relaxed text-fog sm:text-lg">
                {c.targeting.facetsTail}
              </p>
            </Rise>

            <Rise delay={0.16} className="mt-8">
              <p className="font-display border-l-2 border-brand pl-6 text-[clamp(1.15rem,2.3vw,1.8rem)] font-extrabold uppercase leading-[1.16] text-snow sm:pl-7">
                {c.targeting.example}
              </p>
              <p className="mt-6 max-w-3xl leading-relaxed text-snow sm:text-lg">
                {c.targeting.precision}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Measurement. The document argues this with a dated story rather than
            an assertion, so the story is drawn as the trail it describes: four
            touches, the last one taking all the credit, the first one starting
            it. */}
        <section
          id="measurement"
          data-section="How We Measure It"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.measurement.title}
              strokeTitle={c.measurement.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="problem">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {c.measurement.problem}
                  </p>
                </Rise>
              }
            />

            {/* The trail, spaced by the document's own months: March at the
                start, April a quarter along, July at the end, and the stretch
                where three emails go unanswered falling in the gap between the
                last two. The spacing is the dates, not a layout convenience. */}
            <div className="relative hidden lg:block">
              {/* The touches alternate above and below the axis. Stacked all on
                  one side each column was 23% wide and every sentence wrapped
                  to four lines, so the block needed 176px to hold four short
                  sentences. Alternating gives each one 38% and two lines, which
                  is the same information at half the raggedness. It is not
                  much shorter: both sides of the axis need equal room, so
                  alternating buys legibility rather than height. The wrapper is
                  sized to the tallest block on each side — absolute children
                  contribute no height, so an under-sized wrapper silently
                  clipped the March touch. */}
              <div className="relative h-[11.5rem]">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line"
                />

                <ol>
                  {c.measurement.trail.map((touch, i) => {
                    const started = i === 0;
                    const credited = i === c.measurement.trail.length - 1;
                    const above = i % 2 === 1;
                    const dot = (
                      <span
                        aria-hidden
                        className={cn(
                          "block h-3.5 w-3.5 shrink-0 rounded-full border-2",
                          started
                            ? "border-brand bg-brand"
                            : credited
                              ? "border-fog bg-ink-3"
                              : "border-line bg-ink-3",
                          touch.at === 100 && "ml-auto",
                        )}
                      />
                    );
                    const text = (
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          touch.at === 100 && "text-right",
                          started || credited ? "text-snow" : "text-fog",
                        )}
                      >
                        {touch.month
                          ? touch.text.split(touch.month).map((part, j, all) => (
                            <Fragment key={j}>
                              {part}
                              {j < all.length - 1 && (
                                <span className="font-display font-bold uppercase text-brand">
                                  {touch.month}
                                </span>
                              )}
                            </Fragment>
                          ))
                          : touch.text}
                      </p>
                    );
                    return (
                      <li
                        key={touch.text}
                        className={cn(
                          "absolute flex w-[38%] flex-col",
                          above ? "bottom-1/2 justify-end pb-4" : "top-1/2 pt-4",
                        )}
                        style={{
                          left: `${touch.at}%`,
                          transform:
                            touch.at === 0
                              ? "none"
                              : touch.at === 100
                                ? "translateX(-100%)"
                                : "translateX(-50%)",
                        }}
                      >
                        <Rise delay={i * 0.08}>
                          {above ? (
                            <>
                              {text}
                              <span className="mt-4 block">{dot}</span>
                            </>
                          ) : (
                            <>
                              {dot}
                              <span className="mt-4 block">{text}</span>
                            </>
                          )}
                        </Rise>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* THE ARGUMENT, ON ONE RAIL. Both claims score the same four
                  touches, so which touch each one points at can be seen rather
                  than asserted: last-click lands on whichever happened to be
                  last, and the document's point is that the first is what
                  started it. One rail rather than two, because two rails
                  invited the reader to compare two models when the document is
                  making a single claim about one trail — and it cost 120px of
                  height to say the same thing twice.

                  Nothing here claims a split. These are two marks on a rail,
                  not a distribution: the document never gives one. */}
              <div className="mt-8 border-t border-line pt-7">
                <Rise delay={0.1}>
                  <div className="relative h-4">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line/70"
                    />
                    {c.measurement.trail.map((touch, i) => {
                      const started = i === 0;
                      const credited = i === c.measurement.trail.length - 1;
                      return (
                        <span
                          key={touch.text}
                          aria-hidden
                          className={cn(
                            "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2",
                            started
                              ? "border-brand bg-brand"
                              : credited
                                ? "border-ash bg-ash"
                                : "border-line bg-ink-3",
                          )}
                          style={{
                            left: `${touch.at}%`,
                            transform:
                              touch.at === 0
                                ? "translateY(-50%)"
                                : touch.at === 100
                                  ? "translate(-100%,-50%)"
                                  : "translate(-50%,-50%)",
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Each claim sits under the mark it points at. */}
                  <div className="mt-4 flex items-start justify-between gap-10">
                    <p className="font-display max-w-xs text-[clamp(1.1rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-brand">
                      {c.measurement.verdictRight}
                    </p>
                    <p className="font-display max-w-xs text-right text-[clamp(1.1rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-ash">
                      {c.measurement.verdictWrong}
                    </p>
                  </div>
                </Rise>
              </div>
            </div>

            {/* Mobile: the same four touches as a run, then both readings. */}
            <div className="lg:hidden">
              <ol>
                {c.measurement.trail.map((touch, i) => (
                  <li key={touch.text} className="flex gap-4 border-t border-line py-4">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1.5 h-3 w-3 shrink-0 rounded-full border-2",
                        i === 0 ? "border-brand bg-brand" : "border-line bg-ink-3",
                      )}
                    />
                    <p className={cn("leading-relaxed", i === 0 ? "text-snow" : "text-fog")}>
                      {touch.month
                        ? touch.text.split(touch.month).map((part, j, all) => (
                          <Fragment key={j}>
                            {part}
                            {j < all.length - 1 && (
                              <span className="font-display font-bold uppercase text-brand">
                                {touch.month}
                              </span>
                            )}
                          </Fragment>
                        ))
                        : touch.text}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-7 space-y-3 border-t border-line pt-7">
                <p className="font-display text-lg font-extrabold uppercase leading-[1.16] text-ash">
                  {c.measurement.verdictWrong}
                </p>
                <p className="font-display text-lg font-extrabold uppercase leading-[1.16] text-brand">
                  {c.measurement.verdictRight}
                </p>
              </div>
            </div>

            {/* What is done about it. Two of the five name the weaker thing they
                replace, in the document's own words; three do not, and those
                keep an empty counterpart rather than an invented one. */}
            <Rise delay={0.18} className="mt-9 border-t border-line pt-7">
              <p className="text-xs font-semibold uppercase text-brand-text">
                {c.measurement.remediesLead}
              </p>
              <ol className="mt-5 border-t border-line">
                {c.measurement.remedies.map((remedy, i) => (
                  <li
                    key={remedy.does}
                    className={cn(
                      "group relative grid gap-x-10 gap-y-2 border-b border-line py-4",
                      remedy.instead &&
                      "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-baseline",
                    )}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <div className="flex gap-5">
                      <span
                        aria-hidden
                        className="font-display shrink-0 pt-1 text-xs font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="leading-relaxed text-snow">{remedy.does}</p>
                    </div>
                    {remedy.instead && (
                      <p className="leading-relaxed text-ash lg:border-l lg:border-line lg:pl-10">
                        <span className="text-[0.7rem] font-semibold uppercase text-ash/70">
                          rather than{" "}
                        </span>
                        <span className="line-through decoration-brand/50 decoration-2">
                          {remedy.instead}
                        </span>
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </Rise>

            {/* The hierarchy the document states: two metrics lead, one is
                included and demoted. It is not struck through — the document
                says it is reported, only that it is worth less. */}
            <Rise delay={0.22} className="mt-8">
              <p className="text-xs font-semibold uppercase text-ash">
                {c.measurement.reportsLead}
              </p>
              <ul className="mt-5 flex flex-wrap items-center gap-2.5">
                {c.measurement.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="font-display rounded-xl border border-brand/50 bg-brand/[0.08] px-4 py-2.5 text-sm font-bold text-snow sm:text-base"
                  >
                    {metric}
                  </li>
                ))}
              </ul>

              {/* The demoted metric keeps its sentence: the plate is the
                  subject and the line beside it is the rest, so it reads as
                  the document wrote it rather than as a chip with a fragment
                  stranded underneath. */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
                <span className="font-display rounded-xl border border-line bg-ink-2/60 px-4 py-2.5 text-sm font-bold text-ash">
                  {c.measurement.demoted}
                </span>
                <p className="max-w-xl leading-relaxed text-fog">{c.measurement.demotedTail}</p>
              </div>
            </Rise>
          </Container>
        </section>

        {/* The programme. Four numbered stages and an unnumbered "Ongoing",
            with stage four stating that early figures read worse than they
            settle — which is exactly the shape this ladder was built for. */}
        <StageLadder
          id="process"
          label="How LinkedIn Ads Management Works"
          index="05"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Industries. One sentence, eight categories, no descriptions — so
            there is nothing to put in a card and no detail to reveal. Set as
            the audience selector the section actually describes: these are the
            industry values a campaign is targeted on, which is the same idea
            the record and the matched-account list on this page are drawing.
            The document's own CTA closes the section. */}
        <section
          id="industries"
          data-section="Industries We Run LinkedIn Campaigns For"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            {/* Header beside the panel, not above it. Eight short labels and no
                descriptions cannot fill a full-width section stacked under a
                full-width header, and padding is not content. */}
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <div>
                <SectionHeader
                  index="06"
                  title={c.industries.title}
                  strokeTitle={c.industries.strokeTitle}
                  mark={{ variant: "ecosystem", label: "Eight industry values, all selected" }}
                  className="mb-10"
                />

                {/* The document places a call to action directly after this
                    list, so it sits with the heading rather than trailing the
                    panel by a screen's height. */}
                <Rise delay={0.12}>
                  <a
                    href="#quote"
                    className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
                  >
                    {c.industries.cta}
                  </a>
                </Rise>
              </div>

              <div className="rounded-[1.75rem] border border-line bg-ink-2 p-6 sm:p-7">
                {/* The panel's own header rule. */}
                <div aria-hidden className="flex items-center gap-3 border-b border-line pb-5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                  <span className="h-1.5 w-24 rounded-full bg-fog/50" />
                  <span className="h-px flex-1 bg-line" />
                </div>

                {/* Two columns wherever the panel is wide enough; one once it
                  becomes the narrow half of the split at lg. */}
                <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
                  {c.industries.items.map((industry, i) => (
                    <li key={industry} className="group border-b border-line/70">
                      <Rise delay={(i % 4) * 0.05}>
                        <div className="flex items-center gap-4 py-4">
                          <span
                            aria-hidden
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-brand/60 bg-brand/15 transition-colors duration-500 group-hover:bg-brand/30"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          </span>
                          <p className="font-display text-sm font-extrabold uppercase leading-[1.2] text-snow sm:text-base">
                            {industry}
                          </p>
                        </div>
                      </Rise>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
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

        <Work index="07" label="Summits Reached" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Not Sure LinkedIn Is Right for You"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
