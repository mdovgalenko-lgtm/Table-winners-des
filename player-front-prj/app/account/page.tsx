"use client";

import AccountContent from "@/components/account/AccountContent";
import { SharedBottomNav } from "@/components/shared/BottomNav";

export default function AccountPage() {
  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <AccountContent />
      <SharedBottomNav activePage="menu" />
    </div>
  );
}
