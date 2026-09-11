import type { APIRoute } from "astro";
import { buildablePages } from "@/lib/sitemap";
import * as insights from "@/content/insights";
import * as studies from "@/content/case-studies";
import * as portfolio from "@/content/portfolio";

/** The XML sitemap.
 *
 *  THERE WAS NOT ONE, on a 142 page site, and no robots.txt either. Both are
 *  the plainest possible ask from a crawler and both were simply absent.
 *
 *  BUILT FROM THE SITE'S OWN ROUTE REGISTRY rather than from an integration.
 *  `buildablePages()` is the list `check:routes` already gates every build
 *  against, so a page cannot exist without appearing here and cannot appear
 *  here without existing. @astrojs/sitemap would have crawled the output
 *  instead, which means a new dependency to rediscover something this codebase
 *  already knows, and it would have listed /ai-hub/film, which is noindex.
 *
 *  THE THREE DYNAMIC ROUTES COME FROM THE SAME SELECTOR THEIR OWN
 *  getStaticPaths WALKS, so the sitemap lists exactly the notes, studies and
 *  projects that have a page behind them. An archived note or study with no
 *  body builds no page and is not listed; the portfolio has no such gate, so
 *  `all()` is both its router and its listing.
 *
 *  NO lastmod, DELIBERATELY. Nothing in this content model records when a page
 *  last changed, and a lastmod invented at build time is a date that says every
 *  page changed today, every deploy. Google's own guidance is that it ignores
 *  the field when it does not trust it, and a wrong date is worse than none.
 *
 *  PRIORITIES ARE NOT SET EITHER, for the same reason: they are ignored, and a
 *  hand-assigned ranking of your own pages is a claim rather than information.
 *
 *  URLS ARE WRITTEN EXACTLY AS THE CANONICALS ARE, with no trailing slash. The
 *  layout emits `https://enhmedia.com/ai-hub`, and a sitemap that offered
 *  `/ai-hub/` would be naming a second URL for the same page and asking a
 *  crawler to work out that they are one. */

const SITE = "https://enhmedia.com";

/** noindex, and therefore not ours to advertise. It carries the tag itself in
 *  src/pages/ai-hub/film.astro; this keeps the two from disagreeing. */
const EXCLUDE = new Set(["/ai-hub/film"]);

export const GET: APIRoute = () => {
  const routes = [
    ...buildablePages(),
    ...insights.published().map((n) => `/blog/${n.slug}`),
    ...studies.published().map((s) => `/case-studies/${s.slug}`),
    ...portfolio.all().map((p) => `/portfolio/${p.slug}`),
  ]
    .filter((href) => href.startsWith("/") && !EXCLUDE.has(href))
    /* The registry can list the same URL twice where a page sits under two
       pillars; a sitemap naming one URL twice is malformed. */
    .filter((href, i, all) => all.indexOf(href) === i)
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((href) => `  <url><loc>${SITE}${href}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
