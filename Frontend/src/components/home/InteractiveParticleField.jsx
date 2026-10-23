import React, { useEffect, useRef } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";

/**
 * Interactive 3D Particle Field Canvas
 * 
 * Renders a lightweight, high-performance physical particle system representing
 * an analytical infrastructure/data field behind hero content.
 * 
 * Features:
 * - 3D depth illusion (varying z-depth, size, opacity, and subtle perspective parallax)
 * - Localized distance-weighted pointer attraction with physical velocity, friction, and spring restitution
 * - Pure Canvas 2D without heavy 3D dependencies (60 FPS, 0 React re-renders during animation)
 * - Reduced motion support (disables attraction and parallax, renders soft static points)
 * - Theme-aware monochromatic rendering (crisp cool white in dark mode, dark slate in light mode)
 * - IntersectionObserver to sleep when off-screen
 */
export const InteractiveParticleField = ({ containerRef, densityMultiplier = 1.0 }) => {
  const canvasRef = useRef(null);
  const a11y = useAccessibility();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Check reduced motion from accessibility context or OS media query
    const checkReducedMotion = () => {
      if (a11y && a11y.reducedMotion) return true;
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      return false;
    };

    let isReducedMotion = checkReducedMotion();

    // Check theme
    const getTheme = () => {
      const rootTheme = document.documentElement.getAttribute("data-theme");
      return rootTheme || (a11y && a11y.theme) || "dark";
    };

    // Pointer state stored outside React state
    const pointer = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isHovering: false,
      isTouch: false,
    };

    // Particles list
    let particles = [];

    // Helper to generate particle count based on width (boosted density)
    const getTargetCount = (w) => {
      let base = 210;
      if (w < 640) base = 75;
      else if (w < 1024) base = 130;
      return Math.round(base * densityMultiplier);
    };

    // Initialize particle data with 3D depth (z between 0.15 and 1.0)
    const initParticles = () => {
      const count = isReducedMotion ? Math.min(80, getTargetCount(width)) : getTargetCount(width);
      particles = [];

      for (let i = 0; i < count; i++) {
        // Distribute nicely across the canvas with slight padding
        const x = Math.random() * width;
        const y = Math.random() * height;
        // z: 0.15 (distant, subtle) to 1.0 (near, prominent)
        const z = 0.15 + Math.random() * 0.85;

        // Base radius based on depth: 0.8px to 2.4px
        const baseRadius = (0.7 + z * 1.5) * dpr;

        particles.push({
          x0: x,
          y0: y,
          x: x,
          y: y,
          z: z,
          vx: 0,
          vy: 0,
          baseRadius: baseRadius,
          // Subtle individual drift offset & phase for organic micro-motion
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.3,
        });
      }
    };

    // Resize canvas to fill container
    const handleResize = () => {
      const targetContainer = containerRef?.current || canvas.parentElement || window;
      const rect = targetContainer.getBoundingClientRect
        ? targetContainer.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };

      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 480);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles();
    };

    handleResize();

    // Pointer events on hero container
    const eventTarget = containerRef?.current || window;

    const onPointerMove = (e) => {
      const rect = (containerRef?.current || canvas).getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.isHovering = true;
      pointer.isTouch = e.pointerType === "touch";
    };

    const onPointerLeave = () => {
      pointer.isHovering = false;
      pointer.targetX = -9999;
      pointer.targetY = -9999;
    };

    eventTarget.addEventListener("pointermove", onPointerMove, { passive: true });
    eventTarget.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Window resize listener
    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver to pause loop when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation physics loop
    let lastTime = performance.now();

    const animate = (currentTime) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      isReducedMotion = checkReducedMotion();
      const currentTheme = getTheme();
      const isDark = currentTheme === "dark";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth pointer lerp (gives organic inertia/mass to cursor pull)
      if (pointer.isHovering) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12;
        pointer.y += (pointer.targetY - pointer.y) * 0.12;
      } else {
        pointer.x += (-9999 - pointer.x) * 0.1;
        pointer.y += (-9999 - pointer.y) * 0.1;
      }

      const pX = pointer.x * dpr;
      const pY = pointer.y * dpr;
      const pointerActive = pointer.isHovering && pointer.x > -500;

      // Normalized pointer for subtle global perspective parallax
      const centerNormX = (pointer.x / width - 0.5) * 2; // -1 to +1
      const centerNormY = (pointer.y / height - 0.5) * 2; // -1 to +1

      // Physics parameters
      const pullRadiusBase = (pointer.isTouch ? 150 : 210) * dpr;
      const friction = 0.87; // Damping
      const springK = 38.0; // Restoring force
      const maxAttractForce = 620.0 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isReducedMotion) {
          // In reduced motion, gentle static placement with no attraction or parallax
          p.x = p.x0 * dpr;
          p.y = p.y0 * dpr;
        } else {
          // 1. Subtle 3D perspective shift on rest position (closer particles shift more)
          const parallaxShiftX = pointerActive ? centerNormX * (p.z * 16 * dpr) : 0;
          const parallaxShiftY = pointerActive ? centerNormY * (p.z * 12 * dpr) : 0;

          // 2. Micro ambient drift
          const microDriftX = Math.cos(currentTime * 0.001 * p.speed + p.phase) * (1.2 * dpr * p.z);
          const microDriftY = Math.sin(currentTime * 0.0012 * p.speed + p.phase) * (1.2 * dpr * p.z);

          const targetRestX = p.x0 * dpr + parallaxShiftX + microDriftX;
          const targetRestY = p.y0 * dpr + parallaxShiftY + microDriftY;

          // 3. Localized Pointer Attraction Force
          let attractFx = 0;
          let attractFy = 0;

          if (pointerActive) {
            const dx = pX - p.x;
            const dy = pY - p.y;
            const distSq = dx * dx + dy * dy;
            // Radius scales slightly with depth: closer particles have larger interaction influence
            const effectiveRadius = pullRadiusBase * (0.8 + p.z * 0.4);
            const rSq = effectiveRadius * effectiveRadius;

            if (distSq < rSq && distSq > 4) {
              const dist = Math.sqrt(distSq);
              const ratio = dist / effectiveRadius; // 0 (at cursor) to 1 (at outer edge)

              // Non-linear attraction falloff: strong nearby, moderate mid, zero at edge
              // (1 - ratio)^1.8 creates smooth, organic tapering
              const strength = Math.pow(1 - ratio, 1.8);
              const forceMag = Math.min(strength * maxAttractForce * (0.6 + p.z * 0.6), maxAttractForce);

              attractFx = (dx / dist) * forceMag;
              attractFy = (dy / dist) * forceMag;
            }
          }

          // 4. Spring Restoring Force toward rest position
          const springFx = (targetRestX - p.x) * springK;
          const springFy = (targetRestY - p.y) * springK;

          // 5. Integrate acceleration & velocity
          const ax = attractFx + springFx;
          const ay = attractFy + springFy;

          p.vx = (p.vx + ax * dt) * friction;
          p.vy = (p.vy + ay * dt) * friction;

          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }

        // Render particle
        // 3D brightness / opacity calculation:
        // Distant (low z) = faint, closer (high z) = brighter
        let baseAlpha = isDark ? 0.18 + p.z * 0.52 : 0.14 + p.z * 0.48;

        // Subtle highlight if strongly attracted
        if (pointerActive && !isReducedMotion) {
          const dx = pX - p.x;
          const dy = pY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pullRadiusBase * 0.5) {
            const highlight = (1 - dist / (pullRadiusBase * 0.5)) * 0.25;
            baseAlpha = Math.min(1.0, baseAlpha + highlight);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);

        if (isDark) {
          // Monochromatic cool white / zinc tones
          ctx.fillStyle = `rgba(240, 243, 250, ${baseAlpha.toFixed(3)})`;
        } else {
          // Monochromatic deep slate / charcoal tones
          ctx.fillStyle = `rgba(24, 28, 38, ${baseAlpha.toFixed(3)})`;
        }
        ctx.fill();

        // For the closest ~20% of particles, draw a tiny soft inner core dot for crisp spatial presence
        if (p.z > 0.8 && !isReducedMotion) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${(baseAlpha * 0.75).toFixed(3)})`
            : `rgba(0, 0, 0, ${(baseAlpha * 0.75).toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      eventTarget.removeEventListener("pointermove", onPointerMove);
      eventTarget.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [containerRef, a11y?.theme, a11y?.reducedMotion, densityMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas-layer"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
