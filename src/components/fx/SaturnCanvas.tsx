"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Saturn-style planet, built entirely in Three.js to match the reference:
 * a smooth red-orange → purple gradient sphere lit from the upper-left, wrapped
 * by soft, near-edge-on grey rings. Colours are painted in a custom shader (no
 * textures) so they exactly hit the reference palette; tone-mapping is disabled
 * to keep those hues true. Gently floats and drifts; pauses when off-screen.
 */
export function SaturnCanvas({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    let w = host.clientWidth || 1;
    let h = host.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.75 : 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.NoToneMapping; // keep painted colours exact
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    camera.position.set(0, 0, 11);

    const disposables: { dispose: () => void }[] = [];
    const seg = mobile ? 48 : 96;

    const group = new THREE.Group();

    // ----------------------------------------------------------------- planet
    const planetGeo = new THREE.SphereGeometry(1.7, seg, seg);
    disposables.push(planetGeo);
    const planetMat = new THREE.ShaderMaterial({
      uniforms: {
        cLit: { value: new THREE.Color(0xe65a3c) },
        cMid: { value: new THREE.Color(0xa83a5a) },
        cDark: { value: new THREE.Color(0x491c63) },
        cRim: { value: new THREE.Color(0xc24a8e) },
        uLight: { value: new THREE.Vector3(-0.5, 0.55, 0.78).normalize() },
      },
      vertexShader: `
        varying vec3 vN; varying vec3 vView;
        void main(){
          vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 cLit; uniform vec3 cMid; uniform vec3 cDark; uniform vec3 cRim; uniform vec3 uLight;
        varying vec3 vN; varying vec3 vView;
        void main(){
          vec3 N = normalize(vN);
          float g = clamp(dot(N, normalize(uLight)) * 0.5 + 0.5, 0.0, 1.0);
          vec3 col = mix(cDark, cMid, smoothstep(0.04, 0.52, g));
          col = mix(col, cLit, smoothstep(0.52, 0.96, g));
          col += cLit * pow(g, 6.0) * 0.12;                              // soft sheen
          float fres = pow(1.0 - max(dot(N, normalize(vView)), 0.0), 2.6);
          col = mix(col, cRim, fres * 0.4);                              // atmosphere rim
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    disposables.push(planetMat);
    const planet = new THREE.Mesh(planetGeo, planetMat);
    group.add(planet);

    // ----------------------------------------------------------- atmosphere halo
    const haloGeo = new THREE.SphereGeometry(1.92, seg, seg);
    disposables.push(haloGeo);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: { cGlow: { value: new THREE.Color(0xc8407e) } },
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 vN; varying vec3 vView;
        void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 cGlow; varying vec3 vN; varying vec3 vView;
        void main(){ float f = pow(1.0 - max(dot(normalize(vN), normalize(vView)), 0.0), 3.0); gl_FragColor = vec4(cGlow, f * 0.55); }`,
    });
    disposables.push(haloMat);
    group.add(new THREE.Mesh(haloGeo, haloMat));

    // ------------------------------------------------------------------- rings
    const R_IN = 2.15;
    const R_OUT = 3.5;
    const ringGeo = new THREE.RingGeometry(R_IN, R_OUT, 180, 1);
    disposables.push(ringGeo);
    const ringMat = new THREE.ShaderMaterial({
      uniforms: {
        uIn: { value: R_IN },
        uOut: { value: R_OUT },
        uColor: { value: new THREE.Color(0xdbd4cb) },
        uColor2: { value: new THREE.Color(0xb9a7c4) },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      vertexShader: `
        uniform float uIn; uniform float uOut; varying float vR;
        void main(){
          vR = (length(position.xy) - uIn) / (uOut - uIn);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform vec3 uColor2; varying float vR;
        void main(){
          float edge = smoothstep(0.0, 0.09, vR) * (1.0 - smoothstep(0.88, 1.0, vR));
          float gap = 1.0 - 0.5 * exp(-pow((vR - 0.42) / 0.05, 2.0));   // Cassini-style gap
          float bands = 0.92 + 0.08 * sin(vR * 48.0);
          vec3 col = mix(uColor, uColor2, smoothstep(0.3, 1.0, vR));
          gl_FragColor = vec4(col, edge * gap * bands * 0.72);
        }`,
    });
    disposables.push(ringMat);
    const rings = new THREE.Mesh(ringGeo, ringMat);
    rings.rotation.x = THREE.MathUtils.degToRad(74);
    rings.rotation.z = THREE.MathUtils.degToRad(-12);
    rings.renderOrder = 1;
    group.add(rings);

    group.rotation.z = THREE.MathUtils.degToRad(-6);
    scene.add(group);

    // ------------------------------------------------------------------- loop
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    let running = false;

    const frame = () => {
      const t = clock.getElapsedTime();
      const amp = reduce ? 0.25 : 1;
      group.position.y = Math.sin(t * 0.6) * 0.12 * amp;
      group.rotation.y = Math.sin(t * 0.22) * 0.12 * amp;
      planet.rotation.y = t * 0.04 * amp;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
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
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className={className} aria-hidden />;
}
