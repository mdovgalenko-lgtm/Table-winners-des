"use client";

import React from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
};

export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = "md",
  className = "",
}: ToggleProps) {
  const { track, thumb, translate } = sizeMap[size];

  return (
    <label
      className={[
        "inline-flex items-center gap-3 select-none",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-500",
          track,
          checked ? "bg-brand-500" : "bg-surface-sub border border-primary-100/30",
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-0.5 rounded-full bg-white shadow transition-transform duration-200",
            thumb,
            checked ? translate : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
      {label && <span className="text-lg text-primary-500">{label}</span>}
    </label>
  );
}

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  indeterminate = false,
  className = "",
}: CheckboxProps) {
  return (
    <label
      className={[
        "inline-flex items-center gap-2.5 select-none",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      <button
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-150",
          checked || indeterminate
            ? "bg-brand-500 border-brand-500"
            : "bg-transparent border-primary-300 hover:border-brand-400",
        ].join(" ")}
      >
        {indeterminate ? (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><rect width="10" height="2" fill="white" rx="1"/></svg>
        ) : checked ? (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : null}
      </button>
      {label && <span className="text-lg text-primary-500">{label}</span>}
    </label>
  );
}

interface RadioProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  label?: string;
  name?: string;
  className?: string;
}

export function Radio({
  checked = false,
  onChange,
  disabled = false,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name,
  className = "",
}: RadioProps) {
  return (
    <label
      className={[
        "inline-flex items-center gap-2.5 select-none",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      <button
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={[
          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150",
          checked
            ? "border-brand-500"
            : "border-primary-300 hover:border-brand-400",
        ].join(" ")}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
      </button>
      {label && <span className="text-lg text-primary-500">{label}</span>}
    </label>
  );
}
