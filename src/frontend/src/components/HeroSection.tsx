import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, Sparkles, Sword } from "lucide-react";
import { motion } from "motion/react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/uploads/Picsart_26-03-07_13-47-41-286-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* Dark overlays — red/crimson tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.05_15/80%)] via-[oklch(0.10_0.04_15/70%)] to-[oklch(0.10_0.05_15/92%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.05_15/55%)] via-transparent to-[oklch(0.08_0.05_15/55%)]" />

      {/* Pixel texture */}
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

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Server Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <img
            src="/assets/uploads/file_000000008b1c71fab2567310eb084cc5-1-1.png"
            alt="Sword MC Logo"
            className="w-48 sm:w-56 md:w-64 object-contain drop-shadow-[0_0_24px_oklch(0.78_0.14_195/0.5)]"
          />
        </motion.div>

        {/* Pre-badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono font-medium text-primary tracking-widest uppercase"
          >
            <Sparkles className="w-3 h-3" />
            Legendary Gear Shop
          </motion.div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-body font-light mb-8 max-w-2xl mx-auto"
        >
          The Ultimate Minecraft Weapons Store.{" "}
          <span className="text-foreground/80">
            From iron to netherite — every blade you need.
          </span>
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.65 },
            },
          }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: Sword, label: "Diamond Swords" },
            { icon: Shield, label: "Enchanted Gear" },
            { icon: Sparkles, label: "Netherite Blades" },
          ].map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[oklch(1_0_0/5%)] border border-[oklch(1_0_0/10%)] text-sm text-muted-foreground font-body"
            >
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            data-ocid="hero.primary_button"
            onClick={onShopNow}
            size="lg"
            className="h-14 px-10 text-base font-display font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 diamond-glow transition-all duration-300 hover:scale-105 active:scale-95 rounded-sm"
          >
            <Sword className="w-5 h-5 mr-2" />
            SHOP NOW
          </Button>
          <a
            href="https://discord.gg/kU6qNw6Dk"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.discord_button"
            className="inline-flex items-center gap-2 h-14 px-8 text-base font-display font-bold tracking-wide rounded-sm border-2 border-[#5865F2]/60 bg-[#5865F2]/15 text-[#7289DA] hover:bg-[#5865F2]/30 hover:border-[#5865F2]/80 hover:text-[#99AAF5] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <DiscordIcon />
            JOIN DISCORD
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-muted-foreground/50"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
