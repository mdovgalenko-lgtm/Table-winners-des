"use client";

import React, { useState } from "react";
import { Button, IconButton } from "@/components/ui/Button";
import { Input, PasswordInput, SearchInput, OTPInput, Textarea } from "@/components/ui/Input";
import { Badge, NotificationBadge } from "@/components/ui/Badge";
import { Alert, Toast } from "@/components/ui/Alert";
import { Card, GameCard, StatCard } from "@/components/ui/Card";
import { Toggle, Checkbox, Radio } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { Modal, Drawer } from "@/components/ui/Modal";
import { ProgressBar, CircularProgress } from "@/components/ui/Progress";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Accordion } from "@/components/ui/Accordion";
import { Table } from "@/components/ui/Table";
import { Tooltip } from "@/components/ui/Tooltip";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { Divider } from "@/components/ui/Divider";
import { ColorPalette } from "@/components/ui/ColorSwatch";

/* ── Helpers ─────────────────────────────────────── */
function Section({ id, title, description, children }: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-lg text-primary-300">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Group({ label, children, horizontal = false }: {
  label?: string;
  children: React.ReactNode;
  horizontal?: boolean;
}) {
  return (
    <div className="mb-8">
      {label && (
        <p className="text-md font-bold uppercase tracking-widest text-primary-200 mb-3">
          {label}
        </p>
      )}
      <div
        className={
          horizontal
            ? "flex flex-wrap gap-3 items-center"
            : "flex flex-col gap-4"
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ── Nav items ─────────────────────────────────────── */
const navItems = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "badges", label: "Badges" },
  { id: "alerts", label: "Alerts" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Forms" },
  { id: "select", label: "Select" },
  { id: "tabs", label: "Tabs" },
  { id: "modals", label: "Modals" },
  { id: "progress", label: "Progress" },
  { id: "avatars", label: "Avatars" },
  { id: "accordion", label: "Accordion" },
  { id: "table", label: "Table" },
  { id: "tooltip", label: "Tooltip" },
  { id: "skeleton", label: "Skeleton" },
  { id: "divider", label: "Divider" },
];

/* ── Page ─────────────────────────────────────────── */
export default function UIKitPage() {
  const [toggles, setToggles] = useState({ t1: true, t2: false, t3: false });
  const [checks, setChecks] = useState({ c1: true, c2: false, c3: false });
  const [radio, setRadio] = useState("a");
  const [selectVal, setSelectVal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonBlock, setButtonBlock] = useState(false);

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* ── Header ───────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-surface-card/80 backdrop-blur-md border-b border-primary-100/10">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-card bg-gradient-brand flex items-center justify-center">
              <span className="text-white font-bold text-md">V</span>
            </div>
            <span className="text-white font-bold text-xl">Vegangster</span>
            <Badge variant="brand" size="sm">UI Kit</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">Arial</Badge>
            <Badge variant="brand" size="sm" dot>Dark Theme</Badge>
          </div>
        </div>
      </header>

      <div className="flex max-w-screen-xl mx-auto">
        {/* ── Sidebar Nav ──────────────────────── */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-6 pl-6 pr-4 border-r border-primary-100/10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-200 mb-3 px-2">
            Components
          </p>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-2 py-1.5 rounded-card text-lg text-primary-300 hover:text-white hover:bg-surface-sub transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* ── Main Content ─────────────────────── */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 py-10 space-y-16">

          {/* Hero */}
          <div className="text-center py-8">
            <h1 className="text-5xl font-bold text-gradient-brand mb-4">
              Vegangster UI Kit
            </h1>
            <p className="text-xl text-primary-300 max-w-2xl mx-auto">
              A complete component library built from the Master Design System.
              All components follow the dark-first design language with the brand purple palette.
            </p>
          </div>

          {/* ── 1. Colors ─────────────────────── */}
          <Section
            id="colors"
            title="Colors"
            description="Design tokens extracted from MasterDesignSystem.tokens.json — the full palette."
          >
            <div className="space-y-8">
              <ColorPalette
                title="Brand Color 1 · Purple"
                swatches={[
                  { color: "brand-100", name: "Brand 100", hex: "#CEBAFF" },
                  { color: "brand-300", name: "Brand 300", hex: "#A888F7" },
                  { color: "brand-400", name: "Brand 400", hex: "#9069F0" },
                  { color: "brand-500", name: "Brand 500", hex: "#8352FF" },
                  { color: "brand-600", name: "Brand 600", hex: "#6941CC" },
                ]}
              />
              <ColorPalette
                title="Brand Color 2 · Pink"
                swatches={[
                  { color: "pink-100", name: "Pink 100", hex: "#F6D9F6" },
                  { color: "pink-300", name: "Pink 300", hex: "#EBADEC" },
                  { color: "pink-400", name: "Pink 400", hex: "#E79DE8" },
                  { color: "pink-500", name: "Pink 500", hex: "#CC5ACA" },
                  { color: "pink-600", name: "Pink 600", hex: "#BF4CBD" },
                ]}
              />
              <ColorPalette
                title="Brand Color 3 · Blue"
                swatches={[
                  { color: "blue-100", name: "Blue 100", hex: "#E0E0FF" },
                  { color: "blue-300", name: "Blue 300", hex: "#7AB4FA" },
                  { color: "blue-400", name: "Blue 400", hex: "#569BF0" },
                  { color: "blue-500", name: "Blue 500", hex: "#3888EB" },
                  { color: "blue-600", name: "Blue 600", hex: "#2674D4" },
                ]}
              />
              <ColorPalette
                title="Primary · Gray Scale"
                swatches={[
                  { color: "primary-100", name: "Primary 100", hex: "#4A4874" },
                  { color: "primary-200", name: "Primary 200", hex: "#6D6D92" },
                  { color: "primary-300", name: "Primary 300", hex: "#9292AA" },
                  { color: "primary-400", name: "Primary 400", hex: "#B5B5C5" },
                  { color: "primary-500", name: "Primary 500", hex: "#CFCFDD" },
                ]}
              />
              <ColorPalette
                title="Surfaces · Dark Backgrounds"
                swatches={[
                  { color: "surface-bg", name: "Background", hex: "#1F1E2E" },
                  { color: "surface-nav", name: "Nav", hex: "#26253C" },
                  { color: "surface-card", name: "Card", hex: "#2E2D49" },
                  { color: "surface-sub", name: "Subheader", hex: "#363455" },
                  { color: "", name: "Header", hex: "#2E2D49" },
                ]}
              />
              <ColorPalette
                title="Accent · Status Colors"
                swatches={[
                  { color: "error-500", name: "Error", hex: "#F53B5D" },
                  { color: "success-500", name: "Success", hex: "#47DA9C" },
                  { color: "warning-500", name: "Warning", hex: "#E5DD38" },
                  { color: "info-500", name: "Info", hex: "#36BCF2" },
                  { color: "", name: "Finance", hex: "#7D4ADC" },
                ]}
              />
            </div>
          </Section>

          {/* ── 2. Typography ─────────────────── */}
          <Section
            id="typography"
            title="Typography"
            description="Font: Arial. Scale from xs (8px) to 5xl (36px) with matching line heights."
          >
            <Card padding="lg">
              <div className="space-y-4">
                {[
                  { size: "text-[36px]", label: "5xl — 36px / 28", text: "Display Heading" },
                  { size: "text-[30px]", label: "4xl — 30px / 23", text: "Page Title" },
                  { size: "text-[24px]", label: "3xl — 24px / 21", text: "Section Heading" },
                  { size: "text-[20px]", label: "2xl — 20px / 20", text: "Card Heading" },
                  { size: "text-[18px]", label: "xl — 18px / 20", text: "Large Body Text" },
                  { size: "text-[16px]", label: "lg+ — 16px / 18", text: "Regular Body Text" },
                  { size: "text-[14px]", label: "lg — 14px / 16", text: "Small Body Text" },
                  { size: "text-[12px]", label: "md — 12px / 14", text: "Caption & Labels" },
                  { size: "text-[10px]", label: "sm — 10px / 11", text: "Micro Text" },
                  { size: "text-[8px]", label: "xs — 8px / 9", text: "Tiny / Badge" },
                ].map(({ size, label, text }) => (
                  <div key={label} className="flex items-baseline gap-6 border-b border-primary-100/10 pb-3">
                    <span className="w-36 text-md text-primary-300 shrink-0 font-mono">{label}</span>
                    <p className={`${size} text-white font-medium`}>{text}</p>
                  </div>
                ))}
                <div className="pt-2 space-y-2">
                  <p className="text-lg font-bold text-white">Bold weight</p>
                  <p className="text-lg text-white">Regular weight</p>
                  <p className="text-lg underline text-brand-300 cursor-pointer">Underline / Link style</p>
                  <p className="text-lg text-gradient-brand font-bold">Gradient text</p>
                  <p className="text-lg text-primary-300">Muted / secondary text</p>
                  <p className="text-lg text-error-500">Error / destructive text</p>
                  <p className="text-lg text-success-500">Success text</p>
                </div>
              </div>
            </Card>
          </Section>

          {/* ── 3. Buttons ────────────────────── */}
          <Section
            id="buttons"
            title="Buttons"
            description="Initial Figma-aligned button set using token radii: filled (4px), preset (8px), icon button (20px)."
          >
            <Group label="Variants">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="filled">Filled</Button>
                <Button variant="preset">Preset</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </Group>
            <Group label="Sizes">
              <div className="flex flex-wrap gap-3 items-end">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </Group>
            <Group label="States">
              <div className="flex flex-wrap gap-3 items-center">
                <Button>Normal</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  }
                >
                  With Icon Left
                </Button>
                <Button
                  iconPosition="right"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  }
                >
                  Icon Right
                </Button>
              </div>
            </Group>
            <Group label="Playground (interactive)">
              <Card padding="md" className="space-y-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Button
                    size="sm"
                    variant={buttonLoading ? "filled" : "preset"}
                    onClick={() => setButtonLoading((v) => !v)}
                  >
                    {buttonLoading ? "Stop loading" : "Toggle loading"}
                  </Button>
                  <Button
                    size="sm"
                    variant={buttonDisabled ? "filled" : "preset"}
                    onClick={() => setButtonDisabled((v) => !v)}
                  >
                    {buttonDisabled ? "Enable button" : "Disable button"}
                  </Button>
                  <Button
                    size="sm"
                    variant={buttonBlock ? "filled" : "preset"}
                    onClick={() => setButtonBlock((v) => !v)}
                  >
                    {buttonBlock ? "Unset full width" : "Set full width"}
                  </Button>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="filled"
                    loading={buttonLoading}
                    disabled={buttonDisabled}
                    fullWidth={buttonBlock}
                  >
                    Figma Filled Button
                  </Button>
                  <Button
                    variant="preset"
                    loading={buttonLoading}
                    disabled={buttonDisabled}
                    fullWidth={buttonBlock}
                  >
                    Figma Preset Button
                  </Button>
                </div>
              </Card>
            </Group>
            <Group label="Icon Buttons">
              <div className="flex flex-wrap gap-3 items-center">
                {(["sm", "md", "lg"] as const).map((size) => (
                  <IconButton key={size} size={size} variant="secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                  </IconButton>
                ))}
                <IconButton variant="primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </IconButton>
                <IconButton variant="ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </IconButton>
              </div>
            </Group>
            <Group label="Full Width">
              <Button variant="primary" fullWidth>Full Width Button</Button>
            </Group>
          </Section>

          {/* ── 4. Inputs ─────────────────────── */}
          <Section
            id="inputs"
            title="Inputs"
            description="Text, password, search, OTP, and textarea. Radius: 8px."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Text Input" placeholder="Enter value..." hint="Helper text below the input" />
              <Input label="With Error" placeholder="Enter email..." error="This field is required" />
              <Input label="With Success" placeholder="Username" success="Username is available" />
              <Input
                label="With Icon"
                placeholder="Search..."
                prefixIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                }
              />
              <PasswordInput label="Password" placeholder="Enter password..." />
              <SearchInput label="Search" placeholder="Search components..." />
              <Input label="Disabled" placeholder="Not editable" disabled value="Disabled value" onChange={() => {}} />
              <div>
                <Textarea label="Textarea" placeholder="Enter your message..." rows={4} hint="Max 500 characters" />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-md font-bold uppercase tracking-widest text-primary-200 mb-3">OTP Input</p>
              <OTPInput length={6} />
            </div>
          </Section>

          {/* ── 5. Badges ─────────────────────── */}
          <Section
            id="badges"
            title="Badges & Tags"
            description="Eight color variants × three sizes. With optional dot indicator."
          >
            <Group label="Variants">
              <div className="flex flex-wrap gap-2">
                <Badge variant="brand">Brand</Badge>
                <Badge variant="pink">Pink</Badge>
                <Badge variant="blue">Blue</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </Group>
            <Group label="With Dot">
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" dot>Online</Badge>
                <Badge variant="error" dot>Offline</Badge>
                <Badge variant="warning" dot>Away</Badge>
                <Badge variant="brand" dot>Active</Badge>
              </div>
            </Group>
            <Group label="Sizes">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="brand" size="sm">Small</Badge>
                <Badge variant="brand" size="md">Medium</Badge>
                <Badge variant="brand" size="lg">Large</Badge>
              </div>
            </Group>
            <Group label="Notification Badge">
              <div className="flex gap-4 items-center">
                <div className="relative inline-flex">
                  <IconButton variant="secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  </IconButton>
                  <span className="absolute -top-1 -right-1"><NotificationBadge count={5} /></span>
                </div>
                <div className="relative inline-flex">
                  <IconButton variant="secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </IconButton>
                  <span className="absolute -top-1 -right-1"><NotificationBadge count={128} /></span>
                </div>
              </div>
            </Group>
          </Section>

          {/* ── 6. Alerts ─────────────────────── */}
          <Section
            id="alerts"
            title="Alerts & Toasts"
            description="Four status variants, dismissible option, and toast format."
          >
            <Group label="Alerts">
              <Alert variant="error" title="Error" dismissible>
                Something went wrong. Please try again later.
              </Alert>
              <Alert variant="success" title="Success">
                Your changes have been saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning" dismissible>
                Your session expires in 5 minutes.
              </Alert>
              <Alert variant="info">
                A new version is available. Refresh to update.
              </Alert>
            </Group>
            <Group label="Toasts">
              <div className="flex flex-wrap gap-3">
                <Toast variant="success" message="Transaction completed!" />
                <Toast variant="error" message="Payment failed. Try again." />
                <Toast variant="warning" message="Connection is unstable." />
                <Toast variant="info" message="New message received." />
              </div>
            </Group>
          </Section>

          {/* ── 7. Cards ──────────────────────── */}
          <Section
            id="cards"
            title="Cards"
            description="Default, glass, brand-tinted, and outlined variants. Radius: 16px."
          >
            <Group label="Card Variants">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="default" padding="md">
                  <p className="text-primary-300 text-md mb-1">Default</p>
                  <p className="text-white font-medium">Standard card surface used for content groups.</p>
                </Card>
                <Card variant="glass" padding="md">
                  <p className="text-primary-300 text-md mb-1">Glass</p>
                  <p className="text-white font-medium">Frosted glass with backdrop blur effect.</p>
                </Card>
                <Card variant="brand" padding="md">
                  <p className="text-primary-300 text-md mb-1">Brand</p>
                  <p className="text-white font-medium">Tinted brand purple for featured content.</p>
                </Card>
                <Card variant="outlined" padding="md" hoverable>
                  <p className="text-primary-300 text-md mb-1">Outlined (hover)</p>
                  <p className="text-white font-medium">Subtle border with hover glow effect.</p>
                </Card>
              </div>
            </Group>
            <Group label="Game Cards">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                <GameCard title="Dragon's Lair" provider="NetEnt" badge="HOT" />
                <GameCard title="Fortune Wheel" provider="Pragmatic" badge="NEW" />
                <GameCard title="Book of Ra" provider="Novomatic" />
                <GameCard title="Starburst" provider="NetEnt" badge="HOT" />
                <GameCard title="Gates of Olympus" provider="Pragmatic" />
                <GameCard title="Wolf Gold" provider="Pragmatic" badge="NEW" />
              </div>
            </Group>
            <Group label="Stat Cards">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Balance"
                  value="$12,480"
                  change={{ value: "+8.2% this month", positive: true }}
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                />
                <StatCard
                  label="Active Players"
                  value="3,241"
                  change={{ value: "+12% today", positive: true }}
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                />
                <StatCard
                  label="Revenue"
                  value="$89,320"
                  change={{ value: "-2.4% vs last week", positive: false }}
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                />
                <StatCard
                  label="Withdrawals"
                  value="$4,120"
                  change={{ value: "+5.1% this week", positive: true }}
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
                />
              </div>
            </Group>
          </Section>

          {/* ── 8. Forms ──────────────────────── */}
          <Section
            id="forms"
            title="Form Controls"
            description="Toggle, Checkbox, and Radio. All support disabled state and labels."
          >
            <Group label="Toggle Switch">
              <div className="space-y-3">
                <Toggle
                  checked={toggles.t1}
                  onChange={(v) => setToggles((p) => ({ ...p, t1: v }))}
                  label="Notifications enabled"
                />
                <Toggle
                  checked={toggles.t2}
                  onChange={(v) => setToggles((p) => ({ ...p, t2: v }))}
                  label="Dark mode"
                />
                <Toggle
                  checked={toggles.t3}
                  onChange={(v) => setToggles((p) => ({ ...p, t3: v }))}
                  label="Auto-renew subscription"
                />
                <Toggle checked={false} disabled label="Disabled toggle" />
              </div>
            </Group>
            <Group label="Sizes">
              <div className="flex flex-wrap gap-6 items-center">
                <Toggle checked size="sm" label="Small" onChange={() => {}} />
                <Toggle checked size="md" label="Medium" onChange={() => {}} />
                <Toggle checked size="lg" label="Large" onChange={() => {}} />
              </div>
            </Group>
            <Group label="Checkboxes">
              <div className="space-y-3">
                <Checkbox
                  checked={checks.c1}
                  onChange={(v) => setChecks((p) => ({ ...p, c1: v }))}
                  label="Accept terms and conditions"
                />
                <Checkbox
                  checked={checks.c2}
                  onChange={(v) => setChecks((p) => ({ ...p, c2: v }))}
                  label="Subscribe to newsletter"
                />
                <Checkbox
                  checked={checks.c3}
                  onChange={(v) => setChecks((p) => ({ ...p, c3: v }))}
                  label="Enable two-factor authentication"
                />
                <Checkbox indeterminate label="Indeterminate state" onChange={() => {}} />
                <Checkbox disabled label="Disabled checkbox" />
              </div>
            </Group>
            <Group label="Radio Buttons">
              <div className="space-y-3">
                {[
                  { value: "a", label: "Daily deposit limit" },
                  { value: "b", label: "Weekly deposit limit" },
                  { value: "c", label: "Monthly deposit limit" },
                ].map((opt) => (
                  <Radio
                    key={opt.value}
                    checked={radio === opt.value}
                    onChange={() => setRadio(opt.value)}
                    label={opt.label}
                    name="limit"
                  />
                ))}
                <Radio disabled label="Disabled option" />
              </div>
            </Group>
          </Section>

          {/* ── 9. Select ─────────────────────── */}
          <Section
            id="select"
            title="Select / Dropdown"
            description="Custom dropdown with keyboard-accessible options and error state."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <Select
                label="Country"
                placeholder="Select your country"
                value={selectVal}
                onChange={setSelectVal}
                options={[
                  { value: "us", label: "United States" },
                  { value: "uk", label: "United Kingdom" },
                  { value: "de", label: "Germany" },
                  { value: "fr", label: "France" },
                  { value: "jp", label: "Japan" },
                ]}
              />
              <Select
                label="Currency (with error)"
                placeholder="Select currency"
                error="Please select a currency"
                options={[
                  { value: "usd", label: "USD — US Dollar" },
                  { value: "eur", label: "EUR — Euro" },
                  { value: "gbp", label: "GBP — British Pound" },
                  { value: "btc", label: "BTC — Bitcoin", disabled: true },
                ]}
              />
              <Select
                label="Disabled"
                placeholder="Not available"
                disabled
                options={[{ value: "x", label: "Option X" }]}
              />
            </div>
          </Section>

          {/* ── 10. Tabs ──────────────────────── */}
          <Section
            id="tabs"
            title="Tabs"
            description="Three variants: pill (default), underline, and card. Radius: 20px."
          >
            <Group label="Pill Tabs (default)">
              <Tabs
                tabs={[
                  { id: "all", label: "All Games" },
                  { id: "slots", label: "Slots", badge: 142 },
                  { id: "live", label: "Live Casino" },
                  { id: "sports", label: "Sports" },
                  { id: "bonus", label: "Bonuses", badge: "3" },
                ]}
                defaultTab="all"
              />
            </Group>
            <Group label="Underline Tabs">
              <Tabs
                variant="underline"
                tabs={[
                  { id: "overview", label: "Overview" },
                  { id: "transactions", label: "Transactions" },
                  { id: "settings", label: "Settings" },
                  { id: "disabled", label: "Disabled", disabled: true },
                ]}
                defaultTab="overview"
              />
            </Group>
            <Group label="Card Tabs">
              <Tabs
                variant="card"
                tabs={[
                  {
                    id: "deposits",
                    label: "Deposits",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7 7 7-7"/></svg>,
                  },
                  {
                    id: "withdrawals",
                    label: "Withdrawals",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>,
                  },
                  {
                    id: "bonuses",
                    label: "Bonuses",
                    badge: 2,
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  },
                ]}
                defaultTab="deposits"
              />
            </Group>
          </Section>

          {/* ── 11. Modals ────────────────────── */}
          <Section
            id="modals"
            title="Modals & Drawers"
            description="Overlay dialog with backdrop blur and a side drawer. Radius: 16px."
          >
            <Group label="Modal" horizontal>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Button variant="ghost" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            </Group>

            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Confirm Withdrawal"
              footer={
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
                </div>
              }
            >
              <div className="space-y-4">
                <p className="text-lg text-primary-400">
                  You are about to withdraw <span className="text-white font-bold">$500.00</span> to your bank account.
                </p>
                <Alert variant="info">Processing may take 1–3 business days.</Alert>
                <Input label="Amount" value="500.00" prefixIcon={<span className="text-primary-300">$</span>} onChange={() => {}} />
              </div>
            </Modal>

            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              title="Filters"
            >
              <div className="space-y-4">
                <Select
                  label="Category"
                  options={[
                    { value: "slots", label: "Slots" },
                    { value: "live", label: "Live Casino" },
                    { value: "sports", label: "Sports" },
                  ]}
                />
                <Toggle checked label="Show only favorites" onChange={() => {}} />
                <Toggle checked={false} label="Show new games only" onChange={() => {}} />
                <Button fullWidth variant="primary" onClick={() => setDrawerOpen(false)}>Apply Filters</Button>
              </div>
            </Drawer>
          </Section>

          {/* ── 12. Progress ──────────────────── */}
          <Section
            id="progress"
            title="Progress"
            description="Linear progress bars and circular gauge. Smooth transitions, five color variants."
          >
            <Group label="Linear Progress Bars">
              <div className="space-y-4 max-w-xl">
                <ProgressBar value={70} variant="brand" label="Brand" showValue />
                <ProgressBar value={90} variant="success" label="Success" showValue size="lg" />
                <ProgressBar value={45} variant="warning" label="Warning" showValue />
                <ProgressBar value={25} variant="error" label="Error" showValue size="sm" />
                <ProgressBar value={60} variant="gradient" label="Gradient" showValue />
              </div>
            </Group>
            <Group label="Circular Progress">
              <div className="flex flex-wrap gap-6">
                <CircularProgress value={75} variant="brand" label="Level" />
                <CircularProgress value={92} size={100} strokeWidth={10} variant="success" label="XP" />
                <CircularProgress value={33} variant="warning" label="Tasks" />
                <CircularProgress value={15} variant="error" label="HP" />
              </div>
            </Group>
          </Section>

          {/* ── 13. Avatars ───────────────────── */}
          <Section
            id="avatars"
            title="Avatars"
            description="Gradient placeholder, initials, image, online status indicator, and avatar groups."
          >
            <Group label="Sizes">
              <div className="flex flex-wrap gap-3 items-end">
                <Avatar size="xs" initials="XS" />
                <Avatar size="sm" initials="SM" />
                <Avatar size="md" initials="MD" />
                <Avatar size="lg" initials="LG" />
                <Avatar size="xl" initials="XL" />
              </div>
            </Group>
            <Group label="Status Indicators">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <Avatar size="md" initials="ON" status="online" />
                  <span className="text-xs text-primary-300">Online</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Avatar size="md" initials="AW" status="away" />
                  <span className="text-xs text-primary-300">Away</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Avatar size="md" initials="BY" status="busy" />
                  <span className="text-xs text-primary-300">Busy</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Avatar size="md" status="offline" />
                  <span className="text-xs text-primary-300">Offline</span>
                </div>
              </div>
            </Group>
            <Group label="Avatar Group">
              <AvatarGroup
                max={4}
                avatars={[
                  { initials: "AB" },
                  { initials: "CD" },
                  { initials: "EF" },
                  { initials: "GH" },
                  { initials: "IJ" },
                  { initials: "KL" },
                ]}
              />
            </Group>
          </Section>

          {/* ── 14. Accordion ─────────────────── */}
          <Section
            id="accordion"
            title="Accordion"
            description="Collapsible content sections. Supports single or multiple open."
          >
            <Card padding="md" className="max-w-2xl">
              <Accordion
                items={[
                  {
                    id: "faq-1",
                    trigger: "How do I make a deposit?",
                    content:
                      "Navigate to the Cashier section, select your preferred payment method, enter the amount, and confirm. Deposits are usually instant.",
                  },
                  {
                    id: "faq-2",
                    trigger: "What are the withdrawal limits?",
                    content:
                      "Minimum withdrawal is $20. Maximum daily withdrawal is $5,000. Processing time varies by payment method (1–5 business days).",
                  },
                  {
                    id: "faq-3",
                    trigger: "How do I claim a bonus?",
                    content:
                      "Bonuses are applied automatically on qualifying deposits. Check the Promotions page for active offers and wagering requirements.",
                  },
                  {
                    id: "faq-4",
                    trigger: "Is my personal data safe?",
                    content:
                      "We use 256-bit SSL encryption and comply with GDPR regulations. Your data is never shared with third parties without your consent.",
                  },
                ]}
                defaultOpen={["faq-1"]}
              />
            </Card>
          </Section>

          {/* ── 15. Table ─────────────────────── */}
          <Section
            id="table"
            title="Data Table"
            description="Responsive table with striped rows, hover state, and custom cell renderers."
          >
            <Table
              keyField="id"
              striped
              columns={[
                { key: "id", header: "#", width: "60px" },
                { key: "game", header: "Game" },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => (
                    <Badge
                      variant={
                        row.status === "Win"
                          ? "success"
                          : row.status === "Loss"
                          ? "error"
                          : "warning"
                      }
                      size="sm"
                    >
                      {String(row.status)}
                    </Badge>
                  ),
                },
                { key: "bet", header: "Bet", align: "right" },
                { key: "payout", header: "Payout", align: "right" },
                {
                  key: "date",
                  header: "Date",
                  render: (row) => (
                    <span className="text-primary-300 text-md">{String(row.date)}</span>
                  ),
                },
              ]}
              data={[
                { id: 1, game: "Book of Ra", status: "Win", bet: "$10.00", payout: "$47.50", date: "Feb 26, 2026" },
                { id: 2, game: "Starburst", status: "Loss", bet: "$5.00", payout: "$0.00", date: "Feb 26, 2026" },
                { id: 3, game: "Wolf Gold", status: "Win", bet: "$25.00", payout: "$112.00", date: "Feb 25, 2026" },
                { id: 4, game: "Gates of Olympus", status: "Pending", bet: "$50.00", payout: "—", date: "Feb 25, 2026" },
                { id: 5, game: "Dragon's Lair", status: "Loss", bet: "$15.00", payout: "$0.00", date: "Feb 24, 2026" },
              ]}
            />
          </Section>

          {/* ── 16. Tooltip ───────────────────── */}
          <Section
            id="tooltip"
            title="Tooltip"
            description="Four placement options. Appears on hover and focus."
          >
            <Group label="Positions" horizontal>
              <Tooltip content="Tooltip on top" position="top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left" position="left">
                <Button variant="secondary">Left</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" position="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </Group>
            <Group label="On Icon">
              <div className="flex gap-4">
                <Tooltip content="Delete this item" position="top">
                  <IconButton variant="ghost">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </IconButton>
                </Tooltip>
                <Tooltip content="Edit settings" position="top">
                  <IconButton variant="ghost">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </IconButton>
                </Tooltip>
              </div>
            </Group>
          </Section>

          {/* ── 17. Skeleton ──────────────────── */}
          <Section
            id="skeleton"
            title="Skeleton Loaders"
            description="Animated loading placeholders for text, cards, and custom shapes."
          >
            <Group label="Primitives" horizontal>
              <div className="flex flex-col gap-2 w-48">
                <Skeleton height="16px" />
                <Skeleton height="12px" width="80%" />
                <Skeleton height="12px" width="60%" />
              </div>
              <Skeleton width="80px" height="80px" rounded="full" />
              <Skeleton width="120px" height="36px" rounded="full" />
            </Group>
            <Group label="Skeleton Cards">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </Group>
            <Group label="Skeleton Text">
              <div className="max-w-sm">
                <SkeletonText lines={4} />
              </div>
            </Group>
          </Section>

          {/* ── 18. Divider ───────────────────── */}
          <Section
            id="divider"
            title="Divider"
            description="Horizontal and vertical separators with optional label."
          >
            <Card padding="lg" className="max-w-2xl space-y-4">
              <p className="text-lg text-primary-400">Content above divider</p>
              <Divider />
              <p className="text-lg text-primary-400">Content between dividers</p>
              <Divider label="OR" />
              <p className="text-lg text-primary-400">Content below</p>
              <div className="flex items-center gap-4 h-12">
                <span className="text-white">Left</span>
                <Divider orientation="vertical" />
                <span className="text-white">Middle</span>
                <Divider orientation="vertical" />
                <span className="text-white">Right</span>
              </div>
            </Card>
          </Section>

          {/* Footer */}
          <div className="border-t border-primary-100/10 pt-8 text-center">
            <p className="text-md text-primary-300">
              Vegangster UI Kit · Built from MasterDesignSystem.tokens.json · Next.js + Tailwind CSS
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
