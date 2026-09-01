import Link from "next/link";
import { routeExists } from "@/lib/sitemap";
import { cn } from "@/lib/cn";

/** A link the content files ask for, rendered only if it can be honoured.
 *
 *  The service documents cross-reference each other freely ("see our Google Ads
 *  page", "we work with real estate and hospitality brands"), and most of those
 *  destinations are still unbuilt. Rendering them anyway put sixteen distinct
 *  404s inside page copy, where they are more damaging than a dead menu item
 *  because the surrounding sentence vouches for them.
 *
 *  Unbuilt destinations keep the label and lose the affordance: the sentence
 *  still reads correctly, nothing announces a missing page, and the link comes
 *  back on its own the moment the route is added to BUILT. */
export function Crosslink({
  href,
  className,
  pendingClassName,
  children,
}: {
  href: string;
  className?: string;
  /** Styling for the text-only state, where the live styling would otherwise
   *  leave underlines or arrows promising a destination. */
  pendingClassName?: string;
  children: React.ReactNode;
}) {
  if (!routeExists(href)) {
    return <span className={cn(pendingClassName)}>{children}</span>;
  }
  return (
    <Link href={href} className={cn(className)}>
      {children}
    </Link>
  );
}
