"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChannelIcon } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The two routes the copy sets against each other:
 *
 *    Ad ──▸ Landing page ──▸ Form ──▸ Wait for callback
 *      └──▸ Conversation
 *
 *  One ad, two branches. The long route draws slowly in dashed, dimmed line and
 *  its last node fades out — "the step where most UAE traffic drops out". The
 *  short route draws fast and stays lit. The contrast in the drawing IS the
 *  argument, so it carries meaning rather than decorating the section.
 *
 *  Built from HTML nodes with CSS connectors rather than a positioned SVG, so
 *  the labels stay real selectable text and it reflows on small screens without
 *  any coordinate maths. */

function Node({
  label,
  tone,
  icon,
  last,
}: {
  label: string;
  tone: "dim" | "bright" | "origin";
  icon?: string;
  /** The route's final node — the one the drop-out animation targets. */
  last?: boolean;
}) {
  return (
    <span
      data-node
      data-last={last ? "" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "origin" && "border-line bg-ink-2 text-snow",
        tone === "dim" && "border-line/70 text-fog",
        tone === "bright" && "border-brand bg-brand/10 text-snow",
      )}
    >
      {icon && <ChannelIcon name={icon} size={14} className="text-brand" />}
      {label}
    </span>
  );
}

function Connector({ tone }: { tone: "dim" | "bright" }) {
  return (
    <span
      data-connector
      aria-hidden
      className={cn(
        "h-px min-w-6 flex-1 origin-left",
        tone === "bright" ? "bg-brand" : "bg-line",
      )}
      style={
        tone === "dim"
          ? {
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-line) 0 6px, transparent 6px 12px)",
              backgroundColor: "transparent",
            }
          : undefined
      }
    />
  );
}

export function PathCompare({
  origin,
  slow,
  fast,
}: {
  origin: string;
  /** The long route, after the ad. */
  slow: string[];
  /** The short route, after the ad. */
  fast: string[];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      // Short route first and fast — it is the one being recommended.
      tl.from(q("[data-fast] [data-connector]"), {
        scaleX: 0,
        duration: 0.45,
        ease: "power2.out",
        immediateRender: false,
      })
        .from(
          q("[data-fast] [data-node]"),
          { opacity: 0, y: 8, duration: 0.4, stagger: 0.08, ease: "power2.out", immediateRender: false },
          0.15,
        )
        // Long route after, slower, and the final node settles dimmer still.
        .from(
          q("[data-slow] [data-connector]"),
          { scaleX: 0, duration: 0.5, stagger: 0.18, ease: "none", immediateRender: false },
          0.5,
        )
        .from(
          q("[data-slow] [data-node]"),
          { opacity: 0, duration: 0.4, stagger: 0.18, ease: "none", immediateRender: false },
          0.6,
        )
        // The last node dissolves: its pill dissolves, the label does not. Fading
        // the text instead would take it to ~2.5:1 against either theme's surface,
        // and ":last-child" here matched every node, since each sits alone at the
        // end of its own wrapper.
        .to(q("[data-slow] [data-node][data-last]"), {
          borderColor: "transparent",
          duration: 0.6,
          ease: "none",
        });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(q("[data-node], [data-connector]"), { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="rounded-3xl border border-line bg-ink-2 p-7 sm:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-8">
        <Node label={origin} tone="origin" />

        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <div data-fast className="flex flex-wrap items-center gap-3">
            <Connector tone="bright" />
            {fast.map((n) => (
              <Node key={n} label={n} tone="bright" icon="WhatsApp" />
            ))}
          </div>

          <div data-slow className="flex flex-wrap items-center gap-3">
            <Connector tone="dim" />
            {slow.map((n, i) => (
              <span key={n} className="flex min-w-0 items-center gap-3">
                {i > 0 && <Connector tone="dim" />}
                <Node label={n} tone="dim" last={i === slow.length - 1} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
