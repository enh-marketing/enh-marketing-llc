# Next.js → Astro

Migrated from Next.js 16.2.9 (App Router) to Astro 7.2.10. The site's markup,
styling and behaviour are unchanged; what changed is the framework around them.

## The one decision that shaped everything else

**The page bodies are still React, one island per route.** That is not laziness,
and it is worth understanding before changing it.

Astro's islands model pays off when the interactive parts of a page are small
and separable. Here they are neither:

- **105 of 124 components are `"use client"`.** Almost every section runs its own
  GSAP ScrollTrigger or framer-motion reveal. There is very little on any page
  that is genuinely static.
- **The homepage shares state across sections.** `Preloader` hands `started` to
  `Hero` through React state. Split into separate islands, those are two
  different React roots and the handshake cannot happen without inventing a
  shared store.
- **Pages pass React elements as props.** 52 times, in the shape
  `breadcrumbs={<Breadcrumbs/>}`, `footer={<TrustStrip/>}`, `visual={<GeoLens/>}`.
  Astro island props must be serialisable, so every one of these would have to
  become a named slot and every consuming component's API would have to be
  rewritten.

Decomposing into per-section islands would therefore mean redesigning component
APIs across 21 pages to chase a JS saving that mostly is not there, since the
components would still hydrate. So each route keeps its React tree intact and
mounts it as a single `client:load` island, and Astro takes over the parts it is
actually better at: routing, the document head, structured data, fonts and the
build.

Where a component genuinely carries no state or effects, it ships no JavaScript.
`Footer` is rendered by Astro to plain HTML with no client directive.

## What moved where

| Next.js | Astro |
| --- | --- |
| `src/app/**/page.tsx` | `src/pages/**/*.astro` (head + JSON-LD) and `src/page-bodies/*.tsx` (the React body) |
| `src/app/layout.tsx` | `src/layouts/Base.astro` |
| `export const metadata` | Props on `Base.astro`, written out as explicit head tags |
| `metadataBase` | `site` in `astro.config.mjs` |
| `next/font/google` | `fonts` in `astro.config.mjs` + `<Font>` from `astro:assets` |
| `next/link` | `<a>` |
| `next/image` | `<img>` (see below) |
| `next/script` (`beforeInteractive`) | `<script is:inline>` in the head |
| `usePathname()` | `pathname` prop, from `Astro.url.pathname` |
| `src/app/globals.css` | `src/styles/globals.css` |
| `src/app/favicon.ico` | `public/favicon.ico` |
| `@tailwindcss/postcss` | `@tailwindcss/vite` |
| `eslint-config-next` | `typescript-eslint` + `eslint-plugin-astro` + `eslint-plugin-react-hooks` |

`scripts/check-routes.mjs` now walks `src/pages/**/*.astro` instead of looking
for `page.tsx` under `src/app`. Without that change it would have found zero
routes and passed silently, which is the exact failure it exists to catch.

## Deliberate differences

**Navigation is a full page load.** `next/link` did client-side routing; `<a>`
does not. This is Astro's default and it is why the Navbar's post-navigation
menu-close logic is now inert (kept, because it would be needed again the moment
a `ClientRouter` is added). If SPA-style navigation is wanted back, that is the
lever — but it will need care around Lenis and ScrollTrigger teardown.

**Images are no longer optimised by the framework.** `astro:assets` only works
in `.astro` files, and all four `next/image` call sites live inside React
components. In practice little was lost:

- `Logo` and `PartnerBadges` are fixed-size local files that next/image was not
  resizing anyway. Intrinsic `width`/`height` are kept so layout is still
  reserved; `priority` became `loading="eager"` + `fetchpriority="high"`.
- `Work` and `Insights` use remote Unsplash URLs that already carry their own
  `w`/`h`/`fit`/`q` parameters, so Unsplash was doing the resizing and
  next/image was proxying it. `fill` is reproduced literally as
  `absolute inset-0 h-full w-full object-cover` inside the existing relative
  parent.

To get optimisation back, those four spots would need to move into `.astro`
components and be passed down — a real change to the component tree, not an
import swap.

**Two head tags are not reproduced.** `<meta name="next-size-adjust">` is
next/font's fallback-metric marker and means nothing outside Next. The favicon
no longer carries Next's cache-busting query string.

**ESLint went from 9 to 10.** `eslint-plugin-astro` requires it. The Next-specific
rules (`next/no-img-element` and the rest of core-web-vitals) are gone because
they describe APIs this project no longer has; `no-img-element` in particular
would flag the `<img>` tags above, which are correct here.

## How parity was verified

The pre-migration commit was rebuilt from a git worktree and its output compared
against `dist/`:

- **Head tags:** identical on all 18 pages. The only delta is entity encoding
  (`&#x27;` vs a literal `'`), which parses the same. This is how the three
  `twitter:*` tags were found — Next synthesised them from `openGraph`, and
  hand-writing the head without them would have been a silent SEO regression.
- **Structured data:** 51 JSON-LD blocks, parsed and compared as objects. Zero
  differences.
- **Rendered text:** word-multiset comparison of every page. Zero words present
  in one build and not the other.
