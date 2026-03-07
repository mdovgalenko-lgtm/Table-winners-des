"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MOTION } from "@/lib/motion";

const imgVegArt =
  "https://www.figma.com/api/mcp/asset/815fb8b9-f6c6-4437-a6b4-871f5add9984";

const imgCoins =
  "https://www.figma.com/api/mcp/asset/48979bbe-52ec-4581-818d-6c26c3b9c067";

const imgArrowRight =
  "https://www.figma.com/api/mcp/asset/e3f67116-083e-4432-9d09-7cbb28ccc577";

const STATUS_IMAGES: Record<string, string> = {
  novice_active: "https://www.figma.com/api/mcp/asset/658bc5c9-f02d-43a7-ba09-6bc55bafdda7",
  regular: "https://www.figma.com/api/mcp/asset/0ceb06fb-536a-4d22-bcf1-2cfd4ab0fae0",
  bronze: "https://www.figma.com/api/mcp/asset/c31b85a2-92d9-4b21-96c3-61c0901ecab9",
  silver: "https://www.figma.com/api/mcp/asset/182c112a-5a61-4f5a-8df0-f5d048c1a394",
  gold: "https://www.figma.com/api/mcp/asset/e5dc6665-7845-4745-86e5-bbcf766ee811",
  platinum: "https://www.figma.com/api/mcp/asset/52f5adfd-4d86-4fbd-b542-3dd839b333db",
  ultimate: "https://www.figma.com/api/mcp/asset/bd3eeee1-e151-402f-8411-7004a36fd7b7",
};

const imgLock =
  "https://www.figma.com/api/mcp/asset/c834f0bf-0349-4a31-b6c9-5ffece746d7e";

interface StatusDef {
  key: string;
  label: string;
  active: boolean;
}

const STATUSES: StatusDef[] = [
  { key: "novice_active", label: "Novice", active: true },
  { key: "regular", label: "Regular", active: false },
  { key: "bronze", label: "Bronze", active: false },
  { key: "silver", label: "Silver", active: false },
  { key: "gold", label: "Gold", active: false },
  { key: "platinum", label: "Platinum", active: false },
  { key: "ultimate", label: "Ultimate", active: false },
];

interface BenefitRow {
  label: string;
  value: string;
}

const BENEFITS: BenefitRow[] = [
  { label: "Rebate", value: "0.1%" },
  { label: "Rebate Frequency", value: "1/month" },
  { label: "Cashback", value: "10%(x5)" },
  { label: "Cashback Frequency", value: "1/month" },
  { label: "Lossback", value: "10%" },
  { label: "Lossback Frequency", value: "2/month" },
];

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6816 0.318188C15.2574 -0.106063 14.5695 -0.106063 14.1453 0.318189L7.99994 6.46356L1.85472 0.318315C1.43047 -0.105936 0.742627 -0.105936 0.318378 0.318315C-0.105872 0.742567 -0.105872 1.43041 0.318378 1.85467L6.46359 7.9999L0.318187 14.1453C-0.106062 14.5696 -0.106062 15.2574 0.318187 15.6817C0.742437 16.1059 1.43028 16.1059 1.85453 15.6817L7.99994 9.53625L14.1455 15.6818C14.5697 16.1061 15.2576 16.1061 15.6818 15.6818C16.1061 15.2576 16.1061 14.5697 15.6818 14.1455L9.53628 7.99991L15.6816 1.85454C16.1059 1.43029 16.1059 0.742439 15.6816 0.318188Z"
        fill="#EBEBF2"
      />
    </svg>
  );
}

function StatusTab({ status, selected, onSelect }: { status: StatusDef; selected: boolean; onSelect: () => void }) {
  const imgSrc = STATUS_IMAGES[status.key];

  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      onClick={onSelect}
      className={`flex flex-col gap-2 items-center justify-center p-2 rounded-[16px] shrink-0 ${
        selected ? "shadow-[0px_1px_5px_0px_rgba(0,0,0,0.15)]" : ""
      }`}
      style={{
        width: 86,
        backgroundColor: selected ? "#2E2D49" : "transparent",
      }}
    >
      <div className="relative shrink-0 overflow-clip" style={{ width: 48, height: 48 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={imgSrc}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!status.active && (
          <div
            className="absolute inset-0 overflow-clip rounded-[100px] flex items-center justify-center"
            style={{ backgroundColor: "#363555", opacity: 0.8 }}
          >
            <div className="relative" style={{ width: 16, height: 16 }}>
              <div className="absolute" style={{ inset: "8.33% 8.33% 5.21% 8.33%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute block max-w-none w-full h-full" src={imgLock} />
              </div>
            </div>
          </div>
        )}
      </div>
      <span className="text-md text-primary-600 text-center leading-[14px]">{status.label}</span>
    </motion.button>
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

export function LoyaltyProgramModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState(0);

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
            className="relative bg-[#1f1e2e] rounded-t-[12px] flex flex-col gap-4 pt-6 pb-8 px-6 max-h-[85vh] overflow-y-auto"
            variants={SHEET_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center justify-end w-full">
              <motion.button
                whileTap={{ scale: MOTION.press.scale }}
                onClick={onClose}
                aria-label="Close"
                className="w-6 h-6 flex items-center justify-center"
              >
                <CloseIcon />
              </motion.button>
            </div>

            <p className="text-[18px] font-bold text-primary-600 leading-[21px] w-full">
              Loyalty Program
            </p>

            <div
              className="flex flex-col items-start p-3 rounded-[16px] w-full"
              style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
            >
              <div className="relative w-full" style={{ height: 177 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={imgVegArt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex items-center w-full overflow-x-auto scrollbar-hide">
              {STATUSES.map((s, i) => (
                <StatusTab
                  key={s.key}
                  status={s}
                  selected={i === selectedTab}
                  onSelect={() => setSelectedTab(i)}
                />
              ))}
            </div>

            <div
              className="flex flex-col items-start p-3 rounded-[16px] w-full"
              style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
            >
              <div className="flex gap-1 items-start w-full">
                <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
                  <div className="absolute" style={{ inset: "18.55% 3.94% 18.56% 3.95%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="absolute block max-w-none w-full h-full" src={imgCoins} />
                  </div>
                </div>
                <span className="flex-1 text-[14px] text-primary-400 leading-[16px]">Bets</span>
                <span className="font-bold text-[14px] text-primary-600 text-center leading-[16px] whitespace-nowrap">
                  €300 (23,5%)
                </span>
              </div>
            </div>

            <div
              className="flex flex-col gap-4 items-end p-3 rounded-[16px] w-full"
              style={{ backgroundColor: "#2E2D49", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
            >
              <p className="text-[16px] font-bold text-primary-600 leading-[18px] w-full">Benefits</p>

              <div className="h-px w-full" style={{ backgroundColor: "#363555" }} />

              {BENEFITS.map((row) => (
                <div key={row.label} className="flex gap-1 items-center w-full text-[14px] leading-[16px]">
                  <span className="flex-1 text-primary-400">{row.label}</span>
                  <span className="font-bold text-primary-600 text-center whitespace-nowrap">{row.value}</span>
                </div>
              ))}

              <div className="h-px w-full" style={{ backgroundColor: "#363555" }} />

              <div className="flex gap-1 h-6 items-center justify-center overflow-clip rounded-[20px]">
                <span className="font-bold text-[14px] text-primary-600 text-center leading-[16px] whitespace-nowrap">
                  Learn More
                </span>
                <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
                  <div className="absolute" style={{ inset: "16.67% 8.33%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="absolute block max-w-none w-full h-full" src={imgArrowRight} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
