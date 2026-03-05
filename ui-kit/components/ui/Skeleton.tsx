import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const roundedStyles = {
  sm: "rounded",
  md: "rounded-card",
  lg: "rounded-card-lg",
  full: "rounded-full",
};

export function Skeleton({
  width = "100%",
  height = "16px",
  rounded = "md",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={[
        "animate-pulse bg-surface-sub/80",
        roundedStyles[rounded],
        className,
      ].join(" ")}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "bg-surface-card rounded-card-lg p-4 border border-primary-100/10 space-y-3",
        className,
      ].join(" ")}
    >
      <Skeleton height="120px" rounded="md" />
      <Skeleton width="70%" height="16px" />
      <Skeleton width="50%" height="12px" />
      <div className="flex gap-2 pt-1">
        <Skeleton width="80px" height="32px" rounded="full" />
        <Skeleton width="60px" height="32px" rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "70%" : "100%"}
          height="14px"
        />
      ))}
    </div>
  );
}
