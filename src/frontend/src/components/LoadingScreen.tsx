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
];

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tip] = useState(
    () => LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)],
  );
  const [fadeOut, setFadeOut] = useState(false);

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
        setTimeout(tick, stage.delay + Math.random() * 20);
      } else {
        stageIndex++;
        if (stageIndex < stages.length) {
          setTimeout(tick, 150); // brief pause between stages
        } else {
          // Done — fade out after short hold
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinish, 600);
          }, 400);
        }
      }
    };

    const start = setTimeout(tick, 200);
    return () => clearTimeout(start);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "#0a0a0a",
        imageRendering: "pixelated",
      }}
      data-ocid="loading_screen.panel"
    >
      {/* Minecraft-style dirt/stone pixel background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 15px,
              rgba(100,70,40,0.3) 15px,
              rgba(100,70,40,0.3) 16px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 15px,
              rgba(100,70,40,0.3) 15px,
              rgba(100,70,40,0.3) 16px
            )
          `,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-6 px-8 w-full max-w-md">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            src="/assets/uploads/file_000000008b1c71fab2567310eb084cc5-1-1.png"
            alt="Sword MC"
            className="w-20 h-20 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          <h1
            className="text-3xl font-bold tracking-widest uppercase"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              color: "#5af",
              textShadow: "3px 3px 0 #003366, -1px -1px 0 #003366",
              letterSpacing: "0.15em",
            }}
          >
            Sword MC
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

        {/* Progress bar — Minecraft style */}
        <div className="w-full flex flex-col gap-1">
          {/* Bar container */}
          <div
            className="w-full relative"
            style={{
              height: "26px",
              background: "#1a1a1a",
              border: "2px solid #555",
              boxShadow: "inset 0 2px 0 rgba(0,0,0,0.5), 2px 2px 0 #000",
            }}
          >
            {/* Inner shadow top */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{ height: "3px", background: "rgba(0,0,0,0.4)" }}
            />
            {/* Fill */}
            <div
              className="absolute top-0 left-0 bottom-0 transition-all"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(180deg, #5fb85f 0%, #3d8c3d 50%, #2d6e2d 100%)",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.15)",
                transition: "width 0.08s linear",
              }}
            >
              {/* Highlight stripe */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "8px",
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            </div>
            {/* Progress text */}
            <div
              className="absolute inset-0 flex items-center justify-center text-xs font-bold"
              style={{
                fontFamily: "monospace",
                color: "#fff",
                textShadow: "1px 1px 0 #000",
                zIndex: 1,
              }}
            >
              {progress}%
            </div>
          </div>

          {/* Loading label */}
          <p
            className="text-center text-xs"
            style={{
              fontFamily: "monospace",
              color: "#888",
              textShadow: "1px 1px 0 #000",
            }}
          >
            Loading resources...
          </p>
        </div>

        {/* Tip of the day */}
        <div
          className="w-full text-center mt-2"
          style={{
            borderTop: "1px solid #333",
            paddingTop: "16px",
          }}
        >
          <p
            className="text-xs mb-1 uppercase tracking-widest"
            style={{ color: "#666", fontFamily: "monospace" }}
          >
            Did you know?
          </p>
          <p
            className="text-sm"
            style={{
              color: "#ccc",
              fontFamily: "monospace",
              textShadow: "1px 1px 0 #000",
              lineHeight: 1.6,
            }}
          >
            {tip}
          </p>
        </div>
      </div>

      {/* Bottom Mojang-style footer */}
      <div
        className="absolute bottom-4 text-xs"
        style={{
          color: "#555",
          fontFamily: "monospace",
          textShadow: "1px 1px 0 #000",
        }}
      >
        Sword MC Store • Not affiliated with Mojang
      </div>
    </div>
  );
}
