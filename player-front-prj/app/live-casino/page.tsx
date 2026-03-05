"use client";

import Header from "@/components/casino/Header";
import BannerCarousel from "@/components/casino/BannerCarousel";
import LiveCasinoCategoryTabs from "@/components/live-casino/LiveCasinoCategoryTabs";
import LiveDealersSection from "@/components/casino/LiveDealersSection";
import LiveCasinoProviders from "@/components/live-casino/LiveCasinoProviders";
import TopWinners from "@/components/casino/TopWinners";
import LiveDealerSection from "@/components/live-casino/LiveDealerSection";
import ExploreSection from "@/components/live-casino/ExploreSection";
import SportEventsSection from "@/components/casino/SportEventsSection";
import CasinoFooter from "@/components/casino/CasinoFooter";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function LiveCasinoPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-4 pb-0">
          <BannerCarousel />
          <LiveCasinoCategoryTabs />
          <LiveDealersSection />
          <LiveCasinoProviders />
          <TopWinners />
          <LiveDealerSection title="Top" rows={2} />
          <LiveDealerSection title="Blackjack" rows={1} />
          <LiveDealerSection title="Roulette" rows={1} />
          <ExploreSection />
          <SportEventsSection />
          <CasinoFooter />
        </div>
      </main>

      <SharedBottomNav activePage="live-casino" />
    </div>
  );
}
