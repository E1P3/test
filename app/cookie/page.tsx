"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  cps: number;
  clickBonus: number;
  owned: number;
  icon: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: number;
}

const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: "cursor",
    name: "Auto-Jack",
    description: "Automated neural injection rig",
    cost: 10,
    cps: 0.1,
    clickBonus: 0,
    owned: 0,
    icon: "⚡",
  },
  {
    id: "bank",
    name: "Netrunner Rig",
    description: "ICE-breaking daemon running 24/7",
    cost: 100,
    cps: 0.5,
    clickBonus: 0,
    owned: 0,
    icon: "💻",
  },
  {
    id: "terminal",
    name: "Cyberware Mod",
    description: "Subdermal chip boosts manual throughput",
    cost: 250,
    cps: 2,
    clickBonus: 1,
    owned: 0,
    icon: "🦾",
  },
  {
    id: "atm",
    name: "Black ICE Array",
    description: "Offensive programs strip data shards",
    cost: 1000,
    cps: 8,
    clickBonus: 2,
    owned: 0,
    icon: "🔷",
  },
  {
    id: "vault",
    name: "Arasaka Infiltrator",
    description: "Deep-corp exploit harvests shards at scale",
    cost: 5000,
    cps: 25,
    clickBonus: 5,
    owned: 0,
    icon: "🏯",
  },
  {
    id: "satellite",
    name: "Orbital Uplink",
    description: "Megacity-wide signal sweep, mass extraction",
    cost: 20000,
    cps: 100,
    clickBonus: 10,
    owned: 0,
    icon: "🛰️",
  },
];

const NEON_COLORS = ["#00e5ff", "#ff2d78", "#ffe600", "#00ff9f", "#bf5af2"];

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.floor(n).toString();
}

function DataShardIcon({ size = 80, pulsing = false }: { size?: number; pulsing?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        filter: `drop-shadow(0 0 ${pulsing ? 20 : 12}px #00e5ff) drop-shadow(0 0 ${pulsing ? 40 : 20}px rgba(0,229,255,0.4))`,
        transition: "filter 0.1s",
      }}
    >
      {/* Hexagonal chip shape */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        fill="none"
        stroke="#00e5ff"
        strokeWidth="2"
      />
      <polygon
        points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
        fill="rgba(0,229,255,0.06)"
        stroke="rgba(0,229,255,0.3)"
        strokeWidth="1"
      />
      {/* Circuit lines */}
      <line x1="50" y1="15" x2="50" y2="35" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
      <line x1="50" y1="65" x2="50" y2="85" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
      <line x1="20" y1="32.5" x2="35" y2="42" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
      <line x1="65" y1="58" x2="80" y2="67.5" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
      <line x1="80" y1="32.5" x2="65" y2="42" stroke="#ff2d78" strokeWidth="1.5" opacity="0.7" />
      <line x1="35" y1="58" x2="20" y2="67.5" stroke="#ff2d78" strokeWidth="1.5" opacity="0.7" />
      {/* Center core */}
      <circle cx="50" cy="50" r="12" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="5" fill="#00e5ff" opacity="0.9" />
      {/* Corner dots */}
      <circle cx="50" cy="15" r="3" fill="#ff2d78" />
      <circle cx="50" cy="85" r="3" fill="#ff2d78" />
      <circle cx="80" cy="32.5" r="2" fill="#ffe600" />
      <circle cx="80" cy="67.5" r="2" fill="#ffe600" />
      <circle cx="20" cy="32.5" r="2" fill="#ffe600" />
      <circle cx="20" cy="67.5" r="2" fill="#ffe600" />
    </svg>
  );
}

export default function CookiePage() {
  const [score, setScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [particleId, setParticleId] = useState(0);
  const [floatId, setFloatId] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const scoreRef = useRef(score);
  const upgradesRef = useRef(upgrades);
  scoreRef.current = score;
  upgradesRef.current = upgrades;

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cp-data-shard-clicker");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.score) setScore(data.score);
        if (data.totalClicks) setTotalClicks(data.totalClicks);
        if (data.upgrades) {
          setUpgrades((prev) =>
            prev.map((u) => {
              const s = data.upgrades.find((d: Upgrade) => d.id === u.id);
              return s ? { ...u, owned: s.owned } : u;
            })
          );
        }
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          "cp-data-shard-clicker",
          JSON.stringify({
            score: scoreRef.current,
            totalClicks,
            upgrades: upgradesRef.current.map((u) => ({ id: u.id, owned: u.owned })),
          })
        );
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, [totalClicks]);

  // CPS ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const cps = upgradesRef.current.reduce((sum, u) => sum + u.cps * u.owned, 0);
      if (cps > 0) setScore((s) => s + cps / 20);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Random glitch flare
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.15) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 120);
      }
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    const raf = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.2, life: p.life - 1 }))
          .filter((p) => p.life > 0)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [particles]);

  // Animate floating texts
  useEffect(() => {
    if (floatingTexts.length === 0) return;
    const raf = requestAnimationFrame(() => {
      setFloatingTexts((prev) =>
        prev.map((t) => ({ ...t, y: t.y - 1.5 })).filter((t) => t.y > -100)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [floatingTexts]);

  const clickBonus = upgrades.reduce((sum, u) => sum + u.clickBonus * u.owned, 0);
  const clickValue = 1 + clickBonus;
  const cps = upgrades.reduce((sum, u) => sum + u.cps * u.owned, 0);

  const handleChipClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      setScore((s) => s + clickValue);
      setTotalClicks((t) => t + 1);
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 120);

      const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
        const speed = 2 + Math.random() * 4;
        return {
          id: particleId + i,
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
          life: 40 + Math.floor(Math.random() * 20),
          maxLife: 60,
        };
      });
      setParticleId((id) => id + 10);
      setParticles((prev) => [...prev.slice(-100), ...newParticles]);

      setFloatingTexts((prev) => [
        ...prev.slice(-10),
        { id: floatId, x: e.clientX, y: e.clientY, value: clickValue },
      ]);
      setFloatId((id) => id + 1);
    },
    [clickValue, particleId, floatId]
  );

  const buyUpgrade = useCallback((id: string) => {
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const cost = Math.ceil(u.cost * Math.pow(1.15, u.owned));
        if (scoreRef.current < cost) return u;
        setScore((s) => s - cost);
        return { ...u, owned: u.owned + 1 };
      })
    );
  }, []);

  const resetGame = () => {
    if (confirm("PURGE all neural data? This cannot be undone.")) {
      setScore(0);
      setTotalClicks(0);
      setUpgrades(INITIAL_UPGRADES.map((u) => ({ ...u, owned: 0 })));
      localStorage.removeItem("cp-data-shard-clicker");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "var(--background)",
        fontFamily: "var(--font-geist-mono), monospace",
        color: "var(--foreground)",
      }}
    >
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-6 py-3 z-10 relative"
        style={{
          borderBottom: "1px solid rgba(0,229,255,0.25)",
          background: "rgba(0,229,255,0.03)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center border"
            style={{ borderColor: "var(--magenta)", boxShadow: "0 0 8px rgba(255,45,120,0.4)" }}
          >
            <span style={{ color: "var(--magenta)", fontSize: "9px", fontWeight: 900 }}>NC</span>
          </div>
          <div>
            <h1
              className="text-sm font-black tracking-[0.2em] uppercase"
              style={{
                color: "var(--cyan)",
                textShadow: "0 0 12px rgba(0,229,255,0.6)",
                transform: glitchActive ? "translateX(2px)" : "none",
                transition: "transform 0.05s",
              }}
            >
              DATA_SHARD // CLICKER
            </h1>
            <p className="text-xs tracking-widest opacity-40" style={{ color: "var(--yellow)" }}>
              NEURAL_EXTRACTION v2.7 // SHARDS_ONLINE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="cp-btn"
            style={{ fontSize: "0.65rem", padding: "0.3rem 0.8rem" }}
          >
            ← BACK
          </a>
          <button
            onClick={resetGame}
            className="cp-btn"
            style={{
              fontSize: "0.65rem",
              padding: "0.3rem 0.8rem",
              borderColor: "var(--magenta)",
              color: "var(--magenta)",
            }}
          >
            PURGE
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* ── Main game area ── */}
        <main className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative z-10">

          {/* Score display */}
          <div className="text-center mb-8 relative">
            {/* HUD corner decorations */}
            <div className="absolute -top-4 -left-6 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "var(--cyan)" }} />
            <div className="absolute -top-4 -right-6 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: "var(--cyan)" }} />
            <div className="absolute -bottom-4 -left-6 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: "var(--cyan)" }} />
            <div className="absolute -bottom-4 -right-6 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: "var(--cyan)" }} />

            <div className="text-xs tracking-[0.3em] uppercase mb-1 opacity-50" style={{ color: "var(--yellow)" }}>
              ▸ EXTRACTED_SHARDS ◂
            </div>
            <div
              className="font-black"
              style={{
                fontSize: "clamp(40px, 10vw, 72px)",
                color: "var(--cyan)",
                textShadow: "0 0 20px rgba(0,229,255,0.7), 0 0 60px rgba(0,229,255,0.3)",
                transform: glitchActive ? "translateX(-3px)" : "none",
                transition: "transform 0.05s",
                letterSpacing: "-1px",
              }}
            >
              {formatNumber(Math.floor(score))}
            </div>
            <div className="cp-divider mt-2 mb-2" />
            <div className="flex gap-6 justify-center text-xs tracking-widest opacity-60">
              <span style={{ color: "var(--cyan)" }}>{cps.toFixed(1)}/sec</span>
              <span style={{ color: "var(--magenta)" }}>+{clickValue}/click</span>
              <span style={{ color: "var(--yellow)" }}>{formatNumber(totalClicks)} total</span>
            </div>
          </div>

          {/* Clickable DataShard */}
          <div className="relative" style={{ isolation: "isolate" }}>
            {/* Particle overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
              <svg style={{ position: "absolute", top: 0, left: 0, overflow: "visible", width: "100%", height: "100%" }}>
                {particles.map((p) => (
                  <circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={3 * (p.life / p.maxLife) + 1}
                    fill={p.color}
                    opacity={p.life / p.maxLife}
                  />
                ))}
              </svg>
            </div>

            {/* Outer ring */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: "50%",
                border: `1px solid rgba(0,229,255,${isClicking ? 0.6 : 0.2})`,
                boxShadow: isClicking ? "0 0 30px rgba(0,229,255,0.3)" : "none",
                transition: "all 0.1s",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -36,
                borderRadius: "50%",
                border: `1px solid rgba(255,45,120,${isClicking ? 0.4 : 0.1})`,
                transition: "all 0.1s",
                pointerEvents: "none",
              }}
            />

            <button
              onClick={handleChipClick}
              className="relative select-none flex items-center justify-center"
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: isClicking
                  ? "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.2), rgba(255,45,120,0.1), transparent)"
                  : "radial-gradient(circle at 35% 35%, rgba(0,229,255,0.1), rgba(0,0,0,0.5))",
                border: `2px solid ${isClicking ? "var(--cyan)" : "rgba(0,229,255,0.4)"}`,
                boxShadow: isClicking
                  ? "0 0 50px rgba(0,229,255,0.7), 0 0 100px rgba(0,229,255,0.3), inset 0 0 30px rgba(0,229,255,0.1)"
                  : "0 0 20px rgba(0,229,255,0.3), inset 0 0 20px rgba(0,229,255,0.05)",
                transform: isClicking ? "scale(0.95)" : "scale(1)",
                transition: "transform 0.08s, box-shadow 0.08s, border-color 0.08s",
                cursor: "pointer",
              }}
              aria-label="Extract data shard"
            >
              <DataShardIcon size={110} pulsing={isClicking} />
            </button>

            {/* Click pulse ring */}
            {isClicking && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  border: "2px solid var(--cyan)",
                  transform: "translate(-50%, -50%)",
                  animation: "cp-pulse-ring 0.4s ease-out forwards",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          <div className="mt-4 text-xs tracking-[0.3em] uppercase opacity-30" style={{ color: "var(--cyan)" }}>
            JACK_IN // EXTRACT
          </div>

          {/* Floating score texts */}
          {floatingTexts.map((t) => (
            <div
              key={t.id}
              style={{
                position: "fixed",
                left: t.x,
                top: t.y,
                transform: "translate(-50%, -50%)",
                color: "var(--cyan)",
                fontWeight: "bold",
                fontSize: 16,
                pointerEvents: "none",
                textShadow: "0 0 8px var(--cyan)",
                fontFamily: "var(--font-geist-mono), monospace",
                zIndex: 9999,
              }}
            >
              +{t.value}
            </div>
          ))}
        </main>

        {/* ── Upgrades sidebar ── */}
        <aside
          className="w-full lg:w-80 flex flex-col z-10"
          style={{
            borderLeft: "1px solid rgba(0,229,255,0.15)",
            background: "rgba(0,229,255,0.02)",
          }}
        >
          {/* Sidebar header */}
          <div
            className="px-4 py-3 text-xs font-black uppercase tracking-[0.3em]"
            style={{
              color: "var(--yellow)",
              borderBottom: "1px solid rgba(0,229,255,0.15)",
              background: "rgba(0,229,255,0.03)",
            }}
          >
            ▸ UPGRADE_MODULES
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {upgrades.map((u) => {
              const cost = Math.ceil(u.cost * Math.pow(1.15, u.owned));
              const canAfford = score >= cost;
              return (
                <button
                  key={u.id}
                  onClick={() => buyUpgrade(u.id)}
                  disabled={!canAfford}
                  className="w-full text-left transition-all"
                  style={{
                    background: canAfford
                      ? "rgba(0,229,255,0.07)"
                      : "rgba(0,229,255,0.02)",
                    border: `1px solid ${canAfford ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.1)"}`,
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    cursor: canAfford ? "pointer" : "not-allowed",
                    opacity: canAfford ? 1 : 0.45,
                    boxShadow: canAfford ? "0 0 10px rgba(0,229,255,0.15)" : "none",
                    padding: "10px 14px",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{u.icon}</span>
                      <div>
                        <div
                          className="font-bold text-xs tracking-wider uppercase"
                          style={{ color: canAfford ? "var(--cyan)" : "#555" }}
                        >
                          {u.name}
                        </div>
                        <div className="text-xs mt-0.5 opacity-50" style={{ color: "var(--foreground)" }}>
                          {u.description}
                        </div>
                        <div className="text-xs mt-1 tracking-wide" style={{ color: "var(--magenta)", opacity: 0.8 }}>
                          {u.cps > 0 && `+${u.cps} CPS`}
                          {u.clickBonus > 0 && ` +${u.clickBonus}/click`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="text-sm font-bold"
                        style={{ color: canAfford ? "var(--yellow)" : "#444" }}
                      >
                        {formatNumber(cost)}
                      </div>
                      <div className="text-xs opacity-40" style={{ color: "var(--cyan)" }}>
                        ×{u.owned}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sidebar footer */}
          <div
            className="px-4 py-3 text-xs"
            style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="pulse-dot" />
              <span className="tracking-widest opacity-40" style={{ color: "var(--yellow)" }}>
                NIGHT_CITY // NEURAL_NET
              </span>
            </div>
            <div className="cp-divider opacity-20" />
            <div className="mt-2 flex gap-4 text-xs opacity-30 tracking-widest">
              <span style={{ color: "var(--cyan)" }}>NODE:NC_77</span>
              <span style={{ color: "var(--magenta)" }}>ICE:CLEAR</span>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes cp-pulse-ring {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.6); }
        }
      `}</style>
    </div>
  );
}
