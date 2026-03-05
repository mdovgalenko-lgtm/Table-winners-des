"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

export const RedeemCode = React.memo(function RedeemCode() {
  return (
    <div className="bg-surface-card flex items-center justify-between p-3 rounded-card-lg shadow-header w-full">
      <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
        Redeem Bonus Code
      </span>
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        transition={MOTION.spring.stiff}
        className="border-2 border-brand-500 flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm shrink-0 hover:bg-[rgba(131,82,255,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-150"
      >
        <span className="font-bold text-lg text-brand-500 text-center whitespace-nowrap leading-[16px]">
          Redeem
        </span>
      </motion.button>
    </div>
  );
});
