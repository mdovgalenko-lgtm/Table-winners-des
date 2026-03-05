"use client";

import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface BonusRowProps {
  amount: string;
  label: string;
  buttonText: string;
  buttonVariant?: "filled" | "outline";
  onCollect?: (sourceRect: DOMRect) => void;
}

export const BonusRow = React.memo(function BonusRow({
  amount,
  label,
  buttonText,
  buttonVariant = "filled",
  onCollect,
}: BonusRowProps) {
  const amountRef = useRef<HTMLSpanElement>(null);

  const handleClick = useCallback(() => {
    if (onCollect && amountRef.current) {
      onCollect(amountRef.current.getBoundingClientRect());
    }
  }, [onCollect]);

  return (
    <div className="bg-surface-card flex items-center justify-between p-3 rounded-card-lg shadow-header w-full transition-shadow duration-200 hover:shadow-header-lg">
      <div className="flex flex-col gap-1 items-start flex-1 min-w-0 min-h-px">
        <span
          ref={amountRef}
          className="font-bold text-lg text-primary-600 whitespace-nowrap leading-[16px]"
        >
          {amount}
        </span>
        <span className="text-md text-primary-400 leading-[14px]">
          {label}
        </span>
      </div>
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        transition={MOTION.spring.stiff}
        className={`flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-40 disabled:pointer-events-none ${
          buttonVariant === "outline"
            ? "border-2 border-brand-500 hover:bg-[rgba(131,82,255,0.1)] transition-colors duration-150"
            : "bg-brand-500 hover:brightness-110 transition-[filter] duration-150"
        }`}
        onClick={handleClick}
      >
        <span
          className={`font-bold text-lg text-center whitespace-nowrap leading-[16px] ${
            buttonVariant === "outline" ? "text-brand-500" : "text-white"
          }`}
        >
          {buttonText}
        </span>
      </motion.button>
    </div>
  );
});
