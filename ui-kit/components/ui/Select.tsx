"use client";

import React, { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select option",
  label,
  error,
  disabled = false,
  fullWidth = true,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <p className="text-lg text-primary-500 font-medium mb-1.5">{label}</p>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={[
          "flex items-center justify-between w-full px-3 py-2.5 rounded-input bg-surface-card border text-lg transition-colors",
          error
            ? "border-error-500"
            : open
            ? "border-brand-500"
            : "border-primary-100/20 hover:border-primary-300",
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          selected ? "text-white" : "text-primary-300",
        ].join(" ")}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-150 text-primary-300 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-surface-card border border-primary-100/20 rounded-input shadow-glass overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onClick={() => {
                if (!opt.disabled) {
                  onChange?.(opt.value);
                  setOpen(false);
                }
              }}
              className={[
                "w-full text-left px-3 py-2.5 text-lg transition-colors",
                opt.disabled
                  ? "text-primary-300 cursor-not-allowed opacity-40"
                  : opt.value === value
                  ? "bg-brand-500/20 text-brand-300"
                  : "text-white hover:bg-surface-sub cursor-pointer",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-md text-error-500 mt-1.5">{error}</p>}
    </div>
  );
}
