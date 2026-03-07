"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface CurrencyBalance {
  icon: React.ReactNode;
  code: string;
  amount: string;
  equivalent?: string;
  highlighted?: boolean;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6816 0.318188C15.2574 -0.106063 14.5695 -0.106063 14.1453 0.318189L7.99994 6.46356L1.85472 0.318315C1.43047 -0.105936 0.742627 -0.105936 0.318378 0.318315C-0.105872 0.742567 -0.105872 1.43041 0.318378 1.85467L6.46359 7.9999L0.318187 14.1453C-0.106062 14.5696 -0.106062 15.2574 0.318187 15.6817C0.742437 16.1059 1.43028 16.1059 1.85453 15.6817L7.99994 9.53625L14.1455 15.6818C14.5697 16.1061 15.2576 16.1061 15.6818 15.6818C16.1061 15.2576 16.1061 14.5697 15.6818 14.1455L9.53628 7.99991L15.6816 1.85454C16.1059 1.43029 16.1059 0.742439 15.6816 0.318188Z"
        fill="#EBEBF2"
      />
    </svg>
  );
}

function VbuckIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6 overflow-hidden rounded-full">
      <img src="/currency/vbuck.png" alt="" className="absolute w-[118%] h-[120%] -left-[9%] -top-[9%] max-w-none" />
    </div>
  );
}

function EurIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6 overflow-clip">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#003399" />
      </svg>
      <div className="absolute bottom-[18.75%] left-1/4 right-[31.25%] top-[18.75%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 7 10" fill="none">
          <path d="M4.72093 10C4.31395 10 3.93863 9.94942 3.59496 9.84828C3.25129 9.73793 2.93928 9.58161 2.65892 9.37931C2.37855 9.17701 2.13437 8.93333 1.92636 8.64828C1.71835 8.35402 1.55103 8.02299 1.42442 7.65517C1.2978 7.28736 1.21641 6.88736 1.18023 6.45517C1.16214 6.12414 1.14858 5.7931 1.13953 5.46207C1.13049 5.13103 1.12597 4.8046 1.12597 4.48276C1.13501 4.15172 1.14406 3.82988 1.1531 3.51724C1.19832 3.03908 1.29328 2.61149 1.43798 2.23448C1.59173 1.84828 1.78165 1.51724 2.00775 1.24138C2.24289 0.965517 2.50065 0.735632 2.78101 0.551724C3.07041 0.367816 3.37791 0.229885 3.70349 0.137931C4.03811 0.045977 4.37726 0 4.72093 0H6.25388C6.38954 0 6.51163 0.0183906 6.62016 0.0551723C6.73773 0.0827581 6.82817 0.156321 6.89147 0.275862C6.96382 0.386207 7 0.570115 7 0.827586C7 1.07586 6.96382 1.25977 6.89147 1.37931C6.81912 1.49885 6.71964 1.57241 6.59302 1.6C6.47545 1.62759 6.33979 1.64138 6.18605 1.64138H4.72093C4.52196 1.64138 4.33204 1.66437 4.15116 1.71034C3.97028 1.74713 3.79845 1.81149 3.63566 1.90345C3.48191 1.9954 3.34625 2.11034 3.22868 2.24828C3.11111 2.38621 3.01163 2.55172 2.93023 2.74483C2.85788 2.92874 2.81266 3.14483 2.79457 3.3931C2.76744 3.72414 2.74935 4.05977 2.74031 4.4C2.73127 4.74023 2.73127 5.08046 2.74031 5.42069C2.74935 5.75172 2.76744 6.07816 2.79457 6.4C2.82171 6.66667 2.87145 6.90575 2.9438 7.11724C3.01615 7.32874 3.10659 7.51264 3.21512 7.66897C3.32364 7.82529 3.45026 7.95862 3.59496 8.06896C3.74871 8.17011 3.91602 8.24828 4.0969 8.30345C4.28682 8.34943 4.49483 8.37241 4.72093 8.37241H6.19961C6.35336 8.37241 6.48902 8.3908 6.60659 8.42759C6.7332 8.45517 6.82817 8.52874 6.89147 8.64828C6.96382 8.75862 7 8.94253 7 9.2C7 9.43908 6.96835 9.61839 6.90504 9.73793C6.84173 9.84828 6.75129 9.91724 6.63372 9.94483C6.52519 9.98161 6.40762 10 6.28101 10H4.72093ZM0.596899 6.63448C0.488372 6.63448 0.388889 6.62529 0.29845 6.6069C0.20801 6.57931 0.135659 6.52414 0.0813954 6.44138C0.0271318 6.34943 0 6.2069 0 6.01379C0 5.82989 0.0271318 5.69655 0.0813954 5.61379C0.135659 5.53103 0.20801 5.48046 0.29845 5.46207C0.388889 5.43448 0.48385 5.42069 0.583333 5.42069H5.72481C5.83333 5.42069 5.92829 5.43448 6.00969 5.46207C6.10013 5.48046 6.17248 5.53563 6.22674 5.62759C6.28101 5.71034 6.30814 5.84368 6.30814 6.02759C6.30814 6.21149 6.28101 6.34943 6.22674 6.44138C6.18152 6.52414 6.1137 6.57931 6.02326 6.6069C5.93282 6.62529 5.82881 6.63448 5.71124 6.63448H0.596899ZM0.596899 4.46896C0.488372 4.46896 0.388889 4.45977 0.29845 4.44138C0.20801 4.41379 0.135659 4.35862 0.0813954 4.27586C0.0271318 4.18391 0 4.04598 0 3.86207C0 3.67816 0.0271318 3.54483 0.0813954 3.46207C0.135659 3.37011 0.20801 3.31494 0.29845 3.29655C0.388889 3.26897 0.48385 3.25517 0.583333 3.25517H5.72481C5.83333 3.25517 5.92829 3.26897 6.00969 3.29655C6.10013 3.31494 6.17248 3.37011 6.22674 3.46207C6.28101 3.54483 6.30814 3.68276 6.30814 3.87586C6.30814 4.05977 6.28101 4.1931 6.22674 4.27586C6.18152 4.35862 6.1137 4.41379 6.02326 4.44138C5.93282 4.45977 5.82881 4.46896 5.71124 4.46896H0.596899Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function BtcIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6 overflow-clip">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#FF9D00" />
      </svg>
      <div className="absolute bottom-[18.75%] left-1/4 right-[29.65%] top-[18.75%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 10 14" fill="none">
          <path d="M6.96 5.908C7.44 5.628 7.8 5.124 7.8 4.452C7.8 3.088 6.68 2.464 5.32 2.312V0.5H4.04V2.268H3.24V0.5H1.96V2.268H0.2V3.5H1.36C1.68 3.5 1.84 3.66 1.84 3.888V9.94C1.84 10.22 1.68 10.36 1.4 10.36H0.36L0.2 11.74H1.96V13.5H3.24V11.74H4.04V13.5H5.32V11.7C7.08 11.532 8.48 10.808 8.48 9.1C8.48 7.82 7.72 6.288 6.96 5.908ZM3.84 3.5H5.08C5.8 3.5 6.24 3.84 6.24 4.48C6.24 5.12 5.72 5.528 5.08 5.528H3.84V3.5ZM5.32 10.36H3.84V7.18H5.28C6.28 7.18 6.84 7.68 6.84 8.74C6.84 9.66 6.24 10.36 5.32 10.36Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function EthIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6 overflow-clip">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#ACB7DD" />
      </svg>
      <div className="absolute bottom-[12.5%] left-1/4 right-[28.85%] top-[12.5%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 8 12" fill="none">
          <path d="M3.99 0L0 6.12L3.99 8.3L8 6.12L3.99 0Z" fill="white" fillOpacity="0.8" />
          <path d="M0 6.82L3.99 12L8 6.82L3.99 9L0 6.82Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function UsdtIcon() {
  return (
    <div className="relative shrink-0 w-6 h-6 overflow-clip">
      <svg className="absolute block w-full h-full" viewBox="0 0 16 16" fill="none">
        <path d="M8 0C12.4181 0 16 3.58192 16 8C16 12.4181 12.4179 16 8 16C3.58208 16 0 12.419 0 8C0 3.58096 3.58144 0 8 0Z" fill="#53AE94" />
      </svg>
      <div className="absolute inset-[24.57%_19.65%_19.53%_19.65%]">
        <svg className="absolute block w-full h-full" viewBox="0 0 10 9" fill="none">
          <path d="M5.54 4.68C5.5 4.68 5.3 4.7 4.98 4.7C4.72 4.7 4.48 4.68 4.4 4.68C2.32 4.58 0.78 4.2 0.78 3.74C0.78 3.28 2.32 2.9 4.4 2.8V4.38C4.48 4.38 4.72 4.4 4.98 4.4C5.3 4.4 5.5 4.38 5.54 4.38V2.8C7.62 2.9 9.14 3.28 9.14 3.74C9.14 4.2 7.62 4.58 5.54 4.68ZM5.54 2.64V1.22H7.98V0H1.96V1.22H4.4V2.64C2.02 2.76 0.26 3.24 0.26 3.82C0.26 4.4 2.02 4.88 4.4 5V8.72H5.54V5C7.92 4.88 9.68 4.4 9.68 3.82C9.68 3.24 7.92 2.76 5.54 2.64Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative w-[34px] h-[20px] rounded-[10px] shrink-0 transition-colors duration-200"
      style={{ backgroundColor: checked ? "#8352FF" : "#6d6d92" }}
    >
      <motion.div
        className="absolute top-1/2 w-4 h-4 rounded-full bg-white shadow"
        style={{ y: "-50%" }}
        animate={{ left: checked ? 16 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
    </button>
  );
}

function CurrencyRow({ balance }: { balance: CurrencyBalance }) {
  return (
    <div
      className={`flex items-center justify-between p-2 w-full h-[46px] ${
        balance.highlighted ? "bg-[#363555] rounded-[8px]" : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        {balance.icon}
        <span className="font-bold text-lg text-[#b5b5c5] leading-4">{balance.code}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold text-lg text-[#ebebf2] leading-4">{balance.amount}</span>
        {balance.equivalent && (
          <span className="text-md text-[#b5b5c5] leading-[14px]">{balance.equivalent}</span>
        )}
      </div>
    </div>
  );
}

const SHEET_VARIANTS = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
  exit: { y: "100%", transition: { duration: 0.25, ease: MOTION.easing.accelerate } },
};

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const CURRENCIES: { section?: string; balances: CurrencyBalance[] }[] = [
  {
    balances: [
      { icon: <VbuckIcon />, code: "VBUCK", amount: "123,568.00" },
    ],
  },
  {
    section: "Fiat",
    balances: [
      { icon: <EurIcon />, code: "EUR", amount: "7500.00", highlighted: true },
    ],
  },
  {
    section: "Crypto",
    balances: [
      { icon: <BtcIcon />, code: "mBTC", amount: "3.2340", equivalent: "≈178962.45 EUR" },
      { icon: <EthIcon />, code: "ETH", amount: "2.238414", equivalent: "≈5784.60 EUR" },
      { icon: <UsdtIcon />, code: "USDT", amount: "0.000000" },
    ],
  },
];

export function CurrencyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hideSmall, setHideSmall] = React.useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 80 || info.velocity.y > 300) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-[375px] mx-auto">
          <motion.div
            className="absolute inset-0 bg-black/60"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            ref={sheetRef}
            className="relative bg-[#1f1e2e] rounded-t-[12px] flex flex-col pt-6 pb-8 px-6 gap-4 max-h-[85vh] overflow-y-auto"
            variants={SHEET_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-end">
              <motion.button
                whileTap={{ scale: MOTION.press.scale }}
                onClick={onClose}
                aria-label="Close"
                className="w-6 h-6 flex items-center justify-center"
              >
                <CloseIcon />
              </motion.button>
            </div>

            <h2 className="text-xl font-bold text-[#ebebf2] leading-[21px]">Currency</h2>

            <div className="flex flex-col gap-4 w-full">
              {CURRENCIES.map((group, gi) => (
                <div key={gi} className="flex flex-col gap-2 w-full">
                  {group.section && (
                    <span className="text-lg text-[#9292aa] leading-5">{group.section}</span>
                  )}
                  {group.balances.map((b, bi) => (
                    <CurrencyRow key={bi} balance={b} />
                  ))}
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-[#363555]" />

            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 items-center">
                <ToggleSwitch checked={hideSmall} onChange={setHideSmall} />
                <span className="text-lg text-[#b5b5c5] leading-4">Hide small balance</span>
              </div>
              <motion.button
                whileTap={{ scale: MOTION.press.scale }}
                className="text-lg font-bold text-[#ebebf2] leading-4"
              >
                Add Currency
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
