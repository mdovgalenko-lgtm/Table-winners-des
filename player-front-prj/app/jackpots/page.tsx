"use client";

import Header from "@/components/casino/Header";
import VegangsterJackpots from "@/components/jackpots/VegangsterJackpots";
import PromotionsSection from "@/components/jackpots/PromotionsSection";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function JackpotsPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col p-4" style={{ gap: 24 }}>
          <VegangsterJackpots />
          <PromotionsSection />
        </div>
      </main>

      <SharedBottomNav activePage="" />
    </div>
  );
}
