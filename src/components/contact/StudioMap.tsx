"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { brand } from "@/lib/content";
import { studioMap } from "@/content/contact";
import { cn } from "@/lib/cn";

/** The studio, on the map, full width and closing the page.
 *
 *  THE EMBED IS KEYLESS AND BUILT FROM `brand.address`. It needs no API key and
 *  no billing account, which is the only responsible default for a page nobody
 *  has provisioned a key for. It resolves the address as a SEARCH, so the pin is
 *  as good as Google's geocoding of that string.
 *
 *  TODO(client): when the Google Business Profile is to hand, replace the URL
 *  with the "Embed a map" snippet from it. That pins the verified listing and
 *  brings the business card with it, instead of trusting a geocode.
 *
 *  IT IS NOT A "GENERIC MAP EMBED", and the difference is three things. It is
 *  full bleed, so it reads as the page's closing plate rather than as a widget
 *  in a column. It is tinted to the palette -- see .map-tint in globals.css --
 *  because Google's own colours are the one thing on this page that would not
 *  be the brand's. And it carries a panel with the action, so the section does
 *  something rather than only showing something.
 *
 *  THE ADDRESS IS NOT PRINTED HERE. The hero's Location card already carries
 *  `brand.address` in full, and this site's rule is that no line of copy is set
 *  twice on one page. The panel names the studio and offers directions; the
 *  address it would repeat is four hundred pixels above it.
 *
 *  THE PANEL MOVES RATHER THAN SHRINKS. Over the map from `lg`, under it below
 *  that: a card wide enough to read is 384px, which on a 390px phone would
 *  cover the entire map it is meant to be annotating.
 *
 *  CLICK TO ACTIVATE, AND THAT IS DELIBERATE. Lenis ships a rule --
 *  `.lenis.lenis-smooth iframe { pointer-events: none }` -- that makes every
 *  iframe on this site inert while smooth scrolling is on, which is always. It
 *  exists to stop an embed swallowing the page's scroll, and on a page whose
 *  purpose is the form above this section, a map that traps the wheel is a real
 *  cost. So the map starts inert and one click makes it live; from then on the
 *  wrapper carries data-lenis-prevent, so scrolling inside it zooms the map and
 *  leaves the page where it is. A visitor who only wants directions never has
 *  to touch it. */
/** The card: label, name, one line, and the action. Rendered twice, and only
 *  ever one of them is in the accessibility tree because the other is
 *  `display: none`. Over the map from `lg`, where there is width to spare; in
 *  flow underneath it below that, because at 390px a panel wide enough to read
 *  covers the whole map it is supposed to be sitting on. */
function Panel({ directions }: { directions: string }) {
  return (
    <div className="max-w-sm rounded-2xl border border-line bg-ink-3/92 p-7 backdrop-blur-md sm:p-8">
      <span aria-hidden className="block h-px w-10 bg-brand" />
      <p className="mt-5 text-[11px] font-semibold uppercase text-ash">{studioMap.label}</p>
      <p className="font-display display-lg mt-3 font-extrabold uppercase leading-[1.05] text-snow">
        {studioMap.title}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-fog">{studioMap.body}</p>

      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
      >
        {studioMap.directions}
        <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
          <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
          <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
        </span>
      </a>
    </div>
  );
}

export function StudioMap() {
  const [live, setLive] = useState(false);

  const query = encodeURIComponent(brand.address);
  /* The frameable endpoint, reached directly. The familiar shortcut --
     `google.com/maps?q=...&output=embed` -- answers with a 301 to exactly this
     URL, and that redirect response carries `X-Frame-Options: SAMEORIGIN`,
     which is enough for a browser to refuse the frame. Measured against the
     live endpoints: the shortcut returns `HTTP 301` + `x-frame-options:
     SAMEORIGIN`, this returns `HTTP 200` with no framing restriction at all.
     `pb` is Google's own opaque parameter; `!1m2!2m1!1s` prefixes a plain
     search string, which is what the shortcut encodes the address into. */
  const embed = `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${query.replace(
    /%20/g,
    "+",
  )}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section id="studio" data-section="The Studio" className="relative">
      {/* Full bleed: out of the container, edge to edge, with hairlines top and
          bottom so the band still belongs to a page built from rules. */}
      <div
        {...(live ? { "data-lenis-prevent": true } : {})}
        className="relative isolate w-full overflow-hidden border-y border-line bg-ink-2"
        style={{ height: "clamp(17rem, 46vh, 34rem)" }}
      >
        <iframe
          title={studioMap.frameTitle}
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn("map-tint absolute inset-0 h-full w-full border-0", live && "map-live")}
        />

        {/* A brand wash over Google's grey, at the strength the rest of the page
            uses its aurora. pointer-events-none, so it never comes between a
            live map and the pointer. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 22% 50%, rgba(232,0,13,0.14), transparent 70%)",
          }}
        />
        {/* And a fade under the panel, so it always has ground to sit on
            whatever the map happens to be showing there. Only where the panel
            actually overlays the map. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-full max-w-2xl lg:block"
          style={{
            background:
              "linear-gradient(90deg, var(--color-void) 0%, color-mix(in srgb, var(--color-void) 62%, transparent) 32%, transparent 74%)",
          }}
        />

        {/* The activation surface: the whole map until the first click, then
            gone for good. */}
        {!live && (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="group absolute inset-0 z-10 flex items-end justify-end p-5 sm:p-8"
          >
            <span className="flex items-center gap-2.5 rounded-full border border-line bg-ink-3/90 px-4 py-2.5 text-[0.7rem] font-semibold uppercase text-fog backdrop-blur-sm transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
              {studioMap.activate}
            </span>
          </button>
        )}

        <Container className="pointer-events-none absolute inset-0 z-20 hidden h-full items-center lg:flex">
          <div className="pointer-events-auto">
            <Panel directions={directions} />
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:hidden">
        <Panel directions={directions} />
      </Container>
    </section>
  );
}
