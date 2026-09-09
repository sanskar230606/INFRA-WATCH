import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

export const ProjectProgressRing = ({ physicalProgress = 0, status = "Active" }) => {
  const size = 190;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const clampedProgress = Math.min(100, Math.max(0, physicalProgress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  const remainingPercent = (100 - clampedProgress).toFixed(1);

  return (
    <div className="progress-ring-card" role="region" aria-label="Physical Progress Ring">
      <div className="ring-header">
        <h3 className="ring-title">Physical Progress</h3>
        <span className="ring-badge">
          {clampedProgress === 100 ? "Completed" : `${remainingPercent}% Remaining`}
        </span>
      </div>

      <div className="ring-visual-wrap">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="progress-svg-ring"
          aria-hidden="true"
        >
          {/* Background Ring (100% project scope) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="ring-background"
            strokeWidth={strokeWidth}
          />

          {/* Foreground Animated Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="ring-progress"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* Center Readout */}
        <div className="ring-center-content">
          <span className="ring-percent-value">{clampedProgress}%</span>
          <span className="ring-percent-label">Physical Progress</span>
        </div>
      </div>

      <div className="ring-footer-meta">
        <div className="ring-meta-row">
          <span className="meta-dot completed" />
          <span>Executed Scope: <strong>{clampedProgress}%</strong></span>
        </div>
        <div className="ring-meta-row">
          <span className="meta-dot balance" />
          <span>Balance Works: <strong>{remainingPercent}%</strong></span>
        </div>
      </div>
    </div>
  );
};
