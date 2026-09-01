import Link from "next/link";
import { trailFor, routeExists } from "@/lib/sitemap";
import { cn } from "@/lib/cn";

/** Trail derived from the sitemap, so it can never drift from the real IA, plus
 *  the BreadcrumbList JSON-LD that earns the trail in search results.
 *
 *  Placement-agnostic on purpose: no Container and no page padding of its own,
 *  because it now sits inside the hero rather than in a bar above it. The hero
 *  is sized to the viewport so the trust strip clears the fold, and a
 *  self-positioning breadcrumb would have pushed that strip under.
 *
 *  Renders nothing for a trail shorter than two, so a top-level page never
 *  shows a lone "Home". */
export function Breadcrumbs({ href, className }: { href: string; className?: string }) {
  const trail = trailFor(href);
  if (trail.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // `item` only where a page answers the URL. The pillar routes in this
    // trail ("/services", "/services/seo") are still unbuilt, and declaring a
    // 404 as a breadcrumb URL invites search engines to crawl it and devalues
    // the trail. schema.org allows a name-only ListItem, which describes the
    // level truthfully without pointing anywhere.
    itemListElement: trail.map((node, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: node.label,
      ...(routeExists(node.href) ? { item: `https://enhmedia.com${node.href}` } : {}),
    })),
  };

  return (
    <>
      {/* Kept outside the <nav>: script text still counts toward the element's
          textContent, and the trail's URLs would otherwise sit inside the
          landmark. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn(className)}>
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
        {trail.map((node, i) => {
          const last = i === trail.length - 1;
          // Small screens show only the parent and the current page. A
          // four-level trail wraps to two lines at 375px, and the hero is sized
          // to the viewport, so that second line pushes the trust strip under
          // the fold. The JSON-LD above still carries the complete trail, which
          // is what search engines read.
          const foldsAway = i < trail.length - 2;
          return (
            <li
              key={node.href}
              className={cn("items-center gap-2.5", foldsAway ? "hidden sm:flex" : "flex")}
            >
              {last ? (
                // The current page is a label, not a link.
                <span aria-current="page" className="font-medium text-snow">
                  {node.label}
                </span>
              ) : (
                <>
                  {/* text-fog, not text-ash: ash measures 2.88:1 on these
                      surfaces and fails the 4.5 minimum for body text.

                      A crumb whose page is not built yet keeps its place in the
                      trail and drops the link. The trail's job is to say where
                      you are, and it can do that without every level being
                      reachable; sending someone to a 404 from the breadcrumb is
                      strictly worse than a level that simply does not respond. */}
                  {routeExists(node.href) ? (
                    <Link
                      href={node.href}
                      className="inline-block py-1 text-fog transition-colors duration-300 hover:text-brand"
                    >
                      {node.label}
                    </Link>
                  ) : (
                    <span className="inline-block py-1 text-fog">{node.label}</span>
                  )}
                  {/* Chevron rather than a typed slash: it reads as direction
                      rather than punctuation, and it cannot be picked up as
                      text by a screen reader or a copy-paste. */}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-3 w-3 shrink-0 text-ash"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </li>
          );
          })}
        </ol>
      </nav>
    </>
  );
}
