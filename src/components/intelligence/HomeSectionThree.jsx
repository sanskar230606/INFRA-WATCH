import React from "react";
import { ProjectIntelligenceHero } from "./ProjectIntelligenceHero";
import { ParadigmShiftAndWorkflow } from "./ParadigmShiftAndWorkflow";
import { BenefitsGrid } from "./BenefitsGrid";
import { MainFooter } from "./MainFooter";

export const HomeSectionThree = ({ onNavigate }) => {
  return (
    <section
      id="project-intelligence"
      className="home-section-3"
      aria-label="Project Intelligence and Platform Framework"
    >
      {/* Subtle Engineering Grid Motif continuity */}
      <div className="bg-grid-overlay" aria-hidden="true" />

      <div className="section-3-container">
        {/* UPPER-MIDDLE HERO CONTENT BLOCK */}
        <ProjectIntelligenceHero />

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
