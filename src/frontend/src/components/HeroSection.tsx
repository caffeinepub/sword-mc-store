import { ChevronDown, Coins, Crown, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="fill-current" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const PixelHeart = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 10 10"
    style={{ imageRendering: "pixelated" }}
    aria-hidden="true"
  >
    <rect x="1" y="2" width="3" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="6" y="2" width="3" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="0" y="3" width="4" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="6" y="3" width="4" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="0" y="4" width="10" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="0" y="5" width="10" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="1" y="6" width="8" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="2" y="7" width="6" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="3" y="8" width="4" height="1" fill="oklch(0.78 0.14 195)" />
    <rect x="4" y="9" width="2" height="1" fill="oklch(0.78 0.14 195)" />
  </svg>
);

interface HeroSectionProps {
  onShopNow: () => void;
}

const neonButtons = [
  {
    id: "shop",
    label: "SHOP",
    icon: <ShoppingCart className="w-5 h-5" />,
    right: <ChevronDown className="w-5 h-5" />,
    glow: "rgba(220,20,20,0.9)",
    glowFar: "rgba(180,0,0,0.5)",
    border: "rgba(255,60,60,0.8)",
    ocid: "hero.primary_button",
    action: "shop" as const,
  },
  {
    id: "ranks",
    label: "RANKS",
    icon: <Crown className="w-5 h-5" />,
    right: <ChevronDown className="w-5 h-5" />,
    glow: "rgba(220,180,0,0.9)",
    glowFar: "rgba(180,140,0,0.5)",
    border: "rgba(255,215,0,0.8)",
    ocid: "hero.ranks_button",
    action: "ranks" as const,
  },
  {
    id: "coins",
    label: "COINS",
    icon: <Coins className="w-5 h-5" />,
    right: <ChevronDown className="w-5 h-5" />,
    glow: "rgba(0,210,210,0.9)",
    glowFar: "rgba(0,170,170,0.5)",
    border: "rgba(0,255,255,0.8)",
    ocid: "hero.coins_button",
    action: "coins" as const,
  },
  {
    id: "discord",
    label: "DISCORD",
    icon: (
      <span className="w-5 h-5 flex items-center">
        <DiscordIcon />
      </span>
    ),
    right: null,
    glow: "rgba(100,80,240,0.9)",
    glowFar: "rgba(70,50,200,0.5)",
    border: "rgba(140,120,255,0.8)",
    ocid: "hero.discord_button",
    action: "discord" as const,
  },
];

export function HeroSection({ onShopNow }: HeroSectionProps) {
  const handleButton = (action: (typeof neonButtons)[number]["action"]) => {
    if (action === "shop") {
      onShopNow();
    } else if (action === "ranks") {
      document.getElementById("ranks")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "coins") {
      document.getElementById("coins")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "discord") {
      window.open(
        "https://discord.gg/kU6qNw6Dk",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/uploads/Picsart_26-03-07_13-47-41-286-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.05_15/85%)] via-[oklch(0.10_0.04_15/75%)] to-[oklch(0.10_0.05_15/95%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.05_15/55%)] via-transparent to-[oklch(0.08_0.05_15/55%)]" />
      <div className="absolute inset-0 pixel-texture opacity-20" />

      {/* Floating particles */}
      {(["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"] as const).map(
        (pid, i) => (
          <motion.div
            key={pid}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              background:
                i % 3 === 0
                  ? "oklch(0.78 0.14 195)"
                  : i % 3 === 1
                    ? "oklch(0.60 0.20 25)"
                    : "oklch(0.82 0.16 80)",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ),
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 w-full max-w-sm mx-auto">
        {/* Arched "Sword MC" title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full flex justify-center mb-4"
        >
          <svg
            viewBox="0 0 300 80"
            className="w-72 sm:w-80"
            role="img"
            aria-labelledby="sword-mc-title"
          >
            <title id="sword-mc-title">Sword MC</title>
            <defs>
              <path id="arch" d="M 20,70 Q 150,-10 280,70" />
            </defs>
            <text
              fontSize="38"
              fontWeight="900"
              fontFamily="'Bricolage Grotesque', sans-serif"
              letterSpacing="4"
              fill="white"
              style={{
                filter:
                  "drop-shadow(0 0 12px orange) drop-shadow(0 0 28px #ff6600) drop-shadow(0 0 6px #ffaa00)",
                paintOrder: "stroke",
              }}
              stroke="#ff8800"
              strokeWidth="1"
            >
              <textPath href="#arch" startOffset="50%" textAnchor="middle">
                ⚔ SWORD MC ⚔
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Discord big icon button */}
        <motion.a
          href="https://discord.gg/kU6qNw6Dk"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="hero.discord_icon_button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mb-6 flex items-center justify-center rounded-2xl"
          style={{
            width: 80,
            height: 80,
            background: "#5865F2",
            boxShadow: "0 0 20px #5865F2, 0 0 40px rgba(88,101,242,0.5)",
          }}
          aria-label="Join Discord"
        >
          <span
            className="text-white"
            style={{ width: 48, height: 48, display: "flex" }}
          >
            <DiscordIcon />
          </span>
        </motion.a>

        {/* Server Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative flex justify-center mb-8"
        >
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="hero-logo-aura rounded-full"
              style={{
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle, oklch(0.78 0.14 195 / 25%) 0%, oklch(0.78 0.14 195 / 10%) 40%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>
          <img
            src="/assets/uploads/file_000000008b1c71fab2567310eb084cc5-1-1.png"
            alt="Sword MC Logo"
            className="relative z-10 w-48 sm:w-56 object-contain drop-shadow-[0_0_24px_oklch(0.78_0.14_195/0.5)]"
          />
        </motion.div>

        {/* Neon buttons stack */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.55 },
            },
          }}
          className="w-full flex flex-col gap-3 mb-8"
        >
          {neonButtons.map((btn) => (
            <motion.button
              key={btn.id}
              data-ocid={btn.ocid}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleButton(btn.action)}
              className="relative w-full flex items-center justify-between px-6 py-4 rounded-lg font-bold text-lg tracking-widest text-white transition-all duration-200"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: `2px solid ${btn.border}`,
                boxShadow: `0 0 16px ${btn.glow}, 0 0 40px ${btn.glowFar}, inset 0 0 12px rgba(255,255,255,0.04)`,
                textShadow: `0 0 10px ${btn.glow}`,
              }}
            >
              <span className="flex items-center gap-3">
                <span style={{ filter: `drop-shadow(0 0 6px ${btn.glow})` }}>
                  {btn.icon}
                </span>
                <span>{btn.label}</span>
              </span>
              {btn.right && <span className="opacity-70">{btn.right}</span>}
            </motion.button>
          ))}
        </motion.div>

        {/* Pixel hearts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex items-center gap-4"
        >
          {(["h1", "h2", "h3"] as const).map((hid, i) => (
            <motion.div
              key={hid}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 6px oklch(0.78 0.14 195))" }}
            >
              <PixelHeart />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
