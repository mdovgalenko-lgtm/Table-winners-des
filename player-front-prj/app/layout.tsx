import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SuperMary - Super Demo Player Front",
  description: "Demo player front-end application",
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
