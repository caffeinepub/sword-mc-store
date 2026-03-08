import { Medal, Swords, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface Player {
  rank: number;
  name: string;
  kills: number;
  score: number;
  streak: number;
  title: string;
}

const topPlayers: Player[] = [
  {
    rank: 1,
    name: "Notch",
    kills: 4821,
    score: 96420,
    streak: 87,
    title: "Server Legend",
  },
  {
    rank: 2,
    name: "HerobrinePvP",
    kills: 4103,
    score: 82060,
    streak: 64,
    title: "Shadow Blade",
  },
  {
    rank: 3,
    name: "DiamondSlayer",
    kills: 3798,
    score: 75960,
    streak: 55,
    title: "Iron Fist",
  },
  {
    rank: 4,
    name: "SteveXtreme",
    kills: 3201,
    score: 64020,
    streak: 41,
    title: "Warrior",
  },
  {
    rank: 5,
    name: "AlexWarrior",
    kills: 2876,
    score: 57520,
    streak: 38,
    title: "Warrior",
  },
  {
    rank: 6,
    name: "NetherKing99",
    kills: 2554,
    score: 51080,
    streak: 29,
    title: "Gladiator",
  },
  {
    rank: 7,
    name: "CreeperSlayer",
    kills: 2301,
    score: 46020,
    streak: 25,
    title: "Gladiator",
  },
  {
    rank: 8,
    name: "EnderDragonX",
    kills: 2014,
    score: 40280,
    streak: 20,
    title: "Fighter",
  },
  {
    rank: 9,
    name: "WitherStorm",
    kills: 1789,
    score: 35780,
    streak: 17,
    title: "Fighter",
  },
  {
    rank: 10,
    name: "SwordMaster",
    kills: 1542,
    score: 30840,
    streak: 12,
    title: "Fighter",
  },
];

const podiumConfig = {
  1: {
    color: "oklch(0.84 0.18 85)",
    bg: "oklch(0.78 0.18 90 / 15%)",
    border: "oklch(0.78 0.18 90 / 50%)",
    glow: "rgba(250, 204, 21, 0.25)",
    label: "Gold",
    icon: <Trophy className="w-5 h-5" />,
  },
  2: {
    color: "oklch(0.80 0.06 260)",
    bg: "oklch(0.75 0.05 260 / 15%)",
    border: "oklch(0.75 0.05 260 / 50%)",
    glow: "rgba(148, 163, 184, 0.20)",
    label: "Silver",
    icon: <Medal className="w-5 h-5" />,
  },
  3: {
    color: "oklch(0.72 0.20 55)",
    bg: "oklch(0.72 0.20 55 / 15%)",
    border: "oklch(0.72 0.20 55 / 50%)",
    glow: "rgba(251, 146, 60, 0.25)",
    label: "Bronze",
    icon: <Medal className="w-5 h-5" />,
  },
};

type PodiumRank = 1 | 2 | 3;

function isPodiumRank(rank: number): rank is PodiumRank {
  return rank === 1 || rank === 2 || rank === 3;
}

export function LeaderboardSection() {
  return (
    <section
      id="leaderboard"
      data-ocid="leaderboard.section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.12_0.020_85/30%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-16 right-10 w-80 h-80 rounded-full bg-[oklch(0.78_0.18_90/5%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 left-10 w-64 h-64 rounded-full bg-[oklch(0.77_0.18_210/5%)] blur-3xl pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative">
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
              Rankings
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, -15, 15, -8, 8, 0], scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              <Trophy className="w-8 h-8 text-[oklch(0.84_0.18_85)]" />
            </motion.div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text">
              Top Players
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            The most feared warriors on Sword MC. Rise through the ranks and
            claim your spot on the leaderboard.
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {/* #2 — left */}
          {[topPlayers[1], topPlayers[0], topPlayers[2]].map(
            (player, podiumIdx) => {
              const cfg = podiumConfig[player.rank as PodiumRank];
              const heights = ["h-28", "h-36", "h-24"];
              const isFirst = player.rank === 1;
              return (
                <motion.div
                  key={player.rank}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`flex flex-col items-center justify-end rounded-xl border p-3 ${heights[podiumIdx]} transition-all duration-300`}
                  style={{
                    background: cfg.bg,
                    borderColor: cfg.border,
                    boxShadow: isFirst
                      ? `0 0 30px ${cfg.glow}, 0 0 60px ${cfg.glow}`
                      : `0 0 15px ${cfg.glow}`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
                    style={{ color: cfg.color, background: cfg.bg }}
                  >
                    {cfg.icon}
                  </div>
                  <p
                    className="font-mono font-bold text-[10px] truncate max-w-full text-center"
                    style={{ color: cfg.color }}
                  >
                    {player.name}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground">
                    {player.kills.toLocaleString()} kills
                  </p>
                  <div
                    className="mt-1 font-display font-extrabold text-xl"
                    style={{ color: cfg.color }}
                  >
                    #{player.rank}
                  </div>
                </motion.div>
              );
            },
          )}
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-card border border-border overflow-hidden"
          style={{
            boxShadow:
              "0 0 40px oklch(0.78 0.18 90 / 8%), 0 4px 24px oklch(0 0 0 / 30%)",
          }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[48px_1fr_auto_auto_auto] gap-2 px-5 py-3 border-b border-border bg-background/40">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-center">
              #
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Player
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-right hidden sm:block">
              Kills
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-right hidden md:block">
              Score
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-right">
              KS
            </span>
          </div>

          {/* Rows */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.2 },
              },
            }}
          >
            {topPlayers.map((player, i) => {
              const isPodium = isPodiumRank(player.rank);
              const cfg = isPodium ? podiumConfig[player.rank] : null;
              const isLast = i === topPlayers.length - 1;

              return (
                <motion.div
                  key={player.rank}
                  data-ocid={`leaderboard.row.${player.rank}`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.35, ease: "easeOut" },
                    },
                  }}
                  whileHover={{
                    backgroundColor: isPodium
                      ? `${cfg!.bg}`
                      : "oklch(0.18 0.01 260 / 40%)",
                    transition: { duration: 0.15 },
                  }}
                  className={`group grid grid-cols-[48px_1fr_auto_auto_auto] gap-2 items-center px-5 py-3.5 transition-colors ${!isLast ? "border-b border-border/60" : ""}`}
                >
                  {/* Rank number */}
                  <div className="flex items-center justify-center">
                    {isPodium ? (
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ color: cfg!.color, background: cfg!.bg }}
                      >
                        {cfg!.icon}
                      </div>
                    ) : (
                      <span className="font-mono font-bold text-sm text-muted-foreground">
                        #{player.rank}
                      </span>
                    )}
                  </div>

                  {/* Player info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Avatar placeholder */}
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 text-xs font-display font-bold"
                      style={
                        isPodium
                          ? {
                              background: cfg!.bg,
                              color: cfg!.color,
                              border: `1px solid ${cfg!.border}`,
                            }
                          : {
                              background: "oklch(0.20 0.01 260)",
                              color: "oklch(0.60 0.01 260)",
                              border: "1px solid oklch(0.25 0.01 260)",
                            }
                      }
                    >
                      {player.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-display font-bold text-sm truncate"
                        style={
                          isPodium
                            ? { color: cfg!.color }
                            : { color: undefined }
                        }
                      >
                        {player.name}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">
                        {player.title}
                      </p>
                    </div>
                  </div>

                  {/* Kills */}
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 justify-end">
                      <Swords className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono font-bold text-sm text-foreground">
                        {player.kills.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right hidden md:block">
                    <span className="font-mono text-xs text-muted-foreground">
                      {player.score.toLocaleString()}
                    </span>
                  </div>

                  {/* Kill streak */}
                  <div className="text-right">
                    <span
                      className="font-mono font-bold text-xs px-2 py-0.5 rounded"
                      style={
                        isPodium
                          ? {
                              background: cfg!.bg,
                              color: cfg!.color,
                            }
                          : {
                              background: "oklch(0.20 0.01 260)",
                              color: "oklch(0.60 0.02 210)",
                            }
                      }
                    >
                      🔥 {player.streak}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8 flex-wrap"
        >
          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5" /> Kills = PvP kills
          </span>
          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" /> Score = total points
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            🔥 KS = best kill streak
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-mono text-xs text-muted-foreground mt-4"
        >
          Leaderboard updates daily. Play fair and climb to the top!
        </motion.p>
      </div>
    </section>
  );
}
