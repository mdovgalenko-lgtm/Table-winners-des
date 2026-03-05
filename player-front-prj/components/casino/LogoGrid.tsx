"use client";

import React from "react";

export interface LogoItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  cover?: boolean;
}

export interface LogoGridProps {
  title: string;
  rows: LogoItem[][];
}

function LogoCell({ item }: { item: LogoItem }) {
  if (item.cover) {
    return (
      <div className="shrink-0 w-[102px] h-[40px] rounded-[8px] overflow-hidden shadow-widget relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="shrink-0 w-[102px] h-[40px] bg-surface-card rounded-[8px] shadow-widget flex items-center justify-center px-4 py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        style={{ width: item.width, height: item.height }}
        className="shrink-0 object-contain"
      />
    </div>
  );
}

export default function LogoGrid({ title, rows }: LogoGridProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[18px] leading-[21px] font-bold text-primary-600">
        {title}
      </h3>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex flex-col gap-2 w-max">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((item) => (
                <LogoCell key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
