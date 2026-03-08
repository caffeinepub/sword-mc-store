import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
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
  return "border-border text-muted-foreground bg-secondary/30";
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

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isAddingToCart: boolean;
}

export function ProductCard({
  product,
  index,
  onAddToCart,
  onViewDetails,
  isAddingToCart,
}: ProductCardProps) {
  const catClass = getCategoryClass(product.category);
  const badgeStyle = getCategoryBadgeStyle(product.category);
  const catIcon = getCategoryIcon(product.category);
  const isOutOfStock = product.stock <= 0n;

  return (
    <motion.div
      data-ocid={`shop.product.item.${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.07 }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.15 } }}
      className="group relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-card-hover mc-corner"
      style={{ borderColor: "oklch(var(--border))" }}
      onClick={() => onViewDetails(product)}
    >
      {/* Product visual area */}
      <div
        className={`${catClass} h-36 flex items-center justify-center relative border-b border-[oklch(1_0_0/8%)]`}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: (index - 1) * 0.2,
          }}
          className="text-5xl select-none drop-shadow-lg"
        >
          {catIcon}
        </motion.div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-destructive-foreground bg-destructive/80 px-2 py-0.5 rounded uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}

        {/* Stock indicator */}
        {!isOutOfStock && product.stock <= 5n && (
          <div className="absolute top-2 right-2">
            <span className="font-mono text-[10px] font-bold text-yellow-300 bg-yellow-900/60 border border-yellow-600/40 px-1.5 py-0.5 rounded uppercase tracking-wider">
              Low Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-card flex flex-col gap-2">
        {/* Category badge */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0 h-5 ${badgeStyle}`}
          >
            {product.category}
          </Badge>
          {!isOutOfStock && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Package className="w-3 h-3" />
              {product.stock.toString()}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-1 pt-2 border-t border-border">
          <span className="font-display font-extrabold text-lg text-gold">
            ${product.price.toFixed(2)}
          </span>
          <Button
            data-ocid="product.add_button"
            size="sm"
            variant="default"
            disabled={isOutOfStock || isAddingToCart}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="h-8 px-3 text-xs font-bold font-display bg-primary/90 hover:bg-primary text-primary-foreground rounded-sm transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40"
          >
            {isAddingToCart ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
