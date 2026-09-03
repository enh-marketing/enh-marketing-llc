"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/instagram-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Narrative } from "@/components/service/Narrative";
import { ProfileGrid } from "@/components/service/ProfileGrid";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { NinetyDayTrack } from "@/components/service/NinetyDayTrack";
import { ClaimLedger } from "@/components/service/ClaimLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing/instagram-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function InstagramMarketingPage() {
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
          formSubmitLabel="Request a Quote"
          visual={<ProfileGrid key="grid" />}
        />

        {/* The scene, then the diagnosis — decoded as three, because the
            document names three causes. Flattening them into one sentence was
            the problem with the first pass.

            Order follows the document: the problem, then the fact that the UAE
            is several markets, then who is speaking. The first pass had the
            agency paragraph ahead of the market point, because `outro` renders
            before `children`; everything after the decode now sits in one slot,
            so the sequence is explicit rather than incidental. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.problem}
          questionEmphasis="the enquiries stay roughly where they were"
          body={c.narrative.diagnosis}
          highlight={["direction", "bursts", "comments", "messages"]}
        >
          {/* The lead the list belongs to. Visible copy would duplicate what
              the numbered lines already say. */}
          <p className="sr-only">
            {c.narrative.diagnosisLead} {c.narrative.diagnosisSubject}
          </p>

          <div className="mt-14 border-t border-line pt-10">
            {/* One market, several audiences — with the document's own three.
                No border or margin of its own: the wrapper above already
                supplies both, and carrying them twice stacked two rules and
                ninety pixels for one job. */}
            <div>
              <Rise>
                <p className="font-display max-w-3xl text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold uppercase leading-[1.2] text-snow">
                  {c.narrative.marketLead}
                </p>
              </Rise>

              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {c.narrative.examples.map((ex, i) => (
                  <li key={ex.place}>
                    <Rise delay={i * 0.07}>
                      <div className="h-full rounded-2xl border border-line bg-ink-2 p-6">
                        <p className="text-[0.65rem] font-semibold uppercase text-brand-text">
                          {ex.place}
                        </p>
                        <p className="font-display mt-4 text-lg font-extrabold uppercase leading-tight text-snow">
                          {ex.business}
                        </p>
                      </div>
                    </Rise>
                  </li>
                ))}
              </ul>

              <Rise delay={0.1} className="mt-7">
                <p className="leading-relaxed text-fog sm:text-lg">
                  {c.narrative.marketTail}
                </p>
              </Rise>
            </div>

            {/* And who is speaking. */}
            <Rise delay={0.08} className="mt-11 border-t border-line pt-9">
              <p className="leading-relaxed text-fog sm:text-lg">{c.narrative.body}</p>
            </Rise>
          </div>
        </Narrative>

        {/* Services, anchored to the parts of the account each one changes.
            Same explorer as the other pages; the drawing is this page's own. */}
        <PinnedExplorer
          id="services"
          label="Our Instagram Marketing Services"
          index="01"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items}
          tone="ink-2"
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Six kinds of work on one account" }}
          diagram={{ kind: "profile", anchors: c.services.items.map((s) => s.anchor) }}
        >
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <p className=" leading-relaxed text-fog">
              {c.services.outro} {c.adsLink.lead}{" "}
              <a
                href={c.adsLink.href}
                className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
              >
                {c.adsLink.label}
              </a>
              .
            </p>
          </Rise>
        </PinnedExplorer>

        <NinetyDayTrack
          id="programme"
          label="How Our Instagram Management Works"
          index="02"
          title={c.programme.title}
          strokeTitle={c.programme.strokeTitle}
          lede={c.programme.lede}
          frame={c.programme.frame}
          milestone={c.programme.milestone}
          deliverableLabel={c.programme.deliverableLabel}
          stages={c.programme.stages}
        />

        {/* Who we run Instagram for.

            Seven categories, and inside them roughly twenty-five named kinds of
            business — restaurants, cloud kitchens, dermatology, fit-out
            studios. Those specifics are the persuasive part: a reader scanning
            for themselves finds their own trade, not a category heading. The
            previous version buried them as small print at the end of seven
            sparse rows, which measured 0.62 characters per pixel, the emptiest
            section on the page.

            So the examples are promoted to the surface and the categories become
            their labels. The density is the design. */}
        <section
          id="sectors"
          data-section="Who We Run Instagram For"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.sectors.title}
              strokeTitle={c.sectors.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lede">
                  <p className="font-display text-[clamp(1.1rem,2vw,1.55rem)] font-extrabold uppercase leading-[1.2] text-snow">
                    {c.sectors.lede}
                  </p>
                </Rise>
              }
            />

            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {c.sectors.items.map((sector, i) => (
                <li
                  key={sector.name}
                  className={cn(
                    "group border-t border-line pt-5",
                    // The one category with no examples of its own takes the
                    // full width rather than leaving a half-empty cell.
                    sector.examples.length === 0 && "sm:col-span-2 lg:col-span-3",
                  )}
                >
                  <Rise delay={(i % 3) * 0.05}>
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-xs font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[0.7rem] font-semibold uppercase text-fog transition-colors duration-500 group-hover:text-snow">
                        {sector.name}
                      </h3>
                    </div>

                    {sector.examples.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {sector.examples.map((ex) => (
                          <li
                            key={ex}
                            className="font-display rounded-lg border border-line bg-ink-2 px-3.5 py-2 text-sm font-bold text-snow transition-colors duration-500 hover:border-brand/50"
                          >
                            {ex}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <ClaimLedger
          id="why-enh"
          label="Why Choose ENH Marketing"
          index="04"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          mark="Six claims, and what backs each"
          items={c.why.items}
          evidence={[
            {
              at: 1,
              kind: "chips",
              lead: c.why.reportsOnLead,
              chips: c.why.reportsOn,
              struck: c.why.refuses,
              accent: true,
            },
            { at: 3, kind: "chips", lead: c.why.citedByLead, chips: c.why.citedBy },
            { at: c.why.items.length - 1, kind: "figure", figure: c.why.tenureFigure },
          ]}
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Ready to Make Instagram Work Properly"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}
