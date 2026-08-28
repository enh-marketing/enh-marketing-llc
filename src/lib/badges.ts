// Server-only: node:fs below means this must never be imported from a client
// component (it would fail the Turbopack client build, not just at runtime).
import fs from "node:fs";
import path from "node:path";
import { partnerBadges, type PartnerBadge } from "@/lib/content";

export type { PartnerBadge };

/** The badges whose artwork is actually sitting in /public.
 *
 *  Server-only — it touches the filesystem, so it must be called from a server
 *  component and the result passed down.
 *
 *  The point is that the certification row degrades on its own: until the four
 *  files are saved it shows the plain text list, and the moment they are there
 *  it shows the issued badges. No broken images, no 404s in the console, and
 *  nobody has to remember to flip a flag.
 *
 *  Static pages resolve this at build time, so adding artwork to a deployed
 *  build needs a rebuild. In dev it picks up on the next request. */
export function availableBadges(): PartnerBadge[] {
  return partnerBadges.filter((badge) => {
    if (!badge.src) return false;
    try {
      return fs.existsSync(path.join(process.cwd(), "public", badge.src));
    } catch {
      return false;
    }
  });
}
