"use client";

import LotteryContent from "@/components/lottery/LotteryContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function LotteryPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <LotteryContent />
      <SharedBottomNav activePage="" />
    </div>
  );
}
