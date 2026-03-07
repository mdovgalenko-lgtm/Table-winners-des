"use client";

import TournamentContent from "@/components/tournament/TournamentContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function TournamentPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <TournamentContent />
      <SharedBottomNav activePage="" />
    </div>
  );
}
