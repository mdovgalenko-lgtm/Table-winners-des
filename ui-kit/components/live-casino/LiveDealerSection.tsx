"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../casino/GameSection";
import { MOTION } from "@/lib/motion";

type LiveDealerProvider = "tom-horn" | "bombay" | "mglife" | "evolution";

const providerLogos: Record<LiveDealerProvider, string> = {
  "tom-horn": "/live-dealers/providers/tom-horn.svg",
  bombay: "/live-dealers/providers/bombay.svg",
  mglife: "/live-dealers/providers/bombay.svg",
  evolution: "/live-dealers/providers/evolution.svg",
};

export interface LiveDealerData {
  id: string;
  image: string;
  provider: LiveDealerProvider;
}

const topRow1: LiveDealerData[] = [
  { id: "ld-t1", image: "/live-dealers/ld1.png", provider: "tom-horn" },
  { id: "ld-t2", image: "/live-dealers/ld2.png", provider: "bombay" },
  { id: "ld-t3", image: "/live-dealers/ld3.png", provider: "mglife" },
  { id: "ld-t4", image: "/live-dealers/ld4.png", provider: "evolution" },
];

const topRow2: LiveDealerData[] = [
  { id: "ld-t5", image: "/live-dealers/ld2.png", provider: "bombay" },
  { id: "ld-t6", image: "/live-dealers/ld4.png", provider: "evolution" },
  { id: "ld-t7", image: "/live-dealers/ld1.png", provider: "tom-horn" },
  { id: "ld-t8", image: "/live-dealers/ld3.png", provider: "mglife" },
];

const blackjackRow: LiveDealerData[] = [
  { id: "ld-bj1", image: "/live-dealers/ld2.png", provider: "bombay" },
  { id: "ld-bj2", image: "/live-dealers/ld1.png", provider: "tom-horn" },
  { id: "ld-bj3", image: "/live-dealers/ld4.png", provider: "evolution" },
  { id: "ld-bj4", image: "/live-dealers/ld3.png", provider: "mglife" },
];

const rouletteRow: LiveDealerData[] = [
  { id: "ld-r1", image: "/live-dealers/ld3.png", provider: "mglife" },
  { id: "ld-r2", image: "/live-dealers/ld1.png", provider: "tom-horn" },
  { id: "ld-r3", image: "/live-dealers/ld2.png", provider: "bombay" },
  { id: "ld-r4", image: "/live-dealers/ld4.png", provider: "evolution" },
];

function LiveDealerCard({ data }: { data: LiveDealerData }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 relative overflow-hidden"
      style={{ width: 102, height: 120, minWidth: 102, borderRadius: 16 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Flag — top right */}
      <div className="absolute overflow-hidden" style={{ top: 8, right: 8, width: 20, height: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/live-dealers/flag.svg" alt="" className="w-full h-full" />
      </div>

      {/* Bottom fog + icons */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
        style={{
          height: 32,
          padding: 8,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 57%)",
        }}
      >
        <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={providerLogos[data.provider]}
            alt={data.provider}
            className="w-full h-full"
          />
        </div>
        <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/providers/info-circle.svg" alt="info" className="w-full h-full" />
        </div>
      </div>
    </motion.button>
  );
}

function DealerRowInline({ dealers }: { dealers: LiveDealerData[] }) {
  return (
    <div className="flex gap-2">
      {dealers.map((d) => (
        <LiveDealerCard key={d.id} data={d} />
      ))}
    </div>
  );
}

interface LiveDealerSectionProps {
  title: string;
  rows?: 1 | 2;
  row1?: LiveDealerData[];
  row2?: LiveDealerData[];
}

const sectionDefaults: Record<string, { row1: LiveDealerData[]; row2: LiveDealerData[] }> = {
  Top: { row1: topRow1, row2: topRow2 },
  Blackjack: { row1: blackjackRow, row2: [] },
  Roulette: { row1: rouletteRow, row2: [] },
};

export default function LiveDealerSection({
  title,
  rows = 1,
  row1,
  row2,
}: LiveDealerSectionProps) {
  const defaults = sectionDefaults[title];
  const r1 = row1 ?? defaults?.row1 ?? topRow1;
  const r2 = row2 ?? defaults?.row2 ?? [];
  const hasTwoRows = rows === 2 && r2.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title={title} />
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className={hasTwoRows ? "flex flex-col gap-2 w-max" : "flex gap-2 w-max"}>
          {hasTwoRows ? (
            <>
              <DealerRowInline dealers={r1} />
              <DealerRowInline dealers={r2} />
            </>
          ) : (
            r1.map((d) => (
              <LiveDealerCard key={d.id} data={d} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
