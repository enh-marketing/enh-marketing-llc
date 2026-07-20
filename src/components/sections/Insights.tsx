"use client";

import Image from "next/image";
import { insights } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SpinStar } from "@/components/fx/Adornments";

export function Insights() {
  return (
    <section id="insights" className="relative py-24 sm:py-32">
      <Container>
      <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
        <span className="text-brand">(08)</span> Our insights <SpinStar />
      </p>
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display display-xl font-extrabold uppercase text-snow">
          <span className="block"><Chars text="Field notes" /></span>
          <span className="block text-stroke"><Chars text="from the climb." delay={0.15} /></span>
        </h2>
        <Rise delay={0.2}>
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-snow"
          >
            All insights
            <span className="h-px w-8 bg-brand transition-all duration-300 group-hover:w-14" />
          </a>
        </Rise>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {insights.map((post, i) => (
          <Rise key={post.title} delay={i * 0.08}>
            <a
              href="#"
              data-cursor="view"
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-brand/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2/80 via-transparent to-ink-2/20" />
                <span className="font-display absolute bottom-4 left-5 text-5xl font-extrabold text-white/10">
                  ENH
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold uppercase tracking-[0.16em] text-brand">
                    {post.category}
                  </span>
                  <span className="text-ash">{post.date}</span>
                </div>
                <h3 className="font-display mt-3 flex-1 text-lg font-bold leading-snug text-snow transition-colors duration-300 group-hover:text-brand">
                  {post.title}
                </h3>
              </div>
            </a>
          </Rise>
        ))}
      </div>
      </Container>
    </section>
  );
}
