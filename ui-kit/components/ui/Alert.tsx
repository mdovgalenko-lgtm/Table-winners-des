"use client";

import React, { useState } from "react";

type AlertVariant = "error" | "success" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

const styles: Record<AlertVariant, { wrapper: string; icon: React.ReactNode }> = {
  error: {
    wrapper: "bg-error-500/10 border border-error-500/30 text-error-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    ),
  },
  success: {
    wrapper: "bg-success-500/10 border border-success-500/30 text-success-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
    ),
  },
  warning: {
    wrapper: "bg-warning-500/10 border border-warning-500/30 text-warning-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
  },
  info: {
    wrapper: "bg-info-500/10 border border-info-500/30 text-info-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    ),
  },
};

export function Alert({ variant, title, children, dismissible = false, className = "" }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { wrapper, icon } = styles[variant];

  return (
    <div
      className={[
        "flex items-start gap-3 rounded-widget px-4 py-3 text-lg",
        wrapper,
        className,
      ].join(" ")}
      role="alert"
    >
      {icon}
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold mb-0.5">{title}</p>}
        <p className="opacity-90">{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}

export function Toast({
  variant,
  message,
  onClose,
}: {
  variant: AlertVariant;
  message: string;
  onClose?: () => void;
}) {
  const { wrapper, icon } = styles[variant];
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-widget px-4 py-3 text-lg shadow-glass min-w-[280px] max-w-[380px]",
        wrapper,
      ].join(" ")}
    >
      {icon}
      <p className="flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}
