import React from "react";
import { AccessibilityBar } from "../common/AccessibilityBar";
import { MainHeader } from "../common/MainHeader";
import { HeroSection } from "./HeroSection";
import { ProjectSearchPanel } from "./ProjectSearchPanel";
import { APP_CONFIG } from "../../config/branding";
import { Cpu, Database, CheckCircle2 } from "lucide-react";

export const HomeSectionOne = () => {
  return (
    <section 
      id="home-section-1"
      className="home-section-1" 
      aria-label="Section 1: Infrastructure Project Landing and Search"
    >
      {/* Subtle Data / Infrastructure Grid Pattern */}
      <div className="bg-grid-overlay" aria-hidden="true" />

      {/* TOP: Accessibility / User Settings Bar */}
      <AccessibilityBar />

      {/* SUB-TOP: Main Navigation Header with Centralized Branding */}
      <MainHeader />

      {/* CENTER: Hero Messaging + Glassmorphism Project Search Panel */}
      <main className="hero-container" role="main">
        <HeroSection />
        <ProjectSearchPanel />
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
