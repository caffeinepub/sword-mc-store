import { Button } from "@/components/ui/button";
import { Crown, Shield, Skull, Star, Swords } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { PaymentModal } from "./PaymentModal";

interface Rank {
  id: number;
  name: string;
  price: number;
  icon: React.ReactNode;
  description: string;
  perks: string[];
  glowColor: string;
  borderColor: string;
  badgeColor: string;
  tierLabel: string;
}

const ranks: Rank[] = [
  {
    id: 1,
    name: "VIP",
    price: 69,
    icon: <Star className="w-8 h-8" />,
    description:
      "Enter the elite circle. Gain access to exclusive VIP perks and rewards.",
    perks: [
      "Custom chat prefix",
      "Priority queue",
      "VIP kit on join",
      "Colored name",
    ],
    glowColor: "rgba(250, 204, 21, 0.25)",
    borderColor: "oklch(0.78 0.18 90)",
    badgeColor: "oklch(0.78 0.18 90 / 15%)",
    tierLabel: "Starter Elite",
  },
  {
    id: 2,
    name: "MVIP",
    price: 79,
    icon: <Crown className="w-8 h-8" />,
    description:
      "Master VIP status. Double the rewards, double the glory on every server.",
    perks: [
      "All VIP perks",
      "Monthly crate key",
      "MVIP-only commands",
      "Fly in lobby",
    ],
    glowColor: "rgba(251, 146, 60, 0.25)",
    borderColor: "oklch(0.72 0.20 55)",
    badgeColor: "oklch(0.72 0.20 55 / 15%)",
    tierLabel: "Master Elite",
  },
  {
    id: 3,
    name: "Sword",
    price: 159,
    icon: <Swords className="w-8 h-8" />,
    description:
      "Wield the Sword rank. The mark of a true warrior on Sword MC.",
    perks: [
      "All MVIP perks",
      "Enchanted starter sword",
      "Weekly loot drop",
      "Custom particle FX",
    ],
    glowColor: "rgba(34, 211, 238, 0.30)",
    borderColor: "oklch(0.77 0.18 210)",
    badgeColor: "oklch(0.77 0.18 210 / 15%)",
    tierLabel: "Warrior",
  },
  {
    id: 4,
    name: "Immortal",
    price: 199,
    icon: <Skull className="w-8 h-8" />,
    description:
      "Transcend death itself. The pinnacle of power — feared by all who cross your path.",
    perks: [
      "All Sword perks",
      "Immortal title + aura",
      "Daily diamond kit",
      "Staff-level cosmetics",
    ],
    glowColor: "rgba(220, 38, 38, 0.35)",
    borderColor: "oklch(0.56 0.22 25)",
    badgeColor: "oklch(0.56 0.22 25 / 15%)",
    tierLabel: "Legendary",
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

export function RanksSection() {
  const { isLoggedIn, purchaseRank, getPurchaseCount } = useAuth();
  const [paymentRank, setPaymentRank] = useState<Rank | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handlePurchase = (rank: Rank) => {
    if (!isLoggedIn) {
      toast.error("Login required", {
        description: "Please register or login to purchase a rank.",
        duration: 4000,
      });
      return;
    }

    const count = getPurchaseCount(rank.name);
    if (count >= MAX_PURCHASES) {
      toast.info(`Max purchases reached for ${rank.name}!`, {
        description: `You have already purchased ${rank.name} ${MAX_PURCHASES} times.`,
        duration: 3000,
      });
      return;
    }

    setPaymentRank(rank);
    setPaymentModalOpen(true);
  };

  return (
    <section
      id="ranks"
      data-ocid="ranks.section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.11_0.015_25/40%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />
      {/* Subtle decorative orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[oklch(0.56_0.22_25/8%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-[oklch(0.77_0.18_210/8%)] blur-3xl pointer-events-none" />

      {/* Sword sweep shimmer bar */}
      <div className="sword-shimmer h-px w-full mb-8" />

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
              Prestige
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text mb-3">
            Ranks
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Elevate your status on Sword MC. Choose a rank and unlock exclusive
            perks, cosmetics, and server privileges.
          </p>
        </motion.div>

        {/* Rank Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {ranks.map((rank, i) => {
            const purchaseCount = isLoggedIn ? getPurchaseCount(rank.name) : 0;
            const isMaxed = purchaseCount >= MAX_PURCHASES;

            return (
              <motion.div
                key={rank.id}
                data-ocid={`ranks.card.${i + 1}`}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative rounded-xl bg-card border border-border overflow-hidden flex flex-col cursor-default"
                style={
                  {
                    "--rank-glow": rank.glowColor,
                    "--rank-border": rank.borderColor,
                  } as React.CSSProperties
                }
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 30px ${rank.glowColor}`,
                  }}
                />
                {/* Hover border highlight */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: `1px solid ${rank.borderColor}`,
                  }}
                />

                {/* Card top accent bar — uses rank color */}
                <div
                  className="h-1 w-full rounded-t-xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${rank.borderColor}, transparent)`,
                    opacity: 0.8,
                  }}
                />

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  {/* Icon + tier badge */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.4 },
                      }}
                      className="w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: rank.badgeColor,
                        color: rank.borderColor,
                      }}
                    >
                      {rank.icon}
                    </motion.div>
                    <div className="flex flex-col items-end gap-1 ml-auto">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border"
                        style={{
                          color: rank.borderColor,
                          borderColor: rank.borderColor,
                          background: rank.badgeColor,
                        }}
                      >
                        {rank.tierLabel}
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

                  {/* Rank name + price */}
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-foreground tracking-wide">
                      {rank.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display font-extrabold text-3xl text-[oklch(0.84_0.18_85)]">
                        ₹{rank.price}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        / purchase (max {MAX_PURCHASES}x)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {rank.description}
                  </p>

                  {/* Perks list */}
                  <ul className="flex flex-col gap-1.5 flex-1">
                    {rank.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 font-body text-xs text-foreground/80"
                      >
                        <Shield
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: rank.borderColor }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Purchase button */}
                  <Button
                    data-ocid={`ranks.purchase_button.${i + 1}`}
                    onClick={() => handlePurchase(rank)}
                    disabled={isMaxed}
                    className="w-full mt-2 font-display font-bold text-sm tracking-wide transition-all duration-200 bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30 hover:border-primary/80 hover:text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                    variant="outline"
                  >
                    {isMaxed
                      ? `✓ ${rank.name} (${MAX_PURCHASES}/${MAX_PURCHASES})`
                      : purchaseCount > 0
                        ? `Purchase Again (${purchaseCount}/${MAX_PURCHASES})`
                        : `Purchase ${rank.name}`}
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
          transition={{ delay: 0.6 }}
          className="text-center font-mono text-xs text-muted-foreground mt-10"
        >
          Each rank can be purchased up to {MAX_PURCHASES} times. Pay via UPI
          and upload your screenshot for instant verification.
        </motion.p>
      </div>

      <PaymentModal
        rank={paymentRank}
        open={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setPaymentRank(null);
        }}
        onConfirm={(rankName) => {
          const count = getPurchaseCount(rankName);
          purchaseRank(rankName);
          setPaymentModalOpen(false);
          setPaymentRank(null);
          toast.success(
            `${rankName} Rank — Payment Submitted! (x${count + 1})`,
            {
              description:
                "Your screenshot is under review. Rank will be activated shortly.",
              duration: 5000,
            },
          );
        }}
      />
    </section>
  );
}
