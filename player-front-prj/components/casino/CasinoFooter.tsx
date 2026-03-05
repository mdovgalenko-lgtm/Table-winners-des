"use client";

const footerLinks = [
  { label: "Terms and Conditions", highlighted: true },
  { label: "Privacy Policy", highlighted: false },
  { label: "Contact Us", highlighted: false },
  { label: "Betting Rules", highlighted: false },
  { label: "VIP Loyalty Program", highlighted: false },
];

function ShowMoreArrow() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/footer/arrow-right.svg" alt="" style={{ width: 16, height: 16 }} />
  );
}

export default function CasinoFooter() {
  return (
    <div
      className="rounded-[16px] flex flex-col gap-6 items-center p-3"
      style={{ backgroundColor: "#26253C", boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)" }}
    >
      {/* About text */}
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="text-primary-600 font-bold w-full" style={{ fontSize: 16, lineHeight: "18px" }}>
          Vegangster Casino: Your Ultimate Online Casino Experience
        </p>
        <p className="text-primary-400 w-full" style={{ fontSize: 14, lineHeight: "20px", fontWeight: 400 }}>
          Welcome to Vegangster Casino, where we redefine what an online casino should be. Our platform
          offers an exhilarating blend of top-notch casino games, rewarding promotions, and first-rate
          customer service. Join us today for an unparalleled gambling experience.
        </p>
        <button className="flex items-center gap-1 h-6 overflow-hidden rounded-[20px]">
          <span className="text-primary-600 font-bold text-center whitespace-nowrap" style={{ fontSize: 14, lineHeight: "16px" }}>
            Show More
          </span>
          <ShowMoreArrow />
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#363555" }} className="w-full" />

      {/* Page links + social icons */}
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Page links */}
        <div
          className="flex flex-wrap items-center justify-center w-full"
          style={{ gap: 24, fontSize: 16, lineHeight: "18px", fontWeight: 400 }}
        >
          {footerLinks.map((link) => (
            <button key={link.label}>
              <span
                className={`whitespace-nowrap ${link.highlighted ? "text-brand-300" : "text-primary-600"}`}
                style={{ fontSize: 16, lineHeight: "18px" }}
              >
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-start" style={{ gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/footer/social-instagram.svg" alt="Instagram" className="shrink-0 overflow-hidden" style={{ width: 32, height: 32 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/footer/social-twitter.svg" alt="X" className="shrink-0 overflow-hidden" style={{ width: 32, height: 32 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/footer/social-telegram.svg" alt="Telegram" className="shrink-0 overflow-hidden" style={{ width: 32, height: 32 }} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#363555" }} className="w-full" />

      {/* Partner logos */}
      <div className="flex flex-wrap items-start justify-center w-full" style={{ gap: 32 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer/18plus.svg" alt="18+" style={{ width: 24, height: 24 }} className="shrink-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer/gambling-therapy.svg" alt="Gambling Therapy" style={{ width: 50.77, height: 24 }} className="shrink-0" />
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#363555" }} className="w-full" />

      {/* Copyright */}
      <p className="text-primary-400 w-full" style={{ fontSize: 14, lineHeight: "20px", fontWeight: 400 }}>
        © 2024 Your Casino. All rights reserved. Licensed and regulated by [Licensing Authority], License Number [000000].
      </p>
    </div>
  );
}
