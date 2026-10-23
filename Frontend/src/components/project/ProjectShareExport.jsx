import React, { useState } from "react";
import { 
  Download, 
  Share2, 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Copy, 
  Check
} from "lucide-react";

export const ProjectShareExport = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null);

  if (!project) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // 1. Copy Project URL to Clipboard
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // 2. Download CSV
  const handleDownloadCsv = () => {
    setDownloadingFormat("csv");
    try {
      const headers = [
        "Project Code",
        "Project Name",
        "Sector",
        "Ministry",
        "Implementing Agency",
        "State",
        "Status",
        "Original Cost (Cr)",
        "Revised Cost (Cr)",
        "Expenditure (Cr)",
        "Cost Overrun (%)",
        "Original Completion Date",
        "Anticipated Completion Date",
        "Time Delay (Months)",
        "Physical Progress (%)",
        "AI Risk Score",
        "Risk Level",
        "Last Monitored Date"
      ];

      const row = [
        `"${project.projectCode}"`,
        `"${(project.name || "").replace(/"/g, '""')}"`,
        `"${project.sector || ""}"`,
        `"${project.ministry || ""}"`,
        `"${(project.implementingAgency || "").replace(/"/g, '""')}"`,
        `"${(Array.isArray(project.allStates) ? project.allStates.join('; ') : (project.state || "")).replace(/"/g, '""')}"`,
        `"${project.status || ""}"`,
        project.originalCostCr || 0,
        project.revisedCostCr || 0,
        project.expenditureCr || 0,
        project.costOverrunPercent || 0,
        `"${project.originalCompletionDate || ""}"`,
        `"${project.anticipatedCompletionDate || ""}"`,
        project.timeDelayMonths || 0,
        project.physicalProgressPercent || 0,
        project.aiRiskScore || 0,
        `"${project.riskLevel || ""}"`,
        `"${project.lastMonitoredDate || ""}"`
      ];

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `INFRAWATCH_Project_${project.projectCode}_Dossier.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate CSV", err);
    }
    setTimeout(() => setDownloadingFormat(null), 800);
  };

  // 3. Download JSON
  const handleDownloadJson = () => {
    setDownloadingFormat("json");
    try {
      const exportData = {
        system: "INFRAWATCH — MoSPI OCMS/PAIMANA Analytics",
        exportTimestamp: new Date().toISOString(),
        project: project
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const link = document.createElement("a");
      link.setAttribute("href", dataStr);
      link.setAttribute("download", `INFRAWATCH_Project_${project.projectCode}_Data.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate JSON", err);
    }
    setTimeout(() => setDownloadingFormat(null), 800);
  };

  // 4. Print / PDF Generation
  const handlePrintPdf = () => {
    setDownloadingFormat("pdf");
    setTimeout(() => {
      window.print();
      setDownloadingFormat(null);
    }, 250);
  };

  // Share text strings
  const shareTitle = `INFRAWATCH Alert: ${project.name} (PMGID #${project.projectCode})`;
  const shareSummary = `Project Code: #${project.projectCode} | AI Risk Score: ${project.aiRiskScore}/100 (${project.riskLevel} Risk) | Cost: ₹${project.revisedCostCr?.toLocaleString()} Cr | Progress: ${project.physicalProgressPercent}%.`;
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle}\n${shareSummary}`)}&url=${encodeURIComponent(currentUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`*${shareTitle}*\n${shareSummary}\n\nView Project Dossier: ${currentUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="share-export-card glass-panel" role="region" aria-label="Project Export and Social Share">
      
      {/* SECTION 1: DOWNLOAD REPORT & FORMATS */}
      <div className="export-section">
        <div className="share-card-header">
          <div className="share-title-wrap">
            <Download size={15} className="share-icon" aria-hidden="true" />
            <h3 className="share-card-title">Download Project Report</h3>
          </div>
          <span className="export-tag">Multi-Format</span>
        </div>

        <p className="share-card-desc">
          Export official OCMS parameters, budget trajectory, and risk indicators.
        </p>

        {/* 3 Format Buttons - Clean Pill Layout with No Truncation */}
        <div className="download-formats-pill-row">
          <button 
            type="button"
            className={`format-pill-btn pdf-pill ${downloadingFormat === "pdf" ? "active" : ""}`}
            onClick={handlePrintPdf}
            title="Download formatted PDF executive brief or print dossier"
          >
            <FileText size={14} className="pill-icon pdf" aria-hidden="true" />
            <span className="pill-title">PDF Brief</span>
          </button>

          <button 
            type="button"
            className={`format-pill-btn csv-pill ${downloadingFormat === "csv" ? "active" : ""}`}
            onClick={handleDownloadCsv}
            title="Download raw spreadsheet data in CSV format"
          >
            <FileSpreadsheet size={14} className="pill-icon csv" aria-hidden="true" />
            <span className="pill-title">CSV Sheet</span>
          </button>

          <button 
            type="button"
            className={`format-pill-btn json-pill ${downloadingFormat === "json" ? "active" : ""}`}
            onClick={handleDownloadJson}
            title="Export raw JSON schema for API ingestion"
          >
            <FileCode size={14} className="pill-icon json" aria-hidden="true" />
            <span className="pill-title">JSON Data</span>
          </button>
        </div>
      </div>

      <div className="share-divider" aria-hidden="true" />

      {/* SECTION 2: SHARE ON SOCIALS & COPY LINK */}
      <div className="social-share-section">
        <div className="share-card-header">
          <div className="share-title-wrap">
            <Share2 size={15} className="share-icon" aria-hidden="true" />
            <h3 className="share-card-title">Share Project on Socials</h3>
          </div>
        </div>

        {/* Social Action Chips */}
        <div className="social-icons-row">
          {/* X (formerly Twitter) */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn x-btn"
            aria-label="Share project on X"
            title="Share on X (Twitter)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>X</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn whatsapp-btn"
            aria-label="Share project on WhatsApp"
            title="Share on WhatsApp"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn linkedin-btn"
            aria-label="Share project on LinkedIn"
            title="Share on LinkedIn"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn facebook-btn"
            aria-label="Share project on Facebook"
            title="Share on Facebook"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </a>

          {/* Instagram / Direct Copy */}
          <button
            type="button"
            className="social-btn instagram-btn"
            onClick={handleCopyLink}
            aria-label="Copy link for Instagram story or bio"
            title="Copy link for Instagram story or DM"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Instagram</span>
          </button>
        </div>

        {/* Dedicated Copy Link Bar */}
        <div className="copy-link-box">
          <input 
            type="text" 
            readOnly 
            value={currentUrl} 
            className="copy-link-input font-mono"
            aria-label="Direct Project URL"
          />
          <button
            type="button"
            className={`copy-link-btn ${copied ? "copied" : ""}`}
            onClick={handleCopyLink}
            aria-label="Copy project URL to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
