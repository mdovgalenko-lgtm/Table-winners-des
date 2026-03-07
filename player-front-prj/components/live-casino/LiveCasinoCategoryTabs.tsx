"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "../casino/icons";
import { MOTION } from "@/lib/motion";

const categories = [
  { id: "search", icon: true, label: "" },
  { id: "popular", label: "Most Popular" },
  { id: "baccarat", label: "Baccarat" },
  { id: "blackjack", label: "Blackjack" },
  { id: "jackpots", label: "Jackpots" },
  { id: "crash", label: "Crash Games" },
];

export default function LiveCasinoCategoryTabs() {
  const [active, setActive] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: MOTION.press.scale }}
          onClick={() => setActive(cat.id)}
          className={`shrink-0 flex items-center justify-center h-[40px] rounded-tab-category shadow-widget transition-colors ${
            cat.icon ? "w-[40px] p-1" : "px-4 py-2 gap-1"
          } ${
            active === cat.id
              ? "bg-brand-500"
              : "bg-secondary-20"
          }`}
        >
          {cat.icon ? (
            <SearchIcon className={`w-5 h-5 ${active === cat.id ? "text-white" : "text-primary-400"}`} />
          ) : (
            <span
              className={`text-[16px] leading-[18px] font-normal whitespace-nowrap ${
                active === cat.id ? "text-white" : "text-primary-400"
              }`}
            >
              {cat.label}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
