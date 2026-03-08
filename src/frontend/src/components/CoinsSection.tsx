import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { PaymentModal } from "./PaymentModal";

const COIN_PACKAGE = {
  id: 100,
  name: "100 Coins",
  price: 89,
  glowColor: "rgba(250, 204, 21, 0.25)",
  borderColor: "oklch(0.78 0.18 90)",
  badgeColor: "oklch(0.78 0.18 90 / 15%)",
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

export function CoinsSection() {
  const { isLoggedIn, user, purchaseRank } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const isOwned =
    isLoggedIn && user?.purchasedRanks.includes(COIN_PACKAGE.name);

  const handlePurchase = () => {
    if (!isLoggedIn) {
      toast.error("Login required", {
        description: "Please register or login to purchase coins.",
        duration: 4000,
      });
      return;
    }

    if (isOwned) {
      toast.info("You already own 100 Coins!", {
        description: "This coin package is already on your account.",
        duration: 3000,
      });
      return;
    }

    setPaymentModalOpen(true);
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
      <div className="absolute bottom-16 right-1/4 w-56 h-56 rounded-full bg-[oklch(0.78_0.18_90/8%)] blur-3xl pointer-events-none" />

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

        {/* Coin Package Card — centered single card */}
        <div className="flex justify-center">
          <motion.div
            data-ocid="coins.card.1"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -6,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="group relative rounded-xl bg-card border border-border overflow-hidden flex flex-col cursor-default w-full max-w-sm"
            style={
              {
                "--coin-glow": COIN_PACKAGE.glowColor,
                "--coin-border": COIN_PACKAGE.borderColor,
              } as React.CSSProperties
            }
          >
            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
              style={{
                boxShadow: `inset 0 0 40px ${COIN_PACKAGE.glowColor}`,
              }}
            />
            {/* Hover border highlight */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                border: `1px solid ${COIN_PACKAGE.borderColor}`,
              }}
            />

            {/* Top accent line */}
            <div
              className="h-1 w-full rounded-t-xl"
              style={{
                background: `linear-gradient(90deg, transparent, ${COIN_PACKAGE.borderColor}, transparent)`,
                opacity: 0.8,
              }}
            />

            {/* Card body */}
            <div className="flex flex-col flex-1 p-6 gap-5">
              {/* Icon + badge row */}
              <div className="flex items-center justify-between">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: COIN_PACKAGE.badgeColor,
                    color: COIN_PACKAGE.borderColor,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Coins className="w-9 h-9" />
                  </motion.div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border"
                    style={{
                      color: COIN_PACKAGE.borderColor,
                      borderColor: COIN_PACKAGE.borderColor,
                      background: COIN_PACKAGE.badgeColor,
                    }}
                  >
                    In-Game Currency
                  </span>
                  {isOwned && (
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-green-500/40 text-green-400 bg-green-500/10">
                      Owned
                    </span>
                  )}
                </div>
              </div>

              {/* Coin name + price */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-extrabold text-3xl text-foreground tracking-wide">
                    100
                  </h3>
                  <span
                    className="font-display font-extrabold text-2xl"
                    style={{ color: COIN_PACKAGE.borderColor }}
                  >
                    🪙
                  </span>
                  <span className="font-display font-bold text-lg text-muted-foreground">
                    Coins
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl text-[oklch(0.84_0.18_85)]">
                    ₹{COIN_PACKAGE.price}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    / one-time
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Instantly load 100 coins into your Sword MC wallet. Spend them
                on exclusive items, cosmetics, and special in-game upgrades.
              </p>

              {/* Coin perks list */}
              <ul className="flex flex-col gap-2">
                {[
                  "100 coins added to your in-game wallet",
                  "Spend on exclusive cosmetics & items",
                  "Coins never expire",
                  "Instant activation after approval",
                ].map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 font-body text-xs text-foreground/80"
                  >
                    <span
                      className="text-sm shrink-0 mt-0.5"
                      style={{ color: COIN_PACKAGE.borderColor }}
                    >
                      🪙
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Purchase button */}
              <Button
                data-ocid="coins.purchase_button.1"
                onClick={handlePurchase}
                disabled={!!isOwned}
                className="w-full mt-2 font-display font-bold text-sm tracking-wide transition-all duration-200 bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30 hover:border-primary/80 hover:text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                variant="outline"
              >
                {isOwned ? "✓ 100 Coins Owned" : "Purchase 100 Coins 🪙"}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-mono text-xs text-muted-foreground mt-10"
        >
          Coins are permanent and never expire. Pay via UPI and upload your
          screenshot for activation.
        </motion.p>
      </div>

      <PaymentModal
        rank={COIN_PACKAGE}
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onConfirm={(itemName) => {
          purchaseRank(itemName);
          setPaymentModalOpen(false);
          toast.success("100 Coins — Payment Submitted! 🪙", {
            description:
              "Your screenshot is under review. Coins will be added shortly.",
            duration: 5000,
          });
        }}
      />
    </section>
  );
}
