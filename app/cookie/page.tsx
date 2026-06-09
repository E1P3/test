"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  cps: number; // clicks per second added
  clickBonus: number; // bonus per manual click
  owned: number;
  emoji: string;
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
    name: "Auto-Swipe",
    description: "Automatic contactless transactions",
    cost: 10,
    cps: 0.1,
    clickBonus: 0,
    owned: 0,
    emoji: "👆",
  },
  {
    id: "bank",
    name: "Branch Office",
    description: "Each branch generates passive revenue",
    cost: 100,
    cps: 0.5,
    clickBonus: 0,
    owned: 0,
    emoji: "🏦",
  },
  {
    id: "terminal",
    name: "POS Terminal",
    description: "Point-of-sale terminal processes clicks faster",
    cost: 250,
    cps: 2,
    clickBonus: 1,
    owned: 0,
    emoji: "💳",
  },
  {
    id: "atm",
    name: "ATM Network",
    description: "ATMs dispensing clicks 24/7",
    cost: 1000,
    cps: 8,
    clickBonus: 2,
    owned: 0,
    emoji: "🏧",
  },
  {
    id: "vault",
    name: "Secure Vault",
    description: "Fort Knox-level click storage",
    cost: 5000,
    cps: 25,
    clickBonus: 5,
    owned: 0,
    emoji: "🔐",
  },
  {
    id: "satellite",
    name: "Global Network",
    description: "Worldwide payment infrastructure",
    cost: 20000,
    cps: 100,
    clickBonus: 10,
    owned: 0,
    emoji: "🛰️",
  },
];

const MASTERCARD_COLORS = ["#EB001B", "#FF5F00", "#F79E1B", "#FF8C00"];

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.floor(n).toString();
}

function MastercardLogo({ size = 80 }: { size?: number }) {
  const r = size / 2;
  const overlap = size * 0.25;
  return (
    <svg
      width={size + overlap}
      height={size}
      viewBox={`0 0 ${size + overlap} ${size}`}
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
    >
      <circle cx={r} cy={r} r={r} fill="#EB001B" opacity="0.95" />
      <circle cx={r + overlap} cy={r} r={r} fill="#F79E1B" opacity="0.95" />
      <path
        d={`M ${r + overlap / 2} ${r - Math.sqrt(r * r - (overlap / 2) * (overlap / 2))} A ${r} ${r} 0 0 1 ${r + overlap / 2} ${r + Math.sqrt(r * r - (overlap / 2) * (overlap / 2))} A ${r} ${r} 0 0 1 ${r + overlap / 2} ${r - Math.sqrt(r * r - (overlap / 2) * (overlap / 2))}`}
        fill="#FF5F00"
        opacity="0.9"
      />
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

  const scoreRef = useRef(score);
  const upgradesRef = useRef(upgrades);
  scoreRef.current = score;
  upgradesRef.current = upgrades;

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc-cookie-clicker");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.score) setScore(data.score);
        if (data.totalClicks) setTotalClicks(data.totalClicks);
        if (data.upgrades) {
          setUpgrades((prev) =>
            prev.map((u) => {
              const saved = data.upgrades.find((s: Upgrade) => s.id === u.id);
              return saved ? { ...u, owned: saved.owned } : u;
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
          "mc-cookie-clicker",
          JSON.stringify({
            score: scoreRef.current,
            totalClicks,
            upgrades: upgradesRef.current.map((u) => ({
              id: u.id,
              owned: u.owned,
            })),
          })
        );
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, [totalClicks]);

  // CPS ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const cps = upgradesRef.current.reduce(
        (sum, u) => sum + u.cps * u.owned,
        0
      );
      if (cps > 0) {
        setScore((s) => s + cps / 20);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    const raf = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2,
            life: p.life - 1,
          }))
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
        prev
          .map((t) => ({ ...t, y: t.y - 1.5 }))
          .filter((t) => t.y > -100)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [floatingTexts]);

  const clickBonus = upgrades.reduce(
    (sum, u) => sum + u.clickBonus * u.owned,
    0
  );
  const clickValue = 1 + clickBonus;
  const cps = upgrades.reduce((sum, u) => sum + u.cps * u.owned, 0);

  const handleCookieClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      setScore((s) => s + clickValue);
      setTotalClicks((t) => t + 1);

      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 120);

      // Spawn particles
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const speed = 2 + Math.random() * 3;
        return {
          id: particleId + i,
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          color:
            MASTERCARD_COLORS[
              Math.floor(Math.random() * MASTERCARD_COLORS.length)
            ],
          life: 40 + Math.floor(Math.random() * 20),
          maxLife: 60,
        };
      });
      setParticleId((id) => id + 8);
      setParticles((prev) => [...prev.slice(-80), ...newParticles]);

      // Floating text
      setFloatingTexts((prev) => [
        ...prev.slice(-10),
        {
          id: floatId,
          x: e.clientX,
          y: e.clientY,
          value: clickValue,
        },
      ]);
      setFloatId((id) => id + 1);
    },
    [clickValue, particleId, floatId]
  );

  const buyUpgrade = useCallback(
    (id: string) => {
      setUpgrades((prev) =>
        prev.map((u) => {
          if (u.id !== id) return u;
          const cost = Math.ceil(u.cost * Math.pow(1.15, u.owned));
          if (scoreRef.current < cost) return u;
          setScore((s) => s - cost);
          return { ...u, owned: u.owned + 1 };
        })
      );
    },
    []
  );

  const resetGame = () => {
    if (confirm("Reset all progress?")) {
      setScore(0);
      setTotalClicks(0);
      setUpgrades(INITIAL_UPGRADES.map((u) => ({ ...u, owned: 0 })));
      localStorage.removeItem("mc-cookie-clicker");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #1a0000 0%, #2d0a00 50%, #1a0000 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderBottom: "2px solid #EB001B",
        }}
      >
        <div className="flex items-center gap-3">
          <MastercardLogo size={40} />
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#F79E1B" }}>
              Mastercard Clicker
            </h1>
            <p className="text-xs" style={{ color: "#FF5F00" }}>
              Priceless Clicks
            </p>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="text-xs px-3 py-1 rounded"
          style={{
            background: "rgba(235,0,27,0.2)",
            border: "1px solid #EB001B",
            color: "#FF6B6B",
          }}
        >
          Reset
        </button>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Main game area */}
        <main className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative">
          {/* Score display */}
          <div className="text-center mb-8">
            <div
              className="text-6xl font-bold"
              style={{
                color: "#F79E1B",
                textShadow: "0 0 20px rgba(247,158,27,0.6)",
              }}
            >
              {formatNumber(Math.floor(score))}
            </div>
            <div className="text-sm mt-1" style={{ color: "#FF5F00" }}>
              transactions processed
            </div>
            <div className="text-xs mt-1" style={{ color: "#888" }}>
              {cps.toFixed(1)} per second • +{clickValue} per click
            </div>
            <div className="text-xs mt-1" style={{ color: "#666" }}>
              Total: {formatNumber(totalClicks)} manual clicks
            </div>
          </div>

          {/* The big clickable button */}
          <div className="relative" style={{ isolation: "isolate" }}>
            {/* Particle canvas overlay */}
            <div
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ zIndex: 10 }}
            >
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  overflow: "visible",
                  width: "100%",
                  height: "100%",
                }}
              >
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

            <button
              onClick={handleCookieClick}
              className="relative select-none"
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: isClicking
                  ? "radial-gradient(circle at 40% 40%, #FF8C00, #EB001B)"
                  : "radial-gradient(circle at 35% 35%, #F79E1B, #FF5F00 40%, #EB001B)",
                border: "4px solid rgba(255,255,255,0.2)",
                boxShadow: isClicking
                  ? "0 0 60px rgba(235,0,27,0.9), 0 0 120px rgba(247,158,27,0.5), inset 0 4px 8px rgba(0,0,0,0.3)"
                  : "0 0 40px rgba(235,0,27,0.5), 0 0 80px rgba(247,158,27,0.2), inset 0 4px 8px rgba(0,0,0,0.2)",
                transform: isClicking ? "scale(0.95)" : "scale(1)",
                transition: "transform 0.08s ease, box-shadow 0.08s ease",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 8,
              }}
              aria-label="Click to earn transactions"
            >
              {/* Overlapping circles Mastercard motif */}
              <svg
                width="120"
                height="72"
                viewBox="0 0 120 72"
                style={{ pointerEvents: "none" }}
              >
                <circle cx="36" cy="36" r="36" fill="#EB001B" opacity="0.85" />
                <circle cx="84" cy="36" r="36" fill="#F79E1B" opacity="0.85" />
                <ellipse
                  cx="60"
                  cy="36"
                  rx="12"
                  ry="36"
                  fill="#FF5F00"
                  opacity="0.75"
                />
              </svg>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                Click!
              </span>
            </button>

            {/* Pulse ring */}
            {isClicking && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  border: "2px solid #F79E1B",
                  transform: "translate(-50%, -50%)",
                  animation: "pulse-ring 0.4s ease-out forwards",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Floating texts */}
          {floatingTexts.map((t) => (
            <div
              key={t.id}
              style={{
                position: "fixed",
                left: t.x,
                top: t.y,
                transform: "translate(-50%, -50%)",
                color: "#F79E1B",
                fontWeight: "bold",
                fontSize: 18,
                pointerEvents: "none",
                textShadow: "0 0 8px rgba(235,0,27,0.8)",
                zIndex: 9999,
              }}
            >
              +{t.value}
            </div>
          ))}

          {/* Stats bar */}
          <div
            className="mt-8 flex gap-6 text-center"
            style={{ color: "#aaa", fontSize: 13 }}
          >
            <div>
              <div style={{ color: "#F79E1B", fontWeight: "bold" }}>
                {formatNumber(cps)}
              </div>
              <div>per sec</div>
            </div>
            <div>
              <div style={{ color: "#F79E1B", fontWeight: "bold" }}>
                +{clickValue}
              </div>
              <div>per click</div>
            </div>
            <div>
              <div style={{ color: "#F79E1B", fontWeight: "bold" }}>
                {formatNumber(totalClicks)}
              </div>
              <div>total clicks</div>
            </div>
          </div>
        </main>

        {/* Upgrades sidebar */}
        <aside
          className="w-full lg:w-80 flex flex-col"
          style={{
            background: "rgba(0,0,0,0.4)",
            borderLeft: "2px solid rgba(235,0,27,0.3)",
          }}
        >
          <div
            className="px-4 py-3 font-bold text-sm uppercase tracking-wider"
            style={{
              color: "#F79E1B",
              borderBottom: "1px solid rgba(235,0,27,0.3)",
            }}
          >
            💳 Upgrades
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
                  className="w-full text-left rounded-lg p-3 transition-all"
                  style={{
                    background: canAfford
                      ? "linear-gradient(135deg, rgba(235,0,27,0.2), rgba(247,158,27,0.1))"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${canAfford ? "#EB001B" : "rgba(255,255,255,0.1)"}`,
                    cursor: canAfford ? "pointer" : "not-allowed",
                    opacity: canAfford ? 1 : 0.5,
                    boxShadow: canAfford
                      ? "0 0 12px rgba(235,0,27,0.2)"
                      : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{u.emoji}</span>
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: canAfford ? "#F79E1B" : "#888" }}
                        >
                          {u.name}
                        </div>
                        <div className="text-xs" style={{ color: "#666" }}>
                          {u.description}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "#FF5F00" }}>
                          {u.cps > 0 && `+${u.cps} CPS`}
                          {u.clickBonus > 0 &&
                            ` +${u.clickBonus}/click`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="text-sm font-bold"
                        style={{ color: canAfford ? "#F79E1B" : "#666" }}
                      >
                        {formatNumber(cost)}
                      </div>
                      <div className="text-xs" style={{ color: "#888" }}>
                        owned: {u.owned}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mastercard branding footer */}
          <div
            className="p-4 flex flex-col items-center gap-2"
            style={{ borderTop: "1px solid rgba(235,0,27,0.3)" }}
          >
            <MastercardLogo size={36} />
            <p className="text-xs text-center" style={{ color: "#555" }}>
              There are some things money can&apos;t buy.
              <br />
              For everything else, there&apos;s clicking.
            </p>
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
      `}</style>
    </div>
  );
}
