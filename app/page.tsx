"use client";

import { useState } from "react";

function MicIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#00e5ff"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" fill="#00e5ff"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00e5ff">
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
      window.open(`https://search.brave.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#ffff00]" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Top nav */}
      <nav className="flex items-center justify-end px-6 py-3 gap-4">
        <button className="p-2 rounded-full hover:bg-[#e6e600]">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#888]">
            <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </button>
        <a
          href="#"
          className="text-sm font-medium px-5 py-2 rounded transition-colors"
          style={{
            color: "#0a0a0a",
            background: "#00e5ff",
            boxShadow: "0 0 10px rgba(0,229,255,0.5)",
          }}
        >
          Sign in
        </a>
      </nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 px-4" style={{ marginTop: "-80px" }}>
        <h1
          className="leading-none select-none font-bold"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "80px",
            color: "#00e5ff",
            textShadow: "0 0 20px rgba(0,229,255,0.8), 0 0 60px rgba(0,229,255,0.4)",
            letterSpacing: "-2px",
          }}
        >
          Search
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-[584px] mt-8">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-all bg-[#ffffa0] ${
              focused
                ? "border-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.45)]"
                : "border-[#e6e600] hover:border-[#00e5ff] hover:shadow-[0_0_10px_rgba(0,229,255,0.25)]"
            }`}
          >
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 text-base outline-none text-[#171717] bg-transparent placeholder-[#888]"
              placeholder="Search the web..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[#555] hover:text-[#00e5ff] text-lg leading-none transition-colors"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
            <span className="w-px h-6 bg-[#e6e600]" />
            <button type="button" className="hover:bg-[#e6e600] rounded-full p-1 transition-colors" aria-label="Search by voice">
              <MicIcon />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-7">
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded cursor-pointer transition-all border"
              style={{ color: "#0a0a0a", background: "#ffff00", borderColor: "#e6e600" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00e5ff";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(0,229,255,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e6e600";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Search
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm rounded cursor-pointer transition-all border"
              style={{ color: "#0a0a0a", background: "#ffff00", borderColor: "#e6e600" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00e5ff";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(0,229,255,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e6e600";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Feeling Lucky
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffff00] border-t border-[#e6e600] text-sm text-[#555]">
        <div className="px-6 py-3 border-b border-[#e6e600]">
          United States
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between px-6 py-3 gap-2">
          <div className="flex flex-wrap gap-6">
            {["Advertising", "Business", "About"].map((link) => (
              <a key={link} href="#" className="hover:text-[#00e5ff] transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Settings"].map((link) => (
              <a key={link} href="#" className="hover:text-[#00e5ff] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
