"use client";

import PromotionsContent from "@/components/promotions/PromotionsContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function PromotionsPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <PromotionsContent />
      <SharedBottomNav activePage="bonuses" />
    </div>
  );
}
