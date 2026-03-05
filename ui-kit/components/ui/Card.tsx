import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "brand" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const variantStyles = {
  default: "bg-surface-card",
  glass: "glass border border-primary-100/10",
  brand: "glass-brand border border-brand-500/30",
  outlined: "bg-transparent border border-primary-100/20",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={[
        "rounded-card-lg",
        variantStyles[variant],
        paddingStyles[padding],
        hoverable
          ? "transition-all duration-200 hover:border-brand-500/40 hover:shadow-brand cursor-pointer"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function GameCard({
  title,
  provider,
  badge,
  className = "",
}: {
  title: string;
  provider: string;
  badge?: string;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-card overflow-hidden bg-surface-card border border-primary-100/10 cursor-pointer group transition-all duration-200 hover:border-brand-500/40 hover:shadow-brand",
        className,
      ].join(" ")}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-surface-sub to-surface-bg flex items-center justify-center">
        <div className="w-12 h-12 rounded-card bg-brand-500/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8352FF" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </div>
      </div>
      {badge && (
        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold bg-brand-500 text-white">
          {badge}
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-md font-bold truncate">{title}</p>
        <p className="text-primary-400 text-xs truncate">{provider}</p>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "bg-surface-card rounded-card-lg p-4 border border-primary-100/10",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-md text-primary-300">{label}</p>
        {icon && (
          <div className="w-9 h-9 rounded-widget bg-brand-500/15 flex items-center justify-center text-brand-400">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && (
        <p
          className={`text-md mt-1 ${
            change.positive ? "text-success-500" : "text-error-500"
          }`}
        >
          {change.positive ? "↑" : "↓"} {change.value}
        </p>
      )}
    </div>
  );
}
