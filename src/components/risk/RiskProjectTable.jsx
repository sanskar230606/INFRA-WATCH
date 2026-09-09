import React from "react";
import { ChevronRight, ShieldAlert, ArrowUpRight } from "lucide-react";

export const RiskProjectTable = ({
  title,
  subtitle,
  category,
  projects = [],
  onSelectProject
}) => {
  const getRiskScoreClass = (score, cat) => {
    if (cat === "High" || score >= 70) return "score-pill high";
    if (cat === "Medium" || score >= 45) return "score-pill medium";
    return "score-pill low";
  };

  return (
    <div className={`risk-table-card ${category.toLowerCase()}-table-card`}>
      {/* Table Header */}
      <div className="risk-table-header">
        <div>
          <h3 className="risk-table-title">{title}</h3>
          <p className="risk-table-subtitle">{subtitle}</p>
        </div>
        <span className={`risk-category-badge ${category.toLowerCase()}`}>
          {category} Risk
        </span>
      </div>

      {/* Table Structure */}
      <div className="table-responsive-wrapper">
        <table className="risk-data-table" role="table" aria-label={title}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "36px", textAlign: "center" }}>#</th>
              <th scope="col">Project</th>
              <th scope="col" style={{ width: "90px" }}>State</th>
              <th scope="col" style={{ width: "75px", textAlign: "right" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 5).map((project, index) => {
              const rank = index + 1;
              return (
                <tr
                  key={project.projectCode}
                  className="risk-table-row"
                  onClick={() => onSelectProject?.(project)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectProject?.(project);
                    }
                  }}
                  aria-label={`View predictive details for ${project.name}, risk score ${project.aiRiskScore}`}
                >
                  {/* Rank */}
                  <td className="rank-cell">
                    <span className="rank-number">{rank}</span>
                  </td>

                  {/* Project Name & Code */}
                  <td className="project-cell">
                    <div className="project-info-wrap">
                      <span className="project-table-name" title={project.name}>
                        {project.name}
                      </span>
                      <div className="project-code-row">
                        <span className="project-table-code">{project.projectCode}</span>
                        <span className="project-table-ministry" title={project.ministry}>
                          • {project.sector}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* State */}
                  <td className="state-cell">
                    <span className="state-text" title={project.state}>
                      {project.state}
                    </span>
                  </td>

                  {/* Risk Score */}
                  <td className="score-cell">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                      <span className={getRiskScoreClass(project.aiRiskScore, category)}>
                        {project.aiRiskScore}
                      </span>
                      <ChevronRight size={13} className="row-action-arrow" aria-hidden="true" />
                    </div>
                  </td>
                </tr>
              );
            })}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)" }}>
                  No projects recorded in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
