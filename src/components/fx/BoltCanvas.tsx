"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type BoltHandle = { setProgress: (p: number) => void };

/** SVG bolt silhouette (Y is flipped into Three's up-axis at build time). */
const BOLT_PTS: [number, number][] = [
  [118, 8],
  [40, 196],
  [96, 196],
  [70, 372],
  [168, 150],
  [110, 150],
  [150, 8],
];

/** Number of full turns the bolt makes across the whole scroll. */
const TURNS = 2.4;

/**
 * A glossy, extruded 3D lightning bolt rendered with Three.js. It spins on its
 * vertical axis driven by scroll progress (set imperatively via the ref) with a
 * gentle idle drift, lit by a room-environment map for the wet specular look.
 */
export const BoltCanvas = forwardRef<BoltHandle, { className?: string }>(
  function BoltCanvas({ className }, ref) {
    const mount = useRef<HTMLDivElement>(null);
    const progress = useRef(0);

    useImperativeHandle(ref, () => ({ setProgress: (p) => (progress.current = p) }), []);

    useEffect(() => {
      const host = mount.current;
      if (!host) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // No WebGL — section still works, just without the 3D bolt.
      }

      let w = host.clientWidth || 1;
      let h = host.clientHeight || 1;
      // Capped the way SaturnCanvas caps it. A 3x phone rendering at DPR 2
      // is four times the pixels of DPR 1, and on the homepage this canvas
      // shares a main thread with a second WebGL context.
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      renderer.setSize(w, h);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
      camera.position.set(0, 0, 9);

      // Environment map → crisp reflections / specular highlights.
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      // Build the extruded bolt.
      const shape = new THREE.Shape();
      BOLT_PTS.forEach(([x, y], i) => (i ? shape.lineTo(x, -y) : shape.moveTo(x, -y)));
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 52,
        bevelEnabled: true,
        bevelThickness: 9,
        bevelSize: 6,
        bevelSegments: 4,
        steps: 1,
      });
      geo.center();
      geo.computeBoundingBox();
      const size = new THREE.Vector3();
      geo.boundingBox!.getSize(size);
      const scale = 2.82 / size.y; // fit ~2.82 world units tall (40% smaller)
      geo.scale(scale, scale, scale);

      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xcc0512),
        metalness: 0.5,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        emissive: new THREE.Color(0x5a0007),
        emissiveIntensity: 0.6,
        envMapIntensity: 1.35,
      });

      const bolt = new THREE.Mesh(geo, material);
      scene.add(bolt);

      // Lights — a white key for the bright streak, a red rim for the glow.
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xff2a36, 26, 40);
      rim.position.set(-5, 0, -4);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0x220003, 1));

      const clock = new THREE.Clock();
      let raf = 0;
      let renderRot = 0;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ONLY RENDER WHILE ON SCREEN. This used to call tick() once and then
      // loop for the lifetime of the page, with no IntersectionObserver and no
      // visibilitychange handler, so it kept rendering while the Manifesto
      // section sat far below the fold. On the homepage that meant two WebGL
      // contexts competing for one main thread from first paint: this one
      // never idle, and SaturnCanvas in the hero. Desktop absorbs it. A phone
      // does not, and the symptom was not a missing bolt but a starved page --
      // the hero headline's per-character reveal never finished and scrolling
      // felt frozen. Same start/stop/IO/visibility shape as SaturnCanvas.
      let visible = true;
      let running = false;

      const tick = () => {
        const t = clock.getElapsedTime();
        const target = progress.current * Math.PI * 2 * TURNS + (reduce ? 0 : t * 0.18);
        renderRot += (target - renderRot) * 0.1; // smooth follow
        bolt.rotation.y = renderRot;
        bolt.rotation.z = Math.sin(progress.current * Math.PI) * 0.06; // subtle lean
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      const start = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      start();

      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          if (visible && !document.hidden) start();
          else stop();
        },
        { threshold: 0.01 },
      );
      io.observe(host);
      const onVis = () => (document.hidden || !visible ? stop() : start());
      document.addEventListener("visibilitychange", onVis);

      const onResize = () => {
        w = host.clientWidth || 1;
        h = host.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      return () => {
        stop();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        ro.disconnect();
        geo.dispose();
        material.dispose();
        scene.environment?.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }, []);

    return <div ref={mount} className={className} aria-hidden />;
  },
);
