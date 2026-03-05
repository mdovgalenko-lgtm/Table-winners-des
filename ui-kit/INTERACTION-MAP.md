# Interaction Map — Bonuses Page

## Interactive Elements & States

### Header
| Element | States | Animation |
|---------|--------|-----------|
| Deposit button | default / hover (brightness +10%) / pressed (scale 0.97) / focus (brand outline) | Spring press, brightness transition 150ms |
| Messages button | default / hover (brightness +10%) / pressed (scale 0.97) / focus (brand outline) | Spring press, brightness transition 150ms |
| Balance display | idle / receiving | Count-up (ease-out cubic, 600ms RAF), glow pulse (boxShadow + scale keyframes, 600ms) |

### Bonus Rows (Rebate, Refer a Friend)
| Element | States | Animation |
|---------|--------|-----------|
| Card container | default / hover (elevated shadow) | Shadow transition 200ms |
| Collect button | default / hover (brightness +10%) / pressed (scale 0.97) / focus (brand outline) / disabled (opacity 40%) | Spring press, filter transition 150ms |

### Reload Bonus Card
| Element | States | Animation |
|---------|--------|-----------|
| Collect button | default / hover (brightness +10%) / pressed (scale 0.97) / focus (brand outline) / disabled (opacity 40%) | Spring press, filter transition 150ms |

### Redeem Bonus Code
| Element | States | Animation |
|---------|--------|-----------|
| Redeem button (outline) | default / hover (brand bg 10%) / pressed (scale 0.97) / focus (brand outline) / disabled (opacity 40%) | Spring press, color transition 150ms |

### Rewards Section — Tabs
| Element | States | Animation |
|---------|--------|-----------|
| Tab indicator pill | tracks active tab | Spring physics (stiffness 300, damping 30), translateX 0 ↔ 100% |
| Available tab | default / active (white text) / focus (brand outline) | Color transition 200ms |
| Activated tab | default / active (white text) / focus (brand outline) | Color transition 200ms |
| Activated counter | increments / decrements | Direction-aware vertical slide (enter from top/bottom, 150ms) |
| Tab content | entering / exiting | Directional fade + translateX (±30px, 250ms, standard ease) |

**Keyboard:** Arrow Left/Right switches tabs and moves focus.

### Rewards Section — Available Items
| Element | States | Animation |
|---------|--------|-----------|
| Activate button | default / hover (brightness +10%) / pressed (scale 0.97) / focus (brand outline) / disabled (opacity 40%) | Spring press |

### Rewards Section — Activated Items
| Element | States | Animation |
|---------|--------|-----------|
| Remove button (outline) | default / hover (border + bg tint) / pressed (scale 0.97) / focus (brand outline) | Spring press, color transition 150ms |

### Bottom Navigation
| Element | States | Animation |
|---------|--------|-----------|
| Nav items | default / active (brand color) / hover (lighter text) / pressed (scale 0.97) / focus (brand outline) | Spring press, color transition 150ms |

---

## Animation Flows

### Collect Flow (Bonus → Header Balance)
1. **t=0ms** — User clicks "Collect" → double-click guard activates → flying money element spawns at amount text position
2. **t=0–700ms** — Flying element arcs along curved bezier path (3 keyframes: source → midpoint above → header balance), scaling 1→0.85→0.4, fading to 0
3. **t=280ms** — Bonus row removed from state → AnimatePresence exit begins (opacity 0, height 0, margin 0 over 400ms)
4. **t=700ms** — Flying element arrives → balance counts up (ease-out cubic, 600ms) → header container pulses (scale 1→1.05→1 + purple glow boxShadow, 600ms)
5. **t=1300ms** — Glow fades, balance settled at new value
6. Sibling elements reposition smoothly via height collapse animation (no layout jumps)

### Reward Activation Flow (Available → Activated)
1. **t=0ms** — User clicks "Activate" → flying ghost pill (reward title) spawns from button position
2. **t=0ms** — State dispatches ACTIVATE_REWARD → item exits Available list (opacity 0 + height collapse, 400ms)
3. **t=0–500ms** — Ghost pill arcs toward "Activated" tab button (scale 1→0.8→0.5, fade)
4. **t=0ms** — Counter increments with upward slide animation (150ms)
5. **t=600ms** — Auto-switches to Activated tab (debounced) → tab indicator slides → content transitions directionally
6. Newly activated item appears with entrance animation (opacity 0→1, y: 10→0)

### Reward Removal Flow (Activated → Available)
1. **t=0ms** — User clicks "Remove" → flying ghost pill spawns from button
2. **t=0ms** — State dispatches DEACTIVATE_REWARD → item exits Activated list (opacity 0 + height collapse)
3. **t=0–500ms** — Ghost pill arcs toward "Available" tab button
4. **t=0ms** — Counter decrements with downward slide animation (150ms)
5. **t=600ms** — Auto-switches to Available tab → content transitions
6. Returned item appears with entrance animation in Available list

### Tab Switch Animation
1. Tab indicator slides with spring physics (no duration — spring settles naturally)
2. Old content exits: fade out + translate in switch direction (250ms, standard ease)
3. AnimatePresence `mode="wait"` ensures old exits before new enters
4. New content enters: fade in + translate from switch direction (250ms)

---

## Accessibility

- All buttons are native `<button>` elements with correct `cursor: pointer`
- Tab control uses `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`
- Tab panel uses `role="tabpanel"`, `aria-labelledby`
- Keyboard navigation: Arrow keys switch tabs with focus management
- Focus rings: 2px brand-colored outline with 2px offset on all interactive elements (`focus-visible`)
- Bottom nav uses `role="navigation"`, `aria-label`, `aria-current="page"`
- Header buttons have `aria-label` for screen readers

---

## Motion System (lib/motion.ts)

| Constant | Value | Usage |
|----------|-------|-------|
| `easing.standard` | `[0.4, 0, 0.2, 1]` | General transitions |
| `spring.default` | `stiffness: 300, damping: 30` | Tab indicator, layout |
| `spring.stiff` | `stiffness: 500, damping: 35` | Button press |
| `duration.fast` | `150ms` | Counter animation |
| `duration.normal` | `250ms` | Entrance animations |
| `duration.collapse` | `400ms` | Height collapse on exit |
| `duration.flyMoney` | `700ms` | Collect flying element |
| `duration.flyReward` | `500ms` | Reward flying ghost |
| `duration.countUp` | `600ms` | Balance count-up |
| `duration.glow` | `600ms` | Header glow pulse |
| `press.scale` | `0.97` | All button press feedback |

---

## Assumptions

1. **No Figma spec for disabled/loading button states** — Disabled uses 40% opacity + no pointer events. Loading state not implemented (no spinner design provided).
2. **Remove button style** — Not specified in Figma; uses a subdued outline variant (50% opacity border, brand text) consistent with the design language.
3. **Auto-tab-switch timing** — 600ms delay after activation/removal to let exit animation complete before switching tabs. Debounced for rapid interactions.
4. **Reward ordering** — Deactivated rewards return to the end of the Available list (append). Original order is not restored.
5. **Hover brightness** — Uses CSS `filter: brightness(1.1)` on filled buttons as the design system doesn't specify explicit hover color tokens.
6. **Flying ghost appearance** — Small branded pill with reward title text; not a full card clone.
7. **Scroll position** — Not explicitly restored on tab switch; content renders at current scroll position.

---

## Running Locally

```bash
cd ui-kit
npm install
npm run dev
# Open http://localhost:3001/bonuses
```
