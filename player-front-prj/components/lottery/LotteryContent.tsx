"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { CurrencyModal } from "@/components/shared/CurrencyModal";
import { ChatPanel } from "@/components/shared/ChatPanel";

const BANNER_IMG =
  "https://www.figma.com/api/mcp/asset/0091f0fa-9fb4-451b-b79b-2d57a29f475b";

const ICON = {
  information: "https://www.figma.com/api/mcp/asset/79f10aa8-d195-4290-8f6e-0141c501f1f2",
  ticket: "https://www.figma.com/api/mcp/asset/1d7a7fae-86c5-4ae5-b75b-09f75dbf895e",
  present: "https://www.figma.com/api/mcp/asset/41599b01-685b-4b12-8504-180964255160",
  coins: "https://www.figma.com/api/mcp/asset/05e634c2-0636-4300-8e25-881b1fa20e7d",
};

const SOCIAL = {
  instagram: "https://www.figma.com/api/mcp/asset/595fc1b5-2a64-4518-ae7c-b55e9e0199c7",
  twitterBg: "https://www.figma.com/api/mcp/asset/324bbfae-ca0d-429f-8a8f-0c01e0f95f14",
  twitterIcon: "https://www.figma.com/api/mcp/asset/e891aa3f-8484-4ca5-a767-69ab0843aa9c",
  telegram: "https://www.figma.com/api/mcp/asset/d89cd6ef-7fc2-4049-b2a5-bed26554bc97",
};

const FOOTER_LOGOS = {
  badge: "https://www.figma.com/api/mcp/asset/6175bc1f-528c-4fdf-8e5a-42fd4d41c7ab",
  therapy: "https://www.figma.com/api/mcp/asset/f4a1e6ba-0898-4b7c-b958-c6b2ae1dca40",
};

interface LBEntry {
  rank: number;
  name: string;
  subtitle?: string;
  score: string;
  prize: string;
  type: "normal" | "muted" | "yours" | "empty";
}

const TABLE_LEFT: LBEntry[] = [
  { rank: 1, name: "@hhhhhhhhh", subtitle: "active 6 hours ago", score: "10388", prize: "€798.87", type: "muted" },
  { rank: 0, name: "-", score: "-", prize: "", type: "empty" },
  { rank: 18, name: "@trusta", subtitle: "playing Rich Wilde Tome of Mad...", score: "354", prize: "€272.34", type: "normal" },
  { rank: 19, name: "@kai", score: "159", prize: "€217.87", type: "yours" },
  { rank: 20, name: "@hidden", subtitle: "active 6 hours ago", score: "111", prize: "€145.25", type: "muted" },
  { rank: 0, name: "-", score: "-", prize: "", type: "empty" },
  { rank: 150, name: "@texnologes", subtitle: "playing Rich Wilde Tome of Mad...", score: "2", prize: "€18.16", type: "normal" },
];

const TABLE_RIGHT: LBEntry[] = [
  { rank: 1, name: "@hhhhhhhhh", subtitle: "active 6 hours ago", score: "10388", prize: "€798.87", type: "muted" },
  { rank: 2, name: "@solarsamurai", subtitle: "playing Rich Wilde Tome of Mad...", score: "34726", prize: "€789.77", type: "normal" },
  { rank: 3, name: "@steelserpent", subtitle: "active 2 hours ago", score: "90927", prize: "€5,941.08", type: "muted" },
  { rank: 4, name: "@cyberphoenix", subtitle: "playing Rich Wilde Tome of Mad...", score: "39927", prize: "€4,988.34", type: "normal" },
  { rank: 5, name: "@hidden", subtitle: "playing Rich Wilde Tome of Mad...", score: "74562", prize: "€4,213.87", type: "muted" },
  { rank: 6, name: "@neonexplode...", subtitle: "active 4 hours ago", score: "14562", prize: "€6,213.87", type: "muted" },
];

interface ConditionItem {
  src: string;
  inset: string;
  clip?: boolean;
  text: string;
}

const CONDITIONS: ConditionItem[] = [
  { src: ICON.present, inset: "inset-[8.33%_11.7%_8.33%_12.5%]", text: "Prizes: 20" },
  { src: ICON.ticket, inset: "inset-[1.68%_3.44%_6.02%_2.91%]", clip: true, text: "Max tickets per day: 20" },
  { src: ICON.coins, inset: "inset-[18.55%_3.94%_18.56%_3.95%]", clip: true, text: "Bets per ticket: €100" },
];

const ROUND_DATES = [
  "29.05.2025", "22.05.2025", "15.05.2025",
  "08.05.2025", "01.05.2025", "24.04.2025",
  "17.04.2025", "10.04.2025", "03.04.2025",
  "27.03.2025", "20.03.2025", "13.03.2025",
  "06.03.2025", "27.02.2025", "20.02.2025",
  "13.02.2025", "06.02.2025", "30.01.2025",
];

function LogoSign() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0605 22.8928L19.6852 16.946H16.9976L13.1961 12.3288H30L16.0291 29.7583C15.908 29.9033 15.7143 30 15.5206 30H14.6489C14.4552 30 14.2615 29.9033 14.1404 29.7583L0 12.2079H6.58596L15.0363 22.8445V22.8928H15.0605ZM20.7748 5.39081H9.27361L6.58596 9.6938H0.0726392L5.01211 0.725222C5.15738 0.314263 5.52058 0 5.98063 0H24.0678C24.5278 0 24.891 0.314263 25.0363 0.725222L29.9758 9.71797H23.4867L20.799 5.41499H20.7506L20.7748 5.39081Z"
        fill="url(#lot_logo_grad)"
      />
      <defs>
        <linearGradient id="lot_logo_grad" x1="4.72155" y1="-8.21918" x2="24.0194" y2="27.8503" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F39628" />
          <stop offset="1" stopColor="#A80BEB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 w-4 h-4">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none" preserveAspectRatio="none">
        <circle cx="8" cy="8" r="8" fill="#003399" />
      </svg>
      <div className="absolute bottom-[18.75%] left-1/4 right-[31.25%] top-[18.75%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 7 10" fill="none" preserveAspectRatio="none">
          <path d="M4.72093 10C4.31395 10 3.93863 9.94942 3.59496 9.84828C3.25129 9.73793 2.93928 9.58161 2.65892 9.37931C2.37855 9.17701 2.13437 8.93333 1.92636 8.64828C1.71835 8.35402 1.55103 8.02299 1.42442 7.65517C1.2978 7.28736 1.21641 6.88736 1.18023 6.45517C1.16214 6.12414 1.14858 5.7931 1.13953 5.46207C1.13049 5.13103 1.12597 4.8046 1.12597 4.48276C1.13501 4.15172 1.14406 3.82988 1.1531 3.51724C1.19832 3.03908 1.29328 2.61149 1.43798 2.23448C1.59173 1.84828 1.78165 1.51724 2.00775 1.24138C2.24289 0.965517 2.50065 0.735632 2.78101 0.551724C3.07041 0.367816 3.37791 0.229885 3.70349 0.137931C4.03811 0.045977 4.37726 0 4.72093 0H6.25388C6.38954 0 6.51163 0.0183906 6.62016 0.0551723C6.73773 0.0827581 6.82817 0.156321 6.89147 0.275862C6.96382 0.386207 7 0.570115 7 0.827586C7 1.07586 6.96382 1.25977 6.89147 1.37931C6.81912 1.49885 6.71964 1.57241 6.59302 1.6C6.47545 1.62759 6.33979 1.64138 6.18605 1.64138H4.72093C4.52196 1.64138 4.33204 1.66437 4.15116 1.71034C3.97028 1.74713 3.79845 1.81149 3.63566 1.90345C3.48191 1.9954 3.34625 2.11034 3.22868 2.24828C3.11111 2.38621 3.01163 2.55172 2.93023 2.74483C2.85788 2.92874 2.81266 3.14483 2.79457 3.3931C2.76744 3.72414 2.74935 4.05977 2.74031 4.4C2.73127 4.74023 2.73127 5.08046 2.74031 5.42069C2.74935 5.75172 2.76744 6.07816 2.79457 6.4C2.82171 6.66667 2.87145 6.90575 2.9438 7.11724C3.01615 7.32874 3.10659 7.51264 3.21512 7.66897C3.32364 7.82529 3.45026 7.95862 3.59496 8.06896C3.74871 8.17011 3.91602 8.24828 4.0969 8.30345C4.28682 8.34943 4.49483 8.37241 4.72093 8.37241H6.19961C6.35336 8.37241 6.48902 8.3908 6.60659 8.42759C6.7332 8.45517 6.82817 8.52874 6.89147 8.64828C6.96382 8.75862 7 8.94253 7 9.2C7 9.43908 6.96835 9.61839 6.90504 9.73793C6.84173 9.84828 6.75129 9.91724 6.63372 9.94483C6.52519 9.98161 6.40762 10 6.28101 10H4.72093ZM0.596899 6.63448C0.488372 6.63448 0.388889 6.62529 0.29845 6.6069C0.20801 6.57931 0.135659 6.52414 0.0813954 6.44138C0.0271318 6.34943 0 6.2069 0 6.01379C0 5.82989 0.0271318 5.69655 0.0813954 5.61379C0.135659 5.53103 0.20801 5.48046 0.29845 5.46207C0.388889 5.43448 0.48385 5.42069 0.583333 5.42069H5.72481C5.83333 5.42069 5.92829 5.43448 6.00969 5.46207C6.10013 5.48046 6.17248 5.53563 6.22674 5.62759C6.28101 5.71034 6.30814 5.84368 6.30814 6.02759C6.30814 6.21149 6.28101 6.34943 6.22674 6.44138C6.18152 6.52414 6.1137 6.57931 6.02326 6.6069C5.93282 6.62529 5.82881 6.63448 5.71124 6.63448H0.596899ZM0.596899 4.46896C0.488372 4.46896 0.388889 4.45977 0.29845 4.44138C0.20801 4.41379 0.135659 4.35862 0.0813954 4.27586C0.0271318 4.18391 0 4.04598 0 3.86207C0 3.67816 0.0271318 3.54483 0.0813954 3.46207C0.135659 3.37011 0.20801 3.31494 0.29845 3.29655C0.388889 3.26897 0.48385 3.25517 0.583333 3.25517H5.72481C5.83333 3.25517 5.92829 3.26897 6.00969 3.29655C6.10013 3.31494 6.17248 3.37011 6.22674 3.46207C6.28101 3.54483 6.30814 3.68276 6.30814 3.87586C6.30814 4.05977 6.28101 4.1931 6.22674 4.27586C6.18152 4.35862 6.1137 4.41379 6.02326 4.44138C5.93282 4.45977 5.82881 4.46896 5.71124 4.46896H0.596899Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function ArrowDownSmall() {
  return (
    <div className="relative shrink-0 w-3 h-3">
      <div className="absolute inset-[16.67%_8.33%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 10 8" fill="none" preserveAspectRatio="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.99751 7.46651C4.48884 8.17783 5.51116 8.17783 6.00249 7.46651L9.76836 2.01447C10.3508 1.17126 9.76791 0 8.76587 0L1.23413 0C0.232091 0 -0.350781 1.17126 0.231645 2.01447L3.99751 7.46651Z" fill="#9292AA" />
        </svg>
      </div>
    </div>
  );
}

function WalletBoldIcon() {
  return (
    <div className="relative shrink-0 w-4 h-4">
      <div className="absolute inset-[8.54%_10.42%_8.33%_10.42%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 12.6667 13.3" fill="none" preserveAspectRatio="none">
          <path d="M6.9668 0.5C7.01007 0.500008 7.05287 0.503483 7.09473 0.510742L6.9668 0.5ZM6.9668 0.5C6.9186 0.5 6.87159 0.505056 6.82617 0.513672C6.87423 0.504838 6.92163 0.5 6.9668 0.5ZM2.50684 4.2998H10.1602C11.2639 4.29989 12.167 5.20285 12.167 6.30664V6.59961C12.167 6.69013 12.0905 6.7666 12 6.7666H11.3203C10.8765 6.7666 10.4613 6.92012 10.1357 7.19336L10.0098 7.30957C9.5583 7.7521 9.32498 8.42309 9.51758 9.12012L9.51855 9.11914C9.7553 9.99414 10.597 10.5 11.4199 10.5H12C12.0905 10.5 12.167 10.5765 12.167 10.667V10.793C12.167 11.8968 11.2639 12.7997 10.1602 12.7998H2.50684C1.40298 12.7998 0.5 11.8968 0.5 10.793V6.30664C0.500008 5.65027 0.813865 5.06953 1.29883 4.70703L1.30273 4.7041C1.63795 4.4487 2.05251 4.2998 2.50684 4.2998ZM11.3271 8.4668H12.167V8.7998H11.3662C11.3111 8.79969 11.2569 8.77927 11.2178 8.74609C11.1801 8.71406 11.1671 8.68072 11.165 8.65527L11.1641 8.64551L11.165 8.60938C11.1683 8.58609 11.1773 8.56351 11.1904 8.54297L11.2139 8.51367L11.2227 8.50391C11.2401 8.48552 11.2721 8.4668 11.3271 8.4668ZM3 5.63379C2.45052 5.63379 2 6.08431 2 6.63379C2.00025 7.18306 2.45068 7.63379 3 7.63379H7.66699C8.21617 7.63361 8.66674 7.18295 8.66699 6.63379C8.66699 6.08442 8.21632 5.63397 7.66699 5.63379H3ZM0.516602 3.64453V3.64355V3.64453ZM7.72754 1.17383C7.7312 1.20416 7.7334 1.23509 7.7334 1.2666C7.7334 1.23483 7.73108 1.20392 7.72754 1.17383ZM6.69043 0.551758L4.39355 1.41797L6.69238 0.548828C6.71999 0.538855 6.74858 0.533264 6.77637 0.526367L6.69043 0.551758ZM7.69434 1.02734C7.69647 1.03379 7.69823 1.04035 7.7002 1.04688C7.69825 1.04032 7.69645 1.03379 7.69434 1.02734ZM7.66797 0.958008C7.6701 0.96281 7.67179 0.967799 7.67383 0.972656C7.67179 0.967783 7.6701 0.962812 7.66797 0.958008ZM7.49414 0.713867C7.49765 0.7172 7.50143 0.720234 7.50488 0.723633C7.50141 0.720238 7.49766 0.717181 7.49414 0.713867ZM7.3623 0.614258C7.38219 0.626374 7.4012 0.639484 7.41992 0.65332C7.40107 0.639562 7.38218 0.626232 7.3623 0.614258ZM7.2334 0.550781C7.25996 0.560828 7.28532 0.573077 7.31055 0.585938C7.28517 0.573103 7.25977 0.560766 7.2334 0.550781ZM7.09668 0.511719C7.12673 0.517016 7.15559 0.526364 7.18457 0.535156C7.15537 0.526218 7.12638 0.517103 7.09668 0.511719ZM7.71387 1.09961C7.71888 1.12206 7.72357 1.14473 7.72656 1.16797C7.72362 1.14456 7.71878 1.12194 7.71387 1.09961Z" fill="white" stroke="white" />
        </svg>
      </div>
    </div>
  );
}

function MessagesIcon() {
  return (
    <div className="relative shrink-0 w-4 h-4">
      <div className="absolute inset-[8.33%_8.35%_8.33%_8.32%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 13.3333 13.3333" fill="none" preserveAspectRatio="none">
          <path d="M6.66468 1.15855e-06C5.48866 -0.000526407 4.33346 0.310368 3.31646 0.901091C2.29947 1.49181 1.45693 2.34131 0.874466 3.36326C0.292003 4.3852 -0.00962458 5.54317 0.000234148 6.7195C0.0100929 7.89582 0.331086 9.04857 0.930596 10.0606L0.0369172 12.52C0.00361815 12.6115 -0.0071403 12.7097 0.00555309 12.8063C0.0182465 12.9028 0.0540178 12.9949 0.109837 13.0747C0.165657 13.1545 0.23988 13.2197 0.326221 13.2647C0.412562 13.3097 0.508477 13.3333 0.605842 13.3333C0.676484 13.3332 0.746572 13.3209 0.813054 13.297L3.27173 12.4024C4.15413 12.9253 5.14526 13.2374 6.16797 13.3145C7.19068 13.3916 8.21737 13.2315 9.16812 12.8467C10.1189 12.462 10.968 11.8629 11.6495 11.0962C12.3309 10.3295 12.8263 9.41584 13.097 8.42631C13.3677 7.43679 13.4064 6.39812 13.2102 5.39116C13.014 4.38421 12.5881 3.43614 11.9657 2.62076C11.3432 1.80538 10.5411 1.14469 9.62164 0.69013C8.7022 0.235568 7.69029 -0.000603608 6.66468 1.15855e-06Z" fill="#D0D0E6" />
        </svg>
      </div>
    </div>
  );
}

function FlashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9.33 2L4 8.67h3.33L6.67 14 12 7.33H8.67L9.33 2z" fill="#a888f7" />
    </svg>
  );
}

function ShowMoreArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#ebebf2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConditionIcon({ src, inset, clip }: { src: string; inset: string; clip?: boolean }) {
  return (
    <div className={`relative shrink-0 w-5 h-5 ${clip ? "overflow-clip" : ""}`}>
      <div className={`absolute ${inset}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block max-w-none w-full h-full" src={src} />
      </div>
    </div>
  );
}

function LotteryHeader() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const closeCurrency = useCallback(() => setCurrencyOpen(false), []);
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <header className="bg-surface-card h-14 flex items-center justify-between px-4 shadow-header shrink-0 relative z-10">
        <Link href="/casino" className="flex gap-2 items-center shrink-0" aria-label="Go to Casino">
          <div className="relative shrink-0 w-8 h-8">
            <div className="absolute inset-[3.13%]">
              <LogoSign />
            </div>
          </div>
        </Link>

        <div className="flex gap-2 items-center shrink-0">
          <motion.button
            className="bg-surface-sub flex gap-2 h-8 items-center p-2 rounded-[16px] shadow-header shrink-0 cursor-pointer"
            onClick={() => setCurrencyOpen(true)}
            aria-label="Open currency selector"
          >
            <div className="flex gap-1.5 items-center">
              <CurrencyIcon />
              <span className="font-bold text-lg text-secondary-3 whitespace-nowrap">7500.00</span>
            </div>
            <ArrowDownSmall />
          </motion.button>

          <Link href="/deposit">
            <motion.div
              whileTap={{ scale: MOTION.press.scale }}
              transition={MOTION.spring.stiff}
              aria-label="Deposit"
              className="bg-brand-500 flex flex-col items-center justify-center w-8 h-8 rounded-[20px] shrink-0"
            >
              <WalletBoldIcon />
            </motion.div>
          </Link>

          <motion.button
            whileTap={{ scale: MOTION.press.scale }}
            transition={MOTION.spring.stiff}
            onClick={() => setChatOpen((v) => !v)}
            aria-label="Messages"
            className="bg-surface-sub flex items-center justify-center w-8 h-8 rounded-[20px] shadow-header shrink-0"
          >
            <MessagesIcon />
          </motion.button>
        </div>
      </header>

      <CurrencyModal open={currencyOpen} onClose={closeCurrency} />
      <ChatPanel open={chatOpen} onClose={closeChat} />
    </>
  );
}

function LotteryBanner() {
  return (
    <div
      className="relative flex items-center justify-center overflow-clip rounded-[16px] w-full"
      style={{
        height: 152,
        background: "linear-gradient(to bottom, #E77341, #36282E)",
        boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex flex-1 flex-col gap-2 h-full items-start justify-center px-3 py-2">
        <p className="font-bold text-white text-[16px] leading-[18px]">
          Weekly Lottery
        </p>
        <p className="text-white text-md leading-[14px]">
          Sub text: is simply dummy text of the printing and typesetting
        </p>
      </div>
      <div className="overflow-clip shrink-0" style={{ width: 152, height: 152 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BANNER_IMG} alt="" className="block w-full h-full object-cover" />
      </div>
    </div>
  );
}

function ParticipatingPill() {
  return (
    <div
      className="flex gap-2 items-center p-3 rounded-[16px] w-full"
      style={{ height: 44, backgroundColor: "#2E2D49" }}
    >
      <ConditionIcon src={ICON.information} inset="inset-[6.26%_30.19%]" clip />
      <span className="text-lg leading-[16px] text-center whitespace-nowrap" style={{ color: "#36BCF2" }}>
        Participating
      </span>
    </div>
  );
}

function PrizeTimerBlock() {
  return (
    <div
      className="flex flex-col gap-4 items-start p-3 rounded-[16px] w-full"
      style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="text-lg text-primary-600 leading-[16px]">Prize pool</p>
        <div className="flex items-center p-3 rounded-[8px] w-full" style={{ backgroundColor: "#363555" }}>
          <p className="font-bold text-[20px] text-primary-600 leading-[23px] whitespace-nowrap">€120,566</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start w-full">
        <p className="text-lg text-primary-600 leading-[16px]">Ends in</p>
        <div className="flex gap-2 items-center w-full">
          <TimerBox value="02" />
          <p className="font-bold text-[20px] text-primary-600 leading-[23px] text-center">/</p>
          <TimerBox value="12" />
          <p className="font-bold text-[20px] text-primary-600 leading-[23px] text-center">:</p>
          <TimerBox value="37" />
          <p className="font-bold text-[20px] text-primary-600 leading-[23px] text-center">:</p>
          <TimerBox value="58" />
        </div>
      </div>
    </div>
  );
}

function TimerBox({ value }: { value: string }) {
  return (
    <div className="flex flex-1 items-center self-stretch">
      <div
        className="flex flex-1 h-full items-center justify-center p-3 rounded-[8px]"
        style={{ backgroundColor: "#363555" }}
      >
        <p className="font-bold text-[20px] text-primary-600 leading-[23px] whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}

function YourTicketsPill() {
  return (
    <div
      className="flex gap-2 items-center p-3 rounded-[16px] w-full"
      style={{ height: 44, backgroundColor: "#2E2D49" }}
    >
      <div className="relative shrink-0 w-5 h-5 overflow-clip">
        <div className="absolute inset-[1.68%_3.44%_6.02%_2.91%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute block max-w-none w-full h-full" src={ICON.ticket} />
        </div>
      </div>
      <span className="text-lg text-primary-400 leading-[16px]">Your tickets: 159</span>
    </div>
  );
}

function ConditionsBlock({ items }: { items: ConditionItem[] }) {
  return (
    <div
      className="flex flex-col items-start overflow-clip rounded-[16px] w-full"
      style={{ boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)" }}
    >
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center p-3 w-full" style={{ height: 44, backgroundColor: "#2E2D49" }}>
          <ConditionIcon src={item.src} inset={item.inset} clip={item.clip} />
          <p className="flex-1 text-lg text-primary-400 leading-[16px]">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 8L10 13L15 8" stroke="#ebebf2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LotteriesRules() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 items-end p-3 rounded-[16px] w-full"
      style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
    >
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        className="flex gap-2 items-center w-full"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex flex-1 flex-col justify-center min-h-px min-w-px">
          <p className="font-bold text-[16px] text-primary-600 leading-[18px] text-left">Lotteries Rules</p>
        </div>
        <motion.div
          className="shrink-0"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDownIcon />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="rules-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="h-px w-full mb-2" style={{ backgroundColor: "#363555" }} />
            <div className="text-[14px] text-primary-600 leading-[20px] w-full">
              <p className="mb-5">
                Adventure Quest commences from 00:00 GMT at the beginning of every calendar month and concludes at 23:59 GMT at the conclusion of every calendar month. At the conclusion of each calendar month all player progress will be eradicated and will not be carried over for future Adventure Quests. Players may participate in Adventure Quest by completing the challenges outlined in each mission. The minimum bet for all challenges is &pound;1. Any bets below this amount will not count toward the player&apos;s overall progress. Upon completing a challenge, the player will automatically advance to the next mission. Upon completing all missions, the player will be entered into the final standings displayed in a table on the Adventure Quest page. To be eligible to receive prizes, players must complete all 10 missions in Adventure Quest. This includes the final boss battle which the player must win to be eligible to receive a prize. If a player loses the final boss battle, they may attempt to immediately replay the mission as many times as they wish until they win. Challenges must be completed in sequence. Any challenges completed by the player prior to reaching the mission in question will not qualify toward the player&apos;s progress. Players who complete Adventure Quest will be ranked by the number of bets placed to complete all missions. The player with the fewest bets placed will be placed highest in the table. Players who have placed more than 50 bets will enable the option to &ldquo;restart the adventure&rdquo;. By activating this button, the player voluntarily forfeits all progress they have made in their current Adventure.
              </p>
              <p className="mb-5">
                Quest campaign and will start again from the first mission. At the conclusion of each Adventure Quest, all players will receive a &pound;20 non-deposit bonus which is available to claim on the Promo page within 3 days of completing the final mission. This bonus has a 30x wagering requirement with no qualification cap. These bonus funds must be wagered within 3 days of activation. Any funds remaining after this time will be cancelled. At the conclusion of each Adventure Quest, the top 50 players will receive the prize corresponding to their place in the final standings. These prizes will be available to claim from each player&apos;s Promo page in the form of bonus funds with a 20x wagering requirement. Should two (or more) players complete Adventure Quest with the same number of bets, the final position will be decided on which player finished first. The player who finished first will be placed above the player who finished second (and so on). Bonus funds awarded from the leaderboard must be wagered to completion within 72 hours of activation. Any funds remaining after this time will be cancelled. Game weighting applies. Wagers with cash or bonus funds which exceed 20% of the bonus awarded on a single spin will result in the funds being removed automatically. Bonus funds are subject to wagering contributions that vary across slots. For more information on game contributions please click here. To see the main terms and conditions for full bonus information please click here.
              </p>
              <p>
                <span>See </span>
                <span className="underline leading-[16px]">full T&amp;C</span>
                <span> for more info.</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WinnersSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <p className="font-bold text-[16px] text-primary-600 leading-[18px] w-full">Winners</p>

      <div className="-mx-4 w-[calc(100%+32px)]">
        <div className="flex gap-2 items-start overflow-x-auto scrollbar-hide px-4">
          <LeaderboardTable entries={TABLE_LEFT} />
          <LeaderboardTable entries={TABLE_RIGHT} />
        </div>
      </div>
    </div>
  );
}

function LeaderboardTable({ entries }: { entries: LBEntry[] }) {
  return (
    <div
      className="flex flex-col items-start overflow-clip rounded-[16px] shrink-0"
      style={{ width: 343, backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)" }}
    >
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1;
        const showBorder = !isLast && entry.type !== "yours";
        const textColor =
          entry.type === "muted" ? "#9292AA" :
          entry.type === "yours" ? "#A888F7" :
          "#EBEBF2";

        if (entry.type === "empty") {
          return (
            <div
              key={`empty-${i}`}
              className={`flex gap-2 items-center p-3 w-full ${showBorder ? "border-b border-[#363555]" : ""}`}
              style={{ height: 28 }}
            >
              <div className="w-[37px]">
                <p className="text-lg leading-[16px]" style={{ color: "#B5B5C5" }}>-</p>
              </div>
              <div className="flex-1">
                <p className="text-lg leading-[16px]" style={{ color: "#B5B5C5" }}>-</p>
              </div>
              <p className="text-lg leading-[16px]" style={{ color: "#B5B5C5" }}>-</p>
            </div>
          );
        }

        return (
          <div
            key={entry.name + i}
            className={`flex gap-2 items-center p-3 w-full ${showBorder ? "border-b border-[#363555]" : ""}`}
            style={entry.type === "yours" ? { backgroundColor: "#363555" } : undefined}
          >
            <div className="w-[37px]">
              <p className="text-lg leading-[16px]" style={{ color: textColor }}>{entry.rank}</p>
            </div>

            {entry.type === "yours" ? (
              <div className="flex flex-1 items-center gap-0 min-w-0">
                <span className="font-bold text-lg leading-[16px] whitespace-nowrap" style={{ color: textColor }}>
                  {entry.name}
                </span>
                <FlashIcon />
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-start justify-center min-w-0">
                <span className="font-bold text-lg leading-[16px] whitespace-nowrap" style={{ color: textColor }}>
                  {entry.name}
                </span>
                {entry.subtitle && (
                  <span className="text-md leading-[14px] whitespace-nowrap" style={{ color: textColor }}>
                    {entry.subtitle}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col items-end justify-center shrink-0">
              <span className="text-lg leading-[16px] whitespace-nowrap" style={{ color: textColor }}>
                {entry.score}
              </span>
              {entry.prize && (
                <span className="text-lg leading-[16px] whitespace-nowrap" style={{ color: textColor }}>
                  {entry.prize}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PreviousRoundsSection() {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <p className="font-bold text-[16px] text-primary-600 leading-[18px] w-full">Previous Rounds</p>
      <div className="grid grid-cols-3 gap-2 w-full">
        {ROUND_DATES.map((date) => (
          <motion.button
            key={date}
            whileTap={{ scale: MOTION.press.scale }}
            className="flex items-center justify-center h-10 rounded-[8px]"
            style={{
              backgroundColor: "#2E2D49",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
            }}
          >
            <span className="underline text-lg text-primary-400 leading-[16px] whitespace-nowrap">
              {date}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function LotteryFooter() {
  return (
    <div
      className="flex flex-col gap-6 items-center p-3 rounded-[16px] w-full"
      style={{ backgroundColor: "#26253C", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="font-bold text-[16px] text-primary-600 leading-[18px] w-full">
          Vegangster Casino: Your Ultimate Online Casino Experience
        </p>
        <p className="text-lg text-primary-400 leading-[20px] w-full">
          Welcome to Vegangster Casino, where we redefine what an online casino should be. Our platform
          offers an exhilarating blend of top-notch casino games, rewarding promotions, and first-rate
          customer service. Join us today for an unparalleled gambling experience.
        </p>
        <button className="flex gap-1 h-6 items-center justify-center">
          <span className="font-bold text-lg text-primary-600 leading-[16px] text-center whitespace-nowrap">
            Show More
          </span>
          <ShowMoreArrowIcon />
        </button>
      </div>

      <div className="h-px w-full" style={{ backgroundColor: "#363555" }} />

      <div className="flex flex-col gap-6 items-center w-full">
        <div className="flex flex-wrap gap-6 items-center justify-center w-full">
          <span className="text-[16px] leading-[18px]" style={{ color: "#A888F7" }}>
            Terms and Conditions
          </span>
          <span className="text-[16px] text-primary-600 leading-[18px]">Privacy Policy</span>
          <span className="text-[16px] text-primary-600 leading-[18px]">Contact Us</span>
          <span className="text-[16px] text-primary-600 leading-[18px]">Betting Rules</span>
          <span className="text-[16px] text-primary-600 leading-[18px]">VIP Loyalty Program</span>
        </div>

        <div className="flex gap-6 items-start">
          <div className="overflow-clip relative shrink-0 w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Instagram" className="absolute block max-w-none w-full h-full" src={SOCIAL.instagram} />
          </div>
          <div className="relative shrink-0 w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute block max-w-none w-full h-full" src={SOCIAL.twitterBg} />
            <div className="absolute inset-[28.13%_27.98%_28.13%_28.18%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Twitter" className="absolute block max-w-none w-full h-full" src={SOCIAL.twitterIcon} />
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Telegram" className="absolute block max-w-none w-full h-full" src={SOCIAL.telegram} />
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ backgroundColor: "#363555" }} />

      <div className="flex flex-wrap gap-8 items-start justify-center w-full">
        <div className="relative shrink-0 w-6 h-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute block max-w-none w-full h-full" src={FOOTER_LOGOS.badge} />
        </div>
        <div className="relative shrink-0 h-6" style={{ width: 50.77 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute block max-w-none w-full h-full" src={FOOTER_LOGOS.therapy} />
        </div>
      </div>

      <div className="h-px w-full" style={{ backgroundColor: "#363555" }} />

      <p className="text-lg text-primary-400 leading-[20px] w-full">
        © 2024 Your Casino. All rights reserved. Licensed and regulated by [Licensing Authority], License
        Number [000000].
      </p>
    </div>
  );
}

export default function LotteryContent() {
  return (
    <>
      <LotteryHeader />

      <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#1F1E2E" }}>
        <div className="flex flex-col gap-6 items-start justify-center p-4 w-full">
          <div className="flex flex-col gap-4 items-start w-full">
            <LotteryBanner />
            <ParticipatingPill />
            <PrizeTimerBlock />
            <YourTicketsPill />
            <ConditionsBlock items={CONDITIONS} />
          </div>

          <LotteriesRules />
          <WinnersSection />
          <PreviousRoundsSection />
          <LotteryFooter />
        </div>
      </main>
    </>
  );
}
