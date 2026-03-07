"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";

export interface BonusItem {
  id: string;
  amount: number;
  label: string;
}

export interface RewardItem {
  id: string;
  title: string;
  giftLine1: string;
  giftLine2: string;
  details: { label: string; value: string }[];
  countdown: { days: string; time: string };
}

interface BonusesState {
  headerBalance: number;
  bonuses: BonusItem[];
  availableRewards: RewardItem[];
  activatedRewards: RewardItem[];
}

type Action =
  | { type: "REMOVE_BONUS"; id: string }
  | { type: "ADD_TO_BALANCE"; amount: number }
  | { type: "ACTIVATE_REWARD"; id: string }
  | { type: "DEACTIVATE_REWARD"; id: string };

const initialState: BonusesState = {
  headerBalance: 7500.0,
  bonuses: [
    { id: "rebate", amount: 10.03, label: "Rebate" },
    { id: "referral", amount: 25.0, label: "Refer a friend bonus" },
    { id: "reload", amount: 20.0, label: "Reload bonus" },
  ],
  availableRewards: [
    {
      id: "live-roulette",
      title: "Live Roulette",
      giftLine1: "€10",
      giftLine2: "Voucher",
      details: [
        { label: "Deposit from:", value: "€20" },
        { label: "Wager:", value: "x20" },
      ],
      countdown: { days: "364d", time: "14h 23m" },
    },
    {
      id: "limited-status",
      title: "Limited Time Status",
      giftLine1: "Next 20",
      giftLine2: "Free Spins",
      details: [
        { label: "Cashback:", value: "10%" },
        { label: "Rebate:", value: "0.2%" },
        { label: "Deposit from:", value: "€2000" },
        { label: "Period:", value: "10 day" },
      ],
      countdown: { days: "09d", time: "14h 23m" },
    },
    {
      id: "weekly-lossback",
      title: "Weekly Lossback",
      giftLine1: "€10",
      giftLine2: "Lossback",
      details: [
        { label: "Lossback:", value: "€10" },
        { label: "Deposit from:", value: "€5" },
        { label: "Wager:", value: "x5" },
        { label: "Bonus Cap:", value: "1000%" },
      ],
      countdown: { days: "01d", time: "15h 00m" },
    },
  ],
  activatedRewards: [],
};

function reducer(state: BonusesState, action: Action): BonusesState {
  switch (action.type) {
    case "REMOVE_BONUS":
      return {
        ...state,
        bonuses: state.bonuses.filter((b) => b.id !== action.id),
      };
    case "ADD_TO_BALANCE":
      return {
        ...state,
        headerBalance: +(state.headerBalance + action.amount).toFixed(2),
      };
    case "ACTIVATE_REWARD": {
      const reward = state.availableRewards.find((r) => r.id === action.id);
      if (!reward) return state;
      return {
        ...state,
        availableRewards: state.availableRewards.filter(
          (r) => r.id !== action.id
        ),
        activatedRewards: [...state.activatedRewards, reward],
      };
    }
    case "DEACTIVATE_REWARD": {
      const reward = state.activatedRewards.find((r) => r.id === action.id);
      if (!reward) return state;
      return {
        ...state,
        activatedRewards: state.activatedRewards.filter(
          (r) => r.id !== action.id
        ),
        availableRewards: [...state.availableRewards, reward],
      };
    }
    default:
      return state;
  }
}

interface BonusesContextValue {
  state: BonusesState;
  removeBonus: (id: string) => void;
  addToBalance: (amount: number) => void;
  activateReward: (id: string) => void;
  deactivateReward: (id: string) => void;
  headerBalanceRef: React.RefObject<HTMLButtonElement | null>;
}

const BonusesContext = createContext<BonusesContextValue | null>(null);

export function BonusesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerBalanceRef = useRef<HTMLButtonElement>(null);

  const removeBonus = useCallback(
    (id: string) => dispatch({ type: "REMOVE_BONUS", id }),
    []
  );
  const addToBalance = useCallback(
    (amount: number) => dispatch({ type: "ADD_TO_BALANCE", amount }),
    []
  );
  const activateReward = useCallback(
    (id: string) => dispatch({ type: "ACTIVATE_REWARD", id }),
    []
  );
  const deactivateReward = useCallback(
    (id: string) => dispatch({ type: "DEACTIVATE_REWARD", id }),
    []
  );

  const value = useMemo(
    () => ({
      state,
      removeBonus,
      addToBalance,
      activateReward,
      deactivateReward,
      headerBalanceRef,
    }),
    [state, removeBonus, addToBalance, activateReward, deactivateReward]
  );

  return (
    <BonusesContext.Provider value={value}>{children}</BonusesContext.Provider>
  );
}

export function useBonuses() {
  const ctx = useContext(BonusesContext);
  if (!ctx) throw new Error("useBonuses must be used within BonusesProvider");
  return ctx;
}
