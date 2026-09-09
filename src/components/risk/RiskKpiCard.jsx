import React from "react";

export const RiskKpiCard = ({ title, count, totalCount, category, description, icon: Icon }) => {
  const percentage = totalCount > 0 && category !== "total" 
    ? Math.round((count / totalCount) * 100) 
    : 100;

  const getBadgeStyle = () => {
    switch (category) {
      case "high":
        return "kpi-badge high";
      case "medium":
        return "kpi-badge medium";
      case "low":
        return "kpi-badge low";
      default:
        return "kpi-badge total";
    }
  };

  return (
    <div className={`risk-kpi-card ${category}`}>
      <div className="kpi-top-row">
        <span className="kpi-label">{title}</span>
        {Icon && <Icon size={16} className="kpi-icon" aria-hidden="true" />}
      </div>

      <div className="kpi-value-row">
        <span className="kpi-number">{count}</span>
        <span className={getBadgeStyle()}>
          {category === "total" ? "Portfolio" : `${percentage}%`}
        </span>
      </div>

      <div className="kpi-footer-meta">
        <span className="kpi-subtext">{description}</span>
      </div>
    </div>
  );
};
