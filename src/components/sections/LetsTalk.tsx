"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { brand, consultationServices } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SpinStar } from "@/components/fx/Adornments";

function MagneticOrb() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14 });
  const sy = useSpring(y, { stiffness: 160, damping: 14 });

  return (
    <motion.a
      href={`mailto:${brand.email}`}
      data-cursor="link"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-brand text-center shadow-[0_30px_90px_-20px_rgba(232,0,13,0.65)] sm:h-48 sm:w-48"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-dashed border-white/30"
      />
      <span className="font-display text-lg font-bold uppercase leading-tight text-white">
        Say
        <br />
        hello
      </span>
    </motion.a>
  );
}

export function LetsTalk() {
  const [done, setDone] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-void py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 85% 10%, rgba(232,0,13,0.15), transparent 60%), radial-gradient(35% 35% at 5% 95%, rgba(232,0,13,0.1), transparent 55%)",
        }}
      />

      <Container className="relative">
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="text-brand">(10)</span> Let&apos;s talk <SpinStar />
        </p>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — pitch, orb, contact details */}
          <div>
            <h2 className="font-display display-xl font-extrabold uppercase text-snow">
              <span className="block"><Chars text="Let's explore" /></span>
              <span className="block"><Chars text="new heights," delay={0.12} /></span>
              <span className="block text-brand"><Chars text="together." delay={0.24} /></span>
            </h2>
            <Rise delay={0.3} className="mt-6">
              <p className="max-w-md leading-relaxed text-fog">
                Dubai&apos;s result-driven digital marketing agency — expertise at your
                call. Book a free consultation with our strategists.
              </p>
            </Rise>

            <Rise delay={0.4} className="mt-10">
              <MagneticOrb />
            </Rise>

            <Rise delay={0.5} className="mt-12">
              <dl className="max-w-md space-y-4 border-t border-line pt-8 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">Email</dt>
                  <dd>
                    <a href={`mailto:${brand.email}`} className="font-medium text-snow transition-colors hover:text-brand">
                      {brand.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">Phone</dt>
                  <dd>
                    <a href={`tel:${brand.phoneHref}`} className="font-medium text-snow transition-colors hover:text-brand">
                      {brand.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-fog">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${brand.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-snow transition-colors hover:text-brand"
                    >
                      Live chat — connect now
                    </a>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-fog">Office</dt>
                  <dd className="max-w-[60%] text-right font-medium text-snow">{brand.address}</dd>
                </div>
              </dl>
            </Rise>
          </div>

          {/* Right — consultation form */}
          <Rise delay={0.2} className="self-start">
            <div className="rounded-3xl border border-line bg-ink-2 p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-80 flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="font-display mt-6 text-2xl font-bold text-snow">Thank you.</h3>
                    <p className="mt-2 max-w-xs text-sm text-fog">
                      Thanks for reaching out. We will get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDone(true);
                    }}
                    className="space-y-4"
                  >
                    <h3 className="font-display text-lg font-bold text-snow">
                      Book a free digital marketing consultation with our strategists
                    </h3>
                    <Field id="lt-name" label="Full name" placeholder="Your name" />
                    <Field id="lt-email" label="Email address" type="email" placeholder="you@company.com" />
                    <Field id="lt-phone" label="Phone number" type="tel" placeholder="+971 ..." />
                    <div>
                      <label htmlFor="lt-service" className="mb-1.5 block text-sm text-fog">
                        Service required
                      </label>
                      <select
                        id="lt-service"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-sm text-snow focus:border-brand focus:outline-none"
                      >
                        <option value="" disabled>
                          Select a service…
                        </option>
                        {consultationServices.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label className="flex items-start gap-2.5 text-xs leading-relaxed text-fog">
                      <input type="checkbox" required className="mt-0.5 accent-brand" />
                      I agree with the terms of the Privacy Policy. Your information is
                      100% secure and confidential.
                    </label>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-brand py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                    >
                      Submit
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-fog">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-sm text-snow placeholder:text-ash focus:border-brand focus:outline-none"
      />
    </div>
  );
}
