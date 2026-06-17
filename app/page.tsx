"use client";

import { useState, useEffect } from "react";

function MicIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#00e5ff"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" fill="#00e5ff"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#00e5ff">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#00e5ff" opacity="0.7">
      <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
    </svg>
  );
}

/* Animated ticker showing random "system status" lines */
const STATUS_LINES = [
  "SYS: ONLINE  //  NEURAL_LINK: ACTIVE",
  "NETRUNNER_v4.2 // FIREWALL: ENGAGED",
  "ARASAKA_CORP_NET // INTRUSION: NONE",
  "BRAINDANCE_SYNC: 98.7%  //  ICE: CLEAR",
  "MEGACITY_NODE_77 // UPTIME: 99.91%",
];

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

function StatusTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STATUS_LINES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="text-xs tracking-widest opacity-60 neon-cyan flicker font-mono transition-all duration-500">
      {STATUS_LINES[idx]}
    </span>
  );
}

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
      className="flex flex-col min-h-screen relative overflow-hidden"
      style={{ background: "var(--background)", fontFamily: "var(--font-geist-mono), monospace" }}
    >
      {/* ── Top status bar ── */}
      <div
        className="flex items-center justify-between px-5 py-1 border-b text-xs tracking-widest z-10 relative"
        style={{ borderColor: "rgba(0,229,255,0.2)", background: "rgba(0,229,255,0.04)" }}
      >
        <div className="flex items-center gap-3">
          <span className="pulse-dot" />
          <StatusTicker />
        </div>
        <span className="neon-yellow opacity-50 font-mono text-xs">2077.06.08 // 14:52</span>
      </div>

      {/* ── Top nav ── */}
      <nav
        className="flex items-center justify-between px-6 py-3 gap-4 z-10 relative"
        style={{ borderBottom: "1px solid rgba(0,229,255,0.1)" }}
      >
        {/* Left: logo mark */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 flex items-center justify-center border"
            style={{ borderColor: "var(--magenta)", boxShadow: "0 0 8px rgba(255,45,120,0.4)" }}
          >
            <span style={{ color: "var(--magenta)", fontSize: "10px", fontWeight: 900, lineHeight: 1 }}>NC</span>
          </div>
          <span
            className="text-xs tracking-widest uppercase opacity-60"
            style={{ color: "var(--magenta)" }}
          >
            Night City Net
          </span>
        </div>

        {/* Right: nav actions */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded transition-colors hover:bg-[rgba(0,229,255,0.08)]"
            aria-label="Apps"
          >
            <GridIcon />
          </button>
          <a
            href="#"
            className="cp-btn"
            style={{ fontSize: "0.7rem", padding: "0.35rem 1rem" }}
          >
            JACK_IN
          </a>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 z-10 relative" style={{ marginTop: "-40px" }}>

        {/* HUD corner decoration */}
        <div className="w-full max-w-2xl relative">
          {/* TL corner */}
          <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "var(--cyan)" }} />
          {/* TR corner */}
          <div className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: "var(--cyan)" }} />
          {/* BL corner */}
          <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: "var(--cyan)" }} />
          {/* BR corner */}
          <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "var(--cyan)" }} />

          {/* Glitch title */}
          <div className="text-center mb-8">
            <div
              className="text-xs tracking-[0.4em] uppercase mb-2 opacity-50"
              style={{ color: "var(--yellow)" }}
            >
              ▸ NEURAL_SEARCH v4.2 ◂
            </div>
            <h1
              className="glitch-title leading-none select-none font-black tracking-tight"
              data-text="SEARCH"
              style={{
                fontSize: "clamp(56px, 12vw, 96px)",
                color: "var(--cyan)",
                textShadow: "0 0 30px rgba(0,229,255,0.7), 0 0 80px rgba(0,229,255,0.3)",
                letterSpacing: "-2px",
              }}
            >
              SEARCH
            </h1>
            <div className="cp-divider mt-3 max-w-sm mx-auto" />
            <div
              className="text-xs tracking-[0.3em] uppercase mt-2 opacity-40"
              style={{ color: "var(--magenta)" }}
            >
              ENTER QUERY // EXECUTE
            </div>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="w-full">
            {/* Input */}
            <div className={`cp-input-wrap flex items-center gap-3 px-5 py-3.5 ${focused ? "focused" : ""}`}>
              <SearchIcon />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="flex-1 text-sm tracking-wide"
                placeholder="ENTER_SEARCH_QUERY..."
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs transition-colors opacity-50 hover:opacity-100"
                  style={{ color: "var(--cyan)" }}
                  aria-label="Clear"
                >
                  [CLR]
                </button>
              )}
              <span className="w-px h-5 opacity-20" style={{ background: "var(--cyan)" }} />
              <button
                type="button"
                className="opacity-60 hover:opacity-100 transition-opacity p-1"
                aria-label="Search by voice"
              >
                <MicIcon />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button type="submit" className="cp-btn">
                ▶ EXECUTE_SEARCH
              </button>
              <button type="button" onClick={handleLucky} className="cp-btn cp-btn-yellow">
                ⚡ FEEL_LUCKY
              </button>
            </div>
          </form>

          {/* HUD sub-labels */}
          <div className="flex justify-between mt-6 text-xs opacity-30 tracking-widest">
            <span style={{ color: "var(--cyan)" }}>NODE:NC_77</span>
            <span style={{ color: "var(--yellow)" }}>UPLINK:STABLE</span>
            <span style={{ color: "var(--magenta)" }}>ICE:BYPASSED</span>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="cp-divider w-full max-w-2xl mt-10 opacity-20" />
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t text-xs z-10 relative"
        style={{ borderColor: "rgba(0,229,255,0.15)", background: "rgba(0,229,255,0.02)" }}
      >
        <div
          className="px-6 py-2 border-b flex items-center gap-2"
          style={{ borderColor: "rgba(0,229,255,0.1)" }}
        >
          <span className="pulse-dot" style={{ width: "4px", height: "4px" }} />
          <span className="tracking-widest opacity-40" style={{ color: "var(--yellow)" }}>
            MEGACITY ZONE — NORTH AMERICA SECTOR
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between px-6 py-2.5 gap-2">
          <div className="flex flex-wrap gap-6">
            {["ADVERTISING", "BUSINESS", "ABOUT"].map((link) => (
              <a
                key={link}
                href="#"
                className="tracking-widest transition-all opacity-40 hover:opacity-100"
                style={{ color: "var(--cyan)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 8px var(--cyan)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {["PRIVACY", "TERMS", "SETTINGS"].map((link) => (
              <a
                key={link}
                href="#"
                className="tracking-widest transition-all opacity-40 hover:opacity-100"
                style={{ color: "var(--magenta)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 8px var(--magenta)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
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
