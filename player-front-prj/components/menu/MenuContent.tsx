"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

/* ─── Icon rendering with Figma-exact insets ─── */

const ICON_INSETS: Record<string, string> = {
  "icon-casino.svg": "4.17% 8.33%",
  "icon-livecasino.svg": "4.17% 8.33%",
  "icon-sport.svg": "4.17%",
  "icon-exchange.svg": "4.17%",
  "icon-map.svg": "8.33% 7.44% 8.33% 9.23%",
  "icon-bonuses.svg": "8.33% 11.7% 8.33% 12.5%",
  "icon-promotions.svg": "8.33% 9.76% 9.33% 8.76%",
  "icon-tournaments.svg": "8.33% 9.5%",
  "icon-contests.svg": "11.26% 6.13% 11.26% 6.14%",
  "icon-lotteries.svg": "1.68% 3.44% 6.02% 2.91%",
  "icon-festival.svg": "14.06% 0% 14.07% 0%",
  "icon-notifications.svg": "8.33% 20.83% 8.33% 16.67%",
  "icon-language.svg": "8.33%",
  "icon-theme.svg": "8.2% 8.46% 8.46% 8.2%",
  "icon-shop.svg": "5.21% 10.17% 6.25% 5.21%",
  "icon-chat.svg": "8.33% 8.35% 8.33% 8.32%",
  "icon-install.svg": "8.33% 15.17% 8.33% 15.09%",
  "icon-support.svg": "3.13%",
  "icon-logout.svg": "8.33% 8.38% 8.33% 8.34%",
};

function MenuIcon({ icon }: { icon: string }) {
  const inset = ICON_INSETS[icon] ?? "0%";

  if (icon === "icon-livecasino.svg") {
    return (
      <div className="overflow-hidden relative shrink-0" style={{ width: 20, height: 20 }}>
        <div
          className="absolute flex items-center justify-center"
          style={{ inset: inset.split(" ").map(v => v).join(" ") }}
        >
          <div style={{ transform: "scaleY(-1) rotate(180deg)", width: 20, height: 22, flexShrink: 0 }}>
            <div className="relative w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/menu/icon-livecasino.svg"
                alt=""
                className="absolute block w-full h-full"
                style={{ maxWidth: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: inset.split(" ").map(v => v).join(" ") }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/menu/${icon}`}
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
          src="/menu/icon-arrow.svg"
          alt=""
          className="absolute block w-full h-full"
          style={{ maxWidth: "none" }}
        />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
      <div className="absolute" style={{ inset: "9.52% 8.33% 7.15% 8.33%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/menu/icon-search.svg"
          alt=""
          className="absolute block w-full h-full"
          style={{ maxWidth: "none" }}
        />
      </div>
    </div>
  );
}

/* ─── Reusable small components ─── */

function Badge({ count }: { count: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-[8px]"
      style={{
        backgroundColor: "#F53B5D",
        minHeight: 16,
        minWidth: 16,
        paddingLeft: 4,
        paddingRight: 4,
      }}
    >
      <span className="text-md text-white text-center leading-[14px]">{count}</span>
    </div>
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

/* ─── Top App Bar ─── */

function TopAppBar() {
  return (
    <div
      className="flex items-center justify-between px-4 py-2 shrink-0 w-full"
      style={{ height: 56, backgroundColor: "#1F1E2E" }}
    >
      <div className="shrink-0 w-6" />
      <p className="text-xl font-normal text-primary-600 whitespace-nowrap leading-[21px]">
        Menu
      </p>
      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        aria-label="Search"
      >
        <SearchIcon />
      </motion.button>
    </div>
  );
}

/* ─── User Card ─── */

function UserCard() {
  return (
    <div
      className="flex flex-col gap-4 items-start p-3 rounded-[16px] w-full"
      style={{
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
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

      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        whileHover={{ opacity: 0.9 }}
        className="flex items-center justify-center w-full rounded-[20px]"
        style={{ height: 32, backgroundColor: "#8352FF" }}
      >
        <span className="text-lg font-bold text-white text-center leading-[16px]">
          Account
        </span>
      </motion.button>
    </div>
  );
}

/* ─── Bonus Balance Card ─── */

function BonusBalance() {
  return (
    <div
      className="flex flex-col items-start justify-center p-3 rounded-[16px] w-full"
      style={{
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="flex gap-2 items-center justify-center py-2 rounded-[12px] w-full"
        style={{ backgroundColor: "#363555" }}
      >
        <div className="relative shrink-0 overflow-hidden" style={{ width: 40, height: 39 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/menu/gold-coin.png"
            alt=""
            className="absolute max-w-none"
            style={{ top: "-8.72%", left: "-9.35%", width: "118.24%", height: "120.61%" }}
          />
        </div>
        <div className="flex flex-col gap-1 items-start shrink-0">
          <span className="text-xl font-bold text-primary-600 whitespace-nowrap leading-[21px]">
            VBUCK 126,730.00
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-md text-primary-400 whitespace-nowrap leading-[14px]">
              Coins Balance
            </span>
            <InfoIcon16 />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Menu item types ─── */

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  right?: "arrow" | { badge: number } | { text: string };
}

interface MenuGroup {
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    items: [
      { icon: "icon-casino.svg", label: "Casino", href: "/casino", right: "arrow" },
      { icon: "icon-livecasino.svg", label: "Live Casino", href: "/live-casino", right: "arrow" },
      { icon: "icon-sport.svg", label: "Sport", right: "arrow" },
    ],
  },
  {
    items: [
      { icon: "icon-exchange.svg", label: "Sport Exchange", right: "arrow" },
    ],
  },
  {
    items: [
      { icon: "icon-map.svg", label: "Interactive Map" },
    ],
  },
  {
    items: [
      { icon: "icon-bonuses.svg", label: "Bonuses", href: "/bonuses", right: { badge: 99 } },
      { icon: "icon-promotions.svg", label: "Promotions" },
      { icon: "icon-tournaments.svg", label: "Tournaments", right: { badge: 99 } },
      { icon: "icon-contests.svg", label: "Contests" },
      { icon: "icon-lotteries.svg", label: "Lotteries" },
      { icon: "icon-festival.svg", label: "Spring Grand Festival" },
    ],
  },
  {
    items: [
      { icon: "icon-notifications.svg", label: "Notifications", right: { badge: 99 } },
      { icon: "icon-language.svg", label: "Language", right: { text: "English" } },
      { icon: "icon-theme.svg", label: "Theme", right: "arrow" },
    ],
  },
  {
    items: [
      { icon: "icon-shop.svg", label: "Shop" },
      { icon: "icon-chat.svg", label: "Social Chat" },
      { icon: "icon-install.svg", label: "Install" },
      { icon: "icon-support.svg", label: "Support" },
    ],
  },
  {
    items: [
      { icon: "icon-logout.svg", label: "Log Out" },
    ],
  },
];

/* ─── Nav Item Row ─── */

function NavItemRow({ item }: { item: MenuItem }) {
  const inner = (
    <>
      <div className="flex flex-1 gap-2 items-center min-w-0">
        <MenuIcon icon={item.icon} />
        <span
          className="whitespace-nowrap leading-[18px]"
          style={{ fontSize: 16, color: "#B5B5C5" }}
        >
          {item.label}
        </span>
      </div>

      {item.right === "arrow" && <ArrowRight />}
      {item.right && typeof item.right === "object" && "badge" in item.right && (
        <Badge count={item.right.badge} />
      )}
      {item.right && typeof item.right === "object" && "text" in item.right && (
        <>
          <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
            {item.right.text}
          </span>
          <ArrowRight />
        </>
      )}
    </>
  );

  const rowClass = "flex gap-2 items-center px-3 w-full";
  const rowStyle = { height: 48 };

  if (item.href) {
    return (
      <motion.div whileTap={{ scale: MOTION.press.scale }} className="w-full">
        <Link href={item.href} className={rowClass} style={rowStyle}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: MOTION.press.scale }}
      className={rowClass}
      style={rowStyle}
    >
      {inner}
    </motion.button>
  );
}

/* ─── Nav Group Card ─── */

function NavGroupCard({ group }: { group: MenuGroup }) {
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

export default function MenuContent() {
  return (
    <>
      <TopAppBar />

      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "#1F1E2E" }}
      >
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <UserCard />
          <BonusBalance />

          {MENU_GROUPS.map((group, idx) => (
            <NavGroupCard key={idx} group={group} />
          ))}
        </div>
      </main>
    </>
  );
}
