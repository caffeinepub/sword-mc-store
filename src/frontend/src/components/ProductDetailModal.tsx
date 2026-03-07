import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Minus, Package, Plus, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../hooks/useQueries";

function getCategoryClass(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("diamond")) return "cat-diamond";
  if (cat.includes("netherite")) return "cat-netherite";
  if (cat.includes("iron")) return "cat-iron";
  if (cat.includes("gold") || cat.includes("golden")) return "cat-golden";
  if (cat.includes("enchant")) return "cat-enchanted";
  if (cat.includes("wood") || cat.includes("wooden")) return "cat-wood";
  if (cat.includes("stone")) return "cat-stone";
  return "cat-default";
}

function getCategoryBadgeStyle(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("diamond"))
    return "border-cyan-500/50 text-cyan-300 bg-cyan-900/30";
  if (cat.includes("netherite"))
    return "border-purple-500/50 text-purple-300 bg-purple-900/30";
  if (cat.includes("iron"))
    return "border-slate-400/50 text-slate-300 bg-slate-700/30";
  if (cat.includes("gold") || cat.includes("golden"))
    return "border-yellow-500/50 text-yellow-300 bg-yellow-900/30";
  if (cat.includes("enchant"))
    return "border-violet-500/50 text-violet-300 bg-violet-900/30";
  if (cat.includes("wood") || cat.includes("wooden"))
    return "border-amber-600/50 text-amber-400 bg-amber-900/30";
  if (cat.includes("stone"))
    return "border-gray-500/50 text-gray-300 bg-gray-800/30";
  return "border-border text-muted-foreground";
}

function getCategoryIcon(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("diamond")) return "💎";
  if (cat.includes("netherite")) return "⚫";
  if (cat.includes("iron")) return "⚔️";
  if (cat.includes("gold") || cat.includes("golden")) return "✨";
  if (cat.includes("enchant")) return "🔮";
  if (cat.includes("wood") || cat.includes("wooden")) return "🪵";
  if (cat.includes("stone")) return "🪨";
  return "🗡️";
}

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isAdding: boolean;
}

export function ProductDetailModal({
  product,
  open,
  onClose,
  onAddToCart,
  isAdding,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  const maxQty = product ? Number(product.stock) : 1;
  const isOutOfStock = product ? product.stock <= 0n : false;

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product, quantity);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setQuantity(1);
    }
  };

  if (!product) return null;

  const catClass = getCategoryClass(product.category);
  const badgeStyle = getCategoryBadgeStyle(product.category);
  const catIcon = getCategoryIcon(product.category);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-ocid="product.detail.dialog"
        className="max-w-md bg-card border-border p-0 overflow-hidden gap-0"
      >
        {/* Custom close button */}
        <button
          type="button"
          data-ocid="product.detail.close_button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-md bg-[oklch(1_0_0/8%)] hover:bg-[oklch(1_0_0/15%)] text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Visual header */}
        <div
          className={`${catClass} h-48 flex items-center justify-center relative border-b border-[oklch(1_0_0/10%)]`}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-8xl select-none drop-shadow-2xl"
          >
            {catIcon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <DialogHeader className="gap-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`text-[10px] font-mono uppercase tracking-wider h-5 ${badgeStyle}`}
              >
                {product.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Package className="w-3 h-3" />
                {isOutOfStock ? (
                  <span className="text-destructive">Out of stock</span>
                ) : (
                  <span>{product.stock.toString()} in stock</span>
                )}
              </span>
            </div>
            <DialogTitle className="font-display font-extrabold text-2xl text-foreground leading-tight">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-gold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              / item
            </span>
          </div>

          {/* Quantity selector */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground font-body">
                Quantity:
              </span>
              <div className="flex items-center gap-2 bg-secondary/50 rounded-md border border-border p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 rounded"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-mono font-bold text-sm tabular-nums">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 rounded"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                = ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          )}

          {/* Add to cart */}
          <Button
            data-ocid="product.detail.add_button"
            size="lg"
            disabled={isOutOfStock || isAdding}
            onClick={handleAddToCart}
            className="w-full h-12 font-display font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 diamond-glow transition-all duration-200 rounded-sm disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add {quantity} to Cart
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
