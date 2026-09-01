"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six ad formats, each drawn as the thing it actually is.
 *
 *  WHY A PREVIEW AND NOT A TRACK. These six are not stages and not a run: they
 *  are distinct units that appear in different places and behave differently.
 *  A feed post, a native form, a message, an account list, a returning visitor
 *  and a tracking connection have no order and no shared shape, so the drawing
 *  changes entirely with the selection rather than lighting a position on a
 *  rail. Selecting a format shows that format.
 *
 *  Abstract throughout: bars, blocks and marks, never a word of ad copy.
 *  Writing headline text into a mock ad would be inventing creative on a
 *  client's behalf.
 *
 *  The two the document singles out — Lead Gen Forms as "consistently the
 *  strongest direct-response format", Matched Audiences as "LinkedIn's genuine
 *  differentiator" — are the two whose drawings carry the brand most heavily.
 *  That weighting is the document's. */

const Bar = ({ w, tone = "line" }: { w: string; tone?: "line" | "fog" | "brand" }) => (
  <span
    aria-hidden
    className={cn(
      "block h-1.5 rounded-full",
      tone === "brand" ? "bg-brand" : tone === "fog" ? "bg-fog/60" : "bg-line",
    )}
    style={{ width: w }}
  />
);

/** The feed post the first two formats both sit in. */
const Post = ({ dim = false }: { dim?: boolean }) => (
  <div className={cn("transition-opacity duration-500", dim && "opacity-35")}>
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-8 w-8 shrink-0 rounded-full border border-line bg-void/60" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Bar w="45%" tone="fog" />
        <Bar w="65%" />
      </div>
    </div>
    <div className="mt-4 flex flex-col gap-1.5">
      <Bar w="100%" />
      <Bar w="88%" />
    </div>
    <div
      aria-hidden
      className="mt-4 h-24 rounded-xl border border-line bg-void/50"
    />
  </div>
);

export function AdFormatPreview({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const panel = () => {
    switch (active) {
      // Sponsored Content: the post itself.
      case 0:
        return <Post />;

      // Lead Gen Forms: the form arrives over the post, already filled in.
      case 1:
        return (
          <div className="relative">
            <Post dim />
            <div className="absolute inset-x-2 bottom-0 rounded-2xl border border-brand/50 bg-ink-2 p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)]">
              <div className="flex flex-col gap-2.5">
                {["78%", "62%", "70%"].map((w, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="flex h-7 items-center rounded-lg border border-line bg-void/60 px-2.5"
                  >
                    {/* Pre-filled from the profile, which is the whole point. */}
                    <Bar w={w} tone="brand" />
                  </span>
                ))}
                <span
                  aria-hidden
                  className="mt-1 h-7 w-1/2 rounded-full bg-brand"
                />
              </div>
            </div>
          </div>
        );

      // Message Ads: a thread, one side only.
      case 2:
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-8 w-8 shrink-0 rounded-full border border-line bg-void/60" />
              <Bar w="40%" tone="fog" />
            </div>
            <div className="ml-11 flex flex-col gap-2 rounded-2xl rounded-tl-sm border border-brand/45 bg-brand/[0.08] p-4">
              <Bar w="92%" />
              <Bar w="78%" />
              <Bar w="55%" />
            </div>
            <div className="ml-11 h-8 w-1/3 rounded-full border border-line" aria-hidden />
          </div>
        );

      // Matched Audiences: your account list, matched.
      case 3:
        return (
          <ul className="flex flex-col gap-2">
            {[true, true, false, true, false, true].map((matched, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-500",
                  matched ? "border-brand/45 bg-brand/[0.07]" : "border-line bg-void/40",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-6 w-6 shrink-0 rounded-md border",
                    matched ? "border-brand/60 bg-brand/20" : "border-line",
                  )}
                />
                <Bar w={`${38 + i * 7}%`} tone={matched ? "fog" : "line"} />
                {matched && (
                  <span aria-hidden className="ml-auto h-2 w-2 shrink-0 rounded-full bg-brand" />
                )}
              </li>
            ))}
          </ul>
        );

      // Retargeting: the same visitor, coming back.
      case 4:
        return (
          <div className="flex h-full flex-col justify-center gap-6 py-4">
            <div className="flex items-center justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "h-3 w-3 rounded-full",
                    i === 0 ? "bg-brand" : "bg-line",
                  )}
                />
              ))}
            </div>
            <svg
              aria-hidden
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="h-16 w-full"
            >
              <path
                d="M4 4 C 20 40, 78 40, 96 4"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex items-center justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "h-3 w-3 rounded-full",
                    i === 3 ? "bg-brand" : "bg-line",
                  )}
                />
              ))}
            </div>
          </div>
        );

      // Conversion tracking: the platform wired through to the pipeline.
      default:
        return (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-line bg-void/45 p-4">
              <div className="flex items-end gap-1.5">
                {[30, 52, 41, 66, 58, 78, 70].map((h, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="flex-1 rounded-t-sm bg-line"
                    style={{ height: h * 0.7 }}
                  />
                ))}
              </div>
            </div>
            <svg aria-hidden viewBox="0 0 100 24" preserveAspectRatio="none" className="h-6 w-full">
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="24"
                stroke="var(--color-brand)"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="rounded-xl border border-brand/45 bg-brand/[0.07] p-4">
              <div className="flex flex-col gap-2">
                <Bar w="72%" tone="brand" />
                <Bar w="54%" tone="fog" />
                <Bar w="88%" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The pins are the navigation, in a rail beside the preview. */}
      <div className="flex gap-5">
        <div className="flex shrink-0 flex-col gap-3 pt-1">
          {Array.from({ length: count }).map((_, i) => pin(i))}
        </div>

        <div className="min-h-[19rem] flex-1">{panel()}</div>
      </div>
    </div>
  );
}
