"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./GameSection";
import { MOTION } from "@/lib/motion";

interface SportEvent {
  id: string;
  image: string;
  width: number;
  height: number;
}

const events: SportEvent[] = [
  {
    id: "se1",
    image: "/sport/event1.png",
    width: 728,
    height: 332,
  },
  {
    id: "se2",
    image: "/sport/event2.png",
    width: 702,
    height: 326,
  },
];

function SportCard({ data }: { data: SportEvent }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 relative overflow-hidden snap-center"
      style={{
        width: 343,
        minWidth: 343,
        height: 154,
        borderRadius: 16,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.button>
  );
}

export default function SportEventsSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Sport Events" />
      <div className="-mx-4">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ paddingInline: 16, WebkitOverflowScrolling: "touch" }}
        >
          {events.map((e) => (
            <SportCard key={e.id} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
