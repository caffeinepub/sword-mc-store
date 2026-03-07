import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  LogOut,
  Settings,
  Shield,
  Skull,
  Star,
  Sword,
  Swords,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const PAYMENTS_KEY = "swordmc_pending_payments";

function getPendingCount(): number {
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    if (!raw) return 0;
    const payments = JSON.parse(raw) as { status: string }[];
    return payments.filter((p) => p.status === "pending").length;
  } catch {
    return 0;
  }
}

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onAdminPanel?: () => void;
}

const ROLE_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ReactNode;
  }
> = {
  player: {
    label: "Player",
    color: "oklch(0.70 0.03 15)",
    bgColor: "oklch(0.20 0.04 15 / 40%)",
    borderColor: "oklch(0.35 0.04 15)",
    icon: <User className="w-3.5 h-3.5" />,
  },
  vip: {
    label: "VIP",
    color: "oklch(0.78 0.18 90)",
    bgColor: "oklch(0.78 0.18 90 / 15%)",
    borderColor: "oklch(0.78 0.18 90 / 50%)",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  mvip: {
    label: "MVIP",
    color: "oklch(0.72 0.20 55)",
    bgColor: "oklch(0.72 0.20 55 / 15%)",
    borderColor: "oklch(0.72 0.20 55 / 50%)",
    icon: <Crown className="w-3.5 h-3.5" />,
  },
  sword: {
    label: "Sword",
    color: "oklch(0.77 0.18 210)",
    bgColor: "oklch(0.77 0.18 210 / 15%)",
    borderColor: "oklch(0.77 0.18 210 / 50%)",
    icon: <Swords className="w-3.5 h-3.5" />,
  },
  immortal: {
    label: "Immortal",
    color: "oklch(0.72 0.22 25)",
    bgColor: "oklch(0.56 0.22 25 / 20%)",
    borderColor: "oklch(0.56 0.22 25 / 60%)",
    icon: <Skull className="w-3.5 h-3.5" />,
  },
};

const RANK_DISPLAY_CONFIG: Record<
  string,
  { color: string; icon: React.ReactNode }
> = {
  VIP: {
    color: "oklch(0.78 0.18 90)",
    icon: <Star className="w-3.5 h-3.5" />,
  },
  MVIP: {
    color: "oklch(0.72 0.20 55)",
    icon: <Crown className="w-3.5 h-3.5" />,
  },
  Sword: {
    color: "oklch(0.77 0.18 210)",
    icon: <Swords className="w-3.5 h-3.5" />,
  },
  Immortal: {
    color: "oklch(0.72 0.22 25)",
    icon: <Skull className="w-3.5 h-3.5" />,
  },
};

export function ProfileModal({
  open,
  onClose,
  onAdminPanel,
}: ProfileModalProps) {
  const { user, logout } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (open && user?.isAdmin) {
      setPendingCount(getPendingCount());
    }
  }, [open, user?.isAdmin]);

  if (!user) return null;

  const roleConfig = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.player;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="profile.modal"
        className="bg-card border border-border text-foreground max-w-sm w-full p-0 overflow-hidden"
      >
        {/* Header accent gradient using user's role color */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${roleConfig.color}, transparent)`,
          }}
        />

        <div className="p-6">
          <DialogHeader className="mb-5">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold font-display border"
                style={{
                  background: roleConfig.bgColor,
                  borderColor: roleConfig.borderColor,
                  color: roleConfig.color,
                }}
              >
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <DialogTitle className="font-display font-extrabold text-xl text-foreground leading-none mb-1">
                  {user.username}
                </DialogTitle>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Role badge */}
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold border"
                    style={{
                      color: roleConfig.color,
                      background: roleConfig.bgColor,
                      borderColor: roleConfig.borderColor,
                    }}
                  >
                    {roleConfig.icon}
                    {roleConfig.label}
                  </span>
                  {/* Admin badge */}
                  {user.isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold border border-yellow-500/60 bg-yellow-500/10 text-yellow-400">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Info rows */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Email
              </span>
              <span className="font-body text-sm text-foreground/90 truncate">
                {user.email}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Sword className="w-3 h-3" />
                Minecraft IGN
              </span>
              <span className="font-body text-sm text-foreground/90">
                {user.ign || "—"}
              </span>
            </div>
          </div>

          <Separator className="bg-border mb-4" />

          {/* Purchased ranks */}
          <div className="mb-5">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
              Purchased Ranks
            </span>
            {user.purchasedRanks.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground italic">
                No ranks purchased yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {user.purchasedRanks.map((rank) => {
                  const cfg = RANK_DISPLAY_CONFIG[rank] ?? {
                    color: "oklch(0.70 0.03 15)",
                    icon: <Star className="w-3.5 h-3.5" />,
                  };
                  return (
                    <Badge
                      key={rank}
                      variant="outline"
                      className="flex items-center gap-1 px-2 py-0.5 font-mono text-xs border"
                      style={{
                        color: cfg.color,
                        borderColor: cfg.color,
                        background: `${cfg.color.replace(")", " / 12%)")}`,
                      }}
                    >
                      {cfg.icon}
                      {rank}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Admin Panel button */}
          {user.isAdmin && onAdminPanel && (
            <Button
              data-ocid="profile.admin_panel_button"
              variant="outline"
              onClick={() => {
                onClose();
                onAdminPanel();
              }}
              className="w-full font-display font-bold tracking-wide border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500 transition-all mb-2 relative"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin Panel
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold font-mono flex items-center justify-center border-2 border-card">
                  {pendingCount > 99 ? "99+" : pendingCount}
                </span>
              )}
            </Button>
          )}

          {/* Logout */}
          <Button
            data-ocid="profile.logout_button"
            variant="outline"
            onClick={handleLogout}
            className="w-full font-display font-bold tracking-wide border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
