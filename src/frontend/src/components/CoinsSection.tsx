import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { playPurchaseSound } from "../utils/sounds";
import { PaymentModal } from "./PaymentModal";

interface CoinPackage {
  id: number;
  name: string;
  amount: number;
  price: number;
  glowColor: string;
  borderColor: string;
  badgeColor: string;
  badge?: string;
  savingsLabel?: string;
  perks: string[];
}

const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 1,
    name: "100 Coins",
    amount: 100,
    price: 89,
    glowColor: "rgba(250, 204, 21, 0.25)",
    borderColor: "oklch(0.78 0.18 90)",
    badgeColor: "oklch(0.78 0.18 90 / 15%)",
    perks: [
      "100 coins added to your wallet",
      "Spend on cosmetics & items",
      "Coins never expire",
      "Instant activation after approval",
    ],
  },
  {
    id: 2,
    name: "500 Coins",
    amount: 500,
    price: 399,
    glowColor: "rgba(251, 146, 60, 0.25)",
    borderColor: "oklch(0.72 0.20 55)",
    badgeColor: "oklch(0.72 0.20 55 / 15%)",
    badge: "Popular",
    savingsLabel: "Save ₹46 vs 5×100",
    perks: [
      "500 coins added to your wallet",
      "Spend on cosmetics & items",
      "Coins never expire",
      "Instant activation after approval",
    ],
  },
  {
    id: 3,
    name: "1000 Coins",
    amount: 1000,
    price: 749,
    glowColor: "rgba(34, 211, 238, 0.30)",
    borderColor: "oklch(0.77 0.18 210)",
    badgeColor: "oklch(0.77 0.18 210 / 15%)",
    badge: "Best Value",
    savingsLabel: "Save ₹141 vs 10×100",
    perks: [
      "1000 coins added to your wallet",
      "Spend on cosmetics & items",
      "Coins never expire",
      "Instant activation after approval",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const MAX_PURCHASES = 5;

export function CoinsSection() {
  const { isLoggedIn, purchaseRank, getPurchaseCount } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(
    null,
  );

  const handlePurchase = (pkg: CoinPackage) => {
    if (!isLoggedIn) {
      toast.error("Login required", {
        description: "Please register or login to purchase coins.",
        duration: 4000,
      });
      return;
    }

    const count = getPurchaseCount(pkg.name);
    if (count >= MAX_PURCHASES) {
      toast.info(`Max purchases reached for ${pkg.name}!`, {
        description: `You have already purchased ${pkg.name} ${MAX_PURCHASES} times.`,
        duration: 3000,
      });
      return;
    }

    setSelectedPackage(pkg);
  };

  return (
    <section
      id="coins"
      data-ocid="coins.section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.13_0.020_90/30%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-16 left-1/4 w-72 h-72 rounded-full bg-[oklch(0.78_0.18_90/6%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-56 h-56 rounded-full bg-[oklch(0.77_0.18_210/6%)] blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest px-2">
              Currency
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text mb-3">
            Coins
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Top up your in-game wallet. Use coins to unlock exclusive items,
            cosmetics, and special server features.
          </p>
        </motion.div>

        {/* Coin Package Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {COIN_PACKAGES.map((pkg, i) => {
            const purchaseCount = isLoggedIn ? getPurchaseCount(pkg.name) : 0;
            const isMaxed = purchaseCount >= MAX_PURCHASES;

            return (
              <motion.div
                key={pkg.id}
                data-ocid={`coins.card.${i + 1}`}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative rounded-xl bg-card border border-border overflow-hidden flex flex-col cursor-default"
                style={
                  {
                    "--coin-glow": pkg.glowColor,
                    "--coin-border": pkg.borderColor,
                  } as React.CSSProperties
                }
              >
                {/* Hover glow overlay — intense gold glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 60px ${pkg.glowColor}, inset 0 0 25px ${pkg.glowColor}`,
                  }}
                />
                {/* Hover border highlight with outer glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{
                    border: `1px solid ${pkg.borderColor}`,
                    boxShadow: `0 0 25px ${pkg.glowColor}, 0 0 50px ${pkg.glowColor}`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="h-1 w-full rounded-t-xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${pkg.borderColor}, transparent)`,
                    opacity: 0.8,
                  }}
                />

                {/* Package badge (Popular / Best Value) */}
                {pkg.badge && (
                  <div
                    className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border font-bold z-10"
                    style={{
                      color: pkg.borderColor,
                      borderColor: pkg.borderColor,
                      background: pkg.badgeColor,
                    }}
                  >
                    {pkg.badge}
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 gap-5">
                  {/* Icon + badge row */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 coin-glow"
                      style={{
                        background: pkg.badgeColor,
                        color: pkg.borderColor,
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      >
                        <Coins className="w-9 h-9" />
                      </motion.div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border"
                        style={{
                          color: pkg.borderColor,
                          borderColor: pkg.borderColor,
                          background: pkg.badgeColor,
                        }}
                      >
                        In-Game Currency
                      </span>
                      {purchaseCount > 0 && (
                        <span
                          className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${isMaxed ? "border-red-500/40 text-red-400 bg-red-500/10" : "border-green-500/40 text-green-400 bg-green-500/10"}`}
                        >
                          {purchaseCount}/{MAX_PURCHASES}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Coin name + price */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-extrabold text-3xl text-foreground tracking-wide">
                        {pkg.amount}
                      </h3>
                      <span
                        className="font-display font-extrabold text-2xl"
                        style={{ color: pkg.borderColor }}
                      >
                        🪙
                      </span>
                      <span className="font-display font-bold text-lg text-muted-foreground">
                        Coins
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="font-display font-extrabold text-4xl text-[oklch(0.84_0.18_85)]">
                        ₹{pkg.price}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        / purchase (max {MAX_PURCHASES}x)
                      </span>
                    </div>
                    {pkg.savingsLabel && (
                      <p
                        className="font-mono text-xs mt-1 font-semibold"
                        style={{ color: pkg.borderColor }}
                      >
                        {pkg.savingsLabel}
                      </p>
                    )}
                  </div>

                  {/* Coin perks list */}
                  <ul className="flex flex-col gap-2 flex-1">
                    {pkg.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 font-body text-xs text-foreground/80"
                      >
                        <span
                          className="text-sm shrink-0 mt-0.5"
                          style={{ color: pkg.borderColor }}
                        >
                          🪙
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Purchase button */}
                  <Button
                    data-ocid={`coins.purchase_button.${i + 1}`}
                    onClick={() => handlePurchase(pkg)}
                    disabled={isMaxed}
                    className="w-full mt-2 font-display font-bold text-sm tracking-wide transition-all duration-200 bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30 hover:border-primary/80 hover:text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                    variant="outline"
                  >
                    {isMaxed
                      ? `✓ ${pkg.name} (${MAX_PURCHASES}/${MAX_PURCHASES})`
                      : purchaseCount > 0
                        ? `Purchase Again (${purchaseCount}/${MAX_PURCHASES}) 🪙`
                        : `Purchase ${pkg.name} 🪙`}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-mono text-xs text-muted-foreground mt-10"
        >
          Coins can be purchased up to {MAX_PURCHASES} times each. Pay via UPI
          and upload your screenshot for activation.
        </motion.p>
      </div>

      <PaymentModal
        rank={selectedPackage}
        open={selectedPackage !== null}
        onClose={() => setSelectedPackage(null)}
        onConfirm={(itemName) => {
          const count = getPurchaseCount(itemName);
          purchaseRank(itemName);
          setSelectedPackage(null);
          playPurchaseSound();
          toast.success(`${itemName} — Payment Submitted! 🪙 (x${count + 1})`, {
            description:
              "Your screenshot is under review. Coins will be added shortly.",
            duration: 5000,
          });
        }}
      />
    </section>
  );
}
