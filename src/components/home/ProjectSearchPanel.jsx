import React, { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Building2, 
  Hash, 
  ChevronRight, 
  AlertCircle, 
  Check, 
  X,
  Sliders
} from "lucide-react";
import { ProjectSearchService } from "../../services/projectSearchService";
import { ProjectPreviewModal } from "./ProjectPreviewModal";

export const ProjectSearchPanel = () => {
  // 3 Search Parameters
  const [projectCode, setProjectCode] = useState("");
  const [state, setState] = useState("");
  const [ministry, setMinistry] = useState("");

  // Search execution state
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchMeta, setSearchMeta] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Dynamic filter lists from dataset
  const filterOptions = useMemo(() => ProjectSearchService.getFilterOptions(), []);
  const sampleCodes = useMemo(() => ProjectSearchService.getSampleCodes(), []);

  // Execute Search
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setValidationMessage("");

    // Check if at least one parameter is provided
    if (!projectCode.trim() && !state && !ministry) {
      setValidationMessage("Please provide at least one parameter (Project Code, State, or Ministry) to initiate search.");
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    const response = await ProjectSearchService.searchProjects({
      projectCode,
      state,
      ministry
    });

    setSearchResults(response.results);
    setSearchMeta(response);
    setHasSearched(true);
  };

  // Quick sample pill select
  const handleSampleClick = (code) => {
    setProjectCode(code);
    setValidationMessage("");
    // Execute immediately for convenient evaluation
    ProjectSearchService.searchProjects({ projectCode: code, state: "", ministry: "" }).then((res) => {
      setSearchResults(res.results);
      setSearchMeta(res);
      setHasSearched(true);
    });
  };

  // Reset all filters
  const handleClearFilters = () => {
    setProjectCode("");
    setState("");
    setMinistry("");
    setHasSearched(false);
    setSearchResults([]);
    setValidationMessage("");
  };

  const getRiskClass = (level) => {
    switch (level?.toLowerCase()) {
      case "critical": return "critical";
      case "high": return "high";
      case "medium": return "medium";
      default: return "low";
    }
  };

  return (
    <div className="search-panel-wrapper">
      {/* Glassmorphism Search Container */}
      <div className="search-panel" role="search" aria-label="Infrastructure Project Search">
        <form onSubmit={handleSearch}>
          <div className="search-grid">
            {/* PARAMETER 1 — PROJECT CODE */}
            <div className="search-field">
              <label htmlFor="search-project-code" className="field-label">
                <Hash size={13} aria-hidden="true" />
                Project Code
              </label>
              <div className="field-input-box">
                <Search size={15} className="field-icon" aria-hidden="true" />
                <input
                  id="search-project-code"
                  type="text"
                  className="field-input"
                  placeholder="Enter Project Code"
                  value={projectCode}
                  onChange={(e) => {
                    setProjectCode(e.target.value);
                    if (validationMessage) setValidationMessage("");
                  }}
                  autoComplete="off"
                />
                {projectCode && (
                  <button
                    type="button"
                    onClick={() => setProjectCode("")}
                    style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                    aria-label="Clear project code"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* PARAMETER 2 — STATE */}
            <div className="search-field">
              <label htmlFor="search-state" className="field-label">
                <MapPin size={13} aria-hidden="true" />
                State
              </label>
              <div className="field-input-box">
                <select
                  id="search-state"
                  className="field-select"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (validationMessage) setValidationMessage("");
                  }}
                  aria-label="Filter by State"
                >
                  <option value="">Select State</option>
                  {filterOptions.states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PARAMETER 3 — MINISTRY / DEPARTMENT */}
            <div className="search-field">
              <label htmlFor="search-ministry" className="field-label">
                <Building2 size={13} aria-hidden="true" />
                Ministry / Department
              </label>
              <div className="field-input-box">
                <select
                  id="search-ministry"
                  className="field-select"
                  value={ministry}
                  onChange={(e) => {
                    setMinistry(e.target.value);
                    if (validationMessage) setValidationMessage("");
                  }}
                  aria-label="Filter by Ministry or Department"
                >
                  <option value="">Select Ministry / Department</option>
                  {filterOptions.ministries.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PRIMARY SEARCH BUTTON */}
            <button
              type="submit"
              className="search-btn"
              aria-label="Search Project"
            >
              <Search size={16} />
              <span>Search Project</span>
            </button>
          </div>
        </form>

        {/* Validation Alert when no parameters are provided */}
        {validationMessage && (
          <div className="search-alert warning" role="alert">
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <AlertCircle size={15} />
              {validationMessage}
            </span>
            <button
              type="button"
              onClick={() => setValidationMessage("")}
              style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Search Meta & Quick Sample Lookup Chips */}
        <div className="search-meta-footer">
          <div className="sample-pills">
            <span className="sample-label">Quick Lookup:</span>
            {sampleCodes.slice(0, 4).map((item) => (
              <button
                key={item.code}
                type="button"
                className="sample-chip"
                onClick={() => handleSampleClick(item.code)}
                title={item.label}
              >
                {item.code}
              </button>
            ))}
          </div>

          {(projectCode || state || ministry || hasSearched) && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* SEARCH RESULTS TRAY (IF SEARCH EXECUTED) */}
      {hasSearched && (
        <div className="results-container" aria-live="polite">
          <div className="results-header">
            <span>
              {searchResults.length} {searchResults.length === 1 ? "Project Found" : "Projects Found"}
              {searchMeta?.queryTimeMs ? ` (${searchMeta.queryTimeMs}ms)` : ""}
            </span>
            <span>Click any project to inspect predictive decision support metrics</span>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)" }}>
              No infrastructure projects match the selected criteria. Try adjusting state, ministry, or code.
            </div>
          ) : (
            <div className="results-list">
              {searchResults.map((project) => (
                <div
                  key={project.projectCode}
                  className="result-item-card"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`View analysis for ${project.name}`}
                >
                  <div className="result-primary-info">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="result-code-tag">{project.projectCode}</span>
                      <span className="result-name">{project.name}</span>
                    </div>
                    <div className="result-meta-tags">
                      <span>{project.ministry}</span>
                      <span>•</span>
                      <span>{project.state}</span>
                      <span>•</span>
                      <span>₹{project.revisedCostCr.toLocaleString()} Cr</span>
                      <span>•</span>
                      <span>Progress: {project.physicalProgressPercent}%</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className={`result-risk-badge ${getRiskClass(project.riskLevel)}`}>
                      Score: {project.aiRiskScore} • {project.riskLevel} Risk
                    </div>
                    <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROJECT PREDICTIVE PREVIEW MODAL */}
      {selectedProject && (
        <ProjectPreviewModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
