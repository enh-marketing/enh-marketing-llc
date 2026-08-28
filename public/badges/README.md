# Partner and certification badges

These are the issued marks shown in the "Certified" row of the trust section on
the homepage. They are wired up in `src/lib/content.ts` (`partnerBadges`) and
rendered by `src/components/sections/PartnerBadges.tsx`.

| File | Badge | Intrinsic size |
| --- | --- | --- |
| `google-partner.jpg` | Google Partner | 500 × 274 |
| `meta-business-partner.webp` | Meta Business Partner | 500 × 286 |
| `google-ads.png` | Google Ads AI-Powered Performance Certified | 380 × 379 |
| `shopping-ads.png` | Shopping Ads Certified | 500 × 500 |

## Rules these files have to keep

Google and Meta both publish badge guidelines, and the two that matter here are
the ones easiest to break by accident in CSS:

- **Do not alter the mark.** No recolouring, no cropping, no stretching, no
  filters, no drop shadows on the artwork, and no animating the badge itself.
  The component animates the white plate underneath instead, never the image.
- **Keep the clear space.** Roughly one icon height on every side. The plate's
  padding supplies it — do not tighten it to save room.

`alt` text must stay as the wording printed on the badge. These are credentials,
so the accessible name has to match what the mark actually says rather than a
shortened label.

## Replacing or adding a badge

Drop the file in here, then add the entry to `partnerBadges` with its real
intrinsic width and height (`sips -g pixelWidth -g pixelHeight <file>`). The
dimensions are what stop the layout shifting while the image loads.

`availableBadges()` in `src/lib/badges.ts` filters this list against what is
actually on disk, so a missing file falls back to the plain text list instead of
rendering a broken image. That check runs on the server, which is why the
resolved list is passed down as a prop from `src/app/page.tsx` — `TrustStrip` is
reachable from the client tree and cannot touch the filesystem itself.
