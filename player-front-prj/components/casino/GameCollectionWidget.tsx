"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

const widgetGames = [
  { id: "wg1", name: "Ventura Panda", image: "/games/widget-game-1.png" },
  { id: "wg2", name: "Pinata GoGo", image: "/games/widget-game-2.png" },
  { id: "wg3", name: "Thor Realm of Fortune", image: "/games/widget-game-3.png" },
  { id: "wg4", name: "Diamonds of Liberty", image: "/games/widget-game-4.png" },
  { id: "wg5", name: "Egypt Fire 2", image: "/games/widget-game-5.png" },
  { id: "wg6", name: "Explosive Frenzy", image: "/games/widget-game-6.png" },
];

export default function GameCollectionWidget() {
  return (
    <div
      className="w-full overflow-hidden rounded-[16px]"
      style={{ boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)" }}
    >
      {/* Top block — gradient + bg image + logo + title + button */}
      <div
        className="relative flex flex-col items-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #36282E 0%, #E77341 100%)",
          padding: "16px 24px",
          gap: 8,
        }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1068px] h-[151px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/games/widget-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 48 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/games/widget-logo.svg"
            alt="Pragmatic Play"
            style={{ width: 33.5, height: 48 }}
            className="object-contain"
          />
        </div>

        <p
          className="relative text-white font-bold whitespace-nowrap"
          style={{ fontSize: 20, lineHeight: "23px" }}
        >
          Pragramatic Play
        </p>

        <motion.button
          whileTap={{ scale: MOTION.press.scale }}
          className="relative flex items-center justify-center bg-brand-500 rounded-[20px]"
          style={{ height: 32, paddingLeft: 16, paddingRight: 16 }}
        >
          <span
            className="text-white font-bold text-center whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: "16px" }}
          >
            Show More
          </span>
        </motion.button>
      </div>

      {/* Bottom block — 3×2 game grid */}
      <div
        style={{
          backgroundColor: "#2E2D49",
          padding: "16px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 87px)",
          gap: 16,
          justifyContent: "center",
        }}
      >
        {widgetGames.map((game) => (
          <motion.button
            key={game.id}
            whileTap={{ scale: MOTION.press.scale }}
            className="rounded-[16px] overflow-hidden"
            style={{ width: 87, height: 87 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
