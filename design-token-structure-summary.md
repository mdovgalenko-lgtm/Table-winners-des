# Design Token Structure Summary (Player Front)

## Scope

This summary is based on the exported token file:

- `MasterDesignSystem.tokens.json`

I also attempted to query the Figma node directly from the provided URL, but the MCP wrapper in this session rejected required tool arguments (`fileKey`/`nodeId`).  
The structure below is derived from the Figma-linked export metadata (`com.figma.variableId`, alias references, and token groups), which still reflects your Figma variable graph.

## High-Level Token Architecture

The token system is organized in three practical layers:

1. **Brand / Primitive layer** (raw values)
2. **Alias layer** (references from one token to another, using `{Token.Path}`)
3. **Mapped / Semantic layer** (UI-purpose names that consume brand/primitive aliases)

In this file, the **alias mechanism** exists as inline references (for example `"$value": "{Brand Color.1.500}"`) rather than as a separately named top-level collection called `Alias`.

## Top-Level Groups Found

Top-level groups in the exported structure:

- `Logotype`
- `Comment's Style`
- `Brand Color`
- `Primary`
- `Secondary`
- `Button in Banners`
- `Glass Effect`
- `Deposit Button in Header`
- `Accent Color`
- `Gradient`
- `Letter Color`
- `Border radius`
- `Label`
- `font`

Global export metadata:

- `"$extensions": { "com.figma.modeName": "Arial" }`

## Connection Point: Brand -> Alias -> Mapped

### 1) Brand / Primitive Collection(s)

These hold direct color values (hex + RGBA components), e.g.:

- `Brand Color.1.500 = #8352FF`
- `Brand Color.1.600 = #6941CC`
- `Primary.*`
- `Secondary.*`
- `Accent Color.Warning.500`

These are the stable source values.

### 2) Alias Links (Reference Layer)

Alias references are encoded as token values in curly braces:

- `{Primary.100}`
- `{Primary.200}`
- `{Brand Color.1.500}`
- `{Brand Color.1.600}`
- `{Brand Color.1.400}`
- `{Brand Color.1.300}`
- `{Accent Color.Warning.500}`

This is the key "connection point" between collections: a token in one semantic group points to a token in a primitive group.

### 3) Mapped / Semantic Collection

The main semantic mapping group in this export is:

- `Letter Color`

It maps UI intent (surface/text/special roles) to primitive or brand references.

Concrete mapped examples:

- `Letter Color.Text.Dark -> {Primary.100}`
- `Letter Color.Text.Gray -> {Primary.200}`
- `Letter Color.Special.Link -> {Brand Color.1.500}`
- `Letter Color.Special.Warning -> {Accent Color.Warning.500}`
- `Letter Color.Brand Color.Brand Color 1 - 600 -> {Brand Color.1.600}`
- `Letter Color.Brand Color.Brand Color 1 - 500 -> {Brand Color.1.500}`
- `Letter Color.Brand Color.Brand Color 1 - 400 -> {Brand Color.1.400}`
- `Letter Color.Brand Color.Brand Color 1 - 300 -> {Brand Color.1.300}`

So in practice:

- **Brand** provides source colors
- **Alias** references point to those source colors
- **Mapped** semantic tokens (especially in `Letter Color`) consume those aliases for UI usage

## Token Inventory (from this export)

- Total Figma-linked variable entries: **195**
- Token types:
  - `color`: **102**
  - `number`: **86**
  - `string`: **7**
- Alias-style references (`{...}`): **8**

## Practical Notes

- The export currently represents a **single resolved mode** (`Arial`) in `com.figma.modeName`.
- Because this is a resolved export, some collection-level Figma metadata (like explicit collection labels such as "Alias" or "Mapped") may not appear as separate top-level objects even though the dependency graph is present via references.
- For implementation, `Letter Color` should be treated as the semantic contract, while `Brand Color` / `Primary` / `Secondary` / `Accent Color` remain source palettes.

