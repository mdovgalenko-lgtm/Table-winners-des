"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface Winner {
  id: string;
  gameName: string;
  username: string;
  amount: number;
  multiplier: number;
  image: string;
  highlighted?: boolean;
}

const initialWinners: Winner[] = [
  { id: "w1", gameName: "Olympus Wins", username: "@hudsonAmory", amount: 3780.60, multiplier: 100, image: "/games/winner-1-olympus.png" },
  { id: "w2", gameName: "Haunted Reels", username: "@hidden", amount: 3540.20, multiplier: 94, image: "/games/winner-2-haunted.png" },
  { id: "w3", gameName: "Book of Madness", username: "@hudsonAmory", amount: 3280.80, multiplier: 87, image: "/games/winner-3-madness.png" },
  { id: "w4", gameName: "Lobster House", username: "@hidden", amount: 2950.40, multiplier: 78, image: "/games/winner-4-lobster.png" },
  { id: "w5", gameName: "Blazing Frenzy", username: "@hudsonAmory", amount: 2720.10, multiplier: 68, image: "/games/winner-5-blazing.png" },
  { id: "w6", gameName: "5 Joker Hit", username: "@hudsonAmory", amount: 2410.50, multiplier: 60, image: "/games/winner-6-joker.png" },
];

function formatAmount(n: number): string {
  return "€" + n.toFixed(2);
}

function ArrowRightSimple() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.39 2.95l4.24 4.24a1.14 1.14 0 010 1.62L6.39 13.05"
        stroke="#B5B5C5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ROW_TRANSITION = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30,
  mass: 0.8,
};

function WinnerRow({ winner }: { winner: Winner }) {
  return (
    <motion.button
      layout="position"
      layoutId={winner.id}
      transition={ROW_TRANSITION}
      whileTap={{ scale: MOTION.press.scale }}
      className="flex items-center gap-2 w-full"
    >
      <div className="shrink-0 rounded-[8px] overflow-hidden" style={{ width: 32, height: 38 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={winner.image} alt={winner.gameName} className="w-full h-full object-cover rounded-[8px]" />
      </div>

      <div className="flex-1 flex flex-col items-start justify-center min-w-0" style={{ fontSize: 14, lineHeight: "16px" }}>
        <span className="text-primary-400 whitespace-nowrap" style={{ fontWeight: 400 }}>
          {winner.gameName}
        </span>
        <span className="text-primary-600 whitespace-nowrap" style={{ fontWeight: 700 }}>
          {winner.username}
        </span>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-center" style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}>
        <motion.span
          key={winner.amount}
          initial={{ opacity: 0.6, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary-600 whitespace-nowrap"
        >
          {formatAmount(winner.amount)}
        </motion.span>
        <motion.span
          key={winner.multiplier}
          initial={{ opacity: 0.6, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-primary-600 whitespace-nowrap"
        >
          x{winner.multiplier}
        </motion.span>
      </div>

      <div className="shrink-0" style={{ width: 16, height: 16 }}>
        <ArrowRightSimple />
      </div>
    </motion.button>
  );
}

export default function TopWinners() {
  const [rankedWinners, setRankedWinners] = useState<Winner[]>(initialWinners);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const simulateWin = useCallback(() => {
    setRankedWinners((prev) => {
      const idx = 1 + Math.floor(Math.random() * (prev.length - 1));
      const target = prev[idx];

      const positionsToClimb = 1 + Math.floor(Math.random() * Math.min(idx, 3));
      const newIdx = idx - positionsToClimb;
      const rival = prev[newIdx];

      const boost = rival.amount - target.amount + 50 + Math.random() * 200;
      const multBoost = rival.multiplier - target.multiplier + 2 + Math.floor(Math.random() * 5);

      const updated = prev.map((w) =>
        w.id === target.id
          ? { ...w, amount: +(w.amount + boost).toFixed(2), multiplier: w.multiplier + multBoost }
          : w
      );

      return [...updated].sort((a, b) => b.amount - a.amount);
    });
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 2000;
      intervalRef.current = setTimeout(() => {
        simulateWin();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [simulateWin]);

  return (
    <div className="flex flex-col gap-4">
      <h3 style={{ fontSize: 18, lineHeight: "21px", fontWeight: 700 }} className="text-primary-600">
        Top Winners
      </h3>
      <div
        className="rounded-[16px] p-3"
        style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
      >
        <LayoutGroup>
          <div className="flex flex-col gap-2">
            {rankedWinners.map((w, i) => (
              <motion.div key={w.id} layout transition={ROW_TRANSITION}>
                <WinnerRow winner={w} />
                {i < rankedWinners.length - 1 && (
                  <div className="mt-2" style={{ height: 1, backgroundColor: "#363555" }} />
                )}
              </motion.div>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
