"use client";

import { useState } from "react";

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853", "#EA4335"];

function GoogleLogo() {
  const letters = ["G", "o", "o", "g", "l", "e"];
  return (
    <div
      className="flex items-center justify-center leading-none select-none"
      style={{ fontFamily: "Product Sans, Arial, sans-serif", fontSize: "80px", fontWeight: 400 }}
    >
      {letters.map((letter, i) => (
        <span key={i} style={{ color: GOOGLE_COLORS[i] }}>{letter}</span>
      ))}
    </div>
  );
}

function MicIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#4285F4"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" fill="#4285F4"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#9AA0A6">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Top nav */}
      <nav className="flex items-center justify-end px-6 py-3 gap-4">
        <a href="#" className="text-sm text-[#202124] hover:underline">Gmail</a>
        <a href="#" className="text-sm text-[#202124] hover:underline">Images</a>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#5F6368]">
            <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </button>
        <a
          href="#"
          className="text-sm text-white bg-[#1a73e8] hover:bg-[#1765cc] px-5 py-2 rounded font-medium transition-colors"
        >
          Sign in
        </a>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 px-4" style={{ marginTop: "-80px" }}>
        <GoogleLogo />

        <form onSubmit={handleSearch} className="w-full max-w-[584px] mt-8">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-shadow ${
              focused
                ? "shadow-[0_1px_6px_rgba(32,33,36,0.28)] border-white"
                : "border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-white"
            }`}
          >
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 text-base outline-none text-[#202124] bg-transparent"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#70757a] hover:text-[#202124] text-lg leading-none"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
            <span className="w-px h-6 bg-[#dfe1e5]" />
            <button type="button" className="hover:bg-gray-100 rounded-full p-1" aria-label="Search by voice">
              <MicIcon />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-7">
            <button
              type="submit"
              className="px-4 py-2 text-sm text-[#3c4043] bg-[#f8f9fa] hover:bg-[#e8eaed] hover:shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-transparent hover:border-[rgba(0,0,0,0.1)] rounded cursor-pointer transition-all"
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => window.open("https://www.google.com/doodles", "_blank")}
              className="px-4 py-2 text-sm text-[#3c4043] bg-[#f8f9fa] hover:bg-[#e8eaed] hover:shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-transparent hover:border-[rgba(0,0,0,0.1)] rounded cursor-pointer transition-all"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>

          <p className="text-center text-sm text-[#70757a] mt-5">
            Google offered in:{" "}
            {["Español", "Français", "Deutsch", "日本語"].map((lang, i) => (
              <span key={lang}>
                {i > 0 && " · "}
                <a href="#" className="text-[#1a0dab] hover:underline">{lang}</a>
              </span>
            ))}
          </p>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] border-t border-[#e4e4e4] text-sm text-[#70757a]">
        <div className="px-6 py-3 border-b border-[#e4e4e4]">
          United States
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between px-6 py-3 gap-2">
          <div className="flex flex-wrap gap-6">
            {["Advertising", "Business", "About"].map((link) => (
              <a key={link} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Settings"].map((link) => (
              <a key={link} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
