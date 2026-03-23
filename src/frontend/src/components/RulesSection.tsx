import {
  Ban,
  Gavel,
  HeartHandshake,
  MessageSquareOff,
  Pickaxe,
  ScrollText,
  Shield,
  Smile,
  UserCheck,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";

interface Rule {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
}

const rules: Rule[] = [
  {
    id: 1,
    icon: <Ban className="w-5 h-5" />,
    title: "No Hacking or Cheating",
    description:
      "Using hacked clients, cheats, exploits, or any unfair advantage is strictly forbidden. First offence results in a permanent ban.",
    severity: "critical",
  },
  {
    id: 2,
    icon: <Pickaxe className="w-5 h-5" />,
    title: "No Griefing",
    description:
      "Destroying, stealing from, or tampering with another player's builds or belongings without consent will result in immediate punishment.",
    severity: "critical",
  },
  {
    id: 3,
    icon: <HeartHandshake className="w-5 h-5" />,
    title: "Respect All Players",
    description:
      "Harassment, toxic behaviour, hate speech, or bullying of any kind will not be tolerated. Treat others the way you want to be treated.",
    severity: "high",
  },
  {
    id: 4,
    icon: <Volume2 className="w-5 h-5" />,
    title: "No Advertising Other Servers",
    description:
      "Promoting, sharing IPs of, or recruiting for other Minecraft servers in any chat channel is prohibited.",
    severity: "high",
  },
  {
    id: 5,
    icon: <UserCheck className="w-5 h-5" />,
    title: "Follow Staff Instructions",
    description:
      "All staff members must be respected and their decisions followed. Arguing with, impersonating, or disrespecting staff is a punishable offence.",
    severity: "high",
  },
  {
    id: 6,
    icon: <MessageSquareOff className="w-5 h-5" />,
    title: "No Spamming in Chat",
    description:
      "Repeatedly sending the same or similar messages, using excessive caps, or flooding any chat channel is not allowed.",
    severity: "medium",
  },
  {
    id: 7,
    icon: <Shield className="w-5 h-5" />,
    title: "No Inappropriate Builds",
    description:
      "Constructing offensive, inappropriate, or NSFW structures of any kind is forbidden and will be removed with punishment.",
    severity: "medium",
  },
  {
    id: 8,
    icon: <Smile className="w-5 h-5" />,
    title: "Have Fun!",
    description:
      "Sword MC is built for an awesome community. Play fair, help newcomers, and enjoy your time on the server!",
    severity: "medium",
  },
];

const severityConfig = {
  critical: {
    color: "oklch(0.56 0.22 25)",
    bg: "oklch(0.56 0.22 25 / 12%)",
    border: "oklch(0.56 0.22 25 / 35%)",
    label: "Critical",
    labelColor: "oklch(0.65 0.20 25)",
  },
  high: {
    color: "oklch(0.78 0.18 90)",
    bg: "oklch(0.78 0.18 90 / 12%)",
    border: "oklch(0.78 0.18 90 / 35%)",
    label: "High",
    labelColor: "oklch(0.78 0.18 90)",
  },
  medium: {
    color: "oklch(0.77 0.18 210)",
    bg: "oklch(0.77 0.18 210 / 12%)",
    border: "oklch(0.77 0.18 210 / 35%)",
    label: "Rule",
    labelColor: "oklch(0.77 0.18 210)",
  },
};

export function RulesSection() {
  return (
    <section
      id="rules"
      data-ocid="rules.section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.11_0.010_25/30%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-10 right-16 w-72 h-72 rounded-full bg-[oklch(0.56_0.22_25/6%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-16 w-56 h-56 rounded-full bg-[oklch(0.78_0.18_90/5%)] blur-3xl pointer-events-none" />

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
              Community
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            >
              <Gavel className="w-8 h-8 text-[oklch(0.65_0.20_25)]" />
            </motion.div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text">
              Server Rules
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Breaking these rules may result in a warning, kick, temporary ban,
            or permanent ban — depending on severity.
          </p>
        </motion.div>

        {/* Severity legend */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-4 mb-10 flex-wrap"
        >
          {(["critical", "high", "medium"] as const).map((s) => {
            const cfg = severityConfig[s];
            return (
              <div
                key={s}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs"
                style={{
                  borderColor: cfg.border,
                  background: cfg.bg,
                  color: cfg.labelColor,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: cfg.color }}
                />
                {s === "critical"
                  ? "Critical — Instant Ban"
                  : s === "high"
                    ? "High — Severe Punishment"
                    : "Standard Rule"}
              </div>
            );
          })}
        </motion.div>

        {/* Rules grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {rules.map((rule, i) => {
            const cfg = severityConfig[rule.severity];

            return (
              <motion.div
                key={rule.id}
                data-ocid={`rules.item.${i + 1}`}
                variants={{
                  hidden: { opacity: 0, y: 30, x: i % 2 === 0 ? -10 : 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1] as const,
                    },
                  },
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="group relative flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-opacity-70 transition-all duration-300 overflow-hidden"
                style={
                  {
                    "--rule-border": cfg.border,
                  } as React.CSSProperties
                }
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 40px ${cfg.bg}`,
                    borderColor: cfg.border,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{
                    border: `1px solid ${cfg.border}`,
                  }}
                />

                {/* Left: number + icon */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-base transition-all duration-300 group-hover:shadow-[0_0_16px_var(--rule-color,oklch(0.77_0.18_210/40%))]"
                    style={{
                      background: cfg.bg,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                    }}
                  >
                    <ScrollText className="w-5 h-5 hidden group-hover:block" />
                    <span className="group-hover:hidden font-display font-extrabold text-sm">
                      {rule.id}
                    </span>
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: cfg.bg,
                      color: cfg.color,
                    }}
                  >
                    {rule.icon}
                  </div>
                </div>

                {/* Right: content */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-extrabold text-base text-foreground tracking-wide">
                      {rule.title}
                    </h3>
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0"
                      style={{
                        color: cfg.labelColor,
                        borderColor: cfg.border,
                        background: cfg.bg,
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-mono text-xs text-muted-foreground mt-10"
        >
          Rules are enforced by our staff team. Appeals can be submitted in our{" "}
          <a
            href="https://discord.gg/w7c6fuA6A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Discord server
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
