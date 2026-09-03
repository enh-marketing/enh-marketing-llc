# ENH Media

Marketing site for ENH Media, Dubai. Built with [Astro](https://astro.build),
React islands, Tailwind CSS v4, GSAP and Lenis.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server on :4321 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` — TypeScript and Astro diagnostics |
| `npm run lint` | ESLint over `.ts`, `.tsx` and `.astro` |
| `npm run check:routes` | Fails if `src/pages` and the `BUILT` set in `src/lib/sitemap.ts` drift |

## Layout

```
src/
  pages/        Astro routes. Each one owns its <head> metadata and JSON-LD.
  page-bodies/  The React body of each route, mounted as one island per page.
  layouts/      Base.astro — the site shell, head tags and chrome.
  components/   Shared React components (sections, service blocks, effects).
  content/      Per-page copy, verbatim from the client documents.
  lib/          Sitemap, shared content, helpers.
  styles/       globals.css — Tailwind v4 @theme tokens and keyframes.
```

Migrated from Next.js; see `MIGRATION.md`.
