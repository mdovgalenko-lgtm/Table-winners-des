import React from "react";

interface DividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({
  label,
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={[
          "self-stretch w-px bg-primary-100/20",
          className,
        ].join(" ")}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={["flex items-center gap-3", className].join(" ")}
        role="separator"
      >
        <div className="flex-1 h-px bg-primary-100/20" />
        <span className="text-md text-primary-300 px-1 whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-primary-100/20" />
      </div>
    );
  }

  return (
    <div
      className={["w-full h-px bg-primary-100/20", className].join(" ")}
      role="separator"
    />
  );
}
