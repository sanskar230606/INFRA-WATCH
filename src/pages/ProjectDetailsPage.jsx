import React, { useEffect } from "react";
import { useRouter } from "../context/RouterContext";
import { MOCK_PROJECTS } from "../data/mockProjects";
import { BudgetTimeChart } from "../components/project/BudgetTimeChart";
import { ProjectProgressRing } from "../components/project/ProjectProgressRing";
import { ProjectHealthSummary } from "../components/project/ProjectHealthSummary";
import { AccessibilityBar } from "../components/common/AccessibilityBar";
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  MapPin, 
  Calendar, 
  Coins, 
  Layers, 
  Cpu, 
  Clock, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const ProjectDetailsPage = () => {
  const { projectCodeParam, goBack, navigate } = useRouter();

  // Scroll to top on mount or param change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectCodeParam]);

  // Find project in the dataset
  const project = MOCK_PROJECTS.find(
    (p) => String(p.projectCode).trim() === String(projectCodeParam).trim()
  );

  if (!project) {
    return (
      <main className="project-details-page not-found-view" role="main">
        <AccessibilityBar />
        <div className="project-details-container">
          <nav className="project-nav-bar" aria-label="Breadcrumb">
            <button 
              onClick={goBack} 
              className="back-btn" 
              aria-label="Return to previous screen"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Dashboard</span>
            </button>
          </nav>

          <div className="not-found-card glass-panel" role="alert">
            <div className="not-found-icon-wrap">
              <AlertTriangle size={36} className="not-found-icon" aria-hidden="true" />
            </div>
            <h1 className="not-found-title">Project Not Found</h1>
            <p className="not-found-desc">
              No infrastructure project was found matching code <code className="code-pill">{projectCodeParam || "unknown"}</code>.
              Please check the project code or search again from the monitoring dashboard.
            </p>
            <div className="not-found-actions">
              <button 
                onClick={() => navigate("/")} 
                className="action-btn primary-btn"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const getRiskBadgeClass = (risk) => {
    switch (risk?.toLowerCase()) {
      case "critical":
      case "high": return "risk-badge-high";
      case "medium": return "risk-badge-medium";
      default: return "risk-badge-low";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delayed": return "status-delayed";
      case "on track": return "status-ontrack";
      case "completed": return "status-completed";
      default: return "status-active";
    }
  };

  return (
    <main className="project-details-page" role="main" aria-label={`Project details for ${project.name}`}>
      <AccessibilityBar />
      <div className="project-details-container">
        
        {/* TOP NAVIGATION & BREADCRUMBS */}
        <nav className="project-nav-bar" aria-label="Breadcrumb">
          <button 
            onClick={goBack} 
            className="back-btn" 
            aria-label="Return to previous dashboard section"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Dashboard</span>
          </button>

          <div className="breadcrumb-trail">
            <button onClick={() => navigate("/")} className="breadcrumb-link">Dashboard</button>
            <ChevronRight size={14} className="breadcrumb-sep" aria-hidden="true" />
            <span className="breadcrumb-link">{project.sector}</span>
            <ChevronRight size={14} className="breadcrumb-sep" aria-hidden="true" />
            <span className="breadcrumb-current" aria-current="page">PMGID #{project.projectCode}</span>
          </div>
        </nav>

        {/* PROJECT HEADER CARD */}
        <header className="project-detail-header glass-panel">
          <div className="header-meta-strip">
            <div className="meta-left">
              <span className="meta-code-tag">PMGID #{project.projectCode}</span>
              <span className={`status-pill ${getStatusBadgeClass(project.status)}`}>
                {project.status || "Active"}
              </span>
              <span className="sector-pill">
                <Layers size={12} aria-hidden="true" />
                {project.sector}
              </span>
            </div>

            <div className="meta-right">
              <div className={`detail-risk-badge ${getRiskBadgeClass(project.riskLevel)}`}>
                <ShieldAlert size={14} aria-hidden="true" />
                <span>{project.riskLevel} Risk</span>
              </div>
              <div className="detail-ai-score-pill">
                <Cpu size={14} aria-hidden="true" />
                <span>AI Risk: <strong>{project.aiRiskScore}/100</strong></span>
              </div>
            </div>
          </div>

          <h1 className="project-detail-title">{project.name}</h1>

          <div className="project-sub-meta-grid">
            <div className="sub-meta-item">
              <Building2 size={15} className="sub-meta-icon" aria-hidden="true" />
              <div className="sub-meta-content">
                <span className="sub-meta-label">Ministry & Agency</span>
                <span className="sub-meta-value">{project.ministry} ({project.implementingAgency})</span>
              </div>
            </div>

            <div className="sub-meta-item">
              <MapPin size={15} className="sub-meta-icon" aria-hidden="true" />
              <div className="sub-meta-content">
                <span className="sub-meta-label">State / Region</span>
                <span className="sub-meta-value">{project.allStates || project.state}</span>
              </div>
            </div>

            <div className="sub-meta-item">
              <Calendar size={15} className="sub-meta-icon" aria-hidden="true" />
              <div className="sub-meta-content">
                <span className="sub-meta-label">Anticipated Completion</span>
                <span className="sub-meta-value">{project.anticipatedCompletionDate}</span>
              </div>
            </div>

            <div className="sub-meta-item">
              <Coins size={15} className="sub-meta-icon" aria-hidden="true" />
              <div className="sub-meta-content">
                <span className="sub-meta-label">Current / Revised Cost</span>
                <span className="sub-meta-value">₹{project.revisedCostCr?.toLocaleString()} Cr</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN TWO-COLUMN DASHBOARD GRID */}
        <div className="project-layout-grid">
          
          {/* LEFT COLUMN: CHARTS, EARLY WARNINGS & CHALLENGES */}
          <div className="project-col-main">
            
            {/* 1. BUDGET VS TIME S-CURVE GRAPH */}
            <section aria-labelledby="budget-chart-heading">
              <BudgetTimeChart project={project} />
            </section>

            {/* 2. EARLY WARNING SIGNALS */}
            <section className="early-warnings-card glass-panel" aria-labelledby="early-warnings-heading">
              <div className="section-card-head">
                <div className="head-title-wrap">
                  <AlertTriangle size={18} className="head-icon warning-icon" aria-hidden="true" />
                  <h3 id="early-warnings-heading" className="section-card-title">
                    Early Warning Signals & Anomaly Indicators
                  </h3>
                </div>
                <span className="signal-count-badge">
                  {project.earlyWarningAlerts?.length || 0} Flagged
                </span>
              </div>

              {project.earlyWarningAlerts && project.earlyWarningAlerts.length > 0 ? (
                <div className="warning-alerts-list">
                  {project.earlyWarningAlerts.map((alert, idx) => (
                    <div key={idx} className="warning-alert-item">
                      <div className="warning-indicator-dot" aria-hidden="true"></div>
                      <p className="warning-text">{alert}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-signals-box">
                  <p>No early warning anomalies currently flagged by the predictive model.</p>
                </div>
              )}
            </section>

            {/* 3. IMPLEMENTATION CHALLENGES */}
            <section className="challenges-card glass-panel" aria-labelledby="challenges-heading">
              <div className="section-card-head">
                <div className="head-title-wrap">
                  <HelpCircle size={18} className="head-icon challenge-icon" aria-hidden="true" />
                  <h3 id="challenges-heading" className="section-card-title">
                    Key Implementation Challenges (PAIMANA / MoSPI)
                  </h3>
                </div>
                <span className="challenge-count-badge">
                  {project.implementationChallenges?.length || 0} Active Bottlenecks
                </span>
              </div>

              {project.implementationChallenges && project.implementationChallenges.length > 0 ? (
                <div className="challenges-tags-list">
                  {project.implementationChallenges.map((challenge, idx) => (
                    <div key={idx} className="challenge-chip">
                      <span className="chip-bullet">•</span>
                      <span className="chip-label">{challenge}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-signals-box">
                  <p>No structural bottlenecks reported for this project cycle.</p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: PROGRESS RING, HEALTH METRICS & METADATA */}
          <div className="project-col-side">
            
            {/* 1. CIRCULAR PHYSICAL PROGRESS RING */}
            <section aria-labelledby="progress-ring-heading">
              <ProjectProgressRing 
                physicalProgress={project.physicalProgressPercent} 
                status={project.status} 
              />
            </section>

            {/* 2. PROJECT HEALTH SUMMARY */}
            <section aria-labelledby="health-summary-heading">
              <ProjectHealthSummary project={project} />
            </section>

            {/* 3. ADDITIONAL ADMINISTRATIVE METADATA */}
            <section className="metadata-spec-card glass-panel" aria-labelledby="metadata-heading">
              <h4 id="metadata-heading" className="meta-spec-title">Administrative Specs</h4>
              
              <div className="meta-spec-table">
                <div className="meta-row">
                  <span className="spec-key">MoSPI Project Code</span>
                  <span className="spec-val font-mono">{project.projectCode}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Sector Classification</span>
                  <span className="spec-val">{project.sector}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Nodal Ministry</span>
                  <span className="spec-val">{project.ministry}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Implementing Agency</span>
                  <span className="spec-val">{project.implementingAgency}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Original Sanction Date</span>
                  <span className="spec-val">{project.originalCompletionDate ? `Target: ${project.originalCompletionDate}` : "N/A"}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Anticipated Target</span>
                  <span className="spec-val">{project.anticipatedCompletionDate || "N/A"}</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Cumulative Expenditure</span>
                  <span className="spec-val font-mono">₹{project.expenditureCr?.toLocaleString()} Cr</span>
                </div>
                <div className="meta-row">
                  <span className="spec-key">Last Monitored Cycle</span>
                  <span className="spec-val">{project.lastMonitoredDate || "August 2026"}</span>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
};
