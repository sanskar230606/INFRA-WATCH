import React, { useEffect } from "react";
import { useRouter } from "../context/RouterContext";
import { MOCK_PROJECTS } from "../data/mockProjects";
import { BudgetTimeChart } from "../components/project/BudgetTimeChart";
import { ProjectProgressRing } from "../components/project/ProjectProgressRing";
import { ProjectHealthSummary } from "../components/project/ProjectHealthSummary";
import { ProjectShareExport } from "../components/project/ProjectShareExport";
import { AccessibilityBar } from "../components/common/AccessibilityBar";
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  Building2, 
  MapPin, 
  Calendar, 
  Coins, 
  Layers, 
  Cpu, 
  Clock, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle
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

  // Generate dynamic, context-specific prescriptive recommendations
  const generateRecommendations = (proj) => {
    const list = [];
    const costOverrun = proj.costOverrunPercent || 0;
    const delay = proj.timeDelayMonths || 0;
    const challenges = (proj.implementationChallenges || []).join(" ").toLowerCase();

    // 1. Cost Containment & Financial Safeguards
    if (costOverrun > 15) {
      list.push({
        category: "Cost Containment",
        priority: "Critical",
        badgeColor: "critical",
        title: "Mandate Scope Freeze & Value Engineering Audit",
        action: `Enforce an immediate freeze on non-statutory scope variations with ${proj.implementingAgency}. Commission an independent Third-Party Quality Inspection (TPQI) to audit the ${costOverrun}% cost escalation above original sanction.`
      });
    } else if (costOverrun > 0) {
      list.push({
        category: "Expenditure Discipline",
        priority: "High",
        badgeColor: "high",
        title: "Milestone-Linked EPC Disbursements",
        action: `Institute milestone-linked contractor disbursements and quarterly escalation audits to restrict variance above the current ₹${proj.revisedCostCr?.toLocaleString()} Cr envelope.`
      });
    } else {
      list.push({
        category: "Budget Assurance",
        priority: "Normal",
        badgeColor: "normal",
        title: "Expenditure Trajectory Compliance",
        action: `Spending remains within sanctioned limits (₹${proj.originalCostCr?.toLocaleString()} Cr). Maintain standard monthly invoice reconciliation with ${proj.implementingAgency}.`
      });
    }

    // 2. Schedule Recovery & Critical Path Protection
    if (delay >= 24) {
      list.push({
        category: "Schedule Recovery",
        priority: "Critical",
        badgeColor: "critical",
        title: "OCMS CPM/PERT Re-baselining",
        action: `Mandate CPM/PERT critical-path re-baselining in MoSPI OCMS. Form a dedicated sprint monitoring cell to recover ${delay} months of accumulated schedule slippage before ${proj.anticipatedCompletionDate}.`
      });
    } else if (delay > 0) {
      list.push({
        category: "Timeline Protection",
        priority: "High",
        badgeColor: "high",
        title: "Critical Path Float Safeguard",
        action: `Deploy aggressive buffer management on long-lead equipment procurement to prevent the current ${delay}-month delay from escalating further.`
      });
    } else {
      list.push({
        category: "Milestone Adherence",
        priority: "Normal",
        badgeColor: "normal",
        title: "Target Completion Tracking",
        action: `Work packages are progressing to target date (${proj.anticipatedCompletionDate}). Maintain weekly milestone validation in OCMS.`
      });
    }

    // 3. Structural & Statutory Coordination
    if (challenges.includes("forest") || challenges.includes("land") || challenges.includes("encroachment") || challenges.includes("clearance")) {
      list.push({
        category: "Statutory & Land Acquisition",
        priority: "High",
        badgeColor: "high",
        title: "PM GatiShakti NMP Portal Escalation",
        action: `Trigger fast-track inter-ministerial coordination via PM GatiShakti National Master Plan (NMP) platform with the State Chief Secretary task force to expedite statutory clearances and right-of-way handovers.`
      });
    } else if (challenges.includes("geological") || challenges.includes("slope") || challenges.includes("weather") || challenges.includes("terrain")) {
      list.push({
        category: "Engineering & Technical Risk",
        priority: "High",
        badgeColor: "high",
        title: "Geotechnical Telemetry & Drone LiDAR",
        action: `Deploy specialized geotechnical consulting panels and drone LiDAR telemetry to monitor terrain stability and preempt unexpected construction halts.`
      });
    } else {
      list.push({
        category: "Inter-Agency Synergy",
        priority: "Medium",
        badgeColor: "medium",
        title: "Nodal Ministry Coordination",
        action: `Conduct monthly joint coordination sessions between ${proj.ministry} and ${proj.implementingAgency} to ensure rapid vendor bill clearances and material availability.`
      });
    }

    // 4. Predictive Governance & Reporting Latency
    list.push({
      category: "Predictive Monitoring",
      priority: proj.aiRiskScore >= 70 ? "High" : "Medium",
      badgeColor: proj.aiRiskScore >= 70 ? "high" : "medium",
      title: "Real-Time Telemetry Data Pipeline",
      action: `Integrate IoT sensor feeds and contractor liquidity telemetry directly into PAIMANA to reduce reporting latency from 30 days to near real-time.`
    });

    return list;
  };

  const recommendations = generateRecommendations(project);

  return (
    <main className="project-details-page" role="main" aria-label={`Project details for ${project.name}`}>
      {/* Top Accessible Government Header */}
      <AccessibilityBar />

      <div className="project-details-container">
        
        {/* TOP NAVIGATION & BREADCRUMBS */}
        <nav className="project-nav-bar" aria-label="Breadcrumb">
          <button 
            onClick={goBack} 
            className="back-btn" 
            aria-label="Return to previous dashboard section"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Back to Dashboard</span>
          </button>

          <div className="breadcrumb-trail">
            <button onClick={() => navigate("/")} className="breadcrumb-link">Dashboard</button>
            <ChevronRight size={13} className="breadcrumb-sep" aria-hidden="true" />
            <span className="breadcrumb-link">{project.sector}</span>
            <ChevronRight size={13} className="breadcrumb-sep" aria-hidden="true" />
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
                <span className="sub-meta-value">
                  {Array.isArray(project.allStates)
                    ? project.allStates.join(', ')
                    : (project.state || 'National')}
                </span>
              </div>
            </div>

            <div className="sub-meta-item">
              <Calendar size={15} className="sub-meta-icon" aria-hidden="true" />
              <div className="sub-meta-content">
                <span className="sub-meta-label">Anticipated Target</span>
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

        {/* ROW 1: PRIMARY ANALYTICS & HEALTH DUAL GRID */}
        <div className="project-layout-grid">
          
          {/* LEFT COLUMN: BUDGET S-CURVE GRAPH + HIGHLIGHTED AI RECOMMENDATIONS */}
          <div className="project-col-main">
            {/* 1. SCALED-DOWN BUDGET VS TIME S-CURVE GRAPH */}
            <section aria-labelledby="budget-chart-heading">
              <BudgetTimeChart project={project} />
            </section>

            {/* 2. HIGHLIGHTED AI PRESCRIPTIVE RECOMMENDATIONS SECTION */}
            <section 
              className="ai-recommendations-section" 
              aria-labelledby="recommendations-heading"
            >
              <div className="recommendations-header">
                <div className="rec-title-group">
                  <div className="rec-badge-pill">
                    <Sparkles size={13} className="sparkle-icon" aria-hidden="true" />
                    <span>AI Prescriptive Decision Support</span>
                  </div>
                  <h3 id="recommendations-heading" className="recommendations-title">
                    Prescriptive Interventions & Action Plan
                  </h3>
                  <p className="recommendations-desc">
                    Model-generated mitigation directives based on PAIMANA/OCMS historical failure drivers and delay velocity.
                  </p>
                </div>
                <span className="rec-engine-tag">PAIMANA Engine v2.4</span>
              </div>

              <div className="recommendations-cards-grid">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="rec-card-item">
                    <div className="rec-card-top">
                      <span className="rec-category-tag">{rec.category}</span>
                      <span className={`rec-priority-pill ${rec.badgeColor}`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <h4 className="rec-item-title">{rec.title}</h4>
                    <p className="rec-item-action">{rec.action}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: PROGRESS RING & HEALTH METRICS */}
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
          </div>
        </div>

        {/* ROW 2: IMPLEMENTATION CHALLENGES & EARLY WARNING SIGNALS (MATCHED HEIGHT) */}
        <div className="project-layout-grid equal-height-row">
          <div className="project-col-main">
            <section className="challenges-card glass-panel" aria-labelledby="challenges-heading">
              <div className="section-card-head">
                <div className="head-title-wrap">
                  <HelpCircle size={17} className="head-icon challenge-icon" aria-hidden="true" />
                  <h3 id="challenges-heading" className="section-card-title">
                    Key Implementation Challenges (PAIMANA / MoSPI)
                  </h3>
                </div>
                <span className="challenge-count-badge">
                  {project.implementationChallenges?.length || 0} Bottlenecks Reported
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

          <div className="project-col-side">
            <section className="early-warnings-card glass-panel" aria-labelledby="early-warnings-heading">
              <div className="section-card-head">
                <div className="head-title-wrap">
                  <AlertTriangle size={17} className="head-icon warning-icon" aria-hidden="true" />
                  <h3 id="early-warnings-heading" className="section-card-title">
                    Early Warning Signals
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
          </div>
        </div>

        {/* ROW 3: ADMINISTRATIVE & NODAL SPECS (EXPANDED & 100% BALANCED WITH SHARE / EXPORT) */}
        <div className="project-layout-grid equal-height-row">
          <div className="project-col-main">
            <section className="metadata-spec-card wide-spec-card glass-panel" aria-labelledby="metadata-heading">
              <div className="spec-card-top">
                <div className="spec-title-wrap">
                  <ShieldCheck size={16} className="spec-head-icon" aria-hidden="true" />
                  <h4 id="metadata-heading" className="meta-spec-title">Administrative & Nodal Specs</h4>
                </div>
                <span className="spec-authority-tag">MoSPI OCMS Baseline</span>
              </div>
              
              <div className="meta-spec-grid-wide">
                <div className="spec-grid-cell">
                  <span className="spec-key">MoSPI Project Code</span>
                  <span className="spec-val font-mono">#{project.projectCode}</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Sector Classification</span>
                  <span className="spec-val">{project.sector}</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Nodal Ministry</span>
                  <span className="spec-val">{project.ministry}</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Implementing Agency</span>
                  <span className="spec-val">{project.implementingAgency}</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">State / Regional Scope</span>
                  <span className="spec-val">
                    {Array.isArray(project.allStates)
                      ? project.allStates.join(', ')
                      : (project.state || 'National')}
                  </span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Original Sanction Cost</span>
                  <span className="spec-val font-mono">₹{(project.originalCostCr || 0).toLocaleString()} Cr</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Current Revised Cost</span>
                  <span className="spec-val font-mono">₹{(project.revisedCostCr || project.originalCostCr || 0).toLocaleString()} Cr</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Cost Escalation</span>
                  <span className="spec-val font-mono">
                    {(project.revisedCostCr || 0) > (project.originalCostCr || 0) 
                      ? `+₹${((project.revisedCostCr || 0) - (project.originalCostCr || 0)).toFixed(1)} Cr (+${project.costOverrunPercent}%)` 
                      : "Within Budget"}
                  </span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Cumulative Expenditure</span>
                  <span className="spec-val font-mono">₹{(project.expenditureCr || 0).toLocaleString()} Cr</span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Unspent Balance</span>
                  <span className="spec-val font-mono">
                    ₹{Math.max(0, (project.revisedCostCr || project.originalCostCr || 0) - (project.expenditureCr || 0)).toFixed(1)} Cr
                  </span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Schedule Delay</span>
                  <span className="spec-val">
                    {(project.timeDelayMonths || 0) > 0 ? `+${project.timeDelayMonths} Months` : "On Schedule"}
                  </span>
                </div>
                <div className="spec-grid-cell">
                  <span className="spec-key">Anticipated Target Date</span>
                  <span className="spec-val">{project.anticipatedCompletionDate || "N/A"}</span>
                </div>
              </div>

              <div className="spec-footer-strip">
                <span>Last Monitored Cycle: {project.lastMonitoredDate || "August 2026"}</span>
                <span>MoSPI Central Sector Infrastructure Monitoring (OCMS)</span>
              </div>
            </section>
          </div>

          <div className="project-col-side">
            <section aria-labelledby="export-share-heading">
              <ProjectShareExport project={project} />
            </section>
          </div>
        </div>

      </div>
    </main>
  );
};
