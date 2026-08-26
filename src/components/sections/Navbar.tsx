"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { brand } from "@/lib/content";
import { topNav, isPending, type NavNode } from "@/lib/sitemap";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/fx/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const CURTAIN = [0.76, 0, 0.24, 1] as const;
const RISE = [0.16, 1, 0.3, 1] as const;

/** Hover only drives the panel where there is a real pointer and room for it. */
const DESKTOP_HOVER = "(min-width: 1024px) and (hover: hover)";
const subscribeHover = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP_HOVER);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Renders the right element for the node: Link internally, anchor off-site,
 *  and an inert anchor while a destination is still "#". */
function NavLink({
  node,
  className,
  onNavigate,
  children,
}: {
  node: NavNode;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  if (isPending(node)) {
    return (
      <a
        href="#"
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
        className={cn(className, "cursor-default")}
      >
        {children}
      </a>
    );
  }
  if (node.external) {
    return (
      <a href={node.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={node.href} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

/** Leaf row: a hairline grows out of the left edge on hover. */
function LeafLink({ node, onNavigate }: { node: NavNode; onNavigate: () => void }) {
  return (
    <NavLink
      node={node}
      onNavigate={onNavigate}
      className="group/leaf flex items-center text-[13px] leading-snug text-fog transition-colors duration-200 hover:text-snow"
    >
      <span className="h-px w-0 shrink-0 bg-brand transition-all duration-300 group-hover/leaf:mr-2 group-hover/leaf:w-3" />
      <span>{node.label}</span>
    </NavLink>
  );
}

/** Children of a branch. Pillars with their own children render as numbered
 *  column groups (Services); a flat branch renders as a two-up list. */
function SubMenu({ node, onNavigate }: { node: NavNode; onNavigate: () => void }) {
  const children = node.children ?? [];
  const grouped = children.some((c) => c.children?.length);

  if (!grouped) {
    return (
      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {children.map((child) => (
          <li key={child.label}>
            <LeafLink node={child} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      {children.map((pillar, i) => (
        <div key={pillar.href} className="group/col">
          <span className="mb-3 block h-px w-full bg-line transition-colors duration-300 group-hover/col:bg-brand" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[10px] font-bold leading-none text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <NavLink
              node={pillar}
              onNavigate={onNavigate}
              className="font-display text-[13px] font-bold uppercase leading-tight tracking-[0.06em] text-snow transition-colors duration-200 hover:text-brand"
            >
              {pillar.label}
            </NavLink>
          </div>
          <ul className="mt-3 space-y-1.5">
            {pillar.children?.map((leaf) => (
              <li key={leaf.label}>
                <LeafLink node={leaf} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const canHover = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(DESKTOP_HOVER).matches,
    () => false,
  );

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  // A completed navigation should never leave the menu hanging open. Adjusted
  // during render rather than in an effect, so there is no second paint.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Hover intent: a short rest before the panel swaps, so dragging the pointer
  // diagonally across the list on the way to the panel does not flip it.
  const hoverTimer = useRef<number | null>(null);
  const cancelHover = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  useEffect(() => cancelHover, []);

  const hoverInto = (item: NavNode) => {
    if (!canHover) return;
    cancelHover();
    hoverTimer.current = window.setTimeout(
      () => setExpanded(item.children?.length ? item.label : null),
      90,
    );
  };

  const isActive = (n: NavNode) =>
    !n.external && (pathname === n.href || (n.href !== "/" && pathname.startsWith(`${n.href}/`)));

  const panel = topNav.find((n) => n.label === expanded && n.children?.length);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: RISE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
          scrolled && !open ? "bg-void/70 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between py-5">
          <Link href="/" aria-label="ENH — Home" onClick={close}>
            <Logo className="h-7 sm:h-8" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden rounded-full border border-line px-5 py-2.5 text-sm font-medium text-snow transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white sm:block"
            >
              Start the climb
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => (open ? close() : setOpen(true))}
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
            transition={{ duration: 0.8, ease: CURTAIN }}
            aria-label="Main"
            /* Lenis calls preventDefault on wheel globally, so nested scrollers
               get no native scroll. This opts the whole overlay out, covering
               both the desktop panel and the mobile accordion. */
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-ink"
          >
            <Container className="flex min-h-full flex-col justify-between pt-28 pb-10">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                {/* Primary */}
                <ul onMouseLeave={cancelHover}>
                  {topNav.map((item, i) => {
                    const hasChildren = Boolean(item.children?.length);
                    const isOpen = expanded === item.label;

                    return (
                      <li
                        key={item.label}
                        onMouseEnter={() => hoverInto(item)}
                        className="border-b border-line/70"
                      >
                        <motion.div
                          initial={{ y: "60%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "60%", opacity: 0 }}
                          transition={{ duration: 0.55, delay: 0.12 + i * 0.045, ease: RISE }}
                          className="flex items-center gap-4 py-2.5"
                        >
                          <span className="font-display w-6 shrink-0 text-xs font-semibold text-brand">
                            0{i + 1}
                          </span>

                          <NavLink
                            node={item}
                            onNavigate={close}
                            className={cn(
                              "font-display flex-1 text-[clamp(1.35rem,2.9vw,2.3rem)] font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 hover:text-brand",
                              isActive(item) || isOpen ? "text-brand" : "text-snow",
                            )}
                          >
                            {item.label}
                            {item.external && <span className="ml-2 align-super text-xs text-fog">↗</span>}
                          </NavLink>

                          {hasChildren && (
                            <button
                              aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                              aria-expanded={isOpen}
                              onClick={() => setExpanded(isOpen ? null : item.label)}
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                                isOpen
                                  ? "border-brand text-brand"
                                  : "border-line text-snow hover:border-brand hover:text-brand",
                              )}
                            >
                              <span
                                className={cn(
                                  "relative h-3 w-3 transition-transform duration-300",
                                  isOpen && "rotate-45",
                                )}
                              >
                                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                              </span>
                            </button>
                          )}
                        </motion.div>

                        {/* Mobile and tablet: expand in place */}
                        <AnimatePresence initial={false}>
                          {isOpen && hasChildren && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: RISE }}
                              className="overflow-hidden lg:hidden"
                            >
                              <div className="pb-7 pl-10 pt-1">
                                <SubMenu node={item} onNavigate={close} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                {/* Desktop: contextual panel. Both states share one grid cell so
                    the swap crossfades without waiting on an exit animation. */}
                <div className="hidden lg:grid">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={panel ? panel.label : "contact"}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.22, ease: RISE }}
                      className="col-start-1 row-start-1 flex max-h-[calc(100svh-12rem)] flex-col self-start rounded-3xl border border-line bg-ink-2 p-7"
                    >
                      {panel ? (
                        <>
                          <div className="mb-6 flex shrink-0 items-center justify-between gap-4 border-b border-line pb-5">
                            <NavLink
                              node={panel}
                              onNavigate={close}
                              className="group/all font-display inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-snow transition-colors duration-200 hover:text-brand"
                            >
                              All {panel.label}
                              <span className="h-px w-6 bg-brand transition-all duration-300 group-hover/all:w-10" />
                            </NavLink>
                            <span className="font-display text-xs font-bold text-ash">
                              {String(panel.children!.length).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="scroll-slim min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3">
                            <SubMenu node={panel} onNavigate={close} />
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fog">
                            Start the climb
                          </p>
                          <p className="font-display mt-5 max-w-sm text-2xl font-bold leading-snug text-snow">
                            Fifteen years turning ambition into market share.
                          </p>
                          <Link
                            href="/contact"
                            onClick={close}
                            className="mt-7 inline-flex items-center gap-3 self-start rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                          >
                            Book a free consultation
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                              <path
                                d="M1 8h13M9 3l5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <dl className="mt-9 space-y-3 border-t border-line pt-7 text-sm">
                            <div className="flex justify-between gap-4">
                              <dt className="text-fog">Email</dt>
                              <dd>
                                <a href={`mailto:${brand.email}`} className="text-snow hover:text-brand">
                                  {brand.email}
                                </a>
                              </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-fog">Phone</dt>
                              <dd>
                                <a href={`tel:${brand.phoneHref}`} className="text-snow hover:text-brand">
                                  {brand.phone}
                                </a>
                              </dd>
                            </div>
                          </dl>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-10 flex flex-col gap-4 border-t border-line pt-7 text-sm text-fog sm:flex-row sm:items-center sm:justify-between"
              >
                <Link
                  href="/contact"
                  onClick={close}
                  className="rounded-full bg-brand px-6 py-3 text-center font-semibold text-white sm:hidden"
                >
                  Book a free consultation
                </Link>
                <a href={`mailto:${brand.email}`} className="hover:text-snow">
                  {brand.email}
                </a>
                <span>
                  {brand.city}, UAE — {brand.tagline}
                </span>
              </motion.div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
