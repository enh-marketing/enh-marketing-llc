import type { Metadata } from "next";
import { Fragment } from "react";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/seo-audit";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { FourHundred } from "@/components/service/FourHundred";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/seo-audit";
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
  name: "SEO Audit",
  serviceType:
    "SEO audit: technical health, on-page signals, content, off-site authority and AI visibility",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
  isPartOf: { "@type": "Service", name: "SEO", url: "https://enhmedia.com/services/seo" },
};

/** The document writes three of the five claims as "X, not Y". The rejected
 *  half is kept and struck rather than dropped: the contrast is the claim. */
function ApproachTitle({ claim }: { claim: c.Claim }) {
  if (!claim.not) {
    return (
      <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-snow">
        {claim.title}
      </h3>
    );
  }
  return (
    <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-snow">
      {claim.title}
      <span className="text-ash">, not </span>
      <span className="text-ash line-through decoration-brand/60 decoration-2">{claim.not}</span>
    </h3>
  );
}

export default function SeoAuditPage() {
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
          visual={<FourHundred key="grid" />}
        />

        {/* The audit nobody reads twice. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.body}
          highlight={["developer", "again"]}
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

        {/* Four situations that arrive by different routes and need the same
            answer, so the section is a quadrant: two rules crossing, one
            situation per quarter, and a node where they meet. The answer hangs
            off that node. It is the only composition on this page that is not a
            run of rows, which is the point — the page had one texture repeated
            six times. */}
        <section
          id="reasons"
          data-section="Why Sites Get Audited"
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
              index="01"
              title={c.reasons.title}
              strokeTitle={c.reasons.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="lead">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {c.reasons.lead}
                  </p>
                </Rise>
              }
            />

            <div className="relative">
              <ol className="grid sm:grid-cols-2">
                {c.reasons.items.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "group border-t border-line py-6 sm:py-7",
                      // The cross: left cells get a right rule, top cells a
                      // bottom one. Below sm the quadrant is a stack and the
                      // rules would describe a shape that is not on screen.
                      i % 2 === 0 && "sm:border-r sm:pr-10",
                      i % 2 === 1 && "sm:pl-10",
                      i < 2 && "sm:border-b",
                      i >= 2 && "sm:border-t-0",
                    )}
                  >
                    <Rise delay={(i % 2) * 0.07}>
                      <span
                        aria-hidden
                        className="font-display block text-[0.62rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display mt-4 text-[clamp(1.1rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.2] text-snow transition-colors duration-500 group-hover:text-brand">
                        {item}
                      </p>
                    </Rise>
                  </li>
                ))}
              </ol>

              {/* Where the four meet. */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-brand bg-ink-3 sm:block"
              />
            </div>

            {/* And what they all need. */}
            <Rise delay={0.16} className="mt-9">
              <span
                aria-hidden
                className="mx-auto mb-5 hidden h-7 w-px bg-line sm:block"
              />
              <p className="text-[0.62rem] font-semibold uppercase text-ash">
                {c.reasons.convergeLead}
              </p>
              <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)] mt-4  font-extrabold uppercase text-brand">
                {c.reasons.converge}
              </p>
            </Rise>
          </Container>
        </section>

        {/* The five areas, and the page's interactive moment. The document
            calls them "five connected areas" and says the audit shows where
            visibility is being lost — and they are not a sequence or a menu but
            different distances from the page: two outside the site, one the
            boundary of it, one the set of pages inside, one a single page. So
            the drawing is that map and selecting an area lights the zone it
            examines. Every zone stays on screen at every selection, because the
            document's word is "connected".

            This replaces a three-column table. The table read well but the page
            had no interactive element anywhere in it, and this content is the
            only place on the page where selecting something reveals something.
            The table's own column headers survive as the panel's labels, so
            nothing the source wrote is lost in the move, and the non-JS
            fallback below the large breakpoint keeps them too. */}
        <PinnedExplorer
          id="areas"
          label="The Five Areas We Check"
          index="02"
          title={c.areas.title}
          strokeTitle={c.areas.strokeTitle}
          items={c.areas.items.map((a) => ({
            no: a.no,
            title: a.area,
            body: a.check,
            note: a.matters,
            glyph: a.glyph,
          }))}
          bodyLabel={c.areas.columns[1]}
          noteLabel={c.areas.columns[2]}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Five connected areas, one map" }}
          aside={
            <Rise key="areas-lead">
              <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                {c.areas.lead}
              </p>
              <p className="mt-5 leading-relaxed text-fog sm:text-lg">{c.areas.ledeTail}</p>
            </Rise>
          }
          diagram={{ kind: "audit" }}
        />

        {/* The page's signature argument. The crawler's side is stated and set
            aside; the three questions are the section, because they are what
            judgement actually looks like. The document's own figures are
            weighted where they occur — 400 against 399 is the whole point. */}
        <section
          id="judgement"
          data-section="A Real Audit and a Tool Report Are Different Things"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.judgement.title}
              strokeTitle={c.judgement.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="crawler">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-ash">
                    {c.judgement.crawler}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">
                    {c.judgement.output}
                  </p>
                </Rise>
              }
            />

            <Rise>
              <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)]  font-extrabold uppercase text-snow">
                {c.judgement.turn}
              </p>
            </Rise>

            {/* What judgement asks, as three equal columns rather than three
                more rows. These are the three questions a tool cannot answer,
                and giving each one a full column of its own is the closest a
                layout gets to saying they carry equal weight. */}
            <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:grid-cols-3">
              {c.judgement.questions.map((question, i) => (
                <li key={question} className="group bg-ink-3">
                  <Rise delay={i * 0.07} className="h-full">
                    <div className="flex h-full flex-col gap-6 p-7 transition-colors duration-500 group-hover:bg-ink-2 sm:p-8">
                      <span
                        aria-hidden
                        className="font-display text-[0.62rem] font-bold tabular-nums text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[clamp(1.1rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.2] text-snow">
                        {question
                          .split(new RegExp(`(${c.judgement.figures.join("|")})`))
                          .map((part, j) =>
                            c.judgement.figures.includes(part) ? (
                              <span key={j} className="text-brand">
                                {part}
                              </span>
                            ) : (
                              <Fragment key={j}>{part}</Fragment>
                            ),
                          )}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.18} className="mt-9">
              <p className="font-display max-w-3xl text-[clamp(1.15rem,2.2vw,1.65rem)] font-extrabold uppercase leading-[1.16]">
                <span className="text-ash">{c.judgement.closing}</span>{" "}
                <span className="text-brand">{c.judgement.closingTail}</span>
              </p>
            </Rise>
          </Container>
        </section>

        {/* What arrives, set as the contents of the thing that arrives. The
            document's first promise is a short summary you could read before a
            meeting, so the section is typeset like the front of that document:
            numbered entries, a dotted leader out to the margin, a mark where
            each one lands. The leader is the only place on this site that uses
            one, which is exactly why it belongs here rather than a seventh run
            of rows. */}
        <section
          id="receive"
          data-section="What You Actually Receive"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.receive.title}
              strokeTitle={c.receive.strokeTitle}
              mark={{ variant: "growth", label: "Six things, and a test" }}
              className="mb-10"
            />

            <ol className="border-t border-line">
              {c.receive.items.map((item, i) => (
                <li key={item} className="group border-b border-line">
                  <Rise delay={Math.min(i, 5) * 0.05}>
                    <div className="flex items-baseline gap-5 py-4">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[0.68rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="shrink text-fog transition-colors duration-500 group-hover:text-snow sm:text-lg">
                        {item}
                      </p>
                      {/* The leader, out to the margin. */}
                      <span
                        aria-hidden
                        className="hidden h-px min-w-8 flex-1 self-center bg-[length:6px_1px] bg-repeat-x opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:block"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, var(--color-line) 0 2px, transparent 2px 6px)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="hidden h-1.5 w-1.5 shrink-0 self-center rounded-full bg-brand/60 transition-colors duration-500 group-hover:bg-brand sm:block"
                      />
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.16} className="mt-9 border-t border-line pt-8">
              <p className="leading-relaxed text-fog sm:text-lg">{c.receive.plain}</p>
              <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)] mt-5 font-extrabold uppercase text-brand">
                {c.receive.test}
              </p>
            </Rise>
          </Container>
        </section>

        {/* How long, led by the figure. The document gives one number for this
            and it is the question everybody asks first, so it is set at hero
            scale and the qualification sits under it. A stat-led composition,
            which nothing else on this page uses. */}
        <section
          id="timing"
          data-section="How Long It Takes"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.timing.title}
              strokeTitle={c.timing.strokeTitle}
              className="mb-10"
            />

            <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
              <Rise>
                <span className="text-[0.62rem] font-semibold uppercase text-ash">
                  {c.timing.spanLead}
                </span>
                <p className="font-display display-2xl mt-3 font-extrabold uppercase text-snow">
                  {c.timing.figure}
                </p>
                <p className="mt-6 max-w-xl leading-relaxed text-fog sm:text-lg">
                  {c.timing.spanTail}
                </p>
              </Rise>

              {/* The thing that actually decides it. */}
              <Rise delay={0.1}>
                <div className="rounded-2xl border border-brand/40 bg-brand/[0.06] p-7 sm:p-8">
                  <p className="font-display text-[clamp(1.1rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.16] text-brand">
                    {c.timing.access}
                  </p>
                  <p className="mt-4 leading-relaxed text-snow">{c.timing.accessBody}</p>
                </div>
              </Rise>
            </div>
          </Container>
        </section>

        {/* When it is worth doing, and the one case where it is not. */}
        <section
          id="worth"
          data-section="When an Audit Is Worth Doing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.worth.title}
              strokeTitle={c.worth.strokeTitle}
              mark={{ variant: "progression", label: "Five moments, and one exception" }}
              className="mb-10"
            />

            <ol className="border-t border-line">
              {c.worth.items.map((item, i) => (
                <li key={item} className="group border-b border-line">
                  <Rise delay={Math.min(i, 4) * 0.05}>
                    <div className="flex items-start gap-5 py-4">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70 transition-colors duration-500 group-hover:bg-brand"
                      />
                      <p className="leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow sm:text-lg">
                        {item}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* And when it is not. */}
            <Rise delay={0.16} className="mt-8">
              <div className="rounded-2xl border border-brand/40 bg-brand/[0.06] p-7 sm:p-8">
                <p className="font-display text-[clamp(1.1rem,2.1vw,1.55rem)] font-extrabold uppercase leading-[1.16] text-brand">
                  {c.worth.notLead}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-snow sm:text-lg">
                  {c.worth.notBody}
                </p>
              </div>
            </Rise>
          </Container>
        </section>

        {/* The sharpest sentence in the document, given a section that does
            almost nothing else. The supporting copy sits above it at reading
            size and the refusal takes the largest type on the page after the
            H1. Deliberately spare: after eight sections of structure, the page
            needs one that just says something. */}
        <section
          id="fixing"
          data-section="Fixing What the Audit Finds"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.fixing.title}
              strokeTitle={c.fixing.strokeTitle}
              className="mb-10"
            />

            {/* Everything the reader needs to know, briefly. */}
            <Rise>
              <div className="grid gap-x-14 gap-y-5 border-b border-line pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <p className="font-display text-[clamp(1.1rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.18] text-snow">
                  {c.fixing.standalone}
                </p>
                <div>
                  <p className="leading-relaxed text-fog sm:text-lg">{c.fixing.options}</p>
                  <p className="mt-4 leading-relaxed text-fog">{c.fixing.quoted}</p>
                </div>
              </div>
            </Rise>

            {/* And the reason it is sold that way. */}
            <Rise delay={0.14} className="mt-10">
              <p className="font-display display-lg font-extrabold  text-brand">
                {c.fixing.refusal}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Five claims. Three are written as "X, not Y", so the rejected half is
            kept and struck rather than dropped — the contrast is the claim. The
            other two have no counterpart and are not given an invented one. */}
        <section
          id="approach"
          data-section="How We Approach It Differently"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="08"
              title={c.approach.title}
              strokeTitle={c.approach.strokeTitle}
              mark={{ variant: "contrast", label: "Five claims, three of them refusals" }}
              className="mb-10"
            />

            <ol className="border-t border-line">
              {c.approach.items.map((claim, i) => (
                <li key={claim.title} className="group relative border-b border-line">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <Rise delay={Math.min(i, 4) * 0.05}>
                    <div className="grid gap-x-14 gap-y-3 py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-baseline">
                      <ApproachTitle claim={claim} />
                      <p className="leading-relaxed text-fog sm:text-lg">{claim.body}</p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.14} className="mt-9">
              <a
                href="#quote"
                className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
              >
                {c.approach.cta}
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
          formSubmitLabel={c.narrative.primary}
        />

        <Work index="09" label="Summits Reached" />

        <FaqList label="FAQs" index="10" faqs={c.faqs} />

        <CtaBand
          label="Get a Straight Read on Your Site"
          index="11"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="12" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
