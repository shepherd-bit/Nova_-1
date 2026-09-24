import React from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  wishlistCount: number;
  cartCount: number;
  isCategoriesOpen: boolean;
  onToggleCategories: () => void;
  onOpenCart: () => void;
  onSelectCategory: (cat: string) => void;
  onSelectSort: (sort: string) => void;
  onToast: (msg: string) => void;
  onResetToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  searchInputRef,
  wishlistCount,
  cartCount,
  onToggleCategories,
  onOpenCart,
  onSelectCategory,
  onSelectSort,
  onToast,
  onResetToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#FAF9F6]/75 border-b border-black/[0.06]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-[72px] flex items-center justify-between gap-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={onResetToHome}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[14px] shadow-sm group-hover:scale-105 transition">
              N
            </div>
            <span className="text-[22px] font-[800] tracking-[-0.02em] text-[#111]">
              NOVA•
            </span>
            <span className="hidden md:inline text-[10px] tracking-[0.2em] font-bold bg-[#111] text-white px-2 py-1 rounded-full">
              EST 2025
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={onToggleCategories}
                className="h-10 px-4 rounded-full bg-white border border-black/10 flex items-center gap-2 text-[13px] font-medium hover:bg-black/5 transition"
              >
                Categories <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
            </div>
            <nav className="flex items-center gap-1 text-[13px] font-medium ml-2">
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onSelectSort('Newest');
                  onToast('New arrivals opened');
                  setTimeout(() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="px-3 py-2 rounded-full hover:bg-black/5 transition cursor-pointer"
              >
                New
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All');
                  onSelectSort('Popular');
                  onToast('Best sellers opened');
                  setTimeout(() => {
                    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="px-3 py-2 rounded-full hover:bg-black/5 transition cursor-pointer"
              >
                Best Sellers
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('Audio');
                  onToast('Sale Week — up to 40% off');
                  setTimeout(() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="px-3 py-2 rounded-full hover:bg-black/5 transition cursor-pointer"
              >
                Sale
              </button>
            </nav>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-[520px] hidden md:flex items-center">
          <div className="w-full h-11 rounded-full bg-white border border-black/10 flex items-center px-4 gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] focus-within:border-black/30 transition">
            <Search className="w-4 h-4 text-black/40" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-black/40"
            />
            <span className="hidden lg:flex items-center gap-1 text-[11px] font-medium bg-black/5 px-2 py-1 rounded-full text-black/50 select-none">
              ⌘ K
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToast('NOVA light lab — always on • #FAF9F6')}
            className="hidden md:flex w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center relative hover:bg-black/5 transition"
            aria-label="Light mode info"
          >
            <span className="text-[13px]">◐</span>
          </button>

          <button
            type="button"
            onClick={() => onToast('NOVA Member Profile & Orders')}
            className="hidden md:flex w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center hover:bg-black/5 transition"
            aria-label="User profile"
          >
            <span className="text-[13px] font-bold">A</span>
          </button>

          <button
            type="button"
            onClick={() => onToast(wishlistCount ? `${wishlistCount} saved artifacts` : 'Wishlist empty')}
            className="w-10 h-10 rounded-full bg-white border border-black/10 grid place-items-center relative hover:bg-black/5 transition"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount ? 'fill-black text-black' : 'text-[#111]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8FF5A] text-[10px] font-bold grid place-items-center border border-black/10">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="h-10 px-4 rounded-full bg-[#111] text-white flex items-center gap-2 text-[13px] font-bold hover:bg-black transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-white text-black w-5 h-5 rounded-full grid place-items-center text-[11px] font-bold">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 rounded-full bg-white border border-black/10 grid place-items-center hover:bg-black/5 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-white/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          <div className="h-11 rounded-full bg-[#FAF9F6] border border-black/10 flex items-center px-4 gap-3">
            <Search className="w-4 h-4 text-black/40" />
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Computing'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[13px] whitespace-nowrap font-medium transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
