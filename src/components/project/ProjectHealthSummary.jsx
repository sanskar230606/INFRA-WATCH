import React from "react";
import { 
  Activity, 
  Coins, 
  Clock, 
  TrendingUp, 
  ShieldAlert,
  AlertTriangle 
} from "lucide-react";

export const ProjectHealthSummary = ({ project }) => {
  if (!project) return null;

  const physicalProgress = project.physicalProgressPercent || 0;
  const originalCost = project.originalCostCr || 0;
  const revisedCost = project.revisedCostCr || originalCost;
  const expenditure = project.expenditureCr || 0;

  // Financial Progress = Cumulative Expenditure / Revised Cost * 100
  const financialProgress = revisedCost > 0 
    ? +((expenditure / revisedCost) * 100).toFixed(1) 
    : 0;

  // Cost Overrun = (Revised - Original) / Original * 100
  const costEscalationAmount = (revisedCost - originalCost).toFixed(1);
  const costOverrunPercent = originalCost > 0
    ? +(((revisedCost - originalCost) / originalCost) * 100).toFixed(1)
    : 0;

  const timeDelayMonths = project.timeDelayMonths || 0;
  const aiRiskScore = project.aiRiskScore || 0;
  const riskLevel = project.riskLevel || "Low";

  const getRiskBadgeClass = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case "critical":
      case "high": return "high";
      case "medium": return "medium";
      default: return "low";
    }
  };

  return (
    <div className="health-summary-card" role="region" aria-label="Project Health Summary">
      <div className="health-header">
        <h3 className="health-title">Project Health & Key Metrics</h3>
        <span className="health-subtitle">Physical vs Financial Comparative Indicators</span>
      </div>

      <div className="health-metrics-grid">
        {/* METRIC 1: PHYSICAL PROGRESS */}
        <div className="health-stat-box">
          <div className="stat-head">
            <span className="stat-label">Physical Progress</span>
            <Activity size={14} className="stat-icon" aria-hidden="true" />
          </div>
          <div className="stat-main">
            <span className="stat-number">{physicalProgress}%</span>
            <span className="stat-sub">Scope Completed</span>
          </div>
          <div className="stat-bar-track">
            <div className="stat-bar-fill" style={{ width: `${Math.min(100, physicalProgress)}%` }} />
          </div>
        </div>

        {/* METRIC 2: FINANCIAL PROGRESS */}
        <div className="health-stat-box">
          <div className="stat-head">
            <span className="stat-label">Financial Progress</span>
            <Coins size={14} className="stat-icon" aria-hidden="true" />
          </div>
          <div className="stat-main">
            <span className="stat-number">{financialProgress}%</span>
            <span className="stat-sub">Budget Expended</span>
          </div>
          <div className="stat-bar-track">
            <div className="stat-bar-fill financial" style={{ width: `${Math.min(100, financialProgress)}%` }} />
          </div>
        </div>

        {/* METRIC 3: COST ESCALATION / OVERRUN */}
        <div className="health-stat-box">
          <div className="stat-head">
            <span className="stat-label">Cost Overrun</span>
            <TrendingUp size={14} className="stat-icon" aria-hidden="true" />
          </div>
          <div className="stat-main">
            <span className={`stat-number ${costOverrunPercent > 0 ? "text-warn" : ""}`}>
              {costOverrunPercent > 0 ? `+${costOverrunPercent}%` : "0.0%"}
            </span>
            <span className="stat-sub">
              {costOverrunPercent > 0 ? `+₹${costEscalationAmount} Cr escalation` : "Within original budget"}
            </span>
          </div>
        </div>

        {/* METRIC 4: TIME DELAY */}
        <div className="health-stat-box">
          <div className="stat-head">
            <span className="stat-label">Time Delay</span>
            <Clock size={14} className="stat-icon" aria-hidden="true" />
          </div>
          <div className="stat-main">
            <span className={`stat-number ${timeDelayMonths > 0 ? "text-warn" : ""}`}>
              {timeDelayMonths > 0 ? `${timeDelayMonths} mo` : "0 mo"}
            </span>
            <span className="stat-sub">
              {timeDelayMonths > 0 ? "Schedule slippage" : "On master schedule"}
            </span>
          </div>
        </div>

        {/* METRIC 5: PROTOTYPE AI RISK SCORE */}
        <div className="health-stat-box highlight">
          <div className="stat-head">
            <span className="stat-label">AI Risk Score</span>
            <ShieldAlert size={14} className="stat-icon" aria-hidden="true" />
          </div>
          <div className="stat-main">
            <span className="stat-number">{aiRiskScore} <span className="stat-denom">/ 100</span></span>
            <span className={`risk-category-badge ${getRiskBadgeClass(riskLevel)}`}>
              {riskLevel} Risk
            </span>
          </div>
          <span className="stat-disclaimer">Prototype Predictive Score</span>
        </div>
      </div>
    </div>
  );
};
