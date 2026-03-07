import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy, ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface PaymentModalProps {
  rank: { id: number; name: string; price: number } | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (rankName: string) => void;
}

const UPI_ID = "6206470120@fam";

export function PaymentModal({
  rank,
  open,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const qrUrl = rank
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3D6206470120%40fam%26pn%3DSwordMC%26am%3D${rank.price}%26cu%3DINR`
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy UPI ID");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setScreenshotFile(file);
      const url = URL.createObjectURL(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setScreenshotFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!rank || !screenshotFile) return;
    onConfirm(rank.name);
    // Cleanup
    handleRemoveFile();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleRemoveFile();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-ocid="payment.dialog"
        className="max-w-md w-full bg-card border-border text-foreground p-0 overflow-hidden"
      >
        {/* Crimson top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="p-6 flex flex-col gap-5">
          <DialogHeader className="gap-1">
            <DialogTitle className="font-display font-extrabold text-xl text-foreground tracking-wide">
              Complete Payment
            </DialogTitle>
            {rank && (
              <DialogDescription className="font-body text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {rank.name} Rank
                </span>
                {" — "}
                <span className="font-display font-bold text-[oklch(0.84_0.18_85)]">
                  ₹{rank.price}
                </span>
              </DialogDescription>
            )}
          </DialogHeader>

          {/* UPI ID section */}
          <div className="rounded-lg border border-border bg-background/60 p-4 flex flex-col gap-3">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Pay via UPI
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-md bg-muted/50 border border-border/70 px-3 py-2 font-mono text-sm text-foreground tracking-wide select-all">
                {UPI_ID}
              </div>
              <Button
                data-ocid="payment.copy_button"
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0 font-mono text-xs border-border hover:border-primary/60 hover:text-primary transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          {rank && (
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-xl border border-border/60 bg-white p-3 shadow-sm">
                <img
                  src={qrUrl}
                  alt={`UPI QR code for ₹${rank.price}`}
                  width={160}
                  height={160}
                  className="block rounded"
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground text-center">
                Scan to pay via UPI
              </p>
            </div>
          )}

          {/* Screenshot Upload */}
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-body text-sm font-semibold text-foreground">
                Upload Payment Screenshot
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Attach your payment confirmation screenshot for verification
              </p>
            </div>

            {/* Show file preview once selected */}
            {screenshotFile && previewUrl ? (
              <div className="relative rounded-lg border border-green-500/40 bg-green-500/5 p-3 flex items-center gap-3">
                <div className="w-14 h-14 rounded-md overflow-hidden border border-border/60 shrink-0">
                  <img
                    src={previewUrl}
                    alt="Screenshot preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-foreground/90 truncate">
                    {screenshotFile.name}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                    {(screenshotFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Remove screenshot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Dropzone-style upload area */
              <label
                data-ocid="payment.upload_button"
                className="group flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/60 bg-muted/20 px-4 py-6 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-body text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    Click to upload screenshot
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">
                    PNG, JPG, JPEG, WEBP
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            )}

            {!screenshotFile && (
              <div className="flex items-center gap-1.5 text-muted-foreground/70">
                <ImageIcon className="w-3 h-3 shrink-0" />
                <span className="font-mono text-[10px]">
                  Screenshot required to submit payment
                </span>
              </div>
            )}
          </div>

          <DialogFooter className="flex-row gap-2 pt-1">
            <Button
              data-ocid="payment.cancel_button"
              variant="outline"
              onClick={onClose}
              className="flex-1 font-display font-semibold text-sm border-border/70 hover:border-border hover:bg-muted/30 transition-colors"
            >
              Cancel
            </Button>
            <Button
              data-ocid="payment.submit_button"
              onClick={handleSubmit}
              disabled={!screenshotFile}
              className="flex-1 font-display font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Payment
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
