<!-- BEGIN:astro-agent-rules -->
# This is NOT the Astro you know

This project runs Astro 7. That version has breaking changes — APIs, conventions
and file structure may all differ from your training data. Verify against the
installed package (`node_modules/astro/dist/types/public/config.d.ts` carries the
full annotated config contract) or the current docs before writing any code.
Heed deprecation notices.

Two things that are easy to get wrong here:

- **`fonts` is stable top-level config in Astro 7**, not experimental, and it is
  what replaced `next/font/google`. Families are declared in `astro.config.mjs`
  and rendered with `<Font cssVariable="..." />` from `astro:assets`.
- **`astro:assets` cannot be reached from inside a React component.** The four
  former `next/image` call sites are plain `<img>` for that reason. Do not
  "fix" them by importing `Image` from `astro:assets` into a `.tsx` file.
<!-- END:astro-agent-rules -->

# Architecture

The site was migrated from Next.js (App Router). See `MIGRATION.md` for what
moved where and, more usefully, for why the page bodies are still React.
