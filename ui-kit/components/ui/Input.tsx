"use client";

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  hint,
  error,
  success,
  prefixIcon,
  suffixIcon,
  fullWidth = true,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const borderColor = error
    ? "border-error-500 focus-within:border-error-500"
    : success
    ? "border-success-500 focus-within:border-success-500"
    : "border-primary-100/20 focus-within:border-brand-500";

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-lg text-primary-500 font-medium"
        >
          {label}
        </label>
      )}
      <div
        className={[
          "flex items-center gap-2 rounded-input bg-surface-card border px-3 py-2.5 transition-colors",
          borderColor,
        ].join(" ")}
      >
        {prefixIcon && (
          <span className="text-primary-300 shrink-0">{prefixIcon}</span>
        )}
        <input
          {...props}
          id={inputId}
          className={[
            "flex-1 bg-transparent text-white placeholder-primary-300 text-lg outline-none min-w-0",
            className,
          ].join(" ")}
        />
        {suffixIcon && (
          <span className="text-primary-300 shrink-0 cursor-pointer hover:text-white transition-colors">
            {suffixIcon}
          </span>
        )}
      </div>
      {error && <p className="text-md text-error-500">{error}</p>}
      {success && !error && (
        <p className="text-md text-success-500">{success}</p>
      )}
      {hint && !error && !success && (
        <p className="text-md text-primary-300">{hint}</p>
      )}
    </div>
  );
}

export function PasswordInput(props: Omit<InputProps, "type" | "suffixIcon">) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      suffixIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-primary-300 hover:text-white transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      }
    />
  );
}

export function SearchInput(props: Omit<InputProps, "prefixIcon">) {
  return (
    <Input
      {...props}
      type="search"
      prefixIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      }
    />
  );
}

export function OTPInput({ length = 6, onChange }: { length?: number; onChange?: (val: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);
    onChange?.(next.join(""));
    if (val && index < length - 1) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const el = document.getElementById(`otp-${index - 1}`);
      el?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((val, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-11 h-12 rounded-input bg-surface-card border border-primary-100/20 text-white text-xl text-center outline-none focus:border-brand-500 transition-colors"
        />
      ))}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  rows = 4,
  fullWidth = true,
  className = "",
  id,
  ...props
}: {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
  id?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label htmlFor={textareaId} className="text-lg text-primary-500 font-medium">
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={textareaId}
        rows={rows}
        className={[
          "rounded-input bg-surface-card border px-3 py-2.5 text-white placeholder-primary-300 text-lg outline-none resize-none transition-colors focus:border-brand-500",
          error ? "border-error-500" : "border-primary-100/20",
          className,
        ].join(" ")}
      />
      {error && <p className="text-md text-error-500">{error}</p>}
      {hint && !error && <p className="text-md text-primary-300">{hint}</p>}
    </div>
  );
}
