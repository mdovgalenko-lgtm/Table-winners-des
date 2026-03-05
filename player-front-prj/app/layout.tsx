import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vegangster UI Kit",
  description: "Component library built from the Master Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
