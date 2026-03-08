import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  LogOut,
  Pencil,
  Settings,
  Shield,
  Skull,
  Star,
  Sword,
  Swords,
  Upload,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
  const { user, logout, updateProfile } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Edit form state
  const [editUsername, setEditUsername] = useState("");
  const [editIgn, setEditIgn] = useState("");
  const [editAvatarDataUrl, setEditAvatarDataUrl] = useState<string | null>(
    null,
  );
  const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && user?.isAdmin) {
      setPendingCount(getPendingCount());
    }
  }, [open, user?.isAdmin]);

  // Reset edit form when opening modal or toggling edit mode
  useEffect(() => {
    if (user && editMode) {
      setEditUsername(user.username);
      setEditIgn(user.ign || "");
      setEditAvatarDataUrl(user.avatarDataUrl ?? null);
      setEditAvatarFile(null);
    }
  }, [editMode, user]);

  if (!user) return null;

  const roleConfig = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.player;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditAvatarDataUrl(null);
    setEditAvatarFile(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setEditAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditAvatarDataUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setEditAvatarDataUrl(null);
    setEditAvatarFile(null);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  const handleSaveProfile = async () => {
    if (!editUsername.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        username: editUsername.trim(),
        ign: editIgn.trim(),
        avatarDataUrl: editAvatarDataUrl ?? undefined,
      });
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setEditMode(false);
          onClose();
        }
      }}
    >
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
              {/* Avatar — show image if set, else initials */}
              {user.avatarDataUrl ? (
                <img
                  src={user.avatarDataUrl}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border"
                  style={{ borderColor: roleConfig.borderColor }}
                />
              ) : (
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
              )}
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

          {/* ---- EDIT MODE ---- */}
          {editMode ? (
            <div className="flex flex-col gap-4">
              {/* Username */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="profile-username"
                  className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
                >
                  Username
                </Label>
                <Input
                  id="profile-username"
                  data-ocid="profile.username_input"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="h-9 font-body text-sm bg-background/60 border-border focus-visible:ring-primary/40"
                  placeholder="Your username"
                  maxLength={32}
                />
              </div>

              {/* Minecraft IGN */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="profile-ign"
                  className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1"
                >
                  <Sword className="w-3 h-3" />
                  Minecraft IGN
                </Label>
                <Input
                  id="profile-ign"
                  data-ocid="profile.ign_input"
                  value={editIgn}
                  onChange={(e) => setEditIgn(e.target.value)}
                  className="h-9 font-body text-sm bg-background/60 border-border focus-visible:ring-primary/40"
                  placeholder="Your in-game name"
                  maxLength={32}
                />
              </div>

              {/* Avatar upload */}
              <div className="flex flex-col gap-1.5">
                <Label className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Avatar / Logo
                </Label>

                {editAvatarDataUrl ? (
                  <div className="relative rounded-lg border border-green-500/40 bg-green-500/5 p-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border/60 shrink-0">
                      <img
                        src={editAvatarDataUrl}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-foreground/90 truncate">
                        {editAvatarFile?.name ?? "Current avatar"}
                      </p>
                      {editAvatarFile && (
                        <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                          {(editAvatarFile.size / 1024).toFixed(1)} KB
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Remove avatar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    data-ocid="profile.avatar_upload_button"
                    className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/60 bg-muted/20 px-4 py-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-body text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors text-center">
                      Click to upload avatar / logo
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground/60">
                      PNG, JPG, WEBP
                    </p>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>

              {/* Save / Cancel */}
              <div className="flex gap-2 pt-1">
                <Button
                  data-ocid="profile.cancel_button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="flex-1 font-display font-semibold text-sm border-border/70 hover:border-border hover:bg-muted/30 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="profile.save_button"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex-1 font-display font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            </div>
          ) : (
            /* ---- VIEW MODE ---- */
            <>
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
                  Purchased Items
                </span>
                {user.purchasedRanks.length === 0 ? (
                  <p className="font-body text-sm text-muted-foreground italic">
                    No items purchased yet.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {user.purchasedRanks.map((rank) => {
                      const cfg = RANK_DISPLAY_CONFIG[rank] ?? {
                        color: "oklch(0.70 0.03 15)",
                        icon: <Star className="w-3.5 h-3.5" />,
                      };
                      const count = user.purchaseCounts?.[rank] ?? 1;
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
                          {count > 1 && (
                            <span className="ml-0.5 opacity-70">x{count}</span>
                          )}
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

              {/* Edit Profile button */}
              <Button
                data-ocid="profile.edit_profile_button"
                variant="outline"
                onClick={() => setEditMode(true)}
                className="w-full font-display font-bold tracking-wide border-border/70 text-foreground/80 hover:bg-muted/30 hover:border-border hover:text-foreground transition-all mb-2"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>

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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
