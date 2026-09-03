"use client";

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

export function OnPageSeoPage() {
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
              title={c.control.title}
              strokeTitle={c.control.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="split">
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
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
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-ash"
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
                className="font-display block text-[0.62rem] font-bold tabular-nums text-brand-text"
              >
                03
              </span>
              {/* Part three is the label; the sentence after it is the point, so
                  only one of the two takes the display size. Two stacked
                  display-xl blocks competed and cost 120px saying it twice. */}
              <h3 className="font-display mt-4 max-w-3xl text-[clamp(1.15rem,2.2vw,1.65rem)] font-extrabold uppercase leading-[1.16] text-snow">
                {c.control.parts[2].what}
              </h3>
              <p className="font-display display-xl mt-5  font-extrabold uppercase text-brand">
                {c.control.yours}
              </p>

              {/* What it does not need, as a run rather than three pills. */}
              <p className="font-display mt-9 flex flex-wrap items-baseline text-[clamp(0.95rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.3] text-snow">
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
                        className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text lg:ml-[var(--step)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.2] text-snow transition-colors duration-500 group-hover:text-brand">
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

        {/* Two names for the same service, set as a pair rather than as a
            contrast in scale.

            The previous version shouted the internal phrase at display size
            opposite a search field, which put the emphasis on the wrong half:
            the document's point is not that the internal name is loud, it is
            that the two names sit side by side and pull apart. So they are
            given equal room either side of a rule, each with its own label,
            and only the searched one keeps the field — because that is
            literally where it gets typed.

            The rules are the layout. A vertical one splits the pair; a
            horizontal one separates the pair from where the second name goes;
            another separates that from the two footnotes, which are themselves
            split by a vertical rule. Section-level borders were removed across
            the site, so every line drawn here is internal to the section. */}
        <section
          id="words"
          data-section="Words Your Customer Would Actually Use"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.words.title}
              strokeTitle={c.words.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="tension">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.words.tension}
                  </p>
                </Rise>
              }
            />

            {/* The pair. Equal columns, divided by a rule that only exists
                once there is room for two columns to sit beside each other. */}
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2 lg:items-start">
              {/* What the company calls itself. The mark is a document,
                  because this is the language that lives in company
                  literature rather than in a search box. */}
              <Rise>
                <div className="flex gap-5">
                  <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                      <path
                        d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path
                        d="M9 12h6M9 15.5h6M9 8.5h2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase text-ash">
                      {c.words.internalLead}
                    </p>
                    <p className="mt-3 max-w-md leading-relaxed text-snow sm:text-lg">
                      {c.words.internal}
                    </p>
                  </div>
                </div>
              </Rise>

              {/* What actually gets typed. Same weight of room as the phrase
                  beside it; the field is what marks it out, not the type size. */}
              <Rise delay={0.1} className="relative lg:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 hidden h-[calc(100%-0.25rem)] w-px bg-line lg:block"
                />
                <p className="text-[0.62rem] font-semibold uppercase text-brand-text">
                  {c.words.searcherLead}
                </p>

                <div className="mt-4 flex items-center gap-4 rounded-full border border-brand/45 bg-void/70 px-6 py-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] sm:px-7">
                  <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5 shrink-0 text-brand" fill="none">
                    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12.8 12.8 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <p className="font-display text-[clamp(1rem,1.7vw,1.35rem)] font-extrabold leading-[1.2] text-snow">
                    {c.words.searcher}
                  </p>
                  <span aria-hidden className="ml-auto hidden h-6 w-px shrink-0 bg-brand/70 sm:block" />
                </div>
              </Rise>
            </div>

            {/* Where the second one goes. The lead sits in its own column so
                the three placements start on a common left edge and read as a
                set rather than as the tail of a sentence. */}
            <Rise delay={0.16} className="mt-12 border-t border-line pt-8">
              <div className="grid gap-x-10 gap-y-3 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-baseline">
                <p className="text-[0.62rem] font-semibold uppercase text-ash">
                  {c.words.usageLead}
                </p>
                {/* No separator between the placements any more. They used to
                    be three parallel items and a brand slash between them read
                    as a list; the revised copy is two clauses of one sentence
                    and the first ends in its own comma, so a slash would double
                    the punctuation. A plain space is what the sentence asks
                    for. */}
                <p className="font-display text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold uppercase leading-[1.35] text-snow">
                  {c.words.placements.join(" ")}
                </p>
              </div>
              <p className="mt-7 max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.words.usageTail}
              </p>
            </Rise>

            {/* Where the document points next. Set as footnotes, because that
                is what they are, and split by a rule so the two references do
                not read as one paragraph. */}
            <Rise delay={0.2} className="mt-10 border-t border-line pt-7">
              <div className="grid gap-x-12 gap-y-5 lg:grid-cols-2">
                <p className="text-sm leading-relaxed text-fog">{c.words.related}</p>
                <p className="relative text-sm leading-relaxed text-fog lg:pl-12">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 hidden h-full w-px bg-line lg:block"
                  />
                  {c.words.wider}
                </p>
              </div>
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
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
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
                          "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.16]",
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
              <p className="font-display max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1.3rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.14] text-brand sm:pl-8">
                {c.timing.refusal}
              </p>
            </Rise>

            {/* And what it will. */}
            <Rise delay={0.18} className="mt-8 border-t border-line pt-7">
              <p className="text-[0.65rem] font-semibold uppercase text-ash">
                {c.timing.canTellLead}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.timing.canTell.map((item) => (
                  <li
                    key={item}
                    className="font-display rounded-lg border border-brand/45 bg-brand/[0.07] px-3.5 py-2 text-sm font-bold text-snow"
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
          className="relative overflow-x-clip py-14 sm:py-16"
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
                        className="font-display shrink-0 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-none text-snow/[0.14] transition-colors duration-500 group-hover:text-brand/40"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display pt-1 text-[clamp(1rem,1.8vw,1.2rem)] font-bold uppercase leading-[1.3] text-fog transition-colors duration-500 group-hover:text-snow">
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
                            "font-display text-[clamp(1.05rem,1.9vw,1.4rem)] font-extrabold uppercase leading-[1.18]",
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

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

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
