import React, { useRef, useEffect } from "react";
import { ProjectIntelligenceHero } from "./ProjectIntelligenceHero";
import { ParadigmShiftAndWorkflow } from "./ParadigmShiftAndWorkflow";
import { BenefitsGrid } from "./BenefitsGrid";
import { MainFooter } from "./MainFooter";
import { InteractiveParticleField } from "../home/InteractiveParticleField";
import { useAccessibility } from "../../context/AccessibilityContext";

export const HomeSectionThree = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const bgGridRef = useRef(null);
  const heroRef = useRef(null);
  const a11y = useAccessibility();

  // Subtle Hero Parallax Depth on Section 3 (0 React re-renders)
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
        if (heroRef.current) heroRef.current.style.transform = "none";
        if (bgGridRef.current) bgGridRef.current.style.transform = "none";
        return;
      }

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (Math.abs(targetX - currentX) > 0.0005 || Math.abs(targetY - currentY) > 0.0005 || isMoving) {
        if (bgGridRef.current) {
          bgGridRef.current.style.transform = `translate3d(${(currentX * 4).toFixed(2)}px, ${(currentY * 3).toFixed(2)}px, 0)`;
        }

        if (heroRef.current) {
          heroRef.current.style.transform = `translate3d(${(-currentX * 6).toFixed(2)}px, ${(-currentY * 4).toFixed(2)}px, 0)`;
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
      id="project-intelligence"
      className="home-section-3"
      aria-label="Project Intelligence and Platform Framework"
    >
      {/* Subtle Engineering Grid Motif continuity */}
      <div ref={bgGridRef} className="bg-grid-overlay" aria-hidden="true" />

      {/* Interactive 3D Particle Field behind Section 3 */}
      <InteractiveParticleField containerRef={sectionRef} />

      <div className="section-3-container">
        {/* UPPER-MIDDLE HERO CONTENT BLOCK (with subtle depth layer) */}
        <div ref={heroRef} className="hero-depth-layer-2">
          <ProjectIntelligenceHero />
        </div>

        {/* PARADIGM SHIFT (3-STAGE) + 4-STEP WORKFLOW + AI POSITIONING */}
        <ParadigmShiftAndWorkflow />

        {/* GOVERNMENT AND PUBLIC BENEFITS (4 CARDS EACH) */}
        <BenefitsGrid />
      </div>

      {/* TRADITIONAL PROFESSIONAL FOOTER & COPYRIGHT BAR */}
      <MainFooter onNavigate={onNavigate} />
    </section>
  );
};
