import React, { useState } from "react";
import { TrendingUp, AlertCircle, CheckCircle2, Info } from "lucide-react";

export const BudgetTimeChart = ({ project }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!project) return null;

  const originalCost = project.originalCostCr || 0;
  const revisedCost = project.revisedCostCr || originalCost;
  const actualExpenditure = project.expenditureCr || 0;
  const physicalProgress = project.physicalProgressPercent || 0;

  // Timeline Calculation
  const anticipatedDate = new Date(project.anticipatedCompletionDate || "2027-12-31");
  const originalDate = new Date(project.originalCompletionDate || "2025-12-31");
  
  // Approximate start date (typically 2-4 years before original target, or derived)
  const delayMonths = project.timeDelayMonths || 0;
  const originalDurationMonths = 36; // 3-year baseline standard central sector cycle
  const startDate = new Date(originalDate);
  startDate.setMonth(startDate.getMonth() - originalDurationMonths);

  const currentDate = new Date("2026-08-31"); // MoSPI Monitoring reference cutoff
  
  const totalTimelineMs = anticipatedDate.getTime() - startDate.getTime();
  const elapsedMs = Math.max(0, currentDate.getTime() - startDate.getTime());
  const timelineProgressRatio = Math.min(1, Math.max(0.05, totalTimelineMs > 0 ? elapsedMs / totalTimelineMs : 0.5));
  const timelineProgressPercent = Math.round(timelineProgressRatio * 100);

  // Financial Progress & Trajectory Calculation
  const financialProgressPercent = revisedCost > 0 
    ? +((actualExpenditure / revisedCost) * 100).toFixed(1) 
    : 0;

  // Ideal planned spending at current timeline position (S-curve approximation)
  // S-Curve: y = 3x^2 - 2x^3
  const sCurveRatio = 3 * Math.pow(timelineProgressRatio, 2) - 2 * Math.pow(timelineProgressRatio, 3);
  const plannedSpendingAtCurrentTime = +(revisedCost * sCurveRatio).toFixed(1);

  // Over-budget vs Under-budget determination:
  // Compare Actual cumulative expenditure with Ideal planned expenditure at the same point in time
  const isOverBudget = actualExpenditure > plannedSpendingAtCurrentTime;
  const varianceAmount = Math.abs(actualExpenditure - plannedSpendingAtCurrentTime).toFixed(1);
  const variancePercent = plannedSpendingAtCurrentTime > 0
    ? Math.abs(((actualExpenditure - plannedSpendingAtCurrentTime) / plannedSpendingAtCurrentTime) * 100).toFixed(1)
    : 0;

  // SVG Coordinate space: 600 width x 280 height
  const width = 600;
  const height = 280;
  const padding = { top: 30, right: 40, bottom: 45, left: 65 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const maxBudget = Math.max(revisedCost * 1.15, actualExpenditure * 1.15, 100);

  const getX = (ratio) => padding.left + ratio * graphWidth;
  const getY = (val) => padding.top + graphHeight - (val / maxBudget) * graphHeight;

  // Generate Ideal Planned Path (Smooth S-curve)
  const idealPoints = [];
  const numSteps = 20;
  for (let i = 0; i <= numSteps; i++) {
    const r = i / numSteps;
    const curveR = 3 * Math.pow(r, 2) - 2 * Math.pow(r, 3);
    const budgetVal = revisedCost * curveR;
    idealPoints.push({ x: getX(r), y: getY(budgetVal), ratio: r, budgetVal });
  }
  const idealPathD = idealPoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");

  // Actual Current Point Coordinates
  const actualPoint = {
    x: getX(timelineProgressRatio),
    y: getY(actualExpenditure)
  };

  // Generate Actual Path from Start to Current Point
  const actualPoints = [];
  const actualSteps = 10;
  for (let i = 0; i <= actualSteps; i++) {
    const subRatio = (i / actualSteps) * timelineProgressRatio;
    // Expenditure curve rising towards actualExpenditure
    const subCurve = Math.pow(i / actualSteps, 1.4);
    const val = actualExpenditure * subCurve;
    actualPoints.push({ x: getX(subRatio), y: getY(val) });
  }
  const actualPathD = actualPoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");

  // Key Milestones for tooltips & ticks
  const chartPoints = [
    {
      label: "Project Inception",
      date: startDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      planned: 0,
      actual: 0,
      ratio: 0,
      cx: getX(0),
      cy: getY(0)
    },
    {
      label: "Current Status",
      date: currentDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      planned: plannedSpendingAtCurrentTime,
      actual: actualExpenditure,
      ratio: timelineProgressRatio,
      cx: actualPoint.x,
      cy: actualPoint.y,
      isCurrent: true
    },
    {
      label: "Original Target",
      date: originalDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      planned: originalCost,
      actual: null,
      ratio: Math.min(0.9, (originalDate.getTime() - startDate.getTime()) / totalTimelineMs),
      cx: getX(Math.min(0.9, (originalDate.getTime() - startDate.getTime()) / totalTimelineMs)),
      cy: getY(originalCost)
    },
    {
      label: "Anticipated Completion",
      date: anticipatedDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      planned: revisedCost,
      actual: null,
      ratio: 1,
      cx: getX(1),
      cy: getY(revisedCost)
    }
  ];

  return (
    <div className="budget-chart-container" role="region" aria-label="Budget vs Time Chart">
      {/* Header with Title & Dynamic Status Badge */}
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Budget vs Time (Planned vs Actual Expenditure)</h3>
          <p className="chart-subtitle">
            Cumulative financial progression against planned project baseline
          </p>
        </div>

        {/* OVER-BUDGET / WITHIN-TRAJECTORY BADGE */}
        <div className={`budget-status-pill ${isOverBudget ? "over-budget" : "within-trajectory"}`}>
          {isOverBudget ? (
            <>
              <AlertCircle size={14} aria-hidden="true" />
              <span>Over Budget (+₹{varianceAmount} Cr / +{variancePercent}%)</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>Within Planned Budget Trajectory</span>
            </>
          )}
        </div>
      </div>

      {/* SVG Chart Visualization */}
      <div className="chart-svg-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="budget-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient fill under actual expenditure line */}
            <linearGradient id="actualFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isOverBudget ? "#ef4444" : "#10b981"} stopOpacity="0.28" />
              <stop offset="100%" stopColor={isOverBudget ? "#ef4444" : "#10b981"} stopOpacity="0.0" />
            </linearGradient>

            {/* Subtle grid line pattern */}
            <pattern id="chartGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-faint)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="url(#chartGrid)" />

          {/* Horizontal Y-Axis Reference Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const val = Math.round(maxBudget * r);
            const y = getY(val);
            return (
              <g key={r} className="grid-line-group">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="var(--border-faint)"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="axis-tick-text"
                >
                  ₹{val.toLocaleString()} Cr
                </text>
              </g>
            );
          })}

          {/* Vertical Current Time Marker */}
          <line
            x1={actualPoint.x}
            y1={padding.top}
            x2={actualPoint.x}
            y2={height - padding.bottom}
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <text
            x={actualPoint.x}
            y={padding.top - 10}
            textAnchor="middle"
            className="current-time-label"
          >
            Today ({timelineProgressPercent}% timeline)
          </text>

          {/* IDEAL / PLANNED PATH (Dashed line) */}
          <path
            d={idealPathD}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            className="ideal-path"
          />

          {/* ACTUAL EXPENDITURE PATH (Filled Area + Solid Line) */}
          <path
            d={`${actualPathD} L ${actualPoint.x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`}
            fill="url(#actualFillGrad)"
          />
          <path
            d={actualPathD}
            fill="none"
            stroke={isOverBudget ? "#ef4444" : "#10b981"}
            strokeWidth="3.5"
            className="actual-path"
          />

          {/* Interactive Milestone Points */}
          {chartPoints.map((pt, idx) => (
            <g
              key={idx}
              className="chart-node-group"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={pt.cx}
                cy={pt.cy}
                r={pt.isCurrent ? 7 : 5}
                fill={pt.isCurrent ? (isOverBudget ? "#ef4444" : "#10b981") : "var(--bg-elevated)"}
                stroke={pt.isCurrent ? "#ffffff" : "var(--text-secondary)"}
                strokeWidth="2.5"
                style={{ cursor: "pointer", transition: "transform 0.15s" }}
              />
            </g>
          ))}

          {/* X-Axis Baseline */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />

          {/* X-Axis Date Labels */}
          <text x={padding.left} y={height - 15} textAnchor="start" className="axis-tick-text">
            Start: {startDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </text>
          <text x={width - padding.right} y={height - 15} textAnchor="end" className="axis-tick-text">
            Target: {anticipatedDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </text>
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="chart-tooltip"
            style={{
              left: `${(hoveredPoint.cx / width) * 100}%`,
              top: `${(hoveredPoint.cy / height) * 100}%`
            }}
          >
            <div className="tooltip-title">{hoveredPoint.label}</div>
            <div className="tooltip-row">
              <span>Date:</span> <strong>{hoveredPoint.date}</strong>
            </div>
            {hoveredPoint.planned !== null && (
              <div className="tooltip-row">
                <span>Planned Spending:</span> <strong>₹{hoveredPoint.planned?.toLocaleString()} Cr</strong>
              </div>
            )}
            {hoveredPoint.actual !== null && (
              <div className="tooltip-row">
                <span>Actual Cumulative:</span> <strong>₹{hoveredPoint.actual?.toLocaleString()} Cr</strong>
              </div>
            )}
            {hoveredPoint.isCurrent && (
              <>
                <div className="tooltip-row">
                  <span>Timeline Elapsed:</span> <strong>{timelineProgressPercent}%</strong>
                </div>
                <div className="tooltip-row">
                  <span>Physical Progress:</span> <strong>{physicalProgress}%</strong>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Chart Legend & Explanatory Metadata */}
      <div className="chart-legend-bar">
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-line ideal" />
            <span>Ideal / Planned Trajectory (Target: ₹{revisedCost.toLocaleString()} Cr)</span>
          </div>
          <div className="legend-item">
            <span className={`legend-line ${isOverBudget ? "actual-over" : "actual-under"}`} />
            <span>
              Current Actual State (₹{actualExpenditure.toLocaleString()} Cr • {financialProgressPercent}%)
            </span>
          </div>
        </div>

        <div className="legend-status-note">
          <Info size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          <span>
            {isOverBudget
              ? "Actual expenditure currently outpaces the ideal baseline curve."
              : "Expenditure is disciplined within the scheduled baseline envelope."}
          </span>
        </div>
      </div>
    </div>
  );
};
