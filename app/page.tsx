"use client";

import { useState } from "react";

// Mastercard brand colors
const MC = {
  red: "#EB001B",
  orange: "#FF5F00",
  yellow: "#F79E1B",
  white: "#FFFFFF",
  dark: "#1A1A1A",
  gray: "#6B6B6B",
  lightGray: "#F4F4F4",
  border: "#E0E0E0",
};

function MastercardLogo({ size = 56 }: { size?: number }) {
  const r = size / 2;
  const overlap = size * 0.18;
  return (
    <svg width={size * 1.6} height={size} viewBox={`0 0 ${size * 1.6} ${size}`} aria-label="Mastercard">
      {/* Red circle */}
      <circle cx={r} cy={r} r={r} fill={MC.red} />
      {/* Yellow circle */}
      <circle cx={size * 1.6 - r} cy={r} r={r} fill={MC.yellow} />
      {/* Orange overlap */}
      <clipPath id="mc-overlap-left">
        <circle cx={r} cy={r} r={r} />
      </clipPath>
      <circle
        cx={size * 1.6 - r}
        cy={r}
        r={r}
        fill={MC.orange}
        clipPath="url(#mc-overlap-left)"
        style={{ transform: `translateX(-${overlap}px)` }}
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill={MC.orange} />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" fill={MC.orange} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill={MC.gray}>
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

const LUCKY_URLS = [
  "https://www.theuselessweb.com/",
  "https://neal.fun/infinite-craft/",
  "https://orteil.dashnet.org/cookieclicker/",
  "https://www.fallingfalling.com/",
  "https://www.windows93.net/",
  "https://pointerpointer.com/",
  "https://www.koalastothemax.com/",
  "https://heavenonearth.io/",
  "https://www.staggeringbeauty.com/",
  "https://www.omfgdogs.com/",
  "https://cat-bounce.com/",
  "https://www.aquarium.web.id/",
  "https://weirdorconfusing.com/",
  "https://papertoilet.com/",
  "https://www.nyan.cat/",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://search.brave.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  const handleLucky = () => {
    const url = LUCKY_URLS[Math.floor(Math.random() * LUCKY_URLS.length)];
    window.open(url, "_blank");
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        backgroundColor: MC.white,
        color: MC.dark,
      }}
    >
      {/* Top nav */}
      <nav
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${MC.border}` }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <MastercardLogo size={32} />
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: MC.dark, letterSpacing: "0.08em" }}
          >
            Mastercard
          </span>
        </div>

        {/* Nav right */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full transition-colors"
            style={{ color: MC.gray }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MC.lightGray)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            </svg>
          </button>
          <a
            href="#"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all"
            style={{
              color: MC.white,
              background: `linear-gradient(135deg, ${MC.red} 0%, ${MC.orange} 100%)`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `linear-gradient(135deg, #c8001a 0%, ${MC.red} 100%)`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `linear-gradient(135deg, ${MC.red} 0%, ${MC.orange} 100%)`)
            }
          >
            Sign in
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 px-4" style={{ marginTop: "-60px" }}>
        {/* Mastercard logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <MastercardLogo size={72} />
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: MC.gray, letterSpacing: "0.2em" }}
          >
            Mastercard Search
          </p>
        </div>

        {/* Headline */}
        <h1
          className="font-bold text-center leading-tight mb-2"
          style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            color: MC.dark,
            letterSpacing: "-0.5px",
          }}
        >
          Search the world
        </h1>
        <p
          className="text-base text-center mb-8"
          style={{ color: MC.gray, maxWidth: "480px" }}
        >
          Priceless possibilities, one search away.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-[584px]">
          {/* Search input */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-full transition-all"
            style={{
              background: MC.white,
              border: `2px solid ${focused ? MC.orange : MC.border}`,
              boxShadow: focused
                ? `0 0 0 4px rgba(255,95,0,0.12), 0 2px 8px rgba(0,0,0,0.08)`
                : "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 text-base outline-none bg-transparent"
              style={{ color: MC.dark }}
              placeholder="Search the web..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-lg leading-none transition-colors"
                style={{ color: MC.gray }}
                onMouseEnter={(e) => (e.currentTarget.style.color = MC.red)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MC.gray)}
                aria-label="Clear"
              >
                ✕
              </button>
            )}
            <span className="w-px h-6" style={{ background: MC.border }} />
            <button
              type="button"
              className="rounded-full p-1 transition-colors"
              aria-label="Search by voice"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MC.lightGray)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <MicIcon />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold rounded-full cursor-pointer transition-all"
              style={{
                color: MC.white,
                background: `linear-gradient(135deg, ${MC.red} 0%, ${MC.orange} 100%)`,
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, #c8001a 0%, ${MC.red} 100%)`;
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(235,0,27,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${MC.red} 0%, ${MC.orange} 100%)`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleLucky}
              className="px-6 py-2 text-sm font-semibold rounded-full cursor-pointer transition-all"
              style={{
                color: MC.dark,
                background: MC.lightGray,
                border: `1px solid ${MC.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = MC.orange;
                e.currentTarget.style.color = MC.orange;
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,95,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = MC.border;
                e.currentTarget.style.color = MC.dark;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer
        className="text-sm"
        style={{ borderTop: `1px solid ${MC.border}`, color: MC.gray }}
      >
        <div className="px-6 py-3" style={{ borderBottom: `1px solid ${MC.border}` }}>
          United States
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between px-6 py-3 gap-2">
          <div className="flex flex-wrap gap-6">
            {["Advertising", "Business", "About"].map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MC.orange)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MC.gray)}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Settings"].map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MC.orange)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MC.gray)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
