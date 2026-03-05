"use client";

import React from "react";

type ButtonVariant =
  | "filled"
  | "preset"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "outline"
  | "primary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-brand-500 hover:bg-brand-400 active:bg-brand-600 text-white shadow-brand rounded-[4px]",
  preset:
    "bg-brand-500/15 hover:bg-brand-500/25 active:bg-brand-500/35 text-brand-100 border border-brand-400/30 rounded-[8px]",
  secondary:
    "bg-surface-sub hover:bg-surface-card active:bg-surface-nav text-white border border-primary-100/20 rounded-[8px]",
  ghost:
    "bg-transparent hover:bg-brand-500/10 active:bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-[8px]",
  danger:
    "bg-error-500 hover:bg-error-600 active:bg-red-800 text-white rounded-[8px]",
  success:
    "bg-success-500 hover:bg-success-600 active:bg-green-700 text-surface-bg font-bold rounded-[8px]",
  outline:
    "bg-transparent hover:bg-primary-600/10 border border-primary-400 text-primary-400 hover:text-primary-600 rounded-[8px]",
  // Backward-compatible alias used across existing demos.
  primary:
    "bg-brand-500 hover:bg-brand-400 active:bg-brand-600 text-white shadow-brand rounded-[4px]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm gap-1.5 min-h-8",
  md: "px-5 py-2.5 text-lg gap-2 min-h-10",
  lg: "px-8 py-3.5 text-xl gap-2.5 min-h-12",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center font-medium transition-all duration-150 select-none",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      {!loading && icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}

export function IconButton({
  children,
  size = "md",
  variant = "secondary",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const iconSizeStyles: Record<ButtonSize, string> = {
    sm: "w-8 h-8 rounded-[20px]",
    md: "w-10 h-10 rounded-[20px]",
    lg: "w-12 h-12 rounded-[20px]",
  };

  const iconVariantStyles: Record<ButtonVariant, string> = {
    filled: "bg-brand-500 hover:bg-brand-400 active:bg-brand-600 text-white",
    preset: "bg-brand-500/15 hover:bg-brand-500/25 active:bg-brand-500/35 text-brand-100 border border-brand-400/30",
    secondary: "bg-surface-sub hover:bg-surface-card active:bg-surface-nav text-primary-300",
    ghost: "bg-transparent hover:bg-brand-500/10 active:bg-brand-500/20 text-brand-300 border border-brand-500/30",
    danger: "bg-error-500 hover:bg-error-600 active:bg-red-800 text-white",
    success: "bg-success-500 hover:bg-success-600 active:bg-green-700 text-surface-bg",
    outline: "bg-transparent hover:bg-primary-600/10 border border-primary-400 text-primary-400 hover:text-primary-600",
    primary: "bg-brand-500 hover:bg-brand-400 active:bg-brand-600 text-white",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center transition-all duration-150",
        iconVariantStyles[variant],
        iconSizeStyles[size],
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
