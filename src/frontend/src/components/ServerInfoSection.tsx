import { Button } from "@/components/ui/button";
import { Check, Copy, Globe, Server, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SERVER_IP = "swordmc.zenithcloud.fun";

const serverStats = [
  { label: "Mode", value: "Survival PvP", icon: <Wifi className="w-4 h-4" /> },
  {
    label: "Version",
    value: "Java 1.21+",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    label: "Slots",
    value: "200 Players",
    icon: <Server className="w-4 h-4" />,
  },
];

export function ServerInfoSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      toast.success("Server IP copied!", {
        description: `${SERVER_IP} is in your clipboard.`,
        duration: 2500,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy", {
        description: "Please copy the IP manually.",
      });
    }
  };

  return (
    <section
      id="server-info"
      data-ocid="server_info.section"
      className="py-20 relative overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.12_0.025_210/35%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-20 left-0 w-80 h-80 rounded-full bg-[oklch(0.77_0.18_210/6%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-[oklch(0.56_0.22_25/6%)] blur-3xl pointer-events-none" />

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
              Connect
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              <Server className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text">
              Join The Server
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Connect to Sword MC and battle your way to the top. Copy the IP
            below and paste it in Minecraft.
          </p>
        </motion.div>

        {/* Main IP Box */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative rounded-2xl bg-card border overflow-hidden"
            style={{
              borderColor: "oklch(0.77 0.18 210 / 50%)",
              boxShadow:
                "0 0 40px oklch(0.77 0.18 210 / 15%), 0 0 80px oklch(0.77 0.18 210 / 8%)",
            }}
          >
            {/* Top accent gradient bar */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.77 0.18 210), transparent)",
              }}
            />

            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, oklch(0.77 0.18 210 / 8%) 0%, transparent 70%)",
              }}
            />

            <div className="p-8 sm:p-10 relative">
              {/* Live indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-green-400"
                  style={{
                    boxShadow: "0 0 8px oklch(0.72 0.20 145)",
                  }}
                />
                <span className="font-mono text-xs text-green-400 uppercase tracking-widest">
                  Server Online
                </span>
              </div>

              {/* IP Display */}
              <div className="text-center mb-6">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Server Address
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block px-6 py-4 rounded-xl bg-background/60 border border-primary/30 cursor-default"
                  style={{
                    boxShadow: "inset 0 0 20px oklch(0.77 0.18 210 / 8%)",
                  }}
                >
                  <span
                    className="font-mono font-bold text-2xl sm:text-3xl tracking-wide"
                    style={{
                      color: "oklch(0.85 0.16 195)",
                      textShadow: "0 0 20px oklch(0.77 0.18 210 / 60%)",
                    }}
                  >
                    {SERVER_IP}
                  </span>
                </motion.div>
              </div>

              {/* Copy Button */}
              <div className="flex justify-center">
                <Button
                  data-ocid="server_info.copy_button"
                  onClick={handleCopy}
                  className="h-11 px-8 font-display font-bold text-sm tracking-wide transition-all duration-200 gap-2"
                  style={
                    copied
                      ? {
                          background: "oklch(0.45 0.16 145 / 20%)",
                          borderColor: "oklch(0.72 0.20 145 / 60%)",
                          color: "oklch(0.72 0.20 145)",
                        }
                      : {
                          background: "oklch(0.77 0.18 210 / 15%)",
                          borderColor: "oklch(0.77 0.18 210 / 50%)",
                          color: "oklch(0.85 0.16 195)",
                        }
                  }
                  variant="outline"
                >
                  <motion.div
                    key={copied ? "check" : "copy"}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.div>
                  {copied ? "Copied!" : "Copy IP"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Server Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {serverStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="font-display font-bold text-sm text-foreground">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to connect note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-mono text-xs text-muted-foreground mt-8"
        >
          Open Minecraft → Multiplayer → Add Server → Paste IP → Connect
        </motion.p>
      </div>
    </section>
  );
}
