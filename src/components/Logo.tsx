import React from "react";

interface LogoProps {
  variant?: "standard" | "icon-only" | "card";
  height?: number | string;
  className?: string;
}

export default function Logo({
  variant = "standard",
  height = 48,
  className = "",
}: LogoProps) {
  const showSubtitle = variant !== "icon-only";
  const isCard = variant === "card";

  // Calculate widths/heights proportionally
  // Default aspect ratio for standard logo is 260:130 (2:1 approx)
  // Default aspect ratio for icon-only is 250:95 (2.6:1 approx)
  const viewBox = showSubtitle ? "10 5 235 120" : "10 5 235 90";

  const svgContent = (
    <svg
      viewBox={viewBox}
      height={isCard ? "100%" : height}
      className={`w-auto select-none ${isCard ? "" : className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Group slanted by -14 degrees for the italicized LAN letters */}
      <g transform="skewX(-14)">
        {/* L Shape (Yellow-Gold) */}
        <path
          d="M 15 10 h 22 v 55 h 33 v 20 H 15 Z"
          fill="#F1B82D"
        />
        {/* A Shape (Yellow-Gold, Even-Odd fill to hollow the center) */}
        <path
          d="M 80 85 L 100 10 H 120 L 140 85 H 120 L 114 55 H 106 L 100 85 H 80 Z M 108 40 H 112 L 110 24 Z"
          fill="#F1B82D"
          fillRule="evenodd"
        />
        {/* N Shape Left Column (White Arrow Pointing Down) */}
        <path
          d="M 160 10 H 182 L 202 50 L 182 40 V 65 H 192 L 171 90 L 150 65 H 160 Z"
          fill="#FFFFFF"
        />
        {/* N Shape Right Column (White Arrow Pointing Up) */}
        <path
          d="M 224 90 H 202 L 182 50 L 202 60 V 35 H 192 L 213 10 L 234 35 H 224 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* Subtitle - Normal upright text (Not slanted) */}
      {showSubtitle && (
        <text
          x="114"
          y="114"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="0.06em"
        >
          Fawzy For Import & Export
        </text>
      )}
    </svg>
  );

  if (isCard) {
    return (
      <div
        className={`inline-flex items-center justify-center p-6 bg-[#0f5b40] rounded-2xl shadow-xl border border-emerald-800/40 select-none ${className}`}
        style={{ height }}
      >
        {svgContent}
      </div>
    );
  }

  return svgContent;
}
