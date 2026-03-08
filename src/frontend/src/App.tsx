import { Toaster } from "@/components/ui/sonner";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { AboutSection } from "./components/AboutSection";
import { AdminPanel } from "./components/AdminPanel";
import { CartDrawer } from "./components/CartDrawer";
import { CoinsSection } from "./components/CoinsSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { LoginModal } from "./components/LoginModal";
import { Navbar } from "./components/Navbar";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ProfileModal } from "./components/ProfileModal";
import { RanksSection } from "./components/RanksSection";
import { RegisterModal } from "./components/RegisterModal";
import { ShopSection } from "./components/ShopSection";
import { AuthProvider } from "./contexts/AuthContext";
import {
  type Product,
  useAddToCart,
  useClearCart,
  useGetAllProducts,
  useGetCartItems,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "./hooks/useQueries";

// Generate a stable session ID once per app load
const SESSION_ID = crypto.randomUUID();

function AppContent() {
  const sessionId = useRef(SESSION_ID).current;

  // UI state
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [addingProductId, setAddingProductId] = useState<bigint | null>(null);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  // Auth modal state
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Data fetching
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useGetAllProducts();

  const { data: cartItems = [], isLoading: cartLoading } =
    useGetCartItems(sessionId);

  // Mutations
  const addToCartMutation = useAddToCart(sessionId);
  const removeFromCartMutation = useRemoveFromCart(sessionId);
  const updateQuantityMutation = useUpdateCartQuantity(sessionId);
  const clearCartMutation = useClearCart(sessionId);

  // Cart count (total items across all products)
  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  // Handlers
  const handleShopNow = useCallback(() => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  }, []);

  const handleAddToCartFromCard = useCallback(
    async (product: Product) => {
      setAddingProductId(product.id);
      try {
        await addToCartMutation.mutateAsync({
          productId: product.id,
          quantity: 1n,
        });
        toast.success(`${product.name} added to cart!`, {
          description: "Item added to your cart.",
          duration: 2500,
        });
      } catch {
        toast.error("Failed to add to cart", {
          description: "Please try again.",
        });
      } finally {
        setAddingProductId(null);
      }
    },
    [addToCartMutation],
  );

  const handleAddToCartFromModal = useCallback(
    async (product: Product, quantity: number) => {
      try {
        await addToCartMutation.mutateAsync({
          productId: product.id,
          quantity: BigInt(quantity),
        });
        toast.success(`${product.name} added to cart!`, {
          description: `${quantity} × ${product.name}`,
          duration: 2500,
        });
        setProductModalOpen(false);
        setSelectedProduct(null);
      } catch {
        toast.error("Failed to add to cart", {
          description: "Please try again.",
        });
      }
    },
    [addToCartMutation],
  );

  const handleRemoveItem = useCallback(
    async (productId: bigint, index: number) => {
      setRemovingIndex(index);
      try {
        await removeFromCartMutation.mutateAsync(productId);
        toast.success("Item removed from cart");
      } catch {
        toast.error("Failed to remove item");
      } finally {
        setRemovingIndex(null);
      }
    },
    [removeFromCartMutation],
  );

  const handleUpdateQuantity = useCallback(
    async (productId: bigint, quantity: number) => {
      try {
        await updateQuantityMutation.mutateAsync({
          productId,
          quantity: BigInt(quantity),
        });
      } catch {
        toast.error("Failed to update quantity");
      }
    },
    [updateQuantityMutation],
  );

  const handleClearCart = useCallback(async () => {
    try {
      await clearCartMutation.mutateAsync();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  }, [clearCartMutation]);

  // Switch between login/register modals
  const handleGoToLogin = useCallback(() => {
    setRegisterOpen(false);
    setLoginOpen(true);
  }, []);

  const handleGoToRegister = useCallback(() => {
    setLoginOpen(false);
    setRegisterOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border text-foreground font-body",
            title: "font-display font-bold text-sm",
            description: "font-body text-xs text-muted-foreground",
          },
        }}
      />

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onRegisterOpen={() => setRegisterOpen(true)}
        onLoginOpen={() => setLoginOpen(true)}
        onProfileOpen={() => setProfileOpen(true)}
      />

      {/* Main content */}
      <main>
        {/* Hero */}
        <HeroSection onShopNow={handleShopNow} />

        {/* Shop */}
        <ShopSection
          products={products}
          isLoading={productsLoading}
          isError={productsError}
          onRefetch={refetchProducts}
          onAddToCart={handleAddToCartFromCard}
          onViewDetails={handleViewDetails}
          addingProductId={addingProductId}
        />

        {/* Ranks */}
        <RanksSection />

        {/* Coins */}
        <CoinsSection />

        {/* About */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={productModalOpen}
        onClose={() => {
          setProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCartFromModal}
        isAdding={addToCartMutation.isPending}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        isLoading={cartLoading}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        removingIndex={removingIndex}
        isClearing={clearCartMutation.isPending}
        isUpdating={updateQuantityMutation.isPending}
      />

      {/* Auth Modals */}
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onGoToLogin={handleGoToLogin}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onGoToRegister={handleGoToRegister}
      />
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onAdminPanel={() => setAdminPanelOpen(true)}
      />
      <AdminPanel
        open={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
    </div>
  );
}

function AppWithLoading() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onFinish={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <AppContent />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithLoading />
    </AuthProvider>
  );
}
