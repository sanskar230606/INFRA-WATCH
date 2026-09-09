import React, { useState, useMemo } from "react";
import { APP_CONFIG } from "../../config/branding";
import { RiskSummaryPanel } from "./RiskSummaryPanel";
import { RiskProjectTable } from "./RiskProjectTable";
import { ProjectPreviewModal } from "../home/ProjectPreviewModal";
import { 
  getRiskKpiStats, 
  getTopProjectsByRisk 
} from "../../data/mockProjects";
import { BarChart3 } from "lucide-react";

export const HomeSectionTwo = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Compute live KPI metrics from active dataset
  const kpiStats = useMemo(() => getRiskKpiStats(), []);

  // Compute Top 5 ranked projects for each risk category
  const highRiskProjects = useMemo(() => getTopProjectsByRisk("High", 5), []);
  const mediumRiskProjects = useMemo(() => getTopProjectsByRisk("Medium", 5), []);
  const lowRiskProjects = useMemo(() => getTopProjectsByRisk("Low", 5), []);

  return (
    <section
      id="project-risk-overview"
      className="home-section-2"
      aria-label="Infrastructure Risk Overview"
    >
      {/* Subtle Engineering Grid Motif continuity */}
      <div className="bg-grid-overlay" aria-hidden="true" />

      <div className="section-2-container">
        {/* SECTION HEADER & TITLE (Clean header, no artificial Section 2 numbering) */}
        <header className="section-2-header">
          <div className="section-title-wrap">
            <div className="section-tag-pill">
              <BarChart3 size={12} aria-hidden="true" />
              <span>{APP_CONFIG.section2Tag}</span>
            </div>
            <h2 className="section-2-title">{APP_CONFIG.section2Title}</h2>
            <p className="section-2-subtitle">{APP_CONFIG.section2Subtitle}</p>
          </div>
        </header>

        {/* TOP AREA (~20% HEIGHT): RISK SUMMARY KPI PANEL */}
        <div className="section-2-top-area">
          <RiskSummaryPanel stats={kpiStats} />
        </div>

        {/* BOTTOM AREA (~80% HEIGHT): 3 TOP RISK TABLES WITH INCREASED BREATHING ROOM */}
        <div className="section-2-bottom-area">
          <div className="risk-tables-grid">
            {/* 1. HIGH RISK TABLE */}
            <RiskProjectTable
              title="High Risk Projects"
              subtitle="Top 5 projects requiring immediate attention"
              category="High"
              projects={highRiskProjects}
              onSelectProject={setSelectedProject}
            />

            {/* 2. MEDIUM RISK TABLE */}
            <RiskProjectTable
              title="Medium Risk Projects"
              subtitle="Top 5 projects requiring monitoring"
              category="Medium"
              projects={mediumRiskProjects}
              onSelectProject={setSelectedProject}
            />

            {/* 3. LOW RISK TABLE */}
            <RiskProjectTable
              title="Low Risk Projects"
              subtitle="Top 5 projects with comparatively lower risk"
              category="Low"
              projects={lowRiskProjects}
              onSelectProject={setSelectedProject}
            />
          </div>
        </div>
      </div>

      {/* PROJECT PREDICTIVE PREVIEW MODAL */}
      {selectedProject && (
        <ProjectPreviewModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
