"use client";

import { useEffect, useRef, useState } from "react";
import { MOTION } from "@/lib/motion";

export function useCountUp(
  targetValue: number,
  duration: number = MOTION.duration.countUp
): number {
  const [display, setDisplay] = useState(targetValue);
  const prevRef = useRef(targetValue);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prev = prevRef.current;
    if (Math.abs(prev - targetValue) < 0.001) return;

    const startTime = performance.now();
    const diff = targetValue - prev;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round((prev + diff * eased) * 100) / 100);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(targetValue);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    prevRef.current = targetValue;

    return () => cancelAnimationFrame(rafRef.current);
  }, [targetValue, duration]);

  return display;
}
