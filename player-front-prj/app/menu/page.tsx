"use client";

import MenuContent from "@/components/menu/MenuContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function MenuPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <MenuContent />
      <SharedBottomNav activePage="menu" />
    </div>
  );
}
