"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface FlyingCollectProps {
  id: string;
  text: string;
  sourceRect: DOMRect;
  targetRect: DOMRect;
  onComplete: () => void;
}

export function FlyingCollect({
  id,
  text,
  sourceRect,
  targetRect,
  onComplete,
}: FlyingCollectProps) {
  const startX = sourceRect.left;
  const startY = sourceRect.top;
  const endX = targetRect.left + targetRect.width / 2 - 20;
  const endY = targetRect.top + targetRect.height / 2 - 8;

  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 60;

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-50 font-bold text-lg text-primary-600 bg-surface-card/90 backdrop-blur-sm px-3 py-1 rounded-btn-sm shadow-brand whitespace-nowrap"
      style={{ left: 0, top: 0 }}
      initial={{
        x: startX,
        y: startY,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: [startX, midX, endX],
        y: [startY, midY, endY],
        scale: [1, 0.85, 0.4],
        opacity: [1, 0.95, 0],
      }}
      transition={{
        duration: MOTION.duration.flyMoney,
        ease: MOTION.easing.standard,
        times: [0, 0.4, 1],
      }}
      onAnimationComplete={onComplete}
    >
      {text}
    </motion.div>
  );
}
