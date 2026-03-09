"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface JackpotData {
  id: string;
  tier: string;
  targetAmount: number;
  description: string;
  icon: string;
  /** Initial count-up duration in ms */
  countUpDuration: number;
  /** Cents added per growth tick */
  growthIncrement: number;
  /** Ms between growth ticks */
  growthInterval: number;
}

const jackpots: JackpotData[] = [
  {
    id: "major",
    tier: "MAJOR",
    targetAmount: 210527.12,
    description: "Won 1 time this year",
    icon: "/jackpots/major.png",
    countUpDuration: 2000,
    growthIncrement: 0.47,
    growthInterval: 3100,
  },
  {
    id: "mega",
    tier: "MEGA",
    targetAmount: 10527.12,
    description: "Won 7 times last week",
    icon: "/jackpots/mega.png",
    countUpDuration: 1700,
    growthIncrement: 0.23,
    growthInterval: 2300,
  },
  {
    id: "minor",
    tier: "MINOR",
    targetAmount: 2234.18,
    description: "Won 20 times last day",
    icon: "/jackpots/minor.png",
    countUpDuration: 1400,
    growthIncrement: 0.11,
    growthInterval: 1700,
  },
  {
    id: "mini",
    tier: "MINI",
    targetAmount: 135.12,
    description: "Won 11 times last hour",
    icon: "/jackpots/mini.png",
    countUpDuration: 1100,
    growthIncrement: 0.03,
    growthInterval: 1200,
  },
];

function formatAmount(value: number): string {
  const parts = value.toFixed(2).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `€ ${intPart}.${parts[1]}`;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useAnimatedJackpot(
  target: number,
  countUpDuration: number,
  growthIncrement: number,
  growthInterval: number,
) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const growthTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const currentRef = useRef(0);

  const startGrowth = useCallback(() => {
    const jitter = () => 0.7 + Math.random() * 0.6;

    const tick = () => {
      currentRef.current += growthIncrement * jitter();
      setDisplay(currentRef.current);
      growthTimerRef.current = setTimeout(
        tick,
        growthInterval * (0.8 + Math.random() * 0.4),
      );
    };

    growthTimerRef.current = setTimeout(
      tick,
      growthInterval * (0.5 + Math.random() * 0.5),
    );
  }, [growthIncrement, growthInterval]);

  useEffect(() => {
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / countUpDuration, 1);
      const eased = easeOutCubic(progress);
      const value = eased * target;

      currentRef.current = value;
      setDisplay(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        currentRef.current = target;
        setDisplay(target);
        startGrowth();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (growthTimerRef.current) clearTimeout(growthTimerRef.current);
    };
  }, [target, countUpDuration, startGrowth]);

  return display;
}

function TripleSevensIcon() {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "16.67% 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jackpots/triple-sevens.svg" alt="" className="block w-full h-full" />
      </div>
    </div>
  );
}

function SeeAllArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JackpotCard({ jackpot }: { jackpot: JackpotData }) {
  const animatedValue = useAnimatedJackpot(
    jackpot.targetAmount,
    jackpot.countUpDuration,
    jackpot.growthIncrement,
    jackpot.growthInterval,
  );

  return (
    <motion.div
      whileTap={{ scale: MOTION.press.scale }}
      transition={MOTION.spring.stiff}
      className="flex items-center w-full cursor-pointer"
      style={{
        gap: 8,
        padding: 16,
        borderRadius: 12,
        background: "linear-gradient(to right, #363455, #2E2D49)",
      }}
    >
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: 64, height: 64, padding: 8 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={jackpot.icon}
          alt={jackpot.tier}
          className="object-cover pointer-events-none"
          style={{ width: 48, height: 51 }}
        />
        <span
          className="absolute text-white font-bold text-center"
          style={{
            fontSize: 16,
            lineHeight: "18px",
            inset: "22px 3px 23px 3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {jackpot.tier}
        </span>
      </div>

      <div className="flex-1 flex flex-col min-w-0" style={{ gap: 4 }}>
        <span
          className="text-secondary-3 font-bold whitespace-nowrap"
          style={{
            fontSize: 24,
            lineHeight: "28px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatAmount(animatedValue)}
        </span>
        <span
          className="text-secondary-3 whitespace-nowrap"
          style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}
        >
          {jackpot.description}
        </span>
      </div>
    </motion.div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative shrink-0 rounded-[10px] transition-colors duration-200 cursor-pointer"
      style={{
        width: 34,
        height: 20,
        backgroundColor: checked ? "#8352FF" : "#4A4874",
      }}
    >
      <div
        className="absolute bg-white rounded-full transition-transform duration-200"
        style={{
          width: 16,
          height: 16,
          top: 2,
          left: checked ? 16 : 2,
        }}
      />
    </button>
  );
}

function OptInRow() {
  const [optedIn, setOptedIn] = useState(true);

  return (
    <div
      className="flex items-center w-full"
      style={{
        gap: 8,
        padding: 16,
        borderRadius: 12,
        background: "linear-gradient(to right, #363455, #2E2D49)",
      }}
    >
      <span
        className="flex-1 text-secondary-3 min-w-0"
        style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}
      >
        You have successfully joined!
      </span>

      <div className="flex items-center shrink-0" style={{ gap: 8, height: 48 }}>
        <div
          className="shrink-0"
          style={{
            width: 1,
            height: 48,
            backgroundColor: "rgba(146, 146, 170, 0.2)",
          }}
        />
        <div className="flex flex-col items-end justify-center" style={{ gap: 4 }}>
          <ToggleSwitch checked={optedIn} onChange={setOptedIn} />
          <span
            className="text-secondary-3 whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}
          >
            Opted In
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VegangsterJackpots() {
  return (
    <section className="flex flex-col w-full" style={{ gap: 8 }}>
      {/* Title row */}
      <div className="flex items-center w-full" style={{ gap: 8 }}>
        <TripleSevensIcon />
        <h2
          className="flex-1 text-primary-600 font-bold min-w-0"
          style={{ fontSize: 18, lineHeight: "21px" }}
        >
          Vegangster Jackpots
        </h2>
        <motion.button
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: MOTION.press.scale, opacity: 0.7 }}
          transition={{ duration: MOTION.duration.fast }}
          className="flex items-center justify-center overflow-hidden text-primary-600 cursor-pointer"
          style={{ gap: 4, height: 24, borderRadius: 20 }}
        >
          <span
            className="text-center whitespace-nowrap font-bold"
            style={{ fontSize: 14, lineHeight: "16px" }}
          >
            See All
          </span>
          <SeeAllArrow />
        </motion.button>
      </div>

      {/* Cards container */}
      <div
        className="flex flex-col items-center w-full bg-surface-header"
        style={{
          gap: 8,
          padding: 16,
          borderRadius: 16,
          boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
        }}
      >
        {jackpots.map((j) => (
          <JackpotCard key={j.id} jackpot={j} />
        ))}
        <OptInRow />
      </div>
    </section>
  );
}
