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
  Check,
  Clock,
  Crown,
  Skull,
  Star,
  Swords,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { PendingPayment } from "./PaymentModal";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

const PAYMENTS_KEY = "swordmc_pending_payments";

function getPayments(): PendingPayment[] {
  try {
    return JSON.parse(
      localStorage.getItem(PAYMENTS_KEY) ?? "[]",
    ) as PendingPayment[];
  } catch {
    return [];
  }
}

function savePayments(payments: PendingPayment[]): void {
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

const RANK_ICONS: Record<string, React.ReactNode> = {
  VIP: <Star className="w-3.5 h-3.5" />,
  MVIP: <Crown className="w-3.5 h-3.5" />,
  Sword: <Swords className="w-3.5 h-3.5" />,
  Immortal: <Skull className="w-3.5 h-3.5" />,
};

const RANK_COLORS: Record<string, string> = {
  VIP: "oklch(0.78 0.18 90)",
  MVIP: "oklch(0.72 0.20 55)",
  Sword: "oklch(0.77 0.18 210)",
  Immortal: "oklch(0.72 0.22 25)",
};

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [previewPayment, setPreviewPayment] = useState<PendingPayment | null>(
    null,
  );
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  useEffect(() => {
    if (open) {
      setPayments(getPayments());
    }
  }, [open]);

  const handleApprove = (id: string) => {
    const updated = payments.map((p) =>
      p.id === id ? { ...p, status: "approved" as const } : p,
    );
    savePayments(updated);
    setPayments(updated);

    const payment = payments.find((p) => p.id === id);
    if (payment) {
      toast.success(
        `${payment.username}'s ${payment.rankName} rank approved!`,
        {
          duration: 3000,
        },
      );
    }
  };

  const handleReject = (id: string) => {
    const updated = payments.map((p) =>
      p.id === id ? { ...p, status: "rejected" as const } : p,
    );
    savePayments(updated);
    setPayments(updated);

    const payment = payments.find((p) => p.id === id);
    if (payment) {
      toast.error(
        `${payment.username}'s ${payment.rankName} payment rejected.`,
        {
          duration: 3000,
        },
      );
    }
  };

  const filtered =
    filter === "all" ? payments : payments.filter((p) => p.status === filter);

  const pendingCount = payments.filter((p) => p.status === "pending").length;

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent
          data-ocid="admin.panel.modal"
          className="bg-card border border-border text-foreground max-w-2xl w-full p-0 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Yellow admin accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

          <div className="p-6 flex flex-col gap-4 overflow-hidden min-h-0">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display font-extrabold text-xl text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  Admin Panel
                </DialogTitle>
                <Badge
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 font-mono text-xs"
                >
                  {pendingCount} pending
                </Badge>
              </div>
            </DialogHeader>

            {/* Filter tabs */}
            <div className="flex gap-1 bg-muted/30 rounded-lg p-1">
              {(["pending", "approved", "rejected", "all"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    data-ocid="admin.filter.tab"
                    onClick={() => setFilter(tab)}
                    className={`flex-1 px-2 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                      filter === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {tab === "pending" && pendingCount > 0 && (
                      <span className="ml-1 text-yellow-400">
                        ({pendingCount})
                      </span>
                    )}
                  </button>
                ),
              )}
            </div>

            <Separator className="bg-border" />

            {/* Payment list */}
            <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
              {filtered.length === 0 ? (
                <div
                  data-ocid="admin.payments.empty_state"
                  className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground"
                >
                  <Clock className="w-8 h-8 opacity-40" />
                  <p className="font-body text-sm">No {filter} payments</p>
                </div>
              ) : (
                filtered.map((payment, i) => {
                  const rankColor =
                    RANK_COLORS[payment.rankName] ?? "oklch(0.70 0.03 15)";
                  const rankIcon = RANK_ICONS[payment.rankName] ?? (
                    <Star className="w-3.5 h-3.5" />
                  );

                  return (
                    <div
                      key={payment.id}
                      data-ocid={`admin.payment.item.${i + 1}`}
                      className="rounded-lg border border-border bg-background/50 p-4 flex flex-col gap-3"
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-display font-bold text-sm text-foreground">
                            {payment.username}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {payment.email}
                          </span>
                          <span
                            data-ocid={`admin.payment.ign.${i + 1}`}
                            className="font-mono text-xs text-muted-foreground"
                          >
                            IGN: {payment.ign ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Rank badge */}
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold border"
                            style={{
                              color: rankColor,
                              borderColor: rankColor,
                              background: `${rankColor.replace(")", " / 12%)")}`,
                            }}
                          >
                            {rankIcon}
                            {payment.rankName}
                          </span>
                          {/* Price */}
                          <span className="font-display font-bold text-sm text-[oklch(0.84_0.18_85)]">
                            ₹{payment.rankPrice}
                          </span>
                        </div>
                      </div>

                      {/* Status + time */}
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
                        <span>
                          {new Date(payment.submittedAt).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider border ${
                            payment.status === "pending"
                              ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                              : payment.status === "approved"
                                ? "border-green-500/40 bg-green-500/10 text-green-400"
                                : "border-red-500/40 bg-red-500/10 text-red-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>

                      {/* Screenshot + actions */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          data-ocid={`admin.payment.screenshot.${i + 1}`}
                          onClick={() => setPreviewPayment(payment)}
                          className="flex flex-col items-center gap-1 shrink-0 group"
                          title="View screenshot"
                        >
                          <div className="w-16 h-14 rounded-lg overflow-hidden border border-border/60 hover:border-primary/50 hover:ring-2 hover:ring-primary/20 transition-all">
                            <img
                              src={payment.screenshotDataUrl}
                              alt="Payment screenshot"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-mono text-[9px] text-muted-foreground group-hover:text-primary transition-colors text-center leading-tight">
                            View Screenshot
                          </span>
                        </button>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <p className="font-mono text-[10px] text-muted-foreground truncate">
                            {payment.screenshotName}
                          </p>
                          {payment.status === "pending" && (
                            <div className="flex gap-1.5">
                              <Button
                                data-ocid={`admin.payment.approve_button.${i + 1}`}
                                size="sm"
                                onClick={() => handleApprove(payment.id)}
                                className="h-7 px-3 text-xs font-display font-bold bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 hover:border-green-500 transition-colors"
                                variant="outline"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                data-ocid={`admin.payment.reject_button.${i + 1}`}
                                size="sm"
                                onClick={() => handleReject(payment.id)}
                                className="h-7 px-3 text-xs font-display font-bold bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 hover:border-red-500 transition-colors"
                                variant="outline"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Screenshot Preview Dialog */}
      <Dialog
        open={!!previewPayment}
        onOpenChange={(v) => !v && setPreviewPayment(null)}
      >
        <DialogContent
          data-ocid="admin.screenshot.modal"
          className="bg-card border border-border text-foreground max-w-lg w-full p-4"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-base">
              Payment Screenshot — {previewPayment?.username} (
              {previewPayment?.rankName})
            </DialogTitle>
          </DialogHeader>
          {previewPayment && (
            <img
              src={previewPayment.screenshotDataUrl}
              alt="Payment screenshot full"
              className="w-full rounded-lg border border-border object-contain max-h-[60vh]"
            />
          )}
          <div className="flex gap-2 pt-2">
            {previewPayment?.status === "pending" && (
              <>
                <Button
                  data-ocid="admin.screenshot.approve_button"
                  onClick={() => {
                    if (previewPayment) {
                      handleApprove(previewPayment.id);
                      setPreviewPayment(null);
                    }
                  }}
                  className="flex-1 bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 font-display font-bold"
                  variant="outline"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  data-ocid="admin.screenshot.reject_button"
                  onClick={() => {
                    if (previewPayment) {
                      handleReject(previewPayment.id);
                      setPreviewPayment(null);
                    }
                  }}
                  className="flex-1 bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 font-display font-bold"
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            <Button
              data-ocid="admin.screenshot.close_button"
              variant="outline"
              onClick={() => setPreviewPayment(null)}
              className={
                previewPayment?.status === "pending" ? "w-auto" : "w-full"
              }
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
