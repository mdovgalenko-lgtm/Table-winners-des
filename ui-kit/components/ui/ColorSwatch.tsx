import React from "react";

interface SwatchProps {
  color: string;
  name: string;
  hex: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ColorSwatch({ color, name, hex }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="w-full h-12 rounded-card border border-primary-100/10"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-md text-white font-medium">{name}</p>
        <p className="text-xs text-primary-300 font-mono">{hex}</p>
      </div>
    </div>
  );
}

export function ColorPalette({
  title,
  swatches,
}: {
  title: string;
  swatches: SwatchProps[];
}) {
  return (
    <div>
      <p className="text-lg text-primary-400 font-medium mb-3">{title}</p>
      <div className="grid grid-cols-5 gap-3">
        {swatches.map((s) => (
          <ColorSwatch key={s.hex} {...s} />
        ))}
      </div>
    </div>
  );
}
