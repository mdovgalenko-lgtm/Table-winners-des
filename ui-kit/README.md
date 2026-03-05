# Vegangster UI Kit

A complete React component library built from `MasterDesignSystem.tokens.json`.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3** with custom design tokens

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see all components.

## Design Tokens

The token layer is now centralized and ready for component work:

- `tokens/index.ts` - primitives, aliases, semantic mappings, CSS vars, Tailwind bridge
- `tokens/design-tokens.json` - portable semantic token contract (for handoff/import workflows)
- `app/globals.css` - runtime CSS custom properties sourced from the same token model
- `tailwind.config.ts` - consumes tokens via `tailwindTokens` instead of hardcoded values

Core values sourced from `MasterDesignSystem.tokens.json`:

| Token | Value |
|---|---|
| Brand Purple (500) | `#8352FF` |
| Background | `#1F1E2E` |
| Card | `#2E2D49` |
| Error | `#F53B5D` |
| Success | `#47DA9C` |
| Font | Arial |

## Components

| Component | File | Description |
|---|---|---|
| Button | `components/ui/Button.tsx` | 6 variants, 3 sizes, loading, icon |
| Input | `components/ui/Input.tsx` | Text, Password, Search, OTP, Textarea |
| Badge | `components/ui/Badge.tsx` | 8 variants, notification badge |
| Alert | `components/ui/Alert.tsx` | 4 status types, toast |
| Card | `components/ui/Card.tsx` | Default, glass, brand, outlined |
| Toggle | `components/ui/Toggle.tsx` | Toggle, Checkbox, Radio |
| Select | `components/ui/Select.tsx` | Custom dropdown |
| Tabs | `components/ui/Tabs.tsx` | Pill, underline, card variants |
| Modal | `components/ui/Modal.tsx` | Dialog + Drawer |
| Progress | `components/ui/Progress.tsx` | Linear + circular |
| Avatar | `components/ui/Avatar.tsx` | Sizes, status, group |
| Accordion | `components/ui/Accordion.tsx` | Collapsible sections |
| Table | `components/ui/Table.tsx` | Striped, hover, custom cells |
| Tooltip | `components/ui/Tooltip.tsx` | 4 placement options |
| Skeleton | `components/ui/Skeleton.tsx` | Text, card, primitive |
| Divider | `components/ui/Divider.tsx` | Horizontal, vertical, labeled |
| ColorSwatch | `components/ui/ColorSwatch.tsx` | Palette display |
