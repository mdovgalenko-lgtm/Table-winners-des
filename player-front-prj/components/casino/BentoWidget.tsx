"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

const imgTop = "https://www.figma.com/api/mcp/asset/78869432-5c38-4258-989c-d22bdb2175d7";
const imgTournaments = "https://www.figma.com/api/mcp/asset/3c516ce9-4ebf-41ac-b2f7-0c5caa37b93c";
const imgNew = "https://www.figma.com/api/mcp/asset/0a6af053-b540-4a0b-95fa-3a016066a8bf";
const imgSlots = "https://www.figma.com/api/mcp/asset/03b7599c-bfb9-4e4d-82a3-79db61e26f00";
const imgJackpots = "https://www.figma.com/api/mcp/asset/0b234f88-d663-4c97-ab2f-2d068d3bae8a";

interface BentoItemProps {
  label: string;
  gradient: string;
  image: string;
  imageSize: number;
  className?: string;
  layout?: "horizontal" | "vertical";
}

function BentoItem({ label, gradient, image, imageSize, className = "", layout = "vertical" }: BentoItemProps) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className={`relative overflow-hidden rounded-widget shadow-header-lg ${className}`}
      style={{ background: gradient }}
    >
      {layout === "horizontal" ? (
        <div className="flex items-start justify-between w-full h-full p-2">
          <span className="text-white font-bold text-lg">{label}</span>
          <img src={image} alt="" className="object-cover" style={{ width: imageSize, height: imageSize }} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-2">
          <img src={image} alt="" className="object-cover" style={{ width: imageSize, height: imageSize }} />
          <span className="text-white font-bold text-lg text-center">{label}</span>
        </div>
      )}
    </motion.button>
  );
}

export default function BentoWidget() {
  return (
    <div className="flex gap-2" style={{ height: 256 }}>
      {/* Left column: Top + Tournaments */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <BentoItem
          label="Top"
          gradient="linear-gradient(133deg, #282544 0%, #6A53EC 100%)"
          image={imgTop}
          imageSize={80}
          layout="horizontal"
          className="shrink-0 h-auto"
        />
        <BentoItem
          label="Tournaments"
          gradient="linear-gradient(121deg, #36282E 0%, #E77341 99%)"
          image={imgTournaments}
          imageSize={56}
          className="flex-1"
        />
      </div>

      {/* Right column: New + (Slots + Jackpots) */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <BentoItem
          label="New"
          gradient="linear-gradient(133deg, #2F2546 0%, #A456F6 100%)"
          image={imgNew}
          imageSize={80}
          layout="horizontal"
          className="shrink-0 h-auto"
        />
        <div className="flex-1 flex gap-2">
          <BentoItem
            label="Slots"
            gradient="linear-gradient(105deg, #372539 3%, #F6568B 100%)"
            image={imgSlots}
            imageSize={56}
            className="flex-1"
          />
          <BentoItem
            label="Lotteries"
            gradient="linear-gradient(103deg, #292A44 1%, #6B80ED 100%)"
            image={imgJackpots}
            imageSize={56}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}
