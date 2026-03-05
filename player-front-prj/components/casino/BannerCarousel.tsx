"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

const bannerImage =
  "https://www.figma.com/api/mcp/asset/0995054f-9cbe-4363-86e7-d3fb53dff600";

const BANNER_WIDTH = 343;
const BANNER_GAP = 8;
const BANNER_STEP = BANNER_WIDTH + BANNER_GAP;
const SIDE_PADDING = 16;

interface BannerData {
  id: number;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

const banners: BannerData[] = [
  {
    id: 1,
    gradientFrom: "#E77341",
    gradientTo: "#36282E",
    title: "Welcome Gifts! Cash bonus up to ₱100,000 + 200 free",
    subtitle:
      "Sub text: is simply dummy text of the printing and typesetting",
    buttonText: "Button",
  },
  {
    id: 2,
    gradientFrom: "#6B80ED",
    gradientTo: "#292A44",
    title: "Welcome Gifts! Cash bonus up to ₱100,000 + 200 free",
    subtitle:
      "Sub text: is simply dummy text of the printing and typesetting",
    buttonText: "Button",
  },
  {
    id: 3,
    gradientFrom: "#6A53EC",
    gradientTo: "#282544",
    title: "Welcome Gifts! Cash bonus up to ₱100,000 + 200 free",
    subtitle:
      "Sub text: is simply dummy text of the printing and typesetting",
    buttonText: "Button",
  },
];

export default function BannerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const idx = Math.round(scrollLeft / BANNER_STEP);
    setActiveIndex(Math.min(Math.max(idx, 0), banners.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * BANNER_STEP,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="-mx-4">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          paddingInline: SIDE_PADDING,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="shrink-0 snap-center overflow-hidden"
            style={{
              width: BANNER_WIDTH,
              height: 152,
              borderRadius: 16,
              background: `linear-gradient(to bottom, ${banner.gradientFrom}, ${banner.gradientTo})`,
              boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex items-center h-full">
              <div className="flex-1 flex flex-col gap-2 px-3 py-2 min-w-0">
                <p className="text-white font-bold text-[16px] leading-[18px]">
                  {banner.title}
                </p>
                <p className="text-white text-[12px] leading-[14px]">
                  {banner.subtitle}
                </p>
                <button className="self-start flex items-center justify-center h-8 px-4 bg-brand-500 rounded-[20px] shadow-[0px_1px_5px_2px_rgba(0,0,0,0.15)]">
                  <span className="text-white font-bold text-[14px] leading-[16px] text-center whitespace-nowrap">
                    {banner.buttonText}
                  </span>
                </button>
              </div>
              <div
                className="shrink-0 overflow-hidden"
                style={{ width: 152, height: 152 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bannerImage}
                  alt=""
                  width={152}
                  height={152}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {banners.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => scrollToIndex(i)}
            className="rounded-full"
            animate={{
              width: i === activeIndex ? 16 : 6,
              backgroundColor: i === activeIndex ? "#8352FF" : "#4A4874",
            }}
            transition={{
              duration: MOTION.duration.fast,
              ease: MOTION.easing.standard,
            }}
            style={{ height: 6, border: "none", padding: 0 }}
            aria-label={`Go to banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
