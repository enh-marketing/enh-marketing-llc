import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/on-page-seo";

import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PositionFourteen } from "@/components/service/PositionFourteen";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/on-page-seo";
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
  name: "On-Page SEO",
  serviceType:
    "On-page SEO: title tags, headings, content structure, internal links and schema markup",
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
    name: "SEO",
    url: "https://enhmedia.com/services/seo",
  },
};

export default function OnPageSeoPage() {
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
          visual={<PositionFourteen key="serp" />}
        />

        {/* The opening is a small case study: a page nobody looks at, and the
            three ordinary faults behind it. Those decode as three, because the
            document lists three and the point is how mundane each one is. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          bodyLead={c.narrative.faultsLead}
          body={c.narrative.faults}
          highlight={["heading", "title", "introduction"]}
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

        {/* Search visibility in three parts, argued by scale. Two of them are
            set small and grey because they are the two you cannot act on
            alone; the third takes the section. That contrast is the whole
            claim — an earlier version drew a boundary line with pills on it and
            a mock page beside it, which said the same thing in graphics nobody
            can read without the caption. The copy is better than any diagram of
            it. */}
        <section
          id="control"
          data-section="The Part of SEO You Control Completely"
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
              title={c.control.title}
              strokeTitle={c.control.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="split">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow">
                    {c.control.lead}
                  </p>
                </Rise>
              }
            />

            {/* The two that need somebody else. */}
            <ol className="border-t border-line">
              {c.control.parts.slice(0, 2).map((part, i) => (
                <li key={part.what} className="border-b border-line">
                  <Rise delay={i * 0.06}>
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums tracking-[0.2em] text-ash"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base text-ash sm:text-lg">{part.what}</p>
                      {part.control && (
                        <p className="text-sm text-fog">{part.control}</p>
                      )}
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* And the one that does not. */}
            <Rise delay={0.14} className="mt-10">
              <span
                aria-hidden
                className="font-display block text-[0.62rem] font-bold tabular-nums tracking-[0.2em] text-brand-text"
              >
                03
              </span>
              {/* Part three is the label; the sentence after it is the point, so
                  only one of the two takes the display size. Two stacked
                  display-xl blocks competed and cost 120px saying it twice. */}
              <h3 className="font-display mt-4 max-w-3xl text-[clamp(1.15rem,2.2vw,1.65rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                {c.control.parts[2].what}
              </h3>
              <p className="font-display display-xl mt-5  font-extrabold uppercase text-brand">
                {c.control.yours}
              </p>

              {/* What it does not need, as a run rather than three pills. */}
              <p className="font-display mt-9 flex flex-wrap items-baseline text-[clamp(0.95rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.3] tracking-tight text-snow">
                {c.control.nos.map((no, i) => (
                  <Fragment key={no}>
                    {i > 0 && (
                      <span aria-hidden className="mx-3 text-brand sm:mx-4">
                        /
                      </span>
                    )}
                    {no}
                  </Fragment>
                ))}
              </p>

              <p className="mt-8 max-w-2xl leading-relaxed text-fog sm:text-lg">
                {c.control.neglect}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Drift, set as drift. The five sentences are the best writing in the
            document and each one steps a little further right than the last, so
            the shape of the section is the thing it describes. No chart, no log
            chrome, no markers standing in for an alarm that never went off —
            those were decorations on top of copy that did not need them. */}
        <section
          id="drift"
          data-section="Where Pages Lose Rankings They Already Had"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.drift.title}
              strokeTitle={c.drift.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="notone">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.drift.notOne}</p>
                  <p className="font-display display-xl mt-4 font-extrabold uppercase text-brand">
                    {c.drift.they}
                  </p>
                </Rise>
              }
            />

            <ol className="border-t border-line">
              {c.drift.events.map((event, i) => (
                <li key={event} className="group border-b border-line">
                  <Rise delay={i * 0.06}>
                    {/* Each one a step further out. */}
                    <div
                      className="flex items-baseline gap-5 py-5 transition-[padding] duration-500 lg:gap-7"
                      style={{ ["--step" as string]: `${i * 2.75}rem` }}
                    >
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums tracking-[0.2em] text-ash transition-colors duration-500 group-hover:text-brand-text lg:ml-[var(--step)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.2] tracking-tight text-snow transition-colors duration-500 group-hover:text-brand">
                        {event}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.16} className="mt-9">
              <p className=" border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.drift.closing}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Two names for the same service. The document says they "pull in
            different directions", so the section pulls them apart: one sits
            top-left as the phrase a company says about itself, the other drops
            to the right as the thing somebody actually types — and it is set in
            a search field, because that is literally where it gets typed.
            
            The field is not a decorative mock. It holds the document's real
            query at readable size, which is the opposite of the grey-bar page
            panels this section had before: those were 90% empty chrome around
            one line of copy. Everything drawn here carries words. */}
        <section
          id="words"
          data-section="Words Your Customer Would Actually Use"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.words.title}
              strokeTitle={c.words.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="tension">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                    {c.words.tension}
                  </p>
                </Rise>
              }
            />

            <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2 lg:items-start">
              {/* What the company calls it. */}
              <Rise>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ash">
                  {c.words.internalLead}
                </p>
                <p className="font-display display-xl mt-5 font-extrabold uppercase text-ash">
                  {c.words.internal}
                </p>
              </Rise>

              {/* What gets typed. Offset down and to the right: the two are
                  pulling apart, which is the sentence above them. */}
              <Rise delay={0.1} className="lg:pt-20">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brand-text">
                  {c.words.searcherLead}
                </p>

                <div className="mt-5 flex items-center gap-4 rounded-full border border-brand/45 bg-void/70 px-6 py-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] sm:px-7 sm:py-5">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6"
                    fill="none"
                  >
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12.8 12.8 17 17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="font-display text-[clamp(1.05rem,2.1vw,1.7rem)] font-extrabold leading-[1.15] tracking-tight text-snow">
                    {c.words.searcher}
                  </p>
                  <span
                    aria-hidden
                    className="ml-auto hidden h-6 w-px shrink-0 bg-brand/70 sm:block"
                  />
                </div>
              </Rise>
            </div>

            {/* Where the second one goes. */}
            <Rise delay={0.16} className="mt-14 border-t border-line pt-9">
              <p className="font-display flex flex-wrap items-baseline text-[clamp(1rem,1.8vw,1.3rem)] font-extrabold uppercase leading-[1.3] tracking-tight text-snow">
                <span className="mr-3 text-[0.62rem] font-semibold tracking-[0.2em] text-ash sm:mr-4">
                  {c.words.usageLead}
                </span>
                {c.words.placements.map((place, i) => (
                  <Fragment key={place}>
                    {i > 0 && (
                      <span aria-hidden className="mx-3 text-brand sm:mx-4">
                        /
                      </span>
                    )}
                    {place}
                  </Fragment>
                ))}
              </p>
              <p className="mt-6 max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.words.usageTail}
              </p>
            </Rise>

            {/* Where the document points next. Set as footnotes, because that
                is what they are. */}
            <Rise delay={0.2} className="mt-9 grid gap-x-12 gap-y-3 border-t border-line pt-7 lg:grid-cols-2">
              <p className="text-sm leading-relaxed text-fog">{c.words.related}</p>
              <p className="text-sm leading-relaxed text-fog">{c.words.wider}</p>
            </Rise>
          </Container>
        </section>

        {/* The run, drawn on the thing it operates on. Every stage here does
            something to pages — picks some, merges two, rewrites the signals,
            ships them, watches them — so one set of pages stays on screen and
            what has happened to it changes. */}
        <PinnedExplorer
          id="process"
          label="How We Work Through a Site"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          items={c.process.items}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "progression", label: "Five stages, one set of pages" }}
          diagram={{ kind: "pageset" }}
        />

        {/* Timing, drawn as the mechanism the document names. It says Google
            "has to recrawl before a change counts" and that large sites take
            longer "because the crawl works through in stages", so the two cases
            are the same crawl at two scales: one that has finished and one
            still working through. No dates are marked — the document gives
            none, and the refusal below says why nobody should. */}
        <section
          id="timing"
          data-section="What Changes and When You See It"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.timing.title}
              strokeTitle={c.timing.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="instant">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-snow">
                    {c.timing.notInstant}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">{c.timing.recrawl}</p>
                </Rise>
              }
            />

            <ol className="border-t border-line">
              {[
                { line: c.timing.small, pages: 9, done: 9 },
                { line: c.timing.large, pages: 26, done: 7 },
              ].map((row, i) => (
                <li key={row.line} className="border-b border-line py-6">
                  <Rise delay={i * 0.08}>
                    <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
                      {/* The crawl, working through. */}
                      <span aria-hidden className="flex flex-wrap items-center gap-1.5">
                        {Array.from({ length: row.pages }).map((_, k) => {
                          const crawled = k < row.done;
                          const front = k === row.done - 1;
                          return (
                            <span
                              key={k}
                              className={cn(
                                "h-3.5 w-3.5 rounded-[3px] border transition-colors duration-500",
                                crawled
                                  ? "border-brand/60 bg-brand/25"
                                  : "border-line bg-void/40",
                                front && "bg-brand",
                              )}
                            />
                          );
                        })}
                      </span>

                      <p
                        className={cn(
                          "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16] tracking-tight",
                          i === 0 ? "text-snow" : "text-ash",
                        )}
                      >
                        {row.line}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* The one thing the document will not promise. */}
            <Rise delay={0.14} className="mt-9">
              <p className="font-display max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1.3rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.14] tracking-tight text-brand sm:pl-8">
                {c.timing.refusal}
              </p>
            </Rise>

            {/* And what it will. */}
            <Rise delay={0.18} className="mt-8 border-t border-line pt-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
                {c.timing.canTellLead}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.timing.canTell.map((item) => (
                  <li
                    key={item}
                    className="font-display rounded-lg border border-brand/45 bg-brand/[0.07] px-3.5 py-2 text-sm font-bold tracking-tight text-snow"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Rise>
          </Container>
        </section>

        {/* Who it suits. Five descriptions a reader should be able to point at
            and recognise, so they are set to be read: a large index and the
            sentence, two to a row. An earlier version put a forty-pixel
            abstract sketch beside each one, which added noise and told nobody
            anything the sentence had not already said. Any one of these is
            enough — unlike the all-three gates elsewhere on this site — so the
            indices are independent and nothing chains them together. */}
        <section
          id="benefit"
          data-section="Sites That Benefit Most"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.benefit.title}
              strokeTitle={c.benefit.strokeTitle}
              mark={{ variant: "growth", label: "Any one of these is enough" }}
              className="mb-10"
            />

            <ol className="grid gap-x-14 sm:grid-cols-2">
              {c.benefit.items.map((item, i) => (
                <li key={item.text} className="group border-t border-line">
                  <Rise delay={(i % 3) * 0.06}>
                    <div className="flex items-start gap-6 py-6">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-none tracking-tight text-snow/[0.14] transition-colors duration-500 group-hover:text-brand/40"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display pt-1 text-[clamp(1rem,1.8vw,1.2rem)] font-bold uppercase leading-[1.3] tracking-tight text-fog transition-colors duration-500 group-hover:text-snow">
                        {item.text}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* What you get, set as the thing you get. The first undertaking is "A
            list, not a lecture", so the section is one panel of terse entries
            rather than four cards competing for attention. Three are marked as
            things we do and the fourth as a thing we do not: the document's own
            word for it is "No". */}
        <section
          id="deliver"
          data-section="What You Get From Us"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.deliver.title}
              strokeTitle={c.deliver.strokeTitle}
              mark={{ variant: "contrast", label: "Four undertakings, one a refusal" }}
              className="mb-10"
            />

            <Rise>
              <div className="overflow-hidden rounded-[1.75rem] border border-line bg-ink-2">
                <ol>
                  {c.deliver.items.map((item, i) => {
                    const refusal = i === c.deliver.items.length - 1;
                    return (
                      <li
                        key={item.title}
                        className={cn(
                          "group grid gap-x-10 gap-y-3 border-b border-line px-6 py-6 last:border-b-0 sm:px-8 sm:py-7 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.15fr)] lg:items-baseline",
                          refusal && "bg-brand/[0.06]",
                        )}
                      >
                        {/* A thing we do, or a thing we do not. */}
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                            refusal
                              ? "border-brand/60 bg-brand/15"
                              : "border-brand/50 bg-brand/10",
                          )}
                        >
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                            {refusal ? (
                              <path
                                d="M3 3l6 6M9 3l-6 6"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                className="text-brand"
                              />
                            ) : (
                              <path
                                d="M2.5 6.5l2.5 2.5L9.5 3.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-brand"
                              />
                            )}
                          </svg>
                        </span>

                        <h3
                          className={cn(
                            "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18] tracking-tight",
                            refusal ? "text-brand" : "text-snow",
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "leading-relaxed",
                            refusal ? "text-snow" : "text-fog",
                          )}
                        >
                          {item.body}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Rise>

            <Rise delay={0.12} className="mt-9">
              <a
                href="#quote"
                className="group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
              >
                {c.deliver.cta}
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

        <Work index="08" label="Summits Reached" />

        <FaqList label="FAQs" index="09" title="FAQs" faqs={c.faqs} />

        <CtaBand
          label="Send Us a Page and We Will Tell You What Is Wrong With It"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
