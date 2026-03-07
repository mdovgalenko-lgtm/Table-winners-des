"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MOTION } from "@/lib/motion";

/* ─── Types ─── */

export interface CashBonus {
  id: string;
  title: string;
  badge: { line1: string; line2: string };
  details: { label: string; value: string }[];
  validFor: { days?: string; time: string };
}

export const CASH_BONUSES: CashBonus[] = [
  {
    id: "live-roulette",
    title: "Live Roulette",
    badge: { line1: "€10", line2: "Voucher" },
    details: [
      { label: "Deposit from:", value: "€20" },
      { label: "Wager:", value: "x20" },
    ],
    validFor: { days: "364d", time: "14h 23m" },
  },
  {
    id: "first-deposit",
    title: "First deposit bonus",
    badge: { line1: "Ultimate", line2: "Status" },
    details: [
      { label: "Bonus:", value: "50% - 200%" },
      { label: "Deposit from:", value: "€20" },
      { label: "Wager:", value: "x25 - x30" },
    ],
    validFor: { days: "23d", time: "14h 23m" },
  },
  {
    id: "limited-time",
    title: "Limited Time Status",
    badge: { line1: "Next 20", line2: "Free Spins" },
    details: [
      { label: "Cashback:", value: "10%" },
      { label: "Rebate:", value: "0.2%" },
      { label: "Deposit from:", value: "€2000" },
      { label: "Period:", value: "10 day" },
    ],
    validFor: { days: "09d", time: "14h 23m" },
  },
];

export const ADDITIONAL_BONUSES: CashBonus[] = [
  {
    id: "freespins-mania",
    title: "Freespins mania",
    badge: { line1: "Next 20", line2: "Free Spins" },
    details: [
      { label: "Bets required:", value: "€56" },
      { label: "Bets completed:", value: "x42" },
    ],
    validFor: { time: "14h 23m" },
  },
  {
    id: "add-first-deposit",
    title: "First deposit bonus",
    badge: { line1: "Ultimate", line2: "Status" },
    details: [
      { label: "Bonus:", value: "50% - 200%" },
      { label: "Deposit from:", value: "€20" },
      { label: "Wager:", value: "x25 - x30" },
    ],
    validFor: { days: "23d", time: "14h 23m" },
  },
  {
    id: "add-limited-time",
    title: "Limited Time Status",
    badge: { line1: "Next 20", line2: "Free Spins" },
    details: [
      { label: "Cashback:", value: "10%" },
      { label: "Rebate:", value: "0.2%" },
      { label: "Deposit from:", value: "€2000" },
      { label: "Period:", value: "10 day" },
    ],
    validFor: { days: "09d", time: "14h 23m" },
  },
];

/* ─── Inline SVGs ─── */

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.68.318a1.086 1.086 0 00-1.536 0L8 6.464 1.855.318A1.086 1.086 0 00.318.318a1.086 1.086 0 000 1.537L6.464 8 .318 14.145a1.086 1.086 0 001.537 1.537L8 9.536l6.145 6.146a1.086 1.086 0 001.537-1.537L9.536 8l6.145-6.145a1.086 1.086 0 000-1.537z"
        fill="#EBEBF2"
      />
    </svg>
  );
}

function PolygonBack() {
  return (
    <svg width="84" height="76" viewBox="0 0 84 76" fill="none">
      <path
        d="M42 2L79 20.5V57.5L42 76L5 57.5V20.5L42 2Z"
        stroke="#8352FF"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  );
}

function PolygonFront() {
  return (
    <svg width="100" height="96" viewBox="0 0 100 96" fill="none">
      <path
        d="M50 0L97 24V72L50 96L3 72V24L50 0Z"
        stroke="#8352FF"
        strokeWidth="2"
        strokeOpacity="0.5"
        fill="none"
      />
    </svg>
  );
}

function RadioEmpty() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#6d6d92" strokeWidth="2" />
    </svg>
  );
}

function RadioFilled() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#8352FF" />
      <circle cx="8" cy="8" r="3" fill="white" />
    </svg>
  );
}

/* ─── Gift Badge ─── */

function GiftBadge({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div
      className="relative shrink-0 overflow-clip rounded-[16px]"
      style={{ width: 100, height: 128, backgroundColor: "#363555" }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PolygonBack />
      </div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-[10px] text-center text-md text-primary-600 leading-[14px]"
        style={{ width: 86, height: 54, backgroundColor: "#363555" }}
      >
        <span>{line1}</span>
        <span>{line2}</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PolygonFront />
      </div>
    </div>
  );
}

/* ─── Countdown Pill ─── */

function CountdownPill({ text }: { text: string }) {
  return (
    <div
      className="flex items-center justify-center px-2 py-1 rounded-[4px] text-md text-primary-600 text-center leading-[14px]"
      style={{ backgroundColor: "rgba(146,146,170,0.2)" }}
    >
      {text}
    </div>
  );
}

/* ─── Bonus Card ─── */

function BonusCard({
  bonus,
  selected,
  onSelect,
}: {
  bonus: CashBonus;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: MOTION.press.scale }}
      className="relative flex gap-3 items-start p-3 w-full rounded-[20px] border-2 border-solid text-left"
      style={{
        borderColor: selected ? "#8352FF" : "#363555",
        transition: "border-color 0.2s ease",
      }}
    >
      <GiftBadge line1={bonus.badge.line1} line2={bonus.badge.line2} />

      <div className="flex flex-1 flex-col items-start min-w-0">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-[16px] font-bold text-primary-600 leading-[18px] whitespace-nowrap">
            {bonus.title}
          </span>
          {bonus.details.map((d, i) => (
            <div key={i} className="flex gap-1 items-start text-lg text-center whitespace-nowrap">
              <span className="text-primary-400 leading-[16px]">{d.label}</span>
              <span className="text-primary-600 leading-[16px]">{d.value}</span>
            </div>
          ))}
          <div className="flex gap-1 items-center">
            <span className="text-lg text-primary-400 text-center leading-[16px] whitespace-nowrap">
              Valid for:
            </span>
            <div className="flex gap-1 items-center">
              {bonus.validFor.days && <CountdownPill text={bonus.validFor.days} />}
              <CountdownPill text={bonus.validFor.time} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10px] right-3">
        {selected ? <RadioFilled /> : <RadioEmpty />}
      </div>
    </motion.button>
  );
}

/* ─── Animation Variants ─── */

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

/* ─── Modal ─── */

export function BonusSelectionModal({
  open,
  onClose,
  onConfirm,
  initialSelected,
  title,
  bonuses,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (bonus: CashBonus) => void;
  initialSelected?: string | null;
  title: string;
  bonuses: CashBonus[];
}) {
  const [selectedId, setSelectedId] = React.useState<string | null>(
    initialSelected ?? null
  );
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSelectedId(initialSelected ?? null);
    }
  }, [open, initialSelected]);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 80 || info.velocity.y > 300) {
        onClose();
      }
    },
    [onClose]
  );

  const handleConfirm = useCallback(() => {
    const bonus = bonuses.find((b) => b.id === selectedId);
    if (bonus) {
      onConfirm(bonus);
    }
  }, [selectedId, onConfirm, bonuses]);

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
            style={{ boxShadow: "0px -4px 7px 0px rgba(0,0,0,0.05)" }}
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

            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-[16px] font-bold text-primary-600 leading-[18px] w-full">
                {title}
              </span>
              <div className="flex flex-col gap-2 items-start w-full">
                {bonuses.map((bonus) => (
                  <BonusCard
                    key={bonus.id}
                    bonus={bonus}
                    selected={selectedId === bonus.id}
                    onSelect={() => setSelectedId(bonus.id)}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              onClick={handleConfirm}
              disabled={!selectedId}
              className="flex items-center justify-center h-10 w-full rounded-[20px] shrink-0"
              style={{
                backgroundColor: selectedId ? "#8352FF" : "rgba(131,82,255,0.5)",
                transition: "background-color 0.2s ease",
              }}
            >
              <span className="text-xl font-bold text-white text-center leading-[21px]">
                Confirm
              </span>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
