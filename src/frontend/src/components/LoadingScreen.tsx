import { useEffect, useState } from "react";

const LOADING_TIPS = [
  "Swords don't care about your feelings.",
  "A diamond sword is worth 1,000 words.",
  "Watch out for creepers — they don't warn you.",
  "Always punch the tree first.",
  "Never dig straight down.",
  "Lava is not your friend.",
  "Enchant your gear before the big fight.",
  "Trade with villagers wisely.",
  "Sleep to skip the night — and phantoms.",
  "Netherite floats on lava. Don't.",
  "Shields save lives. Literally.",
  "Always carry a bucket of water.",
  "The Ender Dragon only spawns once... unless you respawn it.",
  "Cats scare creepers. Befriend them.",
  "Fortune III enchantment = more diamonds.",
];

const SPLASH_TEXTS = [
  "100% Cooler!",
  "Now with swords!",
  "Creepers hate this!",
  "Diamond or nothing!",
  "Enchanted Edition!",
  "Netherite powered!",
  "PvP ready!",
  "Legendary gear inside!",
  "Max enchants only!",
];

// Pre-generated static positions for floating blocks (deterministic, not random per render)
const PIXEL_BLOCKS = [
  { id: "pb1", x: 5, y: 10, color: "#7c5c3a", size: 14, dur: 12, delay: 0 },
  { id: "pb2", x: 15, y: 70, color: "#7a7a7a", size: 12, dur: 18, delay: 2 },
  { id: "pb3", x: 25, y: 30, color: "#22d3ee", size: 16, dur: 10, delay: 1 },
  { id: "pb4", x: 40, y: 85, color: "#4ade80", size: 10, dur: 15, delay: 3 },
  { id: "pb5", x: 55, y: 20, color: "#facc15", size: 13, dur: 14, delay: 0.5 },
  { id: "pb6", x: 65, y: 60, color: "#1a1a1a", size: 11, dur: 20, delay: 1.5 },
  { id: "pb7", x: 75, y: 40, color: "#7c5c3a", size: 15, dur: 11, delay: 4 },
  { id: "pb8", x: 85, y: 80, color: "#22d3ee", size: 12, dur: 16, delay: 2.5 },
  { id: "pb9", x: 90, y: 15, color: "#4ade80", size: 10, dur: 13, delay: 0.8 },
  { id: "pb10", x: 10, y: 50, color: "#facc15", size: 14, dur: 17, delay: 3.5 },
  { id: "pb11", x: 50, y: 55, color: "#7a7a7a", size: 9, dur: 9, delay: 1.2 },
  { id: "pb12", x: 30, y: 90, color: "#1a1a1a", size: 16, dur: 22, delay: 4.5 },
  { id: "pb13", x: 70, y: 5, color: "#7c5c3a", size: 11, dur: 8, delay: 0.3 },
  { id: "pb14", x: 45, y: 45, color: "#22d3ee", size: 13, dur: 19, delay: 2.8 },
  { id: "pb15", x: 92, y: 50, color: "#4ade80", size: 10, dur: 12, delay: 1.7 },
  { id: "pb16", x: 3, y: 35, color: "#facc15", size: 15, dur: 16, delay: 3.2 },
];

// Pre-generated sparkle positions
const SPARKLES = [
  { id: "sp1", x: 8, y: 12, dur: 2.1, delay: 0 },
  { id: "sp2", x: 20, y: 45, dur: 1.8, delay: 0.5 },
  { id: "sp3", x: 35, y: 8, dur: 2.5, delay: 1 },
  { id: "sp4", x: 48, y: 75, dur: 1.6, delay: 0.3 },
  { id: "sp5", x: 60, y: 25, dur: 2.2, delay: 0.8 },
  { id: "sp6", x: 72, y: 60, dur: 1.9, delay: 1.4 },
  { id: "sp7", x: 82, y: 15, dur: 2.4, delay: 0.2 },
  { id: "sp8", x: 92, y: 40, dur: 1.7, delay: 0.9 },
  { id: "sp9", x: 15, y: 85, dur: 2.0, delay: 1.6 },
  { id: "sp10", x: 55, y: 92, dur: 2.3, delay: 0.6 },
  { id: "sp11", x: 78, y: 88, dur: 1.5, delay: 1.1 },
  { id: "sp12", x: 40, y: 35, dur: 2.6, delay: 0.4 },
];

// Pre-generated floating particles
const PARTICLES = [
  { id: "pt1", x: 5, delay: 0, dur: 5 },
  { id: "pt2", x: 10, delay: 0.5, dur: 6 },
  { id: "pt3", x: 16, delay: 1.1, dur: 4.5 },
  { id: "pt4", x: 22, delay: 0.3, dur: 5.5 },
  { id: "pt5", x: 28, delay: 1.8, dur: 6 },
  { id: "pt6", x: 34, delay: 0.7, dur: 4 },
  { id: "pt7", x: 40, delay: 2.1, dur: 5.2 },
  { id: "pt8", x: 46, delay: 0.2, dur: 6.5 },
  { id: "pt9", x: 52, delay: 1.4, dur: 4.8 },
  { id: "pt10", x: 58, delay: 2.5, dur: 5.7 },
  { id: "pt11", x: 64, delay: 0.9, dur: 5 },
  { id: "pt12", x: 70, delay: 1.6, dur: 4.3 },
  { id: "pt13", x: 76, delay: 0.4, dur: 6.2 },
  { id: "pt14", x: 82, delay: 2.8, dur: 5.5 },
  { id: "pt15", x: 88, delay: 1.0, dur: 4.7 },
  { id: "pt16", x: 93, delay: 0.6, dur: 6 },
  { id: "pt17", x: 12, delay: 3.2, dur: 5.1 },
  { id: "pt18", x: 36, delay: 2.0, dur: 4.6 },
  { id: "pt19", x: 55, delay: 3.5, dur: 5.8 },
  { id: "pt20", x: 79, delay: 2.4, dur: 4.2 },
  { id: "pt21", x: 42, delay: 1.3, dur: 6.3 },
  { id: "pt22", x: 67, delay: 0.8, dur: 5.4 },
  { id: "pt23", x: 25, delay: 3.0, dur: 4.9 },
  { id: "pt24", x: 85, delay: 1.9, dur: 5.6 },
  { id: "pt25", x: 50, delay: 2.7, dur: 4.4 },
];

interface LoadingScreenProps {
  onFinish: () => void;
}

type Phase = "loading" | "slash" | "split" | "done";

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  // Cycling tip state (parent-level so it's stable)
  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);

  // Typewriter state
  const TITLE = "Sword MC";
  const [typedCount, setTypedCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Splash text index
  const splashIndex = 3; // deterministic

  // Loading dots
  const [dotCount, setDotCount] = useState(1);

  // Progress bounce key for animation re-trigger
  const [progressBounce, setProgressBounce] = useState(false);

  useEffect(() => {
    // Typewriter
    if (typedCount < TITLE.length) {
      const t = setTimeout(() => setTypedCount((n) => n + 1), 100);
      return () => clearTimeout(t);
    }
    // hide cursor after done
    const t = setTimeout(() => setCursorVisible(false), 1200);
    return () => clearTimeout(t);
  }, [typedCount]);

  // Blinking cursor while typing
  useEffect(() => {
    if (typedCount >= TITLE.length) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, [typedCount]);

  // Cycling tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % LOADING_TIPS.length);
        setTipVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((d) => (d % 3) + 1);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate chunked loading like Minecraft
    const stages = [
      { target: 20, delay: 80 },
      { target: 45, delay: 60 },
      { target: 70, delay: 50 },
      { target: 88, delay: 70 },
      { target: 100, delay: 40 },
    ];

    let current = 0;
    let stageIndex = 0;

    const tick = () => {
      if (stageIndex >= stages.length) return;

      const stage = stages[stageIndex];
      if (current < stage.target) {
        current = Math.min(current + 1, stage.target);
        setProgress(current);
        setProgressBounce(true);
        setTimeout(() => setProgressBounce(false), 80);
        setTimeout(tick, stage.delay + Math.random() * 20);
      } else {
        stageIndex++;
        if (stageIndex < stages.length) {
          setTimeout(tick, 150); // brief pause between stages
        } else {
          // Done — trigger sword slash after short hold
          setTimeout(() => {
            setPhase("slash");
            // After slash draws (300ms), start split
            setTimeout(() => {
              setPhase("split");
              // After split animation (350ms), call onFinish
              setTimeout(() => {
                setPhase("done");
                onFinish();
              }, 350);
            }, 300);
          }, 300);
        }
      }
    };

    const start = setTimeout(tick, 200);
    return () => clearTimeout(start);
  }, [onFinish]);

  const isSlashing = phase === "slash" || phase === "split" || phase === "done";
  const isSplitting = phase === "split" || phase === "done";
  const isDone = phase === "done";

  return (
    <>
      {/* All keyframe styles */}
      <style>{`
        /* ── Sword slash / split (existing) ─────────────────────── */
        @keyframes slashDraw {
          0% { clip-path: polygon(0% 45%, 0% 55%, 0% 55%, 0% 45%); opacity: 1; }
          60% { clip-path: polygon(0% 45%, 0% 55%, 100% 45%, 100% 35%); opacity: 1; }
          100% { clip-path: polygon(0% 45%, 0% 55%, 100% 45%, 100% 35%); opacity: 1; }
        }
        @keyframes slashGlow {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        @keyframes splitTop {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes splitBottom {
          0% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flashIn {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes slashLineExtend {
          0% { transform: scaleX(0) rotate(-8deg); transform-origin: left center; opacity: 0; }
          10% { opacity: 1; }
          60% { transform: scaleX(1) rotate(-8deg); transform-origin: left center; opacity: 1; }
          100% { transform: scaleX(1) rotate(-8deg); transform-origin: left center; opacity: 0.8; }
        }
        @keyframes afterglowFade {
          0% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        /* ── New animations ──────────────────────────────────────── */

        /* Floating pixel blocks */
        @keyframes floatBlock1 {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate(18px, -22px) rotate(45deg); }
          50%  { transform: translate(35px, -8px) rotate(90deg); }
          75%  { transform: translate(20px, 14px) rotate(135deg); }
          100% { transform: translate(0px, 0px) rotate(180deg); }
        }
        @keyframes floatBlock2 {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate(-20px, -15px) rotate(-45deg); }
          50%  { transform: translate(-38px, 5px) rotate(-90deg); }
          75%  { transform: translate(-18px, 20px) rotate(-135deg); }
          100% { transform: translate(0px, 0px) rotate(-180deg); }
        }
        @keyframes floatBlock3 {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          33%  { transform: translate(25px, 20px) rotate(60deg); }
          66%  { transform: translate(-10px, 30px) rotate(120deg); }
          100% { transform: translate(0px, 0px) rotate(180deg); }
        }

        /* Sparkle twinkle */
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* Logo entrance bounce */
        @keyframes logoBounceIn {
          0%   { transform: scale(0.3); opacity: 0; }
          60%  { transform: scale(1.12); opacity: 1; }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(34,211,238,0.4)) drop-shadow(0 0 16px rgba(34,211,238,0.2)); }
          50% { filter: drop-shadow(0 0 20px rgba(34,211,238,0.9)) drop-shadow(0 0 40px rgba(34,211,238,0.5)); }
        }

        /* Card glow breathe */
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px 2px rgba(34,211,238,0.1), 0 0 40px 4px rgba(34,211,238,0.06); }
          50% { box-shadow: 0 0 40px 8px rgba(34,211,238,0.3), 0 0 80px 16px rgba(34,211,238,0.12); }
        }

        /* Progress bar shimmer */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        /* Progress chunk pop flash */
        @keyframes chunkPop {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Spinning sword */
        @keyframes swordSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Floating particles upward */
        @keyframes floatUp {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%  { opacity: 0.8; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(var(--drift, 0px)); opacity: 0; }
        }

        /* Splash text wobble */
        @keyframes splashWobble {
          0%, 100% { transform: rotate(-12deg) scale(1); }
          25%  { transform: rotate(-10deg) scale(1.06); }
          50%  { transform: rotate(-14deg) scale(0.96); }
          75%  { transform: rotate(-11deg) scale(1.04); }
        }

        /* Splash glow pulse */
        @keyframes splashGlow {
          0%, 100% { text-shadow: 1px 1px 0 #7a5a00, 0 0 8px rgba(250,204,21,0.4); }
          50% { text-shadow: 1px 1px 0 #7a5a00, 0 0 18px rgba(250,204,21,0.9), 0 0 30px rgba(250,204,21,0.4); }
        }

        /* Scanlines sweep */
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }

        /* Marching ants border */
        @keyframes marchingAnts {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes borderMarch {
          0% { background-position: 0 0, 100% 0, 100% 100%, 0 100%; }
          100% { background-position: 20px 0, 100% 20px, -20px 100%, 0 -20px; }
        }

        /* Progress number bounce */
        @keyframes numBounce {
          0%  { transform: scale(1); }
          40% { transform: scale(1.35) translateY(-2px); }
          70% { transform: scale(0.9); }
          100%{ transform: scale(1); }
        }

        /* Tip crossfade */
        @keyframes tipFadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes tipFadeOut {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }

        /* Title glitch flicker */
        @keyframes titleFlicker {
          0%, 95%, 100% { opacity: 1; }
          96%  { opacity: 0.7; }
          97%  { opacity: 1; }
          98%  { opacity: 0.5; }
          99%  { opacity: 1; }
        }

        /* Corner brackets pulse */
        @keyframes bracketPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Top half of loading screen (splits up) */}
      <div
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{
          ...(isSplitting && {
            animation: "splitTop 0.35s cubic-bezier(0.4,0,1,1) forwards",
            clipPath: "polygon(0 0, 100% 0, 100% 52%, 0 52%)",
          }),
          ...(!isSplitting && {
            clipPath: isSlashing
              ? "polygon(0 0, 100% 0, 100% 52%, 0 52%)"
              : undefined,
          }),
          pointerEvents: isDone ? "none" : "auto",
        }}
      >
        <LoadingContent
          progress={progress}
          tipIndex={tipIndex}
          tipVisible={tipVisible}
          typedCount={typedCount}
          cursorVisible={cursorVisible}
          splashIndex={splashIndex}
          dotCount={dotCount}
          progressBounce={progressBounce}
        />
      </div>

      {/* Bottom half of loading screen (splits down) */}
      {isSlashing && (
        <div
          className="fixed inset-0 z-[9998] overflow-hidden"
          style={{
            clipPath: "polygon(0 48%, 100% 48%, 100% 100%, 0 100%)",
            ...(isSplitting && {
              animation: "splitBottom 0.35s cubic-bezier(0.4,0,1,1) forwards",
            }),
            pointerEvents: "none",
          }}
        >
          <LoadingContent
            progress={progress}
            tipIndex={tipIndex}
            tipVisible={tipVisible}
            typedCount={typedCount}
            cursorVisible={cursorVisible}
            splashIndex={splashIndex}
            dotCount={dotCount}
            progressBounce={progressBounce}
          />
        </div>
      )}

      {/* Sword slash line overlay */}
      {isSlashing && (
        <div
          className="fixed inset-0 z-[10000] pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          {/* Main slash line */}
          <div
            style={{
              position: "absolute",
              top: "48%",
              left: "-10%",
              width: "120%",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(100,220,255,0.3) 5%, #00eeff 20%, #ffffff 50%, #00eeff 80%, rgba(100,220,255,0.3) 95%, transparent 100%)",
              boxShadow:
                "0 0 8px 2px #00eeff, 0 0 20px 4px rgba(0,238,255,0.6), 0 0 40px 8px rgba(0,238,255,0.3)",
              transform: "rotate(-8deg)",
              transformOrigin: "left center",
              animation:
                "slashLineExtend 0.3s cubic-bezier(0.2,0,0.4,1) forwards",
            }}
          />
          {/* Glow afterburn */}
          <div
            style={{
              position: "absolute",
              top: "46%",
              left: "-10%",
              width: "120%",
              height: "7px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,238,255,0.05) 10%, rgba(0,238,255,0.15) 30%, rgba(200,255,255,0.2) 50%, rgba(0,238,255,0.15) 70%, transparent 100%)",
              transform: "rotate(-8deg)",
              transformOrigin: "left center",
              filter: "blur(3px)",
              animation: "afterglowFade 0.6s ease-out 0.15s forwards",
              opacity: 0,
            }}
          />
          {/* White flash at impact */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(200,240,255,0.12)",
              animation: "flashIn 0.3s ease-out forwards",
              opacity: 0,
            }}
          />
        </div>
      )}
    </>
  );
}

/** Pure visual content extracted so both halves can render identically */
function LoadingContent({
  progress,
  tipIndex,
  tipVisible,
  typedCount,
  cursorVisible,
  splashIndex,
  dotCount,
  progressBounce,
}: {
  progress: number;
  tipIndex: number;
  tipVisible: boolean;
  typedCount: number;
  cursorVisible: boolean;
  splashIndex: number;
  dotCount: number;
  progressBounce: boolean;
}) {
  const TITLE = "Sword MC";

  // Progress bar color shifts green → teal → cyan
  const pct = progress / 100;
  const r = Math.round(95 - pct * 60);
  const g = Math.round(184 + pct * 71);
  const b = Math.round(95 + pct * 160);
  const barColor = `rgb(${r},${g},${b})`;
  const barColorDark = `rgb(${Math.round(r * 0.65)},${Math.round(g * 0.65)},${Math.round(b * 0.65)})`;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: "#060a0f",
        imageRendering: "pixelated",
        overflow: "hidden",
      }}
    >
      {/* ── Scanline overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 30,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)",
          backgroundSize: "100% 4px",
          animation: "scanlines 3s linear infinite",
        }}
      />

      {/* ── Minecraft-style pixel grid background ── */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(100,70,40,0.25) 15px, rgba(100,70,40,0.25) 16px),
            repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(100,70,40,0.25) 15px, rgba(100,70,40,0.25) 16px)
          `,
          backgroundSize: "16px 16px",
          opacity: 0.12,
        }}
      />

      {/* ── Atmospheric gradient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* ── Floating pixel blocks ── */}
      {PIXEL_BLOCKS.map((b, i) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: b.color,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
            opacity: 0.55,
            zIndex: 2,
            animation: `${i % 3 === 0 ? "floatBlock1" : i % 3 === 1 ? "floatBlock2" : "floatBlock3"} ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Sparkle / star characters ── */}
      {SPARKLES.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            color: i % 2 === 0 ? "#22d3ee" : "#facc15",
            fontSize: "12px",
            fontFamily: "monospace",
            zIndex: 3,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            userSelect: "none",
          }}
        >
          {i % 3 === 0 ? "✦" : i % 3 === 1 ? "✧" : "+"}
        </div>
      ))}

      {/* ── Floating upward particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={p.id}
          style={
            {
              position: "absolute",
              left: `${p.x}%`,
              bottom: "-8px",
              width: i % 3 === 0 ? "3px" : i % 3 === 1 ? "2px" : "4px",
              height: i % 3 === 0 ? "3px" : i % 3 === 1 ? "2px" : "4px",
              borderRadius: "50%",
              background:
                i % 4 === 0
                  ? "#22d3ee"
                  : i % 4 === 1
                    ? "#facc15"
                    : i % 4 === 2
                      ? "#4ade80"
                      : "rgba(255,255,255,0.6)",
              zIndex: 2,
              "--drift": `${(i % 5) * 6 - 12}px`,
              animation: `floatUp ${p.dur}s ease-in ${p.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* ── Corner decoration brackets ── */}
      {[
        { id: "corner-tl", pos: { top: 16, left: 16 } as React.CSSProperties },
        {
          id: "corner-tr",
          pos: {
            top: 16,
            right: 16,
            transform: "rotate(90deg)",
          } as React.CSSProperties,
        },
        {
          id: "corner-bl",
          pos: {
            bottom: 16,
            left: 16,
            transform: "rotate(-90deg)",
          } as React.CSSProperties,
        },
        {
          id: "corner-br",
          pos: {
            bottom: 16,
            right: 16,
            transform: "rotate(180deg)",
          } as React.CSSProperties,
        },
      ].map((corner, i) => (
        <div
          key={corner.id}
          style={{
            position: "absolute",
            ...corner.pos,
            width: 24,
            height: 24,
            borderTop: "3px solid rgba(34,211,238,0.5)",
            borderLeft: "3px solid rgba(34,211,238,0.5)",
            zIndex: 5,
            animation: `bracketPulse 2s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* ── Splash text ── */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "8%",
          zIndex: 10,
          animation: "splashWobble 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "monospace",
            fontSize: "13px",
            fontWeight: "bold",
            color: "#facc15",
            animation: "splashGlow 2s ease-in-out infinite",
            whiteSpace: "nowrap",
          }}
        >
          {SPLASH_TEXTS[splashIndex % SPLASH_TEXTS.length]}
        </span>
      </div>

      {/* ── Center content card ── */}
      <div
        className="relative flex flex-col items-center gap-5 px-8 w-full max-w-md"
        style={{
          zIndex: 10,
          padding: "28px",
          border: "1px solid rgba(34,211,238,0.2)",
          background: "rgba(6,10,15,0.85)",
          animation: "cardGlow 3s ease-in-out infinite",
        }}
      >
        {/* Logo */}
        <div
          className="flex flex-col items-center gap-2 mb-1"
          style={{ position: "relative" }}
        >
          <img
            src="/assets/uploads/file_000000008b1c71fab2567310eb084cc5-1-1.png"
            alt="Sword MC"
            className="w-20 h-20 object-contain"
            style={{
              imageRendering: "pixelated",
              animation:
                "logoBounceIn 0.7s cubic-bezier(0.3,1.5,0.6,1) both, logoGlow 2.5s ease-in-out 0.8s infinite",
            }}
          />

          {/* Typewriter title */}
          <h1
            className="text-3xl font-bold tracking-widest uppercase"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              color: "#5af",
              textShadow: "3px 3px 0 #003366, -1px -1px 0 #003366",
              letterSpacing: "0.15em",
              minWidth: "8ch",
              animation: "titleFlicker 8s linear 2s infinite",
            }}
          >
            {TITLE.slice(0, typedCount)}
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "1em",
                  background: "#22d3ee",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                }}
              />
            )}
          </h1>

          <p
            className="text-sm uppercase tracking-widest"
            style={{
              color: "#aaa",
              fontFamily: "monospace",
              textShadow: "1px 1px 0 #000",
            }}
          >
            Store
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full flex flex-col gap-1">
          {/* Marching ants border container */}
          <div
            style={{
              padding: "3px",
              position: "relative",
              backgroundImage: `
                linear-gradient(90deg, #4ade80 50%, transparent 50%),
                linear-gradient(90deg, #4ade80 50%, transparent 50%),
                linear-gradient(0deg, #4ade80 50%, transparent 50%),
                linear-gradient(0deg, #4ade80 50%, transparent 50%)
              `,
              backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
              backgroundSize: "10px 2px, 10px 2px, 2px 10px, 2px 10px",
              backgroundPosition: "0% 0%, 0% 100%, 0% 0%, 100% 0%",
              animation: "borderMarch 0.6s linear infinite",
            }}
          >
            <div
              style={{
                height: "26px",
                background: "#1a1a1a",
                position: "relative",
                overflow: "hidden",
                boxShadow: "inset 0 2px 0 rgba(0,0,0,0.5)",
              }}
            >
              {/* Inner shadow top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "rgba(0,0,0,0.4)",
                  zIndex: 2,
                }}
              />

              {/* Fill bar with color shift */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${progress}%`,
                  background: `linear-gradient(180deg, ${barColor} 0%, ${barColorDark} 100%)`,
                  transition: "width 0.08s linear",
                  overflow: "hidden",
                }}
              >
                {/* Top highlight stripe */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "8px",
                    background: "rgba(255,255,255,0.18)",
                  }}
                />

                {/* Shimmer sweep */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "25%",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                    animation: "shimmer 1.4s linear infinite",
                  }}
                />

                {/* Chunk pop flash */}
                {progressBounce && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(255,255,255,0.35)",
                      animation: "chunkPop 0.08s ease-out forwards",
                    }}
                  />
                )}
              </div>

              {/* Progress percentage text with bounce */}
              <div
                key={progress}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#fff",
                  textShadow: "1px 1px 0 #000",
                  zIndex: 3,
                  animation: progressBounce
                    ? "numBounce 0.2s ease-out"
                    : "none",
                }}
              >
                {progress}%
              </div>
            </div>
          </div>

          {/* Loading label with spinning sword + animated dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#888",
              textShadow: "1px 1px 0 #000",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: "swordSpin 1.2s linear infinite",
                lineHeight: 1,
              }}
            >
              ⚔️
            </span>
            <span>
              Loading resources
              {".".repeat(dotCount)}
              {" ".repeat(3 - dotCount)}
            </span>
          </div>
        </div>

        {/* ── Did you know? cycling tips ── */}
        <div
          className="w-full text-center mt-1"
          style={{
            borderTop: "1px solid rgba(34,211,238,0.15)",
            paddingTop: "14px",
            minHeight: "56px",
          }}
        >
          <p
            className="text-xs mb-1 uppercase tracking-widest"
            style={{ color: "#22d3ee", fontFamily: "monospace", opacity: 0.7 }}
          >
            ◆ Did you know? ◆
          </p>
          <p
            className="text-sm"
            style={{
              color: "#ccc",
              fontFamily: "monospace",
              textShadow: "1px 1px 0 #000",
              lineHeight: 1.6,
              animation: tipVisible
                ? "tipFadeIn 0.4s ease-out both"
                : "tipFadeOut 0.4s ease-out both",
            }}
          >
            {LOADING_TIPS[tipIndex]}
          </p>
        </div>
      </div>

      {/* ── Bottom footer ── */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#555",
          textShadow: "1px 1px 0 #000",
          zIndex: 10,
          letterSpacing: "0.05em",
        }}
      >
        Sword MC Store • Not affiliated with Mojang
      </div>
    </div>
  );
}
