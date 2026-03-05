"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../casino/GameSection";
import { MOTION } from "@/lib/motion";

interface ExploreCard {
  id: string;
  title: string;
  subtitle: string;
  charImage: string;
  ellipseImage: string;
}

const cards: ExploreCard[] = [
  {
    id: "e1",
    title: "Private Club Tournament",
    subtitle: "Points for every win",
    charImage: "/tournaments/tournament-char.png",
    ellipseImage: "/tournaments/ellipse.svg",
  },
  {
    id: "e2",
    title: "Claim €160 000!",
    subtitle: "The Wilde Legends Network promotion is in full swing!",
    charImage: "/tournaments/promo-char.png",
    ellipseImage: "/tournaments/promo-ellipse.svg",
  },
  {
    id: "e3",
    title: "VIP Cashback Bonus",
    subtitle: "Weekly cashback up to 15%",
    charImage: "/tournaments/tournament-char.png",
    ellipseImage: "/tournaments/ellipse.svg",
  },
];

function ExploreCardWidget({ data }: { data: ExploreCard }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 flex gap-3 items-center overflow-hidden snap-center"
      style={{
        width: 343,
        minWidth: 343,
        height: 158,
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 100, height: 128, borderRadius: 16, backgroundColor: "#363555" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.ellipseImage}
          alt=""
          className="absolute"
          style={{ width: 115, height: 115, left: 2, top: -44 }}
        />
        <div className="absolute flex flex-col items-center justify-center" style={{ inset: 10, gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.charImage} alt="" className="object-cover" style={{ width: 80, height: 80 }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-between min-w-0 h-full" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
          <p className="text-primary-600 font-bold text-left w-full" style={{ fontSize: 16, lineHeight: "18px" }}>
            {data.title}
          </p>
          <p className="text-primary-400 text-left w-full" style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}>
            {data.subtitle}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function ExploreSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Explore" />
      <div className="-mx-4">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ paddingInline: 16, WebkitOverflowScrolling: "touch" }}
        >
          {cards.map((c) => (
            <ExploreCardWidget key={c.id} data={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
