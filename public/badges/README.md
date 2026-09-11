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

One more file lives here without belonging to that row:

| File | Badge | Intrinsic size | Used by |
| --- | --- | --- | --- |
| `google-partner-logo.png` | Google Partner (full mark with wordmark) | 450 × 450 | `src/components/sections/WhyENH.tsx` |

It is the same credential as `google-partner.jpg` in a different lockup: square,
transparent, and carrying the "Google Partner" wordmark under the G. The homepage
"why" section shows it on its own at a much larger size in place of the drawn
letter that used to stand there, linked to
<https://www.google.com/partners/agency?id=3286844717>. It is NOT in
`partnerBadges`, because adding it would put the same credential in the trust row
twice.

PROVENANCE: supplied by the team as a URL to a third party's copy
(edigitalagency.com.au), not downloaded from Google's own Partners portal. The
artwork is unmodified, but the authoritative copy is the one issued to the agency
in its Partners dashboard, and swapping this file for that one would cost nothing
here.

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
