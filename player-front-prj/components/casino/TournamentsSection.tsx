"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./GameSection";
import { MOTION } from "@/lib/motion";

function StandardCard({
  title,
  subtitle,
  prize,
  rank,
  countdown,
  players,
  charImage,
  ellipseImage,
  href,
}: {
  title: string;
  subtitle: string;
  prize?: string;
  rank?: number;
  countdown?: { days: string; time: string };
  players?: number;
  charImage: string;
  ellipseImage: string;
  href?: string;
}) {
  const card = (
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
      {/* Left image area */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 100, height: 128, borderRadius: 16, backgroundColor: "#363555" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ellipseImage}
          alt=""
          className="absolute"
          style={{ width: 115, height: 115, left: 2, top: -44 }}
        />
        <div className="absolute flex flex-col items-center justify-center" style={{ inset: 10, gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={charImage}
            alt=""
            className="object-cover"
            style={{ width: 80, height: 80 }}
          />
          {players != null && (
            <div className="flex items-center justify-center w-full" style={{ gap: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tournaments/members-icon.svg" alt="" style={{ width: 16, height: 16 }} />
              <span className="text-primary-600 whitespace-nowrap" style={{ fontSize: 12, lineHeight: "14px", fontWeight: 400 }}>
                {players}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 flex flex-col items-start justify-between min-w-0 h-full" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
          <p className="text-primary-600 font-bold text-left w-full" style={{ fontSize: 16, lineHeight: "18px" }}>
            {title}
          </p>
          <p className="text-primary-400 text-left w-full" style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}>
            {subtitle}
          </p>
          {prize && (
            <p className="text-brand-300 font-bold text-left w-full" style={{ fontSize: 16, lineHeight: "18px" }}>
              {prize}
            </p>
          )}
          {rank != null && (
            <p className="text-left w-full" style={{ fontSize: 14, lineHeight: "16px" }}>
              <span className="text-primary-400" style={{ fontWeight: 400 }}>Rank: </span>
              <span className="text-primary-600" style={{ fontWeight: 400 }}>{rank}</span>
            </p>
          )}
        </div>
        {countdown && (
          <div className="flex flex-wrap items-center" style={{ gap: 4 }}>
            <span className="text-primary-400 text-center whitespace-nowrap" style={{ fontSize: 14, lineHeight: "16px", fontWeight: 400 }}>
              Ends in
            </span>
            <div className="flex items-center" style={{ gap: 4 }}>
              <span
                className="text-primary-600 text-center whitespace-nowrap"
                style={{
                  fontSize: 12,
                  lineHeight: "14px",
                  fontWeight: 400,
                  padding: "4px 8px",
                  borderRadius: 4,
                  backgroundColor: "rgba(146,146,170,0.2)",
                }}
              >
                {countdown.days}
              </span>
              <span
                className="text-primary-600 text-center whitespace-nowrap"
                style={{
                  fontSize: 12,
                  lineHeight: "14px",
                  fontWeight: 400,
                  padding: "4px 8px",
                  borderRadius: 4,
                  backgroundColor: "rgba(146,146,170,0.2)",
                }}
              >
                {countdown.time}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}

function GameOfTheMonthCard() {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="shrink-0 flex items-center justify-center overflow-hidden snap-center"
      style={{
        width: 343,
        minWidth: 343,
        height: 158,
        borderRadius: 16,
        background: "linear-gradient(180deg, #6A53EC 0%, #282544 100%)",
        boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        gap: 16,
      }}
    >
      {/* Tilted cards */}
      <div className="flex items-center justify-center shrink-0" style={{ width: 195, height: "100%" }}>
        <div style={{ transform: "rotate(-19.83deg)" }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            {/* Column 1 */}
            <div className="flex flex-col" style={{ width: 80, gap: 8 }}>
              <div style={{ width: 80, height: 94, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div className="overflow-hidden" style={{ width: 80, height: 94, borderRadius: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/tournaments/gotm-game1.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: 80, height: 94, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)" }} />
            </div>
            {/* Column 2 */}
            <div className="flex flex-col justify-end" style={{ width: 80, gap: 8, height: 362 }}>
              <div style={{ width: 80, height: 94, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div style={{ width: 80, height: 94, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div className="overflow-hidden" style={{ width: 80, height: 94, borderRadius: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/tournaments/gotm-game2.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: 80, height: 94, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="shrink-0 text-white font-bold whitespace-nowrap" style={{ fontSize: 20, lineHeight: "23px" }}>
        <p>Games of</p>
        <p>the Month</p>
      </div>
    </motion.button>
  );
}

export default function TournamentsSection() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title="Tournaments" />
      <div className="-mx-4">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ paddingInline: 16, WebkitOverflowScrolling: "touch" }}
        >
          <StandardCard
            title="Private Club Tournament"
            subtitle="Points for every win"
            prize="€4,365.17"
            rank={50}
            countdown={{ days: "24d", time: "14h 23m" }}
            players={189}
            charImage="/tournaments/tournament-char.png"
            ellipseImage="/tournaments/ellipse.svg"
            href="/tournament"
          />
          <GameOfTheMonthCard />
          <StandardCard
            title="Claim €160 000!"
            subtitle="The Wilde Legends Network promotion is in full swing!"
            charImage="/tournaments/promo-char.png"
            ellipseImage="/tournaments/promo-ellipse.svg"
          />
        </div>
      </div>
    </div>
  );
}
