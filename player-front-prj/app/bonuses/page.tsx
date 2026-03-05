"use client";

import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BonusesProvider, useBonuses } from "@/hooks/useBonusesState";
import { MOTION } from "@/lib/motion";
import { BonusesHeader } from "@/components/bonuses/Header";
import { UserCard } from "@/components/bonuses/UserCard";
import { BalanceCards } from "@/components/bonuses/BalanceCards";
import { BonusRow } from "@/components/bonuses/BonusRow";
import { ReloadBonus } from "@/components/bonuses/ReloadBonus";
import { RedeemCode } from "@/components/bonuses/RedeemCode";
import { RewardsSection } from "@/components/bonuses/RewardsSection";
import { SharedBottomNav } from "@/components/shared/BottomNav";
import { FlyingCollect } from "@/components/bonuses/FlyingCollect";

interface FlyingItem {
  id: string;
  text: string;
  sourceRect: DOMRect;
  targetRect: DOMRect;
}

function BonusesContent() {
  const { state, removeBonus, addToBalance, headerBalanceRef } = useBonuses();
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [glowing, setGlowing] = useState(false);
  const collectingRef = useRef<Set<string>>(new Set());

  const handleCollect = useCallback(
    (
      bonusId: string,
      amount: number,
      amountText: string,
      sourceRect: DOMRect
    ) => {
      if (collectingRef.current.has(bonusId)) return;
      collectingRef.current.add(bonusId);

      const targetRect = headerBalanceRef.current?.getBoundingClientRect();
      if (!targetRect) {
        removeBonus(bonusId);
        addToBalance(amount);
        collectingRef.current.delete(bonusId);
        return;
      }

      setFlyingItems((prev) => [
        ...prev,
        { id: bonusId, text: amountText, sourceRect, targetRect },
      ]);

      const removeDelay = MOTION.duration.flyMoney * 1000 * 0.4;
      const arriveDelay = MOTION.duration.flyMoney * 1000;

      setTimeout(() => removeBonus(bonusId), removeDelay);

      setTimeout(() => {
        addToBalance(amount);
        setGlowing(true);
        setFlyingItems((prev) => prev.filter((f) => f.id !== bonusId));
        collectingRef.current.delete(bonusId);
        setTimeout(() => setGlowing(false), MOTION.duration.glow * 1000);
      }, arriveDelay);
    },
    [removeBonus, addToBalance, headerBalanceRef]
  );

  return (
    <div className="flex flex-col h-screen w-full max-w-[375px] mx-auto bg-surface-bg overflow-hidden">
      <BonusesHeader glowing={glowing} />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-start p-4 w-full">
          <div className="w-full mb-4">
            <UserCard />
          </div>
          <div className="w-full mb-4">
            <BalanceCards />
          </div>

          <AnimatePresence>
            {state.bonuses.map((bonus) => (
              <motion.div
                key={bonus.id}
                initial={false}
                animate={{
                  opacity: 1,
                  height: "auto",
                  marginBottom: 16,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginBottom: 0,
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  height: {
                    duration: MOTION.duration.collapse,
                    ease: MOTION.easing.standard,
                  },
                  marginBottom: {
                    duration: MOTION.duration.collapse,
                    ease: MOTION.easing.standard,
                  },
                }}
                className="w-full overflow-hidden"
              >
                {bonus.id === "reload" ? (
                  <ReloadBonus
                    amount={bonus.amount}
                    onCollect={(sourceRect) =>
                      handleCollect(
                        bonus.id,
                        bonus.amount,
                        `€${bonus.amount.toFixed(2)}`,
                        sourceRect
                      )
                    }
                  />
                ) : (
                  <BonusRow
                    amount={`€${bonus.amount.toFixed(2)}`}
                    label={bonus.label}
                    buttonText="Collect"
                    onCollect={(sourceRect) =>
                      handleCollect(
                        bonus.id,
                        bonus.amount,
                        `€${bonus.amount.toFixed(2)}`,
                        sourceRect
                      )
                    }
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="w-full mb-4">
            <RedeemCode />
          </div>
          <div className="w-full">
            <RewardsSection />
          </div>
        </div>
      </main>

      <SharedBottomNav activePage="bonuses" />

      <AnimatePresence>
        {flyingItems.map((item) => (
          <FlyingCollect
            key={item.id}
            id={item.id}
            text={item.text}
            sourceRect={item.sourceRect}
            targetRect={item.targetRect}
            onComplete={() =>
              setFlyingItems((prev) => prev.filter((f) => f.id !== item.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function BonusesPage() {
  return (
    <BonusesProvider>
      <BonusesContent />
    </BonusesProvider>
  );
}
