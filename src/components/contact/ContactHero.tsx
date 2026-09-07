"use client";

import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SignalField } from "@/components/contact/SignalField";
import { channels, hero, type ChannelTile } from "@/content/contact";
import { brand } from "@/lib/content";
import { cn } from "@/lib/cn";

/** The contact hero: the live page's own opening, at this site's scale.
 *
 *  THE SHAPE IS THE LIVE PAGE'S AND THE MATERIAL IS THIS SITE'S. Headline, one
 *  paragraph, then the four contact blocks in a row, then a rule before the
 *  form below: that is exactly the order enhmedia.com/contact-us already uses,
 *  and it is the order a visitor who came here to find a phone number needs. So
 *  nothing is rearranged for novelty. What changes is everything about how it
 *  is set: Cabinet Grotesk at .mega across three lines, the house aurora and
 *  masked grid behind it, hairline tiles instead of grey boxes, and the brand
 *  red carrying the third line.
 *
 *  THE FOUR BLOCKS ARE THE HERO'S SUBSTANCE, NOT ITS DECORATION. Three of the
 *  four are live links -- mail, tel, WhatsApp -- so the fastest possible visit
 *  to this page ends in the first viewport without scrolling and without a
 *  form. The fourth is an address, which is not a link, on this page or on the
 *  live one.
 *
 *  THE VISUAL IS BESIDE THE HEADLINE, NOT BEHIND IT. The homepage floats its
 *  planet across the right half of the hero and fades it out on scroll; here the
 *  field is a defined column in a two-up grid, because it has to share the fold
 *  with four contact cards and an overlay would sit on top of them. See
 *  SignalField for what it draws and why.
 *
 *  THE HEADING IS .display-2xl RATHER THAN .mega, and that is the visual's
 *  doing. At .mega the longest line needs about 680px, which leaves the field a
 *  column too narrow for its two sources to be far enough apart to interfere
 *  legibly; at the service heroes' size the line needs 555px and the field gets
 *  645px, which is the better trade by a wide margin. It is also the size every
 *  other inner page on this site opens at.
 *
 *  THE FOUR BLOCKS ARE THE HOUSE CARD, not bare hairlines. See Tile below for
 *  why that changed and what the treatment is.
 *
 *  The h1 renders statically with no entrance animation: it is the LCP element
 *  and has to paint on the first frame. Same rule as every other hero here. */

const ICONS: Record<ChannelTile["icon"], React.ReactElement> = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  ),
  chat: (
    <>
      <path d="M12 3.5c-4.7 0-8.5 3.2-8.5 7.2 0 1.7.7 3.2 1.8 4.4L4.2 20l4.6-1.3c1 .3 2 .4 3.2.4 4.7 0 8.5-3.2 8.5-7.2S16.7 3.5 12 3.5Z" />
      <path d="M9 11h6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
};

/** North-east arrow: the mark that says a card leaves the page. */
function ArrowOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One contact card.
 *
 *  THESE WERE HAIRLINE BLOCKS AND THEY READ AS UNFINISHED. A rule above an icon
 *  and two lines of text is the site's language for a heading band, not for
 *  something you are meant to click: on the near-white page the blocks had no
 *  edge, the icon tiles floated, and nothing said three of the four were links.
 *  They are the house card now -- the treatment ReasonList invented and ui/
 *  SurfaceCard owns: raised ink-3 surface, hairline border, a rule that wipes
 *  brand across the top edge on hover, a cursor spotlight, and a one-pixel lift.
 *  The three that go somewhere carry a north-east arrow that slides out; the
 *  address, which is not a link, does not, so the difference is visible before
 *  anyone hovers anything.
 *
 *  The spotlight coordinates are written straight to the element as custom
 *  properties, so tracking the pointer costs no re-render. */
function Tile({ tile }: { tile: ChannelTile }) {
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.15), transparent 70%)",
        }}
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />

      {/* Pinned to the corner rather than sitting in a header row with the
          icon, so one arrangement serves both card layouts below. Both glyphs
          are absolute inside a `relative` clip, which is the site's own
          two-arrow push: without the `relative` they resolve against the card
          and BOTH show at rest, which is what they did on first build. */}
      {tile.href && (
        <span
          aria-hidden
          className="absolute right-5 top-5 flex h-4 w-4 items-center justify-center overflow-hidden text-ash transition-colors duration-300 group-hover:text-brand sm:right-6 sm:top-6"
        >
          <span className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-5 group-hover:translate-x-5">
            <ArrowOut />
          </span>
          <span className="absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowOut />
          </span>
        </span>
      )}

      {/* TWO ARRANGEMENTS, ONE MARKUP. Icon beside the label below `lg`, which
          is a compact row; icon above it from `lg`, which is the four-across
          arrangement the live page and the reference both use. Stacked on a
          phone the four cards came to 668 points and pushed the hero past one
          and a half viewports; as rows they come to 416. */}
      <div className="flex items-start gap-4 pr-8 lg:block lg:pr-0">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {ICONS[tile.icon]}
          </svg>
        </span>

        <div className="min-w-0 lg:mt-8">
          <span className="block text-[11px] font-semibold uppercase text-ash">{tile.label}</span>
          <span
            className={cn(
              "mt-1.5 block text-[0.95rem] leading-snug transition-colors duration-300 lg:mt-2",
              tile.href ? "text-snow group-hover:text-brand" : "text-snow",
            )}
          >
            {tile.value}
          </span>
        </div>
      </div>
    </>
  );

  /* h-full: the four cards stretch to the tallest of them, so the row has one
     baseline even though the address runs to two lines. */
  const shell =
    "group relative isolate block h-full overflow-hidden rounded-2xl border border-line bg-ink-3 p-5 transition-[border-color,transform] duration-500 sm:p-6";

  if (!tile.href) {
    return (
      <div onPointerMove={track} className={shell}>
        {inner}
      </div>
    );
  }
  return (
    <a
      href={tile.href}
      {...(tile.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={track}
      className={cn(shell, "hover:-translate-y-1 hover:border-brand/45")}
    >
      {inner}
    </a>
  );
}

export function ContactHero() {
  return (
    <section
      id="hero"
      data-section="Hero"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[2%] top-[6%] h-[42vw] w-[42vw] rounded-full bg-brand/20 blur-[150px]" />
        <div className="aurora-b absolute bottom-[4%] right-[-12%] h-[36vw] w-[36vw] rounded-full bg-brand-deep/25 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at 35% 40%, black, transparent 75%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:gap-14">
          {/* ------------------------------------------------------ the words */}
          <div className="min-w-0">
            <Breadcrumbs href="/contact-us" className="mb-7" />

            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {hero.eyebrow}
              {/* A rule rather than a gap: two uppercase labels side by side in
                  the same size read as one broken phrase. */}
              <span aria-hidden className="h-px w-6 bg-line" />
              <span className="text-ash">{brand.city}, UAE</span>
            </p>

            {/* The whitespace between the spans is real, not decorative: the
                spans are block so it never renders, but without it textContent
                concatenates to "Let's explorenew heightstogether." for crawlers
                and screen readers. */}
            <h1 className="font-display display-2xl font-extrabold uppercase">
              <span className="block text-snow">{hero.lines[0]}</span>{" "}
              <span className="block text-snow">{hero.lines[1]}</span>{" "}
              <span className="block text-brand">{hero.lines[2]}</span>
            </h1>

            <Rise delay={0.15} className="mt-8 max-w-lg">
              <p
                /* Height-aware like the service heroes': this hero is one
                   viewport and has to keep the four blocks above the fold, so
                   the paragraph gives ground on a short screen rather than
                   pushing them under. */
                className="leading-relaxed text-fog"
                style={{ fontSize: "clamp(1rem, min(1.2rem, 2.3svh), 1.2rem)" }}
              >
                {hero.sub}
              </p>
            </Rise>
          </div>

          {/* ----------------------------------------------------- the drawing */}
          <Rise delay={0.22} className="min-w-0">
            <SignalField />
          </Rise>
        </div>

        {/* ------------------------------------------------- the four blocks */}
        {/* The row carried a dot-field spotlight when the blocks were open
            hairlines. Solid cards sit on top of it, so it is gone and each card
            has its own instead. */}
        <Rise delay={0.28} className="mt-12 lg:mt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {channels.map((tile) => (
              <Tile key={tile.label} tile={tile} />
            ))}
          </div>
        </Rise>
      </Container>
    </section>
  );
}
