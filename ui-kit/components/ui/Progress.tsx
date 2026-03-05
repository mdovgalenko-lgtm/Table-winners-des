import React from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "brand" | "success" | "warning" | "error" | "info" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantTrack = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  info: "bg-info-500",
  gradient: "bg-gradient-brand",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "brand",
  size = "md",
  className = "",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-md text-primary-400">{label}</span>}
          {showValue && (
            <span className="text-md text-primary-300 font-medium">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={[
          "w-full rounded-full bg-surface-sub overflow-hidden",
          sizeStyles[size],
        ].join(" ")}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={["h-full rounded-full transition-all duration-500", variantTrack[variant]].join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = "brand",
  label,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "brand" | "success" | "warning" | "error";
  label?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const strokeColor = {
    brand: "#8352FF",
    success: "#47DA9C",
    warning: "#E5DD38",
    error: "#F53B5D",
  }[variant];

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#363455"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-white font-bold text-lg">{Math.round(pct)}%</span>
        {label && <span className="text-primary-300 text-xs">{label}</span>}
      </div>
    </div>
  );
}
