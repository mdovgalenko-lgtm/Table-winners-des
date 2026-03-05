"use client";

interface ProviderLogo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const providers: ProviderLogo[] = [
  { id: "evolution", src: "/logos/evolution.svg", alt: "Evolution", width: 70, height: 16 },
  { id: "ezugi", src: "/live-casino-logos/ezugi.svg", alt: "Ezugi", width: 64, height: 24 },
  { id: "live88", src: "/live-casino-logos/live88.svg", alt: "Live88", width: 70, height: 19 },
  { id: "winfinity", src: "/live-casino-logos/winfinity.svg", alt: "Winfinity", width: 70, height: 15 },
];

export default function LiveCasinoProviders() {
  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <h3
        className="text-primary-600"
        style={{ fontSize: 18, lineHeight: "21px", fontWeight: 700 }}
      >
        Providers
      </h3>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex" style={{ gap: 8 }}>
          {providers.map((p) => (
            <div
              key={p.id}
              className="shrink-0 flex items-center justify-center"
              style={{
                width: 102,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#2E2D49",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
                padding: "8px 16px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                style={{ width: p.width, height: p.height }}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
