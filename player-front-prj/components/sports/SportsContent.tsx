"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { CurrencyModal } from "@/components/shared/CurrencyModal";
import { ChatPanel } from "@/components/shared/ChatPanel";

const IMG = {
  homePageMob: "https://www.figma.com/api/mcp/asset/81bc6561-65a0-4839-9e72-929acca79172",
  progressBar: "https://www.figma.com/api/mcp/asset/5fef62d2-b77a-4a80-b633-ad842bfd4039",
  trophyIcon: "https://www.figma.com/api/mcp/asset/e8453f9f-7fa0-47c4-9aec-bfa6d783959a",
  twoArrow: "https://www.figma.com/api/mcp/asset/27678ab2-6ad5-4626-a3db-6ee02eed96b0",
};

function LogoSign() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0605 22.8928L19.6852 16.946H16.9976L13.1961 12.3288H30L16.0291 29.7583C15.908 29.9033 15.7143 30 15.5206 30H14.6489C14.4552 30 14.2615 29.9033 14.1404 29.7583L0 12.2079H6.58596L15.0363 22.8445V22.8928H15.0605ZM20.7748 5.39081H9.27361L6.58596 9.6938H0.0726392L5.01211 0.725222C5.15738 0.314263 5.52058 0 5.98063 0H24.0678C24.5278 0 24.891 0.314263 25.0363 0.725222L29.9758 9.71797H23.4867L20.799 5.41499H20.7506L20.7748 5.39081Z"
        fill="url(#logo_grad)"
      />
      <defs>
        <linearGradient id="logo_grad" x1="15" y1="0" x2="15" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6DDF" />
          <stop offset="1" stopColor="#8352FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 w-4 h-4">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <circle cx="8" cy="8" r="8" fill="#003399" />
      </svg>
      <div className="absolute bottom-[18.75%] left-1/4 right-[31.25%] top-[18.75%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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
        <svg className="absolute block w-full h-full" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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
        <svg className="absolute block w-full h-full" viewBox="0 0 12.6667 13.3" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
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
        <svg className="absolute block w-full h-full" viewBox="0 0 13.3333 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M6.66468 1.15855e-06C5.48866 -0.000526407 4.33346 0.310368 3.31646 0.901091C2.29947 1.49181 1.45693 2.34131 0.874466 3.36326C0.292003 4.3852 -0.00962458 5.54317 0.000234148 6.7195C0.0100929 7.89582 0.331086 9.04857 0.930596 10.0606L0.0369172 12.52C0.00361815 12.6115 -0.0071403 12.7097 0.00555309 12.8063C0.0182465 12.9028 0.0540178 12.9949 0.109837 13.0747C0.165657 13.1545 0.23988 13.2197 0.326221 13.2647C0.412562 13.3097 0.508477 13.3333 0.605842 13.3333C0.676484 13.3332 0.746572 13.3209 0.813054 13.297L3.27173 12.4024C4.15413 12.9253 5.14526 13.2374 6.16797 13.3145C7.19068 13.3916 8.21737 13.2315 9.16812 12.8467C10.1189 12.462 10.968 11.8629 11.6495 11.0962C12.3309 10.3295 12.8263 9.41584 13.097 8.42631C13.3677 7.43679 13.4064 6.39812 13.2102 5.39116C13.014 4.38421 12.5881 3.43614 11.9657 2.62076C11.3432 1.80538 10.5411 1.14469 9.62164 0.69013C8.7022 0.235568 7.69029 -0.000603608 6.66468 1.15855e-06Z" fill="#D0D0E6" />
        </svg>
      </div>
    </div>
  );
}

function WidgetBets() {
  return (
    <div
      className="absolute rounded-[6px]"
      style={{
        width: 104,
        height: 104,
        left: 8,
        top: 560,
        backgroundColor: "#2E2D49",
        boxShadow: "0px -4px 10px 0px rgba(0,0,0,0.05), 0px 14px 20px 0px rgba(0,0,0,0.2)",
      }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-[8px]" style={{ width: 88, height: 88 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.progressBar} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[30px]" style={{ width: 32, height: 32 }}>
        <div className="absolute inset-[8.33%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.trophyIcon} />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[70px] flex flex-col items-center whitespace-nowrap">
        <span className="font-bold text-[14px] text-primary-600 leading-[16px]">0/2</span>
        <span className="text-[12px] text-primary-400 leading-[14px] text-center">Bets</span>
      </div>

      <div
        className="absolute top-0 flex items-center justify-between p-1 rounded-tr-[6px] rounded-br-[6px]"
        style={{ right: -12, width: 24, backgroundColor: "#2E2D49" }}
      >
        <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
          <div className="absolute inset-[12.5%_11.05%_11.83%_12.5%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.twoArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SportsContent() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const closeCurrency = useCallback(() => setCurrencyOpen(false), []);
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <header className="z-50 bg-surface-header h-14 flex items-center justify-between px-4 shadow-header shrink-0">
        <Link href="/casino" className="flex gap-2 items-center shrink-0" aria-label="Go to Casino">
          <div className="relative shrink-0 w-8 h-8">
            <div className="absolute inset-[3.13%]">
              <LogoSign />
            </div>
          </div>
        </Link>

        <div className="flex gap-2 items-center shrink-0">
          <motion.button
            whileTap={{ scale: MOTION.press.scale }}
            transition={MOTION.spring.stiff}
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

      <main className="flex-1 overflow-y-auto relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sports page"
          className="w-full h-auto block"
          src={IMG.homePageMob}
        />
        <WidgetBets />
      </main>

      <CurrencyModal open={currencyOpen} onClose={closeCurrency} />
      <ChatPanel open={chatOpen} onClose={closeChat} />
    </>
  );
}
