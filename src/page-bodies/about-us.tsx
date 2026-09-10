"use client";

import * as c from "@/content/about-us";
import type { PartnerBadge } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";
import { AboutMasthead } from "@/components/about/AboutMasthead";
import { CairnStack } from "@/components/about/CairnStack";
import { ValuesFrieze } from "@/components/about/ValuesFrieze";
import { FoldingRule } from "@/components/about/FoldingRule";
import { PartnerChapter } from "@/components/about/PartnerChapter";

/* Drives <Breadcrumbs href={HREF} />. A top-level page, so the trail reads
   Home > About and Breadcrumbs renders it at length two. See sitemap.ts, where
   the About node points here rather than at "/about" — and note that
   scripts/check-routes.mjs would NOT have caught that: it compares BUILT
   against the filesystem only, so this page could have shipped while every
   navbar and footer on the site still rendered About as inert text. */
const HREF = "/about-us";

/** About Us.
 *
 *  WHY THIS PAGE DOES NOT LOOK LIKE THE OTHER FORTY-EIGHT.
 *
 *  Forty-three page bodies on this site open with `ServiceHero` and close with
 *  the same four sections in the same order — `Work`, `FaqList`, `CtaBand`,
 *  `Insights` — with `Narrative` in the slot after the hero and `GrowthCta`
 *  before the coda. A reader who has seen two service pages has seen that
 *  page. An About page assembled from those slots would be the forty-fourth
 *  instance of a template at the exact moment a visitor is deciding who this
 *  company is, so the shared shell is kept and the shared shape is not.
 *
 *  KEPT, BECAUSE WITHOUT THEM THIS IS NOT THIS SITE: the tokens, `Container`,
 *  `SectionHeader` at its locked `display-xl`, `Rise` and `Chars`, `Marked`,
 *  the section shell and the automatic banding, `Breadcrumbs` inside the hero,
 *  `TrustStrip … compact` closing the fold, `FaqList`, `CtaBand`,
 *  `StickyCTABar`, `PartnerBadges`, and the reduced-motion discipline.
 *
 *  DROPPED, AND WHY EACH:
 *
 *   - `ServiceHero`. Replaced by `AboutMasthead`. See that file.
 *   - `Narrative`. Its slot is the founding chapter, which has its own drawing.
 *   - `ResultStats`. There are exactly two numbers in the source document —
 *     "established in 2011" and "more than 15 years" — and neither is a
 *     quantity a four-figure band could carry. The site's own `stats` in
 *     lib/content.ts hold four such figures and NONE of them appear here,
 *     because this document does not support them.
 *   - `GrowthCta`. The document gives no heading, support line or button label
 *     for it, so every word in it would have to be written by us. Same
 *     reasoning as industries-ecommerce-retail.tsx.
 *   - `Work` and `Insights`. Both are real site content, but this document
 *     mentions neither case studies nor articles, and the page is a stronger,
 *     tighter read for ending on the accreditation, the questions and the ask.
 *
 *  THE ONE THING THAT MUST NOT BE DROPPED IS `CtaBand`, and not for its copy:
 *  `Navbar.ctaTarget()` returns "#quote" for every path but "/" and
 *  "/contact-us", and `StickyCTABar` defaults to the same anchor. `CtaBand`
 *  hardcodes `id="quote"`, so without it the fixed header's CTA and the mobile
 *  bar would both point at an anchor that does not exist on this page.
 *
 *  SECTION SURFACES ARE NOT SET HERE, ANYWHERE. `@layer base` in globals.css
 *  owns them, counted from the bottom of `main`, and a `bg-*` on a section
 *  would silently flip the parity of every band above it. The Google Partner
 *  chapter is set apart by vertical scale instead, which is what
 *  docs/DESIGN.md rule 6 says to use in place of a per-section theme. */
export function AboutUsPage({ badges }: { badges: PartnerBadge[] }) {
  return (
    <>
      <main>
        <AboutMasthead
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          founded={c.story.founded}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" label="Trusted By" compact />}
          formTitle={c.hero.primary}
          formFields={c.formFields}
        />

        {/* 01 — the founding chapter. A cairn: what has been built is what the
            next climb stands on. See CairnStack. */}
        <CairnStack
          id="story"
          label="Explore New Heights"
          index="01"
          title={c.story.title}
          strokeTitle={c.story.strokeTitle}
          established={c.story.established}
          establishedMark="established in 2011"
          strive={c.story.strive}
          striveMark={c.story.striveMark}
          mission={c.story.mission}
        />

        {/* 02 — three values, three drawings, one ground. See ValuesFrieze. */}
        <ValuesFrieze
          id="values"
          label="Our Core Values"
          index="02"
          title={c.values.title}
          strokeTitle={c.values.strokeTitle}
          items={c.values.items}
          sheetLabels={c.values.sheetLabels}
          rootMarks={c.values.rootMarks}
        />

        {/* 03 — the team, as the proportion the document actually claims: a
            folding rule the reader opens. See FoldingRule. */}
        <FoldingRule
          id="team"
          label="Our Team"
          index="03"
          title={c.team.title}
          strokeTitle={c.team.strokeTitle}
          collaborate={c.team.collaborate}
          essence={c.team.essence}
          talented={c.team.talented}
          small={c.team.small}
          span={c.team.span}
          spanMark={c.team.spanMark}
          aside={c.team.aside}
        />

        {/* 04 — the climax, at chapter scale. See PartnerChapter. */}
        <PartnerChapter
          id="partner"
          label="We Are A Certified Google Partner"
          index="04"
          title={c.partner.title}
          strokeTitle={c.partner.strokeTitle}
          trust={c.partner.trust}
          harness={c.partner.harness}
          ongoing={c.partner.ongoing}
          showcase={c.partner.showcase}
          requirements={c.partner.requirements}
          access={c.partner.access}
          badges={badges}
        />

        {/* The document's own three questions, all three about the badge above.
            FaqList carries the house FAQ heading and emits its own FAQPage
            JSON-LD from the same array it renders. */}
        <FaqList label="FAQs" index="05" faqs={c.faqs} />

        {/* The ask, built from the document's invitation paragraph and its one
            button label. No WhatsApp action: this document names a single call
            to action and a second label would be ours. */}
        <CtaBand
          label="Reach Out to Discover"
          index="06"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />
      </main>

      {/* Mobile only, and it carries the document's own label rather than the
          component's "Request a quote" default. */}
      <StickyCTABar href="#quote" label={c.finalCta.primary} />
    </>
  );
}
