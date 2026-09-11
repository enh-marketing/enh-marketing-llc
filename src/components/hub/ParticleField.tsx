"use client";

import { useEffect, useRef } from "react";

/** The cursor-reactive particle field, from 21st.dev.
 *
 *  SOURCE: @avanishverma4/particle-effect-for-hero, fetched from the registry
 *  rather than reconstructed. Asked for by name, together with the Spline
 *  robot, for a version of the hero where both react to the pointer.
 *
 *  WHAT IS KEPT IS THE PART THAT IS THE COMPONENT: AntiGravityCanvas, and its
 *  physics is untouched. Every particle remembers where it started and is
 *  pulled back to it by a spring; the pointer pushes anything inside its radius
 *  away; particles that overlap resolve elastically off one another; velocity
 *  decays. The constants are the author's - density, a 180px radius, 0.08 of
 *  spring, 0.90 of damping, 1.2 of repulsion - and so is the drifting, twinkling
 *  dust behind it and the slow radial pulse behind that.
 *
 *  WHAT IS NOT KEPT IS THE DEMO AROUND IT, and none of it was the component: a
 *  navigation bar, a badge, a headline reading "Zero Gravity", a paragraph
 *  about the component itself, a call to action, a scroll hint, and four icons
 *  from lucide-react that nothing else on this page uses. This hero has its own
 *  copy and its own navigation.
 *
 *  ONE THING IS FIXED RATHER THAN DROPPED, AND IT IS A BUG. The original calls
 *  setDebugInfo on every animation frame to drive an "N entities / N FPS"
 *  readout in the corner. That is a React render per frame, sixty times a
 *  second, for the life of the page, on a page that also runs Lenis, GSAP and
 *  three canvases further down. The readout is demo furniture, so it and the
 *  state behind it are gone and the loop writes to the canvas alone.
 *
 *  THE COLLISION PASS IS O(n squared) AND THAT IS THE AUTHOR'S DESIGN. It is
 *  what makes the field feel like matter rather than like dots. Density is
 *  0.00015 per square pixel, so a 1440x900 window is about 194 particles and
 *  18,700 pairs a frame, which is nothing; a 2560x1440 window is about 553 and
 *  152,000, which is not. `maxParticles` caps the count so the pair count
 *  cannot run away on a large display, and it is the only number here that is
 *  not the author's. */

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

/* The author's constants. */
const PARTICLE_DENSITY = 0.00015;
const BG_PARTICLE_DENSITY = 0.00005;
const MOUSE_RADIUS = 180;
const RETURN_SPEED = 0.08;
const DAMPING = 0.9;
const REPULSION_STRENGTH = 1.2;

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export function ParticleField({
  className,
  /** The ceiling on the interactive count. See the note on the collision pass. */
  maxParticles = 260,
  /** The accent a tenth of the particles take. The page's own carnelian by
   *  default rather than the original's blue, because this page has one. */
  accent = "#be2c22",
}: {
  className?: string;
  maxParticles?: number;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ONE EFFECT, AND THE LOOP LIVES INSIDE IT. The original hangs the animation
     off a useCallback that calls itself through requestAnimationFrame, and
     keeps the accent in a ref it writes during render. Both are things React's
     own lint rules refuse, and rightly: a ref written in render is a value that
     cannot make the component update, and a callback that references itself
     before it is declared cannot be replaced when its inputs change. Nothing
     here needs either. The physics is the same physics. */
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let particles: Particle[] = [];
    let bgParticles: BackgroundParticle[] = [];
    const mouse: MouseState = { x: -1000, y: -1000, isActive: false };
    let raf = 0;

    const initParticles = (width: number, height: number) => {
      const particleCount = Math.min(
        maxParticles,
        Math.floor(width * height * PARTICLE_DENSITY),
      );
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: randomRange(1, 2.5),
          color: Math.random() > 0.9 ? accent : "#ffffff",
          angle: Math.random() * Math.PI * 2,
        });
      }

      const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
      bgParticles = [];
      for (let i = 0; i < bgCount; i++) {
        bgParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: randomRange(0.5, 1.5),
          alpha: randomRange(0.1, 0.4),
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const frame = (time: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      ctx.clearRect(0, 0, cssW, cssH);

      /* The slow radial pulse, the author's, in the page's own red. */
      const pulseOpacity = Math.sin(time * 0.0008) * 0.035 + 0.085;
      const gradient = ctx.createRadialGradient(
        cssW / 2,
        cssH / 2,
        0,
        cssW / 2,
        cssH / 2,
        Math.max(cssW, cssH) * 0.7,
      );
      gradient.addColorStop(0, `rgba(190, 44, 34, ${pulseOpacity})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssW, cssH);

      /* The drifting, twinkling dust. */
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < bgParticles.length; i++) {
        const p = bgParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cssW;
        if (p.x > cssW) p.x = 0;
        if (p.y < 0) p.y = cssH;
        if (p.y > cssH) p.y = 0;
        const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
        ctx.globalAlpha = p.alpha * (0.3 + 0.7 * twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* Forces: the pointer pushes, the spring pulls back. */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (mouse.isActive && distance < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const repulsion = force * REPULSION_STRENGTH;
          p.vx -= (dx / distance) * repulsion * 5;
          p.vy -= (dy / distance) * repulsion * 5;
        }
        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;
      }

      /* Collisions, elastic, every pair. */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.size + p2.size;
          if (distSq >= minDist * minDist) continue;
          const dist = Math.sqrt(distSq);
          if (dist <= 0.01) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          p1.x -= nx * overlap * 0.5;
          p1.y -= ny * overlap * 0.5;
          p2.x += nx * overlap * 0.5;
          p2.y += ny * overlap * 0.5;

          const along = (p1.vx - p2.vx) * nx + (p1.vy - p2.vy) * ny;
          if (along <= 0) continue;
          const m1 = p1.size;
          const m2 = p2.size;
          const impulse = (-1.85 * along) / (1 / m1 + 1 / m2);
          p1.vx += (impulse * nx) / m1;
          p1.vy += (impulse * ny) / m1;
          p2.vx -= (impulse * nx) / m2;
          p2.vy -= (impulse * ny) / m2;
        }
      }

      /* Move and draw. */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const opacity = Math.min(0.3 + velocity * 0.1, 1);
        ctx.fillStyle =
          p.color === "#ffffff" ? `rgba(255, 255, 255, ${opacity})` : p.color;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      /* setTransform rather than scale: scale multiplies, so a second resize
         would compound it and the field would draw at a quarter size. */
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    /* ON THE WINDOW, NOT ON THE CANVAS. The original takes the pointer on its
       own element, which works when it is the only thing on screen. Here the
       robot and the copy sit over it, so a handler on the canvas would stop
       firing the moment the cursor crossed either and the field would freeze
       mid-push. */
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };
    const onLeave = () => {
      mouse.isActive = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [maxParticles, accent]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
