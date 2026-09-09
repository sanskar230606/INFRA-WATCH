import React, { useEffect } from "react";
import { 
  X, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  FileText,
  Calendar
} from "lucide-react";

export const ProjectPreviewModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const costEscalation = (project.revisedCostCr - project.originalCostCr).toFixed(1);
  const costEscalationPercent = ((costEscalation / project.originalCostCr) * 100).toFixed(1);

  const getRiskClass = (level) => {
    switch (level?.toLowerCase()) {
      case "critical": return "critical";
      case "high": return "high";
      case "medium": return "medium";
      default: return "low";
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span className="result-code-tag">{project.projectCode}</span>
              <span className={`result-risk-badge ${getRiskClass(project.riskLevel)}`}>
                <ShieldAlert size={12} />
                Risk Score: {project.aiRiskScore}/100 ({project.riskLevel})
              </span>
            </div>
            <h2 id="modal-project-title" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {project.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Building2 size={13} /> {project.ministry} ({project.sector})
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={13} /> {project.state}
              </span>
            </div>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close project preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Key Metric Stats Grid */}
          <div className="modal-grid-stats">
            <div className="stat-card">
              <span className="stat-label">Original Cost</span>
              <span className="stat-value">₹{project.originalCostCr.toLocaleString()} Cr</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Revised / Current Cost</span>
              <span className="stat-value">₹{project.revisedCostCr.toLocaleString()} Cr</span>
              <span style={{ fontSize: "0.7rem", color: costEscalation > 0 ? "#f87171" : "var(--text-muted)" }}>
                {costEscalation > 0 ? `+₹${costEscalation} Cr (+${costEscalationPercent}%)` : "On Budget"}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Cumulative Expenditure</span>
              <span className="stat-value">₹{project.expenditureCr.toLocaleString()} Cr</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {((project.expenditureCr / project.revisedCostCr) * 100).toFixed(1)}% of revised cost
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Physical Progress</span>
              <span className="stat-value">{project.physicalProgressPercent}%</span>
              <div style={{ width: "100%", height: 4, backgroundColor: "var(--border-subtle)", borderRadius: 2, marginTop: 6 }}>
                <div 
                  style={{ 
                    width: `${project.physicalProgressPercent}%`, 
                    height: "100%", 
                    backgroundColor: "var(--accent-primary)", 
                    borderRadius: 2 
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Timeline & Delay Indicators */}
          <div className="stat-card" style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={12} /> Original Target
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {project.originalCompletionDate}
                </span>
              </div>
              <div>
                <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={12} /> Anticipated Completion
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {project.anticipatedCompletionDate}
                </span>
              </div>
              <div>
                <span className="stat-label">Schedule Slippage</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: project.timeDelayMonths > 0 ? "#fbbf24" : "#4ade80" }}>
                  {project.timeDelayMonths > 0 ? `${project.timeDelayMonths} Months Delay` : "On Schedule"}
                </span>
              </div>
              <div>
                <span className="stat-label">Time Overrun Risk</span>
                <span className={`result-risk-badge ${getRiskClass(project.timeOverrunRisk)}`}>
                  {project.timeOverrunRisk} Risk
                </span>
              </div>
            </div>
          </div>

          {/* AI Early Warning Alerts Box */}
          <div className="alert-list-box">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontWeight: 600, fontSize: "0.88rem" }}>
              <AlertTriangle size={16} />
              AI Early Warning Signals (Predictive Intelligence)
            </div>
            <div style={{ marginTop: 8 }}>
              {project.earlyWarningAlerts?.map((alert, idx) => (
                <div key={idx} className="alert-list-item">
                  <span style={{ color: "#fbbf24", marginTop: 2 }}>•</span>
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Challenges */}
          <div className="alert-list-box">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-primary)", fontWeight: 600, fontSize: "0.88rem" }}>
              <FileText size={16} />
              Key Implementation Bottlenecks & Critical Path Risks
            </div>
            <div style={{ marginTop: 8 }}>
              {project.implementationChallenges?.map((challenge, idx) => (
                <div key={idx} className="alert-list-item">
                  <span style={{ color: "var(--text-muted)", marginTop: 2 }}>–</span>
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
