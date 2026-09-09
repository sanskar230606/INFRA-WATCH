import React from "react";
import { APP_CONFIG } from "../../config/branding";
import { 
  ArrowRight, 
  SearchCheck, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck, 
  UserCheck, 
  ArrowDown
} from "lucide-react";

export const ParadigmShiftAndWorkflow = () => {
  return (
    <div className="paradigm-workflow-section">
      {/* 1. WHY THIS APPROACH IS DIFFERENT (3-Stage Paradigm Shift) */}
      <div className="paradigm-block">
        <div className="block-header">
          <span className="block-badge">THE PARADIGM SHIFT</span>
          <h3 className="block-title">Why This Approach Is Different</h3>
        </div>

        <div className="paradigm-cards-grid">
          {APP_CONFIG.paradigmShift.map((item, index) => (
            <div key={item.stage} className={`paradigm-card stage-${index + 1}`}>
              <div className="paradigm-step-badge">Stage 0{index + 1}</div>
              <h4 className="paradigm-stage-name">{item.stage}</h4>
              <div className="paradigm-question-row">
                <span className="question-quote">“{item.question}”</span>
              </div>
              <p className="paradigm-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CORE 4-STAGE WORKFLOW (MONITOR → PREDICT → PRIORITISE → ACT) */}
      <div className="workflow-block" id="workflow">
        <div className="block-header">
          <span className="block-badge">EXECUTION MODEL</span>
          <h3 className="block-title">Core Operating Workflow</h3>
        </div>

        <div className="workflow-pipeline">
          {APP_CONFIG.workflowStages.map((stage, idx) => (
            <React.Fragment key={stage.step}>
              <div className="workflow-node">
                <div className="node-num">{stage.step}</div>
                <div className="node-content">
                  <h4 className="node-name">{stage.name}</h4>
                  <span className="node-tagline">{stage.tagline}</span>
                  <p className="node-detail">{stage.detail}</p>
                </div>
              </div>
              {idx < APP_CONFIG.workflowStages.length - 1 && (
                <div className="workflow-connector" aria-hidden="true">
                  <ArrowRight size={18} className="arrow-horizontal" />
                  <ArrowDown size={18} className="arrow-vertical" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. AI POSITIONING AS DECISION SUPPORT (HUMAN-IN-THE-LOOP) */}
      <div className="ai-positioning-banner" role="note" aria-label="AI Governance Architecture">
        <div className="ai-banner-header">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={18} className="banner-icon" />
            <h4 className="banner-title">Decision-Support System (Human-in-the-Loop Governance)</h4>
          </div>
          <span className="banner-badge">GOVERNANCE & ACCOUNTABILITY</span>
        </div>

        {/* Conceptual Pipeline Flow */}
        <div className="ai-flow-strip">
          <span className="flow-step">Project Data</span>
          <span className="flow-sep">→</span>
          <span className="flow-step">AI / ML Analysis</span>
          <span className="flow-sep">→</span>
          <span className="flow-step">Prediction</span>
          <span className="flow-sep">→</span>
          <span className="flow-step">Risk Score</span>
          <span className="flow-sep">→</span>
          <span className="flow-step">Early Warning</span>
          <span className="flow-sep">→</span>
          <span className="flow-step highlight">Decision Support</span>
          <span className="flow-sep">→</span>
          <span className="flow-step official">Human Intervention</span>
        </div>

        <p className="ai-statement-text">
          {APP_CONFIG.aiPositioningStatement}
        </p>
      </div>
    </div>
  );
};
