"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/youtube-ads";

import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { AssetCut } from "@/components/service/AssetCut";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing/youtube-ads";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function YouTubeAdsPage() {
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
          visual={<AssetCut key="cut" />}
        />

        {/* The question nobody asks first: not targeting, not budget, but
            whether there is a video worth spending on. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.thesis}
          questionEmphasis={c.narrative.thesisEmphasis}
          body={c.narrative.body}
          highlight={["video", "asks"]}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        />

        {/* One account, two kinds of campaign, one shared layer underneath. The
            document's four consequences all follow from that single fact, so the
            fact is drawn once and the consequences hang off it. */}
        <section
          id="account"
          data-section="YouTube Ads Are Bought Inside Google Ads"
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
              title={c.account.title}
              strokeTitle={c.account.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="acct-lead">
                  <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.account.lead}
                  </p>
                  <p className="mt-5 text-[0.62rem] font-semibold uppercase text-brand-text">
                    {c.account.ledeTail}
                  </p>
                </Rise>
              }
            />

            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              {/* One account holding both, over a layer they share. */}
              <Rise>
                <div className="rounded-[1.5rem] border-2 border-brand/45 bg-brand/[0.05] p-5">
                  <div aria-hidden className="grid grid-cols-2 gap-3">
                    {/* Search: lines of text. */}
                    <span className="flex h-24 flex-col justify-center gap-2 rounded-xl border border-line bg-void/50 p-3">
                      {["82%", "64%", "74%"].map((w, i) => (
                        <span key={i} className="h-1.5 rounded-full bg-fog/50" style={{ width: w }} />
                      ))}
                    </span>
                    {/* Video: a frame. */}
                    <span className="flex h-24 items-center justify-center rounded-xl border border-brand/50 bg-brand/[0.12]">
                      <span className="h-7 w-7 rounded-full border-2 border-brand" />
                    </span>
                  </div>

                  {/* What both of them draw on. */}
                  <div aria-hidden className="mt-3 flex flex-col gap-2 rounded-xl border border-line bg-ink-2/70 p-3">
                    {["audiences", "remarketing", "conversions"].map((_, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span
                          className="h-1 flex-1 rounded-full bg-brand/35"
                          style={{ opacity: 1 - i * 0.18 }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </Rise>

              {/* The four things that follow from it. */}
              <ol className="border-t border-line">
                {c.account.items.map((item, i) => (
                  <li key={item} className="group border-b border-line">
                    <Rise delay={i * 0.06}>
                      <div className="flex items-start gap-5 py-4">
                        <span
                          aria-hidden
                          className="font-display shrink-0 pt-1 text-[0.62rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow sm:text-lg">
                          {item}
                        </p>
                      </div>
                    </Rise>
                  </li>
                ))}
              </ol>
            </div>

            {/* The document volunteers this against its own interest, so it is
                set as the section's closing statement rather than a footnote. */}
            <Rise delay={0.16} className="mt-10 border-t border-line pt-9">
              <p className=" leading-relaxed text-snow sm:text-lg">
                {c.account.implication}
              </p>
              <p className="font-display mt-5 text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-brand">
                {c.account.against}
              </p>
              <p className="mt-7 text-sm leading-relaxed text-fog">
                {c.account.reference} {c.account.connect}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Six capabilities, drawn inside the one account they all live in.
            Selecting one lights the part of the account in question, and the
            rest stay on screen because sharing the account is the point. */}
        <PinnedExplorer
          id="run"
          label="What We Run"
          index="02"
          title={c.run.title}
          strokeTitle={c.run.strokeTitle}
          items={c.run.items.map((r) => ({
            no: r.no,
            title: r.title,
            body: r.body,
            glyph: r.glyph,
          }))}
          tone="ink-2"
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Six parts, one account" }}
          aside={
            <Rise key="run-lead">
              <p className="leading-relaxed text-fog sm:text-lg">{c.run.lead}</p>
            </Rise>
          }
          diagram={{ kind: "adsaccount" }}
        />

        {/* The audience figure, then the three situations. */}
        <section
          id="earns"
          data-section="Where YouTube Earns Its Budget"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.earns.title}
              strokeTitle={c.earns.strokeTitle}
              className="mb-10"
              aside={
                <Rise key="audience">
                  <p className="text-[0.62rem] font-semibold uppercase text-ash">
                    {c.earns.audienceLead}
                  </p>
                  <p className="font-display display-xl mt-3 font-extrabold uppercase text-snow">
                    {c.earns.figure}
                  </p>
                  <p className="mt-4 leading-relaxed text-fog sm:text-lg">
                    {c.earns.audienceTail}
                  </p>
                </Rise>
              }
            />

            <Rise>
              <p className="font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-brand">
                {c.earns.lead}
              </p>
            </Rise>

            <ol className="mt-8 border-t border-line">
              {c.earns.items.map((item, i) => (
                <li key={item.no} className="group relative border-b border-line">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <Rise delay={i * 0.07}>
                    <div className="grid gap-x-14 gap-y-3 py-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-baseline">
                      <h3 className="font-display text-[clamp(1.1rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.18] text-snow">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-fog sm:text-lg">{item.body}</p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>

            <Rise delay={0.16} className="mt-9">
              <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {c.earns.compound}
              </p>
            </Rise>
          </Container>
        </section>

        {/* Who should not. Two of the four are a single sentence in the source
            and are left that way rather than padded to match the others. */}
        <section
          id="not-for"
          data-section="Who Should Not Run YouTube Ads"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.notFor.title}
              strokeTitle={c.notFor.strokeTitle}
              mark={{ variant: "contrast", label: "Four cases where it will not pay" }}
              className="mb-10"
            />

            <ol className="grid gap-4 lg:grid-cols-2">
              {c.notFor.items.map((item, i) => (
                <li key={item.title} className="h-full">
                  <Rise delay={(i % 2) * 0.07} className="h-full">
                    <div
                      className={cn(
                        "group h-full rounded-2xl border p-6 transition-colors duration-500 sm:p-7",
                        item.body
                          ? "border-brand/40 bg-brand/[0.05]"
                          : "border-line bg-ink-2 hover:border-brand/40",
                      )}
                    >
                      <span
                        aria-hidden
                        className="font-display text-[0.62rem] font-bold tabular-nums text-ash"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={cn(
                          "font-display mt-4 text-[clamp(1.05rem,1.9vw,1.35rem)] font-extrabold uppercase leading-[1.18]",
                          item.body ? "text-brand" : "text-snow",
                        )}
                      >
                        {item.title}
                      </h3>
                      {/* Where the source gives no reason, none is invented. */}
                      {item.body && (
                        <p className="mt-4 leading-relaxed text-snow">{item.body}</p>
                      )}
                    </div>
                  </Rise>
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
          formSubmitLabel={c.hero.primary}
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="See Whether Your Assets Are Ready for YouTube"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
