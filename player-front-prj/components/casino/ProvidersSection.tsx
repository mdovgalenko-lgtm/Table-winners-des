"use client";

import LogoGrid, { type LogoItem } from "./LogoGrid";

const row1: LogoItem[] = [
  { id: "netent", src: "/logos/netent.svg", alt: "NetEnt", width: 60, height: 24 },
  { id: "push-gaming", src: "/logos/push-gaming.svg", alt: "Push Gaming", width: 70, height: 7.3 },
  { id: "quickspin", src: "/logos/quickspin.svg", alt: "Quickspin", width: 70, height: 16.6 },
  { id: "microgaming", src: "/logos/microgaming.svg", alt: "Microgaming", width: 70, height: 16 },
];

const row2: LogoItem[] = [
  { id: "playson", src: "/logos/playson.svg", alt: "Playson", width: 70, height: 18 },
  { id: "evolution", src: "/logos/evolution.svg", alt: "Evolution", width: 70, height: 16 },
  { id: "elk", src: "/logos/elk.svg", alt: "ELK Studios", width: 58.3, height: 24 },
  { id: "piastrix", src: "/logos/piastrix.svg", alt: "Piastrix", width: 62.9, height: 24 },
];

export default function ProvidersSection() {
  return <LogoGrid title="Providers" rows={[row1, row2]} />;
}
