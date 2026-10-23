import React, { useRef, useEffect } from "react";
import { AccessibilityBar } from "../common/AccessibilityBar";
import { MainHeader } from "../common/MainHeader";
import { HeroSection } from "./HeroSection";
import { ProjectSearchPanel } from "./ProjectSearchPanel";
import { InteractiveParticleField } from "./InteractiveParticleField";
import { APP_CONFIG } from "../../config/branding";
import { useAccessibility } from "../../context/AccessibilityContext";

export const HomeSectionOne = ({ activeNav = "Search", onNavigate }) => {
  const sectionRef = useRef(null);
  const bgGridRef = useRef(null);
  const heroContentRef = useRef(null);
  const searchPanelRef = useRef(null);
  const a11y = useAccessibility();

  // Multi-layer Hero Parallax Depth (0 React state updates for 60fps smoothness)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;

    const checkReduced = () => {
      if (a11y?.reducedMotion) return true;
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      return false;
    };

    const onPointerMove = (e) => {
      if (checkReduced()) return;
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1
      targetX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
      isMoving = true;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      animId = requestAnimationFrame(updateParallax);

      if (checkReduced()) {
        if (heroContentRef.current) heroContentRef.current.style.transform = "none";
        if (searchPanelRef.current) searchPanelRef.current.style.transform = "none";
        if (bgGridRef.current) bgGridRef.current.style.transform = "none";
        return;
      }

      // Smooth lerp easing
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Only update DOM if there is perceptible motion to conserve resources
      if (Math.abs(targetX - currentX) > 0.0005 || Math.abs(targetY - currentY) > 0.0005 || isMoving) {
        // Layer 1: Background grid subtle inverse shift
        if (bgGridRef.current) {
          bgGridRef.current.style.transform = `translate3d(${(currentX * 4).toFixed(2)}px, ${(currentY * 3).toFixed(2)}px, 0)`;
        }

        // Layer 2: Hero heading & description subtle parallax
        if (heroContentRef.current) {
          heroContentRef.current.style.transform = `translate3d(${(-currentX * 5).toFixed(2)}px, ${(-currentY * 3.5).toFixed(2)}px, 0)`;
        }

        // Layer 3: Search Panel deeper subtle parallax
        if (searchPanelRef.current) {
          searchPanelRef.current.style.transform = `translate3d(${(-currentX * 10).toFixed(2)}px, ${(-currentY * 7).toFixed(2)}px, 0)`;
        }

        if (Math.abs(targetX) < 0.001 && Math.abs(currentX) < 0.001) {
          isMoving = false;
        }
      }
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [a11y?.reducedMotion]);

  return (
    <section 
      ref={sectionRef}
      id="home-section-1"
      className="home-section-1" 
      aria-label="Section 1: Infrastructure Project Landing and Search"
    >
      {/* LAYER 1: Background Grid Pattern & Interactive 3D Particle Field */}
      <div ref={bgGridRef} className="bg-grid-overlay" aria-hidden="true" />
      <InteractiveParticleField containerRef={sectionRef} />

      {/* STICKY TOP WRAPPER: Accessibility Bar + Main Navigation */}
      <div className="sticky-top-bar">
        <AccessibilityBar />
        <MainHeader activeNav={activeNav} onNavigate={onNavigate} />
      </div>

      {/* CENTER: Hero Messaging + Glassmorphism Project Search Panel */}
      <main className="hero-container" role="main">
        {/* LAYER 2: Hero Messaging & Analytical Mode Tag */}
        <div ref={heroContentRef} className="hero-depth-layer-2">
          <HeroSection />
        </div>

        {/* LAYER 3: Glassmorphism Project Search Panel */}
        <div ref={searchPanelRef} className="hero-depth-layer-3">
          <ProjectSearchPanel />
        </div>
      </main>

      {/* BASE STRIP: MoSPI Predictive Decision Support Pillars */}
      <footer className="section-1-footer" role="contentinfo">
        <div className="footer-pillars">
          <span style={{ fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
            DECISION SUPPORT PILLARS:
          </span>
          {APP_CONFIG.decisionSupportPillars.slice(0, 4).map((pillar, idx) => (
            <span key={pillar} className="pillar-item">
              {idx > 0 && <span className="pillar-bullet" aria-hidden="true" />}
              <span>{pillar}</span>
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.9em" }}>
            {APP_CONFIG.systemStatus}
          </span>
        </div>
      </footer>
    </section>
  );
};
