import { Mail, MessageSquare, Shield, Sparkles, Sword } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Sword,
    title: "All Materials",
    description:
      "From wooden swords for beginners to legendary netherite blades for the endgame warrior — we stock every tier.",
  },
  {
    icon: Sparkles,
    title: "Enchanted Gear",
    description:
      "Sharpness V, Looting III, Smite V — our enchanted collection gives you the edge in any biome.",
  },
  {
    icon: Shield,
    title: "Trusted Quality",
    description:
      "Every item is tested and verified. No knockoffs, no repackaged gear — only authentic Minecraft-grade weapons.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.010_260/50%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      {/* Decorative sword */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none select-none text-[240px] flex items-center justify-center overflow-hidden">
        ⚔️
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest px-2">
              Our Story
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl gradient-text mb-4">
            About Sword MC
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-2xl mx-auto leading-relaxed">
            Founded by adventurers, for adventurers. Sword MC is the premier
            destination for Minecraft weapons enthusiasts who refuse to settle
            for sub-par gear. Whether you're clearing the Nether or defending
            your base from creepers — we've got the blade for you.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-lg border border-border bg-card mc-corner group hover:border-primary/50 transition-all duration-300"
              style={{
                transition:
                  "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px oklch(0.78 0.14 195 / 35%), 0 0 45px oklch(0.78 0.14 195 / 15%), inset 0 0 20px oklch(0.78 0.14 195 / 5%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <motion.div
                whileHover={{
                  rotate: 12,
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-border bg-[oklch(0.16_0.012_260)] p-8 flex flex-col md:flex-row items-center gap-6 justify-between"
        >
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-xl text-foreground mb-1">
              Questions? We're here.
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              Our support team is always online. Reach out anytime.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:support@swordmc.store"
              className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-secondary/40 hover:bg-secondary/70 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-primary" />
              support@swordmc.store
            </a>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-primary/30 bg-primary/10 hover:bg-primary/20 text-sm font-body font-medium text-primary transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Discord Server
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
