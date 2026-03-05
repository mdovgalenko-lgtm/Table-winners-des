"use client";

import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  variant?: "pill" | "underline" | "card";
  className?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = "pill",
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  if (variant === "underline") {
    return (
      <div className={`border-b border-primary-100/20 ${className}`}>
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              className={[
                "relative flex items-center gap-2 px-4 py-2.5 text-lg font-medium transition-colors",
                tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                active === tab.id
                  ? "text-brand-400"
                  : "text-primary-300 hover:text-primary-500",
              ].join(" ")}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-xs bg-brand-500/20 text-brand-300">
                  {tab.badge}
                </span>
              )}
              {active === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`flex gap-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleChange(tab.id)}
            className={[
              "flex items-center gap-2 px-4 py-2 rounded-card text-lg font-medium border transition-all duration-150",
              tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
              active === tab.id
                ? "bg-brand-500/20 border-brand-500/40 text-brand-300"
                : "bg-surface-card border-primary-100/20 text-primary-300 hover:text-white hover:border-primary-300",
            ].join(" ")}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  active === tab.id
                    ? "bg-brand-500 text-white"
                    : "bg-primary-100/20 text-primary-400"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // pill variant (default)
  return (
    <div
      className={[
        "inline-flex bg-surface-card rounded-tab p-1 gap-1",
        className,
      ].join(" ")}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          disabled={tab.disabled}
          onClick={() => !tab.disabled && handleChange(tab.id)}
          className={[
            "flex items-center gap-2 px-4 py-1.5 rounded-[18px] text-lg font-medium transition-all duration-150",
            tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
            active === tab.id
              ? "bg-brand-500 text-white shadow-brand"
              : "text-primary-300 hover:text-white",
          ].join(" ")}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
          {tab.badge !== undefined && (
            <span
              className={`min-w-[18px] h-[18px] px-1 rounded-full text-xs flex items-center justify-center ${
                active === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-primary-100/20 text-primary-400"
              }`}
            >
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
