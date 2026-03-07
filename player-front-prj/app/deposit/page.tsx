"use client";

import DepositContent from "@/components/deposit/DepositContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function DepositPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <DepositContent />
      <SharedBottomNav activePage="menu" />
    </div>
  );
}
