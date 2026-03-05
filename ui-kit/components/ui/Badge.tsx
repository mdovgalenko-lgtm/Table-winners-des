import React from "react";

type BadgeVariant = "brand" | "pink" | "blue" | "success" | "error" | "warning" | "info" | "neutral";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand-500/15 text-brand-300 border border-brand-500/30",
  pink: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
  blue: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  success: "bg-success-500/15 text-success-500 border border-success-500/30",
  error: "bg-error-500/15 text-error-500 border border-error-500/30",
  warning: "bg-warning-500/15 text-warning-500 border border-warning-500/30",
  info: "bg-info-500/15 text-info-500 border border-info-500/30",
  neutral: "bg-primary-100/10 text-primary-400 border border-primary-100/20",
};

const dotColors: Record<BadgeVariant, string> = {
  brand: "bg-brand-500",
  pink: "bg-pink-500",
  blue: "bg-blue-500",
  success: "bg-success-500",
  error: "bg-error-500",
  warning: "bg-warning-500",
  info: "bg-info-500",
  neutral: "bg-primary-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-full gap-1",
  md: "px-2.5 py-1 text-md rounded-full gap-1.5",
  lg: "px-3 py-1.5 text-lg rounded-full gap-2",
};

export function Badge({
  variant = "brand",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}

export function NotificationBadge({
  count,
  max = 99,
}: {
  count: number;
  max?: number;
}) {
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-error-500 text-white text-xs font-bold">
      {count > max ? `${max}+` : count}
    </span>
  );
}
