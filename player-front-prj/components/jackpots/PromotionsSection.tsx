"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface PromoData {
  id: string;
  title: string;
  subtitle: string;
  charImage: string;
  gradient: [string, string];
}

const promos: PromoData[] = [
  {
    id: "p1",
    title: "Claim €160 000!",
    subtitle: "The Wilde Legends Network promotion is in full swing!",
    charImage: "/jackpots/promo-char-1.png",
    gradient: ["#36282E", "#E77341"],
  },
  {
    id: "p2",
    title: "Get 200 free spins on your first deposit!",
    subtitle: "Your spins will be activated imediately after your deposit is...",
    charImage: "/jackpots/promo-char-2.png",
    gradient: ["#372539", "#F6568B"],
  },
  {
    id: "p3",
    title: "Up to €2000 bonus!",
    subtitle: "Claim 200% bonus on the 1st deposit + €10 in Live Roulette...",
    charImage: "/jackpots/promo-char-3.png",
    gradient: ["#362643", "#DF5DE2"],
  },
  {
    id: "p4",
    title: "€5 000 000 awaits!",
    subtitle: "Unwrap the magic at Wazdan's Mystery Box Tournament!",
    charImage: "/jackpots/promo-char-4.png",
    gradient: ["#2F2546", "#A456F6"],
  },
  {
    id: "p5",
    title: "€10 000 000 is up for grabs!",
    subtitle: "Spinomenal is offering generous cash prizes.",
    charImage: "/jackpots/promo-char-5.png",
    gradient: ["#292A44", "#6A53EC"],
  },
];

function StarBoldIcon() {
  return (
    <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "8.33% 9.76% 9.33% 8.76%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jackpots/star-bold.svg" alt="" className="block w-full h-full" />
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

function PromoCard({ promo }: { promo: PromoData }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 flex items-center overflow-hidden snap-center cursor-pointer"
      style={{
        width: 343,
        minWidth: 343,
        height: 158,
        padding: 12,
        gap: 12,
        borderRadius: 16,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      {/* Image area */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 100, height: 128, borderRadius: 16, backgroundColor: "#363555" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 115,
            height: 115,
            left: 2,
            top: -44,
            background: `linear-gradient(to right, ${promo.gradient[0]}, ${promo.gradient[1]})`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.charImage}
          alt=""
          className="absolute object-cover pointer-events-none"
          style={{ width: 80, height: 80, left: 10, top: 24 }}
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col items-start justify-between min-w-0 h-full"
        style={{ paddingTop: 4, paddingBottom: 4 }}
      >
        <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
          <p
            className="text-primary-600 font-bold text-left w-full"
            style={{ fontSize: 16, lineHeight: "18px" }}
          >
            {promo.title}
          </p>
          <p
            className="text-primary-400 text-left w-full"
            style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}
          >
            {promo.subtitle}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function PromotionsSection() {
  return (
    <section className="flex flex-col w-full" style={{ gap: 16 }}>
      {/* Title row */}
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 flex items-center min-w-0" style={{ gap: 8 }}>
          <StarBoldIcon />
          <h2
            className="text-primary-600 font-bold whitespace-nowrap"
            style={{ fontSize: 18, lineHeight: "21px" }}
          >
            Promotions
          </h2>
        </div>
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

      {/* Horizontal scrolling cards */}
      <div className="-mx-4">
        <div
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ gap: 8, paddingInline: 16, WebkitOverflowScrolling: "touch" }}
        >
          {promos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
