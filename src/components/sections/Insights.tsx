import Image from "next/image";
import Link from "next/link";
import { insights } from "@/lib/content";
import { pages, isPending } from "@/lib/sitemap";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SpinStar } from "@/components/fx/Adornments";

/** Field notes index.
 *
 *  Rebuilt from three equal photo cards for two reasons, both measured rather
 *  than felt.
 *
 *  The first is honesty. Every card was an `<a href="#">` carrying
 *  data-cursor="view", so the section promised three articles and delivered
 *  nothing on click, on all eighteen pages that mount it. The posts have no
 *  routes yet and their bodies do not exist, so the titles now set as text.
 *  Adding a `href` to a post in content.ts is all it takes to turn it back into
 *  a link, and the "all insights" link appears on its own once /insights is
 *  built. Nothing here announces a blog that is not there.
 *
 *  The second is density. The old row was the thinnest block on every page it
 *  appeared on, 58% vertical whitespace across 760px, because three 430px cards
 *  each spent roughly 300px of image to carry a six-word title. The lead post
 *  now takes the image and the display-scale headline, and the other two run as
 *  dated rows beside it, so the same height carries three headlines at readable
 *  weight instead of one. The dateline is the structure: these are field notes,
 *  and when a note was written is part of what it is worth.
 *
 *  Server component. The old file was "use client" only for the reveal
 *  wrappers, which are themselves client components. */

/** "April 2, 2026" as an ISO date, for <time dateTime>. Returns undefined
 *  rather than a guess if the string is not the shape content.ts uses, so a
 *  reformatted date can never silently disagree with the one on screen. */
function iso(date: string): string | undefined {
  const parsed = new Date(`${date} UTC`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

function Meta({ category, date }: { category: string; date: string }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="font-semibold uppercase tracking-[0.16em] text-brand">{category}</span>
      <span aria-hidden className="h-px w-4 bg-line" />
      <time dateTime={iso(date)} className="text-ash">
        {date}
      </time>
    </div>
  );
}

export function Insights({
  index = "08",
  label = "Insights",
}: {
  index?: string;
  label?: string;
} = {}) {
  const [lead, ...rest] = insights;
  const archiveIsLive = !isPending(pages.insights);

  return (
    <section id="insights" data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="text-brand">({index})</span> Our insights <SpinStar />
        </p>

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block">
              <Chars text="Field notes" />
            </span>
            <span className="block text-stroke">
              <Chars text="from the climb." delay={0.15} />
            </span>
          </h2>

          {/* Only once the archive resolves. A link to a 404 is worse than no
              link, and "coming soon" is an announcement nobody asked for. */}
          {archiveIsLive && (
            <Rise delay={0.2}>
              <Link
                href={pages.insights.href}
                className="group inline-flex items-center gap-3 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-snow"
              >
                All insights
                <span className="h-px w-8 bg-brand transition-all duration-300 group-hover:w-14" />
              </Link>
            </Rise>
          )}
        </div>

        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.08fr_1fr] lg:items-stretch">
          {/* Lead note: the one that gets the picture and the headline. */}
          <Rise>
            <article className="group">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
                {/* Grounds the picture against the page rather than letting it
                    float as a bright rectangle. */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
              </div>

              <div className="mt-6">
                <Meta category={lead.category} date={lead.date} />
                <h3 className="font-display mt-4 text-[clamp(1.35rem,2.5vw,2rem)] font-extrabold leading-[1.14] text-snow">
                  {lead.title}
                </h3>
              </div>
            </article>
          </Rise>

          {/* The rest, as a dated column. Hairline between rows, none above the
              first: the border belongs between the notes, not around them.

              Spread rather than stacked. Left at natural height the two rows
              came to 281px against the lead's 477px, leaving a 196px hole at
              the bottom of the column, so the rows distribute across the
              lead's height instead and both columns land on the same line at
              any viewport. */}
          <ol className="flex flex-col justify-between lg:h-full lg:pt-2">
            {rest.map((post, i) => (
              <Rise key={post.title} delay={0.1 + i * 0.08}>
                <li
                  className={i === 0 ? "pb-8" : "border-t border-line pt-8"}
                >
                  <article className="grid grid-cols-[92px_1fr] items-start gap-5 sm:grid-cols-[132px_1fr] sm:gap-6">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="132px"
                        className="object-cover opacity-90"
                      />
                    </div>
                    <div>
                      <Meta category={post.category} date={post.date} />
                      <h3 className="font-display mt-3 text-lg font-bold leading-snug text-snow sm:text-xl">
                        {post.title}
                      </h3>
                    </div>
                  </article>
                </li>
              </Rise>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
