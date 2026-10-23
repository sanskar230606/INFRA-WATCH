import React from "react";
import { RiskKpiCard } from "./RiskKpiCard";
import { Activity, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

export const RiskSummaryPanel = ({ stats }) => {
  return (
    <section className="risk-summary-panel" aria-label="Project Portfolio Risk KPIs">
      <div className="kpi-cards-grid">
        {/* KPI 1 — TOTAL ACTIVE PROJECTS */}
        <RiskKpiCard
          title="Total Active Projects"
          count={stats.totalActive}
          totalCount={stats.totalActive}
          category="total"
          description="Central sector projects (₹150 Cr+)"
          icon={Activity}
        />

        {/* KPI 2 — HIGH RISK */}
        <RiskKpiCard
          title="High Risk"
          count={stats.highRisk}
          totalCount={stats.totalActive}
          category="high"
          description="Requires immediate intervention"
          icon={AlertTriangle}
        />

        {/* KPI 3 — MEDIUM RISK */}
        <RiskKpiCard
          title="Medium Risk"
          count={stats.mediumRisk}
          totalCount={stats.totalActive}
          category="medium"
          description="Requires proactive monitoring"
          icon={AlertCircle}
        />

        {/* KPI 4 — LOW RISK */}
        <RiskKpiCard
          title="Low Risk"
          count={stats.lowRisk}
          totalCount={stats.totalActive}
          category="low"
          description="Comparatively lower risk index"
          icon={CheckCircle2}
        />
      </div>
    </section>
  );
};
