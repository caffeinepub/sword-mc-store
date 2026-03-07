import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onRegisterOpen: () => void;
  onLoginOpen: () => void;
  onProfileOpen: () => void;
}

export function Navbar({
  cartCount,
  onCartOpen,
  onRegisterOpen,
  onLoginOpen,
  onProfileOpen,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.12_0.008_260/95%)] backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo("home")}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/assets/uploads/file_000000008b1c71fab2567310eb084cc5-1-1.png"
                alt="Sword MC Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-xl tracking-tight gradient-text">
                SWORD MC
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                Weapons Shop
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", id: "home", ocid: "nav.home_link" },
              { label: "Shop", id: "shop", ocid: "nav.shop_link" },
              { label: "Ranks", id: "ranks", ocid: "nav.ranks_link" },
              { label: "Coins", id: "coins", ocid: "nav.coins_link" },
              { label: "About", id: "about", ocid: "nav.about_link" },
            ].map(({ label, id, ocid }) => (
              <button
                type="button"
                key={id}
                data-ocid={ocid}
                onClick={() => scrollTo(id)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group font-body"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
            <a
              href="https://discord.gg/kU6qNw6Dk"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.discord_button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-[#5865F2]/15 border border-[#5865F2]/40 text-[#7289DA] hover:bg-[#5865F2]/25 hover:border-[#5865F2]/60 hover:text-[#99AAF5] transition-all duration-200 font-body"
            >
              <DiscordIcon />
              Discord
            </a>
          </nav>

          {/* Right side: Auth + Cart + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Auth buttons — desktop */}
            <div className="hidden md:flex items-center gap-1.5">
              <AnimatePresence mode="wait">
                {isLoggedIn && user ? (
                  <motion.div
                    key="logged-in"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-1.5"
                  >
                    {/* Username chip */}
                    <button
                      type="button"
                      data-ocid="auth.user_button"
                      onClick={onProfileOpen}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all text-xs font-mono font-bold"
                    >
                      <User className="w-3 h-3" />
                      {user.username}
                    </button>
                    {/* Quick logout */}
                    <Button
                      data-ocid="auth.logout_button"
                      variant="ghost"
                      size="icon"
                      onClick={logout}
                      className="w-8 h-8 hover:bg-destructive/15 hover:text-destructive transition-colors text-muted-foreground"
                      aria-label="Log out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="logged-out"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-1.5"
                  >
                    <Button
                      data-ocid="auth.login_button"
                      variant="ghost"
                      size="sm"
                      onClick={onLoginOpen}
                      className="h-8 px-3 text-xs font-body font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                    >
                      Login
                    </Button>
                    <Button
                      data-ocid="auth.register_button"
                      variant="outline"
                      size="sm"
                      onClick={onRegisterOpen}
                      className="h-8 px-3 text-xs font-body font-medium border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-colors"
                    >
                      Register
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart button */}
            <Button
              data-ocid="nav.cart_button"
              variant="ghost"
              size="icon"
              onClick={onCartOpen}
              className="relative hover:bg-accent/20 hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="default"
                      className="w-5 h-5 p-0 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground border-0"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent/20"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-[oklch(0.14_0.010_260/98%)] backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {[
                { label: "Home", id: "home", ocid: "nav.home_link" },
                { label: "Shop", id: "shop", ocid: "nav.shop_link" },
                { label: "Ranks", id: "ranks", ocid: "nav.ranks_link" },
                { label: "Coins", id: "coins", ocid: "nav.coins_link" },
                { label: "About", id: "about", ocid: "nav.about_link" },
              ].map(({ label, id, ocid }) => (
                <button
                  type="button"
                  key={id}
                  data-ocid={ocid}
                  onClick={() => scrollTo(id)}
                  className="w-full text-left px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors font-body"
                >
                  {label}
                </button>
              ))}
              <a
                href="https://discord.gg/kU6qNw6Dk"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.discord_button"
                className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium bg-[#5865F2]/15 border border-[#5865F2]/40 text-[#7289DA] hover:bg-[#5865F2]/25 transition-colors font-body"
              >
                <DiscordIcon />
                Join Discord
              </a>

              {/* Mobile auth section */}
              <div className="pt-2 mt-1 border-t border-border flex flex-col gap-1.5">
                {isLoggedIn && user ? (
                  <>
                    <button
                      type="button"
                      data-ocid="auth.user_button"
                      onClick={() => {
                        setMobileOpen(false);
                        onProfileOpen();
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm font-body font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      {user.username}
                    </button>
                    <button
                      type="button"
                      data-ocid="auth.logout_button"
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm font-body font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      data-ocid="auth.login_button"
                      onClick={() => {
                        setMobileOpen(false);
                        onLoginOpen();
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      data-ocid="auth.register_button"
                      onClick={() => {
                        setMobileOpen(false);
                        onRegisterOpen();
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm font-body font-medium text-primary hover:bg-primary/10 transition-colors"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
