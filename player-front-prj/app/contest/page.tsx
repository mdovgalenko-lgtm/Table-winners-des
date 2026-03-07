"use client";

import ContestContent from "@/components/contest/ContestContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function ContestPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <ContestContent />
      <SharedBottomNav activePage="" />
    </div>
  );
}
