import { Heart, Sword } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-[oklch(0.10_0.008_260)] py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/assets/generated/sword-mc-logo-transparent.dim_120x120.png"
                alt="Sword MC"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-extrabold text-lg gradient-text">
                SWORD MC
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-xs">
              The ultimate Minecraft weapons shop. Every blade, every material,
              every enchantment — all in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              {[
                { label: "Home", id: "home" },
                { label: "Shop", id: "shop" },
                { label: "About", id: "about" },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3 uppercase tracking-wider">
              Info
            </h4>
            <ul className="space-y-1.5">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Refund Policy",
                "FAQ",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Sword className="w-3.5 h-3.5 text-primary" />
            <span>© {year} Sword MC. All rights reserved.</span>
          </div>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            Built with{" "}
            <Heart className="w-3 h-3 text-destructive fill-destructive mx-0.5 animate-pulse-glow" />{" "}
            using
            <span className="text-primary font-medium ml-1">caffeine.ai</span>
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
