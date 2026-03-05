"use client";

import LogoGrid, { type LogoItem } from "./LogoGrid";

const row1: LogoItem[] = [
  { id: "visa", src: "/logos/visa.svg", alt: "Visa", width: 70.9, height: 24 },
  { id: "mastercard", src: "/logos/mastercard.svg", alt: "MasterCard", width: 37.5, height: 24 },
  { id: "mobile-commerce", src: "/logos/mobile-commerce.svg", alt: "Mobile Commerce", width: 43.2, height: 24 },
];

export default function PaymentMethods() {
  return <LogoGrid title="Payment Methods" rows={[row1]} />;
}
