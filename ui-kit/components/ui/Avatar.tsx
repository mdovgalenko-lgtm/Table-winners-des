import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-md",
  md: "w-10 h-10 text-lg",
  lg: "w-12 h-12 text-xl",
  xl: "w-16 h-16 text-2xl",
};

const statusSizes: Record<AvatarSize, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-3.5 h-3.5",
};

const statusColors = {
  online: "bg-success-500",
  offline: "bg-primary-300",
  busy: "bg-error-500",
  away: "bg-warning-500",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  status,
  className = "",
}: AvatarProps) {
  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={[
          "rounded-full flex items-center justify-center font-bold overflow-hidden",
          sizeStyles[size],
          !src ? "bg-gradient-to-br from-brand-500 to-pink-500 text-white" : "",
        ].join(" ")}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="w-[55%] h-[55%]"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
      {status && (
        <span
          className={[
            "absolute bottom-0 right-0 rounded-full border-2 border-surface-bg",
            statusSizes[size],
            statusColors[status],
          ].join(" ")}
        />
      )}
    </div>
  );
}

export function AvatarGroup({
  avatars,
  max = 4,
}: {
  avatars: AvatarProps[];
  max?: number;
}) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((av, i) => (
        <div key={i} className="ring-2 ring-surface-bg rounded-full">
          <Avatar {...av} size="sm" />
        </div>
      ))}
      {remaining > 0 && (
        <div className="ring-2 ring-surface-bg rounded-full w-8 h-8 bg-surface-sub flex items-center justify-center text-md text-primary-400 font-medium">
          +{remaining}
        </div>
      )}
    </div>
  );
}
