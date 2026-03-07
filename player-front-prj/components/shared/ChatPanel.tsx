"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION } from "@/lib/motion";

const IMG = {
  language: "https://www.figma.com/api/mcp/asset/b7b54bed-e6f3-4463-813a-99be1728c268",
  participants: "https://www.figma.com/api/mcp/asset/227576b9-9064-4991-a3c3-de3b41f39d36",
  settings: "https://www.figma.com/api/mcp/asset/9b04f1ab-3b65-477a-90d6-771cce098bdc",
  close: "https://www.figma.com/api/mcp/asset/56a27c8c-fd15-4ffb-8a54-6ab488e05495",
  closeWhite: "https://www.figma.com/api/mcp/asset/ddf6592a-d1d5-45a6-895f-194e0922278d",
  verify: "https://www.figma.com/api/mcp/asset/118e4a88-3e4d-4042-9018-5923af8650b4",
  verifyDot: "https://www.figma.com/api/mcp/asset/9d928136-2e21-47ef-8918-a3c05e9c4ae1",
  avatarAdel: "https://www.figma.com/api/mcp/asset/87d55b29-4663-4a9b-9759-8d16a87ae69e",
  avatarAdel2: "https://www.figma.com/api/mcp/asset/543ef718-7816-4bc2-8f6b-090a1104f471",
  avatarMery: "https://www.figma.com/api/mcp/asset/def77a53-0894-45af-9e39-efb4d2ba9e85",
  thumbsUp: "https://www.figma.com/api/mcp/asset/51f5e82b-bac2-4a5d-97c4-1898e426576d",
  shareIos: "https://www.figma.com/api/mcp/asset/e47109f6-556a-49e1-9a26-25335c92f20c",
};

const NAV_HEIGHT = 84;

interface ChatMsg {
  id: number;
  type: "other" | "own";
  name?: string;
  nameColor?: string;
  isAdmin?: boolean;
  avatar?: "adel" | "mery";
  quote?: { name: string; text: string };
  text: string;
  time: string;
  updated?: boolean;
}

const MOCK_MESSAGES: ChatMsg[] = [
  {
    id: 1, type: "other", name: "Adel", nameColor: "#00B247", isAdmin: true, avatar: "adel",
    quote: { name: "Max", text: "Lorem ipsum dolor sit amet" },
    text: "Lorem ipsum dolor sit amet, consectetur", time: "22:30",
  },
  { id: 2, type: "other", name: "Mery", nameColor: "#EF5DA8", avatar: "mery", text: "Lorem ipsum dolor", time: "22:30" },
  { id: 3, type: "other", name: "Mery", nameColor: "#EF5DA8", avatar: "mery", text: "Lorem ipsum dolor", time: "22:30" },
  {
    id: 4, type: "other",
    quote: { name: "Max", text: "Lorem ipsum dolor sit amet" },
    text: "Lorem ipsum dolor sit asdsыва", time: "22:30",
  },
  {
    id: 5, type: "other", name: "Adel", nameColor: "#00B247", isAdmin: true, avatar: "adel",
    quote: { name: "Max", text: "Lorem ipsum dolor sit amet" },
    text: "Lorem ipsum dolor sit amet, consectetur", time: "22:30",
  },
  { id: 6, type: "own", text: "Lorem ipsum dolor", time: "22:30" },
  { id: 7, type: "own", text: "Lorem ipsum dolor", time: "22:30", updated: true },
  { id: 8, type: "other", quote: { name: "Max", text: "" }, text: "", time: "" },
];

function AdelAvatar() {
  return (
    <div className="relative rounded-[200px] shrink-0" style={{ width: 35, height: 35 }}>
      <div className="absolute inset-0 pointer-events-none rounded-[200px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute max-w-none" style={{ height: "120.83%", left: "-73.52%", top: "-20.83%", width: "221.71%" }} src={IMG.avatarAdel} />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[200px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute max-w-none" style={{ height: "451.71%", left: "-117.73%", top: "-91.76%", width: "301.18%" }} src={IMG.avatarAdel2} />
      </div>
    </div>
  );
}

function MeryAvatar() {
  return (
    <div className="relative rounded-[200px] shrink-0" style={{ width: 35, height: 35 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[200px] w-full h-full" src={IMG.avatarMery} />
    </div>
  );
}

function VerifyBadge() {
  return (
    <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
      <div className="absolute" style={{ left: 3, top: 3, width: 10, height: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.verifyDot} />
      </div>
      <div className="absolute" style={{ left: 1, top: 1, width: 14, height: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.verify} />
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: ChatMsg }) {
  if (msg.id === 8) {
    return (
      <div className="flex items-start">
        <div className="w-[41px] shrink-0" />
        <div className="flex items-start px-2 py-[5px] rounded-[9px]" style={{ backgroundColor: "#4A4874" }}>
          <div className="flex items-center rounded-[5px] shrink-0 w-2">
            <div className="w-[3px] rounded-[5px] shrink-0" style={{ backgroundColor: "#EBEBF2", height: 18 }} />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[13px] text-primary-600 leading-[18px]" style={{ letterSpacing: -0.078 }}>Max</span>
          </div>
        </div>
      </div>
    );
  }

  if (msg.type === "own") {
    return (
      <div className="flex flex-col items-end w-full gap-[3px]">
        <div className="flex items-end px-2 py-[5px] rounded-[9px]" style={{ backgroundColor: "#4A4874" }}>
          <div className="flex flex-col gap-[2px] items-end">
            <div className="flex gap-[5px] items-end">
              <span className="text-[16px] text-primary-600 leading-[20px] text-right" style={{ letterSpacing: -0.23 }}>{msg.text}</span>
              {!msg.updated && (
                <div className="flex flex-col items-end justify-end pl-1 pt-[3px] shrink-0" style={{ height: 16 }}>
                  <span className="text-[10px] text-primary-600 leading-normal whitespace-nowrap">{msg.time}</span>
                </div>
              )}
            </div>
            {msg.updated && (
              <div className="flex items-end justify-end w-full">
                <div className="flex flex-col items-end justify-end pl-1 pt-[3px]" style={{ height: 16 }}>
                  <span className="text-[10px] text-primary-600 leading-normal text-right whitespace-nowrap">Updated</span>
                </div>
                <div className="flex flex-col items-end justify-end pl-1 pt-[3px]" style={{ height: 16 }}>
                  <span className="text-[10px] text-primary-600 leading-normal whitespace-nowrap">{msg.time}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end w-full">
      <div className="w-[41px] shrink-0 flex items-end">
        {msg.avatar === "adel" && <AdelAvatar />}
        {msg.avatar === "mery" && <MeryAvatar />}
      </div>
      <div className="flex flex-col items-start px-2 py-[5px] rounded-[9px]" style={{ backgroundColor: "#4A4874" }}>
        <div className="flex flex-col gap-[2px] items-start">
          {msg.name && (
            <div className="flex items-start">
              <span className="text-[13px] leading-[18px]" style={{ color: msg.nameColor, letterSpacing: -0.078 }}>
                {msg.name}
              </span>
              {msg.isAdmin && (
                <>
                  <div className="flex items-center justify-center shrink-0" style={{ width: 20 }}>
                    <VerifyBadge />
                  </div>
                  <span className="text-[13px] leading-[18px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: -0.078 }}>
                    admin
                  </span>
                </>
              )}
            </div>
          )}

          {msg.quote && (
            <div className="flex items-start" style={{ width: 202 }}>
              <div className="flex items-center rounded-[5px] shrink-0 w-2">
                <div className="w-[3px] rounded-[5px] shrink-0" style={{ backgroundColor: "#EBEBF2", height: 36 }} />
              </div>
              <div className="flex flex-col items-start pr-2">
                <div className="flex flex-col items-start pr-2" style={{ height: 18 }}>
                  <span className="text-[13px] text-primary-600 leading-[18px]" style={{ letterSpacing: -0.078 }}>{msg.quote.name}</span>
                </div>
                <div className="flex flex-col items-start overflow-clip" style={{ height: 18 }}>
                  <span className="text-[13px] text-primary-600 leading-[18px] whitespace-nowrap" style={{ letterSpacing: -0.078 }}>{msg.quote.text}</span>
                </div>
              </div>
            </div>
          )}

          {msg.text && (
            <div className="flex items-end">
              <span className="text-[15px] text-primary-600 leading-[20px] whitespace-nowrap" style={{ letterSpacing: -0.23 }}>{msg.text}</span>
            </div>
          )}

          {msg.time && (
            <div className="flex items-end justify-end w-full">
              <div className="flex flex-col items-end justify-end pl-1 pt-[3px]" style={{ height: 16 }}>
                <span className="text-[10px] text-primary-600 leading-normal whitespace-nowrap">{msg.time}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const PANEL_VARIANTS = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 280 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.25, ease: MOTION.easing.accelerate } },
};

const COLLAPSED_VARIANTS = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 280 } },
  exit: { y: 40, opacity: 0, transition: { duration: 0.2, ease: MOTION.easing.accelerate } },
};

function CollapsedChatBar({
  onExpand,
  onClose,
}: {
  onExpand: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="collapsed-chat"
      className="fixed left-0 right-0 max-w-[375px] mx-auto z-[55]"
      style={{ bottom: NAV_HEIGHT }}
      variants={COLLAPSED_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onExpand}
        className="flex items-center justify-between w-full px-4 py-2 rounded-t-[16px] cursor-pointer"
        style={{
          backgroundColor: "rgba(38, 37, 60, 0.8)",
          borderTop: "1px solid #363555",
          boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div
          className="flex gap-2 items-center flex-1 min-w-0"
        >
          <div className="flex items-center pr-1">
            <div className="relative rounded-[200px] shrink-0" style={{ width: 24, height: 24 }}>
              <div className="absolute inset-0 pointer-events-none rounded-[200px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute max-w-none" style={{ height: "120.83%", left: "-73.52%", top: "-20.83%", width: "221.71%" }} src={IMG.avatarAdel} />
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[200px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute max-w-none" style={{ height: "451.71%", left: "-117.73%", top: "-91.76%", width: "301.18%" }} src={IMG.avatarAdel2} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start text-primary-600">
            <span className="text-[12px] leading-[14px]">Adel</span>
            <span className="text-[14px] font-bold leading-[16px]">Lorem ipsum dolor sit...</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: MOTION.press.scale }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Dismiss chat"
          className="relative shrink-0"
          style={{ width: 24, height: 24 }}
        >
          <div className="absolute" style={{ inset: "15.08% 16.67% 18.25% 16.67%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.closeWhite} />
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"full" | "collapsed">("full");

  useEffect(() => {
    if (open) setMode("full");
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {open && mode === "full" && (
        <motion.div
          key="full-chat"
          className="fixed inset-0 top-[56px] z-[60] flex flex-col max-w-[375px] mx-auto"
          style={{ backgroundColor: "#1F1E2E" }}
          variants={PANEL_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="flex items-center justify-end gap-2 px-4 py-4 shrink-0"
            style={{ backgroundColor: "#363555", backdropFilter: "blur(8px)", boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.15)" }}
          >
            <div className="relative shrink-0 overflow-hidden" style={{ width: 28, height: 28 }}>
              <div className="absolute" style={{ inset: "-14.29%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block max-w-none w-full h-full" src={IMG.language} />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              className="flex flex-col items-end justify-center shrink-0"
              style={{
                backgroundColor: "#4A4874",
                border: "1px solid #4A4874",
                borderRadius: 100,
                paddingInline: 10,
                paddingBlock: 6,
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
              }}
            >
              <div className="flex gap-1 items-center justify-center" style={{ height: 16 }}>
                <div className="relative shrink-0" style={{ width: 17, height: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.participants} />
                </div>
                <span className="text-[14px] text-primary-600 text-center whitespace-nowrap leading-normal">285</span>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              className="flex items-center justify-end shrink-0"
              style={{
                backgroundColor: "#4A4874",
                border: "1px solid #4A4874",
                borderRadius: 100,
                paddingInline: 10,
                paddingBlock: 6,
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
              }}
            >
              <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.settings} />
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              onClick={() => setMode("collapsed")}
              aria-label="Close chat"
              className="flex items-center justify-end shrink-0"
              style={{
                backgroundColor: "#4A4874",
                border: "1px solid #4A4874",
                borderRadius: 100,
                paddingInline: 10,
                paddingBlock: 6,
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
              }}
            >
              <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
                <div className="absolute" style={{ inset: "15.08% 16.67% 18.25% 16.67%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.close} />
                </div>
              </div>
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
            <div className="flex flex-col gap-[3px] items-start pl-[3px]">
              <ChatMessage msg={MOCK_MESSAGES[0]} />

              <div className="flex flex-col gap-[6px] items-start w-full">
                <ChatMessage msg={MOCK_MESSAGES[1]} />
                <ChatMessage msg={MOCK_MESSAGES[2]} />

                <div className="flex flex-col gap-[3px] items-start w-full">
                  <ChatMessage msg={MOCK_MESSAGES[3]} />
                  <ChatMessage msg={MOCK_MESSAGES[4]} />
                </div>
              </div>

              <div className="flex flex-col gap-[3px] items-end w-full">
                <ChatMessage msg={MOCK_MESSAGES[5]} />
                <ChatMessage msg={MOCK_MESSAGES[6]} />
                <ChatMessage msg={MOCK_MESSAGES[7]} />
              </div>
            </div>
          </div>

          <div className="flex items-center px-4 shrink-0" style={{ height: 50 }}>
            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              className="flex items-center justify-center shrink-0 overflow-clip"
              style={{ width: 36, height: 36, backgroundColor: "#6D6D92", borderRadius: 100 }}
              aria-label="Share"
            >
              <div className="relative overflow-clip" style={{ width: 24, height: 24 }}>
                <div className="absolute" style={{ inset: "7.39% 17.13% 7.39% 17.14%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute block max-w-none w-full h-full" src={IMG.shareIos} />
                </div>
              </div>
            </motion.button>

            <div
              className="flex-1 flex items-center overflow-clip mx-4"
              style={{
                height: 34,
                backgroundColor: "#4A4874",
                border: "1px solid #6D6D92",
                borderRadius: 100,
              }}
            >
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent text-[14px] text-primary-600 leading-[20px] outline-none placeholder:text-[#9292AA] px-3"
                style={{ letterSpacing: -0.4 }}
              />
            </div>

            <motion.button
              whileTap={{ scale: MOTION.press.scale }}
              className="flex items-center justify-center shrink-0 overflow-clip"
              style={{ width: 36, height: 36, backgroundColor: "#6D6D92", borderRadius: 100 }}
              aria-label="Like"
            >
              <div className="relative" style={{ width: 26, height: 26, boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.25)" }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="absolute max-w-none" style={{ left: "-11.76%", top: "-10.92%", width: "123.53%", height: "123.53%" }} src={IMG.thumbsUp} />
                </div>
              </div>
            </motion.button>
          </div>

          <div className="flex justify-center pt-4 pb-3 shrink-0">
            <div className="rounded-full" style={{ width: 134, height: 5, backgroundColor: "#EBEBF2" }} />
          </div>
        </motion.div>
      )}

      {open && mode === "collapsed" && (
        <CollapsedChatBar
          onExpand={() => setMode("full")}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
