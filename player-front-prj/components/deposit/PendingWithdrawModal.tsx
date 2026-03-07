"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MOTION } from "@/lib/motion";

/* ─── Icons ─── */

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

function TrashIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M1 4.5H15M5.5 8.5V14.5M10.5 8.5V14.5M2 4.5L3 16.5C3 17.0523 3.44772 17.5 4 17.5H12C12.5523 17.5 13 17.0523 13 16.5L14 4.5M5.5 4.5V2C5.5 1.44772 5.94772 1 6.5 1H9.5C10.0523 1 10.5 1.44772 10.5 2V4.5"
        stroke="#F53B5D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Data ─── */

export interface PendingWithdrawal {
  id: string;
  cardType: string;
  lastFour: string;
  amount: string;
}

export const INITIAL_PENDING_WITHDRAWALS: PendingWithdrawal[] = [
  { id: "w1", cardType: "Visa", lastFour: "8439", amount: "€123" },
  { id: "w2", cardType: "Mastercard", lastFour: "8439", amount: "€365.56" },
];

/* ─── Animation Variants ─── */

const SHEET_VARIANTS = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { y: "100%", transition: { duration: 0.25, ease: MOTION.easing.accelerate } },
};

const BACKDROP_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ─── Withdrawal Row ─── */

function WithdrawalRow({ withdrawal, onDelete }: { withdrawal: PendingWithdrawal; onDelete: () => void }) {
  return (
    <div
      className="flex gap-4 items-center px-3 w-full rounded-[16px]"
      style={{
        height: 56,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className="flex flex-1 items-center justify-between min-w-0">
        <span className="flex-1 text-[16px] font-bold text-primary-600 leading-[18px]">
          {withdrawal.cardType}
        </span>
        <span className="flex-1 text-lg text-primary-400 text-center leading-[16px]">
          • • • • {withdrawal.lastFour}
        </span>
        <span className="flex-1 text-lg text-primary-400 text-right leading-[16px]">
          {withdrawal.amount}
        </span>
      </div>
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        onClick={onDelete}
        aria-label={`Cancel ${withdrawal.cardType} withdrawal`}
        className="shrink-0 w-6 h-6 flex items-center justify-center"
      >
        <TrashIcon />
      </motion.button>
    </div>
  );
}

/* ─── Modal ─── */

export function PendingWithdrawModal({
  open,
  onClose,
  withdrawals,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  withdrawals: PendingWithdrawal[];
  onDelete: (id: string) => void;
}) {
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
            className="relative bg-[#1f1e2e] rounded-t-[12px] flex flex-col pt-6 pb-8 px-6 gap-4"
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
              <span className="text-xl font-bold text-primary-600 leading-[21px] w-full">
                Pending Withdrawals
              </span>
              <p className="text-lg text-primary-400 leading-[16px] w-full">
                If you cancel any pending withdrawals, the funds will be instantly returned to your balance.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <AnimatePresence initial={false}>
                {withdrawals.map((w) => (
                  <motion.div
                    key={w.id}
                    layout
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: MOTION.duration.normal, ease: MOTION.easing.standard }}
                    className="w-full overflow-hidden"
                  >
                    <WithdrawalRow withdrawal={w} onDelete={() => onDelete(w.id)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
