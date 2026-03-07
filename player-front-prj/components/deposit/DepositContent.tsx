"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { BonusSelectionModal, CashBonus, CASH_BONUSES, ADDITIONAL_BONUSES } from "./CashBonusModal";
import { PendingWithdrawModal, INITIAL_PENDING_WITHDRAWALS } from "./PendingWithdrawModal";

/* ─── Back Arrow (same as Account page) ─── */

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 19L8 12L15 5" stroke="#EBEBF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Icons ─── */

function CoinsIcon() {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "18.55% 3.94% 18.56% 3.95%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deposit/icon-coins.svg" alt="" className="absolute block w-full h-full" style={{ maxWidth: "none" }} />
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
      <div className="absolute" style={{ inset: "12.5%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deposit/icon-plus.svg" alt="" className="absolute block w-full h-full" style={{ maxWidth: "none" }} />
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
      <div className="absolute" style={{ inset: "12.17% 28.64% 12.17% 28.84%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deposit/icon-arrow-right.svg" alt="" className="absolute block w-full h-full" style={{ maxWidth: "none" }} />
      </div>
    </div>
  );
}

function PaymentLogo({ type }: { type: "visa" | "mastercard" }) {
  const inset = type === "visa" ? "33.33% 0 32.82% 0" : "18.75% 0 19.68% 0";
  return (
    <div className="relative shrink-0" style={{ width: 48, height: 48, padding: 4 }}>
      <div className="relative w-full h-full overflow-clip">
        <div className="absolute" style={{ inset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/deposit/${type}.svg`} alt={type} className="absolute block w-full h-full" style={{ maxWidth: "none" }} />
        </div>
      </div>
    </div>
  );
}

function CryptoLogo({ src, rounded }: { src: string; rounded?: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: 48, height: 48, padding: 4 }}>
      <div className={`relative w-full h-full ${rounded ? "rounded-[50px]" : "overflow-clip"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 block w-full h-full" style={{ maxWidth: "none" }} />
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#47DA9C" />
      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#E5DD38" />
      <path d="M8 4V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill="white" />
    </svg>
  );
}

function SmallCloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.76.24a.814.814 0 00-1.152 0L6 4.848.84.24A.814.814 0 00-.312.24a.814.814 0 000 1.152L4.848 6 .24 10.608a.814.814 0 001.152 1.152L6 7.152l4.608 4.608a.814.814 0 001.152-1.152L7.152 6 11.76 1.392a.814.814 0 000-1.152z"
        fill="#EBEBF2"
      />
    </svg>
  );
}

/* ─── Toast Notification ─── */

const TOAST_DURATION = 4;
const PROGRESS_R = 13;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_R;

function CheckCircleIcon24() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#47DA9C" />
      <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToastCloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M9 1L1 9M1 1L9 9" stroke="#EBEBF2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DeletionToast({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDismiss, TOAST_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-x-0 top-0 z-[110] pointer-events-none max-w-[375px] mx-auto p-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: MOTION.easing.standard }}
            className="pointer-events-auto"
          >
            <div
              className="flex gap-1 items-start px-3 py-4 rounded-[16px]"
              style={{
                backgroundColor: "#2E2D49",
                border: "1px solid #363555",
                boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
              }}
            >
              <div className="flex flex-1 gap-1 items-start min-w-0">
                <div className="shrink-0">
                  <CheckCircleIcon24 />
                </div>
                <p className="flex-1 text-lg text-primary-600 leading-[16px]">
                  Your pending transaction was successfully canceled.
                </p>
              </div>
              <button
                onClick={onDismiss}
                aria-label="Dismiss notification"
                className="relative shrink-0 w-8 h-8 flex items-center justify-center"
              >
                <svg className="absolute inset-0" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r={PROGRESS_R} stroke="#363555" strokeWidth="2" />
                  <motion.circle
                    cx="16"
                    cy="16"
                    r={PROGRESS_R}
                    stroke="#8352FF"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={PROGRESS_CIRCUMFERENCE}
                    initial={{ strokeDashoffset: PROGRESS_CIRCUMFERENCE }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: TOAST_DURATION, ease: "linear" }}
                    transform="rotate(-90 16 16)"
                  />
                </svg>
                <div className="relative">
                  <ToastCloseIcon />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Top App Bar ─── */

function TopAppBar() {
  return (
    <div
      className="flex items-center justify-between px-4 py-2 shrink-0 w-full"
      style={{ height: 56, backgroundColor: "#1F1E2E" }}
    >
      <Link href="/account" aria-label="Back to account">
        <motion.div whileTap={{ scale: MOTION.press.scale }}>
          <BackArrow />
        </motion.div>
      </Link>
      <p className="text-xl font-normal text-primary-600 whitespace-nowrap leading-[21px]">
        Deposit
      </p>
      <div className="shrink-0 w-6" />
    </div>
  );
}

/* ─── Section Title ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] font-bold text-primary-600 leading-[18px] w-full">
      {children}
    </p>
  );
}

/* ─── Card Shell ─── */

function Card({ children, className = "", height = 56 }: { children: React.ReactNode; className?: string; height?: number }) {
  return (
    <div
      className={`flex items-center px-3 w-full rounded-[16px] ${className}`}
      style={{
        height,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── "You have" section ─── */

function YouHaveSection({ onViewClick, count }: { onViewClick: () => void; count: number }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <SectionTitle>You have</SectionTitle>
      <Card>
        <div className="flex flex-1 gap-1 items-center min-w-0">
          <CoinsIcon />
          <span className="flex-1 text-lg text-primary-400 leading-[16px]">
            {count} pending withdrawal
          </span>
        </div>
        <motion.button
          whileTap={{ scale: MOTION.press.scale }}
          onClick={onViewClick}
          className="flex items-center justify-center h-8 px-4 rounded-btn-sm shrink-0"
          style={{ backgroundColor: "#8352FF" }}
        >
          <span className="text-lg font-bold text-white text-center leading-[16px]">View</span>
        </motion.button>
      </Card>
    </div>
  );
}

/* ─── Selected Bonus Card ─── */

function SelectedBonusCard({ bonus, onRemove }: { bonus: CashBonus; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: MOTION.duration.normal, ease: MOTION.easing.standard }}
      className="relative flex-1 flex flex-col gap-1 items-start justify-center px-3 py-[10px] rounded-[16px] min-w-0"
      style={{
        height: 68,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className="absolute inset-0 overflow-clip rounded-[16px] pointer-events-none">
        <div
          className="absolute -translate-y-1/2"
          style={{
            width: 288,
            height: 280,
            left: -147.5,
            top: "calc(50% + 1px)",
            background: "radial-gradient(ellipse at center, rgba(131,82,255,0.2) 0%, transparent 65%)",
          }}
        />
      </div>

      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        onClick={onRemove}
        className="absolute flex items-center justify-center overflow-clip rounded-[20px] z-10"
        style={{
          width: 24,
          height: 24,
          top: -4,
          right: -4,
          backgroundColor: "#2E2D49",
          boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
        }}
      >
        <SmallCloseIcon />
      </motion.button>

      <span className="relative text-lg font-bold text-primary-600 leading-[16px] w-full truncate">
        {bonus.badge.line1} {bonus.badge.line2}
      </span>
      <div className="relative flex gap-1 items-start w-full">
        <div className="shrink-0">
          <CheckCircleIcon />
        </div>
        <span className="flex-1 text-md leading-[14px] min-w-0" style={{ color: "#47DA9C" }}>
          Bonus applied
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Selected Additional Bonus Card (Warning state) ─── */

function SelectedAdditionalBonusCard({ bonus, onRemove }: { bonus: CashBonus; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: MOTION.duration.normal, ease: MOTION.easing.standard }}
      className="relative flex-1 flex flex-col gap-1 items-start justify-center px-3 py-[10px] rounded-[16px] min-w-0"
      style={{
        height: 68,
        backgroundColor: "#2E2D49",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className="absolute inset-0 overflow-clip rounded-[16px] pointer-events-none">
        <div
          className="absolute -translate-y-1/2"
          style={{
            width: 288,
            height: 280,
            left: -147,
            top: "calc(50% + 1px)",
            background: "radial-gradient(ellipse at center, rgba(131,82,255,0.2) 0%, transparent 65%)",
          }}
        />
      </div>

      <motion.button
        whileTap={{ scale: MOTION.press.scale }}
        onClick={onRemove}
        className="absolute flex items-center justify-center overflow-clip rounded-[20px] z-10"
        style={{
          width: 24,
          height: 24,
          top: -4,
          right: -4,
          backgroundColor: "#2E2D49",
          boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.15)",
        }}
      >
        <SmallCloseIcon />
      </motion.button>

      <span className="relative text-lg font-bold text-primary-600 leading-[16px] w-full whitespace-nowrap truncate">
        {bonus.badge.line1} {bonus.badge.line2}
      </span>
      <div className="relative flex flex-1 gap-1 items-start w-full min-w-0">
        <div className="shrink-0">
          <WarningCircleIcon />
        </div>
        <span className="flex-1 text-md leading-[14px] min-w-0" style={{ color: "#E5DD38" }}>
          Min. €20,000.00 to apply
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Bonus Section ─── */

function BonusSection({
  selectedBonus,
  additionalBonus,
  onOpenCashModal,
  onOpenAdditionalModal,
  onRemoveBonus,
  onRemoveAdditional,
}: {
  selectedBonus: CashBonus | null;
  additionalBonus: CashBonus | null;
  onOpenCashModal: () => void;
  onOpenAdditionalModal: () => void;
  onRemoveBonus: () => void;
  onRemoveAdditional: () => void;
}) {
  const hasBoth = selectedBonus && additionalBonus;
  const title = hasBoth ? "Available bonuses" : "Choose your bonus";

  return (
    <motion.div
      layout
      transition={{ duration: MOTION.duration.normal, ease: MOTION.easing.standard }}
      className="flex flex-col gap-2 items-center justify-center w-full"
    >
      <SectionTitle>{title}</SectionTitle>

      <AnimatePresence mode="wait">
        {hasBoth ? (
          <motion.div
            key="both"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.normal }}
            className="flex gap-2 items-center w-full"
          >
            <SelectedBonusCard bonus={selectedBonus} onRemove={onRemoveBonus} />
            <SelectedAdditionalBonusCard bonus={additionalBonus} onRemove={onRemoveAdditional} />
          </motion.div>
        ) : selectedBonus ? (
          <motion.div
            key="cash-selected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.normal }}
            className="flex gap-2 items-center w-full"
          >
            <SelectedBonusCard bonus={selectedBonus} onRemove={onRemoveBonus} />
            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              onClick={onOpenAdditionalModal}
              className="flex flex-1 gap-1 items-center px-3 py-2 rounded-[16px] min-w-0"
              style={{
                height: 68,
                backgroundColor: "#2E2D49",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
              }}
            >
              <span className="flex-1 text-lg font-bold text-primary-600 leading-[16px] text-left">
                Select additional bonus
              </span>
              <PlusIcon />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.normal }}
            className="w-full"
          >
            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              onClick={onOpenCashModal}
              className="flex items-center px-3 w-full rounded-[16px]"
              style={{
                height: 68,
                backgroundColor: "#2E2D49",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
              }}
            >
              <span className="flex-1 text-lg font-bold text-primary-600 leading-[16px] text-left">
                Select cash bonus
              </span>
              <PlusIcon />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Saved payment methods ─── */

interface SavedCard {
  type: "visa" | "mastercard";
  last4: string;
}

const SAVED_CARDS: SavedCard[] = [
  { type: "visa", last4: "8439" },
  { type: "mastercard", last4: "2351" },
];

function SavedPaymentMethodsSection() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <SectionTitle>Saved payment methods</SectionTitle>
      <div className="flex flex-col gap-2 items-start w-full">
        {SAVED_CARDS.map((card) => (
          <Card key={card.last4}>
            <div className="flex flex-1 gap-2 items-center min-w-0">
              <PaymentLogo type={card.type} />
              <span className="text-lg text-primary-600 whitespace-nowrap leading-[16px]">
                • • • • {card.last4}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              className="flex flex-col items-center justify-center h-8 px-4 rounded-btn-sm shrink-0"
              style={{ backgroundColor: "#7b52e2" }}
            >
              <span className="text-lg font-bold text-white text-center leading-[16px]">Deposit</span>
            </motion.button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── All payment methods ─── */

interface PaymentMethod {
  logo: React.ReactNode;
  name: string;
  subtitle?: string;
}

const ALL_METHODS: PaymentMethod[] = [
  { logo: <PaymentLogo type="visa" />, name: "Visa" },
  { logo: <PaymentLogo type="mastercard" />, name: "Mastercard" },
  { logo: <CryptoLogo src="/deposit/bitcoin.svg" rounded />, name: "Bitcoin", subtitle: "BTC" },
  { logo: <CryptoLogo src="/deposit/tether.svg" rounded />, name: "Tether", subtitle: "USDT" },
  { logo: <CryptoLogo src="/deposit/usdc.svg" />, name: "Coinbase", subtitle: "USDC" },
  { logo: <CryptoLogo src="/deposit/ethereum.svg" rounded />, name: "Ethereum", subtitle: "ETH" },
];

function AllPaymentMethodsSection() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <SectionTitle>All payment methods</SectionTitle>
      <div className="flex flex-col gap-2 items-start w-full">
        {ALL_METHODS.map((method) => (
          <motion.button
            key={method.name}
            whileTap={{ scale: MOTION.press.scale }}
            className="flex gap-2 items-center px-3 w-full rounded-[16px]"
            style={{
              height: 56,
              backgroundColor: "#2E2D49",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex flex-1 gap-2 items-center min-w-0">
              {method.logo}
              <div className="flex flex-col gap-1 items-start justify-center">
                <span className="text-lg text-primary-600 whitespace-nowrap leading-[16px]">
                  {method.name}
                </span>
                {method.subtitle && (
                  <span className="text-md text-[#8d8ea6] whitespace-nowrap leading-[14px]">
                    {method.subtitle}
                  </span>
                )}
              </div>
            </div>
            <ArrowRightIcon />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─── */

export default function DepositContent() {
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<CashBonus | null>(null);
  const [additionalBonus, setAdditionalBonus] = useState<CashBonus | null>(null);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(INITIAL_PENDING_WITHDRAWALS);
  const [toastVisible, setToastVisible] = useState(false);
  const deletedRef = useRef(false);

  const handleOpenCashModal = useCallback(() => setCashModalOpen(true), []);
  const handleCloseCashModal = useCallback(() => setCashModalOpen(false), []);
  const handleOpenAdditionalModal = useCallback(() => setAdditionalModalOpen(true), []);
  const handleCloseAdditionalModal = useCallback(() => setAdditionalModalOpen(false), []);

  const handleOpenWithdrawModal = useCallback(() => {
    deletedRef.current = false;
    setWithdrawModalOpen(true);
  }, []);

  const handleCloseWithdrawModal = useCallback(() => {
    setWithdrawModalOpen(false);
    if (deletedRef.current) {
      setToastVisible(true);
      deletedRef.current = false;
    }
  }, []);

  const handleDeleteWithdrawal = useCallback((id: string) => {
    setPendingWithdrawals((prev) => prev.filter((w) => w.id !== id));
    deletedRef.current = true;
  }, []);

  const handleDismissToast = useCallback(() => setToastVisible(false), []);

  const handleConfirmCashBonus = useCallback((bonus: CashBonus) => {
    setSelectedBonus(bonus);
    setCashModalOpen(false);
  }, []);

  const handleConfirmAdditionalBonus = useCallback((bonus: CashBonus) => {
    setAdditionalBonus(bonus);
    setAdditionalModalOpen(false);
  }, []);

  const handleRemoveBonus = useCallback(() => {
    setSelectedBonus(null);
  }, []);

  const handleRemoveAdditional = useCallback(() => {
    setAdditionalBonus(null);
  }, []);

  return (
    <>
      <TopAppBar />

      <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#1F1E2E" }}>
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <YouHaveSection onViewClick={handleOpenWithdrawModal} count={pendingWithdrawals.length} />
          <BonusSection
            selectedBonus={selectedBonus}
            additionalBonus={additionalBonus}
            onOpenCashModal={handleOpenCashModal}
            onOpenAdditionalModal={handleOpenAdditionalModal}
            onRemoveBonus={handleRemoveBonus}
            onRemoveAdditional={handleRemoveAdditional}
          />
          <SavedPaymentMethodsSection />
          <AllPaymentMethodsSection />
        </div>
      </main>

      <BonusSelectionModal
        open={cashModalOpen}
        onClose={handleCloseCashModal}
        onConfirm={handleConfirmCashBonus}
        initialSelected={selectedBonus?.id}
        title="Cash Bonus"
        bonuses={CASH_BONUSES}
      />

      <BonusSelectionModal
        open={additionalModalOpen}
        onClose={handleCloseAdditionalModal}
        onConfirm={handleConfirmAdditionalBonus}
        initialSelected={additionalBonus?.id}
        title="Additional Bonus"
        bonuses={ADDITIONAL_BONUSES}
      />

      <PendingWithdrawModal
        open={withdrawModalOpen}
        onClose={handleCloseWithdrawModal}
        withdrawals={pendingWithdrawals}
        onDelete={handleDeleteWithdrawal}
      />

      <DeletionToast visible={toastVisible} onDismiss={handleDismissToast} />
    </>
  );
}
