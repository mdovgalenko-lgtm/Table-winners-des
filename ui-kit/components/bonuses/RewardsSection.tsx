"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import {
  useBonuses,
  RewardItem as RewardItemType,
} from "@/hooks/useBonusesState";

const POLYGON_BACK =
  "https://www.figma.com/api/mcp/asset/e30f438c-af0d-4d6f-b004-53bae54a6d9a";
const POLYGON_FRONT =
  "https://www.figma.com/api/mcp/asset/eb2b5581-1ada-449c-9e65-93cad232620d";
function InfoIconReward() {
  return (
    <svg className="shrink-0 -scale-y-100" width="20" height="20" viewBox="0 0 16.6667 16.6667" fill="none">
      <path d="M8.33333 0C3.74167 0 0 3.74167 0 8.33333C0 12.925 3.74167 16.6667 8.33333 16.6667C12.925 16.6667 16.6667 12.925 16.6667 8.33333C16.6667 3.74167 12.925 0 8.33333 0ZM7.70833 5C7.70833 4.65833 7.99167 4.375 8.33333 4.375C8.675 4.375 8.95833 4.65833 8.95833 5V9.16667C8.95833 9.50833 8.675 9.79167 8.33333 9.79167C7.99167 9.79167 7.70833 9.50833 7.70833 9.16667V5ZM9.1 11.9833C9.05833 12.0917 9 12.175 8.925 12.2583C8.84167 12.3333 8.75 12.3917 8.65 12.4333C8.55 12.475 8.44167 12.5 8.33333 12.5C8.225 12.5 8.11667 12.475 8.01667 12.4333C7.91667 12.3917 7.825 12.3333 7.74167 12.2583C7.66667 12.175 7.60833 12.0917 7.56667 11.9833C7.525 11.8833 7.5 11.775 7.5 11.6667C7.5 11.5583 7.525 11.45 7.56667 11.35C7.60833 11.25 7.66667 11.1583 7.74167 11.075C7.825 11 7.91667 10.9417 8.01667 10.9C8.21667 10.8167 8.45 10.8167 8.65 10.9C8.75 10.9417 8.84167 11 8.925 11.075C9 11.1583 9.05833 11.25 9.1 11.35C9.14167 11.45 9.16667 11.5583 9.16667 11.6667C9.16667 11.775 9.14167 11.8833 9.1 11.9833Z" fill="#9292AA" />
    </svg>
  );
}

function GiftBadge({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="bg-secondary-20 h-[128px] w-[100px] overflow-clip relative rounded-card-lg shrink-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[84px] h-[76px]">
        <div className="absolute inset-[1.35%_6.7%]">
          <img
            src={POLYGON_BACK}
            alt=""
            className="block w-full h-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary-20 flex flex-col items-center justify-center w-[86px] h-[54px] px-[5px] py-1 rounded-[10px] text-md text-primary-600 text-center leading-[14px]">
        <span className="w-full">{line1}</span>
        <span className="w-full">{line2}</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[96px]">
        <div className="absolute inset-[1.79%_6.7%]">
          <img
            src={POLYGON_FRONT}
            alt=""
            className="block w-full h-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function CountdownChip({ text }: { text: string }) {
  return (
    <div className="bg-[rgba(146,146,170,0.2)] flex items-center justify-center px-2 py-1 rounded shrink-0">
      <span className="text-md text-primary-600 text-center whitespace-nowrap leading-[14px]">
        {text}
      </span>
    </div>
  );
}

function FlyingRewardGhost({
  id,
  text,
  sourceRect,
  targetRect,
  onComplete,
}: {
  id: string;
  text: string;
  sourceRect: DOMRect;
  targetRect: DOMRect;
  onComplete: () => void;
}) {
  const startX = sourceRect.left + sourceRect.width / 2 - 30;
  const startY = sourceRect.top;
  const endX = targetRect.left + targetRect.width / 2 - 30;
  const endY = targetRect.top + targetRect.height / 2 - 10;
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 40;

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-50 bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-brand whitespace-nowrap"
      style={{ left: 0, top: 0 }}
      initial={{ x: startX, y: startY, scale: 1, opacity: 1 }}
      animate={{
        x: [startX, midX, endX],
        y: [startY, midY, endY],
        scale: [1, 0.8, 0.5],
        opacity: [1, 0.85, 0],
      }}
      transition={{
        duration: MOTION.duration.flyReward,
        ease: MOTION.easing.standard,
        times: [0, 0.4, 1],
      }}
      onAnimationComplete={onComplete}
    >
      {text}
    </motion.div>
  );
}

function RewardCard({
  reward,
  showBorder,
  onActivate,
  onRemove,
  activated = false,
}: {
  reward: RewardItemType;
  showBorder: boolean;
  onActivate?: (sourceRect: DOMRect) => void;
  onRemove?: (sourceRect: DOMRect) => void;
  activated?: boolean;
}) {
  return (
    <div className="flex gap-3 items-start w-full">
      <GiftBadge line1={reward.giftLine1} line2={reward.giftLine2} />

      <div
        className={`flex flex-col gap-2 items-start flex-1 min-w-0 min-h-px pb-3 ${
          showBorder ? "border-b border-secondary-20" : ""
        }`}
      >
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="flex gap-1 items-center w-full">
            <span className="font-bold text-[16px] leading-[18px] text-primary-600 whitespace-nowrap">
              {reward.title}
            </span>
            <InfoIconReward />
          </div>

          {reward.details.map((detail, i) => (
            <div
              key={i}
              className="flex gap-1 items-start text-lg text-center whitespace-nowrap"
            >
              <span className="text-primary-400 leading-[16px]">
                {detail.label}
              </span>
              <span className="text-primary-600 leading-[16px]">
                {detail.value}
              </span>
            </div>
          ))}

          <div className="flex gap-1 items-center">
            <span className="text-lg text-primary-400 text-center whitespace-nowrap leading-[16px]">
              Valid for:
            </span>
            <div className="flex gap-1 items-center">
              <CountdownChip text={reward.countdown.days} />
              <CountdownChip text={reward.countdown.time} />
            </div>
          </div>
        </div>

        {activated ? (
          <motion.button
            whileTap={{ scale: MOTION.press.scale }}
            transition={MOTION.spring.stiff}
            onClick={(e) =>
              onRemove?.(e.currentTarget.getBoundingClientRect())
            }
            className="border-2 border-brand-500 flex gap-2 h-8 items-center justify-center px-4 rounded-[20px] shrink-0 hover:bg-[rgba(131,82,255,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 transition-colors duration-150"
          >
            <span className="font-bold text-lg text-brand-500 text-center whitespace-nowrap leading-[16px]">
              Remove
            </span>
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: MOTION.press.scale }}
            transition={MOTION.spring.stiff}
            onClick={(e) =>
              onActivate?.(e.currentTarget.getBoundingClientRect())
            }
            className="bg-brand-500 flex gap-2 h-8 items-center justify-center px-4 rounded-btn-sm shrink-0 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-40 disabled:pointer-events-none transition-[filter] duration-150"
          >
            <span className="font-bold text-lg text-white text-center whitespace-nowrap leading-[16px]">
              Activate
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

interface FlyingRewardData {
  id: string;
  text: string;
  sourceRect: DOMRect;
  targetRect: DOMRect;
}

export function RewardsSection() {
  const { state, activateReward, deactivateReward } = useBonuses();
  const [activeTab, setActiveTab] = useState<"available" | "activated">(
    "available"
  );
  const [direction, setDirection] = useState(0);
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const availableTabRef = useRef<HTMLButtonElement>(null);
  const activatedTabRef = useRef<HTMLButtonElement>(null);

  const [flyingRewards, setFlyingRewards] = useState<FlyingRewardData[]>([]);
  const autoSwitchTimerRef = useRef<number>(0);

  useEffect(() => {
    return () => clearTimeout(autoSwitchTimerRef.current);
  }, []);

  const activatedCount = state.activatedRewards.length;
  const prevCountRef = useRef(activatedCount);
  const countDir = activatedCount >= prevCountRef.current ? 1 : -1;
  useEffect(() => {
    prevCountRef.current = activatedCount;
  }, [activatedCount]);

  const switchTab = useCallback(
    (tab: "available" | "activated") => {
      if (tab === activeTabRef.current) return;
      setDirection(tab === "activated" ? 1 : -1);
      setActiveTab(tab);
    },
    []
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        switchTab("activated");
        activatedTabRef.current?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        switchTab("available");
        availableTabRef.current?.focus();
      }
    },
    [switchTab]
  );

  const handleActivate = useCallback(
    (id: string, sourceRect: DOMRect) => {
      const reward = state.availableRewards.find((r) => r.id === id);
      if (!reward) return;

      const targetRect = activatedTabRef.current?.getBoundingClientRect();
      if (targetRect) {
        setFlyingRewards((prev) => [
          ...prev,
          { id, text: reward.title, sourceRect, targetRect },
        ]);
      }

      activateReward(id);

      clearTimeout(autoSwitchTimerRef.current);
      autoSwitchTimerRef.current = window.setTimeout(() => {
        switchTab("activated");
      }, 600);
    },
    [activateReward, switchTab, state.availableRewards]
  );

  const handleRemove = useCallback(
    (id: string, sourceRect: DOMRect) => {
      const reward = state.activatedRewards.find((r) => r.id === id);
      if (!reward) return;

      const targetRect = availableTabRef.current?.getBoundingClientRect();
      if (targetRect) {
        setFlyingRewards((prev) => [
          ...prev,
          { id, text: reward.title, sourceRect, targetRect },
        ]);
      }

      deactivateReward(id);

      clearTimeout(autoSwitchTimerRef.current);
      autoSwitchTimerRef.current = window.setTimeout(() => {
        switchTab("available");
      }, 600);
    },
    [deactivateReward, switchTab, state.activatedRewards]
  );

  const handleFlyComplete = useCallback((id: string) => {
    setFlyingRewards((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const tabVariants = useMemo(
    () => ({
      enter: (d: number) => ({ opacity: 0, x: d * 30 }),
      center: { opacity: 1, x: 0 },
      exit: (d: number) => ({ opacity: 0, x: d * -30 }),
    }),
    []
  );

  const counterVariants = useMemo(
    () => ({
      enter: (d: number) => ({ y: d * -8, opacity: 0 }),
      center: { y: 0, opacity: 1 },
      exit: (d: number) => ({ y: d * 8, opacity: 0 }),
    }),
    []
  );

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <h2 className="font-bold text-[16px] leading-[18px] text-primary-600 h-[26px] flex items-center w-full">
        Your Rewards
      </h2>

      <div className="flex flex-col gap-4 items-start w-full">
        {/* Segmented Tab Control */}
        <div
          className="bg-secondary-20 flex items-center p-1 rounded-tab w-full relative"
          role="tablist"
        >
          <motion.div
            className="absolute top-1 bottom-1 left-1 bg-brand-500 rounded-tab pointer-events-none"
            style={{ width: "calc(50% - 4px)" }}
            initial={false}
            animate={{ x: activeTab === "available" ? 0 : "100%" }}
            transition={MOTION.spring.default}
            aria-hidden="true"
          />

          <button
            ref={availableTabRef}
            id="tab-available"
            role="tab"
            aria-selected={activeTab === "available"}
            aria-controls="rewards-panel"
            tabIndex={activeTab === "available" ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            className="flex flex-1 h-8 items-center justify-center min-w-0 min-h-px px-4 rounded-tab relative z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 transition-colors duration-200"
            onClick={() => switchTab("available")}
          >
            <span
              className={`font-bold text-lg text-center whitespace-nowrap leading-[16px] transition-colors duration-200 ${
                activeTab === "available"
                  ? "text-white"
                  : "text-primary-400"
              }`}
            >
              Available
            </span>
          </button>

          <button
            ref={activatedTabRef}
            id="tab-activated"
            role="tab"
            aria-selected={activeTab === "activated"}
            aria-controls="rewards-panel"
            tabIndex={activeTab === "activated" ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            className="flex flex-1 h-8 items-center justify-center min-w-0 min-h-px px-4 rounded-tab relative z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 transition-colors duration-200"
            onClick={() => switchTab("activated")}
          >
            <span
              className={`font-bold text-lg text-center whitespace-nowrap leading-[16px] transition-colors duration-200 ${
                activeTab === "activated"
                  ? "text-white"
                  : "text-primary-400"
              }`}
            >
              Activated{" "}
              <AnimatePresence mode="wait" initial={false} custom={countDir}>
                <motion.span
                  key={activatedCount}
                  custom={countDir}
                  variants={counterVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: MOTION.duration.fast }}
                  className="inline-block"
                >
                  ({activatedCount})
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>

        {/* Tab Panel */}
        <div
          id="rewards-panel"
          role="tabpanel"
          aria-labelledby={
            activeTab === "available" ? "tab-available" : "tab-activated"
          }
          className="w-full overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: MOTION.duration.tabSwitch,
                ease: MOTION.easing.standard,
              }}
              className="flex flex-col gap-4 items-start w-full"
            >
              {activeTab === "available" ? (
                state.availableRewards.length > 0 ? (
                  <AnimatePresence>
                    {state.availableRewards.map((reward, i) => (
                      <motion.div
                        key={reward.id}
                        layout
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            opacity: { duration: 0.2 },
                            height: {
                              duration: MOTION.duration.collapse,
                              delay: 0.05,
                            },
                          },
                        }}
                        className="w-full overflow-hidden"
                      >
                        <RewardCard
                          reward={reward}
                          showBorder={
                            i < state.availableRewards.length - 1
                          }
                          onActivate={(sourceRect) =>
                            handleActivate(reward.id, sourceRect)
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="flex items-center justify-center py-8 w-full">
                    <span className="text-lg text-primary-300">
                      No available rewards
                    </span>
                  </div>
                )
              ) : state.activatedRewards.length > 0 ? (
                <AnimatePresence>
                  {state.activatedRewards.map((reward, i) => (
                    <motion.div
                      key={reward.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          opacity: { duration: 0.2 },
                          height: {
                            duration: MOTION.duration.collapse,
                            delay: 0.05,
                          },
                        },
                      }}
                      transition={{
                        delay: i * 0.06,
                        duration: MOTION.duration.normal,
                      }}
                      className="w-full overflow-hidden"
                    >
                      <RewardCard
                        reward={reward}
                        showBorder={
                          i < state.activatedRewards.length - 1
                        }
                        activated
                        onRemove={(sourceRect) =>
                          handleRemove(reward.id, sourceRect)
                        }
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center py-8 w-full">
                  <span className="text-lg text-primary-300">
                    No activated rewards yet
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {flyingRewards.length > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {flyingRewards.map((item) => (
              <FlyingRewardGhost
                key={item.id}
                id={item.id}
                text={item.text}
                sourceRect={item.sourceRect}
                targetRect={item.targetRect}
                onComplete={() => handleFlyComplete(item.id)}
              />
            ))}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
