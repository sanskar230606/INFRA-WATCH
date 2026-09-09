import React, { useState, useRef } from "react";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

export const BudgetTimeChart = ({ project }) => {
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  if (!project) return null;

  const originalCost = project.originalCostCr || 0;
  const revisedCost = project.revisedCostCr || originalCost;
  const actualExpenditure = project.expenditureCr || 0;
  const physicalProgress = project.physicalProgressPercent || 0;

  // Timeline Calculation
  const anticipatedDate = new Date(project.anticipatedCompletionDate || "2027-12-31");
  const originalDate = new Date(project.originalCompletionDate || "2025-12-31");
  
  // Approximate start date (3-year baseline standard central sector cycle)
  const originalDurationMonths = 36;
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

  // S-Curve: y = 3x^2 - 2x^3
  const sCurveRatio = 3 * Math.pow(timelineProgressRatio, 2) - 2 * Math.pow(timelineProgressRatio, 3);
  const plannedSpendingAtCurrentTime = +(revisedCost * sCurveRatio).toFixed(1);

  // Over-budget vs Under-budget determination:
  // Compare Actual cumulative expenditure with Ideal planned expenditure at current elapsed time
  const isOverBudget = actualExpenditure > plannedSpendingAtCurrentTime;
  const varianceAmount = Math.abs(actualExpenditure - plannedSpendingAtCurrentTime).toFixed(1);
  const variancePercent = plannedSpendingAtCurrentTime > 0
    ? Math.abs(((actualExpenditure - plannedSpendingAtCurrentTime) / plannedSpendingAtCurrentTime) * 100).toFixed(1)
    : 0;

  // Compact, scaled-down SVG Coordinate space: 580 width x 210 height
  const width = 580;
  const height = 210;
  const padding = { top: 22, right: 30, bottom: 34, left: 58 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const maxBudget = Math.max(revisedCost * 1.15, actualExpenditure * 1.15, 100);

  const getX = (ratio) => padding.left + ratio * graphWidth;
  const getY = (val) => padding.top + graphHeight - (val / maxBudget) * graphHeight;

  // Generate Ideal Planned Path (Smooth S-curve)
  const idealPoints = [];
  const numSteps = 24;
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
  const actualSteps = 12;
  for (let i = 0; i <= actualSteps; i++) {
    const subRatio = (i / actualSteps) * timelineProgressRatio;
    const subCurve = Math.pow(i / actualSteps, 1.35);
    const val = actualExpenditure * subCurve;
    actualPoints.push({ x: getX(subRatio), y: getY(val) });
  }
  const actualPathD = actualPoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");

  // Handle Interactive Mouse Movement directly on the Graph Canvas
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert to SVG coordinate system
    const svgX = (clientX / rect.width) * width;
    
    // Clamp to graph area
    if (svgX < padding.left || svgX > width - padding.right) {
      setHoverData(null);
      return;
    }

    const ratio = Math.max(0, Math.min(1, (svgX - padding.left) / graphWidth));
    const targetMs = startDate.getTime() + ratio * totalTimelineMs;
    const targetDate = new Date(targetMs);
    const dateStr = targetDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

    // Planned spending at this ratio
    const sVal = 3 * Math.pow(ratio, 2) - 2 * Math.pow(ratio, 3);
    const plannedVal = +(revisedCost * sVal).toFixed(1);

    // Actual spending at this ratio (only if <= timeline progress)
    let actualVal = null;
    let pointVariance = null;
    let isPointOver = false;

    if (ratio <= timelineProgressRatio) {
      const actualSubRatio = ratio / timelineProgressRatio;
      actualVal = +(actualExpenditure * Math.pow(actualSubRatio, 1.35)).toFixed(1);
      pointVariance = +(actualVal - plannedVal).toFixed(1);
      isPointOver = actualVal > plannedVal;
    }

    setHoverData({
      svgX,
      svgYPlanned: getY(plannedVal),
      svgYActual: actualVal !== null ? getY(actualVal) : null,
      ratio,
      percent: Math.round(ratio * 100),
      dateStr,
      plannedVal,
      actualVal,
      pointVariance,
      isPointOver,
      isFuture: ratio > timelineProgressRatio,
      clientXPercent: (clientX / rect.width) * 100,
      clientYPercent: (clientY / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="budget-time-chart-card compact-chart" role="region" aria-label="Budget vs Time Chart">
      {/* Header with Title & Dynamic Status Badge */}
      <div className="chart-card-header">
        <div className="chart-title-group">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={16} className="chart-icon-tint" aria-hidden="true" />
            <h3 className="chart-card-title">Budget vs Time (Planned vs Actual S-Curve)</h3>
          </div>
          <p className="chart-card-desc">
            Cumulative financial deployment across sanction timeline (₹ Cr)
          </p>
        </div>

        {/* OVER-BUDGET / WITHIN-TRAJECTORY BADGE */}
        <div className={`budget-verdict-badge ${isOverBudget ? "over-budget" : "under-budget"}`}>
          {isOverBudget ? (
            <>
              <AlertCircle size={13} aria-hidden="true" />
              <span>Over Budget (+₹{varianceAmount} Cr / +{variancePercent}%)</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={13} aria-hidden="true" />
              <span>Within Planned Trajectory</span>
            </>
          )}
        </div>
      </div>

      {/* Scaled-down SVG Chart Container with direct Canvas Tooltip */}
      <div 
        className="chart-svg-container compact-svg-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="budget-svg-element"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient fill under actual expenditure line */}
            <linearGradient id="actualCompactGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isOverBudget ? "#ef4444" : "#22c55e"} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isOverBudget ? "#ef4444" : "#22c55e"} stopOpacity="0.0" />
            </linearGradient>

            {/* Subtle grid pattern */}
            <pattern id="compactGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="url(#compactGrid)" />

          {/* Horizontal Y-Axis Reference Lines */}
          {[0, 0.33, 0.66, 1].map((r) => {
            const val = Math.round(maxBudget * r);
            const y = getY(val);
            return (
              <g key={r}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  className="grid-line"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="axis-label"
                >
                  ₹{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} Cr
                </text>
              </g>
            );
          })}

          {/* Vertical Current Time Marker Line */}
          <line
            x1={actualPoint.x}
            y1={padding.top}
            x2={actualPoint.x}
            y2={height - padding.bottom}
            className="today-line"
          />
          <text
            x={actualPoint.x}
            y={padding.top - 7}
            className="today-tag"
          >
            Today ({timelineProgressPercent}%)
          </text>

          {/* IDEAL / PLANNED S-CURVE (Dashed line) */}
          <path
            d={idealPathD}
            fill="none"
            className="s-curve-line"
          />

          {/* ACTUAL EXPENDITURE PATH (Filled Area + Solid Line) */}
          <path
            d={`${actualPathD} L ${actualPoint.x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`}
            fill="url(#actualCompactGrad)"
          />
          <path
            d={actualPathD}
            fill="none"
            className={`actual-line ${isOverBudget ? "over-budget" : "under-budget"}`}
          />

          {/* Current Actual Milestone Node */}
          <circle
            cx={actualPoint.x}
            cy={actualPoint.y}
            r={6}
            className={`actual-marker-ring ${isOverBudget ? "over-budget" : "under-budget"}`}
          />
          <circle
            cx={actualPoint.x}
            cy={actualPoint.y}
            r={3}
            className="actual-marker-center"
          />

          {/* Interactive Hover Crosshair & Dots right on the Graph */}
          {hoverData && (
            <g className="chart-hover-elements" pointerEvents="none">
              {/* Vertical crosshair tracker */}
              <line
                x1={hoverData.svgX}
                y1={padding.top}
                x2={hoverData.svgX}
                y2={height - padding.bottom}
                stroke="var(--text-primary)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.8"
              />

              {/* Point on Planned Curve */}
              <circle
                cx={hoverData.svgX}
                cy={hoverData.svgYPlanned}
                r={4}
                fill="#94a3b8"
                stroke="#ffffff"
                strokeWidth="1.5"
              />

              {/* Point on Actual Curve (if not future) */}
              {hoverData.svgYActual !== null && (
                <circle
                  cx={hoverData.svgX}
                  cy={hoverData.svgYActual}
                  r={5}
                  fill={hoverData.isPointOver ? "#ef4444" : "#22c55e"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
            </g>
          )}

          {/* X-Axis Baseline */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            className="axis-baseline"
          />

          {/* X-Axis Date Labels */}
          <text x={padding.left} y={height - 12} textAnchor="start" className="axis-label">
            Start: {startDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </text>
          <text x={width - padding.right} y={height - 12} textAnchor="end" className="axis-label">
            Target: {anticipatedDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
          </text>
        </svg>

        {/* DETAILS DISPLAYED DIRECTLY ON THE GRAPH ITSELF */}
        {hoverData && (
          <div
            className="graph-embedded-tooltip"
            style={{
              left: `${hoverData.clientXPercent}%`,
              top: `${Math.min(hoverData.clientYPercent, 62)}%`,
              transform: `translate(${hoverData.clientXPercent > 62 ? "-105%" : "8%"}, -50%)`
            }}
          >
            <div className="tooltip-head">
              <span className="tooltip-date">{hoverData.dateStr}</span>
              <span className="tooltip-percent">{hoverData.percent}% Timeline</span>
            </div>

            <div className="tooltip-body">
              <div className="tooltip-row">
                <span className="tooltip-label planned-label">Planned Baseline:</span>
                <span className="tooltip-val">₹{hoverData.plannedVal.toLocaleString()} Cr</span>
              </div>

              {hoverData.actualVal !== null ? (
                <>
                  <div className="tooltip-row">
                    <span className="tooltip-label actual-label">Actual Expenditure:</span>
                    <span className="tooltip-val font-bold">₹{hoverData.actualVal.toLocaleString()} Cr</span>
                  </div>
                  <div className="tooltip-row variance-row">
                    <span className="tooltip-label">Variance:</span>
                    <span className={`tooltip-val ${hoverData.isPointOver ? "text-danger" : "text-success"}`}>
                      {hoverData.isPointOver ? `+₹${hoverData.pointVariance} Cr (Over)` : `₹${hoverData.pointVariance} Cr (Under)`}
                    </span>
                  </div>
                </>
              ) : (
                <div className="tooltip-row future-row">
                  <span className="tooltip-label">Projected Horizon:</span>
                  <span className="tooltip-val">Target: ₹{revisedCost.toLocaleString()} Cr</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Compact Chart Legend */}
      <div className="chart-legend-row compact-legend">
        <div className="legend-item">
          <span className="legend-line planned" />
          <span>Planned S-Curve (Target: ₹{revisedCost.toLocaleString()} Cr)</span>
        </div>
        <div className="legend-item">
          <span className={`legend-line actual ${isOverBudget ? "over-budget" : "under-budget"}`} />
          <span>Actual Spend (₹{actualExpenditure.toLocaleString()} Cr • {financialProgressPercent}%)</span>
        </div>
        <div className="legend-item cursor-hint">
          <span>• Hover on graph for timeline details</span>
        </div>
      </div>
    </div>
  );
};
