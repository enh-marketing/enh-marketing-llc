import Link from "next/link";
import { trailFor } from "@/lib/sitemap";
import { Container } from "@/components/ui/Container";

/** Derived from the sitemap, so it can never drift from the real IA.
 *  Emits BreadcrumbList JSON-LD alongside the visible trail. */
export function Breadcrumbs({ href }: { href: string }) {
  const trail = trailFor(href);
  if (trail.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((node, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: node.label,
      item: `https://enhmedia.com${node.href}`,
    })),
  };

  return (
    <Container className="pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-ash">
          {trail.map((node, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={node.href} className="flex items-center gap-2">
                {last ? (
                  <span className="text-fog" aria-current="page">
                    {node.label}
                  </span>
                ) : (
                  <>
                    <Link href={node.href} className="transition-colors hover:text-snow">
                      {node.label}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}
