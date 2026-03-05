"use client";

import Header from "@/components/casino/Header";
import BannerCarousel from "@/components/casino/BannerCarousel";
import BentoWidget from "@/components/casino/BentoWidget";
import CategoryTabs from "@/components/casino/CategoryTabs";
import GameSection from "@/components/casino/GameSection";
import ProvidersSection from "@/components/casino/ProvidersSection";
import GameCollectionWidget from "@/components/casino/GameCollectionWidget";
import LiveDealersSection from "@/components/casino/LiveDealersSection";
import PaymentMethods from "@/components/casino/PaymentMethods";
import TournamentsSection from "@/components/casino/TournamentsSection";
import SportEventsSection from "@/components/casino/SportEventsSection";
import TopWinners from "@/components/casino/TopWinners";
import CasinoFooter from "@/components/casino/CasinoFooter";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function CasinoPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-4 pb-0">
          <BannerCarousel />
          <BentoWidget />
          <CategoryTabs />
          <GameSection title="Your Recent" rows={1} />
          <ProvidersSection />
          <GameSection title="Top" rows={2} />
          <GameCollectionWidget />
          <LiveDealersSection />
          <GameSection title="New" rows={2} />
          <PaymentMethods />
          <TournamentsSection />
          <SportEventsSection />
          <GameSection title="Random Games" rows={1} />
          <TopWinners />
          <CasinoFooter />
        </div>
      </main>

      <SharedBottomNav activePage="casino" />
    </div>
  );
}
