import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product, CartItem, ToastItem, FilterState, CheckoutFormData, OrderConfirmation } from './types';
import { products } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromoBanners } from './components/PromoBanners';
import { BestSellersSection } from './components/BestSellersSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { InventoryCatalog } from './components/InventoryCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FilterDrawer } from './components/FilterDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Array<{ id: string; color: string; qty: number }>>(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nova_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Popular');
  const [isInventoryCatalogOpen, setIsInventoryCatalogOpen] = useState(true);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    price: [0, 3500],
    rating: 0,
    inStock: false,
    onSale: false,
    isNew: false,
    colors: [],
  });

  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormData>({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    shipping: 'Standard',
    card: '',
    expiry: '',
    cvc: '',
  });

  // Persist cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('nova_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const isVariantInCart = useCallback(
    (productId: string, colorName: string) =>
      cart.some(
        (item) => item.id === productId && item.color === colorName && item.qty > 0
      ),
    [cart]
  );

  // Keyboard shortcut Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast Notification Trigger
  const showToast = (msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      showToast(isSaved ? 'Removed from wishlist' : 'Saved to wishlist');
      return isSaved ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  // Add To Cart
  const handleAddToCart = (product: Product, colorIndex = 0, qty = 1) => {
    const colorName = product.colors[colorIndex]?.name || product.colors[0]?.name;
    if (!colorName || isVariantInCart(product.id, colorName)) return;

    setCart((prev) => {
      // A selected color variant can only be added once. Quantity changes happen in the cart drawer.
      if (
        prev.some(
          (item) => item.id === product.id && item.color === colorName && item.qty > 0
        )
      ) {
        return prev;
      }
      return [...prev, { id: product.id, color: colorName, qty }];
    });
    showToast(`${product.name} added to cart`);
    // setIsCartOpen(true); Removed so it updates silently in the background
  };

  // Direct Buy Now
  const handleBuyNow = (product: Product, colorIndex: number, qty: number) => {
    handleAddToCart(product, colorIndex, qty);
    setIsCartOpen(false);
    setCheckoutStep(1);
    setIsCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQty = (productId: string, color: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.color === color
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId: string, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.color === color)));
    showToast('Item removed from cart');
  };

  // Toggle a product variant in the cart from a product card or detail button.
  const handleToggleCart = (product: Product, colorIndex = 0, qty = 1) => {
    const colorName = product.colors[colorIndex]?.name || product.colors[0]?.name;
    if (!colorName) return;

    if (isVariantInCart(product.id, colorName)) {
      setCart((prev) =>
        prev.filter((item) => !(item.id === product.id && item.color === colorName))
      );
      showToast(`${product.name} removed from cart`);
      return;
    }

    handleAddToCart(product, colorIndex, qty);
  };

  // Clear single filter
  const handleClearFilter = (key: keyof FilterState, value?: any) => {
    setFilters((prev) => {
      if (key === 'categories' || key === 'brands' || key === 'colors') {
        return {
          ...prev,
          [key]: (prev[key] as string[]).filter((v) => v !== value),
        };
      }
      if (key === 'rating') return { ...prev, rating: 0 };
      if (key === 'price') return { ...prev, price: [0, 3500] };
      return { ...prev, [key]: false };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      price: [0, 3500],
      rating: 0,
      inStock: false,
      onSale: false,
      isNew: false,
      colors: [],
    });
    setSearchQuery('');
  };

  // Denormalized Cart items with Product objects
  const cartItemsWithProducts: CartItem[] = useMemo(() => {
    return cart
      .map((item) => {
        const prod = products.find((p) => p.id === item.id);
        if (!prod) return null;
        return {
          id: item.id,
          color: item.color,
          qty: item.qty,
          product: prod,
        };
      })
      .filter(Boolean) as CartItem[];
  }, [cart]);

  // Cart financial calculations
  const cartTotal = useMemo(
    () => cartItemsWithProducts.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cartItemsWithProducts]
  );
  const shippingCost = cartTotal > 299 || cartTotal === 0 ? 0 : 19;
  const totalCartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  // Available brands and categories for Filter Drawer
  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    []
  );
  const allCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    []
  );

  // Filtered & Sorted Catalog
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.superCategory.toLowerCase().includes(q)
      );
    }

    // Category Buttons
    if (activeCategory !== 'All') {
      if (activeCategory === 'Audio') {
        result = result.filter((p) => ['Speakers', 'Earphones', 'Headphones'].includes(p.category));
      } else if (activeCategory === 'Wearables') {
        result = result.filter((p) => ['Smartwatches', 'Glasses'].includes(p.category));
      } else if (activeCategory === 'Computing') {
        result = result.filter((p) => ['All-In-One', 'Consoles'].includes(p.category));
      } else {
        result = result.filter((p) => p.superCategory === activeCategory || p.category === activeCategory);
      }
    }

    // Drawer Filters
    if (filters.categories.length) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    result = result.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }
    if (filters.inStock) {
      result = result.filter((p) => p.inStock);
    }
    if (filters.onSale) {
      result = result.filter((p) => !!p.originalPrice);
    }
    if (filters.isNew) {
      result = result.filter((p) => p.isNew);
    }
    if (filters.colors.length) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }

    // Sorting
    if (activeSort === 'Price Low-High') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'Price High-Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'Newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (activeSort === 'Popular') {
      result.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [searchQuery, activeCategory, filters, activeSort]);

  const bestSellerProducts = useMemo(() => products.filter((p) => p.isBestSeller), []);
  const newArrivalProducts = useMemo(() => products.filter((p) => p.isNew).slice(0, 8), []);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.rating ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.price[0] > 0 || filters.price[1] < 3500 ? 1 : 0);

  // If a product is clicked, render the detailed modal view
  if (selectedProduct) {
    const related = products
      .filter((p) => p.superCategory === selectedProduct.superCategory && p.id !== selectedProduct.id)
      .slice(0, 4);

    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#111] antialiased selection:bg-[#6C5CFF] selection:text-white">
        <ProductDetailModal
          product={selectedProduct}
          relatedProducts={related}
          wishlist={wishlist}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          isVariantInCart={isVariantInCart}
          onBack={() => {
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleToggleCart}
          onBuyNow={handleBuyNow}
          onSelectRelated={(p) => setSelectedProduct(p)}
        />

        {/* Global Drawers & Modals */}
        <AnimatePresence>
          {isCartOpen && (
            <CartDrawer
              cartItems={cartItemsWithProducts}
              cartTotal={cartTotal}
              shipping={shippingCost}
              onClose={() => setIsCartOpen(false)}
              onUpdateQty={handleUpdateCartQty}
              onRemove={handleRemoveFromCart}
              onCheckout={() => {
                setIsCartOpen(false);
                setCheckoutStep(1);
                setIsCheckoutOpen(true);
              }}
            />
          )}
        </AnimatePresence>

        {isCheckoutOpen && (
          <CheckoutModal
            step={checkoutStep}
            setStep={setCheckoutStep}
            form={checkoutForm}
            setForm={setCheckoutForm}
            cartTotal={cartTotal}
            shipping={shippingCost}
            onClose={() => setIsCheckoutOpen(false)}
            onConfirmSuccess={(order: OrderConfirmation) => {
              setCart([]);
              showToast(`Order #${order.orderRef} confirmed via Stripe`);
            }}
            cartItems={cartItemsWithProducts}
          />
        )}

        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111] antialiased selection:bg-[#6C5CFF] selection:text-white overflow-x-hidden">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchInputRef={searchInputRef}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        isCategoriesOpen={isCategoriesOpen}
        onToggleCategories={() => setIsCategoriesOpen((prev) => !prev)}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setIsInventoryCatalogOpen(true);
        }}
        onSelectSort={setActiveSort}
        onToast={showToast}
        onResetToHome={() => {
          setSelectedProduct(null);
          setActiveCategory('All');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Hero Section with 3D Showcase & Marquee */}
      <HeroSection
        onExploreInventory={() => {
          setIsInventoryCatalogOpen(true);
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreSale={() => {
          setActiveCategory('Audio');
          setIsInventoryCatalogOpen(true);
          showToast('Sale collection — up to 40% off audio');
          document.getElementById('promos')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickAdd={(p) => handleAddToCart(p, 0, 1)}
      />

      {/* 3. Editorial Promo Banners (Audio Week & Glasses Gen 2) */}
      <PromoBanners
        onExploreAudio={() => {
          setActiveCategory('Audio');
          setIsInventoryCatalogOpen(true);
          showToast('Audio lab opened — up to 40% off');
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreWearables={() => {
          setActiveCategory('Wearables');
          setIsInventoryCatalogOpen(true);
          showToast('Wearables collection opened');
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Best Sellers Horizontal Snap Section */}
      <BestSellersSection
        products={bestSellerProducts}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleToggleCart}
        isVariantInCart={isVariantInCart}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. New Arrivals Bento Grid */}
      <NewArrivalsSection
        products={newArrivalProducts}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleToggleCart}
        isVariantInCart={isVariantInCart}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewAll={() => {
          setActiveCategory('All');
          setActiveSort('Newest');
          setIsInventoryCatalogOpen(true);
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Inventory Explorer / Catalog */}
      <InventoryCatalog
        products={filteredProducts}
        wishlist={wishlist}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        activeSort={activeSort}
        onSelectSort={setActiveSort}
        filters={filters}
        onClearFilter={handleClearFilter}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
        isOpen={isInventoryCatalogOpen}
        onToggleOpen={() => setIsInventoryCatalogOpen((prev) => !prev)}
        onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleToggleCart}
        isVariantInCart={isVariantInCart}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. Footer */}
      <Footer onToast={showToast} />

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <FilterDrawer
          filters={filters}
          setFilters={setFilters}
          brands={allBrands}
          categories={allCategories}
          onClose={() => setIsFilterDrawerOpen(false)}
        />
      )}

      {/* Cart Drawer with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            cartItems={cartItemsWithProducts}
            cartTotal={cartTotal}
            shipping={shippingCost}
            onClose={() => setIsCartOpen(false)}
            onUpdateQty={handleUpdateCartQty}
            onRemove={handleRemoveFromCart}
            onCheckout={() => {
              setIsCartOpen(false);
              setCheckoutStep(1);
              setIsCheckoutOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Checkout Modal with Integrated Stripe Payment Processing */}
      {isCheckoutOpen && (
        <CheckoutModal
          step={checkoutStep}
          setStep={setCheckoutStep}
          form={checkoutForm}
          setForm={setCheckoutForm}
          cartTotal={cartTotal}
          shipping={shippingCost}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirmSuccess={(order: OrderConfirmation) => {
            setCart([]);
            showToast(`Order #${order.orderRef} confirmed via Stripe`);
          }}
          cartItems={cartItemsWithProducts}
        />
      )}

      {/* Floating Status Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}