import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, RefreshCw, Sword } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";

interface ShopSectionProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  addingProductId: bigint | null;
}

export function ShopSection({
  products,
  isLoading,
  isError,
  onRefetch,
  onAddToCart,
  onViewDetails,
  addingProductId,
}: ShopSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="shop" className="py-20 relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.14_0.010_260/30%)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 pixel-texture opacity-10 pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest px-2">
              Arsenal
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
          </div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-4xl sm:text-5xl gradient-text mb-3"
          >
            The Shop
          </motion.h2>
          <p className="text-muted-foreground font-body text-base max-w-xl mx-auto">
            Browse our full collection of legendary Minecraft weapons. From
            humble wooden sticks to god-tier netherite blades.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div data-ocid="shop.loading_state">
            {/* Filter skeleton */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                <Skeleton
                  key={k}
                  className="h-8 w-20 rounded-md bg-secondary/50"
                />
              ))}
            </div>
            {/* Grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"].map((k) => (
                <div
                  key={k}
                  className="rounded-lg overflow-hidden border border-border"
                >
                  <Skeleton className="h-36 w-full bg-secondary/50" />
                  <div className="p-4 space-y-2.5 bg-card">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-16 bg-secondary/50" />
                      <Skeleton className="h-4 w-10 bg-secondary/50" />
                    </div>
                    <Skeleton className="h-5 w-full bg-secondary/50" />
                    <Skeleton className="h-8 w-full bg-secondary/50" />
                    <div className="flex justify-between pt-1">
                      <Skeleton className="h-6 w-14 bg-secondary/50" />
                      <Skeleton className="h-8 w-16 bg-secondary/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <motion.div
            data-ocid="shop.error_state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-5 py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Failed to load products
              </h3>
              <p className="text-muted-foreground font-body text-sm max-w-sm mx-auto">
                Something went wrong while fetching the shop inventory. Please
                try again.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={onRefetch}
              className="border-primary/40 text-primary hover:bg-primary/10 font-display font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Products */}
        {!isLoading && !isError && (
          <>
            {/* Category filters */}
            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 justify-center mb-8"
              >
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    data-ocid="shop.product.tab"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-1.5 rounded-md text-sm font-body font-medium transition-all duration-200 border ${
                      activeFilter === cat
                        ? "bg-primary/20 border-primary/60 text-primary"
                        : "bg-secondary/30 border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-secondary/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Empty filtered state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="text-5xl">🗡️</div>
                <div className="text-center">
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    No weapons found
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    No products in this category yet.
                  </p>
                </div>
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i + 1}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                    isAddingToCart={addingProductId === product.id}
                  />
                ))}
              </div>
            )}

            {/* Product count */}
            {products.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-10"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {filtered.length} weapon{filtered.length !== 1 ? "s" : ""}{" "}
                  available
                  {activeFilter !== "All" && ` in ${activeFilter}`}
                </span>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
