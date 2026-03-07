"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

/* ─── Icon helpers ─── */

const ICON_INSETS: Record<string, string> = {
  "icon-target.svg": "4.17%",
  "icon-person.svg": "8.33% 18.47% 5.83% 18.51%",
  "icon-add-user.svg": "8.33% 20.66% 8.33% 20.67%",
  "icon-user-bold.svg": "8.33% 12.13% 8.33% 12.17%",
  "icon-user-verify.svg": "8.33% 20.66% 8.33% 20.67%",
  "icon-transaction.svg": "6.26% 13.54% 6.24% 15.63%",
  "icon-bonuses-history.svg": "6.26% 15.58% 6.4% 15.63%",
  "icon-gaming-history.svg": "6.26% 15.58% 6.4% 15.63%",
  "icon-buckler.svg": "8.37% 12.88% 8.34% 12.87%",
  "icon-notif-set.svg": "8.33% 8.9% 4.17% 7.77%",
  "icon-statement.svg": "8.33% 8.33% 8.33% 12.5%",
};

function AccountIcon({ icon }: { icon: string }) {
  const inset = ICON_INSETS[icon] ?? "0%";
  return (
    <div className="overflow-hidden relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/account/${icon}`}
          alt=""
          className="absolute block w-full h-full"
          style={{ maxWidth: "none" }}
        />
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
      <div className="absolute" style={{ inset: "12.17% 28.64% 12.17% 28.84%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/account/icon-arrow-right.svg"
          alt=""
          className="absolute block w-full h-full"
          style={{ maxWidth: "none" }}
        />
      </div>
    </div>
  );
}

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 19L8 12L15 5"
        stroke="#EBEBF2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon16() {
  return (
    <svg className="shrink-0 -scale-y-100" width="16" height="16" viewBox="0 0 13.3333 13.3333" fill="none">
      <path
        d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM6.16667 4C6.16667 3.72667 6.39333 3.5 6.66667 3.5C6.94 3.5 7.16667 3.72667 7.16667 4V7.33333C7.16667 7.60667 6.94 7.83333 6.66667 7.83333C6.39333 7.83333 6.16667 7.60667 6.16667 7.33333V4ZM7.28 9.58667C7.24667 9.67333 7.2 9.74 7.14 9.80667C7.07333 9.86667 7 9.91333 6.92 9.94667C6.84 9.98 6.75333 10 6.66667 10C6.58 10 6.49333 9.98 6.41333 9.94667C6.33333 9.91333 6.26 9.86667 6.19333 9.80667C6.13333 9.74 6.08667 9.67333 6.05333 9.58667C6.02 9.50667 6 9.42 6 9.33333C6 9.24667 6.02 9.16 6.05333 9.08C6.08667 9 6.13333 8.92667 6.19333 8.86C6.26 8.8 6.33333 8.75333 6.41333 8.72C6.57333 8.65333 6.76 8.65333 6.92 8.72C7 8.75333 7.07333 8.8 7.14 8.86C7.2 8.92667 7.24667 9 7.28 9.08C7.31333 9.16 7.33333 9.24667 7.33333 9.33333C7.33333 9.42 7.31333 9.50667 7.28 9.58667Z"
        fill="#B5B5C5"
      />
    </svg>
  );
}

function CheckmarkIcon({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none">
      <path d="M6.38 1.6L3.06 5.36L1.62 3.7C1.44 3.48 1.11 3.46 0.91 3.65C0.71 3.84 0.69 4.18 0.87 4.39L2.66 6.4C2.76 6.52 2.91 6.58 3.06 6.58C3.22 6.58 3.37 6.52 3.47 6.4L7.13 2.28C7.31 2.07 7.29 1.73 7.09 1.54C6.89 1.35 6.56 1.39 6.38 1.6Z" fill="white" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
      <path d="M7.5 4.5V3.5C7.5 2.12 6.38 1 5 1C3.62 1 2.5 2.12 2.5 3.5V4.5C1.67 4.5 1 5.17 1 6V8.5C1 9.33 1.67 10 2.5 10H7.5C8.33 10 9 9.33 9 8.5V6C9 5.17 8.33 4.5 7.5 4.5ZM3.5 3.5C3.5 2.67 4.17 2 5 2C5.83 2 6.5 2.67 6.5 3.5V4.5H3.5V3.5Z" fill="white" />
    </svg>
  );
}

/* ─── Status Badge ─── */

function StatusBadge({ completed }: { completed: boolean }) {
  return (
    <div
      className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: completed ? "#8352FF" : "#6d6d92" }}
    >
      {completed ? (
        <CheckmarkIcon size={12} />
      ) : (
        <LockIcon />
      )}
    </div>
  );
}

/* ─── Progress Dot ─── */

function ProgressDot({ filled }: { filled: boolean }) {
  return (
    <div
      className="w-4 h-4 rounded-full flex items-center justify-center"
      style={{ backgroundColor: filled ? "#8352FF" : "#363555" }}
    >
      <CheckmarkIcon size={8} />
    </div>
  );
}

/* ─── Top App Bar ─── */

function TopAppBar() {
  return (
    <div
      className="flex items-center justify-between px-4 py-2 shrink-0 w-full"
      style={{ height: 56, backgroundColor: "#1F1E2E" }}
    >
      <Link href="/menu" aria-label="Back to menu">
        <motion.div whileTap={{ scale: MOTION.press.scale }}>
          <BackArrow />
        </motion.div>
      </Link>
      <p className="text-xl font-normal text-primary-600 whitespace-nowrap leading-[21px]">
        Account
      </p>
      <div className="shrink-0 w-6" />
    </div>
  );
}

/* ─── Avatar + User Info ─── */

function UserInfo() {
  return (
    <div className="flex gap-4 items-center w-full">
      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
        <div className="flex-1 h-full relative rounded-[50px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[50px]"
          >
            <div
              className="absolute inset-0 rounded-[50px]"
              style={{ backgroundColor: "#2E2D49" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/menu/avatar.png"
              alt="Avatar"
              className="absolute inset-0 w-full h-full object-cover rounded-[50px]"
            />
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/menu/avatar-border.svg"
          alt=""
          className="absolute inset-0 block w-full h-full max-w-none"
        />
      </div>

      <div className="flex flex-col gap-2 items-start flex-1 min-w-0">
        <span className="text-lg font-bold text-primary-600 whitespace-nowrap leading-[16px]">
          @hippopotamus
        </span>

        <div className="flex flex-col gap-0.5 items-start w-full">
          <div className="flex gap-2 items-start justify-center w-full">
            <div className="flex flex-1 gap-1 items-center min-w-0">
              <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
                Novice
              </span>
              <InfoIcon16 />
            </div>
            <span className="flex-1 text-lg text-primary-400 text-right min-w-0 leading-[16px]">
              23.5%
            </span>
          </div>
          <div
            className="flex items-start overflow-clip rounded-[8px] w-full"
            style={{ backgroundColor: "#363555" }}
          >
            <div
              className="h-2 rounded-[8px]"
              style={{ backgroundColor: "#8352FF", width: "23.5%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Action Buttons ─── */

function ActionButtons() {
  return (
    <div className="flex gap-2 items-start w-full">
      <motion.div whileTap={{ scale: MOTION.press.scale }} className="flex-1">
        <Link
          href="/deposit"
          className="flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm"
          style={{ backgroundColor: "#8352FF" }}
        >
          <span className="text-lg font-bold text-white text-center leading-[16px]">Deposit</span>
        </Link>
      </motion.div>
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        className="flex-1 flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm border-2"
        style={{ borderColor: "#8352FF" }}
      >
        <span className="text-lg font-bold text-center leading-[16px]" style={{ color: "#8352FF" }}>
          Withdrawal
        </span>
      </motion.button>
    </div>
  );
}

/* ─── Achievements ─── */

interface Achievement {
  badge: string;
  label: string;
  completed: boolean;
  game?: string;
  progress?: "bar" | { filled: number; total: number };
  progressPercent?: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { badge: "achieve-winner.png", label: "Winner", completed: true },
  { badge: "achieve-200wins.png", label: "200 wins", completed: true, game: "achieve-game1.png", progress: "bar", progressPercent: 100 },
  { badge: "achieve-3wins.png", label: "3 wins", completed: false, game: "achieve-game2.png", progress: { filled: 1, total: 3 } },
  { badge: "achieve-20bets-bg.png", label: "20 bets", completed: false, game: "achieve-game3.png", progress: "bar", progressPercent: 33 },
  { badge: "achieve-lottery.png", label: "Lottery", completed: false },
  { badge: "achieve-combo5.png", label: "Combo 5", completed: false },
  { badge: "achieve-cashback.png", label: "Cashback", completed: false },
  { badge: "achieve-deposit.png", label: "Deposit", completed: false },
  { badge: "achieve-500wins.png", label: "500 wins", completed: false, game: "achieve-game2.png", progress: "bar", progressPercent: 0 },
  { badge: "achieve-50bets.png", label: "50 bets", completed: false, game: "achieve-game4.png", progress: "bar", progressPercent: 0 },
  { badge: "achieve-combo.png", label: "Combo", completed: false, game: "achieve-game5.png" },
  { badge: "achieve-2wins.png", label: "2 wins", completed: false, game: "achieve-game6.png", progress: { filled: 0, total: 2 } },
  { badge: "achieve-4wins.png", label: "4 wins", completed: false, game: "achieve-game2.png", progress: { filled: 0, total: 4 } },
];

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <div className="flex flex-col gap-2 items-center shrink-0" style={{ width: 90 }}>
      <div className="relative shrink-0" style={{ width: 90, height: 90 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/account/${item.badge}`}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {item.game && (
          <div className="absolute bottom-0 right-0" style={{ width: 37, height: 37 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/account/${item.game}`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-[6px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/account/game-shadow.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
        )}
        <StatusBadge completed={item.completed} />
      </div>
      <span className="text-lg font-bold text-primary-400 text-center whitespace-nowrap leading-[16px]">
        {item.label}
      </span>
      {item.progress === "bar" && (
        <div
          className="flex items-start overflow-clip rounded-[8px] w-full"
          style={{ backgroundColor: "#363555" }}
        >
          <div
            className="h-2 rounded-[8px]"
            style={{ backgroundColor: "#8352FF", width: `${item.progressPercent ?? 0}%` }}
          />
        </div>
      )}
      {item.progress && typeof item.progress === "object" && (
        <div className="flex gap-2 items-center">
          {Array.from({ length: item.progress.total }).map((_, i) => (
            <ProgressDot key={i} filled={i < item.progress!.filled} />
          ))}
        </div>
      )}
    </div>
  );
}

function AchievementsSection() {
  return (
    <div
      className="flex flex-col items-start overflow-clip rounded-[16px] w-full"
      style={{ backgroundColor: "#2E2D49" }}
    >
      <div
        className="flex gap-2 h-12 items-center px-3 w-full"
        style={{ borderBottom: "1px solid #363555" }}
      >
        <AccountIcon icon="icon-target.svg" />
        <span className="text-[16px] leading-[18px] text-primary-400 whitespace-nowrap">
          Achievements
        </span>
      </div>
      <div
        className="flex gap-4 items-start overflow-x-auto scrollbar-hide p-3 w-full"
        style={{ backgroundColor: "#2E2D49" }}
      >
        {ACHIEVEMENTS.map((a) => (
          <AchievementCard key={a.label} item={a} />
        ))}
      </div>
    </div>
  );
}

/* ─── Nav items ─── */

interface NavItem {
  icon: string;
  label: string;
  arrow?: boolean;
}

interface NavGroup {
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [{ icon: "icon-person.svg", label: "Public Profile" }],
  },
  {
    items: [{ icon: "icon-add-user.svg", label: "Refer a Friend" }],
  },
  {
    items: [
      { icon: "icon-user-bold.svg", label: "Account Details" },
      { icon: "icon-user-verify.svg", label: "Verification", arrow: true },
    ],
  },
  {
    items: [
      { icon: "icon-transaction.svg", label: "Transactions History" },
      { icon: "icon-bonuses-history.svg", label: "Bonuses History" },
      { icon: "icon-gaming-history.svg", label: "Gaming History" },
    ],
  },
  {
    items: [
      { icon: "icon-buckler.svg", label: "Security Settings", arrow: true },
      { icon: "icon-notif-set.svg", label: "Notifications Settings" },
    ],
  },
  {
    items: [{ icon: "icon-statement.svg", label: "Responsible Gaming", arrow: true }],
  },
];

function NavItemRow({ item }: { item: NavItem }) {
  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className="flex gap-2 items-center px-3 w-full"
      style={{ height: 48 }}
    >
      <div className="flex flex-1 gap-2 items-center min-w-0">
        <AccountIcon icon={item.icon} />
        <span
          className="whitespace-nowrap leading-[18px]"
          style={{ fontSize: 16, color: "#B5B5C5" }}
        >
          {item.label}
        </span>
      </div>
      {item.arrow && <ArrowRight />}
    </motion.button>
  );
}

function NavGroupCard({ group }: { group: NavGroup }) {
  return (
    <div
      className="flex flex-col items-start overflow-clip rounded-[16px] w-full"
      style={{
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
      }}
    >
      {group.items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && (
            <div className="w-full" style={{ borderBottom: "1px solid #363555" }} />
          )}
          <NavItemRow item={item} />
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Main export ─── */

export default function AccountContent() {
  return (
    <>
      <TopAppBar />

      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "#1F1E2E" }}
      >
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <UserInfo />
          <ActionButtons />
          <AchievementsSection />

          {NAV_GROUPS.map((group, idx) => (
            <NavGroupCard key={idx} group={group} />
          ))}
        </div>
      </main>
    </>
  );
}
