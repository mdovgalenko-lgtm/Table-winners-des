export const MOTION = {
  easing: {
    standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
    decelerate: [0, 0, 0.2, 1] as [number, number, number, number],
    accelerate: [0.4, 0, 1, 1] as [number, number, number, number],
  },
  spring: {
    default: { type: "spring" as const, stiffness: 300, damping: 30 },
    bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
    gentle: { type: "spring" as const, stiffness: 200, damping: 20 },
    stiff: { type: "spring" as const, stiffness: 500, damping: 35 },
  },
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.25,
    moderate: 0.35,
    slow: 0.5,
    flyMoney: 0.7,
    countUp: 600,
    collapse: 0.4,
    flyReward: 0.5,
    tabSwitch: 0.25,
    glow: 0.6,
  },
  press: {
    scale: 0.97,
  },
} as const;
