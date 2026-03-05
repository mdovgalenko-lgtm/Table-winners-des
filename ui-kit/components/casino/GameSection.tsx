"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

type ProviderType =
  | "hacksaw"
  | "ruby-play"
  | "thunderkick"
  | "ygg"
  | "pragmatic-play"
  | "playngo"
  | "slingo"
  | "quickspin";

export interface GameData {
  id: string;
  name: string;
  image: string;
  badge?: string;
  provider: ProviderType;
}

const providerLogos: Record<ProviderType, string> = {
  hacksaw: "/providers/small/hacksaw.svg",
  "ruby-play": "/providers/small/ruby-play.svg",
  thunderkick: "/providers/small/thunderkick.svg",
  ygg: "/providers/small/ygg.svg",
  "pragmatic-play": "/providers/small/pragmatic-play.svg",
  playngo: "/providers/small/playngo.svg",
  slingo: "/providers/small/slingo.svg",
  quickspin: "/providers/small/quickspin.svg",
};

const recentGames: GameData[] = [
  { id: "r1", name: "Diamond Charge", image: "/games/diamond-charge.png", badge: "🔒 Locked", provider: "hacksaw" },
  { id: "r2", name: "Clucking Hell", image: "/games/clucking-hell.png", provider: "ruby-play" },
  { id: "r3", name: "Diwali Roulette", image: "/games/diwali-roulette.png", provider: "thunderkick" },
  { id: "r4", name: "Egypt Fire 2", image: "/games/egypt-fire-2.png", provider: "ygg" },
  { id: "r5", name: "Explosive Frenzy", image: "/games/explosive-frenzy.png", provider: "pragmatic-play" },
];

const topGamesRow1: GameData[] = [
  { id: "t1", name: "Ice Mints", image: "/games/ice-mints.png", badge: "€ 500,000,000.00", provider: "pragmatic-play" },
  { id: "t2", name: "Sleeping Dragon", image: "/games/sleeping-dragon.png", badge: "Exclusive", provider: "playngo" },
  { id: "t3", name: "Lobster House", image: "/games/lobster-house.png", badge: "Trending", provider: "slingo" },
  { id: "t4", name: "Olympus Wins", image: "/games/olympus-wins.png", badge: "New", provider: "playngo" },
  { id: "t5", name: "Master Gems", image: "/games/master-gems.png", badge: "Collection", provider: "pragmatic-play" },
];

const topGamesRow2: GameData[] = [
  { id: "t6", name: "Temple Guardians", image: "/games/temple-guardians.png", badge: "Mood", provider: "playngo" },
  { id: "t7", name: "Lucky Rainbows", image: "/games/lucky-rainbows.png", badge: "€ 20,000.00", provider: "pragmatic-play" },
  { id: "t8", name: "5 Joker Hit", image: "/games/5-joker-hit.png", badge: "Limited", provider: "hacksaw" },
  { id: "t9", name: "Blazing Frenzy", image: "/games/blazing-frenzy.png", badge: "Elite", provider: "playngo" },
  { id: "t10", name: "Diamonds of Liberty", image: "/games/diamonds-of-liberty.png", badge: "Seasonal", provider: "quickspin" },
];

const newGamesRow1: GameData[] = [
  { id: "n1", name: "Lobster House", image: "/games/lobster-house.png", badge: "Hot", provider: "slingo" },
  { id: "n2", name: "Diamond Charge", image: "/games/diamond-charge.png", badge: "€ 250,000.00", provider: "hacksaw" },
  { id: "n3", name: "Temple Guardians", image: "/games/temple-guardians.png", provider: "playngo" },
  { id: "n4", name: "Blazing Frenzy", image: "/games/blazing-frenzy.png", badge: "Popular", provider: "playngo" },
  { id: "n5", name: "Ice Mints", image: "/games/ice-mints.png", badge: "€ 100,000.00", provider: "pragmatic-play" },
];

const newGamesRow2: GameData[] = [
  { id: "n6", name: "Lucky Rainbows", image: "/games/lucky-rainbows.png", provider: "pragmatic-play" },
  { id: "n7", name: "Clucking Hell", image: "/games/clucking-hell.png", badge: "Featured", provider: "ruby-play" },
  { id: "n8", name: "Olympus Wins", image: "/games/olympus-wins.png", badge: "Bonus", provider: "playngo" },
  { id: "n9", name: "Diamonds of Liberty", image: "/games/diamonds-of-liberty.png", provider: "quickspin" },
  { id: "n10", name: "Egypt Fire 2", image: "/games/egypt-fire-2.png", badge: "€ 50,000.00", provider: "ygg" },
];

const randomGames: GameData[] = [
  { id: "rn1", name: "5 Joker Hit", image: "/games/5-joker-hit.png", provider: "hacksaw" },
  { id: "rn2", name: "Sleeping Dragon", image: "/games/sleeping-dragon.png", badge: "€ 75,000.00", provider: "playngo" },
  { id: "rn3", name: "Diwali Roulette", image: "/games/diwali-roulette.png", provider: "thunderkick" },
  { id: "rn4", name: "Master Gems", image: "/games/master-gems.png", badge: "VIP", provider: "pragmatic-play" },
  { id: "rn5", name: "Explosive Frenzy", image: "/games/explosive-frenzy.png", provider: "pragmatic-play" },
];

const sectionDefaults: Record<string, { row1: GameData[]; row2: GameData[] }> = {
  "Your Recent": { row1: recentGames, row2: [] },
  Top: { row1: topGamesRow1, row2: topGamesRow2 },
  New: { row1: newGamesRow1, row2: newGamesRow2 },
  "Random Games": { row1: randomGames, row2: [] },
};

function InfoCircleIcon() {
  return (
    <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/providers/info-circle.svg"
        alt="info"
        width={16}
        height={16}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function ProviderLogo({ provider }: { provider: ProviderType }) {
  return (
    <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={providerLogos[provider]}
        alt={provider}
        width={16}
        height={16}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function GameIcon({ game }: { game: GameData }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 relative rounded-[16px] overflow-hidden"
      style={{ width: 102, height: 120, minWidth: 102 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={game.image}
        alt={game.name}
        width={102}
        height={120}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {game.badge && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center px-2 py-1 bg-black/60 rounded-[16px] z-10">
          <span className="text-white font-bold text-[10px] leading-[11px] whitespace-nowrap">
            {game.badge}
          </span>
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between z-10"
        style={{ height: 32, padding: 8 }}
      >
        <ProviderLogo provider={game.provider} />
        <InfoCircleIcon />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 48,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />
    </motion.button>
  );
}

function GameRowInline({ games }: { games: GameData[] }) {
  return (
    <div className="flex gap-2">
      {games.map((game) => (
        <GameIcon key={game.id} game={game} />
      ))}
    </div>
  );
}

interface GameSectionProps {
  title: string;
  showSeeAll?: boolean;
  rows?: 1 | 2;
  games1?: GameData[];
  games2?: GameData[];
}

export default function GameSection({
  title,
  showSeeAll = true,
  rows = 1,
  games1,
  games2,
}: GameSectionProps) {
  const defaults = sectionDefaults[title];
  const row1 = games1 ?? defaults?.row1 ?? recentGames;
  const row2 = games2 ?? defaults?.row2 ?? [];
  const hasTwoRows = rows === 2 && row2.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title={title} showSeeAll={showSeeAll} />
      <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className={hasTwoRows ? "flex flex-col gap-2 w-max" : "flex gap-2 w-max"}>
          {hasTwoRows ? (
            <>
              <GameRowInline games={row1} />
              <GameRowInline games={row2} />
            </>
          ) : (
            row1.map((game) => (
              <GameIcon key={game.id} game={game} />
            ))
          )}
        </div>
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

export function SectionHeader({
  title,
  showSeeAll = true,
  onSeeAll,
}: {
  title: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
}) {
  return (
    <div className="flex items-center justify-between" style={{ height: 24 }}>
      <h3 style={{ fontSize: 18, lineHeight: "21px", fontWeight: 700 }} className="text-white">{title}</h3>
      {showSeeAll && (
        <motion.button
          onClick={onSeeAll}
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: MOTION.press.scale, opacity: 0.7 }}
          transition={{ duration: MOTION.duration.fast }}
          className="flex items-center justify-center overflow-hidden text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:opacity-40 disabled:pointer-events-none"
          style={{
            gap: 4,
            height: 24,
            borderRadius: 20,
          }}
        >
          <span
            className="text-center whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: "16px", fontWeight: 700 }}
          >
            See All
          </span>
          <SeeAllArrow />
        </motion.button>
      )}
    </div>
  );
}
