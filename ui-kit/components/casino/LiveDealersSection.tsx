"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./GameSection";
import { MOTION } from "@/lib/motion";

interface LiveCasinoData {
  id: string;
  name: string;
  label: string;
  members: string;
  image: string;
  results: { value: string; color: string }[];
}

const dealers: LiveCasinoData[] = [
  {
    id: "lc1",
    name: "Speed Auto Roulette",
    label: "€0.1-€5K",
    members: "8.1K",
    image: "/dealers/dealer1.png",
    results: [
      { value: "1", color: "#6B0606" },
      { value: "0", color: "#2C673E" },
      { value: "2", color: "#1B1B1B" },
      { value: "00", color: "#2C673E" },
      { value: "1", color: "#6B0606" },
      { value: "2", color: "#1B1B1B" },
      { value: "1", color: "#6B0606" },
    ],
  },
  {
    id: "lc2",
    name: "Speed Auto Roulette",
    label: "€0.1-€5K",
    members: "8.1K",
    image: "/dealers/dealer2.png",
    results: [
      { value: "1", color: "#6B0606" },
      { value: "0", color: "#2C673E" },
      { value: "2", color: "#1B1B1B" },
      { value: "00", color: "#2C673E" },
      { value: "1", color: "#6B0606" },
      { value: "2", color: "#1B1B1B" },
      { value: "1", color: "#6B0606" },
    ],
  },
  {
    id: "lc3",
    name: "Speed Auto Roulette",
    label: "€0.1-€5K",
    members: "8.1K",
    image: "/dealers/dealer3.png",
    results: [
      { value: "1", color: "#6B0606" },
      { value: "0", color: "#2C673E" },
      { value: "2", color: "#1B1B1B" },
      { value: "00", color: "#2C673E" },
      { value: "1", color: "#6B0606" },
      { value: "2", color: "#1B1B1B" },
      { value: "1", color: "#6B0606" },
    ],
  },
];

function ResultBubble({ value, color }: { value: string; color: string }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full"
      style={{
        width: 16,
        height: 16,
        backgroundColor: color,
        border: "0.5px solid white",
      }}
    >
      <span className="text-white font-bold" style={{ fontSize: 8, lineHeight: "9px" }}>
        {value}
      </span>
    </div>
  );
}

function LiveCasinoCard({ data }: { data: LiveCasinoData }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 relative overflow-hidden snap-center"
      style={{
        width: 343,
        minWidth: 343,
        height: 185,
        borderRadius: 16,
        backgroundColor: "#fff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt={data.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom gradient fog */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 50,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 9%, rgba(0,0,0,0.4) 61%)",
        }}
      />

      {/* Results column — left side */}
      <div
        className="absolute flex flex-col overflow-hidden"
        style={{ top: 8, left: 8, bottom: 30, gap: 4 }}
      >
        {data.results.map((r, i) => (
          <ResultBubble key={i} value={r.value} color={r.color} />
        ))}
      </div>

      {/* Bet range label — top right */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: 8,
          right: 8,
          height: 24,
          paddingInline: 8,
          paddingBlock: 4,
          borderRadius: 16,
          backgroundColor: "#6941CC",
        }}
      >
        <span className="text-white whitespace-nowrap" style={{ fontSize: 12, lineHeight: "14px", fontWeight: 400 }}>
          {data.label}
        </span>
      </div>

      {/* Flag — above bottom bar right */}
      <div
        className="absolute overflow-hidden"
        style={{ bottom: 40, right: 8, width: 24, height: 24 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dealers/flag-uk.svg" alt="" className="w-full h-full" />
      </div>

      {/* Game name — bottom left */}
      <p
        className="absolute text-white font-bold whitespace-nowrap translate-y-1/2"
        style={{ bottom: 18.5, left: 8, fontSize: 18, lineHeight: "21px" }}
      >
        {data.name}
      </p>

      {/* Members pill — bottom right */}
      <div
        className="absolute flex items-center"
        style={{
          bottom: 8,
          right: 8,
          height: 24,
          paddingInline: 8,
          paddingBlock: 4,
          borderRadius: 16,
          backgroundColor: "#363555",
          gap: 4,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dealers/members-icon.svg" alt="" style={{ width: 16, height: 16 }} />
        <span className="text-primary-600 whitespace-nowrap" style={{ fontSize: 12, lineHeight: "14px", fontWeight: 400 }}>
          {data.members}
        </span>
      </div>
    </motion.button>
  );
}

export default function LiveDealersSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Top Dealers" />
      <div className="-mx-4">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ paddingInline: 16, WebkitOverflowScrolling: "touch" }}
        >
          {dealers.map((d) => (
            <LiveCasinoCard key={d.id} data={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
