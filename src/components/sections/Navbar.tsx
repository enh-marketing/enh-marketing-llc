"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, brand } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/fx/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
          scrolled && !open ? "bg-void/70 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between py-5">
          <a href="#top" aria-label="ENH — Home">
            <Logo className="h-7 sm:h-8" />
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden rounded-full border border-line px-5 py-2.5 text-sm font-medium text-snow transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white sm:block"
            >
              Start the climb
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={cn(
                  "h-[2px] w-7 bg-snow transition-all duration-300",
                  open && "translate-y-[7px] rotate-45 bg-brand",
                )}
              />
              <span className={cn("h-[2px] w-7 bg-snow transition-all duration-300", open && "opacity-0")} />
              <span
                className={cn(
                  "h-[2px] w-7 bg-snow transition-all duration-300",
                  open && "-translate-y-[7px] -rotate-45 bg-brand",
                )}
              />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[60] bg-ink"
          >
            <Container className="flex h-full flex-col justify-between pt-28 pb-10">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-baseline gap-5 py-2"
                  >
                    <span className="font-display text-sm font-semibold text-brand">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none tracking-tight text-snow transition-colors duration-300 group-hover:text-brand">
                      {item.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2 text-sm text-fog sm:flex-row sm:items-center sm:justify-between"
            >
              <a href={`mailto:${brand.email}`} className="hover:text-snow">
                {brand.email}
              </a>
              <span>{brand.city}, UAE — {brand.tagline}</span>
            </motion.div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
