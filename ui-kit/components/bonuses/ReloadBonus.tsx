"use client";

import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface ReloadBonusProps {
  amount?: number;
  onCollect?: (sourceRect: DOMRect) => void;
}

export const ReloadBonus = React.memo(function ReloadBonus({
  amount = 20.0,
  onCollect,
}: ReloadBonusProps) {
  const amountRef = useRef<HTMLSpanElement>(null);

  const handleCollect = useCallback(() => {
    if (onCollect && amountRef.current) {
      onCollect(amountRef.current.getBoundingClientRect());
    }
  }, [onCollect]);

  return (
    <div className="bg-surface-card flex flex-col items-start overflow-clip rounded-card-lg shadow-header-lg w-full">
      {/* Section 1: Reload Bonus Amount + Collect */}
      <div className="border-b border-secondary-20 flex flex-col items-start justify-center p-3 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1 items-start">
            <span
              ref={amountRef}
              className="font-bold text-lg text-primary-600 whitespace-nowrap leading-[16px]"
            >
              €{amount.toFixed(2)}
            </span>
            <div className="flex items-start">
              <span className="text-md text-primary-400 whitespace-nowrap leading-[14px]">
                Reload bonus (expires in
              </span>
              <span className="text-md text-primary-600 whitespace-nowrap leading-[14px] ml-0.5">
                10:45:20
              </span>
              <span className="text-md text-primary-400 leading-[14px]">)</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: MOTION.press.scale }}
            transition={MOTION.spring.stiff}
            className="bg-brand-500 flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm shrink-0 ml-3 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-40 disabled:pointer-events-none transition-[filter] duration-150"
            onClick={handleCollect}
          >
            <span className="font-bold text-lg text-white text-center whitespace-nowrap leading-[16px]">
              Collect
            </span>
          </motion.button>
        </div>
      </div>

      {/* Section 2: Collect reload bonus countdown */}
      <div className="border-b border-secondary-20 flex gap-1 items-center p-3 w-full">
        <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
          Collect{" "}
        </span>
        <span className="font-bold text-lg text-primary-600 whitespace-nowrap leading-[16px]">
          €25.00
        </span>
        <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
          {" "}reload bonus in
        </span>
        <span className="text-md text-primary-600 whitespace-nowrap leading-[14px] ml-0.5">
          22:55:01
        </span>
      </div>

      {/* Section 3: Next week total */}
      <div className="flex gap-1 items-center p-3 w-full text-lg whitespace-nowrap">
        <span className="text-primary-400 leading-[16px]">
          Your next week total reload bonus
        </span>
        <span className="font-bold text-primary-600 leading-[16px]">
          €25.00
        </span>
      </div>
    </div>
  );
});
