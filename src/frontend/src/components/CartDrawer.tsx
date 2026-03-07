import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Loader2,
  Lock,
  Minus,
  Plus,
  ShoppingCart,
  Sword,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartDetails } from "../hooks/useQueries";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartDetails[];
  isLoading: boolean;
  onRemoveItem: (productId: bigint, index: number) => void;
  onUpdateQuantity: (productId: bigint, quantity: number) => void;
  onClearCart: () => void;
  removingIndex: number | null;
  isClearing: boolean;
  isUpdating: boolean;
}

export function CartDrawer({
  open,
  onClose,
  cartItems,
  isLoading,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  removingIndex,
  isClearing,
  isUpdating,
}: CartDrawerProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * Number(item.quantity),
    0,
  );
  const itemCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        data-ocid="cart.sheet"
        side="right"
        className="w-full sm:max-w-md p-0 bg-card border-l border-border flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-border bg-[oklch(0.14_0.010_260)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <SheetTitle className="font-display font-bold text-lg text-foreground">
                Your Cart
              </SheetTitle>
              {itemCount > 0 && (
                <span className="font-mono text-xs bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-[oklch(1_0_0/8%)] hover:bg-[oklch(1_0_0/15%)] text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm font-body">Loading cart...</span>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div
              data-ocid="cart.empty_state"
              className="flex-1 flex flex-col items-center justify-center gap-4 px-8 py-12"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-6xl"
              >
                🛒
              </motion.div>
              <div className="text-center">
                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  Add some legendary weapons to get started!
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="font-display font-medium border-primary/40 text-primary hover:bg-primary/10"
              >
                <Sword className="w-4 h-4 mr-2" />
                Browse Shop
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-5 py-3">
                <div className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item, i) => (
                      <motion.div
                        key={item.product.id.toString()}
                        data-ocid={`cart.item.${i + 1}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-3 p-3 rounded-lg border border-border bg-[oklch(0.18_0.012_260)] transition-opacity ${
                          removingIndex === i ? "opacity-40" : ""
                        }`}
                      >
                        {/* Product icon */}
                        <div className="w-12 h-12 rounded-md flex items-center justify-center text-2xl bg-[oklch(0.22_0.018_260)] border border-border flex-shrink-0">
                          {getCartItemIcon(item.product.category)}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display font-bold text-sm text-foreground leading-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              data-ocid={`cart.remove_button.${i + 1}`}
                              onClick={() => onRemoveItem(item.product.id, i)}
                              disabled={removingIndex === i}
                              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-1.5">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1 bg-secondary/50 rounded border border-border">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.max(1, Number(item.quantity) - 1),
                                  )
                                }
                                disabled={
                                  isUpdating || Number(item.quantity) <= 1
                                }
                                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center font-mono text-xs font-bold tabular-nums">
                                {item.quantity.toString()}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.min(
                                      Number(item.product.stock),
                                      Number(item.quantity) + 1,
                                    ),
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  Number(item.quantity) >=
                                    Number(item.product.stock)
                                }
                                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item total */}
                            <span className="font-display font-bold text-sm text-gold">
                              $
                              {(
                                item.product.price * Number(item.quantity)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="border-t border-border px-5 py-4 bg-[oklch(0.14_0.010_260)] flex flex-col gap-3">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-display font-extrabold text-xl text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Separator className="bg-border" />

                {/* Checkout */}
                <Button
                  data-ocid="cart.checkout_button"
                  size="lg"
                  disabled
                  className="w-full h-11 font-display font-bold tracking-wide bg-primary/40 text-primary-foreground/50 cursor-not-allowed rounded-sm"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Checkout — Coming Soon
                </Button>

                {/* Clear cart */}
                <Button
                  data-ocid="cart.clear_button"
                  variant="ghost"
                  size="sm"
                  onClick={onClearCart}
                  disabled={isClearing}
                  className="w-full h-8 text-xs font-body text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  {isClearing ? (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3 mr-2" />
                  )}
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getCartItemIcon(category: string): string {
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
