"use client";

import SportsContent from "@/components/sports/SportsContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function SportsPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <SportsContent />
      <SharedBottomNav activePage="sports" />
    </div>
  );
}
