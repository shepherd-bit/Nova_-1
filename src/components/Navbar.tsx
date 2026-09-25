import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  cartCount: number;
  onOpenCart: () => void;
  onResetToHome: () => void;
  // Kept optional for type compatibility with parent components
  wishlistCount?: number;
  isCategoriesOpen?: boolean;
  onToggleCategories?: () => void;
  onSelectCategory?: (cat: string) => void;
  onSelectSort?: (sort: string) => void;
  onToast?: (msg: string) => void;
}

/**
 * The header is two rows on phones (logo + cart, then a full-width search bar)
 * and a single row from `sm` up. The fixed header and the spacer that reserves
 * its height must always agree, so both share this one value.
 */
const HEADER_HEIGHT = 'h-[114px] sm:h-[72px]';

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  searchInputRef,
  cartCount,
  onOpenCart,
  onResetToHome,
}) => {
  return (
    <>
      {/* Reserve the navbar height while the fixed header stays visible over the page. */}
      <div aria-hidden="true" className={HEADER_HEIGHT} />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-xl bg-[#FAF9F6]/95 border-b border-black/[0.06]"
      >
        <div
          className={`mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 ${HEADER_HEIGHT} grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2.5 sm:flex sm:items-center sm:justify-between sm:gap-6`}
        >
          {/* Left: Brand Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-start-1 row-start-1 flex items-center min-w-0"
          >
            <button
              type="button"
              onClick={onResetToHome}
              className="flex items-center gap-2 sm:gap-3 text-left group min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111] text-white grid place-items-center font-bold text-[12px] sm:text-[14px] shadow-sm group-hover:scale-105 transition shrink-0">
                N
              </div>
              <span className="text-[18px] sm:text-[22px] font-[800] tracking-[-0.02em] text-[#111] truncate">
                NOVA•
              </span>
            </button>
          </motion.div>

          {/* Center: Search input — full width on its own row on phones */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-start-1 row-start-2 col-span-2 sm:col-span-1 w-full sm:w-auto sm:flex-1 sm:max-w-[520px] flex items-center"
          >
            <div className="w-full h-10 sm:h-11 rounded-full bg-white border border-black/10 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] focus-within:border-black/30 transition">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-black/40" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="min-w-0 flex-1 bg-transparent outline-none text-[13px] sm:text-[14px] placeholder:text-black/40"
              />
              <span className="hidden lg:flex items-center gap-1 text-[11px] font-medium bg-black/5 px-2 py-1 rounded-full text-black/50 select-none">
                ⌘ K
              </span>
            </div>
          </motion.div>

          {/* Right: Cart Action */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-start-2 row-start-1 justify-self-end flex items-center gap-2"
          >
            <button
              type="button"
              onClick={onOpenCart}
              className="h-9 px-3 sm:h-10 sm:px-4 rounded-full bg-[#111] text-white flex items-center gap-1.5 sm:gap-2 text-[12px] sm:text-[13px] font-bold hover:bg-black transition shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-white text-black w-5 h-5 rounded-full grid place-items-center text-[11px] font-bold">
                {cartCount}
              </span>
            </button>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};