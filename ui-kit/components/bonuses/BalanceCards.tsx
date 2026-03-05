import React from "react";

const PRESENT_ICON =
  "https://www.figma.com/api/mcp/asset/901ca828-934c-4db1-92ba-83405524e564";
const MONEYBAG_ICON =
  "https://www.figma.com/api/mcp/asset/8ded6725-fc91-4833-b977-4156126ff5f0";

function BalanceCard({
  icon,
  iconInset,
  amount,
  label,
}: {
  icon: string;
  iconInset: string;
  amount: string;
  label: string;
}) {
  return (
    <div className="bg-surface-card flex flex-1 gap-2 items-center min-w-0 min-h-px p-3 rounded-card-lg shadow-header">
      <div className="relative w-6 h-6 shrink-0">
        <div className={`absolute ${iconInset}`}>
          <img
            src={icon}
            alt=""
            className="absolute block w-full h-full max-w-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 items-start flex-1 min-w-0 min-h-px">
        <span className="font-bold text-lg text-primary-600 whitespace-nowrap leading-[16px]">
          {amount}
        </span>
        <span className="text-md text-primary-400 leading-[14px]">
          {label}
        </span>
      </div>
    </div>
  );
}

export function BalanceCards() {
  return (
    <div className="flex gap-4 items-start w-full">
      <BalanceCard
        icon={PRESENT_ICON}
        iconInset="inset-[8.33%_11.7%_8.33%_12.5%]"
        amount="€120.25"
        label="Bonus balance"
      />
      <BalanceCard
        icon={MONEYBAG_ICON}
        iconInset="inset-[6.25%_7.69%_6.25%_7.7%]"
        amount="€106.00"
        label="Cashback"
      />
    </div>
  );
}
